<template>
    <div class="">
         <el-row class="ah-40" :gutter="2">
              <!-- <el-col :sm="24" :md="12" :lg="8"  class="input-item">
               <span class="yy-input-text trt"><font class="red">*</font> 类别：</span>
                <el-select v-model="form.levelType"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                      <el-option
                        v-for="(item,ind) in $store.state.wjlb"
                        :key="ind"
                        :label="item.mc"
                        :value="item.dm">
                      </el-option>
                 </el-select>
             </el-col> -->
              <el-col :sm="24" :md="12" :lg="12"  class="input-item" v-if='this.types!="0299000001"'>
               <span class="yy-input-text" style="width:100px;"><font class="red">*</font> 年度：</span>
               <el-select v-model="form.year"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:76%!important;">
                      <el-option
                        v-for="(item,ind) in yearlist"
                        :key="ind"
                        :label="item.mc"
                        :value="item.dm">
                      </el-option>
                 </el-select>
             </el-col>
              <el-col :sm="24" :md="12" :lg="12"  class="input-item" v-if='this.types=="0299000002" || this.types=="0299000003" || this.types=="0299000004"'>
               <span class="yy-input-text" style="width:100px;"><font class="red">*</font> 期数：</span>
                <el-select v-model="form.period"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:76%!important;">
                      <el-option
                        v-for="(item,ind) in monthlist"
                        :key="ind"
                        :label="item"
                        :value="item">
                      </el-option>
                 </el-select>
             </el-col>
             <el-col :sm="24" :md="24" :lg="24"  class="input-item">
               <span class="yy-input-text" style="width:100px"><font class="red">*</font> 标题：</span>
                  <el-input placeholder="请输入内容" size="small"   clearable v-model="form.theme"  class="yy-input-input" style="width:88%!important"></el-input>
             </el-col>
             <el-col :sm="24" :md="24" :lg="24"  class="input-item">
               <span class="yy-input-text" style="width:100px"><font class="red">*</font>   
                <font v-if='this.types=="0299000009"'>计划内容：</font> 
                <font v-else-if='this.types=="0299000010"'>请示内容：</font> 
                <font v-else-if='this.types=="0299000011"'>报告内容：</font> 
                <font v-else-if='this.types=="0299000012"'>总结内容：</font> 
                <font v-else>全文：</font> 
               </span>
                <vue-ueditor-wrap v-model="form.contents"  :config="myConfig"  class="yy-input-input" style="width:88%!important;line-height:20px;"></vue-ueditor-wrap>
             </el-col>
              </el-row>
            <el-row class="ah-40" :gutter="2" v-if='this.types=="0299000009" || this.types=="0299000010" || this.types=="0299000011" || this.types=="0299000012" || this.types=="029900008"'>
            <el-col :sm="24" :md="12" :lg="12"  class="input-item">
               <span class="yy-input-text" style="width:100px;"><font class="red">*</font> 审批人：</span>
                 <el-select v-model="form.instructLeaderId" remote :remote-method="fyrdwremoteMethod" 
                          v-el-select-loadmore="fyrloadmore" @visible-change="getFYName($event)" @change="getCanle(form.instructLeaderId)"   filterable clearable allow-create default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:70%!important" >
                            <el-option
                              v-for="(item,ind) in fyrdata"
                              :key="ind"
                              :label="item.fullName"
                              :value="item.courtPersonId">
                              </el-option>
                 </el-select>
             </el-col>
              <el-col :sm="24" :md="12" :lg="12"  class="input-item">
               <span class="yy-input-text" style="width:100px;"><font class="red">*</font> 批示时间：</span>
                  <el-date-picker 
                   v-model="form.instructionTime" format="yyyy-MM-dd"
                   type="date" size="small" value-format="yyyy-MM-dd"
                   placeholder="选择日期" class="yy-input-input" style="width:76%!important;">
                 </el-date-picker>
             </el-col>
               <el-col :sm="24" :md="24" :lg="24"  class="input-item">
               <span class="yy-input-text" style="width:100px"><font class="red">&ensp;</font> 领导批示：</span>
                  <el-input placeholder="请输入内容" size="small" type="textarea"  :autosize="{ minRows: 2, maxRows: 3}" clearable v-model="form.instructionContents"  class="yy-input-input" style="width:88%!important"></el-input>
             </el-col>  
        </el-row>
             <div slot="footer" style="text-align:center;border-top:1px solid #cccccc; margin-top:10px; padding-top:10px;">
              <el-button type="success"  size="small" @click="submit">保 存</el-button>
              <el-button  size="small" @click="submit(0)">取 消</el-button>           
        </div> 
    </div>
