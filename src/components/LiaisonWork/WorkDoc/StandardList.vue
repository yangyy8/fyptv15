<template>
    <div class="pairadd ">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 工作文件 <span class="mlr_10">/</span> 查询</span></div>
         <div class="content subtable">
             <div class="ptitle mb-20">{{cname}}信息</div>
                <div class="pborder">
                    <el-row class="lh" :gutter="2">
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">类别</span>
                         <el-select v-model="pd.workRelFileType"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                              <el-option
                                v-for="(item,ind) in $store.state.wjlb"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                         </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                          <span class="yy-input-text">年度</span>
                          <el-select v-model="pd.year"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input">
                            <el-option
                              v-for="(item,ind) in $store.state.dbnf"
                              :key="ind"
                              :label="item.mc"
                              :value="item.dm">
                            </el-option>
                       </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                          <span class="yy-input-text">期数</span>
                          <el-select v-model="pd.period"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input">
                            <el-option
                              v-for="(item,ind) in monthlist"
                              :key="ind"
                              :label="item"
                              :value="item">
                            </el-option>
                       </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">标题</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.theme"  class="yy-input-input" ></el-input>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">内容</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.contents"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                          <span class="yy-input-text">批示领导</span>
                          <el-select v-model="pd.instructLeaderId" remote :remote-method="fyrdwremoteMethod" 
                          v-el-select-loadmore="fyrloadmore" @visible-change="getFYName($event)"  filterable  clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:70%!important" >
                            <el-option
                              v-for="(item,ind) in fyrdata"
                              :key="ind"
                              :label="item.fullName"
                              :value="item.pbId">
                              </el-option>
                         </el-select>
                      </el-col>
                      <el-col :sm="24" :md="12" :lg="8" class="input-item">
                          <span class="yy-input-text">批示时间</span>
                          <div class="yy-input-input  t-flex  t-date">
                            <el-date-picker
                            v-model="pd.startInstructionTime" format="yyyy-MM-dd"
                            type="date" size="small" value-format="yyyy-MM-dd"
                            placeholder="开始时间" >
                            </el-date-picker>
                            <span class="septum">-</span>
                            <el-date-picker
                                v-model="pd.endInstructionTime" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="结束时间" >
                            </el-date-picker>
                        </div>
                      </el-col>
                       <el-col :sm="24" :md="12" :lg="8" class="input-item">
                         <span class="yy-input-text">领导批示</span>
                         <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.instructionContents"  class="yy-input-input" ></el-input>
                      </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">录入人</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.mc"  class="yy-input-input" ></el-input>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">录入时间</span>
                            <div class="yy-input-input  t-flex  t-date">
                              <el-date-picker
                              v-model="pd.startEntryTime" format="yyyy-MM-dd"
                              type="date" size="small" value-format="yyyy-MM-dd"
                              placeholder="开始时间" >
                              </el-date-picker>
                              <span class="septum">-</span>
                              <el-date-picker
                                  v-model="pd.endEntryTime" format="yyyy-MM-dd"
                                  type="date" size="small" value-format="yyyy-MM-dd"
                                  placeholder="结束时间" >
                              </el-date-picker>
                          </div>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">修改人</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.mc"  class="yy-input-input" ></el-input>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">修改时间</span>
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
                    </el-row>
                 <div class="footer">
                    <el-button type="primary"  style="width:130px;" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查 询</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                     </div>
                 </div>

                <div class="pborder mt-20">
                         <el-row>
                            <el-col :span="16">
                              <el-button type="primary" size="small" @click="getadd(0)">添加</el-button>
                              <el-button type="primary" size="small" :disabled="bnt" @click="getadd(2)" >查看</el-button>
                              <el-button type="primary" size="small" :disabled="bnt" @click="getadd(1)" >修改</el-button>
                              <el-button type="primary" size="small" :disabled="bnt"  @click="delInfo" >删除</el-button>
                              <el-button type="primary" size="small" >下载</el-button>
                              <el-button type="primary" size="small"  @click="getDR">导入</el-button>
                               &nbsp;
                              </el-col>
                              <el-col :span="8" class="trt">
                            
                              </el-col>
                         </el-row>
                     <el-table
                            ref="multipleTable"
                            :data="tableData"
                            @row-click="clickRow"
                            @selection-change="yhChange">
                            <el-table-column
                                type="selection"
                                width="100">
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
                                prop="theme"
                                label="标题"
                                width="300" >
                                <template slot-scope="scope">
                                  <el-popover placement="top-start" width="300" trigger="hover" >
                                       <div>{{scope.row.theme}}</div>
                                      <span slot="reference">{{ scope.row.theme.substr(0,20)}}{{scope.row.theme.length>20?'......':''}}</span>
                                  </el-popover>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column
                                prop="contents"
                                label="内容">
                            </el-table-column> -->
                             <el-table-column
                                prop="workRelFileType"
                                label="类别">
                             </el-table-column>
                             <el-table-column
                              prop="year"
                              label="年度">
                             </el-table-column>
                             <el-table-column
                                prop="period"
                                label="期数">
                             </el-table-column>
                             <el-table-column
                                prop="instructLeader"
                                label="批示领导">
                             </el-table-column>
                             <el-table-column
                                prop="instructionTime"
                                label="批示时间">
                             </el-table-column>
                             <el-table-column
                                prop="entryPerson"
                                label="录入人">
                            </el-table-column>
                            <el-table-column
                                prop="entryTime"
                                label="录入时间">
                            </el-table-column>
                             <el-table-column
                                prop="updatePerson"
                                label="修改人">
                            </el-table-column>
                             <el-table-column
                                prop="updateTime"
                                label="修改时间">
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
                <br/><br/>
         </div>
         <el-dialog title="选择类别" :visible.sync="lbDialogVisible" :close-on-click-modal='false'  width="630px">
         <div style="line-height: 35px; ">
         
              <el-radio
                v-for="(item,ind) in $store.state.wjlb"
                :key="ind"
                :value="item.dm"
                :label="item.dm+'|'+item.mc"
                v-model="lbradio"
                style="width: 28%;"
                >{{item.mc}}
              </el-radio>
     
          <div slot="footer" style="text-align:center;border-top:1px solid #cccccc; margin-top:10px; padding-top:10px;">
            <el-button type="success"  size="small" @click="sureadd">确 定</el-button>
            <el-button  size="small" @click="lbDialogVisible=false">取 消</el-button>           
          </div> 
         </div>
       </el-dialog>
         <el-dialog title="导入文件" :visible.sync="drDialogVisible" :close-on-click-modal='false'  width="630px">
            <UPLOAD :url="vvurl" :type="11"  :urlErr="vvurlErr"  @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
         </el-dialog>
         <el-dialog :title="adddia" :visible.sync="addDialogVisible" v-if='addDialogVisible' :before-close="handleClose" :close-on-click-modal='false'  width="950px">
          <DOCADD  :type="radiotype" :lb='tb' :data="ckdata"  @addfatherMethod="addfatherMethod" :random="new Date().getTime()"></DOCADD>
       </el-dialog>
       <el-dialog :title="adddia" :visible.sync="ckDialogVisible" v-if='ckDialogVisible'  :close-on-click-modal='false'  width="950px" >
        <DOCQ  :data="ckdata"  @ckfatherMethod="ckfatherMethod" :random="new Date().getTime()"></DOCQ>
      </el-dialog>

