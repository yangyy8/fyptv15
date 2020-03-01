<template>
    <div class="pairadd">
    <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 统计信息 <span class="mlr_10">/</span>  <b>办理工作信息统计</b> <span class="mlr_10">/</span>  <b>建议议案统计</b></span></div>
      <div class="content">
          <el-row>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('01','历年数字')" >历年数字</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('02','建议议案提案统计表')" >建议议案提案统计表</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('03','代表议案总表')" >代表议案总表</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('04','闭会期间建议总表')" >闭会期间建议总表</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('05','会议期间建议总表')" >会议期间建议总表</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('06','重点督办建议')" >重点督办建议</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('07','参加办理重点建议')" >参加办理重点建议</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('08','日常建议')" >日常建议</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('09','独办件')" >独办件</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('10','分办件')" >分办件</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('11','主办件')" >主办件</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('12','协办件')" >协办件</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('13','参阅')" >参阅</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('14','办公厅统稿院内分办文件')" >办公厅统稿院内分办文件</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('15','独办分办件未结')" >独办分办件未结</el-button></el-col>
            <el-col :span='8'><el-button type="primary" plain class="countbnt1" @click="getOpen('16','参阅件未结')" >参阅件未结</el-button></el-col>
          </el-row>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           
        }
    },
    methods:{
        getOpen(id,mc){
            if(id=='01')
            {
                this.$router.push({name:'SuggestCountNum',query:{mc:mc,type:id}});
            }else if(id=='02')
            {  
                this.$router.push({name:'SuggestCountSum',query:{mc:mc,type:id}});             
            }else {
               this.$router.push({name:'SuggestCountList',query:{mc:mc,type:id}});
            }
        },
    }
}
</script>