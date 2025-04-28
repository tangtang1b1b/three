<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      perPage: 10,
      currentPage: 1,
      lastPage: 20,
      total: 200,
    }),
  },
})
const { data } = toRefs(props)

const emits = defineEmits(['upload:page'])

const currentPage = ref(1)
const changePage = (page) => {
  if (page === 0 || page === data.lastPage) return
  currentPage.value = page
  emits('upload:page', currentPage.value)
}
</script>

<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Previous</a
      >
      <a
        href="#"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Next</a
      >
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">1</span>
          to
          <span class="font-medium">{{ data.perPage }}</span>
          of
          <span class="font-medium">{{ data.total }}</span>
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <div
            @click="changePage(currentPage - 1)"
            :class="{ 'cursor-not-allowed bg-gray-50': currentPage === 1 }"
            class="focus:z-20 relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
          >
            <span class="sr-only">Previous</span>
            <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path
                fill-rule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div v-if="data.lastPage <= 7" class="-space-x-px">
            <div
              v-for="index in data.lastPage"
              @click="changePage(index)"
              :class="{ 'bg-indigo-600 text-white ring-0': currentPage === index }"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ index }}
            </div>
          </div>
          <div v-else class="-space-x-px">
            <!-- previous -->
            <div
              @click="changePage(1)"
              :class="{ '!bg-indigo-600 !text-white !ring-0 hover:!bg-indigo-600': currentPage === 1 && currentPage < 5 }"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </div>
            <span
              v-show="currentPage > 4"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
              >...</span
            >
            <div
              @click="changePage(2)"
              :class="{ '!bg-indigo-600 !text-white !ring-0 hover:!bg-indigo-600': currentPage === 2 && currentPage < 5 }"
              v-show="currentPage < 5"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              2
            </div>
            <div
              v-show="currentPage < 5"
              @click="changePage(3)"
              :class="{ 'hover:!bg-indigo-600 !text-white !bg-indigo-600 !ring-0': currentPage === 3 && currentPage < 5 }"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              3
            </div>
            <div
              v-show="currentPage < 5"
              @click="changePage(4)"
              :class="{ 'hover:!bg-indigo-600 !text-white !bg-indigo-600 !ring-0': currentPage === 4 && currentPage < 5 }"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              4
            </div>
            <div
              v-show="currentPage < 5"
              @click="changePage(5)"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              5
            </div>
            <!-- mid -->
            <div
              v-show="currentPage > 4 && currentPage < data.lastPage - 3"
              @click="changePage(currentPage > 4 ? currentPage - 1 : 3)"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ currentPage > 4 ? `${currentPage - 1}` : '3' }}
            </div>
            <div
              :class="{ 'hover:!bg-indigo-600 !text-white !bg-indigo-600 !ring-0': currentPage > 4 && currentPage < data.lastPage - 3 }"
              v-show="currentPage > 4 && currentPage < data.lastPage - 3"
              @click="changePage(currentPage > 4 ? currentPage : 4)"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ currentPage > 4 ? `${currentPage}` : '4' }}
            </div>
            <div
              v-show="currentPage > 4 && currentPage < data.lastPage - 3"
              @click="changePage(currentPage > 4 ? currentPage + 1 : 5)"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ currentPage > 4 ? `${currentPage + 1}` : '5' }}
            </div>
            <!-- next -->
            <div
              :class="{ 'hover:!bg-indigo-600 !text-white !bg-indigo-600 !ring-0': currentPage === data.lastPage - 4 && currentPage > data.lastPage - 4 }"
              v-show="currentPage > data.lastPage - 4"
              @click="changePage(data.lastPage - 4)"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ data.lastPage - 4 }}
            </div>
            <div
              :class="{
                'hover:!bg-indigo-600 !text-white !bg-indigo-600 !ring-0': currentPage === data.lastPage - 3 && currentPage > data.lastPage - 4,
              }"
              v-show="currentPage > data.lastPage - 4"
              @click="changePage(data.lastPage - 3)"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ data.lastPage - 3 }}
            </div>
            <div
              :class="{
                'hover:!bg-indigo-600 !text-white !bg-indigo-600 !ring-0': currentPage === data.lastPage - 2 && currentPage > data.lastPage - 4,
              }"
              v-show="currentPage > data.lastPage - 4"
              @click="changePage(data.lastPage - 2)"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ data.lastPage - 2 }}
            </div>
            <div
              :class="{
                'hover:!bg-indigo-600 !text-white !bg-indigo-600 !ring-0': currentPage === data.lastPage - 1 && currentPage > data.lastPage - 4,
              }"
              v-show="currentPage > data.lastPage - 4"
              @click="changePage(data.lastPage - 1)"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ data.lastPage - 1 }}
            </div>
            <span
              v-show="currentPage < data.lastPage - 3"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
              >...</span
            >
            <div
              :class="{
                'hover:!bg-indigo-600 !text-white !bg-indigo-600 !ring-0': currentPage === data.lastPage && currentPage > data.lastPage - 4,
              }"
              @click="changePage(data.lastPage)"
              class="z-10 focus:z-20 relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ data.lastPage }}
            </div>
          </div>
          <div
            @click="changePage(currentPage + 1)"
            :class="{ 'cursor-not-allowed bg-gray-50': currentPage === data.lastPage }"
            class="focus:z-20 relative inline-flex cursor-pointer items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
          >
            <span class="sr-only">Next</span>
            <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path
                fill-rule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