</template>
<script>
import {birthdayMonth,getYear} from '@/assets/js/date.js'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    components:{VueUeditorWrap},
    name:'DOCADD',
    props:['data','type','lb','random'],
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
            form:{},
            monthlist:birthdayMonth(),
            yearlist:getYear(),
            msg:'',
            types:this.type,
            myConfig: {
              // toolbars: [
              //       [
              //         'undo', //撤销
              //         'bold', //加粗
              //         'indent', //首行缩进
              //         'italic', //斜体
              //         'underline', //下划线
              //         'strikethrough', //删除线
              //         'subscript', //下标
              //         'fontborder', //字符边框
              //         'superscript', //上标
              //         'formatmatch', //格式刷
              //         'fontfamily', //字体
              //         'fontsize', //字号
              //         'justifyleft', //居左对齐
              //         'justifycenter', //居中对齐
              //         'justifyright', //居右对齐
              //         'justifyjustify', //两端对齐
              //         'insertorderedlist', //有序列表
              //         'insertunorderedlist', //无序列表
              //         'lineheight',//行间距
              //       ]
              //   ],
              //   'fontfamily':[
              //     { label:'',name:'songti',val:'宋体,SimSun'},
              //     { label:'仿宋',name:'fangsong',val:'仿宋,FangSong'},
              //     { label:'仿宋_GB2312',name:'fangsong',val:'仿宋_GB2312,FangSong'},
              //     { label:'',name:'kaiti',val:'楷体,楷体_GB2312, SimKai'},
              //     { label:'',name:'yahei',val:'微软雅黑,Microsoft YaHei'},
              //     { label:'',name:'heiti',val:'黑体, SimHei'},
              //     { label:'',name:'lishu',val:'隶书, SimLi'},
              //     { label:'',name:'andaleMono',val:'andale mono'},
              //     { label:'',name:'arial',val:'arial, helvetica,sans-serif'},
              //     { label:'',name:'arialBlack',val:'arial black,avant garde'},
              //     { label:'',name:'comicSansMs',val:'comic sans ms'},
              //     { label:'',name:'impact',val:'impact,chicago'},
              //     { label:'',name:'timesNewRoman',val:'times new roman'}
              //   ],

              　　// 编辑器不自动被内容撑高
              // 　　autoHeightEnabled: false,
              // 　　// 初始容器高度
              // 　　initialFrameHeight: 240,
              // 　　// 初始容器宽度
              // 　　initialFrameWidth: '100%',
              // 　　// 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
              // 　　serverUrl: '/FileUploadController/uploadImageData',
              // 　　// UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
              // 　　UEDITOR_HOME_URL: this.dz
              　　
              　　},
            fyrdata:[],
            fyrload:[],
            tempload:[],
            formData: {   //下拉参数
                pageIndex: 1,
                pageSize: 20
              },
            jznum:100,//下载加载多少条
          
        }
    },
    mounted(){
        // this.$store.dispatch('getWjlb');
        this.$store.dispatch('getDbnf');
        this.myConfig={
           autoHeightEnabled: false,
           initialFrameHeight: 240,
           initialFrameWidth: '100%',
           serverUrl: '/FileUploadController/uploadImageData',
           UEDITOR_HOME_URL: this.Global.ueditordz
        }
        if(this.lb==1 && this.data){
       
         this.getinit();
        }
    },
    
    methods:{
      getinit(){
            let p={
                'workFilesId':this.data.workFilesId
            };
          this.$api.post(this.Global.aport1+'/WorkFilesController/getWorkFilesInfo',p,
              r =>{
                  if(r.code==1){
                    this.types=r.data.workRelFileType;
                    this.form=r.data;
                    if(r.data.instructLeaderId){
                      this.getFYName(true,r.data.instructLeaderId);
                    }
                    this.form.contents=Base64.decode(this.form.contents);
                  }
         });
      },


      submit(t){
      
        if(t==0){
      
          if(this.lb==0){
            //添加
             if(this.form && this.form.theme){
                this.$emit("addfatherMethod",t,1);
             }
            
          }else if(this.lb==1){
             var ff=this.data.theme!=this.form.theme || this.data.contents!=this.form.contents
             
             if(this.types!='0299000001'){
               ff = ff || (this.data.year && this.data.year!=this.form.year);
             }
              if(this.types=="0299000002" || this.types=="0299000003" || this.types=="0299000004"){
               ff = ff || (this.data.period && this.data.period!=this.form.period);
             }
             if(this.types=="0299000009" || this.types=="0299000010" || this.types=="0299000011" || this.types=="0299000012" || this.types=="029900008"){
               ff = ff
               || this.data.instructLeaderId!=this.form.instructLeaderId
               || this.data.instructionTime!=this.form.instructionTime
               || this.data.instructionContents!=this.form.instructionContents
             }
            
            //修改
             if(ff){
                this.$emit("addfatherMethod",t,1);
             }
          }
         this.$emit("addfatherMethod",t,0);
        }else{

           if(this.types!='0299000001' && (this.form.year==null || this.form.year=='' || this.form.year==undefined)){
             this.$message.error("年度不能为空!");return;
           }
           if((this.types=="0299000002" || this.types=="0299000003" || this.types=="0299000004") && (this.form.period==null || this.form.period=='' || this.form.period==undefined))
          {
             this.$message.error("期数不能为空!");return;
          }
          if(this.form.theme==null || this.form.theme=='' || this.form.theme==undefined){
              this.$message.error("标题不能为空!");return;
          }
          if(this.form.contents==null || this.form.contents=='' || this.form.contents==undefined){
             var name='全文';
             if(this.types=="0299000009"){name="计划内容";}
             else if(this.types=="0299000010"){name="请示内容";}
             else if(this.types=="0299000011"){name="报告内容";}
             else if(this.types=="0299000012"){name="总结内容";}

             this.$message.error(name+"不能为空!");return;
          }
          if((this.types=="0299000009" || this.types=="0299000010" || this.types=="0299000011" || this.types=="0299000012" || this.types=="029900008")
          && (this.form.instructLeaderId==null || this.form.instructLeaderId=='' || this.form.instructLeaderId==undefined))
            {
            this.$message.error("审批人不能为空!");return;
            }
          if((this.types=="0299000009" || this.types=="0299000010" || this.types=="0299000011" || this.types=="0299000012" || this.types=="029900008")
          && (this.form.instructionTime==null || this.form.instructionTime=='' || this.form.instructionTime==undefined))
            {
            this.$message.error("批示时间不能为空!");return;
            }
       
          if(this.lb==0){
            this.form.workRelFileType=this.type;
          }
            let p={
                'workRelFileType':this.form.workRelFileType,
                'year':this.form.year,
                'period':this.form.period
            }

          this.$api.post(this.Global.aport2+'/WorkFilesController/findSender',p,
                r =>{
                      if(r.code==1){
                        
                        if(r.data && r.data.status && r.data.status=='1'){
                         this.$confirm(r.message, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                 this.saveInfo(t);
                            }).catch(() => {
                               this.$message.info("已取消");         
                            });
                        }else{
                             this.saveInfo(t);
                        }
                      }else{
                            this.$message.error(r.message);
                       }
                });
        }
      },
      saveInfo(t){
          this.form.contents=Base64.encode(this.form.contents);
          this.$api.post(this.Global.aport2+'/WorkFilesController/saveWorkFiles',this.form,
              r =>{
                  if(r.code==1){
                       this.$message.success("保存成功!");
                       this.$emit("addfatherMethod",t);
                  }else{
                    this.$message.error(r.message);return;
                  }
              });
      },
      getCanle(val){
        if(!val){
               this.fyrquery();  
        }
      },
       //法院领导
        getFYName(callback,val){
        if(callback && this.fyrdata.length==0){
           let p={
             
             'personName':'',
           };
          this.$api.post(this.Global.aport1+'/courtPerson/getCourtLeader',p,
              r =>{
                  if(r.code==1){
                     this.fyrload=r.data;
                     if(val){
                            var arr = this.fyrload.filter(item=>{
                                return item.courtPersonId.indexOf(val) + 1
                              });
                              this.fyrdata=arr;
                     }else{
                     this.fyrquery();
                     }
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