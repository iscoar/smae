<script setup>
import InputSearch from '../components/InputSearch.vue'
import InputNumber from '../components/InputNumber.vue'
import FoodCard from '../components/FoodCard.vue'
import EquivalentCard from '../components/EquivalentCard.vue'
import BaseButton from '../components/BaseButton.vue'
import DangerButton from '../components/DangerButton.vue'
import { foodStore } from '../store/foodStore'
import { equivalentStore } from '../store/equivalentStore'
import { storeToRefs } from 'pinia'
import { mockDBStore } from '../store/mockDBStore'
import { ref, watch } from 'vue'

const eqStore = equivalentStore()
const store = foodStore()
const dbStore = mockDBStore()
const { equivalents, equivalent_value } = storeToRefs(eqStore)
const { search, food_names, search_result } = storeToRefs(store)
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
  }, 500)
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
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-2 my-5">
      <InputSearch class="w-full" v-model="search" :data="food_names" @input="onSearchInput" />
      <div class="flex justify-between gap-2">
        <InputNumber class="w-full" placeholder="Equivalentes" v-model="equivalent_value" />
        <BaseButton @click="onSave">
          <svg class="w-6 h-6 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
              d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm3 11a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H8v-6Zm1-7V5h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
              clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M14 17h-4v-2h4v2Z" clip-rule="evenodd" />
          </svg>
          Guardar
        </BaseButton>
        <DangerButton @click="onClean">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
              clip-rule="evenodd" />
          </svg>
          Vaciar
        </DangerButton>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-5">
      <FoodCard :food="search_result" />
      <EquivalentCard :equivalents="equivalents" />
    </div>
  </div>
</template>
