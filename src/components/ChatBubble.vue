<template>
  <div class="chat-bubble">
    <ProfilePhoto
      class="chat-bubble__user-photo"
      size="60px"
      :src="''" />
    <div class="chat-bubble__container">
      <b
        class="chat-bubble__user-name">
        {{ props.userName }}
      </b>
      <div
        class="chat-bubble__content"
        v-html="contents" />
    </div>
    <small
      v-if="props.createdAt"
      class="chat-bubble__time">
      {{ dateSimple(props.createdAt) }}
    </small>
  </div>
</template>

<script setup lang="ts">
import ProfilePhoto from '@/components/ProfilePhoto.vue'
import dayjs from 'dayjs'

export interface Props {
  contents?: string
  createdAt?: string | Date
  userEmail?: string
  userName?: string
  userPhoto?: string
}
const props = withDefaults(defineProps<Props>(), {
  contents: '',
  createdAt: '',
  userEmail: '',
  userName: '',
  userPhoto: '',
})

const dateSimple = (date: string) => {
  if (!date) return ''
  const dateValue = +new Date(date)
  return dayjs(dateValue).format('A HH:mm')
}

</script>

<style scoped lang="scss">
.chat-bubble {
  display: flex;
  gap: 10px;
  &__user-photo { margin-right: 5px; }

  &__user-name {
    display: block;
    margin-bottom: 5px;
  }

  &__content {
    display: block;
    position: relative;
    align-self: flex-start;
    padding: 15px;
    gap: 10px;
    background-color: $primary;
    border-radius: 15px;
    color: $white;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: -3px;
      height: 20px;
    }

    &::before {
      border-top-right-radius: 10px;
      border-left: 1rem solid $primary;
      left: -0.35rem;
    }

    &::after {
      background-color: $background-color;
      border-top-right-radius: 50%;
      left: 20px;
      transform: translate(-30px, 0px);
      width: 10px;
    }
  }

  &__time {
    display: flex;
    align-items: flex-end;
    width: 50px;
  }
}
</style>