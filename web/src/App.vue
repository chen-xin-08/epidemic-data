<template>
  <div class="box" :style="{background:`url(${bg}) no-repeat`}">
    <div class="box-left"></div>
    <div class="box-center"></div>
    <div class="box-right"></div>
  </div>
</template>

<script lang="ts" setup>
import bg from './assets/1.jpg'
import {useStore} from './stores'

const store = useStore()
store.getList()

</script>

<style lang="less">
*{
  padding: 0;
  margin: 0;
}
html,body,#app{
  height: 100%;
  overflow: hidden;
}
.box{
  height:100%;
  display: flex;
  // background-repeat: no-repeat !important;
  background-size: cover !important;
  &-left{
    width: 400px;

  }
  &-center{
    flex: 1;
  }
  &-right{
    width: 400px;
  }
}
</style>