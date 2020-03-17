<template>
     <div class="pairadd subtable">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 系统管理 <span class="mlr_10">/</span>  <b>修改密码</b></span> </div>
          <div class="content">
             <div class="pborder" style="text-align:center">
                   <div class="ptitle mb-20" style="text-align:center">修改密码</div>
                   <div style="width:550px; margin:0 auto;line-height:50px">
                       <el-row>
                           <el-col :span="24">
                           <span class="yy-input-text txtr">旧密码：</span>
                           <el-input placeholder="请输入旧密码" size="small" clearable v-model="pd.oldPassword" show-password  class="yy-input-input" ></el-input>
                          </el-col>
                           <el-col :span="24">
                           <span class="yy-input-text txtr">新密码：</span>
                           <el-input placeholder="请输入新密码" size="small" clearable v-model="pd.password"  show-password class="yy-input-input" ></el-input>
                          </el-col>
                           <el-col :span="24">
                           <span class="yy-input-text txtr">确认密码：</span>
                           
                           <el-input placeholder="请输入确认密码" size="small" clearable v-model="pd.confirmPwd" show-password  class="yy-input-input" ></el-input>

                          </el-col>
                           <el-col :span="24">
                            <div style="font-size:12px;color:red;padding-left:34%; text-align:left;line-height:20px;">长度不能小于10位，<br/>密码必须由英文字母、数字、特殊符号中两者或两者以上组合构成.</div>
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
            if(this.pd.oldPassword==undefined || this.pd.oldPassword==""){
                this.$message.error("旧密码不能为空！");return;
            }
            if(this.pd.password==undefined || this.pd.password==""){
                this.$message.error("新密码不能为空！");return;
            }
            if(this.pd.confirmPwd==undefined || this.pd.confirmPwd==""){
                this.$message.error("确认密码不能为空！");return;
            }
             if(this.pd.confirmPwd!=this.pd.password){
                this.$message.error("新密码跟确认密码不一致，请重新输入！");return;
            }
            this.msg="";         
            this.$api.post(this.Global.aport1+'/user/changePwd',this.pd,
            r=>{
                      if(r.code==1){
                       
                      this.$confirm('密码修改成功，请重新登录!', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
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