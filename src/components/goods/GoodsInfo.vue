<template>
    <div class="goodsinfo-container">

        <transition
          @before-enter='beforeEnter'
          @enter='enter'
          @after-enter='afterEnter'>
            <div class="ball" v-show="!ballFlag" ref="ball" id="ball"></div>
        </transition>

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
                <p>购买数量：<goodsinfo-numbox @getCount='getSelectCount' :max='goodsinfo.stock_quantity'></goodsinfo-numbox></p>
                <p>
                    <mt-button type='primary' size='small'>立即购买</mt-button>
                    <mt-button type='danger' size='small' @click="addToShopcar">加入购物车</mt-button>
                
                <!-- 分析：如何实现加入购物车时，拿到选择的数量？
                1、按钮属于goodsInfo页面，数字属于numbox组件，由于涉及到父子组件的嵌套，所以，无法直接在goodsInfo页面中获取到选中的数量
                2、涉及到子组件像父组件传值（事件调用机制）
                3、事件调用机制本质：父组件向子组件传递方法，子组件调用这个方法，同时把数据当作参数传递给这个方法 -->
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
            goodsinfo:[],
            ballFlag:true,     //小球初始状态
            selectCount:1    //保存用户选中的商品数量，默认为1
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
        },
        
        addToShopcar(){   //添加到购物车事件
            this.ballFlag=!this.ballFlag;
        },

        //小球动画

        // 小球动画优化思路：
        // 1、先分析导致小球不准确的本质原因，我们把小球最终位移到的位置，局限在了某一分辨率下的滚动条未滚动的情况下
        // 2、只要分辨率改变，或者滚动条滑动，小球就不能到达预定的位置，因此，小球位置应该写活，根据实际情况动态计算小球位移的坐标
        // 3、解题思路：先得到购物车徽标的横纵坐标，再得到小球初始的横纵坐标，再横纵坐标相减
        // 4、方法：domObject.getBoundingClientRect(),这个方法能得到距离页面顶部和左侧的距离


        
        beforeEnter(el){
            el.style.transform = 'translate(0,0)'
        },
        enter(el,done){
            el.offsetWidth;

            //获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();

            // //获取购物车徽标的位置，虽然vue不推荐操作DOM，但是不涉及数据绑定和数据获取，纯业务逻辑需要，直接通过操作DOM的方法获得一下购物车徽标
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            // el.style.transform = 'translate(${xDist}px,${yDist}px)';
            el.style.transform = "translate("+xDist+"px, "+yDist+"px)";
            el.style.transition = 'all 1s ease';
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },

        getSelectCount(count){
            this.selectCount = count;   //当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
            // console.log(this.selectCount)
        }
    },
    
    components:{
        Swipe,
        'goodsinfo-numbox':GoodInfo_numbox
    },
    
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
 .ball{
     width: 15px;
     height: 15px;
     border-radius: 50%;
     background-color: red;
     position: absolute;
     z-index: 99;
     top: 410px;
     left: 150px;
     
 }
 </style>