<template>
    <div>
        <cmt-box :id="this.$route.params.id"></cmt-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
    components:{
        'cmt-box':comment
    }
}
</script>

<style lang="stylus" scoped>

</style>