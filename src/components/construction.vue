<template>
    <div class="messages">
       <div class="context">
         <div class="main">
              <div style="margin:auto;text-align: center;">
                <img src="../assets/img/img_1.png" width="200" height="150"><br>
                   {{msg}}
                </div> 
           </div>   
        </div> 
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:'该功能正在建设中...',
            type:0,
        }
    },
    mounted(){
       
    },
}
</script>
<style scoped>
.messages{margin: 0;padding: 0}
.messages .context{background-color:#ffffff;
   height: 40%;	width:50%;min-width: 500px;min-height: 300px;
	position:fixed;
	top:0;right:0;bottom:0;left:0;
    margin:auto; border-radius: 10px;}
.messages .main{margin-top:10%;font-size: 25px; color: red}
</style>