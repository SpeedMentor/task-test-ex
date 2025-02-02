<template>
  <div class="home">
    <h1>Welcome to the Microservices App</h1>
    <button @click="fetchData">Fetch Data</button>
    <div v-if="data">
      <h2>Data from Backend:</h2>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://<BACKEND_ENDPOINT>/api/data');
        this.data = await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
</script>

<style scoped>
.home {
  margin-top: 20px;
}
</style>
