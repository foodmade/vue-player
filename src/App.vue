<template>
  <router-view></router-view>
</template>

<script>
import PageHome from "./page/page-home.vue";
import search from "./page/search.vue";

export default {
  name: "app",
  components: {
    PageHome,search
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
