<template>

  <div class="indexn">
      <div class="top topba">
          <el-row type="flex">
              <el-col :span="4" style="min-width:383px;">
                  <img style="margin-top:16px;" src="../assets/img/index/banner.png">
              </el-col>
        
              <el-col :span="15">
                        <div class="homenav" style="background: #fff;">
                        <el-menu
                            router
                            mode="horizontal"
                            background-color="#ffffff"
                            text-color="#000000"
                            active-text-color="#000000"
                            :default-active="activeIndex"
                        >
                        <NavMenu :navMenus="menuData"></NavMenu>
                        </el-menu>
                        </div>
              </el-col>
            <el-col :span="5" style="text-align: center;min-width:310px;margin-left:10px;">
            <span class="toprc">
                  <el-dropdown  trigger="click" @command="handleCommand">
                    <span class="cursor homef">  <i class="el-icon-user-solid"></i>  {{name}}
                      (<span style="font-size:12px;"> 
                        <span :title="orgname"> {{orgname.length>10?orgname.substr(0,10)+'...':orgname}}</span>
                        
                        <span v-if='zwname!="null"'> , {{zwname}}</span></span>)</span>
                    <el-dropdown-menu slot="dropdown" style="margin-top:-15px;">
                    <el-dropdown-item  command="b">修改账号</el-dropdown-item>
                    <el-dropdown-item command="a">修改密码</el-dropdown-item>
                    <el-dropdown-item command="c">快捷菜单</el-dropdown-item>
                    <el-dropdown-item command="d">权限切换</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>              
              <span @click="loginout" class="cursor homef"><i class="iconfont el-icon-yy-tuichu" ></i> 退出 </span> 
              </span>
            </el-col>
          </el-row>
      </div>
    
      <div class="center" :class="first?'inba':'inba1'">
          <el-row style="margin-bottom:30px;">
            <el-col :span="24">
            
            <el-row class="height" >
              <el-col :span="show1?((this.show2 || this.show3 || this.show4 || this.show5)?12:24):0" v-if="show1">
                  <div class="baseinfo mr-10" @click="getZX('1100')">
                     <img style="height: 100%" src="../assets/img/newindex/img10.png" alt="基本信息">
                  </div>
              </el-col>
              <el-col :span="(this.show2 || this.show3 || this.show4 || this.show5)?(show1?12:24):0" v-if="this.show2 || this.show3 || this.show4 || this.show5">
                    <el-row v-if="show2 || show3">
                      <el-col :span="(show2 && show3)?12:(show3?0:24)">
                          <div class="llgz  mr-10" @click="getZX('1200')"> 
                            <img  src="../assets/img/newindex/img40.png" v-if='show4 || show5' alt="联络工作">
                           <img  src="../assets/img/newindex/img400.png" v-else alt="联络工作">
                          </div>
                      </el-col>
                      <el-col :span="(show2 && show3)?12:(show2?0:24)">
                           <div class="blgz  mr-10"  @click="getZX('1300')">
                              <img src="../assets/img/newindex/img30.png" v-if='show4 || show5' alt="办理工作">
                              <img src="../assets/img/newindex/img300.png" v-else alt="办理工作">
                          </div>
                      </el-col>
                    </el-row>
                    <el-row :class="(show2 || show3)?'mt-10':''" v-if="show4 || show5 || show6">
                      <el-col :span="getkz(1)">
                          <div class="jkyj  mr-10" @click="getZX('1500')">
                           <img src="../assets/img/newindex/img20.png" v-if='show2 || show3' alt="监控和预警">
                          <img src="../assets/img/newindex/img200.png" v-else alt="监控和预警">
                          </div>
                      </el-col>
                      <el-col :span="getkz(2)">
                          <div class="gzwj  mr-10" @click="getZX('1700')">
                           <img src="../assets/img/newindex/img70.png" v-if='show2 || show3' alt="工作文件">
                          <img src="../assets/img/newindex/img700.png" v-else alt="工作文件">
                          </div>
                      </el-col>
                      <el-col :span="getkz(3)">
                           <div class="tjxx mr-10" @click="getZX('1400')">
                           <img src="../assets/img/newindex/img50.png" v-if='show2 || show3' alt="统计查询">
                            <img src="../assets/img/newindex/img500.png" v-else alt="统计查询">
                          </div>
                      </el-col>
                    </el-row>
                    
              </el-col>
            </el-row>
             
           </el-col>
           <el-col :span="24" class="bjnav" :style="ifShow(first)">
               <div v-for="(item,ind) in menulist" :key="ind" class="zcd" @click="getZX(item.id,item.isEnd,item.url)" :style="getStyle(menulist.length)">
                     <i class="el-icon-chat-line-round" style="font-size:40px;" v-if="item.icon==null || item.icon==''"></i>
                     <i :class="item.icon" style="font-size:40px;" v-else></i>
                     <br/>
                     <span :style="getStyle1(menulist.length)">{{item.alias}}</span>
                </div>

               <div class="zcd"  @click="getback()" :style="getStyle(menulist.length)">
                 <img style="width: 40px;height:39px;margin-bottom: -2px;" src="../assets/img/index/ic_back.png" alt="返回"><br/>
                   <span style="line-height:40px;">返回</span>
                </div>

           </el-col>
        </el-row>

      </div>


        <div class="gfooter" v-if='footshow'>
            <el-row type="flex">
                <el-col :span="4" style="border-right: 1px solid #4B688A;color:#ffffff" v-for="(t,inds) in Shortlist" :key="inds" @click="goto(i.name)">
                  <div @click="getLine(t)"> <i class="el-icon-folder" style="font-size:20px;" v-if="t.icon==null"></i>
                     <i :class="t.icon" style="font-size:22px;" v-else></i>
                      {{t.alias}}</div>
                    </el-col>
            </el-row>
        </div>
        <el-dialog title="选择单位" :visible.sync="addDialogVisible" :close-on-click-modal='false'  width="600px">
       <el-form :model="form">

       <el-row class="ah-40">
         <el-col :span="24">
           <span class="yy-input-text trt" >选择单位：</span>
             <el-select v-model="form.dw"  filterable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                 <el-option
                  v-for="(item,ind) in xzdw"
                  :key="ind"
                  :label="item.orgName"
                  :value="item.orgId">
                </el-option>
              </el-select>
        </el-col>
        </el-row>
      </el-form> 
       <div slot="footer" class="dialog-footer">
              <el-button type="primary"  size="small" @click="addsave()">切 换</el-button>
              <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
        </div>
     </el-dialog>
  </div>
