<template>
  <button
    type="button"
    :title="minus ? 'Удалить' : 'Добавить'"
    :class="[
      'btn',
      {
        'btn--plus': !minus,
        'btn--minus': minus
      }
    ]"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  name: 'AButton',
  props: {
    minus: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    background-repeat: no-repeat;
    background-size: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &--plus {
      background-image: url('~@/assets/img/plus-icon.svg');
    }

    &--minus {
      background-image: url('~@/assets/img/minus-icon.svg');
    }
  }
</style>
