

import Vue from '../node_modules/vue/dist/vue'      //这是完整的vue包
// 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)

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

//安装图片预览插件,获取轮播图数据(不使用vue-resource了，不会用)
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
    router    //一定记住在vue实例上挂载路由对象   
})



