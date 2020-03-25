<template>
    <div class="pairadd">

         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 监控和预警
              <span class="mlr_10">/</span>  <b>法院要闻</b></span> </div>
         <div class="content subtable">
               <div class="ptitle mb-20">法院要闻</div>
                <div class="pborder">
                    <el-row class="lh" :gutter="2">

                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">要闻类型</span>
                           <el-select v-model="pd.courtNewsType" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.fyywlx"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">要闻来源</span>
                           <el-select v-model="pd.courtNewsSource" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.fyywly"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text" style="width:27.6%!important;">录入时间</span>
                            <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker
                                v-model="pd.startCreateTime" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker
                                    v-model="pd.endCreateTime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间" >
                                </el-date-picker>
                            </div>
                       </el-col>
                         <el-col :sm="24" :md="24" :lg="24">
                            <span class="yy-input-text"  style="width:9%!important;">要闻标题</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.title"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                        </el-col>
                    </el-row>
                     <el-row class="lh" v-if="open">
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">公开区分</span>
                           <el-select v-model="pd.isPublic" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.gkqf"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">公开状态</span>
                           <el-select v-model="pd.publicStatus" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.gkzt"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">展示区分</span>
                           <el-select v-model="pd.showDistinction" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.zsqf"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">展示状态</span>
                           <el-select v-model="pd.zszt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.zszt"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col> -->
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">审核区分</span>
                           <el-select v-model="pd.isCheck" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.shqf"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">审核状态</span>
                           <el-select v-model="pd.checkStatus" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.shzt"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">发布区分</span>
                           <el-select v-model="pd.isPush" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.fbqf"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">发布状态</span>
                           <el-select v-model="pd.pushStatus" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.fbzt"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text" style="width:27.6%!important;">发布时间</span>
                            <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker
                                v-model="pd.startPushTime" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker
                                    v-model="pd.endPushTime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间" >
                                </el-date-picker>
                            </div>
                       </el-col>
                     </el-row>
                  </div>
                     <div class="footer">
                    <el-button type="primary"  style="width:130px;" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查 询</el-button>
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
                    <el-row>
                            <el-col :span="16">
                              <el-button type="primary" size="small" @click="getCK('0')" v-if='allshow[0]'>录入</el-button>
                              <el-button type="primary"  size="small"  :disabled="bnt" @click="getCK('9')" v-if='allshow[1]'>查看</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getCK('1')" v-if='allshow[2]'>修改</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="delinfo" v-if='allshow[3]'>删除</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getopen(1)" v-if='allshow[4]'>公开</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getopen(2)" v-if='allshow[5]'>审核</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getopen(3)" v-if='allshow[6]'>发布</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getopen(4)" v-if='allshow[7]'>回收</el-button>
                            &nbsp;
                            </el-col>
                              <el-col :span="8" class="trt">
                                  总数 <b class="sumfont" >{{this.TotalResult}}</b> 件
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
                                label="序号">
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
          </div>
   <el-dialog :title="diatxt" :visible.sync="addDialogVisible" :close-on-click-modal='false' width="800px"> 
 <el-form :model="form">
   <el-row class="ah-40">
       <el-col :span="12">
              <span class="yy-input-text trt">要闻类型：</span>
              <el-select v-model="form.courtNewsType" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                  <el-option
                    v-for="(item,ind) in $store.state.fyywlx"
                    :key="ind"
                    :label="item.mc"
                    :value="item.dm">
                 </el-option>
              </el-select>
       </el-col>
          <el-col :span="12">
              <span class="yy-input-text trt">要闻来源：</span>
              <el-select v-model="form.courtNewsSource" :disabled="ckshow" @change="getbd(form.courtNewsSource)" filterable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                 <el-option
                  v-for="(item,ind) in $store.state.fyywly"
                  :key="ind"
                  :label="item.mc"
                  :value="item.dm">
                </el-option>
              </el-select>
       </el-col>
        <el-col :sm="24" :md="24" :lg="24" v-if='bd'>
            <span class="yy-input-text trt"  style="width:13.5%!important;">标题：</span>
             <el-input placeholder="请输入内容" size="small" :disabled="ckshow" clearable v-model="form.title"  class="yy-input-input" style="width:80.5%!important;"></el-input>
        </el-col>
          <el-col :sm="24" :md="24" :lg="24" class="mt-5" v-if='bd'>
            <span class="yy-input-text trt topt"  style="width:13.5%!important;">内容：</span>
             <el-input placeholder="请输入内容" :disabled="ckshow" type="textarea" :autosize="{ minRows: 6, maxRows: 6}" size="small" clearable v-model="form.contents"  class="yy-input-input" style="width:80.5%!important;"></el-input>
        </el-col>
         <el-col :sm="24" :md="24" :lg="24" v-if='!bd'>
            <span class="yy-input-text trt"  style="width:13.5%!important;">连接：</span>
             <el-input placeholder="请输入内容" :disabled="ckshow" size="small" clearable v-model="form.url"  class="yy-input-input" style="width:80.5%!important;"></el-input>
        </el-col>
       <el-col :span="24" class="input-item mt-10" v-if='bd'>
           <span class="yy-input-text trt txttop" style="width:13.5%!important;">影像资料：</span>
            <div class="yy-input-input">
                  <el-button type="primary" :disabled="ckshow"  plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="upload(1)">上传影像资料</el-button> 
               </div>
        </el-col>
 <el-col :span="24" v-if="fits && fits.length>0">
                        <div style="margin-left:13.5%;"  v-for="(fit,ind) in fits" :key="ind">
                            <div class="block" style="float:left;margin-right:20px;margin-top:20px" v-if='getImgV(fit.filesuffix)'>
                               
                              <el-popover placement="right" title="" trigger="click">
                               
                            <img :src="fit.filepath"  style="max-width:700px; max-height:700px;"/>
                            
                            <img :src="fit.filepath" slot="reference" width="180" height="150">
                                          
                            </el-popover>
                              <a class="close" v-if='!ckshow' @click="delImg(fit.courtnewsimageid)"> <i class="el-icon-close"></i></a>
                            </div>
                              <div class="block" style="float:left;margin-right:20px;margin-top:20px" v-else>
                              <el-popover placement="right" title="" trigger="click">
                                     <video  
                                    :src="fit.filepath" width="550" height="500"
                                    class="avatar video-avatar" 
                                    controls="controls" >
                                    您的浏览器不支持视频播放
                             </video>
                                <video  
                                    :src="fit.filepath" width="180" height="150"
                                    class="avatar video-avatar" 
                                    controls="controls" slot="reference">
                                    您的浏览器不支持视频播放
                             </video>
                             </el-popover>
                            <a class="close" v-if='!ckshow' @click="delImg(fit.courtnewsimageid)" > <i class="el-icon-close"></i></a>
                            </div>
                        </div>
                </el-col>
         </el-row>
        </el-form>
         <div slot="footer" class="dialog-footer">
              <el-button type="primary"  size="small" @click="addsave()" v-if='tb==0'>保 存</el-button>
              <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
            </div>
   </el-dialog>
   <el-dialog title="影像资料" :visible.sync="uploadDialogVisible" :close-on-click-modal='false' width="640px">
        <VIDEONEW :url="vvurl" :type="2" :urlErr="urlErr" @DfatherMethod="DfatherMethod" :random="new Date().getTime()"></VIDEONEW>
  </el-dialog>
   <el-dialog title="公开" :visible.sync="openDialogVisible" :close-on-click-modal='false' width="660px">
   <OPEN :url="openurl" :type="0" :data="opendata" @GKfatherMethod="GKfatherMethod" :random="new Date().getTime()"></OPEN>
  </el-dialog>
  <el-dialog  :title="txtname" :visible.sync="shDialogVisible" :close-on-click-modal='false'  width="660px">
   <EXAMINE :url="shurl" :type="sendtype" :data="opendata" @SHfatherMethod="SHfatherMethod" :random="new Date().getTime()"></EXAMINE>
  </el-dialog>
 
  <el-dialog title="内容发布" :visible.sync="fbDialogVisible" :close-on-click-modal='false' width="800px">
     <RELEASE :url="fburl" :type="0"  :data="opendata" @FBfatherMethod="FBfatherMethod" :random="new Date().getTime()"></RELEASE>
  </el-dialog>
    </div>
