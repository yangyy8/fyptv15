<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
         <span> 办理工作 <span class="mlr_10">/</span>  <b>{{title}}信息</b></span> </div>
         <div class="content">
                <div class="ptitle mb-20">{{title}}</div>
                <div class="pborder">
                    <el-row class="lh" :gutter="2">
                       <el-col :sm="24" :md="12" :lg="8">
                        <span class="yy-input-text">议案类型</span>
                        <el-select v-model="pd.proposalType" @change="getYAName(pd.proposalType)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.yalx"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                      </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">年度</span>
                           <el-select v-model="pd.year" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in yeardata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">编号</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.number"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col  :sm="24" :md="12" :lg="16" >
                            <span class="yy-input-text" style="width:13.5%">标题</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.title"  class="yy-input-input" style="width:80%!important;"></el-input>
                        </el-col>
                        
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">业务种类</span>
                           <el-select v-model="pd.businessType" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in ywzllist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">承办单位</span>
                           <el-select v-model="pd.affiliationUnit" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in cbdwdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                           <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">承办类别</span>
                           <el-select v-model="pd.underTakeType" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.cblb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">承办性质</span>
                           <el-select v-model="pd.underTakeNature" :disabled="pd.underTakeType!='0116000002'" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.cbxz"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">来文期间</span>
                           <el-select v-model="pd.period" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.lwqj"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                      
                        
                       
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">届别</span>
                           <el-select v-model="pd.session" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.jb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">次别</span>
                           <el-select v-model="pd.times" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.cb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">提案形式</span>
                           <el-select v-model="pd.proposalForm" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.taxs"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">提案组织</span>
                           <el-select v-model="pd.proposalOrgId" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.tazz"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">领衔代表</span>
                         <el-select v-model="pd.leaderPerson" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in lxdbdata"
                           :key="ind"
                           :label="item.personName"
                           :value="item.personId">
                           </el-option>
                        </el-select>
                        </el-col>
                       <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">联名代表</span>
                        <el-select v-model="pd.jointPerson" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in lxdbdata"
                           :key="ind"
                           :label="item.personName"
                           :value="item.pbId">
                           </el-option>
                        </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">内部承办单位</span>
                           <el-select v-model="pd.affiliationUnite" @change="getCBBM(pd.affiliationUnite,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in cbdwdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">内部承办部门</span>
                           <el-select v-model="pd.affiliationUnitw" filterable clearable default-first-option placeholder="请先选择内部承办单位"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in cbbmdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                       
                           </el-row>
                    <el-row class="lh" v-if="open">
                       <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">答复类型</span>
                           <el-select v-model="pd.replyType" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.dflx"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                      <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">是否重点办理</span>
                           <el-select v-model="pd.isImportant" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.zdqf"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                       
                         <el-col :sm="24" :md="12" :lg="8" v-if="pd.isImportant=='0213000001'">
                            <span class="yy-input-text">重点业务分类</span>
                           <el-select v-model="pd.importantBusinessType" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.zdywfl"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         
                         <!-- <el-col  :sm="24" :md="12" :lg="16" >
                            <span class="yy-input-text" style="width:13.5%">备注</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.title"  class="yy-input-input" style="width:80%!important;"></el-input>
                        </el-col> -->
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">交办状态</span>
                           <el-select v-model="pd.assignStatus" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="2" label="全部">
                                </el-option>
                                <el-option value="1" label="未交办">
                                </el-option>
                                <el-option value="0" label="已交办">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">办理状态</span>
                           <el-select v-model="pd.transactStatus " filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="2" label="全部">
                                </el-option>
                                 <el-option value="1" label="未办理">
                                </el-option>
                                <el-option value="0" label="已办理">
                                </el-option>
                               
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">统稿状态</span>
                           <el-select v-model="pd.completeStatus" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                 <el-option value="2" label="全部">
                                </el-option>
                                <el-option value="1" label="未统稿">
                                </el-option>
                                <el-option value="0" label="已统稿">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">复文状态</span>
                           <el-select v-model="pd.replyStatus" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="2" label="全部">
                                </el-option>
                                <el-option value="1" label="未复文">
                                </el-option>
                                <el-option value="0" label="已复文">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">催办状态</span>
                           <el-select v-model="pd.urgentStatus" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option value="2" label="全部">
                                </el-option>
                                <el-option value="1" label="未催办">
                                </el-option>
                                <el-option value="0" label="已催办">
                                </el-option>
                            </el-select>
                        </el-col>
                       
                 
                       
                          <!--  <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">联名人数</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.caseno"  class="yy-input-input" ></el-input>
                        </el-col> -->
                        
                         <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">承办部门</span>
                           <el-select v-model="pd.doctime" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col> -->
                        <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">承办人</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.casereason"  class="yy-input-input" ></el-input>
                        </el-col> -->
                         <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">办理情况</span>
                           <el-select v-model="pd.doctime" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col> -->
    
                      
                        
                       
                          <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">复文号</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.replyNumber"  class="yy-input-input" ></el-input>
                        </el-col>
                         
                        
                          
                          <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">沟通情况</span>
                           <el-select v-model="pd.doctime" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col> -->
                         
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">是否公开</span>
                           
                            <el-select v-model="pd.isPublic" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.gkqf"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         
                        
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">办结时间</span>
                           <el-date-picker class="yy-input-input"
                           v-model="pd.endTime" format="yyyy-MM-dd"
                           type="date" size="small" value-format="yyyy-MM-dd"
                           placeholder="选择时间">
                        </el-date-picker>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">应办结时间</span>
                           <el-date-picker class="yy-input-input"
                           v-model="pd.assignFinishTime" format="yyyy-MM-dd"
                           type="date" size="small" value-format="yyyy-MM-dd"
                           placeholder="选择时间">
                        </el-date-picker>
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
                    <el-checkbox v-for="item in checkItem" :label="item.code" :key="item.code" :checked="item.checked" :disabled="item.checked">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                    </div>
                </div>

                <div class="pborder mt-20">
                    
                            <el-row >
                            <el-col :span="20" class="ah-40">
                              <el-button type="primary" size="small" :disabled="pdbnt.bnt1"  @click="gotoinfo('0','录入')">登记</el-button>
                              <el-button type="primary" size="small"  :disabled="pdbnt.bnt2" @click="gotoinfo('9','查看')">查看</el-button>
                              <el-button type="primary" size="small"  :disabled="pdbnt.bnt1" @click="gotoinfo('0','补充厅室信息')">补充厅室信息</el-button>
                              <el-button type="primary" size="small"  :disabled="pdbnt.bnt3" @click="gotoinfo('jb','交办')">交办</el-button>
                              <el-button type="primary" size="small"  :disabled="pdbnt.bnt4" @click="gotoinfo('bl','办理')">办理</el-button>
                              <el-button type="primary" size="small"  :disabled="pdbnt.bnt5" @click="gotoinfo('tg','统稿')">统稿</el-button>
                              <el-button type="primary" size="small"  :disabled="pdbnt.bnt6" @click="gotoinfo('fw','复文')">复文</el-button>
                              <el-button type="primary" size="small"  :disabled="pdbnt.bnt7" @click="gotoinfo('cb','催办')">催办</el-button>
                              <el-button type="primary" size="small"  :disabled="pdbnt.bnt8" @click="deltable">删除</el-button>
                              <el-button type="primary" size="small"   @click="imports">导入</el-button>
                              <el-button type="primary"  size="small"  @click="download(0)">下载全部</el-button>
                              <el-button type="primary"  size="small"  @click="download(1)">下载当页</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getopen(1)">公开</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getopen(2)">审核</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getopen(3)">发布</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getopen(4)">回收</el-button>
                              </el-col>
                              <el-col :span="4" class="trt">
                                  <!-- {{title}} -->
                                  总数 <b class="sumfont" >{{this.TotalResult}}</b> 件
                              </el-col>
                            </el-row>
                          <el-table
                            ref="multipleTable"
                            :data="tableData"
                             
                            @row-click="clickRow"
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
    <el-dialog title="批量交办" :visible.sync="jbDialogVisible">
                <el-row class="ah-40">
                          <el-col :span="8">
                         <span class="yy-input-text">承办单位</span>
                         <el-select v-model="pdjb.assignOrgId" @change="getCBBM(pdjb.assignOrgId);getName(pdjb.assignOrgId,5)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbdwdata1"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                              </el-option>
                        </el-select>

                       </el-col>
                         <el-col :span="8">
                         <span class="yy-input-text">承办部门</span>
                         <el-select v-model="pdjb.assignSubOrgId"  @change="getCBR(pdjb.assignOrgId,pdjb.assignSubOrgId),getName(pdjb.assignSubOrgId,6)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbbmdata"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                              </el-option>
                        </el-select>

                       </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">承办人</span>
                         <el-select v-model="pdjb.assignUserId" @change="getName(pdjb.assignUserId,7)"   filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbrdata"
                                :key="ind"
                                :label="item.personName"
                                :value="item.pbId">
                              </el-option>
                        </el-select>

                       </el-col>
                         <el-col :span="8">
                          <span class="yy-input-text">应办结时间</span>
                                <el-date-picker
                                    v-model="pdjb.assignTime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input">
                           </el-date-picker>
                         </el-col>
                          <el-col :span="8">
                            <el-button type="success" plain size="small" @click="addList()">加入列表</el-button>
                          
                         </el-col>
                        
                    </el-row>
                    <el-row class="ah-50">
                       
                        <el-col :span="24">
                           
                             <el-table
                            ref="jbmultipleTable"
                            :data="jbtableData"
                            width="100%">
                            <!-- <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column> -->
                            <el-table-column
                                type="index"
                                label="序号">
                            </el-table-column>
                             <el-table-column
                                prop="assignOrgIdName"
                                label="承办单位">
                            </el-table-column>
                            <el-table-column
                                prop="assignSubOrgIdName"
                                label="承办部门">
                            </el-table-column>
                            <el-table-column
                                prop="assignUserIdName"
                                label="承办人">
                            </el-table-column>
                              <el-table-column
                                prop="assignTime"
                                label="应办结时间">
                            </el-table-column>
                              <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="adddel(scope.row)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                          
                            </el-col>
                            
                    </el-row>

            <div slot="footer" class="dialog-footer">
              <el-button type="primary"  size="small" @click="jbsubmit">提 交</el-button>
              <el-button @click="jbDialogVisible = false" size="small">取 消</el-button>
            </div>
    </el-dialog>
      <el-dialog title="公开" :visible.sync="openDialogVisible"  width="660px">
   <OPEN :url="openurl" :type="0" :data="opendata" @GKfatherMethod="GKfatherMethod" :random="new Date().getTime()"></OPEN>
  </el-dialog>
  <el-dialog  :title="txtname" :visible.sync="shDialogVisible"  width="660px">
   <EXAMINE :url="shurl" :type="sendtype" :data="opendata" @SHfatherMethod="SHfatherMethod" :random="new Date().getTime()"></EXAMINE>
  </el-dialog>
 
  <el-dialog title="内容发布" :visible.sync="fbDialogVisible"  width="800px">
     <RELEASE :url="fburl" :type="0"  :data="opendata" @FBfatherMethod="FBfatherMethod" :random="new Date().getTime()"></RELEASE>
  </el-dialog>

  <el-dialog title="导入文件" :visible.sync="uploadDialogVisible"  width="640px">
            <UPLOAD :url="uurl" :type="99" :proposalType="drtype" :urlErr="urlErr" @drfatherMethod="drfatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>
    </div>
