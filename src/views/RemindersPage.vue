<script setup>
import { ref, watch, onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { Calendar } from 'v-calendar'
import InputSearch from '../components/InputSearch.vue'
import InputNumber from '../components/InputNumber.vue'
import InputDate from '../components/InputDate.vue'
import DropDown from '../components/DropDown.vue'
import FoodCard from '../components/FoodCard.vue'
import BaseButton from '../components/BaseButton.vue'
import Alert from '../components/Alert.vue'
import TableReminder from '../components/TableReminder.vue'
import ColumnChart from '../components/Charts/Column.vue'
import PieChart from '../components/Charts/Pie.vue'
import CheckBoxButtons from '../components/CheckBoxButtons.vue'
import { equivalentStore } from '../store/equivalentStore'
import { foodStore } from '../store/foodStore'
import { storeToRefs } from 'pinia'
import { remindersStore } from '../store/remindersStore'
import { chartsStore } from '../store/chartsStore'
import 'v-calendar/style.css';
import '../main.css'

const reminderStore = remindersStore()
const eqStore = equivalentStore()
const store = foodStore()
const chartStore = chartsStore()
const { patient, date, gender, meal_type, genders, meal_types, hide, has_error, error_message } = storeToRefs(reminderStore)
const { patient_names, patients, reminder_dates, current_patient, reminders } = storeToRefs(reminderStore)
const { equivalent_value } = storeToRefs(eqStore)
const { search, food_names, search_result } = storeToRefs(store)
const { macro_chart_title, column_chart_data, pie_chart_data, food } = storeToRefs(chartStore)
const { unit_type_selected, macro_type_selected, unit_types_options, macro_types_options } = storeToRefs(chartStore)
const { loadReminders, loadRemindersDates, registerReminder } = reminderStore
const { searchFood, find, calculate } = store
const { loadColumnChartData, loadPieChartData } = chartStore
const searchTimeout = ref(null)

const attrs = ref([
    {
        highlight: 'lilac',
        dates: new Date(),
    }
])

onMounted(() => {
    initFlowbite();
})


watch(patient, async () => {
    if (patient.value.length < 2) return
    const finded = patients.value.find(p => p.name.toLowerCase() == patient.value.toLowerCase())

    if (finded) {
        current_patient.value = finded
        gender.value = finded.gender
        await loadRemindersDates(finded.id)
        attrs.value.push({
            bar: 'lilac',
            dates: reminder_dates.value.map(d => {
                const [y, m, day] = d.split('-')
                return new Date(y, m - 1, day)
            }),
        })
    }
})

watch(search, () => {
    find()
})

watch(equivalent_value, () => {
    if (!search_result.value) return

    calculate()
})

watch(
    [patient, date, meal_type],
    () => {
        if (patient.value && date.value && meal_type.value) {
            console.log('searching reminders')
            loadReminders()
        }
    }
)

watch(
    [patient, date],
    () => {
        if (patient.value && date.value) {
            console.log('searching chart data')
            loadColumnChartData(patient.value, date.value)
            loadPieChartData(patient.value, date.value)
        }
    }
)

const onSearchInput = () => {
    if (search.value.length < 2) return
    if (searchTimeout.value) clearTimeout(searchTimeout.value)
    searchTimeout.value = setTimeout(() => {
        if (search.value.length == 0) return
        searchFood()
    }, 500)
}

const validateFields = () => {
    has_error.value = false
    error_message.value = ''
    if (!patient.value) {
        has_error.value = true
        error_message.value = 'Debes ingresar un nombre de paciente'
        return false
    }
    if (!date.value) {
        has_error.value = true
        error_message.value = 'Debes ingresar una fecha'
        return false
    }
    if (!gender.value) {
        has_error.value = true
        error_message.value = 'Debes ingresar un genero'
        return false
    }
    if (!meal_type.value) {
        has_error.value = true
        error_message.value = 'Debes ingresar un tipo de comida'
        return false
    }
    if (!search_result.value.id) {
        has_error.value = true
        error_message.value = 'Debes ingresar un alimento'
        return false
    }
    return true
}

const onSave = async () => {
    if (!validateFields()) return
    if (!equivalent_value.value) {
        equivalent_value.value = 1
    }
    const body = {
        patient: patient.value,
        date: date.value,
        gender: gender.value,
        meal_type: meal_type.value,
        food_id: search_result.value.id,
        equivalents: equivalent_value.value
    }
    try {
        const { data } = await registerReminder(body)
        current_patient.value = data.patient
        await loadRemindersDates(data.patient.id)
        await loadReminders()
        await loadColumnChartData(patient.value, date.value)
        await loadPieChartData(patient.value, date.value)
        attrs.value = [{
            highlight: 'lilac',
            dates: new Date(),
        }]
        attrs.value.push({
            bar: 'lilac',
            dates: reminder_dates.value.map(d => {
                const [y, m, day] = d.split('-')
                return new Date(y, m - 1, day)
            }),
        })
    } catch (error) {
        console.log("🚀 ~ onSave ~ error:", error)
        has_error.value = true
        error_message.value = error.message
    }
}

const onClean = () => {
    console.log('clean')
}
</script>

<template>
    <div class="py-5">
        <div class="flex gap-2">
            <div class="w-1/3 [&>div]:flex [&>div]:items-center [&>div]:gap-2 flex flex-col gap-2">
                <Alert class="w-full" v-if="has_error" :message="error_message" type="danger" />
                <div>
                    <label class="font-medium text-gray-900 dark:text-white">Nombre: </label>
                    <InputSearch id="patients" class="w-full" placeholder="Escribe el nombre de un paciente..."
                        v-model="patient" :data="patient_names" />
                </div>
                <div>
                    <label class="font-medium text-gray-900 dark:text-white">Fecha: </label>
                    <InputDate class="w-full" v-model="date" />
                </div>
                <div>
                    <label class="font-medium text-gray-900 dark:text-white">Genero: </label>
                    <DropDown id="genders" class="w-full" :options="genders" v-model="gender" />
                </div>
                <div>
                    <label class="font-medium text-gray-900 dark:text-white">Tipo de comida: </label>
                    <DropDown id="meal_types" class="w-full" :options="meal_types" v-model="meal_type" />
                </div>
                <div>
                    <label class="font-medium text-gray-900 dark:text-white">Alimento: </label>
                    <InputSearch id="food2" class="w-full" v-model="search" :data="food_names" @input="onSearchInput" />
                </div>
                <div>
                    <label class="font-medium text-gray-900 dark:text-white">Equivalentes: </label>
                    <InputNumber class="w-full" v-model="equivalent_value" placeholder="Equivalentes" />
                </div>
                <FoodCard :food="search_result" :hideFields="hide" />
            </div>
            <div class="flex flex-row gap-2  w-full">
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex justify-between gap-2">
                        <div>
                            <FoodCard class="w-full" :food="food" :hideFields="[...hide, 'category', 'quantity', 'unit', 'gross_weight', 'net_weight', 'fiber']" />
                            <CheckBoxButtons class="w-full" name="unit_type" :options="unit_types_options" v-model="unit_type_selected" />
                        </div>
                        <PieChart class="w-full" :data="pie_chart_data" />
                    </div>
                    <div>
                        <CheckBoxButtons class="w-full" name="macro_type" :options="macro_types_options" v-model="macro_type_selected" />
                        <ColumnChart class="w-full mt-2" :labels="meal_types" :title="macro_chart_title" :data="column_chart_data" />
                    </div>
                </div>
                <div class="max-w-xl flex flex-col gap-2">
                    <BaseButton class="w-full" @click="onSave">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm3 11a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H8v-6Zm1-7V5h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
                                clip-rule="evenodd" />
                            <path fill-rule="evenodd" d="M14 17h-4v-2h4v2Z" clip-rule="evenodd" />
                        </svg>
                        Guardar
                    </BaseButton>
                    <Calendar v-if="reminder_dates.length >= 1" class="w-full mx-auto" borderless is-dark transparent expanded
                        :attributes="attrs" :first-day-of-week="1" color="lilac" />
                    <TableReminder :reminders="reminders" />
                </div>
            </div>
        </div>
        <!-- <Toast message="Recordatorio guardado correctamente" type="success" /> -->
    </div>
</template>