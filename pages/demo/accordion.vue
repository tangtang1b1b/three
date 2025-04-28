<script setup>
const questions = ref({
  title: '我想報名參加校園創意提案競賽，請問主題該如何選擇？',
  desc: '本屆競賽主題針對「新時代藥局經營模式」的多個面向，擬定五個主題（請參考 計畫主題 說明），參賽者可自由選擇感興趣的主題提出創新解決方案。',
})

const page = {
  perPage: 10,
  currentPage: 1,
  lastPage: 20,
  total: 200,
}

const bread = [
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
]
</script>

<template>
  <div class="lg:px-40 container">
    <div class="py-10">
      <h2 class="mb-5 mt-10 text-2xl font-bold">麵包屑</h2>
      <ModalAccordionBreadcrumb :data="bread" />
    </div>
    <div class="py-10">
      <h2 class="mb-5 mt-10 text-2xl font-bold">搜尋</h2>
      <ModalAccordionSearch />
    </div>
    <div class="py-10">
      <h2 class="mb-5 mt-10 text-2xl font-bold">頁碼樣式</h2>
      <ModalAccordionPage :data="page" />
    </div>
    <div class="py-10">
      <h2 class="mb-5 mt-10 text-2xl font-bold">下拉式</h2>
      <ModalAccordionQA :data="questions" />
    </div>
  </div>
</template>

<style scoped></style>
