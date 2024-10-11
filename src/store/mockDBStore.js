import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { properties } from '../utils/foodProperties'

export const mockDBStore = defineStore('database', () => {
  const data = ref([])
  const totals = computed(() =>
    data.value.reduce(
      (acc, f) => ({
        equivalent: acc.equivalent + f.equivalent,
        quantity: acc.quantity + f.quantity,
        gross_weight: acc.gross_weight + f.gross_weight,
        net_weight: acc.net_weight + f.net_weight,
        energy: acc.energy + f.energy,
        proteins: acc.proteins + f.proteins,
        lipids: acc.lipids + f.lipids,
        carbohydrates: acc.carbohydrates + f.carbohydrates,
        saturated_fa: f.saturated_fa == 'ND' ? acc.saturated_fa : acc.saturated_fa + f.saturated_fa,
        monounsaturated_fa: f.monounsaturated_fa == 'ND' ? acc.monounsaturated_fa : acc.monounsaturated_fa + f.monounsaturated_fa,
        polyunsaturated_fa: f.polyunsaturated_fa == 'ND' ? acc.polyunsaturated_fa : acc.polyunsaturated_fa + f.polyunsaturated_fa,
        cholesterol: f.cholesterol == 'ND' ? acc.cholesterol : acc.cholesterol + f.cholesterol,
        sugar: f.sugar == 'ND' ? acc.sugar : acc.sugar + f.sugar,
        fiber: f.fiber == 'ND' ? acc.fiber : acc.fiber + f.fiber,
        vitamin_a:
          f.vitamin_a == 'ND' ? acc.vitamin_a : acc.vitamin_a + f.vitamin_a,
        ascorbic_acid:
          f.ascorbic_acid == 'ND'
            ? acc.ascorbic_acid
            : acc.ascorbic_acid + f.ascorbic_acid,
        folic_acid:
          f.folic_acid == 'ND' ? acc.folic_acid : acc.folic_acid + f.folic_acid,
        calcium: f.calcium == 'ND' ? acc.calcium : acc.calcium + f.calcium,
        iron: f.iron == 'ND' ? acc.iron : acc.iron + f.iron,
        potassium:
          f.potassium == 'ND' ? acc.potassium : acc.potassium + f.potassium,
        sodium: f.sodium == 'ND' ? acc.sodium : acc.sodium + f.sodium,
        phosphorus:
          f.phosphorus == 'ND' ? acc.phosphorus : acc.phosphorus + f.phosphorus,
        ethanol: f.ethanol == 'ND' ? acc.ethanol : acc.ethanol + f.ethanol,
        ig: f.ig == 'ND' ? acc.ig : acc.ig + f.ig,
        glycemic_load:
          f.glycemic_load == 'ND'
            ? acc.glycemic_load
            : acc.glycemic_load + f.glycemic_load
      }),
      properties
    )
  )

  function saveRegister (food) {
    data.value.push({
      ...food
    })
  }

  function deleteRegisters () {
    data.value = []
  }

  return { data, totals, saveRegister, deleteRegisters }
})
