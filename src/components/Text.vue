
<template>

  <section class="section">
    <div class="container">
    </div>

    <template v-for="text in textList" >
      <div class="container box" :key="text">
      <p>
       <span v-html="text" class="content" >

       </span>
      </p>
    </div>
    </template>

  </section>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import MarkdownIt from "markdown-it";
import classy from "markdown-it-classy";
import hljs from "highlight.js"; // https://highlightjs.org/
import * as path from "path";

const md = new MarkdownIt({
  highlight: function(str, lang) {
    console.log(lang);
    if (lang && hljs.getLanguage(lang)) {
      console.log(`${lang} is ok`);
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ""; // use external default escaping
  }
});
md.use(classy);
const root =
  "https://raw.githubusercontent.com/ampretia/fabric-application-examples/europa/docs/";

export default {
  name: "Text",
  data: function() {
    return {
      textList: [],
      errors: []
    };
  },
  computed: {},
  mounted() {
    let tutorials = this.$store.state.selectedTutorials;
    let number = tutorials.length;
    for (let tutorial of tutorials) {
      try {
        console.log(tutorial);
        let uri = path.join(root, tutorial["src-uri"]);
        axios.get(uri).then(response => {
          this.textList.push(md.render(response.data));
        });
      } catch (e) {
        console.log(e);
        this.errors.push(e);
      }
    }
  }
};
</script>

<style lang="scss" >
</style>
