<script setup>
import FoodCardItem from './FoodCardItem.vue';

const {} = defineProps({
  equivalents: {
    type: Object,
    default: () => ({})
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
      <thead class="text-xs text-gray-900 uppercase bg-[#76d7c4]">
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
        <FoodCardItem header="Verduras" :value="equivalents.vegetables" :color="color" />
        <FoodCardItem header="Frutas" :value="equivalents.fruits" :color="color" />
        <FoodCardItem header="Cereales S/G" :value="equivalents.sg_cereals" :color="color" />
        <FoodCardItem header="Cereales C/G" :value="equivalents.cg_cereals" :color="color" />
        <FoodCardItem header="Leguminosas" :value="equivalents.legumes" :color="color" />
        <FoodCardItem header="AOA MBAG" :value="equivalents.aoa_mbag" :color="color" />
        <FoodCardItem header="AOA BAG" :value="equivalents.aoa_bag" :color="color" />
        <FoodCardItem header="AOA MAG" :value="equivalents.aoa_mag" :color="color" />
        <FoodCardItem header="AOA AAG" :value="equivalents.aoa_aag" :color="color" />
        <FoodCardItem header="Leche descremada" :value="equivalents.skim_milk" :color="color" />
        <FoodCardItem header="Leche semidescremada" :value="equivalents.semi_skimmed_milk" :color="color" />
        <FoodCardItem header="Leche entera" :value="equivalents.milk" :color="color" />
        <FoodCardItem header="Leche con azúcar" :value="equivalents.milk_with_sugar" :color="color" />
        <FoodCardItem header="Grasas sin proteínas" :value="equivalents.fats_without_pretein" :color="color" />
        <FoodCardItem header="Grasas con proteínas" :value="equivalents.fats_with_protein" :color="color" />
        <FoodCardItem header="Azucares sin grasa" :value="equivalents.fat_free_sugars" :color="color" />
        <FoodCardItem header="Azucares con grasa" :value="equivalents.sugars_with_fat" :color="color" />
        <FoodCardItem header="Libres en energía" :value="equivalents.free_energy" :color="color" />
        <FoodCardItem header="Alcohol" :value="equivalents.alcohol" :color="color" />
      </tbody>
    </table>
  </div>
</template>