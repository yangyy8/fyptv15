<!-- 人大代表高级查询 -->
<template>
    <div class="pairadd ">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
         <span> 基本信息 
            <span class="mlr_10">/</span>  <b>联络对象</b>
            <span class="mlr_10">/</span>  <b>人大代表</b>
            <span class="mlr_10">/</span>  <b>高级查询</b>
           </span>
            </div>
         <div class="content subtable">
                <div class="ptitle mb-20">{{cinfo}}</div>
                <div class="pborder">
                    <el-row class="lh">
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">姓名</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.personName"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">性别</span>
                           <el-select v-model="pd.sex" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">出生日期</span>
                            <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker
                                v-model="pd.beginBirthday" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker
                                    v-model="pd.endBirthday" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间" >
                                </el-date-picker>
                            </div>
                            </el-col>
                             <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">所属人大</span>
                             <el-select v-model="pd.orgId"  remote :remote-method="orgremoteMethod" v-el-select-loadmore="orgloadmore" @visible-change="getOrg()"   @change="getWork(pd.orgId,'1');getNJB();getWYH()" filterable  clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                      <el-option
                                        v-for="(item,ind) in ssdwdata"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.orgid">
                                      </el-option>
                              </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">层级</span>
                            <el-select v-model="pd.levelType" @change="getWork(pd.orgId,'1');getNJB();getWYH();" :disabled="pd.orgId?true:false"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                       v-for="(item,ind) in $store.state.jbb"
                                       :key="ind"
                                       :label="item.mc"
                                       :value="item.dm">
                                     </el-option>
                             </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">届别</span>
                           <el-select v-model="pd.periodType" @change="getTB(pd.orgId);" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="pd.orgId==''||pd.orgId==undefined?'请先选择所属人大和层级':'无数据'">
                               <el-option
                                 v-for="(item,ind) in jblist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">团别</span>
                           <el-select v-model="pd.groupTypes" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="pd.orgId && pd.periodTypes?'无数据':'请先选择所属人大和届别'">
                               <el-option
                                 v-for="(item,ind) in tbdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                            
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">代表证号</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.cardNumber"  class="yy-input-input" ></el-input>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">政治面貌</span>
                           <el-select v-model="pd.partisans" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.dp"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="lh" v-if="open" >
                           <!-- <el-col :sm="24" :md="12" :lg="6">
                            <span class="yy-input-text">结对信息</span>
                           <el-select v-model="pd.docunit" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col> -->
                       
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">民族</span>
                           <el-select v-model="pd.nationalitys" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.mz"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">籍贯</span>
                           <el-select v-model="pd.birthPlaces" multiple 
                            remote :remote-method="xzdwremoteMethod" v-el-select-loadmore="xzloadmore" @visible-change="getXz()"
                            filterable clearable  default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in xzdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">学历</span>
                           <el-select v-model="pd.educations" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xl"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">省部级以上</span>
                            <el-select v-model="pd.isProvincial"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                  v-for="(item,ind) in $store.state.sbjys"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                  </el-option>
                             </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">常委会委员</span>
                           <el-select v-model="pd.isInStandCommittee"   filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.cwhwy"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">专门委员会  
                               <el-checkbox v-model="pd1.is1" @change="getZM"></el-checkbox>
                            </span>
                           <el-select v-model="pd.specialCommitteeIds" multiple :disabled="!pd1.is1"    filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="pd.orgId==''||pd.orgId==undefined?'请先选择所属人大和层级':'无数据'">
                               <el-option
                                 v-for="(item,ind) in wyhlist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">工作委员会 
                               <el-checkbox v-model="pd1.is2" @change="getGZ"></el-checkbox>
                           </span> 
                           <el-select v-model="pd.workCommitteeIds"  :disabled="!pd1.is2"   multiple  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="pd.orgId==''||pd.orgId==undefined?'请先选择所属人大和层级':'无数据'">
                               <el-option
                                 v-for="(item,ind) in worklist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">在京</span>
                            <el-select v-model="pd.isInBeijing"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                  v-for="(item,ind) in $store.state.zjqf"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                </el-option>
                             </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">结对</span>
                            <el-select v-model="pd.ispair"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                  v-for="(item,ind) in $store.state.jdqf"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                  </el-option>
                             </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">连任</span>
                            <el-select v-model="pd.isReelection"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                  v-for="(item,ind) in $store.state.sflr"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                                  </el-option>
                             </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">曾任代表 
                               <el-checkbox v-model="pd1.is3" @change="getckdata(1)"></el-checkbox>
                           </span> 
                           <el-select v-model="pd.formerRepresentatives"  :disabled="!pd1.is3"   multiple  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="pd.orgId==''||pd.orgId==undefined?'请先选择所属人大和层级':'无数据'">
                               <el-option
                                 v-for="(item,ind) in jblist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">曾任委员 
                               <el-checkbox v-model="pd1.is4" @change="getckdata(2)"></el-checkbox>
                           </span> 
                           <el-select v-model="pd.formerMembers"  :disabled="!pd1.is4"   multiple  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="pd.orgId==''||pd.orgId==undefined?'请先选择所属人大和层级':'无数据'">
                               <el-option
                                 v-for="(item,ind) in jblist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">补选 
                              <el-checkbox v-model="pd1.is5" @change="getckdata(3)"></el-checkbox>
                            </span>
                            <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker :disabled="!pd1.is5"
                                v-model="pd.beginRepairTime" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker :disabled="!pd1.is5"
                                    v-model="pd.endRepairTime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间" >
                                </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">不再担任</span>
                           <el-select v-model="pd.isNotHoldReasons" multiple  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                   v-for="(item,ind) in $store.state.bzdr"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.dm">
                               </el-option>
                            </el-select>
                        </el-col>
                       
                         <!-- <el-col :sm="24" :md="12" :lg="8" class="input-item">
                           <span class="yy-input-text">是否专门委员会</span>
                            <el-select v-model="pd.specialCommit" multiple  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in wyhlist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                           </el-col> -->
                         
                      
                        
                          
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">职业类别</span>
                           <el-select v-model="pd.jobType" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.zylb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">单位职务</span>
                              <el-input placeholder="请输入内容" size="small" clearable v-model="pd.job"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">社会职务</span>
                             <el-input placeholder="请输入内容" size="small" clearable v-model="pd.socialDuty"  class="yy-input-input" ></el-input>
                        </el-col>
                        
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">所属巡回法庭</span>
                           <el-select v-model="pd.circuitCourtIds" multiple  @visible-change="getXHFT()"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input">
                               <el-option
                                 v-for="(item,ind) in xhftdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <!-- <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">补选区分</span>
                           <el-select v-model="pd.repair" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.bxqf"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col> -->
                       
                       
                        <!-- <el-col :sm="24" :md="24" :lg="24">
                              <el-checkbox v-model="pd.is1">人民法院特约人员</el-checkbox>
                              <el-checkbox v-model="pd.is2">在京代表</el-checkbox>
                              <el-checkbox v-model="pd.is3" @change="getZM">专门委员会委员</el-checkbox>
                              <el-checkbox v-model="pd.is6" @change="getGZ">工作委员会委员</el-checkbox>
                              <el-checkbox v-model="pd.is4">省部级以上</el-checkbox>
                              <el-checkbox v-model="pd.is5">常委会委员</el-checkbox>
                        </el-col>   -->
                    </el-row>
                </div>
                 <div class="footer">
                    <el-button type="primary"  style="width:130px;" v-if='querybnt' @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查 询</el-button>
                    <el-button type="primary"  style="width:130px;" v-else :disabled="true">查询中</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                </div>
                <div class="loadmore" v-if="all" @click="getAll(1)">全部展开 <i class="el-icon-arrow-down"></i></div>
                <div class="loadmore" v-else @click="getAll(2)">部分收起 <i class="el-icon-arrow-up"></i></div>
                <div class="pairleft" >
                    <div class="anseacrch">
                   <el-checkbox-group v-model="checkedList" @change="changeList()">
                    <el-checkbox v-for="item in checkItem" :label="item.code" :key="item.code" :checked="item.checked" :disabled="item.checked">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                    </div>
                </div>
                <div class="pborder mt-20">
                        <el-row> 
                             <el-col :span="14">
                              <el-button type="primary" size="small" @click="getCK('0','添加')" v-if='allshow[0]'>添加</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getCK('9','查看')" v-if='allshow[1]'>查看</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getCK('1','修改')" v-if='allshow[2]'>修改</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="dellist()" v-if='allshow[3]'>删除</el-button>
                              <el-button type="primary" size="small" @click="getDR" v-if='allshow[4]'>导入</el-button>
                              <!-- <el-button type="primary" size="small"  :disabled="bnt" @click="getSH" v-if='allshow[5]'>审核</el-button> -->
                              <!-- <el-button type="primary"  size="small" @click="download" v-if='allshow[6]'>下载全部</el-button> -->
                              <!-- <el-button type="primary"  size="small" @click="download" v-if='allshow[7]'>下载当页</el-button> -->
                             &nbsp;
                             </el-col>
                                   <el-col :span="10" class="trt">
                                    <span>  人大代表总数 <b class="sumfont" >{{this.TotalResult}}</b> 人</span>
                                    <span class="ml-20">  已联络 <b class="sumfont" >{{this.activeNum}}</b> 人</span>
                                    <span class="ml-20">  未联络 <b class="sumfont" >{{this.inactiveNum}}</b> 人</span>
                              </el-col>
                            </el-row>
                          <el-table
                            ref="multipleTable"
                            :data="tableData"
                            @row-click="clickRow"
                            @selection-change="handleSelectionChange"
                             :row-class-name="tableRowClassName">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                label="序号" width="100">
                                 <template slot-scope="scope">
                                    <div>
                                    <span>{{(CurrentPage - 1) * pageSize + scope.$index + 1}}</span>
                                    </div>
                                 </template>
                            </el-table-column>
                            <el-table-column
                                v-for="(val,i) in configHeader"
                                :key="i"
                                :prop="val.code"
                                :label="val.label">
                            </el-table-column>
                           </el-table>
                           <div class="middle-foot">
                                <div class="page-msg">
                                    <div class="">
                                共{{TotalResult}}条记录
                                    </div>
                                    <div class="">
                                    每页显示
                                    <el-select v-model="pageSize" @change="pageSizeChange(pageSize)" placeholder="10" size="mini" class="page-select">
                                        <el-option
                                        v-for="item in options"
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
                </div>
