<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 联络工作 <span class="mlr_10">/</span>  <b>赠阅法院报</b></span> </div>
         <div class="content">
               <div class="ptitle  mb-20">赠阅法院报</div>
               <div class="pborder">
                   <el-row class="ah-50">
                       <el-col :span="12" class="input-item">
                       <span class="yy-input-text" style="width:16%;"><font class="red">*</font> 赠阅人</span>
                        <el-select v-model="form.pbid" @change="getInfo(form.pbid)" :disabled="ck" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input">
                               <el-option
                                 v-for="(item,ind) in xmdata"
                                 :key="ind"
                                 :label="item.fullName"
                                 :value="item.pbId">
                                 </el-option>
                            </el-select>
                       </el-col>
                       <el-col :span="12" class="input-item">
                           <span style="font-size:14px;">{{contents}}</span>
                       </el-col>
                   </el-row>
                    <el-row class="ah-50">
                      <el-col :span="12" class="input-item">
                       <span class="yy-input-text" style="width:16%;"><font class="red">*</font> 赠阅年度</span>
                        <el-select v-model="form.sendYear" :disabled="ck" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input">
                               <el-option
                                 v-for="(item,ind) in $store.state.dbnf"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.mc">
                                 </el-option>
                            </el-select>
                       </el-col>
                       <el-col :span="12" class="input-item">
                           <span class="yy-input-text"  style="width:16%;"><font class="red">*</font> 邮政编码</span>
                           <el-input placeholder="请输入内容" :disabled="ck" size="small" maxlength="6" clearable v-model="form.postcode"  class="yy-input-input"></el-input>
                       </el-col>
                        <el-col :span="24" class="input-item">
                           <span class="yy-input-text" style="width:8%"><font class="red">*</font> 地址</span>
                           <el-input placeholder="请输入内容" :disabled="ck" size="small" clearable v-model="form.sendAddress"  class="yy-input-input" style="width:80%!important;" ></el-input>
                       </el-col>
                         <el-col :span="12" class="input-item">
                           <span class="yy-input-text"  style="width:16%;"><font class="red">*</font> 订阅时间</span>
                           <el-date-picker
                                v-model="form.subscriptionTime" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="选择日期" class="yy-input-input" :disabled="ck">
                            </el-date-picker> 

                       </el-col>
                        <el-col :span="12" class="input-item">
                       <span class="yy-input-text" style="width:16%;"><font class="red">*</font> 订阅人</span>
                        <el-select v-model="form.courtPersonPBId" :disabled="ck" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input">
                               <el-option
                                 v-for="(item,ind) in fyrdata"
                                 :key="ind"
                                 :label="item.fullName"
                                 :value="item.pbId">
                                 </el-option>
                            </el-select>
                       </el-col>
                        <el-col :span="12"   class="input-item" v-if='lrshow'>
                           <span class="yy-input-text" style="width:16%;">录入单位</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryUnit"  :disabled="true" class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="12"   class="input-item" v-if='lrshow'>
                           <span class="yy-input-text" style="width:16%;">录入部门</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryDepartment"  :disabled="true" class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="12"   class="input-item" v-if='lrshow'>
                           <span class="yy-input-text" style="width:16%;">录入人</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryPerson"  :disabled="true" class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="12"  class="input-item" v-if='lrshow'>
                           <span class="yy-input-text" style="width:16%;">录入时间</span>
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
            state:'',
            sendCourtNewspaperId:'',
            lrshow:false,
            ck:false,
            xmdata:[],
            fyrdata:[],
            contents:'',

        };
    },

    mounted()
    {
        this.$store.dispatch("getDbnf");
        this.getinit(this.$route);
    
    },
     activated(){
        this.getinit(this.$route);
    },
    methods:{
       getinit(val){
      
         //权限start
                //  this.$api.post(this.Global.menuurl,{'menuId':'12212311'},
                //      r =>{
                //           if(r.code==0){
                //             this.$router.push({path:'/limitmsg'});
                //           }
                //   });
          //权限end

         
         this.state=val.query.state;
         this.sendCourtNewspaperId=val.query.sendCourtNewspaperId;
         this.getZYR();
         this.getDYR();
         
         if(this.state=='9'){
             this.ck=true;
         }else{
             
             this.ck=false;
         }
         if(this.state!='0' &&  this.state!=undefined && (this.sendCourtNewspaperId!=null || this.sendCourtNewspaperId!=undefined || this.sendCourtNewspaperID!='')){
           
            this.lrshow=true;
              let p={
                  'sendCourtNewspaperId':this.sendCourtNewspaperId,
            };
             this.$api.post(this.Global.aport2+'/SendCourtNewspaperController/getSendCourtNewspaperInfo',p,
                r =>{
                     if(r.code==1){
                         this.form=r.data;
                        
                     }
                });
         }
         

       },
      
       submit(){
             if(this.form.pbid==undefined || this.form.pbid==null || this.form.pbid==""){
              this.$message.error("赠阅人不能为空！");return;
             }
             if(this.form.sendYear==undefined || this.form.sendYear==null || this.form.sendYear==""){
              this.$message.error("赠阅年度不能为空！");return;
             }
             if(this.form.postcode==undefined || this.form.postcode==null || this.form.postcode==""){
              this.$message.error("邮政编码不能为空！");return;
             }
             if(this.form.sendAddress==undefined || this.form.sendAddress==null || this.form.sendAddress==""){
              this.$message.error("地址不能为空！");return;
             }
            if(this.form.subscriptionTime==undefined || this.form.subscriptionTime==null || this.form.subscriptionTime==""){
              this.$message.error("订阅时间不能为空！");return;
             }
             if(this.form.courtPersonPBId==undefined || this.form.courtPersonPBId==null || this.form.courtPersonPBId==""){
              this.$message.error("订阅人不能为空！");return;
             }
             
            let p={
                'pbid':this.form.pbid,
                'sendYear':this.form.sendYear,
                'courtPersonPBId':this.form.courtPersonPBId
            }

          this.$api.post(this.Global.aport2+'/SendCourtNewspaperController/findSender',p,
                r =>{
                      if(r.code==1){
                        
                        if(r.data && r.data.status && r.data.status=='1'){
                         this.$confirm(r.message, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                 this.saveInfo();
                            }).catch(() => {
                               this.$message.info("已取消");         
                            });
                        }else{
                             this.saveInfo();
                        }
                      }else{
                            this.$message.error(r.message);
                       }
                });

          
             
       },
       saveInfo(){
            this.$api.post(this.Global.aport2+'/SendCourtNewspaperController/saveSendCourtNewspaper',this.form,
                                        r =>{
                                            if(r.code==1){
                                                
                                                this.$message.success(r.message);    
                                                this.$router.push({name:"GiverList"});
                                            }else{
                                                this.$message.error(r.message);
                                            }
                                        });
       },
       //代表委员特约人员
       getZYR(){
          let p={
             'name':''
           };
           this.$api.post(this.Global.aport1+'/baseinfo/personlist',p,
             r =>{
                  
                   this.xmdata=r.data;
            });
       },
       //法院人员
       getDYR(){
           let p={
               
               'personName':'',
             };
            this.$api.post(this.Global.aport1+'/courtPerson/getCourtLeader',p,
                r =>{
                    if(r.code==1){
                      
                          this.fyrdata=r.data;
                      
                    }
                });
       },
       getInfo(val){
            var obj=this.xmdata.find(t=>{
                return t.pbId===val
            }); 
            
            if(obj){
            let p={
                        'pbId':val,
                        'personType':obj.identityType
                    };
                    this.$api.post(this.Global.aport1+'/baseinfo/detail',p,
                        r =>{
                            if(r.code==1){

                                
                                if(r.data){
                                    var objj=r.data;
                                    this.contents=objj.personName+'，'+objj.sexName+'，'+objj.partisanName;
                                
                                    if(objj.mobilePhones && objj.mobilePhones.length>0){
                                        var  phone='';
                                        for (let ii = 0; ii < objj.mobilePhones.length; ii++) {
                                           phone+= objj.mobilePhones[ii];
                                            
                                        }
                                    this.contents+="，"+phone;
                                    }
                                    if(objj.fixedPhone){
                                     this.contents+="，"+objj.fixedPhone;
                                    }
                                    if(objj.jobTypeString){
                                     this.contents+="，"+objj.jobTypeString;
                                    }
                                     if(objj.job){
                                     this.contents+="，"+objj.job;
                                    }
                                    if(objj.address){
                                     this.contents+="，"+objj.address;
                                    }
                                }

                            }
                           


                        });
              }

        },
        goto(){
              this.$router.push({name:'GiverList',query:{}});
        },
            
          
      
    }
            
}
</script>
