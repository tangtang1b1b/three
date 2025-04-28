<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [
      {
        name: '首頁',
        href: '/',
      },
      {
        name: '內頁',
        href: '/',
      },
      {
        name: '小內頁',
        href: '/',
      },
    ],
  },
})
const { data } = toRefs(props)
</script>

<template>
  <div class="flex gap-2">
    <nuxt-link
      :to="index !== data.length - 1 ? item.href : ''"
      class="flex gap-2"
      v-for="(item, index) in data"
      :key="item.name"
    >
      <p :class="{ 'text-txt-light': index !== data.length - 1 }">{{ item.name }}</p>
      <p v-show="index !== data.length - 1">/</p>
    </nuxt-link>
  </div>
</template>

<style scoped></style>
