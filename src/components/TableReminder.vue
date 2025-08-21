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
    <table class="w-full text-sm text-left rtl:text-right text-gray-900">
      <thead class="text-xs text-gray-900 uppercase bg-[#76d7c4]">
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
        <tr v-for="food in reminders" class="bg-[#f2f3f4] border-b dark:border-gray-700 hover:bg-[#f2f3f4]/[.5]">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ food.name }}
          </th>
          <td class="px-6 py-4">{{ food.equivalents }}</td>
          <td class="px-6 py-4">{{ food.category }}</td>
          <td class="px-6 py-4">{{ typeof food.quantity === 'number' ? food.quantity.toFixed(2) : food.quantity }}</td>
          <td class="px-6 py-4">{{ food.unit }}</td>
        </tr>
      </tbody>
      <tfoot v-if="reminders.length === 0">
        <tr class="bg-[#f2f3f4]">
          <td colspan="5" class="px-6 py-4 font-medium text-gray-900">
            No hay más alimentos
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>