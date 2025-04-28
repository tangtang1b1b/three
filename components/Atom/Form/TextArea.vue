<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: '請輸入',
  },
  id: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:word'])
const { placeholder, id } = toRefs(props)
const word = ref('')

const updateWord = () => {
  emits('update:word', word.value)
}
</script>

<template>
  <textarea
    :id="id"
    type="text"
    v-model="word"
    class="flex w-full justify-end rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-txt-light focus-visible:outline-txt-light"
    :placeholder="placeholder"
    @input="updateWord"
  ></textarea>
</template>

<style scoped></style>
