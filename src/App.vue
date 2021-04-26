<template>
  <Triangle :height="800" :width="1000"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Triangle from './components/Triangle.vue';

export default defineComponent({
  name: 'Triangle of truth',
  components: {
    Triangle,
  },
});
</script>

<style lang="css">
body {
  margin: 0;
  min-height: 100vh;
  background-image: linear-gradient(225deg, #7da3a1, black);
}

</style>
