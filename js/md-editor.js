/* global Vue: false, markdownit: false */
var md = markdownit({html: true});
var reader = new FileReader();
reader.onload = (event) => mdEditor.markdown = event.target.result;

var mdEditor = new Vue({
  el: '#md-editor',
  data: {
    markdown: '',
    fileInfo: {},
  },
  computed: {
    html() {
      return md.render(this.markdown);
    },
    downloadURL() {
      var data = new Blob([this.markdown], {type: 'text/plain'});
      return window.URL.createObjectURL(data);
    }
  },
  methods: {
    processFile(event) {
      this.fileInfo = event.target.files[0];
      reader.readAsText(event.target.files[0]);
    },
    uploadFileToBox() {
      var uploadPath = `https://upload.box.com/api/2.0/files/${this.fileInfo.id}/content`;
      var form = new FormData();
      var file = new Blob([this.markdown], {type: 'text/markdown'});
      form.append('content_modified_at', Date.now());
      form.append('file', file);
      fetchPost(uploadPath, form);
    }
  }
});

function fetchPost(url, data) {
  fetch(url, {
    method: 'post',
    body: data
  })
    .then((response) => console.log(response.data))
    .catch((response) => console.log(response));
}
