<template>
  <div class="code" v-highlight>
    <pre><code ref="code">{{text}}</code></pre>
  </div>
</template>

<script>
export default {
  props: ["text"]
};
</script>

<style lang="scss" scoped>
.code {
  border-radius: 4px;
  padding: 10px 10px;
  margin-top: 10px;
  background: #001529;
  color: #fff;
  font-size: 16px;
}
</style>
