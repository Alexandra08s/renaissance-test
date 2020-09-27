<template>
  <div class="user-block">
    <p class="user-block__name" @click="$emit('show-card', user)">
      {{ user.name }}
    </p>
    <a-button
      class="user-block__btn"
      :minus="!!usersAddedState[user.id]"
      @click="$emit('toggle-user', user.id)"
    />
  </div>
</template>

<script>
import aButton from './a-button.vue'

export default {
  name: 'UserItem',
  components: {
    aButton
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
  .user-block {
    background-color: $color-white;
    padding: 3px 8px;
    height: 20px;
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.2);
    border-radius: 3px;
    display: flex;
    align-items: center;

    &__name {
      cursor: pointer;
    }

    &__btn {
      margin-left: auto;
      width: 10px;
      height: 10px;
    }
  }
</style>
