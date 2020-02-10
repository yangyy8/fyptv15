<template>
      <div class="pairadd ">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 办理工作 
           <span class="mlr_10">/</span>  <b>{{casename}}信息{{ctitle}}</b></span> </div>
         <div class="content subtable">
               <!-- 来文信息 -->
                <div class="ptitle mb-20">基本信息</div>
                <div class="pborder">
                     <el-row class="ah-40">
                        <el-col :span="8">
                        <span class="yy-input-text"><font class="red">*</font> 议案类型</span>
                        <el-select v-model="pd.proposalType" @change="getdjlist(pd.proposalType)" :disabled="djshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                          <el-option
                            v-for="(item,ind) in $store.state.yalx"
                            :key="ind"
                            :label="item.mc"
                            :value="item.dm">
                            </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="24">
                           <span class="yy-input-text" style="width:9%!important;"><font class="red">*</font> 标题</span>
                           <el-input placeholder="请输入内容" size="small" :disabled="editshow" clearable v-model="pd.title" maxlength="50"  class="yy-input-input" style="width:86.5%!important;"></el-input>
                      </el-col>
                      <el-col :span="8">
                           <span class="yy-input-text"><font class="red">*</font> 编号</span>
                           <el-input placeholder="请输入内容" size="small" :disabled="editshow" clearable v-model="pd.number"  maxlength="10"  class="yy-input-input" ></el-input>
                      </el-col>
                      <el-col :span="8">
                        <span class="yy-input-text"><font class="red">*</font> 业务种类</span>
                        <el-select v-model="pd.businessType" :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in ywzllist"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>

                        </el-select>
                      </el-col>
                     
                      </el-row>
                       <el-row class="ah-40" v-if="!editshow">
                       <el-col :span="8">
                        <span class="yy-input-text">承办单位</span>
                        <el-select v-model="pd1.affiliationUnit"  @change="getName(pd1.affiliationUnit,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in cbdwdata1"
                           :key="ind"
                           :label="item.mc"
                           :value="item.orgid">
                           </el-option>
                        </el-select>
                      </el-col>
                        <el-col :span="8">
                        <span class="yy-input-text">承办类别</span>
                        <el-select v-model="pd1.underTakeType" @change="getName(pd1.underTakeType,1)"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.cblb"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                      </el-col>
                    
                       <el-col :span="8" >
                        <span class="yy-input-text" style="width:20%;">承办性质</span>
                        <el-select v-model="pd1.underTakeNature" :disabled="pd1.underTakeType!='0116000002'" @change="getName(pd1.underTakeNature,2)"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:50%!important">
                         <el-option
                           v-for="(item,ind) in $store.state.cbxz"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                         <el-button type="success" plain size="small" @click="addList(0)">加入列表</el-button>
                      </el-col>
                     

                    </el-row>

                    <el-row class="ah-40">

                        <el-col :span="24">
                             <el-table
                            ref="multipleTable"
                            :data="tableData"
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
                                prop="affiliationUnitName"
                                label="单位名称">
                            </el-table-column>
                            <el-table-column
                                prop="underTakeTypeName"
                                label="承办类别">
                            </el-table-column>
                            <el-table-column
                                prop="underTakeNatureName"
                                label="承办性质">
                            </el-table-column>
                                <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text" :disabled="editshow"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="adddel(scope.row,'0')"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                        
                        </el-col>
                    </el-row>
                    <el-row class="ah-40 mt-10">
                        <el-col :span="8" >
                        <span class="yy-input-text"><font class="red">*</font> 来文期间</span>
                        <el-select v-model="pd.period" :disabled="editshow"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.lwqj"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                      </el-col>
                        <el-col :span="16" class="input-item">
                        <span class="yy-input-text" style="width:14.5%;"><font class="red">*</font> 届次</span>
                        <div class="yy-input-input">
                        <el-select v-model="pd.session" :disabled="editshow"  filterable clearable default-first-option placeholder="请选择"  size="small"  style="width:30%!important;min-width:100px">
                         <el-option
                           v-for="(item,ind) in $store.state.jb"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                        <el-select v-model="pd.times" :disabled="editshow"  filterable clearable default-first-option placeholder="请选择"  size="small" style="width:30%!important;min-width:100px">
                         <el-option
                           v-for="(item,ind) in $store.state.cb"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>

                        </div>
                      </el-col>

                    </el-row>
                    <el-row class="ah-40" >
                        <el-col :span="8" v-if="type=='2'">
                        <span class="yy-input-text">提案形式</span>
                        <el-select v-model="pd.proposalForm" :disabled="editshow"  @change="getTAXS(pd.proposalForm)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.taxs"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                      </el-col>

                      <el-col :span="8" v-if='tashow'>
                        <span class="yy-input-text">
                           提案组织
                        </span>
                        <el-select v-model="pr.proposalOrgId" :disabled="editshow"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                          <el-option
                           v-for="(item,ind) in $store.state.tazz"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                      </el-col>
                       <el-col :span="8" v-else>
                        <span class="yy-input-text"><font class="red">*</font> 
                          <!-- <span v-if='type==2'>提案人</span>
                          <span v-else-if='type==5'>提出人</span>
                          <span v-else>领衔代表</span> -->
                          {{label1}}
                          </span>
                        <el-select v-model="pr.leaderPersonId" @change="getName(pr.leaderPersonId,8)"   :disabled="editshow"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in lxdbdata"
                           :key="ind"
                           :label="item.fullName"
                           :value="item.personId">
                           </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="16" v-if='lpshow'>
                           <el-tag v-for="(value,key) in lableList" :key="key" style="margin-right:10px;">{{value}}</el-tag>
                              <span>{{Remark}}</span>
                      </el-col>
                    </el-row>
                    <div v-if="!tashow">
                     <el-row class="ah-40" v-if="!editshow">
                        <el-col :span="8">
                        <span class="yy-input-text">
                          <!-- <span v-if='type==2 && !tashow'>联名人</span>
                          <span v-else-if='type==2 && tashow'>联系人</span>
                          <span v-else-if='type==5'>联名人员</span>
                          <span v-else>联名代表</span> -->
                          {{label2}}
                          </span>
                        <el-select v-model="pd2.lxdd" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in lxdbdata"
                           :key="ind"
                           :label="item.fullName"
                           :value="item.pbId+'|'+item.personId">
                           </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-button type="success" plain size="small" @click="addList(1)">加入列表</el-button>
                      </el-col>
                    </el-row>
                     <el-row class="ah-50">
                        <el-col :span="24">
                         
                             <el-table
                            ref="multipleTable"
                            :data="tableData1"
                            width="100%">

                            <el-table-column
                                type="index"
                                label="序号">
                            </el-table-column>
                            <el-table-column
                                prop="personName"
                                label="姓名">
                            </el-table-column>
                            <!-- <el-table-column
                                prop="sexName"
                                label="性别">
                            </el-table-column>
                            <el-table-column
                                prop="cardNumber"
                                label="代表证号">
                            </el-table-column>
                              <el-table-column
                                prop="address"
                                label="通讯地址">
                            </el-table-column>

                             <el-table-column
                                prop="fixedPhone"
                                label="座机号码">
                            </el-table-column>
                             <el-table-column
                                prop="mobilePhone"
                                label="手机号码">
                            </el-table-column> -->
                             <el-table-column
                                label="团(界)别">
                             <template slot-scope="scope">
                                   <div>
                                      <span v-if="scope.row.groupType!=null && scope.row.circlesType!=null">{{scope.row.groupType}}</span>
                                      <span v-else-if="scope.row.groupType!=null">{{scope.row.groupType}}</span>
                                      <span v-else-if="scope.row.circlesType!=null">{{scope.row.circlesType}}</span>
                                    </div>
                                </template>
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
                                prop="identity"
                                label="身份">
                            </el-table-column>

                               <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text"  :disabled="editshow"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="adddel(scope.row,'1')"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                           
                            </el-col>
                      <el-col :span="8" v-if="!tashow">
                        <span class="yy-input-text">联名人数</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd.jointNumber"  class="yy-input-input" :disabled="true"></el-input>
                      </el-col>
                    </el-row>
                    </div>
                </div>
                <!-- 内部承办信息 -->
                <div class="ptitle mb-20 mt-20">内部承办信息</div>
                <div class="pborder">
                    <el-row class="ah-40" v-if="!editshow">
                       <el-col :span="8">
                        <span class="yy-input-text">承办单位</span>
                        <el-select v-model="pdnb.underTakeOrgId" @change="getCBBM(pdnb.underTakeOrgId,0);getName(pdnb.underTakeOrgId,3)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in cbdwdata"
                           :key="ind"
                           :label="item.mc"
                           :value="item.orgid">
                           </el-option>
                        </el-select>
                      </el-col>
                        <el-col :span="8">
                        <span class="yy-input-text">承办司局</span>
                        <el-select v-model="pdnb.underTakeSubOrgId" @change="getName(pdnb.underTakeSubOrgId,4)"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in cbsjdata"
                           :key="ind"
                           :label="item.mc"
                           :value="item.orgid">
                           </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-button type="success" plain size="small" @click="addList(2)">加入列表</el-button>
                      </el-col>
                    </el-row>
                     <el-row class="ah-50">
                        <el-col :span="24">
                             <el-table
                            ref="multipleTable"
                            :data="tableData2"
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
                                prop="underTakeOrgIdName"
                                label="承办单位">
                            </el-table-column>
                            <el-table-column
                                prop="underTakeSubOrgIdName"
                                label="内部承办司局">
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text" :disabled="editshow"   class="a-btn"  title="删除"  icon="el-icon-delete" @click="adddel(scope.row,'2')"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                           
                            </el-col>
                          <el-col :span="8">
                        <span class="yy-input-text"><font class="red">*</font> 答复类型</span>
                        <el-select v-model="pd.replyType" :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.dflx"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                      </el-col>
                       <el-col :span="8">
                        <span class="yy-input-text" title="是否重点办理" style="min-width:120px;"><font class="red">*</font> 是否重点办理</span>
                        <el-select v-model="pd.isImportant" :disabled="editshow"   filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:50%!important;">
                          <el-option
                           v-for="(item,ind) in $store.state.zdqf"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                      </el-col>
                       <el-col :span="8" v-if="pd.isImportant=='0213000001'">
                        <span class="yy-input-text" title="重点业务分类" style="min-width:120px;"><font class="red">*</font> 重点业务分类</span>
                        <el-select v-model="pd.importantBusinessType" :disabled="editshow"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:50%!important;">
                          <el-option
                           v-for="(item,ind) in $store.state.zdywfl"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                     <el-row class="ah-40">
                         <el-col :span="24">
                           <span class="yy-input-text" style="width:9%!important"><font class="red">*</font> 原文上传</span>
                           <el-button type="primary" v-if="!editshow" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('0203000001')">上传文件</el-button> <span class="ts"></span>
                         </el-col>
                          <el-col :span="24" class="mb-20" v-if="filedata0 && filedata0.length>0" >
                           <el-table
                            :data="filedata0">
                            <el-table-column
                                type="index"
                                label="序号" width="80">
                            </el-table-column>
                             <el-table-column
                                prop="filename"
                                label="文件名称">
                            </el-table-column>
                            <el-table-column
                                prop="filesuffix"
                                label="文件类型">
                            </el-table-column>
                            <!-- <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column> -->
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                      <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                    <el-button type="text" :disabled="editshow"   class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata0)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                        </el-col>
                        <el-col :span="24" class="mt-10">
                            <span class="yy-input-text" style="width:9%!important;vertical-align: top;" >备注</span>
                             <el-input placeholder="请输入内容" :disabled="editshow" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd.remark"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                         </el-col>

                      </el-row>
                </div>
                <!-- 活动建议 -->
                <!-- <div class="ptitle mb-20 mt-20"  v-if="zt=='99'">活动建议</div>
                <div class="pborder" v-if="zt=='9'">
                      <el-row class="ah-50">

                        <el-col :span="24" class="input-item">
                            <span class="yy-input-text" style="width:9%">活动建议</span>
                            <div class="yy-input-input" style="width:87%!important;">
                             <el-table
                            ref="multipleTable"
                            :data="tableData"
                            width="100%">

                            <el-table-column
                                type="index"
                                label="序号">
                            </el-table-column>
                             <el-table-column
                                prop="mc"
                                label="代表反应情况">
                            </el-table-column>
                           </el-table>
                           </div>
                      </el-col>
                    </el-row>
                </div> -->

               
                  <!-- 交办信息 -->
                 <div class="ptitle mb-20 mt-20" v-if="zt=='jb' || yastate1">交办信息</div>
                 <div class="pborder" v-if="zt=='jb' || yastate1">
                    <el-row class="ah-40" v-if="!yastate && !yastate1">
                          <el-col :span="8">
                         <span class="yy-input-text">承办单位</span>
                         <el-select v-model="pdjb.assignOrgId" @change="getCBBM1(pdjb.assignOrgId,1);getName(pdjb.assignOrgId,5)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbdwdata"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                              </el-option>
                        </el-select>

                       </el-col>
                         <el-col :span="8">
                         <span class="yy-input-text">承办部门</span>
                         <el-select v-model="pdjb.assignSubOrgId"  @change="getCBR(pdjb.assignOrgId,pdjb.assignSubOrgId,1),getName(pdjb.assignSubOrgId,6)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbbmdata1"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                              </el-option>
                        </el-select>

                       </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">承办人</span>
                         <el-select v-model="pdjb.assignUserId" :disabled="yastate" @change="getName(pdjb.assignUserId,7)"   filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbrdata1"
                                :key="ind"
                                :label="item.fullName"
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
                            <el-button type="success" plain size="small" @click="addList(3)">加入列表</el-button>

                         </el-col>

                    </el-row>
                    <el-row class="ah-50">

                        <el-col :span="24">
                            
                             <el-table
                            ref="multipleTable"
                            :data="jbtableData"
                            width="100%">

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
                                    <el-button type="text" :disabled="yastate || yastate1"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="adddel(scope.row,'3')"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                     
                            </el-col>

                    </el-row>
                 </div>
                   <!-- 办理信息 -->
                 <div class="ptitle mb-20 mt-20" v-if="zt=='bl' || yastate2 ">办理信息</div>
                 <div class="pborder" v-if="zt=='bl' || yastate2">
                    <el-row class="ah-40">
                          <el-col :span="8">
                         <span class="yy-input-text">承办部门</span>
                         <el-select v-model="pdbl.underTakingSubOrgId" :disabled="yastate || yastate2" @change="getCBR($store.state.orgid,pdbl.underTakingSubOrgId,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
                         <el-select v-model="pdbl.underTakingUserId" :disabled="yastate || yastate2 " filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbrdata"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.pbId">
                              </el-option>
                        </el-select>

                       </el-col>
                         <el-col :span="8">
                          <span class="yy-input-text">承办时间</span>
                                <el-date-picker :disabled="yastate || yastate2"
                                    v-model="pdbl.underTakingTime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                         </el-col>

                        <el-col :span="24">
                        <span class="yy-input-text" style="width:9%!important;vertical-align: top;" >办理内容</span>
                        <el-input placeholder="请输入内容" :disabled="yastate || yastate2" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pdbl.underTakingContent"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                     </el-col>
                       <el-col :span="24">
                          <span class="yy-input-text" style="width:9%!important">文件上传</span>
                          <el-button type="primary" v-if="!yastate && !yastate2" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('0203000002')">上传文件</el-button> <span class="ts"></span>
                         </el-col>
                          <el-col :span="24" class="mb-20" v-if="filedata1 && filedata1.length>0">
                           <el-table
                            :data="filedata1">
                            <el-table-column
                                type="index"
                                label="序号" width="80">
                            </el-table-column>
                             <el-table-column
                                prop="filename"
                                label="文件名称">
                            </el-table-column>
                            <el-table-column
                                prop="filesuffix"
                                label="文件类型">
                            </el-table-column>
                            <!-- <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column> -->
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                      <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                    <el-button type="text"  class="a-btn"  :disabled="yastate || yastate2" title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata1)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                        </el-col>
                    </el-row>
                 </div>
                  <!-- 统稿信息 -->
                 <div class="ptitle mb-20 mt-20" v-if="zt=='tg' || yastate3">统稿信息</div>
                 <div class="pborder" v-if="zt=='tg' || yastate3">
                    <el-row class="ah-40">
                          <el-col :span="8">
                         <span class="yy-input-text">统稿部门</span>
                         <el-select v-model="pdtg.underTakingSubOrgId" :disabled="yastate || yastate3" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbbmdata"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                              </el-option>
                        </el-select>

                       </el-col>
                         <el-col :span="8">
                         <span class="yy-input-text">统稿形式</span>
                         <el-select v-model="pdtg.draftMergerType" :disabled="yastate || yastate3" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.tgxs"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>

                       </el-col>
                         <el-col :span="8">
                          <span class="yy-input-text">统稿时间</span>
                                <el-date-picker :disabled="yastate || yastate3"
                                    v-model="pdtg.underTakingTime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                         </el-col>
                        <el-col :span="24">
                              <span class="yy-input-text" style="width:9%!important">文件上传</span>
                               <el-button type="primary" v-if="!yastate && !yastate3" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('0203000003')">上传文件</el-button> <span class="ts"></span>
                         </el-col>
                          <el-col :span="24" class="mb-20" v-if="filedata2 && filedata2.length>0">
                           <el-table
                            :data="filedata2">
                            <el-table-column
                                type="index"
                                label="序号" width="80">
                            </el-table-column>
                             <el-table-column
                                prop="filename"
                                label="文件名称">
                            </el-table-column>
                            <el-table-column
                                prop="filesuffix"
                                label="文件类型">
                            </el-table-column>
                            <!-- <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column> -->
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                      <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                    <el-button type="text"  :disabled="yastate || yastate3" class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata2)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                        </el-col>
                        <el-col :span="24">
                        <span class="yy-input-text" style="width:9%!important;vertical-align: top;" >统稿信息</span>
                        <el-input placeholder="请输入内容" :disabled="yastate || yastate3" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pdtg.underTakingContent"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                     </el-col>

                    </el-row>

                 </div>

                   <!-- 催办信息 -->
                 <div class="ptitle mb-20 mt-20" v-if="zt=='cb' || yastate5">催办信息</div>
                 <div class="pborder" v-if="zt=='cb' || yastate5">

                    <el-row class="ah-50">
                        <el-col :span="24">
                           
                             <el-table
                            ref="cbmultipleTable"
                            :data="cbtableData"
                            width="100%"
                            @row-click="cbclickRow"
                            @selection-change="cbChange"
                            >
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
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
                           </el-table>
                         
                            </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">催办形式</span>
                         <el-select v-model="pdcb.urgentType" :disabled="yastate" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.cbxs"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>
                       </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="24">
                        <span class="yy-input-text" style="width:9%!important;vertical-align: top;" >催办信息</span>
                        <el-input placeholder="请输入内容" :disabled="yastate" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pdcb.urgentContents"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                     </el-col>

                    </el-row>
                 </div>
                   <!-- 复文信息 -->
                 <div class="ptitle mb-20 mt-20" v-if="zt=='fw' || yastate4">复文信息</div>
                 <div class="pborder" v-if="zt=='fw' || yastate4">
                    <el-row class="ah-40">
                          <el-col :span="8">
                         <span class="yy-input-text">复文号</span>
                              <el-input placeholder="请输入内容" size="small" :disabled="yastate" clearable v-model="pdfw.fileNum"  class="yy-input-input" ></el-input>
                       </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">复文单位</span>
                         <el-select v-model="pdfw.underTakingOrgId"  :disabled="yastate" @change="getCBBM1(pdfw.underTakingOrgId,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbdwdata"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                              </el-option>
                        </el-select>

                       </el-col>
                         <el-col :span="8">
                         <span class="yy-input-text">复文部门</span>
                         <el-select v-model="pdfw.underTakingSubOrgId"  :disabled="yastate" @change="getCBR(pdfw.underTakingOrgId,pdfw.underTakingSubOrgId,2)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbbmdata1"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                              </el-option>
                        </el-select>

                       </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">复文人</span>
                         <el-select v-model="pdfw.underTakingUserId" :disabled="yastate" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbrdata2"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.pbId">
                              </el-option>
                        </el-select>

                       </el-col>
                         <el-col :span="8">
                          <span class="yy-input-text">复文时间</span>
                                <el-date-picker :disabled="yastate"
                                    v-model="pdfw.underTakingTime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                         </el-col>
                          <el-col :span="24">
                              <span class="yy-input-text" style="width:9%!important">文件上传</span>
                               <el-button type="primary" v-if="!yastate" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('0203000004')">上传文件</el-button> <span class="ts"></span>
                         </el-col>
                           <el-col :span="24" class="mb-20" v-if="filedata3 && filedata3.length>0">
                           <el-table
                            :data="filedata3">
                            <el-table-column
                                type="index"
                                label="序号" width="80">
                            </el-table-column>
                             <el-table-column
                                prop="filename"
                                label="文件名称">
                            </el-table-column>
                            <el-table-column
                                prop="filesuffix"
                                label="文件类型">
                            </el-table-column>
                            <!-- <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column> -->
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                      <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                    <el-button type="text"  class="a-btn" :disabled="yastate"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata3)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                        </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="24">
                        <span class="yy-input-text" style="width:9%!important;vertical-align: top;" >备注</span>
                        <el-input placeholder="请输入内容" :disabled="yastate" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pdfw.underTakingContent"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                     </el-col>
                    </el-row>
                 </div>

                  <!-- 开展活动 -->
                <div class="ptitle mb-20 mt-20" >开展活动</div>
                <div class="pborder">
                   <el-row class="ah-40" v-if="!yastate  && zt!='cb'">
                        <el-col :span="24">
                        <span class="yy-input-text"  style="width:9%;">活动类型</span>
                        <el-select v-model="pdhd.hdlx" @change="changehdlx(pdhd.hdlx,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:20%!important;" >
                         <el-option
                           v-for="(item,ind) in $store.state.hdlx"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                         <el-select v-model="pdhd.hdlxal"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:20%!important;" >
                         <el-option
                           v-for="(item,ind) in hdlxlist"
                           :key="ind"
                           :label="item.theme"
                           :value="item.activityInfoId">
                           </el-option>
                        </el-select>
                        <el-button type="success" plain size="small" @click="changehdlx(pdhd.hdlxal,1)">加入列表</el-button>
                        <!-- <el-button type="info" plain size="small" @click="addhd">录入活动</el-button> -->
                      </el-col>
                    </el-row>
                     <el-row class="ah-50">
                        <el-col :span="24">
                             <el-table
                            ref="multipleTable"
                            :data="tableData3"
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
                                prop="activityType"
                                label="活动类型">
                            </el-table-column>
                            <el-table-column
                                prop="theme"
                                label="活动主题">
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
                                label="活动地点">
                            </el-table-column>
                             <el-table-column
                                prop="participantsName"
                                label="参加人员">
                            </el-table-column>
                               <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text"  :disabled="yastate" class="a-btn"  title="删除"  icon="el-icon-delete" @click="adddel(scope.row,'4')"></el-button>
                                  </div>
                                </template>
                            </el-table-column>

                           </el-table>
                           
                        </el-col>

                    </el-row>
                </div>

           <div class="footer">
            <el-button type="primary"  style="width:130px;" @click="submit" v-if="zt!='9'">提  交</el-button>
            <el-button style="width:130px;" @click="goto">关 闭</el-button>
            </div>
            <br/>
         </div>
    <el-dialog title="上传文件" :visible.sync="uploadDialogVisible"  width="630px">
      <UPLOAD :url="uurl" :type="upt" :urlErr="uurlErr"  @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>
   <el-dialog title="选择类型" :visible.sync="addDialogVisible">
             <div style="text-align:center;height:50px;">
                <el-radio v-model="hdtype" label="1" border>结对活动录入</el-radio>
                <el-radio v-model="hdtype" label="2" border>专项视察录入</el-radio>
                <el-radio v-model="hdtype" label="3" border>专题调研录入</el-radio>
                <el-radio v-model="hdtype" label="4" border>旁听庭审录入</el-radio>
                <el-radio v-model="hdtype" label="5" border>见证执行录入</el-radio>
             </div>
            <div style="text-align:center">
                <el-radio v-model="hdtype" label="6" border>会议座谈录入</el-radio>
                <el-radio v-model="hdtype" label="7" border>日常走访录入</el-radio>
                <el-radio v-model="hdtype" label="8" border>新闻宣传录入</el-radio>
                <el-radio v-model="hdtype" label="9" border>日常接待录入</el-radio>
                <el-radio v-model="hdtype" label="10" border>其它活动录入</el-radio>
             </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" @click="goadd()">进行录入</el-button>
              <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
            </div>
       </el-dialog>
     </div>

