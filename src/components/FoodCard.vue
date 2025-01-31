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
  },
  color: {
    type: String,
    default: 'bg-[#76d7c4]'
  }
})
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <tbody>
        <FoodCardItem v-if="!hideFields.includes('category')" header="Categoria" :value="food.category" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('quantity')" header="Cantidad" :value="food.quantity" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('unit')" header="Unidad" :value="food.unit" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('gross_weight')" header="Peso bruto, g" :value="food.gross_weight" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('net_weight')" header="Peso neto, g" :value="food.net_weight" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('energy')" header="Energía" :value="food.energy" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('proteins')" header="Proteínas" :value="food.proteins" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('lipids')" header="Lípidos" :value="food.lipids" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('carbohydrates')" header="Carbohidratos" :value="food.carbohydrates" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('saturated_fa')" header="AG saturados (g)" :value="food.saturated_fa" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('monounsaturated_fa')" header="AG monoinsaturados (g)" :value="food.monounsaturated_fa" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('polyunsaturated_fa')" header="AG poliinsaturados (g)" :value="food.polyunsaturated_fa" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('cholesterol')" header="Colesterol (mg)" :value="food.cholesterol" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('sugar')" header="Azúcar (g)" :value="food.sugar" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('fiber')" header="Fibra, g" :value="food.fiber" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('vitamin_a')" header="Vitamina A (mg RE)" :value="food.vitamin_a" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('ascorbic_acid')" header="Ácido ascórbico (mg)" :value="food.ascorbic_acid" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('folic_acid')" header="Acido Fólico (mg)" :value="food.folic_acid" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('calcium')" header="Calcio (mg)" :value="food.calcium" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('iron')" header="Hierro (mg)" :value="food.iron" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('potassium')" header="Potasio (mg)" :value="food.potassium" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('sodium')" header="Sodio (mg)" :value="food.sodium" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('phosphorus')" header="Fósforo (mg)" :value="food.phosphorus" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('ethanol')" header="Etanol (g)" :value="food.ethanol" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('ig')" header="IG" :value="food.ig" :color="color" />
        <FoodCardItem v-if="!hideFields.includes('glycemic_load')" header="Carga glicémica" :value="food.glycemic_load" :color="color" />
      </tbody>
    </table>
  </div>
</template>