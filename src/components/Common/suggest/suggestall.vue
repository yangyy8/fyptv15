<template>
    <div class="subtable">
 <el-row class="ah-40">
             <el-col :span="12">
                <span class="yy-input-text trt"><font class="red">*</font> 年份：</span>
               <el-select v-model="suggpd.year" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                       <el-option
                            v-for="(item,ind) in yearlist"
                            :key="ind"
                            :label="item.mc"
                            :value="item.dm">
                  </el-option>
                </el-select>
             </el-col>
              <el-col :span="12">
                <span class="yy-input-text trt"> 编号：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="suggpd.number"  class="yy-input-input" ></el-input>
             </el-col>
              <el-col :span="12">
                <span class="yy-input-text trt"> 录入法院：</span>
                 <el-select v-model="suggpd.createOrgId" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                   v-for="(item,ind) in suggfydata"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.orgid">
                                 </el-option>
                </el-select>
             </el-col>
              <el-col :span="12">
               <span class="yy-input-text trt">领衔人员：</span>
                   <el-select v-model="suggpd.leaderPerson" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                   v-for="(item,ind) in meberdata"
                                   :key="ind"
                                   :label="item.fullName"
                                   :value="item.personId">
                      </el-option>
                </el-select>
             </el-col>
              <!-- <el-col :span="12">
               <span class="yy-input-text trt">提出组织：</span>
                   <el-select v-model="suggpd.leaderOrg" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                   v-for="(item,ind) in $store.state.tazz"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.dm">
                      </el-option>
                </el-select>
             </el-col> -->
            
              <el-col :span="24">
               <span class="yy-input-text trt" style="width:13.5%;">标题：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="suggpd.title"  class="yy-input-input" style="width:80%!important"></el-input>
             </el-col>
          
               <el-col :span="24" style="text-align:center">
                 <el-button type="success"  size="small" @click="CurrentPage=1;suggsearch(CurrentPage,pageSize,suggpd)"> 查 询</el-button>
                 </el-col>
             </el-row>
                       <el-table
                              :data="suggdata"
                              ref="suggTable"
                              @row-click="suggclickRow"
                              @selection-change="suggchange">
                              <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                              <!-- <el-table-column
                                  type="index"
                                  label="序号" width="50">
                              </el-table-column> -->
                              <el-table-column
                                  prop="number"
                                  label="编号">
                              </el-table-column>
                               <el-table-column
                                  prop="proposalType"
                                  label="类型">
                              </el-table-column>
                              <el-table-column
                                  prop="title"
                                  label="标题">
                              </el-table-column>
                             <el-table-column
                                  prop="leaderPerson"
                                  label="领衔人" v-if="type=='3'">
                              </el-table-column>
                              <el-table-column
                                  prop="leaderPerson"
                                  label="提出人" v-if="type=='3' || type=='2'">
                              </el-table-column>
                             </el-table>
                              <div class="middle-foot">
                                <div class="page-msg"></div>
                                <el-pagination
                                    background
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="CurrentPage"
                                    :page-size="pageSize"
                                    layout="prev, pager, next"
                                    :total="TotalResult">
                                </el-pagination>
                            </div>
        
         <div slot="footer" class="footcancel">
            <el-button type="primary"  size="small" @click="suggsubmit()">关 联</el-button>
              <el-button size="small" @click="suggsubmit(0)">取 消</el-button>
            </div>
    </div>
</template>
<script>
import {getYear} from '@/assets/js/date.js'
export default {
    name:'SUGGALL',
    props:['url','data','type','random'],
    data(){
        return{  
             CurrentPage: 1,
             pageSize: parseInt(this.$store.state.pagesize),
             TotalResult: 0,
             suggmult:[],
             suggdata:[],
             meberdata:[],
             suggpd:{},
             yearlist:getYear(),
             suggfydata:[],
        }
    },
    mounted()
    {
        this.getinit();
    },
    watch:{
      type:function(newVal,oldVal){
        
         this.getinit();
      },
       random:function(newVal,oldVal){
         this.suggpd={};
         this.suggdata=[];
         this.TotalResult=0;
        
      },
    },
    methods:{
        getinit(){
            this.getsuggName();this.getsuggFY();
        },
         suggsubmit(t){
             if(t==0){
                this.$emit('suggfatherMethod','99'); 
             }else{
                  
                  if(this.suggmult.length==0){
                       this.$message.error("请选择数据!");return;
                  }else{
                      var arr=this.suggmult;
                      var prr=[];
                      for (let i = 0; i < arr.length; i++) {
                          prr.push(arr[i]);
                      }
                                            
                      this.$emit('suggfatherMethod',this.type,prr); 
                  }
             } 
         },
        suggsearch(currentPage,showCount,pd){
             if(pd.year==null || pd.year==undefined || pd.year==''){
                    this.$message.error("年份不能为空!");return;
                }
                    let p={
                           'pd':pd,
                            "pageInfo":{
                            "pageNumber":currentPage,
                            "pageSize":showCount,
                            },
                            'token':this.$store.state.token,
                    }
               this.$api.post(this.Global.aport2+'/proposalHome/queryToActivity',p,
                r =>{
                if(r.code==1){
                    this.suggdata=r.data.basicCondition;
                    this.TotalResult=r.data.pageInfo.total;
                 }

                });
         },
           //代表
         getsuggName(){
           let  p={
             'personName':'',
             'personType':this.Global.REPRESENTATIVE,
            };
           this.$api.post(this.Global.aport1+'/baseinfo/personlistbytype',p,
             r =>{
                  
                   this.meberdata=r.data;
            });
        },
        handleCurrentChange(val) {
          this.CurrentPage=val;
          this.suggsearch(val, this.pageSize, this.suggpd);
        },
        suggclickRow(row){
           this.$refs.suggTable.toggleRowSelection(row)
        },
        suggchange(val){
           this.suggmult=val;
        },
         //法院单位
        getsuggFY(){
            let p={
                'name':'',
            };
          this.$api.get(this.Global.aport1+'/org/getCourtOrg',null,
                r =>{
                    if(r.code==1){
                        this.suggfydata=r.data;
                    }
           });
        },
    },
   
}
</script>