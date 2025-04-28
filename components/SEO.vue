<script setup>
const config = useRuntimeConfig()
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
  image: {
    type: [String, Boolean],
    default: ''
  },
  url: {
    type: String,
    default: ''
  }
})

useServerSeoMeta({
  title: props.title || config.public.APP_TITLE,
  description: props.desc || config.public.APP_DESC,
  ogTitle: props.title || config.public.APP_TITLE,
  ogSiteName: props.title || config.public.APP_TITLE,
  ogDescription: props.desc || config.public.APP_DESC,
  keywords: props.keywords || config.public.APP_KEYWORDS,
  ogImage: props.image || `${config.public.APP_URL}/og_image.jpg`,
})
useSeoMeta({
  title: props.title || config.public.APP_TITLE,
  description: props.desc || config.public.APP_DESC,
  ogTitle: props.title || config.public.APP_TITLE,
  ogSiteName: props.title || config.public.APP_TITLE,
  ogDescription: props.desc || config.public.APP_DESC,
  keywords: props.keywords || config.public.APP_KEYWORDS,
  ogImage: props.image || `${config.public.APP_URL}/og_image.jpg`,
})
</script>

<template>
  <Head>
    <Title>{{ props.title || config.public.APP_TITLE }}</Title>
    <Meta
      hid="description"
      name="description"
      :content="props.desc || config.public.APP_DESC"
    />
  </Head>
</template>
