#代码的说明文件：

#https://www.zhihu.com/question/19568896 主流开源协议之间的异同


#制作首页App组件
1、完成Header区域，使用的是Mint-UI中的Header组件
2、制作底部的Tabbar区域，使用的是muui中的Tabbar组件
   2.1  先把扩展图标的css样式拷贝到项目中，根据错误提示导入相应的扩展包
3、要在中间区域放置一个router-view来展示路由匹配到的组件
4、创建路由实例对象后，把tabbar的a标签改成router-link标签