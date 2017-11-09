/* global BoxSelect: false, mdEditor: false */

var options = {
  clientId: 'vb8f29nn6lmoxqbzkoupa1bu533gnx2v',
  linkType: 'direct',
  multiselect: false
};
var boxSelect = new BoxSelect(options);

boxSelect.success(function(response) {
  console.log(response[0]);
  mdEditor.fileInfo = response[0];
  fetch(response[0].url)
    .then(blob => blob.text())
    .then(text => mdEditor.markdown = text);
});
// Register a cancel callback handler
boxSelect.cancel(function() {
  console.log('The user clicked cancel or closed the popup');
});
