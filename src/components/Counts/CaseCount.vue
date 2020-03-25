<template>
      <div class="pairadd tjtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 统计信息 <span class="mlr_10">/</span>  <b>关注案件统计信息</b></span> </div>
         <div class="content">
         <el-row style="line-height: 75px;">
              <el-col :sm="24" :md="24" :lg="12">  <el-button type="primary" plain class="countbnt" @click="getOpen(1,'我院办理全国人大代表关注案件情况')" >我院办理全国人大代表关注案件情况</el-button></el-col>
              <el-col :sm="24" :md="24" :lg="12" class="trt">  <el-button type="success" plain class="countbnt" @click="getOpen(2,'各高院办理全国人大代表关注案件情况')" >各高院办理全国人大代表关注案件情况</el-button></el-col>
              <el-col :sm="24" :md="24" :lg="12">  <el-button type="warning" plain class="countbnt" @click="getOpen(3,'我院办理全国人大代表关注重点案件情况')" >我院办理全国人大代表关注重点案件情况</el-button></el-col>
              <el-col :sm="24" :md="24" :lg="12" class="trt">  <el-button type="danger" plain class="countbnt" @click="getOpen(4,'各高院办理全国人大代表关注重点案件情况')" >各高院办理全国人大代表关注重点案件情况</el-button></el-col>
         </el-row>

     <!-- <div class="counttj" style="text-align:center;color:red" v-if='type==2 || type==4'>正在建设中...</div> -->

     <div class="counttj" v-if='ck'>
     <el-row style="border-bottom:1px solid #cccccc;padding-bottom:20px;">
       <el-col :span="24">
             <div class="title-green">
              查询条件
            </div>
            <el-row>
                <el-col :sm="24" :md="24" :lg="24">
                      <span style="margin-left:50px;">年：</span>
                      <el-select v-model="pd.year" filterable clearable default-first-option placeholder="请选择"  size="small">
                                     <el-option
                                   v-for="(item,ind) in yearlist"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.dm">
                                 </el-option>
                       </el-select>
                      
                        <el-button type="primary" size="small" @click="getList(0)">查询</el-button>
                </el-col>
            
            </el-row>
       </el-col>
      
     </el-row>
     <div id="table-content">
      <div style="text-align:center;font-size:25px;line-height:60px;">{{name}}</div>
      <div style="text-align:right;font-size:14px;line-height:40px;">截止时间：{{pd.year}}-12-31  
           <el-button size="mini" style="margin-left:20px;" @click="clickPrinting">打印</el-button>
      </div>
         <el-table 
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="suborgName"
                label="部门/项目">
            </el-table-column>
            <el-table-column
                prop="completedCount"
                label="交办总数">
            </el-table-column>
            <el-table-column
                prop="unCompletedCount"
                label="未结总数">
            </el-table-column>
             <el-table-column
                prop="completedProbability"
                label="办结率">
            </el-table-column>
            <el-table-column  label="到期情况">
                  <el-table-column
                        prop="finishTimeCount"
                        label="交办"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="isinTimeCount"
                        label="办结"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="isinTimeProbability"
                        label="办结率"
                        width="120">
                    </el-table-column>
            </el-table-column>
            <el-table-column  label="未到期情况">
                  <el-table-column
                        prop="unfinishTimeCount"
                        label="交办"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="unIsinTime"
                        label="办结"
                        width="120">
                    </el-table-column>
            </el-table-column>
            <el-table-column
                prop="repersentativeSatisfaction"
                label="结果一致数量">
            </el-table-column>
             <el-table-column
                prop="iscommunicate"
                label="沟通数量">
            </el-table-column>
             <el-table-column
                prop="isreply"
                label="进展性答复">
            </el-table-column>
         </el-table>
         </div>
    </div>
    <br>
     </div>
        </div>
</template>
<script>
import {getYear} from '@/assets/js/date.js'
export default {
    data(){
        return{
            tableData:[],
            pd:{},
            yearlist:getYear(),
            year:'',
            name:'',
            type:0,
            ck:false,
        }
    },
    mounted(){
        
        //权限start
                 this.$api.post(this.Global.menuurl,{'menuId':'14142611'},
                     r =>{
                          if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
                  });
        //权限end
      
    },
    activated(){
         
    },
    methods:{
        getOpen(t,name){
          this.name=name;
          this.type=t;
          this.ck=true;
          this.getList(t);
         
        },
        getList(t){
            if(t==0){
                if(this.pd.year==undefined || this.pd.year=='' || this.pd.year==null){

                    this.$message.error("年不能为空！");return;
                }else{
                    this.year=this.pd.year;
                }
            }

            if(this.year=='' || this.year==null || this.year==undefined){
                 var date=new Date();
                 this.pd.year=date.getFullYear();
            }
     
             let p={
                  'year':this.pd.year+"",
              };
              if(this.type==3 || this.type==4){
                  p={
                      'isassign':'0212000001',
                      'year':this.pd.year+"",
                  }
              }

              var url='/StatisticsController/queryStatistiscInfo';
              if(this.type==2 || this.type==4){
                  url='StatisticsController/queryHignStatistiscInfo';
              }

             this.$api.post(this.Global.aport2+url,p,
                r =>{
                    if(r.code==1){
                      
                        this.tableData=r.data;
                      
                    }
            });
        },
        //点击打印
        clickPrinting(){
            let wpt = document.getElementById('table-content');
            let newContent = wpt.innerHTML;
            let oldContent = document.body.innerHTML;
            
            document.body.innerHTML = newContent;
             window.print(); //打印方法
             //this.$router.push({name:'CaseCount'});
             window.location.reload(); //  点击取消打印后刷新页面，恢复点击打印按钮之前的原始数据
           
        },
    },
}
</script>
