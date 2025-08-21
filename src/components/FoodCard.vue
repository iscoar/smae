<script setup>
import FoodCardItem from './FoodCardItem.vue';

const { food, hideFields, fields } = defineProps({
  food: {
    type: Object,
    default: () => ({})
  },
  hideFields: {
    type: Array,
    default: () => []
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
      <tbody>
        <template v-for="field in fields">
          <FoodCardItem
            :key="field.key"
            v-if="!hideFields.includes(field.key)"
            :header="field.label"
            :value="food[field.key]"
            :color="color"
          />
        </template>
      </tbody>
    </table>
  </div>
</template>