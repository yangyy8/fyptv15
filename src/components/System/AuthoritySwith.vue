<template>
     <div class="pairadd subtable">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 系统管理 
              <span class="mlr_10">/</span>  <b>权限切换</b></span> </div>
          <div class="content">
             <div class="pborder" style="text-align:center">
                   <div class="ptitle mb-20" style="text-align:center">权限切换</div>
                   <div style="width:500px; margin:0 auto;line-height:50px;">
                       <el-row>
                           <el-col :span="24">
                              <el-radio v-model="radio" label="1">最高人民法院</el-radio>
                              <el-radio v-model="radio" label="2">河北高级人民法院</el-radio>
                          </el-col>                          
                       </el-row>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click="save">提 交 </el-button>
                    <el-button @click="reset" size="small">重 置</el-button>
                    </div>
                   
             </div>
              <div style="font-size:23px;color:red;font-weight:bold;line-height:50px;">{{msg}}</div>
                   </div>
          </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            pd:{},
            msg:'',
            radio:'1',
        }
    },
    mounted(){},
    methods:{
        save(){
                  
                let p = {
                    'account':this.pd.account
                };
            this.$api.post(this.Global.aport1+'/user/changeUser',p,
            r=>{
                      if(r.code==1){
                         this.msg="修改成功";
                         this.pd={};
                      }else{
                          this.msg=r.message;
                      }
            });
        },
        reset(){
            this.pd={};
        },

    },
}
</script>
<style scoped>
.txtr{text-align: right!important;}
</style>