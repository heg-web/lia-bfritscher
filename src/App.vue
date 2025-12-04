<script setup>
import { ref, reactive, onMounted, watch, computed } from "vue";

const LOCALSTORAGE_APP_KEY = "my-vue-app";
const state = reactive({
  items: [],
  newValue: "",
});
onMounted(() => {
  load();
});
watch(state, () => {
  save();
});
function save() {
  localStorage.setItem(LOCALSTORAGE_APP_KEY, JSON.stringify(state.items));
}
function load() {
  let items = [];

  const data = localStorage.getItem(LOCALSTORAGE_APP_KEY);
  if (data) {
    try {
      items = JSON.parse(data);
    } catch (e) {
      console.error("Error parsing localStorage data", e);
    }
  }
  state.items = items;
}
function add() {
  state.items.push({
    id: crypto.randomUUID(),
    name: state.newValue,
    qty: count.value,
    checked: false
  });
  state.newValue = "";
}

function remove(item) {
  const index = state.items.indexOf(item);
  if (index > -1) {
    state.items.splice(index, 1);
  }
}

const total = computed(() => {
  /*
  let total = 0;
  for (const el of state.items) {
    total += el.qty;
  }
  return total;
  */
 console.log('calcule du total');
 return state.items.reduce((total, el) => total + el.qty, 0);
});

const notCheckedItems = computed(() => {
  return state.items.filter(el => !el.checked)
})


const checkedItems = computed(() => {
  return state.items.filter(el => el.checked)
})

/*
<input type="checkbox" v-model="item.checked" />
*/

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
        <button @click="add" :disabled="count <= 0 || state.newValue.trim() === ''" class="btn btn-success">
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
      <li
        v-for="item in notCheckedItems"
        :key="item.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div class="d-flex align-items-center gap-3">
          <input type="checkbox" v-model="item.checked" />
          <span class="badge bg-primary rounded-pill">{{ item.qty }}</span>
          <input v-model="item.name" class="form-control form-control-sm" style="max-width: 200px" />
        </div>
        <button @click="remove(item)" class="btn btn-danger btn-sm">
          <i class="fas fa-trash"></i>
        </button>
      </li>
    </ul>

    <hr class="my-5" />

    <ul class="list-group">
      <li
        v-for="item in checkedItems"
        :key="item.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div class="d-flex align-items-center gap-3">
          <input type="checkbox" v-model="item.checked" />
          <span class="badge bg-primary rounded-pill">{{ item.qty }}</span>
          <input v-model="item.name" class="form-control form-control-sm" style="max-width: 200px" />
        </div>
        <button @click="remove(item)" class="btn btn-danger btn-sm">
          <i class="fas fa-trash"></i>
        </button>
      </li>
    </ul>
    <div>
      Total items: {{ total }}
    </div>
  </div>
</template>

<style scoped></style>
