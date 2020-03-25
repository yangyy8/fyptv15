<template>
    <div class="openmain">
      
        <el-row>
             <el-col :span="24" class="input-item" v-if='type=="0"'>
               <span class="yy-input-text trt"><font class="red">*</font> 审核结果：</span>
               <div class="yy-input-input tlt">
                <el-radio v-model="isCheckResult" label="0179000001">通过</el-radio>
                <el-radio v-model="isCheckResult" label="0179000002">不通过</el-radio>
                </div>
             </el-col>
             <el-col :span="24">
                  <div class="yy-input-text trt topt" style="width:15%;"> 
                      <span  v-if='type=="0"'>审核意见</span>
                      <span v-else>回收意见</span>
                          ：</div>
                  
                 <el-input placeholder="请输入内容" type="textarea"  :autosize="{ minRows:4, maxRows: 4}" size="small" clearable v-model="checkContents"  class="yy-input-input" ></el-input>
             </el-col>

        </el-row>
            
       
         <div slot="footer" style="text-align:center;border-top:1px solid #cccccc; margin-top:10px; padding-top:10px;">
              <el-button type="success"  size="small" @click="submit">保 存</el-button> 
              <el-button  size="small" @click="submit(0)">取 消</el-button>           
        </div> 
    </div>
</template>
<script>

export default {
    name:'EXAMINE',
    props:['url','data','type','random'],
    data()
    {
        return{
              isCheckResult:'',
              checkContents:'',
              
          }
    },
    mounted(){this.getinit();},
      watch:{
      random:function(newVal,oldVal){
          this.checkContents="";
          this.isCheckResult="";
         this.getinit();
      },
    },
    methods:{
        getinit(){

        },
        submit(t){
            if(t==0){
                      this.$emit('SHfatherMethod','99',this.type); return;
            }
          if(this.type=='0'){
             if(this.isCheckResult==""){
                 this.$message.error("审核结果不能为空！");return;
             }
             if(this.isCheckResult=="0179000001" && this.checkContents==""){
                 this.$message.error("通过后审核意见不能为空！");return;
             }
            }else{
                 if(this.checkContents==""){
                 this.$message.error("回收意见不能为空！");return;
             }
            }
             let p={};
             if(this.type=='0'){
                  p={
                    'contentPublicList':this.data,
                    'isCheckResult':this.isCheckResult,
                    'checkContents':this.checkContents,
                    'isCheck':'0175000001',
                    'checkStatus':'0176000002',
                  };
             }else{
                    p={
                    'contentPublicList':this.data,
                    'checkContents':this.checkContents,
                   };
             }
            this.$api.post(this.Global.aport2+this.url,p,
                r =>{
                    if(r.code==1){
                        this.$message.success(r.message);
                        this.$emit('SHfatherMethod','99',this.type); return;
                    }else{
                        this.$message.error(r.message);
                }
           });
      
        },
    },
}
</script>
<style scoped>
.openmain{text-align: center; line-height: 50px;}
.openmain .title{font-size: 18px; color: #333333;}
</style>