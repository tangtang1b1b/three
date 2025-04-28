<script setup>
import { useAllStore } from '@/store/all'
const { isScroll } = toRefs(useAllStore())
const { $gsap, $lenis } = useNuxtApp()

const props = defineProps({
  isProgress: {
    type: Boolean,
    default: false,
  },
})
const { isProgress } = toRefs(props)
const toTop = () => {
  $lenis.scrollTo(0)
}

const init = (wrapper) => {
  const circle = document.querySelector('#progressRingCircle')
  if (!circle) {
    return
  }
  $gsap.to(circle, {
    scrollTrigger: {
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
    strokeDashoffset: 0, // 填滿整個圓形
    ease: 'linear',
  })
}

defineExpose({
  init,
})
</script>

<template>
  <div
    :class="[isScroll ? 'opacity-100' : 'pointer-events-none opacity-0']"
    class="group fixed bottom-15 right-10 duration-300"
    @click="toTop"
  >
    <div class="flex cursor-pointer items-center justify-center rounded-full bg-[#ccc] p-[8px] duration-300 group-hover:bg-txt-light">
      <svg v-if="isProgress" class="absolute -z-10" width="50" height="50" viewBox="0 0 150 150">
        <circle
          cx="75"
          cy="75"
          r="70"
          stroke="#ccc"
          stroke-width="8"
          fill="none"
          id="progressRingCircle"
          class="transition-colors duration-300 group-hover:stroke-txt-light"
        />
      </svg>
      <AtomIcon name="arrow-solid" class="-rotate-90 text-white duration-300" />
    </div>
  </div>
</template>

<style scoped>
#progressRingCircle {
  stroke-dasharray: 440; /* 2 * π * radius (2 * π * 70) */
  stroke-dashoffset: 440; /* 初始時，圓形邊框不顯示 */
  transform-origin: 50% 50%; /* 設定圓形的旋轉中心在圓心 */
  transform: rotate(-90deg); /* 讓圓形從 12 點鐘位置開始 */
}
</style>
