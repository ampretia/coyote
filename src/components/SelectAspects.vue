
<template>
  <section class="section">
    <div class="container box">
        <div class="container">
          <p class="title">{{ path.title }}</p>
        </div>
        <div class="container">
          <p class="subtitle"> Please selected the style of elements to study on this path</p>
        </div>
    </div>
    <div class="section ">
    <div class="container">
        <div class="container">
          <p class="subtitle is-3">Available course elements</p>
          <div v-for="(value, key) in choices" :key="key" class="container box has-background-light">
            <div class="columns">
            <div class="column is-half">
              <div class="field">
                  <div class="label">
                    {{ key }}
                  </div>
                <div class="field-body">
                  <div class="control">
                    <div class="select">
                      <select v-model="s[key]" v-on:change="signalChange">
                        <option  v-for="(tutorial, index) in  value" :key="index" v-bind:value="index">{{ tutorial.title}}</option>
                      </select>
                    </div>
                </div>
              </div>
              </div>
            </div>

              <template v-if="details(key,s[key])===undefined">
              </template>
              <template v-else>

                <div class="column">
                <div class="panel">
                  <div class="panel-heading has-background-grey-lighter">
                    <span>Prereqs</span>
                  </div>

                  <div class="panel-block">
                    <div class="field is-horizontal">
                      <div class="field-label">
                        <label class="label">Concepts</label>
                      </div>
                      <div class="field-body">
                        <div class="field ">
                          <template v-for="(k,v) in details(key,s[key]).prereqs.concepts">
                            <div class="control" :key="v">
                              <label class="checkbox">
                                <input type="checkbox">
                                  {{k}}
                              </label>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="panel-block">
                    <div class="field is-horizontal">
                      <div class="field-label">
                        <label class="label">Artefacts</label>
                      </div>
                      <div class="field-body">
                        <div class="field ">
                          <template v-for="(k,v) in details(key,s[key]).prereqs.artefacts">
                            <div class="control" :key="v">
                              <label class="checkbox">
                                <input type="checkbox">
                                  {{k}}
                              </label>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="panel-block">
                    <div class="field is-horizontal">
                      <div class="field-label">
                        <label class="label">Useful</label>
                      </div>
                      <div class="field-body">
                        <div class="field ">
                          <template v-for="(k,v) in details(key,s[key]).prereqs.useful">
                            <div class="control" :key="v">
                              <label class="checkbox">
                                <input type="checkbox">
                                  {{k}}
                              </label>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <div class="column">
                <div class="panel">
                  <div class="panel-heading has-background-grey-lighter">
                    <span>Completion</span>
                  </div>

                  <div class="panel-block">
                    <div class="field is-horizontal">
                      <div class="field-label">
                        <label class="label">Concepts</label>
                      </div>
                      <div class="field-body">
                        <div class="field ">
                          <template v-for="(k,v) in details(key,s[key]).completion.concepts">
                            <div class="control" :key="v">
                              <label class="checkbox">
                                <input type="checkbox">
                                  {{k}}
                              </label>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="panel-block">
                    <div class="field is-horizontal">
                      <div class="field-label">
                        <label class="label">Artefacts</label>
                      </div>
                      <div class="field-body">
                        <div class="field ">
                          <template v-for="(k,v) in details(key,s[key]).completion.artefacts">
                            <div class="control" :key="v">
                              <label class="checkbox">
                                <input type="checkbox">
                                  {{k}}
                              </label>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="panel-block">
                    <div class="field is-horizontal">
                      <div class="field-label">
                        <label class="label">Useful</label>
                      </div>
                      <div class="field-body">
                        <div class="field ">
                          <template v-for="(k,v) in details(key,s[key]).completion.useful">
                            <div class="control" :key="v">
                              <label class="checkbox">
                                <input type="checkbox">
                                  {{k}}
                              </label>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </template>
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

// let elementsCache = {};

export default {
  name: "SelectAspects",
  data: function (){
     return {
          selected: '',
          s : {},
          elementsCache : {}
     }
  },
  methods: {
    getCourse: function(evt) {
      this.$store.dispatch("setCourse");
    },
    produceTutorial: function() {
      let tutorials=[]
      for (let k in this.s){
        console.log(`produce k = ${k}`)
        tutorials.push(this.elementsCache[k][this.s[k]]);
      }
      this.$store.dispatch('setTutorials',tutorials)
      this.$router.push('text')
    },
    signalChange: function() {
      console.log(`finally.....${this.selected}`)
    },
    details: function(k,v){
          return this.elementsCache[k][v];
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
          if (value.aim===aim && value.prereqs.concepts.includes(rc)) {
            final.push(value);
          }

          return final;
        }, []);
      }

      console.log(result);
      this.elementsCache=result;
      return result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
</style>
