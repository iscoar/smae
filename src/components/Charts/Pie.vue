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
  colors: ['#2874a6', '#FF69B4', '#f1c40f'],
  labels: ['Proteinas', 'Carbohidratos', 'Lípidos'],
  legend: {
    position: 'bottom',
    fontSize: '16px',
    fontWeight: 600,
  },
  dataLabels: {
    style: {
      colors: ['black']
    }
  }
})

watch(() => data, (newData) => {
  series.value = newData
})
</script>

<template>

  <div class="max-w-sm w-full bg-[#f2f3f4] rounded-lg shadow p-4 md:p-6">

    <div class="flex justify-center items-start w-full">
      <h5 class="text-xl font-bold leading-none text-gray-900 me-1">
        Distribucion de Macros
      </h5>
    </div>

    <apexchart :type="type" :options="options" :series="series" />
  </div>

</template>