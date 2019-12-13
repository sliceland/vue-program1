<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change='countChange' ref="numbox" />
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
            console.log(this.$refs.numbox.value);
            //每当数量值改变时，则立即把最新的数量同步到购物车的store中，覆盖之前的数量值
            this.$store.commit('updateGoodsInfo',{id:this.goodsid,count:parseInt(this.$refs.numbox.value)})
        }

    },
    props:['initcount','goodsid']
}
</script>

<style scoped>


</style>