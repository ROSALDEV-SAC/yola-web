// YOLA — Google Apps Script Backend
// Recibe registros de Guardianes y feedback, escribe en Google Sheets

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.type === 'origin_registration') {
      var sheet = ss.getSheetByName('Origin');
      if (!sheet) sheet = ss.insertSheet('Origin');
      sheet.appendRow([
        data.type,
        data.doc || '',
        data.email || '',
        data.payment || '',
        data.date || '',
        data.timestamp || '',
        data.phase || '',
        data.multiplier || ''
      ]);
      return ContentService.createTextOutput(JSON.stringify({status: 'ok', type: 'origin'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.type === 'feedback') {
      var sheet = ss.getSheetByName('Feedback');
      if (!sheet) sheet = ss.insertSheet('Feedback');
      sheet.appendRow([
        data.type,
        data.id || '',
        data.name || '',
        data.title || '',
        data.desc || '',
        data.cat || '',
        data.date || ''
      ]);
      return ContentService.createTextOutput(JSON.stringify({status: 'ok', type: 'feedback'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.type === 'vote') {
      var sheet = ss.getSheetByName('Votes');
      if (!sheet) sheet = ss.insertSheet('Votes');
      sheet.appendRow([
        data.type,
        data.feedbackId || '',
        data.delta || 0,
        data.userId || '',
        data.date || ''
      ]);
      return ContentService.createTextOutput(JSON.stringify({status: 'ok', type: 'vote'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Unknown type'})).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var action = e.parameter.action;
  
  if (action === 'list') {
    var sheet = ss.getSheetByName('Feedback');
    if (!sheet) return ContentService.createTextOutput(JSON.stringify({feedbacks: []})).setMimeType(ContentService.MimeType.JSON);
    
    var data = sheet.getDataRange().getValues();
    var feedbacks = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === 'feedback') {
        feedbacks.push({
          id: data[i][1],
          name: data[i][2],
          title: data[i][3],
          desc: data[i][4],
          cat: data[i][5],
          date: data[i][6],
          votes: 0
        });
      }
    }
    return ContentService.createTextOutput(JSON.stringify({feedbacks: feedbacks})).setMimeType(ContentService.MimeType.JSON);
  }
  
  if (action === 'votes') {
    var sheet = ss.getSheetByName('Votes');
    if (!sheet) return ContentService.createTextOutput(JSON.stringify({votes: {}})).setMimeType(ContentService.MimeType.JSON);
    
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
    return ContentService.createTextOutput(JSON.stringify({votes: votes})).setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Unknown action'})).setMimeType(ContentService.MimeType.JSON);
}
