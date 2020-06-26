<template>
   <div class="personnel">
      <div class="homebread">
          <i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
          <span> 统计查询 
          <span class="mlr_10">/</span><b>综合统计分析查询</b>
          </span> 
    </div>
    <div class="content">
        <div class="ptitle mb-20">查询条件</div>
        <div class="anborder">
          <el-card class="box-card">
            <div slot="header">
                <span class="antitle">联络对象</span>
                <el-button class="anbnt" type="text" @click="getNone(0)">
                   <span v-if="ashow0">收起</span> 
                   <span v-else class="ancolor">展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow0">
                <div class="antext">
                    <el-row class="ah-30">
                        <el-col :span="24">
                            <el-checkbox v-model="rdchecked" :disabled="dxshow0" @change="getrdclick(0);getISXS()">人大代表</el-checkbox>
                            <span class="ml-10 ah12" v-if='rdshow[0]'>
                                <el-checkbox v-model="rd.cj" class="antxt" @change="getrdclick(1,1)">层级</el-checkbox>
                                <el-select v-model="cx.cx_ry_rd_levelType" :disabled="!rd.cj" @change="getrdclick(1,0,cx.cx_ry_rd_levelType)"  placeholder="请选择" filterable clearable  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='rdshow[1]'>
                                <el-checkbox class="ml-10 antxt" v-model="rd.sjrd" @change="getrdclick(2,1)">四级人大</el-checkbox>
                                <el-select v-model="cx.cx_ry_rd_orgid" :disabled="!rd.sjrd" @change="getrdclick(2,0,cx.cx_ry_rd_orgid);getNull(cx.cx_ry_rd_orgid,1);getJB(cx.cx_ry_rd_orgid,1);" remote :remote-method="rdorgremoteMethod" v-el-select-loadmore="rdorgloadmore" filterable clearable   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in rdorglist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.orgid">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="cx.cx_ry_rd_xjrd">含下级人大</el-checkbox>
                            </span>

                            <span class="ah12" v-if='rdshow[2]'>
                             <el-checkbox class="ml-10 antxt" v-model="rd.jb" @change="getrdclick(3,1)">届别</el-checkbox>
                             <el-select v-model="cx.cx_ry_rd_periodType"  :disabled="!rd.jb" placeholder="请选择" @change="getrdclick(3,0,cx.cx_ry_rd_periodType);getTB(cx.cx_ry_rd_orgid,cx.cx_ry_rd_periodType)" filterable clearable :no-data-text="cx.cx_ry_rd_orgid?'无数据':'请先选择四级人大'"   size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in rdjblist"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                </el-option>
                             </el-select>
                            </span>
                            <span class="ah12" v-if='rdshow[3]'>
                                <el-checkbox class="ml-10 antxt" v-model="rd.tb" @change="getrdclick(4)">团别</el-checkbox>
                                <el-select v-model="cx.cx_ry_rd_groupType" :disabled="!rdshow[4]"  placeholder="请选择" filterable clearable :no-data-text="cx.cx_ry_rd_periodType?'无数据':'请先选择届别'"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in tblist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                             </span>
                           
                        </el-col>
                         <el-col :span="24">
                             <el-checkbox v-model="zxchecked" :disabled="dxshow1" @change="getzxclick(0);getISXS()">政协委员</el-checkbox>
                             <span class="ml-10 ah12" v-if='zxshow[0]'>
                                <el-checkbox v-model="zx.cj" class="antxt" @change="getzxclick(1,1)" >层级</el-checkbox>
                                <el-select v-model="cx.cx_ry_zx_levelType" :disabled="!zx.cj"  @change="getzxclick(1,0,cx.cx_ry_zx_levelType)"  placeholder="请选择" filterable clearable  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='zxshow[1]'>
                                <el-checkbox class="ml-10 antxt" v-model="zx.sjzx" @change="getzxclick(2,1)">四级政协</el-checkbox>
                                <el-select v-model="cx.cx_ry_zx_orgid" :disabled="!zx.sjzx" filterable clearable   @change="getzxclick(2,0,cx.cx_ry_zx_orgid);getNull(cx.cx_ry_zx_orgid,2);getJB(cx.cx_ry_zx_orgid,2);" remote :remote-method="zxorgremoteMethod" v-el-select-loadmore="zxorgloadmore"   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in zxorglist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.orgid">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="cx.cx_ry_zx_xjzx">含下级政协</el-checkbox>
                            </span>
                            <span class="ah12" v-if='zxshow[2]'>
                             <el-checkbox class="ml-10 antxt" v-model="zx.jb" @change="getzxclick(3,1)">届别</el-checkbox>
                             <el-select v-model="cx.cx_ry_zx_periodType"  :disabled="!zx.jb" filterable clearable @change="getzxclick(3,0,cx.cx_ry_zx_periodType);getJJB(cx.cx_ry_zx_orgid,cx.cx_ry_zx_periodType)" placeholder="请选择" :no-data-text="cx.cx_ry_zx_orgid?'无数据':'请先选择四级政协'" size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in zxjblist"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                </el-option>
                             </el-select>
                            </span>
                            <span class="ah12" v-if='zxshow[3]'>
                                <el-checkbox class="ml-10 antxt" v-model="zx.jjb" @change="getzxclick(4)">界别</el-checkbox>
                                <el-select v-model="cx.cx_ry_zx_circlesType" :disabled="!zxshow[4]" filterable clearable  placeholder="请选择"  size="mini" :no-data-text="cx.cx_ry_zx_periodType?'无数据':'请先选择届别'" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in jjblist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                             </span>
                        </el-col>
                         <el-col :span="24">
                            <el-checkbox v-model="tychecked" :disabled="dxshow2" @change="gettyclick(0);getISXS()">特约人员</el-checkbox>
                            <span class="ml-10 ah12" v-if='tyshow[0]'>
                                <el-checkbox v-model="ty.cj" class="antxt"  @change="gettyclick(1,1)">法院等级</el-checkbox>
                                <el-select v-model="cx.cx_ry_ty_levelType" :disabled="!ty.cj" @change="gettyclick(1,0,cx.cx_ry_ty_levelType)" filterable clearable   placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.fyjb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='tyshow[1]'>
                                <el-checkbox class="ml-10 antxt" v-model="ty.sjfy" @change="gettyclick(2,1)">四级法院</el-checkbox>
                                <el-select v-model="cx.cx_ry_ty_orgid" :disabled="!ty.sjfy" filterable clearable   @change="gettyclick(2,0,cx.cx_ry_ty_orgid);getNull(cx.cx_ry_ty_orgid,3);getTYLBList(cx.cx_ry_ty_orgid);" remote :remote-method="tyorgremoteMethod" v-el-select-loadmore="tyorgloadmore"   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in tyorglist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.orgid">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="cx.cx_ry_ty_xjfy">含下级法院</el-checkbox>
                            </span>
                           
                            <span class="ah12" v-if='tyshow[2]'>
                                <el-checkbox class="ml-10 antxt" v-model="ty.tylb" @change="gettyclick(3,1)">特约类别</el-checkbox>
                                <el-select v-model="cx.cx_ry_ty_specialType" :disabled="!ty.tylb" filterable clearable @change="gettyclick(3,0,cx.cx_ry_ty_specialType);getTYJB(cx.cx_ry_ty_orgid,cx.cx_ry_ty_specialType)"  placeholder="请选择" :no-data-text="cx.cx_ry_ty_orgid?'无数据':'请先选择四级法院'"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in tylblist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                             </span>
                              <span class="ah12" v-if='tyshow[3]'>
                             <el-checkbox class="ml-10 antxt" v-model="ty.jb" @change="gettyclick(4)">届别</el-checkbox>
                             <el-select v-model="cx.cx_ry_ty_periodType"  :disabled="!tyshow[4]" filterable clearable  placeholder="请选择"  :no-data-text="cx.cx_ry_ty_specialType?'无数据':'请先选择特约类别'" size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in tyjblist"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                </el-option>
                             </el-select>
                            </span>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-card>

        <!-- 时间范围 -->
         <el-card class="box-card mt-10">
            <div slot="header">
                <span class="antitle">时间范围</span>
                <el-button class="anbnt" type="text" @click="getNone(1)">
                   <span v-if="ashow1">收起</span> 
                   <span v-else class="ancolor">展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow1">
                <div class="antext">
                     <el-row class="ah-30">
                        <el-col :span="24">
                            <el-checkbox v-model="sjchecked" :disabled="hdshow0" @change="getsjclick(0);getISXS()">活动时间</el-checkbox>
                            <span class="ml-10 ah12" v-if='sjshow0'>
                                <el-checkbox v-model="sj.ksrq" class="antxt" @change="getsjclick(1,1)">开始日期</el-checkbox>
                                 <el-date-picker 
                                     v-model="cx.cx_ll_sj_ksrq" format="yyyy-MM-dd"
                                    type="date" size="mini" value-format="yyyy-MM-dd"
                                    placeholder="开始日期" class="aninput" :disabled="!sj.ksrq"  @change="getsjclick(1,0,cx.cx_ll_sj_ksrq)">
                                 </el-date-picker> 
                            </span>
                             <span class="ah12" v-if='sjshow1'>
                                <el-checkbox v-model="sj.jsrq" class="ml-10 antxt" @change="getsjclick(2)">结束日期</el-checkbox>
                                 <el-date-picker 
                                     v-model="cx.cx_ll_sj_jsrq" format="yyyy-MM-dd"
                                    type="date" size="mini" value-format="yyyy-MM-dd"
                                    placeholder="结束日期" class="aninput" :disabled="!sj.jsrq">
                                 </el-date-picker> 
                            </span>
                        </el-col>
                     </el-row>
                </div>
            </div>
         </el-card>
          <!-- 单位 -->
         <el-card class="box-card mt-10">
            <div slot="header">
                <span class="antitle">单位</span>
                <el-button class="anbnt" type="text" @click="getNone(2)">
                   <span v-if="ashow2">收起</span> 
                   <span v-else class="ancolor">展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow2">
                <div class="antext">
                     <el-row class="ah-30">
                        <el-col :span="24">
                            <el-checkbox v-model="kzdwchecked" :disabled="hdshow3" @change="getkzdwclick(0);getISXS()">开展单位</el-checkbox>
                             <span v-if='kzdwshow[0]'>
                            <span class="ml-10 ah12" v-if='kzdwshow[0]'>
                                <el-checkbox v-model="kzdw.fyjb" class="antxt" @change="getkzdwclick(1,1)">层级</el-checkbox>
                                <el-select v-model="cx.cx_ll_kz_levelType" :disabled="!kzdw.fyjb" placeholder="请选择" @change="getkzdwclick(1,0,cx.cx_ll_kz_levelType)"  filterable clearable  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='kzdwshow[1]'>
                                <el-checkbox class="ml-10 antxt" v-model="kzdw.fydw" @change="getkzdwclick(2,1)">开展单位</el-checkbox>
                                <el-select v-model="cx.cx_ll_kz_developmentUnitId" :disabled="!kzdw.fydw" filterable clearable   @change="getkzdwclick(2,0,cx.cx_ll_kz_developmentUnitId);getNull(cx.cx_ll_kz_developmentUnitId,4);getkzbm(cx.cx_ll_kz_developmentUnitId)" remote :remote-method="kzdwremoteMethod" v-el-select-loadmore="kzloadmore"   placeholder="请输入关键字搜索"   size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in kzdwdata"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.orgid">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="cx.cx_ll_kz_xjfy">含下级法院</el-checkbox>
                            </span>
                            <span class="ah12" v-if='kzdwshow[2]'>
                             <el-checkbox class="ml-10 antxt" v-model="kzdw.kzbm" @change="getkzdwclick(3)">开展部门</el-checkbox>
                             <el-select v-model="cx.cx_ll_kz_devDepartmentId"  :disabled="!kzdwshow[3]" filterable clearable placeholder="请选择" :no-data-text="cx.cx_ll_kz_developmentUnitId?'无数据':'请先选择开展单位'"  size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in kzbmdata"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.orgid">
                                </el-option>
                             </el-select>
                            </span>
                              </span>
                            <!-- <span class="ah12" v-if='kzdwshow[3]'>
                                <el-checkbox class="ml-10 antxt" v-model="kzdw.yld" @change="getkzdwclick(4)">院领导</el-checkbox>
                                <el-select v-model="kzdw.pairPersonId" :disabled="!kzdwshow[4]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                             </span> -->
                        </el-col>
                         <el-col :span="24">
                            <el-checkbox v-model="bldwchecked"  :disabled="blshow" @change="getbldwclick(0);getISXS()">办理单位</el-checkbox>
                            <span v-if='bldwshow[0]'>
                            <span class="ml-10 ah12" v-if='bldwshow[0]'>
                                <el-checkbox v-model="bldw.fyjb" class="antxt" @change="getbldwclick(1,1)">法院级别</el-checkbox>
                                <el-select v-model="cx.cx_gzya_bl_levelType" :disabled="!bldw.fyjb" filterable clearable @change="getbldwclick(1,0,cx.cx_gzya_bl_levelType)"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.fyjb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='bldwshow[1]'>
                                <el-checkbox class="ml-10 antxt" v-model="bldw.fydw" @change="getbldwclick(2,1)">法院单位</el-checkbox>
                                <el-select v-model="cx.cx_gzya_bl_undertakeUnitId" :disabled="!bldw.fydw" filterable clearable  @change="getbldwclick(2,0,cx.cx_gzya_bl_undertakeUnitId);getNull(cx.cx_gzya_bl_undertakeUnitId,5);getblbm(cx.cx_gzya_bl_undertakeUnitId)" remote :remote-method="fydwremoteMethod" v-el-select-loadmore="fyloadmore"   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in fydwdata"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.orgid">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="cx.cx_gzya_bl_xjfy">含下级法院</el-checkbox>
                            </span>
                            <span class="ah12" v-if='bldwshow[2]'>
                             <el-checkbox class="ml-10 antxt" v-model="bldw.blbm" @change="getbldwclick(3)">办理部门</el-checkbox>
                             <el-select v-model="cx.cx_gzya_bl_undertakeDepartmentId"  :disabled="!bldwshow[3]" filterable clearable placeholder="请选择" :no-data-text="cx.cx_gzya_bl_undertakeUnitId?'无数据':'请先选择办理单位'"  size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in blbmdata"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.orgid">
                                </el-option>
                             </el-select>
                            </span>
                          </span>
                        </el-col>
                     </el-row>
                </div>
            </div>
         </el-card>
          <!-- 开展地点 -->
         <el-card class="box-card mt-10">
            <div slot="header">
                <span class="antitle">开展地点</span>
                <el-button class="anbnt" type="text" @click="getNone(3)">
                   <span v-if="ashow3">收起</span> 
                   <span v-else class="ancolor">展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow3">
                <div class="antext">
                     <el-row class="ah-30">
                        <el-col :span="24">
                             <el-checkbox v-model="hdddchecked" :disabled="hdshow1" @change="gethdddclick(0);getISXS()">活动地点</el-checkbox>
                            <span class="ml-10 ah12" v-if='hdddshow[0]'>
                                <el-checkbox v-model="hddd.sheng" class="antxt" @change="gethdddclick(1,1)">省</el-checkbox>
                                <el-select v-model="cx.cx_ll_dd_province" :disabled="!hddd.sheng" @change="gethdddclick(1,0,cx.cx_ll_dd_province);getLevel(2,cx.cx_ll_dd_province,1)" filterable clearable placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in shenglist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='hdddshow[1]'>
                                <el-checkbox class="ml-10 antxt" v-model="hddd.shi" @change="gethdddclick(2,1)">市</el-checkbox>
                                <el-select v-model="cx.cx_ll_dd_city" :disabled="!hddd.shi" @change="gethdddclick(2,0,cx.cx_ll_dd_city);getLevel(3,cx.cx_ll_dd_city,2)" filterable clearable   placeholder="请选择" :no-data-text="cx.cx_ll_dd_province?'无数据':'请先选择省'"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in shilist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='hdddshow[2]'>
                             <el-checkbox class="ml-10 antxt" v-model="hddd.qx" @change="gethdddclick(3)">区县</el-checkbox>
                             <el-select v-model="cx.cx_ll_dd_county"  :disabled="!hdddshow[3]" placeholder="请选择"  :no-data-text="cx.cx_ll_dd_city?'无数据':'请先选择市'"   filterable clearable  size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in  xianlist"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                </el-option>
                             </el-select>
                            </span>
                        </el-col>
                     </el-row>
                </div>
            </div>
         </el-card>
         <!-- 联络工作 -->
         <el-card class="box-card mt-10">
            <div slot="header">
                <span class="antitle">联络工作</span>
                <el-button class="anbnt" type="text" @click="getNone(4)">
                   <span v-if="ashow4">收起</span> 
                   <span v-else class="ancolor">展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow4">
                <div class="antext">
                     <el-row class="ah-30">
                        <el-col :span="24">
                             <el-checkbox v-model="llhdchecked" :disabled="hdshow2" @change="getllhdclick(0);getISXS()">联络活动</el-checkbox>
                            <span class="ml-10 ah12" v-if='llhdshow[0]'>
                                <el-checkbox v-model="llhd.hdfl" class="antxt" @change="getllhdclick(1)">活动类型</el-checkbox>
                                <el-select v-model="cx.cx_ll_ll_activityType" :disabled="!llhdshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.hdlx"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                        </el-col>
                     </el-row>
                </div>
            </div>
         </el-card>
          <!-- 办理工作 -->
         <el-card class="box-card mt-10">
            <div slot="header">
                <span class="antitle">办理工作</span>
                <el-button class="anbnt" type="text" @click="getNone(5)">
                   <span v-if="ashow5">收起</span> 
                   <span v-else class="ancolor">展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow5">
                <div class="antext">
                     <el-row class="ah-30">
                        <el-col :span="24">
                             <el-checkbox v-model="gzajchecked" label="0" :disabled="gzshow" @change="getgzajclick(0);getISXS()">关注案件</el-checkbox>
                            <span class="ml-10 ah12" v-if='gzajshow[0]'>
                                <el-checkbox v-model="gzaj.ajlx" class="antxt" @change="getgzajclick(1)">案件类型</el-checkbox>
                                <el-select v-model="cx.cx_gz_caseclass" :disabled="!gzajshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.ajlx"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                        </el-col>
                        <el-col :span="24">
                             <el-checkbox v-model="yajychecked" label="1" :disabled="yashow" @change="getyajyclick(0);getISXS()">议案建议</el-checkbox>
                            <span class="ml-10 ah12" v-if='yajyshow[0]'>
                                <el-checkbox v-model="yajy.yalx" class="antxt" @change="getyajyclick(1)">议案类型</el-checkbox>
                                <el-select v-model="cx.cx_ya_proposalType" :disabled="!yajyshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.yalx"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                        </el-col>
                     </el-row>
                </div>
            </div>
         </el-card>

        </div>

        <div class="ptitle mt-50" style="line-height:50px;border-bottom:1px solid #eeeeee">输出项目</div>
        <div class="ml-10  mt-30">
            <el-row>
                <el-col :span="24" class="input-item">
                     <span class="yy-input-text antxtsc"><font class="red">*</font> 统计方式</span>
                     <div class="yy-input-input anbgcolor" style="background:#F6FAFD;">
                          <el-radio  v-model="tjfsradio" style="font-weight:bold"  :label="t.value" :disabled="t.istrue" v-for="(t,ind) in Countfs" :key="ind" @change="gethhdx(t.value)">{{t.name}}</el-radio>
                     </div>
                </el-col>
                 <el-col :span="24" class="input-item mt-20">
                     <span class="yy-input-text antxtsc"><font class="red">*</font> 横行对象</span>
                     <div class="yy-input-input anbgcolor">
                        <el-row class='anline' v-if='hhdxshow'>
                            <el-col :span="24" v-if='pp.show1'>
                                 <div>
                                      <el-radio v-model="hradio" label="1" @change="getscdx(0)">联络对象</el-radio>
                                 </div>
                                 <div class="anboder pl-40" v-if='hrshow0'>
                                     <div v-if='isall?true:rdchecked'>
                                        <el-radio v-model="hhdw.dxadio" label="dx1" @change="getscdx(1)">人大代表</el-radio>
                                        <div class="pl-20 anbackcolor" v-if='hrshow1'>
                                           <el-radio v-model="hhzx.radio" v-for="(t,ind) in rdinfo" :key="ind" :label="t.itemCode">{{t.itemName}}</el-radio>
                                        </div>
                                     </div>
                                      <div v-if='isall?true:zxchecked'>
                                      <el-radio v-model="hhdw.dxadio" label="dx2" @change="getscdx(2)">政协委员</el-radio>
                                       <div class="pl-20 anbackcolor" v-if='hrshow2'>
                                           <el-radio v-model="hhzx.radio" v-for="(t,ind) in zxinfo" :key="ind" :label="t.itemCode">{{t.itemName}}</el-radio>
                                        </div>
                                      </div>
                                      <div v-if='isall?true:tychecked'>
                                      <el-radio v-model="hhdw.dxadio" label="dx3" @change="getscdx(3)">特约人员</el-radio>
                                        <div class="pl-20 anbackcolor" v-if='hrshow3'>
                                           <el-radio v-model="hhzx.radio" v-for="(t,ind) in tyinfo" :key="ind" :label="t.itemCode">{{t.itemName}}</el-radio>
                                        </div>
                                      </div>
                                 </div>
                            </el-col>
                             <el-col :span="24"  v-if='pp.show2'>
                                  <div class="anline">
                                     <el-radio v-model="hradio" label="2" @change="getscdx(4)">单位</el-radio>
                                  </div>
                                   <div class="anboder pl-40" v-if='hrshow4'>
                                      <div v-if='pp.show6'>
                                        <el-radio v-model="hhdw.dwadio" label="dx5" @change="getscdx(5)">联络活动</el-radio>
                                        <div class="pl-20 anbackcolor" v-if='hrshow5'>
                                           <el-radio v-model="hhzx.radio" v-for="(t,ind) in dwinfo1" :key="ind" :label="t.itemCode">{{t.itemName}}</el-radio>
                                        </div>
                                      </div>
                                      <div  v-if='pp.show7'>
                                        <el-radio v-model="hhdw.dwadio" label="dx6" @change="getscdx(6)">关注案件</el-radio>
                                        <div class="pl-20 anbackcolor" v-if='hrshow6'>
                                           <el-radio v-model="hhzx.radio" v-for="(t,ind) in dwinfo2" :key="ind" :label="t.itemCode">{{t.itemName}}</el-radio>
                                        </div>
                                      </div>
                                       <div  v-if='pp.show8'>
                                        <el-radio v-model="hhdw.dwadio" label="dx7" @change="getscdx(7)">议案建议</el-radio>
                                        <div class="pl-20 anbackcolor" v-if='hrshow7'>
                                           <el-radio v-model="hhzx.radio" v-for="(t,ind) in dwinfo3" :key="ind" :label="t.itemCode">{{t.itemName}}</el-radio>
                                        </div>
                                      </div>
                                   </div>
                            </el-col>
                             <el-col :span="24"  v-if='pp.show3'>
                                 <div class="anline">
                                  <el-radio v-model="hradio" label="3" @change="getscdx(8)">联络活动</el-radio>
                                 </div>
                                <div class="pl-20 anbackcolor" v-if='hrshow8'>
                                  
                                   <el-radio v-model="hhzx.radio" v-for="(t,ind) in dwinfo4" :key="ind" :label="t.itemCode">{{t.itemName}}</el-radio>                                        
                                 
                                </div>

                            </el-col>
                             <el-col :span="24"  v-if='pp.show4'>
                                 <div class="anline">
                                  <el-radio v-model="hradio" label="4" @change="getscdx(9)">关注案件</el-radio>
                                </div>
                                <div class="anboder pl-40" v-if='hrshow9'>
                                     <!-- <el-radio v-model="hhdw.dxadio" label="dx9" @change="getscdx(10)">案件类型</el-radio>
                                      <span class="ml-10" v-if='hrshow10'> -->
                                           <el-radio v-model="hhzx.radio" v-for="(t,ind) in ajlxinfo" :key="ind" :label="t.value">{{t.name}}</el-radio>
                                        <!-- </span> -->
                                </div>

                            </el-col>
                            <el-col :span="24"  v-if='pp.show5'>
                                 <div class="anline">
                                  <el-radio v-model="hradio" label="dx11" @change="getscdx(11)">议案建议</el-radio>
                                </div>
                                 <div class="anboder pl-40" v-if='hrshow11'>
                                     <!-- <el-radio v-model="hhdw.yqadio" label="dx12" @change="getscdx(12)">预期类型</el-radio>
                                      <span class="ml-10" v-if='hrshow12'> -->
                                           <el-radio v-model="hhzx.radio" v-for="(t,ind) in yqlxinfo" :key="ind" :label="t.value">{{t.name}}</el-radio>
                                      <!-- </span> -->
                                </div>
                            </el-col>
                        </el-row>
                     </div>
                </el-col>
              
                 <el-col :span="24" class="input-item mt-20">
                     <span class="yy-input-text antxtsc"><font class="red">*</font> 纵列对象</span>
                     <div class="yy-input-input anbgcolor">
                            <el-row  v-if='zldxshow'>
                            <el-col :span="24" v-if='pp.show10'>
                                 <div class="anline">
                                      <el-radio v-model="zlradio" label="1" @change="getzldx(0)">联络对象</el-radio>
                                 </div>
                                 <div class="pl-20 anbackcolor" v-if='zlshow0 && zlinfo1.length>0'>
                                    <el-radio v-model="zl.radio" v-for="(t,ind) in zlinfo1" style="width:110px" :key="ind" :label="t.itemCode">{{t.itemName}}</el-radio>
                                      
                                 </div>
                            </el-col>
                              <el-col :span="24" v-if='pp.show11'>
                                 <div class="anline">
                                      <el-radio v-model="zlradio" label="2" @change="getzldx(1)">联络活动</el-radio>
                                 </div>
                                 <div class="pl-20 anbackcolor" v-if='zlshow1 && zlinfo2.length>0'>
                                    <el-radio v-model="zl.radio" v-for="(t,ind) in zlinfo2" style="width:110px" :key="ind" :label="t.itemCode">{{t.itemName}}</el-radio>
                                      
                                 </div>
                            </el-col>
                              <el-col :span="24" v-if='pp.show12'>
                                 <div class="anline">
                                      <el-radio v-model="zlradio" label="3" @change="getzldx(2)">关注案件</el-radio>
                                 </div>
                                 <div class="pl-20 anbackcolor" v-if='zlshow2 && zlinfo3.length>0'>
                                    <el-radio v-model="zl.radio" v-for="(t,ind) in zlinfo3" style="width:110px" :key="ind" :label="t.itemCode">{{t.itemName}}</el-radio>
                                      
                                 </div>
                            </el-col>
                              <el-col :span="24" v-if='pp.show13'>
                                 <div class="anline">
                                      <el-radio v-model="zlradio" label="4" @change="getzldx(3)">议案建议</el-radio>
                                 </div>
                                 <div class="pl-20 anbackcolor" v-if='zlshow3 && zlinfo4.length>0'>
                                    <el-radio v-model="zl.radio" v-for="(t,ind) in zlinfo4" style="width:110px" :key="ind" :label="t.itemCode">{{t.itemName}}</el-radio>
                                      
                                 </div>
                            </el-col>
                            </el-row>
                     </div>
                </el-col>
                <el-col :span="24" class="mt-50 mb-20" style="text-align:center"> 
                         <el-button  style="width:300px;height:50px;font-size:22px;border:1px solid #3D9EFF;color:#3D9EFF" @click="CurrentPage=1;getList(CurrentPage,pageSize,cx)">统计分析查询</el-button>
                           <el-button style="width:100px;height:50px;font-size:22px;" @click="reset">重 置</el-button>
                </el-col>
               <el-col :span="24" v-if='jgshow' class="mt-50">
                   <div class="anctitle">{{title}}</div>
                     <my-table :col="tabletitle"
                        :data="tabledata"  :key="Math.random()">
                     </my-table>
                      <div class="middle-foot">
                                <div class="page-msg">
                                    <div class="">
                                共{{TotalResult}}条记录
                                    </div>
                                    <div class="">
                                    每页显示
                                    <el-select v-model="pageSize" @change="pageSizeChange(pageSize)" placeholder="10" size="mini" class="page-select">
                                        <el-option
                                        v-for="item in yoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    条
                                    </div>
                                    <div class="">
                                    共{{Math.ceil(TotalResult/pageSize)}}页
                                    </div>
                                </div>
                                <el-pagination
                                    background
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="CurrentPage"
                                    :page-size="pageSize"
                                    layout="prev, pager, next"
                                    :total="TotalResult">
                                </el-pagination>
                            </div>
               </el-col>
            </el-row>
        </div>
        <br/><br/>
    </div>
   </div>
