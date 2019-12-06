<template>
    <div>
        <ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key='item.id'>
				<router-link :to="'/home/newsinfo/' + item.id">
				
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">						
						<h3 class='mui-ellipsis'>{{item.title}}</h3>
						<p class="p-span">
							<span>发表时间：{{item.add_time | dataFormat}}</span>
							<span>点击次数：{{item.click}}次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default{   //获取新闻列列表
	data(){
		return {
			newslist:[]
		}
	},
	created(){
        this.getNewsList();
    },
	methods:{
		getNewsList(){   //获取新闻列表
			this.$http.get('api/getnewslist').then(result=>{
				if(result.body.status ===0){
					console.log(result.body);
					this.newslist = result.body.message;
					// Toast('获取新闻列表成功')
				}else{
					Toast('获取新闻列表失败')
				}
			})
		}
	}
}
</script>

<style scoped>
.mui-table-view h3{
	font-size: 14px;
}
.mui-table-view span{
	font-size: 12px;
	color:#226aff;
	/* CSS3的样式，两个span标签左右对齐 */
	  
}
.p-span{
	display: flex;
	justify-content: space-between;  
}
</style>