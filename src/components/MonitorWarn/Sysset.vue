<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 网络监控和报警 <span class="mlr_10">/</span>  <b>系统设定</b></span> </div>
         <div class="content">
              <div class="ptitle mb-20">系统设定</div>
                <div class="pborder ah-50">
                    <el-row>
                        <!-- <el-col :span="24">
                             <span class="yy-input-text">当年届次</span>
                             
                             <el-select v-model="pd.session" filterable clearable default-first-option placeholder="请选择"  size="small"  >
                                <el-option
                                   v-for="(item,ind) in $store.state.jb"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.dm">
                                 </el-option>
                              </el-select>
                              
                               <el-select v-model="pd.time" filterable clearable default-first-option placeholder="请选择"  size="small">
                                 <el-option
                                   v-for="(item,ind) in $store.state.cb"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.dm">
                                 </el-option>
                              </el-select>
                        </el-col>
                        <el-col :span="24">
                             <span class="yy-input-text">当前年</span>
                             <el-select v-model="pd.year" filterable clearable default-first-option placeholder="请选择"  size="small">
                                     <el-option
                                   v-for="(item,ind) in year"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.dm">
                                 </el-option>
                              </el-select> 年
                        </el-col> -->

                         <el-col :span="24">
                             <span class="yy-input-text">默认办结时间</span>
                               <el-input-number v-model="pb.defaultMonth" controls-position="right"  size="small" :min="0" :max="13" ></el-input-number> 月
                               <el-input-number v-model="pb.defaultDay"  controls-position="right" size="small" :min="0" :max="32" ></el-input-number> 日
                         </el-col>

                        <el-col :span="24">
                             <span class="yy-input-text">催办模式</span>  
                              <el-radio v-model="pd.hastenMode" label="0">手动</el-radio>
                              <el-radio v-model="pd.hastenMode" label="1">自动</el-radio>
                        </el-col>
                        <el-col :span="24" class="input-item" v-if="pd.hastenMode=='1'">
                           
                            <span class="yy-input-text">提醒列表</span>
                            <div class="yy-input-input pborder" style="width:80%!important">
                               <el-row>
                                <el-col :span="24">
                               业务类别：
                             <el-select v-model="pr.type" @change="chchange(pr.type)" filterable clearable default-first-option placeholder="请选择"  size="small">
                                <el-option label="关注案件" value="0">
                                 </el-option>
                                  <el-option label="议案建议提案" value="1">
                                 </el-option>
                              </el-select>
                                &nbsp; &nbsp; &nbsp;
                                到期提醒时间：
                                <el-input v-model="pr.days" size="mini" style="width:60px" placeholder=""></el-input>
                                天
                                <el-input v-model="pr.hours" size="mini" style="width:60px" placeholder=""></el-input>
                                时
                                <el-input v-model="pr.minutes" size="mini" style="width:60px" placeholder=""></el-input>
                                分
                                <el-button type="primary" size="small" style="margin-left:25px;" @click="txadd()">添加</el-button>
                               </el-col>
                           </el-row>
                                    <el-table
                                        ref="multipleTable"
                                        :data="txtableData"
                                        width="80%">
                                        
                                        <el-table-column
                                            type="index"
                                            label="序号">
                                        </el-table-column>
                                        <el-table-column
                                            prop="typeName"
                                            label="类型">
                                        </el-table-column>
                                        <el-table-column
                                            label="到期提醒时间">
                                            <template slot-scope="scope">
                                             <div>
                                                 {{scope.row.days}}天 {{scope.row.hours}}时 {{scope.row.minutes}}分
                                             </div>
                                            </template>
                                        </el-table-column>
                                         <el-table-column
                                            label="操作">
                                            <template slot-scope="scope">
                                                <div>
                                                
                                                <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="txdel(scope.row)"></el-button>
                                                </div>
                                            </template>
                                         </el-table-column>
                                    </el-table>
                                </div>
                        </el-col>
                         <el-col class="setstit mt-20 mb-20 setborder">
                            
                        </el-col>
                        <el-col class="setstit">
                            影像资料
                        </el-col>
                        <el-col> <span class="yy-input-text">忽略之前日期</span>
                         <el-date-picker
                           v-model="pd.checkDeadLine" 
                           type="date" size="small"  
                           placeholder="选择日期" format="yyyy-MM-dd">
                        </el-date-picker>
                        </el-col>
                        <el-col>
                             <span class="yy-input-text">最大上传文件数</span>
                              <el-radio v-model="pd.limitUpload" label="0">不限</el-radio>
                              <el-radio v-model="pd.limitUpload" label="1">限制</el-radio>
                        
                        <span v-if="pd.limitUpload=='1'">
                             参数人员  +
                             <el-input-number v-model="pb.maxUploadNum" size="mini" style="width:80px" controls-position="right"  @change="handleChange" :min="1" :max="500"></el-input-number> 件
                        </span>
                        </el-col>
                        <el-col class="setstit">
                            批处理
                        </el-col>
                         <el-col>
                             <span class="yy-input-text">批处理执行时间</span>
                              
                                <el-time-select
                                    v-model="pd.batchTime"
                                    :picker-options="{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '23:59'
                                    }"
                                    placeholder="选择时间">
                                </el-time-select>
               
                        </el-col>
                         <el-col class="input-item">
                            <span class="yy-input-text" style="width:20%;">内外网数据交换压缩文件大小限制</span>
                            <el-input v-model="pd.maxZipSize" placeholder="" size="small" style="width:100px"></el-input> <span style="padding:0px 20px 0px 5px"> 兆</span>
                            <el-input v-model="pd.minute" placeholder="" size="small" style="width:100px"></el-input>  &nbsp;分交换一次
                        </el-col>
                         <el-col class="setstit">
                            关联列表条数设定
                        </el-col>
                        <el-col >
                          <span class="yy-input-text" >条数</span> 
                          <el-input v-model="pd.defaultNum" placeholder="" size="small" style="width:100px"></el-input> <span style="padding:0px 20px 0px 5px"> 条</span>
                        </el-col>
                        <el-col class="setstit">
                            图片格式
                        </el-col>
                           <el-col :span="24" class="input-item">
                            <span class="yy-input-text">图片格式列表</span>
                            <div class="yy-input-input pborder" >
                               <el-row>
                                <el-col :span="24">
                                 格式： <el-input v-model="picForm" size="mini"  placeholder="" class="yy-input-input" style="width:150px!important;"></el-input>
                                <el-button type="primary" size="small" style="margin-left:25px;" @click="imgadd()">添加</el-button>
                                </el-col>
                               </el-row>
                                    <el-table
                                        ref="multipleTable"
                                        :data="imgtableData"
                                        width="80%">
                                        <el-table-column
                                            type="index"
                                            label="序号">
                                        </el-table-column>
                                        <el-table-column
                                            prop="picForm"
                                            label="格式">
                                        </el-table-column>
                                         <el-table-column
                                            label="操作">
                                            <template slot-scope="scope">
                                                <div>
                                                <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="imgdel(scope.row)"></el-button>
                                                </div>
                                            </template>
                                         </el-table-column>
                                    </el-table>
                                </div>
                        </el-col>
                      

                         <el-col class="setstit" v-if='show'>
                            运维人员
                        </el-col>
                         <el-col :span="24" class="input-item" v-if='show'>
                            <span class="yy-input-text">运维列表</span>  
                            <div class="yy-input-input pborder">
                             <el-row>
                                       <el-col :span="20">
                            <el-row  class="lh" :gutter="2">
                                 <el-col :sm="24" :md="12" :lg="12">
                                    <span class="yy-input-text" style="width:30%;text-align: right">外网邮箱：</span>
                                    <el-input placeholder="请输入内容" size="small" clearable v-model="ywform.extranetEmail"  class="yy-input-input" ></el-input>
                                </el-col>
                                 <el-col :sm="24" :md="12" :lg="12">
                                    <span class="yy-input-text" style="width:30%;text-align: right">内网邮箱：</span>
                                    <el-input placeholder="请输入内容" size="small" clearable v-model="ywform.intranetEmail"  class="yy-input-input" ></el-input>
                                </el-col>
                                 <el-col :sm="24" :md="12" :lg="12">
                                    <span class="yy-input-text" style="width:30%;text-align: right">微信账号：</span>
                                    <el-input placeholder="请输入内容" size="small" clearable v-model="ywform.wechatAccount"  class="yy-input-input" ></el-input>
                                </el-col>
                                <el-col :sm="24" :md="12" :lg="12">
                                    <span class="yy-input-text" style="width:30%;text-align: right">手机号码：</span>
                                    <el-input placeholder="请输入内容" size="small" clearable v-model="ywform.phoneNumber"  class="yy-input-input" ></el-input>
                                </el-col>

                            </el-row>
                           </el-col>
                           <el-col :span="4" style="text-align:center;line-height:80px;">
                               <el-button type="success" size="small" style="margin-left:20px;" @click="ywadd()">添加</el-button>
                            </el-col>
                            </el-row>
                            <el-table
                                ref="multipleTable"
                                :data="ywtableData"
                                width="80%">
                                <el-table-column
                                    type="selection"
                                    width="50">
                                </el-table-column>
                                <el-table-column
                                    type="index"
                                    label="序号">
                                </el-table-column>
                                <el-table-column
                                    prop="extranetEmail"
                                    label="外网邮箱">
                                </el-table-column>
                                <el-table-column
                                    prop="intranetEmail"
                                    label="内网邮箱">
                                </el-table-column>
                                <el-table-column
                                    prop="wechatAccount"
                                    label="微信账号">
                                </el-table-column>
                                <el-table-column
                                    prop="phoneNumber"
                                    label="联系电话">
                                </el-table-column>
                                 <el-table-column
                                            label="操作">
                                            <template slot-scope="scope">
                                                <div>
                                                
                                                <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="ywdel(scope.row)"></el-button>
                                                </div>
                                            </template>
                                         </el-table-column>
                            </el-table>
                         </div>
                        </el-col>
                    </el-row>
                </div>
             <div class="footer">
            <el-button type="primary"  style="width:130px;"  @click="SetSave()">保 存</el-button>
            <!-- <el-button style="width:130px;" @click="goto()">取 消</el-button> -->
            </div>
             <br/>
        </div>
    </div>   
