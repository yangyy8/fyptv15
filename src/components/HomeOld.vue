<template lang="html">
  <div class="home"  id="box1">
     <div class="hometop">
       <div id='nav'>
      <div class="homelogo ba"> <img src="../assets/img/index/banner.png">
      <span class="toprc">

            <el-dropdown  trigger="click" @command="handleCommand">
                    <span class="cursor">     <i class="el-icon-user-solid"></i> 
                    {{name}}  (<span style="font-size:12px;"> {{orgname}} <span v-if='zwname!="null"'> ，{{zwname}}</span></span>)</span>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="b" v-if='allshow[0]'>修改账号</el-dropdown-item>
                    <el-dropdown-item command="a" v-if='allshow[1]'>修改密码</el-dropdown-item>
                    <el-dropdown-item command="c" v-if='allshow[2]'>快捷菜单</el-dropdown-item>
                    <el-dropdown-item command="d" v-if='allshow[3]'>权限切换</el-dropdown-item>
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
        :default-active="$route.path"
        @select="handleSelect"
       >
      <NavMenu :navMenus="menuData"></NavMenu>
    </el-menu>
     </div>
     </div>
    <div class="homemain ba" style="margin-top:100px;">
        <!-- <keep-alive>
            <router-view></router-view>
        </keep-alive> -->

        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

    </div>
</div>
 <el-dialog title="选择单位" :visible.sync="addDialogVisible" :close-on-click-modal='false' width="600px">
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
import NavMenu from "./Common/NavMenu.vue";
export default {
  components: {
    NavMenu: NavMenu
  },
  data() {
    return {
      activeIndex: "indexs",
      menuData: this.menu.menu,
      name: this.$store.state.uname,
      orgname: this.$store.state.orgname,
      zwname: this.$store.state.zwname,
      addDialogVisible: false,
      form: {},
      xzdw: [],
      alldata: ["20003901", "20003902", "20003903", "20003904"],
      allshow: []
    };
  },
  mounted() {
    //权限start
    this.$api.post(this.Global.menuurl, { menuId: "10002000" }, r => {
      if (r.code == 1 && r.data != null) {
        for (let i = 0; i < this.alldata.length; i++) {
          this.allshow[i] = this.global_auth(r.data, this.alldata[i]);
        }
      }
      // else if(r.code==0){
      //   this.$router.push({path:'/limitmsg'});
      // }
    });
    //权限end
    this.getMenu();
  },
  methods: {
    handleCommand(command) {
      if (command == "a") {
        this.$router.push({ name: "EditPwd" });
      } else if (command == "b") {
        this.$router.push({ name: "EdituserName" });
      } else if (command == "c") {
        this.$router.push({ name: "ShortcutMenu" });
      } else if (command == "d") {
        //this.$router.push({name:'AuthoritySwith'});

        this.setDw();
        this.addDialogVisible = true;
      }
    },
    setDw() {
      var ff = new FormData();
      ff.append("userId", this.$store.state.personid);
      let p = ff;
      this.$api.post(this.Global.aport4 + "/user/getUserOrgs", p, r => {
        if (r.code == 1) {
          this.xzdw = r.data;
          //  if(r.data.length>0){
          //      var array=r.data;
          //      for (let i = 0; i < array.length; i++) {
          //          if(array[i].isDefault=='0167000001'){
          //              this.radio=array[i].orgId;
          //          }

          //      }
          //  }
        }
      });
    },
    getMenu() {
      this.$api.get(this.Global.aport1 + "/menu/getMenu", null, r => {
        this.menuData = r.data;
      });
    },

    loginout() {
      var formData = new FormData();
      formData.append("token", this.$store.state.token);
      let p = formData;
      this.$api.post(this.Global.aport4 + "/user/logout", p, r => {
        if (r.code == 1) {
          this.$router.push({ name: "Login" });
        }
      });
    },
    addsave() {
      if (this.form.dw == "" || this.form.dw == undefined) {
        this.$message.error("请选择单位！");
        return;
      }

      var ff = new FormData();
      ff.append("userId", this.$store.state.personid);
      ff.append("orgId", this.form.dw);
      let p = ff;
      var url = this.Global.aport4 + "/user/setDefaultOrg";
      this.$api.post(url, p, r => {
        if (r.code == 1) {
          // this.updateInfo(r.data);
          this.$store.commit("getOrgname", r.data.ssdw.mc);
          this.$store.commit("getOrgid", r.data.ssdw.dm);
          this.$router.push({ name: "Index" });
        }
      });
    },
    handleSelect(key, name) {
      console.log(key, name);
      if (this.$store.state.repeat == key) {
        this.$router.push({
          path: this.$route.fullPath,
          query: { plan: Date.now().toString() }
        });
      } else {
        this.$store.commit("getRepeat", key);
      }
    }
  }
};
</script>
<style scoped>
.toprc {
  text-align: right;
  float: right;
  margin-right: 20px;
  color: #000000;
  padding-top: 20px;
}
.homenav ul {
  height: 50px;
  box-sizing: border-box;
}

#nav {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
}
</style>
<style>
/* 水平样式 */
.home .el-menu--horizontal > div > .el-submenu {
  float: left;
}

/* 一级菜单的样式 */
.home .el-menu--horizontal > div > .el-menu-item {
  float: left;
  height: 50px;
  line-height: 45px;
  margin: 0;
  border-right: 1px solid #2c6099;
  color: #ffffff;
  /* background-color: #2C6099!important; */
}
.home .el-menu--horizontal > div > .el-menu-item:hover {
  background-color: #2c6099 !important;
}
.home .el-menu-item.is-active {
  background-color: #2c6099 !important;
}

/* 解决下图1 下拉三角图标 */
.home .el-menu--horizontal > div > .el-submenu .el-submenu__icon-arrow {
  position: static;
  vertical-align: middle;
  margin-left: 8px;
  margin-top: -3px;
}
/* 解决下图2 无下拉菜单时 不对齐问题 */
.home .el-menu--horizontal > div > .el-submenu .el-submenu__title {
  height: 50px;
  line-height: 45px;
  border-right: 1px solid #2c6099;
  color: #ffffff;
}
.home .el-menu--horizontal > div > .el-submenu .el-submenu__title:hover {
  background-color: #2c6099 !important;
}
.home .el-menu--horizontal > div > .el-submenu:hover {
  background-color: #2c6099 !important;
}
.home .el-submenu__title i {
  color: #ffffff !important;
}
.ifClass ul li {
  width: -moz-calc(16.6% - 30px);
  width: -webkit-calc(16.6% - 30px);
  width: calc(16.6% - 30px);
}
.navMenu {
  font-size: 0;
}
.el-menu.el-menu--horizontal {
  border: none;
}
</style>

