<template>
    <div>
        <h1>发表评论</h1>
        <hr/>
        <textarea placeholder="输入要BB的内容......" maxlength="120"></textarea>

        <mt-button type='primary'>发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title"></div>
                <div class="cmt-body"></div>
            </div>
        </div>

        <mt-button type='danger' plain>加载更多</mt-button>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>