<template>
    <div class="pairadd " >
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 基本信息 
             <span class="mlr_10">/</span>  <b>联络对象</b></span>
              <span class="mlr_10">/</span>  <b>{{cname}}</b>
             <span class="mlr_10" v-if='cname1!=""'>/</span>  <b v-if='cname1!=""'>{{cname1}}{{cname}}</b>
             <span class="mlr_10" v-if='xzqhmc!="" && xzqhmc!=null'>/</span>  <b v-if='xzqhmc!=""  && xzqhmc!=null'>{{xzqhmc}}{{cname}}</b>
             <span class="mlr_10" v-if='cname2!="" && cname2!=null'>/</span> <b v-if='cname2!="" && cname2!=null'>{{cname2}}</b>
             <span class="mlr_10">/</span>  <b>{{cname3==''?cname:cname3}}基本信息{{wtitle=='11'?'':wtitle}}</b>
              </div>
         <div class="content subtable" id="box1">
             <el-row type="flex">
                 <el-col :span="21">
                     <!-- 基本信息 -->
                     <div class="pairleft" >
                       <div class="top tit">{{cname3==''?cname:cname3}}基本信息{{wtitle=='11'?'':wtitle}}</div>
                       <el-row type="flex" class="con">
                           <el-col :span="18">
                                  <el-row :gutter="2" class="context">
                                    <el-col :span="12" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 姓名</span>
                                        <el-input placeholder="请输入内容" size="small"  :disabled="ckshow"
                                         @blur="getZNSB()" clearable v-model="form.personName"   class="yy-input-input" ></el-input>
                                     </el-col>
                                       <el-col :span="12" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 性别</span>
                                          <el-select v-model="form.sex" :disabled="ckshow" @change="getZNSB()" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xb"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                        <el-col :span="12" v-if='ntype!="3"' class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 籍贯</span>
                                        <!-- :filter-method="userFilter" -->
                                           <el-select v-model="form.birthPlace" remote :remote-method="xzdwremoteMethod" v-el-select-loadmore="xzloadmore" :disabled="ckshow" @change="getNullVlaue(form.birthPlace,1);getZNSB()"  @visible-change="getXz()"  filterable clearable  placeholder="请选择"  size="small" class="yy-input-input" >
                                                <el-option
                                                    v-for="(item,ind) in xzdata"
                                                    :key="ind"
                                                    :label="item.mc"
                                                    :value="item.dm">
                                                </el-option>
                                            </el-select>
                                     </el-col>
                                         <el-col :span="12" class="input-item">
                                        <span class="yy-input-text">
                                            <img src="../../../assets/img/xhw.png" v-if='kjdshow'>
                                            <img src="../../../assets/img/xh.png" v-else>
                                            
                                             出生日期</span>
                                        <!-- <el-date-picker @change="getZNSB()"
                                            v-model="form.birthday" format="yyyy-MM-dd"
                                            type="date" size="small" value-format="yyyy-MM-dd"
                                            placeholder="选择日期" class="yy-input-input" :disabled="ckshow">
                                        </el-date-picker> -->
                                        <el-select v-model="form.year" :disabled="ckshow" @change="getBmonth(form.year);getBday(form.year,form.month);" style="width:22%"  filterable clearable default-first-option placeholder="年"  size="small">
                                            <el-option
                                                v-for="(item,ind) in byear"
                                                :key="ind"
                                                :label="item"
                                                :value="item">
                                            </el-option>
                                         </el-select>
                                        <el-select v-model="form.month" :disabled="ckshow"  @change="getBday(form.year,form.month);getZNSB()" style="width:18%"  filterable clearable default-first-option placeholder="月"  size="small" :no-data-text="form1.year==''|| form1.year==undefined?'先选择年':'无数据'">
                                            <el-option
                                                v-for="(item,ind) in bmonth"
                                                :key="ind"
                                                :label="item"
                                                :value="item">
                                            </el-option>
                                         </el-select>
                                         <el-select v-model="form.day" :disabled="ckshow"  @change="getZNSB()" style="width:20%"  filterable clearable default-first-option placeholder="日"  size="small" :no-data-text="form1.month==''|| form1.month==undefined?'先选择年月':'无数据'">
                                            <el-option
                                                v-for="(item,ind) in bday"
                                                :key="ind"
                                                :label="item"
                                                :value="item">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" v-if='allshow'>
                                        <span class="yy-input-textleft">
                                          <img src="../../../assets/img/xh.png" v-if="(ntype=='1' || ntype=='3') &&  !pd.is1">  <img v-else src="../../../assets/img/xhw.png"> 手机号码</span>
                                        <div  class="yy-input-inputleft">
                                            <div v-for="(tt,ind) in rows" :key='ind'>
                                            <el-input placeholder="请输入内容" size="small" :disabled="ckshow" @blur="getZNSB(tt.mobilePhone)" v-model="tt.mobilePhone" clearable  maxlength="11" class="rwidth"></el-input>
                                            <i class="el-icon-plus cursor" size="mini" v-if='!ckshow' @click="addrow"></i>
                                            <i class="el-icon-minus cursor" style="color:red" size="mini" v-if='ind!=0 && !ckshow' @click="deleterow(ind)"></i>
                                            </div>
                                            <div v-if="ntype=='1' || ntype=='3'" style="font-size:12px; color:red;line-height:20px;">选择"省部级以上"后，此项不作为必须录入项目</div>
                                        </div>
                                     </el-col>
                                    
                                      <el-col :span="12" class="input-item" v-if='allshow'>
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 固定电话</span>
                                        <el-input placeholder="请输入内容" size="small" :disabled="ckshow" @blur="getZNSB()" clearable v-model="form.fixedPhone" maxlength="15"  class="yy-input-input" ></el-input>
                                     </el-col>
                                   
                                      <el-col :span="12" v-if="lbmc==''" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png">  
                                        {{labelorg}}
                                        </span>
                                        <el-select v-model="form1.orgId" remote :remote-method="ssdwremoteMethod" v-el-select-loadmore="ssdwloadmore"  :disabled="ckshow || dwshow"  @change="getJB(form1.orgId);getBM(form1.orgId,0);getXJDW(form1.orgId,0);getXHFT(form1.orgId,0);getZMWFY(form1.orgId,0);getWorkList(form1.orgId,0);getJDXX(form1.orgId,0);getJJB();getTYLBList()"  filterable  clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in ssdwdata"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.orgid">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      
                                       <el-col :span="12" v-if="(ntype=='1' || ntype=='2' ) || (ntype=='3' && lbshow)" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 层级</span>
                                        <el-select v-model="form1.levelType" v-if='addtype=="1" || addtype=="2"' @change="getNJB();getJJB();getTYLBList()"  :disabled="ckshow || (jb!=null && form1.levelType!=null)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.jbb"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                         <el-select v-model="form1.levelType" v-else  @change="getTYJB()"  :disabled="ckshow || (jb!=null && form1.levelType!=null)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.fyjb"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                       <el-col :span="12" v-if="ntype=='3' && lbshow" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 特约职务</span>
                                          <el-select v-model="form1.specialType" @change="getTJ(form1.specialType);getTYJB();getTJDW()" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="form1.orgId==''||form1.orgId==undefined?'请先选择'+labelorg:'无数据'">
                                            <el-option
                                                v-for="(item,ind) in tylblist"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                       <el-col :span="12" v-if="ntype!='4' && !(ntype=='3'&&form1.periodType&&lb)" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 届别</span>
                                        <el-select v-model="form1.periodType" @change="getjblist(1,form1.periodType);getJJB();getTJDW()" :disabled="ckshow || (jkey!='' && jkey!=null)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="form1.levelType==''||form1.levelType==undefined?(ntype=='3'?'请先选择'+labelorg+'和特约职务':'请先选择'+labelorg+'和层级'):'无数据'">
                                            <el-option
                                                v-for="(item,ind) in jblist"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" v-if="ntype=='1'" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 团别</span>
                                        <el-select v-model="form1.groupType" :disabled="ckshow || (jb!=null && form1.groupType!=null && code!=null)" @change="getJDXX(form1.orgId,0,form1.groupType);getBJDTB(form1.groupType);getXHFT(form1.orgId,0);" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="form1.orgId==''||form1.orgId==undefined?'请先选择'+labelorg:'无数据'">
                                            <el-option
                                                v-for="(item,ind) in tbdata"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                         <el-col :span="12" v-if="ntype=='2'" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 界别</span>
                                        <el-select v-model="form1.circlesType" :disabled="ckshow || (jb!=null && form1.circlesType!=null && form1.circlesType!='' && code!=null)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="form1.orgId==''||form1.orgId==undefined?'请先选择'+labelorg+'和届别':'无数据'">
                                            <el-option
                                                v-for="(item,ind) in jjblist"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" v-if="ntype=='1' || ntype=='2'" class="input-item">
                                        <span class="yy-input-text" :title='label1'>
                                            <img src="../../../assets/img/xh.png"> {{label1}}
                                            </span>
                                        <el-input placeholder="请输入内容" size="small" :disabled="ckshow" clearable v-model="form1.cardNumber"  class="yy-input-input" ></el-input>
                                     </el-col>
                                    
                                    <el-col :span="12" v-if="ntype=='3'" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 推荐单位</span>
                                        <div class="yy-input-inputleft">
                                          <el-select v-model="form1.recommendedUnitsIDs" v-if='tjshow' multiple :multiple-limit="limit" :disabled="ckshow" :no-data-text="form1.specialType?'无数据':'请先选择特约职务'" filterable clearable default-first-option placeholder="请选择"  size="small" style="width:100%">
                                            <el-option
                                                v-for="(item,ind) in tjdwlist"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>

                                         <!-- <el-select v-model="form1.recommendedUnitsIDs" v-else :disabled="ckshow" multiple :multiple-limit="limit" filterable clearable default-first-option placeholder="请选择"  size="small" style="width:100%" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.tyzxytjdw"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select> -->
                                          <div style="font-size:12px; color:red;line-height:20px;">最多只能选择2个
                                            推荐单位
                                         </div>
                                        </div>
                                     </el-col>
                                      <el-col :span="12" v-if="ntype=='1'" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 选举单位</span>
                                        <el-select v-model="form1.electUnitsid" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择" :no-data-text="form1.orgId==''||form1.orgId==undefined?'请先选择'+labelorg:'无数据'"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in xjdwdata"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.orgid">
                                            </el-option>
                                         </el-select>
                                        
                                     </el-col>
                                        <el-col :span="12" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 民族</span>
                                        <el-select v-model="form.nationality" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.mz"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                       <el-col :span="12" v-if="ntype=='4'" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 所属部门</span>
                                        <el-select v-model="form1.subOrgId"  :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="form1.orgId==''||form1.orgId==undefined?'请先选择所属单位':'无数据'">
                                            <el-option
                                                v-for="(item,ind) in wyhdata1"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.orgid">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" v-if="ntype=='4'" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 职务</span>
                                         <el-select v-model="form1.subOrgPosition" @change="getJDZWLB(form1.subOrgPosition)" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.zw"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <!-- <el-col :span="12" v-if="ntype=='4'" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 兼职部门</span>
                                        <el-select v-model="form1.jzsubOrgId"  :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="form1.orgId==''||form1.orgId==undefined?'请先选择所属单位':'无数据'">
                                            <el-option
                                                v-for="(item,ind) in wyhdata1"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.orgid">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                      <el-col :span="12" v-if="ntype=='4'" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 兼职职务</span>
                                         <el-select v-model="form1.jzsubOrgPosition" @change="getJDZWLB(form1.jzsubOrgPosition)" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.zw"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col> -->
                                      
                                      <el-col :span="12">
                                        <span class="yy-input-textleft"><img src="../../../assets/img/xhw.png"> 
                                         <span>政治面貌</span>
                                        </span>
                                       <div class="yy-input-inputleft">
                                        <el-select v-model="form.partisans" :disabled="ckshow" multiple :multiple-limit="limit" filterable clearable default-first-option placeholder="请选择"  size="small" style="width:100%" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.dp"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                         <div style="font-size:12px; color:red;line-height:20px;">最多只能选择2个
                                            政治面貌
                                         </div>
                                        </div>
                                     </el-col>
                                     <el-col :span="12" v-if='ntype=="3"' class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 身份</span>
                                        <!-- :filter-method="userFilter" -->
                                           <el-select v-model="form1.specialIdentityType" :disabled="ckshow"   filterable clearable  placeholder="请选择"  size="small" class="yy-input-input" >
                                                <el-option
                                                    v-for="(item,ind) in $store.state.tysf"
                                                    :key="ind"
                                                    :label="item.mc"
                                                    :value="item.dm">
                                                </el-option>
                                            </el-select>
                                     </el-col>
                                    
                                      <el-col :span="12" v-if='ntype=="3"' class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 地区</span>
                                        <!-- :filter-method="userFilter" -->
                                           <el-select v-model="form1.area" :disabled="ckshow"  remote :remote-method="xzdwremoteMethod" v-el-select-loadmore="xzloadmore"  @visible-change="getXz()" @change="getSFZJ(form1.area)"  filterable clearable   placeholder="请选择"  size="small" class="yy-input-input" >
                                                <el-option
                                                    v-for="(item,ind) in xzdata"
                                                    :key="ind"
                                                    :label="item.mc"
                                                    :value="item.dm">
                                                </el-option>
                                            </el-select>
                                     </el-col>
                                      <el-col :span="12" class="input-item" v-if='ntype=="3"'>
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 传真</span>
                                        <el-input placeholder="请输入内容" size="small" :disabled="ckshow"  clearable v-model="form.fax" maxlength="15"  class="yy-input-input" ></el-input>
                                     </el-col>
                                     <el-col :span="12" class="input-item" v-if='ntype=="3"'>
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 邮编</span>
                                        <el-input placeholder="请输入内容" size="small" :disabled="ckshow" clearable v-model="form.postCode" maxlength="15"  class="yy-input-input" ></el-input>
                                     </el-col>
                                      <el-col :span="12" v-if="ntype!='3'" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 学历</span>
                                        <el-select v-model="form.education" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xl"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                    <el-col :span="12" v-if="ntype!='3'" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 学位</span>
                                        <el-select v-model="form.degree" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.xw"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                     
                                     
                                      <!-- <el-col :span="12" v-if="ntype=='4'" class="input-item">
                                        <span class="yy-input-text">账号</span>
                                        <el-input placeholder="请输入" size="small" :disabled="ckshow" clearable v-model="pr.intranetAccount"  class="yy-input-input" ></el-input>
                                     </el-col>
                                     <el-col :span="12" v-if="ntype=='4'" class="input-item">
                                        <span class="yy-input-text">密码</span>
                                        <el-input placeholder="请输入" size="small" show-password :disabled="ckshow" clearable v-model="pr.intranetPassword"  class="yy-input-input" ></el-input>
                                     </el-col> -->
                                     
                                     <el-col :span="24" >
                                        <div class="yy-input-textleft" style="width:13.5%!important"><img src="../../../assets/img/xhw.png"> 职业类别</div>
                                        <div class="yy-input-inputleft"  style="width:80%!important">
                                        <el-select v-model="form.jobType" :disabled="ckshow" multiple :multiple-limit="limit" filterable clearable default-first-option placeholder="请选择"  size="small"  style="width:100%" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.zylb"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>   
                                         <div style="font-size:12px; color:red;line-height:20px">最多只能选择2个类别</div>
                                        </div>
                                     </el-col>                                
                                      <el-col :span="24" v-if='addtype!="4"' class="input-item">
                                        <span class="yy-input-text" style="width:13.5%!important"><img src="../../../assets/img/xh.png"> 单位职务</span>
                                        <el-input placeholder="" size="small" :disabled="ckshow" clearable v-model="form.job"  class="yy-input-input" style="width:80%!important;"></el-input>
                                     </el-col>
                                     <el-col :span="24" v-if='addtype!="4"' class="input-item">
                                        <span class="yy-input-text" style="width:13.5%!important"><img src="../../../assets/img/xhw.png"> 社会职务</span>
                                        <el-input placeholder="" size="small" :disabled="ckshow" clearable v-model="form.socialDuty"  class="yy-input-input" style="width:80%!important;"></el-input>
                                     </el-col>
                                    
                                     <!-- <el-col :span="24" v-if="ntype=='3'">
                                        <span class="yy-input-text" style="width:13.5%!important">推荐信息</span>
                                        <el-input placeholder="" size="small" clearable  :disabled="ckshow" v-model="form1.recommendedInformation"  class="yy-input-input" style="width:80%!important;" ></el-input>
                                     </el-col> -->
                                     <el-col :span="24" class="input-item" v-if='allshow'>
                                        <span class="yy-input-text" style="width:13.5%!important">
                                            <img src="../../../assets/img/xhw.png"> 
                                           <span v-if="ntype=='3'">联系地址</span>
                                           <span v-else> 通讯地址</span>
                                            </span>
                                        <el-input placeholder="" size="small" :disabled="ckshow" clearable v-model="form.address"  class="yy-input-input" style="width:80%!important;" ></el-input>
                                     </el-col>
                                      <el-col :span="24" v-if="ntype!='3'" class="input-item">
                                        <span class="yy-input-text" style="width:13.5%!important"><img src="../../../assets/img/xhw.png"> 研究方向</span>
                                        <el-input placeholder="" size="small"  :disabled="ckshow" clearable v-model="form.resdirection"  class="yy-input-input" style="width:80%!important;" ></el-input>
                                     </el-col>
                                      <el-col :span="24" v-if="ntype!='3'" class="input-item">
                                        <span class="yy-input-text" style="width:13.5%!important"><img src="../../../assets/img/xhw.png"> 专业特长</span>
                                        <el-input placeholder="" size="small" :disabled="ckshow" clearable v-model="form.specialties"  class="yy-input-input" style="width:80%!important;" ></el-input>
                                     </el-col>
                                      <el-col :span="24" v-if="ntype!='3'" class="input-item">
                                        <span class="yy-input-text" style="width:13.5%!important"><img src="../../../assets/img/xhw.png"> 关注领域</span>
                                        <el-input placeholder="" size="small" :disabled="ckshow" clearable v-model="form.focusareas"  class="yy-input-input" style="width:80%!important;" ></el-input>
                                     </el-col>
                                 <el-col :span="12" v-if="ntype=='1' && jdshow" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 结对法院领导</span>
                                      <el-select v-model="form1.pairPersonId" @change="getClear(form1.pairPersonId)" remote :remote-method="jdxxdwremoteMethod" v-el-select-loadmore="jdxxloadmore" :disabled="ckshow" filterable clearable  default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="form1.orgId==''||form1.orgId==undefined?'请先选择'+labelorg:'无数据'">
                                            <el-option
                                                v-for="(item,ind) in fyrydata"
                                                :key="ind"
                                                :label="item.fullName"
                                                :value="item.courtPersonId">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                     <el-col :span="12" v-if="ntype=='1' && jdshow" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xh.png"> 结对时间</span>
                                        <el-date-picker 
                                            v-model="form1.pairTime" format="yyyy-MM-dd"
                                            type="date" size="small" value-format="yyyy-MM-dd"
                                            placeholder="选择日期" class="yy-input-input" :disabled="ckshow || form1.pairPersonId=='' || form1.pairPersonId==null">
                                        </el-date-picker>
                                     </el-col>
                                    <el-col :span="12" v-if="ntype=='1' || ntype=='3'" class="input-item">
                                        <span class="yy-input-text"><img src="../../../assets/img/xhw.png"> 所属巡回法庭</span>
                                        <el-select v-model="form1.circuitCourtId" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="form1.orgId==''||form1.orgId==undefined?'请先选择'+labelorg:'无数据'" >
                                            <el-option
                                                v-for="(item,ind) in xhftdata"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.orgid">
                                            </el-option>
                                         </el-select>
                                     </el-col>
                                     </el-row>
                                    <el-row :gutter="2" class="context" v-if="ntype!='4'">
                                        <el-col :span="12">
                                             <el-row style="padding-left:8px;">
                                                <!-- <el-col :span="12" v-if="ntype=='3'">
                                                    <el-checkbox v-model="pd.is9" :disabled="ckshow">人大代表</el-checkbox>
                                                </el-col>
                                                <el-col :span="12" v-if="ntype=='3'">
                                                    <el-checkbox v-model="pd.is8" :disabled="ckshow">政协委员</el-checkbox>
                                                </el-col> -->
                                                <el-col :span="24" class="input-item">
                                                    <el-checkbox v-model="pd.is1" :disabled="ckshow">省部级以上</el-checkbox>
                                                </el-col>
                                                 
                                                <!-- <el-col :span="12" v-if="ntype!='3'" :disabled="ckshow">
                                                    <el-checkbox v-model="pd.is6">专门委员会</el-checkbox>
                                                    
                                                </el-col> -->
                                                 <el-col :span="24" v-if="ntype!='3'" class="input-item">
                                                    <el-checkbox v-model="pd.is3" :disabled="ckshow">常委会委员</el-checkbox>
                                                </el-col>
                                                <el-col :span="24" v-if="ntype!='3'" class="input-item">
                                                    <el-checkbox v-model="pd.is6" :disabled="ckshow" @change="getworkout(0)">专门委员会委员</el-checkbox>
                                                    <!-- <span class="lfont ml-20" v-if='pd.is6'>专门委员会</span> -->
                                                    &nbsp;
                                                    <el-select v-model="form1.specialCommitteeId" :disabled="ckshow" v-if='pd.is6' filterable clearable default-first-option placeholder="请选择" size="mini" :no-data-text="form1.orgId==''||form1.orgId==undefined?'请先选择'+labelorg:'无数据'">
                                                        <el-option
                                                            v-for="(item,ind) in wyhdata2"
                                                            :key="ind"
                                                            :label="item.mc"
                                                            :value="item.orgid">
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="24" v-if="ntype=='1'" class="input-item">
                                                    <el-checkbox v-model="pd.is13" :disabled="ckshow" @change="getworkout(1)">工作委员会委员</el-checkbox>
                                                     &nbsp;
                                                    <el-select v-model="form1.workCommitteeId" :disabled="ckshow" v-if='pd.is13' filterable clearable default-first-option placeholder="请选择" size="mini" :no-data-text="form1.orgId==''||form1.orgId==undefined?'请先选择'+labelorg:'无数据'">
                                                        <el-option
                                                            v-for="(item,ind) in worklist"
                                                            :key="ind"
                                                            :label="item.mc"
                                                            :value="item.orgid">
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="24" class="input-item">
                                                    <el-checkbox v-model="pd.is4" :disabled="ckshow">
                                                        <span v-if="ntype=='1'">在京代表</span>
                                                        <span v-if="ntype=='2'">在京委员</span>
                                                        <span v-if="ntype=='3'">在京特约人员</span>
                                                    </el-checkbox>
                                                </el-col>
                                                 <el-col :span="24" v-if="ntype=='1' || ntype=='2'" class="input-item">
                                                    <el-checkbox v-model="pd.is10" :disabled="true">特约人员</el-checkbox>
                                                
                                                </el-col>
                                             </el-row>
                                        </el-col>
                                         <el-col :span="12">
                                             <el-row>
                                                <el-col :span="24" class="input-item">
                                                    <el-checkbox v-model="pd.is5" :disabled="ckshow" @change="getckdata(1)">
                                                        连任 &nbsp;
                                                        </el-checkbox>  
                                                    <!-- <span class="lfont ml-20" v-if='pd.is5'>连任</span> -->
                                                    <el-select v-model="form1.reelections" @change="getLRData(form1.reelections)" :disabled="ckshow" v-if='pd.is5' multiple  filterable clearable default-first-option placeholder="请选择" size="mini" style="width:30%" >
                                                        <el-option
                                                            v-for="(item,ind) in jblistlr"
                                                            :key="ind"
                                                            :label="item.mc"
                                                            :value="item.dm">
                                                        </el-option>
                                                    </el-select>
                                                    &nbsp;
                                                    <el-input v-model="form1.reelectionNum" :disabled="true"  v-if='pd.is5' size="mini"  :min="1" :max="10" style="width:50px"></el-input> 
                                                    &nbsp;
                                                    <span class="lfont" v-if='pd.is5'>届</span>
                                                </el-col>
                                                <el-col :span="24" class="input-item" v-if="ntype=='1' || ntype=='2'">
                                                    <el-checkbox v-model="pd.is14" :disabled="ckshow" @change="getckdata(2)">
                                                        曾任代表  &nbsp;
                                                        </el-checkbox>  
                                                    <el-select v-model="form1.formerRepresentatives" :disabled="ckshow" v-if='pd.is14' multiple  filterable clearable default-first-option placeholder="请选择" size="mini" style="width:45%">
                                                        <el-option
                                                            v-for="(item,ind) in jblistdb"
                                                            :key="ind"
                                                            :label="item.mc"
                                                            :value="item.dm">
                                                        </el-option>
                                                    </el-select>
                                                    
                                                </el-col>
                                                <el-col :span="24" class="input-item" v-if="ntype=='1' || ntype=='2'">
                                                    <el-checkbox v-model="pd.is15" :disabled="ckshow" @change="getckdata(3)">
                                                        曾任委员  &nbsp;
                                                        </el-checkbox> 
                                                    <el-select v-model="form1.formerMembers" :disabled="ckshow" v-if='pd.is15' multiple  filterable clearable default-first-option placeholder="请选择" size="mini" style="width:45%">
                                                        <el-option
                                                            v-for="(item,ind) in jblistwy"
                                                            :key="ind"
                                                            :label="item.mc"
                                                            :value="item.dm">
                                                        </el-option>
                                                    </el-select>
                                                    
                                                </el-col>
                                                <el-col :span="24" v-if="ntype!='4'" :disabled="ckshow" class="input-item">
                                                    <el-checkbox v-model="pd.is11" :disabled="ckshow" @change="getckdata(4)">
                                                        <span v-if='ntype=="3"'>增补</span> 
                                                        <span v-else>补选</span>  &nbsp;
                                                        </el-checkbox>
                                                    <el-date-picker v-if='pd.is11'
                                                        v-model="form1.repairTime" format="yyyy-MM-dd"
                                                        type="date" size="mini" value-format="yyyy-MM-dd"
                                                        placeholder="选择日期"  :disabled="ckshow" style="width:50%">
                                                    </el-date-picker>
                                                </el-col>
                                                <el-col :span="24" v-if="ntype=='3'" class="input-item">
                                                    <el-checkbox v-model="pd.is12" :disabled="ckshow" @change="getckdata(5)">
                                                        解聘 </el-checkbox>   &nbsp;
                                                    <el-select v-model="form1.fireReason" :disabled="ckshow"  v-if="pd.is12" filterable clearable default-first-option placeholder="请选择"  size="mini" >
                                                        <el-option
                                                            v-for="(item,ind) in $store.state.jpyy"
                                                            :key="ind"
                                                            :label="item.mc"
                                                            :value="item.dm">
                                                        </el-option>
                                                    </el-select>
                                            </el-col>
                                            <el-col :span="24" v-if="ntype!='3'" class="input-item">
                                                <el-checkbox v-model="pd.is7" :disabled="ckshow" @change="getckdata(6)">不再担任</el-checkbox> &nbsp;
                                                <!-- <span class="lfont ml-20" v-if='pd.is7' >原因</span> -->
                                                <el-select v-model="form1.isNotHoldReason" :disabled="ckshow"  v-if="pd.is7" filterable clearable default-first-option placeholder="请选择"  size="mini" >
                                                    <el-option
                                                        v-for="(item,ind) in $store.state.bzdr"
                                                        :key="ind"
                                                        :label="item.mc"
                                                        :value="item.dm">
                                                    </el-option>
                                                </el-select>
                                            </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                           </el-col>
                           <el-col :span="5" style="min-width:207px;margin-right:5px;text-align: center;margin-top:10px;">
                               <img :src="tximg" width="200" height="220"><br/><br/>
                               <el-button type="primary"  v-if='!ckshow'  plain size="small" style="width:207px;" @click="Upload()">上传照片</el-button>
                           </el-col>
                       </el-row>
                     </div>
                      <!-- 获奖信息 -->
                     <div class="pairleft" id="box5">
                       
                         <div class="hline"></div>
                         <div class="title">获奖信息</div>
                         <div class="list">
                            <el-row class="mt-15" >
                              <el-button type="primary" size="small" v-if="!ckshow" @click="add(1,0)">添加</el-button>
                              <el-button type="success" size="small" v-if="!ckshow" plain  :disabled="hjbnt" @click="add(1,1)">修改</el-button>
                              <el-button type="primary" size="small" plain  :disabled="hjbnt"  @click="add(1,2)">查看</el-button>
                              <el-button type="danger"  size="small" plain  v-if="!ckshow" :disabled="hjbnt" @click="remove(1)"> 删除</el-button>
                             
                            </el-row>
                          <el-table
                            ref="hjmultiple"
                            @row-click="hjclickRow"
                            :data="hjTableData1"
                            :row-class-name="hjtableRowClassName"
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
                                prop="getTime"
                                label="获奖时间">
                            </el-table-column>
                            <el-table-column
                                prop="awardName"
                                label="获奖名称">
                            </el-table-column>
                            <el-table-column
                                prop="awardUnit"
                                label="颁奖单位">
                            </el-table-column>
                           </el-table>
                          
                         <div class="loadmore" v-if="hjall==1" @click="getHDZW('',1)">展开更多 <i class="el-icon-arrow-down"></i></div>
                           <div class="loadmore" v-else-if="hjall==2" @click="getHDZW(hyanum,1)">收起 <i class="el-icon-arrow-up"></i></div>
                         </div>
                     </div>
                    <!-- 职务及变动情况 -->
                     <div class="pairleft" id="box6">
                       
                         <div class="hline"></div>
                         <div class="title">职务及变动情况</div>
                         <div class="list">
                            <el-row class="mt-15" >
                           
                              <el-button type="primary" size="small" v-if="!ckshow" @click="add(2,0)">添加</el-button>
                              <el-button type="success" size="small" v-if="!ckshow" plain  :disabled="bnt" @click="add(2,1)">修改</el-button>
                              <el-button type="primary" size="small" plain  :disabled="bnt"  @click="add(2,2)">查看</el-button>
                              <el-button type="danger"  size="small" v-if="!ckshow" plain  :disabled="bnt" @click="remove(2)"> 删除</el-button>
                            
                            </el-row>
                          <el-table
                            ref="zwmultiple"
                            :data="zwTableData1"
                            @row-click="zwclickRow"
                            :row-class-name="zwtableRowClassName"
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
                          <div class="loadmore" v-if="zwall==1" @click="getHDZW('',2)">展开更多 <i class="el-icon-arrow-down"></i></div>
                           <div class="loadmore" v-else-if="zwall==2" @click="getHDZW(hyanum,2)">收起 <i class="el-icon-arrow-up"></i></div>
                         </div>
                     </div>
                      <!-- 结对信息 -->
                    <div v-if="(state=='1' || state=='9')"  style="margin-top:30px;">
                    <div class="pairleft" id="box7" v-if='addtype==4 && kjdshow'>
                         <div class="top" ><div class="title">结对信息</div></div>
                         <div class="list">
                            <el-row class="mt-15" >
                              <el-button type="primary"  size="small" v-if="!ckshow" @click="addJD('0')">添加</el-button>
                              <el-button type="success" size="small" plain v-if="!ckshow"   @click="addJD('1')">修改</el-button>
                              <!-- <el-button type="primary" size="small" plain  :disabled="jdbnt" @click="addJD('9')">查看</el-button> -->
                              <!-- <el-button type="danger"  size="small" plain  :disabled="jdbnt" @click="delJD()">删除</el-button> -->
                            </el-row>
                          <el-table
                            ref="multipleTablejd"
                            :data="jdtableData"
                            @row-click="jdclickRow"
                            @selection-change="jdChange"
                            >
                            <!-- <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column> -->
                            <el-table-column
                                type="index"
                                label="序号">
                            </el-table-column>
                            <el-table-column
                                prop="personName"
                                label="结对人">
                            </el-table-column>
                            <el-table-column
                                prop="pairTime"
                                label="结对时间">
                            </el-table-column>
                           
                           </el-table>
                           <div class="loadmore" v-if="jdall==1" @click="getJDHD('')">展开更多 <i class="el-icon-arrow-down"></i></div>
                           <div class="loadmore" v-else-if="jdall==2" @click="getJDHD(hyanum)">收起 <i class="el-icon-arrow-up"></i></div>
                         </div>
                     </div>
                     
                     <div class="pairleft" id="box2">
                         <div class="top" ><div class="title">参加活动</div></div>
                         <div class="list">
                            <el-row class="mt-15" >
                              <el-button type="primary"  size="small" v-if="!ckshow" @click="getLR('0')">添加</el-button>
                              <el-button type="success" size="small" plain v-if="!ckshow"  :disabled="hdbnt" @click="getLR('1')">修改</el-button>
                              <el-button type="primary" size="small" plain  :disabled="hdbnt" @click="getLR('9')">查看</el-button>
                              <!-- <el-button type="danger"  size="small" plain  :disabled="hdbnt">删除</el-button> -->
                            </el-row>
                          <el-table
                            ref="multipleTablehd"
                            :data="hdtableData"
                            @row-click="hdclickRow"
                            @selection-change="hdChange"
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
                                prop="theme"
                                label="标题">
                            </el-table-column>
                            <el-table-column
                                prop="startTime"
                                label="开始时间">
                            </el-table-column>
                            <el-table-column
                                prop="endTime"
                                label="结束时间">
                            </el-table-column>
                            <el-table-column
                                prop="location"
                                label="地点">
                            </el-table-column>
                            <el-table-column
                                prop="activityType"
                                label="类型">
                            </el-table-column>
                              <!-- <el-table-column
                                prop="orgUnit"
                                label="组织单位">
                            </el-table-column> -->
                              <el-table-column
                                prop="developmentUnit"
                                label="开展单位">
                            </el-table-column>
                              <el-table-column
                                prop="entryUnit"
                                label="录入单位">
                            </el-table-column>
                              <el-table-column
                                prop="entryTime"
                                label="录入时间">
                            </el-table-column>
                           </el-table>
                         
                           <div class="loadmore" v-if="hdall==1" @click="getCJHD('')">展开更多 <i class="el-icon-arrow-down"></i></div>
                           <div class="loadmore" v-else-if="hdall==2" @click="getCJHD(hyanum)">收起 <i class="el-icon-arrow-up"></i></div>
                         </div>
                     </div>
                    <!-- 议案建议 -->
                     <div class="pairleft" id="box3" v-if='addtype!=4'>
                         <div class="hline"></div>
                         <div class="title">{{labelya}}</div>
                         <div class="list">
                            <el-row class="mt-15" >
                            
                              <el-button type="primary" size="small" v-if="!ckshow" @click="getLRinfo(1,0)">添加</el-button>
                              <el-button type="success" size="small" plain v-if="!ckshow"  :disabled="yabnt" @click="getLRinfo(1,1)">修改</el-button>
                              <el-button type="primary" size="small" plain   :disabled="yabnt" @click="getLRinfo(1,9)">查看</el-button>
                              <!-- <el-button type="danger"  size="small" plain  :disabled="yabnt">删除</el-button> -->
                              
                            </el-row>
                          <el-table
                            ref="multipleTableya"
                            :data="yatableData"
                            @row-click="yaclickRow"
                            @selection-change="yaChange">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="year"
                                label="年份">
                            </el-table-column>
                             <el-table-column
                                prop="number"
                                label="编号">
                            </el-table-column>
                            <el-table-column
                                prop="proposalType"
                                label="类型">
                            </el-table-column>
                            <!-- <el-table-column
                                prop="underTakeNature"
                                label="性质">
                            </el-table-column> -->
                            <el-table-column
                                prop="registerTime"
                                label="提出时间">
                            </el-table-column>
                            <el-table-column
                                prop="isLeader"
                                label="是否领衔">
                                <template slot-scope="scope">
                                    <div>
                                        <i v-if='scope.row.isLeader=="是"' class="el-icon-check" style="color:green;font-size:20px"></i>
                                        <i v-else class="el-icon-close" style="color:red;font-size:20px"></i>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="handStatus"
                                label="办理状况">
                            </el-table-column>
                              <el-table-column
                                prop="entryOrg"
                                label="录入单位">
                            </el-table-column>
                              <el-table-column
                                prop="entryTime"
                                label="录入时间">
                            </el-table-column>
                           </el-table>

                           <div class="loadmore" v-if="yaall==1" @click="getYA('')">展开更多 <i class="el-icon-arrow-down"></i></div>
                           <div class="loadmore" v-else-if="yaall==2" @click="getYA(hyanum)">收起 <i class="el-icon-arrow-up"></i></div>
                         </div>
                     </div>
                    <!-- 关注案件 -->
                     <div class="pairleft" id="box4" v-if='addtype!=4'>
                       
                         <div class="hline"></div>
                         <div class="title">关注案件</div>
                         <div class="list">
                            <el-row class="mt-15">
                              <el-button type="primary" size="small" v-if="!ckshow" @click="getLRinfo(2,99)">添加</el-button>
                              <el-button type="success" size="small" plain  v-if="!ckshow" :disabled="ajbnt" @click="getLRinfo(2,'0')">修改</el-button>
                              <el-button type="primary" size="small" plain  :disabled="ajbnt" @click="getLRinfo(2,'9')">查看</el-button>

                              <!-- <el-button type="danger"  size="small" plain  :disabled="ajbnt">删除</el-button> -->
                            </el-row>
                          <el-table
                            ref="multipleTableaj"
                            :data="gztableData"
                            @row-click="ajclickRow"
                            @selection-change="ajChange"
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
                                prop="letternumber"
                                label="来文字号">
                            </el-table-column>
                            <el-table-column
                                prop="casenum"
                                label="案件编号">
                            </el-table-column>
                            <el-table-column
                                prop="partiesandcasereason"
                                label="当事人及案由" width="130">
                            </el-table-column>
                            <el-table-column
                                prop="caseclass"
                                label="案件类型">
                            </el-table-column>
                            <el-table-column
                                prop="lettertimes"
                                label="来文期间">
                            </el-table-column>
                              <el-table-column
                                prop="reflectnum"
                                label="反映次数">
                            </el-table-column>
                              <el-table-column
                                prop="adjudgementphase"
                                label="审理阶段">
                            </el-table-column>
                              <el-table-column
                                prop="createorgidname"
                                label="录入单位">
                            </el-table-column>
                              <el-table-column
                                prop="createtime"
                                label="录入时间">
                            </el-table-column>
                           </el-table>
                           
                            <div class="loadmore" v-if="ajall==1" @click="getAJ('')">展开更多 <i class="el-icon-arrow-down"></i></div>
                           <div class="loadmore"  v-else-if="ajall==2" @click="getAJ(hyanum)">收起 <i class="el-icon-arrow-up"></i></div>
                         </div>
                     </div>
                    </div>
                   
                    <div class="footer">
                        <el-button type="primary"  style="width:130px;" @click="submit" v-if="!ckshow && querybnt">提  交</el-button>
                        <el-button type="primary"  style="width:130px;"  v-else-if="!ckshow" :disabled="true">提交中</el-button>
                        <el-button   style="width:130px;" @click="goClose()">关 闭</el-button>
                    </div>
                 </el-col>
                  <el-col :span="3" class="pairright">
                    <transition name="el-zoom-in-top">
                       <div class="listbg">
                           <ul>
                               <li  :class="activeindex==1?'active':''" @click="getBase(1)">基本信息</li>
                               <li  :class="activeindex==5?'active':''" @click="getBase(5)">获奖信息</li>
                               <li  :class="activeindex==6?'active':''" @click="getBase(6)">职务及变动情况</li>
                               <li  :class="activeindex==7?'active':''" @click="getBase(7)" v-if="state!='0' && addtype=='4' && kjdshow">结对信息</li>
                               <li  :class="activeindex==2?'active':''" @click="getBase(2)" v-if="state!='0'">参加活动</li>
                               <li  :class="activeindex==3?'active':''" @click="getBase(3)" v-if="state!='0' && addtype!='4'">{{labelya}}</li>
                               <li  :class="activeindex==4?'active':''" @click="getBase(4)" v-if="state!='0' && addtype!='4'">关注案件</li>

                            </ul>
                       </div>
                    </transition>
                  </el-col>
            </el-row>
         </div>
 
 <el-dialog :title="hjdia" :visible.sync="hjDialogVisible" :close-on-click-modal='false' width="600px">
            <el-form :model="hjform" >
                <el-row class="ah-40">
                      <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 获奖时间：</span>
                         <el-date-picker
                                v-model="hjform.getTime" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="选择时间" class="yy-input-input" :disabled="!hjck">
                                </el-date-picker>
                    </el-col>
                    <el-col :span="24">
                          <span class="yy-input-text trt topt"><font class="red">*</font> 获奖名称：</span>
                         <el-input type="textarea" :disabled="!hjck" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入内容" v-model="hjform.awardName" class="yy-input-input"></el-input>
                    </el-col>
                     <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 颁奖单位：</span>
                        <el-input placeholder="请输入内容" :disabled="!hjck" size="small" clearable v-model="hjform.awardUnit"  class="yy-input-input" ></el-input>
                    </el-col>
                </el-row>
             </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button type="primary"  size="small" @click="addsave(1)" v-if="hjck">保 存</el-button>
              <el-button @click="hjDialogVisible = false" size="small">关  闭</el-button>
            </div>
         </el-dialog>
         <el-dialog :title="zwdia" :visible.sync="zwDialogVisible" :close-on-click-modal='false' width="600px">
            <el-form :model="zwform" >
                <el-row class="ah-40">
                    <el-col :span="24">
                        <span class="yy-input-text trt">原工作单位：</span>
                        <el-input placeholder="请输入内容" size="small" :disabled="!zwck" clearable v-model="zwform.beforeOrg"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt">原任职务：</span>
                        <el-input placeholder="请输入内容" size="small" :disabled="!zwck" clearable v-model="zwform.beforePosition"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 现工作单位：</span>               
                            <el-input placeholder="请输入内容" size="small" :disabled="!zwck" clearable v-model="zwform.nowOrg"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font>  现任职务：</span>
                        <el-input placeholder="请输入内容" size="small" :disabled="!zwck" clearable v-model="zwform.nowPosition"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 变动时间：</span>
                         <el-date-picker
                                v-model="zwform.changeDate" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="选择时间" class="yy-input-input" :disabled="!zwck">
                                </el-date-picker>
                    </el-col>
                    <el-col :span="24">
                          <span class="yy-input-text trt topt">备注：</span>
                         <el-input type="textarea" :disabled="!zwck" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="zwform.remark" class="yy-input-input"></el-input>
                    </el-col>
                </el-row>
             </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button type="primary"  size="small" @click="addsave(2)" v-if="zwck">保 存</el-button>
              <el-button @click="zwDialogVisible=false" size="small">关 闭</el-button>
            </div>
         </el-dialog>

   <el-dialog title="上传图片" :visible.sync="uploadDialogVisible" :close-on-click-modal='false' width="630px">
        <UPLOADIMG :url="uurl" :type="ptype" :personId="personId"  @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOADIMG>
   </el-dialog>
  
     <el-dialog title="智能搜索" :visible.sync="znDialogVisible"  :close-on-click-modal='false' class="subtable">
     <RGZN v-if="znDialogVisible"  :type="ptype" :data="zndata"  @ZNfatherMethod="ZNfatherMethod" :random="new Date().getTime()"></RGZN>
   
   </el-dialog>

    <el-dialog title="选择活动类型" :visible.sync="hdDialogVisible" :close-on-click-modal='false'>
              <el-row style="line-height:50px;">
               <el-col :span="6">
                 <el-radio v-model="addtype" label="1" border>结对活动</el-radio>
               </el-col>
               <el-col :span="6">
                <el-radio v-model="addtype" label="2" border>专项视察</el-radio>
               </el-col>
                <el-col :span="6">
                   <el-radio v-model="addtype" label="3" border>专题调研</el-radio>
               </el-col>
                <el-col :span="6">
                  <el-radio v-model="addtype" label="4" border>旁听庭审</el-radio>
               </el-col>
                <el-col :span="6">
                   <el-radio v-model="addtype" label="5" border>见证执行</el-radio>
               </el-col>
                <el-col :span="6">
                   <el-radio v-model="addtype" label="6" border>会议座谈</el-radio>
               </el-col>
                <el-col :span="6">
                   <el-radio v-model="addtype" label="7" border>走访</el-radio>
               </el-col>
                <el-col :span="6">
                   <el-radio v-model="addtype" label="8" border>新闻宣传</el-radio>
               </el-col>
                <el-col :span="6">
                   <el-radio v-model="addtype" label="9" border>接待来访</el-radio>
               </el-col>
                <el-col :span="6">
                   <el-radio v-model="addtype" label="11" border>日常沟通</el-radio>
               </el-col>
                <el-col :span="6">
                   <el-radio v-model="addtype" label="10" border>其他</el-radio>
               </el-col>
             </el-row>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" @click="goadd()">进行录入</el-button>
              <el-button @click="hdDialogVisible = false" size="small">取 消</el-button>
            </div>
       </el-dialog>
          <el-dialog title="选择议案类型" :visible.sync="yaDialogVisible" :close-on-click-modal='false' width="600px">
             <div style="text-align:center">
                <el-radio v-model="yatype" label="0" border>建议、批评和意见</el-radio>
                <el-radio v-model="yatype" label="1" border>代表议案</el-radio>
                <el-radio v-model="yatype" label="2" border>政协提案</el-radio>
                <el-radio v-model="yatype" label="3" border>审议意见</el-radio>
                <el-radio v-model="yatype" label="4" border>日常建议</el-radio>
             </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" @click="goya()">进行录入</el-button>
              <el-button @click="yaDialogVisible = false" size="small">取 消</el-button>
            </div>
       </el-dialog>