</template>
<style>
  .subtable .el-dialog{width: 64%!important;}
</style>
<script>
import UPLOAD from "../../Common/upload"
import {ToArray} from '@/assets/js/ToArray.js'
export default {
  components:{UPLOAD},
  // name:'SuggestInfo',
  // props:['type','year','random'],
    data(){
        return{
             casename:'议案建议',
             pd:{jointNumber:0,proposalType:''},
             pd1:{},//单位列表
             pd2:{},//联名代表
             pdnb:{underTakeSubOrgId:''},//内部承办
             pdhd:{},//开展活动
             pdjb:{assignUserId:''},//交办信息
             pdtg:{},//统稿信息
             pdbl:{underTakingUserId:''},//办理信息
             pdfw:{underTakingUserId:''},//复文信息
             pdcb:{},//催办信息
             tableData:[],//单位列表
             tableData1:[],//联名代表
             tableData2:[],//内部承办
             tableData3:[],//开展活动
             jbtableData:[],//交办列表
             cbtableData:[],//催办列表
             hdlxlist:[],
             spshow:false,
             type:1,
             proposalInfoId:'',
             cbdwdata:[],
             cbdwdata1:[],//基本信息里的承办单位
             filedata0:[],
             filedata1:[],
             filedata2:[],
             filedata3:[],
             leaderInfo:{},//领衔代表实体
             zt:'',
             uurl:'/proposalAnnex/fileUpload',
             uurlErr:'',
             uploadDialogVisible:false,
             addDialogVisible:false,
             upt:'0203000001',
             cbbmdata:[],
             cbbmdata1:[],
             cbrdata:[],
             cbrdata1:[],
             cbrdata2:[],
             lxdbdata:[],
             hdtype:'1',
             year:'',
             pr:{},
             tashow:false,
             lcstate:'',//流程状态
             yastate1:false,//交办
             yastate2:false,//办理
             yastate3:false,//统稿
             yastate4:false,//复文
             yastate5:false,//催办
             yastate:false,//查看时流程的都不显示
             editshow:false,//编辑时录入的不显示
             djshow:false,//登记类型
             cbSelection:[],
             ywzllist:[],//业务种类
             lr:null,
             baseid:null,
             lpshow:false,
             label1:'领衔代表',
             label2:'联名代表',
             lableList:[],
             cbsjdata:[],//承办司局
             Remark:'',
             ctitle:'录入',

        }
    },
    watch:{
       $route:function(val){
        this.getinit(val);
        }
      },
    activated(){
      
    },
    mounted(){
       this.$store.dispatch("getLwqj");
       this.$store.dispatch("getTaywzl");
       this.$store.dispatch("getCblb");
       this.$store.dispatch("getCbxz");
       this.$store.dispatch("getJb");
       this.$store.dispatch("getCb");
       this.$store.dispatch("getTaxs");
       this.$store.dispatch("getDflx");
       this.$store.dispatch("getZdywfl");
       this.$store.dispatch("getHdlx");
       this.$store.dispatch("getTgxs");
       this.$store.dispatch("getXb");
       this.$store.dispatch("getYalx");
       this.$store.dispatch("getCbxs");
       this.$store.dispatch("getZdqf");
       this.$store.dispatch("getTazz");
       
       this.$store.dispatch("getYajyfl");
       this.getinit(this.$route);
    },
    methods:{
      getinit(val){
       this.type=val.query.type;
       this.baseid=val.query.baseid;
       this.ctitle=val.query.ctitle;
       this.zt=val.query.zt==null?'0':val.query.zt;
       this.year=val.query.year;
       this.proposalInfoId=val.query.proposalInfoId;
       this.lr=val.query.lr;
       this.reset();
       this.getCBDW();
       this.getCBDW1();
       this.getLmName();
       this.getCBBM(this.$store.state.orgid);
       
        if(this.type!=null){
       
            this.djshow=true;
        }
          if(this.zt=='9'){
              this.djshow=true;
              this.yastate=true;
          }else if(val.query.zt=='0'){
              this.djshow=false;
          }

             if(this.zt!='0' &&  this.zt!='1' && this.zt!=undefined){
                           this.editshow=true;
               }
            if(this.ctitle==null){
               if(this.zt=='9'){this.ctitle="查看"}
               else if(this.zt=='0'){this.ctitle="录入";
               }
               else if(this.zt!='0'){this.ctitle="修改"}
            }
           
       
            this.getZDYW();
            this.getList();
            if(this.zt=='bl'){
            
            this.$set(this.pdbl,'underTakingSubOrgId',this.$store.state.bmid);
            this.getCBR(this.$store.state.orgid,this.pdbl.underTakingSubOrgId,0,99);
            
              
            }
      },
      getZDYW(){
          this.label1='领衔代表';
          this.label2='联名代表';
         if(this.type==1){
                this.casename="代表议案";
                this.pd.proposalType="0204000001";
                this.getYWZL(this.Global.yaywzl);
            }else if(this.type==2){
                this.casename="政协提案";
                this.label1='提案人';
                this.label2='联系人';
                this.pd.proposalType="0204000002";
                this.getYWZL(this.Global.taywzl);
            }else if(this.type==3){
                this.casename="审议意见";
                this.pd.proposalType="0204000004";
                this.getYWZL(this.Global.syyjfl);
            }else if(this.type==4){
                this.casename="日常建议";
                this.label1='提出人员';
                this.label2='联名人员';
                this.pd.proposalType="0204000005";
                this.getYWZL(this.Global.scjyfl);
            }else if(this.type==0){
                this.casename="建议、批评和意见";
                this.pd.proposalType="0204000003";
                 this.getYWZL(this.Global.yajyfl);
            }
       },
      getdjlist(n){
        var tt="";
        switch (n) {
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
          break;
      }
        this.type=tt;
       
        this.$set(this.pd,'businessType','');
        this.getZDYW();
      //  this.$router.push({name:"SuggestInfo",query:{type:tt}});
      },
      reset(){
         this.pd={jointNumber:0,proposalType:''};
         this.pd1={};
         this.pd2={};
         this.pdnb={underTakeSubOrgId:''};
         this.pdhd={};
         this.pdjb={assignUserId:''};
         this.pdtg={};
         this.pr={};
         this.pdbl={underTakingUserId:''};
         this.pdfw={underTakingUserId:''};
         this.pdcb={};
         this.tableData=[];
         this.tableData1=[];
         this.tableData2=[];
         this.tableData3=[];
         this.jbtableData=[];
         this.cbtableData=[];
         this.hdlxlist=[];
         this.filedata0=[];
         this.filedata1=[];
         this.filedata2=[];
         this.filedata3=[];
         this.leaderInfo={};
         this.editshow=false;
         this.yastate=false;
         this.djshow=false;
         this.ywzllist=[];

         
      },
       cbclickRow(row){
           this.$refs.cbmultipleTable.toggleRowSelection(row)
        },
       cbChange(val){
          this.cbSelection = val;
        },
       getList(){
        if(this.proposalInfoId!=undefined && this.proposalInfoId!="" && this.proposalInfoId!=null){
            let p={
                  'proposalInfoId':this.proposalInfoId,
                  'token':this.$store.state.token,
            };
             this.$api.post(this.Global.aport2+'/proposalHome/proposalInfoView',p,
                r =>{
                      if(r.code==1){
            
                          this.pd=r.data.basicIinfo;
                          if(this.pd.leaderPersonId!=null){
                         
                          this.$set(this.pr,'leaderPersonId',this.pd.leaderPersonId);
                           console.log(this.pr.leaderPersonId,'leaderPersonId');
                             this.getName(this.pr.leaderPersonId,8);
                          }
                          if(this.pd.proposalOrgId!=null){
                          this.pr.proposalOrgId=this.pd.proposalOrgId;
                          }
                          if(this.pd.proposalForm!=null){
                          this.getTAXS(this.pd.proposalForm);
                          }
                          this.tableData=r.data.underTakeUnitInfo==null?[]:r.data.underTakeUnitInfo;
                          this.tableData1=r.data.jointPersonInfo==null?[]:r.data.jointPersonInfo;
                         
                          
                          this.tableData2=r.data.innerUnderTakeUnitInfo==null?[]:r.data.innerUnderTakeUnitInfo;

                          this.filedata0=r.data.proposalFileInfo==null?[]:r.data.proposalFileInfo;

                          this.tableData3=r.data.activityInfo==null?[]:r.data.activityInfo;

                          if(r.data.processInfo.urgentVO!=null){ //催办

                           // this.cbtableData=r.data.processInfo.urgentVO.urgentUnitInfo;

                            this.pdcb=r.data.processInfo.urgentVO;
                            if(this.zt=='9'){
                             this.yastate5=true;
                            }

                          }
                          if(r.data.processInfo.assignVO!=null){ //交办
                              this.cbtableData=r.data.processInfo.assignVO.assignUnitInfo==null?[]:r.data.processInfo.assignVO.assignUnitInfo;
                              if(this.zt=='9'){
                                this.yastate1=true;
                                console.log('交办',this.yastate1);
                              }
                            }
                          
                         if(r.data.processInfo.assignVO.assignUnitInfo!=null){

                          this.jbtableData=r.data.processInfo.assignVO.assignUnitInfo;
                       
                          
                         }
                         if(r.data.processInfo.overallVO!=null){//统稿
                           this.pdtg=r.data.processInfo.overallVO;
                           this.filedata2=r.data.processInfo.overallVO.proposalFileInfo==null?[]:r.data.processInfo.overallVO.proposalFileInfo;
                             if(this.zt=='9'){
                                this.yastate3=true;
                              }
                         }
                           if(r.data.processInfo.handVO!=null){ //办理
                             this.pdbl=r.data.processInfo.handVO;
                            
                             if(this.pdbl.underTakingSubOrgId!=null){
                                var orgid=this.$store.state.orgid;
                                this.getCBR(orgid,this.pdbl.underTakingSubOrgId,0,0);
                             }
                             this.filedata1=r.data.processInfo.handVO.proposalFileInfo==null?[]:r.data.processInfo.handVO.proposalFileInfo;
                             if(this.zt=='9'){
                              this.yastate2=true;
                              }
                           }

                          if(r.data.processInfo.replyVO!=null){//复文
                          this.pdfw=r.data.processInfo.replyVO;
                          if(this.pdfw.underTakingOrgId!=null){
                          this.getCBBM1(this.pdfw.underTakingOrgId);
                          }
                          if(this.pdfw.underTakingSubOrgId!=null){
                          this.getCBR(this.pdfw.underTakingOrgId,this.pdfw.underTakingSubOrgId,2,0);
                          }
                          this.filedata3=r.data.processInfo.replyVO.proposalFileInfo==null?[]:r.data.processInfo.replyVO.proposalFileInfo;
                            if(this.zt=='9'){
                              this.yastate4=true;
                              }
                          }

                         if(this.zt!='0' &&  this.zt!='1' && this.zt!=undefined){
                           this.editshow=true;
                         }
                       
                         if(this.zt!='9'){
                          this.lcstate=r.data.processInfo.handStatus;//流程状态
                          console.log('this.lcstate',this.lcstate);
                           
                          switch (this.lcstate) {
                            case '0205000002'://补充厅室信息
                              this.yastate1=false;
                              this.yastate2=false;
                              this.yastate3=false;
                              this.yastate4=false;
                              break;
                            case '0205000003'://交办
                              this.yastate1=false;
                              this.yastate2=false;
                              this.yastate3=false;
                              this.yastate4=false;
                              break;
                            case '0205000004'://办理
                              this.yastate1=false;
                              this.yastate2=true;
                              this.yastate3=false;
                              this.yastate4=false;
                              break;
                            case '0205000005'://统稿
                             if(this.zt=='cb'){
                               this.yastate1=true;
                             }else{
                              this.yastate1=false;
                              this.yastate2=false;
                              this.yastate3=true;
                              this.yastate4=true;
                              }
                              break;
                            case '0205000006'://复文
                              this.yastate1=false;
                              this.yastate2=false;
                              this.yastate3=true;
                              this.yastate4=true;
                              break;
                            
                            default:
                              this.yastate1=false;
                              this.yastate2=false;
                              this.yastate3=false;
                              this.yastate4=false;
                              this.yastate5=false;
                              break;
                         
                           }
                        }
                     
                      }

                });
        }
      },
      getTAXS(n){
        //党派、界别、小组 = 组织
        if(n=="0186000001" || n=="0186000006" || n=="0186000007"){
          this.tashow=true;
          this.label2="联系人";

        }else{
          this.tashow=false;
           this.label2="联名人";
        }
      },
       fatherMethod(data,t){


   
         if(t=='0203000001')
         {
           if(this.filedata0 && this.filedata0.length>0){

             for (let i = 0; i < data.length; i++) {
               this.filedata0.push(data[i]);

             }
           }else{
              this.filedata0=[];
              this.filedata0=data;
           }
         }
          if(t=='0203000002')
         {
           if(this.filedata1 && this.filedata1.length>0){
             
             for (let i = 0; i < data.length; i++) {
               this.filedata1.push(data[i]);

             }
           }else{
              this.filedata1=[];
              this.filedata1=data;
           }
         }
         else if(t=='0203000003')
         {
          
           if(this.filedata2 && this.filedata2.length>0){
              
             for (let i = 0; i < data.length; i++) {
                
               this.filedata2.push(data[i]);
             }
           }else{
              this.filedata2=[];
              this.filedata2=data;
           }
         }
         else if(t=='0203000004')
         {
           if(this.filedata3 && this.filedata3.length>0){
             console.log(data);
             for (let i = 0; i < data.length; i++) {
               this.filedata3.push(data[i]);

             }
           }else{
             this.filedata3=[];
             this.filedata3=data;
           }
         }
        this.uploadDialogVisible = false;
            },
       getUpload(t){
              this.upt=t;
              this.uploadDialogVisible=true;
        },
        //删除文件
        del(n,filedata){
            let p={
                  'fileID':n.proposalrelfileid,
                  'token':this.$store.state.token,
            };
             this.$api.post(this.Global.aport2+'/proposalAnnex/deleteServerFile',p,
                r =>{
                  if(r.code==1){
                      var arr=[];
                      arr.push(n);
                      for (let i = 0; i < arr.length; i++) {
                      var index = filedata.findIndex(item =>{
  　　　　　　　　　  　 if(item.proposalrelfileid==arr[i].proposalrelfileid){
          　　　　　　　　　　　　return true
          　　　　　　　　　　}
          　　　　　　　　})
          　　　　　　　 filedata.splice(index,1)
                      }
                    }else{
                      this.$message.error(r.message);
                    }
                });
        },
            //开展活动
         changehdlx(t,id){
        if(id==0){
          

          this.$set(this.pdhd,'hdlxal',"");
          this.hdlxlist=[];
                let p={
                  'activityType':t,

                };
                  this.$api.post(this.Global.aport3+'/ActivityInfoController/getCaseRelActivityInfo',p,
                  r =>{
                    if(r.code==1){
                      this.hdlxlist=r.data;
                      }else{
                        this.$message.error(r.message);
                      }

                  });
            }else{
              
              if(this.pdhd.hdlx==undefined || this.pdhd.hdlx=="")
              {
                this.$message.error("活动类型不能为空！");return;
              }
              if(this.pdhd.hdlxal==undefined || this.pdhd.hdlxal=="")
              {
                this.$message.error("活动内容不能为空！");return;
              }
               let p={
                  'activityInfoId':t,

                };
                  this.$api.post(this.Global.aport3+'/ActivityInfoController/getActivityInfoById',p,
                  r =>{

                     if(r.code==1){
                      this.tableData3.push(r.data[0]);
                      const res = new Map();
                      var arr=this.tableData3;
                      this.tableData3=arr.filter((arr) => !res.has(arr.activityInfoId) && res.set(arr.activityInfoId, 1));
                      this.pdhd={};
                     }else{
                       this.$message.error(r.message);
                     }
                  });
            }
        },
         goadd(){
            this.addDialogVisible=false;
            if(this.hdtype==1){
            this.$router.push({name:'PairAdd',query:{type:this.hdtype,}});
            }else{
            this.$router.push({name:'SpecialAdd',query:{type:this.hdtype}});
            }
        },
           //领衔代表详情
        getinfo(id){
            let  p={
               'personType':this.Global.REPRESENTATIVE,
               'pbId':id,
               'personId':this.psid,
            };
              this.$api.post(this.Global.aport1+'/baseinfo/detail',p,
             r =>{
                 if(r.code==1){
                      return r.data;
              }
            });
        },
      //承办单位  如果没有下级部门，那么该处就是承办部门
      getCBDW1(){
        // let p={
        //           'orgId':this.$store.state.orgid,

        //         };
        //           this.$api.get(this.Global.aport1+'/org/getUndertakeOrg',p,
        //           r =>{

        //              if(r.code==1){
        //                    this.cbdwdata=r.data;
        //              }
        //           });

         let p={
                'mc':'',
            };
          this.$api.post(this.Global.aport1+'/org/getOtherOrg',p,
                r =>{
                    if(r.code==1){
                        this.cbdwdata1=r.data;
                    }
           });

      },
         //除了基本信息里的承办单位
         getCBDW(){
          let p={
             'orgId':this.$store.state.orgid,
           };
          this.$api.get(this.Global.aport1+'/org/getUndertakeOrg',p,
              r =>{
                 if(r.code==1){
                   this.cbdwdata=r.data;
      
                 }
          });

        

      },
        //承办部门
      getCBBM(orgid,m){
        if(orgid=='' || orgid==null){
            this.pdnb.underTakeSubOrgId='';
            this.cbbmdata=[];
          return;
        }
        let p={
                  'orgId':orgid,

                };
                  this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                  r =>{

                     if(r.code==1){
                           this.pdnb.underTakeSubOrgId='';
                           if(m==0){
                            this.cbsjdata=r.data;
                           }else{
                           this.cbbmdata=r.data;
                           }
                     }
                  });

      },
           //承办部门
      getCBBM1(orgid,t){
        if(t==0){
          this.$set(this.pdfw,'underTakingSubOrgId',"");
          this.$set(this.pdfw,'underTakingUserId',"");
          this.cbrdata2=[]
        }else if(t==1){
          this.$set(this.pdjb,'assignSubOrgId',"");
          this.$set(this.pdjb,'assignUserId',"");
          this.cbrdata1=[]
        }
        this.cbbmdata1=[];
       
        if(orgid=='' || orgid==null){
          return;
        }
        let p={
                  'orgId':orgid,

                };
                  this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                  r =>{

                     if(r.code==1){
                           this.cbbmdata1=r.data;
                     }
                  });

      },

        //承办人
      getCBR(orgid,subid,t,m){
          if(t==0){
            this.cbrdata=[];
          }else if(t==1){
            this.cbrdata1=[];

          }else if(t==2){
            this.cbrdata2=[];
          }
          if(orgid=='' || orgid==null || subid=='' || subid==null){
            return;
          }
        
          let p={
                  'orgId':orgid,
                  'subOrgId':subid
                };
                  this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
                  r =>{

                     if(r.code==1){

                          if(t==0){//办理信息
                            if(m!=0){
                              this.pdbl.underTakingUserId='';
                             }
                            if(m==99){
                            this.$set(this.pdbl,'underTakingUserId',this.$store.state.pbid);
                            }
                            this.cbrdata=r.data;
                            
                           }else if(t==1){//交办信息
                                if(m!=0){
                              this.pdjb.assignUserId='';
                                }
                              this.cbrdata1=r.data;
                           }
                            else if(t==2){//复文信息
                              if(m!=0){
                              this.pdfw.underTakingUserId='';
                              }
                              this.cbrdata2=r.data;
                           }

                     }
                  });

      },
      downData(n){
          // window.location.href=n.serverpath;
          var alink = document.createElement("a");
          alink.href = n.filepath
          alink.setAttribute('download',n.filename)
          document.body.appendChild(alink)
          alink.click()
        },
       addhd(){
          this.addDialogVisible=true;
        },
      changesp(){

          if(this.spshow==false){
                this.spshow=true;
          }else{
                this.spshow=false;
          }

      },
      addList(t){
       if(t==0){ //单位列表

          if(this.pd1.affiliationUnit=="" || this.pd1.affiliationUnit==undefined){
            this.$message.error("承办单位不能为空！");return;
          }
          if(this.pd1.underTakeType=="" || this.pd1.underTakeType==undefined){
            this.$message.error("承办类别不能为空！");return;
          }
         
          this.tableData.push(this.pd1);
          const res = new Map();
          var arr=this.tableData;
          this.tableData=arr.filter((arr) => !res.has(arr.affiliationUnit) && res.set(arr.affiliationUnit, 1) )
          
          this.pd1={};
        }else if(t==1){ //联名列表
             if(this.pd2.lxdd==undefined || this.pd2.lxdd==""){
              
               this.$message.error(this.label2+"不能为空！");return;
             }
        //  let p={
        //      'personId':this.pd2.lxdd
        //    };
        //    this.$api.post(this.Global.aport1+'/baseinfo/personlist',p,
        //      r =>{

        //        if(r.code==1){
        //           console.log('this.tableData1',r.data[0].personId,this.pr.leaderPersonId);
                  
        //           if(this.tableData1.length>0){
        //             var array=this.tableData1;
        //              for (let i = 0; i < array.length; i++) {
        //                 if(r.data[0].personId==array[i].personId){
        //                   //  this.$message.error('不能重复添加！');
        //                    return;
        //                 }
        
        //                 if(this.pr.leaderPersonId==r.data[0].personId){
        //                    this.$message.error(r.data[0].fullName+"已选择成为"+this.label1+"，不能添加成为"+this.label2);return;
        //                 }
                       
        //              }
        //           }else{
        //                 if(this.pr.leaderPersonId==r.data[0].personId){
        //                    this.$message.error(r.data[0].fullName+"已选择成为"+this.label1+"，不能添加成为"+this.label2);return;
        //                 }
        //           }
        //             this.tableData1.push(r.data[0]);
        //             this.pd.jointNumber++
        //           }

        //    });

          var arr=this.pd2.lxdd.split('|');
          
           var obj = {};
                 obj = this.lxdbdata.find(item =>{
                     return item.pbId === arr[0] && item.personId === arr[1]
                });
              if(this.pr.leaderPersonId==arr[1]){
                  this.pd2={};
                  this.$message.error(obj.fullName+"已选择成为"+this.label1+"，不能添加成为"+this.label2);return;
              }
            var srr=this.tableData1;
           var ff=false;
            for (let i = 0; i < srr.length; i++) {
               
               if(srr[i].pbId==arr[0])
               {
                 var ff=true;
                this.$confirm(srr[i].personName+'已经存在，是否切换?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.adddel(srr[i],'1');
                  this.tableData1.push(obj);
                  this.pd.jointNumber=this.tableData1.length;
                }).catch(() => {
                     this.$message({
                         type: 'info',
                         message: '已取消操作'
                      });          
                 }); 
               }
             }
            if(!ff){
            this.tableData1.push(obj);
            this.pd.jointNumber=this.tableData1.length;
            }
            this.pd2={};

        }else if(t==2){//承办列表
        if(this.pdnb.underTakeOrgId=="" || this.pdnb.underTakeOrgId==undefined){
            this.$message.error("承办单位不能为空！");return;
          }
          if(this.pdnb.underTakeSubOrgId=="" || this.pdnb.underTakeSubOrgId==undefined){
            this.$message.error("承办司局不能为空！");return;
          }
           this.tableData2.push(this.pdnb);
           const res = new Map();
           var arr=this.tableData2;
           this.tableData2=arr.filter((arr) => !res.has(arr.underTakeSubOrgId) && res.set(arr.underTakeSubOrgId, 1) )
          
            this.pdnb={underTakeSubOrgId:''};
        }
        else if(t==3){//交办列表
           if(this.pdjb.assignOrgId=="" || this.pdjb.assignOrgId==undefined){
            this.$message.error("承办单位不能为空！");return;
          }
            if(this.pdjb.assignSubOrgId=="" || this.pdjb.assignSubOrgId==undefined){
            this.$message.error("承办部门不能为空！");return;
          }
            if(this.pdjb.assignUserId=="" || this.pdjb.assignUserId==undefined){
            this.$message.error("承办人不能为空！");return;
          }
           if(this.pdjb.assignTime=="" || this.pdjb.assignTime==undefined){
            this.$message.error("应办结时间不能为空！");return;
          }
           this.jbtableData.push(this.pdjb);
           const res = new Map();
           var arr=this.jbtableData;
           this.jbtableData=arr.filter((arr) => !res.has(arr.assignUserId) && res.set(arr.assignUserId, 1) )
          
          this.pdjb={assignUserId:''};
        }
      },
      adddel(n,m){
         
            switch (m) {
               case '0':
                var arr=[];
                 arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                     var index = this.tableData.findIndex(item =>{
　　　　　　　　　  　 if(item.affiliationUnitName==arr[i].affiliationUnitName && item.underTakeTypeName==arr[i].underTakeTypeName){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
                   this.tableData.splice(index,1)
                  }
                break;
              case '1':
                
                var arr=[];
                 arr.push(n);
                     var index = this.tableData1.findIndex(item =>{
　　　　　　　　　  　 if(item.personId==arr[0].personId){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
                  this.tableData1.splice(index,1);
                  this.pd.jointNumber=this.tableData1.length;
                break;
                case '2':
                this.pd.jointNumber--;
                var arr=[];
                 arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                     var index = this.tableData2.findIndex(item =>{
　　　　　　　　　  　 if(item.underTakeOrgIdName==arr[i].underTakeOrgIdName){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
               this.tableData2.splice(index,1)
                  }
                break;
                  case '3':
                this.pd.jointNumber--;
                var arr=[];
                 arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                     var index = this.jbtableData.findIndex(item =>{
　　　　　　　　　  　 if(item.assignOrgIdName==arr[i].assignOrgIdName){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
                this.jbtableData.splice(index,1)
                  }
                break;
                  case '4':
                this.pd.jointNumber--;
                var arr=[];
                 arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                     var index = this.tableData3.findIndex(item =>{
　　　　　　　　　  　 if(item.activityType==arr[i].activityType){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
                this.tableData3.splice(index,1)
                  }
                break;
            
              default:
                break;
            }
              
      },
      //保存
      submit(){
        var url="";
        let p={};
        this.pd.proposalInfoId=this.proposalInfoId;
        this.pd.year=this.year;
           switch (this.zt) {
             case 'jb':
               url="/proposalAssign/saveAssignInfo";//交办
               p={
                 'proposalInfoId':this.proposalInfoId,
                 'token':this.$store.state.token,
                 'relActivityInfo':this.tableData3,
                 'assignList':this.jbtableData,
               };
               break;
              case 'bl':
               url="/proposalProcess/saveHandInfo";
               this.pdbl.underTakingOrgId=this.$store.state.orgid;
               this.pdbl.processType="0205000003";//办理 用的DIC_OSBU_ProposalProcessType字典表
                console.log(this.pdbl);

               p={
                 'proposalInfoId':this.proposalInfoId,
                 'token':this.$store.state.token,
                 'relActivityInfo':this.tableData3,
                 'processCondition':this.pdbl,
                 'proposalFileInfo':this.filedata1,
               };
               break;
               case 'tg':
               url="/proposalProcess/saveOverallInfo";
               this.pdtg.underTakingOrgId=this.$store.state.orgid;
               this.pdtg.processType="0205000004";//统稿 用的DIC_OSBU_ProposalProcessType字典表
               p={
                 'proposalInfoId':this.proposalInfoId,
                 'token':this.$store.state.token,
                 'relActivityInfo':this.tableData3,
                 'processCondition':this.pdtg,
                 'proposalFileInfo':this.filedata2,
               };
               break;
               case 'fw':
               url="/proposalProcess/saveReplyInfo";
              // this.pdfw.underTakingOrgId=this.$store.state.orgid;
                this.pdfw.processType="0205000005";//复文 用的DIC_OSBU_ProposalProcessType字典表
               p={
                 'proposalInfoId':this.proposalInfoId,
                 'token':this.$store.state.token,
                 'relActivityInfo':this.tableData3,
                 'processCondition':this.pdfw,
                 'proposalFileInfo':this.filedata3,
               };
               break;
                case 'cb':
                url="/proposalProcess/saveUrgentInfo";
                if(this.cbSelection.length>0){
                    this.pdcb.urgentedId=this.cbSelection;
                }
                this.pdcb.processType="0205000006";//催办 用的DIC_OSBU_ProposalProcessType字典表
               p={
                 'proposalInfoId':this.proposalInfoId,
                 'token':this.$store.state.token,
                 'relActivityInfo':this.tableData3,
                 'assignInfo':this.pdcb,

               };
               break;
               default:
            if(this.pd.proposalType==undefined || this.pd.proposalType=="")
              {
                  this.$message.error("议案类型不能为空！");return;
              }
            if(this.pd.title==undefined || this.pd.title=="")
              {
                  this.$message.error("标题不能为空！");return;
              }
            if(this.pd.number==undefined || this.pd.number=="")
              {
                  this.$message.error("编号不能为空！");return;
              }
            if(this.pd.businessType==undefined || this.pd.businessType=="")
              {
                  this.$message.error("业务种类不能为空！");return;
              }
              if(this.tableData.length==0){
                 this.$message.error("单位列表不能为空！");return;
              }
               if(this.pd.period==undefined || this.pd.period=="")
              {
                  this.$message.error("来文期间不能为空！");return;
              }

               if(this.pd.session==undefined || this.pd.session=="")
              {
                  this.$message.error("届不能为空！");return;
              }
              if(this.pd.times==undefined || this.pd.times=="")
              {
                  this.$message.error("次不能为空！");return;
              }
              if(this.pd.proposalForm=="0186000001" || this.pd.proposalForm=="0186000006" || this.pd.proposalForm=="0186000007"){
               
                if(this.pr.proposalOrgId==undefined || this.pr.proposalOrgId=="")
                 {this.$message.error("提案组织不能为空！");return;}

              }else
              {
               if(this.pr.leaderPersonId==undefined || this.pr.leaderPersonId=="" )
              {
                  this.$message.error(this.label1+"不能为空！");return;
              }
              }
               if(this.tableData2.length==0){
                 this.$message.error("承办列表不能为空！");return;
              }
               if(this.pd.replyType==undefined || this.pd.replyType=="")
              {
                  this.$message.error("答复类型不能为空！");return;
              }
              if(this.pd.isImportant==undefined || this.pd.isImportant=="")
              {
                  this.$message.error("是否重点办理不能为空！");return;
              }else if(this.pd.isImportant=='0213000001'){
                   if(this.pd.importantBusinessType==undefined || this.pd.importantBusinessType=="")
                    {
                        this.$message.error("重点业务分类不能为空！");return;
                    }
              }
               if(this.filedata0.length==0){
                 this.$message.error("文件信息不能为空！");return;
              }

              url='/proposalInfo/register';

              this.pd.leaderPersonId=this.pr.leaderPersonId;

              if(this.tashow){
                p={
                 
                 'proposalBasic':this.pd,
                 'leaderInfo':{'proposalOrgId':this.pr.proposalOrgId},
                 'proposalUnderTakeUnits':this.tableData,
                 'proposalJointPersons':this.tableData1,
                 'proposalRelActivitys':this.tableData3,
                 'innerUnderTakeUnits':this.tableData2,
                 'proposalFileInfo':this.filedata0,
               };
              }else{
                p={
                  'proposalBasic':this.pd,
                  'leaderInfo':this.leaderInfo,
                  'proposalUnderTakeUnits':this.tableData,
                  'proposalJointPersons':this.tableData1,
                  'proposalRelActivitys':this.tableData3,
                  'innerUnderTakeUnits':this.tableData2,
                  'proposalFileInfo':this.filedata0,
                };
               }
                 break;
           };

          this.$api.post(this.Global.aport2+url,p,
                r =>{
                     if(r.code==1){
                            this.$message({
                            message: r.message,
                            type: 'success'
                          });
                          this.goto();
                     }else{
                       this.$message.error(r.message);
                     }
                });
      },
      getName(val,t){
         var obj = {};
        if(val=="" || val==null){return;}
        switch (t) {
          case 0:
             obj = this.cbdwdata1.find(item =>{
                 return item.orgid === val
                });
              this.pd1.affiliationUnitName = obj.mc
            break;
         case 1:
             obj = this.$store.state.cblb.find(item =>{
                 return item.dm === val
                });
              this.pd1.underTakeTypeName = obj.mc
            break;
            case 2:
             obj = this.$store.state.cbxz.find(item =>{
                 return item.dm === val
                });
              this.pd1.underTakeNatureName = obj.mc
            break;
            case 3:
             obj = this.cbdwdata.find(item =>{
                 return item.orgid === val
                });
              this.pdnb.underTakeOrgIdName = obj.mc
            break;
            case 4:
             obj = this.cbsjdata.find(item =>{
                 return item.orgid === val
                });
              this.pdnb.underTakeSubOrgIdName = obj.mc
            break;
            case 5:
             obj = this.cbdwdata.find(item =>{
                 return item.orgid === val
                });
              this.pdjb.assignOrgIdName = obj.mc
            break;
             case 6:
             obj = this.cbbmdata1.find(item =>{
                 return item.orgid === val
                });
              this.pdjb.assignSubOrgIdName = obj.mc
            break;
            case 7:
              
             obj = this.cbrdata1.find(item =>{
                 return item.pbId === val
                });

              this.pdjb.assignUserIdName = obj.fullName
            break;
            case 8:
              if(this.zt!='9'){
              var array=this.tableData1;
             for (let j = 0; j < array.length; j++) {
               if(val==array[j].personId){
                      this.$message.error(array[j].fullName+"已经存在于"+this.label2+"中不能重复添加!");
                      this.$set(this.pr,'leaderPersonId',"");
                     return;
               }
              }
             }
           let p={
             'personId':val
           };
           this.$api.post(this.Global.aport1+'/baseinfo/personlist',p,
             r =>{

               if(r.code==1){
                 this.leaderInfo=r.data[0];
                 if(!this.tashow && this.type!=2 && this.type!=5)
                  {             
                   
                    
                    
                    this.lableList=this.leaderInfo.tags;
                    
                    if(this.leaderInfo.address!=null){
                            this.Remark="地址："+this.leaderInfo.address;
                          }else{
                            this.Remark="";
                    }
                  
                    } 
                    this.lpshow=true;
               }
             });

            break;
          default:
            break;
        }
      },
      //领衔代表，联系人
      getLmName(){
    
        
        let p={};var url="/baseinfo/allpersonlist";
        switch (this.type) {
          case '0'://领衔代表（联名代表）
          case '1':
          case '3':
            p={
             'personName':'',
             'personType':this.Global.REPRESENTATIVE,
            };
            url="/baseinfo/personlistbytype";
            break;
          case '2'://所有人员查询接口
          p={
             'personName':'',
             'personType':this.Global.CPPCMEMBER,
            };
            url="/baseinfo/personlistbytype";
            break;
          case '4':
            p={
             'leveType':'',
            };
           url="/baseinfo/personlist";
            break;

          default:
            break;
        }
         console.log('url',url,this.type);

           this.$api.post(this.Global.aport1+url,p,
             r =>{
                   
                   this.lxdbdata=r.data;
            });
        },
      goto(){
        if(this.lr==0){
            this.$router.go(-1);
        }else{
            if(this.baseid!=null){
                   var arr=this.baseid.split('|');
                     console.log('arr',arr);
                     this.$router.push({name:'BaseAdd',query:{type:arr[0],status:arr[1],pbid:arr[2],reid:arr[3]}});
                }else{
                    this.$router.push({name:"SuggestList",query:{type:this.type,year:this.year}});
                }
        }
      },
      getYWZL(url){
            this.$api.get(this.Global.aport4 + url, null,
            r => {
              this.ywzllist=ToArray(r.data);
          })
      }
    },

}
</script>
<style scoped>
.txtw{width: 10%!important;min-width: 80px;}
.inputw{width: 18%!important;}
</style>
