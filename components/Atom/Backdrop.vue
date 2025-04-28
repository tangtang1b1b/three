<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})
const { isOpen } = toRefs(props)
</script>

<template>
  <Transition name="back" appear>
    <div class="absolute inset-0 z-0 cursor-pointer bg-black/30 duration-300" :class="{ '!opacity-0': !isOpen }"></div>
  </Transition>
</template>

<style scoped>
.back-enter-active,
.back-leave-active {
  transition: 0.3s;
}

.back-enter-from,
.back-leave-to {
  opacity: 0;
}

.back-enter-to,
.back-leave-from {
  opacity: 1;
}
</style>
