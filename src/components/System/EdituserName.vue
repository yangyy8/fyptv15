<template>
     <div class="pairadd subtable">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 系统管理 <span class="mlr_10">/</span>  <b>修改密码</b></span> </div>
          <div class="content">
             <div class="pborder" style="text-align:center">
                   <div class="ptitle mb-20" style="text-align:center">修改账号</div>
                   <div style="width:500px; margin:0 auto;line-height:50px">
                       <el-row>
                           <el-col :span="24">
                           <span class="yy-input-text txtr">新的账号：</span>
                           <el-input placeholder="请输入" size="small" clearable v-model="pd.account"   class="yy-input-input" ></el-input>
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
        }
    },
    mounted(){},
    methods:{
        save(){
            if(this.pd.account==undefined || this.pd.account==""){
                this.$message.error("账号不能为空！");return;
            }       
            this.msg='';    
                let p = {
                    'account':this.pd.account
                };
            this.$api.post(this.Global.aport1+'/user/changeUser',p,
            r=>{
                      if(r.code==1){
                          this.$confirm('账号修改成功，请重新登录!', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                this.$store.commit('getUid',this.pd.account)
                                this.$router.push({path:'/'});
                            }).catch(() => {
                                this.$message({
                                type: 'info',
                                message: '已取消删除'
                                });
                            });

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