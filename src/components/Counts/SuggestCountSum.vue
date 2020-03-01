<template>
    <div class="pairadd tjtable">
        <div class="homebread">
            <i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
            <span> 统计信息 
            <span class="mlr_10">/</span>  
            <b>办理工作信息统计</b> 
            <span class="mlr_10">/</span> 
             <b>建议议案统计</b>
             <span class="mlr_10">/</span> 
             <b>{{cname}}</b>
             </span></div>

       <div class="content ">
          <div class="ptitle mb-20">{{cname}}</div>
          <div class="pborder">
          <el-row class="lh" :gutter="2">
                      <el-col :sm="24" :md="12" :lg="12" class="input-item">
                      <span class="yy-input-text" style="width:18%!important;">
                          <font class="red">*</font> 年份</span>
                      <div class="yy-input-input  t-flex  t-date" >
                         <el-select v-model="pd.beginTime" filterable clearable default-first-option placeholder="开始年份"  size="small" style="width:49%;">
                               <el-option
                                 v-for="(item,ind) in yeardata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        <span class="septum">-</span>
                         <el-select v-model="pd.endTime" filterable clearable default-first-option placeholder="结束年份"  size="small" style="width:49%;">
                               <el-option
                                 v-for="(item,ind) in yeardata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                     </div>
                     </el-col>
                      <el-col :sm="24" :md="12" :lg="12">
                          <span class="yy-input-text" style="width:18%!important;">
                       议案类型</span>
                            <el-select v-model="pd.proposalType" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.yalx"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>

                      </el-col>
                        <el-col :sm="24" :md="12" :lg="12">
                          <span class="yy-input-text" style="width:18%!important;">
                       来文期间</span>
                            <el-select v-model="pd.period" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.lwqj"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>

                      </el-col>
                        <el-col :sm="24" :md="12" :lg="12">
                          <span class="yy-input-text" style="width:18%!important;">
                       是否重点办理</span>
                            <el-select v-model="pd.isImportant"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.zdqf"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>

                      </el-col>
                       
                    </el-row>
                    <div class="footer">
                            <el-button type="primary"  style="width:130px;" @click="getList">查 询</el-button>
                            <el-button style="width:130px;" @click="reset()">重  置</el-button>
                        </div>
                </div>
                
                <div style="text-align:center;font-size:25px;line-height:60px;">{{name}}</div>
                <el-row class="mt-15" style="text-align: right">
                   <el-button size="small" @click="download()">导出</el-button>
                </el-row>
             <el-table
               :data="tableData"
               style="width: 100%">
               <el-table-column
                 label="类别"
                 prop="mainInfoMapObject.proposalType"
                 width='130'
                >
               </el-table-column>
       
               <el-table-column
                    prop="mainInfoMapObject.typeSum"
                    label="总数">
                </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.endSum"
                    label="已结数">
                </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.notEndSum"
                    label="未结数">
                </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.endRate"
                    label="办结率">
                </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.importanceSum"
                    label="重点数">
                </el-table-column>
               <el-table-column
                label="到期情况">
                    <el-table-column
                    prop="mainInfoMapObject.dateEndSum"
                    label="已结数">
                    </el-table-column>
                    <el-table-column
                    prop="mainInfoMapObject.dateNotEndSum"
                    label="未结数">
                    </el-table-column>
                     <el-table-column
                    prop="mainInfoMapObject.dateEndRateSum"
                    label="办结率">
                    </el-table-column>
                   
            </el-table-column>
            <el-table-column
                label="分开情况">
                <el-table-column
                    prop="mainInfoMapObject.publicSum"
                    label="公开">
                </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.notPublicSum"
                    label="不公开">
                    </el-table-column>
            </el-table-column>
             <el-table-column
                label="沟通情况">
                <el-table-column
                    prop="mainInfoMapObject.citycomPhoneSum"
                    label="电话">
                 </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.comMessageSum"
                    label="短信">
                 </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.comInterviewSum"
                    label="走访">
                 </el-table-column>
                  <el-table-column
                    prop="mainInfoMapObject.comDiscussionSum"
                    label="座谈">
                 </el-table-column>
                  <el-table-column
                    prop="mainInfoMapObject.comSurveySum"
                    label="调研">
                 </el-table-column>
                  <el-table-column
                    prop="mainInfoMapObject.comNoneSum"
                    label="未沟通">
                 </el-table-column>
                 
            </el-table-column>
            <el-table-column
                label="答复情况">
                <el-table-column
                    prop="mainInfoMapObject.replyPhoneSum"
                    label="电话">
                 </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.replyDiscussionSum"
                    label="座谈会">
                 </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.replyMeetSum"
                    label="会见">
                 </el-table-column>
                  <el-table-column
                    prop="mainInfoMapObject.replyOralSum"
                    label="口头答复">
                 </el-table-column>
                  <el-table-column
                    prop="mainInfoMapObject.replyOtherSum"
                    label="其他">
                 </el-table-column>
            </el-table-column>
            <el-table-column
                label="超期情况">
                <el-table-column
                    prop="mainInfoMapObject.outDateSum"
                    label="超期数">
                 </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.outDateEndSum"
                    label="超期已结数"
                    width="120">
                 </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.outDateNotEndSum"
                    label="超期未结数" width="120">
                 </el-table-column>
                 
            </el-table-column>
            <el-table-column
                label="活动情况">
                <el-table-column
                    prop="mainInfoMapObject.inspect"
                    label="专项视察">
                 </el-table-column>
                <el-table-column
                    prop="mainInfoMapObject.research"
                    label="专题调研">
                 </el-table-column>
            </el-table-column>
             <el-table-column v-for="(item, index) in colunmName" :key="index" :label="item" >
          <template slot-scope="scope">
                    
           <div :class="ind==4?'':'bborder'" v-for='(t,ind) in scope.row.mainInfoMapObject.handTypeInfoList' :key='ind'>
              <span v-if='index==0'>  {{t.handType}}</span>
              <span v-if='index==1'>  {{t.handTypeSum}}</span>
              <span v-if='index==2'>  {{t.handTypeEndSum}}</span>
              <span v-if='index==3'>  {{t.handTypeNotEndSum}}</span>
              <span v-if='index==4'>  {{t.handTypeEndRate}}</span>
           </div>
           
          </template>
        </el-table-column>
           
           </el-table>
            <br/>
        </div>  
        
     </div>
