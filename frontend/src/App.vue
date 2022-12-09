<script setup lang="ts">
import { NSpin } from 'naive-ui'
import { ref } from "vue";
import { apiGenerateImage, apiConversation } from "./api";

const content = ref("");
const analysisResult = ref("");
const imageUrl = ref<string>("");
const analysisBox = ref<any>(null)
const imageLoading = ref(false)
const analysisLoading = ref(false)
const currentStatement = ref("")


function reset() {
  content.value = ""
  analysisResult.value = ""
  imageUrl.value = ""
}

function handleCheck() {
  const contentValue = content.value
  currentStatement.value = content.value
  reset()
  
  imageLoading.value = true
  analysisLoading.value = true
  apiGenerateImage(contentValue).then(({ data }) => {
    imageUrl.value = data.data;
    imageLoading.value = false
  });
  apiConversation(contentValue, (data) => {
    analysisResult.value = data;
    analysisLoading.value = false
    if (analysisBox.value) {
      analysisBox.value.scrollTop = analysisBox.value.scrollHeight
    }
  });
}
</script>

<template>
  <div>
    <div class="">
      <h1 class="mb-9">{{currentStatement}}</h1>
      <div class="flex mb-9">
        <div class="w-96 h-96 border-solid border-2 border-purple-500 flex flex-col">
          <h2 class="text-xl">图片</h2>
          <n-spin size="large" v-show="imageLoading"/>
          <div class="flex grow ">
            <img class="block m-auto" :src="imageUrl" alt="" srcset="" />
          </div>
        </div>
        <div class="whitespace-pre-line w-96 h-96 border-solid border-2 border-red-500 overflow-auto" ref="analysisBox">
          <h2 class="text-xl">解析</h2>
          <n-spin size="large" v-show="analysisLoading"/>
          <div class="p-6">
            {{ analysisResult }}
          </div>
        </div>
      </div>
      <div>
        <input type="text" v-model="content" />
        <button @click="handleCheck">check</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
