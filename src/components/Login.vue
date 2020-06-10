<template lang="html">
  <div class="loginbg">
  
       <div class="login-left"><img src="../assets/img/img_1.png"></div>
       <div class="login-box">
         <div class="logtop"><img src="../assets/img/dtop.png"></div>
         <div class="logintitle"></div>
         <div class="login-item">
        <el-input  placeholder="输入用户名" v-model="user.userName" @keyup.enter.native="keyLogin">
          <i slot="prefix" class="el-input__icon"><img src="../assets/img/logo01.png"></i>
        </el-input>
        </div>
      <div class="login-item"> 
        <el-input
          placeholder="输入密码"
          type="password" v-model="user.password" @keyup.enter.native="keyLogin">
          <i slot="prefix" class="el-input__icon"><img src="../assets/img/logo02.png"></i>
        </el-input>
      </div>
        <div class="login-item2">
         <el-checkbox v-model="jzmm">记住密码</el-checkbox>
         <!-- <a class="login-a">忘记密码</a> -->
         </div>
      <button class="login-btn" @click="login">登录</button>
       
    </div>
 
</div>
</template>
<script>
export default {
    data(){
    return {
      user:{},
      jzmm:false,
      addDialogVisible:false,
      xzdw:[],
    }
  },
  mounted(){
    this.$store.dispatch("getJb");
    if(this.$store.state.uid!=null && this.$store.state.uid!='' && this.$store.state.uid!=undefined){
      this.$set(this.user,'userName',this.$store.state.uid);
    }
    this.initJzmm();

  },
  methods:{
    initJzmm(){
      if(sessionStorage.getItem('jzmm')==1){
        this.jzmm=true;
        this.user={
          userName:sessionStorage.getItem('userName'),
          password:sessionStorage.getItem('password')
        }
   
      }
    },
    isJzmm(){
      if(this.jzmm){
        sessionStorage.setItem('jzmm',1);
        sessionStorage.setItem('userName',this.user.userName);
        sessionStorage.setItem('password',this.user.password);
      }else {
        sessionStorage.clear();
      }
    },
    login(){
      // this.$router.push({name: 'Index'});return;
            this.isJzmm();
            if(this.user.userName=="" || this.user.userName==undefined){
              this.$message.error("请输入用户名！");return;
            }
            if(this.user.password=="" || this.user.password==undefined){
              this.$message.error("请输入密码！");return;
            }
          var ff=new FormData();
          ff.append("userName",this.user.userName);
          ff.append("password",this.user.password);
          let p=ff;
          var url=this.Global.aport4+'/user/doLogin';
          this.$api.post(url,p,
             r => {
              if(r.success){
                
                  
                     if(r.data.pbId!=null){
                            this.$store.commit('getPbid',r.data.pbId)
                      }   
                      if(r.data.personId!=null){
                            this.$store.commit('getPersonid',r.data.personId)
                      }
                     
                     if(!r.data.isDefault){
                     
                        this.$router.push({name: 'AuthoritySwith'});
                     }else{
                         this.$store.commit('getUid',this.user.userName)
                         
                         this.updateInfo(r.data);
                         this.getJID();
                        if(r.data.first){
                          this.$router.push({name: 'EditPwd'});return;
                         }
                         
                         this.$router.push({name: 'Index'});
                     }

                
                  
              }else {
                  this.$message.error(r.message);return;
              }
          })
    },
    updateInfo(r)
    {
                    this.$store.commit('getToken',r.token)
                    this.$store.commit('getUname',r.mc)
                 
                    if(r.ssdw!=null){
                        this.$store.commit('getOrgname',r.ssdw.mc)
                        this.$store.commit('getOrgid',r.ssdw.dm)
                    }else{
                       this.$message.error("该用户没有所属单位！不能进行登录！");return;
                    }
                     if(r.ssbm!=null){
                        this.$store.commit('getBmname',r.ssbm.mc)
                        this.$store.commit('getBmid',r.ssbm.dm)
                      }
                      if(r.zw!=null){
                        this.$store.commit('getZwname',r.zw.mc)
                      }
                    
                      if(r.funids!=null){
                          this.$store.commit('getAuth',r.funids)
                      }
                    
                      this.$store.commit('getPagesize',this.Global.fycount)
                      this.$store.commit('getImgformat',this.Global.imgformat)
                      this.$store.commit('getDocformat',this.Global.docformat);

    },
    getJID(){
   
     if(this.$store.state.jb.length>0){
        this.$store.commit('getJid',this.$store.state.jb[0].dm);
        this.$store.commit('getJmc',this.$store.state.jb[0].mc);
      }
      if(this.$store.state.cb.length>0){
        this.$store.commit('getCid',this.$store.state.cb[0].dm);
      }

       this.$api.post(this.Global.aport3+'/SystemSettingsController/getSystemSettings',null,
                r =>{
                      if(r.code==1){
                      if(r.data.defaultNum!=null && r.data.defaultNum!=''){
                        this.$store.commit('getPagesize',r.data.defaultNum)
                      }
                       if(r.data.picFormList.length>0){
                             var sum='';
                             var array=r.data.picFormList;
                             for (let i = 0; i < array.length; i++) {
                               sum+=array[i].picForm+',';
                             }
                             this.$store.commit('getImgformat',sum.substr(0,sum.length-1));
                      }
                      this.$store.commit('getYxdate',r.data.checkDeadLine)
                    }
                });
    },
    keyLogin(){
     if(this.user.userName&&this.user.password){
        this.login();
     }
   },

   
  },
}
</script>
<style scoped>
.logintop{
  padding: 135px 0px 0px 0; 
}
.loginbg{
  width: 100%;
  height: 100%;
  position: absolute;
  /* z-index: 2001; */
  /* min-height: 1000px; */
  background: url('../assets/img/bg.png');
  background-size: 100% 100%;
  color: #fff;

}
/* position: absolute; */
.logtop{margin-top: 40px;margin-left: -13px;z-index: 9;}
.logintitle{
  width: 440px;
  text-align: center; 
  margin: 5% 0 15px 0;
  background: url('../assets/img/logod.png'); height: 65px;
}
.loginmessage{font-size: 12px; text-align:center;color: #999999; padding-top: 10px;}
.login-item{
  margin-top: 20px;
  width: 300px;
  color: #fff;

}
.login-item2{
  margin-top: 15px;
  width: 300px;
  font-size: 14px;
  display: flex;
  justify-content:space-between;
  align-items: center;
}
.login-btn{
  margin-top: 40px;
  border: none;
  border-radius: 5px;
  background: #2799DF;
  width: 300px;
  min-height: 35px;
  height: 48px;
  cursor:pointer;
  font-size: 16px;
  color: #FFFFFF;
}
.el-input__icon img{
  padding-left: 8px;
  vertical-align: middle;
}
.login-a{
  color: #6d90c0;
  text-decoration: underline;
}

</style>
