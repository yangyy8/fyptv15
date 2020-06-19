<!-- 高级查询 -->
<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
         <span> 基本信息
             <span class="mlr_10">/</span>  <b>联络对象</b>
                 <span class="mlr_10">/</span>  <b>特约人员</b>
             <span class="mlr_10">/</span>  <b>高级查询</b>
              </span> </div>
         <div class="content">
                <div class="ptitle mb-20">特约人员信息</div>
                <div class="pborder">
                    <el-row class="lh" :gutter="2">
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">姓名</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.personName"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">性别</span>
                           <el-select v-model="pd.sex" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">出生日期</span>
                            <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker
                                v-model="pd.beginBirthday" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker
                                    v-model="pd.endBirthday" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间" >
                                </el-date-picker>
                            </div>
                        </el-col>
                      <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">所属单位</span>
                             <el-select v-model="pd.orgIds"  remote :remote-method="orgremoteMethod" v-el-select-loadmore="orgloadmore" @visible-change="getOrg()" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                      <el-option
                                        v-for="(item,ind) in ssdwdata"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.orgid">
                                      </el-option>
                              </el-select>
                        </el-col>  
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">层级</span>
                            <el-select v-model="pd.levelTypes" multiple  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                       v-for="(item,ind) in $store.state.fyjb"
                                       :key="ind"
                                       :label="item.mc"
                                       :value="item.dm">
                                     </el-option>
                             </el-select>
                        </el-col> 
                       
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">特约职务</span>
                           <el-select v-model="pd.specialTypes" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in tylblist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">届别</span>
                           <el-select v-model="pd.periodTypes" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in jblist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                     <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">省部级以上</span>
                            <el-select v-model="pd.isProvincial"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                  v-for="(item,ind) in $store.state.sbjys"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                  </el-option>
                             </el-select>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">在京</span>
                            <el-select v-model="pd.isInBeijing"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                  v-for="(item,ind) in $store.state.zjqf"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                  </el-option>
                             </el-select>
                    </el-col>   
                    </el-row>
                     <el-row class="lh" v-if="open" :gutter="2">
                     <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">政治面貌</span>
                           <el-select v-model="pd.partisans" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.dp"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">民族</span>
                           <el-select v-model="pd.nationalitys" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.mz"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">籍贯</span>
                           <el-select v-model="pd.birthPlaces" multiple 
                            remote :remote-method="xzdwremoteMethod" v-el-select-loadmore="xzloadmore" @visible-change="getXz()" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in xzdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">学历</span>
                           <el-select v-model="pd.educations" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xl"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                  
                            <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">推荐单位</span>
                           <el-select v-model="pd.recommendedUnitsIDs" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.sydw"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                         
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">职业类别</span>
                           <el-select v-model="pd.jobTypes" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.zylb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">单位职务</span>
     
                             <el-input placeholder="请输入内容" size="small" clearable v-model="pd.job"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">社会职务</span>
                             <el-input placeholder="请输入内容" size="small" clearable v-model="pd.socialDuty"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">身份</span>
                           <el-select v-model="pd.sf" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.tysf"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">增补
                                 <el-checkbox v-model="pd1.is1" ></el-checkbox>
                            </span>
                            <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker :disabled="!pd1.is1"
                                v-model="pd.beginRepairTime" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker :disabled="!pd1.is1"
                                    v-model="pd.endRepairTime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间" >
                                </el-date-picker>
                            </div>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">解聘
                                 <el-checkbox v-model="pd1.is2" ></el-checkbox>
                            </span>
                                <el-select v-model="pd.fireReasons" :disabled="!pd1.is2" multiple  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                                  <el-option
                                                     v-for="(item,ind) in $store.state.jpyy"
                                                     :key="ind"
                                                     :label="item.mc"
                                                     :value="item.dm">
                                                  </el-option>
                                     </el-select>
                          </el-col>
                       
                        
                         
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">所属巡回法庭</span>
                           <el-select v-model="pd.circuitCourtId" @visible-change="getXHFT" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in xhftdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                           
                        </el-col>
                       
                        
                        <!-- <el-col :sm="24" :md="12" :lg="24">
                         
                            <el-checkbox v-model="pd.is1">人大代表</el-checkbox>
                            <el-checkbox v-model="pd.is2">政协委员</el-checkbox>
                            <el-checkbox v-model="pd.is3">在京特约人员</el-checkbox>
                            <el-checkbox v-model="pd.is4">省部级以上</el-checkbox>
                            
                        </el-col>   -->
                    </el-row>
                  
                </div>
                 <div class="footer">
                    <el-button type="primary"  style="width:130px;" v-if="querybnt" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查 询</el-button>
                     <el-button type="primary"  style="width:130px;" v-else :disabled="true">查询中</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                </div>
                <div class="loadmore" v-if="all" @click="getAll(1)">全部展开 <i class="el-icon-arrow-down"></i></div>
                <div class="loadmore" v-else @click="getAll(2)">部分收起 <i class="el-icon-arrow-up"></i></div>
                <div class="pairleft" >
                    <div class="anseacrch">

                   <el-checkbox-group v-model="checkedList" @change="changeList()">
                    <el-checkbox v-for="item in checkItem" :label="item.code" :key="item.code" :checked="item.checked" :disabled="item.checked">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                    </div>
                </div>

                <div class="pborder mt-20">
                        <el-row > 
                               <el-col :span="16" >
                              <el-button type="primary" size="small" @click="edit('0','添加')" v-if='allshow[0]'>添加</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="edit('9','查看')" v-if='allshow[1]'>查看</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="edit('1','修改')" v-if='allshow[2]'>修改</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="dellist()" v-if='allshow[3]'>删除</el-button>
                               <el-button type="primary" size="small" @click="getDR" v-if='allshow[4]'>导入</el-button>
                             <!-- <el-button type="primary"  size="small" @click="download" v-if='allshow[5]'>下载全部</el-button>
                              <el-button type="primary"  size="small" @click="download" v-if='allshow[6]'>下载当页</el-button> -->
                               &nbsp;
                              </el-col>
                              <el-col :span="8" class="trt">
                                特约人员总数 <b class="sumfont" >{{this.TotalResult}}</b> 人
                              </el-col>
                            </el-row>
                          <el-table
                            ref="multipleTable"
                            :data="tableData"
                            @row-click="clickRow"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                              <el-table-column
                                type="index"
                                label="序号"  width="100">
                                 <template slot-scope="scope">
                                    <div>
                                    <span>{{(CurrentPage - 1) * pageSize + scope.$index + 1}}</span>
                                    </div>
                                 </template>
                            </el-table-column>
                            <el-table-column
                                v-for="(val,i) in configHeader"
                                :key="i"
                                :prop="val.code"
                                :label="val.label">
                            </el-table-column>
                           </el-table>
                           <div class="middle-foot">
                                <div class="page-msg">
                                    <div class="">
                                共{{TotalResult}}条记录
                                    </div>
                                    <div class="">
                                    每页显示
                                    <el-select v-model="pageSize" @change="pageSizeChange(pageSize)" placeholder="10" size="mini" class="page-select">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    条
                                    </div>
                                    <div class="">
                                    共{{Math.ceil(TotalResult/pageSize)}}页
                                    </div>
                                </div>
                                <el-pagination
                                    background
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="CurrentPage"
                                    :page-size="pageSize"
                                    layout="prev, pager, next"
                                    :total="TotalResult">
                                </el-pagination>
                            </div>
                         
                </div>
 



