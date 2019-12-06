<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr/>
        <textarea placeholder="输入要BB的内容......" maxlength="120" v-model='msg'></textarea>

        <mt-button type='primary' size='large' @click='postComments'>发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key='item.add_time'>
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp; 用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}；
                </div>
                <div class="cmt-body">
                    <!-- i can i BB -->
                    {{item.content}}
                </div>
            </div>
        </div>

        <mt-button type='danger' size='large' plain @click='getMore'>加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
    data(){
        return {
            pageindex:1,   //默认显示第一页的数据
            comments:[],
            msg:''    //评论输入的内容
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        // 获取评论
        getComments(){
            this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then(result => {
                if(result.body.status === 0){
                    // this.comments = result.body.message;
                    
                    //每当获取新评论的时候，不要把老数据清空覆盖，而是应该拼接在第一页评论下面，所以用concat拼接
                    this.comments = this.comments.concat(result.body.message);
                }else{
                    Toast('获取评论失败')
                }
            })
        },
        // 加载更多
        getMore(){
            this.pageindex++;
            this.getComments();
        },
        //发表评论
        postComments(){
            if(this.msg.trim().length === 0){
                return Toast('评论内容不能为空！')
            }
            // 参数1：请求的url地址
            // 参数2：提交给服务器的数据对象{content:this.msg}
            // 参数3：定义提交时，表单中数据的格式
            this.$http.post('api/postcomment/' + this.$route.params.id,{content:this.msg.trim()}).then(function(result){
                if(result.body.status === 0){
                    //拼接出一个评论对象
                    // console.log(result.body);
                    
                    var cmt = {
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        comtent:this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg = '';
                    Toast('发表评论成功')
                }else{
                    Toast('发表评论失败')
                }
            })
        }
    },
    props:['id']
}
</script>

<style scoped>

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
    height: 35px;
    line-height: 35px;
    text-indent: 2em;
}
</style>