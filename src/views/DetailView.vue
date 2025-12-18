<template>
  <div>
    <h1>Detail View</h1>
    <p>This is the detail view of the application.</p>
    {{  item }}
    <button @click="loadProductDetails">Load Product Details</button>
    <div v-for="product in data?.products" :key="product.code">
      <h2>{{ product.product_name }}</h2>
      <img :src="product.image_url" alt="Product Image"  />
      <p>Brands: {{ product.brands }}</p>
      <p>Quantity: {{ product.quantity }}</p>
      <p>Categories: {{ product.categories }}</p>
      <a :href="product.url" target="_blank">View on OpenFoodFacts</a>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { state } from '@/state.js';
import { computed, ref } from 'vue';

const route = useRoute();

const data = ref(null);

const item = computed(() => state.items.find(el => el.id === route.params.id));

async function fetchProductDetails(productName) {
  const response = await fetch(
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${productName}&lc=fr&countries=Switzerland&search_simple=1&json=1&page_size=20&fields=product_name,quantity,product_type,brands,categories,code,nutriments,nutriscore,url,image_url`,
  );
  const data = await response.json();
  return data;
}

async function loadProductDetails() {
  if (item.value) {
    data.value = await fetchProductDetails(item.value.name)
  }
}

</script>
<style scoped>
img {
  max-width: 200px;
}
</style>
