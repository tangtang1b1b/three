<script setup>
const search = ref('')

const doSearch = () => {
  if(search.value.trim() === '') return

  search.value = ''
}
</script>

<template>
  <div>
    <div class="relative mt-2 w-[200px] rounded-md shadow-sm">
      <input
        type="text"
        v-model="search"
        class="relative right-0 flex w-full justify-end rounded-md border-0 py-1.5 pl-2 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 duration-300 placeholder:text-gray-400 focus:outline-txt-light"
        placeholder="搜尋"
        @keydown.enter="doSearch"
      />
      <div @click="doSearch" class="absolute inset-y-0 right-2 flex cursor-pointer items-center">
        <AtomIcon name="search" class="text-[#94a3b8]" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
