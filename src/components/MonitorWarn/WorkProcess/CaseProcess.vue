<template>
    <div class="pairadd subtable bglc">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
         <span> 监控和预警 
              <span class="mlr_10">/</span>  办理流程监控
             <span class="mlr_10">/</span>  <b>关注案件列表</b></span> </div>
         <div class="content">
                <div class="ptitle mb-20">案件信息</div>
                <div class="pborder">
                   <el-row class="lh">                        
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">来文字号</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.letternumber"  class="yy-input-input" ></el-input>
                        </el-col>
                        <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">来文单位</span>
                        <el-cascader
                          v-model="pd.lettersourceorgid"
                          :options="lydwdata"
                          :show-all-levels="false"
                          :props="{ checkStrictly: true }"
                          clearable size="small" class="yy-input-input"></el-cascader>
                        </el-col> -->
                        <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">发文时间</span>
                           <el-date-picker class="yy-input-input"
                           v-model="pd.lettertime" format="yyyy-MM-dd"
                           type="date" size="small" value-format="yyyy-MM-dd"
                           placeholder="选择时间">
                        </el-date-picker>
                        </el-col> -->
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">来文期间</span>
                           <el-select v-model="pd.lettertimes" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.lwqj"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">来文人姓名</span>
                            <!-- <el-input placeholder="请输入内容" size="small" clearable v-model="pd.personname"  class="yy-input-input" ></el-input> -->
                            <el-select v-model="pd.personname"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                v-for="(item,ind) in xmdata"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.personId">
                                </el-option>
                            </el-select>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">收文时间</span>
                            <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker
                                v-model="pd.receivetime_begin" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker
                                    v-model="pd.receivetime_end  " format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间" >
                                </el-date-picker>
                            </div>
                            </el-col>

                        
                      
                       
                        <el-col :sm="24" :md="12" :lg="8" v-if="type==1 || type==0" class="input-item">
                            <span class="yy-input-text">审批状态</span>
                           <el-select v-model="pd.spzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未审批">
                                </el-option>
                                <el-option value="1" label="已审批">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" v-if="type==2 || type==4 || type==0" class="input-item">
                            <span class="yy-input-text">交办状态</span>
                           <el-select v-model="pd.jbzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未交办">
                                </el-option>
                                <el-option value="1" label="已交办">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" v-if="type==3 || type==4 || type==0" class="input-item">
                            <span class="yy-input-text">办理状态</span>
                           <el-select v-model="pd.blzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未办理">
                                </el-option>
                                <el-option value="1" label="已办理">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" v-if="type==3 || type==4 || type==0" class="input-item">
                            <span class="yy-input-text">办结状态</span>
                           <el-select v-model="pd.bjzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未办结">
                                </el-option>
                                <el-option value="1" label="已办结">
                                </el-option>
                            </el-select>
                        </el-col>
                         <!-- <el-col :sm="24" :md="12" :lg="8" v-if="type==6 || type==0">
                            <span class="yy-input-text">复文状态</span>
                           <el-select v-model="pd.fwzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未复文">
                                </el-option>
                                <el-option value="1" label="已复文">
                                </el-option>
                            </el-select>
                        </el-col> -->
                         <el-col :sm="24" :md="12" :lg="8" v-if="type==5 || type==6 || type==0" class="input-item">
                            <span class="yy-input-text">催办状态</span>
                           <el-select v-model="pd.cbzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未催办">
                                </el-option>
                                <el-option value="1" label="已催办">
                                </el-option>
                            </el-select>
                        </el-col>
                           <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">届次</span>
                            <div class="yy-input-input">
                            <el-select v-model="pd.session" filterable clearable default-first-option placeholder="请选择"  size="small" style="width:49%;">
                               <el-option
                                 v-for="(item,ind) in $store.state.jb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select> 
                            <el-select v-model="pd.times" filterable clearable default-first-option placeholder="请选择"  size="small"  style="width:48%;">
                               <el-option
                                 v-for="(item,ind) in $store.state.cb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select> 
                        
                            </div>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">案件编号</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.casenum"  class="yy-input-input" ></el-input>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">案件类型</span>
                           <el-select v-model="pd.caseclass" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.ajlx"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                           </el-col>
                    </el-row>
                    <el-row class="lh" v-if="open">
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">联名人数</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.jointpersoncount"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">反映次数</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.reflectnum"  class="yy-input-input" ></el-input>
                        </el-col>
                        
                      
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">审理阶段</span>
                           <el-select v-model="pd.adjudgementphase" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.sljd"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">当事人案由</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.partiesandcasereason"  class="yy-input-input" ></el-input>
                        </el-col>
                       
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">是否重复案件</span>
                             <el-select v-model="pd.repeatcase" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                  <el-option
                                    v-for="(item,ind) in $store.state.cfaj"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                            </el-select>
                        </el-col> 
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                           <span class="yy-input-text">利害关系</span>
                           <el-select v-model="pd.interestrelations" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.lhgx"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">涉及法院级别</span>
                           <el-select v-model="pd.focuscourtlevel" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.fyjb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">不服本院</span>
                           <el-select v-model="pd.notsatisfied" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.bfby"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                       
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">是否重点案件</span>
                          
                              <el-select v-model="pd.emphasiscase"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                    v-for="(item,ind) in $store.state.zdaj"
                                    :key="ind"
                                    :label="item.mc"
                                    :value="item.dm">
                                    </el-option>
                            </el-select>
                           
                        </el-col>
                        <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">是否旁听</span>
                           
                              <el-select v-model="pd.isaudit" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option value="1" label="是">
                                 </el-option>
                                  <el-option value="0" label="否">
                                 </el-option>
                            </el-select>
                            
                        </el-col> -->
                         <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">旁听代表</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.auditper"  class="yy-input-input" ></el-input>
                        </el-col> -->
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">承办单位</span>
                          
                            <el-select v-model="pd.undertakingorgid" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in cbdw"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">承办法院级别</span>
                           <el-select v-model="pd.undertakingorglevel" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.fyjb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <!-- <el-col :sm="24" :md="12" :lg="8" >
                            <span class="yy-input-text">是否转办</span>
                              <el-select v-model="pd.isassign" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                      <el-option
                                        v-for="(item,ind) in $store.state.zbqf"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.dm">
                                        </el-option>
                            </el-select>
                           
                        </el-col> -->
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">转办时间</span>
                            <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker
                                v-model="pd.assigntime_begin" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker
                                    v-model="pd.assigntime_end  " format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间" >
                                </el-date-picker>
                            </div>
                            </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">转办形式</span>
                           <el-select v-model="pd.assigntype" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.zbxs"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         
                        
                         <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">督（转）办号</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.assignno"  class="yy-input-input" ></el-input>
                        </el-col> -->
                        <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">转办文号</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.btr"  class="yy-input-input" ></el-input>
                     
                        </el-col> -->
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">是否转办告知</span>
                         
                                <el-select v-model="pd.isassigninform" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                    <el-option
                                        v-for="(item,ind) in $store.state.zbgzqf"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.dm">
                                        </el-option>
                            </el-select>
                             
                        </el-col>
                        
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">转办告知文号</span>
                            <el-input placeholder="" size="small" clearable v-model="pd.assigninformno"  class="yy-input-input" ></el-input> 
                        </el-col>
                         
                        
                         <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">办结形式</span>
                           <el-select v-model="pd.replytype" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.bjxs"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col> -->
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">办结结果</span>
                           <el-select v-model="pd.completedresult" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.bjjg"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">办结时间</span>
                            <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker
                                v-model="pd.completedtime_begin" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker
                                    v-model="pd.completedtime_end  " format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间" >
                                </el-date-picker>
                            </div>
                            </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">录入单位</span>
                          
                            <el-select v-model="pd.createorgid" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in lvdw"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">审批人</span>
                            <!-- <el-input placeholder="请输入内容" size="small" clearable v-model="pd.checkuseridname"  class="yy-input-input" ></el-input> -->
                              <el-select v-model="pd.checkuserid" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in jbrdata"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.pbId">
                              </el-option>
                           </el-select>
                        </el-col>
                       
                    </el-row>
                </div>
                 <div class="footer">
                    <el-button type="primary"  style="width:130px;" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查 询</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                </div>
                <div class="loadmore" v-if="all" @click="getAll(1)">全部展开 <i class="el-icon-arrow-down"></i></div>
                <div class="loadmore" v-else @click="getAll(2)">部分收起 <i class="el-icon-arrow-up"></i></div>
                <div class="pairleft" >
                    <div class="anseacrch">

                   <el-checkbox-group v-model="checkedList" @change="changeList()">
                    <el-checkbox v-for="(item,ind) in checkItem" :label="item.code" :key="ind" :checked="item.checked" :disabled="item.checked">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                    </div>
                </div>

                <div class="pborder mt-20">
                            <el-row >
                            <el-col :span="18">
                              <el-button type="primary" size="small" :disabled="bnt"  @click="getLC(0)" v-if='allshow[0]'>办公流程</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getLC(1)" v-if='allshow[1]'>催办</el-button>
                              </el-col>
                            </el-row>
                          <el-table
                            ref="multipleTable"
                            :data="tableData"
                             @row-click="clickRow"
                             highlight-current-row
                             @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                label="序号">
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
<el-dialog title="催办" :visible.sync="cbDialogVisible" :close-on-click-modal='false' width="600px"> 
     <el-form :model="cbform">
         <el-row class="ah-40">
        <el-col :span="24">
               <span class="yy-input-text trt">催办时间：</span>
                <el-date-picker
                  v-model="cbform.urgenttime" format="yyyy-MM-dd"
                   type="date" size="small" value-format="yyyy-MM-dd"
                    placeholder="选择时间" class="yy-input-input" >
                  </el-date-picker>
        </el-col>
          <el-col :span="24">
             <span class="yy-input-text trt">催办形式：</span>
                    <el-select v-model="cbform.urgenttype"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                     <el-option
                       v-for="(item,ind) in $store.state.cbxs"
                       :key="ind"
                        :label="item.mc"
                         :value="item.dm">
                         </el-option>
                   </el-select>
          </el-col>
         <el-col :span="24">
                <span class="yy-input-text trt" style="vertical-align: top;" >催办信息：</span>
                <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="cbform.urgentcontents"  class="yy-input-input"></el-input>     
           </el-col>
         </el-row>
     </el-form>
         <div slot="footer" class="dialog-footer">
              <el-button type="primary"  size="small" @click="addsave()">保 存</el-button>
              <el-button @click="cbDialogVisible = false" size="small">取 消</el-button>
            </div>
