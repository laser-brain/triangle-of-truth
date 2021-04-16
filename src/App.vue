<template>
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

<style lang="css">
body {
  background-image: linear-gradient(black, green);
}
</style>
