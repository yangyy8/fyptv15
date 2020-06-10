<template>
  <div class="authwidth">
   
      <div class="top topba"> <img style="margin-top:16px;" src="../../assets/img/index/banner.png"/></div>
      <div class="homemain ba" >
     <div class="pairadd subtable">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 系统管理 
              <span class="mlr_10">/</span>  <b>权限切换</b></span> </div>
          <div class="content">
             <div class="pborder" style="text-align:center">
                   <div class="ptitle mb-20" style="text-align:center">权限切换</div>
                   <div style="width:500px; margin:0 auto;line-height:50px;">
                       <el-row>
                           <el-col :span="24" >
                               <span v-for="(t,ind) in zwdw" :key='ind'>
                              <el-radio v-model="radio" :label="t.orgId">{{t.orgName}} &nbsp;&nbsp;
                                  </el-radio></span>
                          </el-col>                          
                       </el-row>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click="save">提 交 </el-button>
                    <!-- <el-button @click="reset" size="small">重 置</el-button> -->
                    </div>
             </div>
              <div style="font-size:23px;color:red;font-weight:bold;line-height:50px;">{{msg}}</div>
                   </div>
          </div>
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
            radio:'',
            zwdw:[],
        }
    },
    mounted(){
         this.setDw();
    },
    
    methods:{
        save(){
            var ff=new FormData();
            ff.append("userId",this.$store.state.personid);
            ff.append("orgId",this.radio);
            let p=ff;
            this.$api.post(this.Global.aport4+'/user/setDefaultOrg',p,
            r=>{
                      if(r.code==1){
                        this.$store.commit('getOrgname',r.data.ssdw.mc)
                        this.$store.commit('getOrgid',r.data.ssdw.dm)
                        this.$store.commit('getToken',r.data.token)
                        this.$store.commit('getUname',r.data.mc)
                        this.$message.success("设置成功！");
                        this.$router.push({name:"Index"});
                      }else{
                          this.msg=r.message;
                      }
            });
        },
        setDw(){ 
            var ff=new FormData();
            ff.append("userId",this.$store.state.personid);
            let p=ff;
             this.$api.post(this.Global.aport4+'/user/getUserOrgs',p,
            r=>{
                      if(r.code==1 && r.data && r.data.length>0){
                         this.zwdw=r.data;
                         if(r.data.length>0){
                             var array=r.data;
                            for (let i = 0; i < array.length; i++) {
                                 if(array[i].isDefault=='0167000001'){
                                     this.radio=array[i].orgId;
                                 }
                                 
                             }
                         }
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
.authwidth{  overflow: hidden;
  text-align: left;}
.top {
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #cccccc;
}
</style>