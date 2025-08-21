<script setup>
import InputSearch from '../components/InputSearch.vue'
import InputNumber from '../components/InputNumber.vue'
import FoodCard from '../components/FoodCard.vue'
import EquivalentCard from '../components/EquivalentCard.vue'
import BaseButton from '../components/BaseButton.vue'
import DangerButton from '../components/DangerButton.vue'
import SaveIcon from '../components/Icons/Save.vue'
import DeleteIcon from '../components/Icons/Delete.vue'
import { useHome } from '../composables/home'

const {
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
} = useHome()

</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-2 my-5">
      <InputSearch class="w-full" v-model="search" :data="food_names" @input="onSearchInput" />
      <div class="flex justify-between gap-2">
        <InputNumber class="w-full" placeholder="Equivalentes" v-model="equivalent_value" />
        <BaseButton @click="onSave">
          <SaveIcon />
          Guardar
        </BaseButton>
        <DangerButton @click="onClean">
          <DeleteIcon />
          Vaciar
        </DangerButton>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-5">
      <FoodCard :food="search_result" :fields="food_props" />
      <EquivalentCard :equivalents="equivalents" :fields="categories" />
    </div>
  </div>
</template>