<el-dialog :title="jdtxt" :visible.sync="jdDialogVisible" :close-on-click-modal='false' class="subtable">
                 <el-form :model="formjd" >
                    <el-row class="ah-40">
                    <el-col :span="12">
                        <span class="yy-input-text trt">法院人员：</span>
                          <el-select v-model="formjd.courtInsiderId" :disabled="this.reid!=''" @change="getYjdxx(formjd.courtInsiderId)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in fyrydata1"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.courtPersonId">
                               </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        <span> {{remark}}</span>
                    </el-col>
                    </el-row>
                      <el-row class="ah-40">
                          <el-col :span="12">
                            <span class="yy-input-text trt"><font class="red">*</font> 代表姓名：</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="formjd.jointperson"  class="yy-input-input" ></el-input>
                         </el-col>
                          <el-col :span="12">
                             <el-button type="primary" size="small" @click="getLmName(formjd.jointperson,'1')">检索</el-button>
                          </el-col>
                      </el-row>
                      <el-row class="mt-20">
                           <el-col :span="24">
                              <span style="font-size:15px;font-weight:bold;color:#0077EE">代表信息</span>
                          </el-col>
                          <el-col :span="24">
                              <el-table
                              :data="listdata1"
                              ref="multipleTable">
                               <el-table-column
                                  type="index"
                                  label="序号">
                              </el-table-column>
                              <el-table-column
                                  prop="personName"
                                  label="姓名">
                              </el-table-column>
                               <el-table-column
                                prop="groupType"
                                label="团别">
                            </el-table-column>
                            <el-table-column
                                prop="orgName"
                                label="单位">
                            </el-table-column>
                           <el-table-column
                                prop="cardNumber"
                                label="证号">
                            </el-table-column>
                             <el-table-column
                                prop="pairName"
                                label="结对人员">
                            </el-table-column>
                               <el-table-column
                                  label="操作" width="100">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  class="a-btn"  title="添加"  icon="el-icon-plus" @click="addlist(scope.row)"></el-button>
                                     </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                          </el-col>
                      </el-row>
                       <el-row class="mt-20">
                          <el-col :span="24">
                              <span style="font-size:15px;font-weight:bold;color:#0077EE">已结对信息</span>
                          </el-col>
                          <el-col :span="24">
                              <el-table
                              :data="listdata2"
                              ref="multipleTable"
                              @selection-change="formjdchange">
                              <el-table-column
                                  type="index"
                                  label="序号" width="80">
                              </el-table-column>
                              <el-table-column
                                  prop="personName"
                                  label="姓名">
                              </el-table-column>
                               <el-table-column
                                prop="groupType"
                                label="团别">
                            </el-table-column>
                            <el-table-column
                                prop="orgName"
                                label="单位">
                            </el-table-column>
                              <el-table-column
                                prop="cardNumber"
                                label="证号">
                            </el-table-column>
                               <el-table-column
                                prop="pairName"
                                label="结对人员">
                            </el-table-column>
                               <el-table-column
                                prop="pairTime"
                                label="结对时间">
                            </el-table-column>
                               <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="jddel(scope.row,1)"></el-button>
                                     </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                          </el-col>
                      </el-row>
                 </el-form>
                <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="savelist">保 存</el-button>
                <el-button @click="jdDialogVisible = false" size="small">取 消</el-button>
                </div>
                 </el-dialog>
      <el-dialog :title="diatxt"  :visible.sync="pairsDialogVisible" v-if='pairsDialogVisible' :close-on-click-modal='false'>
      <PAIR  :data="pairdata" :type="addtype" @pairfatherMethod="pairfatherMethod" :random="new Date().getTime()"></PAIR>
  </el-dialog>
    
    </div>
