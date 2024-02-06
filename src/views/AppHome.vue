<template>
  <div class="app-home__wrap">
    <h1 class="app-home__title">
      Co-Meet !
    </h1>
    <div class="app-home__buttons buttons__center">
      <el-button>회원가입</el-button>
      <el-button type="primary">
        로그인
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">

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
  }
}
</style>