</template>
<script>
import {getYear,format} from '@/assets/js/date.js'
export default {
    data()
    {
        return{
           cname:'',
           yeardata:getYear(),
           tableData:[],
           pd:{},
           name:'建议议案提案统计表',
           type:'',
           colunmName:['办理类型','总数','已结数','未结数','办结率'],
           
           
         }
    },
    mounted(){
        this.$store.dispatch("getYalx");
        this.$store.dispatch("getLwqj");
        this.$store.dispatch("getZdqf");
        this.getinit(this.$route);
    },
    watch:{
        $route:function(val){
            this.getinit(val);
        },
    },
    methods:{
          getinit(val){
            this.cname=val.query.mc;
            this.type=val.query.type;
          },
          reset(){
              this.$set(this.pd,'beginTime','');
              this.$set(this.pd,'endTime','');
              this.$set(this.pd,'proposalType','');
          },
          getList(){
              if(this.pd.beginTime=='' || this.pd.beginTime==null || this.pd.beginTime==undefined){
                 this.$message.error('开始年份不能为空！');return;
              }
              if(this.pd.endTime=='' || this.pd.endTime==null || this.pd.endTime==undefined){
                 this.$message.error('结束年份不能为空！');return;
              }
              this.pd.statisticType=this.type;
              this.pd.token=this.$store.state.token;
              this.pd.isDownLoad='0';//0是查询，1是下载
             
           this.$api.post(this.Global.aport1+'/proposalStatistic/queryProposalStatisticInfo',this.pd,
                r =>{
                    if(r.code==1){
                        this.tableData=r.data;
                    }
           });
          },
           download(t){
             
             if(this.pd.beginTime=='' || this.pd.beginTime==null || this.pd.beginTime==undefined){
                 this.$message.error('开始年份不能为空！');return;
              }
              if(this.pd.endTime=='' || this.pd.endTime==null || this.pd.endTime==undefined){
                 this.$message.error('结束年份不能为空！');return;
              }
              this.pd.statisticType=this.type;
              this.pd.token=this.$store.state.token;
              this.pd.isDownLoad='1';//0是查询，1是下载
              this.$api.post(this.Global.aport1+'/proposalStatistic/queryProposalStatisticInfo',this.pd,
                r =>{
                      this.downloadM(r);
                },e=>{},{},'blob')
          },
            downloadM (data) {
            if (!data) {
                return
            }       
            var name=this.cname+format(new Date(),'yyyyMMddhhmmss')+'.xls';
            let url = window.URL.createObjectURL(new Blob([data],{type:"application/xls"}))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download',name)
            document.body.appendChild(link)
            link.click()
        },
    },
}
</script>
<style  scoped>
.bborder{border-bottom:2px solid #ffffff}
</style>