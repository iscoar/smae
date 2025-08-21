<script setup>
import InputSearch from '../InputSearch.vue'
import InputDate from '../InputDate.vue'
import DropDown from '../DropDown.vue'
import InputNumber from '../InputNumber.vue'

const {
    patient_names,
    genders,
    meal_types,
    food_names
} = defineProps(['patient_names', 'genders', 'meal_types', 'food_names'])

const emit = defineEmits(['onSearchInput', 'onSearchInputPatient'])

const patient = defineModel('patient')
const date = defineModel('date')
const gender = defineModel('gender')
const meal_type = defineModel('meal_type')
const search = defineModel('search')
const equivalent_value = defineModel('equivalent_value')

const onSearchInput = (value) => {
    search.value = value
    emit('onSearchInput')
}

const onFoodSelect = (value) => {
    search.value = value
    emit('onSearchInput')
}

const onSearchInputPatient = (value) => {
    patient.name = value
    emit('onSearchInputPatient')
}

const onPatientSelect = (value) => {
    patient.name = value
    emit('onSearchInputPatient')
}
</script>

<template>
    <div class="[&>div]:flex [&>div]:flex-col [&>div]:gap-2 flex flex-wrap gap-2">
        <div>
            <label class="font-medium text-gray-900">Nombre: </label>
            <InputSearch id="patients" class="w-full min-w-72" placeholder="Escribe el nombre de un paciente..."
                v-model="patient" :data="patient_names" @input="onSearchInputPatient" @select="onPatientSelect" />
        </div>
        <div>
            <label class="font-medium text-gray-900">Fecha: </label>
            <InputDate class="w-full" v-model="date" />
        </div>
        <div>
            <label class="font-medium text-gray-900">Genero: </label>
            <DropDown id="genders" class="w-full" :options="genders" v-model="gender" />
        </div>
        <div>
            <label class="font-medium text-gray-900">Tipo de comida: </label>
            <DropDown id="meal_types" class="w-full" :options="meal_types" v-model="meal_type" />
        </div>
        <div>
            <label class="font-medium text-gray-900">Alimento: </label>
            <InputSearch id="food2" class="w-full min-w-96" v-model="search" :data="food_names" @input="onSearchInput" @select="onFoodSelect" />
        </div>
        <div>
            <label class="font-medium text-gray-900">Equivalentes: </label>
            <InputNumber class="w-full" v-model="equivalent_value" placeholder="Equivalentes" />
        </div>
    </div>
</template>