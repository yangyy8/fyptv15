<template>
    <div>
      
                <el-row class="ah-40">
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 名称：</span>
                        <el-input placeholder="请输入内容" size="small"  clearable v-model="form.dicName"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 简称：</span>
                        <el-input placeholder="请输入内容" size="small" clearable v-model="form.shortName"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">&ensp;</font> 曾用名：</span>
                        <el-input placeholder="请输入内容" size="small"  clearable v-model="form.usedName"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">&ensp;</font> 上级编码：</span>
                        <el-select v-model="form.dicParentCode"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in sjbmlist"
                                 :key="ind"
                                 :label="item.dicName"
                                 :value="item.dicId">
                                 </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">&ensp;</font> 排序：</span>
                        <el-input placeholder="请输入内容" size="small" clearable v-model="form.dicSort"  class="yy-input-input" ></el-input>
                    </el-col>
                      
                </el-row>
            <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:20px">
              <el-button type="primary"  size="small" @click="addsave()">保 存</el-button>
              <el-button @click="addsave(0)" size="small">取 消</el-button>
            </div>
    </div>
</template>
<script>
import {getTableName} from '@/assets/js/ToArray.js'
export default {
     name:'DIC',
     props:['data','type','random'],
    data(){
        return{
            form:{},
            sjbmlist:[],
          
        }
    },
   mounted()
    {
        this.getinit();
    },
    watch:{
      type:function(newVal,oldVal){
         this.form={},
         this.getinit();
      },
    },
    methods:{
        getinit(){
          this.getBM();
        },
       
        getBM(){
          
            
              this.form.tableName=getTableName(this.data.tablename);
              this.$api.post(this.Global.aport2+'/dic/getDics',this.form,
                r =>{
                    if(r.code==1){
                         this.sjbmlist=r.data;
                    }
                });
        },
        addsave(t){
            if(t==0){
              this.$emit('dicfatherMethod','99'); 
            }else{

              if(this.form.dicName==null || this.form.dicName=='' || this.form.dicName==undefined){
                  this.$message.error("名称不能为空!");return;
              }
              if(this.form.shortName==null || this.form.shortName=='' || this.form.shortName==undefined){
                  this.$message.error("简称不能为空!");return;
              }

               this.$api.post(this.Global.aport2+'/dic/saveDic',this.form,
                r =>{
                    if(r.code==1){
                         this.$message.success("保存成功");
                         this.$emit('dicfatherMethod','99'); 
                    }else{
                        this.$message.error(r.message);
                    }
                });
            }
        }

    },

}
</script>