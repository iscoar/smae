<script setup>
const { header, value, color } = defineProps(['header', 'value', 'color'])
</script>

<template>
  <tr :class="color" class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:dark:bg-[#76d7c4]/[.5]">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ header }}
    </th>
    <td class="text-gray-800">
      {{ typeof value === 'number' ? value.toFixed(2) : value }}
    </td>
  </tr>
</template>