<br/>
         </div>
    <el-dialog title="导入文件" :visible.sync="drDialogVisible"  :close-on-click-modal='false' width="630px">
      <UPLOAD :url="vvurl" :type="1000"  :urlErr="vvurlErr"  @drfatherMethod="drfatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>
    <el-dialog title="审核信息" :visible.sync="shDialogVisible"  :close-on-click-modal='false' width="630px">
         <el-row class="mb-20">
             <el-col :span="24" class="input-item">
               <span class="yy-input-text trt"><font class="red">*</font> 审核结果：</span>
                <div class="yy-input-input tlt">
                <el-radio v-model="form.result" label="0179000001">通过</el-radio>
                <el-radio v-model="form.result" label="0179000002">不通过</el-radio>
                </div>
             </el-col>
             <el-col :span="24">
               <span class="yy-input-text trt">审核意见：</span>
                <el-input placeholder="请输入内容" type="textarea"  :autosize="{ minRows:4, maxRows: 4}" size="small" clearable v-model="form.content"  class="yy-input-input" ></el-input>
             </el-col>
          </el-row>
        <div slot="footer" style="text-align:center;border-top:1px solid #cccccc; margin-top:10px; padding-top:10px;">
              <el-button type="success"  size="small" @click="saveSH">保 存</el-button> 
              <el-button  size="small"  @click="shDialogVisible=false">取 消</el-button>           
        </div> 
   </el-dialog>
    </div>