</el-dialog>
<el-dialog title="办公流程" :visible.sync="addDialogVisible" :close-on-click-modal='false' width="900px"> 
  <el-form :model="form">
      <div v-if='cklc' style="line-height:40px; text-align:center">暂无办公流程</div>
        <el-collapse v-model="activeNames" @change="handleChange" style="height:600px;overflow-y:auto;" accordion v-else>
        <div v-for="(item,ind) in bldata" :key="ind">
           <el-collapse-item :title="'交办单：'+item.title" :name="item.serialNum">
              <el-row class="ah-50 pl-20 pr-20" style="font-size:15px;color:#777777">
                   <el-col :span="24" class="mt-20 pl-20 borderb" >
                       <span>标题：</span><b style="font-size:18px;">  {{item.title}}</b>
                   </el-col>
                      <el-col :span="24" class="mb-20 pl-20">
                         <span>交办意见：</span>
                         <span >同意审批</span>
                   </el-col>
                    <el-col :span="12" class="backcolor pl-20 borderb">
                         <span >交办部门：</span>
                         <span >{{item.assignedDepartment}}</span>
                   </el-col>
                    <el-col :span="12" class="backcolor borderb">
                         <span>交办时间：</span>
                         <span >{{item.assignedTime}}</span>
                   </el-col>
                   <el-col :span="24"   v-for="(t,i) in item.subdata" :key='i'>
                       <el-row class="backcolor pl-20 pr-20">
                        <el-col :span="24" class="borderb">
                          <span>领导意见{{getch(i+1)}}：</span><br>
                        <span class="padingl">{{t.checkContents}}</span>
                        </el-col>
                        <el-col :span="6" class="borderb">
                                <span>审批结果：</span>
                                <span class="cblue">{{t.checkResult}}</span>
                        </el-col>
                        <el-col :span="10" class="borderb">
                                <span>审批领导：</span>
                                <span class="cblue">{{t.nodePerson}}</span>
                        </el-col>
                            <el-col :span="8" class="borderb">
                                <span>审批时间：</span>
                                <span class="cblue">{{t.nodeTime}}</span>
                        </el-col>
                       </el-row>
                       
                   </el-col>
                   <el-col :span="8" class="backcolor pl-20">
                         <span>流程：</span>
                         <span>{{item.processType}}</span>
                   </el-col>
                    <el-col :span="8" class="backcolor">
                         <span>公示：</span>
                         <span>{{item.isPublic}}</span>
                   </el-col>
                    <el-col :span="8" class="backcolor">
                         <span>沟通：</span>
                         <span>{{item.isCommunicate}}</span>
                   </el-col>

              </el-row>
         </el-collapse-item>
