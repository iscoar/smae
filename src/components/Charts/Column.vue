<script setup>
import { ref, watch } from 'vue'
const { labels, title, data } = defineProps({
  labels: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  }
})
const type = ref('bar')
const series = ref([
  {
    name: 'Tiempos de Comida',
    data: data,
    color: "#c8a2c8",
  }
])
const height = ref('320')
const options = ref({
  chart: {
    id: 'vuechart-example'
  },
  xaxis: {
    categories: labels
  }
})
const numberFormat = (value) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

watch(() => data, (newData) => {
  series.value = [
    {
      name: 'Tiempos de Comida',
      data: newData.map((value) => numberFormat(value)),
      color: "#c8a2c8",
    }
  ]
})
</script>

<template>

  <div class="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
      <h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
        {{ title }}
      </h5>
    </div>

    <apexchart :height="height" :type="type" :options="options" :series="series" />
  </div>

</template>