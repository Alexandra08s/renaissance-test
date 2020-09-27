<template>
  <div v-click-outside="() => $emit('close')" class="user-card">
    <p class="user-card__name">
      {{ user.name }}
    </p>
    <p class="user-card__info">
      Номер телефона: <span>{{ user.name }}</span>
    </p>
    <p class="user-card__info">
      Адрес: <span>{{ user.address }}</span>
    </p>
    <a-button
      class="user-card__btn"
      :minus="!!usersAddedState[user.id]"
      @click="$emit('toggle-user', user.id)"
    />
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import aButton from './a-button.vue'

export default {
  name: 'UserCard',
  components: {
    aButton
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    usersAddedState: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-card {
    background-color: $color-white;
    padding: 10px 15px 15px 16px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    border-radius: 3px;
    max-width: 270px;

    &__name {
      font-size: 18px;
      line-height: 21px;
      margin-bottom: 25px;
    }

    &__info {
      margin-bottom: 15px;
    }

    &__btn {
      width: 16px;
      height: 16px;
      margin-left: auto;
      display: block;
    }
  }
</style>
