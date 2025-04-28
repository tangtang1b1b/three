<script setup>
const windowContainer = ref(null)
const toTop = ref(null)
onMounted(() => {
  toTop.value.init(windowContainer.value)
})
</script>

<template>
  <div ref="windowContainer" class="windowContainer h-[200vh]">
    <AtomButtonTop isProgress ref="toTop" />
  </div>
</template>

<style scoped></style>