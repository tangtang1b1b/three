<script setup></script>

<template>
  <div>
    <LayoutHeader />
    <main class="mx-auto max-w-[1920px] pt-[70px]">
      <slot />
    </main>
    <LayoutFooter />
    <div id="modalsField"></div>
  </div>
</template>

<style scoped></style>
