<script setup>
import { useAllStore } from '@/store/all'
const { windowWidth } = toRefs(useAllStore())
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
const { data } = toRefs(props)

const content = ref(null)
const contentHeight = ref(0)
const paddingNum = ref(16)
const isOpen = ref(false)

const init = () => {
  contentHeight.value = content.value.getBoundingClientRect().height + paddingNum.value * 2
}

onMounted(() => {
  init()
  watch(windowWidth, () => {
    isOpen.value = false 
    contentHeight.value = 0
    nextTick(() => {
      init()
    })
  })
})
</script>

<template>
  <div class="">
    <div class="relative flex flex-col content-center overflow-hidden rounded-md border text-lg font-bold">
      <div
        @click="isOpen = !isOpen"
        class="flex h-auto py-2 cursor-pointer select-none items-center justify-between bg-[#eee] px-5 duration-300 hover:bg-[#e0e0e0]"
      >
        <div class="">
          <slot name="question">
            {{ data.title }}
          </slot>
        </div>
        <AtomIcon :class="[isOpen ? 'rotate-[135deg]' : '']" name="plus" :size="20" class="cursor-pointer duration-300" />
      </div>
      <div class="pointer-events-none">
        <div
          :style="{
            height: isOpen ? `${contentHeight}px` : contentHeight === 0 ? 'auto' : '0',
            paddingTop: isOpen ? `${paddingNum}px` : '0',
            paddingBottom: isOpen ? `${paddingNum}px` : '0',
          }"
          ref="content"
          class="bg-white px-5 text-md duration-300"
        >
          {{ data.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
