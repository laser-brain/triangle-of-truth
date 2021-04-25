<template>
  <Triangle :height="800" :width="1000"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Triangle from './components/Triangle.vue';

export default defineComponent({
  name: 'App',
  components: {
    Triangle,
  },
});
</script>

<style lang="css">
body {
  background-image: linear-gradient(black, green);
}
</style>
