<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr/>
        <textarea placeholder="输入要BB的内容......" maxlength="120"></textarea>

        <mt-button type='primary' size='large'>发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key='item.add_time'>
                <div class="cmt-title">
                    第{{i+1}}楼：；用户：{{item.user.name}}；发表时间：{{item.add_time | dataFomat}}；
                </div>
                <div class="cmt-body">
                    i can i BB
                    {{item.content}}
                </div>
            </div>
        </div>

        <mt-button type='danger' size='large' plain @click='getMore'>加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageindex:1,   //默认显示第一页的数据
            comments:[]
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        // 获取评论
        getComments(){
            this.$http.get('/api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then(result => {
                if(result.body.status === 0){
                    // this.comments = result.body.message;
                    
                    //每当获取新评论的时候，不要把老数据清空覆盖，而是应该拼接在第一页评论下面，所以用concat拼接
                    this.comments = this.coments.concat(result.body.message);
                }else{
                    Toast('获取评论失败')
                }
            })
        },
        // 加载更多
        getMore(){
            this.pageindex++;
            this.getComments();
        }
    },
    props:['id']
}
</script>

<style scoped>
.cmt-container{
    
}
h3{
        font-size: 18px;
    }
textarea{
    font-size: 14px;
    height: 85px;
    margin: 0;
}
.cmt-list{
    margin: 10px 0;
}
.cmt-item{
    font-size: 13px;
}
.cmt-title{
    background-color: #cccccc;
    line-height: 35px;
}
.cmt-body{
    line-height: 35px;
    text-indent: 2em;
}
</style>