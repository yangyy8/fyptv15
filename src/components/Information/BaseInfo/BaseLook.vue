<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 基本信息库 <span class="mlr_10">/</span>  <b>基本信息录入</b></span> </div>
         <div class="content">
             <el-row type="flex">
                 <el-col :span="18">
                     <!-- 基本信息 -->
                     <div class="pairleft" >
                       <div class="top tit">基本信息</div>
                       <el-row type="flex" class="con">
                           <el-col :span="18">
                                  <el-row :gutter="2" class="context">
                                    <el-col :span="12" >
                                        <span class="yy-input-text">姓名</span>
                                        <el-input placeholder="请输入内容" size="small" clearable v-model="form.personName"  class="yy-input-input" ></el-input>
                                     </el-col>
                                       <el-col :span="12" >
                                        <span class="yy-input-text">性别</span>
                                          <el-select v-model="form.sex" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" >
                                        <span class="yy-input-text">代表证号</span>
                                        <el-input placeholder="请输入内容" size="small" clearable v-model="form1.cardNumber"  class="yy-input-input" ></el-input>
                                     </el-col>
                                       <el-col :span="12" >
                                        <span class="yy-input-text">届别</span>
                                        <el-select v-model="form1.periodType" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                       <el-col :span="12" >
                                        <span class="yy-input-text">团别</span>
                                        <el-select v-model="form1.groupType" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" >
                                        <span class="yy-input-text">党派</span>
                                        <el-select v-model="form.partisan" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" >
                                        <span class="yy-input-text">级别</span>
                                        <el-select v-model="form1.levelType" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" >
                                        <span class="yy-input-text">选举单位</span>
                                        <el-select v-model="form1.electUnitsid" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" >
                                        <span class="yy-input-text">所属部门</span>
                                        <el-select v-model="form1.subOrgId" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" >
                                        <span class="yy-input-text">结对信息</span>
                                        <el-input placeholder="请添加" size="small" clearable v-model="form.zjhm"  class="yy-input-input" ></el-input>
                                     </el-col>
                                     <el-col :span="12" >
                                        <span class="yy-input-text">所属巡回法庭</span>
                                        <el-select v-model="form1.circuitCourtId" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                     <el-col :span="12" >
                                        <span class="yy-input-text">籍贯</span>
                                       <el-select v-model="form.birthPlace" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" >
                                        <span class="yy-input-text">民族</span>
                                        <el-select v-model="form.nationality" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                     <el-col :span="12" >
                                        <span class="yy-input-text">学历</span>
                                        <el-select v-model="form.education" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                     <el-col :span="12" >
                                        <span class="yy-input-text">出生日期</span>
                                        <el-date-picker
                                            v-model="form.birthday" format="yyyy-MM-dd"
                                            type="date" size="small" value-format="yyyy-MM-dd"
                                            placeholder="选择日期" class="yy-input-input" >
                                        </el-date-picker>
                                     </el-col>
                                     <el-col :span="12" >
                                        <span class="yy-input-text">职业类别</span>
                                        <el-select v-model="form.jobType" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                     <el-col :span="12" >
                                        <span class="yy-input-text">职业</span>
                                        <el-input placeholder="请输入内容" size="small" clearable v-model="form.job"  class="yy-input-input" ></el-input>
                                     </el-col>
                                     <el-col :span="12" >
                                        <span class="yy-input-text">固定电话</span>
                                        <el-input placeholder="请输入内容" size="small" clearable v-model="form.fixedPhone"  class="yy-input-input" ></el-input>
                                     </el-col>
                                     <el-col :span="12" >
                                        <span class="yy-input-text">手机号码</span>
                                        <el-input placeholder="请输入内容" size="small" clearable v-model="form.mobilePhone"  class="yy-input-input" ></el-input>
                                     </el-col>
                                   
                                     <el-col :span="24" >
                                        <span class="yy-input-text" style="width:13.5%!important">通讯地址</span>
                                        <el-input placeholder="" size="small" clearable v-model="form.address"  class="yy-input-input" style="width:80%!important;" ></el-input>
                                     </el-col>
                                      <el-col :span="24" >
                                        <span class="yy-input-text" style="width:13.5%!important">研究方向</span>
                                        <el-input placeholder="" size="small" clearable v-model="form.resdirection"  class="yy-input-input" style="width:80%!important;" ></el-input>
                                     </el-col>
                                      <el-col :span="24" >
                                        <span class="yy-input-text" style="width:13.5%!important">专业特长</span>
                                        <el-input placeholder="" size="small" clearable v-model="form.specialties"  class="yy-input-input" style="width:80%!important;" ></el-input>
                                     </el-col>
                                      <el-col :span="24" >
                                        <span class="yy-input-text" style="width:13.5%!important">关注领域</span>
                                        <el-input placeholder="" size="small" clearable v-model="form.focusareas"  class="yy-input-input" style="width:80%!important;" ></el-input>
                                     </el-col>
                                      <el-col :span="12">
                                          <!-- 查看的时候需要显示 -->
                                          <el-checkbox v-model="pd.is1">最高人民法院特约人员</el-checkbox>
                                     </el-col>
                                       <el-col :span="12">
                                          <el-checkbox v-model="pd.is2">省部级以上领导</el-checkbox>
                                     </el-col>
                                       <el-col :span="12">
                                          <el-checkbox v-model="pd.is3">全国人大专门委员会委员</el-checkbox>
                                     </el-col>
                                      <el-col :span="12">
                                          <el-checkbox v-model="pd.is4">全国人大常委会委员</el-checkbox>
                                     </el-col>
                                      <el-col :span="12">
                                          <el-checkbox v-model="pd.is5">在京代表</el-checkbox>
                                     </el-col>
                                     <el-col :span="12">
                                          <el-checkbox v-model="pd.is7">连任代表</el-checkbox>  
                                          <span class="lfont ml-20" v-if='pd.is7'>连任届数</span>
                                          <el-input-number v-model="form1.ReelectionNum" v-if='pd.is7' controls-position="right" size="mini"  :min="1" :max="10" style="width:80px"></el-input-number>

                                     </el-col>
                                     <el-col :span="12">
                                          <el-checkbox v-model="pd.is6">专门委员会</el-checkbox>
                                            <el-select v-model="form1.specialCommitteeId" v-if='pd.is6' filterable clearable default-first-option placeholder="请选择" size="mini" class="ml-20" style="width:57%;">
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                     
                                     <el-col :span="12">
                                          <el-checkbox v-model="pd.is8">不再担任代表</el-checkbox>
                                          <span class="lfont ml-20" v-if='pd.is8'>不任代表原因</span>
                                           <el-select v-model="form1.isNotHoldReason" v-if="pd.is8" filterable clearable default-first-option placeholder="请选择"  size="mini" style="width:31%;">
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.dm+' - '+item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                  </el-row>
                             
                           </el-col>
                           <el-col :span="6" style="min-width:207px;margin-right:5px;text-align: center;margin-top:10px;">
                               <img src="../../../assets/img/mrt.png"><br/><br/>
                               <el-button type="primary" plain size="small" style="width:207px;" @click="Upload()">上传照片</el-button>
                           </el-col>
                       </el-row>
                     </div>
                     <!-- 参加活动 -->
                     <div class="pairleft" id="box2" style="margin-top:30px;">
                       
                         <div class="top" ><div class="title">参加活动</div></div>
                         <div class="list">
                            <el-row class="mt-15">
                          
                              <el-button type="primary" class="ml-20" size="small" @click="getLR()">录入</el-button>
                              <el-button type="success" size="small" plain  :disabled="bnthd">修改</el-button>
                              <el-button type="primary" size="small" plain  :disabled="bnthd">查看</el-button>
                              <el-button type="danger"  size="small" plain  :disabled="bnthd">删除</el-button>
                              
                            </el-row>
                          <el-table
                            ref="multipleTable"
                            :data="tableData1">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                            <el-table-column
                                prop="mc"
                                label="标题">
                            </el-table-column>
                            <el-table-column
                                prop="sfyx"
                                label="开始时间">
                            </el-table-column>
                            <el-table-column
                                prop="cjrc"
                                label="结束时间">
                            </el-table-column>
                            <el-table-column
                                prop="cjmc"
                                label="地点">
                            </el-table-column>
                            <el-table-column
                                prop="cjsj"
                                label="类型">
                            </el-table-column>
                              <el-table-column
                                prop="cjsj"
                                label="组织单位">
                            </el-table-column>
                              <el-table-column
                                prop="cjsj"
                                label="开展单位">
                            </el-table-column>
                              <el-table-column
                                prop="cjsj"
                                label="录入单位">
                            </el-table-column>
                              <el-table-column
                                prop="cjsj"
                                label="录入时间">
                            </el-table-column>
                           </el-table>
                           <!-- <div class="loadmore">全部展开 <i class="iconfont el-icon-yy-jiantou2"></i></div> -->
                         </div>
                     </div>
                    <!-- 议案建议 -->
                     <div class="pairleft" id="box3">
                         <div class="hline"></div>
                         <div class="title">议案建议</div>
                         <div class="list">
                            <el-row class="mt-15">
                            
                              <el-button type="primary" size="small" >录入</el-button>
                              <el-button type="success" size="small" plain  :disabled="yabnt">修改</el-button>
                              <el-button type="primary" size="small" plain  :disabled="yabnt">查看</el-button>
                              <el-button type="danger"  size="small" plain  :disabled="yabnt">删除</el-button>
                              
                            </el-row>
                          <el-table
                            ref="multipleTable"
                            :data="tableData2">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="mc"
                                label="编号">
                            </el-table-column>
                            <el-table-column
                                prop="mc"
                                label="类型">
                            </el-table-column>
                            <el-table-column
                                prop="sfyx"
                                label="性质">
                            </el-table-column>
                            <el-table-column
                                prop="cjrc"
                                label="提出时间">
                            </el-table-column>
                            <el-table-column
                                prop="cjmc"
                                label="是否领衔">
                            </el-table-column>
                            <el-table-column
                                prop="cjsj"
                                label="办理状况">
                            </el-table-column>
                              <el-table-column
                                prop="cjsj"
                                label="录入单位">
                            </el-table-column>
                              <el-table-column
                                prop="cjsj"
                                label="录入时间">
                            </el-table-column>
                           </el-table>

                           <!-- <div class="loadmore">全部展开 <i class="iconfont el-icon-yy-jiantou2"></i></div> -->
                         </div>
                     </div>
                    <!-- 关注案件 -->
                     <div class="pairleft" id="box4">
                       
                         <div class="hline"></div>
                         <div class="title">关注案件</div>
                         <div class="list">
                            <el-row class="mt-15">
                              <el-button type="primary" size="small">录入</el-button>
                              <el-button type="primary" size="small" plain  :disabled="ajbnt">查看</el-button>
                              <el-button type="success" size="small" plain  :disabled="ajbnt">修改</el-button>
                              <el-button type="danger"  size="small" plain  :disabled="ajbnt">删除</el-button>
                            </el-row>
                          <el-table
                            ref="multipleTable"
                            :data="tableData3"
                            >
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="mc"
                                label="来文字号">
                            </el-table-column>
                            <el-table-column
                                prop="mc"
                                label="案件编号">
                            </el-table-column>
                            <el-table-column
                                prop="sfyx"
                                label="性质">
                            </el-table-column>
                            <el-table-column
                                prop="cjrc"
                                label="当事人及案由" width="130">
                            </el-table-column>
                            <el-table-column
                                prop="cjmc"
                                label="案件类型">
                            </el-table-column>
                            <el-table-column
                                prop="cjsj"
                                label="来文期间">
                            </el-table-column>
                              <el-table-column
                                prop="cjsj"
                                label="是否领衔">
                            </el-table-column>
                              <el-table-column
                                prop="cjsj"
                                label="办理状况">
                            </el-table-column>
                              <el-table-column
                                prop="cjsj"
                                label="录入单位">
                            </el-table-column>
                              <el-table-column
                                prop="cjsj"
                                label="录入时间">
                            </el-table-column>
                           </el-table>
                           
                           <!-- <div class="loadmore">全部展开 <i class="iconfont el-icon-yy-jiantou2"></i></div> -->
                         </div>
                     </div>
                    <!-- 获奖信息 -->
                     <div class="pairleft" id="box5">
                       
                         <div class="hline"></div>
                         <div class="title">获奖信息</div>
                         <div class="list">
                            <!-- <el-row class="mt-15">
                             <el-col :span="24" style="text-align:right"> 
                              <el-button type="primary" size="small" @click="add(1,0)">录入</el-button>
                              <el-button type="success" size="small" plain  :disabled="hjbnt" @click="add(1,1)">修改</el-button>
                              <el-button type="primary" size="small" plain  :disabled="hjbnt"  @click="add(1,2)">查看</el-button>
                              <el-button type="danger"  size="small" plain  :disabled="hjbnt" @click="remove(1)"> 删除</el-button>
                             </el-col>
                            </el-row> -->
                          <el-table
                            ref="multipleTable"
                            :data="hjTableData"
                            @selection-change="hjchangeFun">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="gettime"
                                label="获奖时间">
                            </el-table-column>
                            <el-table-column
                                prop="awardname"
                                label="获奖名称">
                            </el-table-column>
                            <el-table-column
                                prop="awardunit"
                                label="颁奖单位">
                            </el-table-column>
                           </el-table>
                           <!-- <div class="loadmore">全部展开 <i class="iconfont el-icon-yy-jiantou2"></i></div> -->
                         </div>
                     </div>
                    <!-- 职务及变动情况 -->
                     <div class="pairleft" id="box6">
                       
                         <div class="hline"></div>
                         <div class="title">职务及变动情况</div>
                         <div class="list">
                            <!-- <el-row class="mt-15">
                            <el-col :span="24" style="text-align:right"> 
                              <el-button type="primary" size="small" @click="add(2,0)">录入</el-button>
                              <el-button type="success" size="small" plain  :disabled="bnt" @click="add(2,1)">修改</el-button>
                              <el-button type="primary" size="small" plain  :disabled="bnt"  @click="add(2,2)">查看</el-button>
                              <el-button type="danger"  size="small" plain  :disabled="bnt" @click="remove(2)"> 删除</el-button>
                            </el-col>
                            </el-row> -->
                          <el-table
                            ref="multipleTable"
                            :data="zwTableData"
                            :default-sort = "{prop: 'cjsj', order: 'descending'}"
                            @selection-change="changeFun">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="beforeOrg"
                                label="原工作单位">
                            </el-table-column>
                            <el-table-column
                                prop="beforePosition"
                                label="原任职务">
                            </el-table-column>
                            <el-table-column
                                prop="nowOrg"
                                label="现工作单位">
                            </el-table-column>
                              <el-table-column
                                prop="nowPosition"
                                label="现任职务">
                            </el-table-column>
                              <el-table-column
                                prop="changeDate"
                                label="变动时间">
                            </el-table-column>
                           </el-table>
                           <!-- <div class="loadmore">全部展开 <i class="iconfont el-icon-yy-jiantou2"></i></div> -->
                         </div>
                     </div>
                     <div class="footer">
                    
                        <el-button   style="width:130px;" @click="$router.go(-1)">返  回</el-button>
                    </div>
                 </el-col>
                  <el-col :span="6" class="pairright">
                    <transition name="el-zoom-in-top">
                       <div class="listbg" :class="'bg'+activeindex">
                           <ul>
                               <li :class="activeindex==1?'active':''" @click="getBase(1)">基本信息</li>
                               <li style="margin-top:58px;" :class="activeindex==2?'active':''" @click="getBase(2)">参加活动</li>
                               <li style="margin-top:60px;" :class="activeindex==3?'active':''" @click="getBase(3)">议案建议</li>
                               <li style="margin-top:61px;" :class="activeindex==4?'active':''" @click="getBase(4)">关注案件</li>
                               <li style="margin-top:62px;" :class="activeindex==5?'active':''" @click="getBase(5)">获奖信息</li>
                               <li style="margin-top:63px;" :class="activeindex==6?'active':''" @click="getBase(6)">职务及变动情况</li>
                            </ul>
                       </div>
                    </transition>
                  </el-col>
            </el-row>


         </div>
            <el-dialog title="选择活动类型" :visible.sync="hdDialogVisible" >
             <div style="text-align:center;height:50px;">
                <el-radio v-model="hdtype" label="1" border>结对活动录入</el-radio>
                <el-radio v-model="hdtype" label="2" border>专项视察录入</el-radio>
                <el-radio v-model="hdtype" label="3" border>专题调研录入</el-radio>
                <el-radio v-model="hdtype" label="4" border>旁听庭审录入</el-radio>
                <el-radio v-model="hdtype" label="5" border>见证执行录入</el-radio>
             </div><div style="text-align:center">
               
                <el-radio v-model="hdtype" label="6" border>会议座谈录入</el-radio>
                <el-radio v-model="hdtype" label="7" border>日常走访录入</el-radio>
                <el-radio v-model="hdtype" label="8" border>新闻宣传录入</el-radio>
                <el-radio v-model="hdtype" label="9" border>日常接待录入</el-radio>
                <el-radio v-model="hdtype" label="10" border>其它活动录入</el-radio>
             </div>

            <div slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" @click="goadd()">进行录入</el-button>
              <el-button @click="hdDialogVisible = false" size="small">取 消</el-button>
            </div>
       </el-dialog>
 
    </div>
