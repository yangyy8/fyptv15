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
                   <span v-else>展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow0">
                <div class="antext">
                    <el-row class="ah-30">
                        <el-col :span="24">
                            <el-checkbox v-model="rdchecked" @change="getrdclick(0)">人大代表</el-checkbox>
                            <span class="ml-40 ah12" v-if='rdshow[0]'>
                                <el-checkbox v-model="rd.cj" class="antxt" @change="getrdclick(1,1)">层级</el-checkbox>
                                <el-select v-model="rd.levelType" :disabled="!rd.cj" @change="getrdclick(1,0,rd.levelType)"  placeholder="请选择" filterable clearable  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='rdshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="rd.sjrd" @change="getrdclick(2,1)">四级人大</el-checkbox>
                                <el-select v-model="rd.orgid" :disabled="!rd.sjrd" @change="getrdclick(2,0,rd.orgid);getNull(rd.orgid,1);getJB(rd.orgid,1);getTB(rd.orgid)" remote :remote-method="rdorgremoteMethod" v-el-select-loadmore="rdorgloadmore" filterable clearable allow-create  placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in rdorglist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.orgid">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="rd.xjrd">含下级人大</el-checkbox>
                            </span>

                            <span class="ah12" v-if='rdshow[2]'>
                             <el-checkbox class="ml-20 antxt" v-model="rd.jb" @change="getrdclick(3,1)">届别</el-checkbox>
                             <el-select v-model="rd.periodType"  :disabled="!rd.jb" placeholder="请选择" @change="getrdclick(3,0,rd.periodType)" filterable clearable :no-data-text="rd.orgid?'无数据':'请先选择四级人大'"   size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in rdjblist"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                </el-option>
                             </el-select>
                            </span>
                            <span class="ah12" v-if='rdshow[3]'>
                                <el-checkbox class="ml-20 antxt" v-model="rd.tb" @change="getrdclick(4)">团别</el-checkbox>
                                <el-select v-model="rd.groupType" :disabled="!rdshow[4]"  placeholder="请选择" filterable clearable :no-data-text="rd.orgid?'无数据':'请先选择四级人大'"  size="mini" class="aninput">
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
                             <el-checkbox v-model="zxchecked" @change="getzxclick(0)">政协委员</el-checkbox>
                             <span class="ml-40 ah12" v-if='zxshow[0]'>
                                <el-checkbox v-model="zx.cj" class="antxt" @change="getzxclick(1,1)" >层级</el-checkbox>
                                <el-select v-model="zx.levelType" :disabled="!zx.cj"  @change="getzxclick(1,0,zx.levelType)"  placeholder="请选择" filterable clearable  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='zxshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="zx.sjzx" @change="getzxclick(2,1)">四级政协</el-checkbox>
                                <el-select v-model="zx.orgid" :disabled="!zx.sjzx" filterable clearable allow-create  @change="getzxclick(2,0,zx.orgid);getNull(zx.orgid,2);getJB(zx.orgid,2);" remote :remote-method="zxorgremoteMethod" v-el-select-loadmore="zxorgloadmore"   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in zxorglist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.orgid">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="zx.xjzx">含下级政协</el-checkbox>
                            </span>
                            <span class="ah12" v-if='zxshow[2]'>
                             <el-checkbox class="ml-20 antxt" v-model="zx.jb" @change="getzxclick(3,1)">届别</el-checkbox>
                             <el-select v-model="zx.periodType"  :disabled="!zx.jb" filterable clearable @change="getzxclick(3,0,zx.periodType);getJJB(zx.orgid,zx.periodType)" placeholder="请选择" :no-data-text="zx.orgid?'无数据':'请先选择四级政协'" size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in zxjblist"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                </el-option>
                             </el-select>
                            </span>
                            <span class="ah12" v-if='zxshow[3]'>
                                <el-checkbox class="ml-20 antxt" v-model="zx.jjb" @change="getzxclick(4)">界别</el-checkbox>
                                <el-select v-model="zx.circlesType" :disabled="!zxshow[4]" filterable clearable  placeholder="请选择"  size="mini" :no-data-text="zx.orgid?'无数据':'请先选择届别'" class="aninput">
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
                            <el-checkbox v-model="tychecked" @change="gettyclick(0)">特约人员</el-checkbox>
                            <span class="ml-40 ah12" v-if='tyshow[0]'>
                                <el-checkbox v-model="ty.cj" class="antxt"  @change="gettyclick(1,1)">法院等级</el-checkbox>
                                <el-select v-model="ty.levelType" :disabled="!ty.cj" @change="gettyclick(1,0,ty.levelType)" filterable clearable   placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.fyjb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='tyshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="ty.sjfy" @change="gettyclick(2,1)">四级法院</el-checkbox>
                                <el-select v-model="ty.orgid" :disabled="!ty.sjfy" filterable clearable allow-create  @change="gettyclick(2,0,ty.orgid);getNull(ty.orgid,3);getTYLBList(ty.orgid);" remote :remote-method="tyorgremoteMethod" v-el-select-loadmore="tyorgloadmore"   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in tyorglist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.orgid">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="ty.xjfy">含下级法院</el-checkbox>
                            </span>
                           
                            <span class="ah12" v-if='tyshow[2]'>
                                <el-checkbox class="ml-20 antxt" v-model="ty.tylb" @change="gettyclick(3,1)">特约类别</el-checkbox>
                                <el-select v-model="ty.specialType" :disabled="!ty.tylb" filterable clearable @change="gettyclick(3,0,ty.specialType);getTYJB(ty.orgid,ty.specialType)"  placeholder="请选择" :no-data-text="ty.orgid?'无数据':'请先选择四级法院'"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in tylblist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                             </span>
                              <span class="ah12" v-if='tyshow[3]'>
                             <el-checkbox class="ml-20 antxt" v-model="ty.jb" @change="gettyclick(4)">届别</el-checkbox>
                             <el-select v-model="ty.periodType"  :disabled="!tyshow[4]" filterable clearable  placeholder="请选择"  :no-data-text="ty.specialType?'无数据':'请先选择特约类别'" size="mini" class="aninput">
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
                   <span v-else>展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow1">
                <div class="antext">
                     <el-row class="ah-30">
                        <el-col :span="24">
                            <el-checkbox v-model="sjchecked" @change="getsjclick(0)">活动时间</el-checkbox>
                            <span class="ml-40 ah12" v-if='sjshow0'>
                                <el-checkbox v-model="sj.ksrq" class="antxt" @change="getsjclick(1,1)">开始日期</el-checkbox>
                                 <el-date-picker 
                                     v-model="sj.begindate" format="yyyy-MM-dd"
                                    type="date" size="mini" value-format="yyyy-MM-dd"
                                    placeholder="开始日期" class="aninput" :disabled="!sj.ksrq"  @change="getsjclick(1,0,sj.begindate)">
                                 </el-date-picker> 
                            </span>
                             <span class="ah12" v-if='sjshow1'>
                                <el-checkbox v-model="sj.jsrq" class="ml-20 antxt" @change="getsjclick(2)">结束日期</el-checkbox>
                                 <el-date-picker 
                                     v-model="sj.enddate" format="yyyy-MM-dd"
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
                   <span v-else>展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow2">
                <div class="antext">
                     <el-row class="ah-30">
                        <el-col :span="24">
                               <el-checkbox v-model="kzdwchecked" @change="getkzdwclick(0)">开展单位</el-checkbox>
                            <span class="ml-40 ah12" v-if='kzdwshow[0]'>
                                <el-checkbox v-model="kzdw.fyjb" class="antxt" @change="getkzdwclick(1,1)">层级</el-checkbox>
                                <el-select v-model="kzdw.levelType" :disabled="!kzdw.fyjb" placeholder="请选择" @change="getkzdwclick(1,0,kzdw.levelType)"  filterable clearable  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='kzdwshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="kzdw.fydw" @change="getkzdwclick(2,1)">开展单位</el-checkbox>
                                <el-select v-model="kzdw.developmentUnitId" :disabled="!kzdw.fydw" filterable clearable allow-create  @change="getkzdwclick(2,0,kzdw.developmentUnitId);getNull(kzdw.developmentUnitId,4);getkzbm(kzdw.developmentUnitId)" remote :remote-method="kzdwremoteMethod" v-el-select-loadmore="kzloadmore"   placeholder="请输入关键字搜索"   size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in kzdwdata"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.orgid">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="kzdw.xjfy">含下级法院</el-checkbox>
                            </span>
                            <span class="ah12" v-if='kzdwshow[2]'>
                             <el-checkbox class="ml-20 antxt" v-model="kzdw.kzbm" @change="getkzdwclick(3)">开展部门</el-checkbox>
                             <el-select v-model="kzdw.devDepartmentId"  :disabled="!kzdwshow[3]" filterable clearable placeholder="请选择" :no-data-text="kzdw.developmentUnitId?'无数据':'请先选择开展单位'"  size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in kzbmdata"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.orgid">
                                </el-option>
                             </el-select>
                            </span>
                            <!-- <span class="ah12" v-if='kzdwshow[3]'>
                                <el-checkbox class="ml-20 antxt" v-model="kzdw.yld" @change="getkzdwclick(4)">院领导</el-checkbox>
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
                            <el-checkbox v-model="bldwchecked" @change="getbldwclick(0)">办理单位</el-checkbox>
                            <span class="ml-40 ah12" v-if='bldwshow[0]'>
                                <el-checkbox v-model="bldw.fyjb" class="antxt" @change="getbldwclick(1,1)">法院级别</el-checkbox>
                                <el-select v-model="bldw.levelType" :disabled="!bldw.fyjb" filterable clearable @change="getbldwclick(1,0,bldw.levelType)"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.fyjb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='bldwshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="bldw.fydw" @change="getbldwclick(2,1)">法院单位</el-checkbox>
                                <el-select v-model="bldw.undertakeUnitId" :disabled="!bldw.fydw" filterable clearable allow-create @change="getbldwclick(2,0,bldw.undertakeUnitId);getNull(bldw.undertakeUnitId,5);getblbm(bldw.undertakeUnitId)" remote :remote-method="fydwremoteMethod" v-el-select-loadmore="fyloadmore"   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in fydwdata"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.orgid">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="bldw.xjfy">含下级法院</el-checkbox>
                            </span>
                            <span class="ah12" v-if='bldwshow[2]'>
                             <el-checkbox class="ml-20 antxt" v-model="bldw.blbm" @change="getbldwclick(3)">办理部门</el-checkbox>
                             <el-select v-model="bldw.undertakeDepartmentId"  :disabled="!bldwshow[3]" filterable clearable placeholder="请选择" :no-data-text="bldw.undertakeUnitId?'无数据':'请先选择办理单位'"  size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in blbmdata"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.orgid">
                                </el-option>
                             </el-select>
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
                   <span v-else>展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow3">
                <div class="antext">
                     <el-row class="ah-30">
                        <el-col :span="24">
                             <el-checkbox v-model="hdddchecked" @change="gethdddclick(0)">活动地点</el-checkbox>
                            <span class="ml-40 ah12" v-if='hdddshow[0]'>
                                <el-checkbox v-model="hddd.sheng" class="antxt" @change="gethdddclick(1,1)">省</el-checkbox>
                                <el-select v-model="hddd.province" :disabled="!hddd.sheng" @change="gethdddclick(1,0,hddd.province);getLevel(2,hddd.province,1)" filterable clearable placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in shenglist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>

                            </span>
                            <span class="ah12" v-if='hdddshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="hddd.shi" @change="gethdddclick(2,1)">市</el-checkbox>
                                <el-select v-model="hddd.city" :disabled="!hddd.shi" @change="gethdddclick(2,0,hddd.city);getLevel(3,hddd.city,2)" filterable clearable   placeholder="请选择" :no-data-text="hddd.province?'无数据':'请先选择省'"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in shilist"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='hdddshow[2]'>
                             <el-checkbox class="ml-20 antxt" v-model="hddd.qx" @change="gethdddclick(3)">区县</el-checkbox>
                             <el-select v-model="hddd.county"  :disabled="!hdddshow[3]" placeholder="请选择"  :no-data-text="hddd.city?'无数据':'请先选择市'"   filterable clearable  size="mini" class="aninput">
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
                   <span v-else>展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow4">
                <div class="antext">
                     <el-row class="ah-30">
                        <el-col :span="24">
                             <el-checkbox v-model="llhdchecked" @change="getllhdclick(0)">联络活动</el-checkbox>
                            <span class="ml-40 ah12" v-if='llhdshow[0]'>
                                <el-checkbox v-model="llhd.hdfl" class="antxt" @change="getllhdclick(1)">活动分类</el-checkbox>
                                <el-select v-model="llhd.activityType" :disabled="!llhdshow[1]"  placeholder="请选择"  size="mini" class="aninput">
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
                   <span v-else>展开</span> 
                </el-button>
            </div>
            <div class="ancard" v-if="ashow5">
                <div class="antext">
                     <el-row class="ah-30">
                        <el-col :span="24">
                             <el-checkbox v-model="gzajchecked" @change="getgzajclick(0)">关注案件</el-checkbox>
                            <span class="ml-40 ah12" v-if='gzajshow[0]'>
                                <el-checkbox v-model="gzaj.ajlx" class="antxt" @change="getgzajclick(1)">案件类型</el-checkbox>
                                <el-select v-model="gzaj.caseclass" :disabled="!gzajshow[1]"  placeholder="请选择"  size="mini" class="aninput">
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
                             <el-checkbox v-model="yajychecked" @change="getyajyclick(0)">议案建议</el-checkbox>
                            <span class="ml-40 ah12" v-if='yajyshow[0]'>
                                <el-checkbox v-model="yajy.yalx" class="antxt" @change="getyajyclick(1)">议案类型</el-checkbox>
                                <el-select v-model="yajy.proposalType" :disabled="!yajyshow[1]"  placeholder="请选择"  size="mini" class="aninput">
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

        <div class="ptitle mt-20 mb-20">输出项目</div>
        <div class="pborder">
            <el-row>
                <el-col :span="24" class="input-item">
                     <span class="yy-input-text antxtsc"><font class="red">*</font> 统计方式</span>
                     <div class="yy-input-input anbgcolor">
                          <el-radio  v-model="tjfsradio"  :label="t.value" v-for="(t,ind) in Countfs" :key="ind" @change="gethhdx(t.value)">{{t.name}}</el-radio>
                     </div>
                </el-col>
                 <el-col :span="24" class="input-item mt-20">
                     <span class="yy-input-text antxtsc"><font class="red">*</font> 横行对象</span>
                     <div class="yy-input-input anbgcolor">
                        <el-row>
                            <el-col :span="24" v-if='pp.show1'>
                                 <div class="anleft">
                                      <el-radio v-model="hradio" label="1" @change="getscdx(0)">联络对象</el-radio>
                                 </div>
                                 <div class="anright" v-if='hrshow0'>
                                     <div>
                                        <el-radio v-model="hhdw.dxadio" label="dx1" @change="getscdx(1)">人大代表</el-radio>
                                        <span class="ml-20" v-if='hrshow1'>
                                           <el-radio v-model="hhzx.rdradio" v-for="(t,ind) in rdinfo" :key="ind" :label="t.value">{{t.name}}</el-radio>
                                        </span>
                                     </div>
                                      <div>
                                      <el-radio v-model="hhdw.dxadio" label="dx2" @change="getscdx(2)">政协委员</el-radio>
                                      <span class="ml-20" v-if='hrshow2'>
                                           <el-radio v-model="hhzx.zxradio" v-for="(t,ind) in zxinfo" :key="ind" :label="t.value">{{t.name}}</el-radio>
                                        </span>
                                      </div>
                                      <div>
                                      <el-radio v-model="hhdw.dxadio" label="dx3" @change="getscdx(3)">特约人员</el-radio>
                                      <span class="ml-20" v-if='hrshow3'>
                                           <el-radio v-model="hhzx.tyradio" v-for="(t,ind) in tyinfo" :key="ind" :label="t.value">{{t.name}}</el-radio>
                                        </span>
                                      </div>
                                 </div>
                               
                                 

                            </el-col>
                             <el-col :span="24"  v-if='pp.show2'>
                                  <div class="anleft">
                                     <el-radio v-model="hradio" label="2" @change="getscdx(4)">单位</el-radio>
                                  </div>
                                   <div class="anright" v-if='hrshow4'>
                                      <div v-if='pp.show6'>
                                        <el-radio v-model="hhdw.dwadio" label="dx5" @change="getscdx(5)">联络活动</el-radio>
                                        <span class="ml-20" v-if='hrshow5'>
                                           <el-radio v-model="hhzx.llhdradio" v-for="(t,ind) in dwinfo1" :key="ind" :label="t.value">{{t.name}}</el-radio>
                                        </span>
                                      </div>
                                      <div  v-if='pp.show7'>
                                        <el-radio v-model="hhdw.dwadio" label="dx6" @change="getscdx(6)">关注案件</el-radio>
                                        <span class="ml-20" v-if='hrshow6'>
                                           <el-radio v-model="hhzx.llhdradio" v-for="(t,ind) in dwinfo2" :key="ind" :label="t.value">{{t.name}}</el-radio>
                                        </span>
                                      </div>
                                       <div  v-if='pp.show8'>
                                        <el-radio v-model="hhdw.dwadio" label="dx7" @change="getscdx(7)">初步建议</el-radio>
                                        <span class="ml-20" v-if='hrshow7'>
                                           <el-radio v-model="hhzx.llhdradio" v-for="(t,ind) in dwinfo3" :key="ind" :label="t.value">{{t.name}}</el-radio>
                                        </span>
                                      </div>
                                   </div>
                            </el-col>
                             <el-col :span="24"  v-if='pp.show3'>
                                 <div class="anleft">
                                  <el-radio v-model="hradio" label="3" @change="getscdx(8)">联络活动</el-radio>
                                 </div>
                                <div class="anright" v-if='hrshow8'>
                                       <el-radio v-model="hhdw.dxadio" label="dx8">活动类型</el-radio>
                                                                          
                                </div>

                            </el-col>
                             <el-col :span="24"  v-if='pp.show4'>
                                 <div class="anleft">
                                  <el-radio v-model="hradio" label="4" @change="getscdx(9)">关注案件</el-radio>
                                </div>
                                <div class="anright" v-if='hrshow9'>
                                     <el-radio v-model="hhdw.dxadio" label="dx9" @change="getscdx(10)">案件类型</el-radio>
                                      <span class="ml-20" v-if='hrshow10'>
                                           <el-radio v-model="hhzx.ajlxradio" v-for="(t,ind) in ajlxinfo" :key="ind" :label="t.value">{{t.name}}</el-radio>
                                        </span>
                                </div>

                            </el-col>
                            <el-col :span="24"  v-if='pp.show5'>
                                 <div class="anleft">
                                  <el-radio v-model="hradio" label="dx11" @change="getscdx(11)">初步建议</el-radio>
                                </div>
                                 <div class="anright" v-if='hrshow11 && pp.show9'>
                                     <el-radio v-model="hhdw.yqadio" label="dx12" @change="getscdx(12)">预期类型</el-radio>
                                      <span class="ml-20" v-if='hrshow12'>
                                           <el-radio v-model="hhzx.ajlxradio" v-for="(t,ind) in yqlxinfo" :key="ind" :label="t.value">{{t.name}}</el-radio>
                                      </span>
                                </div>
                            </el-col>
                        </el-row>
                     </div>
                </el-col>
              
                 <el-col :span="24" class="input-item mt-20">
                     <span class="yy-input-text antxtsc"><font class="red">*</font> 纵列对象</span>
                     <div class="yy-input-input anbgcolor">
                            <el-row>
                            <el-col :span="24" v-if='pp.show10'>
                                 <div class="anleft">
                                      <el-radio v-model="zlradio" label="1" @change="getzldx(0)">联络对象</el-radio>
                                 </div>
                                 <div class="anright" v-if='zlshow0'>
                                    <el-radio v-model="zlradio1" v-for="(t,ind) in zlinfo1" :key="ind" :label="t.code">{{t.label}}</el-radio>
                                      
                                 </div>
                            </el-col>
                              <el-col :span="24" v-if='pp.show11'>
                                 <div class="anleft">
                                      <el-radio v-model="zlradio" label="2" @change="getzldx(1)">联络活动</el-radio>
                                 </div>
                                 <div class="anright" v-if='zlshow1'>
                                    <el-radio v-model="zlradio2" v-for="(t,ind) in zlinfo2" :key="ind" :label="t.code">{{t.label}}</el-radio>
                                      
                                 </div>
                            </el-col>
                              <el-col :span="24" v-if='pp.show12'>
                                 <div class="anleft">
                                      <el-radio v-model="zlradio" label="3" @change="getzldx(2)">关注案件</el-radio>
                                 </div>
                                 <div class="anright" v-if='zlshow2'>
                                    <el-radio v-model="zlradio3" v-for="(t,ind) in zlinfo3" :key="ind" :label="t.code">{{t.label}}</el-radio>
                                      
                                 </div>
                            </el-col>
                              <el-col :span="24" v-if='pp.show13'>
                                 <div class="anleft">
                                      <el-radio v-model="zlradio" label="4" @change="getzldx(3)">议案建议</el-radio>
                                 </div>
                                 <div class="anright" v-if='zlshow3'>
                                    <el-radio v-model="zlradio4" v-for="(t,ind) in zlinfo4" :key="ind" :label="t.code">{{t.label}}</el-radio>
                                      
                                 </div>
                            </el-col>
                            </el-row>
                     </div>
                </el-col>
                <el-col :span="24" class="mt-20 mb-20" style="text-align:center"> 
                         <el-button  type="success" style="width:300px;height:50px;font-size:22px">统计分析查询</el-button>
                </el-col>
               <el-col :span="24">
                   <div class="anctitle mt-20">{{title}}</div>
                     <my-table :col="tabletitle"
                        :data="tabledata">
                        </my-table>
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
           ashow0:false,
           ashow1:false,
           ashow2:false,
           ashow3:false,
           ashow4:false,
           ashow5:false,
           rdchecked:'',
           zxchecked:'',
           tychecked:'',
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
               {name:'统计人数',value:'count1'},
               {name:'联络活动件数',value:'count2'},
               {name:'关注案件件数',value:'count3'},
               {name:'初步建议件数',value:'count4'},
               {name:'参加活动人次',value:'count5'},
               {name:'关注案件人次',value:'count6'},
               {name:'提议建议人次',value:'count7'},
           ],

           hradio:'',
           
        //    hrshow0:false,
        //    hrshow1:false,
        //    hrshow2:false,
        //    hrshow3:false,
        //    hrshow4:false,
        //    hrshow5:false,
        //    hrshow6:false,
        //    hrshow7:false,
        //    hrshow8:false,
        //    hrshow9:false,
        //    hrshow10:false,
        //    hrshow11:false,
        //    hrshow12:false,

        hrshow0:true,
           hrshow1:true,
           hrshow2:true,
           hrshow3:true,
           hrshow4:true,
           hrshow5:true,
           hrshow6:true,
           hrshow7:true,
           hrshow8:true,
           hrshow9:true,
           hrshow10:true,
           hrshow11:true,
           hrshow12:true,
           
           hhdw:{},
           hhzx:{},
           rdinfo:[
               {name:'层级',value:'rd1'},
               {name:'人大单位',value:'rd2'},
               {name:'届别',value:'rd3'},
               {name:'团别',value:'rd4'},
               {name:'巡回区域',value:'rd5'},
               {name:'代表',value:'rd6'},
           ],
           zxinfo:[
               {name:'层级',value:'zx1'},
               {name:'政协单位',value:'zx2'},
               {name:'届别',value:'zx3'},
               {name:'界别',value:'zx4'},
               {name:'委员',value:'zx5'},
           ],

           tyinfo:[
               {name:'法院等级',value:'ty1'},
               {name:'法院单位',value:'ty2'},
               {name:'特约人员类别',value:'ty3'},
               {name:'届别',value:'ty4'},
               {name:'特约人员',value:'ty5'},
           ],

           hdinfo:[
               {name:'单位等级',value:'hd1'},
               {name:'发起单位',value:'hd2'},
               {name:'发起部门',value:'hd3'},
               {name:'接待单位',value:'hd4'},
               {name:'特约人员',value:'hd5'},
           ],

          ajlxinfo:[
               {name:'审理阶段',value:'aj1'},
               {name:'案件状态',value:'aj2'},
               {name:'利害关系',value:'aj3'},
               {name:'来文期间',value:'aj4'},
          ],
            yqlxinfo:[
               {name:'承办类别',value:'yq1'},
               {name:'承办性质',value:'yq2'},
               {name:'来文期间',value:'yq3'},
               {name:'重点业务分类',value:'yq4'},
            ],
            dwinfo1:[
               {name:'发起单位',value:'yq1'},
               {name:'单位等级',value:'yq2'},
               {name:'发起部门',value:'yq3'},
               {name:'接待单位',value:'yq4'},
            ],
            dwinfo2:[
               {name:'承办单位',value:'yq1'},
               {name:'法院等级',value:'yq2'},
               {name:'法院单位',value:'yq3'},
               {name:'承办部门',value:'yq4'},
               {name:'问题针对法院',value:'yq5'},
            ],
            dwinfo3:[
               {name:'承办单位',value:'yq1'},
               {name:'法院等级',value:'yq2'},
               {name:'法院单位',value:'yq3'},
               {name:'承办部门',value:'yq4'},
            ],


           zlradio:'',
           zlradio1:'',
           zlradio2:'',
           zlradio3:'',
           zlradio4:'',
           zlshow0:false,
           zlshow1:false,
           zlshow2:false,
           zlshow3:false,
          
           zlinfo1:[],
           zlinfo2:[],
           zlinfo3:[],
           zlinfo4:[],

        //    pp:{show1:false,show2:false,show3:false,show4:false,
        //    show5:false,show6:false,show7:false,show8:false,
        //    show9:false,show10:false,show11:false,show12:false,
        //    show13:false},
        pp:{show1:true,show2:true,show3:true,show4:true,
           show5:true,show6:true,show7:true,show8:true,
           show9:true,show10:true,show11:true,show12:true,
           show13:true},

           title:'【联络对象】各【层级】【人大代表】的【政治面貌】的统计分析',
           tabledata:[
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                    },
                    {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                    }
           ],
           tabletitle:[
            {
            prop: 'date',
            label: '层级'
            },
            {
            label: '政治面貌',
            children: [
                {
                prop: 'name',
                label: '中共'
                },
                {
                label: '民主党派',
                children: [
                    {
                    prop: 'province',
                    label: '民革'
                    },
                    {
                    prop: 'city',
                    label: '民盟'
                    },
                    {
                    prop: 'address',
                    label: '民建'
                    }
                ]
                },
                {
                prop: 'name',
                label: '无党派'
                },
            ]
            }
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
        }
    },
    mounted(){
      this.$store.dispatch('getJbb');
      this.$store.dispatch('getFyjb');
     
    },
    methods:{
      
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
       getTB(val){
              var obj={};
                 obj = this.rdorglist.find(item =>{
                  return item.orgid === val
                });
                if(obj){
                let p={
                    'level':obj.lvl,
                    'administrativeDivision':obj.xzqh,
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
                   this.$set(this.rd, 'xjrd', false);
                   this.$set(this.rd, 'jb', false);
                   this.$set(this.rd, 'tb', false);

                   this.$set(this.rd, 'levelType', '');    
                   this.$set(this.rd, 'orgid', ''); 
                   this.$set(this.rd, 'periodType', ''); 
                   this.$set(this.rd, 'groupType', ''); 
                   this.rdorglist=[];
                   this.jblist=[];
                   this.tblist=[];
                   break;
                 
              case 1:
                   this.rdshow[1]=false;
                   if(m==1){
                       this.$set(this.rd, 'levelType', '');
                      
                   }else if(val){
                        this.rdshow[1]=true;
                        
                   }
                   
                   this.rdshow[2]=false;
                   this.rdshow[3]=false;
                   this.rdshow[4]=false;
                   this.$set(this.rd, 'sjrd', false);
                   this.$set(this.rd, 'xjrd', false);
                   this.$set(this.rd, 'jb', false);
                   this.$set(this.rd, 'tb', false);
                 
                   this.$set(this.rd, 'orgid', ''); 
                   this.$set(this.rd, 'periodType', ''); 
                   this.$set(this.rd, 'groupType', ''); 
                   this.rdorglist=[];
                   this.rdjblist=[];
                   this.tblist=[];

                   break;
              case 2:

                   this.rdshow[2]=false;
                   if(m==1){
                      this.$set(this.rd, 'orgid', '');
                      this.rdorglist=[];
                     
                   }else if(val){
                           this.rdshow[2]=true;
                    
                   }
                   
                   this.rdshow[3]=false;
                   this.rdshow[4]=false;
                   this.$set(this.rd, 'jb', false);
                   this.$set(this.rd, 'tb', false);

                   this.$set(this.rd, 'periodType', ''); 
                   this.$set(this.rd, 'groupType', ''); 
                   this.rdjblist=[];
                   this.tblist=[];
                   break;
              case 3:
                    this.rdshow[3]=false;
                  if(m==1){
                     this.$set(this.rd, 'periodType', '');
                   
                  }else if(val){
                        this.rdshow[3]=true;
                    
                  }
                  
                   this.rdshow[4]=false;
                   this.$set(this.rd, 'tb', false);
                
                   this.$set(this.rd, 'groupType', ''); 
                   break;
              case 4:
                   this.rdshow[4]=!this.rdshow[4];
                   this.$set(this.rd, 'groupType', ''); 
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
                   this.$set(this.zx, 'xjzx', false);
                   this.$set(this.zx, 'jb', false);
                   this.$set(this.zx, 'tb', false);

                   this.$set(this.zx, 'levelType', ''); 
                   this.$set(this.zx, 'orgid', ''); 
                   this.$set(this.zx, 'periodType', ''); 
                   this.$set(this.zx, 'circlesType', ''); 
                   this.zxorglist=[];
                   this.zxjblist=[];
                   this.jjblist=[];
                   break;
              case 1:
                  this.zxshow[1]=false;
                  if(m==1){
                       this.$set(this.zx, 'levelType', '');
                       
                  }else if(val){
                       this.zxshow[1]=true;
                  }
                   
                   this.zxshow[2]=false;
                   this.zxshow[3]=false;
                   this.zxshow[4]=false;
                   this.$set(this.zx, 'sjzx', false);
                   this.$set(this.zx, 'xjzx', false);
                   this.$set(this.zx, 'jb', false);
                   this.$set(this.zx, 'jjb', false);
                   
                   this.$set(this.zx, 'orgid', ''); 
                   this.$set(this.zx, 'periodType', ''); 
                   this.$set(this.zx, 'circlesType', ''); 
                   this.zxorglist=[];
                   this.zxjblist=[];
                   this.jjblist=[];
                   break;
              case 2:
                     this.zxshow[2]=false;
                    if(m==1){
                        this.$set(this.zx, 'orgid', ''); 
                        this.zxorglist=[];
                     
                    }else if(val){
                        this.zxshow[2]=true;
                    }
                   this.zxshow[3]=false;
                   this.zxshow[4]=false;
                   this.$set(this.zx, 'jb', false);
                   this.$set(this.zx, 'jjb', false);
                   
                   this.$set(this.zx, 'periodType', ''); 
                   this.$set(this.zx, 'circlesType', ''); 
                   
                   this.zxjblist=[];
                   this.jjblist=[];
                   break;
              case 3:
                      this.zxshow[3]=false;
                   if(m==1){
                      this.$set(this.zx, 'periodType', '');
                  
                   }else if(val){
                    this.zxshow[3]=true;
                   }
                   
                   this.zxshow[4]=false;
                   this.$set(this.zx, 'jjb', false);
                  
                   this.$set(this.zx, 'circlesType', ''); 
                   this.jjblist=[];
                   break;
              case 4:
                   this.zxshow[4]=!this.zxshow[4];
                    this.$set(this.zx, 'circlesType', ''); 
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
                   this.$set(this.ty, 'xjfy', false);
                   this.$set(this.ty, 'jb', false);
                   this.$set(this.ty, 'tylb', false);

                   this.$set(this.ty, 'levelType', ''); 
                   this.$set(this.ty, 'orgid', ''); 
                   this.$set(this.ty, 'specialType', ''); 
                   this.$set(this.ty, 'periodType', ''); 
                   this.tyorglist=[];
                   this.tyjblist=[];
                   this.tylblist=[];
                   break;
              case 1:
                    this.tyshow[1]=false;
                  if(m==1){
                    this.$set(this.ty, 'levelType', '');
                  
                  }else if(val){
                    this.tyshow[1]=true;
                  }
                   this.tyshow[2]=false;
                   this.tyshow[3]=false;
                   this.tyshow[4]=false;
                   this.$set(this.ty, 'sjfy', false);
                   this.$set(this.ty, 'xjfy', false);
                   this.$set(this.ty, 'jb', false);
                   this.$set(this.ty, 'tylb', false);

                   this.$set(this.ty, 'orgid', ''); 
                   this.$set(this.ty, 'specialType', ''); 
                   this.$set(this.ty, 'periodType', ''); 
                   this.tyorglist=[];
                   this.tyjblist=[];
                   this.tylblist=[];
                   break;
              case 2:
                    this.tyshow[2]=false;
                  if(m==1){
                      this.$set(this.ty, 'orgid', ''); 
                      this.tyorglist=[];
                    
                  }else if(val){
                      this.tyshow[2]=true;
                  }

                   this.tyshow[3]=false;
                   this.tyshow[4]=false;
                   this.$set(this.ty, 'jb', false);
                   this.$set(this.ty, 'tylb', false);
                 
                   this.$set(this.ty, 'specialType', ''); 
                   this.$set(this.ty, 'periodType', ''); 
                  
                   
                   this.tylblist=[];
                   this.tyjblist=[];
                   break;
              case 3:
                   this.tyshow[3]=false;
                  if(m==1){
                       this.$set(this.ty, 'specialType', ''); 
                      
                  }else if(val){
                       this.tyshow[3]=true;
                  }
                   
                   this.tyshow[4]=false;
                   this.$set(this.ty, 'jb', false);
                   this.$set(this.ty, 'periodType', '');
                   this.tyjblist=[];
                   
                   break;
              case 4:
                   this.tyshow[4]=!this.tyshow[4];
                   this.$set(this.ty, 'periodType', '');
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

                 this.$set(this.sj, 'begindate', '');
                 this.$set(this.sj, 'enddate', '');
                 break;
             case 1:
               
                   this.sjshow1=false;
                 if(m==1){
                   this.$set(this.sj, 'begindate', '');
                   
                 }else{
                     if(val){          
                        this.sjshow1=true; 
                     }
                     
                 }
               
                 this.$set(this.sj, 'jsrq', false);
                 this.$set(this.sj, 'enddate', '');
                 break;
             case 2:
                 this.$set(this.sj, 'enddate', '');
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
                   this.$set(this.kzdw, 'xjfy', false);
                   this.$set(this.kzdw, 'kzbm', false);
                   this.$set(this.kzdw, 'yld', false);
                   this.$set(this.kzdw,'levelType','')
                   this.$set(this.kzdw,'developmentUnitId','')
                   this.$set(this.kzdw,'devDepartmentId','')
                   this.kzdwdata=[];
                   this.kzbmdata=[];
                   break;
              case 1:
                   this.kzdwshow[1]=false;
                  if(m==1){
                        this.$set(this.kzdw,'levelType','')
                       
                  }else if(val){
                        this.kzdwshow[1]=true;
                  }
                   
                   this.kzdwshow[2]=false;
                   this.kzdwshow[3]=false;
                   this.kzdwshow[4]=false;
                   this.$set(this.kzdw, 'fydw', false);
                   this.$set(this.kzdw, 'xjfy', false);
                   this.$set(this.kzdw, 'kzbm', false);
                   this.$set(this.kzdw, 'yld', false);
                   
                   this.$set(this.kzdw,'developmentUnitId','')
                   this.$set(this.kzdw,'devDepartmentId','')
                   this.kzdwdata=[];
                   this.kzbmdata=[];
                   break;
              case 2:
                   this.kzdwshow[2]=false;
                  if(m==1){
                     this.$set(this.kzdw,'developmentUnitId','')
                     this.kzdwdata=[];
                  }else if(val){
                      this.kzdwshow[2]=true;
                  }
                   
                   this.kzdwshow[3]=false;
                   this.kzdwshow[4]=false;
                   this.$set(this.kzdw, 'kzbm', false);
                   this.$set(this.kzdw, 'yld', false);
                 
                   this.$set(this.kzdw,'devDepartmentId','')
                   
                   this.kzbmdata=[];
                   break;
              case 3:
                   this.kzdwshow[3]=!this.kzdwshow[3];
                   this.kzdwshow[4]=false;
                   this.$set(this.kzdw, 'yld', false);
                   this.$set(this.kzdw,'devDepartmentId','')
                 
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
                   this.$set(this.bldw, 'xjfy', false);
                   this.$set(this.bldw, 'blbm', false);
                   this.$set(this.bldw,'levelType','')
                   this.$set(this.bldw,'undertakeUnitId','')
                   this.$set(this.bldw,'undertakeDepartmentId','')
                   this.fydwdata=[];
                   this.blbmdata=[];
                   break;
              case 1:
                    this.bldwshow[1]=false;
                   if(m==1){
                       this.$set(this.bldw,'levelType','')
                     
                   }else if(val){
                       this.bldwshow[1]=true;
                   }
                   
                   this.bldwshow[2]=false;
                   this.bldwshow[3]=false;
                   this.$set(this.bldw, 'fydw', false);
                   this.$set(this.bldw, 'xjfy', false);
                   this.$set(this.bldw, 'blbm', false);
            
                   this.$set(this.bldw,'undertakeUnitId','')
                   this.$set(this.bldw,'undertakeDepartmentId','')
                   this.fydwdata=[];
                   this.blbmdata=[];
                   break;
              case 2:
                    this.bldwshow[2]=false;
                   if(m==1){
                      this.$set(this.bldw,'undertakeUnitId','')
                   }else if(val){
                     this.bldwshow[2]=true;
                   }
                   
                   this.bldwshow[3]=false;
                   this.$set(this.bldw, 'blbm', false);
                   this.$set(this.bldw,'undertakeDepartmentId','')
                   this.blbmdata=[];
                   break;
              case 3:
                   this.bldwshow[3]=!this.bldwshow[3];
                    this.$set(this.bldw,'undertakeDepartmentId','')
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
               'orglvl':this.kzdw.levelType
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

                        this.$set(this.hddd,'city','');
                        this.$set(this.hddd,'county','');
                        this.shilist=[];
                        this.xianlist=[];
                    }else if(t==2){
                        this.$set(this.hddd,'county','');
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
                   this.$set(this.hddd,'province','');
                   this.$set(this.hddd,'city','');
                   this.$set(this.hddd,'county','');
                   this.shenglist=[];
                   this.shilist=[];
                   this.xianlist=[];

                   break;
              case 1:
                   this.hdddshow[1]=false;
                  if(m==1){
                    this.$set(this.hddd,'province','');
                  }else if(val){
                       this.hdddshow[1]=true;
                  } 
                    
                  
                   this.hdddshow[2]=false;
                   this.hdddshow[3]=false;
                    this.$set(this.hddd, 'shi', false);
                   this.$set(this.hddd, 'qx', false);
                   this.getLevel('1');
                   this.$set(this.hddd,'city','');
                   this.$set(this.hddd,'county','');
                   this.shilist=[];
                   this.xianlist=[];
                   
                   break;
              case 2:
                  this.hdddshow[2]=false;
                  if(m==1){
                        this.$set(this.hddd,'city','');
                     
                  }else if(val){
                     
                       this.hdddshow[2]=true;
                  }
                  
                   this.hdddshow[3]=false;
                   this.$set(this.hddd, 'qx', false);
                   this.$set(this.hddd,'county','');
                   this.xianlist=[];
                   break;
              case 3:
                   this.hdddshow[3]=!this.hdddshow[3];
                   this.$set(this.hddd,'county','');
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
                   this.$set(this.llhd, 'activityType', '');
                   break;
              case 1:
                   this.llhdshow[1]=!this.llhdshow[1];
                   this.$set(this.llhd, 'activityType', '');
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
                   this.$set(this.gzaj, 'caseclass', '');
                   break;
              case 1:
                   this.gzajshow[1]=!this.gzajshow[1];
                   this.$set(this.gzaj, 'caseclass', '');
                   break;
             
               default:
                   break;
           }
       },
         //联络活动
        getyajyclick(t){
           switch (t) {
              case 0:
                   this.yajyshow[0]=!this.yajyshow[0];
                   this.yajyshow[1]=false;
                   this.$set(this.yajy, 'yalx', false);
                   this.$store.dispatch('getYalx');
                   this.$set(this.yajy, 'proposalType', '');
                   break;
              case 1:
                   this.yajyshow[1]=!this.yajyshow[1];
                   this.$set(this.yajy, 'proposalType', '');
                   break;
             
               default:
                   break;
           }
       },
       //输出项目
       getscdx(t){
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

                this.zlshow0=false;
                this.zlshow1=false;
                this.zlshow2=false;
                this.zlshow3=false;
                this.pp.show10=true;
                this.pp.show11=true;
                this.pp.show12=true;
                this.pp.show13=true;
                break;
            case 1:
                this.hrshow1=!this.hrshow1
                this.hrshow2=false;
                this.hrshow3=false;
                this.hhzx={}
                break;
            case 2:
                this.hrshow1=false;
                this.hrshow2=!this.hrshow2
                this.hrshow3=false;
                 this.hhzx={}
                break;
            case 3:
                this.hrshow1=false;
                this.hrshow2=false;
                this.hrshow3=!this.hrshow3
                this.hhzx={}
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

                this.zlshow0=false;
                this.zlshow1=false;
                this.zlshow2=false;
                this.zlshow3=false;
                this.pp.show10=false;
                this.pp.show11=true;
                this.pp.show12=false;
                this.pp.show13=false;
                break;
            case 6:
                this.hrshow5=false
                this.hrshow6=!this.hrshow6;
                this.hrshow7=false;
                this.hhzx={}
                this.zlshow0=false;
                this.zlshow1=false;
                this.zlshow2=false;
                this.zlshow3=false;
                this.pp.show10=false;
                this.pp.show11=false;
                this.pp.show12=true;
                this.pp.show13=false;
                break;
            case 7:
                this.hrshow5=false;
                this.hrshow6=false;
                this.hrshow7=!this.hrshow7;
                this.hhzx={}
                 this.zlshow0=false;
                this.zlshow1=false;
                this.zlshow2=false;
                this.zlshow3=false;
                this.pp.show10=false;
                this.pp.show11=false;
                this.pp.show12=false;
                this.pp.show13=true;
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
                this.hhdw={}

                this.zlshow0=false;
                this.zlshow1=false;
                this.zlshow2=false;
                this.zlshow3=false;
                this.pp.show10=true;
                this.pp.show11=false;
                this.pp.show12=false;
                this.pp.show13=false;
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
                this.hhdw={}

                this.zlshow0=false;
                this.zlshow1=false;
                this.zlshow2=false;
                this.zlshow3=false;
                this.pp.show10=true;
                this.pp.show11=false;
                this.pp.show12=false;
                this.pp.show13=false;
                break;
            case 10:
                this.hrshow10=!this.hrshow10;
                this.hhzx={}
                break;
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
                this.hhdw={}
                this.zlshow0=false;
                this.zlshow1=false;
                this.zlshow2=false;
                this.zlshow3=false;
                this.pp.show10=true;
                this.pp.show11=false;
                this.pp.show12=false;
                this.pp.show13=false;
                break;
            case 12:
                this.hrshow12=!this.hrshow12;
                this.hhzx={}
                this.zlshow0=false;
                this.zlshow1=false;
                this.zlshow2=false;
                this.zlshow3=false;
                this.pp.show10=true;
                this.pp.show11=false;
                this.pp.show12=false;
                this.pp.show13=false;
                break;
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
                 this.zlradio1='';
                 this.zlradio2='';
                 this.zlradio3='';
                 this.zlradio4='';

                 if(this.zlinfo1.length==0){
                      let p={
                  'type':'0246000001'
                    };
                    this.$api.post(this.Global.aport2+'/CaseHomeController/getCaseListInfo',p,
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
                 this.zlradio1='';
                 this.zlradio2='';
                 this.zlradio3='';
                 this.zlradio4='';
                  if(this.zlinfo2.length==0){
                      let p={
                         'type':'0246000010'
                       };
                    this.$api.post(this.Global.aport2+'/CaseHomeController/getCaseListInfo',p,
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
                 this.zlradio1='';
                 this.zlradio2='';
                 this.zlradio3='';
                 this.zlradio4='';
                 if(this.zlinfo3.length==0){
                      let p={
                         'type':'0246000011'
                       };
                    this.$api.post(this.Global.aport2+'/CaseHomeController/getCaseListInfo',p,
                        r =>{
                            this.zlinfo3=r.data;
                    });
                 }
                 break;
            case 3:
                 this.zlshow0=false;
                 this.zlshow1=false;
                 this.zlshow2=false;
                 this.zlshow3=!this.zlshow3;
                 this.zlradio1='';
                 this.zlradio2='';
                 this.zlradio3='';
                 this.zlradio4='';
                  if(this.zlinfo4.length==0){
                      let p={
                         'type':'0246000012'
                       };
                    this.$api.post(this.Global.aport2+'/CaseHomeController/getCaseListInfo',p,
                        r =>{
                            this.zlinfo4=r.data;
                    });
                 }
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
       gethhdx(t){
           
         switch (t) {
            case 'count1':
                 this.pp.show1=true;
                 this.pp.show2=true;
                 this.pp.show3=true;
                 this.pp.show4=true;
                 this.pp.show5=true;
                 this.pp.show6=true;
                 this.pp.show7=true;
                 this.pp.show8=true;
                 this.pp.show9=true;
                
                 break;
            case 'count2':
                 this.pp.show1=true;
                 this.pp.show2=true;
                 this.pp.show3=true;
                 this.pp.show4=true;
                 this.pp.show5=true;
                 this.pp.show6=true;
                 this.pp.show7=false;
                 this.pp.show8=false;
                 this.pp.show9=false;
                 break;
            case 'count3':
                 this.pp.show1=true;
                 this.pp.show2=true;
                 this.pp.show3=true;
                 this.pp.show4=true;
                 this.pp.show5=false;
                 this.pp.show6=false;
                 this.pp.show7=true;
                 this.pp.show8=false;
                 this.pp.show9=false;
                 break;
            case 'count4':
                 this.pp.show1=true;
                 this.pp.show2=true;
                 this.pp.show3=true;
                 this.pp.show4=false;
                 this.pp.show5=true;
                 this.pp.show6=false;
                 this.pp.show7=false;
                 this.pp.show8=true;
                 this.pp.show9=true;
                 break;
            case 'count5':
                 this.pp.show1=true;
                 this.pp.show2=true;
                 this.pp.show3=true;
                 this.pp.show4=false;
                 this.pp.show5=true;
                 this.pp.show6=true;
                 this.pp.show7=false;
                 this.pp.show8=false;
                 this.pp.show9=false;
                 break;
            case 'count6':
                 this.pp.show1=true;
                 this.pp.show2=true;
                 this.pp.show3=true;
                 this.pp.show4=true;
                 this.pp.show5=false;
                 this.pp.show6=false;
                 this.pp.show7=true;
                 this.pp.show8=false;
                 this.pp.show9=false;
                 break;
            case 'count7':
                 this.pp.show1=true;
                 this.pp.show2=true;
                 this.pp.show3=true;
                 this.pp.show4=false;
                 this.pp.show5=true;
                 this.pp.show6=false;
                 this.pp.show7=false;
                 this.pp.show8=true;
                 this.pp.show9=true;
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


    },
}
</script>
<style scoped>
.anborder{width: 100%;}
.antext{ margin-bottom: 10px;font-size: 14px;}
.anbnt{float: right; padding: 3px 0}
.antitle{font-size: 18px;font-weight: bold;color: #888888;}
.antxt{width: 5%;}
.antxtsc{width: 9%;}
.aninput{width: 12%;}
.ancard{padding:5px 20px 0 20px;}
.anbgcolor{background: #D4E8EF;width: 88%!important;line-height: 25px; padding:10px 20px;}
.anleft{float: left; width: 9%;}
.anright{float: left; width: 90%;}
.anctitle{ text-align: center; font-size: 25px; font-weight: bold;}
</style>
<style>
.anborder .el-card__body{padding: 0!important;}
.anborder .el-checkbox{margin-right: 10px!important;}
.anborder .el-checkbox__label{font-size: 15px;}
.ah12 .el-checkbox__label{font-size: 12px;}
</style>