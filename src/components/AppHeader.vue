<template>
  <header class="app-header">
    <h1>Co-Meet !</h1>

    <el-switch
      v-model="isLightMode"
      :active-icon="Sunny"
      :inactive-icon="Moon" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
const isLightMode = ref(true)
</script>

<style scoped lang="scss">
.app-header { 
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $gap;
  z-index: $header-z-index;
  background-color: $background-color;
}
</style>