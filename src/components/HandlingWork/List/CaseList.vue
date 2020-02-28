<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 办理工作 <span class="mlr_10">/</span>  <b>关注案件列表</b></span> </div>
         <div class="content">
                <div class="ptitle mb-20">案件信息</div>
                <div class="pborder">
                    <el-row class="lh">                        
                         <el-col :sm="24" :md="12" :lg="8">
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
                        <el-col :sm="24" :md="12" :lg="8">
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
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">收文时间</span>
                           <el-date-picker class="yy-input-input"
                           v-model="pd.receivetime" format="yyyy-MM-dd"
                           type="date" size="small" value-format="yyyy-MM-dd"
                           placeholder="选择时间">
                        </el-date-picker>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
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
                      
                       
                        <el-col :sm="24" :md="12" :lg="8" v-if="type==1 || type==0">
                            <span class="yy-input-text">审批状态</span>
                           <el-select v-model="pd.spzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未审批">
                                </el-option>
                                <el-option value="1" label="已审批">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" v-if="type==2 || type==4 || type==0">
                            <span class="yy-input-text">交办状态</span>
                           <el-select v-model="pd.jbzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未交办">
                                </el-option>
                                <el-option value="1" label="已交办">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" v-if="type==3 || type==4 || type==0">
                            <span class="yy-input-text">办理状态</span>
                           <el-select v-model="pd.blzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未办理">
                                </el-option>
                                <el-option value="1" label="已办理">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" v-if="type==3 || type==4 || type==0">
                            <span class="yy-input-text">办结状态</span>
                           <el-select v-model="pd.bjzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未办结">
                                </el-option>
                                <el-option value="1" label="已办结">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" v-if="type==6 || type==0">
                            <span class="yy-input-text">复文状态</span>
                           <el-select v-model="pd.fwzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未复文">
                                </el-option>
                                <el-option value="1" label="已复文">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" v-if="type==5 || type==6 || type==0">
                            <span class="yy-input-text">催办状态</span>
                           <el-select v-model="pd.cbzt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="0" label="未催办">
                                </el-option>
                                <el-option value="1" label="已催办">
                                </el-option>
                            </el-select>
                        </el-col>
                           <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text" style="width:28.5%;">届次</span>
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
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">案件编号</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.casenum"  class="yy-input-input" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="lh" v-if="open">
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">联名人数</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.jointpersoncount"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">反映次数</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.reflectnum"  class="yy-input-input" ></el-input>
                        </el-col>
                        
                        <el-col :sm="24" :md="12" :lg="8">
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
                        <el-col :sm="24" :md="12" :lg="8">
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
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">当事人案由</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.partiesandcasereason"  class="yy-input-input" ></el-input>
                        </el-col>
                       
                         <el-col :sm="24" :md="12" :lg="8" >
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
                        <el-col :sm="24" :md="12" :lg="8">
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
                        <el-col :sm="24" :md="12" :lg="8">
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
                        <el-col :sm="24" :md="12" :lg="8">
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
                       
                         <el-col :sm="24" :md="12" :lg="8" >
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
                        <el-col :sm="24" :md="12" :lg="8">
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
                        <el-col :sm="24" :md="12" :lg="8">
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
                         <el-col :sm="24" :md="12" :lg="8" >
                            <span class="yy-input-text">是否转办</span>
                              <el-select v-model="pd.isassign" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                      <el-option
                                        v-for="(item,ind) in $store.state.zbqf"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.dm">
                                        </el-option>
                            </el-select>
                           
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
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
                          <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">转办时间</span>
                           <el-date-picker class="yy-input-input"
                           v-model="pd.assigntime" format="yyyy-MM-dd"
                           type="date" size="small" value-format="yyyy-MM-dd"
                           placeholder="选择时间">
                        </el-date-picker>
                        </el-col>
                         <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">督（转）办号</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.assignno"  class="yy-input-input" ></el-input>
                        </el-col> -->
                        <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">转办文号</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.btr"  class="yy-input-input" ></el-input>
                     
                        </el-col> -->
                        <el-col :sm="24" :md="12" :lg="8" >
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
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">转办告知文号</span>
                            <el-input placeholder="" size="small" clearable v-model="pd.assigninformno"  class="yy-input-input" ></el-input> 
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">办结时间</span>
                           <el-date-picker class="yy-input-input"
                           v-model="pd.completedtime" format="yyyy-MM-dd"
                           type="date" size="small" value-format="yyyy-MM-dd"
                           placeholder="选择时间">
                        </el-date-picker>
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
                         <el-col :sm="24" :md="12" :lg="8">
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
                        <el-col :sm="24" :md="12" :lg="8">
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
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">审批人</span>
                            <!-- <el-input placeholder="请输入内容" size="small" clearable v-model="pd.checkuseridname"  class="yy-input-input" ></el-input> -->
                              <el-select v-model="pd.checkuseridname" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
                              <el-button type="primary" size="small" :disabled="pd3.bnt0" @click="gotoinfo('0','录入')">登记</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="gotoinfo('9','查看')">查看</el-button>
                              <el-button type="primary" size="small"  :disabled="pd3.bnt1"  @click="gotoinfo('1','审批')">审批</el-button>
                              <el-button type="primary" size="small"  :disabled="pd3.bnt2" @click="gotoinfo('2','交办')">交办</el-button>
                              <el-button type="primary" size="small"  :disabled="pd3.bnt3"  @click="gotoinfo('3','办理')">办理</el-button>
                              <el-button type="primary" size="small" :disabled="pd3.bnt5" @click="gotoinfo('6','催办')">催办</el-button>
                              <el-button type="primary" size="small"  :disabled="pd3.bnt4" @click="gotoinfo('4','办结')">办结</el-button>
                              <!-- <el-button type="primary" size="small"  :disabled="pd3.bnt6" @click="gotoinfo('5','复文')">复文</el-button> -->
                              <el-button type="primary" size="small"   @click="imports">导入</el-button>
                              <el-button type="primary"  size="small"  @click="download(0)">下载全部</el-button>
                               <el-button type="primary"  size="small"  @click="download(1)">下载当页</el-button>
                              </el-col>
                              <el-col :span="6" class="trt">
                                  关注案件总数 <b class="sumfont" >{{this.TotalResult}}</b> 件
                              </el-col>
                            </el-row>
                          <el-table
                            ref="multipleTable"
                            :data="tableData"
                             @row-click="clickRow"
                             highlight-current-row
                            @selection-change="handleSelectionChange">
                            <!-- <el-table-column
                                type="selection"
                                width="50" v-if='cc'>
                            </el-table-column> -->
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
          <el-dialog title="导入文件" :visible.sync="uploadDialogVisible"  width="640px">
            <UPLOAD :url="uurl" :type="99" :urlErr="urlErr" @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
            </el-dialog>
    </div>
