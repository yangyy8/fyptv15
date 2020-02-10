<template lang="html">
  <div class="home"  id="box1">
     <div class="hometop">
      <div class="homelogo ba"> <img src="../assets/img/index/banner.png">
      <span class="toprc">

            <el-dropdown  trigger="click" @command="handleCommand">
                    <span class="cursor">     <i class="el-icon-user-solid"></i> 
                    {{name}}  (<span style="font-size:12px;"> {{orgname}} <span v-if='zwname!="null"'> ，{{zwname}}</span></span>)</span>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="b">修改账号</el-dropdown-item>
                    <el-dropdown-item command="a">修改密码</el-dropdown-item>
                    <el-dropdown-item command="c">快捷菜单</el-dropdown-item>
                    <el-dropdown-item command="d">权限切换</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> 

       <span @click="loginout" class="cursor ml-20">
         <i class="iconfont el-icon-yy-tuichu" ></i> 退出 </span> </span></div>
       <!-- <div class="homenav ba">
         <ul>
           <li class="line active">首页</li>
           <li class="line"><i class="el-icon-document"></i> 基本信息库</li>
           <li class="line"><i class="el-icon-cold-drink"></i> 联络工作</li>
           <li class="line"><i class="el-icon-edit-outline"></i> 办理工作</li>
           <li class="line"><i class="el-icon-s-data"></i> 统计信息</li>
           <li><i class="el-icon-view"></i> 监控和预警</li>
         </ul>
       </div> -->
    <div class="homenav ba">
        <el-menu
        router
        mode="horizontal"
        background-color="#1F426C"
        text-color="#ffffff"
        active-text-color="#ffffff"
        :default-active="activeIndex"
        @select="handleSelect"
       >
      <NavMenu :navMenus="menuData"></NavMenu>
    </el-menu>
     </div>
    <div class="homemain ba">
        <!-- <keep-alive>
            <router-view></router-view>
        </keep-alive> -->

        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

    </div>
</div>
  </div>
</template>

<script>
import NavMenu from "./Common/NavMenu.vue";
export default {
 components: {
    NavMenu: NavMenu
  },
  data() {
    return {
      activeIndex: 'indexs',
      menuData: this.menu.menu,
      name:this.$store.state.uname,
      orgname:this.$store.state.orgname,
      zwname:this.$store.state.zwname
    };
  },
  mounted(){
    //console.log(this.$route.path);
    this.getMenu();
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
         }else if(command=='d'){
           this.$router.push({name:'AuthoritySwith'});
         }
      },
    getMenu(){
      this.$api.get(this.Global.aport1+'/menu/getMenu', null,
                r => {
                  console.log(r);
                  this.menuData=r.data;
               });
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
   handleSelect(key, keyPath) {
   
   this.$router.push({
        path: key,
        params: {data: 'query' }
      })
}
  }
}
</script>
<style scoped>
.toprc{text-align: right;float:right;margin-right: 20px;color: #000000;padding-top:20px;}
.homenav ul{height: 50px;box-sizing: border-box}
</style>
<style>
/* 水平样式 */
 .home .el-menu--horizontal>div>.el-submenu {
    float: left;
}

/* 一级菜单的样式 */
.home .el-menu--horizontal>div>.el-menu-item {
    float: left;
    height: 50px;
    line-height: 45px;
    margin: 0;
    border-right: 1px solid #2C6099;
    color: #ffffff;
    /* background-color: #2C6099!important; */
}
.home .el-menu--horizontal>div>.el-menu-item:hover  {
    background-color: #2C6099!important;
}
.home .el-menu-item.is-active{
  background-color: #2C6099!important;
}

/* 解决下图1 下拉三角图标 */
.home .el-menu--horizontal>div>.el-submenu .el-submenu__icon-arrow {
    position: static;
    vertical-align: middle;
    margin-left: 8px;
    margin-top: -3px;
}
/* 解决下图2 无下拉菜单时 不对齐问题 */
.home .el-menu--horizontal>div>.el-submenu .el-submenu__title {
    height: 50px;
    line-height: 45px;
    border-right: 1px solid #2C6099;
    color: #FFFFFF;
}
.home .el-menu--horizontal>div>.el-submenu .el-submenu__title:hover {
    background-color: #2C6099!important;
}
.home .el-menu--horizontal>div>.el-submenu:hover {
    background-color: #2C6099!important;
}
.home .el-submenu__title i {
    color: #ffffff!important;
}
.ifClass ul li{
  width: -moz-calc(16.6% - 30px);
  width: -webkit-calc(16.6% - 30px);
  width: calc(16.6% - 30px);
}
.navMenu{font-size:0;}
.el-menu.el-menu--horizontal{
  border:none;
}

</style>

