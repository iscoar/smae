<script setup>
const { data } = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  totals: {
    type: Object,
    default: () => ([])
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
          <th scope="col" class="px-6 py-3">
            Peso bruto, g
          </th>
          <th scope="col" class="px-6 py-3">
            Peso neto, g
          </th>
          <th scope="col" class="px-6 py-3">
            Energía
          </th>
          <th scope="col" class="px-6 py-3">
            Proteínas
          </th>
          <th scope="col" class="px-6 py-3">
            Lípidos
          </th>
          <th scope="col" class="px-6 py-3">
            Carbohidratos
          </th>
          <th scope="col" class="px-6 py-3">
            AG saturados (g)
          </th>
          <th scope="col" class="px-6 py-3">
            AG monoinsaturados (g)
          </th>
          <th scope="col" class="px-6 py-3">
            AG poliinsaturados (g)
          </th>
          <th scope="col" class="px-6 py-3">
            Colesterol (mg)
          </th>
          <th scope="col" class="px-6 py-3">
            Azúcar (g)
          </th>
          <th scope="col" class="px-6 py-3">
            Fibra, g
          </th>
          <th scope="col" class="px-6 py-3">
            Vitamina A (mg RE)
          </th>
          <th scope="col" class="px-6 py-3">
            Ácido ascórbico (mg)
          </th>
          <th scope="col" class="px-6 py-3">
            Acido Fólico (mg)
          </th>
          <th scope="col" class="px-6 py-3">
            Calcio (mg)
          </th>
          <th scope="col" class="px-6 py-3">
            Hierro (mg)
          </th>
          <th scope="col" class="px-6 py-3">
            Potasio (mg)
          </th>
          <th scope="col" class="px-6 py-3">
            Sodio (mg)
          </th>
          <th scope="col" class="px-6 py-3">
            Fósforo (mg)
          </th>
          <th scope="col" class="px-6 py-3">
            Etanol (g)
          </th>
          <th scope="col" class="px-6 py-3">
            IG
          </th>
          <th scope="col" class="px-6 py-3">
            Carga glicémica
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in data"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ food.name }}
          </th>
          <td class="px-6 py-4">{{ food.equivalent }}</td>
          <td class="px-6 py-4">{{ food.category }}</td>
          <td class="px-6 py-4">{{ food.quantity }}</td>
          <td class="px-6 py-4">{{ food.unit }}</td>
          <td class="px-6 py-4">{{ food.gross_weight }}</td>
          <td class="px-6 py-4">{{ food.net_weight }}</td>
          <td class="px-6 py-4">{{ food.energy }}</td>
          <td class="px-6 py-4">{{ food.proteins }}</td>
          <td class="px-6 py-4">{{ food.lipids }}</td>
          <td class="px-6 py-4">{{ food.carbohydrates }}</td>
          <td class="px-6 py-4">{{ food.saturated_fa }}</td>
          <td class="px-6 py-4">{{ food.monounsaturated_fa }}</td>
          <td class="px-6 py-4">{{ food.polyunsaturated_fa }}</td>
          <td class="px-6 py-4">{{ food.cholesterol }}</td>
          <td class="px-6 py-4">{{ food.sugar }}</td>
          <td class="px-6 py-4">{{ food.fiber }}</td>
          <td class="px-6 py-4">{{ food.vitamin_a }}</td>
          <td class="px-6 py-4">{{ food.ascorbic_acid }}</td>
          <td class="px-6 py-4">{{ food.folic_acid }}</td>
          <td class="px-6 py-4">{{ food.calcium }}</td>
          <td class="px-6 py-4">{{ food.iron }}</td>
          <td class="px-6 py-4">{{ food.potassium }}</td>
          <td class="px-6 py-4">{{ food.sodium }}</td>
          <td class="px-6 py-4">{{ food.phosphorus }}</td>
          <td class="px-6 py-4">{{ food.ethanol }}</td>
          <td class="px-6 py-4">{{ food.ig }}</td>
          <td class="px-6 py-4">{{ food.glycemic_load }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="font-semibold text-gray-900 dark:text-white">
          <th scope="row" class="px-6 py-3 text-base">Total</th>
          <td class="px-6 py-3">{{ convertNumber(totals.equivalent) }}</td>
          <td class="px-6 py-3"></td>
          <td class="px-6 py-3">{{ convertNumber(totals.quantity) }}</td>
          <td class="px-6 py-3"></td>
          <td class="px-6 py-3">{{ convertNumber(totals.gross_weight) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.net_weight) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.energy) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.proteins) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.lipids) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.carbohydrates) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.saturated_fa) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.monounsaturated_fa) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.polyunsaturated_fa) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.cholesterol) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.sugar) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.fiber) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.vitamin_a) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.ascorbic_acid) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.folic_acid) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.calcium) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.iron) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.potassium) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.sodium) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.phosphorus) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.ethanol) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.ig) }}</td>
          <td class="px-6 py-3">{{ convertNumber(totals.glycemic_load) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>