</template>
<script>
import {format} from '@/assets/js/date.js'
import {sortByKey} from '@/assets/js/ToArray.js'
import UPLOAD from "../../Common/upload"
export default {
    components:{UPLOAD},
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
            uploadDialogVisible:false,
            uurl:'/caseImportExcelController/caseImportExcel',
            urlErr:'',
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
            pd3:{bnt0:false,bnt1:true,bnt2:true,bnt3:true,bnt4:true,bnt5:true,bnt6:true},
            focusCaseId:'',
            lvdw:[],
            year:'',
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
         this.getinit(this.$route);
    },
     watch:{
          $route:function(val){
            this.getinit(val);
          }
       },
    methods:{
         clickRow(row){
           this.focusCaseId=row.focuscaseid;
           var num=row.focuscasestatus
           this.bnt=false;
           console.log('=========',num,row.focuscaseoaprocessid);
             this.pd3={bnt0:false,bnt1:true,bnt2:true,bnt3:true,bnt4:true,bnt5:true,bnt6:true}
            //    高级查询界面按钮控制
            //    登记状态：0  展示按钮(登记、查看、审批)   
            //    审批状态：2  展示按钮(登记 、查看、交办、办理、催办) 
            //    交办状态：4  展示按钮(登记、查看、办结、催办)  
            //    办理状态：1  展示按钮(登记、查看、办结、催办)   
            //    办结状态：3  展示按钮(登记、查看、复文、催办)  
            //    复文状态:   6  展示按钮(登记、查看)   
            //    催办状态:   5  展示按钮(登记、查看、催办)
           switch (num) {
              case '0':
                   this.pd3.bnt1=false;
                   break;
              case '2':
                     
                     this.pd3.bnt2=false;
                     this.pd3.bnt3=false;
                     this.pd3.bnt5=false;
                     this.pd3.bnt6=true;
                   break;
             case '4':
                      if(row.focuscaseoaprocessid==null){
                       
                           this.pd3.bnt3=false;
                      }
                     this.pd3.bnt4=false;
                     this.pd3.bnt5=false;
                    //  this.pd3.bnt6=false;
                   break;
             case '1':
                     this.pd3.bnt4=false;
                     this.pd3.bnt5=false;
                   break;
             case '3':
                    
                     this.pd3.bnt6=false;
                   break;
             case '6':
                     this.pd3.bnt0=true;
                   break;
             case '5':
                    this.pd3.bnt6=false;
                   break;
               default:
                 
                   break;
           }
            
          // this.$refs.multipleTable.toggleRowSelection(row)
           
        },
        getinit(val){
             
             this.pd.year=val.query.year;
             this.year=val.query.year;
             this.getCheckList();
             this.getcbdw();
             //this.getLWDW();
             this.getName();
             this.getJBR();
             this.getLrdw();
             this.pd.type=val.query.type==null?'0':val.query.type;
             this.type=val.query.type==null?'0':val.query.type;
             this.getList(this.CurrentPage, this.pageSize, this.pd);
        },
          handleSelectionChange(val) {
        
          this.multipleSelection = val;
         
        //   if(this.multipleSelection.length>0){
        //       this.bnt=false;
             
        //   }else{
          
        //      this.bnt=true; 
        //   }
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
            this.pd.year=this.year;
            this.pd.type=this.type;
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
          console.log('this.checkedList',this.checkedList.length,this.checkItem.length);
          
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
           
             console.log(this.pd.lettersourceorgid);
             
           this.changeList();
           if(this.pd.lettersourceorgid && this.pd.lettersourceorgid.length>0){
               this.pd.lettersourceorgid=this.pd.lettersourceorgid[this.pd.lettersourceorgid.length-1];
           }
           this.pd.pagenum=currentPage;
           this.pd.inum=showCount
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
          download(t){
              let p={};
             if(t==0){
                     this.pd.inum=100000;
             }else{
                  this.pd.inum=this.pageSize;
             }
                    p={
                        "pd":this.pd,
                        "listname":this.configHeader,
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
        gotoinfo(t,title){
            
            // if(this.multipleSelection.length>0){
            //   focusCaseId=this.multipleSelection[0].focuscaseid;
            // }
           
              this.$router.push({name:'CaseInfo',query:{type:t.toString(),status:t,ctitle:title,year:this.pd.year,focusCaseId:this.focusCaseId}});
        //    switch (t) {
        //        case '0':
        //            this.$router.push({name:'CaseInfo',query:{type:'0',focusCaseId:focusCaseId}});
        //            break;
        //        case '1':

        //            this.$router.push({name:'CaseInfo',query:{type:'1',focusCaseId:focusCaseId}});
        //            break;
        //        case '2':
        //            this.$router.push({name:'CaseInfo',query:{type:'2',focusCaseId:focusCaseId}});
        //            break;
        //         case '3':
        //            this.$router.push({name:'CaseInfo',query:{type:'3',focusCaseId:focusCaseId}});
        //            break;
        //         case '4':
        //            this.$router.push({name:'CaseInfo',query:{type:'4',focusCaseId:focusCaseId}});
        //            break;
        //         case '5':
        //            this.$router.push({name:'CaseInfo',query:{type:'5',focusCaseId:focusCaseId}});
        //            break;
        //         case '6':
        //            this.$router.push({name:'CaseInfo',query:{type:'6',focusCaseId:focusCaseId}});
        //            break;
        //        case '9':
        //            this.$router.push({name:'CaseInfo',query:{type:'9',focusCaseId:focusCaseId}})
        //            break;
           
        //        default:
        //            break;
        //    }
        },
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
        imports(){
        this.uploadDialogVisible = true;
        },
         fatherMethod(){
          this.uploadDialogVisible = false;
          this.getList(this.CurrentPage, this.pageSize, this.pd);
        },
        
    },
}
</script>
<style scoped>
.yy-input-text{font-size: 14px;}
.txtx{width: 40%!important;}
.inputx{width: 50%!important;}
</style>