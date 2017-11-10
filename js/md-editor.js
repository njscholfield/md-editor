/* global Vue: false, markdownit: false */
var md = markdownit({html: true});
var reader = new FileReader();
reader.onload = (event) => mdEditor.markdown = event.target.result;

var mdEditor = new Vue({
  el: '#md-editor',
  data: {
    markdown: '',
    fileInfo: {},
    oauth: {}
  },
  computed: {
    html() {
      return md.render(this.markdown);
    },
    downloadURL() {
      var data = new Blob([this.markdown], {type: 'text/markdown'});
      return window.URL.createObjectURL(data);
    }
  },
  methods: {
    processFile(event) {
      this.fileInfo = event.target.files[0];
      reader.readAsText(event.target.files[0]);
    },
    uploadFileToBox() {
      var uploadPath = 'https://upload.box.com/api/2.0/files/' + this.fileInfo.id + '/content';
      var form = new FormData();
      var file = new Blob([this.markdown], {type: 'text/markdown'});
      form.append('file', file);
      fetchPost(uploadPath, form, this.oauth.access_token);
    },
    getKey(authCode) {
      var data = 'grant_type=authorization_code&code=' + authCode + '&client_id=vb8f29nn6lmoxqbzkoupa1bu533gnx2v&client_secret=H1dhjlHyWYISn1i8zQatW2OmPGzLCOBv';
      fetch('https://api.box.com/oauth2/token', {method: 'POST', body: data, headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, mode: 'cors'
      })
        .then(blob => blob.json())
        .then(json => this.oauth = json)
        .catch((error) => console.log(error));
    }
  }
});

function fetchPost(url, data, token) {
  var headers = new Headers({
    'Authorization': 'Bearer ' + token
  });
  fetch(url, {
    method: 'POST',
    body: data,
    headers: headers,
    mode: 'cors'
  })
    .then(blob => blob.json())
    .then((response) => console.log(response))
    .catch((response) => console.log(response));
}
