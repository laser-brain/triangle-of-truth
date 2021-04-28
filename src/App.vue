<template>
  <div class="container">
    <h1>The triangle of truth!</h1>
    <p>
      Prioritizing one of cost, available time or quality inevitably
      lessens the impact of the other two parameters.
    </p>
    <Triangle :height="800" :width="1000" />
  </div>
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
  color: white;
  margin: 0;
  min-height: 100vh;
  background-image: linear-gradient(225deg, #7da3a1, black);
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: centers;
  align-items: center;
}
</style>
