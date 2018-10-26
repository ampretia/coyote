
<template>
  <section class="section">
    <div class="container">

      <div>
        <button class="button" v-on:click="getCourse">Get the course details</button>
        </div>

      <template v-if="ready">
        <div class="container">
          <p class="title">{{ course.info.title }}</p>
          <p class="subtitle">{{ course.info.overview }}</p>
        </div>
        <div class="container">
          <p> Available course paths</p>
          <ul id="example-2">
            <div v-for="(p, index) in course.paths" :key="p.title" class="box">
              <li v-on:click="selectPath(index)" :id="p.title"> {{ p.title }} </li>
            </div>
          </ul>
        </div>
      </template>

    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: "SelectPath",
  methods: {
    getCourse: function(evt) {
      this.$store.dispatch("setCourse");
    },
    selectPath: function(evt) {
      console.log(`Selected path ${this.$store.state.course.paths[evt].title}`);

      this.$store.dispatch("setPath",this.$store.state.course.paths[evt]);
      this.$router.push('aspects')
    }
  },
  computed: {
    course: function() {
      return this.$store.state.course;
    },
    ready: function() {
      return this.$store.state.ready;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
</style>
