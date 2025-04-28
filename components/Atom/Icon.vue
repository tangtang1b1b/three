<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
  size: {
    type: Number,
    default: 24,
  }
})
const { name, color, size } = toRefs(props)

const svgName = computed(() => {
  return name.value.includes('/') ? `#${name.value}` : `#/${name.value}`
})

</script>

<template>
  <svg aria-hidden="true" :style="{width: `${size}px`, height: `${size}px`}">
    <use :xlink:href="svgName" :fill="color" />
  </svg>
</template>

<style scoped></style>
