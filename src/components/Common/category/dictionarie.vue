<template>
    <div>
      
                <el-row class="ah-40">
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 名称：</span>
                        <el-input placeholder="请输入内容" size="small"  clearable v-model="form.DicName"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 简称：</span>
                        <el-input placeholder="请输入内容" size="small" clearable v-model="form.ShortName"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 曾用名：</span>
                        <el-input placeholder="请输入内容" size="small"  clearable v-model="form.UsedName"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 上级编码：</span>
                        <el-select v-model="form.DicParentCode"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in sjbmlist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 排序：</span>
                        <el-input placeholder="请输入内容" size="small" clearable v-model="form.DicSort"  class="yy-input-input" ></el-input>
                    </el-col>
                      
                </el-row>
            <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:20px">
              <el-button type="primary"  size="small" @click="addsave()">保 存</el-button>
              <el-button @click="addsave(0)" size="small">取 消</el-button>
            </div>
    </div>
</template>
<script>
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
              this.form.tableName="";
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
                this.$emit('dicfatherMethod','99'); 
            }
        }

    },

}
</script>