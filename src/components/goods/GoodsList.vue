<template>
    <div class="goods-list">
       <!-- <router-link class="good-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
           <img :src='item.img_url'>
           <h3>{{item.title}}</h3>
           <div class="info">
               <p class="price">
                   <span class="now">￥{{item.sell_price}}</span>
                   <span class="old">￥{{item.market_price}}</span>
               </p>
               <p class="sell">
                   <span>热卖中</span>
                   <span>剩{{item.stock_quantity}}件</span>
               </p>
           </div>
       </router-link> -->

        <!-- 在网页中，有两种跳转方式 -->
        <!-- 1、使用a标签的形式，叫做 标签跳转 -->
        <!-- 2、使用window.location.href的形式，叫做 编程式导航 -->
       <div class="good-item" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
           <img :src='item.img_url'>
           <h3>{{item.title}}</h3>
           <div class="info">
               <p class="price">
                   <span class="now">￥{{item.sell_price}}</span>
                   <span class="old">￥{{item.market_price}}</span>
               </p>
               <p class="sell">
                   <span>热卖中</span>
                   <span>剩{{item.stock_quantity}}件</span>
               </p>
           </div>
       </div>
       <mt-button type='danger' size='large' @click='getMore'>加载更多</mt-button>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            pageindex:1,     //分类的页数
            goodslist:[]    //存放商品列表的数组
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){  //获取商品列表
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result=>{
                if (result.body.status === 0) {
                    this.goodslist = this.goodslist.concat(result.body.message);
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        getDetail(id){
            //使用js的形式导入路由
    console.log(this);
            // 注意区分this.$route和this.$router
            // this.$route是路由【参数对象】，所有路由中的参数，包括params和query都属于它
            // this.$router是路由【导航对象】，用它可以方便地使用js代码，实现理由的前进、后退、条黄钻到新的rul地址
            this.$router.push('/home/goodsinfo/'+id)
        }
    }
}
</script>

<style scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding:5px;  
}
.good-item{
    width: 49%;
    border: 1px solid #cccccc;
    box-shadow: 0 0 8px #cccccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    min-height: 293px;
}
.good-item img{
    width: 100%;
}
h3{
    margin: 2px;
    font-size: 14px;
    text-align: left;
}
.info{
    background-color: #eeeeee;
}
.info p{
    margin: 0;
    font-size: 8px;
}
.info .now{
    color: red;
    font-size: 14px;
}
.info .old{
    font-size: 12px;
    text-decoration: line-through;
    margin-left: 4px;
}
.sell{
    font-size: 10px;
    display: flex;
    justify-content: space-between;

}
</style>