</template>
<script>
// import {getSearh} from '@/assets/js/cc.js'
import NavMenu from "./Common/NavMenu.vue";
export default {
    components: {
    NavMenu: NavMenu
  },
  inject:['reload'],
    data(){
        return{
           activeIndex:'index',
           menuData:[],
           first:true,
           menulist:[],
           Shortlist:[],
           id:[],
           type:null,
           url:null,
           sid:'',
           footshow:true,
           name:this.$store.state.uname,
           orgname:this.$store.state.orgname,
           zwname:this.$store.state.zwname,
           show1:false,//基本信息
           show2:false,//监控
           show3:false,//办理
           show4:false,//联络
           show5:false,//统计
           show6:false,//工作文件
           addDialogVisible:false,
           form:{},
           xzdw:[],
           alldata:['20003901','20003902','20003903','20003904'],
           allshow:[],
          
        }
    },
    mounted(){
    //   getSearh();
     //权限start
            // this.$api.post(this.Global.menuurl,{'menuId':'10002000'},
            //          r =>{
            //                if(r.code==1 && r.data!=null){
            //                 for (let i = 0; i < this.alldata.length; i++) {
            //                     this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                         
            //                 }   
            //               }else if(r.code==0){
            //                 this.$router.push({path:'/limitmsg'});
            //               }
            //  });
      //权限end
     
      
      this.getMenu();
      
      this.getfooter();

    },
    methods:{
        handleCommand(command) {
         
         
         if(command=='a'){
           this.$router.push({name:'EditPwd'});
         }else if(command=='b'){
           this.$router.push({name:'EdituserName'});
         }else if(command=='c'){
           this.$router.push({name:'ShortcutMenu'});
         }
         else if(command=='d'){
          // this.$router.push({name:'AuthoritySwith'});
          this.setDw();
          this.addDialogVisible=true;
         }
      },
       setDw(){
            var ff=new FormData();
            ff.append("userId",this.$store.state.personid);
            let p=ff;
             this.$api.post(this.Global.aport4+'/user/getUserOrgs',p,
            r=>{
                      if(r.code==1){
                         this.xzdw=r.data;
                      }
            });
        },
         addsave(){
         if(this.form.dw=="" || this.form.dw==undefined){
              this.$message.error("请选择单位！");return;
          }

        var ff=new FormData();
          ff.append("userId",this.$store.state.personid);
          ff.append("orgId",this.form.dw);
          let p=ff;
        var url=this.Global.aport4+'/user/setDefaultOrg';
          this.$api.post(url,p,
          r=>{
               if(r.code==1){
                // this.updateInfo(r.data);
                   this.$store.commit('getOrgname',r.data.ssdw.mc)
                   this.$store.commit('getOrgid',r.data.ssdw.dm)
                   this.$store.commit('getToken',r.data.token)
                   this.orgname=this.$store.state.orgname
                   this.addDialogVisible=false;
                  // this.reload();
                   //this.$router.push({name: 'Index'});
                   this.getMenu();
                   this.getfooter();
               }

          })
   },
    getMenu(){
      this.$api.get(this.Global.aport1+'/menu/getMenu', null,
                r => {
                  if(r.code==1){

                    if(r.data && r.data.length>0){
                       this.menuData=r.data;
                        if(this.menuData.length>0){
                          this.show1=false;this.show2=false;this.show3=false;this.show4=false;this.show5=false;this.show6=false
                          var array=this.menuData;
                          for (let i = 0; i < array.length; i++) {
                              var id=array[i].entity.id;
                                if(id=="1100"){this.show1=true;}
                                else if(id=="1200"){this.show2=true;}
                                else if(id=="1300"){this.show3=true;}
                                else if(id=="1500"){this.show4=true;}
                                else if(id=="1400"){this.show5=true;}
                                else if(id=="1700"){this.show6=true;}
                          }
                        }
                   }else{
              
                   this.menuData=[];
                   this.show1=false;
                   this.show2=false;
                   this.show3=false;
                   this.show4=false;
                   this.show5=false;
                   this.show6=false;
                }
                }
           });
    },
    getStyle(list){
      let totalWidth = 1210-list*10;
      let str1 = totalWidth / (list+1) + 'px';
      return "width:"+str1;
    },
      getStyle1(list){
        if(list>10){
          return "line-height:22px";
        }else{
          return "line-height:40px";
        }
      },
    ifShow(boolean){
        if(boolean){
          return "visibility:hidden;"
        }else{
          return "visibility:visible;"
        }
    },
    getZX(n,t,url){
         this.type=t;
         this.url=url;

         if(n=='1100' || 
            n=='1200' || 
            n=='1300' || 
            n=='1400' || 
            n=='1500' ||
            n=='1700'){
            this.id=[];
        }
         this.id.push(n);
         this.id=Array.from(new Set(this.id));

        if(t=='0226000001'){
                this.$router.push({path:url});return;
        }

        let p={
            "menuId":n,

        };
         this.$api.get(this.Global.aport1+'/menu/getSubMenu', p,
                r => {
                  this.menulist=r.data;
                  if(this.menulist.length>0){
                      this.first=false;
                  }else{
                      this.first=true;
                  }

               });
    },
    getback(){
        if(this.id.length==1){
            this.first=true;
        }else{
            var array=this.id;
            var sid=[];
            for (let i = 0; i < array.length-1; i++) {
                sid.push(array[i]);
            }

             this.id=sid;
             let len=this.id[this.id.length-1];

            this.getZX(len,this.type,this.url);
        }
    },
    getLine(t){
      
           
           this.$router.push({path:t.url});
           
    },
    getfooter(){
        this.$api.get(this.Global.aport1+'/menu/getShortcutMenu', null,
                r => {
                if(r.code==1){
                   
                  this.Shortlist=r.data;
                }
         });
    },
    goto(url){
    
       this.$router.push({path:url});
    },
    getkz(t){
 
       if(t==1){
           if(this.show4 && this.show5 && this.show6)
           {
             return 8;
           }else{
               if(!this.show4){
                  return 0;
               }else if( !this.show5 && !this.show6){
                  return  24
               }else{
                 return 12
               }
           }
      }else if(t==2){
           if(this.show4 && this.show5 && this.show6)
           {
           
             return 8;
           }else{
               if(!this.show6){
                  return 0;
               }else if( !this.show5 && !this.show4){
                  return  24
               }else{
                 return 12
               }
           }
      }else if(t==3){
           if(this.show4 && this.show5 && this.show6)
           {
          
             return 8;
           }else{
               if(!this.show5){
                  return 0;
               }else if( !this.show4 && !this.show6){
                  return  24
               }else{
                 return 12
               }
           }
      }
    },
      loginout(){
        var formData = new FormData();
        formData.append("token",this.$store.state.token);
        let p=formData;
        this.$api.post(this.Global.aport4+'/user/logout', p,
          r => {
            if(r.code==1){
              formData.append("token",'');
              this.$router.push({name:'Login'});
            }

          });
      },
      
  },
}
</script>

