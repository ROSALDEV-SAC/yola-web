function doPost(e) {
  var raw = '';
  try {
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
    if (data.type === 'origin_registration') {
      var sheet = ss.getSheetByName('Origin') || ss.insertSheet('Origin');
      if (sheet.getLastRow() === 0) sheet.appendRow(['type','doc','email','payment','date','timestamp','phase','multiplier']);
      sheet.appendRow(['origin_registration', data.doc || '', data.email || '', data.payment || '', data.date || today, data.timestamp || now, data.phase || 'origin', data.multiplier || 3.75]);
      return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON);
    }
    if (data.type === 'feedback') {
      var sheet = ss.getSheetByName('Feedback') || ss.insertSheet('Feedback');
      if (sheet.getLastRow() === 0) sheet.appendRow(['type','id','name','title','desc','cat','date']);
      sheet.appendRow(['feedback', data.id || '', data.name || '', data.title || '', data.desc || '', data.cat || '', data.date || today]);
      return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON);
    }
    if (data.type === 'vote') {
      var sheet = ss.getSheetByName('Votes') || ss.insertSheet('Votes');
      if (sheet.getLastRow() === 0) sheet.appendRow(['type','feedbackId','delta','userId','date']);
      sheet.appendRow(['vote', data.feedbackId || '', data.delta || 0, data.userId || '', data.date || today]);
      return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({status:'error'})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status:'error', message: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var action = (e && e.parameter) ? e.parameter.action : 'test';
  if (action === 'test') {
    return ContentService.createTextOutput(JSON.stringify({status:'ok', time: new Date().toISOString()})).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON);
}
