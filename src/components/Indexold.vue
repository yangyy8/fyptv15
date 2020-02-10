<template>
    
  <div class="index">

      <div class="top ba">
          <el-row type="flex">
              <el-col :span="7">
                  <img src="../assets/img/logoi.png">
              </el-col>
              <!-- <el-col :span="2">  <img src="../assets/img/index.png"></el-col> -->
              <el-col :span="17">
                        <el-menu 
                            mode="horizontal"
                            background-color="#ffffff"
                            text-color="#333333"
                            active-text-color="#333333"
                            :default-active="activeIndex"
                            router
                            >
                            <NavMenu :navMenus="menuData"></NavMenu>
                            </el-menu>
              </el-col>
          </el-row>
      </div>
      <div class="toplines ba">
      </div>
      <div class="center inba">
          <el-row>
              <el-col :span="4" style=" min-width:314px;"><img src="../assets/img/index/index1.png"></el-col>
              <el-col :span="18">
                  <el-row style="margin-left:20px;">
                      <el-col>
                          <span style="margin-right:20px; margin-bottom: 20px;"><img src="../assets/img/index/index2.png"></span>
                          <span style="margin-right:20px; margin-bottom: 20px;"><img src="../assets/img/index/index3.png"></span>
                          <span style=" margin-bottom: 20px;"><img src="../assets/img/index/index4.png"></span>
                      </el-col>
                      <el-col style="margin-top:15px;"> 
                          <span style="margin-right:20px;"><img src="../assets/img/index/index5.png"></span>
                          <span><img src="../assets/img/index/index6.png"></span>
                          </el-col>
                  </el-row>
              </el-col>
          </el-row>
      
      </div>
       <canvas id="canvas"></canvas>
        <div class="gfooter">
            <el-row type="flex" >
                <el-col :span="4" style="border-right: 1px solid #4B688A;">人大代表信息</el-col>
                <el-col :span="4" style="border-right: 1px solid #4B688A;">政协委员信息</el-col>
                <el-col :span="4" style="border-right: 1px solid #4B688A;">特约人员信息</el-col>
                <el-col :span="4" style="border-right: 1px solid #4B688A;">法院内部人员信息</el-col>
                <el-col :span="4" style="border-right: 1px solid #4B688A;">关注案件</el-col>
                <el-col :span="4" style="border-right: 1px solid #4B688A;">议案建议</el-col>
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
           activeIndex:'/Index',
           menuData:this.menu.menu
        }
    },
    mounted(){
      getSearh();

    },
    methods:{

    },
}
</script>

<style scoped>
canvas {
  background-color: #F8F8F8;
  display: block;
  margin: 0 auto;height: 750px;width: 100%;
}
.index{overflow: hidden;text-align: left;min-width: 1920px;}
.index .top{height: 80px; line-height: 80px;background-color: #ffffff;}
.index .toplines{height: 19px;background:url('../assets/img/lline.png') repeat-x;}
.index .center{height: 475px;position: absolute;z-index: 999;min-width: 1300px;}
.index .gfooter{height: 110px; bottom: 0; position: fixed;z-index: 999; width: 100%;background: #1F426C};

</style>
<style>
/* 水平样式 */
.index .el-menu--horizontal>div>.el-submenu {
    float: left;
}

.index .el-col-4{line-height:110px;font-size:18px;text-align: center; color:#ffffff;cursor: pointer;}

/* 一级菜单的样式 */
.index .el-menu--horizontal>div>.el-menu-item {
    float: left;
    height: 80px;
    line-height: 80px;
    margin: 0; 
    font-size: 18px;
    /* border-right: 1px solid #2C6099; */
    color: #ffffff;
    /* background-color: #2C6099!important; */
}
.index .el-menu--horizontal>div>.el-menu-item:hover  {
    background-color: #FFFFFF!important;

}
.index .el-menu-item.is-active{
 border-bottom: 2px solid #2C6099;
 color: #2C6099!important;
}


/* 解决下图1 下拉三角图标 */
.index .el-menu--horizontal>div>.el-submenu .el-submenu__icon-arrow {
    position: static;
    vertical-align: middle;
    margin-left: 8px;
    margin-top: -3px;
}
/* 解决下图2 无下拉菜单时 不对齐问题 */
.index .el-menu--horizontal>div>.el-submenu .el-submenu__title {
    height: 80px;
    line-height: 80px;
    /* border-right: 1px solid #2C6099; */
    color: #FFFFFF;
     float: left;
}
.index .el-menu--horizontal>div>.el-submenu .el-submenu__title:hover {
    background-color: #FFFFFF!important;
   
}
.index .el-menu--horizontal>div>.el-submenu:hover {
    background-color: #FFFFFF!important;
}
.index .el-submenu__title i {
    color: #ffffff;
}

</style>

