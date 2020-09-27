<template>
  <input
    placeholder="Введите имя..."
    class="input"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  name: 'AInput'
}
</script>

<style lang="scss" scoped>
  .input {
    height: 20px;
    width: 100%;
    background-color: $color-white;
    padding: 3px 0 3px 8px;
    border: 1px solid $color-black;
    border-radius: 3px;
  }
</style>
