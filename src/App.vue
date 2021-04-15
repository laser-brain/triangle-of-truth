<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Triangle :height="800" :width="1000"/>
</template>

<script>
import Triangle from './components/Triangle.vue';

export default {
  name: 'App',
  components: {
    Triangle,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
