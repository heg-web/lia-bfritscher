import { reactive, watch } from "vue";

const LOCALSTORAGE_APP_KEY = "my-vue-app";

export const state = reactive({
  items: [],
  newValue: "",
});

export function remove(item) {
  const index = state.items.indexOf(item);
  if (index > -1) {
    state.items.splice(index, 1);
  }
}

watch(state, () => {
  save();
});

export function save() {
  localStorage.setItem(LOCALSTORAGE_APP_KEY, JSON.stringify(state.items));
}

export function load() {
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

export function add(name, qty) {
  state.items.push({
    id: crypto.randomUUID(),
    name: name,
    qty: qty,
    checked: false,
  });
}

