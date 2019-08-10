import Vue from '../node_modules/vue/dist/vue'      //这是完整的vue包
// 导入路由的包
import VuerRouter from 'vue-router'
Vue.use(VuerRouter)

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



