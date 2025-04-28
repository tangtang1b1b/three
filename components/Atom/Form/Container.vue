<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  isCursor: {
    type: Boolean,
    default: false
  }
})
const { label, name } = toRefs(props)
</script>

<template>
  <div>
    <label class="w-[100px] flex-shrink-0" :class="{'cursor-pointer' : isCursor}" :for="label">*{{ name }}</label>
    <slot />
  </div>
</template>

<style scoped></style>