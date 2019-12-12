<template>
    <div class='shopcar-container'>
        <div class="mui-card" v-for="item in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch></mt-switch>
                    <img :src="item.thumb_path"/>
                    <div class="info">
                        <h3>{{item.title}}</h3>
                        <p>
                            <span class="price">￥{{item.sell_price}}</span>
                            <numbox></numbox>
                            <a href="#">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data(){
        return{
            goodsList:[]   //购物车中所有商品的数据
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            //1、获取到store中所有的商品id，然后拼接出一个用逗号分隔的字符串
            var idArr = [];
            this.$store.state.car.forEach(item=>idArr.push(item.id));

            //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if (idArr.length<=0) {
                return
            }
            //获取购物车商品列表
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result=>{
                if (result.body.status === 0) {
                    this.goodsList = result.body.message;           
                }
            })
        }
    },
    components:{
        numbox
    }
}

</script>



<style scoped>
.shopcar-container{
    background-color: #eeeeee;
    overflow: hidden;
}
.mui-card img{
    width: 60px;
    height: 60px;
}
.mui-card h3{
    font-size:16px;
    text-align: left;
    padding-bottom: 5px;
}
.info .price{
    color: red;
}
.mui-card-content-inner{
    display: flex;
    align-items: center;
}
</style>

