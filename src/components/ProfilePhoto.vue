<template>
  <div class="profile-photo">
    <div 
      class="user-profile-photo" 
      :style="{ width: props.size, height: props.size }">
      <img
        v-if="props.src && isImageLoadSuccess" 
        :src="props.src || ''"
        :alt="'profilePhoto'"
        :style="{ width: props.size, height: props.size }"
        onerror="isImageLoadSuccess = false" />
      <span
        v-else
        class="default-photo"
        :style="{ width: props.size, height: props.size }">
        <el-icon
          style="vertical-align: middle"
          size="40px">
          <User />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { User } from '@element-plus/icons-vue'


export interface Props {
  src?: string | undefined,
  size?: string,
}
const props = withDefaults(defineProps<Props>(), {
  src: '',
  size: '150px',
})

const isImageLoadSuccess = ref(true)

onMounted(() => {
})
</script>

<style lang="scss" scoped>
.profile-photo {
  position: relative;
}
.user-profile-photo {
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid $light-gray;
  cursor: pointer;
  &.-center { margin: 0 auto;}
  img { object-fit: cover; }
}
.default-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $light-gray;
  background-color: $white;

}
</style>