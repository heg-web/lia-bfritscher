<script setup>

import { remove } from '../state.js';
defineProps({'item': {
  type: Object,
  required: true
}});

/*
const emits = defineEmits('remove')

function remove(item) {
  emits('remove', item);
}
*/

</script>
<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center gap-3">
      <input type="checkbox" v-model="item.checked" />
      <span class="badge bg-primary rounded-pill">{{ item.qty }}</span>
      <input v-model="item.name" class="form-control form-control-sm" style="max-width: 200px" />
      <router-link :to="`/details/${item.id}`" class="btn btn-info btn-sm">
        <i class="fas fa-info"></i>
      </router-link>
    </div>
    <button @click="remove(item)" class="btn btn-danger btn-sm">
      <i class="fas fa-trash"></i>
    </button>
  </li>
</template>
