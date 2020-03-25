<template>
    <div class="openmain">
        <div class="title">
            请为选择的数据选择所要展示的平台：
        </div>
        <div>
            <el-checkbox v-model="checked1">掌上联络室</el-checkbox>
            <el-checkbox v-model="checked2">外网平台</el-checkbox>
        </div>
         <div slot="footer" style="text-align:center;border-top:1px solid #cccccc; padding-top:10px;">
              <el-button type="success"  size="small" @click="submit">公 开</el-button> 
              <el-button  size="small" @click="submit(0)">取 消</el-button>           
        </div> 
    </div>
</template>
<script>

export default {
    name:'OPEN',
    props:['url','data','type','random'],
    data()
    {
        return{
              checked1:true,
              checked2:true,
          }
    },
    mounted(){
        this.getinit();
    },
     watch:{
      random:function(newVal,oldVal){
         this.getinit();
      },
    },
    methods:{
        getinit(){
           
        },
        submit(t){
            if(t==0){
             this.$emit('GKfatherMethod','99',this.type); return;
            }
             if(!this.checked1 && !this.checked2){
                 this.$message.error('请选择要展示的平台！');return;
             }
             var sdt="";

            if(this.checked1 && this.checked2)
            { 
                sdt="0239000003";
            }else{
                if(!this.checked1 && !this.checked2){
                   sdt="0239000004";
                }else{
                  if(this.checked1){
                   sdt="0239000001";
                  }else if(this.checked2){
                    sdt="0239000002";
                  }
                }
            }

             let p={
                 'contentPublicList':this.data,
                 'showDistinction':sdt,
                 'isPublic':'0137000001',
                 'publicStatus':'0138000002',
             }
            this.$api.post(this.Global.aport2+this.url,p,
                r =>{
                    if(r.code==1){
                         
                         this.$message.success(r.message);
                        this.$emit('GKfatherMethod','99',this.type); return;
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