<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change='countChange'/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
    <!-- 子组件什么时候把数据传递给父组件？ -->
</template>

<script>
import mui from '../../lib/mui/js/mui.js'

export default {
    mounted(){
        mui('mui-numbox').numbox();    //初始化数字选择框
    },
    methods:{
        countChange(){

        }

    },
}
</script>

<style scoped>


</style>