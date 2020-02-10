<template>

  <div class="indexnew1">
      <div class="top topba">
          <el-row type="flex">
              <el-col :span="4" style="margin-right:30px;min-width:383px;">
                  <img style="margin-top:16px;" src="../assets/img/index/banner.png">
              </el-col>
              <!-- <el-col :span="2">  <img src="../assets/img/index.png"></el-col> -->
              <el-col :span="16">
                        <div class="homenav" style="background: #fff">
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
            <el-col :span="5" style="text-align: center; ">
            <span class="toprc">
                  <el-dropdown  trigger="click" @command="handleCommand">
                    <span class="cursor">  <i class="el-icon-user-solid"></i>  {{name}} 
                      (<span style="font-size:12px;"> {{orgname}}<span v-if='zwname!="null"'> ，{{zwname}}</span></span>)</span>
                    <el-dropdown-menu slot="dropdown" style="margin-top:-15px;">
                    <el-dropdown-item  command="b">修改账号</el-dropdown-item>
                    <el-dropdown-item command="a">修改密码</el-dropdown-item>
                    <el-dropdown-item command="c">快捷菜单</el-dropdown-item>
                    <el-dropdown-item command="d">权限切换</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>      
              
              <span @click="loginout" class="cursor ml-20"><i class="iconfont el-icon-yy-tuichu" ></i> 退出 </span> 
              </span>
            </el-col>
          </el-row>
      </div>
      <!-- <div class="toplines ba">
      </div> -->
      <div class="center" :class="first?'inba':'inba1'">
          <el-row style="margin-bottom:30px;">
            <el-col :span="24">
             <!-- <div class="fk" style="min-width:600px; float:left;height: 397px;margin-bottom: 10px;" 
             @click="getZX('c752a6a61b0f11eaabae00155dbaef87')" >
             <img style="height: 100%" src="../assets/img/index/img1.png" alt="基本信息库">
             </div>
             <div style="float:left;margin-left:10px;">
                   <div style="height: 192px;">
                          <span class="fk" style="margin-right:10px;float: left;height: 192px;"
                           @click="getZX('c7529d831b0f11eaabae00155dbaef87')">
                           <img src="../assets/img/index/img2.png" alt="监控预警"></span>
                          <span class="fk" style="float: left;height: 192px;" 
                          @click="getZX('c751d2ef1b0f11eaabae00155dbaef87')">
                          <img src="../assets/img/index/img3.png" alt="办理工作"></span>
                    </div>
                    <div style="margin-top:10px;height: 195px;">
                          <span class="fk" style="margin-right:10px;float: left;height: 195px;" 
                          @click="getZX('c7533b751b0f11eaabae00155dbaef87')">
                          <img src="../assets/img/index/img4.png" alt="联络工作"></span>
                          
                          <span class="fk" style="float: left;height: 195px;" 
                          @click="getZX('c752782a1b0f11eaabae00155dbaef87')">
                          <img src="../assets/img/index/img5.png"  alt="统计信息"></span>
                     </div>
           </div> -->
            <el-row class="height" >
              <el-col :span="show1?((this.show2 || this.show3 || this.show4 || this.show5)?12:24):0" v-if="show1">
                  <div class="baseinfo mr-10" @click="getZX('c752a6a61b0f11eaabae00155dbaef87')">
                     <img style="height: 100%" src="../assets/img/newindex/img10.png" alt="基本信息库">
                  </div>
              </el-col>
              <el-col :span="(this.show2 || this.show3 || this.show4 || this.show5)?(show1?12:24):0" v-if="this.show2 || this.show3 || this.show4 || this.show5">
                    <el-row v-if="show2 || show3">
                      <el-col :span="(show2 && show3)?12:(show3?0:24)">
                          <div class="jkyj  mr-10" @click="getZX('c7529d831b0f11eaabae00155dbaef87')"> 
                            <img  src="../assets/img/newindex/img20.png" v-if='show4 || show5' alt="监控预警">
                           <img  src="../assets/img/newindex/img200.png" v-else alt="监控预警">
                          </div>
                      </el-col>
                      <el-col :span="(show2 && show3)?12:(show2?0:24)">
                           <div class="blgz  mr-10"  @click="getZX('c751d2ef1b0f11eaabae00155dbaef87')">
                              <img src="../assets/img/newindex/img30.png" v-if='show4 || show5' alt="办理工作">
                              <img src="../assets/img/newindex/img300.png" v-else alt="办理工作">
                          </div>
                      </el-col>
                    </el-row>
                    <el-row :class="(show2 || show3)?'mt-10':''" v-if="show4 || show5">
                      <el-col :span="(show4 && show5)?8:(show5?0:24)">
                          <div class="llgz  mr-10" @click="getZX('c7533b751b0f11eaabae00155dbaef87')">
                           <img src="../assets/img/newindex/img40.png" v-if='show2 || show3' alt="联络工作">
                          <img src="../assets/img/newindex/img400.png" v-else alt="联络工作">
                          </div>
                      </el-col>
                      <el-col :span="(show4 && show5)?16:(show4?0:24)">
                           <div class="tjxx mr-10" @click="getZX('c752782a1b0f11eaabae00155dbaef87')">
                           <img src="../assets/img/newindex/img50.png" v-if='show2 || show3' alt="联络工作">
                            <img src="../assets/img/newindex/img500.png" v-else alt="联络工作">
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

       <!-- <canvas id="canvas"></canvas> -->
        <div class="gfooter" v-if='footshow'>
            <el-row type="flex">
                <el-col :span="4" style="border-right: 1px solid #4B688A;" v-for="(t,inds) in Shortlist" :key="inds" @click="goto(i.name)">
                    <i class="el-icon-folder" style="font-size:20px;" v-if="t.icon==null"></i>
                     <i :class="t.icon" style="font-size:22px;" v-else></i>
                      {{t.alias}}
                    </el-col>
                 <!-- <el-col :span="4"><div  @click="goto('/Home/BaseList')"><img src="../assets/img/index/ic_rddbxx.png" alt="人大代表信息"><span>人大代表信息</span></div></el-col>
                <el-col :span="4" ><div @click="goto('/Home/zxBaseList')"><img src="../assets/img/index/ic_zxwyxx.png" alt="政协委员信息"><span>政协委员信息</span></div></el-col>
                <el-col :span="4" ><div @click="goto('/Home/tyBaseList')"><img src="../assets/img/index/ic_tyryxx.png" alt="特约人员信息"><span>特约人员信息</span></div></el-col>
                <el-col :span="4" ><div @click="goto('/Home/CourtPersonnelList')"><img src="../assets/img/index/ic_fylbryxx.png" alt="法院内部人员信息"><span>法院内部<br>人员信息</span></div></el-col>
                <el-col :span="4"><div  @click="goto('/Home/CaseList')"><img src="../assets/img/index/ic_yajy.png" alt="关注案件"><span>关注案件</span></div></el-col> -->
            </el-row>
        </div>
  </div>
