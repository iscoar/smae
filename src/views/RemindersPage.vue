<script setup>
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
import SaveIcon from '../components/Icons/Save.vue'
import LoadingIcon from '../components/Icons/Loading.vue'
import ReminderForm from '../components/Reminders/ReminderForm.vue'
import { useReminders } from '../composables/reminders'
import 'v-calendar/style.css';
import '../main.css'

const {
    patient,
    patient_names,
    date,
    gender,
    genders,
    meal_type,
    meal_types,
    search,
    food_names,
    search_result,
    food,
    food_props,
    equivalent_value,
    attrs,
    isSaving,
    has_error,
    error_message,
    hide,
    reminders,
    reminder_dates,
    macro_chart_title,
    column_chart_data,
    pie_chart_data,
    unit_type_selected,
    macro_type_selected,
    unit_types_options,
    macro_types_options,
    onSearchInput,
    onSearchInputPatient,
    onSave,
    onDayClick
} = useReminders()

</script>

<template>
    <div class="py-5">
        <div class="flex flex-row gap-2">
            <div class="flex flex-col gap-2">
                <Alert class="w-full" v-if="has_error" :message="error_message" type="danger" />
                <ReminderForm
                    v-model:patient="patient"
                    v-model:date="date"
                    v-model:gender="gender"
                    v-model:meal_type="meal_type"
                    v-model:search="search"
                    v-model:equivalent_value="equivalent_value"
                    :patient_names="patient_names"
                    :genders="genders"
                    :meal_types="meal_types"
                    :food_names="food_names"
                    @onSearchInput="onSearchInput"
                    @onSearchInputPatient="onSearchInputPatient"
                />
                <div class="flex flex-row gap-2  w-full">
                    <FoodCard class="min-w-60" :food="search_result" :hideFields="hide" color="bg-[#DDA0DD]" :fields="food_props" />
                    <div class="flex flex-col gap-2 w-full">
                        <div class="flex justify-between gap-2">
                            <div class="w-full">
                                <FoodCard class="w-full" :food="food"
                                    :hideFields="[...hide, 'category', 'quantity', 'unit', 'gross_weight', 'net_weight', 'fiber']" :fields="food_props" />
                                <CheckBoxButtons class="w-full" name="unit_type" :options="unit_types_options"
                                    v-model="unit_type_selected" />
                            </div>
                            <PieChart class="w-full" :data="pie_chart_data" />
                        </div>
                    </div>
                </div>
                <div>
                    <CheckBoxButtons class="w-full" name="macro_type" :options="macro_types_options"
                        v-model="macro_type_selected" />
                    <ColumnChart class="w-full mt-2" :labels="meal_types" :title="macro_chart_title"
                        :data="column_chart_data" />
                </div>
            </div>
            <div class="max-w-xl flex flex-col gap-2">
                <BaseButton class="w-full" @click="onSave" :disabled="isSaving">
                    <template v-if="isSaving">
                        <LoadingIcon />
                        Guardando...
                    </template>
                    <template v-else>
                        <SaveIcon />
                        Guardar
                    </template>
                </BaseButton>
                <Calendar v-if="reminder_dates.length >= 1" class="w-full mx-auto" borderless transparent
                    expanded :attributes="attrs" :first-day-of-week="1" color="lilac" @dayclick="onDayClick" />
                <TableReminder :reminders="reminders" />
            </div>
        </div>
        <!-- <Toast message="Recordatorio guardado correctamente" type="success" /> -->
    </div>
</template>