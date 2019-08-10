//这个配置文件其实就是js文件，通过Node中的模块操作，向外暴露了一个配置对象
//由于webpack是基于node构建的，所有webpack的配置文件中，任何合法的node代码都是支持的
const path = require('path');
const webpack = require('webpack');    //启用热更新的第二步

//导入在内存中生成html页面的插件     只要是插件，都一定要放到plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode:'development',
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'  //指定输出的文件名称
    },
    //通过在package.json文件中配置dev是webpack-dev-server配置方式之一，下面介绍webpack-dev-server另一种配置方式
    //package.json配置文件中不能写中文，注释也不行，否则会有错误。所以package.json文件里webpack-dev-server配置方式之一的dev改成了dev2，以下配置的是dev。
    // package.json的name参数是按照文件夹名字自动生成，当然也可以自己修改，但是不能为webpack。
    devServer:{  //webpack-dev-server第二种配置方式
        open:true,  //自动打开浏览器
        // port:3000,   //设置运行端口
        contentBase:'src',  //指定托管根目录
        hot:true  //启用热更新     的第一步
    },
    plugins:[  //配置插件的节点
        new webpack.HotModuleReplacementPlugin(),   //new一个热更新的模块对象，这是启用热更新的第三步
    
        new htmlWebpackPlugin({  //创建一个在内存中生成html页面的插件
            template:path.join(__dirname,'./src/index.html'),   //指定模板页面，将来会根据指定的页面路径去生成内存中的页面
            filename:'index.html'    //指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module:{   //这个节点，用于配置所有第三方模块加载器
        rules:[
            { test:/\.css$/,use:['style-loader','css-loader'] },
            { test:/\.(jpg|png|bmp|jpeg)/,use:'url-loader?limit=25700' },    //处理图片路径的loader，file-loader是其内部依赖，所以不用再配置file-loader
            //'?limit=25701'是传入的参数，limit给定的值是图片的大小，单位是byte，如果我们引用的图片大于或等于给定的limit值，则不会被转为base64格式
            // 的字符串，如果图片小于给定的limit值，则会被转为base64的字符串
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
            
            { test:/\.vue$/,use:'vue-loader', exclude: /node_modules/ }   //配置vue-loader
        ]
    },
    // resolve:{
    //     alias:{
    //         'vue$':'vue/dist/vue.js'
    //     }
    // }
}







//当我们在控制台直接输入webpack命令执行的时候，webpack做了一下几步：
// 1、首先，webpack发现 我们并没有通过命令的形式，给它指定入口和出口
// 2、webpack会去项目的根目录中，查找 webpack.config.js的配置文件
// 3、当找到配置文件后，webpack就回去执行这个配置文件，当解析执行完配置文件后，就得到配置文件中，导出的配置对象
// 4、当webpack拿到配置对象后，就拿到了配置对象中，指定的入口和出口，然后进行打包构建