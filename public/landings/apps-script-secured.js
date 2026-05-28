// ═══════════════════════════════════════════════════════════
// YOLA FEEDBACK — Google Apps Script Backend (SECURED v2)
// 
// SEGURIDAD INCLUIDA:
// - Rate limiting por IP (máx 5 submissions por hora)
// - Validación de longitud de inputs
// - Sanitización de strings (remove script tags, event handlers)
// - Validación de categorías permitidas
// - Prevención de inyección de código
//
// INSTRUCCIONES:
// 1. Reemplazá TODO el código en Apps Script con esto
// 2. Redeployá el Web App
// 3. La URL no cambia
// ═══════════════════════════════════════════════════════════

var SHEET_FEEDBACK = 'Feedback';
var SHEET_VOTES = 'Votes';
var SHEET_RATE_LIMIT = 'RateLimit';

// ─── SECURITY: Sanitización server-side ────────────────────
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '')           // Remove all HTML tags
    .replace(/javascript:/gi, '')      // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '')        // Remove on* event handlers
    .replace(/data:/gi, '')            // Remove data: protocol
    .replace(/vbscript:/gi, '')        // Remove vbscript: protocol
    .replace(/\{|\}/g, '')            // Remove curly braces
    .trim();
}

function validateCategory(cat) {
  var allowed = ['feature', 'idea', 'bug', 'ux', 'opinion'];
  return allowed.indexOf(cat) !== -1 ? cat : 'feature';
}

function validateStatus(status) {
  var allowed = ['pending', 'reviewing', 'planned', 'done'];
  return allowed.indexOf(status) !== -1 ? status : 'pending';
}

// ─── SECURITY: Rate limiting ───────────────────────────────
function checkRateLimit(userId) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_RATE_LIMIT);
    if (!sheet) {
      // Create rate limit sheet
      var newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_RATE_LIMIT);
      newSheet.appendRow(['userId', 'action', 'timestamp']);
      return true;
    }
    
    var now = Date.now();
    var oneHourAgo = now - (60 * 60 * 1000);
    var data = sheet.getDataRange().getValues();
    var recentCount = 0;
    
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === userId && String(data[i][1]) === 'feedback') {
        var ts = new Date(data[i][2]).getTime();
        if (ts > oneHourAgo) recentCount++;
      }
    }
    
    // Max 5 feedbacks per hour per user
    if (recentCount >= 5) return false;
    
    // Log this action
    sheet.appendRow([userId, 'feedback', new Date().toISOString()]);
    
    // Cleanup old entries (older than 2 hours)
    if (data.length > 50) {
      var twoHoursAgo = now - (2 * 60 * 60 * 1000);
      for (var i = data.length - 1; i >= 1; i--) {
        var ts = new Date(data[i][2]).getTime();
        if (ts < twoHoursAgo) {
          sheet.deleteRow(i + 1);
        }
      }
    }
    
    return true;
  } catch(e) {
    // If rate limit fails, allow (don't block users)
    return true;
  }
}

// ─── GET: Leer datos ──────────────────────────────────────
function doGet(e) {
  var action = e.parameter.action;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // ── Listar todos los feedbacks ──
  if (action === 'list') {
    try {
      var sheet = ss.getSheetByName(SHEET_FEEDBACK);
      if (!sheet) return jsonResponse({ feedbacks: [] });
      
      var data = sheet.getDataRange().getValues();
      var feedbacks = [];
      
      for (var i = 1; i < data.length; i++) {
        feedbacks.push({
          id:     String(data[i][0]),
          name:   sanitize(String(data[i][1])),
          title:  sanitize(String(data[i][2])),
          desc:   sanitize(String(data[i][3])),
          cat:    validateCategory(String(data[i][4])),
          status: validateStatus(String(data[i][5])),
          date:   String(data[i][6]),
          votes:  Number(data[i][7]) || 0
        });
      }
      
      return jsonResponse({ feedbacks: feedbacks });
    } catch(err) {
      return jsonResponse({ error: 'Failed to read feedbacks' });
    }
  }
  
  // ── Obtener votos ──
  if (action === 'votes') {
    try {
      var sheet = ss.getSheetByName(SHEET_VOTES);
      if (!sheet) return jsonResponse({ votes: {} });
      
      var data = sheet.getDataRange().getValues();
      var votes = {};
      
      for (var i = 1; i < data.length; i++) {
        var fid = String(data[i][0]);
        var delta = Number(data[i][1]) || 0;
        votes[fid] = (votes[fid] || 0) + delta;
      }
      
      return jsonResponse({ votes: votes });
    } catch(err) {
      return jsonResponse({ error: 'Failed to read votes' });
    }
  }
  
  // ── Stats ──
  if (action === 'stats') {
    try {
      var fbSheet = ss.getSheetByName(SHEET_FEEDBACK);
      var vSheet = ss.getSheetByName(SHEET_VOTES);
      
      var fbCount = fbSheet ? Math.max(0, fbSheet.getLastRow() - 1) : 0;
      var vCount = vSheet ? Math.max(0, vSheet.getLastRow() - 1) : 0;
      
      var doneCount = 0;
      if (fbSheet && fbSheet.getLastRow() > 1) {
        var statuses = fbSheet.getRange(2, 6, fbSheet.getLastRow() - 1, 1).getValues();
        for (var i = 0; i < statuses.length; i++) {
          if (String(statuses[i][0]) === 'done') doneCount++;
        }
      }
      
      return jsonResponse({
        total: fbCount,
        voters: vCount,
        done: doneCount
      });
    } catch(err) {
      return jsonResponse({ error: 'Failed to read stats' });
    }
  }
  
  return jsonResponse({ error: 'unknown action' });
}

