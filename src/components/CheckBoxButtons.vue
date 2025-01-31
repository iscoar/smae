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
                class="flex items-center justify-center w-full h-full p-5 text-gray-900 bg-[#eafaf1] border border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 dark:peer-checked:text-[#7c597c] peer-checked:border-[#7c597c] peer-checked:text-[#eafaf1] hover:text-gray-700 hover:bg-[#eafaf1]/[.5]">
                <div class="block">
                    <div class="w-full text-md font-semibold">{{ option.name }}</div>
                </div>
            </label>
        </li>
    </ul>
</template>