</template>
<script scoped>
import {formatDate,birthdayDay,birthdayMonth,birthdayYear} from '@/assets/js/date.js'
import {ToArray} from '@/assets/js/ToArray.js'
import UPLOADIMG from "../../Common/uploadimg"
import RGZN from "../../Common/Intelligence"
import PAIR from "../../Common/suggest/pairinfo"
export default {
    components:{UPLOADIMG,RGZN,PAIR},
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
            form:{},
            form1:{reelectionNum:'0',levelType:''},
            pd:{is2:false,is1:false,is3:false,
            is4:false,is5:false,is6:false,is7:false,is8:false,
            is9:false,is10:false,is11:false,
            is12:false,is13:false,is14:false,is15:false},
            cname:"",
            zwdia:'新增职务变动',
            zwform:{},
            pr:{},
            zwTableData:[],
            zwTableData1:[],
            hdtableData:[],
            yatableData:[],
            gztableData:[],
            jdtableData:[],
            zndata:{},//智能对象
            formjd:{},
            zwtb:0,
            zwck:true,
            uurl:'/baseinfo/uploadPhoto',
            uploadDialogVisible:false,
            zwDialogVisible:false,
            znDialogVisible:false,
            hjdia:'新增获奖信息', 
            hjform:{},
            hjTableData:[],
            hjTableData1:[],
            hjtb:0,
            hjck:true,
            hdtype:'1',
            yatype:'0',
            hjDialogVisible:false,
            hdDialogVisible:false,
            yaDialogVisible:false,
            jdDialogVisible:false,
            multipleSelection:[],
            hjmultipleSelection:[],
            hjindex:null,
            zwindex:null,
            filedata1:[],
            filedata2:[],
            filedata3:[],
            bnt:true,
            hjbnt:true,
            hdbnt:true,
            yabnt:true,
            ajbnt:true,
            jdbnt:true,
            hdSelection:[],
            yaSelection:[],
            ajSelection:[],
            jdSelection:[],
            formjdSelection:[],
            listdata1:[],
            listdata2:[],
            worklist:[],
            activeindex:1,
            addtype:'1',
            pbid:'',
            reid:'',
            xzdata:[],
            xzList:[],
            label1:'代表证号',
            ntype:'1',
            ptype:'',
            state:'0',
            ssdwdata:[],
            xjdwdata:[],
            fydwdata:[],
            fyrydata:[],
            fyrydata1:[],
            wyhdata1:[],
            wyhdata2:[],
            wyhdata3:[],
            ckshow:false,//用于查看
            tximg:require("../../../assets/img/mrt.png"),
            photoIds:[],//保存头像ID
            xhftdata:[],
            tbdata:[],
            personId:'',//用于上传头像时,
            jb:'',
            hdall:0,
            yaall:0,
            ajall:0,
            jdall:0,
            hjall:0,
            zwall:0,
            hyanum:this.$store.state.pagesize,//默认显示3条
            cname1:'',//级名
            cname2:'',//地方名
            cname3:'',
            jdtxt:'录入结对信息',
            remark:'',
            wtitle:'录入',
            jmc:'',
            jkey:'',
            code:'',//团别
            xzqh:'',//团别上级
            xzqhmc:'',
            zmtype:'',
            hackReset:false,//标记
            psid:'',//personId
            limit:2,
            lbshow:true,
            lb:'',
            tjshow:true,
            orgdm:'',
            listdatatemp:[],
            byear:birthdayYear(),
            bmonth:[],
            bday:[],
            labelorg:'',
            labelya:'议案建议',
            count:1,
            lbmc:'',
            rows:[{
                id:1,
                mobilePhone:'',
            }],
            pairdata:{},
            pairsDialogVisible:false,
            jblist:[],
            jblistlr:[],
            jblistdb:[],
            jblistwy:[],
            depid:'',
            lvl:'',
            jjblist:[],
            tylblist:[],
            kjdshow:false,
            jdshow:true,
            orglvl:'',
            allshow:true,
            jdzwdata:[],//法院职务
            dwshow:false,//单位是否变灰
            jznum:50,//加载数据
            formData: {   //下拉参数
                 pageIndex: 1,
                 pageSize: 20
              },
             tempload:[],
             jdxxload:[],
             ssdwload:[],
             pt:'',
             querybnt:true,
             diatxt:'',
             bs:0,
             tjdwlist:[],


        };
    },
    mounted()
    {
        this.$store.dispatch('getXb');
        // this.$store.dispatch('getJb');
        // this.$store.dispatch('getTb');
        this.$store.dispatch('getDp');
        this.$store.dispatch('getJbb');
        this.$store.dispatch('getMz');
        this.$store.dispatch('getXl');
        this.$store.dispatch('getZylb');
        // this.$store.dispatch('getZmwyh');
        this.$store.dispatch('getBzdr');
        // this.$store.dispatch('getJb');
        // this.$store.dispatch('getCb');
        // this.$store.dispatch('getJjb');
        this.$store.dispatch('getXw');
        // this.$store.dispatch('getJg');
        // this.$store.dispatch('getTylb');
        // this.$store.dispatch('getSydw');
       
        // this.$store.dispatch('getTylb');
        this.$store.dispatch('getFyjb');
        
     
        
        
      
        this.getinit(this.$route);
       
    },
    activated(){
        // this.getinit(this.$route);
    },
    //watch:{
        // $route:function(val){
        //    this.getinit(val);
        // },
   //},
    methods:{
        getLR(n){
            if(n=='0'){
                this.hdDialogVisible=true;
            }else{
             if(this.hdSelection.length==1){
            var array=this.hdSelection[0].activityTypeId;
             var types="";
             switch (array) {
                 case '0149000001'://结对活动
                     types='1';
                     break;
                case '0149000002'://专项视察
                     types='2';
                     break;
                case '0149000003'://专题调研
                     types='3';
                     break;
                case '0149000004'://旁听庭审
                     types='4';
                     break;
                case '0149000005'://见证执行
                     types='5';
                     break;
                case '0149000006'://会议座谈
                     types='6';
                     break;
                case '0149000007'://日常走访
                     types='7';
                     break;
                case '0149000009'://新闻宣传
                     types='8';
                     break;
                case '0149000008'://日常接待
                     types='9';
                     break;
                case '0149000010'://其他
                     types='10';
                     break;
                 default:
                     break;
             }
                    var baseid=this.addtype+"|"+this.state+"|"+this.pbid+"|"+this.reid+"|"+this.wtitle;
            
                    if(types=='1'){
                        this.$router.push({name:'PairAdd',query:{type:types,state:n,activityInfoId:this.hdSelection[0].activityInfoId,baseid:baseid}});
                    }else{
                        this.$router.push({name:'SpecialAdd',query:{type:types,state:n,activityInfoId:this.hdSelection[0].activityInfoId,baseid:baseid}});
                    }
              }else{
                  this.$message.error("只能选择一条数据！");return;
                 }
              }
            },
         getTJ(dm){
             this.$set(this.form1,'periodType','');
             this.$set(this.form1,'recommendedUnitsID','');
             if(dm=='0185000001'){
                  this.tjshow=true;
             }else{
                 this.tjshow=false;
             }
         },
        goadd(){
                this.hdDialogVisible=false;
                 var baseid=this.addtype+"|"+this.state+"|"+this.pbid+"|"+this.reid+"|"+this.wtitle;
                if(this.hdtype==1){
                  this.$router.push({name:'PairAdd',query:{baseid:baseid}});
                }else{
                  this.$router.push({name:'SpecialAdd',query:{type:this.hdtype,baseid:baseid}});
                }
            },
           goya(){
                this.hdDialogVisible=false;
                 var baseid=this.addtype+"|"+this.state+"|"+this.pbid+"|"+this.reid+"|"+this.wtitle;
               
                  this.$router.push({name:'SuggestInfo',query:{type:this.yatype,baseid:baseid}});
               
            },

        getLRinfo(n,t){
              var baseid=this.addtype+"|"+this.state+"|"+this.pbid+"|"+this.reid+"|"+this.wtitle;
                if(n==2){
                  if(t==99){
                  this.$router.push({name:'CaseInfo',query:{type:'0',ctitle:"登记",baseid:baseid}});
                  }else{
                    if(this.ajSelection.length==1){
                        var tt="修改"
                        if(t=='9'){tt="查看";}
                       this.$router.push({name:'CaseInfo',query:{type:t,status:t,ctitle:tt,focusCaseId:this.ajSelection[0].focuscaseid,baseid:baseid}});
                  }else{
                       this.$message.error("只能选择一条数据！");return;
                  }
                 }
                }else if(n==1){
                  if(t==0){
                     this.$router.push({name:'SuggestInfo',zt:'0',query:{baseid:baseid}});
                    // this.yaDialogVisible=true;
                  }else{
                      if(this.yaSelection.length==1){
                         
                          
                          var tt="";
                             switch (this.yaSelection[0].proposalTypeId) {
                                case '0204000003':
                                    tt="0";
                                    break;
                                case '0204000001':
                                    tt="1";
                                    break;
                                case '0204000002':
                                    tt="2";
                                    break;
                                case '0204000004':
                                    tt="3";
                                    break;
                                case '0204000005':
                                    tt="4";
                                    break;
                                default:
                                    tt="0";
                                break;
                                }
                                
                        this.$router.push({name:'SuggestInfo',query:{type:tt,zt:t,proposalInfoId:this.yaSelection[0].proposalInfoId,baseid:baseid}});
                      }else{
                          this.$message.error("只能选择一条数据！");return;
                      }
                  }
                }
            
          },
          //获奖信息
        hjclickRow(row){
     
            
           this.hjindex=row.index;
           this.$refs.hjmultiple.toggleRowSelection(row)
        },
         hjtableRowClassName({row, rowIndex}){
                row.index = rowIndex;
        },
        //职务变动
        zwclickRow(row){
            this.zwindex=row.index;
           this.$refs.zwmultiple.toggleRowSelection(row)
        },
         zwtableRowClassName({row, rowIndex}){
                row.index = rowIndex;
        },

        hdclickRow(row){
           this.$refs.multipleTablehd.toggleRowSelection(row)
        },
        yaclickRow(row){
           this.$refs.multipleTableya.toggleRowSelection(row)
        },
         ajclickRow(row){
           this.$refs.multipleTableaj.toggleRowSelection(row)
        },
        jdclickRow(row){
           this.$refs.multipleTablejd.toggleRowSelection(row)
        },
        hdChange(val){
          this.hdSelection = val;
          if(this.hdSelection.length>0){
              this.hdbnt=false;
          }else{
             this.hdbnt=true; 
          } 
        },
          yaChange(val){
          this.yaSelection = val;
          if(this.yaSelection.length>0){
              this.yabnt=false;
          }else{
             this.yabnt=true; 
          } 
        },
         ajChange(val){
          this.ajSelection = val;
          if(this.ajSelection.length>0){
              this.ajbnt=false;
          }else{
             this.ajbnt=true; 
          } 
        },
        jdChange(val){
          this.jdSelection = val;
          if(this.jdSelection.length>0){
              this.jdbnt=false;
          }else{
             this.jdbnt=true; 
          } 
        },
        formjdchange(){
            this.formjdSelection = val;
        },
        getinit(val){
                this.addtype=val.query.type;
                this.pbid=val.query.pbid;
                this.reid=val.query.reid;
                this.psid=val.query.psid;
                this.jb=val.query.jb;
                this.jkey=val.query.jkey;
                this.jmc=val.query.jmc;
                this.code=val.query.code;
                this.xzqhmc=val.query.xzqhmc;
                this.wtitle=val.query.wtitle==null?'':val.query.wtitle;
                this.state=val.query.status==null?'0':val.query.status;
                this.xzqh=val.query.xzqh;
                this.cname2=val.query.codemc;
                this.lb=val.query.lb;
                this.orgdm=val.query.orgdm;
                this.depid=val.query.depid;
                this.pt=val.query.pt;
                this.lbmc=val.query.lbmc==undefined?'':val.query.lbmc;
                if(val.name=='BaseAdd'){
                     window.addEventListener('scroll', this.getscroll,true)
                }
                if(this.state=="0"){
                    this.getUUID();
                }
                else if(this.state=="9"){
                    if(this.addtype=='1' || this.addtype=='2'){
                        var mid='11072112'
                        var adata='21123245';
                        if(this.addtype=='2'){
                              mid='11132124';
                              adata='21243246';
                        }
                    //权限start
                    this.$api.post(this.Global.menuurl,{'menuId':mid},
                            r =>{
                                if(r.code==1 && r.data!=null){
                                   // this.allshow=this.global_auth(r.data,adata);
                                }
                        });
                }
                    this.ckshow=true;
                }
              
                switch (this.addtype) {
                    case '1':
                        this.cname="人大代表";
                        this.label1="代表证号";
                        this.ntype='1';
                        this.labelorg="所属人大";
                        this.ptype=this.Global.REPRESENTATIVE;
                        this.zmtype=this.Global.RD;
                       
                        if(this.jb=='qg'){
                            this.cname1="全国";
                            this.lvl="0150000001";
                                                      
                        }else if(this.jb=='sj'){
                            this.cname1="省级";
                            this.lvl="0150000002";
                        }
                        else if(this.jb=='ds'){
                            this.cname1="市级";
                            this.lvl="0150000003";
                        }
                        else if(this.jb=='xq'){
                            this.cname1="区县";
                            this.lvl="0150000004";
                        }
                       this.$set(this.form1,'levelType',this.lvl);
                        this.getTB(this.xzqh,this.lvl);
                        
                        break;
                    case '2':
                        this.cname="政协委员";
                        this.label1="委员证号";
                        this.ntype='2';
                        this.labelorg="所属政协";
                        this.labelya="政协提案";
                        this.ptype=this.Global.CPPCMEMBER;
                        this.zmtype=this.Global.ZX;
                       
                        if(this.jb=='qg'){
                            this.cname1="全国";
                            this.lvl="0150000001";
                        }else if(this.jb=='sj'){
                            this.cname1="省级";
                           this.lvl="0150000002";
                        }
                        else if(this.jb=='ds'){
                            this.cname1="市级";
                            this.lvl="0150000003";
                        }
                        else if(this.jb=='xq'){
                            this.cname1="区县";
                            this.lvl="0150000004";
                        }
                        this.$set(this.form1,'levelType',this.lvl);
                        this.getJJB('2');
                         if(this.code!=null || this.code!=""){
                            this.$set(this.form1,"circlesType",this.code);
                        }
                        break;
                       
                    case '3':
                        this.$store.dispatch('getTysf');
                        // this.$store.dispatch('getXzqh');
                        this.$store.dispatch('getJpyy');
                        // this.$store.dispatch('getTyjdytjdw');
                        // this.$store.dispatch('getTyzxytjdw');
                        this.cname="人民法院特约人员";
                        if(this.lbmc!='')
                        {
                            this.cname3="人民法院"+this.lbmc;
                        }
                        this.label1="特约人员证号";
                        this.labelorg="所属单位";
                        this.labelya="意见建议";
                        this.ntype='3';
                        this.ptype=this.Global.SPECIALPERSON;
                        this.zmtype=this.Global.FY;
                        if(this.jb=='qg'){
                            this.cname1="最高法";
                            this.lvl="0222000001";
                        }else if(this.jb=='sj'){
                            this.cname1="高级";
                            this.lvl="0222000002";
                        }
                        else if(this.jb=='ds'){
                            this.cname1="中级";
                            this.lvl="0222000003";
                        }
                        else if(this.jb=='xq'){
                            this.cname1="基层";
                            this.lvl="0222000004";
                        }
                       
                        if(this.lb!=null)
                        {
                          
                              this.$set(this.form1,'specialType',this.lb);
                             
                              if(this.lb=='0185000001'){
                                    this.tjshow=true;
                                }else{
                                    this.tjshow=false;
                                }
                            this.lbshow=false;
                        }else if(this.lbmc!=''){
                            this.lbshow=false;
                        }
                        this.$set(this.form1,'levelType',this.lvl);
                        
                        if(this.xzqh!=undefined && this.form1.levelType!=null)
                        {
                            this.getTYLBList(this.xzqh);
                        }
                         this.getTYJB();
                       
                        break;
                     
                    case '4':
                        this.$store.dispatch('getZw');
                        this.cname="法院人员";
                        this.labelorg="所属单位";
                        this.ntype='4';
                        this.ptype=this.Global.COURTPERSON;
                        this.zmtype=this.Global.FY;
                         if(this.jb=='qg'){
                            this.cname1="最高院";
                            this.lvl="0222000001";
                        }else if(this.jb=='sj'){
                            this.cname1="各省高院";
                            this.lvl="0222000002";
                        }
                        else if(this.jb=='ds'){
                            this.cname1="各市中院";
                            this.lvl="0222000003";
                        }
                        else if(this.jb=='xq'){
                            this.cname1="区县基层法院";
                            this.lvl="0222000004";
                       
                        }
                        this.$set(this.form1,'levelType',this.lvl);
                        this.getJDXX();
                        break;
                    default:
                        break;
                }
            
           
            
            this.getList();
          },
          getUUID(){
                 this.$api.post(this.Global.aport1+'/baseinfo/getUUID',null,
                  r =>{
                       this.personId=r.uuid;
                     
           });
          },
         
          getZNSB(phone){

              if(this.state!="0"){
                  return;
              }
              this.type=this.ptype;
              this.zndata={};
              this.zndata.personType=this.ptype;
              var birthday=this.form.year+''+this.form.month+''+this.form.day;
             if(this.form.personName!=undefined && this.form.personName!=''){
                this.zndata.personName=this.form.personName;
                this.zndata.sex=this.form.sex;
                this.zndata.birthPlace=this.form.birthPlace;
                // this.zndata.birthday=birthday;
                this.zndata.year=this.form.year;
                this.zndata.month=this.form.month;
                this.zndata.day=this.form.day;
                this.zndata.fixedPhone=this.form.fixedPhone;
                var sjh='';
                if(this.rows.length>0){
                 for (let i = 0; i < this.rows.length; i++) {
                       if(this.rows[i].mobilePhone!=''){
                            sjh=this.rows[i].mobilePhone;
                       }
                 }
                }
                if(phone==undefined){
                    phone=sjh;
                }
                
                this.zndata.mobilePhone=phone; 
              }
              if((this.form.personName!=undefined && this.form.personName!='')  &&
                  (this.form.sex!=undefined && this.form.sex!='') &&
                  (this.form.birthPlace!=undefined && this.form.birthPlace!='') &&
                  (birthday!=undefined && birthday!='') 
               ){
                    this.getTCZNCK();
               }else if(
                   (this.form.personName!=undefined && this.form.personName!='')  &&
                   (this.form.fixedPhone!=undefined && this.form.fixedPhone!='') 
               ){
                     this.getTCZNCK();
               }else if(
                   (this.form.personName!=undefined && this.form.personName!='')  &&
                   (phone!=undefined && phone!='') 
               ){
                    this.getTCZNCK();
               }
          },
          getTCZNCK(){
            this.$api.post(this.Global.aport2+'/PersonIdentifyInfoController/findPerson',this.zndata,
                r =>{
                    if(r.code==1){
                       if(r.data){
                            this.znDialogVisible=true;
                       }
                    }
           });
          },
        //获取行政区划 籍贯
          getXz(val){
            if(this.xzdata.length==0)   
            var url=this.Global.aport4+this.Global.jg;
            if(this.addtype==3){
                url=this.Global.aport4+this.Global.xzqh;
            }
            this.$api.get(url,null,
                r =>{
                if(r.success){
                     this.xzList = ToArray(r.data);
                    //  this.xzdata = ToArray(r.data);
                       if(val){
                               var arr = this.xzList.filter(item=>{
                                return item.dm.indexOf(val) + 1
                              });
                              this.xzdata=arr;
                         }else{
                             this.xzquery();
                         }
                 }
                })
            },
         xzquery(){
              if(this.xzList.length>this.jznum){
                this.xzdata=this.xzList.slice(0,this.jznum);
              }else{
                this.xzdata=this.xzList;
            }
         },
          //籍贯远程搜索
        xzdwremoteMethod(quer){
        
          if (quer !== ''|| this.xzdata.length<=0) {
            var arr = this.xzList.filter(item=>{
              return item.mc.indexOf(quer) + 1
            });
            this.tempload=arr;
            if(arr.length>this.jznum){
               this.xzdata=arr.slice(1,this.jznum);
            }else{
              this.xzdata=arr;
            }
          
          }else{
            this.tempload=[];
            this.xzquery();
          }
        },
        //籍贯单位加载
       xzloadmore() {
        var srr= this.xzList;
        if(this.tempload.length>0){
          srr= this.tempload;
        } 
        this.formData.pageIndex++;
        let num = this.formData.pageIndex * this.formData.pageSize;
           this.xzdata =srr.filter((item, index, arr) => {
               return index < num;
         });
       
    },

        //右侧滚动效果
         getscroll(){
                    let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
   
                    if(document.querySelector('#box1')==null &&
                       document.querySelector('#box2')==null && 
                       document.querySelector('#box3')==null && 
                       document.querySelector('#box4')==null && 
                       document.querySelector('#box5')==null && 
                       document.querySelector('#box6')==null&& 
                       document.querySelector('#box7')==null){
                           return;
                     }
                
                    if(this.state!="0"  && this.addtype!='4'){
                    let offsetTop1 = document.querySelector('#box1')==null?0:document.querySelector('#box1').offsetTop
                    let offsetTop2 = document.querySelector('#box2')==null?0:document.querySelector('#box2').offsetTop-200
                    let offsetTop3 = document.querySelector('#box3')==null?0:document.querySelector('#box3').offsetTop-200
                    let offsetTop4 = document.querySelector('#box4')==null?0:document.querySelector('#box4').offsetTop-300
                    let offsetTop5 = document.querySelector('#box5')==null?0:document.querySelector('#box5').offsetTop-200
                    let offsetTop6 = document.querySelector('#box6')==null?0:document.querySelector('#box6').offsetTop
                    if(top<offsetTop5 && offsetTop5!=0){
                       this.activeindex=1;
                    }
                    if(top>=offsetTop2 && top<offsetTop3 && offsetTop2!=0){
                        this.activeindex=2;
                    }
                    if(top>=offsetTop3 && top<offsetTop4 && offsetTop3!=0){
                        this.activeindex=3;
                    }
                    if(top>=offsetTop4 && offsetTop4!=0){
                         this.activeindex=4;
                    }
                    if(top>=offsetTop5 && top<offsetTop6 && offsetTop5!=0){
                       this.activeindex=5;
                    }
                    if(top>=offsetTop6 && top<offsetTop2 && offsetTop6!=0) {
                       this.activeindex=6;
                    }
                    
                   }else if(this.state!="0" && this.addtype=='4'){
           
                    let offsetTop1 = document.querySelector('#box1')==null?0:document.querySelector('#box1').offsetTop
                    let offsetTop2 = document.querySelector('#box7')==null?0:document.querySelector('#box7').offsetTop-200
                    let offsetTop3 = document.querySelector('#box2')==null?0:document.querySelector('#box2').offsetTop-200
                    let offsetTop5 = document.querySelector('#box5')==null?0:document.querySelector('#box5').offsetTop
                    let offsetTop6 = document.querySelector('#box6')==null?0:document.querySelector('#box6').offsetTop
                    if(top<offsetTop5 && offsetTop5!=0){
                       this.activeindex=1;
                    }
                    if(this.kjdshow){
                        if(top>=offsetTop2 && top<offsetTop3 && offsetTop2!=0){
                            this.activeindex=7;
                        }
                    }
                     if(top>=offsetTop3 && offsetTop3!=0){
                        this.activeindex=2;
                    }
                    if(top>=offsetTop5 && top<offsetTop6 && offsetTop5!=0){
                       this.activeindex=5;
                    }
                    if(top>=offsetTop6 && top<offsetTop2 &&  offsetTop6!=0) {
                       this.activeindex=6;
                    }
                   }
                   else if(this.state=="0" && document.querySelector('#box5')!=null && document.querySelector('#box6')!=null){
                      
                        let offsetTop5 = document.querySelector('#box5')==null?0:document.querySelector('#box5').offsetTop-400
                        let offsetTop6 = document.querySelector('#box6')==null?0:document.querySelector('#box6').offsetTop-400

                        if(top<offsetTop5 && offsetTop5!=0){
                          this.activeindex=1;
                        }
                        if(top>=offsetTop5 && top<offsetTop6 && offsetTop5!=0){
                            this.activeindex=5;
                        }
                       if(top>=offsetTop6 && offsetTop6!=0){
                           
                            this.activeindex=6;
                        }
                   }
           },
           //巡回法庭
           getXHFT(orgid,t)
           {
               if(this.addtype!=1 && this.addtype!=3){return;}
           
               
               
               if(t=='0'){
                      this.$set(this.form1,'circuitCourtId','')
                }
               if(orgid=='' || orgid==null){
                     this.$set(this.form1,'circuitCourtId','');
                     this.xhftdata=[];
                     return;
                 }
              var obj={};
              obj = this.ssdwdata.find(item =>{
                 return item.orgid === orgid
                });
              var xzqh ='';
              if(obj){
                  xzqh= obj.xzqh;
              }
              
               let p={
                    'mc':'',
                    'sj':orgid,
                    'lvl':this.form1.levelType,
                    'xzqh':xzqh,
                    'groupType':this.addtype=='3'?this.form1.area:this.form1.groupType,
                    
                };
                this.$api.post(this.Global.aport1+'/org/getCircuitCourt',p,
                r =>{
                    if(r.code==1){
                        this.xhftdata=r.data;
                    }
                });
                       
           },
            //团别
           getTB(code,jb)
           {       
              
            //    if(code==null || code==undefined){
            //        code="";
            //    }
            //    let p={
            //        'code':code,
            //        'level':jb,
            //     };
            //     this.$api.get(this.Global.aport4+'/service/getGroupType',p,
            //     r =>{
            //         if(r.code==1){
            //             this.tbdata=r.data;
            //         }
            //     }); 
            if(this.addtype==1){
             let p={
                    'level':jb,
                    'administrativeDivision':code,
                  };
                  this.$api.post(this.Global.aport1+this.Global.tburl,p,
                  r =>{
                          if(r.code==1){
                            this.tbdata=ToArray(r.data);
                                          
                          }
                   });
            }
           },
            getList(){
           
              if(this.pbid!="" && this.reid!="" && this.pbid!=undefined && this.reid!=undefined){
               
               let p={
                    'personType':this.ptype,
                    'pbId':this.pbid,
                    'personId':this.reid,
                    'isEdit':this.state,
                    'orgId':this.orgdm,
                };
                
                this.$api.post(this.Global.aport1+'/baseinfo/detail',p,
                r =>{
                    if(r.code==1){
                      this.form=r.data;
                      if(r.data.photoUrl!=null){ //头像
                        this.tximg=r.data.photoUrl;
                      }
                    if(this.state=='9'){
                      this.allshow=!r.data.hidden;//true 隐藏，false 显示 (手机号，固话，通讯地址)
                      }
                      this.form1=r.data;
                 
                      this.personId=r.data.personId;
                      this.getSSDW(this.form1.orgId,1);//所属单位
                     if(this.addtype=='3'){
                        this.getXz(this.form1.area);
                     }else{
                        this.getXz(this.form.birthPlace);
                     }
                if(this.form.mobilePhones && this.form.mobilePhones.length>0){
                           var mrr=this.form.mobilePhones;this.rows=[];
                          for (let i = 0; i < mrr.length; i++) {
                              var oobj={}
                              oobj.id=i+1;
                              oobj.mobilePhone=mrr[i];
                              this.rows.push(oobj);
                          }
                      }
                     if(this.form.year!=null && this.form.year!='' && this.form.year!=undefined){
                         this.getBmonth(this.form.year);
                         this.getBday(this.form.year,this.form.month);
                     }
                      this.zwTableData=r.data.positionList;
                      this.hjTableData=r.data.awardsList;
                      

                      if(this.addtype=='1' || this.addtype=='2'){
                            
                             if(r.data.isProvincial=='0181000001'){
                                 this.pd.is1=true;
                             }
                             if(r.data.isInStandCommittee=='0115000001'){
                                 this.pd.is3=true;
                             }
                              if(r.data.isInSpecialCommittees=='0216000001'){
                                  this.pd.is6=true;
                             }
                             if(r.data.isInBeijing=='0209000001'){
                                 this.pd.is4=true;
                             }
                             if(r.data.isReelection=='0162000001'){
                                 this.pd.is5=true;
                                //  this.getBM(this.form.orgId);
                             }
                             
                              if(r.data.isNotHold=='0112000001'){
                                 this.pd.is7=true;
                             }
                             if(r.data.isSpecialPerson=='1')  {
                               
                                this.pd.is10=true;
                             } 
                             if(r.data.repair=='0272000001'){
                                 this.pd.is11=true;
                             }
                              if(r.data.formerRepresentative=='0284000001'){
                                 this.pd.is14=true;
                             }
                              if(r.data.formerMember=='0285000001'){
                                 this.pd.is15=true;
                             }
                              if(r.data.workCommitteesDistinction=='0273000001'){
                                 this.pd.is13=true;
                             }
                        // this.getTB(this.xzqh,this.form1.levelType);
                       // this.getNJB();
                        this.getJJB('1');
                        this.getBJDTB(this.form1.groupType);

                      }else if(this.addtype=='3'){

                            if(r.data.isProvincial=='0181000001'){
                                 this.pd.is1=true;
                             }
                             if(r.data.isCppcMember=='1')  {
                                this.pd.is8=true;
                             }  
                             if(r.data.isInBeijing=='0209000001'){
                                this.pd.is4=true;
                             }
                             
                            if(r.data.isReelection=='0162000001'){
                                 this.pd.is5=true;

                                //  this.getBM(this.form.orgId);
                             }
                             
                             if(r.data.isRepresentative=='1'){
                                  this.pd.is9=true;
                             }
                             if(r.data.repair=='0272000001'){
                                  this.pd.is11=true;
                             }
                             if(r.data.fire=='0292000002'){
                                  this.pd.is12=true;
                             }
                               if(r.data.formerRepresentative=='0284000001'){
                                 this.pd.is14=true;
                             }
                              if(r.data.formerMember=='0285000001'){
                                 this.pd.is15=true;
                             }
                             
                       this.getTYJB();
                       this.getTYLBList();
                 
                      }else if(this.addtype=="4"){
                           this.getBM(this.form1.orgId);
                      }         
                     
                    }else{
                        this.$message.error(r.message);
                    }
                 
                this.getHDZW(this.hyanum,1); 
                this.getHDZW(this.hyanum,2); 
                     //参加活动
                if(this.state!="0"){
                  this.getJDHD('',0);
                  this.getCJHD('',0);
                  this.getYA('',0);
                  this.getAJ('',0);
                 }
                });

             }else{
                 //初始加载
                   this.getSSDW();//所属单位
                    if(this.jkey!=null && this.jkey!='' && this.jkey!=undefined){
                     this.$set(this.form1,"periodType",this.jkey);
                    }
                    
                    if(this.code!=null || this.code!='' ){
                             if(this.jb!='xq'){
                                this.$set(this.form1,"groupType",this.code);
                             }
                    }

             }
               
            },
              getJJB(t){
                
                if(this.addtype==2 && (this.form1.periodType || this.jkey)){

                     var lel=this.lvl;
                    if(this.lvl==''){
                        lel=this.form1.levelType;
                    }
                        let p={
                            'level':lel,
                            'administrativeDivision':this.xzqh==undefined?"":this.xzqh,
                            'sessionType':this.form1.periodType==undefined?this.jkey:this.form1.periodType
                             };
                         this.$api.post(this.Global.jjburl,p,
                              r =>{
                               this.jjblist=ToArray(r.data);
                                                        
                               });
                 }
            },
            getNJB(t){
        
      
           
                //this.$set(this.form1,"periodType",'');
             if(this.addtype==4){return;}

               var lel=this.lvl;
                    if(this.lvl==''){
                        lel=this.form1.levelType;
                    }

                var lb="";
                
                 switch (this.addtype) {
                    case '1':
                       lb=this.Global.REPRESENTATIVE;
                        break;
                    case '2':
                       lb=this.Global.CPPCMEMBER;
                       break;
                    case '3':
                       lb=this.Global.SPECIALPERSON;
                       break;
                    default:
                       break;
                    }
                
                let p={
                    'level':lel,
                    'administrativeDivision':this.xzqh==undefined?"":this.xzqh,
                    'identityType':lb,
                    };
                  
                    
                   this.$api.post(this.Global.jburl,p,
                       r =>{
                          
                           if(t!=null){
                             this.jblistdb=ToArray(r.data,'1');
                             this.jblistwy=ToArray(r.data,'1');
                           }else{
                               
                            this.jblist=ToArray(r.data,'1');
                            this.getjblist(0,this.jblist)
                           }
                   });
            },
            getTYJB(){
                // this.$set(this.form1,"periodType",'');
                if((this.form1.levelType==null || this.form1.levelType=="")
                 || (this.form1.specialType==null || this.form1.specialType=="")
                 ){
                   return;
                }
                let pp={
                        'level':this.form1.levelType,
                        'administrativeDivision':this.xzqh==undefined?"":this.xzqh,
                        'specialType':this.form1.specialType,
                    };
                    this.$api.post(this.Global.tyjburl,pp,
                            r =>{
                           this.jblist=ToArray(r.data,'1');
                           this.getjblist(0,this.jblist)
                });
            },

            getjblist(t,data){
          
                 if(t==0){
                     this.jblistlr=data;
                     if(this.jkey!="" && this.jkey!=null){
                         var arr=[];
                         arr.push(this.jkey);
                         this.$set(this.form1,'reelections',arr); 
                        
                     }
                    
                    this.getcrdb(data);
                    this.getcrwy(data);
                 }else if(t==1){
                         var arr=[];
                         arr.push(data);
                         this.$set(this.form1,'reelections',arr);
                         
                         this.getcrdb(this.jblist);
                         this.getcrwy(this.jblist);
                 }

                  this.form1.reelectionNum=this.form1.reelections.length
                
            },
            getcrdb(data){
                 if(this.addtype=='1'){
                     var arr=this.form1.reelections;
                 
                    
                     if(arr && arr.length>0){
                        for (let i = 0; i < arr.length; i++) {
                          data = data.filter(t => t.dm != arr[i])
                        }
                         var val="0"+(parseInt(arr[0])-1);
                         data = data.filter(t => t.dm != val)
                       }else{
                            data = data.filter(t => t.dm != this.form1.periodType);
                           var val="0"+(parseInt(this.form1.periodType)-1);
                           data = data.filter(t => t.dm != val)
                       }
                     
                     this.jblistdb=data;
                 }else if(this.addtype=="3"){
                     this.getNJB(0);
                 }else{
                     this.jblistdb=data;
                 }
               
            },
            getcrwy(data){
                 if(this.addtype=='2'){
                     var arr=this.form1.reelections;
                   
                   
                     if(arr && arr.length>0){
                          
                        for (let i = 0; i < arr.length; i++) {
                            data = data.filter(t => t.dm != arr[i])
                        }
                         var val="0"+(parseInt(arr[0])-1);
                         data = data.filter(t => t.dm != val)
                     }else{
                          data = data.filter(t => t.dm != this.form1.periodType);
                           var val="0"+(parseInt(this.form1.periodType)-1);
                           data = data.filter(t => t.dm != val)
                     }
                     this.jblistwy=data;
                 }else if(this.addtype=="3"){
                     this.getNJB(0);
                 }else{
                       this.jblistwy=data;
                 }
            },
            getLRData(val){
                if(this.pd.is5){
                    var array=val;
                    val=val.sort(function(a,b){return a-b});
                 
                    if(val.length>1){
                        for (let i = 0; i < val.length-1; i++) {
                       
                         if(parseInt(val[i+1])-parseInt(val[i])!=1){
                                this.$message.error("请选择连续届别!");
                                val = val.filter(t => t != array[i]);
                                return;
                            }
                        }
                        
                    }
                    this.$set(this.form1,'reelectionNum',val.length);
                    this.getcrdb(this.jblistlr);
                    this.getcrwy(this.jblistlr);
                } 
            },
            getJDHD(num,t){
               
                  let pp={
                    'courtInsiderId':this.reid,
                    'pageSize':num,
                    'token':this.$store.state.token,
                };
                 this.$api.post(this.Global.aport2+'/PairInfoController/getPairInfoForCourt',pp,
                   r =>{
                       if(r.code==1){
                        this.jdtableData=[];
                           
                           if((r.data==null || r.data.length<=parseInt(this.hyanum)) && t==0){
                               this.jdall=0; this.jdtableData=r.data;
                           }else if(r.data.length>parseInt(this.hyanum) && t==0){
                               this.jdall=1;
                               var array=r.data;
                               for (let i = 0; i < parseInt(this.hyanum); i++) {
                                  this.jdtableData.push(array[i]);
                               }
                           }else if(r.data.length==parseInt(num) && t==null){
                               this.jdall=1;
                               this.jdtableData=r.data;
                           }else{
                                this.jdall=2;
                                this.jdtableData=r.data;
                           }
                    }else{
                        this.jdall=0;
                    }
               });
            },
            getCJHD(num,t){
             
                 let pp={
                    'pbId':this.pbid,
                    'pageSize':num,
                    'token':this.$store.state.token,
                };
                 this.$api.post(this.Global.aport2+'/ActivityInfoController/getActivityInfoByPbId',pp,
                   r =>{
                       if(r.code==1){
                        
                           if((r.data==null || r.data.length<=parseInt(this.hyanum)) && t==0){
                               this.hdall=0; this.hdtableData=r.data;
                           }else if(r.data.length>parseInt(this.hyanum) && t==0){
                               this.hdall=1;
                                var array=r.data;
                               for (let i = 0; i < parseInt(this.hyanum); i++) {
                                 this.hdtableData.push(array[i]);
                               }
                           }else if(r.data.length==parseInt(num) && t==null){
                               this.hdall=1; this.hdtableData=r.data;
                           }else{
                                 this.hdall=2; this.hdtableData=r.data;
                           }
                         
                           
                       }else{
                             this.hdall=0;
                       }
                   });
            },
           getYA(num,t){
               
                  let pp={
                    'pbid':this.pbid,
                    'pageSize':num,
                    'token':this.$store.state.token,
                    'identityType':this.form.identityType,
                };
                 this.$api.post(this.Global.aport2+'/proposalHome/selectProposalInfoByPbId',pp,
                   r =>{
                       if(r.code==1){
                         
                            if((r.data==null || r.data.length<=parseInt(this.hyanum)) && t==0){
                               this.yatableData=r.data;
                               this.yaall=0;
                           }else if(r.data.length>parseInt(this.hyanum) && t==0){
                                this.yaall=1;
                                
                               var array=r.data;
                               for (let i = 0; i < parseInt(this.hyanum); i++) {
                                 this.yatableData.push(array[i]);
                               }
                           }else if(r.data.length==parseInt(num) && t==null){
                                  this.yaall=1; this.yatableData=r.data;
                           }else{
                               this.yatableData=r.data;this.yaall=2;
                           }

                        
                         
                       }else{
                           this.yaall=0;
                       }
                   });
            },
            getAJ(num,t){
              
              if(num==""){
                  this.ajall=2;
              }else{
                  this.ajall=1;
              }
            
                let pp={
                    'leaderpbid':this.pbid,
                    'leaderpersonid':this.personId,
                    'inum':num,
                    'token':this.$store.state.token,
                };
                 this.$api.post(this.Global.aport2+'/CaseHomeController/queryFoucscaseInfo',pp,
                   r =>{
                       if(r.code==1){
                          
                            if((r.data==null || r.data.length<=parseInt(this.hyanum)) && t==0){
                               this.ajall=0; this.gztableData=r.data;
                           }else if(r.data.length>parseInt(this.hyanum) && t==0){
                                this.ajall=1;
                               var array=r.data;
                               for (let i = 0; i < parseInt(this.hyanum); i++) {
                                 this.gztableData.push(array[i]);
                               }
                           }else if(r.data.length==parseInt(num) && t==null){
                               this.ajall=1;  this.gztableData=r.data;
                           }else{
                                this.ajall=2; this.gztableData=r.data;
                           }
                       }else{
                          this.ajall=0;
                       }
                   });
            },
            getHDZW(num,t){
            
                if(t==1){//获奖
                   if(num==""){
                       this.hjTableData1=this.hjTableData;
                       this.hjall=2;
                   }else if(parseInt(num)<this.hjTableData.length){
                        var hjdata=[];
                            for (let i = 0; i < parseInt(this.hyanum); i++) {
                                hjdata.push(this.hjTableData[i]);
                             }
                        this.hjTableData1=hjdata;
                        this.hjall=1;
                   }else{
                        this.hjTableData1=this.hjTableData;
                       this.hjall=0;
                   }
                }else if(t==2){//职务
                      if(num==""){
                       this.zwTableData1=this.zwTableData;
                       this.zwall=2;
                   }else if(parseInt(num)<this.zwTableData.length){
                         var zwdata=[];
                            for (let i = 0; i < parseInt(this.hyanum); i++) {
                                zwdata.push(this.zwTableData[i]);
                             }
                          this.zwTableData1=zwdata;
                        this.zwall=1;
                   }else {
                       this.zwTableData1=this.zwTableData;
                       this.zwall=0;
                   }
                }
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
            fatherMethod(data,type){
           
            //    if(data=='99'){
                  var ff=new FormData();
                  ff.append("personId",this.personId);
                  ff.append("personType",type);
                  ff.append('token',this.$store.state.token);
                  this.$api.post(this.Global.uploads+"/baseinfo/getPhoto", ff,
                  r => {
                  
                         if(r.code==1){
                           this.tximg=r.data;
                          
                        }else{
                          this.$message.error(r.message);
                        }

                });
            //   }
            //   else if(data.success=='success'){
            //   this.photoIds=data.relFileList.photoIds;
            //   this.tximg=data.relFileList.serverPath;
            //   }
              this.uploadDialogVisible = false;
            },
            ZNfatherMethod(data,type){
                this.getXz();
              
            if(data!='99'){
              this.form=data;
              if(this.form.mobilePhone && this.form.mobilePhones.length>0){
                        var mrr=this.form.mobilePhones;this.rows=[];
                          for (let i = 0; i < mrr.length; i++) {
                              var oobj={}
                              oobj.id=i+1;
                              oobj.mobilePhone=mrr[i];
                              this.rows.push(oobj);
                          }
              }
            //   if(data.identityTypeId==this.type){
            //      this.form1=data;
            //    }
             if(data.photoUrl!=null){ //头像
                        this.tximg=data.photoUrl;
                }
            if(type=="0173000004"){
                this.reid=data.courtPersonId;
            }
             if(data.isProvincial=='0181000001'){
                    this.pd.is1=true;
                }
             if(data.isInBeijing=='0209000001'){
                    this.pd.is4=true;
                }
            if(data.isSpecialPerson=='1'){
                    this.pd.is10=true;
                }
            if(data.isCppcMember=='1'){
                this.pd.is8=true;
            }
            if(data.isRepresentative=='1'){
                this.pd.is9=true;
            }

            }
            this.znDialogVisible=false;

            },
         
            Upload(){
                this.uploadDialogVisible=true;
            },
            addJD(t){
                this.listdata1=[];
 
                // this.$set(this.formjd,'jointperson','');
                // if(t==1){
                //     this.jdtxt="编辑结对信息"
                // }else if(t==0){
                //     this.jdtxt="录入结对信息"
                // }else if(t==9){
                //     this.jdtxt="查看结对信息"
                // }
                //  if(this.reid!=null && this.reid!=undefined){
                //      this.$set(this.formjd,'courtInsiderId',this.reid);
                //  }
                //  this.getYjdxx(this.reid);
                //  this.jdDialogVisible=true;
                  if(t=='0'){
                        this.diatxt="添加定向结对"
                    }else if(t=='1'){
                        this.diatxt="修改定向结对"
                    }else{
                    this.diatxt="定向结对"
                    }
                var obj={}
                
                obj.courtOutsiderId=this.reid;
                this.pairdata=obj;
                this.pairsDialogVisible=true;
                  

            },
            delJD(){

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
                       }else if(this.multipleSelection.length==0){
                               this.$message.error("请选择一条数据！");return;
                       }
                       this.zwform=Object.assign({},this.multipleSelection[0]);
                       this.zwdia="编辑职务变动";
                   }else{
                       this.zwdia="查看职务变动";
                       if(this.multipleSelection.length>1){
                               this.$message.error("只能选择一条信息！");return;
                       }else if(this.multipleSelection.length==0){
                               this.$message.error("请选择一条数据！");return;
                       }
                     
                       this.zwform=Object.assign({},this.multipleSelection[0]);
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
                       }else if(this.hjmultipleSelection.length==0){
                         this.$message.error("请选择一条数据！");return;
                       }
                   
                       this.hjform=Object.assign({},this.hjmultipleSelection[0]);
                       this.hjdia="编辑获奖信息";
                   }else{
                       this.hjdia="查看获奖信息";
                        if(this.hjmultipleSelection.length>1){
                               this.$message.error("只能选择一条信息！");return;
                        }else if(this.hjmultipleSelection.length==0){
                               this.$message.error("请选择一条数据！");return;
                       }
                      
                       this.hjform=Object.assign({},this.hjmultipleSelection[0]);
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
　　　　　　　　　  　 if(item.changeDate==arr[i].changeDate){
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
　　　　　　　　　  　 if(item.awardName==arr[i].awardName){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　　　　　　this.hjTableData.splice(index,1)
                      
                  }
                }
            },
            addsave(t){
                if(t==2){
                    if(this.zwform.nowOrg==undefined || this.zwform.nowOrg==""){
                         this.$message.error("现工作单位不能为空！");return;
                     }
                if(this.zwform.nowPosition==undefined || this.zwform.nowPosition==""){
                         this.$message.error("现任职务不能为空！");return;
                     }
                  if(this.zwform.changeDate==undefined || this.zwform.changeDate==""){
                         this.$message.error("变动时间不能为空！");return;
                     }

                    //  this.id=formatDate(new Date(), 'yyyymmddhhmmss');
                 
                  


                 if(this.zwtb==0){
                     this.zwTableData.push(this.zwform);
                     this.zwTableData=this.unique(this.zwTableData,2);
                }else{
                
                    this.$set(this.zwTableData,this.zwindex,this.zwform);
                }

                   this.zwDialogVisible=false;
                    
                      this.getHDZW(this.hyanum,2); 
                     
                }else if(t==1){
                     if(this.hjform.getTime==undefined || this.hjform.getTime==""){
                         this.$message.error("获奖时间不能为空！");return;
                     }
                     if(this.hjform.awardName==undefined || this.hjform.awardName==""){
                         this.$message.error("获奖名称不能为空！");return;
                     }
                     if(this.hjform.awardUnit==undefined || this.hjform.awardUnit==""){
                         this.$message.error("颁奖单位不能为空！");return;
                     }
                   
                     if(this.hjtb==0){
                       this.hjTableData.push(this.hjform);
                       this.hjTableData=this.unique(this.hjTableData,1);
                    }else{
                      
                       this.$set(this.hjTableData,this.hjindex,this.hjform);
                    }

                     this.getHDZW(this.hyanum,1); 
                     this.hjDialogVisible=false;
  
                     
 
                     
                    
                }
            },
            //去重
            unique(arr,t) {
                const res = new Map();
                if(t==2){
                return arr.filter((arr) => !res.has(arr.nowOrg) && res.set(arr.nowOrg, 1))
                }else if(t==1){
                    return arr.filter((arr) => !res.has(arr.awardUnit) && res.set(arr.awardUnit, 1))
                }
            },
        
            submit(){
              
                 if(this.form.personName==undefined || this.form.personName=="")
                  {
                      this.$message.error("姓名不能为空！");return;
                  }
                  if(this.form.sex==undefined || this.form.sex=="")
                  {
                      this.$message.error("性别不能为空!");return;
                  }
                //   if(this.form.birthPlace==undefined || this.form.birthPlace=="")
                //   {
                //       this.$message.error("籍贯不能为空!");return;
                //   }
             
               if(this.form.year==undefined || this.form.year=="" || this.form.month=="" || this.form.month==undefined)
                  {
                     
                      if(!this.kjdshow){
                        this.$message.error("出生日期不能为空!");return;
                      }
                  }
            
                //    if(this.form.fixedPhone==undefined || this.form.fixedPhone=="")
                //   {
                //       this.$message.error("固定电话不能为空!");return;
                //   }
                    var phone=[]; 
                        for (let i = 0; i < this.rows.length; i++) {
                                if(this.rows[i].mobilePhone!=''){
                                    var reg=/^1[3456789]\d{9}$/;
                                    var numRe = new RegExp(reg)
                                        if(!numRe.test(this.rows[i].mobilePhone)){
                                        this.$message.error("手机号码不正确!");return;
                                      }
                                    phone.push(this.rows[i].mobilePhone);
                                }
                                
                        }
                     
                        if((this.ntype=='1' || this.ntype=='3') && !this.pd.is1 && phone.length==0){
                            this.$message.error("手机号码不能为空!");return;
                        }else{
                            this.form.mobilePhones=phone;
                        }
                if(this.form1.orgId==undefined || this.form1.orgId=="")
                  {
                      this.$message.error(this.labelorg+"不能为空!");return;
                  }
                  if(this.ntype!='4'){
                        if(this.form1.levelType==undefined || this.form1.levelType=="")
                        {
                            this.$message.error("级别不能为空!");return;
                        }
                 
                        if(this.form1.periodType==undefined || this.form1.periodType=="")
                        {
                            this.$message.error("届别不能为空!");return;
                        }
                        if((this.form1.cardNumber==undefined || this.form1.cardNumber=="") && this.ntype!='3')
                        {
                            this.$message.error(this.label1+"不能为空!");return;
                        }
                   }
                if(this.ntype=='1'){
                   if(this.form1.groupType==undefined || this.form1.groupType=="")
                    {
                        this.$message.error("团别不能为空!");return;
                    }
                }
                if(this.ntype=='2'){
                   if(this.form1.circlesType==undefined || this.form1.circlesType=="")
                    {
                        this.$message.error("界别不能为空!");return;
                    }
                }
                  if(this.ntype=='1'){
                    if(this.form1.electUnitsid==undefined || this.form1.electUnitsid=="")
                    {
                        this.$message.error("选举单位不能为空!");return;
                    }
                  }
                  if(this.form.nationality==undefined || this.form.nationality=="")
                  {
                      this.$message.error("民族不能为空!");return;
                  }
                //   if(this.form.partisans && this.form.partisans.length==0)
                //   {
                      
                //       this.$message.error("政治面貌不能为空!");return;
                //   }
                //   if(this.form.education==undefined || this.form.education=="")
                //   {
                //       this.$message.error("学历不能为空!");return;
                //   }
                  if(this.ntype=='3'){
                   
                    if((this.form1.specialType==undefined || this.form1.specialType=="") && this.lbshow==true)
                    {
                        this.$message.error("特约职务不能为空!");return;
                    }

                   if(this.form1.recommendedUnitsIDs && this.form1.recommendedUnitsIDs.length==0)
                    {
                        this.$message.error("推荐单位不能为空!");return;
                    }
                  }
                  if(this.addtype!='4'){
                        if(this.form.job==undefined || this.form.job=="")
                        {
                            this.$message.error("单位职务不能为空!");return;
                        }
                    }
                  if(this.pd.is5){
                   
                       if(this.form1.reelections==undefined || this.form1.reelections=="")
                        {
                            this.$message.error("连任届数不能为空!");return;
                        }else if(this.form1.reelections.length==1){
                            this.$message.error("连任届数至少选择两项!");return;
                        }else if(this.form1.periodType!=''){
                            var rff=true;
                               for (let ii = 0; ii < this.form1.reelections.length; ii++) {
                                  if(this.form1.periodType==this.form1.reelections[ii]){
                                        rff=false;
                                  } 
                               }
                               if(rff){
                                   this.$message.error("连任届数必须有一项是当前届!");return;
                               }
                        }else{
                            var val=this.form1.reelections;
                                val=val.sort(function(a,b){return a-b});
                                if(val.length>1){
                                    for (let i = 0; i < val.length-1; i++) {
                                     if(parseInt(val[i+1])-parseInt(val[i])!=1){
                                            this.$message.error("连任时请选择连续届别!");
                                            val = val.filter(t => t != val[i]);
                                            return;
                                        }
                                    }
                                    
                                }
                        }
                  }
                  if(this.pd.is6){
                       if(this.form1.specialCommitteeId==undefined || this.form1.specialCommitteeId=="")
                        {
                            this.$message.error("专门委员会不能为空!");return;
                        }
                  }
                   if(this.pd.is7){
                       if(this.form1.isNotHoldReason==undefined || this.form1.isNotHoldReason=="")
                        {
                            this.$message.error("不再担任原因不能为空!");return;
                        }
                  }
                   if(this.ntype=='1' || this.ntype=='2'){
                    if(this.pd.is10){
                        if(this.form1.specialType==undefined || this.form1.specialType=="")
                            {
                                this.$message.error("特约人员不能为空!");return;
                            }
                        }
                   }
               this.querybnt=false;
               this.form1.personId=this.personId;
                //以下信息为保存信息
                var url="";
                let p={};
                var path='';
                if(this.ntype=='1'){
                    url='/representative/create';
                    // path='BaseList';
                    //省部级以上领导
                    if(this.pd.is1){
                        this.form1.isProvincial="0181000001";
                    }else{
                         this.form1.isProvincial="0181000002";
                    }
                    //全国常委会委员
                    if(this.pd.is3){
                        this.form1.isInStandCommittee="0115000001";
                    }else{
                        this.form1.isInStandCommittee="0115000002";
                    }
                   //专门委员会
                    if(this.pd.is6){
                        this.form1.isInSpecialCommittees="0216000001";
                    }else{
                         this.form1.isInSpecialCommittees="0216000002";
                    }
                    //在京代表
                   if(this.pd.is4){
                        this.form1.isInBeijing="0209000001";
                    }else{
                         this.form1.isInBeijing="0209000002";
                    }
                    //连任代表
                    if(this.pd.is5){
                        this.form1.isReelection="0162000001";
                    }else{
                        this.form1.isReelection="0162000002";
                    }
                    //不再担任
                     if(this.pd.is7){
                        this.form1.isNotHold="0112000001";
                    }else{
                         this.form1.isNotHold="0112000002";
                    }
                    //补选区分
                     if(this.pd.is11){
                        this.form1.repair="0272000001";
                    }else{
                        this.form1.repair="0272000002";
                    }
                    // 0284000001 有曾任代表记录
                    // 0284000002 无曾任代表记录
                    // 0285000001 有曾任委员记录
                    // 0285000002 无曾任委员记录
                    //曾任代表
                     if(this.pd.is14){
                        this.form1.formerRepresentative="0284000001";
                    }else{
                        this.form1.formerRepresentative="0284000002";
                    }
                    //曾任委员
                     if(this.pd.is15){
                        this.form1.formerMember="0285000001";
                    }else{
                        this.form1.formerMember="0285000002";
                    }
                    //工作委员会委员区分
                     if(this.pd.is13){
                        this.form1.workCommitteesDistinction="0273000001";
                    }else{
                        this.form1.workCommitteesDistinction="0273000002";
                    }
                        p={
                        'baseInfo':this.form,
                        'representative':this.form1,
                        'position':this.zwTableData,
                        'awardsList':this.hjTableData,
                        'representativeId':this.reid,
                        'pbId':this.pbid,
                        'photoIds':this.photoIds,
                        };
                       
                        
                }else if(this.ntype=='2'){
                     url='/cppcMember/create';
                    //   path='zxBaseList';
                   //省部级以上领导
                    if(this.pd.is1){
                        this.form1.isProvincial="0181000001";
                    }else{
                        this.form1.isProvincial="0181000002";
                    }
                   //全国常委会委员
                    if(this.pd.is3){
                        this.form1.isInStandCommittee="0115000001";
                    }else{
                        this.form1.isInStandCommittee="0115000002";
                    }
                    //专门委员会
                      if(this.pd.is6){
                        this.form1.isInSpecialCommittees="0216000001";
                    }else{
                         this.form1.isInSpecialCommittees="0216000002";
                    }
                    //在京代表
                     if(this.pd.is4){
                        this.form1.isInBeijing="0209000001";
                    }else{
                         this.form1.isInBeijing="0209000002";
                    }
                    //连任代表
                     if(this.pd.is5){
                        this.form1.isReelection="0162000001";
                    }else{
                         this.form1.isReelection="0162000002";
                    }
                    //不再担任
                      if(this.pd.is7){
                        this.form1.isNotHold="0112000001";
                    }else{
                         this.form1.isNotHold="0112000002";
                    }
                     //补选区分
                     if(this.pd.is11){
                        this.form1.repair="0272000001";
                    }else{
                        this.form1.repair="0272000002";
                    }
                    //曾任代表
                     if(this.pd.is14){
                        this.form1.formerRepresentative="0284000001";
                    }else{
                        this.form1.formerRepresentative="0284000002";
                    }
                    //曾任委员
                     if(this.pd.is15){
                        this.form1.formerMember="0285000001";
                    }else{
                        this.form1.formerMember="0285000002";
                    }
                      p={
                        'baseInfo':this.form,
                        'cppcMember':this.form1,
                        'position':this.zwTableData,
                        'awardsList':this.hjTableData,
                        'cppcMemberId':this.reid,
                        'pbId':this.pbid,
                        'photoIds':this.photoIds,
                        };
                }else if(this.ntype=='3'){
                    url='/specialPerson/create';
                    // path='tyBaseList';
                    //省部级以上领导
                     if(this.pd.is1){
                        this.form1.isProvincial="0181000001";
                    }else{
                        this.form1.isProvincial="0181000002";
                    }
                    //是否政协委员
                    if(this.pd.is8){
                        this.form1.isCppcMember='1';
                    }else{
                        this.form1.isCppcMember='0';
                    }
                    // //在京代表
                    // if(this.pd.is4){
                    //     this.form1.isInBeijing="0209000001";
                    // }
                     //连任代表
                     if(this.pd.is5){
                        this.form1.isReelection="0162000001";
                    }else{
                          this.form1.isReelection="0162000002";
                    }
                     //是否在京特约人员
                     if(this.pd.is4){
                        this.form1.isInBeijing='0209000001';
                    }else{
                       this.form1.isInBeijing='0209000002';
                    }
                    //是否人大代表
                    if(this.pd.is9){
                        this.form1.isRepresentative='1';
                    }else{
                         this.form1.isRepresentative='0';
                    }

                     //补选区分
                     if(this.pd.is11){
                        this.form1.repair="0272000001";
                    }else{
                        this.form1.repair="0272000002";
                    }
                    //解聘
                     if(this.pd.is12){
                        this.form1.fire="0292000002";
                    }else{
                        this.form1.fire="0292000001";
                    }
                    //曾任代表
                    if(this.pd.is14){
                        this.form1.formerRepresentative="0284000001";
                    }else{
                        this.form1.formerRepresentative="0284000002";
                    }
                    //曾任委员
                     if(this.pd.is15){
                        this.form1.formerMember="0285000001";
                    }else{
                        this.form1.formerMember="0285000002";
                    }

                      p={
                        'baseInfo':this.form,
                        'specialPerson':this.form1,
                        'position':this.zwTableData,
                        'awardsList':this.hjTableData,
                        'specialPersonId':this.reid,
                        'pbId':this.pbid,
                        'photoIds':this.photoIds,
                        };

                }else if(this.ntype=='4'){
                    url='/courtPerson/create';
                    // path='CourtPersonnelList';

                      p={
                        'baseInfo':this.form,
                        "orgId":this.form1.orgId,
                        "subOrgId":this.form1.subOrgId,
                        "subOrgPosition":this.form1.subOrgPosition,
                        'position':this.zwTableData,
                        'awardsList':this.hjTableData,
                        'pbId':this.pbid,
                        'personId':this.personId,
                        'courtPersonId':this.reid,
                        'photoIds':this.photoIds,
                        'intranetAccount':this.pr.intranetAccount,
                        'intranetPassword':this.pr.intranetPassword,
                        };
                }
                this.$api.post(this.Global.aport1+url,p,
                r =>{
                    if(r.code==1){
                            
                             this.$message.success(r.message);
                             
                            //  this.$router.push({name:path,query:{type:1}});
                            this.goClose();
                    }else{
                        this.$message.error(r.message);
                    }
                     this.querybnt=true;
                });
            },
            getSSDW(s,m){
                    var lel=this.lvl;
                    if(this.lvl==''){
                        lel=this.form1.levelType;
                    }
                 let p={
                    'lb':this.zmtype,
                    'lvl':lel,
                    'xzqh':this.xzqh,
                    'pageType':this.pt?this.pt:'1',
                  
                };
                 this.$api.post(this.Global.aport1+'/org/getOrgByType',p,
                   r =>{
                       if(r.code==1){
                            this.ssdwload=r.data;
                            //判断所属单位是否置灰
                            this.dwshow=false;
                            if(this.ssdwload.length==1 && m!=1)
                            { 
                              this.dwshow=true;
                            }
                           if(this.ssdwload.length==1 || m==1){
                            
                               if(this.ssdwload.length==1){
                                  this.ssdwdata=this.ssdwload;
                                }
                                 if(s!="" && s!=null){
                                    var arr = this.ssdwload.filter(item=>{
                                        return item.orgid.indexOf(s) + 1
                                    });
                                   this.ssdwdata=arr;
                                   
                                   if(arr[0].xzqh){
                                
                                    this.xzqh=arr[0].xzqh
                                   }
                                  
                                   this.$set(this.form1,"orgId",s);
                                 }else{
                                   
                                   this.$set(this.form1,"orgId",this.ssdwload[0].orgid);
                                 }

                                 if(this.addtype!='4'){
                                   this.getXHFT(this.form1.orgId,this.state);//巡回法庭
                                   this.getTJDW();
                                 }
                                 else if(this.addtype=='4'){
                                       var obj={};
                                        obj = this.ssdwdata.find(item =>{
                                            return item.orgid === this.form1.orgId
                                            });
                                        this.lvl = obj.lvl//obj.orglvl
                                        this.orglvl=obj.orglvl;
                                        
                                       this.getBM(this.form1.orgId);//部门
                                       this.getJDZWLB(this.form1.subOrgPosition);
                                    
                                 }
 
                                 if(this.addtype=='1' || this.addtype=='2')
                                 {
                                    
                                   this.getZMWFY(this.form1.orgId);//专门委员会
                                   this.getWorkList(this.form1.orgId);//专门委员会
                                   this.getXJDW(this.form1.orgId);//选举单位
                                   this.getNJB();
                                   
                                   if(this.jkey!=null || this.jkey!=undefined){
                        
                                            this.$set(this.form1,"periodType",this.jkey);
                                    }
                                   
                                 }
                                 if(this.addtype=='1'){
                                   this.getTB(this.xzqh,this.form1.levelType);
                                   this.getJDXX(this.form1.orgId);//结对信息
                                   
                                 }
                                // this.getJB(this.form1.orgId);
                                 
                           }else{
                               this.ssdwquery();
                               if(this.addtype=='4'){
                                     if(this.orgdm!="" && this.orgdm!=null){
                                        this.$set(this.form1,"orgId",this.orgdm);
                                        this.getBM(this.form1.orgId);//部门
                                     }

                               }
                           }
                       }
                   });
            },
     ssdwquery(){
              if(this.ssdwload.length>this.jznum){
                this.ssdwdata=this.ssdwload.slice(0,this.jznum);
              }else{
                this.ssdwdata=this.ssdwload;
            }
         },

    //推荐单位
    getTJDW(){
        if(this.addtype=='3')
          {
                  let  p={
                         'specialType':this.form1.specialType,
                         'sessionType':this.form1.periodType,
                         'orgid':this.form1.orgId,
                    };
              
                 this.$api.post(this.Global.aport1+'/RecommendedUnit',p,
                   r =>{
                       if(r.code==1){
                          
                           this.tjdwlist=r.data;
                       }
                   });
        }
    },
     //所属单位远程搜索
     ssdwremoteMethod(quer){
          if (quer !== ''|| this.ssdwdata.length<=0) {
            var arr = this.ssdwload.filter(item=>{
              return item.mc.indexOf(quer) + 1
            });
            this.tempload=arr;
            if(arr.length>this.jznum){
               this.ssdwdata=arr.slice(1,this.jznum);
            }else{
              this.ssdwdata=arr;
            }
          
          }else{
            this.tempload=[];
            this.ssdwquery();
        
          }
        },
    //所属单位加载
    ssdwloadmore() {

        var srr= this.ssdwload;
        if(this.tempload.length>0){
          srr= this.tempload;
        } 
        this.formData.pageIndex++;
        let num = this.formData.pageIndex * this.formData.pageSize;
           this.ssdwdata =srr.filter((item, index, arr) => {
               return index < num;
         });
       
    },
            //选举单位
            getXJDW(orgid,t){
               if(this.addtype!=1){return;}
            
                if(orgid=='' || orgid==null){
                     this.$set(this.form1,'electUnitsid','')
                     this.xjdwdata=[];
                     return;
                 }
                let p={
                    'lb':this.Global.RD,
                    'sj':orgid
                };
                if(this.addtype=='2')
                {
                    p={
                         'lb':this.Global.ZX,
                         'sj':orgid
                    };
                }
                if(this.addtype=='3' || this.addtype=='4')
                {
                    p={
                         'lb':this.Global.FY,
                         'sj':orgid
                    };
                }
                 this.$api.post(this.Global.aport1+'/org/getSelectionOrgByType',p,
                   r =>{
                       if(r.code==1){
                          if(t==0){
                              this.$set(this.form1,'electUnitsid','')
                          }
                           this.xjdwdata=r.data;
                       }
                   });
            },

            // getFYDW(){
            //     let p={
            //         'mc':'',

            //     };
            //      this.$api.post(this.Global.aport1+'/org/getCircuitCourt',p,
            //        r =>{
            //            if(r.code==1){
            //                this.fydwdata=r.data;
            //            }
            //        });
            // },
            //结对信息 所有的法院人员
             getJDXX(orgid,m,tb){ 
                 if(this.addtype!=1){return}
                this.fyrydata=[];
                if(m==0){
                    this.$set(this.form1,'pairPersonId','');
                   }
               if(!orgid){

                   return;
               }
                let p={
                    'personName':'',
                    'orgId':orgid,
                    'groupType':tb,
                };
                 this.$api.post(this.Global.aport1+'/courtPerson/getPairInfo',p,
                   r =>{
                       if(r.code==1){
                          
                           if(orgid==null){
                             this.fyrydata1=r.data;
                            }else{
                                this.jdxxload=r.data;//结对信息
                                if(this.form1.pairPersonId)
                                {
                                 var arr = this.jdxxload.filter(item=>{
                                   return item.courtPersonId.indexOf(this.form1.pairPersonId) + 1
                                  });
                                   this.fyrydata=arr;
                                }else{
                                    this.jdxxquery();
                                }
                            
                            }
                           
                       }
                   });
            },
          jdxxquery(){
               if(this.jdxxload.length>this.jznum){
                this.fyrydata=this.jdxxload.slice(0,this.jznum);
              }else{
                this.fyrydata=this.jdxxload;
            }
          },
  //结对信息远程搜索
        jdxxdwremoteMethod(quer){
        
          if (quer !== ''|| this.fyrydata.length<=0) {
            var arr = this.jdxxload.filter(item=>{
              return item.fullName.indexOf(quer) + 1
            });
            this.tempload=arr;
            if(arr.length>this.jznum){
               this.fyrydata=arr.slice(1,this.jznum);
            }else{
              this.fyrydata=arr;
            }
          
          }else{
            this.tempload=[];
            this.jdxxquery();
          }
        },
        //结对信息加载
    jdxxloadmore() {
        var srr= this.jdxxload;
        if(this.tempload.length>0){
          srr= this.tempload;
        } 
        this.formData.pageIndex++;
        let num = this.formData.pageIndex * this.formData.pageSize;
           this.fyrydata =srr.filter((item, index, arr) => {
               return index < num;
         });
    },
           //已结对信息
        getYjdxx(val){
           
           if(val!=''){
                 var obj = {};
                     obj = this.fyrydata1.find(item =>{
                        return item.courtPersonId === val
                    });
                    

                     this.remark="详情："
                     if(obj.personName!=null){
                         this.remark+=obj.personName+" , "
                     }
                     if(obj.sex!=null){
                         this.remark+=obj.sex+","
                     }
                     if(obj.birthday!=null){
                         this.remark+=obj.birthday+","
                     }
                     if(obj.degree!=null){
                         this.remark+=obj.degree+","
                     }
                     if(obj.partisan!=null){
                         this.remark+=obj.partisan+","
                     }
                     if(obj.address!=null){
                         this.remark+=obj.address;
                     }
                     this.listdata2=[];

            let  p={
                'courtInsiderId':val,
            };
              this.$api.post(this.Global.aport1+'/PairInfoController/getPairInfo',p,
             r =>{

                  if(r.code==1){
                    this.listdata2=r.data;
                  }
            });
            }
        },
        //代表姓名
        getLmName(n){
            if(n==undefined || n==null || n==""){
                this.$message.error("代表姓名不能为空！");return;
            }
            let  p={
             'personName':n,
             'personType':this.Global.REPRESENTATIVE,
            };
              this.$api.post(this.Global.aport1+'/baseinfo/personlistbytype',p,
             r =>{
                 if(r.code==1){
                  
                     if(n==null || n==""){
                      this.$message.error("请输入代表姓名!");return;
                        }
                     this.listdata1=r.data;
                    
                  }

            });

        },
         //工作委员会
        getWorkList(orgId,t){
           if(this.addtype!=1){return;}
            if(orgId=='' || orgId==null){
                  this.$set(this.form1,'workCommitteeId','');
                   this.worklist=[];
                  return;
              }
              if(t==0){
                 this.$set(this.form1,'workCommitteeId','');
               }
            let  p={
             'mc':'',
             'sj':orgId,
             'lvl':this.form1.levelType,
            };
              this.$api.post(this.Global.aport1+'/org/getWorkCommittees',p,
             r =>{
                 if(r.code==1){
                  
                     this.worklist=r.data;
                    
                  }

            });

        },
        getworkout(t){  
              if(t==0){
                  this.pd.is13=false;
                  this.$set(this.form1,'workCommitteeId','')
                if(!this.pd.is6){
                   this.$set(this.form1,"specialCommitteeId","")
                  }
              }else if(t==1){
                   this.pd.is6=false;
                   this.$set(this.form1,'specialCommitteeId','')
                if(!this.pd.is13){
                    this.$set(this.form1,"workCommitteeId","")
                  }
              }
        },
        getckdata(t){
             if(t==1){
            
            //    if(!this.pd.is5){
                  var arr=[];
                  arr.push(this.form1.periodType);
                  this.$set(this.form1,"reelections",arr)
                  this.form1.reelectionNum=this.form1.reelections.length;
                // }

             }else if(t==2){
                // if(!this.pd.is14){
               this.$set(this.form1,"formerRepresentatives",[])
            //    }
             }else if(t==3){
                // if(!this.pd.is15){
                 this.$set(this.form1,"formerMembers",[])
            //    }
             }else if(t==4){
                // if(!this.pd.is11){
                 this.$set(this.form1,"repairTime","")
            //    }
             }else if(t==5){
                // if(!this.pd.is12){
                 this.$set(this.form1,"fireReason","")
            //    }
             }else if(t==6){
                // if(!this.pd.is7){
                 this.$set(this.form1,"isNotHoldReason","")
            //    }
             }
               
           },
         addlist(val){
             
             this.listdata2.push(val);
             this.listdatatemp.push(val);
             const res = new Map();
             var arr=this.listdata2;
             this.listdata2=arr.filter((arr) => !res.has(arr.pbId) && res.set(arr.pbId, 1));
             const res1 = new Map();
             var arr1=this.listdatatemp;
             this.listdatatemp=arr1.filter((arr1) => !res1.has(arr1.pbId) && res1.set(arr1.pbId, 1));

        },
          //删除
        jddel(val,t){

            if(t==1){
                var arr=[];
                arr.push(val);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.listdata2.findIndex(item =>{
    　　　　　　　　　  　 if(item.pbId==arr[i].pbId){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.listdata2.splice(index,1)

                       var index1 = this.listdatatemp.findIndex(item =>{
    　　　　　　　　　  　 if(item.pbId==arr[i].pbId){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.listdatatemp.splice(index1,1)
                 }
            }
        },
        //保存结对信息
        
        savelist(){
         
            
            var array=this.listdatatemp;
            var nname="";
             for (let i = 0; i < array.length; i++) {
                 if(array[i].personId!=this.form1.courtInsiderId && array[i].personId!=null && array[i].pairName!='无')
                 {
                   nname += array[i].personName+',';
                 }
             }
            
             
            nname=nname.substr(0,nname.length-1);
          
            if(nname!='')
            {
              this.$confirm(nname+"代表的原结对人与目前结对人不一致，请确认是否提交！", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                       this.getsaveinfo();
                }).catch(() => {
                      
                    this.$message.info('已取消');

                });
            
            }else{
                this.getsaveinfo();
            }
        },
        getsaveinfo(data){
              let  p={
            //  'courtPersonId':this.formjd.courtInsiderId,
            //  'courtOutsiderList':this.listdata2,
               'courtPersonId':data.courtPersonId,
               'courtOutsiderList':data.courtOutsiderList,
            };
             this.$api.post(this.Global.aport2+'/PairInfoController/savePairInfo',p,
              r =>{
                     if(r.code==1){
                            
                              this.$message.success(r.message);
                              this.getJDHD('',0);
                              this.pairsDialogVisible=false;

                      }else{
                       this.$message.error(r.message);
                      }
             });
        },



             //根据机构ID获取部门
             getBM(orgid,t){
              if(this.addtype==4){
                 if(orgid=='' || orgid==null){
                     this.$set(this.form1,'subOrgId','');
                     this.wyhdata1=[];
                     return;
                 }
                let p={
                    'orgId':orgid,
                };
                 this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                   r =>{
                       if(r.code==1){
                           if(t==0){
                               this.$set(this.form1,'subOrgId','')
                           }
                         
                           this.wyhdata1=r.data;
                          
                           if(this.addtype=='4' && this.state=='0'){
                               this.$set(this.form1,'subOrgId',this.depid)
                           }
                       }
                   });
              }
            },
            //专门委员员
            getZMWFY(orgId,t){
                if(this.addtype==3){return;}
                if(orgId=='' || orgId==null){
                    this.$set(this.form1,'specialCommitteeId','');
                    this.wyhdata2=[];
                    return;
                }
                 let p = {
                    'lb':this.zmtype,
                    'sj':orgId,
                    'lvl':this.form1.levelType
                
                    };
                   this.$api.post(this.Global.aport1+'/org/getSpecialCommittees',p,
                     r =>{
                          if(r.code==1){
                              if(t==0){
                                  this.$set(this.form1,'specialCommitteeId','');
                              }
                              this.wyhdata2=r.data;
                          }
                   });
            },
            //根据所属单位获取级别和团别
            getJB(val){
             this.$set(this.form1,'levelType','');
            if(this.addtype==1){
                this.$set(this.form1,'groupType','');
             }else if(this.addtype==2){
                   this.$set(this.form1,"circlesType",'');
             }else if(this.addtype==3){
                   this.$set(this.form1,"specialType",'');
             }
                 this.$set(this.form1,"periodType",'');
                if(val=='' || val==null){
                    this.ssdwquery();
                    this.jblist=[];
                    return;
                }
                 var obj={};
                  obj=this.ssdwdata.find(item =>{
                     return item.orgid===val
                  });
                                  
                  this.form1.levelType=obj.lvl
                  this.getTB(obj.xzqh,obj.lvl);
                
                  if(obj.xzqh!="" && obj.xzqh!=undefined)
                   {
                     this.xzqh=obj.xzqh;
                    }
           
                  this.getNJB();
               

            },
          
            goClose(){
               
                if(this.wtitle!=''  && this.wtitle!=null && this.wtitle!=undefined && this.wtitle!='11'){
                switch (this.addtype) {
                    case '1':
                        this.$router.push({name:'BaseList'});
                        break;
                    case '2':
                        this.$router.push({name:'zxBaseList'});
                        break;
                    case '3':
                        this.$router.push({name:'tyBaseList'});
                        break;
                    case '4':
                        this.$router.push({name:'CourtPersonnelList'});
                        break;
                    default:
                          this.$router.push({name:'BaseList'});
                          break;
                }
              }else if(this.wtitle=='11'){
                  
                   this.$router.go(-3);
              }else{
                   this.$router.back(-1);
              }



              
            },
            getBmonth(y){
                if(y!='' && y!=null && y!=undefined){
                     this.bmonth=birthdayMonth();
                }else{
                    this.bmonth=[];this.bday=[];
                    this.$set(this.form1,'month','');
                    this.$set(this.form1,'day','');
                }
            },
            getBday(y,m){
                if(y!='' && y!=null && y!=undefined
                   && m!='' && m!=null && m!=undefined){
                       this.bday=birthdayDay(y,m);
                }else{
                    this.bday=[];
                    this.$set(this.form1,'day','');
                }
            },
            addrow(){
                    this.count++;
                    this.modelrow = {
                        id: 1,
                        mobilePhone:'',
                    };

                    this.modelrow.id = this.count;
                    this.rows.push(this.modelrow);
            },
            deleterow(index){
               this.rows.splice(index, 1);
                
            },
            getClear(val){
               if(val=='' || val==null || val==undefined){
                   this.jdxxquery();
               }
                this.$set(this.form1,'pairTime','');
            },
            pairfatherMethod(type,data){
              
              if(type=='99'){
                  
                 this.pairsDialogVisible=false;
              }else{
                  this.getsaveinfo(data);
            }
              
        },
         //可结对职务列表
            getJDZWLB(val){
               this.kjdshow=false;
               if(this.jdzwdata.length==0){
               let pp={
                    'levelType':this.orglvl,
                  };
                this.$api.post(this.Global.aport1+"/representative/pairPosition",pp,
                    r =>{
                         if(r.code==1){
                           this.jdzwdata=r.data;
                           if(this.jdzwdata && this.jdzwdata.length>0){
                             for (let i = 0; i < this.jdzwdata.length; i++) {
                                 if(this.jdzwdata[i]==val){
                                     this.kjdshow=true;
                                     break;
                                 }
                              }
                             }
                          
                           }
                        
                    });
                }else{
                    if(this.jdzwdata && this.jdzwdata.length>0){
                       for (let i = 0; i < this.jdzwdata.length; i++) {
                            if(this.jdzwdata[i]==val){
                               this.kjdshow=true;
                                break;
                               }
                            }
                       }
                }
            },
         //不可结对团别列表 用于选择团别为解放军时
            getBJDTB(val){
              if(this.addtype=='1'){
                this.$api.post(this.Global.aport1+"/representative/pairGroupType",{},
                    r =>{
                        if(r.code==1){
                            
                           var arr=r.data;
                           if(arr && arr.length>0){
                             
                              this.jdshow=arr.join(",").indexOf(val)==0?false:true;
                           }
                       
                           
                         }
                    });
                    }
            },
            //特约职务类别
            getTYLBList(xzqh){
               
                //if(xzqh!=null){
                   // this.$set(this.form1,"specialType",'');
               // }
                //    if(!xzqh){return;} 
                    let p={
                        'level':this.form1.levelType,
                        'administrativeDivision':xzqh==null?this.xzqh:xzqh,
                    };
                    this.$api.post(this.Global.tylburl,p,
                            r =>{
                                this.tylblist=ToArray(r.data);
                              
                    });
            },
        getNullVlaue(val,t){
                //籍贯
                if((val==null || val=='' || val==undefined) && t==1){
                this.xzquery();
           }
        },
       getSFZJ(val){
           if(val){
                                            
              if(val=='0145110000'){
               this.$set(this.pd,'is4',true)
               }else{
                  this.$set(this.pd,'is4',false)
               }
           }else{
                this.$set(this.pd,'is4',false)
           }
       },
    },
    beforeDestroy(){
      window.removeEventListener("scroll",this.getscroll);
    }
}
</script>
<style scoped>
.listbg{min-height: 200px;position:fixed;z-index:999;}
.bg1{background: url('../../../assets/img/jd/jd1.png') no-repeat left;}
.bg2{background: url('../../../assets/img/jd/jd2.png') no-repeat left;}
.bg3{background: url('../../../assets/img/jd/jd3.png') no-repeat left;}
.bg4{background: url('../../../assets/img/jd/jd4.png') no-repeat left;}
.bg5{background: url('../../../assets/img/jd/jd5.png') no-repeat left;}
.bg6{background: url('../../../assets/img/jd/jd6.png') no-repeat left;}
.listbg ul{ font-size: 14px;}
.listbg ul li{cursor: pointer; height: 100px; border-left:2px solid #cccccc;padding-left: 10px; line-height: 100px; }
.listbg ul li:hover{color: #0088CE; }
.listbg .active{color: #0088CE;border-left:3px solid #0088CE;font-size:18px; font-weight:bold;}

</style>