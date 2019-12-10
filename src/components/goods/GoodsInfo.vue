<template>
    <div class="goodsinfo-container">
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <Swipe :lunbotuList='lunbotu' :isfull='false'></Swipe>
            </div>
        </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
        <div class="mui-card-header">{{goodsinfo.title}}</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p class="price">
                    市场价：<del>￥{{goodsinfo.market_price}}</del>  销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                </p>
                <p>购买数量：<goodsinfo-numbox></goodsinfo-numbox></p>
                <p>
                    <mt-button type='primary' size='small'>立即购买</mt-button>
                    <mt-button type='danger' size='small'>加入购物车</mt-button>
                </p>
            </div>
        </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p>商品货号：{{goodsinfo.goods_no}}</p>
                <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                <p>上架时间：{{goodsinfo.add_time | dataFormat}}</p>
            </div>
        </div>
        <div class="mui-card-footer">
            <mt-button type='primary' size='large' plain @click="goDesc(id)">图文介绍</mt-button>
            <mt-button type='danger' size='large' plain @click="goComments(id)">商品评论</mt-button>
        </div>
    </div>
    </div>
</template>
<script>
import Swipe from '../subcomponents/swipe.vue'
//导入数字选择框组件
import GoodInfo_numbox from '../subcomponents/goosinfo_numbox.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,    //将路由参数对象中的eid挂载到data
            lunbotu:[],
            goodsinfo:[]
        }
    },
    created(){
        this.getLunBoTu();
        this.getGoodsInfo();
    },
    methods:{
        getLunBoTu(){
            this.$http.get("api/getthumimages/"+this.id).then(result=>{
                if (result.body.status === 0) {

                    //根据api接口的不同，轮播图的图片地址属性不一样，先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件中，只认识item.img，不认识item.url
                    result.body.message.forEach(item=>{
                        item.img = item.src;
                    })
                    this.lunbotu = result.body.message;
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/'+ this.id).then(result=>{
                if (result.body.status === 0) {
                    this.goodsinfo = result.body.message[0];
                }
            })
        },
        goDesc(id){
            this.$router.push('/home/goodsdesc/'+id)
        },
        goComments(id){
            this.$router.push('/home/goodscomments/'+id)
        }
    },
    
    components:{
        Swipe,
        'goodsinfo-numbox':GoodInfo_numbox
    }
}
</script>
 <style scoped>
 .goodsinfo-container{
     background-color: #eeeeee;
     overflow: hidden;
 }
 .now_price{
     color: red;
     font-size: 14px;
 }
 .mui-card-footer{
     display: block;
 }
 .mui-card-footer button{
     margin: 10px 0;
 }
 </style>