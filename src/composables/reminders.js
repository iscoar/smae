import { ref, watch, onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { equivalentStore } from '../store/equivalentStore'
import { foodStore } from '../store/foodStore'
import { storeToRefs } from 'pinia'
import { remindersStore } from '../store/remindersStore'
import { chartsStore } from '../store/chartsStore'

export const useReminders = () => {
    const reminderStore = remindersStore()
    const eqStore = equivalentStore()
    const store = foodStore()
    const chartStore = chartsStore()
    const { patient, date, gender, meal_type, genders, meal_types, hide, has_error, error_message } = storeToRefs(reminderStore)
    const { patient_names, patients, reminder_dates, current_patient, reminders } = storeToRefs(reminderStore)
    const { equivalent_value } = storeToRefs(eqStore)
    const { search, food_names, search_result, food_props } = storeToRefs(store)
    const { macro_chart_title, column_chart_data, pie_chart_data, food } = storeToRefs(chartStore)
    const { unit_type_selected, macro_type_selected, unit_types_options, macro_types_options } = storeToRefs(chartStore)
    const { loadReminders, loadRemindersDates, registerReminder } = reminderStore
    const { searchFood, find, calculate } = store
    const { loadColumnChartData, loadPieChartData } = chartStore
    const searchTimeout = ref(null)
    const isSaving = ref(false)

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
                loadReminders()
            }
        }
    )

    watch(
        [patient, date],
        () => {
            if (patient.value && date.value) {
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
        }, 200)
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
        isSaving.value = true
        const _date = formatDateISO(date.value)
        const body = {
            patient: patient.value,
            date: _date,
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
        } finally {
            isSaving.value = false
        }
    }

    const onClean = () => {
        console.log('clean')
    }

    const onDayClick = (_date) => {
        date.value = _date.date;
    }

    const formatDateISO = (date) => {
        // Convert the date to ISO string
        const isoString = date.toISOString();
        // Split at the "T" character to get the date part
        const formattedDate = isoString.split("T")[0];
        return formattedDate;
    };

    return {
        patient,
        patient_names,
        patients,
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
        onSave,
        onDayClick,
        onClean
    }
}