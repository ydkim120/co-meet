<template>
  <header class="header__wrap">
    <h1
      class="header__title"
      :class="{'-hidden': isHome}"
      @click="router.push({ name: 'app-wrap' })">
      Co-Meet !
    </h1>

    <el-switch
      v-model="isLightMode"
      :active-icon="Sunny"
      :inactive-icon="Moon"
      @change="changeTheme()" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Sunny, Moon } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const isLightMode = ref(true)

const changeTheme = (isLight = isLightMode.value) => {
  const htmlEl = document.documentElement
  if (!isLight) {
    addClass(htmlEl, 'dark')
    htmlEl.setAttribute('data-theme', 'dark')
  } else {
    removeClass(htmlEl, 'dark')
    htmlEl.setAttribute('data-theme', 'light');
  }
}

const classNameToArray = (cls = '') => cls.split(' ').filter((item) => !!item.trim())

const hasClass = (el: HTMLElement, cls:string) => {
  if (!el || !cls) return false
  if (cls.includes(' '))
    throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

const addClass = (el: HTMLElement, cls: string) => {
  if (!el || !cls.trim()) return
  if (hasClass(el, cls)) return
  el.classList.add(...classNameToArray(cls))
}

const removeClass = (el: HTMLElement, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.remove(...classNameToArray(cls))
}

const isHome = computed(() => { 
  return route.name === 'app-home'
})

</script>

<style scoped lang="scss">
.header__wrap { 
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $gap;
  height: $header-height;
  z-index: $header-z-index;
  background-color: var(--background-color);
  .header__title { 
    font-weight: 900; 
    color: $primary;
    cursor: pointer;
    &.-hidden { visibility: hidden; }
  }
}
</style>