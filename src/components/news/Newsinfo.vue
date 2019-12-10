<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time | dataFormat}}</span>
            <span>点击：{{newsinfo.click}} 次</span>
        </p>
        <hr/>
        <!-- 新闻内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论区子组件区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            id:this.$route.params.id,   //讲url地址中传递过来的id值挂载到data上，方便以后多处使用
            newsinfo:[]  //放新闻对象
        }
    },
    components:{
        'comment-box':comment
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result => {
                if(result.body.status === 0){
                    console.log(result.body);
                    this.newsinfo = result.body.message[0];
                    // Toast('获取新闻详情成功')
                }else{
                    Toast('获取新闻详情失败')
                }
            })
        }
    }
}
</script>

<style scoped>
.newsinfo-container{
    padding: 0 4px;
}
.title{
    font-size: 16px;
    text-align: center;
    margin:15px 0;
    color: brown;
}
.subtitle{
    font-size: 13px;
    color: blue;
    display: flex;
    justify-content: space-between;
}
</style>