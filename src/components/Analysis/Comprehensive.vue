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
                                <el-checkbox v-model="rd.cj" class="antxt" @change="getrdclick(1)">层级</el-checkbox>
                                <el-select v-model="rd.levelType" :disabled="!rdshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='rdshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="rd.sjrd" @change="getrdclick(2)">四级人大</el-checkbox>
                                <el-select v-model="rd.orgid" :disabled="!rdshow[2]"   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="rd.xjrd">含下级人大</el-checkbox>
                            </span>
                            <span class="ah12" v-if='rdshow[2]'>
                             <el-checkbox class="ml-20 antxt" v-model="rd.jb" @change="getrdclick(3)">届别</el-checkbox>
                             <el-select v-model="rd.periodType"  :disabled="!rdshow[3]" placeholder="请选择"  size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in $store.state.jbb"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                </el-option>
                             </el-select>
                            </span>
                            <span class="ah12" v-if='rdshow[3]'>
                                <el-checkbox class="ml-20 antxt" v-model="rd.tb" @change="getrdclick(4)">团别</el-checkbox>
                                <el-select v-model="rd.groupType" :disabled="!rdshow[4]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
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
                                <el-checkbox v-model="zx.cj" class="antxt" @change="getzxclick(1)">层级</el-checkbox>
                                <el-select v-model="zx.levelType" :disabled="!zxshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='zxshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="zx.sjzx" @change="getzxclick(2)">四级政协</el-checkbox>
                                <el-select v-model="zx.orgid" :disabled="!zxshow[2]"   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="zx.xjzx">含下级政协</el-checkbox>
                            </span>
                            <span class="ah12" v-if='zxshow[2]'>
                             <el-checkbox class="ml-20 antxt" v-model="zx.jb" @change="getzxclick(3)">届别</el-checkbox>
                             <el-select v-model="zx.periodType"  :disabled="!zxshow[3]" placeholder="请选择"  size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in $store.state.jbb"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                </el-option>
                             </el-select>
                            </span>
                            <span class="ah12" v-if='zxshow[3]'>
                                <el-checkbox class="ml-20 antxt" v-model="zx.jjb" @change="getzxclick(4)">界别</el-checkbox>
                                <el-select v-model="zx.circlesType" :disabled="!zxshow[4]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
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
                                <el-checkbox v-model="ty.cj" class="antxt" @change="gettyclick(1)">法院等级</el-checkbox>
                                <el-select v-model="ty.levelType" :disabled="!tyshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='tyshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="ty.sjfy" @change="gettyclick(2)">四级法院</el-checkbox>
                                <el-select v-model="ty.orgid" :disabled="!tyshow[2]"   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="ty.xjfy">含下级法院</el-checkbox>
                            </span>
                            <span class="ah12" v-if='tyshow[2]'>
                             <el-checkbox class="ml-20 antxt" v-model="ty.jb" @change="gettyclick(3)">届别</el-checkbox>
                             <el-select v-model="ty.periodType"  :disabled="!tyshow[3]" placeholder="请选择"  size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in $store.state.jbb"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                </el-option>
                             </el-select>
                            </span>
                            <span class="ah12" v-if='tyshow[3]'>
                                <el-checkbox class="ml-20 antxt" v-model="ty.tylb" @change="gettyclick(4)">特约类别</el-checkbox>
                                <el-select v-model="ty.groupType" :disabled="!tyshow[4]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
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
                            <span class="ml-40 ah12" v-if='sjshow[0]'>
                                <el-checkbox v-model="sj.ksrq" class="antxt" @change="getsjclick(1)">开始日期</el-checkbox>
                                 <el-date-picker 
                                     v-model="sj.begindate" format="yyyy-MM-dd"
                                    type="date" size="mini" value-format="yyyy-MM-dd"
                                    placeholder="开始日期" class="aninput" :disabled="!sjshow[1]">
                                 </el-date-picker> 
                            </span>
                             <span class="ah12" v-if='sjshow[1]'>
                                <el-checkbox v-model="sj.jsrq" class="ml-20 antxt" @change="getsjclick(2)">结束日期</el-checkbox>
                                 <el-date-picker 
                                     v-model="sj.enddate" format="yyyy-MM-dd"
                                    type="date" size="mini" value-format="yyyy-MM-dd"
                                    placeholder="结束日期" class="aninput" :disabled="!sjshow[2]">
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
                                <el-checkbox v-model="kzdw.fyjb" class="antxt" @change="getkzdwclick(1)">法院级别</el-checkbox>
                                <el-select v-model="kzdw.levelType" :disabled="!kzdwshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='kzdwshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="kzdw.fydw" @change="getkzdwclick(2)">法院单位</el-checkbox>
                                <el-select v-model="kzdw.orgid" :disabled="!kzdwshow[2]"   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="kzdw.xjfy">含下级法院</el-checkbox>
                            </span>
                            <span class="ah12" v-if='kzdwshow[2]'>
                             <el-checkbox class="ml-20 antxt" v-model="kzdw.kzbm" @change="getkzdwclick(3)">开展部门</el-checkbox>
                             <el-select v-model="kzdw.suborgid"  :disabled="!kzdwshow[3]" placeholder="请选择"  size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in $store.state.jbb"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                </el-option>
                             </el-select>
                            </span>
                            <span class="ah12" v-if='kzdwshow[3]'>
                                <el-checkbox class="ml-20 antxt" v-model="kzdw.yld" @change="getkzdwclick(4)">院领导</el-checkbox>
                                <el-select v-model="kzdw.groupType" :disabled="!kzdwshow[4]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                             </span>
                        </el-col>
                         <el-col :span="24">
                            <el-checkbox v-model="bldwchecked" @change="getbldwclick(0)">办理单位</el-checkbox>
                            <span class="ml-40 ah12" v-if='bldwshow[0]'>
                                <el-checkbox v-model="bldw.fyjb" class="antxt" @change="getbldwclick(1)">法院级别</el-checkbox>
                                <el-select v-model="bldw.levelType" :disabled="!bldwshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='bldwshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="bldw.fydw" @change="getbldwclick(2)">法院单位</el-checkbox>
                                <el-select v-model="bldw.orgid" :disabled="!bldwshow[2]"   placeholder="请输入关键字搜索"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                               <el-checkbox  v-model="bldw.xjfy">含下级法院</el-checkbox>
                            </span>
                            <span class="ah12" v-if='bldwshow[2]'>
                             <el-checkbox class="ml-20 antxt" v-model="bldw.blbm" @change="getbldwclick(3)">办理部门</el-checkbox>
                             <el-select v-model="bldw.suborgid"  :disabled="!bldwshow[3]" placeholder="请选择"  size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in $store.state.jbb"
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
                                <el-checkbox v-model="hddd.sheng" class="antxt" @change="gethdddclick(1)">省</el-checkbox>
                                <el-select v-model="hddd.levelType" :disabled="!hdddshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='hdddshow[1]'>
                                <el-checkbox class="ml-20 antxt" v-model="hddd.shi" @change="gethdddclick(2)">市</el-checkbox>
                                <el-select v-model="hddd.orgid" :disabled="!hdddshow[2]"   placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                                </el-select>
                            </span>
                            <span class="ah12" v-if='hdddshow[2]'>
                             <el-checkbox class="ml-20 antxt" v-model="hddd.qx" @change="gethdddclick(3)">区县</el-checkbox>
                             <el-select v-model="hddd.suborgid"  :disabled="!hdddshow[3]" placeholder="请选择"  size="mini" class="aninput">
                                <el-option
                                 v-for="(item,ind) in $store.state.jbb"
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
                                <el-select v-model="llhd.levelType" :disabled="!llhdshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
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
                                <el-select v-model="gzaj.levelType" :disabled="!gzajshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
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
                                <el-select v-model="yajy.levelType" :disabled="!yajyshow[1]"  placeholder="请选择"  size="mini" class="aninput">
                                    <el-option
                                    v-for="(item,ind) in $store.state.jbb"
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
               <el-col :span="24"  class="tjtable">
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
export default {
      components: {MyTable},
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
           sjshow:[],

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

           pp:{show1:false,show2:false,show3:false,show4:false,
           show5:false,show6:false,show7:false,show8:false,
           show9:false,show10:false,show11:false,show12:false,
           show13:false},

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
        }
    },
    mounted(){
      this.$store.dispatch('getJbb');
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
       getrdclick(t){
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
                   break;
              case 1:
                   this.rdshow[1]=!this.rdshow[1];
                   this.rdshow[2]=false;
                   this.rdshow[3]=false;
                   this.rdshow[4]=false;
                   this.$set(this.rd, 'sjrd', false);
                   this.$set(this.rd, 'xjrd', false);
                   this.$set(this.rd, 'jb', false);
                   this.$set(this.rd, 'tb', false);
                   break;
              case 2:
                   this.rdshow[2]=!this.rdshow[2];
                   this.rdshow[3]=false;
                   this.rdshow[4]=false;
                   this.$set(this.rd, 'jb', false);
                   this.$set(this.rd, 'tb', false);
                   break;
              case 3:
                   this.rdshow[3]=!this.rdshow[3];
                   this.rdshow[4]=false;
                   this.$set(this.rd, 'tb', false);
                   break;
              case 4:
                   this.rdshow[4]=!this.rdshow[4];
                   break;
               default:
                   break;
           }
       },
       getzxclick(t){
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
                   break;
              case 1:
                   this.zxshow[1]=!this.zxshow[1];
                   this.zxshow[2]=false;
                   this.zxshow[3]=false;
                   this.zxshow[4]=false;
                   this.$set(this.zx, 'sjzx', false);
                   this.$set(this.zx, 'xjzx', false);
                   this.$set(this.zx, 'jb', false);
                   this.$set(this.zx, 'jjb', false);
                   break;
              case 2:
                   this.zxshow[2]=!this.zxshow[2];
                   this.zxshow[3]=false;
                   this.zxshow[4]=false;
                   this.$set(this.zx, 'jb', false);
                   this.$set(this.zx, 'jjb', false);
                   break;
              case 3:
                   this.zxshow[3]=!this.zxshow[3];
                   this.zxshow[4]=false;
                   this.$set(this.zx, 'jjb', false);
                   break;
              case 4:
                   this.zxshow[4]=!this.zxshow[4];
                   break;
               default:
                   break;
           }
       },
       gettyclick(t){
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
                   break;
              case 1:
                   this.tyshow[1]=!this.tyshow[1];
                   this.tyshow[2]=false;
                   this.tyshow[3]=false;
                   this.tyshow[4]=false;
                   this.$set(this.ty, 'sjfy', false);
                   this.$set(this.ty, 'xjfy', false);
                   this.$set(this.ty, 'jb', false);
                   this.$set(this.ty, 'tylb', false);
                   break;
              case 2:
                   this.tyshow[2]=!this.tyshow[2];
                   this.tyshow[3]=false;
                   this.tyshow[4]=false;
                   this.$set(this.ty, 'jb', false);
                   this.$set(this.ty, 'tylb', false);
                   break;
              case 3:
                   this.tyshow[3]=!this.tyshow[3];
                   this.tyshow[4]=false;
                   this.$set(this.ty, 'tylb', false);
                   break;
              case 4:
                   this.tyshow[4]=!this.tyshow[4];
                   break;
               default:
                   break;
           }
       },
       //时间范围
       getsjclick(t){
         switch (t) {
             case 0:
                 this.sjshow[0]=!this.sjshow[0];
                 this.sjshow[1]=false;
                 this.sjshow[2]=false;
                 this.$set(this.sj, 'ksrq', false);
                 this.$set(this.sj, 'jsrq', false);
                 break;
             case 1:
                 this.sjshow[1]=!this.sjshow[1];
                 this.sjshow[2]=false;
                 this.$set(this.sj, 'jsrq', false);
                 break;
             case 2:
                 this.sjshow[2]=!this.sjshow[2];
                 break;
             default:
                 break;
         }
       },
       //开展单位
        getkzdwclick(t){
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
                   break;
              case 1:
                   this.kzdwshow[1]=!this.kzdwshow[1];
                   this.kzdwshow[2]=false;
                   this.kzdwshow[3]=false;
                   this.kzdwshow[4]=false;
                   this.$set(this.kzdw, 'fydw', false);
                   this.$set(this.kzdw, 'xjfy', false);
                   this.$set(this.kzdw, 'kzbm', false);
                   this.$set(this.kzdw, 'yld', false);
                   break;
              case 2:
                   this.kzdwshow[2]=!this.kzdwshow[2];
                   this.kzdwshow[3]=false;
                   this.kzdwshow[4]=false;
                   this.$set(this.kzdw, 'kzbm', false);
                   this.$set(this.kzdw, 'yld', false);
                   break;
              case 3:
                   this.kzdwshow[3]=!this.kzdwshow[3];
                   this.kzdwshow[4]=false;
                   this.$set(this.kzdw, 'yld', false);
                   break;
              case 4:
                   this.kzdwshow[4]=!this.kzdwshow[4];
                   break;
               default:
                   break;
           }
       },
       //办理单位
        getbldwclick(t){
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
                   break;
              case 1:
                   this.bldwshow[1]=!this.bldwshow[1];
                   this.bldwshow[2]=false;
                   this.bldwshow[3]=false;
                   this.$set(this.bldw, 'fydw', false);
                   this.$set(this.bldw, 'xjfy', false);
                   this.$set(this.bldw, 'blbm', false);
                   break;
              case 2:
                   this.bldwshow[2]=!this.bldwshow[2];
                   this.bldwshow[3]=false;
                   this.$set(this.bldw, 'blbm', false);
                   break;
              case 3:
                   this.bldwshow[3]=!this.bldwshow[3];
                   break;
             
               default:
                   break;
           }
       },
        //活动地点
        gethdddclick(t){
           switch (t) {
              case 0:
                   this.hdddshow[0]=!this.hdddshow[0];
                   this.hdddshow[1]=false;
                   this.hdddshow[2]=false;
                   this.hdddshow[3]=false;
                   this.$set(this.hddd, 'sheng', false);
                   this.$set(this.hddd, 'shi', false);
                   this.$set(this.hddd, 'qx', false);
                 
                   break;
              case 1:
                   this.hdddshow[1]=!this.hdddshow[1];
                   this.hdddshow[2]=false;
                   this.hdddshow[3]=false;
                    this.$set(this.hddd, 'shi', false);
                   this.$set(this.hddd, 'qx', false);
                   break;
              case 2:
                   this.hdddshow[2]=!this.hdddshow[2];
                   this.hdddshow[3]=false;
                   this.$set(this.hddd, 'blbm', false);
                   break;
              case 3:
                   this.hdddshow[3]=!this.hdddshow[3];
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
                 
                   break;
              case 1:
                   this.llhdshow[1]=!this.llhdshow[1];
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
                 
                   break;
              case 1:
                   this.gzajshow[1]=!this.gzajshow[1];
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
                 
                   break;
              case 1:
                   this.yajyshow[1]=!this.yajyshow[1];
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