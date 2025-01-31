<script setup>
import { onMounted, watch, ref } from 'vue'
import { Datepicker } from 'flowbite'

const model = defineModel()
const picker = ref(null)
const input = ref()

onMounted(() => {
    const element = document.getElementById('default-datepicker');

    element.addEventListener('changeDate', set)

    picker.value = new Datepicker(element)

    // if (props.date)
    //     picker.value.setEmit(new Date(props.date))
})

function set(event) {
  input.value = formatDateISO(event.detail.date)
  picker.value.hide()
}

function formatDateISO(date) {
    // Convert the date to ISO string
    const isoString = date.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split("T")[0];
    return formattedDate;
};

watch(input, (value) => {
  if (!value)
    return

  model.value = value
})
</script>

<template>
    <div class="relative max-w-sm">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-900 dark:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
        </div>
        <input datepicker datepicker-buttons datepicker-autoselect-today id="default-datepicker" type="text"
            class="bg-[#d7dbdd] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-4 dark:bg-[#d7dbdd] dark:border-gray-600 dark:placeholder-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Selecciona una fecha" autocomplete="off" />
    </div>
</template>