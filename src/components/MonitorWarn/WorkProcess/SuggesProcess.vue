<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
         <span> 监控和预警 
           <span class="mlr_10">/</span>  办理流程监控
           <span class="mlr_10">/</span>  <b>{{title}}信息</b>
           </span> </div>
         <div class="content">
                <div class="ptitle mb-20">{{title}}</div>
                <div class="pborder">
                    <el-row class="lh" :gutter="2">
                       <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
                            <span class="yy-input-text">编号</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.number"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col  :sm="24" :md="12" :lg="16"  class="input-item">
                            <span class="yy-input-text" style="width:13.5%">标题</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.title"  class="yy-input-input" style="width:80%!important;"></el-input>
                        </el-col>
                        
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                           <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                      
                        
                       
                        <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                        <el-col :sm="24" :md="12" :lg="8"  class="input-item">
                            <span class="yy-input-text">提案形式</span>
                           <el-select v-model="pd.proposalForm" :disabled='addtype!="2"'  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.taxs"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item" >
                            <span class="yy-input-text">提案组织</span>
                           <el-select v-model="pd.proposalOrgId" :disabled='addtype!="2"'  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.tazz"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
                            <span class="yy-input-text">领衔人</span>
                         <el-select v-model="pd.leaderPerson" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in lxdbdata"
                           :key="ind"
                           :label="item.fullName"
                           :value="item.personId">
                           </el-option>
                        </el-select>
                        </el-col>
                       <el-col :sm="24" :md="12" :lg="8"  class="input-item">
                            <span class="yy-input-text">联名人</span>
                        <el-select v-model="pd.jointPerson" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in lxdbdata"
                           :key="ind"
                           :label="item.fullName"
                           :value="item.pbId">
                           </el-option>
                        </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
                            <span class="yy-input-text">内部承办单位</span>
                           <el-select v-model="pd.innerUnderOrg" @change="getCBBM(pd.innerUnderOrg,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in cbdwdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
                            <span class="yy-input-text">内部承办部门</span>
                           <el-select v-model="pd.innerUnderSubOrg" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" :no-data-text="pd.innerUnderOrg==''||pd.innerUnderOrg==undefined?'请先选择内部承办单位':'无数据'">
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
                       <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                      <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                       
                         <el-col :sm="24" :md="12" :lg="8" v-if="pd.isImportant=='0213000001'"  class="input-item">
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
                        <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
    
                      
                        
                       
                          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                         
                         <el-col :sm="24" :md="12" :lg="8"  class="input-item">
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
                         
                        
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">办结时间</span>
                            <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker
                                v-model="pd.completeTimeStart" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker
                                    v-model="pd.completeTimeEnd" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间">
                                </el-date-picker>
                            </div>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">应办结时间</span>
                           <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker
                                v-model="pd.assignFinishTimeStart" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker
                                    v-model="pd.assignFinishTimeEnd" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间">
                                </el-date-picker>
                            </div>
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
                             <el-col :span="24" class="ah-40">
                              <el-button type="primary" size="small" :disabled="bnt"  @click="getLC(0)" v-if='allshow[0]'>办公流程</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getLC(1)" v-if='allshow[1]'>催办</el-button>
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
                          <span>领导意见{{i+1}}：</span><br>
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
import {sortByKey} from '@/assets/js/ToArray.js'
import {ToArray} from '@/assets/js/ToArray.js'
export default {
    data(){
        return{
            CurrentPage: 1,
            pageSize: 10,
            TotalResult: 0,
            pd:{year:'',assignStatus:'',transactStatus:'',
            completeStatus:'',replyStatus:'',urgentStatus:'',proposalType:''},
            bnt:true,
            options:this.pl.ps,
            title:'议案建议',
            checkedList:[],
            tableData:[],
            jbtableData:[],
            configHeader:[],
            checkItemReal:[],
            cc:true,
            multipleSelection:[],
            checkItem:[],
            addtype:'1',
            cbdwdata:[],
            cbdwdata1:[],
            yeardata:[],
            cbbmdata:[],
            cbrdata:[],
            lxdbdata:[],
            ywzllist:[],//业务种类
            open:false,
            all:true,
            form:{},
            cbform:{},
            alldata:[],
            allshow:[],
            bldata:[],
            activeNames:['2'],
            addDialogVisible:false,
            cbDialogVisible:false,
            cklc:true,

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
           this.$refs.multipleTable.toggleRowSelection(row);
        },
        handleSelectionChange(val) {
           this.multipleSelection = val;
          if(this.multipleSelection.length>0){
              this.bnt=false;
          }else{
             this.bnt=true; 
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

           var mid='';
             switch (this.addtype) {
                  case '1':
                         this.cname='建议、批评和意见管理';
                         this.title='建议、批评和意见';
                         this.pd.proposalType="0204000003";
                         this.getYWZL(this.Global.yajyfl);
                         mid='15032702';
                         this.alldata=['27023803','27023804'];
                      break;
                   case '2':
                        this.cname='代表议案管理';
                        this.title='代表议案';
                        this.pd.proposalType="0204000001";
                        this.getYWZL(this.Global.yaywzl);
                        mid='15042703';
                         this.alldata=['27033805','27033806'];
                      break;
                   case '3':
                        this.cname='政协提案管理';
                        this.title='政协提案'; 
                        this.pd.proposalType="0204000002";
                        this.getYWZL(this.Global.taywzl);  
                         mid='15052704';  
                         this.alldata=['27043807','27043808'];                   
                      break;
                   case '4':
                        this.cname='审议意见管理';
                        this.title='审议意见';
                        this.pd.proposalType="0204000004";  
                        this.getYWZL(this.Global.syyjfl);  
                        mid='15062705';   
                         this.alldata=['27053809','27053810'];                   
                      break;
                   case '5':
                        this.cname='日常意见建议管理';
                        this.title='日常意见建议'; 
                        this.pd.proposalType="0204000005"; 
                        this.getYWZL(this.Global.scjyfl);  
                        mid='15072706';
                        this.alldata=['27063811','27063812'];                       
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
          //权限start
                 this.$api.post(this.Global.menuurl,{'menuId':mid},
                     r =>{
                     
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                                this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                         
                            }   
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
                  });
              

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
                 'type':'1',
                 'billId':this.multipleSelection[0].focuscaseid
             };
              this.$api.post(this.Global.aport1+'/oAProcessOffice/getOAProcessList',p,
                r =>{
         
                       if(r.code==1){
                        this.bldata=r.data;
                        if(this.bldata.length>0){this.cklc=false}else{this.cklc=true}
                        }
                });


                this.addDialogVisible=true;
            }else if(t==1){
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
          addsave(){
             if(this.multipleSelection.length==0){
                 this.$message.error("至少选择一条数据！");return;
             }
             //console.log(this.multipleSelection);
             
             var array=this.multipleSelection;
             var frr=[];
            for (let i = 0; i < array.length; i++) {
                var obj={};
                obj.proposalInfoId=array[i].proposalInfoId;
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
         handleChange(val) {
           // console.log(val);
        },
     
    },
}
</script>
<style scoped>
.yy-input-text{font-size: 14px;}
.txtx{width: 40%!important;}
.inputx{width: 50%!important;}
</style>