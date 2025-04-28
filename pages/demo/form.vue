<script setup>
import * as yup from 'yup'
const schema = yup.object({
  name: yup.string().required('*請填寫您的姓名'),
  phone: yup
    .string()
    .required('*請填寫您的電話')
    .matches(/^09\d{8}$/, '*電話號碼格式錯誤'),
  email: yup.string().email('*電子信箱格式錯誤').required('*請輸入信箱地址'),
  section: yup.string().required('*至少選擇一個場次'),
  company: yup.string().required('*請輸入所屬機構'),
})

const formRef = ref({
  name: '',
  phone: '',
  email: '',
  company: '',
  section: '',
  other: '',
})

const errors = ref({})

const updateFormField = (key, value) => {
  formRef.value[key] = value
}

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    // 清空錯誤
    errors.value = {};
    
    // 驗證數據
    await schema.validate(formRef.value, { abortEarly: false });
    
    const formData = {
      title: formRef.value.name,
      status: 'draft',
      acf: formRef.value
    };
    // 處理表單提交
    // isLoading.value = true
    // const res = await fetch(`${API_URL}/${API_PATH}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `${FORM_TOKEN}`
    //   },
    //   body: JSON.stringify(formData)
    // })

    if (!res.ok) {
      throw new Error('Failed to submit the form');
    }
    // const data = await res.json();
  
  } catch (err) {
    if (err.name === 'ValidationError') {
      // 收集所有錯誤
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      errors.value = validationErrors;
    } else{
      // 處理錯誤
    }
  }
};

const options = ref([
  {name: '早上', value: 'morning'},
  {name: '中午', value: 'noon'},
  {name: '下午', value: 'afternoon'},
  {name: '晚上', value: 'night'},
])
</script>

<template>
  <div>
    <form @submit="handleSubmit" class="mx-auto w-full max-w-[990px] space-y-10 py-10 px-5">
      <AtomFormContainer class="flex items-center gap-10 text-[#8D8D8D]" label="name" name="姓名">
        <div class="relative w-full">
          <AtomFormInput @update:word="(value) => updateFormField('name', value)" id="name" placeholder="姓名" />
          <Transition name="fade">
            <div class="absolute top-[calc(100%+5px)] text-[11px] font-semibold text-[#ff405b]" v-if="errors.name">{{ errors.name }}</div>
          </Transition>
        </div>
      </AtomFormContainer>
      <AtomFormContainer class="flex items-center gap-10 text-[#8D8D8D]" label="phone" name="聯絡電話">
        <div class="relative w-full">
          <AtomFormInput @update:word="(value) => updateFormField('phone', value)" id="phone" placeholder="聯絡電話" />
          <Transition name="fade">
            <div class="absolute top-[calc(100%+5px)] text-[11px] font-semibold text-[#ff405b]" v-if="errors.phone">{{ errors.phone }}</div>
          </Transition>
        </div>
      </AtomFormContainer>
      <AtomFormContainer class="flex items-center gap-10 text-[#8D8D8D]" label="email" name="電子信箱">
        <div class="relative w-full">
          <AtomFormInput @update:word="(value) => updateFormField('email', value)" id="email" placeholder="電子信箱" />
          <Transition name="fade">
            <div class="absolute top-[calc(100%+5px)] text-[11px] font-semibold text-[#ff405b]" v-if="errors.email">{{ errors.email }}</div>
          </Transition>
        </div>
      </AtomFormContainer>
      <AtomFormContainer class="flex items-center gap-10 text-[#8D8D8D]" label="company" name="機構名稱">
        <div class="relative w-full">
          <AtomFormInput @update:word="(value) => updateFormField('company', value)" id="company" placeholder="機構名稱" />
          <Transition name="fade">
            <div class="absolute top-[calc(100%+5px)] text-[11px] font-semibold text-[#ff405b]" v-if="errors.company">{{ errors.company }}</div>
          </Transition>
        </div>
      </AtomFormContainer>
      <AtomFormContainer class="flex items-center gap-10 text-[#8D8D8D]" label="section" name="場次">
        <div class="relative w-full">
          <AtomFormSelect :options="options" @update:word="(value) => updateFormField('section', value)" id="section" placeholder="請選擇" />
          <Transition name="fade">
            <div class="absolute top-[calc(100%+5px)] text-[11px] font-semibold text-[#ff405b]" v-if="errors.section">{{ errors.section }}</div>
          </Transition>
        </div>
      </AtomFormContainer>
      <AtomFormContainer class="flex items-center gap-10 text-[#8D8D8D]" label="section" name="場次">
        <div class="relative w-full">
          <CustomSelect :options="options" @update:word="(value) => updateFormField('section', value)" id="section" placeholder="請選擇" />
          <Transition name="fade">
            <div class="absolute top-[calc(100%+5px)] text-[11px] font-semibold text-[#ff405b]" v-if="errors.section">{{ errors.section }}</div>
          </Transition>
        </div>
      </AtomFormContainer>
      <AtomFormContainer class="flex items-center gap-10 text-[#8D8D8D]" label="other" name="其他">
        <div class="relative w-full">
          <AtomFormTextArea @update:word="(value) => updateFormField('other', value)" id="other" placeholder="其他" />
          <Transition name="fade">
            <div class="absolute top-[calc(100%+5px)] text-[11px] font-semibold text-[#ff405b]" v-if="errors.other">{{ errors.other }}</div>
          </Transition>
        </div>
      </AtomFormContainer>
      <button type="submit" class="bg-[#31B05C] block font-semibold text-center text-white rounded-[190px] w-[185px] h-[30px] mx-auto text-[15px] leading-[18.15px]">送出</button>
    </form>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}

.fade-enter-to {
  animation: shake 0.4s ease-in-out;
}
</style>
