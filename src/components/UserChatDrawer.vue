<template>
  <aside class="user-chat-drawer">
    <ul class="user-chat__list">
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
        placeholder="메세지를 입력하세요." />
      <el-button
        type="primary"
        :icon="Position" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChatBubble from '@/components/ChatBubble.vue'
import { Position } from '@element-plus/icons-vue'

const newMsg = ref('')

const chatList = ref([{
  userName: '백미',
  contents: '고양이는 야옹',
  createdAt: new Date()
}])
</script>

<style lang="scss" scoped>
.user-chat-drawer {
  overflow-y: auto;
  position: relative;
  // width: 100%;
  max-height: 100vh;

  .user-chat {
    &__list {
      padding: $gap;
  
    }
  }
  .new-chat__wrap {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: $gap;
    .new-chat__input { width: 100%; }
  }
}
</style>