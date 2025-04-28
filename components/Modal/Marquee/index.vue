<script setup>
const { $gsap } = useNuxtApp()
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
  reverse: {
    type: Boolean,
    default: false,
  }
})
const { data, reverse } = toRefs(props)

onMounted(() => {
  $gsap.effects.marquee('.marquee', { direction: 'left' })
  $gsap.effects.marquee('.marquee-reverse', { direction: 'right' })
})
</script>

<template>
  <div :class="{'flex-row-reverse': reverse}" class="flex w-full overflow-hidden border-2 border-txt-light">
    <slot :slot-data="data">
      <div class="flex w-full shrink-0 justify-between gap-5 text-2xl">
        <div :style="{ width: `${100 / data.length}%` }" v-for="i in data" :key="i">
          {{ i }}
        </div>
      </div>
      <div class="flex w-full shrink-0 justify-between gap-5 text-2xl">
        <div :style="{ width: `${100 / data.length}%` }" v-for="i in data" :key="i">
          {{ i }}
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped></style>