<style scoped>
.indexn{overflow: hidden;text-align: left;}
.top{height: 80px; line-height: 80px;background-color: #fff;}
.toplines{height: 19px;background:url('../assets/img/lline.png') repeat-x;}
.center{position: absolute;z-index: 999; width: 1220px;left: calc(50% - 610px);margin-left: 0;top:calc(50% - 240px);margin-top: 0}
.gfooter{height: 114px; bottom: 0; position: fixed;z-index: 999; width: 100%;background: #1F426C}
.indexn>.gfooter .el-col-4{height:114px;line-height: 114px;border-right: 1px solid #4B688A;}
.indexn>.gfooter .el-col-4:hover{background: #2b6298}
.gfooter .el-col-4 img{margin-right: 20px;vertical-align: middle;}
.gfooter .el-col-4 span{font-size: 18px;}
.el-submenu [class^=el-icon-]{
  margin-right: 8px;
}
.el-submenu__title{
  padding: 0 7px;
}

</style>
<style>
.indexn .bjnav{background: url('../assets/img/bgnav.png') no-repeat; background-size: 100% 100%;margin-right:10px;}
.indexn .bjline{width: 10px;height: 80px; background: #EDEDED;}
/* 水平样式 */
 .indexn .el-menu--horizontal>div>.el-submenu {
    float: left;

}

.indexn .fk{cursor: pointer;}
.indexn .el-col-4{font-size:18px;text-align: center;cursor: pointer;}
 /* background:url('../assets/img/index/imgb.png') ; margin-right:10px;margin-bottom:10px;*/
.indexn .zcd{ padding:14px 0px 26px 0px; border-right: 10px solid #EDEDED;  height: 80px; cursor: pointer; text-align: center; color: #ffffff; font-size: 20px;float: left;}
.indexn .zcd:hover{background: #2D76B8;border-right: 10px solid #EDEDED;  text-align: center; color: #ffffff; font-size: 20px;float: left;}
@media screen and (min-width: 1440px){
  .inba1 {
    margin: 60px 200px 20px 270px;
  }
}

@media screen and (max-width: 1440px){
  .indexn .el-menu--horizontal > div > .el-submenu .el-submenu__icon-arrow {
  position: static;
  vertical-align: middle;
  margin-left: 8px;
  margin-top: -3px;
  display: none;
   }
   .indexn .el-submenu [class^=el-icon-]{
     margin-right:0px!important;
   }
   .indexn.el-menu-item [class^=el-icon-]{
     margin-right:0px!important;
   }
}

/* 一级菜单的样式 */
.indexn .el-menu--horizontal>div>.el-menu-item {
    float: left;
     height: 80px;
    line-height: 80px;
    margin: 0;
    font-size: 18px;
    /* border-right: 1px solid #2C6099; */
    color: #000000;
    /* background-color: #2C6099!important; */
}
.indexn .el-menu--horizontal>div>.el-menu-item:hover  {
    color: #1F426C!important;
  background-color:#fff!important;
}
.indexn .el-menu-item.is-active{
     border-bottom: 3px solid #4ca7ff!important;
 }

/* 解决下图1 下拉三角图标 */
.indexn .el-menu--horizontal>div>.el-submenu .el-submenu__icon-arrow {
    position: static;
    vertical-align: middle;
    margin-left: 8px;
    margin-top: -3px;
}
/* 解决下图2 无下拉菜单时 不对齐问题 */
.indexn .el-menu--horizontal>div>.el-submenu .el-submenu__title {
    height: 80px;
    line-height: 80px;
    /* border-right: 1px solid #2C6099; */
    color: #FFFFFF;
}
.indexn .el-menu--horizontal>div>.el-submenu .el-submenu__title:hover {
    color: #1F426C!important;
     background-color: #FFFFFF!important;
}
.indexn .el-menu--horizontal>div>.el-submenu:hover {
    background-color: #1F426C!important;
     color: #FFFFFF!important;
}
.indexn .el-submenu__title  {
   padding: 0px!important;
}
.indexn .el-submenu__title i {
    color: #1F426C;
}
.el-menu-item i{
  color: #6aa7e8;
}
.el-submenu__title i{
  color: #6aa7e8;
}
:focus {
  outline:0;
}
.indexn .center .height{
  height: 397px;margin-bottom: 15px;
  width: 100%;
}

.indexn .center .baseinfo{
  background: url('../assets/img/newindex/img1.png') no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  cursor: pointer;
}
.indexn .center .jkyj{
  background: url('../assets/img/newindex/img2.png') no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  cursor: pointer;
}
.indexn .center .gzwj{
  background:#48cdde;
  text-align: center;
  cursor: pointer;
}
.indexn .center .blgz{
  background: url('../assets/img/newindex/img3.png') no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  cursor: pointer;
}
.indexn .center .llgz{
  background: #FFC81D;
  text-align: center;
  cursor: pointer;
}
.indexn .center .tjxx{
  background: #30B5D6;
  text-align: center;
  cursor: pointer;
}




</style>
