<script setup>
const model = defineModel()

const { data, placeholder } = defineProps({
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
</script>

<template>
  <div class="mx-auto relative" :class="class">
    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg class="w-4 h-4 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input :list="id" type="search"
      class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#d7dbdd] focus:ring-blue-500 focus:border-blue-500 dark:bg-[#d7dbdd] dark:border-gray-600 dark:placeholder-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder" v-model="model" />
    <datalist :id="id">
      <option v-for="food in data" :value="food"></option>
    </datalist>
  </div>
</template>