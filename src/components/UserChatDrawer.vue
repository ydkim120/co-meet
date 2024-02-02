<template>
  <aside class="user-chat-drawer">
    <ul
      class="user-chat__list"
      ref="chatListRef">
      <li
        class="user-chat__item"
        v-for="(chat, idx) in chatList"
        :key="idx">
        <ChatBubble
          :user-name="chat.userName"
          :contents="chat.contents"
          :created-at="chat.createdAt" />
      </li>
    </ul>
    <div class="new-chat__wrap">
      <el-input
        class="new-chat__input"
        v-model="newMsg"
        :rows="1"
        resize="none"
        type="textarea"
        placeholder="메세지를 입력하세요."
        @keypress.enter="enterNewMsg()" />
      <el-button
        type="primary"
        :icon="Position"
        @click="enterNewMsg()" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import ChatBubble from '@/components/ChatBubble.vue'
import { Position } from '@element-plus/icons-vue'

const newMsg = ref('')
const chatListRef = ref<HTMLCanvasElement | null>(null)
const chatList = ref([{
  userName: '백미',
  contents: '고양이는 야옹',
  createdAt: new Date()
}])

const enterNewMsg = async (msg = newMsg.value) => {
  if (!msg?.trim()) return
  chatList.value.push({
    userName: '내 이름',
    contents: msg,
    createdAt: new Date ()
  })
  newMsg.value = ''
  await nextTick()
  scrollToBottom(chatListRef.value)
}

const scrollToBottom = (element: HTMLElement | null) => {
  element?.scrollTo({
    top: chatListRef?.value?.offsetHeight
  })
}
</script>

<style lang="scss" scoped>
.user-chat-drawer {
  position: relative;
  // width: 100%;
  
  .user-chat {
    &__list {
      overflow-y: auto;
      min-height: calc(100vh - 80px);
      max-height: calc(100vh - 80px);
      display: flex;
      flex-direction: column;
      gap: $gap;
      padding: $gap $gap 80px;
  
    }
    &__item {

    }
  }
  .new-chat__wrap {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: $gap;
    background-color: $background-color;
    .new-chat__input { width: 100%; }
  }
}
</style>