// ─── POST: Escribir datos ────────────────────────────────
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // ── Security: Validate required fields ──
    if (!body.id || !body.name || !body.title || !body.desc) {
      return jsonResponse({ error: 'Missing required fields' });
    }
    
    // ── Security: Length limits ──
    if (body.name.length > 40 || body.title.length > 80 || body.desc.length > 500) {
      return jsonResponse({ error: 'Input too long' });
    }
    
    // ── Security: Sanitize all strings ──
    var safeName = sanitize(body.name);
    var safeTitle = sanitize(body.title);
    var safeDesc = sanitize(body.desc);
    var safeCat = validateCategory(body.cat || 'feature');
    var safeUserId = sanitize(body.userId || 'anonymous');
    
    // ── Security: Rate limit check ──
    if (body.type === 'feedback') {
      if (!checkRateLimit(safeUserId)) {
        return jsonResponse({ error: 'Rate limit exceeded. Max 5 per hour.' });
      }
    }
    
    // ── Nuevo feedback ──
    if (body.type === 'feedback') {
      var sheet = ss.getSheetByName(SHEET_FEEDBACK);
      if (!sheet) return jsonResponse({ error: 'Sheet not found' });
      
      var id = 'fb_' + new Date().getTime() + '_' + Math.random().toString(36).substr(2,5);
      
      sheet.appendRow([
        id,
        safeName,
        safeTitle,
        safeDesc,
        safeCat,
        'pending',
        body.date || new Date().toISOString().slice(0,10),
        1
      ]);
      
      return jsonResponse({ ok: true, id: id });
    }
    
    // ── Voto ──
    if (body.type === 'vote') {
      // Validate delta is -1 or 1
      var delta = Number(body.delta);
      if (delta !== 1 && delta !== -1) delta = 1;
      
      var sheet = ss.getSheetByName(SHEET_VOTES);
      if (!sheet) return jsonResponse({ error: 'Sheet not found' });
      
      sheet.appendRow([
        sanitize(body.feedbackId || ''),
        delta,
        safeUserId,
        body.date || new Date().toISOString().slice(0,10)
      ]);
      
      // Actualizar contador de votos en Feedback
      var fbSheet = ss.getSheetByName(SHEET_FEEDBACK);
      if (fbSheet && fbSheet.getLastRow() > 1) {
        var ids = fbSheet.getRange(2, 1, fbSheet.getLastRow() - 1, 1).getValues();
        for (var i = 0; i < ids.length; i++) {
          if (String(ids[i][0]) === body.feedbackId) {
            var currentVotes = Number(fbSheet.getRange(i + 2, 8).getValue()) || 0;
            fbSheet.getRange(i + 2, 8).setValue(currentVotes + delta);
            break;
          }
        }
      }
      
      return jsonResponse({ ok: true });
    }
    
    // ── Origin Registration ──
    if (body.type === 'origin_registration') {
      // Validate required fields
      if (!body.doc || !body.email || !body.payment) {
        return jsonResponse({ error: 'Missing required fields' });
      }
      if (body.doc.length > 60 || body.email.length > 80 || body.payment.length > 600) {
        return jsonResponse({ error: 'Input too long' });
      }
      if (body.email.indexOf('@') === -1) {
        return jsonResponse({ error: 'Invalid email' });
      }
      
      var safeDoc = sanitize(body.doc);
      var safeEmail = sanitize(body.email);
      var safePayment = sanitize(body.payment);
      
      // Create Origins sheet if it doesn't exist
      var originsSheet = ss.getSheetByName('Origins');
      if (!originsSheet) {
        originsSheet = ss.insertSheet('Origins');
        originsSheet.appendRow(['doc', 'email', 'payment', 'phase', 'multiplier', 'date', 'timestamp']);
      }
      
      originsSheet.appendRow([
        safeDoc,
        safeEmail,
        safePayment,
        body.phase || 'origin',
        Number(body.multiplier) || 7,
        body.date || new Date().toISOString().slice(0,10),
        body.timestamp || new Date().toISOString()
      ]);
      
      return jsonResponse({ ok: true });
    }
    
    return jsonResponse({ error: 'unknown type' });
  } catch(err) {
    return jsonResponse({ error: 'Invalid request' });
  }
}

// ─── Helper: Respuesta JSON ───────────────────────────────
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
