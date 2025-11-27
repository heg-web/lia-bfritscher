<script setup>
import { ref, reactive, onMounted, watch } from 'vue'

const LOCALSTORAGE_APP_KEY = 'my-vue-app'
const state = reactive({
  items: [],
  newValue: '',
})
onMounted(() => {
  load()
})
watch(state, () => {
  save()
})
function save() {
  localStorage.setItem(LOCALSTORAGE_APP_KEY, JSON.stringify(state.items))
}
function load() {
  let items = []

  const data = localStorage.getItem(LOCALSTORAGE_APP_KEY)
  if (data) {
    try {
      items = JSON.parse(data)
    } catch (e) {
      console.error('Error parsing localStorage data', e)
    }
  }
  state.items = items
}
function add() {
  state.items.push({
    id: crypto.randomUUID(),
    name: state.newValue,
    qty: count.value,
  })
  state.newValue = ''
}

function remove(item) {
  const index = state.items.indexOf(item)
  if (index > -1) {
    state.items.splice(index, 1)
  }
}

const count = ref(0)
function increment() {
  let amount = 1
  count.value += amount
}
</script>

<template>
  <div class="container mt-5">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h1 class="h3 mb-0">You did it!</h1>
        <h2 class="h5 mb-0">HELLO!</h2>
      </div>
      <div class="card-body">
        <div class="mb-4 text-center">
          <span class="display-4 d-block">{{ count }}</span>
          <span class="text-muted">Current Count</span>
        </div>

        <div class="row g-3 mb-4">
          <div class="col">
            <input
              v-model="state.newValue"
              type="text"
              class="form-control"
              placeholder="Enter item name..."
            />
          </div>
          <div class="col-auto">
            <button
              @click="add"
              :disabled="count <= 0 || state.newValue.trim() === ''"
              class="btn btn-success"
            >
              <i class="fas fa-plus me-1"></i> Add
            </button>
          </div>
        </div>

        <div class="mb-4 d-flex flex-wrap gap-2 justify-content-center">
          <button @click="count++" class="btn btn-primary">Increment</button>
          <button @click="increment" class="btn btn-outline-primary">Increment (method)</button>
          <button @click.right="increment" class="btn btn-outline-secondary">
            Increment (method call)
          </button>
          <button class="btn btn-info text-white">Test Bootstrap</button>
          <div class="d-flex align-items-center">
            <i class="fas fa-check text-success fs-4"></i>
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
            v-for="item in state.items"
            :key="item.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div class="d-flex align-items-center gap-3">
              <span class="badge bg-primary rounded-pill">{{ item.qty }}</span>
              <input
                v-model="item.name"
                class="form-control form-control-sm"
                style="max-width: 200px"
              />
              <small class="text-muted font-monospace" style="font-size: 0.75em">{{
                item.id
              }}</small>
            </div>
            <button @click="remove(item)" class="btn btn-danger btn-sm">
              <i class="fas fa-trash"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
