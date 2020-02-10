 <!--审议意见列表-->
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
        this.$router.push({name:'SuggestInfo',query:{type:4}});
    },
}
</script>