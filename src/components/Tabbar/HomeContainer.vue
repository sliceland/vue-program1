<template>
    <div>
        <!-- 轮播图区域 -->
        <Swipe :lunbotuList='lunbotuList' :isfull='true'></Swipe>

        <!-- 首页六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/六宫格小图标/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/六宫格小图标/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/六宫格小图标/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/六宫格小图标/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/六宫格小图标/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/六宫格小图标/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>
            
        </ul> 
    </div>
</template>

<script>
import Swipe from '../subcomponents/swipe.vue'
import {Toast} from 'mint-ui'
export default {    
    data(){
        return {
            lunbotuList:[]  //保存轮播图的数组
        }
    },
    created(){
        this.getLunbotu();
    },
    methods:{
        getLunbotu(){
            this.$http.get('api/getlunbo').then(result =>{
                // this.$set('lunbotuList',reault.data)

                console.log(result.body)
                if(result.body.status === 0){
                    
                    this.lunbotuList = result.body.message;
                    // Toast ('数据获取成功')
                }else{
                    Toast ('数据获取失败！！！')
                }
            })
        }
    },
    components:{
        Swipe
    }
}
</script>



<style scoped>


/* 六宫格默认样式的修改 */

/* ul的改造 */
.mui-grid-view.mui-grid-9{
    background-color: #ffffff;
    border: none;
}
.mui-grid-view.mui-grid-9 img{
    width:60px
}

/* li的改造 */
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 0;
}
.mui-media-body{
    font-size: 12px;
}
</style>

