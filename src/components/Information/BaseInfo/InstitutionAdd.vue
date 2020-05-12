
<template>
    <div class="pairadd ">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
         <span> 基本信息库 
              <span class="mlr_10">/</span> <b>联络机构</b>
        <span class="mlr_10">/</span> <b>{{cname}}</b>
         <span class="mlr_10" v-if='cname1!=null'>/</span><b>{{cname1}}</b></span>
          </div>
         <div class="content subtable">
             <div class="pairleft">
                
                <div class="top tit">{{cname1==null?cname:cname1}}信息</div>
                    <el-row class="lh con" :gutter="2">
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text"><font class="red">*</font> 机构名称</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.mc"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" v-if='jb!=null'>
                            <span class="yy-input-text"><font class="red">&ensp;</font> 简称</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.jc"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" v-if='jb==null'>
                            <span class="yy-input-text"><font class="red">*</font> 是否部门</span>
                           <el-select v-model="pd.sfbm" :disabled="jb=='qg'|| jb=='1' ||status=='1' || ck || xzqh!=null" @change="getLWDW(pd.sfbm,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.sfbm"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text"><font class="red" v-if='pd.sfbm=="0223000002"'>*</font> 机构隶属</span>
                            <el-cascader  :disabled="ck"
                            v-model="pd.sj"
                            :options="jgdata"
                            :show-all-levels="false"
                            :props="{ checkStrictly: true }" @change="getJB(pd.sj);" 
                            clearable filterable size="small" class="yy-input-input"></el-cascader>
                            </el-col>
                            </el-row>
                          <el-row class="lh con" :gutter="2">
                        <el-col :sm="24" :md="12" :lg="8"  v-if='jb==null'>
                            <span class="yy-input-text"><font class="red">*</font> 级别</span>
                           <el-select v-model="pd.lvl" v-if="addtype!='7'" :disabled="pd.sfbm=='0223000002' || (pd.lvl!=null &&  pd.lvl!='') || ck || jb!=null" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.jbb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                             <el-select v-model="pd.lvl" v-else :disabled="pd.sfbm=='0223000002' || (pd.lvl!=null &&  pd.lvl!='') || ck || jb!=null" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.fyjb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8"  v-if='jb==null'>
                            <span class="yy-input-text"><font class="red">*</font> 行政区划</span>
                            
                           <el-select v-model="pd.xzqh" :disabled="pd.sfbm=='0223000002' || ck || xzqh!=null" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in  xzqhlist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8"  v-if="addtype=='7'">
                            <span class="yy-input-text"> 巡回法庭</span>
                         <el-select v-model="pd.xhft" :disabled="ck || pd.sfbm=='0223000001'" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in  $store.state.sfxhft "
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" v-if="(addtype=='1' || addtype=='2') && (jb==null || cdx==1)">
                            <span class="yy-input-text"><font class="red">&ensp;</font> 委员会</span>
                           <el-select v-model="pd.zmwyh" :disabled="ck || pd.sfbm=='0223000001'"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in  $store.state.jgwyh "
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" v-if='jb==null'>
                            <span class="yy-input-text"><font class="red">&ensp;</font> 简称</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.jc"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" v-if='jb==null'>
                            <span class="yy-input-text"><font class="red">&ensp;</font> 编码</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.bm"  class="yy-input-input" ></el-input>
                        </el-col>
                            <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text"><font class="red">&ensp;</font> 区号</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.qh"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text"><font class="red" v-if='addtype!="7"'>*</font> <font class="red" v-else>&ensp;</font> 固定电话</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.zxdm"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text"><font class="red">&ensp;</font> 传真</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.cz"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text"><font class="red">&ensp;</font> 邮编</span>
                            <el-input placeholder="请输入内容" :disabled="ck" size="small" maxlength="6" clearable v-model="pd.yb"  class="yy-input-input" ></el-input>
                        </el-col>
                    <!-- </el-row>
                     <el-row class="lh con"> -->
                          <el-col :sm="24" :md="12" :lg="16">
                            <span class="yy-input-text" style="width:13.5%;"><font class="red" v-if='addtype!="7"'>*</font> <font class="red" v-else>&ensp;</font> 地址</span>
                             <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="pd.dz"  class="yy-input-input" style="width:80%!important;"></el-input>
                        </el-col>
                    </el-row>
              </div>
              <div class="pairleft" id="box2" style="margin-top:30px;" v-if="addtype!='7'">
                <div class="top" ><div class="title">联系人信息</div></div>
                <div class="list">
                          <el-row v-if='!ck'> 
                              <el-button type="primary" size="small" @click="add(0)">录入</el-button>
                              <el-button type="success" size="small"  :disabled="bnt" @click="add(1)">修改</el-button>
                              <!-- <el-button type="success" size="small"  :disabled="bnt" @click="add(2)">查看</el-button> -->
                              <el-button type="danger" size="small"  :disabled="bnt" @click="del()">删除</el-button>
                            </el-row>
                           <el-table
                            ref="multipleTable"
                            :data="tableData"
                            :row-class-name="tableRowClassName"
                            @row-click="clickRow"
                            @selection-change="changeFun">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="contactPersonName"
                                label="姓名">
                            </el-table-column>
                            <el-table-column
                                prop="outsideLine"
                                label="固定电话">
                            </el-table-column>
                            <el-table-column
                                prop="contactResponsibilityTypeName"
                                label="职责分类">
                            </el-table-column>
                              <el-table-column
                                prop="position"
                                label="职务">
                            </el-table-column>
                              <el-table-column
                                prop="mobilePhone"
                                label="手机号码">
                            </el-table-column>
                              <!-- <el-table-column
                                prop="email"
                                label="电子邮箱">
                            </el-table-column> -->
                             <!-- <el-table-column
                                prop="isOutContactPersonName"
                                label="是否对外联系人">
                            </el-table-column> -->
                           </el-table>
                </div>
                </div>
                  <div class="footer">
                        <el-button type="primary"  style="width:130px;" @click="submit" v-if="status!='2'">保 存</el-button>
                        <el-button style="width:130px;" @click="gonum">关 闭</el-button>
                </div>
  </div>
         <el-dialog :title="lxrdia" :visible.sync="addDialogVisible" :close-on-click-modal='false' width="600px">
             <el-form :model="form" >
                <el-row class="ah-40">
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 姓名：</span>
                         <el-input   placeholder="请输入内容"  v-on:input="getZNSB" v-model="form.contactPersonName" class="yy-input-input" size="small"></el-input>
                        <!-- <el-select
                            v-model="form.contactPersonName"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod" class="yy-input-input" size="small">
                            <el-option
                            v-for="(item,ind) in namelist"
                            :key="ind"
                            :label="item.personName"
                            :value="item.personName">
                            <span style="float: left">{{item.personName}}，{{item.sex}}，{{item.birthPlace}}，{{item.partisan}}，{{item.nationality}}，{{item.identity}}，证号：{{item.cardNumber}}，团界别：{{item.groupOrPeriodType}}</span>
                         </el-option>
                        </el-select> -->
                    </el-col>
                     <!-- <el-col :span="24">
                          <span class="yy-input-text trt">部门：</span>
                            <el-select v-model="form.subOrgId" @change="getSelectName(form.isOutContactPerson,1)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in cbbm"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                     </el-select>
                    </el-col> -->
                     <el-col :span="24">
                          <span class="yy-input-text trt"><font class="red">*</font> 职务：</span>
                         <el-input   placeholder="请输入内容"  v-model="form.position" class="yy-input-input" maxlength="13" size="small"></el-input>
                    </el-col>
                     <el-col :span="24">
                          <span class="yy-input-text trt"><font class="red">*</font> 固定电话：</span>
                         <el-input   placeholder="请输入内容" v-on:input="getZNSB" v-model="form.outsideLine" class="yy-input-input" maxlength="13" size="small"></el-input>
                    </el-col>
                     <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 手机号码：</span>
                        <el-input placeholder="请输入内容" v-on:input="getZNSB"  size="small"  clearable v-model="form.mobilePhone" maxlength="11"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                    <span class="yy-input-text trt">职责分类：</span>
                     <el-select v-model="form.contactResponsibilityType" @change="getSelectName(form.contactResponsibilityType,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                                 v-for="(item,ind) in $store.state.zzfl"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                          </el-option>
                     </el-select>
                    </el-col>
                     <!-- <el-col :span="24">
                    <span class="yy-input-text trt">对外联系人：</span>
                     <el-select v-model="form.isOutContactPerson" @change="getSelectName(form.isOutContactPerson,1)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.dwlxr"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                     </el-select>
                    </el-col> -->
                    <!-- <el-col :span="24">
                          <span class="yy-input-text trt">电子邮箱：</span>
                         <el-input  placeholder="请输入内容" v-model="form.email" class="yy-input-input" size="small"></el-input>
                    </el-col> -->
                </el-row>
             </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" @click="addsave()" >保 存</el-button>
              <el-button @click="addDialogVisible = false" size="small">关 闭</el-button>
            </div>
       </el-dialog>
 <el-dialog title="智能搜索" :visible.sync="znDialogVisible" :close-on-click-modal='false'>
     <RGZN  :type="1" :data="zndata"  @ZNfatherMethod="ZNfatherMethod" :random="new Date().getTime()"></RGZN>
   </el-dialog>
  <br/>
       
    </div>