</div>
            
    </el-collapse>
  </el-form>
</el-dialog>
         
    </div>
</template>
<script>
import {format} from '@/assets/js/date.js'
import {getCH} from '@/assets/js/script.js'
import {sortByKey} from '@/assets/js/ToArray.js'
export default {
    data(){
        return{
            CurrentPage: 1,
            pageSize: 10,
            TotalResult: 0,
            pd:{},
            options:this.pl.ps,
            open:false,
            all:true,
            bnt:true,
            checkedList:[],
            tableData:[],
            configHeader:[],
            checkItemReal:[],
            cc:true,
            multipleSelection:[],
            checkItem:[],
            cbdw:[],
            lydwdata:[],
            xmdata:[],
            jbrdata:[],
            type:0,
            bnt:true,
            focusCaseId:'',
            lvdw:[],
            form:{},
            cbform:{},
            addDialogVisible:false,
            cbDialogVisible:false,
            activeNames:['2'],
            bldata:[],//办理流程
            lcdata:[],//办理流程
           sbdata:[],
           alldata:['27013801','27013802'],
           allshow:[],
           cklc:true,
        }
    },
    mounted(){
        this.$store.dispatch("getXb");
        this.$store.dispatch("getJb");
        this.$store.dispatch("getCb");
         this.$store.dispatch("getAjlx");
         this.$store.dispatch("getLwqj");
         this.$store.dispatch("getSljd");
         this.$store.dispatch("getLhgx");
         this.$store.dispatch("getFyjb");
         this.$store.dispatch("getBfby");
         this.$store.dispatch("getZbxs");
         this.$store.dispatch("getBjjg");
          this.$store.dispatch("getZdaj");
          this.$store.dispatch("getCfaj");
          this.$store.dispatch("getZbqf");
          this.$store.dispatch("getZbgzqf");
          this.$store.dispatch("getCbxs");
         this.getinit(this.$route);
    },
     watch:{
          $route:function(val){
            this.getinit(val);
          },
          bldata:function(newVal,oldVal){
            
              for(let i = 0; i < newVal.length; i++) {
                  var obj=newVal[i];
                  this.$set(obj,'subdata',[]);
                  this.getSubInfo(newVal[i].id,obj);
              }
          },
       },
    methods:{
         clickRow(row){
           
            this.$refs.multipleTable.toggleRowSelection(row)
           
        },
        getinit(val){
                //权限start
                 this.$api.post(this.Global.menuurl,{'menuId':'15022701'},
                     r =>{
                     
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                                this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                         
                            }   
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
                  });
              //权限end
             this.pd.year=val.query.year;
             this.getCheckList();
             this.getcbdw();
             //this.getLWDW();
             this.getName();
             this.getJBR();
             this.getLrdw();
             this.pd.type=val.query.type==null?'0':val.query.type;
             this.type=this.pd.type;
             this.getList(this.CurrentPage, this.pageSize, this.pd);
        },
        getLC(t){
             if(this.multipleSelection.length==0){
                    this.$message.error("请选择一条数据！");return;
                 }
            if(t==0){
                this.form={};
                 if(this.multipleSelection.length>1){
                    this.$message.error("只能选择一条数据！");return;
                 }
                 
             let p={
                 'type':'2',
                 'billId':this.multipleSelection[0].focuscaseid
             };
              this.$api.post(this.Global.aport1+'/oAProcessOffice/getOAProcessList',p,
                r =>{
                       if(r.code==1){

                        this.bldata=r.data;
                        if(this.bldata.length>0){
                            this.cklc=false;
                        }else{this.cklc=true}
                        }
                });


                this.addDialogVisible=true;
            }else if(t==1){
                var array=this.multipleSelection;
                for (let i = 0; i < array.length; i++) {
                    if( array[i].focuscasestatus!='4' && array[i].focuscasestatus!='1'){
                        this.$message.error("有数据无需催办，请重新选择。");return;
                    }
                    
                }
                this.cbform={};
                this.cbDialogVisible=true;
            }
        },
       getSubInfo(id,obj){
              let p={
              
                 'id':id
             };
          this.$api.post(this.Global.aport1+'/oAProcessOffice/getOAProcessNodeById',p,
                r =>{
                       if(r.code==1){
                           
                           this.$set(obj,'subdata',r.data);
                       }
                });
              
        },
        handleChange(val) {
           // console.log(val);
        },
          handleSelectionChange(val) {
          this.multipleSelection = val;
          if(this.multipleSelection.length>0){
              this.bnt=false;
          }else{
             this.bnt=true; 
          }
        },
        addsave(){
             if(this.multipleSelection.length==0){
                 this.$message.error("至少选择一条数据！");return;
             }
             //console.log(this.multipleSelection);
             
             var array=this.multipleSelection;
             var frr=[];
            for (let i = 0; i < array.length; i++) {
                var obj={};
                obj.focuscaseid=array[i].focuscaseid;
                frr.push(obj);
            }

            let p={
                'focuscaseList':frr,
                'caseurgent':this.cbform,
                'token':this.$store.state.token
            }
              
              this.$api.post(this.Global.aport1+'/CaseUrgentController/bathSaveCaseUrgent',p,
                r =>{
                     
                     if(r.code==1){
                         
                           
                             this.$message.success(r.message);
                            this.cbDialogVisible=false;
                          this.getList(this.CurrentPage, this.pageSize, this.pd);
                     }else{
                       this.$message.error(r.message);
                     }
                       
                });

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
            this.pd.type='0';
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
         getCheckList(){
             let p={
                 'type':'0246000011'
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
         // console.log('this.checkedList',this.checkedList.length,this.checkItem.length);
          
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
           
            // console.log(this.pd.lettersourceorgid);
             
           this.changeList();
           if(this.pd.lettersourceorgid && this.pd.lettersourceorgid.length>0){
               this.pd.lettersourceorgid=this.pd.lettersourceorgid[this.pd.lettersourceorgid.length-1];
           }
           this.pd.pagenum=currentPage;
           this.pd.inum=showCount;
           this.pd.type='0';
           this.pd.status='4,1,3,5,6';
           this.pd.isassign='0218000001';
          let p={
              
             'token':this.$store.state.token,
             "pd":this.pd,
          };
          this.$api.post(this.Global.aport2+'/CaseHomeController/queryCaseInfo',p,
                r =>{
                      if(r.code==1){

                          this.tableData=r.data.result;
                          this.TotalResult=r.data.countNum;
                      }
                });
        
        },
        //承办单位
         getcbdw(){
            let p={
            "orgid":this.$store.state.orgid
          };
          //  /org/getUndertakeUnit 以前的接口
             this.$api.post(this.Global.aport1+'/org/getUndertakeUnits',p,
                r =>{
                    if(r.code==1){
                        this.cbdw=r.data;
                                            
                    }
                });
        },
        getLrdw(){
            let p={
            "name":''
          };
             this.$api.get(this.Global.aport1+'/org/getCourtOrg',p,
                r =>{
                    if(r.code==1){
                        this.lvdw=r.data;
                                            
                    }
                });
        },
        //来文单位 
          getLWDW(){
              let p={
                  'lb':''
              };
           this.$api.post(this.Global.aport1+'/org/getOrgTree',p,
                r =>{
                    if(r.code==1){
                       this.lydwdata=r.data;
                    }
                });
         },
         //来文人姓名
         getName(){
           let p={
             'name':'',
             'leveType':'0150000001',
           };
           this.$api.post(this.Global.aport1+'/baseinfo/personlist',p,
             r =>{
                  
                   this.xmdata=r.data;
            });
        },
        //审批领导
         getJBR(){
              let p={
               'orgId':this.$store.state.orgid,
               'subOrgId':'',
             };
            this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
                r =>{
                    if(r.code==1){
                      
                          this.jbrdata=r.data;
                      
                    }
                });
         },
         getch(t){
          
             
            return getCH(t);
         }
        
    },
}
</script>
<style scoped>
.yy-input-text{font-size: 14px;}
</style>

