<template>
    <div>
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for='item in lunbotuList' :key='item.url'>
                <!-- 使用vue在图片上绑定一个类使轮播图的图片宽度自适应 -->
                <img :src="item.img" alt="" :class="{'full':isfull}">   
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props:['lunbotuList','isfull'],    //isfull为图片是否自适应
}
</script>

<style scoped>
.mint-swipe{
    height: 200px;
}
.mint-swipe-item{
    /* background-color: rosybrown; */
    text-align: center;
}
img{
    /* 这个轮播图组件一开始图片的大小是宽高100%，但是后面在商品详情页中不适应，宽度需要自适应 */
    /* width:100%; */    
    height:100%;
}
.full{
    width: 100%
}
</style>