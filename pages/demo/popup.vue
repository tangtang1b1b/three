<script setup>
const popup = ref(false)
const popup2 = ref(false)
const popup3 = ref(false)
const popup4 = ref(false)
</script>

<template>
  <div class="container">
    <div class="grid lg:grid-cols-3 gap-y-10 lg:px-40 py-10 text-lg">
      <button
        class="mx-auto w-fit rounded-xl border border-black bg-black px-10 py-2 text-white duration-300 hover:bg-white hover:text-black"
        @click="popup = !popup"
      >
        預設彈窗
      </button>
      <button
        class="mx-auto w-fit rounded-xl border border-black bg-black px-10 py-2 text-white duration-300 hover:bg-white hover:text-black"
        @click="popup2 = !popup2"
      >
        輪播彈窗
      </button>
      <button
        class="mx-auto w-fit rounded-xl border border-black bg-black px-10 py-2 text-white duration-300 hover:bg-white hover:text-black"
        @click="popup3 = !popup3"
      >
        計時彈窗
      </button>
      <button
        class="mx-auto w-fit rounded-xl border border-black bg-black px-10 py-2 text-white duration-300 hover:bg-white hover:text-black"
        @click="popup4 = !popup4"
      >
        影片彈窗
      </button>
    </div>
    <!-- 組件 -->
    <ModalPopupBasic v-model="popup" />
    <ModalPopupSlider isOpen v-model="popup2" />
    <ModalPopupTimer underLine :time="2" v-model="popup3" />
    <ModalPopupVideo isOpen :time="2" v-model="popup4" />
  </div>
</template>

<style scoped></style>
