<script setup>
import { computed, shallowRef, watch } from 'vue';
import { useFocus } from '@vueuse/core';

const model = defineModel()
const emit = defineEmits(['select', 'input'])

const { data, placeholder, id } = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Escribe algo...'
  },
  id: {
    type: String,
    default: 'food'
  },
  class: {
    type: String,
    default: ''
  }
})

const input = shallowRef()
const showList = shallowRef(false)
let hideTimeout = null

const { focused } = useFocus(input)

watch(focused, (isFocused) => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  if (isFocused) {
    if (data.length > 0) showList.value = true
  } else {
    // pequeño delay para permitir `@mousedown` en los items
    hideTimeout = setTimeout(() => {
      showList.value = false
    }, 150)
  }
})

const filteredData = computed(() => {
  // si no hay valor en model → mostrar todos los registros
  if (!model.value || !model.value.trim()) return data
  return data
})

// ✅ mostrar lista solo si hay focus y resultados
const showResults = computed(() => focused.value && filteredData.value.length > 0)

const onInput = (event) => {
  const value = event.target.value
  model.value = value
  emit('input', value)
  if (data.length > 0) {
    showList.value = true
  }
}

const onSelect = (food) => {
  model.value = food
  emit('input', food)
  emit('select', food)
  showList.value = false
  focused.value = false
}

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    showList.value = false
    model.value = model.value
    input.value?.blur()
  }
}
</script>

<template>
  <div class="mx-auto relative" :class="class">
    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg class="w-4 h-4 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>

    <input ref="input" type="search"
      class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#d7dbdd] focus:ring-blue-500 focus:border-blue-500 dark:bg-[#d7dbdd] dark:border-gray-600 dark:placeholder-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder" :value="model" @input="onInput" @keydown="onKeydown" />
    
    <div v-if="showResults" class="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg max-h-64 overflow-y-auto" id="results-list">
      <div class="p-3 cursor-pointer hover:bg-gray-200" 
           v-for="food in filteredData" 
           :key="food"
           :class="{ 'bg-gray-100': model && food === model }"
           @mousedown.prevent="onSelect(food)">
        {{food}}
      </div>
    </div>
  </div>
</template>
