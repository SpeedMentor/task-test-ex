<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Hello, Vue.js!',
    },
  },
};
</script>

<style scoped>
.hello {
  text-align: center;
  margin-top: 20px;
}
</style>
