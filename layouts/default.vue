<script setup>
import { useAllStore } from '@/store/all';
const { allData } = toRefs(useAllStore())
const { data } = await fetchRestful({ apiPath: '/data/index.json' })
allData.value = data
</script>

<template>
  <div>
    <LayoutHeader :data="allData?.menu" />
    <main class="mx-auto max-w-[1920px] pt-[70px]">
      <slot />
    </main>
    <LayoutFooter />
    <div id="modalsField"></div>
    <!-- <Cursor colorful /> -->
  </div>
</template>

<style scoped></style>
