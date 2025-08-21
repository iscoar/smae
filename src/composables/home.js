import { foodStore } from '../store/foodStore'
import { equivalentStore } from '../store/equivalentStore'
import { storeToRefs } from 'pinia'
import { mockDBStore } from '../store/mockDBStore'
import { ref, watch } from 'vue'

export const useHome = () => {
    const eqStore = equivalentStore()
    const store = foodStore()
    const dbStore = mockDBStore()
    const { equivalents, equivalent_value, categories } = storeToRefs(eqStore)
    const { search, food_names, search_result, food_props } = storeToRefs(store)
    const { findCategory, setEquivalent, resetEquivalents } = eqStore
    const { saveRegister, deleteRegisters } = dbStore
    const { searchFood, find, calculate } = store
    const searchTimeout = ref(null)

    watch(search, () => {
        find()
    })

    watch(equivalent_value, () => {
        if (!search_result.value) return

        calculate()
    })

    const onSearchInput = () => {
        if (search.value.length < 2) return
        if (searchTimeout.value) clearTimeout(searchTimeout.value)
        searchTimeout.value = setTimeout(() => {
            if (search.value.length == 0) return
            searchFood()
        }, 200)
    }

    const onSave = () => {
        if (!equivalent_value.value) return

        const category = findCategory(search_result.value.category)
        saveRegister(search_result.value)
        setEquivalent(category.key, equivalent_value.value)
    }

    const onClean = () => {
        resetEquivalents()
        deleteRegisters()
    }

    return {
        search,
        food_names,
        search_result,
        food_props,
        equivalent_value,
        equivalents,
        categories,
        onSearchInput,
        onSave,
        onClean
    }
}