</template>
<script scoped>
import {formatDate} from '@/assets/js/date.js'
export default {
    data(){
        return{
            pd:{hastenMode:'0',limitUpload:'0'},
            pb:{maxUploadNum:5,
            defaultMonth:3,defaultDay:10},
            pr:{},
            txtableData:[],
            ywtableData:[],
            bnt:true,
            hastenTime:'',
            year:[],
            ywform:{},
            show:false,
            picForm:'',
            imgtableData:[],

        }
    },
    mounted(){
        this.$store.dispatch('getJb');
        this.$store.dispatch('getCb');
        this.getyear();
        //权限start
                 this.$api.post(this.Global.menuurl,{'menuId':'15082707'},
                     r =>{
                          if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
                  });
        //权限end
        this.getList();
    },
    methods:{
        handleChange(value) {
        console.log(value);
         },
      
        txadd(){
             if(this.pr.type==undefined || this.pr.type==null || this.pr.type=='' ){
                this.$message.error("业务类别不能为空！");return;
            }
            if(this.pr.days==undefined || this.pr.days==null || this.pr.days=='' ){
                this.$message.error("到期天数不能为空！");return;
            }
            if(this.pr.hours==undefined || this.pr.hours==null || this.pr.hours=='' ){
                this.$message.error("到期天数不能为空！");return;
            }
            if(this.pr.minutes==undefined || this.pr.minutes==null || this.pr.minutes=='' ){
                this.$message.error("到期天数不能为空！");return;
            }
             
             this.txtableData.push(this.pr);
             
             
            //  const res = new Map();
            //  var arr=this.txtableData;
            //  this.txtableData=arr.filter((arr) => !res.has(arr.hastenTime) && res.set(arr.hastenTime, 1))
             this.pr={};
        },
        imgadd(){
            if(this.picForm==null || this.picForm==''){
             this.$message.error("图片格式不能为空！");return;
            }
             var obj={};
             obj.picForm=this.picForm;
             console.log(obj,this.imgtableData);
             
             this.imgtableData.push(obj);
         console.log(this.imgtableData);
             const res = new Map();
             var arr=this.imgtableData;
             this.imgtableData=arr.filter((arr) => !res.has(arr.picForm) && res.set(arr.picForm, 1))
             this.picForm='';
        },
        ywadd(){
            if(this.ywform.extranetEmail==undefined || this.ywform.extranetEmail==null || this.ywform.extranetEmail=='' ){
                this.$message.error("外网邮箱不能为空！");return;
            }
            if(this.ywform.phoneNumber==undefined || this.ywform.phoneNumber==null || this.ywform.phoneNumber=='' ){
                this.$message.error("手机号码不能为空！");return;
            }

            this.ywtableData.push(this.ywform);
            const res = new Map();
             var arr=this.ywtableData;

            this.ywtableData=arr.filter((arr) => !res.has(arr.extranetEmail) && res.set(arr.extranetEmail, 1))
           
            this.ywform={};

        },
        ywdel(n){
            var arr=[];
            arr.push(n);
            for (let i = 0; i < arr.length; i++) {
                     var index = this.ywtableData.findIndex(item =>{
　　　　　　　　　  　 if(item.extranetEmail==arr[i].extranetEmail){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　　　　　　this.ywtableData.splice(index,1)
                  }
        },
        chchange(n){
            if(n==0){
                this.pr.typeName="关注案件"
            }else if(n==1){
                 this.pr.typeName="议案建议提案"
            }
            console.log(this.pr.typeName);
            
        },
        txdel(n){
            var arr=[];
            arr.push(n);
            for (let i = 0; i < arr.length; i++) {
                     var index = this.txtableData.findIndex(item =>{
　　　　　　　　　  　 if(item.type==arr[i].type && item.days==arr[i].days && item.hours==arr[i].hours  && item.minutes==arr[i].minutes){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　　　　　　this.txtableData.splice(index,1)
                  }
        },
        imgdel(n){
                var arr=[];
            arr.push(n);
            for (let i = 0; i < arr.length; i++) {
                     var index = this.imgtableData.findIndex(item =>{
　　　　　　　　　  　 if(item.picForm==arr[i].picForm ){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　　　　this.imgtableData.splice(index,1)
                  }
        },
        getyear(){
            var date=new Date();
            var arr=[];
            var array=date.getFullYear();
               for (let i =0; i < 5; i++) {
                    var obj={};
                    obj.dm=parseInt(array)-i;
                    obj.mc=parseInt(array)-i;
                    arr.push(obj);
                }
            this.year=arr;
        },
        SetSave(){
          this.pd.hastenTime=this.txtableData;
          this.pd.opsInfoList=this.ywtableData;
          this.pd.maxUploadNum=this.pb.maxUploadNum.toString();
          this.pd.defaultMonth=this.pb.defaultMonth.toString();
          this.pd.defaultDay=this.pb.defaultDay.toString();
          this.pd.picFormList=this.imgtableData;
          this.pd.checkDeadLine=formatDate(new Date(this.pd.checkDeadLine),'yyyy-MM-dd');
          
          this.$api.post(this.Global.aport3+'/SystemSettingsController/saveSystemSettings',this.pd,
                r =>{
                  
                      if(r.code==1){
                           
                           this.$message.success("设定成功");
                           this.getList();
                         
                      }else{
                           this.$message.error(r.message);return;
                      }
                });
        },
        getList(){
            this.$api.post(this.Global.aport3+'/SystemSettingsController/getSystemSettings',null,
                r =>{
                  
                      if(r.code==1){
                          console.log(r.data);
                          
                          this.pd=r.data;
                          this.txtableData=r.data.hastenTime;
                          this.ywtableData=r.data.opsInfoList;
                          this.imgtableData=r.data.picFormList==null?[]:r.data.picFormList;
                           if(r.data.picFormList.length>0){
                             var sum='';
                             var array=r.data.picFormList;
                             for (let i = 0; i < array.length; i++) {
                               sum+=array[i].picForm+',';
                             }
                             this.$store.commit('getImgformat',sum.substr(0,sum.length-1));
                             this.$store.commit('getPagesize',r.data.defaultNum);
                             this.$store.commit('getYxdate',r.data.checkDeadLine)
                      }
                          
                         
                      }else{
                           this.$message.error(r.message);return;
                      }
                });
        }
    },
}
</script>
<style scoped>
.yy-input-text{width: 10%;}
</style>