</template>
<script>
import {format} from '@/assets/js/date.js'
import RGZN from "../../Common/Intelligence"
export default {
        components:{RGZN},
    data(){
        return{
            pd:{contacts:[]},
            form:{},
            bnt:true,
            checkedList:[],
            cname:'人大机构信息录入',
            cinfo:'人大机构信息',
            lxrdia:"新增联系人",
            addDialogVisible:false,
            tableData:[],
            xzqhlist:[],
            tb:0,
            ck:false,
            multipleSelection:[],
            znDialogVisible:false,
            zndata:{},
            namelist:[],
            addtype:'1',
            status:'0',//0录入 1修改 2查看
            jgid:'',//机构 id
            jgdata:[],
            lb:'',
            cname1:'',
            jb:'',
            xzqh:null,
            codemc:'',
            lvl:'',
            xzqhdata:[],
            cbbm:[],
            lx:'',
            num:2,
            cdx:0,
            nowindex:null,
        }
    },
   
    mounted(){
    this.$store.dispatch("getZzfl");
    this.$store.dispatch("getDwlxr");
    this.$store.dispatch("getJbb");
    this.$store.dispatch("getSfbm");
    this.$store.dispatch("getXzqh");
    this.$store.dispatch("getSfxhft");
    this.$store.dispatch("getJgwyh");
    this.$store.dispatch("getFyjb");
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
            this.cname1=val.query.title;
            this.jb=val.query.jb;
            this.lx=val.query.lx;
            this.cdx=val.query.cdx;
            this.num=val.query.num;
            if(val.query.xzqh!=null && val.query.xzqh!=undefined){
                this.xzqh=val.query.xzqh;
                if(this.pd.sfbm=='0223000001'){
                  this.$set(this.pd,'xzqh',val.query.xzqh);
                }
            }
            if(this.jb!=null && this.jb!=undefined){
               this.$set(this.pd,'sfbm','0223000002')
            }
            
            if(this.jb=='qg'){
            this.lvl='0150000001';
            
            }else if(this.jb=='sj')
            { this.lvl='0150000002';
              
            }
            else if(this.jb=='ds')
            {this.lvl='0150000003';
             
            }
            else if(this.jb=='xq')
            {this.lvl='0150000004';
                 
            }else if(this.jb=='1')
              {   this.lvl='0222000001';
                
              }else if( this.jb=='2')
              {this.lvl='0222000002';
               
              }else if( this.jb=='3')
              {this.lvl='0222000003';
            
              }else if( this.jb=='4')
              {this.lvl='0222000004';
                 
              }
          this.$set(this.pd,'lvl',this.lvl)

            if(this.status==2){
                this.ck=true;
            }
             switch (this.addtype) {
                  case '1':
                        this.cname="人大系统";
                        this.lb=this.Global.RD;
                      break;
                   case '2':
                        this.cname="政协系统";
                       this.lb=this.Global.ZX;
                      break;
                   case '3':
                        this.cname="统战部系统";
                        this.lb=this.Global.TZB;
                      break;
                 case '4':
                      this.cname="民主党派系统";
                       switch (this.lx) {
                           case '1':
                              this.lb=this.Global.MZDP1;
                              this.cname1="中国国民党革命委员会";
                               break;
                           case '2':
                              this.lb=this.Global.MZDP2;
                              this.cname1="中国民主同盟";
                               break;
                           case '3':
                              this.lb=this.Global.MZDP3;
                              this.cname1="中国民主建国会";
                               break;
                           case '4':
                              this.lb=this.Global.MZDP4;
                              this.cname1="中国民主促进会";
                               break;
                           case '5':
                              this.lb=this.Global.MZDP5;
                              this.cname1="中国农工民主党";
                               break;
                           case '6':
                              this.lb=this.Global.MZDP6;
                              this.cname1="中国致公党";
                               break;
                           case '7':
                              this.lb=this.Global.MZDP7;
                              this.cname1="九三学社";
                               break;
                           case '8':
                              this.lb=this.Global.MZDP8;
                              this.cname1="台湾民主自治同盟";
                               break;
                           default:
                               break;
                       }
                      break;
                 case '5':
                        this.cname="工商联系统";
                        this.lb=this.Global.GSL;
                      break;
                 case '6':
                        this.cname="台联系统";
                       this.lb=this.Global.TL;
                      break;
                 case '7':
                       this.cname="各级法院";
                       this.lb=this.Global.FY;
                      break;
                  default:
                      break;
              }
               this.getxzqh('1','');
               this.getcbbm();
               this.getList();

        },
        tableRowClassName({row, rowIndex}){
                row.index = rowIndex;
        },
         clickRow(row){
         
           this.nowindex=row.index;
           this.$refs.multipleTable.toggleRowSelection(row)
        },
        remoteMethod(query){
       
        if (query !== '') {
            setTimeout(() => {
               let p={
                   'personName':query
               };
                this.$api.post(this.Global.aport3+'/PersonIdentifyInfoController/getTheSameNamePerson',p,
                r =>{
                      if(r.code==1){
                           this.namelist = r.data.filter(item => {
                            return item.personName.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                            });
                      }else{
                              this.$message.error(r.message);return;
                      }
                });

            }, 200);
            } else {
            this.namelist = [];
            }
        },
        changeFun(val) {
          this.multipleSelection = val;
          if(this.multipleSelection.length>0){
             this.bnt=false;
          }else{
             this.bnt=true; 
          }
        },
          ZNfatherMethod(data,type){

             if(data){
                 console.log(data.job,data.fixedPhone);
                 
                 this.$set(this.form,'position',data.job);
                 this.$set(this.form,'outsideLine',data.fixedPhone);
                 console.log(this.form.outsideLine);
             }
             this.znDialogVisible=false;
            
            },
         getZNSB(){
            //   console.log(this.form.personName,this.form.sex,this.form.birthPlace,this.form.birthday,this.form.fixedPhone,this.form.mobilePhone);
              this.type='1';
              this.zndata={};
              if(
                   (this.form.contactPersonName!=undefined && this.form.contactPersonName!='')  &&
                   (this.form.outsideLine!=undefined && this.form.outsideLine!='' && this.form.outsideLine.length>4)  
               ){
                   
                     this.zndata.personName=this.form.contactPersonName;
                     this.zndata.fixedPhone=this.form.outsideLine;
                     this.getTCZNCK();
               }
               else if(
                   (this.form.contactPersonName!=undefined && this.form.contactPersonName!='')  &&
                   (this.form.mobilePhone!=undefined && this.form.mobilePhone!='' && this.form.mobilePhone.length>10)
                ){
                 
                   this.zndata.personName=this.form.contactPersonName;
                   this.zndata.mobilePhone=this.form.mobilePhone;
                   this.getTCZNCK();
                
               }

             
             
          },
          getTCZNCK(){
            
            this.$api.post(this.Global.aport2+'/PersonIdentifyInfoController/findPerson',this.zndata,
                r =>{
                    if(r.code==1){
                    
                       if(r.data!=null){
                           this.znDialogVisible=true;
                       }
                    }else{
                    //   if((this.form.contactPersonName!=undefined && this.form.contactPersonName!='')  &&
                    //     (this.form.mobilePhone!=undefined && this.form.mobilePhone!='') &&
                    //     (this.form.outsideLine!=undefined && this.form.outsideLine!='') 
                    //  ){
                    //       this.addsave();
                    //  }
                       
                    }
            });
          },
          getJB(val){
              this.$set(this.pd,'lvl','');this.$set(this.pd,'xzqh','');
              if(val=='' || val==null){this.xzqhlist=[];return;}
              var value=val[0].length==1?val:val[0];
              var obj = {};
               obj = this.jgdata.find(item =>{
                  return item.value === value
               });
    
             if( this.pd.sfbm!='0223000001' && this.pd.sfbm!=undefined){
                
                this.pd.lvl = obj.lvl;
              }else{
              
                  this.pd.lvl = obj.xjlvl;
              }
     
            if(obj.xzqh!=undefined && obj.xzqh!=null && this.pd.sfbm=='0223000001'){
           
                
                this.getxzqh(obj.lvl,obj.xzqh);
            }
          },
        //得到行政区划
        getxzqh(l,v){

               let p={
                    'code':v,
                    'level':l
                  };
                  this.$api.get(this.Global.aport4+'/service/getxzqh',p,
                  r =>{
                    if(r.code==1){
                        this.xzqhlist=r.data;
                        if(this.xzqh!=null && this.xzqh!='' && this.xzqh!=undefined){
                         this.$set(this.pd,'xzqh',this.xzqh);
                        }
                       
                        
                    }
                   });
        },
        add(t){
                   this.tb=t
                  
                   if(this.tb==0){
                       this.form={} ;
                       this.lxrdia="新增联系人";
                   }else if(this.tb==1){
                       if(this.multipleSelection.length>1){
                               this.$message.error("只能选择一条信息！");return;
                       }
                       console.log(this.multipleSelection[0],this.nowindex);
                       
                       this.form=Object.assign({},this.multipleSelection[0]);
                       this.lxrdia="编辑联系人";
                   }else{
                        if(this.multipleSelection.length>1){
                               this.$message.error("只能选择一条信息！");return;
                       }
                    
                   }
                   
            this.addDialogVisible=true;
        },
          addsave(){
              
            if(this.form.contactPersonName==undefined || this.form.contactPersonName==""){
                this.$message.error("姓名不能为空！");return;
            }
             if(this.form.position==undefined || this.form.position==""){
                this.$message.error("职务不能为空！");return;
            }
             if(this.form.outsideLine==undefined || this.form.outsideLine==""){
                this.$message.error("固定电话不能为空！");return;
            }
             if(this.form.outsideLine.length<=4){
                this.$message.error("固定电话不正确，请加上区号！");return;
            }
            if(this.form.mobilePhone==undefined || this.form.mobilePhone==""){
                this.$message.error("手机号码不能为空！");return;
            }
            if(this.form.mobilePhone.length<11){
                this.$message.error("手机号码不正确！");return;
            }
                if(this.tb==0){
                    this.tableData.push(this.form);
                    this.tableData=this.unique(this.tableData);
                }else{
                
                    
                    this.$set(this.tableData,this.nowindex,this.form);
                }
                 

                     this.addDialogVisible=false;
                     
            },

            del(){
            this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                            var arr=this.multipleSelection;
                            for (let i = 0; i < arr.length; i++) {
                                var index = this.tableData.findIndex(item =>{
            　　　　　　　　　  　 if(item.contactPersonName==arr[i].contactPersonName){
                    　　　　　　　　　　　　return true
                    　　　　　　　　　　}
                    　　　　　　　 })
                    　　　　　　　　this.tableData.splice(index,1)
                            }
                   }).catch(() => {
                    
                    this.$message.info('已取消删除'); 
                            
                });

            },
            //去重
            unique(arr) {
                const res = new Map();
            
                return arr.filter((arr) => !res.has(arr.contactPersonName) && res.set(arr.contactPersonName, 1))
               
            },
          getList()
          {   
         
             var ff=true;
              let p={
                  'orgId':this.jgid,
              };
                 this.$api.get(this.Global.aport1+'/org/detail',p,
                r =>{
                    
                      if(r.code==1){
                           this.pd=r.data;
                           if(this.pd.sfbm!=undefined && this.pd.sfbm!=null && this.pd.sfbm!=''){
                          
                             ff=false; this.getLWDW(this.pd.sfbm);
                           }
                         
                        //    this.getJB(this.pd.sj);
                          

                           this.tableData=r.data.contactVOS;
                      }
                });
           if(ff){ this.getLWDW('0223000002');}
                
          },
          submit(){
             if(this.pd.mc=="" || this.pd.mc==undefined)
             {
                   this.$message.error('机构名称不能为空'); return;
             }
           
             if(this.pd.sfbm=="" || this.pd.sfbm==undefined)
             {
                this.$message.error('是否部门不能为空'); return;
             }
           
              if((this.pd.sj=="" || this.pd.sj==undefined) && this.pd.sfbm=="0223000002")
             {
                 this.$message.error('机构隶属不能为空');return;
             }

            if(this.addtype!='7'){
           
               if(this.pd.zxdm=="" || this.pd.zxdm==undefined)
             {
                this.$message.error('固定电话不能为空'); return;
             }
              if(this.pd.dz=="" || this.pd.dz==undefined)
             {
                   this.$message.error('地址不能为空');return;
             }
            }

             this.pd.contacts=this.tableData;
             this.pd.lb=this.lb;
           
             if(this.pd.sj){
              var array=this.pd.sj;
             for (let i = 0; i < array.length; i++) {
       
                 if(array[i].length>1){
                     this.pd.sj=this.pd.sj[this.pd.sj.length-1];break;
                  } else{
                      break;
                  }
              }
             }else{
                 this.pd.sj='';
             }
         
            this.$api.post(this.Global.aport1+'/org/create',this.pd,
                r =>{
                    
                      if(r.code==1){
                        
                           this.$message.success(r.message);
                           this.gonum();
                           //this.$router.push({name:'InstitutionList',query:{type:this.addtype,lx:this.lx}});
                      }else{
                           this.$message.error(r.message);return;
                      }
                });
          },
          gonum(){
              if(this.num==null || this.num==""){
                    this.$router.push({name:'InstitutionList',query:{type:this.addtype}});
              }else{
                   this.$router.go(-this.num);
              }
          },
               //隶属机构 
          getLWDW(sfbm,t){
             
             if( (this.pd.sj!=null && this.pd.sj!='') &&
                (this.pd.lvl!=null && this.pd.lvl!='')  &&
               (this.pd.xzqh!=null && this.pd.xzqh!='')  &&
               this.pd.sfbm=='0223000001'){ 
                   return;
               }
               if(t==0){
                     this.$set(this.pd,'sj',"");
                     this.$set(this.pd,'lvl',"");
                     this.$set(this.pd,'xzqh','');
                     this.jgdata=[];
             }



              var lf='';
            
               if(this.jb!=null && this.jb!=undefined && this.jb!=''){
                  lf='1';
               }else{
                   lf='';
               }
            
              let p={
                  'lb':this.lb,
                  'orgId':this.$store.state.orgid,
                  'sfbm':sfbm,
                  'xzqh':this.xzqh,
                  'levelFlag':lf,
                  'lvl':this.lvl,
              };
                this.$api.post(this.Global.aport1+'/org/getOrgTree',p,
                r =>{
                    if(r.code==1){
                      
                          this.jgdata=r.data.vos;
                          if(r.data.defaultId!=''){
                              this.$set(this.pd,'sj',r.data.defaultId);
                          }

                        //   if(this.status!='0'){
                        //        var obj = {};
                        //         obj = this.jgdata.find(item =>{
                        //             return item.value === this.sj;
                        //         });
                        //        if(this.pd.xzqh!=null && this.pd.xzqh!=''){

                        //           this.getxzqh(obj.lvl,this.pd.xzqh);
                        //        }
                        //   }
                      
                    }
                });
         },
        
     
         //得到下拉名称
         getSelectName(val,t){
             if(val=="" || val==null){
                if(t==0){
                  this.$set(this.form,'contactResponsibilityTypeName','');
                }else if(t==1){
                  this.$set(this.form,'isOutContactPersonName','');
                }
                return;}
             var obj={};
                 switch (t) {
                     case 0:
                      
                      obj = this.$store.state.zzfl.find(item =>{
                          return item.dm === val 
                      });
                      this.form.contactResponsibilityTypeName = obj.mc
                         break;
                     case 1:
                         obj = this.$store.state.dwlxr.find(item =>{
                          return item.dm === val 
                        });
                      this.form.isOutContactPersonName = obj.mc
                         break;
                     default:
                         break;
                 }
         },
           //承办部门
        getcbbm(){
          let p={
            "orgId":this.$store.state.orgid
          };
             this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                r =>{
                    if(r.code==1){
                        this.cbbm=r.data;
                      
                    }
                });
        },
       
    },
}
</script>
<style scoped>
.yy-input-text{font-size: 14px;}
</style>