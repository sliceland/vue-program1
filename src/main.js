import Vue from '../node_modules/vue/dist/vue'      //这是完整的vue包
// 导入路由的包
import VuerRouter from 'vue-router'
Vue.use(VuerRouter)


// 导入vue-resource  获取轮播图数据
import VueResource from 'vue-resource'
Vue.use(VueResource)

// Vue.http.options.root = 'http://vue.studyit.io'  //配置vueresource的全局接口，将来要是接口改变只需修改这里即可，必须放在Vue.use(VueResource)之后
// 此处不用该配置，每个api都不一样

//导入Tabbar里的路由组件
import HomeContainer from './components/Tabbar/HomeContainer.vue'
import MemberContaner from './components/Tabbar/MenberContainer.vue'
import ShopcarContainer from './components/Tabbar/ShopcarContainer.vue'
import SearchContainer from './components/Tabbar/SearchContainer.vue'

//导入二级路由了
import NewsList from './components/news/NewsList.vue'

// 导入三级路由
import Newsinfo from './components/news/Newsinfo.vue'

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//导入Mint-UI包和样式
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


import app from './app.vue'   //导入app组件

// 定义路由对象
var router = new VuerRouter({
    routes:[
        { path:'/', redirect:'/home'},  //一打开程序的重定向
        { path:'/home',component: HomeContainer },
        { path:'/member',component: MemberContaner },
        { path:'/shopcar',component: ShopcarContainer },
        { path:'/search',component: SearchContainer },

        { path:'/home/newslist',component:NewsList},

        { path: '/home/newsinfo/:id',component:Newsinfo}
    ],
    linkActiveClass:'mui-active'   //覆盖默认的路由高亮的类，默认的类叫做router-link-active
})

var vm = new Vue({
    el:'#root',
    data:{

    },
    render:c=>c(app),
    router    //一定记住在vue实例上挂载路有对象   
})



