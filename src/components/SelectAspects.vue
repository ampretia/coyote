
<template>
  <section class="section">
    <div class="container">

        <div class="container">
          <p class="title">{{ path.title }}</p>
        </div>
        <div class="container">
          <p class="subtitle"> Please selected the style of elements to study on this path</p>
        </div>
        <div class="container">
          <p> Available course elements</p>
          <div v-for="(value, key) in choices" :key="key" class="columns">
            <div class="column">
            {{ key }}:
            </div>
            <div class="column">

              <div class="select">
                <select v-model="s[key]" v-on:change="signalChange">
                  <option  v-for="(tutorial, index) in  value" :key="index" v-bind:value="index">{{ tutorial.title}}</option>
                </select>
              </div>

            </div>
          </div>

        </div>

        <div class="container">
          <p class="button is-primary" v-on:click="produceTutorial">Produce tutorial</p>
         </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */

let elementsCache = {};

export default {
  name: "SelectAspects",
  data: function (){
     return {
    selected: '',
    s : {}
     }
  },
  methods: {
    getCourse: function(evt) {
      this.$store.dispatch("setCourse");
    },
    produceTutorial: function() {
      let tutorials=[]
      for (let k in this.s){
        tutorials.push(elementsCache[k][this.s[k]]);
      }
      this.$store.dispatch('setTutorials',tutorials)
      this.$router.push('text')
    },
    signalChange: function() {
      console.log(`finally.....${this.selected}`)
    }
  },
  computed: {
    path: function() {
      return this.$store.state.selectedPath;
    },
    choices: function() {
      let result = {};
      // reduce the elements to an aim and a set of choice of tutorials
      // based on the criteria
      let elements = this.$store.state.selectedPath.elements;
      console.log(elements);
      for (let e of elements) {
        console.log(e);
        let aim = e.aim;
        let tutorials = this.$store.state.course.tutorials;

        this.$set(this.s,aim,'------')
        result[aim] = tutorials.reduce((final, value) => {
          let rc = e["required-concepts"][0];
          if (value.prereqs.concepts.includes(rc)) {
            final.push(value);
          }

          return final;
        }, []);
      }

      console.log(result);
      elementsCache=result;
      return result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
</style>
