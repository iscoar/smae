<script setup>
const model = defineModel()
defineProps({
    name: String,
    options: Array,
})

</script>

<template>
    <ul class="grid w-full gap-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        <li v-for="option in options" :key="option.value" class="h-full">
            <input type="radio" :id="option.value" :name="name" :value="option.value" class="hidden peer"
                v-model="model" />
            <label :for="option.value"
                class="flex items-center justify-center w-full h-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-[#C8A2C8] peer-checked:border-[#C8A2C8] peer-checked:text-[#C8A2C8] hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div class="block">
                    <div class="w-full text-md font-semibold">{{ option.name }}</div>
                </div>
            </label>
        </li>
    </ul>
</template>