</template>
<script>
import {getSearh} from '@/assets/js/cc.js'
import NavMenu from "./Common/NavMenu.vue";
export default {
    components: {
    NavMenu: NavMenu
  },
    data(){
        return{
           activeIndex:'1',
           menuData:this.menu.menu,
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
          
        }
    },
    mounted(){
    //   getSearh();
      this.getMenu();
      this.getfooter();

    },
    methods:{
        handleCommand(command) {
         console.log(command);
         
         if(command=='a'){
           this.$router.push({name:'EditPwd'});
         }else if(command=='b'){
           this.$router.push({name:'EdituserName'});
         }else if(command=='c'){
           this.$router.push({name:'ShortcutMenu'});
         }
         else if(command=='d'){
           this.$router.push({name:'AuthoritySwith'});
         }
      },
    getMenu(){
      this.$api.get(this.Global.aport1+'/menu/getMenu', null,
                r => {
                  this.menuData=r.data;
                  if(this.menuData.length>1){
                    this.show1=false;this.show2=false;this.show3=false;this.show4=false;this.show5=false;
                    var array=this.menuData;
                    for (let i = 0; i < array.length; i++) {
                         var id=array[i].entity.id;
                          if(id=="c752a6a61b0f11eaabae00155dbaef87"){this.show1=true;}
                          else if(id=="c7529d831b0f11eaabae00155dbaef87"){this.show2=true;}
                          else if(id=="c751d2ef1b0f11eaabae00155dbaef87"){this.show3=true;}
                          else if(id=="c7533b751b0f11eaabae00155dbaef87"){this.show4=true;}
                          else if(id=="c752782a1b0f11eaabae00155dbaef87"){this.show5=true;}
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

         if(n=='c752a6a61b0f11eaabae00155dbaef87' || 
            n=='c7529d831b0f11eaabae00155dbaef87' || 
            n=='c7533b751b0f11eaabae00155dbaef87' || 
            n=='c751d2ef1b0f11eaabae00155dbaef87' || 
            n=='c752782a1b0f11eaabae00155dbaef87'){
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
    getfooter(){
        this.$api.get(this.Global.aport1+'/menu/getShortcutMenu', null,
                r => {
                if(r.code==1){
                    console.log(r.data);

                  this.Shortlist=r.data;
                }
         });
    },
    goto(url){
    
       this.$router.push({path:url});
    },
      loginout(){
        var formData = new FormData();
        formData.append("token",this.$store.state.token);
        let p=formData;
        this.$api.post(this.Global.aport4+'/user/logout', p,
          r => {
            if(r.code==1){
              this.$router.push({name:'Login'});
            }

          });
      },
      
  },
}
</script>

<style scoped>
canvas {
  background-color: #F8F8F8;
  display: block;
  margin: 0 auto;height: 780px;width: 100%;
}
.indexnew1{overflow: hidden;text-align: left;min-width: 1800px;}
.top{height: 80px; line-height: 80px;background-color: #fff;}
.toplines{height: 19px;background:url('../assets/img/lline.png') repeat-x;}
.center{position: absolute;z-index: 999; width: 1220px;left: calc(50% - 610px);margin-left: 0;top:calc(50% - 240px);margin-top: 0}
.gfooter{height: 114px; bottom: 0; position: fixed;z-index: 999; width: 100%;background: #1F426C}
.indexnew1>.gfooter .el-col-4{height:114px;line-height: 114px;border-right: 1px solid #4B688A;}
.indexnew1>.gfooter .el-col-4:hover{background: #2b6298}
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
.indexnew1 .bjnav{background: url('../assets/img/bgnav.png') no-repeat; background-size: 100% 100%;margin-right:10px;}
.indexnew1 .bjline{width: 10px;height: 80px; background: #EDEDED;}
/* 水平样式 */
 .indexnew1 .el-menu--horizontal>div>.el-submenu {
    float: left;

}

.indexnew1 .fk{cursor: pointer;}
.indexnew1 .el-col-4{font-size:18px;text-align: center; color:#ffffff;cursor: pointer;}
 /* background:url('../assets/img/index/imgb.png') ; margin-right:10px;margin-bottom:10px;*/
.indexnew1 .zcd{ padding:14px 0px 26px 0px; border-right: 10px solid #EDEDED;  height: 80px; cursor: pointer; text-align: center; color: #ffffff; font-size: 20px;float: left;}
.indexnew1 .zcd:hover{background: #2D76B8;border-right: 10px solid #EDEDED;  text-align: center; color: #ffffff; font-size: 20px;float: left;}
@media screen and (min-width: 1440px){
  .inba1 {
    margin: 60px 200px 20px 270px;
  }
}

/* 一级菜单的样式 */
.indexnew1 .el-menu--horizontal>div>.el-menu-item {
    float: left;
     height: 80px;
    line-height: 80px;
    margin: 0;
    font-size: 18px;
    /* border-right: 1px solid #2C6099; */
    color: #000000;
    /* background-color: #2C6099!important; */
}
.indexnew1 .el-menu--horizontal>div>.el-menu-item:hover  {
    color: #1F426C!important;
  background-color:#fff!important;
}
.indexnew1 .el-menu-item.is-active{
  border-color:#fff!important;
     border-bottom: 4px solid #4ca7ff!important;
     color: #000000!important;
    border-left:none!important;
  width: 10%!important;
  margin-left: 4%!important;
}

/* 解决下图1 下拉三角图标 */
.indexnew1 .el-menu--horizontal>div>.el-submenu .el-submenu__icon-arrow {
    position: static;
    vertical-align: middle;
    margin-left: 8px;
    margin-top: -3px;
}
/* 解决下图2 无下拉菜单时 不对齐问题 */
.indexnew1 .el-menu--horizontal>div>.el-submenu .el-submenu__title {
      height: 80px;
    line-height: 80px;
    /* border-right: 1px solid #2C6099; */
    color: #FFFFFF;
}
.indexnew1 .el-menu--horizontal>div>.el-submenu .el-submenu__title:hover {
    color: #1F426C!important;
     background-color: #FFFFFF!important;
}
.indexnew1 .el-menu--horizontal>div>.el-submenu:hover {
    background-color: #1F426C!important;
     color: #FFFFFF!important;
}
.indexnew1 .el-submenu__title i {
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
.indexnew1 .center .height{
  height: 397px;margin-bottom: 15px;
  width: 100%;
}

.indexnew1 .center .baseinfo{
  background: url('../assets/img/newindex/img1.png') no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  cursor: pointer;
}
.indexnew1 .center .jkyj{
  background: url('../assets/img/newindex/img2.png') no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  cursor: pointer;
}
.indexnew1 .center .blgz{
  background: url('../assets/img/newindex/img3.png') no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  cursor: pointer;
}
.indexnew1 .center .llgz{
  background: #FFC81D;
  text-align: center;
  cursor: pointer;
}
.indexnew1 .center .tjxx{
  background: #30B5D6;
  text-align: center;
  cursor: pointer;
}




</style>
