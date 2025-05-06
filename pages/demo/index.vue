<script setup>
const { t } = useI18n()
</script>

<template>
  <div class="py-10">
    <div class="text-center text-4xl font-bold mb-10">
      {{ t('title') }}
    </div>
    <div class="container grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-2xl">
      <div class="w-full aspect-[4/3] flex justify-center items-center">
        <NuxtLinkLocale to="/demo/slider" class="size-full border rounded-xl flex justify-center items-center duration-300 hover:text-white hover:bg-txt-light">
          {{ t('items.slider') }}
        </NuxtLinkLocale>
      </div>
      <div class="w-full aspect-[4/3] flex justify-center items-center">
        <NuxtLinkLocale to="/demo/accordion" class="size-full border rounded-xl flex justify-center items-center duration-300 hover:text-white hover:bg-txt-light">
          {{ t('items.accordion') }}
        </NuxtLinkLocale>
      </div>
      <div class="w-full aspect-[4/3] flex justify-center items-center">
        <NuxtLinkLocale to="/demo/popup" class="size-full border rounded-xl flex justify-center items-center duration-300 hover:text-white hover:bg-txt-light">
          {{ t('items.popup') }}
        </NuxtLinkLocale>
      </div>
      <div class="w-full aspect-[4/3] flex justify-center items-center">
        <NuxtLinkLocale to="/demo/form" class="size-full border rounded-xl flex justify-center items-center duration-300 hover:text-white hover:bg-txt-light">
          {{ t('items.form') }}
        </NuxtLinkLocale>
      </div>
      <div class="w-full aspect-[4/3] flex justify-center items-center">
        <NuxtLinkLocale to="/demo/button" class="size-full border rounded-xl flex justify-center items-center duration-300 hover:text-white hover:bg-txt-light">
          {{ t('items.button') }}
        </NuxtLinkLocale>
      </div>
      <div class="w-full aspect-[4/3] flex justify-center items-center">
        <NuxtLinkLocale to="/demo/gsap" class="size-full border rounded-xl flex justify-center items-center duration-300 hover:text-white hover:bg-txt-light">
          {{ t('items.gsap') }}
        </NuxtLinkLocale>
      </div>
      <div class="w-full aspect-[4/3] flex justify-center items-center">
        <NuxtLinkLocale to="/demo/three" class="size-full border rounded-xl flex justify-center items-center duration-300 hover:text-white hover:bg-txt-light">
          {{ t('items.three') }}
        </NuxtLinkLocale>
      </div>
      <div class="w-full aspect-[4/3] flex justify-center items-center">
        <NuxtLinkLocale to="/demo/plane" class="size-full border rounded-xl flex justify-center items-center duration-300 hover:text-white hover:bg-txt-light">
          {{ t('items.plane') }}
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<style scoped></style>