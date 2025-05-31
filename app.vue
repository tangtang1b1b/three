<script setup>
import 'virtual:svg-icons-register'
import { useAllStore } from '@/store/all'
const { windowWidth, isScroll } = toRefs(useAllStore())

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      isScroll.value = true
    } else {
      isScroll.value = false
    }
  })
})
</script>

<template>
  <div>
    <SEO />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>