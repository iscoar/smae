<script setup>
import FoodCardItem from './FoodCardItem.vue';

const {} = defineProps({
  equivalents: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Categoria
          </th>
          <th scope="col" class="px-6 py-3">
            Equivalentes
          </th>
        </tr>
      </thead>
      <tbody>
        <FoodCardItem header="Frutas" :value="equivalents.fruits" />
        <FoodCardItem header="Grasas sin proteínas" :value="equivalents.fats_without_pretein" />
        <FoodCardItem header="Verduras" :value="equivalents.vegetables" />
        <FoodCardItem header="Libres en energía" :value="equivalents.free_energy" />
        <FoodCardItem header="AOA MBAG" :value="equivalents.aoa_mbag" />
        <FoodCardItem header="Leche con azúcar" :value="equivalents.milk_with_sugar" />
        <FoodCardItem header="Azucares sin grasa" :value="equivalents.fat_free_sugars" />
        <FoodCardItem header="Azucares con grasa" :value="equivalents.sugars_with_fat" />
        <FoodCardItem header="Grasas con proteínas" :value="equivalents.fats_with_protein" />
        <FoodCardItem header="Alcohol" :value="equivalents.alcohol" />
        <FoodCardItem header="AOA BAG" :value="equivalents.aoa_bag" />
        <FoodCardItem header="AOA AAG" :value="equivalents.aoa_aag" />
        <FoodCardItem header="Cereales S/G" :value="equivalents.sg_cereals" />
        <FoodCardItem header="Leguminosas" :value="equivalents.legumes" />
        <FoodCardItem header="Cereales C/G" :value="equivalents.cg_cereals" />
        <FoodCardItem header="AOA MAG" :value="equivalents.aoa_mag" />
        <FoodCardItem header="Leche descremada" :value="equivalents.skim_milk" />
        <FoodCardItem header="Leche entera" :value="equivalents.milk" />
        <FoodCardItem header="Leche semidescremada" :value="equivalents.semi_skimmed_milk" />
      </tbody>
    </table>
  </div>
</template>