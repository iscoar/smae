<script setup>
const { header, value } = defineProps(['header', 'value'])
</script>

<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {{ header }}
    </th>
    <td>{{ value }}</td>
  </tr>
</template>