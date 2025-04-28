export default defineNuxtPlugin(() => {
  const { GA_ID } = useRuntimeConfig().public
  if (!GA_ID) {
    return
  }
  if (import.meta.client) {
    // 加載 gtag.js
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    // 初始化 gtag
    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', GA_ID)
    }
  }
})
