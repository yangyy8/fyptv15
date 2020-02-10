 <!--审议意见信息-->
<template lang="html">
    <div>

    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){

    },
    activated(){
        this.$router.push({name:'SuggestList',query:{type:4}});
    },
}
</script>