<template>
    <div class="newsinfo-container">
        <h3 class="title">新闻标题</h3>
        <p class="subtitle">
            <span>发表时间：</span>
            <span>点击：0次</span>
        </p>
        <hr/>
        <div class="content"></div>

        <comment-box></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return {
            id:this.$route.params
        }
    },
    components:{
        'comment-box':comment
    }
}
</script>

<style scoped>
.newsinfo-container{
    padding: 0 4px;
}
.title{
    font-size: 10px;
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
.content{

}
</style>