<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 联络工作 <span class="mlr_10">/</span>  <b>联络工作信息</b></span> </div>
         <div class="content">
               <div class="ptitle  mb-20">联络工作信息</div>
               <div class="pborder">
                   <el-row class="ah-50">
                        <el-col :span="24">
                           <span class="yy-input-text" style="width:6.8%">标题</span>
                           <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="form.theme"  class="yy-input-input" style="width:90%!important;" ></el-input>
                       </el-col>
                        <el-col :span="24">
                           <span class="yy-input-text" style="width:6.8%">文件类型</span>
                        <el-select v-model="form.workRelFileType" :disabled="ck" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input"  style="width:20%!important;">
                               <el-option
                                 v-for="(item,ind) in $store.state.zzxgwjlx"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                       </el-col>
                        <el-col :span="24" class="input-item">
                           <span class="yy-input-text" style="width:7.1%">上传文件</span>
                           <div class="yy-input-input">
                               <el-button type="primary" :disabled="ck" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="upload()">上传文件</el-button> <span class="ts"></span>
                           </div>
                       </el-col>
                        <el-col :span="24" class="mb-20" v-if="fileList && fileList.length>0">
                            <el-table
                              :data="fileList">
                              <el-table-column
                                  type="index"
                                  label="序号" width="80">
                              </el-table-column>
                              <el-table-column
                                  prop="filename"
                                  label="文件名称">
                              </el-table-column>
                              <el-table-column
                                  prop="filesuffix"
                                  label="文件类型">
                              </el-table-column>
                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <!-- <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button> -->
                                      <el-button type="text" :disabled="ck"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="delfile(scope.row,fileList)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>

                       <el-col :span="6" v-if='lrshow'>
                           <span class="yy-input-text">录入单位</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryUnit"  :disabled="true"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6" v-if='lrshow'>
                           <span class="yy-input-text">录入部门</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryDepartment"  :disabled="true"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6" v-if='lrshow'>
                           <span class="yy-input-text">录入人</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryPerson"  :disabled="true" class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6" v-if='lrshow'>
                           <span class="yy-input-text">录入时间</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryTime"  :disabled="true" class="yy-input-input" ></el-input>
                        </el-col>
                    </el-row>
                </div>

            <div class="footer">
            <el-button type="primary"  style="width:130px;" @click="submit" v-if="!ck">保 存</el-button>
             <el-button style="width:130px;" @click="goto()">关 闭</el-button> 
            </div>
            <br/>
         </div>
  <el-dialog title="上传文件" :visible.sync="uploadDialogVisible"  width="640px">
   <UPLOAD :url="uurl" :type="11" :urlErr="urlErr" @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
  </el-dialog>
 
  

    </div>
</template>
<script scoped>
import UPLOAD from "../../Common/upload"
import {getServerDate} from '@/assets/js/date.js'
export default {
    components:{UPLOAD},
    data(){
        return{
            form:{},
            uurl:'/WorkRelFilesController/uploadFile',
            urlErr:'',
            uploadDialogVisible:false,
            fileList:[],
            state:'',
            workRelFilesId:'',
            lrshow:false,
            ck:false,

        };
    },
    watch:{
       $route:function(val){
           this.getinit(val);
           
       }
    },
    mounted()
    {
        this.$store.dispatch("getZzxgwjlx");
        this.getinit(this.$route);
    
    },
     activated(){
       
    },
    methods:{
       getinit(val){
        //  this.form.lrdw=this.$store.state.orgname;
        //  this.form.lrbm=this.$store.state.bmname;
        //  this.form.lrr=this.$store.state.uname;
        //  this.form.lrsj=getServerDate();
         this.state=val.query.state;
         this.workRelFilesId=val.query.workRelFilesId;
         console.log(this.state);
         
         if(this.state=='9'){
             this.ck=true;
         }else{
             
             this.ck=false;
         }
         if(this.state!='0' &&  this.state!=undefined && (this.workRelFilesId!=null || this.workRelFilesId!=undefined || this.workRelFilesId!='')){
           
            this.lrshow=true;
              let p={
                  'workRelFilesId':this.workRelFilesId,
            };
             this.$api.post(this.Global.aport2+'/WorkRelFilesController/getWorkRelFilesInfo',p,
                r =>{
                     if(r.code==1){
                         this.form=r.data;
                         this.fileList=[];
                         this.fileList.push(r.data.workFile);
                     }
                });
         }
         

       },
       goto(){
        this.$router.push({name:'WorkList'})
       },
        delfile(n,filedata){
           
            let p={
                  'focusCaseRelFileId':n.workRelFilesId,
                  'token':this.$store.state.token,
            };
             this.$api.post(this.Global.aport2+'/WorkRelFilesController/uploadFile',p,
                r =>{

                     var arr=[];
                     arr.push(n);
                    for (let i = 0; i < arr.length; i++) {
                     var index = filedata.findIndex(item =>{
　　　　　　　　　  　 if(item.workRelFilesId==arr[i].workRelFilesId){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　　　　　　filedata.splice(index,1)
                    }

                     
                });
        },
       fatherMethod(data,type){
         
            // if(this.fileList && this.fileList.length>0){
            //   var arr=data;
            //  for (let i = 0; i < arr.length; i++) {
            //    this.fileList=arr[i];
               
            //   }
            // }else{
               this.fileList=data;
            // }
                 
                 if(this.fileList.length>0 && (this.form.theme==null || this.form.theme=='')){
                 
                 this.form.theme=this.fileList[0].filename
                 }
                 
            this.uploadDialogVisible=false;
       },
       submit(){
            this.form.fileList=this.fileList;
             this.$api.post(this.Global.aport2+'/WorkRelFilesController/saveWorkRelFiles',this.form,
                r =>{
                      if(r.code==1){
                          this.$message({
                              "type":"success",
                              "message":r.message
                          });
                         this.$router.push({name:"WorkList"});
                      }else{
                          this.$message.error(r.message);
                      }
                });
       },
       upload(){
           this.uploadDialogVisible=true;
       },
      
    }
            
}
</script>
