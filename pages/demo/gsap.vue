<script setup>
const { $gsap } = useNuxtApp()

onMounted(() => {
  $gsap.effects.aosFadeIn()
})

const number = ref(0)

const selected = ref('')

const plus = () => {
  number.value++
}

const transitionOption = ref([
  { name: 'fadeTransition', mode: fadeTransition },
  { name: 'slideRightTransition', mode: slideRightTransition },
  { name: 'blurTransition', mode: blurTransition },
])

const marquee2 = ref([
  '/images/logo.png',
  '/images/logo.png',
  '/images/logo.png',
  '/images/logo.png',
  '/images/logo.png',
])

// GSAP常用的幾種方法:
/**
 * 在trigger內透過滾動觸發動畫
 */
const func_1 = () => {
  $gsap.to(dom.value, {
    motionPath: {
      path: '#carPath',
      autoRotate: true
    },
    duration: 10,
    ease: 'none',
    scale: 1.4,
    scrollTrigger: {
      trigger: trigger.value,
      scrub: true, // 跟隨滾動執行動畫
      start: 'top top',
      end: 'bottom top'
    }
  })
}
/**
 * 在trigger內透過綁定事件偵測進入或離開觸發動畫
 */
const func_2 = () => {
  ScrollTrigger.batch('[data-fade="text"]', {
    trigger: trigger.value,
    start: 'center 85%',
    end: 'center 15%',
    onEnter: (elements) => {
      $gsap.to(elements, { opacity: 1, y: '0px' })
    },
    onEnterBack: (elements) => {
      $gsap.to(elements, { opacity: 1, y: '0px' })
    },
    onLeave: (elements) => {
      $gsap.to(elements, { opacity: 0, y: '-50px' })
    },
    onLeaveBack: (elements) => {
      $gsap.to(elements, { opacity: 0, y: '50px' })
    }
  })
}
/**
 * 在trigger內透過timeline控制多個動畫
 */
const func_3 = () => {
  const tl = $gsap.timeline()

  ScrollTrigger.create({
    animation: tl,
    trigger: trigger.value,
    start: 'top top',
    end: 'bottom top',
    scrub: true // 跟隨滾動執行動畫
  })

  tl.to(dom.value, {
    y: '50%',
    ease: 'none',
    onComplete: () => {
    }
  })
  tl.to(dom.value, {
    y: '80%',
    ease: 'none',
    onComplete: () => {
    }
  }, '<')
}
</script>

<template>
  <div class="container lg:px-40">
    <div class="py-10 text-2xl">
      GSAP應用:
      <div>
        <p>啟用 : <strong>onMounted(() => { $gsap.effects.aosFadeIn() })</strong></p>
        <p>加 <strong>data-fade="in"</strong> 到 HTML 中，實現進場效果</p>
      </div>
    </div>
    <div class="flex flex-col py-10">
      <h2 class="mb-5 mt-10 text-2xl font-bold">文字切換</h2>
      <div class="flex gap-5">
        <select v-model="selected" class="w-fit cursor-pointer rounded-md border-2 border-black p-2 text-xl focus:outline-none">
          <option value="" disabled>請選擇</option>
          <option :value="option.mode" v-for="option in transitionOption" :key="option.name">{{ option.name }}</option>
        </select>
        <div
          class="group flex w-fit cursor-pointer items-center gap-1 rounded-md border-2 border-black px-2 duration-300 hover:bg-black"
          @click="plus"
        >
          <AtomIcon name="plus" :size="20" class="text-black duration-300 group-hover:text-white" /><span
            class="text-xl duration-300 group-hover:text-white"
            >增加</span
          >
        </div>
      </div>
      <div class="relative flex h-[100px] items-center">
        <Transition v-bind="selected">
          <div :key="number" class="font-extra-bold absolute top-0 h-full text-center text-7xl italic text-txt-light">
            {{ number }}
          </div>
        </Transition>
      </div>
    </div>
    <div class="flex flex-col gap-5 py-10">
      <h2 class="mb-5 mt-10 text-2xl font-bold">跑馬燈</h2>
      <ModalMarquee class="bg-black" :data="marquee2">
        <template #default="{ slotData }">
          <div class="marquee | flex w-full shrink-0 text-2xl">
            <img class="object-cover px-5" :src="fetchImg(i)" :style="{ width: `${100 / slotData.length}%`, height: '100%' }" v-for="i in slotData" :key="i" />
          </div>
          <div class="marquee | flex w-full shrink-0 text-2xl">
            <img class="object-cover px-5" :src="fetchImg(i)" :style="{ width: `${100 / slotData.length}%`, height: '100%' }" v-for="i in slotData" :key="i" />
          </div>
        </template>
      </ModalMarquee>
      <ModalMarquee class="bg-black" :data="marquee2" reverse>
        <template #default="{ slotData }">
          <div class="marquee-reverse | flex w-full shrink-0 text-2xl">
            <img class="object-cover px-5" :src="fetchImg(i)" :style="{ width: `${100 / slotData.length}%`, height: '100%' }" v-for="i in slotData" :key="i" />
          </div>
          <div class="marquee-reverse | flex w-full shrink-0 text-2xl">
            <img class="object-cover px-5" :src="fetchImg(i)" :style="{ width: `${100 / slotData.length}%`, height: '100%' }" v-for="i in slotData" :key="i" />
          </div>
        </template>
      </ModalMarquee>
    </div>
    <div class="flex flex-col gap-5 py-10">
      <h2 class="mb-5 mt-10 text-2xl font-bold">進場效果</h2>
      <div data-fade="in" class="size-10 bg-slate-600" v-for="i in 30"></div>
    </div>
  </div>
</template>

<style scoped></style>