</template>
<script>
import {format} from '@/assets/js/date.js'
import {ToArray,sortByKey} from '@/assets/js/ToArray.js'
import UPLOAD from "../../Common/upload"
export default {
    components:{UPLOAD},
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
            CurrentPage: 1,
            pageSize: 10,
            TotalResult: 0,
            pd:{},
            pd1:{is1:false,is2:false,is3:false,is4:false,is5:false},
            options:this.pl.ps,
            open:false,
            all:true,
            bnt:true,
            checkedList:[],
            addtype:'1',
            cname:'人大代表高级查询',
            cinfo:'人大代表信息',
            bmdata:[],
            tableData:[],
            configHeader:[],
            checkItemReal:[],
            cc:true,
            multipleSelection:[],
            checkItem:[],
            viewtype:'',
            xzdata:[],
            xzList:[],
            xhftdata:[],
            activeNum:0,
            inactiveNum:0,
            wyhlist:[],
            worklist:[],
            drDialogVisible:false, 
            vvurl:'/representative/import',
            vvurlErr:'',
            shDialogVisible:false,
            form:{},
            authinfo:this.$store.state.auth,
            alldata:['21123127','21123128','21123129','21123130','21123131','21123132','21123133','21123134'],//0录入,1查询,2修改,3删除,4导入,5审核,6下载全部,7下载当页
            allshow:[],
            ssdwdata:[],
            jblist:[],
            tbdata:[],
            querybnt:true,
            jznum:50,
            ssdwload:[],
            formData: {   //下拉参数
                 pageIndex: 1,
                 pageSize: 20
              },
            tempload:[],
            xzList:[],
        }
    },
    watch:{
        $router:function(val){
             this.getinit(val);
        }
    },
    mounted(){
        // this.changeList();
        this.$store.dispatch("getXb");
        // this.$store.dispatch("getJb");
        // this.$store.dispatch("getQtb");
        this.$store.dispatch("getDp");
        // this.$store.dispatch("getZmwyh");
        this.$store.dispatch("getZylb");
        this.$store.dispatch("getMz");
        this.$store.dispatch("getXl");
        // this.$store.dispatch("getFydw");
        this.$store.dispatch("getSflr");
        this.$store.dispatch("getJdqf");
        this.$store.dispatch("getBzdr");
        this.$store.dispatch("getJbb");
        this.$store.dispatch("getBxqf");
        this.$store.dispatch("getCwhwy");
        this.$store.dispatch("getSbjys");
        this.$store.dispatch("getZjqf");
        this.getinit(this.$route);
    
    },
    methods:{
      tableRowClassName({row, rowIndex}) {
        if (row.activeFlag != '1') {
          return 'success-row';
        } 
        return '';
      },
         clickRow(row){
           this.$refs.multipleTable.toggleRowSelection(row)
        },
          
      
        getinit(val){
          //权限start
            this.$api.post(this.Global.menuurl,{'menuId':'11072112'},
                     r =>{
                     
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                                this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                         
                            }  
                           this.getCheckList();
                            
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
            });
         //权限end
 
 
           this.viewtype=val.query.type;
           //this.getXHFT();
          // this.getOrg();
         
          // this.getList(this.CurrentPage, this.pageSize, this.pd);
          
        },
          handleSelectionChange(val) {
          this.multipleSelection = val;
          if(this.multipleSelection.length>0){
              this.bnt=false;
          }else{
              this.bnt=true; 
          }
        },
        pageSizeChange(val) {
          this.pageSize=val;
          this.getList(this.CurrentPage, val, this.pd);
        },
        handleCurrentChange(val) {
          this.CurrentPage=val;
          this.getList(val, this.pageSize, this.pd);
        },
    
        reset(){
            this.pd={};
            this.pd1={is1:false,is2:false,is3:false,is4:false,is5:false};
            this.CurrentPage=1;
        },
        getAll(n){
            if(n==1){
                this.open=true;
                this.all=false;
            }else{
                this.open=false;
                this.all=true;
            }
        },
        //专门委员会 
           getWYH(){
               let p = {
                   'lb':this.Global.RD,
                   'sj':this.pd.orgId,
                   'lvl':this.pd.levelType
                    };
                   this.$api.post(this.Global.aport1+'/org/getSpecialCommittees',p,
                     r =>{
                          if(r.code==1){
                            this.wyhlist=r.data;
                          }
                   });
        }, 
        //届别
        getNJB(){
          
          if(this.pd.levelType==null || this.pd.levelType==''){return;}
            let p={
                    'level':this.pd.levelType,
                    'administrativeDivision':'',
                    'identityType':this.Global.REPRESENTATIVE,
                    };
                this.$api.post(this.Global.jburl,p,
                  r =>{
                         this.jblist=ToArray(r.data,'1');
                   });
        },
        //工作委员会
        getWork(orgid,t){
               this.$set(this.pd,'periodType','');
               this.$set(this.pd,'workCommitteeIds','');
               this.$set(this.pd,'formerRepresentatives','');
               this.$set(this.pd,'formerMembers','');
               this.$set(this.pd,'groupTypes','');
          if(orgid==null || orgid==""){
              // this.$set(this.pd,'levelType','');
             
               this.jblist=[];this.worklist=[];
               this.pd1.is2=false;this.pd1.is3=false;this.pd1.is4=false;
           
                return;
          }
         if(t!=null && orgid!=null && orgid!=""){
          var obj={};
                  obj=this.ssdwdata.find(item =>{
                     return item.orgid===orgid
                  });
              this.pd.levelType=obj.lvl ;
           } 
              let  p={
             'mc':'',
             'sj':orgid,
             'lvl':this.pd.levelType,
            };
              this.$api.post(this.Global.aport1+'/org/getWorkCommittees',p,
             r =>{
                 if(r.code==1){
                  
                     this.worklist=r.data;
                    
                  }

            });
        }, 
         getCheckList(){
              let p={
                  'type':'0246000001'
              };
              this.$api.post(this.Global.aport2+'/CaseHomeController/getCaseListInfo',p,
                r =>{
                  
                      if(r.code==1){
                          this.checkItem=r.data;
                          this.configHeader=[];
                            for(var j=0;j<this.checkItem.length;j++){
                                if(this.checkItem[j].checked)
                                    this.configHeader.push(this.checkItem[j])
                                }
                          if(this.configHeader.length==0){
                                this.cc=false;
                            }else{
                                this.cc=true;
                            }
                       }
                    
                      
                });
        },
        changeList(){
          this.configHeader=[];
         
            for(var i=0;i<this.checkedList.length;i++){
            for(var j=0;j<this.checkItem.length;j++){
              if(this.checkedList[i] == this.checkItem[j].code){
                this.configHeader.push(this.checkItem[j])
              }
            }
           }
         
           if(this.configHeader.length==0){
                this.cc=false;
            }else{
                this.cc=true;
            }
         this.configHeader=sortByKey(this.configHeader,'sort');
        },
        getList(currentPage, showCount, pd){
            this.querybnt=false;
            
            this.changeList();
            this.getnotin();
           //最高人民法院特约人员
          //  if(this.pd.is1){
          //       this.pd.isSpecialPerson="1"
          //  }
          // //在京代表
          //  if(this.pd.is2){
          //       this.pd.isInBeijing="0209000001"
          //  }
          //  //全国人大专门委员会委员
          //  if(this.pd.is3){
          //       this.pd.isInSpecialCommittees="0216000001"
          //  }
          //  //省部级以上领导
          //   if(this.pd.is4){
          //       this.pd.isProvincial="0181000001"
          //  }
          //  //全国人大常委会委员
          //  if(this.pd.is5){
          //       this.pd.isInStandCommittee="0115000001"
          //  }
            //工作委员会委员
           if(this.pd1.is2){
                this.pd.workCommitteesDistinction="0273000001";
           }
            //专门委员会
           if(this.pd1.is1){
               this.pd.isInSpecialCommittees="0216000001"
           }
            //曾任代表
           if(this.pd1.is3){
               this.pd.formerRepresentative="0284000001"
           }
            //曾任委员
           if(this.pd1.is4){
               this.pd.formerMember="0285000001"
           }
            //补选
           if(this.pd1.is5){
               this.pd.repair="0272000001"
           }

           this.activeNum=0;this.inactiveNum=0;

           let p={
             "pd":this.pd,
             "pageInfo":{
                 "pageNumber":currentPage,
                 "pageSize":showCount,
             }
          };
          this.$api.post(this.Global.aport1+'/representative/query',p,
                r =>{
                  
                      if(r.code==1){
                          this.tableData=r.data.representativeList;
                          this.TotalResult=r.data.pageInfo.total;
                     
                      }
                           this.querybnt=true;
                });
        
        },
        getSH(){
          this.form={};
          if(this.multipleSelection.length>1){
                this.$message.error("只能选择一条数据!"); return;
          }else{
              if(this.multipleSelection[0].checkDistinction=='0261000002'){
                  this.$message.error("该数据不能审核"); return;
              }
          }
          this.shDialogVisible=true;
        },
        saveSH(){
         
          if(this.multipleSelection.length==0){
                   this.$message.error("请选择一条数据!"); return;
            }else if(this.multipleSelection.length>1){
                    this.$message.error("只能选择一条数据!"); return;
            }
            
            if(this.form.result==null || this.form.result=="" || this.form.result==undefined){
                this.$message.error('审核结果不能为空！');return;
            }else if(this.form.result=='0179000001'){
                    if(this.form.content==null || this.form.content=="" || this.form.content==undefined){
                     this.$message.error('审核通过后审批意见不能为空！');return;
                    }
            }

               let p={
               'representativeId':this.multipleSelection[0].representativeId,
               'content':this.form.content,
               'result':this.form.result,
           };
          this.$api.post(this.Global.aport1+'/representative/check',p,
                r =>{
                    if(r.code==1){
                          
                         this.$message.success(r.message);
                        this.shDialogVisible=false;
                        this.getList(this.CurrentPage, this.pageSize, this.pd);
                    }else{
                        this.$message.error(r.message);
                    }
                });
        },
          getDR(){
            this.drDialogVisible=true;
        },
          drfatherMethod(data,t){
            this.drDialogVisible=false;
          },
        dellist(){
            var mselect=[];
            if(this.multipleSelection.length==0){
                   this.$message.error("请选择一条信息!"); return;
            }else{
                var array=this.multipleSelection;
                   for (let i = 0; i < array.length; i++) {
                       mselect.push(array[i].personId);
                       
                   }
            }
           this.$confirm('此操作将删除所有业务关联该人员的信息!', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let p={
                        'pbIds':mselect
                    };
                this.$api.post(this.Global.aport1+'/representative/delete',p,
                 r =>{
                  
                      if(r.code==1){
                        
                         this.$message.success('删除成功');
                        this.getList(this.CurrentPage, this.pageSize, this.pd);
                      }
                });

                }).catch(() => {
                   
                    this.$message.info('已取消删除');         
                });

        },
        
        
          download(){
              let p={};
              if(this.multipleSelection.length==0){//全部导出
                    p={
                        "pd":this.pd,
                        "listName":this.configHeader,
                    }
              }
            this.$api.post(this.Global.aport2+'/CaseHomeController/exportCaseInfo',p,
                r =>{
                      this.downloadM(r);
                },e=>{},{},'blob')
          },
            downloadM (data) {
         
                
            if (!data) {
                return
            }       
           
            var name='关注案件列表'+format(new Date(),'yyyyMMddhhmmss')+'.xls';
      
            let url = window.URL.createObjectURL(new Blob([data],{type:"application/xls"}))
            
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
         
            
            link.setAttribute('download',name)
            document.body.appendChild(link)
            link.click()
        },
        getCK(n,title){
          var pbid="",reid="";
           if(n=='0'){
                this.$router.push({name:'BaseAdd',query:{type:'1',status:n,wtitle:title}});
           }else{
                if(this.multipleSelection.length>1){
                    this.$message.error("只能选择一条数据！");return;
                }else  if(this.multipleSelection.length==0 &&  n!="0"){
                    this.$message.error("请选择一条数据！");return;
                }else if(this.multipleSelection.length==1){
                    pbid=this.multipleSelection[0].pbId;
                    reid=this.multipleSelection[0].representativeId;
                }
               this.$router.push({name:'BaseAdd',query:{type:'1',status:n,wtitle:title,pbid:pbid,reid:reid}});
            }
        },
        //团别
        getTB(val)
           {    
             if(val==null || val==""){
                this.tbdata=[];
                this.$set(this.pd,'groupTypes','');return;
             }
             var obj={};
                  obj=this.ssdwdata.find(item =>{
                     return item.orgid===val
                  });
              
                        
             let p={
                    'level':obj.lvl,
                    'administrativeDivision':obj.xzqh,
                    'sessionType':this.pd.periodType,

                  };
                  this.$api.post(this.Global.aport1+this.Global.tburl,p,
                  r =>{
                          if(r.code==1){
                            this.tbdata=ToArray(r.data);
                                          
                          }
                   });
           },
             //巡回法庭
       getXHFT()
         { 

              let p={
                  'mc':'',
                };
                this.$api.post(this.Global.aport1+'/org/getCircuitCourt',p,
                r =>{
                 if(r.code==1){
                    this.xhftdata=r.data;
                 }
              });
         },
      


           getZM(){
             if(!this.pd1.is1){
               this.$set(this.pd,"specialCommitteeIds","")
             }
           },
           getGZ(){
              if(!this.pd1.is2){
                this.$set(this.pd,"workCommitteeIds","")
              }
           },
           getckdata(t){
             if(t==1){
               if(!this.pd1.is3){
               this.$set(this.pd,"formerRepresentatives","")
               }
             }else if(t==2){
                if(!this.pd1.is4){
               this.$set(this.pd,"formerMembers","")
               }
             }else if(t==3){
                if(!this.pd1.is5){
                this.$set(this.pd,"endRepairTime","")
                this.$set(this.pd,"beginRepairTime","")
               }
             }
               
           },
           //所属人大
          getOrg(){
            if(this.ssdwdata.length==0){
              let p={
                    'lb':this.Global.RD,
                    'pageType':'1'
                };
                 this.$api.post(this.Global.aport1+'/org/getOrgByType',p,
                   r =>{
                       if(r.code==1){
                           this.ssdwload=r.data;
                           this.ssdwquery();
                       }
                   })
              }
           },
            ssdwquery(){
              if(this.ssdwload.length>this.jznum){
                this.ssdwdata=this.ssdwload.slice(0,this.jznum);
              }else{
                this.ssdwdata=this.ssdwload;
            }
         },

   //所属人大远程搜索
     orgremoteMethod(quer){
            if (quer != '') {
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
        //所属人大单位加载
      orgloadmore() {
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

        //获取行政区划
   getXz(val){
            if(this.xzdata.length==0)   
            this.$api.get(this.Global.aport4+this.Global.jg,null,
                r =>{
                if(r.success){
                     this.xzList = ToArray(r.data);
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

        //查询已联络的和未联络的
        getnotin(){
             this.activeNum=0;this.inactiveNum=0;
           let p={
             "pd":this.pd,
          };
          this.$api.post(this.Global.aport1+'/representative/queryCount',p,
                r =>{
                  
                      if(r.code==1){
                        
                          this.activeNum=r.data.activeNum;
                          this.inactiveNum=r.data.inActiveNum;
                      }
                });
           },
           
        
       
      
    },
}
</script>
<style scoped>
.yy-input-text{font-size: 14px;}
</style>
