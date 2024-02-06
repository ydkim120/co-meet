<template>
  <div class="app-home__wrap">
    <h1 class="app-home__title">
      Co-Meet !
    </h1>
    <div class="app-home__buttons buttons__center">
      <el-button disabled>
        회원가입
      </el-button>
      <el-button
        type="primary"
        disabled>
        로그인
      </el-button>
      <div class="buttons__center">
        <el-button
          class="test-btn"
          type="primary"
          size="large"
          @click="router.push({ name: 'video-chats' })">
          새 회의
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

</script>

<style scoped lang="scss">
.app-home {
  position: relative;
  &__title {
    position: absolute;
    top: 30%;
    left: 80px;
    font-weight: 900;
    font-size: 3rem;
    color: $primary;
  }
  &__buttons {
    position: absolute;
    top: 40%;
    left: 80px;
    width: 200px;
  }
}
.test-btn { 
  width: 100%;
  margin-top: $gap-m;
}
</style>