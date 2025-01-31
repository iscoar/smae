<script setup>
const model = defineModel()

const { placeholder } = defineProps(['placeholder'])
</script>

<template>
  <div class="max-w-l mx-auto relative">
    <input type="number"
      class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#d7dbdd] focus:ring-blue-500 focus:border-blue-500 dark:bg-[#d7dbdd] dark:border-gray-600 dark:placeholder-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      v-model="model" :placeholder="placeholder" />
  </div>
</template>