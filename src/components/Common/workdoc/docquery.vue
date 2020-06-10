<template>
    <div style="max-height:600px;overflow-y: auto">
         <el-row class="ah-30">
              <el-col :span="24">
                 <b v-if='this.types!="0299000001"'> {{pd.year}} 年</b>
                 <b v-if='this.types=="0299000002" || this.types=="0299000003" || this.types=="0299000004"'> {{pd.period}} 期 </b>
                 <b> {{this.data.workRelFileType}}</b>
              </el-col>
              <el-col :span="24" style="font-size:18px;text-align:center"><b>{{pd.theme}}</b></el-col>
            <el-col :span="24" style=" margin:10px 0px;border:1px solid #cccccc;padding:0px 10px;border-radius: 8px; ">
                <div v-html="pd.contents"></div>
            </el-col>
           
         </el-row>
          <el-row class="ah-30" v-if='this.types=="0299000009" || this.types=="0299000010" || this.types=="0299000011" || this.types=="0299000012" || this.types=="029900008"'>
             <el-col :span="12">
                    <b>批示领导 </b>
                    <span class="ml-10">{{pd.instructLeader}}</span>
            </el-col>
             <el-col :span="12">
                    <b >批示时间 </b>
                    <span class="ml-10">{{pd.instructionTime}}</span>
            </el-col>
              <el-col :span="24">
                <b>批示内容</b>
                <div v-html="psnr" style="background:#FBFBFD;padding:5px"></div>
            </el-col>
          </el-row>
    </div>
</template>
<script>
export default {
    name:'DOCQ',
    props:['data','random'],
    data(){
        return{
           pd:{},
           psnr:'',
           types:'',
        }
    },
    mounted(){this.getlist()},
    methods:{
        getlist(){
            let p={
                'workFilesId':this.data.workFilesId
            };
          this.$api.post(this.Global.aport1+'/WorkFilesController/getWorkFilesInfo',p,
              r =>{
                  if(r.code==1){
                    this.pd=r.data;
                    this.types=this.pd.workRelFileType;
                    if(this.pd.instructionContents){
                        this.psnr=this.pd.instructionContents.replace(/\n/g,'<br />');
                    }
                  }
              });
        },
    },
}
</script>
