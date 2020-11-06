<template>
  <div class="app-dot-flashing" />
</template>

<style lang="less">
.app-dot-flashing {
  @dot-flashing-size: 15px;
  @dot-flashing-color: @primary-color;

  position: relative;
  width: @dot-flashing-size;
  height: @dot-flashing-size;
  border-radius: 50%;
  background-color: @dot-flashing-color;
  color: @dot-flashing-color;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;

  &:before,
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &:before {
    left: calc((@dot-flashing-size + 7px) * -1);
    width: @dot-flashing-size;
    height: @dot-flashing-size;
    border-radius: 50%;
    background-color: @dot-flashing-color;
    color: @dot-flashing-color;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  &:after {
    left: calc((@dot-flashing-size + 7px));
    width: @dot-flashing-size;
    height: @dot-flashing-size;
    border-radius: 50%;
    background-color: @dot-flashing-color;
    color: @dot-flashing-color;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: @dot-flashing-color;
    }
    50%,
    100% {
      background-color: lighten(@dot-flashing-color, 30%);
    }
  }
}
</style>
