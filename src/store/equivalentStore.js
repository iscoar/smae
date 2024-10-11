import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllCategories } from '../api/equivalentService'

export const equivalentStore = defineStore('equivalent', () => {
  const equivalents = ref({})
  const equivalent_value = ref(undefined)
  const categories = ref(getAllCategories())

  function initEquivalents() {
    equivalents.value = {
      fruits: 0,
      fats_without_pretein: 0,
      vegetables: 0,
      free_energy: 0,
      aoa_mbag: 0,
      milk_with_sugar: 0,
      fat_free_sugars: 0,
      sugars_with_fat: 0,
      fats_with_protein: 0,
      alcohol: 0,
      aoa_bag: 0,
      aoa_aag: 0,
      sg_cereals: 0,
      legumes: 0,
      cg_cereals: 0,
      aoa_mag: 0,
      skim_milk: 0,
      milk: 0,
      semi_skimmed_milk: 0,
    }
  }

  initEquivalents()

  function setEquivalent(key, value) {
    const new_equivalents = equivalents.value
    new_equivalents[key] += value

    equivalents.value = new_equivalents
    equivalent_value.value = undefined
  }

  function findCategory(search) {
    return categories.value.find(({ value }) => value === search)
  }

  function resetEquivalents() {
    initEquivalents()
  }

  return { equivalents, equivalent_value, setEquivalent, findCategory, resetEquivalents }
})