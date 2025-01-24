import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getRemindersByFilter } from '../api/reminderService';

export const chartsStore = defineStore('charts', () => {
    const column_data = ref([])
    const pie_data = ref({ grams: {}, energy: {} })
    const unit_type_selected = ref('energy2')
    const macro_type_selected = ref('energy')
    const unit_types_options = ref([
        { name: 'Energía', value: 'energy2' },
        { name: 'Gramos', value: 'grams' },
    ])
    const macro_types_options = ref([
        { name: 'Energía', value: 'energy' },
        { name: 'Proteínas', value: 'proteins' },
        { name: 'Lípidos', value: 'lipids' },
        { name: 'Carbohidratos', value: 'carbohydrates' },
    ])

    const macro_chart_title = computed(() => {
        const title = macro_types_options.value.find(({ value }) => value === macro_type_selected.value)
        return title ? title.name : ''
    })

    const column_chart_data = computed(() => {
        return column_data.value.map(meal_type => {
            return meal_type.nutrients[macro_type_selected.value]
        })
    })

    const pie_chart_data = computed(() => {
        const { energy, ...rest } = pie_data.value.grams

        return Object.values(rest)
    })

    const food = computed(() => {
        if (pie_data.value.length === 0) return []
        if (unit_type_selected.value === 'energy2') return pie_data.value.energy
        if (unit_type_selected.value === 'grams') return pie_data.value.grams
        return {}
    })


    async function loadColumnChartData(patient, date) {
        const { data } = await getRemindersByFilter({
            patient,
            date,
            type: 'macro'
        })
        column_data.value = data
    }

    async function loadPieChartData(patient, date) {
        const { data } = await getRemindersByFilter({
            patient,
            date,
            type: 'units'
        })
        pie_data.value = data
    }

    return {
        macro_chart_title,
        column_chart_data,
        pie_chart_data,
        unit_type_selected,
        macro_type_selected,
        unit_types_options,
        macro_types_options,
        food,
        loadColumnChartData,
        loadPieChartData
    }
})
