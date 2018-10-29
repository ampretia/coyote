<template>
  <div id="app">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- navbar items, navbar burger... -->
        <p class="navbar-item"></p>
        <p class="image">
          <img src="@/assets/logo.png" width="112" height="112">
        </p>
        <p class="navbar-item title is-white">
          Coyote - Choose Your Own Tutorial
        </p>
      </div>
      <div class="navbar-menu">
        <!-- navbar start, navbar end -->
      </div>
    </nav>

    <section>
        <router-view/>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    courseTitle: () => {
      if (this.$store) {
        return this.$store.state.course.info.title
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
</style>
