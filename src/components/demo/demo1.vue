<template>
  <div>
    <button @click="$emit('update:title', title + 1)">+1</button>
    <input type="text" v-model="value" />
    demo1:{{ title }}---{{ value }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1
    };
  },
  props: ["title"]
};
</script>

<style lang="scss" scoped></style>
