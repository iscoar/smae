import { defineStore } from "pinia"
import { ref } from "vue"

export const mockDBStore = defineStore('database', () => {
  const data = ref([])

  function saveRegister(food) {
    data.value.push({
      ...food
    })
  }

  function deleteRegisters() {
    data.value = []
  }

  return { data, saveRegister, deleteRegisters }
})