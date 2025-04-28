import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin((nuxtApp) => {
  const lenis = new Lenis()

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // 註冊 page hooks
  nuxtApp.hook('page:finish', () => {
    lenis.stop()

    const route = nuxtApp.$router.currentRoute.value
    if (route.meta.scrollToTop) {
      document.scrollingElement?.scrollTo({ left: 0, top: 0 })
      document.body?.scrollTo({ left: 0, top: 0 })
    }

    lenis.start()
  })

  return {
    provide: {
      lenis,
    },
  }
})
