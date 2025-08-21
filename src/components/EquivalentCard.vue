<script setup>
import FoodCardItem from './FoodCardItem.vue';

const { equivalents, color, fields } = defineProps({
  equivalents: {
    type: Object,
    default: () => ({})
  },
  color: {
    type: String,
    default: 'bg-[#76d7c4]'
  },
  fields: {
    type: Array,
    default: () => []
  },
})
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-900 uppercase bg-[#76d7c4]">
        <tr>
          <th scope="col" class="px-6 py-3">
            Categoria
          </th>
          <th scope="col" class="px-6 py-3">
            Equivalentes
          </th>
        </tr>
      </thead>
      <tbody>
        <FoodCardItem
          v-for="field in fields"
          :key="field.key"
          :header="field.value"
          :value="equivalents[field.key]"
          :color="color"
        />
      </tbody>
    </table>
  </div>
</template>