</template>
<script>

import VIDEONEW from "../Common/imgvideo"
import OPEN from "../Common/opencontent"
import EXAMINE from "../Common/examinecontent"
import RELEASE from "../Common/releasecontent"
import {ToArray,sortByKey} from '@/assets/js/ToArray.js'
export default {
    components:{VIDEONEW,OPEN,EXAMINE,RELEASE},
    data(){
        return{
            CurrentPage: 1,
            pageSize: 10,
            TotalResult: 0,
            pd:{},
            form:{},
            tableData:[],
            options:this.pl.ps,
            open:false,
            all:true,
            bnt:true,
            multipleSelection:[],
            configHeader:[],
            checkedList:[],
            checkItem:[],
            fits:[],
            openDialogVisible:false,
            shDialogVisible:false,
            fbDialogVisible:false,
            uploadDialogVisible:false,
            addDialogVisible:false,
            vvurl:'/courtNewsEntry/uploadCourtImageData',
            urlErr:'',
            diatxt:'法院要闻录入',
            tb:0,
            bd:true,
            openurl:'/contentPublic/openContent',
            shurl:'/contentPublic/auditContent',
            fburl:'/contentPublic/releaseContent',
            openDialogVisible:false,
            shDialogVisible:false,
            fbDialogVisible:false,
            opendata:[],//需要传的对象
            txtname:'审核',
            sendtype:'0',//审核
            ckshow:false,
            alldata:['27093813','27093814','27093815',
            '27093816','27093817','27093818'
            ,'27093819','27093820'],
            allshow:[],

        }
    },
    mounted(){
        this.$store.dispatch("getFyywlx");
        this.$store.dispatch("getFyywly");
        this.$store.dispatch("getGkqf");
        this.$store.dispatch("getGkzt");
        this.$store.dispatch("getZsqf");
        this.$store.dispatch("getZszt");
        this.$store.dispatch("getShqf");
        this.$store.dispatch("getShzt");
        this.$store.dispatch("getFbqf");
        this.$store.dispatch("getFbzt");
        this.getinit(this.$router);
    },
     watch:{
        $router:function (val) {
                this.getinit(val);
        }
    },
    methods:{
        getbd(val){
      
            if(val=='0241000001'){
               
                this.$set(this.form,'url','');
                this.bd=true;
            }else{
                 this.fits=[];
                 this.$set(this.form,'title','');
                this.$set(this.form,'contents','');
                this.bd=false;
            }
            
        },
        getinit(val){
            //权限start
            this.$api.post(this.Global.menuurl,{'menuId':'15102709'},
                     r =>{
                     
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                                this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                         
                            }   
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
            });
         //权限end
               this.getCheckList();
                this.getList(this.CurrentPage, this.pageSize, this.pd);
        },
        reset(){
            this.pd={};
        },
        clickRow(row){
           this.$refs.multipleTable.toggleRowSelection(row)
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
          getCheckList(){
             let p={
                   'type':'0246000014'
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
          let p={
             "pd":this.pd,
             "pageInfo":{
                 "pageNumber":currentPage,
                 "pageSize":showCount,
             }
          };
          this.$api.post(this.Global.aport2+'/courtNews/queryCourtNewsAll',p,
                r =>{

                      if(r.code==1){
                          this.tableData=r.data.data.queryResultVOS;
                          this.TotalResult=r.data.data.pageInfo.total;
                
                      }else{
                          this.tableData=[];
                          this.TotalResult=0;
                      }
                   
                });

        },
        getCK(t){
                 this.form={};
                 this.fits=[];
                 this.bd=true;
                 this.tb=0;
                 this.ckshow=false;
            if(t==0){
                 this.diatxt="法院要闻录入";
                 
                 this.$set(this.form,'courtNewsSource','0241000001')
            }else if(t==1){
                 this.diatxt="法院要闻修改";
            }else if(t==9){
                 this.tb=1;
                 this.ckshow=true;
                 this.diatxt="法院要闻查看";
          }

          if(t!=0){
              if(this.multipleSelection.length==0){
                    this.$message.error("请选择一条数据！");return;
              }else  if(this.multipleSelection.length>1){
                    this.$message.error("只能选择一条数据！");return;
              }

           //   this.form=(Object.assign({},this.multipleSelection[0]));
           let p={
               'pd':{
                   'courtNewsId':this.multipleSelection[0].courtNewsId
               }
           };
               this.$api.post(this.Global.aport2+'/courtNewsEntry/queryCourtNewsEntryAll',p,
                r =>{
                    if(r.data.code==1){
                         this.form=r.data.data[0];
                         
                         this.fits=r.data.data[0].imageList;
                         if(this.form.courtNewsSource=='0241000001'){
                             this.bd=true;
                         }else if(this.form.courtNewsSource=='0241000002'){this.bd=false;}
                      }
                });
          }
            this.addDialogVisible=true;
        },
        delinfo(){
             if(this.multipleSelection.length==0){
                this.$message.error("请选择一条数据！");return;
              }else  if(this.multipleSelection.length>0){
            
                 var array=this.multipleSelection;
                 var srr=[];
                 for (let i = 0; i < array.length; i++) {
                    var obj={};
                    obj.courtNewsId= array[i].courtNewsId;
                    srr.push(obj);
                    
                 }

                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$api.post(this.Global.aport2+'/courtNews/deleteCourtNews',srr,
                        r =>{
                        
                                if(r.code==1){
                                   
                                this.$message.success("删除成功");   

                                    this.getList(this.CurrentPage, this.pageSize, this.pd);
                                }
                            });
                       }).catch(() => {
                    
                    this.$message.info("已取消删除");   
                });
            }

        },
        addsave(){
            if(this.form.courtNewsType=='' || this.form.courtNewsType==undefined || this.form.courtNewsType==null){
                this.$message.error("要闻类型不能为空！");return;
            }
            if(this.form.courtNewsSource=='' || this.form.courtNewsSource==undefined || this.form.courtNewsSource==null){
                this.$message.error("要闻来源不能为空！");return;
            }
            if(this.form.courtNewsSource=="0241000001"){
              if(this.form.title=='' || this.form.title==undefined || this.form.title==null){
                this.$message.error("标题不能为空！");return;
              }
               if(this.form.contents=='' || this.form.contents==undefined || this.form.contents==null){
                this.$message.error("内容不能为空！");return;
              }
            }
            else{
                if(this.form.url=='' || this.form.url==undefined || this.form.url==null){
                this.$message.error("连接不能为空！");return;
              }
            }

               this.form.list=this.fits;
               this.$api.post(this.Global.aport2+'/courtNewsEntry/saveCourtnews',this.form,
                r =>{

                      if(r.data.code==1){
                      
                          
                            this.$message.success(r.message);
                             this.addDialogVisible=false;
                           this.getList(this.CurrentPage, this.pageSize, this.pd);  
                      
                      }else{
                         this.$message.error(r.data.message);
                      }
                   
                });
        },
         upload(t){
           
               this.uploadDialogVisible=true;
            
        },
        getImgV(n){
           var array=this.$store.state.imgformat.split(',');
          for (let i = 0; i < array.length; i++) {
               if(n.toLowerCase()==array[i])
               {
                   return true;
               }
              
          }
          return false;
        },
        delImg(data){
            console.log(data,'---');
            
          let p={
              'courtnewsimageid':data,
          };
         this.$api.post(this.Global.aport2+'/courtNewsEntry/delImageDataInfo',p,
                r =>{
                    if(r.code==1){
                    var index = this.fits.findIndex(item =>{
                　　　　　 if(item.courtnewsimageid==data){
                        　　　　return true
                        　　}
                        　})
                        this.fits.splice(index,1);
                   }else{
                       this.$message.error(r.message);
                   }
                });
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
        
        getopen(t){
            if(this.multipleSelection.length==0){
                this.$message.error("请选择至少一条数据!");return;
            }
            if(this.multipleSelection.length>1 && t==3){
                this.$message.error("只能选择一条数据!");return;
            }
            var contentPublicList=[];
            
            
            var array=this.multipleSelection;
            for (let i = 0; i < array.length; i++) {
            
                    


                var obj={};
                obj.contentPublicId=array[i].courtNewsId;
                obj.contentPublicType="0134000003";
                obj.contents=array[i].contents;
                
                switch (t) {
                    case 1://公开
                       
                         obj.publicProcessType="0133000001";
                        break;
                    case 2://审核
                        if(array[i].isCheckId=='0137000002'){
                            this.$message.error("公开后才能进行审核！");return;
                        }
                         obj.publicProcessType="0133000002";
                        break;
                    case 3://发布
                       if(array[i].isCheckId=='0175000002'){
                            this.$message.error("审核后才能进行发布！");return;
                        }
                         obj.publicProcessType="0133000003";
                        break;
                    case 4://回收
                        if(array[i].isCheckId=='0175000002'){
                            this.$message.error("审核后才能进行回收！");return;
                        }
                         obj.publicProcessType="0133000004";
                        break;
                    default:
                        break;
                }
             
                contentPublicList.push(obj);
            }
            this.opendata=contentPublicList;


             if(t==1){
                 this.openDialogVisible=true;
             }else if(t==2){
                   this.txtname="审核";
                   this.shurl="/contentPublic/auditContent";
                   this.sendtype='0'
                   this.shDialogVisible=true;
             }else if(t==3){
                 this.fbDialogVisible=true;
             }
             else if(t==4){
                 this.txtname="回收";
                 this.shurl="/contentPublic/recycleContent";
                 this.sendtype='1'
                 this.shDialogVisible=true;
             }
        },
        GKfatherMethod(data,t){
               this.getList(this.CurrentPage, this.pageSize, this.pd);
                 this.openDialogVisible=false;
        },
        SHfatherMethod(data,t){
               this.getList(this.CurrentPage, this.pageSize, this.pd);
                 this.shDialogVisible=false;
        },
        FBfatherMethod(data,t){
               this.getList(this.CurrentPage, this.pageSize, this.pd);
                 this.fbDialogVisible=false;
        },
        DfatherMethod(data,t){
             if(this.fits && this.fits.length>0){
             for (let i = 0; i < data.length; i++) {
               this.fits.push(data[i]);
                    }
                }else{
                    this.fits=data;
                }
                   this.getList(this.CurrentPage, this.pageSize, this.pd);
            this.uploadDialogVisible=false;
        }
    },
}
</script>
<style scoped>
.block .close{display: block;position: absolute;font-size: 18px; font-weight:bold;color: red;cursor: pointer;z-index: 999;margin-top: -185px;margin-left: 170px;}
</style>