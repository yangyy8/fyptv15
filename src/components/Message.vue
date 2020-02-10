<template>
    <div class="messages">
       <div class="context">
         <div class="main">
          <img src="../assets/img/img_1.png" width="200" height="150"><br>
             2.28号系统暂停使用，请联系管理员
          </div>  
        </div> 
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.messages{margin: 0;padding: 0}
.messages .context{background-color:#ffffff;
	height:45%;width:50%;min-width: 500px;min-height: 250px;
	position:fixed;
	top:0;right:0;bottom:0;left:0;
    margin:auto; border-radius: 10px;}
.messages .main{margin-top:5%;font-size: 25px; color: red}
</style>