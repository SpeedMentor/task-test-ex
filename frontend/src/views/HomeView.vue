<template>
  <div class="home">
    <HelloWorld msg='Welcome To the Microservices App' />
    <button @click="fetchData">Fetch Data</button>
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error: {{ error }}</p>
    <ul v-if="data">
      <li v-for="item in data" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';

export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      data: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('http://backend-service:3000/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        this.data = await response.json();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin: 0 auto;
}
</style>
