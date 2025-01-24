import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { getAllFoodByName, getAllFoodById } from '../api/foodService'
import { equivalentStore } from './equivalentStore'

export const foodStore = defineStore('food', () => {
  const eqStore = equivalentStore()
  const { equivalent_value } = storeToRefs(eqStore) 
  const food = ref([])
  const search = ref('')
  const search_result = ref({})
  const first_search = ref({})
  
  const food_names = computed(() => food.value.map(({ name }) => name))

  function clean_text(text) {
    return text.trim().toLowerCase()
  }

  async function searchFood() {
    const { data } = await getAllFoodByName(search.value)
    food.value = data
  }

  async function find() {
    const result = food.value.find(({ name }) => clean_text(name) === clean_text(search.value))

    if (result === undefined) return

    const _result = await searhFoodInfo(result.id)

    search_result.value = mapResult(_result)
    first_search.value = _result
  }

  async function searhFoodInfo(id) {
    const { data } = await getAllFoodById(id)
    return data
  }

  function calculate() {
    search_result.value = mapResult(first_search.value)
  }

  function mapResult(result) {
    const equivalent = equivalent_value.value ?? 1

    return {
      ...result,
      equivalent,
      quantity: result.suggested_quantity * equivalent,
      gross_weight: result.gross_weight * equivalent,
      net_weight: result.net_weight * equivalent,
      energy: result.energy * equivalent,
      proteins: convertNumber(result.proteins * equivalent),
      lipids: convertNumber(result.lipids * equivalent),
      carbohydrates: convertNumber(result.carbohydrates * equivalent),
      saturated_fa: result.saturated_fa == 'ND' ? result.saturated_fa : convertNumber(result.saturated_fa * equivalent),
      monounsaturated_fa: result.monounsaturated_fa == 'ND' ? result.monounsaturated_fa : convertNumber(result.monounsaturated_fa * equivalent),
      polyunsaturated_fa: result.polyunsaturated_fa == 'ND' ? result.polyunsaturated_fa : convertNumber(result.polyunsaturated_fa * equivalent),
      cholesterol: result.cholesterol == 'ND' ? result.cholesterol : convertNumber(result.cholesterol * equivalent),
      sugar: result.sugar == 'ND' ? result.sugar : convertNumber(result.sugar * equivalent),
      fiber: result.fiber == 'ND' ? result.fiber : convertNumber(result.fiber * equivalent),
      vitamin_a: result.vitamin_a == 'ND' ? result.vitamin_a : convertNumber(result.vitamin_a * equivalent),
      ascorbic_acid: result.ascorbic_acid == 'ND' ? result.ascorbic_acid : convertNumber(result.ascorbic_acid * equivalent),
      folic_acid: result.folic_acid == 'ND' ? result.folic_acid : convertNumber(result.folic_acid * equivalent),
      calcium: result.calcium == 'ND' ? result.calcium : convertNumber(result.calcium * equivalent),
      iron: result.iron == 'ND' ? result.iron : convertNumber(result.iron * equivalent),
      potassium: result.potassium == 'ND' ? result.potassium : convertNumber(result.potassium * equivalent),
      sodium: result.sodium == 'ND' ? result.sodium : convertNumber(result.sodium * equivalent),
      phosphorus: result.phosphorus == 'ND' ? result.phosphorus : convertNumber(result.phosphorus * equivalent),
      ethanol: result.ethanol == 'ND' ? result.ethanol : convertNumber(result.ethanol * equivalent),
      ig: result.ig == 'ND' ? result.ig : convertNumber(result.ig * equivalent),
      glycemic_load: result.glycemic_load == 'ND' ? result.glycemic_load : convertNumber(result.glycemic_load * equivalent),
    }

    function convertNumber(number) {
      return parseFloat((number).toFixed(2))
    }
  }

  return { search, search_result, food_names, searchFood, find, calculate }
})