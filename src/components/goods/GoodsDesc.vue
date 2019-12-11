<template>
    <div>
        <h3>{{info.title}}</h3>
        <hr/>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info:{}   //放置图文详情
        }
    },
    created(){
        this.getGoodsDesc();
    },
    methods:{
        getGoodsDesc(){
            this.$http.get('api/goods/getdesc/'+this.$route.params.id).then(result=>{
                if (result.body.status === 0) {
                    this.info = result.body.message[0];                    
                }
            })
        }
    }
}
</script>

<style scope>
h3{
    font-size:16px;
    color: #226aef;
    margin: 10px;
    text-align: center;
}
.content{
    padding: 10px;
}
.content img{
    width: 100%;
}

</style>