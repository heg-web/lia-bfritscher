<script setup>
import { ref, onMounted, computed } from "vue";
import ShoppingListItem from "./components/ShoppingListItem.vue";
import { state, remove, load, add} from "./state.js";

onMounted(() => {
  load();
});

const total = computed(() => {
  /*
  let total = 0;
  for (const el of state.items) {
    total += el.qty;
  }
  return total;
  */
  console.log("calcule du total");
  return state.items.reduce((total, el) => total + el.qty, 0);
});

const notCheckedItems = computed(() => {
  return state.items.filter((el) => !el.checked);
});

const checkedItems = computed(() => {
  return state.items.filter((el) => el.checked);
});

/*
<input type="checkbox" v-model="item.checked" />
*/

function addItem() {
  add(state.newValue, count.value);
  state.newValue = "";
  count.value = 1;
}

const count = ref(1);
</script>

<template>
  <div class="container mt-5">
    <div class="row g-3 mb-4">
      <div class="col">
        <div class="d-flex">
          <button @click="count--" class="btn btn-primary">-</button>
          <div class="px-4">{{ count }}</div>
          <button @click="count++" class="btn btn-primary">+</button>
          <input v-model="state.newValue" type="text" class="form-control" placeholder="Enter item name..." />
        </div>
      </div>
      <div class="col-auto">
        <button @click="addItem" :disabled="count <= 0 || state.newValue.trim() === ''" class="btn btn-success">
          <i class="fas fa-plus me-1"></i> Add
        </button>
      </div>
    </div>

    <div v-if="count <= 0" class="alert alert-warning" role="alert">
      <i class="fas fa-exclamation-triangle me-2"></i> Count doit être supérieur à 0
    </div>
    <div v-if="state.newValue.trim() === ''" class="alert alert-info" role="alert">
      <i class="fas fa-info-circle me-2"></i> Le champ ne doit pas être vide
    </div>

    <ul class="list-group">
      <shopping-list-item v-for="item in notCheckedItems" :key="item.id" :item="item" @remove="remove" />
    </ul>

    <hr class="my-5" />

    <ul class="list-group">
      <shopping-list-item v-for="item in checkedItems" :key="item.id" :item="item"  />
    </ul>
    <div>Total items: {{ total }}</div>
  </div>
</template>

<style scoped></style>
