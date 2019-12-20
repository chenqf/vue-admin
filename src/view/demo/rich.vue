<template>
  <div class="components-container">
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '_c/tinymce'

export default {
  name: 'RichDemo',
  components: { Tinymce },
  data() {
    return {
      content:
      `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>
      <p>
        <img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.pinimg.com/originals/8b/80/c8/8b80c843c473bb22e6299888e1641492.jpg" width="200" />
      </p>`
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

