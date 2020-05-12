<template>
    <div class="subtable">
    <el-row class="ah-40 caseinfo">
              <el-col  :span="24"><font class="red" style="margin-left:20px;">注：案件号或者当事人及案由的条件可以二选一查询</font></el-col>
              <el-col :sm="24" :md="12" :lg="24"  class="input-item">
               <span class="yy-input-text trt"><font class="red">*</font> 案件号：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="casepd.casenum"  class="yy-input-input" ></el-input>
             </el-col>
               <el-col :sm="24" :md="24" :lg="24"  class="input-item">
               <span class="yy-input-text trt"><font class="red">*</font> 当事人及案由：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="casepd.partiesandcasereason"  class="yy-input-input" ></el-input>
             </el-col>
             <el-col :sm="24" :md="12" :lg="24"  class="input-item">
               <span class="yy-input-text trt">来文字号：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="casepd.letternumber"  class="yy-input-input" ></el-input>
             </el-col>
              <el-col :sm="24" :md="24" :lg="24"  class="input-item">
               <span class="yy-input-text trt" >来文人姓名：</span>
               <el-select v-model="casepd.personname"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                v-for="(item,ind) in xmdata"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.personId">
                                </el-option>
                            </el-select>
             </el-col>
               <el-col :sm="24" :md="24" :lg="24"  class="input-item">
               <span class="yy-input-text trt">来文要求：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="casepd.lettercontents"  class="yy-input-input"></el-input>
             </el-col>
             
             
               <el-col :span="24"   style="text-align:center" >
                 <el-button type="success"  size="small" @click="CurrentPage=1;casesearch(CurrentPage,pageSize,casepd)"> 查 询</el-button>
                 </el-col>
             </el-row>
                       <el-table
                              :data="casedata"
                              ref="caseTable"
                              @row-click="caseclickRow"
                              @selection-change="casechange">
                              <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                              <el-table-column
                                  type="index"
                                  label="序号" width="50">
                              </el-table-column>
                              <el-table-column
                                  prop="casenum"
                                  label="案件号">
                              </el-table-column>
                             <el-table-column
                                  prop="partiesandcasereason"
                                  label="当事人及案由"
                                  width="200">
                              </el-table-column>
                              <el-table-column
                                  prop="leaderpbid"
                                  label="来文人姓名"
                                  width="150">
                              </el-table-column>
                              <el-table-column
                                  prop="session"
                                  label="届">
                              </el-table-column>
                              <el-table-column
                                  prop="times"
                                  label="次">
                              </el-table-column>
                               <el-table-column
                                  prop="letternumber"
                                  label="来文字号">
                              </el-table-column>
                               <el-table-column
                                  prop="lettercontents"
                                  label="来文要求"
                                  width="250">
                              </el-table-column>
                               <el-table-column
                                  prop="caseclass"
                                  label="案件类型">
                              </el-table-column>
                              <el-table-column
                                  prop="adjudgementphase"
                                  label="审理阶段">
                              </el-table-column>
                              <el-table-column
                                  prop="undertakingorgid"
                                  label="承办单位">
                              </el-table-column>
                              <el-table-column
                                  prop="assignno"
                                  label="督（转）办号"
                                  width="150">
                              </el-table-column>
                              <el-table-column
                                  prop="statusname"
                                  label="状态">
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
                                    :total="TotalResult"
                                    >
                                </el-pagination>
                            </div>
        
         <div slot="footer" class="footcancel">
            <el-button type="primary"  size="small" @click="casesubmit()">关 联</el-button>
            <el-button size="small" @click="casesubmit(0)">取 消</el-button>
            </div>
    </div>
</template>
<script>
export default {
    name:'CASE',
    props:['url','data','type','random'],
    data(){
        return{
             CurrentPage: 1,
             pageSize: parseInt(this.$store.state.pagesize),
             TotalResult: 0,
             casemult:[],
             casedata:[],
             xmdata:[],
             casepd:{},
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
         this.casepd={};
         this.casedata=[];
         this.TotalResult=0;
       
      },
    },
    methods:{
        getinit(){
            this.getName();
        },
        casesubmit(t){
            if(t==0){
                    this.$emit('casefatherMethod','99'); 
            }else{
                if(this.casemult.length==0){
                       this.$message.error("请选择数据!");return;
                  }else{
                      var arr=this.casemult;
                      var prr=[];
                      for (let i = 0; i < arr.length; i++) {
                          prr.push(arr[i]);
                      }
                                            
                      this.$emit('casefatherMethod',this.type,prr); 
                  }

            }
        },
        casesearch(currentPage,showCount,pd){
            
            if((pd.casenum==null || pd.casenum=='') 
            && (pd.partiesandcasereason==null || pd.partiesandcasereason=='')){
                this.$message.error("案件号或者当事人及案由的条件可以二选一查询");return;
            }
           pd.pagenum=currentPage;
           pd.inum=showCount;
           pd.type='0';
           if(this.type=='1'){
               pd.personType=this.Global.REPRESENTATIVE;
           }
         let p={
                           'pd':pd,
                            // "pageInfo":{
                            // "pageNumber":currentPage,
                            // "pageSize":showCount,
                            // },
                            'token':this.$store.state.token,
                    }
                    //CaseRegisterController/queryFocusCaseNumAndCaseReason
              this.$api.post(this.Global.aport2+'/CaseHomeController/queryCaseInfo',p,
                r =>{
                    if(r.code==1){
                    this.casedata=r.data.result;
                    this.TotalResult=r.data.countNum;
                    }else{
                        this.$message.error(r.message);return;
                    }
                });
        },
        handleCurrentChange(val) {
          this.CurrentPage=val;
          this.casesearch(val, this.pageSize, this.casepd);
        },
        caseclickRow(row){
           this.$refs.caseTable.toggleRowSelection(row)
        },
        casechange(val){
           this.casemult=val;
        },
         //来文人姓名
         getName(){
           let p={
             'name':'',
             'leveType':'0150000001',
           };
           this.$api.post(this.Global.aport1+'/baseinfo/personlist',p,
             r =>{
                  
                   this.xmdata=r.data;
            });
        },

    },
}
</script>
<style scoped>
.caseinfo .yy-input-text{
    width: 25%;
}
.caseinfo .yy-input-input{
    width: 70%!important;
}
</style>