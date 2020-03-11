<template>
      <div class="pairadd tjtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 统计信息 <span class="mlr_10">/</span>  <b>{{cname}}</b></span> </div>
         <div class="content">
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
                            <el-select v-model="pd.proposalType"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                          <el-option  label="代表议案" value="0204000001">
                          </el-option>
                           <el-option  label="政协提案" value="0204000002">
                          </el-option>
                           <el-option  label="建议、批评与意见" value="0204000003">
                          </el-option>
                        </el-select>

                      </el-col>
                        <el-col :sm="24" :md="12" :lg="12">
                          <span class="yy-input-text" style="width:18%!important;">
                       来文期间</span>
                            <el-select v-model="pd.period"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
                       <el-col :sm="24" :md="12" :lg="12">
                          <span class="yy-input-text" style="width:18%!important;">
                       内部承办单位</span>
                            <el-select v-model="pd.innerUnderOrg" @change="getBM(pd.innerUnderOrg)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in cbdw"
                           :key="ind"
                           :label="item.mc"
                           :value="item.orgid">
                           </el-option>
                        </el-select>
                      </el-col>
                       <el-col :sm="24" :md="12" :lg="12">
                          <span class="yy-input-text" style="width:18%!important;">
                       内部承办部门</span>
                            <el-select v-model="pd.innerUnderSubOrg" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in cbbmdata"
                           :key="ind"
                           :label="item.mc"
                           :value="item.orgid">
                           </el-option>
                        </el-select>
                      </el-col>
                       
                    </el-row>
                <div class="footer">
                    <el-button type="primary"  style="width:130px;" @click="getCount">查 询</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                </div>
 </div>
         <div style="text-align:center;font-size:25px;line-height:60px;">{{cname}}</div>
        <el-row class="mt-15" style="text-align: right">
                   <el-button size="small" @click="download()">导出</el-button>
                </el-row>
               <el-table 
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="sortNum"
                            label="序号">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="建议编号"
                            width="100">
                        </el-table-column>
                         <el-table-column
                            prop="fileNumber"
                            label="来文文号">
                        </el-table-column>
                         <el-table-column
                            prop="groupType"
                            label="代表团">
                        </el-table-column>
                         <el-table-column
                            prop="hostSum"
                            label="主办">
                        </el-table-column>
                         <el-table-column
                            prop="leaderName"
                            label="提议代表"
                           >
                        </el-table-column>
                         <el-table-column
                            prop="personNum"
                            label="人数">
                        </el-table-column>
                          <el-table-column
                            prop="title"
                            label="标题">
                        </el-table-column>
                          <el-table-column
                            prop="underOrg"
                            label="承办单位">
                        </el-table-column>
                         <el-table-column
                            prop="underType"
                            label="承办类别">
                        </el-table-column>
                         <el-table-column
                            prop="underNature"
                            label="承办性质">
                        </el-table-column>
                         <el-table-column
                            prop="innerSubOrg"
                            label="内部承办部门"
                            width="150">
                        </el-table-column>
                         <el-table-column
                            prop="assignPerson"
                            label="承办人">
                        </el-table-column>
                          <el-table-column
                            prop="assignFinishTime"
                            label="要求反馈时间"
                            width="150">
                        </el-table-column>
                         <el-table-column
                            prop="suggestNum"
                            label="建议条数">
                        </el-table-column>
                        <el-table-column
                            prop="keyWord"
                            label="关键词">
                        </el-table-column>
                        <el-table-column
                            prop="completeTime"
                            label="办结时间">
                        </el-table-column>
                          <el-table-column
                            prop="isPublic"
                            label="是否公开">
                        </el-table-column>
                         <el-table-column
                            prop="communicateType"
                            label="沟通方式">
                        </el-table-column>
                        <el-table-column
                            prop="sign"
                            label="标记">
                        </el-table-column>
                        <el-table-column
                            prop="wordNumber"
                            label="文号">
                        </el-table-column>
                         <el-table-column
                            prop="sendTime"
                            label="寄出时间">
                        </el-table-column>
                         <el-table-column
                            prop="promiseThing"
                            label="承诺事项">
                        </el-table-column>
                         <el-table-column
                            prop="remark"
                            label="备注">
                        </el-table-column>
                    </el-table>
          <br/>
    </div>
   
     </div>
</template>
<script>
import {getYear,format} from '@/assets/js/date.js'
export default {
    data(){
        return{
            tableData:[],
            pd:{},
            fydwdata:[],
         
            monthdata:[],
            yeardata:getYear(),
             cbdw:[],
             cbbmdata:[],
            cname:'建议、批评和意见信息统计',
            type:'',
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
            this.type=val.query.type;
            this.cname=val.query.mc;
            
            this.getcbdw();
           
        },
        getcbdw(){
            let p={
            "orgid":this.$store.state.orgid
          };
        
             this.$api.post(this.Global.aport1+'/org/getUndertakeUnits',p,
                r =>{
                    if(r.code==1){
                        this.cbdw=r.data;
                                            
                    }
         });
        },
        getBM(orgid){
          this.$set(this.pd,'innerUnderSubOrg',"");
        
        let p={
                  'orgId':orgid,

                };
                  this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                  r =>{
                  
                     if(r.code==1){
                           this.cbbmdata=r.data;
                     }
                  });

      
        },
        getCount(){
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
       reset(){
              this.$set(this.pd,'beginTime','');
              this.$set(this.pd,'endTime','');
              this.$set(this.pd,'proposalType','');
              this.$set(this.pd,'period','');
              this.$set(this.pd,'isImportant','');
              this.$set(this.pd,'innerUnderOrg','');
              this.$set(this.pd,'innerUnderSubOrg','');
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
