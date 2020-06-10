<!-- 法院系统机构录入 -->
<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 基本信息 <span class="mlr_10">/</span>  <b>{{cname}}</b></span> </div>
         <div class="content">
             <div class="pairleft">
                
                <div class="top tit">{{cname}}信息</div>
               
                      <el-row class="lh con" :gutter="2">
                    
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">机构名称</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.mc"  class="yy-input-input" ></el-input>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8">
                                <span class="yy-input-text">机构隶属</span>
                                <el-cascader  :disabled="ck"
                            v-model="pd.sj"
                            :options="jgdata"
                            :show-all-levels="true"
                            :props="{ checkStrictly: true }"
                            clearable size="small" class="yy-input-input"></el-cascader>
                            </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">是否部门</span>
                           <el-select v-model="pd.sfbm" :disabled="ck" @change="getLWDW(pd.sfbm)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.sfbm"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">级别</span>
                           <el-select v-model="pd.lvl" :disabled="pd.sfbm=='0223000002' || ck" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.jbb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">行政区划</span>
                           <el-select v-model="pd.xzqh" :disabled="ck" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xzqh"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">编码</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.bm"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">简称</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.jc"  class="yy-input-input" ></el-input>
                        </el-col>
                       
                            <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">区号</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.qh"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">专线代码</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.zxdm"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">传真</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.cz"  class="yy-input-input" ></el-input>
                        </el-col>

                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">邮编</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" maxlength="6" clearable v-model="pd.yb"  class="yy-input-input" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="lh con" >
                          <el-col :sm="24" :md="12" :lg="24">
                            <span class="yy-input-text" style="width:9%;">地址</span>
                             <el-input placeholder="请输入内容" size="small" clearable v-model="pd.dz"  class="yy-input-input" style="width:53.5%!important;"></el-input>
                        </el-col>
                    </el-row>
              </div>
                <div class="footer">
                        <el-button type="primary"  style="width:130px;" @click="submit">保 存</el-button>
                        <el-button style="width:130px;" @click="$router.go(-1)">取 消</el-button>
                 </div>
<br/>
         </div>
    </div>
</template>
<script>
import {format} from '@/assets/js/date.js'
export default {
    data(){
        return{
            pd:{contacts:[]},
            bnt:true,
            cname:'各级法院',
            multipleSelection:[],
            namelist:[],
            addtype:'1',
            status:'0',//0录入 1修改 2查看
            jgdata:[],
            
            
        }
    },
    mounted(){
        this.$store.dispatch("getFyjb");
        this.$store.dispatch("getSfbm");
        this.$store.dispatch("getSfxhft");
          this.$store.dispatch("getXzqh");
        this.getinit(this.$route);
   
    },
      watch:{
        $route:function(val){
           this.getinit(val);
        },
    },
    methods:{
        getinit(val){
            this.addtype=val.query.type;
            this.status=val.query.status;
            this.jgid=val.query.jgid;
            this.getLWDW();
                switch (this.addtype) {
                   case '1':
                        this.cname="最高院";
                      break;
                   case '2':
                        this.cname="省高院";
                      break;
                   case '3':
                        this.cname="市中院";
                      break;
                   case '4':
                        this.cname="基层法院";
                      break;
                  default:
                      break;
              }
                this.getList();
        },
       
        getList()
          { 
          if(this.jgid!=undefined){
              let p={
                  'orgId':this.jgid
              };
              this.$api.get(this.Global.aport1+'/org/detail',p,
                r =>{
                      if(r.code==1){
                          this.pd=r.data;
                      }
                });
             }
          },
          submit(){
              if(this.pd.sj){
             var array=this.pd.sj;
             for (let i = 0; i < array.length; i++) {
       
                 if(array[i].length>1){
                     this.pd.sj=this.pd.sj[this.pd.sj.length-1];break;
                  } else{
                      break;
                  }
             }
             }
             this.pd.lb=this.Global.FY;
             this.$api.post(this.Global.aport1+'/org/create',this.pd,
                r =>{
                      if(r.code==1){
                          
                          this.$message.success(r.message);   

                          this.$router.push({name:'CourtList',query:{}});
                      }else{
                              this.$message.error(r.message);
                              return;
                      }
                });
          },
           //隶属机构 
          getLWDW(){
              let p={
                  'lb':this.Global.FY,
                  'orgId':this.$store.state.orgid,
              };
           this.$api.post(this.Global.aport1+'/org/getOrgTree',p,
                r =>{
                    if(r.code==1){
                      
                          this.jgdata=r.data;
                      
                    }
                });
         },
       
    },
}
</script>
<style scoped>
.yy-input-text{font-size: 14px;}
</style>