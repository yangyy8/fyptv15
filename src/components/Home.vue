<template>
  <div class="indexnew2">
    <div id="nav">
      <div class="top topba">
        <el-row type="flex">
          <el-col :span="3" style="min-width:380px;">
            <img style="margin-top:16px;" src="../assets/img/index/banner.png"/>
          </el-col>
          <el-col :span="15">
            <div :class="dhnum>6?'homenav':'homenav1'">
              <el-menu
              router
                            mode="horizontal"
                            background-color="#1F426C"
                            text-color="#ffffff"
                            active-text-color="#ffffff"
                            :default-active="activeIndex"
                
              >
                <NavMenu :navMenus="menuData"></NavMenu>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="5" style="text-align: center; min-width:310px;">
            <span class="toprc" style="color:#fff">
              <el-dropdown trigger="click" @command="handleCommand" style="color:#fff">
                <span class="cursor homef">
                  <i class="el-icon-user-solid"></i>
                  {{name}}
                  (<span style="font-size:12px;">
                  <span :title="orgname"> {{orgname.length>10?orgname.substr(0,10)+'...':orgname}}</span>
                  <span v-if='zwname!="null"'> , {{zwname}}</span>
                  </span>)
                </span>
                <el-dropdown-menu slot="dropdown" style="margin-top:-15px;">
                  <!-- <el-dropdown-item command="b">修改账号</el-dropdown-item> -->
                  <el-dropdown-item command="a">修改密码</el-dropdown-item>
                  <el-dropdown-item command="c">快捷菜单</el-dropdown-item>
                  <el-dropdown-item command="d">权限切换</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span @click="loginout" class="cursor homef">
                <i class="iconfont el-icon-yy-tuichu"></i> 退出
              </span>
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="homemain ba" style="margin-top:80px;">
      <!-- <keep-alive>
            <router-view></router-view>
      </keep-alive>-->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <el-dialog
      title="选择单位"
      :visible.sync="addDialogVisible"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-form :model="form">
        <el-row class="ah-40">
          <el-col :span="24">
            <span class="yy-input-text trt">选择单位：</span>
            <el-select
              v-model="form.dw"
              filterable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in xzdw"
                :key="ind"
                :label="item.orgName"
                :value="item.orgId"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="addsave()">切 换</el-button>
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
      menuData: [],
      name: this.$store.state.uname,
      orgname: this.$store.state.orgname,
      zwname: this.$store.state.zwname,
      addDialogVisible: false,
      form: {},
      xzdw: [],
      alldata: ["20003901", "20003902", "20003903", "20003904"],
      allshow: [],
      dhnum:0,
    };
  },
  mounted() {
    //权限start
    // this.$api.post(this.Global.menuurl, { menuId: "10002000" }, r => {
    //   if (r.code == 1 && r.data != null) {
    //     for (let i = 0; i < this.alldata.length; i++) {
    //       this.allshow[i] = this.global_auth(r.data, this.alldata[i]);
    //     }
    //   }
     
   // });
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
         this.dhnum=this.menuData.length;
        
         
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
          this.$store.commit('getToken',r.data.token)
          this.orgname=this.$store.state.orgname;
          this.$router.push({ name:"Index"});
        }
      });
    },
    handleSelect(key, name) {
      // console.log(key, name);
      // if (this.$store.state.repeat == key) {
      //   this.$router.push({
      //     path: this.$route.fullPath,
      //     query: { plan: Date.now().toString() }
      //   });
      // } else {
      //   this.$store.commit("getRepeat", key);
      // }
    }
  }
};
</script>
<style scoped>
#nav {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
}
.indexnew2 {
  overflow: hidden;
  text-align: left;
}
.top {
  height: 80px;
  line-height: 80px;
  background-color: #1F426C;
  border-bottom: 1px solid #cccccc;
}

.el-submenu [class^="el-icon-"] {
  margin-right: 8px;
}

</style>
<style>
/* 水平样式 */
.indexnew2 .el-menu--horizontal > div > .el-submenu {
  float: left;
}
/* .indexnew2 .el-col-4 {
  font-size: 18px;
  text-align: center;
  cursor: pointer;
} */

/* 一级菜单的样式 */
.indexnew2 .el-menu--horizontal > div > .el-menu-item {
  float: left;
  height: 80px;
  line-height: 80px;
  margin: 0;
  /* font-size: 18px; */
  /* border-right: 1px solid #2C6099; */
  color: #000000;
  /* background-color: #2C6099!important; */
}
/* .indexnew2 .el-menu--horizontal > div > .el-menu-item:hover {
  color: #1f426c !important;
  background-color: #fff !important;
} */
.indexnew2 .el-menu-item.is-active {
  border-color: #fff !important;
  border-bottom: 4px solid #4ca7ff !important;
  color: #000000 !important;
  border-left: none !important;
  width: 10% !important;
  margin-left: 4% !important;
}

/* 解决下图1 下拉三角图标 */
.indexnew2 .el-menu--horizontal > div > .el-submenu .el-submenu__icon-arrow {
  position: static;
  vertical-align: middle;
  margin-left: 8px;
  margin-top: -3px;
}
@media screen and (max-width: 1440px){
  .indexnew2 .el-menu--horizontal > div > .el-submenu .el-submenu__icon-arrow {
  position: static;
  vertical-align: middle;
  margin-left: 8px;
  margin-top: -3px;
  display: none;
   }
   .indexnew2 .el-submenu [class^=el-icon-]{
     margin-right:0px!important;
   }
   .indexnew2.el-menu-item [class^=el-icon-]{
     margin-right:0px!important;
   }
}
/* 解决下图2 无下拉菜单时 不对齐问题 */
.indexnew2 .el-menu--horizontal > div > .el-submenu .el-submenu__title {
  height: 80px;
  line-height: 80px;
  /* border-right: 1px solid #2C6099; */
  color: #ffffff!important;
}
.indexnew2 .el-menu--horizontal > div > .el-submenu .el-submenu__title:hover {
  /* color: #1f426c !important; */
  /* background-color: #ffffff !important; */
}
.indexnew2 .el-menu--horizontal > div > .el-submenu:hover {
  background-color: #1f426c !important;
  color: #ffffff !important;
}
.indexnew2 .el-submenu__title {
  color: #ffffff !important;
  padding: 0px!important;
}
.indexnew2 .el-submenu__title i {
  color: #6aa7e8;
}
.el-menu-item i {
  color: #6aa7e8;
}
.el-submenu__title i {
  color: #6aa7e8;
}
</style>