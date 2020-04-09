<template>
    <div class="pairadd">
    <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 统计信息 <span class="mlr_10">/</span>  <b>办理工作信息统计</b> <span class="mlr_10">/</span>  <b>建议议案统计</b></span></div>
      <div class="content">
          <!-- <el-row style="line-height:75px;">
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
          </el-row> -->

          <div class="sc">
               <ul>
                   <li @click="getOpen('01','历年数字')">
                       <div class="scimg"><img src="../../assets/img/count/icon1.png"/></div>
                       <div class="scpl">历年数字</div>
                    </li>
                    <li @click="getOpen('02','建议议案提案统计表')">
                       <div class="scimg"><img src="../../assets/img/count/icon2.png"/></div>
                       <div class="scpl">建议议案提案<br/>统计表</div>
                    </li>
                     <li @click="getOpen('03','代表议案总表')">
                       <div class="scimg"><img src="../../assets/img/count/icon3.png"/></div>
                       <div class="scpl">代表议案总表</div>
                    </li>
                     <li @click="getOpen('04','闭会期间建议总表')">
                       <div class="scimg"><img src="../../assets/img/count/icon4.png"/></div>
                       <div class="scpl">闭会期间建议总表</div>
                    </li>
                     <li @click="getOpen('05','会议期间建议总表')">
                       <div class="scimg"><img src="../../assets/img/count/icon5.png"/></div>
                       <div class="scpl">会议期间建议总表</div>
                    </li>
                     <li @click="getOpen('06','重点督办建议')">
                       <div class="scimg"><img src="../../assets/img/count/icon6.png"/></div>
                       <div class="scpl">重点督办建议</div>
                    </li>
                    <li @click="getOpen('07','参加办理重点建议')">
                       <div class="scimg"><img src="../../assets/img/count/icon7.png"/></div>
                       <div class="scpl">参加办理重点建议</div>
                    </li>
                    <li @click="getOpen('08','日常建议')">
                       <div class="scimg"><img src="../../assets/img/count/icon8.png"/></div>
                       <div class="scpl">日常建议</div>
                    </li>
                    <li @click="getOpen('09','独办件')">
                       <div class="scimg"><img src="../../assets/img/count/icon9.png"/></div>
                       <div class="scpl">独办件</div>
                    </li>
                    <li @click="getOpen('10','分办件')">
                       <div class="scimg"><img src="../../assets/img/count/icon10.png"/></div>
                       <div class="scpl">分办件</div>
                    </li>
                    <li @click="getOpen('11','主办件')">
                       <div class="scimg"><img src="../../assets/img/count/icon11.png"/></div>
                       <div class="scpl">主办件</div>
                    </li>
                     <li @click="getOpen('12','协办件')">
                       <div class="scimg"><img src="../../assets/img/count/icon12.png"/></div>
                       <div class="scpl">协办件</div>
                    </li>
                     <li @click="getOpen('13','参阅')">
                       <div class="scimg"><img src="../../assets/img/count/icon13.png"/></div>
                       <div class="scpl">参阅</div>
                    </li>
                    <li @click="getOpen('14','办公厅统稿院内分办文件')">
                       <div class="scimg"><img src="../../assets/img/count/icon14.png"/></div>
                       <div class="scpl">办公厅统稿院内<br/>分办文件</div>
                    </li>
                     <li @click="getOpen('15','独办分办件未结')">
                       <div class="scimg"><img src="../../assets/img/count/icon15.png"/></div>
                       <div class="scpl">独办分办件未结</div>
                    </li>
                     <li @click="getOpen('16','参阅件未结')">
                       <div class="scimg"><img src="../../assets/img/count/icon16.png"/></div>
                       <div class="scpl">参阅件未结</div>
                    </li>
               </ul>
          </div>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
        
        }
    },
    mounted(){
          //权限start
                 this.$api.post(this.Global.menuurl,{'menuId':'14162612'},
                     r =>{
                          if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
                  });
        //权限end
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
<style scoped>
.sc{margin:5% 7%; width: 95%;}
.sc ul li{float: left;cursor: pointer; text-align: center; width: 166px;height: 85px; padding-top: 38px; border: 1px #CCE9F7 solid; margin-left: -1px; margin-top: -1px; }
.sc ul li:hover{background: #ECF4F9;}
.scimg{height: 30px;display:flex;justify-content:center;align-items:center;}
.scpl{padding-top: 5px;font-size: 14px;line-height: 20px;}
</style>