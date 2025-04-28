<script setup>
const { t } = useI18n()
const dot = ref('')
const dotAnimation = ref(null)

const init = () => {
  dotAnimation.value = setInterval(() => {
    dot.value += '.'
    if (dot.value.length > 3) {
      dot.value = '.'
    }
  }, 500)
}

onMounted(() => {
  init()
})
</script>
<template>
  <div class="container relative flex h-screen w-full items-center justify-center text-4xl font-bold">
    <NuxtLinkLocale to="/demo" class="relative">
      {{ t('template') }}<span class="absolute left-full">{{ dot }}</span>
    </NuxtLinkLocale>
  </div>
</template>

<style scoped></style>
