 <!--政协提案列表-->
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
        this.$router.push({name:'SuggestList',query:{type:2}});
    },
}
</script>