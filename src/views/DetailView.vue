<template>
  <div>
    <h1>Detail View</h1>
    <p>This is the detail view of the application.</p>
    {{  item }}

  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { state } from '@/state.js';
import { computed } from 'vue';

const route = useRoute();

const item = computed(() => state.items.find(el => el.id === route.params.id));

</script>
