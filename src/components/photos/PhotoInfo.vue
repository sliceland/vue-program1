<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time | dataFormat}}</span>
            <span>点击：{{photoinfo.click}} 次</span>
        </p>
        <hr>

        <!-- 缩略图区域 -->
        <!-- <vue-preview :slides="photoinfo.src" @close="handleClose"></vue-preview> -->
        <viewer :images="images">
            <img v-for="item in images" :src="item.src" :key="item.src" width="300">
        </viewer>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content">

        </div>

        <!-- 放置一个现成的评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
// 1、导入评论子组件
import comment from '../subcomponents/comment.vue'   //注意导入这里的文件需要带后缀！！！！！！！！！
export default {
    data(){
        return{
            id:this.$route.params.id,   //从路由中获取到的图片id
            photoinfo:[],  //图片详情
            images:[]    //缩略图
            
        }
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/' + this.id).then( result=> {
                if (result.body.status === 0) {
                    this.photoinfo = result.body.message[0];
                }
            })
        },
        getThumbs(){    //获取缩略图
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if (result.body.status === 0) {             
                    this.images = result.body.message;
                }
            })
        },
    },
    // 2、注册评论子组件
    components:{
        'cmt-box':comment,
        // 'vue-preview':VuePreview
    }
}

</script>

<style scoped>
.photoinfo-container{
    padding:3px;
}
.photoinfo-container h3{
    font-size: 15px;
    color: blue;
    text-align: center;
    margin: 15px 0;
}
.subtitle{
    margin: 0 4px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}
.content{
    margin: 0 4px;
    font-size: 14px;
    line-height: 25px;
}
img{
    width: 100px;
    margin: 5px;
}
</style>