</template>
<script scoped>
import {formatDate} from '@/assets/js/date.js'
import UPLOADIMG from "../../Common/uploadimg"
export default {
    components:{UPLOADIMG},
    data(){
        return{
            form:{},
            form1:{ReelectionNum:1},
            pd:{},
            zwdia:'新增职务变动',
            zwform:{},
            zwTableData:[],
            zwtb:0,
            zwck:true,
            uurl:'',
            uploadDialogVisible:false,
            zwDialogVisible:false,
            hjdia:'新增获奖信息', 
            hjform:{},
            hjTableData:[],
            hjtb:0,
            hjck:true,
            hjDialogVisible:false,
            multipleSelection:[],
            hjmultipleSelection:[],
            tableData1:[],
            tableData2:[],
            tableData3:[],
            tableData4:[],
            bnt:true,
            hjbnt:true,
            bnthd:true,
            yabnt:true,
            ajbnt:true,
            activeindex:1,
            hdtype:'1',
            hdDialogVisible:false,
        };
    },
    mounted()
    {
        this.$store.dispatch('getXb');
        // window.addEventListener('scroll', this.getscroll)
    },
    methods:{

           getscroll(){
             
                    let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
                    let offsetTop1 = document.querySelector('#box1').offsetTop
                    let offsetTop2 = document.querySelector('#box2').offsetTop
                    let offsetTop3 = document.querySelector('#box3').offsetTop
                    let offsetTop4 = document.querySelector('#box4').offsetTop
                    let offsetTop5 = document.querySelector('#box5').offsetTop
                    let offsetTop6 = document.querySelector('#box6').offsetTop
                    if(top<offsetTop2){
                        this.getBase(1);
                    }
                    if(top>=offsetTop2 && top<offsetTop3){
                        this.getBase(2);
                    }
                    if(top>=offsetTop3 && top<offsetTop4){
                        this.getBase(3);
                    }
                    if(top>=offsetTop4 && top<offsetTop5){
                        this.getBase(4);
                    }
                    if(top>=offsetTop5 && top<offsetTop6){
                        this.getBase(5);
                    }
                    
           },
            destroyed () {
                window.removeEventListener('scroll', this.getscroll)
            },
            changeFun(val) {
                this.multipleSelection = val;
                this.bnt=false;
            },
            hjchangeFun(val) {
                this.hjmultipleSelection = val;
                this.hjbnt=false;
            },
            getBase(t){
                this.activeindex=t;
                document.querySelector('#box'+t).scrollIntoView(true);
            },
            fatherMethod(){
              this.uploadDialogVisible = false;
            },
            Upload(){
                this.uploadDialogVisible=true;
            },
            add(t,n){
                if(t==2){
                   this.zwtb=n;
                   this.zwck=true;
                   if(this.zwtb==0){
                       this.zwform={} ;
                       this.zwdia="新增职务变动";
                   }else if(this.zwtb==1){
                       if(this.multipleSelection.length>1){
                               this.$message.error("只能选择一条信息！");return;
                       }
                       this.zwform=this.multipleSelection[0];
                       this.zwdia="编辑职务变动";
                   }else{
                       if(this.multipleSelection.length>1){
                               this.$message.error("只能选择一条信息！");return;
                       }
                       this.zwck=false;
                   }
                   
                    this.zwDialogVisible=true;
                }else if(t==1){
                   this.hjtb=n;
                   this.hjck=true;
                   if(this.hjtb==0){
                       this.hjform={} ;
                       this.hjdia="新增获奖信息";
                   }else if(this.hjtb==1){
                       if(this.hjmultipleSelection.length>1){
                               this.$message.error("只能选择一条信息！");return;
                       }
                       this.hjform=this.hjmultipleSelection[0];
                       this.hjdia="编辑获奖信息";
                   }else{
                        if(this.hjmultipleSelection.length>1){
                               this.$message.error("只能选择一条信息！");return;
                       }
                       this.hjck=false;
                   }
                   
                    this.hjDialogVisible=true;
                }
            },
            remove(t)
            {
                if(t==2){
                   var arr=this.multipleSelection;
                  for (let i = 0; i < arr.length; i++) {
                     var index = this.zwTableData.findIndex(item =>{
　　　　　　　　　  　 if(item.id==arr[i].id){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　　　　　　this.zwTableData.splice(index,1)
                      
                  }
                }else if(t==1)
                {
                      var arr=this.hjmultipleSelection;
                   for (let i = 0; i < arr.length; i++) {
                     var index = this.hjTableData.findIndex(item =>{
　　　　　　　　　  　 if(item.id==arr[i].id){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　　　　　　this.hjTableData.splice(index,1)
                      
                  }
                }
            },
            addsave(t){
                if(t==2){
                    //  this.id=formatDate(new Date(), 'yyyymmddhhmmss');
                     this.zwTableData.push(this.zwform);
                     this.zwTableData=this.unique(this.zwTableData,2);
                     this.zwDialogVisible=false;
                     
                }else if(t==1){
                     this.hjTableData.push(this.hjform);
                     this.hjTableData=this.unique(this.hjTableData,1);
                     this.hjDialogVisible=false;
                     console.log(this.hjform);
                }
            },
            //去重
            unique(arr,t) {
                const res = new Map();
                if(t==2){
                return arr.filter((arr) => !res.has(arr.nowOrg) && res.set(arr.nowOrg, 1))
                }else if(t==1){
                    return arr.filter((arr) => !res.has(arr.gettime) && res.set(arr.gettime, 1))
                }
            },
            getLR(){
                this.hdDialogVisible=true;
            },
            goadd(){
          
                this.hdDialogVisible=false;
                if(this.hdtype==1){
                this.$router.push({name:'PairAdd',query:{type:this.hdtype}});
                }else{
                this.$router.push({name:'SpecialAdd',query:{type:this.hdtype}});
                }
            },
            submit(){
                let p={
                    'baseInfo':this.form,
                    'representative':this.form1,
                    'position':this.zwTableData,
                    'awardsList':this.hjTableData,
                };
            this.$api.post(this.Global.aport1+'/representative/create',p,
             r =>{
                this.hdlx=r.data;
            });
            },
           
    },
}
</script>
<style scoped>
.listbg{height: 398px;position:fixed;z-index:999;}
.bg1{background: url('../../../assets/img/jd/jd1.png') no-repeat left;}
.bg2{background: url('../../../assets/img/jd/jd2.png') no-repeat left;}
.bg3{background: url('../../../assets/img/jd/jd3.png') no-repeat left;}
.bg4{background: url('../../../assets/img/jd/jd4.png') no-repeat left;}
.bg5{background: url('../../../assets/img/jd/jd5.png') no-repeat left;}
.bg6{background: url('../../../assets/img/jd/jd6.png') no-repeat left;}
.listbg ul{padding-left: 20px; font-size: 14px;}
.listbg ul li{cursor: pointer;}
.listbg ul li:hover{color: #0088CE;}
.listbg .active{color: #0088CE}

</style>