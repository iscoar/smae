<script setup>
import FoodCardItem from './FoodCardItem.vue';

const {} = defineProps({
  food: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <tbody>
        <FoodCardItem header="Categoria" :value="food.category" />
        <FoodCardItem header="Cantidad" :value="food.quantity" />
        <FoodCardItem header="Unidad" :value="food.unit" />
        <FoodCardItem header="Peso bruto, g" :value="food.gross_weight" />
        <FoodCardItem header="Peso neto, g" :value="food.net_weight" />
        <FoodCardItem header="Energía" :value="food.energy" />
        <FoodCardItem header="Proteínas" :value="food.proteins" />
        <FoodCardItem header="Lípidos" :value="food.lipids" />
        <FoodCardItem header="Carbohidratos" :value="food.carbohydrates" />
        <FoodCardItem header="AG saturados (g)" :value="food.saturated_fa" />
        <FoodCardItem header="AG monoinsaturados (g)" :value="food.monounsaturated_fa" />
        <FoodCardItem header="AG poliinsaturados (g)" :value="food.polyunsaturated_fa" />
        <FoodCardItem header="Colesterol (mg)" :value="food.cholesterol" />
        <FoodCardItem header="Azúcar (g)" :value="food.sugar" />
        <FoodCardItem header="Fibra, g" :value="food.fiber" />
        <FoodCardItem header="Vitamina A (mg RE)" :value="food.vitamin_a" />
        <FoodCardItem header="Ácido ascórbico (mg)" :value="food.ascorbic_acid" />
        <FoodCardItem header="Acido Fólico (mg)" :value="food.folic_acid" />
        <FoodCardItem header="Calcio (mg)" :value="food.calcium" />
        <FoodCardItem header="Hierro (mg)" :value="food.iron" />
        <FoodCardItem header="Potasio (mg)" :value="food.potassium" />
        <FoodCardItem header="Sodio (mg)" :value="food.sodium" />
        <FoodCardItem header="Fósforo (mg)" :value="food.phosphorus" />
        <FoodCardItem header="Etanol (g)" :value="food.ethanol" />
        <FoodCardItem header="IG" :value="food.ig" />
        <FoodCardItem header="Carga glicémica" :value="food.glycemic_load" />
      </tbody>
    </table>
  </div>
</template>