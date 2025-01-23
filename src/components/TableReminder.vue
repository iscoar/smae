<script setup>
const { reminders } = defineProps({
  reminders: {
    type: Array,
    default: () => []
  }
})

function convertNumber(number) {
  if (number == 'ND') return number

  return parseFloat((number).toFixed(2))
}
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Alimento
          </th>
          <th scope="col" class="px-6 py-3">
            Equivalentes
          </th>
          <th scope="col" class="px-6 py-3">
            Categoria
          </th>
          <th scope="col" class="px-6 py-3">
            Cantidad
          </th>
          <th scope="col" class="px-6 py-3">
            Unidad
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in reminders"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ food.name }}
          </th>
          <td class="px-6 py-4">{{ food.equivalents }}</td>
          <td class="px-6 py-4">{{ food.category }}</td>
          <td class="px-6 py-4">{{ food.quantity }}</td>
          <td class="px-6 py-4">{{ food.unit }}</td>
        </tr>
      </tbody>
      <tfoot v-if="reminders.length === 0">
        <tr class="bg-gray-50 dark:bg-gray-700">
          <td colspan="5" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
            No hay más alimentos
        </td>
        </tr>
        </tfoot>
    </table>
  </div>
</template>