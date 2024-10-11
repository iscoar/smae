<script setup>
import { storeToRefs } from 'pinia';
import Table from '../components/Table.vue';
import { mockDBStore } from '../store/mockDBStore';

const store = mockDBStore()
const { data } = storeToRefs(store)
</script>

<template>
  <div class="mt-5">
    <Table :data="data" />
  </div>
</template>