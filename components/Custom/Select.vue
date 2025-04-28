<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '請選擇',
  },
  id: {
    type: String,
    default: '',
  },
})
const { options, placeholder, id } = toRefs(props)

const isClick = ref(false)
const emit = defineEmits(['update:word'])
const selected = ref('')

const closeDropdown = (e) => {
  if (!document.querySelector(`#${id.value}`).contains(e.target)) {
    isClick.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

watch(selected, () => {
  emit('update:word', selected.value.value)
})
</script>

<template>
  <div class="relative z-1 w-full">
    <div
      :id="id"
      @click.stop="isClick = !isClick"
      class="relative flex w-full cursor-pointer appearance-none justify-between rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-txt-light focus-visible:outline-txt-light"
    >
      <div :class="{'text-gray-900': selected}" class="text-gray-400 pointer-events-none">{{ selected ? selected.name : placeholder }}</div>
      <div :class="{'opacity-100 pointer-events-auto': isClick}" class="absolute duration-300 opacity-0 pointer-events-none flex flex-col left-0 mt-2 w-full top-full border-[1px] border-gray-300 bg-white rounded-md">
        <div @click="selected = option" class="text-gray-400 px-4 py-2 hover:bg-[#EFEFEF]" v-for="option in options">{{ option.name }}</div>
      </div>
    </div>
    <AtomIcon name="arrow" :size="14" class="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none rotate-90 text-[#94a3b8]" />
  </div>
</template>

<style scoped>
option {
  border-radius: 5px;
}
</style>