</div>
 </template>
<script>
  import UPLOAD from "../../Common/upload"
  import DOCADD from "../../Common/workdoc/docadd"
  import DOCQ from "../../Common/workdoc/docquery"
  import {birthdayMonth} from '@/assets/js/date.js'
export default {
  components:{UPLOAD,DOCADD,DOCQ},
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
            form:{},
            options:this.pl.ps,
            bnt:true,
            mselect:[],
            adddia:'新增',
            tableData:[],
            xzqhlist:[],
            jgdata:[],
            addtype:'1',
            show:true,
            cname:'制度规范',
            wyhlist:[],
            alldata:['21443322','21443323','21443324','21443325','21443326'],//0录入,1查询,2修改,3删除,4导入
            allshow:[],
            drDialogVisible:false, 
            addDialogVisible:false,
            ckDialogVisible:false,
            lbDialogVisible:false,
            vvurl:'/courtPerson/import',
            vvurlErr:'',
            lx:'',
            lxtype:'',
            monthlist:birthdayMonth(),
            lbradio:'',
            radiotype:'',
            ckdata:{},
            fyrdata:[],
            fyrload:[],
            tempload:[],
            formData: {   //下拉参数
                pageIndex: 1,
                pageSize: 20
              },
            jznum:100,//下载加载多少条
            tb:0,

        }
    },
      mounted(){
       this.$store.dispatch('getWjlb');
       this.$store.dispatch("getDbnf");
       this.getinit();
           
    },
     methods:{
        getinit(){
            var menuid='11262144';
                //权限start
                 this.$api.post(this.Global.menuurl,{'menuId':menuid},
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
              this.getList(this.CurrentPage,this.pageSize,this.pd);

        },
        getList(currentPage, showCount, pd){
          
          let p={
             
            "pd":this.pd,
             "pageInfo":{
                 "pageNumber":currentPage,
                 "pageSize":showCount,
             }
           };
          this.$api.post(this.Global.aport1+'/WorkFilesController/queryWorkFiles',p,
                     r =>{
                       if(r.code==1){
                         this.tableData=r.data.workFilesVOList;
                         this.TotalResult=r.data.pageInfo.total;

                       }
             });

        },
        //删除
        delInfo(n){
          var mselect=[];
            if(this.mselect.length==0){
                   this.$message.error("请选择一条信息!"); return;
            }else{
                var array=this.mselect;
                   for (let i = 0; i < array.length; i++) {
                     var obj={};
                       obj.workFilesId=array[i].workFilesId;
                       mselect.push(obj);
                       
                   }
            }
           this.$confirm('此操作将删除所有业务关联该人员的信息!', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let p={
                        'workFilesIdList':mselect
                    };
                this.$api.post(this.Global.aport1+'/WorkFilesController/delete',p,
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
        getadd(t){

           if(t==0){
             this.lbradio='';
             this.lbDialogVisible=true;
           }else if(t==2){
            if(this.mselect.length>1){
               this.$message.error("只能选择一条数据!"); return;
            }
               this.adddia="查看"+this.mselect[0].workRelFileType.replace('《','').replace('》','');
              this.ckdata=this.mselect[0];
              this.ckDialogVisible=true;
           }else{
           
            if(this.mselect.length>1){
               this.$message.error("只能选择一条数据!"); return;
            }
            this.ckdata=this.mselect[0];
            this.tb=1;
            
            this.adddia="修改"+this.mselect[0].workRelFileType.replace('《','').replace('》','');
            this.radiotype=this.mselect[0].workRelFileType;//修改
            this.addDialogVisible=true;
           }
        },
        sureadd(){
          var arr=this.lbradio.split('|');
          this.ckdata={};
          if(this.lbradio && arr.length>1){
            this.adddia="添加"+arr[1].replace('《','').replace('》','');
            this.radiotype=arr[0];
            this.tb=0;
            this.lbDialogVisible=false;
            this.addDialogVisible=true;
          }else{
            this.$message.error("请选择类别！");return;
          }
        },
        addfatherMethod(t,m){
         
          if(m==1){
              this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          }else{
             this.addDialogVisible=false;
             this.getList(this.CurrentPage, this.pageSize, this.pd);
           }
        },
        handleClose(done){
          this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        },
        pageSizeChange(val) {
          this.pageSize=val;
          this.getList(this.CurrentPage, val, this.pd);
        },
        handleCurrentChange(val) {
          this.CurrentPage=val;
          this.getList(val, this.pageSize, this.pd);
        },
        yhChange(val){
             this.mselect=val;
             if(this.mselect.length>0){
                 this.bnt=false;
             }else{
                 this.bnt=true;
             }
        },
        clickRow(row){
           this.$refs.multipleTable.toggleRowSelection(row)
        },
        getDR(){
            this.drDialogVisible=true;
        },
        fatherMethod(data,t){
            this.drDialogVisible=false;
        },
        ckfatherMethod(t,data){
           this.ckDialogVisible=false;
        },
         //法院领导
         getFYName(callback){
        
        if(callback && this.fyrdata.length==0){
           let p={
             
             'personName':'',
           };
          this.$api.post(this.Global.aport1+'/courtPerson/getCourtLeader',p,
              r =>{
                  if(r.code==1){
                     this.fyrload=r.data;
                     this.fyrquery();
                  }
              });
              }
      },
    fyrquery(){
         if(this.fyrload.length>this.jznum){
            this.fyrdata=this.fyrload.slice(0,this.jznum);
           }else{
            this.fyrdata=this.fyrload;
         }
      },
       //法院领导远程搜索
     fyrdwremoteMethod(quer){
            if (quer !== ''|| this.fyrdata.length<=0) {
              var arr = this.fyrload.filter(item=>{
                return item.fullName.indexOf(quer) + 1
              });
              this.tempload=arr;
              if(arr.length>this.jznum){
                this.fyrdata=arr.slice(0,this.jznum);
              }else{
                this.fyrdata=arr;
              }
            }else{
              this.tempload=[];
              this.fyrquery();
            }
          },
      //法院领导加载
      fyrloadmore() {
        var srr= this.fyrload;
        if(this.tempload.length>0){
          srr= this.tempload;
        } 
        this.formData.pageIndex++;
        let num = this.formData.pageIndex * this.formData.pageSize;
          this.fyrdata = srr.filter((item, index, arr) => {
            return index < num;
          });
      },

     },
}
</script>