<br/>
         </div>
          <el-dialog title="导入文件" :visible.sync="drDialogVisible" :close-on-click-modal='false' width="630px">
      <UPLOAD :url="vvurl" :type="1000"  :urlErr="vvurlErr"  @drfatherMethod="drfatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>
    </div>
</template>
<script>
import {format,getAuthInfo} from '@/assets/js/date.js'
import {ToArray,sortByKey} from '@/assets/js/ToArray.js'
import UPLOAD from "../../Common/upload"
export default {
      components:{UPLOAD},
      directives: {
          'el-select-loadmore': {
            bind(el, binding) {
              const SELECTWRAP_DOM = el.querySelector(
                '.el-select-dropdown .el-select-dropdown__wrap'
              );
              SELECTWRAP_DOM.addEventListener('scroll', function() {
                const condition =
                  this.scrollHeight - this.scrollTop <= this.clientHeight;
                if (condition) {
                   binding.value();
                }
              });
            }
          }
  },
    data(){
        return{
            CurrentPage: 1,
            pageSize: 10,
            TotalResult: 0,
            pd:{},
            pd1:{is1:false,is2:false},
            options:this.pl.ps,
            open:false,
            all:true,
            bnt:true,
            checkedList:[],
            addtype:'1',
            addDialogVisible:false,
            tableData:[],
            configHeader:[],
            checkItemReal:[],
            cc:true,
            multipleSelection:[],
            checkItem:[],
            viewtype:'',
            xzdata:[],
            xzList:[],
            xhftdata:[],
            drDialogVisible:false, 
           vvurl:'/specialPerson/import',
           vvurlErr:'',
           authinfo:this.$store.state.auth,
           alldata:['21363198','21363199','21363200','21363201','21363202','21363203','21363204'],//0录入,1查询,2修改,3删除,4导入,5下载全部,6下载当页
           allshow:[],
           ssdwdata:[],
           jblist:[],
           tylblist:[],
            querybnt:true,
            jznum:50,
            ssdwload:[],
            formData: {   //下拉参数
                 pageIndex: 1,
                 pageSize: 20
              },
            tempload:[],
            xzList:[],
        }
    },
    watch:{
        $router:function(val){
             this.getinit(val);
        }
    },
    mounted(){
        // this.changeList();
        this.$store.dispatch("getXb");
        // this.$store.dispatch("getJb");
        // this.$store.dispatch("getTb");
        this.$store.dispatch("getDp");
        // this.$store.dispatch("getZmwyh");
        this.$store.dispatch("getZylb");
        this.$store.dispatch("getMz");
        this.$store.dispatch("getXl");
        // this.$store.dispatch('getTylb');
        // this.$store.dispatch("getSydw");
        // this.$store.dispatch("getFydw");
        this.$store.dispatch("getFyjb");
        this.$store.dispatch("getSbjys");
        this.$store.dispatch("getZjqf");
        this.$store.dispatch('getJpyy');
        this.$store.dispatch('getTysf');
        this.getinit(this.$route);
        
        //this.getList(this.CurrentPage, this.pageSize, this.pd);
    },
    methods:{
        clickRow(row){
           this.$refs.multipleTable.toggleRowSelection(row)
        },
      

        getinit(val){
          
           //权限start
            this.$api.post(this.Global.menuurl,{'menuId':'11192136'},
                     r =>{
                     
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                                this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                         
                            }   
                             this.getCheckList();
                             this.getjb();
                             this.gettylb();
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
            });
         //权限end

           this.viewtype=val.query.type;
           
           // this.getXHFT();
          //  this.getOrg();
          
        },
        gettylb(){
                  let p={
                        'level':'0222000001',
                        'administrativeDivision':'',
                        
                    };
                    this.$api.post(this.Global.tylburl,p,
                            r =>{
                                this.tylblist=ToArray(r.data);
                        });
        },
        getjb(){
                   let p={
                        'level':'0222000001',
                        'administrativeDivision':'',
                        'identityType':this.Global.SPECIALPERSON,
                    };
                   this.$api.post(this.Global.jburl,p,
                          r =>{
                         this.jblist=ToArray(r.data,'1');
                    });
        },
               
    //获取行政区划
   getXz(val){
            if(this.xzdata.length==0)   
            this.$api.get(this.Global.aport4+this.Global.jg,null,
                r =>{
                if(r.success){
                     this.xzList = ToArray(r.data);
                       if(val){
                               var arr = this.xzList.filter(item=>{
                                return item.dm.indexOf(val) + 1
                              });
                              this.xzdata=arr;
                         }else{
                             this.xzquery();
                         }
                 }
                })
            },
      xzquery(){
              if(this.xzList.length>this.jznum){
                this.xzdata=this.xzList.slice(0,this.jznum);
              }else{
                this.xzdata=this.xzList;
            }
         },
      //籍贯远程搜索
     xzdwremoteMethod(quer){
          if (quer !== ''|| this.xzdata.length<=0) {
            var arr = this.xzList.filter(item=>{
              return item.mc.indexOf(quer) + 1
            });
            this.tempload=arr;
            if(arr.length>this.jznum){
               this.xzdata=arr.slice(1,this.jznum);
            }else{
              this.xzdata=arr;
            }
          
          }else{
            this.tempload=[];
            this.xzquery();
          }
        },
       //籍贯单位加载
    xzloadmore() {
        var srr= this.xzList;
        if(this.tempload.length>0){
          srr= this.tempload;
        } 
        this.formData.pageIndex++;
        let num = this.formData.pageIndex * this.formData.pageSize;
           this.xzdata =srr.filter((item, index, arr) => {
               return index < num;
         });
       
    },

          handleSelectionChange(val) {
          this.multipleSelection = val;
          if(this.multipleSelection.length>0){
              this.bnt=false;
          }else{
             this.bnt=true; 
          }
        },
        pageSizeChange(val) {
          this.pageSize=val;
          this.getList(this.CurrentPage, val, this.pd);
        },
        handleCurrentChange(val) {
          this.CurrentPage=val;
          this.getList(val, this.pageSize, this.pd);
        },
        add(){
            this.addDialogVisible=true;
        },
        goadd(){
          
            this.addDialogVisible=false;
            if(this.addtype==1){
            this.$router.push({name:'PairAdd',query:{type:this.addtype}});
            }else{
            this.$router.push({name:'SpecialAdd',query:{type:this.addtype}});
            }
        },
        reset(){
            this.pd={};
            this.pd1={is1:false,is2:false};
            this.CurrentPage=1;
        },
        getAll(n){
            if(n==1){
                this.open=true;
                this.all=false;
            }else{
                this.open=false;
                this.all=true;
            }
        },
         getCheckList(){
             let p={
                   'type':'0246000003'
             };
              this.$api.post(this.Global.aport2+'/CaseHomeController/getCaseListInfo',p,
                r =>{
                  
                      if(r.code==1){
                          this.checkItem=r.data;
                          this.configHeader=[];
                            for(var j=0;j<this.checkItem.length;j++){
                                if(this.checkItem[j].checked)
                                    this.configHeader.push(this.checkItem[j])
                                }
                          if(this.configHeader.length==0){
                                this.cc=false;
                            }else{
                                this.cc=true;
                            }
                       }
                    
                      
                });
        },
        changeList(){
          this.configHeader=[];
          console.log('this.checkedList',this.checkedList.length,this.checkItem.length);
          
            for(var i=0;i<this.checkedList.length;i++){
            for(var j=0;j<this.checkItem.length;j++){
              if(this.checkedList[i] == this.checkItem[j].code){
                this.configHeader.push(this.checkItem[j])
              }
            }
           }
         
           if(this.configHeader.length==0){
                this.cc=false;
            }else{
                this.cc=true;
            }
          this.configHeader=sortByKey(this.configHeader,'sort');
            
        },
        getList(currentPage, showCount, pd){
          this.changeList();
          this.tableData=[];
          this.querybnt=false;
          //  //全国人大代表
          //  if(this.pd.is1){
          //      this.pd.isRepresentative="1";
          //  }
          //  //全国政协委员
          //  if(this.pd.is2){
          //      this.pd.isCppcMember="1";
          //  }

          //  //在京特约人员
          //  if(this.pd.is3){
          //      this.pd.isInBeijing="0209000001";
          //  }
          //  //省部级以上领导
          //    if(this.pd.is4){
          //       this.pd.isProvincial="0181000001"
          //  }
           //补选
           if(this.pd1.is1){
               this.pd.repair="0272000001"
           }
           //补选
           if(this.pd1.is2){
               this.pd.fire="0292000001"
           }
          

          let p={
             "pd":this.pd,
             "pageInfo":{
                 "pageNumber":currentPage,
                 "pageSize":showCount,
             }
          };
          this.$api.post(this.Global.aport1+'/specialPerson/query',p,
                r =>{
                  
                      if(r.code==1){
                          this.tableData=r.data.specialPersonList;
                          this.TotalResult=r.data.pageInfo.total;
                        
                      }
                     this.querybnt=true;
                });
        
        },
         dellist(){
            var mselect=[];
            if(this.multipleSelection.length==0){
                   this.$message.error("请选择一条信息!"); return;
            }else{
                var array=this.multipleSelection;
                   for (let i = 0; i < array.length; i++) {
                       mselect.push(array[i].personId);
                    
                   }
            }
           this.$confirm('此操作将删除所有业务关联该人员的信息!', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let p={
                        'pbIds':mselect
                    };
                this.$api.post(this.Global.aport1+'/specialPerson/delete',p,
                 r =>{
                  
                      if(r.code==1){
                         
                           this.$message.success('删除成功');
                        this.getList(this.CurrentPage, this.pageSize, this.pd);
                      }
                });

                }).catch(() => {
                     
                     this.$message.info('已取消删除');         
                });

        },
        edit(t,title){
            if(t==0){
                  this.$router.push({name:'BaseAdd',query:{type:'3',status:t,wtitle:title}});
            }else{
              if(this.multipleSelection.length>1){
                    this.$message.error("只能选择一条信息!"); return;
              }else if(this.multipleSelection.length==0){
                     this.$message.error("请选择一条信息!"); return;
              }
             
              this.$router.push({name:'BaseAdd',query:{type:'3',status:t,wtitle:title,pbid:this.multipleSelection[0].pbId,reid:this.multipleSelection[0].specialPersonId}});
             }
        },
          download(){
              let p={};
              if(this.multipleSelection.length==0){
                    p={
                        "pd":this.pd,
                        "listName":this.configHeader,
                    }
              }
            this.$api.post(this.Global.aport2+'/CaseHomeController/exportCaseInfo',p,
                r =>{
                      this.downloadM(r);
                },e=>{},{},'blob')
          },
            downloadM (data) {
         
                
            if (!data) {
                return
            }       
           
            var name='关注案件列表'+format(new Date(),'yyyyMMddhhmmss')+'.xls';
      
            let url = window.URL.createObjectURL(new Blob([data],{type:"application/xls"}))
            
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
         
            
            link.setAttribute('download',name)
            document.body.appendChild(link)
            link.click()
        },
           //巡回法庭
           getXHFT()
           { let p={
                    'mc':'',
                   
                };
                this.$api.post(this.Global.aport1+'/org/getCircuitCourt',p,
                r =>{
                    if(r.code==1){
                        this.xhftdata=r.data;
                    }
                });
                       
           },
            getDR(){
            this.drDialogVisible=true;
        },
          drfatherMethod(data,t){
            this.drDialogVisible=false;
          },
    //所属单位
    getOrg(){
              
          if(this.ssdwdata.length==0){
                  this.$api.get(this.Global.aport1+'/org/getCourtOrg',null,
                  r =>{
                    
                        if(r.code==1){

                            this.ssdwload=r.data;
                           this.ssdwquery();
                        }
                  });
              }
          },
            ssdwquery(){
              if(this.ssdwload.length>this.jznum){
                this.ssdwdata=this.ssdwload.slice(0,this.jznum);
              }else{
                this.ssdwdata=this.ssdwload;
            }
         },

   //所属单位远程搜索
     orgremoteMethod(quer){
            if (quer != '') {
              var arr = this.ssdwload.filter(item=>{
                return item.mc.indexOf(quer) + 1
              });
              this.tempload=arr;
              if(arr.length>this.jznum){
                this.ssdwdata=arr.slice(1,this.jznum);
              }else{
                this.ssdwdata=arr;
              }
            
            }else{
              this.tempload=[];
              this.ssdwquery();
            }
          },
        //所属单位加载
      orgloadmore() {
          var srr= this.ssdwload;
          if(this.tempload.length>0){
            srr= this.tempload;
          } 
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.ssdwdata =srr.filter((item, index, arr) => {
                return index < num;
          });
        
      },
          
    },
}
</script>
<style scoped>
.yy-input-text{font-size: 14px;}
</style>