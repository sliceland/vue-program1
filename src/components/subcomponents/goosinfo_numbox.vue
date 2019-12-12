<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change='countChange' ref="numbox" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
    <!-- 子组件什么时候把数据传递给父组件？ -->
</template>

<script>
import mui from '../../lib/mui/js/mui.js'
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
    mounted(){
        mui('mui-numbox').numbox();    //初始化数字选择框
    },
    methods:{
        countChange(){    //每当文本框的数据改变时，立即把最新的数据，通过实践调用传递给父组件
        // console.log(this.$refs.numbox.value);
            this.$emit('getCount',parseInt(this.$refs.numbox.value));
        }
    },
    props:['max'],
    watch:{   //监听数量的最大值        
        'max':function(newValue,oldValue){
            mui('mui-numbox').numbox().setOption('max',newValue)
        }
    }

}
</script>

<style lang="stylus" scoped>

</style>