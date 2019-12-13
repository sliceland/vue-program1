<template>
    <div class='shopcar-container'>
        <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                    @click="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path"/>
                    <div class="info">
                        <h3>{{item.title}}</h3>
                        <p>
                            <span class="price">￥{{item.sell_price}}</span>
                            <numbox :initcount='$store.getters.getGoodsCount[item.id]' :goodsid='item.id'></numbox>

                            <!-- 如何从购物车中获取商品的数量 -->
                            <!-- 1、先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环的这条商品的id作为对象的属性名，
                            count值作为对象的属性值，这样，当把所有的商品循环一遍，就会得到一个对象：{ 88:2,89:7} -->
                            <a href="#" @click.prevent='remove(item.id)'>删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner sum">
                    <div class="left">
                        <p>总计（不含运费）：</p>
                        <p>已购商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价￥<span class="red">{{$store.getters.getGoodsCountAndAmount.account}}</span></p>
                    </div>                
                    <mt-button type='danger'>去结算</mt-button>    
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
        },
        remove(id,index){
            //点击删除，把商品从store中根据传递的id删除，同时，把当前组件中的goodslist中，
            //对应要删除的那个商品，使用index来删除
            this.goodsList.splice(index,1);
            this.$store.commit('removeFromCar',id);

        },
        selectedChanged(id,value){
            //每当点击开关，把最新的开关状态同步到store中
            // console.log(id + '===' +val)
            this.$store.commit('updateGoodsSelected',{id,selected:value})
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
.sum{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.red{
    color: red;
    font-size: 16px;
}
</style>

