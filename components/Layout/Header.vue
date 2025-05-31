<script setup>
const { locale } = useI18n()
import { useAllStore } from '@/store/all'
const { isScroll } = toRefs(useAllStore())
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
const { data } = toRefs(props)
onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      isScroll.value = true
    } else {
      isScroll.value = false
    }
  })
})
onUnmounted(() => {})
</script>

<template>
  <header :class="[isScroll ? 'shadow-nav' : '']" class="fixed left-0 top-0 z-100 h-[70px] w-full bg-black">
    <div class="z-50 mx-auto flex size-full justify-between max-w-screen-3xl items-center bg-black px-5 duration-300">
    </div>
  </header>
</template>

<style scoped></style>
