 <!--政协提案信息-->
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
        this.$router.push({name:'SuggestInfo',query:{type:2}});
    },
}
</script>