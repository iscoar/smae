<script setup>
import FoodCardItem from './FoodCardItem.vue';

const { food, hideFields } = defineProps({
  food: {
    type: Object,
    default: () => ({})
  },
  hideFields: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <tbody>
        <FoodCardItem v-if="!hideFields.includes('category')" header="Categoria" :value="food.category" />
        <FoodCardItem v-if="!hideFields.includes('quantity')" header="Cantidad" :value="food.quantity" />
        <FoodCardItem v-if="!hideFields.includes('unit')" header="Unidad" :value="food.unit" />
        <FoodCardItem v-if="!hideFields.includes('gross_weight')" header="Peso bruto, g" :value="food.gross_weight" />
        <FoodCardItem v-if="!hideFields.includes('net_weight')" header="Peso neto, g" :value="food.net_weight" />
        <FoodCardItem v-if="!hideFields.includes('energy')" header="Energía" :value="food.energy" />
        <FoodCardItem v-if="!hideFields.includes('proteins')" header="Proteínas" :value="food.proteins" />
        <FoodCardItem v-if="!hideFields.includes('lipids')" header="Lípidos" :value="food.lipids" />
        <FoodCardItem v-if="!hideFields.includes('carbohydrates')" header="Carbohidratos" :value="food.carbohydrates" />
        <FoodCardItem v-if="!hideFields.includes('saturated_fa')" header="AG saturados (g)" :value="food.saturated_fa" />
        <FoodCardItem v-if="!hideFields.includes('monounsaturated_fa')" header="AG monoinsaturados (g)" :value="food.monounsaturated_fa" />
        <FoodCardItem v-if="!hideFields.includes('polyunsaturated_fa')" header="AG poliinsaturados (g)" :value="food.polyunsaturated_fa" />
        <FoodCardItem v-if="!hideFields.includes('cholesterol')" header="Colesterol (mg)" :value="food.cholesterol" />
        <FoodCardItem v-if="!hideFields.includes('sugar')" header="Azúcar (g)" :value="food.sugar" />
        <FoodCardItem v-if="!hideFields.includes('fiber')" header="Fibra, g" :value="food.fiber" />
        <FoodCardItem v-if="!hideFields.includes('vitamin_a')" header="Vitamina A (mg RE)" :value="food.vitamin_a" />
        <FoodCardItem v-if="!hideFields.includes('ascorbic_acid')" header="Ácido ascórbico (mg)" :value="food.ascorbic_acid" />
        <FoodCardItem v-if="!hideFields.includes('folic_acid')" header="Acido Fólico (mg)" :value="food.folic_acid" />
        <FoodCardItem v-if="!hideFields.includes('calcium')" header="Calcio (mg)" :value="food.calcium" />
        <FoodCardItem v-if="!hideFields.includes('iron')" header="Hierro (mg)" :value="food.iron" />
        <FoodCardItem v-if="!hideFields.includes('potassium')" header="Potasio (mg)" :value="food.potassium" />
        <FoodCardItem v-if="!hideFields.includes('sodium')" header="Sodio (mg)" :value="food.sodium" />
        <FoodCardItem v-if="!hideFields.includes('phosphorus')" header="Fósforo (mg)" :value="food.phosphorus" />
        <FoodCardItem v-if="!hideFields.includes('ethanol')" header="Etanol (g)" :value="food.ethanol" />
        <FoodCardItem v-if="!hideFields.includes('ig')" header="IG" :value="food.ig" />
        <FoodCardItem v-if="!hideFields.includes('glycemic_load')" header="Carga glicémica" :value="food.glycemic_load" />
      </tbody>
    </table>
  </div>
</template>