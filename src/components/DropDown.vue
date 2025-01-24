<script setup>
import { defineModel, defineProps, ref, watch } from 'vue'
const model = defineModel()
const selected = ref('')

const { options } = defineProps({
    options: {
        type: Array,
        default: () => []
    },
    id: {
        type: String,
        default: ''
    },
    class: {
        type: String,
        default: ''
    }
})

watch(model, () => {
    selected.value = model.value
})

const onSelect = (option) => {
    selected.value = option
    model.value = option
}
</script>

<template>

    <button :id="'dropdown'+id" :data-dropdown-toggle="id"
        :class="class"
        class="text-white bg-[#C8A2C8] hover:bg-[#C8A2C8]/[.5] focus:ring-4 focus:outline-none focus:ring-[#C8A2C8]/[1.5] font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center justify-between dark:bg-[#C8A2C8] dark:hover:bg-[#C8A2C8]/[.5] dark:focus:ring-[#C8A2C8]/[.5]"
        type="button">
        <span v-if="selected">{{ selected }}</span>
        <span v-else>Selecciona una opción...</span>
        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 4 4 4-4" />
        </svg>
    </button>

    <!-- Dropdown menu -->
    <div :id="id" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" :aria-labelledby="'dropdown'+id">
            <li v-for="option in options" :key="option" @click="onSelect(option)">
                <a href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {{ option }}
                </a>
            </li>
        </ul>
    </div>

</template>