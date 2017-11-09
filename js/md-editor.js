/* global Vue: false, markdownit: false */
var md = markdownit({html: true});
var reader = new FileReader();
reader.onload = (event) => test.markdown = event.target.result;

var test = new Vue({
  el: '#test',
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
    }
  }
});
