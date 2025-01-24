import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getRemindersByFilter, getRemindersDates, saveReminder } from '../api/reminderService';
import { getAllPatients } from '../api/patientService';

export const remindersStore = defineStore('reminders', () => {
    const patient = ref('')
    const date = ref('')
    const gender = ref('')
    const meal_type = ref('')

    const current_patient = ref({})
    const patients = ref([])
    const reminders = ref([])
    const reminder_dates = ref([])

    const genders = ref(['Masculino', 'Femenino'])
    const meal_types = ref(['Desayuno', 'Colación 1', 'Comida', 'Colación 2', 'Cena'])
    const hide = ref(['saturated_fa', 'monounsaturated_fa', 'polyunsaturated_fa', 'cholesterol', 'sugar', 'vitamin_a', 'ascorbic_acid', 'folic_acid', 'calcium', 'iron', 'potassium', 'sodium', 'phosphorus', 'ethanol', 'ig', 'glycemic_load'])
    const has_error = ref(false)
    const error_message = ref('')

    const patient_names = computed(() => patients.value.map(({ name }) => name))

    async function loadPatients() {
        const { data } = await getAllPatients()
        patients.value = data
    }

    async function loadReminders() {
        const { data } = await getRemindersByFilter({
            patient: patient.value,
            date: date.value,
            meal_type: meal_type.value
        })
        reminders.value = data
    }

    async function loadRemindersDates(id) {
        const { data } = await getRemindersDates(id)
        reminder_dates.value = data
    }

    async function registerReminder(reminder) {
        return saveReminder(reminder)
    }

    loadPatients()

    return {
        patient,
        date,
        gender,
        meal_type,
        genders,
        meal_types,
        hide,
        has_error,
        error_message,
        patients,
        patient_names,
        current_patient,
        reminders,
        reminder_dates,
        registerReminder,
        loadReminders,
        loadRemindersDates,
    };
});