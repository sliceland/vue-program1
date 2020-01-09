

import Vue from '../node_modules/vue/dist/vue'      //这是完整的vue包
// 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//每次刚进入网站，会调用main.js，在刚要调用的时候 会先从本地存储中把购物车中的数据读出来存放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
    state:{   //this.$store.state.***
        car:car   //将购物车中的商品数据保存在数组中，数组用来存储商品的对象，形式：{id:商品的di,count:商品数量,price:商品单价,selected:false}
    },
    mutations:{   //this.$store.commit('方法名称'，'按需传递唯一的参数')
        addToCar(state,goodsinfo){   //点击加入购物车，把商品信息保存到store中的car上
            //分析：1、如果购物车中，之前就已经有商品了，那么，只需要更新数量
            //2、如果没有，则直接把数量push到car中即可

            var flag = false;  //标识符，假设在购物车中没有找到对应的商品
              
            state.car.some(item=>{   //假如在购物车中有对应的商品 还需增加
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag =true;
                    return true;    //some函数遇到true就会结束执行
                }
            })

            if(!flag){    //如果购物车中没有商品
                //如果最终循环完毕，得到的flag还是false，则把商品数据直接push到购物车中
                state.car.push(goodsinfo);
            }
           //当更新car之后，把数据保存到本地的localstorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            //修改购物车中商品的数量
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            })
            //当修改完商品的数量，把最新的购物车数据保存到本地存贮中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){   //根据id，从store中的购物车中删除对应的那条商品数据
            state.car.some((item,i)=>{
                if(item.id == id){
                    state.car.splice(i,1);
                    return true;
                }
            })
            //将删除完毕后最新的购物车数据保存到本地存贮中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected;
                    // return true;
                }
            })
            //把最新的所有购物车商品的状态保存到本地中
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{    //this.$store.getters.***
        //相当于计算属性，也相当于filters
        getAllCount(state){
            var c = 0;
            state.car.forEach(item=>{
                c += item.count;
            })
            return c;
        },
        getGoodsCount(state){   //获取购物车中（ShopcarContainer组件）的商品数量
            var o = {};
            state.car.forEach(item=>{
                o[item.id] = item.count;     //把item.id作为键，item.count作为键值
            })
            return o;
        },
        getGoodsSelected(state){
            var a = {};
            state.car.forEach(item=>{
                a[item.id] = item.selected
            })
            return a;
        },
        getGoodsCountAndAmount(state){
            var b = {
                count:0,   //勾选的数量
                account:0,   //勾选的总价
            }
            state.car.forEach(item=>{
                if(item.selected){
                    b.count += item.count;
                    b.account += item.price * item.count;
                }
            })
            return b;
        }
    }
})

//导入格式化时间的插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})


// 导入vue-resource  
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 导入v-viewer获取轮播图
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)

//安装图片预览插件,获取轮播图数据
// import VuePreview from 'vue-preview'
// Vue.use(VuePreview)

Vue.http.options.root = 'http://www.liulongbin.top:3005'  //配置vueresource的全局接口，将来要是接口改变只需修改这里即可，必须放在Vue.use(VueResource)之后
//全局设置 post 请求时表单数据格式组织形式  
Vue.http.options.emulateJSON = true;

//导入Tabbar里的路由组件
import HomeContainer from './components/Tabbar/HomeContainer.vue'
import MemberContaner from './components/Tabbar/MenberContainer.vue'
import ShopcarContainer from './components/Tabbar/ShopcarContainer.vue'
import SearchContainer from './components/Tabbar/SearchContainer.vue'


//导入二级路由
import NewsList from './components/news/NewsList.vue'
import PhotoList from './components/photos/PhotoList.vue'
import GoodsList from './components/goods/GoodsList.vue'

// 导入三级路由
import Newsinfo from './components/news/Newsinfo.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'

// 导入四级路由
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComments from './components/goods/GoodsComments.vue'

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//导入Mint-UI包和样式
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


import app from './app.vue'   //导入app组件
// import { filter } from 'minimatch'
// import moment from 'moment'

// 定义路由对象
var router = new VueRouter({
    routes:[
        { path:'/', redirect:'/home'},  //一打开程序的重定向
        { path:'/home',component: HomeContainer },
        { path:'/member',component: MemberContaner },
        { path:'/shopcar',component: ShopcarContainer },
        { path:'/search',component: SearchContainer },

        { path:'/home/newslist',component:NewsList},
        { path: '/home/newsinfo/:id',component:Newsinfo}, //此处id前加了冒号，表示要匹配id，代表放的是参数，
        { path:'/home/photolist',component:PhotoList},
        { path:'/home/photoinfo/:id',component:PhotoInfo},
        { path:'/home/goodslist',component:GoodsList},
        { path:'/home/goodsinfo/:id',component:GoodsInfo},
        { path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
        { path:'/home/goodscomments/:id',component:GoodsComments,name:'goodscomments'}
    ],
    linkActiveClass:'mui-active'   //覆盖默认的路由高亮的类，默认的类叫做router-link-active
})

var vm = new Vue({
    el:'#root',
    data:{

    },
    render:c=>c(app),
    router,    //一定记住在vue实例上挂载路由对象   
    store   //在vm实例上挂载vuex的store状态管理仓库
})



