<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})
const { modelValue, isOpen } = toRefs(props)

const emits = defineEmits(['update:modelValue'])

const closeModal = () => {
  emits('update:modelValue', false)
}
</script>

<template>
  <div class="fixed inset-0" v-if="modelValue">
    <Teleport to="#modalsField">
      <AtomBackdrop :is-open="isOpen" @click="closeModal" />
      <Transition name="fade" appear>
        <div
          class="absolute left-1/2 top-1/2 flex h-[310px] w-[290px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-[22px] bg-white px-[30px] py-[18px] shadow-popup"
        >
          <div>
            <div class="mb-[25px] text-[#1DA539]">
              <p class="text-center text-[18px] font-semibold leading-[21.78px]">保密條款</p>
            </div>
            <div class="text-center text-[15px] font-medium leading-[26px] text-[#333333]">
              為保障求職者權益，特此聲明：<br />提供的個人資訊將採絕對保密機制
            </div>
          </div>
          <div
            class="mx-auto h-[30px] w-[185px] cursor-pointer content-center rounded-[190px] bg-[#31B05C] text-center text-[15px] font-semibold leading-[18.15px] text-white duration-300 hover:brightness-110"
            @click="closeModal"
          >
            確認
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transform: translate(-50%, -50%);
  transition: 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  transform: translate(-50%, -30%);
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  transform: translate(-50%, -50%);
  opacity: 1;
}
</style>