</template>
<script>
import MyTable from '../Common/tablecol/MyTable'
import {ToArray} from '@/assets/js/ToArray.js'
export default {
      components: {MyTable},
       directives: {
          'el-select-loadmore': {
            bind(el, binding) {
              const SELECTWRAP_DOM = el.querySelector(
                '.el-select-dropdown .el-select-dropdown__wrap'
              );
              SELECTWRAP_DOM.addEventListener('scroll', function() {
                const condition =
                  this.scrollHeight - this.scrollTop <= this.clientHeight;
                if (condition) {
                   binding.value();
                }
              });
            }
          }
  },
    data(){
        return{
            jgshow:false,
            CurrentPage: 1,
            pageSize: 10,
            TotalResult: 0,
            yoptions:[
                {
                    value: 10,
                    label: "10"
                },
                {
                    value: 20,
                    label: "20"
                },
                {
                    value: 30,
                    label: "30"
                }
            ],
            tjnum:0,
            isall:true,
            ashow0:false,
            ashow1:false,
            ashow2:false,
            ashow3:false,
            ashow4:false,
            ashow5:false,
        //    ashow0:true,
        //    ashow1:true,
        //    ashow2:true,
        //    ashow3:true,
        //    ashow4:true,
        //    ashow5:true,

           dxshow0:false,
           dxshow1:false,
           dxshow2:false,
           hdshow0:false,
           hdshow1:false,
           hdshow2:false,
           hdshow3:false,
           yashow:false,
           gzshow:false,
           blshow:false,

           rdchecked:'',
           zxchecked:'',
           tychecked:'',
        //    cx:{ry:{rd:{},zx:{},ty:{}},
        //        ll:{sj:{},kz:{},dd:{},ll:{}},
        //        gzya:{bl:{}},
        //        gz:{},
        //        ya:{},},
           cx:{},
           rd:{},
           rdshow:[],
           zx:{},
           zxshow:[],
           ty:{},
           tyshow:[],

           sjchecked:'',
           sj:{},
           sjshow0:false,
           sjshow1:false,
           kzdwchecked:'',
           bldwchecked:'',
           kzdw:{},
           bldw:{},
           kzdwshow:[],
           bldwshow:[],

           hdddchecked:'',
           hddd:{},
           hdddshow:[],

           llhdchecked:'',
           llhd:{},
           llhdshow:[],
           
           gzajchecked:'',
           gzaj:{},
           gzajshow:[],

           yajychecked:'',
           yajy:{},
           yajyshow:[],
           
           tabPosition:'left',
           tjfsradio:'',
           Countfs:[
                    {name:'统计人数',value:'tj_ry_rs',istrue:false},
                    {name:'联络活动件数',value:'tj_ll_cs',istrue:false},
                    {name:'关注案件件数',value:'tj_gz_cs',istrue:false},
                    {name:'议案建议件数',value:'tj_ya_cs',istrue:false},
                    {name:'参加活动人次',value:'tj_ryll_rc',istrue:false},
                    {name:'关注案件人次',value:'tj_rygz_rc',istrue:false},
                    {name:'提出建议人次',value:'tj_ryya_rc',istrue:false},
           ],

           hradio:'',
           
           hrshow0:false,
           hrshow1:false,
           hrshow2:false,
           hrshow3:false,
           hrshow4:false,
           hrshow5:false,
           hrshow6:false,
           hrshow7:false,
           hrshow8:false,
           hrshow9:false,
           hrshow10:false,
           hrshow11:false,
           hrshow12:false,

      
           
           hhdw:{},
           hhzx:{},
           zl:{},
           rdinfo:[
            //    {itemName:'层级',itemCode:'rd1'},
            //    {itemName:'人大单位',itemCode:'rd2'},
            //    {itemName:'届别',itemCode:'rd3'},
            //    {itemName:'团别',itemCode:'rd4'},
            //    {itemName:'巡回区域',itemCode:'rd5'},
            //    {itemName:'代表',itemCode:'rd6'},
           ],
           zxinfo:[
            //    {itemName:'层级',itemCode:'zx1'},
            //    {itemName:'政协单位',itemCode:'zx2'},
            //    {itemName:'届别',itemCode:'zx3'},
            //    {itemName:'界别',itemCode:'zx4'},
            //    {itemName:'委员',itemCode:'zx5'},
           ],

           tyinfo:[
            //    {itemName:'法院等级',itemCode:'ty1'},
            //    {itemName:'法院单位',itemCode:'ty2'},
            //    {itemName:'特约人员类别',itemCode:'ty3'},
            //    {itemName:'届别',itemCode:'ty4'},
            //    {itemName:'特约人员',itemCode:'ty5'},
           ],

           hdinfo:[
            //    {itemName:'单位等级',itemCode:'hd1'},
            //    {itemName:'发起单位',itemCode:'hd2'},
            //    {itemName:'发起部门',itemCode:'hd3'},
            //    {itemName:'接待单位',itemCode:'hd4'},
            //    {itemName:'特约人员',itemCode:'hd5'},
           ],

          ajlxinfo:[
            //    {itemName:'审理阶段',itemCode:'aj1'},
            //    {itemName:'案件状态',itemCode:'aj2'},
            //    {itemName:'利害关系',itemCode:'aj3'},
            //    {itemName:'来文期间',itemCode:'aj4'},
          ],
            yqlxinfo:[
            //    {itemName:'承办类别',itemCode:'yq1'},
            //    {itemName:'承办性质',itemCode:'yq2'},
            //    {itemName:'来文期间',itemCode:'yq3'},
            //    {itemName:'重点业务分类',itemCode:'yq4'},
            ],
            dwinfo1:[
            //    {itemName:'发起单位',itemCode:'yq1'},
            //    {itemName:'单位等级',itemCode:'yq2'},
            //    {itemName:'发起部门',itemCode:'yq3'},
            //    {itemName:'接待单位',itemCode:'yq4'},
            ],
            dwinfo2:[
            //    {itemName:'承办单位',itemCode:'yq1'},
            //    {itemName:'法院等级',itemCode:'yq2'},
            //    {itemName:'法院单位',itemCode:'yq3'},
            //    {itemName:'承办部门',itemCode:'yq4'},
            //    {itemName:'问题针对法院',itemCode:'yq5'},
            ],
            dwinfo3:[
            //    {itemName:'承办单位',itemCode:'yq1'},
            //    {itemName:'法院等级',itemCode:'yq2'},
            //    {itemName:'法院单位',itemCode:'yq3'},
            //    {itemName:'承办部门',itemCode:'yq4'},
            ],
            dwinfo4:[],


           zlradio:'',
           
           zlshow0:false,
           zlshow1:false,
           zlshow2:false,
           zlshow3:false,
          
           zlinfo1:[],
           zlinfo2:[],
           zlinfo3:[],
           zlinfo4:[],

           pp:{show1:false,show2:false,show3:false,show4:false,
           show5:false,show6:false,show7:false,show8:false,
           show9:false,show10:false,show11:false,show12:false,
           show13:false},
       

           title:'',
           tabledata:[
                // {
                //     "C0127000005": 147,
                //     "C0127000006": 146,
                //     "C0127000003": 188,
                //     "C0127000004": 165,
                //     "C0127000001": 3150,
                //     "C0127000002": 133,
                //     "C0127000010": 7,
                //     "C0127000011": 0,
                //     "C0127000009": 36,
                //     "R0": "全国",
                //     "C0127000007": 96,
                //     "C0127000008": 168
                // },
                // {
                //     "C0127000005": 0,
                //     "C0127000006": 0,
                //     "C0127000003": 0,
                //     "C0127000004": 0,
                //     "C0127000001": 7,
                //     "C0127000002": 0,
                //     "C0127000010": 0,
                //     "C0127000011": 0,
                //     "C0127000009": 0,
                //     "R0": "省级",
                //     "C0127000007": 0,
                //     "C0127000008": 0
                // },
                // {
                //     "C0127000005": 0,
                //     "C0127000006": 0,
                //     "C0127000003": 0,
                //     "C0127000004": 0,
                //     "C0127000001": 0,
                //     "C0127000002": 0,
                //     "C0127000010": 0,
                //     "C0127000011": 0,
                //     "C0127000009": 0,
                //     "R0": "市级",
                //     "C0127000007": 0,
                //     "C0127000008": 0
                // },
                // {
                //     "C0127000005": 0,
                //     "C0127000006": 0,
                //     "C0127000003": 0,
                //     "C0127000004": 0,
                //     "C0127000001": 0,
                //     "C0127000002": 0,
                //     "C0127000010": 0,
                //     "C0127000011": 0,
                //     "C0127000009": 0,
                //     "R0": "县级",
                //     "C0127000007": 0,
                //     "C0127000008": 0
                // }
          ],

          
           tabletitle:[
            //    {
            //         "prop": "R0",
            //         "label": "层级"
            //     },
            //     {
            //         "children": [
            //         {
            //             "prop": "C0127000001",
            //             "label": "中国共产党"
            //         },
            //         {
            //             "prop": "C0127000010",
            //             "label": "无党派人士"
            //         },
            //         {
            //             "children": [
            //             {
            //                 "prop": "C0127000002",
            //                 "label": "中国国民党革命委员会"
            //             },
            //             {
            //                 "prop": "C0127000003",
            //                 "label": "中国民主同盟"
            //             },
            //             {
            //                 "prop": "C0127000004",
            //                 "label": "中国民主建国会"
            //             },
            //             {
            //                 "prop": "C0127000005",
            //                 "label": "中国民主促进会"
            //             },
            //             {
            //                 "prop": "C0127000006",
            //                 "label": "中国农工民主党"
            //             },
            //             {
            //                 "prop": "C0127000007",
            //                 "label": "中国致公党"
            //             },
            //             {
            //                 "prop": "C0127000008",
            //                 "label": "九三学社"
            //             },
            //             {
            //                 "prop": "C0127000009",
            //                 "label": "台湾民主自治同盟"
            //             }
            //             ],
            //             "prop": "C0127000011",
            //             "label": "八大民主党派"
            //         }
            //     ],
            //    "label": "政治面貌"
            //   }

           ],

           shenglist:[],
           shilist:[],
           xianlist:[],

           rdorgload:[],
           rdorglist:[],
           zxorgload:[],
           zxorglist:[],
           tyorgload:[],
           tyorglist:[],
           jznum:50,//加载数据
           formData: {   //下拉参数
                 pageIndex: 1,
                 pageSize: 20
            },
           bs:0,
           rdjblist:[],
           zxjblist:[],
           tblist:[],
           xzqh:[],
           tylblist:[],
           kzdwload:[],
           kzdwdata:[],
           kzbmdata:[],
           fydwdata:[],
           fydwload:[],
           blbmdata:[],
           zldxshow:false,
           hhdxshow:false,
        }
    },
    mounted(){
      this.$store.dispatch('getJbb');
      this.$store.dispatch('getFyjb');
     
    },
//    watch:{
//         $route:function(val){
          
//            this.reset();
//         },
//     },
    methods:{
       pageSizeChange(val) {
          this.pageSize=val;
          this.getList(this.CurrentPage, val, this.cx);
        },
        handleCurrentChange(val) {
          this.CurrentPage=val;
          this.getList(val, this.pageSize, this.cx);
        },
      getNone(t){
          switch (t) {
              case 0:
                  this.ashow0=!this.ashow0;
                  break;
              case 1:
                  this.ashow1=!this.ashow1;
                  break;
              case 2:
                  this.ashow2=!this.ashow2;
                  break;
              case 3:
                  this.ashow3=!this.ashow3;
                  break;
              case 4:
                  this.ashow4=!this.ashow4;
                  break;
              case 5:
                  this.ashow5=!this.ashow5;
                  break;
              default:
                  break;
          }

       },

         //人大单位远程搜索
      rdorgremoteMethod(quer){
          if (quer != '') {
             let p={
                'mc':quer,
                "lvl":this.rd.levelType,
                'lb':this.Global.RD,
            };
            this.$api.post(this.Global.aport1+'/org/queryAll',p,
                  r =>{
                      if(r.code==1){
                        this.rdorgload=r.data;
                        if(this.rdorgload.length>this.jznum){
                          this.bs=0;
                          this.rdorglist=this.rdorgload.slice(0,this.jznum);
                        }else{
                          this.bs=1;
                          this.rdorglist=this.rdorgload;
                        }
                      }
                  });
         }else{
            this.rdorglist=[];
       
         } 

        },
        //单位加载
       rdorgloadmore() {
          if(this.bs==1){return;}
           var srr= this.rdorgload;
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.rdorglist = srr.filter((item, index, arr) => {
              return index < num;
            });
        },
        //届别
       getJB(val,t){
           var lb='';
           var obj={};
            switch (t) {
                    case 1:
                       lb=this.Global.REPRESENTATIVE;
                       obj = this.rdorglist.find(item =>{
                            return item.orgid === val
                            });
                        break;
                    case 2:
                       lb=this.Global.CPPCMEMBER;
                       obj = this.zxorglist.find(item =>{
                            return item.orgid === val
                            });
                       break;
                    default:
                       break;
                    }
                
                if(obj){
                
                let p={
                    'level':obj.lvl,
                    'administrativeDivision':obj.xzqh,
                    'identityType':lb,
                    };
                  
                   this.$api.post(this.Global.jburl,p,
                       r =>{
                           if(t==1){
                                  this.rdjblist=ToArray(r.data);
                           }else if(t==2){
                                  this.zxjblist=ToArray(r.data);
                           }
                      
                       });
                    
                }

       },
       //团别
       getTB(val,jb){
              var obj={};
                 obj = this.rdorglist.find(item =>{
                  return item.orgid === val
                });
                if(obj){
                let p={
                    'level':obj.lvl,
                    'administrativeDivision':obj.xzqh,
                    'sessionType':jb
                  };
                  this.$api.post(this.Global.aport1+this.Global.tburl,p,
                  r =>{
                          if(r.code==1){
                            this.tblist=ToArray(r.data);
                                          
                          }
                   });
                }
       },
        //政协单位远程搜索
      zxorgremoteMethod(quer){
          if (quer != '') {
             let p={
                'mc':quer,
                "lvl":this.zx.levelType,
                'lb':this.Global.ZX,
            };
            this.$api.post(this.Global.aport1+'/org/queryAll',p,
                  r =>{
                      if(r.code==1){
                        this.zxorgload=r.data;
                        if(this.zxorgload.length>this.jznum){
                          this.bs=0;
                          this.zxorglist=this.zxorgload.slice(0,this.jznum);
                        }else{
                          this.bs=1;
                          this.zxorglist=this.zxorgload;
                        }
                      }
                  });
         }else{
            this.zxorglist=[];
       
         } 

        },
        //单位加载
       zxorgloadmore() {
          if(this.bs==1){return;}
           var srr= this.zxorgload;
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.zxorglist = srr.filter((item, index, arr) => {
              return index < num;
            });
        },
        //界别
        getJJB(val,jb){
            
            this.$set(this.zx,'circlesType','');
            if(jb=='' || jb==null || jb==undefined)
            { this.jjblist=[]; }
            
            var obj={};
                 obj = this.zxorglist.find(item =>{
                  return item.orgid === val
                });
            if(obj){
                let p={
                   'level':obj.lvl,
                    'administrativeDivision':obj.xzqh,
                    'sessionType':jb
                };
                this.$api.post(this.Global.jjburl,p,
                    r =>{
                    this.jjblist=ToArray(r.data);
                   });
            }
        },
       //特约单位远程搜索
      tyorgremoteMethod(quer){
          if (quer != '') {
             let p={
                'mc':quer,
                "lvl":this.ty.levelType,
                'lb':this.Global.FY,
            };
            this.$api.post(this.Global.aport1+'/org/queryAll',p,
                  r =>{
                      if(r.code==1){
                        this.tyorgload=r.data;
                        if(this.tyorgload.length>this.jznum){
                          this.bs=0;
                          this.tyorglist=this.tyorgload.slice(0,this.jznum);
                        }else{
                          this.bs=1;
                          this.tyorglist=this.tyorgload;
                        }
                      }
                  });
         }else{
            this.tyorglist=[];
       
         } 

        },
        //单位加载
       tyorgloadmore() {
          if(this.bs==1){return;}
           var srr= this.tyorgload;
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.tyorglist = srr.filter((item, index, arr) => {
              return index < num;
            });
        },
      //特约类别
      getTYLBList(val){
               var obj={};
                 obj = this.tyorglist.find(item =>{
                  return item.orgid === val
                });
                if(obj){
                    let p={
                        'level':obj.lvl,
                        'administrativeDivision':obj.xzqh,
                    };
                    this.$api.post(this.Global.tylburl,p,
                            r =>{
                                this.tylblist=ToArray(r.data);
                              
                    });
                }
            },
        //特约届别
         getTYJB(val,stype){

               this.$set(this.ty,'periodType','')
               if(stype=="" || stype==null || stype==undefined){
                  this.tyjblist=[]; 
               }
               var obj={};
                 obj = this.tyorglist.find(item =>{
                  return item.orgid === val
                });
                if(obj){
                    let pp={
                            'level':obj.lvl,
                            'administrativeDivision':obj.xzqh,
                            'specialType':stype,
                        };
                    
                    this.$api.post(this.Global.tyjburl,pp,
                       r =>{
                            this.tyjblist=ToArray(r.data)
                    });
                }
            },

       getrdclick(t,m,val){
         
           switch (t) {
              case 0:
                   this.rdshow[0]=!this.rdshow[0];
                   this.rdshow[1]=false;
                   this.rdshow[2]=false;
                   this.rdshow[3]=false;
                   this.rdshow[4]=false;
                   
                   this.$set(this.rd, 'cj', false);
                   this.$set(this.rd, 'sjrd', false);
                   this.$set(this.cx, 'cx_ry_rd_xjrd', false);
                   this.$set(this.rd, 'jb', false);
                   this.$set(this.rd, 'tb', false);

                   this.$set(this.cx, 'cx_ry_rd_levelType', '');    
                   this.$set(this.cx, 'cx_ry_rd_orgid', ''); 
                   this.$set(this.cx, 'cx_ry_rd_periodType', ''); 
                   this.$set(this.cx, 'cx_ry_rd_groupType', ''); 
                   this.rdorglist=[];
                   this.jblist=[];
                   this.tblist=[];
                   break;
                 
              case 1:
                   this.rdshow[1]=false;
                   if(m==1){
                       this.$set(this.cx, 'cx_ry_rd_levelType', '');
                      
                   }else if(val){
                        this.rdshow[1]=true;
                        
                   }
                   
                   this.rdshow[2]=false;
                   this.rdshow[3]=false;
                   this.rdshow[4]=false;
                   this.$set(this.rd, 'sjrd', false);
                   this.$set(this.cx, 'cx_ry_rd_xjrd', false);
                   this.$set(this.rd, 'jb', false);
                   this.$set(this.rd, 'tb', false);
                 
                   this.$set(this.cx, 'cx_ry_rd_orgid', ''); 
                   this.$set(this.cx, 'cx_ry_rd_periodType', ''); 
                   this.$set(this.cx, 'cx_ry_rd_groupType', ''); 
                   this.rdorglist=[];
                   this.rdjblist=[];
                   this.tblist=[];

                   break;
              case 2:

                   this.rdshow[2]=false;
                   if(m==1){
                      this.$set(this.cx, 'cx_ry_rd_orgid', '');
                      this.rdorglist=[];
                     
                   }else if(val){
                           this.rdshow[2]=true;
                    
                   }
                   
                   this.rdshow[3]=false;
                   this.rdshow[4]=false;
                   this.$set(this.rd, 'jb', false);
                   this.$set(this.rd, 'tb', false);

                   this.$set(this.cx, 'cx_ry_rd_periodType', ''); 
                   this.$set(this.cx, 'cx_ry_rd_groupType', ''); 
                   this.rdjblist=[];
                   this.tblist=[];
                   break;
              case 3:
                    this.rdshow[3]=false;
                  if(m==1){
                     this.$set(this.cx, 'cx_ry_rd_periodType', '');
                   
                  }else if(val){
                        this.rdshow[3]=true;
                    
                  }
                  
                   this.rdshow[4]=false;
                   this.$set(this.rd, 'tb', false);
                
                   this.$set(this.cx, 'cx_ry_rd_groupType', ''); 
                   break;
              case 4:
                   this.rdshow[4]=!this.rdshow[4];
                   this.$set(this.cx, 'cx_ry_rd_groupType', ''); 
                   break;
               default:
                   break;
           }
       },
       getzxclick(t,m,val){
           switch (t) {
              case 0:
                   this.zxshow[0]=!this.zxshow[0];
                   this.zxshow[1]=false;
                   this.zxshow[2]=false;
                   this.zxshow[3]=false;
                   this.zxshow[4]=false;
                   this.$set(this.zx, 'cj', false);
                   this.$set(this.zx, 'sjzx', false);
                   this.$set(this.cx, 'cx_ry_zx_xjzx', false);
                   this.$set(this.zx, 'jb', false);
                   this.$set(this.zx, 'jjb', false);

                   this.$set(this.cx, 'cx_ry_zx_levelType', ''); 
                   this.$set(this.cx, 'cx_ry_zx_orgid', ''); 
                   this.$set(this.cx, 'cx_ry_zx_periodType', ''); 
                   this.$set(this.cx, 'cx_ry_zx_circlesType', ''); 
                   this.zxorglist=[];
                   this.zxjblist=[];
                   this.jjblist=[];
                   break;
              case 1:
                  this.zxshow[1]=false;
                  if(m==1){
                       this.$set(this.cx, 'cx_ry_zx_levelType', '');
                       
                  }else if(val){
                       this.zxshow[1]=true;
                  }
                   
                   this.zxshow[2]=false;
                   this.zxshow[3]=false;
                   this.zxshow[4]=false;
                   this.$set(this.zx, 'sjzx', false);
                   this.$set(this.cx, 'cx_ry_zx_xjzx', false);
                   this.$set(this.zx, 'jb', false);
                   this.$set(this.zx, 'jjb', false);
                   
                   this.$set(this.cx, 'cx_ry_zx_orgid', ''); 
                   this.$set(this.cx, 'cx_ry_zx_periodType', ''); 
                   this.$set(this.cx, 'cx_ry_zx_circlesType', ''); 
                   this.zxorglist=[];
                   this.zxjblist=[];
                   this.jjblist=[];
                   break;
              case 2:
                     this.zxshow[2]=false;
                    if(m==1){
                        this.$set(this.cx, 'cx_ry_zx_orgid', ''); 
                        this.zxorglist=[];
                     
                    }else if(val){
                        this.zxshow[2]=true;
                    }
                   this.zxshow[3]=false;
                   this.zxshow[4]=false;
                   this.$set(this.zx, 'jb', false);
                   this.$set(this.zx, 'jjb', false);
                   
                   this.$set(this.cx, 'cx_ry_zx_periodType', ''); 
                   this.$set(this.cx, 'cx_ry_zx_circlesType', ''); 
                   
                   this.zxjblist=[];
                   this.jjblist=[];
                   break;
              case 3:
                      this.zxshow[3]=false;
                   if(m==1){
                      this.$set(this.cx, 'cx_ry_zx_periodType', '');
                  
                   }else if(val){
                    this.zxshow[3]=true;
                   }
                   
                   this.zxshow[4]=false;
                   this.$set(this.zx, 'jjb', false);
                  
                   this.$set(this.zx, 'cx_ry_zx_circlesType', ''); 
                   this.jjblist=[];
                   break;
              case 4:
                   this.zxshow[4]=!this.zxshow[4];
                    this.$set(this.zx, 'cx_ry_zx_circlesType', ''); 
                   break;
               default:
                   break;
           }
       },
       gettyclick(t,m,val){
           switch (t) {
              case 0:
                   this.tyshow[0]=!this.tyshow[0];
                   this.tyshow[1]=false;
                   this.tyshow[2]=false;
                   this.tyshow[3]=false;
                   this.tyshow[4]=false;
                   this.$set(this.ty, 'cj', false);
                   this.$set(this.ty, 'sjfy', false);
                   this.$set(this.cx, 'cx_ry_ty_xjfy', false);
                   this.$set(this.ty, 'jb', false);
                   this.$set(this.ty, 'tylb', false);

                   this.$set(this.cx, 'cx_ry_ty_levelType', ''); 
                   this.$set(this.cx, 'cx_ry_ty_orgid', ''); 
                   this.$set(this.cx, 'cx_ry_ty_specialType', ''); 
                   this.$set(this.cx, 'cx_ry_ty_periodType', ''); 
                   this.tyorglist=[];
                   this.tyjblist=[];
                   this.tylblist=[];
                   break;
              case 1:
                    this.tyshow[1]=false;
                  if(m==1){
                    this.$set(this.cx, 'cx_ry_ty_levelType', '');
                  
                  }else if(val){
                    this.tyshow[1]=true;
                  }
                   this.tyshow[2]=false;
                   this.tyshow[3]=false;
                   this.tyshow[4]=false;
                   this.$set(this.ty, 'sjfy', false);
                   this.$set(this.cx, 'cx_ry_ty_xjfy', false);
                   this.$set(this.ty, 'jb', false);
                   this.$set(this.ty, 'tylb', false);

                   this.$set(this.cx, 'cx_ry_ty_orgid', ''); 
                   this.$set(this.cx, 'cx_ry_ty_specialType', ''); 
                   this.$set(this.cx, 'cx_ry_ty_periodType', ''); 
                   this.tyorglist=[];
                   this.tyjblist=[];
                   this.tylblist=[];
                   break;
              case 2:
                    this.tyshow[2]=false;
                  if(m==1){
                      this.$set(this.cx, 'cx_ry_ty_orgid', ''); 
                      this.tyorglist=[];
                    
                  }else if(val){
                      this.tyshow[2]=true;
                  }

                   this.tyshow[3]=false;
                   this.tyshow[4]=false;
                   this.$set(this.ty, 'jb', false);
                   this.$set(this.ty, 'tylb', false);
                 
                   this.$set(this.cx, 'cx_ry_ty_specialType', ''); 
                   this.$set(this.cx, 'cx_ry_ty_periodType', ''); 
                  
                   
                   this.tylblist=[];
                   this.tyjblist=[];
                   break;
              case 3:
                   this.tyshow[3]=false;
                  if(m==1){
                       this.$set(this.cx, 'cx_ry_ty_specialType', ''); 
                      
                  }else if(val){
                       this.tyshow[3]=true;
                  }
                   
                   this.tyshow[4]=false;
                   this.$set(this.ty, 'jb', false);
                   this.$set(this.cx, 'cx_ry_ty_periodType', '');
                   this.tyjblist=[];
                   
                   break;
              case 4:
                   this.tyshow[4]=!this.tyshow[4];
                   this.$set(this.cx, 'cx_ry_ty_periodType', '');
                   break;
               default:
                   break;
           }
       },
       //时间范围
       getsjclick(t,m,val){
         switch (t) {
             case 0:
                 this.sjshow0=!this.sjshow0;
                 this.sjshow1=false;
                 this.$set(this.sj, 'ksrq', false);
                 this.$set(this.sj, 'jsrq', false);

                 this.$set(this.cx, 'cx_ll_sj_ksrq', '');
                 this.$set(this.cx, 'cx_ll_sj_jsrq', '');
                 break;
             case 1:
               
                   this.sjshow1=false;
                 if(m==1){
                   this.$set(this.cx, 'cx_ll_sj_ksrq', '');
                   
                 }else{
                     if(val){          
                        this.sjshow1=true; 
                     }
                     
                 }
               
                 this.$set(this.sj, 'jsrq', false);
                 this.$set(this.cx, 'cx_ll_sj_jsrq', '');
                 break;
             case 2:
                 this.$set(this.cx, 'cx_ll_sj_jsrq', '');
                 break;
             default:
                 break;
         }
       },
       //开展单位
        getkzdwclick(t,m,val){
           switch (t) {
              case 0:
                   this.kzdwshow[0]=!this.kzdwshow[0];
                   this.kzdwshow[1]=false;
                   this.kzdwshow[2]=false;
                   this.kzdwshow[3]=false;
                   this.kzdwshow[4]=false;


                   this.$set(this.kzdw, 'fyjb', false);
                   this.$set(this.kzdw, 'fydw', false);
                   this.$set(this.cx, 'cx_ll_kz_xjfy', false);
                   this.$set(this.kzdw, 'kzbm', false);
                   //this.$set(this.kzdw, 'yld', false);
                   this.$set(this.cx,'cx_ll_kz_levelType','')
                   this.$set(this.cx,'cx_ll_kz_developmentUnitId','')
                   this.$set(this.cx,'cx_ll_kz_devDepartmentId','')
                   this.kzdwdata=[];
                   this.kzbmdata=[];
                  
                   
                   break;
              case 1:
                   this.kzdwshow[1]=false;
                  if(m==1){
                        this.$set(this.cx,'cx_ll_kz_levelType','')
                       
                  }else if(val){
                        this.kzdwshow[1]=true;
                  }
                   
                   this.kzdwshow[2]=false;
                   this.kzdwshow[3]=false;
                   this.kzdwshow[4]=false;
                   this.$set(this.kzdw, 'fydw', false);
                   this.$set(this.cx, 'cx_ll_kz_xjfy', false);
                   this.$set(this.kzdw, 'kzbm', false);
                //    this.$set(this.kzdw, 'yld', false);
                   
                   this.$set(this.cx,'cx_ll_kz_developmentUnitId','')
                   this.$set(this.cx,'cx_ll_kz_devDepartmentId','')
                   this.kzdwdata=[];
                   this.kzbmdata=[];
                   break;
              case 2:
                   this.kzdwshow[2]=false;
                  if(m==1){
                     this.$set(this.cx,'cx_ll_kz_developmentUnitId','')
                     this.kzdwdata=[];
                  }else if(val){
                      this.kzdwshow[2]=true;
                  }
                   
                   this.kzdwshow[3]=false;
                   this.kzdwshow[4]=false;
                   this.$set(this.kzdw, 'kzbm', false);
                //    this.$set(this.kzdw, 'yld', false);
                 
                   this.$set(this.cx,'cx_ll_kz_devDepartmentId','')
                   
                   this.kzbmdata=[];
                   break;
              case 3:
                   this.kzdwshow[3]=!this.kzdwshow[3];
                   this.kzdwshow[4]=false;
                //    this.$set(this.kzdw, 'yld', false);
                   this.$set(this.cx,'cx_ll_kz_devDepartmentId','')
                 
                   break;
              case 4:
                   this.kzdwshow[4]=!this.kzdwshow[4];
                   break;
               default:
                   break;
           }
       },
       //办理单位
        getbldwclick(t,m,val){
           switch (t) {
              case 0:
                   this.bldwshow[0]=!this.bldwshow[0];
                   this.bldwshow[1]=false;
                   this.bldwshow[2]=false;
                   this.bldwshow[3]=false;
                  
                   this.$set(this.bldw, 'fyjb', false);
                   this.$set(this.bldw, 'fydw', false);
                   this.$set(this.cx, 'cx_gzya_bl_xjfy', false);
                   this.$set(this.bldw, 'blbm', false);
                   this.$set(this.cx,'cx_gzya_bl_levelType','')
                   this.$set(this.cx,'cx_gzya_bl_undertakeUnitId','')
                   this.$set(this.cx,'cx_gzya_bl_undertakeDepartmentId','')
                   this.fydwdata=[];
                   this.blbmdata=[];
                   
                   
                   break;
              case 1:
                    this.bldwshow[1]=false;
                   if(m==1){
                       this.$set(this.cx,'cx_gzya_bl_levelType','')
                     
                   }else if(val){
                       this.bldwshow[1]=true;
                   }
                   
                   this.bldwshow[2]=false;
                   this.bldwshow[3]=false;
                   this.$set(this.bldw, 'fydw', false);
                   this.$set(this.cx, 'cx_gzya_bl_xjfy', false);
                   this.$set(this.bldw, 'blbm', false);
            
                   this.$set(this.cx,'cx_gzya_bl_undertakeUnitId','')
                   this.$set(this.cx,'cx_gzya_bl_undertakeDepartmentId','')
                   this.fydwdata=[];
                   this.blbmdata=[];
                   break;
              case 2:
                    this.bldwshow[2]=false;
                   if(m==1){
                      this.$set(this.cx,'cx_gzya_bl_undertakeUnitId','')
                   }else if(val){
                     this.bldwshow[2]=true;
                   }
                   
                   this.bldwshow[3]=false;
                   this.$set(this.bldw, 'blbm', false);
                   this.$set(this.cx,'cx_gzya_bl_undertakeDepartmentId','')
                   this.blbmdata=[];
                   break;
              case 3:
                   this.bldwshow[3]=!this.bldwshow[3];
                    this.$set(this.cx,'cx_gzya_bl_undertakeDepartmentId','')
                   break;
             
               default:
                   break;
           }
       },
           //开展单位远程搜索
        kzdwremoteMethod(quer){
          if (quer != '') {
           let p={
              'mc':quer,
              'orglvl':this.cx.cx_ll_kz_levelType
           };
          this.$api.post(this.Global.aport1+'/org/getDevelopOrg',p,
                r =>{
                    if(r.code==1){
                      this.kzdwdata=r.data;
                      if(this.kzdwdata.length>this.jznum){
                        this.bs=0;
                        this.kzdwdata=this.kzdwdata.slice(0,this.jznum);
                      }else{
                        this.bs=1;
                        this.kzdwdata=this.kzdwdata;
                      }
                    }
                });
          
          }else{
            this.kzdwdata=[];
          }
        },
            //开展单位加载
        kzloadmore() {
            if(this.bs==1){return;}
            var srr= this.kzdwload;
            this.formData.pageIndex++;
            let num = this.formData.pageIndex * this.formData.pageSize;
            this.kzdwdata =srr.filter((item, index, arr) => {
                return index < num;
            });
        
        },
        //开展部门
        getkzbm(orgid){
          
          this.$set(this.kzdw,'devDepartmentId','');
          if(orgid=='' || orgid==null || orgid==undefined){
             this.kzbmdata=[];
             return;
          }
           let p={
            "orgId":orgid
          };
          this.$api.get(this.Global.aport1+'/org/getSubDept',p,
              r =>{
                  if(r.code==1){
                   
                    this.kzbmdata=r.data;
                  }
               });
        },
         //法院单位远程搜索
        fydwremoteMethod(quer){
          if (quer != '') {
             let p={
                'name':quer,
            };
            this.$api.get(this.Global.aport1+'/org/getCourtOrg',p,
                  r =>{
                      if(r.code==1){
                        this.fydwload=r.data;
                        if(this.fydwload.length>this.jznum){
                          this.bs=0;
                          this.fydwdata=this.fydwload.slice(0,this.jznum);
                        }else{
                          this.bs=1;
                          this.fydwdata=this.fydwload;
                        }
                      }
                  });
         }else{
            this.fydwdata=[];
         } 

        },
        //法院单位加载
        fyloadmore() {
          if(this.bs==1){return;}
           var srr= this.fydwload;
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.fydwdata = srr.filter((item, index, arr) => {
              return index < num;
            });
        },
        //办理部门
       getblbm(orgid){
         this.$set(this.bldw,'undertakeDepartmentId','');
          if(orgid=='' || orgid==null || orgid==undefined){
             this.kzbmdata=[];
             return;
          }
           let p={
            "orgId":orgid
          };
          this.$api.get(this.Global.aport1+'/org/getSubDept',p,
              r =>{
                  if(r.code==1){
                   
                    this.blbmdata=r.data;
                  }
               });
       },

         //得到行政区划
        getLevel(l,v,t){
                
                    if(t==1){

                        this.$set(this.cx,'cx_ll_dd_city','');
                        this.$set(this.cx,'cx_ll_dd_county','');
                        this.shilist=[];
                        this.xianlist=[];
                    }else if(t==2){
                        this.$set(this.cx,'cx_ll_dd_county','');
                        this.xianlist=[];
                    }
                
                    let p={
                        'code':v,
                        'level':l
                    };
                    this.$api.get(this.Global.aport4+'/service/getxzqh',p,
                    r =>{
                            if(r.code==1){
                                 if(t==1){
                                        this.shilist=r.data;
                                 }else if(t==2){
                                       this.xianlist=r.data;
                                 }else{
                                        this.shenglist=r.data;
                                 }
                               
                                  
                            }
                    });
        },
        
        //活动地点
        gethdddclick(t,m,val){
           switch (t) {
              case 0:
                   this.hdddshow[0]=!this.hdddshow[0];
                   this.hdddshow[1]=false;
                   this.hdddshow[2]=false;
                   this.hdddshow[3]=false;
                   this.$set(this.hddd, 'sheng', false);
                   this.$set(this.hddd, 'shi', false);
                   this.$set(this.hddd, 'qx', false);
                   this.$set(this.cx,'cx_ll_dd_province','');
                   this.$set(this.cx,'cx_ll_dd_city','');
                   this.$set(this.cx,'cx_ll_dd_county','');
                   this.shenglist=[];
                   this.shilist=[];
                   this.xianlist=[];

                   break;
              case 1:
                   this.hdddshow[1]=false;
                  if(m==1){
                    this.$set(this.cx,'cx_ll_dd_province','');
                  }else if(val){
                       this.hdddshow[1]=true;
                  } 
                    
                  
                   this.hdddshow[2]=false;
                   this.hdddshow[3]=false;
                    this.$set(this.hddd, 'shi', false);
                   this.$set(this.hddd, 'qx', false);
                   this.getLevel('1');
                   this.$set(this.cx,'cx_ll_dd_city','');
                   this.$set(this.cx,'cx_ll_dd_county','');
                   this.shilist=[];
                   this.xianlist=[];
                   
                   break;
              case 2:
                  this.hdddshow[2]=false;
                  if(m==1){
                        this.$set(this.cx,'cx_ll_dd_city','');
                     
                  }else if(val){
                     
                       this.hdddshow[2]=true;
                  }
                  
                   this.hdddshow[3]=false;
                   this.$set(this.hddd, 'qx', false);
                   this.$set(this.cx,'cx_ll_dd_county','');
                   this.xianlist=[];
                   break;
              case 3:
                   this.hdddshow[3]=!this.hdddshow[3];
                   this.$set(this.cx,'cx_ll_dd_county','');
                   break;
             
               default:
                   break;
           }
       },
         //联络活动
        getllhdclick(t){
           switch (t) {
              case 0:
                   this.llhdshow[0]=!this.llhdshow[0];
                   this.llhdshow[1]=false;
                   this.$set(this.llhd, 'hdfl', false);
                   this.$store.dispatch('getHdlx');
                   this.$set(this.cx, 'cx_ll_ll_activityType', '');
                   break;
              case 1:
                   this.llhdshow[1]=!this.llhdshow[1];
                   this.$set(this.cx, 'cx_ll_ll_activityType', '');
                   break;
             
               default:
                   break;
           }
       },
         //关注案件
        getgzajclick(t){
           switch (t) {
              case 0:
                   this.gzajshow[0]=!this.gzajshow[0];
                   this.gzajshow[1]=false;
                   this.$set(this.gzaj, 'ajlx', false);
                   this.$store.dispatch('getAjlx');
                   this.$set(this.cx, 'cx_gz_caseclass', '');
                   break;
              case 1:
                   this.gzajshow[1]=!this.gzajshow[1];
                   this.$set(this.cx, 'cx_gz_caseclass', '');
                   break;
             
               default:
                   break;
           }
       },
         //议案建议
        getyajyclick(t){
           switch (t) {
              case 0:
                   this.yajyshow[0]=!this.yajyshow[0];
                   this.yajyshow[1]=false;
                   this.$set(this.yajy, 'yalx', false);
                   this.$store.dispatch('getYalx');
                   this.$set(this.cx, 'cx_ya_proposalType', '');
                   break;
              case 1:
                   this.yajyshow[1]=!this.yajyshow[1];
                   this.$set(this.cx, 'cx_ya_proposalType', '');
                   break;
             
               default:
                   break;
           }
       },
       getTJCOL(t){
 
          this.zldxshow=true;
          this.zlshow0=false;
          this.zlshow1=false;
          this.zlshow2=false;
          this.zlshow3=false;
           switch (this.tjnum) {
               case 0:
               if(t==1){//对象  
                   if(this.tjfsradio=='tj_ll_cs' || this.tjfsradio=='tj_ryll_rc')
                   {
                    this.pp.show10=true;
                    this.pp.show11=true;
                    this.pp.show12=false;
                    this.pp.show13=false;
                   }else if(this.tjfsradio=='tj_gz_cs' || this.tjfsradio=='tj_rygz_rc'){
                    this.pp.show10=true;
                    this.pp.show11=false;
                    this.pp.show12=true;
                    this.pp.show13=false;
                   }else if(this.tjfsradio=='tj_ya_cs' || this.tjfsradio=='tj_ryya_rc'){
                    this.pp.show10=true;
                    this.pp.show11=false;
                    this.pp.show12=false;
                    this.pp.show13=true;
                   }
                   else{
                    this.pp.show10=true;
                    this.pp.show11=true;
                    this.pp.show12=true;
                    this.pp.show13=true;
                    }
                }else if(t==2){//活动
                    this.pp.show10=true;
                    this.pp.show11=true;
                    this.pp.show12=false;
                    this.pp.show13=false;
                }else if(t==3){//关注案件
                    this.pp.show10=true;
                    this.pp.show11=false;
                    this.pp.show12=true;
                    this.pp.show13=false;
                }else if(t==4){//议案建议
                    this.pp.show10=true;
                    this.pp.show11=false;
                    this.pp.show12=false;
                    this.pp.show13=true;
                }
               break;
            case 1:
                    this.pp.show10=true;
                    this.pp.show11=true;
                    this.pp.show12=false;
                    this.pp.show13=false;
               break;
            case 2:
                    this.pp.show10=true;
                    this.pp.show11=false;
                    this.pp.show12=false;
                    this.pp.show13=true;
               break;
            case 3:
                    this.pp.show10=true;
                    this.pp.show11=false;
                    this.pp.show12=true;
                    this.pp.show13=false;
               break;
            case 4:
                    this.pp.show10=false;
                    this.pp.show11=true;
                    this.pp.show12=false;
                    this.pp.show13=true;
               break;
            case 5:
                    this.pp.show10=false;
                    this.pp.show11=true;
                    this.pp.show12=true;
                    this.pp.show13=false;
               break;
            case 6:
                    this.pp.show10=true;
                    this.pp.show11=true;
                    this.pp.show12=false;
                    this.pp.show13=false;
               break;
            case 7:
                    this.pp.show10=true;
                    this.pp.show11=false;
                    this.pp.show12=false;
                    this.pp.show13=true;
               break;
            case 8:
                    this.pp.show10=true;
                    this.pp.show11=false;
                    this.pp.show12=true;
                    this.pp.show13=false;
               break;
               default:
                   break;
           }
                
       },
       //输出项目
       getscdx(t){
           this.zldxshow=false;
           this.zlradio='';
        switch (t) {
            case 0:
                this.hrshow0=!this.hrshow0
                this.hrshow1=false;
                this.hrshow2=false;
                this.hrshow3=false;
                this.hrshow4=false;
                this.hrshow5=false;
                this.hrshow6=false;
                this.hrshow7=false;
                this.hrshow8=false;
                this.hrshow9=false;
                this.hrshow10=false;
                this.hrshow11=false;
                this.hrshow12=false;
                this.hhdw={};
                break;
            case 1:
                this.hrshow1=!this.hrshow1
                this.hrshow2=false;
                this.hrshow3=false;
                this.getTJCOL(1);
              
                this.hhzx={};
                if(this.rdinfo.length==0){
                   let p={
                      'itemType':'0301000012'
                    };
                    this.$api.post(this.Global.aport2+'/AllSearchController/getConfigItem',p,
                        r =>{
                            this.rdinfo=r.data;
                    });
                 }
                break;
            case 2:
                this.hrshow1=false;
                this.hrshow2=!this.hrshow2
                this.hrshow3=false;
                this.getTJCOL(1);
                this.hhzx={}
                if(this.zxinfo.length==0){
                let p2={
                      'itemType':'0301000013'
                    };
                    this.$api.post(this.Global.aport2+'/AllSearchController/getConfigItem',p2,
                        r =>{
                            this.zxinfo=r.data;
                    });
                 }
                break;
            case 3:
                this.hrshow1=false;
                this.hrshow2=false;
                this.hrshow3=!this.hrshow3
                this.hhzx={}
                this.getTJCOL(1);
                if(this.tyinfo.length==0){
                  let p3={
                      'itemType':'0301000014'
                    };
                    this.$api.post(this.Global.aport2+'/AllSearchController/getConfigItem',p3,
                        r =>{
                            this.tyinfo=r.data;
                    });
                  }
                break;
            case 4:
                this.hrshow0=false
                this.hrshow1=false;
                this.hrshow2=false;
                this.hrshow3=false;
                this.hrshow4=!this.hrshow4;
                this.hrshow5=false;
                this.hrshow6=false;
                this.hrshow7=false;
                this.hrshow8=false;
                this.hrshow9=false;
                this.hrshow10=false;
                this.hrshow11=false;
                this.hrshow12=false;
                

                this.hhdw={};
                break;
            case 5:
                this.hrshow5=!this.hrshow5;
                this.hrshow6=false;
                this.hrshow7=false;
                this.hhzx={}
                this.getTJCOL(2);
               
                if(this.dwinfo1.length==0){
                let p5={
                      'itemType':'0301000015'
                    };
                    this.$api.post(this.Global.aport2+'/AllSearchController/getConfigItem',p5,
                        r =>{
                            this.dwinfo1=r.data;
                    });
                }
                break;
            case 6:
                this.hrshow5=false
                this.hrshow6=!this.hrshow6;
                this.hrshow7=false;
                this.hhzx={}
                this.getTJCOL(3);
                
                break;
            case 7:
                this.hrshow5=false;
                this.hrshow6=false;
                this.hrshow7=!this.hrshow7;
                this.hhzx={}
                this.getTJCOL(4);
                break;
            case 8:
                this.hrshow0=false;
                this.hrshow1=false;
                this.hrshow2=false;
                this.hrshow3=false;
                this.hrshow4=false;
                this.hrshow5=false;
                this.hrshow6=false;
                this.hrshow7=false;
                this.hrshow8=!this.hrshow8;
                this.hrshow9=false;
                this.hrshow10=false;
                this.hrshow11=false;
                this.hrshow12=false;
             
                this.hhzx={}
                this.getTJCOL(2);
                
               if(this.dwinfo4.length==0){
                let p8={
                      'itemType':'0301000018'
                    };
                    this.$api.post(this.Global.aport2+'/AllSearchController/getConfigItem',p8,
                        r =>{
                            this.dwinfo4=r.data;
                    });
                }
                break;
            case 9:
                this.hrshow0=false;
                this.hrshow1=false;
                this.hrshow2=false;
                this.hrshow3=false;
                this.hrshow4=false;
                this.hrshow5=false;
                this.hrshow6=false;
                this.hrshow7=false;
                this.hrshow8=false;
                this.hrshow9=!this.hrshow9;
                this.hrshow10=false;
                this.hrshow11=false;
                this.hrshow12=false;
                this.hhzx={}

                 this.getTJCOL(3);
                break;
            // case 10:
            //     this.hrshow10=!this.hrshow10;
            //     this.hhzx={}
            //     break;
            case 11:
                this.hrshow0=false;
                this.hrshow1=false;
                this.hrshow2=false;
                this.hrshow3=false;
                this.hrshow4=false;
                this.hrshow5=false;
                this.hrshow6=false;
                this.hrshow7=false;
                this.hrshow8=false;
                this.hrshow9=false;
                this.hrshow10=false;
                this.hrshow11=!this.hrshow11;
                this.hrshow12=false;
                this.hhzx={}
                 this.getTJCOL(4);

                break;
            // case 12:
            //     this.hrshow12=!this.hrshow12;
            //     this.hhzx={}
            //     this.zlshow0=false;
            //     this.zlshow1=false;
            //     this.zlshow2=false;
            //     this.zlshow3=false;
            //     this.pp.show10=true;
            //     this.pp.show11=false;
            //     this.pp.show12=false;
            //     this.pp.show13=false;
            //     break;
            default:
                break;
        }
         
       },
       getzldx(t){
        
         switch (t) {
             case 0:
                 this.zlshow0=!this.zlshow0;
                 this.zlshow1=false;
                 this.zlshow2=false;
                 this.zlshow3=false;
                 this.zl={}

                 if(this.zlinfo1.length==0){
                      let p={
                      'itemType':'0301000021'
                    };
                    this.$api.post(this.Global.aport2+'/AllSearchController/getConfigItem',p,
                        r =>{
                            this.zlinfo1=r.data;
                    });
                 }
                 break;
             case 1:
                 this.zlshow0=false;
                 this.zlshow1=!this.zlshow1;
                 this.zlshow2=false;
                 this.zlshow3=false;
                 this.zl={}
                  if(this.zlinfo2.length==0){
                      let p={
                         'itemType':'0301000022'
                       };
                    this.$api.post(this.Global.aport2+'/AllSearchController/getConfigItem',p,
                        r =>{
                            this.zlinfo2=r.data;
                    });
                 }
                 break;
            case 2:
                 this.zlshow0=false;
                 this.zlshow1=false;
                 this.zlshow2=!this.zlshow2;
                 this.zlshow3=false;
                 this.zl={}
                //  if(this.zlinfo3.length==0){
                //       let p={
                //          'type':'0246000011'
                //        };
                //     this.$api.post(this.Global.aport2+'/CaseHomeController/getCaseListInfo',p,
                //         r =>{
                //             this.zlinfo3=r.data;
                //     });
                //  }
                 break;
            case 3:
                 this.zlshow0=false;
                 this.zlshow1=false;
                 this.zlshow2=false;
                 this.zlshow3=!this.zlshow3;
                 this.zl={}
                //   if(this.zlinfo4.length==0){
                //       let p={
                //          'type':'0246000012'
                //        };
                //     this.$api.post(this.Global.aport2+'/CaseHomeController/getCaseListInfo',p,
                //         r =>{
                //             this.zlinfo4=r.data;
                //     });
                //  }
                 break;

         
             default:
                 break;
         }  
       },
       hhdwreset(){
           this.hradio='';
           this.hhdw={};
           this.hhzx={};
           this.hrshow0=false;
           this.hrshow1=false;
           this.hrshow2=false;
           this.hrshow3=false;
           this.hrshow4=false;
           this.hrshow5=false;
           this.hrshow6=false;
           this.hrshow7=false;
           this.hrshow8=false;
           this.hrshow9=false;
           this.hrshow10=false;
           this.hrshow11=false;
           this.hrshow12=false;
           this.pp.show10=false;
           this.pp.show11=false;
           this.pp.show12=false;
           this.pp.show13=false;
       },
       getTJNUM(t){
              this.pp.show1=false;//对象
              this.pp.show2=false;//单位
              this.pp.show3=false;//联络活动
              this.pp.show4=false;//关注案件
              this.pp.show5=false;//议案建议
              this.pp.show6=false;//单位（联络活动）
              this.pp.show7=false;//单位（关注案件）
              this.pp.show8=false;//单位（议案建议）
             
        switch (this.tjnum) {
            case 0://对象  
             if(t==1){ //统计人数
                    this.pp.show1=true;
                    this.pp.show2=true;
                    this.pp.show3=true;
                    this.pp.show4=true;
                    this.pp.show5=true;  
                    this.pp.show6=true;
                    this.pp.show7=true;
                    this.pp.show8=true;
              }else if(t==2){ //联络活动件数
                    this.pp.show1=true;
                    this.pp.show2=true;
                    this.pp.show3=true;
                    this.pp.show6=true;//单位（联络活动）

              }else if(t==3){//关注案件件数
                    this.pp.show1=true;
                    this.pp.show2=true;
                    this.pp.show4=true;
                    this.pp.show7=true;//单位（关注案件）
              }else if(t==4){//议案建议件数
                    this.pp.show1=true;
                    this.pp.show2=true;
                    this.pp.show5=true;
                    this.pp.show8=true;//单位（关注案件）
              }else if(t==5){//参加活动人次
                     this.pp.show1=true;
                    this.pp.show2=true;
                    this.pp.show3=true;
                    this.pp.show6=true;//单位（联络活动）
              }else if(t==6){//关注案件人次
                     this.pp.show1=true;
                    this.pp.show2=true;
                    this.pp.show4=true;
                    this.pp.show7=true;//单位（关注案件）
              }else if(t==7){//提出建议人次
                    this.pp.show1=true;
                    this.pp.show2=true;
                    this.pp.show5=true;
                    this.pp.show8=true;//单位（建议）
              }
              
                break;
            case 1://对象和活动
             
                    this.pp.show1=true;
                    this.pp.show2=true;
                    this.pp.show3=true;
                    this.pp.show6=true;//单位（联络活动）

                break;
            case 2://对象和议案
                    this.pp.show1=true;
                    this.pp.show2=true;
                    this.pp.show5=true;
                    this.pp.show8=true;//单位（建议）
                break;
            case 3://对象和关注
                    this.pp.show1=true;
                    this.pp.show2=true;
                    this.pp.show4=true;
                    this.pp.show7=true;//单位（关注）
                break;
            case 4://活动和议案
               
                    this.pp.show2=true;//单位
                    this.pp.show3=true;//联络活动
                    this.pp.show5=true;//议案建议
                    this.pp.show6=true;//单位（联络活动）
                    this.pp.show8=true;//单位（议案建议）
                break;
            case 5://活动和关注
                  
                    this.pp.show2=true;//单位
                    this.pp.show3=true;//联络活动
                    this.pp.show4=true;//关注案件
                    this.pp.show6=true;//单位（联络活动）
                    this.pp.show7=true;//单位（关注案件）
                break;
            case 6://活动 
                    this.pp.show1=true;//对象
                    this.pp.show2=true;//单位
                    this.pp.show3=true;//联络活动
                    this.pp.show6=true;//单位（联络活动）
                break;
            case 7://议案
                    this.pp.show1=true;//对象
                    this.pp.show2=true;//单位
                    this.pp.show5=true;//议案建议
                    this.pp.show8=true;//单位（议案建议）
                break;
            case 8://关注
                    this.pp.show1=true;//对象
                    this.pp.show2=true;//单位
                    this.pp.show4=true;//关注案件
                    this.pp.show7=true;//单位（关注案件）
                break;
            default:
                break;
        }
         
       },
       gethhdx(t){
             this.zldxshow=false;
             this.hhdxshow=true;
             this.hradio='';
         switch (t) {
            case 'tj_ry_rs'://统计人数
                 this.getTJNUM(1);
                 break;
            case 'tj_ll_cs'://联络活动件数
                 this.getTJNUM(2);
                 break;
            case 'tj_gz_cs'://关注案件件数
                 this.getTJNUM(3);
                 break;
            case 'tj_ya_cs'://议案建议件数
                 this.getTJNUM(4);
                 break;
            case 'tj_ryll_rc'://参加活动人次
                 this.getTJNUM(5);
                 break;
            case 'tj_rygz_rc'://关注案件人次
                 this.getTJNUM(6);
                 break;
            case 'tj_ryya_rc'://提出建议人次
                this.getTJNUM(7);
                 break;
             default:
                 break;
         }
         this.hhdwreset();
       },
       getNull(val,t){
        
          if(val==null || val==undefined || val==''){
              switch (t) {
                  case 1:
                      this.rdorglist=[];
                      this.rdjblist=[];
                      this.tblist=[];
                      this.$set(this.rd,'periodType','');
                      this.$set(this.rd,'groupType','');
                      break;
                   case 2:
                      this.rdorglist=[];
                      this.zxjblist=[];
                      this.jjblist=[];
                      this.$set(this.zx,'periodType','');
                      this.$set(this.zx,'circlesType','');
                      break;
                   case 3:
                    this.tyorglist=[];
                    this.tyjblist=[];
                    this.tylblist=[];
                    this.$set(this.ty,'periodType','');
                    this.$set(this.ty,'specialType','');
                    break;
                 case 4:
                    this.kzdwdata=[];
                    this.kzbmdata=[];
                    this.$set(this.kzdw,'devDepartmentId','');
                    break;
               case 5:
                    this.fydwdata=[];
                    this.blbmdata=[];
                    this.$set(this.bldw,'undertakeDepartmentId','');
                    break;
                  default:
                    break;
              }
          }
       },
       //分支判断
       getISXS(){
                this.yashow=false;
                this.gzshow=false;
                this.blshow=false;
                this.hdshow0=false;
                this.hdshow1=false;
                this.hdshow2=false;
                this.hdshow3=false;
                this.dxshow0=false;
                this.dxshow1=false;
                this.dxshow2=false;
                this.isall=false;
                this.hhdxshow=false;
                this.zldxshow=false;

                this.tjfsradio='';
           //一。对象和活动   (联络活动件数、统计人数、参数活动人次)
          if((this.rdchecked || this.zxchecked || this.tychecked)
            && (this.sjchecked || this.hdddchecked || this.llhdchecked || this.kzdwchecked)){

                this.yashow=true;
                this.gzshow=true;
                this.blshow=true;
                this.Countfs=[
                    {name:'统计人数',value:'tj_ry_rs',istrue:false},
                    {name:'联络活动件数',value:'tj_ll_cs',istrue:false},
                    {name:'关注案件件数',value:'tj_gz_cs',istrue:true},
                    {name:'议案建议件数',value:'tj_ya_cs',istrue:true},
                    {name:'参加活动人次',value:'tj_ryll_rc',istrue:false},
                    {name:'关注案件人次',value:'tj_rygz_rc',istrue:true},
                    {name:'提出建议人次',value:'tj_ryya_rc',istrue:true},
                ]
                this.tjnum=1;
            }
           //二。对象和议案 (统计人数、议案建议件数、提出建议人次)
           else  if((this.rdchecked || this.zxchecked || this.tychecked)
            && (this.yajychecked || this.bldwchecked)){

                this.gzshow=true;
                this.hdshow0=true;
                this.hdshow1=true;
                this.hdshow2=true;
                this.hdshow3=true;
                this.Countfs=[
                  
                    {name:'统计人数',value:'tj_ry_rs',istrue:false},
                    {name:'联络活动件数',value:'tj_ll_cs',istrue:true},
                    {name:'关注案件件数',value:'tj_gz_cs',istrue:true},
                    {name:'议案建议件数',value:'tj_ya_cs',istrue:false},
                    {name:'参加活动人次',value:'tj_ryll_rc',istrue:true},
                    {name:'关注案件人次',value:'tj_rygz_rc',istrue:true},
                    {name:'提出建议人次',value:'tj_ryya_rc',istrue:false},
                ]
                   this.tjnum=2;
            }

           //三。对象和案件  (统计人数、关注案件件数、关注案件人次)
           else  if((this.rdchecked || this.zxchecked || this.tychecked)
            && (this.gzajchecked || this.bldwchecked)){

                this.yashow=true;
                this.hdshow0=true;
                this.hdshow1=true;
                this.hdshow2=true;
                this.hdshow3=true;
                 this.Countfs=[
                    {name:'统计人数',value:'tj_ry_rs',istrue:false},
                    {name:'联络活动件数',value:'tj_ll_cs',istrue:true},
                    {name:'关注案件件数',value:'tj_gz_cs',istrue:false},
                    {name:'议案建议件数',value:'tj_ya_cs',istrue:true},
                    {name:'参加活动人次',value:'tj_ryll_rc',istrue:true},
                    {name:'关注案件人次',value:'tj_rygz_rc',istrue:false},
                    {name:'提出建议人次',value:'tj_ryya_rc',istrue:true},
                ]
                   this.tjnum=3;
            }

           //四。活动和议案  (联络活动件数、议案建议件数)
            else  if((this.sjchecked || this.hdddchecked || this.llhdchecked || this.kzdwchecke)
            && (this.yajychecked || this.bldwchecked)){

                this.gzshow=true;
                this.dxshow0=true;
                this.dxshow1=true;
                this.dxshow2=true;
                 this.Countfs=[
                     {name:'统计人数',value:'tj_ry_rs',istrue:true},
                    {name:'联络活动件数',value:'tj_ll_cs',istrue:false},
                    {name:'关注案件件数',value:'tj_gz_cs',istrue:true},
                    {name:'议案建议件数',value:'tj_ya_cs',istrue:false},
                    {name:'参加活动人次',value:'tj_ryll_rc',istrue:true},
                    {name:'关注案件人次',value:'tj_rygz_rc',istrue:true},
                    {name:'提出建议人次',value:'tj_ryya_rc',istrue:true},
                ]
                   this.tjnum=4;
            }
           //五。活动和案件  (联络活动件数、关注案件件数)
            else  if((this.sjchecked || this.hdddchecked || this.llhdchecked || this.kzdwchecke)
            && (this.gzajchecked || this.bldwchecked)){
    
                this.yashow=true;
                this.dxshow0=true;
                this.dxshow1=true;
                this.dxshow2=true;
                this.Countfs=[
                    {name:'统计人数',value:'tj_ry_rs',istrue:true},
                    {name:'联络活动件数',value:'tj_ll_cs',istrue:false},
                    {name:'关注案件件数',value:'tj_gz_cs',istrue:false},
                    {name:'议案建议件数',value:'tj_ya_cs',istrue:true},
                    {name:'参加活动人次',value:'tj_ryll_rc',istrue:true},
                    {name:'关注案件人次',value:'tj_rygz_rc',istrue:true},
                    {name:'提出建议人次',value:'tj_ryya_rc',istrue:true},
                ]
                   this.tjnum=5;
            }
           // 六、活动 (联络活动件数、统计人数、参数活动人次)
            else  if(this.sjchecked || this.hdddchecked || this.llhdchecked || this.kzdwchecked){
                 if(this.kzdwchecked){
                      this.blshow=true;
                   }else{
                      this.blshow=false;
                   }

                 this.Countfs=[
                    {name:'统计人数',value:'tj_ry_rs',istrue:false},
                    {name:'联络活动件数',value:'tj_ll_cs',istrue:false},
                    {name:'关注案件件数',value:'tj_gz_cs',istrue:true},
                    {name:'议案建议件数',value:'tj_ya_cs',istrue:true},
                    {name:'参加活动人次',value:'tj_ryll_rc',istrue:false},
                    {name:'关注案件人次',value:'tj_rygz_rc',istrue:true},
                    {name:'提出建议人次',value:'tj_ryya_rc',istrue:true},
                ]
                   this.tjnum=6;
            }
           // 七、议案（议案建议件数、统计人数、提出建议人次）
          else  if(this.yajychecked || this.bldwchecked ){

                if(this.yajychecked){
                    this.gzshow=true;
                }else{
                    this.gzshow=false;
                }

                if(this.bldwchecked){
                   
                      this.hdshow3=true;
                   }else{
                      this.hdshow3=false;
                   }


                 this.Countfs=[
                    {name:'统计人数',value:'tj_ry_rs',istrue:false},
                    {name:'联络活动件数',value:'tj_ll_cs',istrue:true},
                    {name:'关注案件件数',value:'tj_gz_cs',istrue:true},
                    {name:'议案建议件数',value:'tj_ya_cs',istrue:false},
                    {name:'参加活动人次',value:'tj_ryll_rc',istrue:true},
                    {name:'关注案件人次',value:'tj_rygz_rc',istrue:true},
                    {name:'提出建议人次',value:'tj_ryya_rc',istrue:false},
                ]
                   this.tjnum=7;
            }
           // 八.关注 （关注案件件数、统计人数、关注案件人次）
           else  if(this.gzajchecked || this.bldwchecked){
               if(this.gzajchecked){
                    this.yashow=true;
                }else{
                    this.yashow=false;
                }
                 if(this.bldwchecked){
                   
                      this.hdshow3=true;
                   }else{
                      this.hdshow3=false;
                   }
                 this.Countfs=[
                    {name:'统计人数',value:'tj_ry_rs',istrue:false},
                    {name:'联络活动件数',value:'tj_ll_cs',istrue:true},
                    {name:'关注案件件数',value:'tj_gz_cs',istrue:false},
                    {name:'议案建议件数',value:'tj_ya_cs',istrue:true},
                    {name:'参加活动人次',value:'tj_ryll_rc',istrue:true},
                    {name:'关注案件人次',value:'tj_rygz_rc',istrue:false},
                    {name:'提出建议人次',value:'tj_ryya_rc',istrue:true},
                ]
             this.tjnum=8;
            }else if(this.rdchecked || this.zxchecked || this.tychecked){
              this.tjnum=0;
              this.Countfs=[
                    {name:'统计人数',value:'tj_ry_rs',istrue:false},
                    {name:'联络活动件数',value:'tj_ll_cs',istrue:false},
                    {name:'关注案件件数',value:'tj_gz_cs',istrue:false},
                    {name:'议案建议件数',value:'tj_ya_cs',istrue:false},
                    {name:'参加活动人次',value:'tj_ryll_rc',istrue:false},
                    {name:'关注案件人次',value:'tj_rygz_rc',istrue:false},
                    {name:'提出建议人次',value:'tj_ryya_rc',istrue:false},
                ]
               
            }else{
                this.isall=true;
            }
         
       },
       //查询
       getList(currentPage, showCount, cx){
            if(this.hhzx.radio=='hh_ll_activityType' && this.zl.radio=='zl_ll_activitytype'){
                this.$message.error("行和列不能相同，请重新选择！");return;
            }
            console.log(this.tjfsradio,this.hhzx.radio,this.zl.radio);
            
          if(this.tjfsradio && this.hhzx.radio && this.zl.radio){
              let p={
             'pd':{
                    "cx":this.cx,
                    "tj":this.tjfsradio,
                    'hh':this.hhzx.radio,
                    'zl':this.zl.radio,
                },
             "pageInfo":{
                 "pageNumber":currentPage,
                 "pageSize":showCount,
                }
           };
          this.$api.post(this.Global.aport1+'/AllSearchController/getAllSearch',p,
                     r =>{
                       if(r.code==1){
                             this.jgshow=true;
                             this.tabledata=r.data.tabledata;
                             this.tabletitle=r.data.tabletitle;
                             this.title=r.data.title;
                             this.TotalResult=r.data.pageInfo.total;
                       }else{
                           this.jgshow=false;
                           this.$message.error('未查到相关数据');
                       }
             });
         }else{
             this.$message.error("统计方式、横行对象、纵列对象三者都不能为空！");return;
         }
       },

       reset(){
        
           Object.assign(this.$data, this.$options.data())
       },


    },
}
</script>
<style scoped>
.anborder{width: 100%;}
.antext{ margin-bottom: 10px;font-size: 14px;}
.anbnt{float: right; padding: 3px 0}
.antitle{font-size: 18px;font-weight: bold;color: #888888;}
.antxt{width: 6%;}
.antxtsc{width: 100px;}
.aninput{width: 12%;}
.ancard{padding:5px 20px 0 20px;}
.anbgcolor{width: 95%!important;line-height: 25px; padding:10px 10px; border: 1px solid #eeeeee;}
.anleft{float: left; width: 9%;}
.anright{float: left; width: 90%;}
.anctitle{ text-align: center; font-size: 25px; font-weight: bold;}
.ancolor{color: slategray;}
.anboder{border-top:1px solid #eeeeee ;}
.anbackcolor{background: #F6FAFB;border: 1px solid #EFF5F8;}
.anline{line-height:35px;}
</style>
<style>
.anborder .el-card__body{padding: 0!important;}
.anborder .el-checkbox{margin-right: 10px!important;}
.anborder .el-checkbox__label{font-size: 15px;}
.ah12 .el-checkbox__label{font-size: 12px; }
</style>