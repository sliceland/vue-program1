import Vue from '../node_modules/vue/dist/vue'      //这是完整的vue包


import './lib/mui/css/mui.css'

//导入Mint-UI包和样式
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


import app from './app.vue'   //导入app组件
var vm = new Vue({
    el:'#root',
    data:{

    },
    render:c=>c(app)
   
})