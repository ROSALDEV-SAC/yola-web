// YOLA — Google Apps Script Backend v2
// Recibe registros de Guardianes y feedback, escribe en Google Sheets
// Compatible con fetch mode:'no-cors' y Content-Type: text/plain

function doPost(e) {
  var raw = '';
  try {
    // Intentar leer el body de varias formas
    if (e.postData && e.postData.contents) {
      raw = e.postData.contents;
    } else if (e.postData && e.postData.getDataAsString) {
      raw = e.postData.getDataAsString();
    } else {
      return ContentService.createTextOutput(JSON.stringify({status:'error', message:'No data received'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    var data = JSON.parse(raw);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var today = new Date().toISOString().slice(0,10);
    var now = new Date().toISOString();
    
    // ─── ORIGIN REGISTRATION ─────────────────────────
    if (data.type === 'origin_registration') {
      var sheet = ss.getSheetByName('Origin') || ss.insertSheet('Origin');
      // Auto-setup headers if sheet is empty
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['type','doc','email','payment','date','timestamp','phase','multiplier']);
      }
      sheet.appendRow([
        'origin_registration',
        data.doc || '',
        data.email || '',
        data.payment || '',
        data.date || today,
        data.timestamp || now,
        data.phase || 'origin',
        data.multiplier || 3.75
      ]);
      return ContentService.createTextOutput(JSON.stringify({status:'ok', type:'origin_registration', rows: sheet.getLastRow()})).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ─── FEEDBACK ────────────────────────────────────
    if (data.type === 'feedback') {
      var sheet = ss.getSheetByName('Feedback') || ss.insertSheet('Feedback');
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['type','id','name','title','desc','cat','date']);
      }
      sheet.appendRow([
        'feedback',
        data.id || '',
        data.name || '',
        data.title || '',
        data.desc || '',
        data.cat || '',
        data.date || today
      ]);
      return ContentService.createTextOutput(JSON.stringify({status:'ok', type:'feedback', rows: sheet.getLastRow()})).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ─── VOTE ────────────────────────────────────────
    if (data.type === 'vote') {
      var sheet = ss.getSheetByName('Votes') || ss.insertSheet('Votes');
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['type','feedbackId','delta','userId','date']);
      }
      sheet.appendRow([
        'vote',
        data.feedbackId || '',
        data.delta || 0,
        data.userId || '',
        data.date || today
      ]);
      return ContentService.createTextOutput(JSON.stringify({status:'ok', type:'vote'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({status:'error', message:'Unknown type: ' + data.type})).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status:'error', message: err.toString(), raw: raw.substring(0,200)})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var action = e.parameter.action;
  
  if (action === 'list') {
    var sheet = ss.getSheetByName('Feedback');
    if (!sheet) return ContentService.createTextOutput(JSON.stringify({feedbacks:[]})).setMimeType(ContentService.MimeType.JSON);
    var data = sheet.getDataRange().getValues();
    var feedbacks = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === 'feedback') {
        feedbacks.push({id:data[i][1], name:data[i][2], title:data[i][3], desc:data[i][4], cat:data[i][5], date:data[i][6], votes:0});
      }
    }
    return ContentService.createTextOutput(JSON.stringify({feedbacks:feedbacks})).setMimeType(ContentService.MimeType.JSON);
  }
  
  if (action === 'votes') {
    var sheet = ss.getSheetByName('Votes');
    if (!sheet) return ContentService.createTextOutput(JSON.stringify({votes:{}})).setMimeType(ContentService.MimeType.JSON);
    var data = sheet.getDataRange().getValues();
    var votes = {};
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === 'vote') {
        var fid = data[i][1];
        var delta = data[i][2];
        if (!votes[fid]) votes[fid] = 0;
        votes[fid] += delta;
      }
    }
    return ContentService.createTextOutput(JSON.stringify({votes:votes})).setMimeType(ContentService.MimeType.JSON);
  }
  
  // ─── TEST ENDPOINT ─────────────────────────────────
  if (action === 'test') {
    return ContentService.createTextOutput(JSON.stringify({status:'ok', message:'YOLA API is running', time: new Date().toISOString()})).setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput(JSON.stringify({status:'error', message:'Unknown action'})).setMimeType(ContentService.MimeType.JSON);
}