</template>
<script>
import {format} from '@/assets/js/date.js'
import {sortByKey} from '@/assets/js/ToArray.js'
import {ToArray} from '@/assets/js/ToArray.js'
import OPEN from "../../Common/opencontent"
import EXAMINE from "../../Common/examinecontent"
import RELEASE from "../../Common/releasecontent"
import UPLOAD from "../../Common/upload"
export default {
    components:{OPEN,EXAMINE,RELEASE,UPLOAD},
    data(){
        return{
            CurrentPage: 1,
            pageSize: 10,
            TotalResult: 0,
            pd:{year:'',assignStatus:'',transactStatus:'',
            completeStatus:'',replyStatus:'',urgentStatus:'',proposalType:''},
            pdbnt:{bnt1:false,bnt2:false,bnt3:true,bnt4:true,bnt5:true,bnt6:true,bnt7:true,bnt8:true},
            pdjb:{},
            options:this.pl.ps,
            open:false,
            all:true,
            bnt:true,
            cname:'建议、批评和意见管理',
            title:'议案建议',
            checkedList:[],
            tableData:[],
            jbtableData:[],
            configHeader:[],
            checkItemReal:[],
            cc:true,
            multipleSelection:[],
            jbDialogVisible:false,
            checkItem:[],
            addtype:'1',
            cbdwdata:[],
            cbdwdata1:[],
            yeardata:[],
            cbbmdata:[],
            cbrdata:[],
            lxdbdata:[],
            zt:'',
            sname:'',
            snames:'',
            ywzllist:[],//业务种类
            bnt:true,
            uurl:'/proposalHome/importProposal',
            urlErr:'',
            openurl:'/contentPublic/openContent',
            shurl:'/contentPublic/auditContent',
            fburl:'/contentPublic/releaseContent',
            openDialogVisible:false,
            shDialogVisible:false,
            fbDialogVisible:false,
            opendata:[],//需要传的对象
            txtname:'审核',
            sendtype:'0',//审核
            uploadDialogVisible:false,
            drtype:'',

        }
    },
    mounted(){
        this.$store.dispatch("getJb");
        this.$store.dispatch("getCb");
        this.$store.dispatch("getLwqj");
        this.$store.dispatch("getDflx");
        this.$store.dispatch("getGkqf");
        this.$store.dispatch("getCblb");
        this.$store.dispatch("getCbxz");
        this.$store.dispatch("getTaxs");
        this.$store.dispatch("getZdywfl");
        this.$store.dispatch("getZdqf");
        this.$store.dispatch("getYalx");
        this.$store.dispatch("getTazz");
        this.getinit(this.$route);
      
    },
    watch:{
        $route:function(val){
              this.getinit(val);
        }
    },
    methods:{
       
       clickRow(row){

           this.$refs.multipleTable.toggleRowSelection(row);
             
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
           this.bnt=true;
           this.pdbnt={bnt1:false,bnt2:false,bnt3:true,bnt4:true,bnt5:true,bnt6:true,bnt7:true,bnt8:true};
           console.log(this.multipleSelection.length,'this.multipleSelection.length');
           
           if(this.multipleSelection.length==1){
              var state=this.multipleSelection[0].handStatusCode;
              this.pdbnt.bnt1=true;
              this.bnt=false;
              if(state=="0205000001"){//登记
                  this.pdbnt.bnt1=false;
                  this.pdbnt.bnt3=false;
                  this.pdbnt.bnt8=false;
              }else if(state=="0205000002"){//补充厅室信息
                    this.pdbnt.bnt1=false;
              }else if(state=="0205000003"){//交办
                this.pdbnt.bnt4=false;
                this.pdbnt.bnt7=false;
              }else if(state=="0205000004"){//办理
                this.pdbnt.bnt5=false;
                this.pdbnt.bnt7=false;
              }else if(state=="0205000005"){//统稿
                this.pdbnt.bnt6=false;
                this.pdbnt.bnt7=false;
              }

           }else if(this.multipleSelection.length>1){
             this.pdbnt.bnt3=false;
             this.pdbnt.bnt8=false;
             this.pdbnt.bnt1=true;
             this.bnt=false;
           }
        },
          getinit(val){
              this.getyear();
              this.pd={year:'',assignStatus:'',transactStatus:'',
               completeStatus:'',replyStatus:'',urgentStatus:''};
              this.addtype=val.query.type;
              this.pd.year=val.query.year;
              this.zt=val.query.zt;
              this.getCBDW();
              this.getLmName();
              this.sname=this.cname;
             switch (this.addtype) {
                  case '0':
                        this.cname='建议、批评和意见管理';
                        this.title='建议、批评和意见';
                         this.pd.proposalType="0204000003";
                         this.getYWZL(this.Global.yajyfl);
                      break;
                   case '1':
                        this.cname='代表议案管理';
                        this.title='代表议案';
                        this.pd.proposalType="0204000001";
                        this.getYWZL(this.Global.yaywzl);
                      break;
                   case '2':
                        this.cname='政协提案管理';
                        this.title='政协提案'; 
                        this.pd.proposalType="0204000002";
                        this.getYWZL(this.Global.taywzl);                       
                      break;
                   case '3':
                        this.cname='审议意见管理';
                        this.title='审议意见';
                        this.pd.proposalType="0204000004";  
                          this.getYWZL(this.Global.syyjfl);                 
                      break;
                   case '4':
                        this.cname='日常意见建议管理';
                        this.title='日常意见建议'; 
                        this.pd.proposalType="0204000005"; 
                        this.getYWZL(this.Global.scjyfl);                      
                      break;
              
                  default:
                      break;
              }

              switch (this.zt) {
                case 'jb':
                  this.pd.assignStatus='2';
                  break;
               case 'bl':
                  this.pd.transactStatus='2';
                  break;
               case 'tg':
                  this.pd.completeStatus='2';
                  break;
               case 'fw':
                  this.pd.replyStatus='2';
                  break;
               case 'cb':
                  this.pd.urgentStatus='2';
                  break;
                default:
                  break;
              }

         //this.changeList();
        this.getCheckList();
        this.getList(this.CurrentPage, this.pageSize, this.pd);
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
                  'type':'0246000012'
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
        adddel(n){
              var arr=[];
                 arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                     var index = this.jbtableData.findIndex(item =>{
　　　　　　　　　  　 if(item.assignUserId==arr[i].assignUserId && item.assignSubOrgId==arr[i].assignSubOrgId){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
                   this.jbtableData.splice(index,1)
                  }
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
           this.changeList();
          let p={
             "pd2":this.pd,
             "pageInfo":{
                 "pageNumber":currentPage,
                 "pageSize":showCount,
             }
          };
          this.$api.post(this.Global.aport2+'/proposalHome/query',p,
                r =>{
                  
                      if(r.code==1){
                          this.tableData=r.data.queryResultVOS;
                          this.TotalResult=r.data.pageInfo.total;
                          if(this.snames!=''){
                             this.sname=this.snames;
                       
                          }
                         
                      }
                });
        
        },
        jbsubmit(){
          var pinfoid=[];
          var array=this.multipleSelection;
          for (let i = 0; i < array.length; i++) {
            pinfoid.push(array[i].proposalInfoId);
          }
           let p={
             "proposalInfoIds":pinfoid,
             "assignInfo":this.jbtableData,
          };
          this.$api.post(this.Global.aport2+'/proposalAssign/batchAssign',p,
                r =>{
                   if(r.code==1){
                           this.$message({
                            message: r.message,
                            type: 'success'
                          });
                        this.jbDialogVisible=false;
                        this.jbtableData=[];
                        this.getList(this.CurrentPage, this.pageSize, this.pd);
                      }else{
                        this.$message.error(r.message);
                      }
                });
        },
    gotoinfo(t,title){
        var proposalInfoId="";
        if(t=='0'){
          if(this.multipleSelection.length==1){
             proposalInfoId=this.multipleSelection[0].proposalInfoId;
          }else if(this.multipleSelection.length>1){
              this.$message.error("只能选择一条数据！");return;
          }
           this.$router.push({name:'SuggestInfo',query:{type:this.addtype,zt:'0',ctitle:title, proposalInfoId:proposalInfoId,year:this.pd.year}});
        }else{
            if(this.multipleSelection.length==1){
              proposalInfoId=this.multipleSelection[0].proposalInfoId;
              this.$router.push({name:'SuggestInfo',query:{type:this.addtype,zt:t,ctitle:title,proposalInfoId:proposalInfoId,year:this.pd.year}});
              }else if(this.multipleSelection.length==0){
                this.$message.error("请选择一条数据！");return;
              }else{
              if(t=='jb'){
                  var array=this.multipleSelection;
                  for (let ii = 0; ii < array.length; ii++) {
                    if(array[ii].handStatusCode!="0205000001"){
                      this.$message.error("除了登记状态的其他数据不能再次交办，请重新选择！");return;
                    }
                    
                  }
                  this.jbDialogVisible=true;
              }else{
                this.$message.error("只能选择一条数据！");return;
              }
            }  
          }
        },
        addList(){
          if(this.pdjb.assignOrgId==undefined || this.pdjb.assignOrgId=="")
          {
            this.$message.error("承办单位不能为空!");return;
          }
         if(this.pdjb.assignSubOrgId==undefined || this.pdjb.assignSubOrgId=="")
          {
            this.$message.error("承办部门不能为空!");return;
          }
          if(this.pdjb.assignUserId==undefined || this.pdjb.assignUserId=="")
          {
            this.$message.error("承办人不能为空!");return;
          }
          if(this.pdjb.assignTime==undefined || this.pdjb.assignTime=="")
          {
            this.$message.error("应办结时间不能为空!");return;
          }
           this.jbtableData.push(this.pdjb);
          this.pdjb={};
        },
        deltable(){
          if(this.multipleSelection.length==0){
                  this.$message.error("请选择一条数据！");return;
          }
          var mselect=[];
          var array=this.multipleSelection;
          for (let i = 0; i < array.length; i++) {
           mselect.push(array[i].proposalInfoId);
          }
                 this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let p={
                          'token':this.$store.state.token,
                           'deleteInfo':mselect,
                    };
                this.$api.post(this.Global.aport2+'/proposalHome/batchDelete',p,
                 r =>{
                  
                      if(r.code==1){
                         this.$message({
                                type: 'success',
                                message: '删除成功!'
                        });
                        this.getList(this.CurrentPage, this.pageSize, this.pd);
                      }
                });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });

        },
          download(t){
              let p={};
             if(t==0){
              if(this.multipleSelection.length==0){//全部导出
                    p={
                        "pd":this.pd,
                        "showColumns":this.configHeader,
                    }
              }
            }else if(t==1){
                p={
                  "pageInfo": {
                  "pageNumber": this.CurrentPage,
                  "pageSize": this.pageSize
                  },
                "pd":this.pd,
                "showColumns":this.configHeader,
               }
             }
            this.$api.post(this.Global.aport2+'/proposalHome/exportProposal',p,
                r =>{
                      this.downloadM(r);
                },e=>{},{},'blob')
          },
            downloadM (data) {
            if (!data) {
                return
            }       
            var name=this.title+format(new Date(),'yyyyMMddhhmmss')+'.xls';
            let url = window.URL.createObjectURL(new Blob([data],{type:"application/xls"}))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download',name)
            document.body.appendChild(link)
            link.click()
        },
      //     //承办单位  如果没有下级部门，那么该处就是承办部门
      // getCBDW(){
      //   let p={
      //             'orgId':this.$store.state.orgid,

      //           };
      //             this.$api.get(this.Global.aport1+'/org/getUndertakeOrg',p,
      //             r =>{
                  
      //                if(r.code==1){
      //                      this.cbdwdata=r.data;
      //                }
      //     });

      // },
      //承办部门
      getCBBM(orgid,t){
        if(t==0){
          this.$set(this.pd,'affiliationUnitw',"");
        }
        let p={
                  'orgId':orgid,

                };
                  this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                  r =>{
                  
                     if(r.code==1){
                           this.cbbmdata=r.data;
                     }
                  });

      },
        //承办人
      getCBR(orgid,subid){
    
        let p={
                  'orgId':orgid,
                  'subOrgId':subid

                };
                  this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
                  r =>{
                  
                     if(r.code==1){
                           this.cbrdata=r.data;
                     }
                  });

      },
      //领衔代表，联系人
      getLmName(){
          let p={};var url="";
        switch (this.addtype) {
          case '0'://领衔代表（联名代表）
          case '1':
          case '4':
            p={
             'personName':'',
             'personType':this.Global.REPRESENTATIVE,
            };
            url="/baseinfo/personlistbytype";
            break;
          case '2'://所有人员查询接口
          case '3':
            p={
             'personName':'',
             'leveType':'',
            };
           url="/baseinfo/allpersonlist";
            break;
        
          default:
            break;
        }
     
           this.$api.post(this.Global.aport1+url,p,
             r =>{
                  
                   this.lxdbdata=r.data;
            });
        },
      getyear(){
            var date=new Date();
            var arr=[];
            var array=date.getFullYear();
               for (let i =0; i < 5; i++) {
                    var obj={};
                    obj.dm=parseInt(array)-i;
                    obj.mc=parseInt(array)-i;
                    arr.push(obj);
                }
            this.yeardata=arr;
        },
      getName(val,t){
        var obj = {};
        switch (t) {
          
            case 5:
             obj = this.cbdwdata.find(item =>{
                 return item.orgid === val 
                });
              this.pdjb.assignOrgIdName = obj.mc
            break;
             case 6:
             obj = this.cbbmdata.find(item =>{
                 return item.orgid === val 
                });
              this.pdjb.assignSubOrgIdName = obj.mc
            break;
            case 7:
             obj = this.cbrdata.find(item =>{
                 return item.pbId === val 
                });
              this.pdjb.assignUserIdName = obj.personName
            break;
          default:
            break;
        }
      },
      getYAName(val)
      {
       
        this.$forceUpdate();
        var obj={};
        if(val!=null && val!=''){
         obj = this.$store.state.yalx.find(item =>{
                 return item.dm === val 
                });
          this.snames = obj.mc
          this.title=obj.mc;
        }
      
       },
       //业务种类
        getYWZL(url){
            this.$api.get(this.Global.aport4 + url, null,
            r => {
              this.ywzllist=ToArray(r.data);
          })
      },
      //承办单位
       getCBDW(){
         let p={
                'mc':'',
            };
          this.$api.post(this.Global.aport1+'/org/getOtherOrg',p,
                r =>{
                    if(r.code==1){
                        this.cbdwdata=r.data;
                        this.cbdwdata1=r.data;
                    }
           });

      },
      getopen(t){
            if(this.multipleSelection.length==0){
                this.$message.error("请选择至少一条数据!");return;
            }
            if(this.multipleSelection.length>1 && t==3){
                this.$message.error("只能选择一条数据!");return;
            }
            var contentPublicList=[];
            var array=this.multipleSelection;
       
            
            for (let i = 0; i < array.length; i++) {
            
                var obj={};
                obj.contentPublicId=array[i].proposalInfoId;
                obj.contentPublicType="0134000002";
                switch (t) {
                    case 1://公开
                         obj.publicProcessType="0133000001";
                        break;
                    case 2://审核
                         obj.publicProcessType="0133000002";
                        break;
                    case 3://发布
                         obj.publicProcessType="0133000003";
                        break;
                    case 4://回收
                         obj.publicProcessType="0133000004";
                        break;
                    default:
                        break;
                }
             
                contentPublicList.push(obj);
            }
            this.opendata=contentPublicList;

             if(t==1){
                 this.openDialogVisible=true;
             }else if(t==2){
                   this.txtname="审核";
                   this.shurl="/contentPublic/auditContent";
                   this.sendtype='0'
                   this.shDialogVisible=true;
             }else if(t==3){
                 this.fbDialogVisible=true;
             }
             else if(t==4){
                 this.txtname="回收";
                 this.shurl="/contentPublic/recycleContent";
                 this.sendtype='1'
                 this.shDialogVisible=true;
             }
        },
        GKfatherMethod(data,t){
                 this.openDialogVisible=false;
        },
        SHfatherMethod(data,t){
                 this.shDialogVisible=false;
        },
        FBfatherMethod(data,t){
                 this.fbDialogVisible=false;
        },
      imports(){
        this.drtype=this.pd.proposalType;
        this.uploadDialogVisible = true;
        },
      drfatherMethod(){
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