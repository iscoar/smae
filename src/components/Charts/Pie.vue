<script setup>
import { ref, watch } from 'vue'

const {  data } = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const type = ref('pie')
const series = ref(data)
const options = ref({
  chart: {
    id: 'vuechart-example2',
    type: type.value
  },
  colors: ['#c8a2c8', '#7c597c', '#371938'],
  labels: ['Proteinas', 'Carbohidratos', 'Lípidos'],
  legend: {
    position: 'bottom',
    fontSize: '16px',
    fontWeight: 600,
  },
})

watch(() => data, (newData) => {
  series.value = newData
})
</script>

<template>

  <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">

    <div class="flex justify-center items-start w-full">
      <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
        Distribucion de Macros
      </h5>
    </div>

    <apexchart :type="type" :options="options" :series="series" />
  </div>

</template>