<template>
      <div class="pairadd ">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 
           办理工作 <span class="mlr_10">/</span>  <b>{{casename}}{{ctitle}}</b></span> </div>
         <div class="content subtable">
               <!-- 来文信息 -->
                <div class="ptitle mb-20">来文信息</div>
                <el-row class="ah-40">
                         <el-col :span="10">
                        <span class="yy-input-text" style="width:31%"><font class="red">*</font> 来文人姓名</span>
                        <el-select v-model="pd1.leaderpbid" remote :remote-method="xmremoteMethod" v-el-select-loadmore="xmloadmore" @focus="getfocus(1)"  placeholder="请输入关键字搜索" :disabled="editshow" @change="ChangeNameListNew(pd1.leaderpbid,0)" filterable clearable default-first-option  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in xmdata"
                           :key="ind"
                           :label="item.fullName"
                           :value="item.personId">
                           </el-option>
                        </el-select>
                      </el-col>
                        <el-col :span="14"  v-if='lpshow'>
                              <el-tag v-for="(value,key) in labellist" :key="key" style="margin-right:10px;">{{value}}</el-tag>
                              <span>{{labeladress}}</span>
                        </el-col>
                </el-row>
                 <el-row class="ah-40">
                    <el-col :span="10" class="input-item">
                        <span class="yy-input-text" style="width:32%"><font class="red">*</font> 届次</span>
                        <div  class="yy-input-input">
                        <el-select v-model="pd1.session" :disabled="editshow" filterable clearable default-first-option placeholder="请选择届"  size="small" style="width:49%">
                         <el-option
                           v-for="(item,ind) in $store.state.jb"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> 
                        <el-select v-model="pd1.times" :disabled="editshow" filterable clearable default-first-option placeholder="请选择次"  size="small" style="width:46%">
                         <el-option
                           v-for="(item,ind) in $store.state.cb"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                        </div>
                      </el-col>
                        <el-col :span="8">
                            <span class="yy-input-text" style="width:100px;"><font class="red">*</font> 反映次数</span>
                           <el-input placeholder="" :disabled="editshow" size="small" clearable v-model="pd1.reflectnum" maxlength="3" @blur="getFycs()"  class="yy-input-input" style="width:150px!important" ></el-input> 
                        </el-col>
                         <el-col :span="6">
                            <span class="yy-input-text" style="width:18%!important"><font class="red">*</font> 年份</span>
                         
                             <el-select v-model="year" :disabled="true" filterable clearable default-first-option placeholder="请选择"  size="small">
                                     <el-option
                                   v-for="(item,ind) in yearlist"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.dm">
                                 </el-option>
                              </el-select> 
                       
                        </el-col>
                 </el-row>
               
                <div class="pborder mt-10"  v-for="(v,i) in dataList" :key="i">
                     <el-row class="ah-40">
                      <el-col :span="8">
                           <span class="yy-input-text " style="width:35%"><font class="red">*</font> 来文字号</span>
                           <el-input placeholder="请输入内容" :disabled="editshow" size="small" maxlength="10" clearable v-model="dataList[i].letternumber"  class="yy-input-input" ></el-input>
                        <!-- <i class="el-icon-search cursor" @click="getlwzh()"></i> -->
                      </el-col>
                       <el-col :span="8">
                           <span class="yy-input-text" style="width:35%"><font class="red">*</font> 收文时间</span>
                           <el-date-picker class="yy-input-input"
                           v-model="dataList[i].receivingtime" :disabled="editshow" format="yyyy-MM-dd"
                           type="date" size="small" value-format="yyyy-MM-dd"
                           placeholder="开始时间" >
                        </el-date-picker>
                      </el-col>
                       <el-col :span="8">
                        <span class="yy-input-text" style="width:35%"><font class="red">*</font> 经办人</span>
                        <el-select v-model="dataList[i].undertakinguserid" :disabled="editshow"  @focus="getfocus(2)" remote :remote-method="jdrremoteMethod" v-el-select-loadmore="jbrloadmore"  placeholder="请输入关键字搜索" filterable clearable default-first-option  size="small" class="yy-input-input" >
                                        <el-option
                                          v-for="(item,ind) in jbrdata"
                                          :key="ind"
                                          :label="item.fullName"
                                          :value="item.pbId">
                                        </el-option>
                        </el-select>
                      </el-col>
                       <el-col :span="24">
                           <span class="yy-input-text" style="width:11.7%!important;vertical-align: top;" title="来文要求"><font class="red">*</font> 来文要求</span>
                             <el-input placeholder="请输入内容" :disabled="editshow" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="dataList[i].lettercontents"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                       </el-col>
                     </el-row>
                      <div class="ah-40 mt-20" style="color:#409EFF;border-bottom:1px solid #eeeeee"></div>
                      <el-row class="ah-40" v-if='!editshow'> 
                        <el-col :span="12">
                           <span class="yy-input-text txtc">来文时间</span>
                                <el-date-picker
                                    v-model="formList[i].lettertime"  format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                        </el-col>
                        <el-col :span="12">
                        <span class="yy-input-text txtc">来文期间</span>
                        <el-select v-model="formList[i].lettertimes"  @change="chChangelist(formList[i].lettertimes,i,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.lwqj"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
               </el-col>
              <el-col :span="12">
               <span class="yy-input-text txtc">来文来源类型</span>
              <el-select v-model="formList[i].lettersourcetype"  @change="getLWLY(formList[i].lettersourcetype);chChangelist(formList[i].lettersourcetype,i,1)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                      <el-option
                                v-for="(item,ind) in $store.state.lwlylb"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
               </el-select>
             </el-col>
              <el-col :span="12" v-if="lwshow">
               <span class="yy-input-text txtc"> 来源法院人员</span>
              <el-select v-model="formList[i].sourcecourtpersonpbid" remote :remote-method="fyrremoteMethod" v-el-select-loadmore="fyrloadmore" :placeholder="formList[i].lettersourcetype?'请输入关键字搜索':'请先选择来文来源类型'" @change="chChangelist(formList[i].sourcecourtpersonpbid,i,4)"  filterable clearable default-first-option size="small" class="yy-input-input" >
                    <el-option
                        v-for="(item,ind) in fyrdata"
                        :key="ind"
                        :label="item.fullName"
                        :value="item.pbId">
                    </el-option>
               </el-select>
             </el-col>
              <el-col :span="12" v-else>
               <span class="yy-input-text txtc">来源组织</span>
              <el-select v-model="formList[i].lettersourceorgid" remote :remote-method="lyzzremoteMethod" v-el-select-loadmore="lyzzloadmore"  :placeholder="formList[i].lettersourcetype?'请输入关键字搜索':'请先选择来文来源类型'"  @change="chChangelist(formList[i].lettersourceorgid,i,5)" filterable clearable default-first-option   size="small" class="yy-input-input" >
                   <el-option
                                v-for="(item,ind) in lyzzdata"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                      </el-option>
               </el-select>
               </el-col>
                <el-col :span="24">
                    <span class="yy-input-text" style="width:11.5%!important;vertical-align: top;" >领导批示</span>
                  <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="formList[i].leadershipinstruction"  class="yy-input-input" style="width:80%!important;"></el-input>     
                  <el-button type="success" size="small" plain  @click="addLWXX(formList[i],dataList[i].lwdata,i)">加入列表</el-button>
             </el-col>
 </el-row>
                         <el-table
                              :data="dataList[i].lwdata"
                              ref="multipleTable"
                              @selection-change="form1change">
                              <!-- <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column> -->
                              <el-table-column
                                  type="index"
                                  label="序号" width="80">
                              </el-table-column>
                              <el-table-column
                                  prop="lettertime"
                                  label="来文时间">
                              </el-table-column>
                               <el-table-column
                                  prop="lettertimesname"
                                  label="来文期间">
                              </el-table-column>
                               <!-- <el-table-column
                                  prop="lettersourcetypename"
                                  label="来文来源类型">
                              </el-table-column> -->
                               <el-table-column
                                  prop="sourcecourtpersonpbidname"
                                  label="来文来源">
                                <template slot-scope="scope">
                                  <div>
                                    <!-- <span v-if="scope.row.sourcecourtpersonpbidname==null">{{scope.row.lettersourceorgidname}}</span>
                                    <span v-else>{{scope.row.sourcecourtpersonpbidname}}</span> -->
                                    {{scope.row.sourcecourtpersonpbidname}}{{scope.row.lettersourceorgidname}}
                                  </div>
                                </template>
                              </el-table-column>
                               <el-table-column
                                  prop="leadershipinstruction"
                                  label="领导批示">
                              </el-table-column>
                               <el-table-column
                                  label="操作" v-if='!editshow'>
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="lwdel(scope.row,dataList[i].lwdata)"></el-button>
                                     </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                    <el-row class="ah-50">
                        <el-col :span="12">
                        <span class="yy-input-text" style="min-width:200px" title="联名代表、委员、特约人员">联名代表、委员、特约人员 </span>
                        <el-select v-model="formListN[i].lmdbid" v-if='!editshow' remote :remote-method="lmrremoteMethod" v-el-select-loadmore="lmrloadmore"  placeholder="请输入关键字搜索" filterable clearable default-first-option  size="small" class="yy-input-input" style="width:50%!important" >
                          <el-option
                           v-for="(item,ind) in lmrdata"
                           :key="ind"
                           :label="item.fullName"
                           :value="item.pbId+'|'+item.personId">
                           </el-option>
                        </el-select>
                         <el-button type="success" plain size="small" v-if='!editshow' @click="ChangeNameList2(i)">加入列表</el-button>
                        </el-col>
                       
                        <el-col :span="24">
                            <el-table
                            ref="multipleTable"
                            :data="dataList[i].lmdata">
                            <el-table-column
                                type="index"
                                label="序号">
                            </el-table-column>
                             <el-table-column
                                prop="personName"
                                label="姓名">
                            </el-table-column>
                            <!-- <el-table-column
                                prop="sex"
                                label="性别">
                            </el-table-column>
                            <el-table-column
                                prop="orgId"
                                label="单位">
                            </el-table-column>
                              <el-table-column
                                prop="job"
                                label="职务">
                            </el-table-column>
                             <el-table-column
                                prop="mobilePhone"
                                label="联系电话">
                            </el-table-column>
                             <el-table-column
                                prop="address"
                                label="通讯地址">
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
                                label="操作" v-if='!editshow'>
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text"  class="a-btn"  :disabled="editshow" title="删除"  icon="el-icon-delete" @click="delName(scope.row,dataList[i].lmdata,i)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>
                            </el-col>
                            <el-col :span="24">
                            <span class="yy-input-text" style="width:11%!important">联名人数</span>
                           <el-input placeholder="" size="small" :disabled="editshow" clearable v-model="dataList[i].jointpersoncount" @blur="getNum(i)"  class="yy-input-input inputw" ></el-input> 
                        </el-col>
                    </el-row>
                    <el-row class="ah-50 mt-10">
                        <el-col :span="12" v-if="addtype=='0'">
                        <span class="yy-input-text" style="width:22%!important"><font class="red">*</font> 来信内容附件</span>
                        <el-button type="primary" :disabled="editshow" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('0')">上传文件</el-button> <span class="ts"></span>
                        </el-col>
                      
                        <el-col :span="24" class="mb-20" v-if="dataList[i].filedata0 && dataList[i].filedata0.length>0">
                           <el-table
                            :data="dataList[i].filedata0">
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
                            <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column>
                             <el-table-column
                                label="操作" >
                                 <template slot-scope="scope">
                                   <div>
                                      <el-button type="text"   class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                    <el-button type="text" :disabled="editshow"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row,dataList[i].filedata0)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                        </el-col>
                       
                    </el-row>

                </div>
                 <!-- <div class="mt-10" style="text-align:right" v-if='!editshow'><el-button type="primary"  icon="el-icon-plus" plain size="small" @click="addform()">新增来文信息</el-button></div> -->
                 <!-- <div class="mt-10" style="text-align:right" v-if='!editshow && datanum!=0'><el-button type="danger"  icon="el-icon-minus" plain size="small" @click="delform()">删除来文信息</el-button></div> -->
                 
                <!-- 关注案件信息 -->
                <div class="ptitle mb-20 mt-20"  >关注案件信息</div>
                <div class="pborder" >
                     <el-row class="ah-40">
                      <el-col :span="8">
                           <span class="yy-input-text"><font class="red">&ensp;</font> 案件编号</span>
                           <el-input placeholder="请输入内容" size="small" :disabled="editshow" clearable v-model="pd1.casenum"  class="yy-input-input" ></el-input> 
                            <i class="el-icon-search" v-if='!editshow'></i>
                      </el-col>
                       <el-col :span="8">
                        <span class="yy-input-text"><font class="red">*</font> 案件类型</span>
                        <el-select v-model="pd1.caseclass" :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.ajlx"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> 
                        <i class="el-icon-plus cursor" v-if='!editshow' style="color:red" @click="getdic(Global.ajlx)"></i>
                      </el-col>
                      <el-col :span="8">
                        <span class="yy-input-text"><font class="red">*</font> 审理阶段</span>
                        <el-select v-model="pd1.adjudgementphase" :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.sljd"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                         <i class="el-icon-plus cursor" v-if='!editshow' style="color:red"></i>
                      </el-col>
                      <el-col :span="8">
                        <span class="yy-input-text"><font class="red">*</font> 案件状态</span>
                        <el-select v-model="pd1.casestatus" :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.ajzt"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                        <i class="el-icon-plus cursor" v-if='!editshow' style="color:red" @click="getdic(Global.ajzt)"></i>
                      </el-col>
                      <el-col :span="8">
                        <span class="yy-input-text"><font class="red">&ensp;</font> 利害关系</span>
                        <el-select v-model="pd1.interestrelations" :disabled="editshow" @change="getIslhgx(pd1.interestrelations)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.lhgx"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> 
                        <i class="el-icon-plus cursor" v-if='!editshow' style="color:red" @click="getdic(Global.lhgx)"></i>
                      </el-col>
                       <el-col :span="8">
                         <span class="yy-input-text"><font class="red">&ensp;</font> 是否有利害关系</span>
                     
                               <el-select v-model="pd1.isinterestrelations" :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                    <el-option value="1" label="是">
                                    </el-option>
                                    <el-option value="0" label="否">
                                  </el-option>
                           </el-select>
                        </el-col>
                     
                        <el-col :span="8">
                        <span class="yy-input-text"><font class="red">*</font> 是否重点案件</span>
                        <el-select v-model="pd1.emphasiscase" :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                          <el-option
                           v-for="(item,ind) in $store.state.zdaj"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> 
                      </el-col>
                        <el-col :span="8">
                        <span class="yy-input-text"><font class="red">*</font> 是否重复案件</span>
                         <el-select v-model="pd1.repeatcase" :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                          <el-option
                           v-for="(item,ind) in $store.state.cfaj"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> 
                      </el-col>
                     
                       <el-col :span="8">
                        <span class="yy-input-text"><font class="red">*</font> 问题针对法院</span>
                        <el-select v-model="pd1.focuscourt" @focus="getfocus(3)" remote :remote-method="fydwremoteMethod" v-el-select-loadmore="fyloadmore"  placeholder="请输入关键字搜索" :disabled="editshow"   @change="getFYJB(pd1.focuscourt,1)"  filterable clearable default-first-option  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in fydwdata"
                           :key="ind"
                           :label="item.mc"
                           :value="item.orgid">
                           </el-option>
                        </el-select> 
                     
                      </el-col>
                       <el-col :span="8">
                        <span class="yy-input-text"><font class="red">*</font> 涉及法院级别</span>
                        <el-select v-model="pd1.focuscourtlevel" :disabled="editshow || pd1.focuscourt!=null" filterable clearable default-first-option placeholder="请先选择问题针对法院"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.fyjb"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> 
                      <i class="el-icon-plus cursor" v-if='!editshow' style="color:red" @click="getdic(Global.fyjb)"></i>
                      </el-col>
                       <el-col :span="8">
                        <span class="yy-input-text"><font class="red">*</font> 不服本院</span>
                        <el-select v-model="pd1.notsatisfied" :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.bfby"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> 
                        <i class="el-icon-plus cursor" v-if='!editshow' style="color:red" @click="getdic(Global.bfby)"></i>
                      </el-col>
                        <el-col :span="24">
                           <span class="yy-input-text" style="width:11%!important;vertical-align: top;" title="当事人及案由"><font class="red">*</font> 当事人及案由</span>
                             <el-input placeholder="请输入内容" :disabled="editshow" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd1.partiesandcasereason"  class="yy-input-input" style="width:85%!important;"></el-input>
                       <i class="el-icon-search cursor" @click="getdswan(pd1.partiesandcasereason)"></i>
                       </el-col>
                      </el-row>
                </div>
                 <!-- 报批信息 -->
                <div class="ptitle mb-20 mt-20">报批信息</div>
                <div class="pborder">
                  <el-row class="ah-40">
                  <el-col :span="8">
                      <span class="yy-input-text"><font class="red">*</font> 信息操作</span>
                         <el-select v-model="pd1.informationoperation"  :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.xxczbq"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                           </el-select>
                     </el-col>
                      <el-col :span="8" v-if='pd1.informationoperation=="0199000011"'>
                        <span class="yy-input-text" style="width:35%"><font class="red">*</font> 审批领导</span>
                        <el-select v-model="pd1.checkuserid" @focus="getfocus(2)" remote :remote-method="jdrremoteMethod" v-el-select-loadmore="jbrloadmore"  placeholder="请输入关键字搜索" @change="chChangelist(pd1.checkuserid,6,6)" :disabled="editshow" filterable clearable default-first-option size="small" class="yy-input-input" >
                                        <el-option
                                          v-for="(item,ind) in jbrdata"
                                          :key="ind"
                                          :label="item.fullName"
                                          :value="item.courtPersonId">
                                        </el-option>
                        </el-select>
                      </el-col>
                       <el-col :span="8" v-if='pd1.informationoperation=="0199000012"'>
                         <span class="yy-input-text">转办形式</span>
                         <el-select v-model="bppd.assigntype" :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                        <el-option
                                        v-for="(item,ind) in $store.state.zbxs"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.dm">
                                        </el-option>
                           </el-select>
                     </el-col>
                       <el-col :span="8"  v-if='pd1.informationoperation=="0199000012"'>
                        <span class="yy-input-text">是否转办告知</span>
                          <el-select v-model="bppd.isassigninform" :disabled="editshow" @change="ISassign(bppd.isassigninform)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                        v-for="(item,ind) in $store.state.zbgzqf"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.dm">
                                        </el-option>
                           </el-select>
                    </el-col>
                  </el-row>
                  <el-row class="ah-50"  v-if='pd1.informationoperation=="0199000012"'>
                      <el-col :span="24">
                        <span class="yy-input-text" style="width:11%!important;vertical-align: top;" ><font class="red">*</font>  审批意见</span>
                        <el-input placeholder="请输入内容" :disabled="editshow" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="bppd.checkcontents"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                                
                     </el-col>
                     <el-col :span="8">
                           <span class="yy-input-text"><font class="red">*</font> 审批人</span>
                           <!-- <el-input placeholder="请输入内容" size="small" clearable v-model="pd4.checkuserid"  class="yy-input-input" ></el-input>  -->
                          <el-select v-model="bppd.checkuserid" @focus="getfocus(2)" remote :remote-method="jdrremoteMethod" v-el-select-loadmore="jbrloadmore"  placeholder="请输入关键字搜索" :disabled="editshow" filterable clearable default-first-option   size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in jbrdata"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.pbId">
                              </el-option>
                           </el-select>
                   
                     </el-col>
                     <el-col :span="8">
                         <span class="yy-input-text"><font class="red">*</font> 审批结果</span>
                         <el-select v-model="bppd.checkresult" :disabled="editshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.spjg"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                           </el-select>
                     </el-col>
                      <el-col :span="8">
                                <span class="yy-input-text"><font class="red">*</font> 审批时间</span>
                                <el-date-picker :disabled="editshow"
                                    v-model="bppd.checktime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                                </el-date-picker>
                    </el-col>
                             <el-col :span="8" v-if='gzshow'>
                                <span class="yy-input-text">督（转）办号</span>
                                 <el-select v-model="bppd.assigntypeno" :disabled="editshow" @change="getDBHBP(bppd.assigntypeno,0);" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:20%!important;" >
                                    <el-option
                                      v-for="(item,ind) in dblbdata"
                                      :key="ind"
                                      :label="item.mc"
                                      :value="item.dm">
                                    </el-option>
                                </el-select>
                                 <el-select v-model="bppd.assignyear" :disabled="editshow" @change="getDBHBP(bppd.assignyear,1);" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:20%!important;" >
                                    <el-option
                                      v-for="(item,ind) in $store.state.dbnf"
                                      :key="ind"
                                      :label="item.mc"
                                      :value="item.dm">
                                    </el-option>
                                </el-select>
                                {{dbhbp}}
                            </el-col>
                            <el-col :span="8" v-if='gzshow'>
                                <span class="yy-input-text">转办告知文号</span>
                                <el-input placeholder="自动生成文号" :disabled="true" size="small" clearable v-model="bppd.assigninformno"  class="yy-input-input" ></el-input> 
                            </el-col>
                  </el-row>
                  <el-row class="ah-40">
                        <el-col :span="24" >
                                <span class="yy-input-text" style="width:11%!important" title="提请立案流转单">提请立案流转单</span>
                                <el-button type="primary" :disabled="editshow" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('7')" >上传文件</el-button> <span class="ts"></span>
                            </el-col>
                           <el-col :span="24" class="mb-20" v-if="filedata7 && filedata7.length>0">
                            <el-table
                              :data="filedata7">
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
                                 <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column>
                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                       <el-button type="text"  class="a-btn"   title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                      <el-button type="text"  class="a-btn"  :disabled="editshow" title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata7)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                             
                            <el-col :span="24" v-if="ffshow">
                                 <span class="yy-input-text" style="width:11%!important">转办函</span>
                                 <el-button type="primary"  :disabled="editshow" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('8')" >上传文件</el-button> <span class="ts"></span>
                            </el-col>
                            <el-col :span="24" class="mb-20" v-if="filedata8 && filedata8.length>0">
                            <el-table
                              :data="filedata8">
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
                              <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column>

                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  class="a-btn"   title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                      <el-button type="text"  class="a-btn" :disabled="editshow"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata8)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                          </el-col>
                  </el-row>
                </div>
                <!-- 审批信息 -->
                <div class="ptitle mb-20 mt-20" v-if="zshow1">审批信息</div>
                <div class="pborder" v-if="zshow1">
                  <el-row class="ah-40">
                    <!-- <el-col :span="8">
                        <span class="yy-input-text">是否转办</span>
                      <el-select v-model="pd4.isassign" :disabled="ckshow || spshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                            <el-option
                                        v-for="(item,ind) in $store.state.zbqf"
                                        :key="ind"
                                        :label="item.mc+item.dm"
                                        :value="item.dm">
                                        </el-option>
                           </el-select>
                    </el-col> -->
                     <el-col :span="8">
                         <span class="yy-input-text">转办形式</span>
                         <el-select v-model="pd4.assigntype" :disabled="ckshow || spshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                        <el-option
                                        v-for="(item,ind) in $store.state.zbxs"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.dm">
                                        </el-option>
                           </el-select>
                     </el-col>
                       <el-col :span="8">
                        <span class="yy-input-text">是否转办告知</span>
                        
                          <el-select v-model="pd4.isassigninform"  :disabled="ckshow || spshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                        v-for="(item,ind) in $store.state.zbgzqf"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.dm">
                                        </el-option>
                           </el-select>
                    </el-col>
                    <el-col :span="8">
                         <span class="yy-input-text">信息操作</span>
                         <el-select v-model="pd4.informationoperation" :disabled="ckshow || spshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.xxcz"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                           </el-select>
                     </el-col>
                    </el-row>
                     <el-row class="ah-40">
                    
                     
                      <el-col :span="24">
                        <span class="yy-input-text" style="width:11%!important;vertical-align: top;" ><font class="red">*</font>  审批意见</span>
                        <el-input placeholder="请输入内容" :disabled="ckshow || spshow" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd4.checkcontents"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                                
                     </el-col>
                      <el-col :span="8">
                           <span class="yy-input-text"><font class="red">*</font> 审批人</span>
                           <!-- <el-input placeholder="请输入内容" size="small" clearable v-model="pd4.checkuserid"  class="yy-input-input" ></el-input>  -->
                          <el-select v-model="pd4.checkuserid" :disabled="ckshow || spshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in jbrdata"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.pbId">
                              </el-option>
                           </el-select>
                   
                     </el-col>
                     <el-col :span="8">
                         <span class="yy-input-text"><font class="red">*</font> 审批结果</span>
                         <el-select v-model="pd4.checkresult" :disabled="ckshow || spshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.spjg"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                           </el-select>
                     </el-col>
                       <el-col :span="8">
                                <span class="yy-input-text"><font class="red">*</font> 审批时间</span>
                                <el-date-picker :disabled="ckshow || spshow"
                                    v-model="pd4.checktime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                                </el-date-picker>
                    </el-col>
                  </el-row>
                </div>
                <!-- 转(交)办信息 -->
                <div class="ptitle mb-20 mt-20" v-if="zshow2">转(交)办信息</div>
                <div class="pborder" v-if="zshow2">
                         <el-row class="ah-40">
                             <el-col :span="8">
                                <span class="yy-input-text">督（转）办号</span>
                                 <el-select v-model="pd2.assigntype" :disabled="ckshow" @change="getDBH(pd2.assigntype,0);chChangelist(pd2.assigntype,2,2)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:20%!important;" >
                                    <el-option
                                      v-for="(item,ind) in dblbdata"
                                      :key="ind"
                                      :label="item.mc"
                                      :value="item.dm">
                                    </el-option>
                                </el-select>
                                 <el-select v-model="pd2.assignyear" :disabled="ckshow" @change="getDBH(pd2.assignyear,1);chChangelist(pd2.assignyear,3,3)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:20%!important;" >
                                    <el-option
                                      v-for="(item,ind) in $store.state.dbnf"
                                      :key="ind"
                                      :label="item.mc"
                                      :value="item.dm">
                                    </el-option>
                                </el-select>
                                {{dbh}}
                             </el-col>
                              <el-col :span="8">
                                <span class="yy-input-text">转办告知文号</span>
                                <el-input placeholder="自动生成文号" :disabled="true" size="small" clearable v-model="pd2.assigninformno"  class="yy-input-input" ></el-input> 
                             </el-col>
                              <el-col :span="8">
                                <span class="yy-input-text"><font class="red">*</font> 转办时间</span>
                                <el-date-picker :disabled="ckshow" @change="getBJtime(pd2.assigntime)"
                                    v-model="pd2.assigntime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                                </el-date-picker>
                             </el-col>
                               <el-col :span="8">
                                <span class="yy-input-text"><font class="red">*</font> 应办结时间</span>
                                <el-date-picker
                                    v-model="bjsj2" format="yyyy-MM-dd" :disabled="ckshow"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input"  >
                                </el-date-picker>
                             </el-col>
                              <el-col :span="8">
                                <span class="yy-input-text"><font class="red">*</font> 承办单位</span>
                                    <el-select v-model="pd2.undertakingorgid" :disabled="ckshow" @change="getBM(pd2.undertakingorgid,0),getFYJB(pd2.undertakingorgid,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                        <el-option
                                        v-for="(item,ind) in cbdw"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.orgid">
                                        </el-option>
                                    </el-select>
                               </el-col>
                                  <el-col :span="8">
                                <span class="yy-input-text">承办法院级别</span>
                                    <el-select v-model="pd2.undertakingorglevel" :disabled="ckshow || (pd2.undertakingorglevel!=null && pd2.undertakingorglevel!='')" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                        <el-option
                                        v-for="(item,ind) in $store.state.fyjb"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.dm">
                                        </el-option>
                                    </el-select>
                               </el-col>
                               <el-col :span="8">
                                <span class="yy-input-text"><font class="red">*</font> 承办部门</span>
                                    <el-select v-model="pd2.undertakingsuborgid" :disabled="ckshow" @change="getCBR('1',pd2.undertakingorgid,pd2.undertakingsuborgid,1);getFYJB(pd2.undertakingorgid,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                        <el-option
                                        v-for="(item,ind) in jdbm"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.orgid">
                                        </el-option>
                                    </el-select>
                               </el-col>
                               <el-col :span="8">
                                <span class="yy-input-text"><font class="red">*</font> 承办人</span>
                                    <el-select v-model="pd2.undertakinguserid" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                        <el-option
                                        v-for="(item,ind) in cbrdata1"
                                        :key="ind"
                                        :label="item.fullName"
                                        :value="item.pbId">
                                        </el-option>
                                    </el-select>
                               </el-col>
                            <el-col :span="24" v-if="ffshow && pd2.undertakingsuborgid=='c8f88905383211ea9e3700155dbaef87'">
                                        <span class="yy-input-text" style="width:11%!important" title="提请立案流转单">提请立案流转单</span>
                                        <el-button type="primary" :disabled="ckshow" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('6')" >上传文件</el-button> <span class="ts"></span>
                            </el-col>
                           <el-col :span="24" class="mb-20" v-if="filedata6 && filedata6.length>0">
                            <el-table
                              :data="filedata6">
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
                                 <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column>
                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                       <el-button type="text"  class="a-btn"   title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                      <el-button type="text"  class="a-btn"  :disabled="ckshow" title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata6)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                                </el-row>
                                <el-row class="ah-40">
                                <el-col :span="24" v-if="ffshow">
                                        <span class="yy-input-text" style="width:11%!important">转办函</span>
                                        <el-button type="primary"  :disabled="ckshow" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('1')" >上传文件</el-button> <span class="ts"></span>
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
                              <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column>

                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  class="a-btn"   title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                      <el-button type="text"  class="a-btn" :disabled="ckshow"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata1)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                                <el-col :span="24" v-if="ffshow">
                                        <span class="yy-input-text" style="width:11%!important">告知函</span>
                                        <el-button type="primary" :disabled="ckshow" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('5')" >上传文件</el-button> <span class="ts"></span>
                                </el-col>
                                <el-col :span="24" class="mb-20" v-if="filedata5 && filedata5.length>0">
                            <el-table
                              :data="filedata5">
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
                                 <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column>
                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                      <el-button type="text"  class="a-btn" :disabled="ckshow"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata5)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                                <el-col :span="24">
                                    <span class="yy-input-text" style="width:11%!important;vertical-align: top;" >备注</span>
                                    <el-input placeholder="请输入内容" :disabled="ckshow" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd2.remark"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                                
                                </el-col>
                          </el-row>
                </div>
              
              
                <!-- 办理信息 -->
                <div class="ptitle mb-20 mt-20" v-if="zshow3">办理信息</div>
                <div class="pborder" v-if="zshow3">
                    <el-row class="ah-40">
                       <el-col :span="8">
                           <span class="yy-input-text"><font class="red">*</font> 承办单位</span>
                                <el-select v-model="pd5.undertakingorgid" remote :remote-method="cbdwremoteMethod" v-el-select-loadmore="cbdwloadmore"  placeholder="请输入关键字搜索" :disabled="ckshow" @change="getBM(pd5.undertakingorgid,1)" filterable clearable default-first-option size="small" class="yy-input-input" >
                                    <el-option
                                        v-for="(item,ind) in cbdw"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.orgid">
                                        </el-option>
                                 </el-select>
                          </el-col>
                     <el-col :span="8">
                         <span class="yy-input-text"><font class="red">*</font>  承办部门</span>
                         <el-select v-model="pd5.undertakingsuborgid" :disabled="ckshow" @change="getCBR(2,pd5.undertakingorgid,pd5.undertakingsuborgid,1)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in jdbm"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                              </el-option>
                        </el-select>
                     </el-col>
                      <el-col :span="8">
                         <span class="yy-input-text"><font class="red">*</font> 承办人</span>
                         <el-select v-model="pd5.undertakinguserid" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbrdata2"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.pbId">
                              </el-option>
                        </el-select>
                     </el-col>
                        <el-col :span="8">
                                <span class="yy-input-text"><font class="red">*</font> 承办时间</span>
                                <el-date-picker :disabled="ckshow"
                                    v-model="pd5.handletime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                    </el-col>
                     <el-col :span="24">
                        <span class="yy-input-text" style="width:11%!important;vertical-align: top;" >备注</span>
                        <el-input placeholder="请输入内容" type="textarea" :disabled="ckshow" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd5.remark"  class="yy-input-input" style="width:86.8%!important;"></el-input>   
                     </el-col>
                    </el-row>
                </div>
                <!-- 办结信息 -->
                 <div class="ptitle mb-20 mt-20" v-if="zshow4">办结信息</div>
                 <div class="pborder" v-if="zshow4">
                     <el-row class="ah-40">
                         <el-col :span="8">
                         <span class="yy-input-text">是否办结</span>
                     
                               <el-select v-model="pd6.iscompleted" :disabled="ckshow || zshow5" @change="getIswith(pd6.iscompleted)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                         <el-option value="1" label="是">
                                        </el-option>
                                        <el-option value="0" label="否">
                                  </el-option>
                           </el-select>
                        </el-col>
                            <el-col :span="8">
                          <span class="yy-input-text">办结时间</span>
                                <el-date-picker :disabled="ckshow || zshow5"
                                    v-model="pd6.completedtime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" @change="getCQSJ(pd6.completedtime)" >
                           </el-date-picker>
                         </el-col>
                          <el-col :span="8">
                         <span class="yy-input-text">是否期限内办结</span>
                         
                              <el-select v-model="pd6.isintimecompleted" :disabled="ckshow || zshow5" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                   <el-option
                                v-for="(item,ind) in $store.state.qxnbj"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                           </el-select>
                        </el-col>
                     </el-row>
                      <el-row class="ah-40">
                        
                            <el-col :span="8">
                          <span class="yy-input-text">超期时间</span>
                            <el-input v-model="pd6.outcompletedtime" :disabled="ckshow || zshow5"   size="small" class="yy-input-input" style="width:56%!important"></el-input> <span style="font-size:12px;">天</span>
                         </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">办结结果</span>
                         <el-select v-model="pd6.completedresult" :disabled="ckshow || zshow5" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.bjjg"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>
                       </el-col>
                       <el-col :span="8">
                         <span class="yy-input-text">结果与代表意见</span>
                         <el-select v-model="pd6.representativesatisfaction" :disabled="ckshow || zshow5" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.jgydbyj"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>
                       </el-col>
                       <el-col :span="8">
                         <span class="yy-input-text">是否沟通</span>
                              <el-select v-model="pd6.iscommunicate" :disabled="ckshow || zshow5" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                         <el-option value="1" label="是">
                                        </el-option>
                                        <el-option value="0" label="否">
                                        </el-option>
                           </el-select>
                       </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">沟通形式</span>
                         <el-select v-model="pd6.communicatetype" :disabled="ckshow || zshow5" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.gtxs"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>
                       </el-col>
                       <el-col :span="8">
                         <span class="yy-input-text">沟通效果</span>
                         <el-select v-model="pd6.communicateresult" :disabled="ckshow || zshow5" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.gtxg"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>
                       </el-col>
                         <el-col :span="8">
                         <span class="yy-input-text">是否答复</span>
               
                           <el-select v-model="pd6.isreply" :disabled="ckshow || zshow5" @change="getIswith(pd6.iscompleted,pd6.isreply)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                         <el-option value="1" label="是">
                                        </el-option>
                                        <el-option value="0" label="否">
                                        </el-option>
                           </el-select>
                          
                       </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">答复形式</span>
                         <el-select v-model="pd6.replytype" :disabled="ckshow || zshow5" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.dfxs"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>
                       </el-col>
                       <el-col :span="8">
                         <span class="yy-input-text">答复性质</span>
                         <el-select v-model="pd6.replynature" :disabled="ckshow || zshow5" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.dfxz"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>
                       </el-col>
                         <el-col :span="8">
                          <span class="yy-input-text">答复时间</span>
                                <el-date-picker :disabled="ckshow || zshow5"
                                    v-model="pd6.replytime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                         </el-col>
                          <el-col :span="8">
                           <span class="yy-input-text">答复文号</span>
                           <el-input placeholder="请输入内容" :disabled="ckshow || zshow5" size="small" clearable v-model="pd6.replyfilenum"  class="yy-input-input" ></el-input> 
                      </el-col>
                       <el-col :span="24" v-if="dfshow">
                        <span class="yy-input-text" style="width:11%">答复函</span>
                        <el-button type="primary" :disabled="ckshow" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('4')" >上传文件</el-button> <span class="ts"></span>
                        </el-col>
                        <el-col :span="24" class="mb-20" v-if="filedata4 && filedata4.length>0">
                            <el-table
                              :data="filedata4">
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
                                 <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column>
                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                       <el-button type="text"  class="a-btn"   title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                      <el-button type="text"  class="a-btn"  :disabled="ckshow || zshow5" title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata4)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                       <el-col :span="24">
                        <span class="yy-input-text" style="width:11%!important;vertical-align: top;" >备注</span>
                        <el-input placeholder="请输入内容" :disabled="ckshow || zshow5" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd6.remark"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                                
                     </el-col>
                     </el-row>
                 </div>
                 <!-- 复文信息 -->
                 <!-- <div class="ptitle mb-20 mt-20" v-if="zshow5">复文信息</div>
                 <div class="pborder" v-if="zshow5">
                     <el-row class="ah-40">
                    <el-col :span="24">
                        <span class="yy-input-text" style="width:11%!important;vertical-align: top;" >反馈意见</span>
                        <el-input placeholder="请输入内容" :disabled="ckshow" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd7.replycontents"  class="yy-input-input" style="width:86.8%!important;"></el-input>     
                     </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">反馈单位</span>
                         <el-select v-model="pd7.replyorgid" @change="getBM(pd7.replyorgid,2)" :disabled="ckshow"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in wtfy"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                              </el-option>
                        </el-select>
                       </el-col>
                         <el-col :span="8">
                         <span class="yy-input-text">反馈部门</span>
                         <el-select v-model="pd7.replysuborgid" @change="getFKR(pd7.replyorgid,pd7.replysuborgid)" :disabled="ckshow"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in jdbm"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                              </el-option>
                        </el-select>
                       </el-col>
                       <el-col :span="8">
                         <span class="yy-input-text">反馈人</span>
                         <el-select v-model="pd7.replyuserid" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in fkdata"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.pbId">
                              </el-option>
                        </el-select>
                       </el-col>
                         <el-col :span="8">
                          <span class="yy-input-text">反馈时间</span>
                                <el-date-picker :disabled="ckshow"
                                    v-model="pd7.replytime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input">
                           </el-date-picker>
                         </el-col>
                          <el-col :span="24" v-if="hfshow">
                        <span class="yy-input-text" style="width:11%!important">回复函</span>
                        <el-button type="primary" :disabled="ckshow" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('2')" >上传文件</el-button> <span class="ts"></span>
                        </el-col>
                        <el-col :span="24" class="mb-20"  v-if="filedata2 && filedata2.length>0">
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
                                 <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                                <template slot-scope="scope">
                                  <div>
                                <span>{{scope.row.relfiletype | filertype}}</span>
                                </div>
                                </template>
                            </el-table-column>
                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  class="a-btn"   title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                      <el-button type="text"  class="a-btn"  :disabled="ckshow" title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata2)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                    </el-row>
                 </div> -->
                 <!-- 催办信息 -->
                 <div class="ptitle mb-20 mt-20" v-if="zshow6">催办信息</div>
                 <div class="pborder" v-if="zshow6">
                    <el-row class="ah-40">
                         <el-col :span="8">
                          <span class="yy-input-text">催办时间</span>
                                <el-date-picker :disabled="ckshow"
                                    v-model="pd8.urgenttime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                         </el-col>
                          <el-col :span="8">
                         <span class="yy-input-text">催办形式</span>
                         <el-select v-model="pd8.urgenttype" :disabled="ckshow" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.cbxs"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>

                       </el-col>
                        <el-col :span="24">
                        <span class="yy-input-text" style="width:11%!important;vertical-align: top;" >催办信息</span>
                        <el-input placeholder="请输入内容" :disabled="ckshow" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd8.urgentcontents"  class="yy-input-input" style="width:86.8%!important;"></el-input>     
                     </el-col>
                    </el-row>
                 </div>
             <!-- 开展活动 -->
                <div class="ptitle mb-20 mt-20" >开展活动</div>
                <div class="pborder" >
                    <el-row class="ah-40" v-if='!ckshow && !zshow6'>
                        <el-col :span="24">
                        <span class="yy-input-text"  style="width:11%;">活动类型</span>
                        <el-select v-model="pb.hdlx" @change="changehdlx(pb.hdlx,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:20%!important;" >
                         <el-option
                           v-for="(item,ind) in $store.state.hdlx"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> 
                         <el-select v-model="pb.hdlxal" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:20%!important;" >
                         <el-option
                           v-for="(item,ind) in hdlxlist"
                           :key="ind"
                           :label="item.theme"
                           :value="item.activityInfoId">
                           </el-option>
                        </el-select> 
                         <el-button type="success" plain size="small" @click="changehdlx(pb.hdlxal,1)">加入列表</el-button>
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
                                    <el-button type="text"  :disabled="ckshow || zshow6" class="a-btn"  title="删除"  icon="el-icon-delete" @click="hddel(scope.row)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                        
                            </el-col>
                            
                    </el-row>
                </div>
           <div class="footer">
            <el-button type="primary"  style="width:130px;" @click="submit" v-if="addtype!='9'">提  交</el-button>
            <el-button style="width:130px;" @click="goto()">关 闭</el-button>
            </div>
            <br/>
         </div>

         
   <div class="subtable">

    <el-dialog title="来文字号" :visible.sync="lwDialogVisible" class="subtable" :close-on-click-modal='false'>
        <el-form :model="form1" >
            <el-row class="ah-40">
              <el-col :span="12">
               <span class="yy-input-text trt">来文字号：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="form1.letternumber"  class="yy-input-input" ></el-input>
             </el-col>
              <el-col :span="12">
               <span class="yy-input-text trt">联名人数：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="form1.jointpersoncount"  class="yy-input-input" ></el-input>
             </el-col>
              <el-col :span="12">
               <span class="yy-input-text trt">经办人：</span>
              <el-select v-model="form1.undertakinguserid" remote :remote-method="jdrremoteMethod" v-el-select-loadmore="jbrloadmore"  placeholder="请输入关键字搜索" filterable clearable default-first-option  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in jbrdata"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.pbId">
                              </el-option>
               </el-select>
             </el-col>
             <el-col :span="12">
                          <span class="yy-input-text trt">收文时间：</span>
                                <el-date-picker
                                    v-model="form1.receivingtime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
              </el-col>
              <el-col :span="24">
                        <span class="yy-input-text trt" style="width:13.5%!important;vertical-align: top;" >来文要求：</span>
                        <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="form1.lettercontents"  class="yy-input-input" style="width:80%!important;"></el-input>     
               </el-col>
               <el-col :span="12">

                           <span class="yy-input-text trt">来文时间：</span>
                                <el-date-picker
                                    v-model="form1.lettertime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
               </el-col>
                <el-col :span="12">
               <span class="yy-input-text trt">来文期间：</span>
              <el-select v-model="form1.lettertimes" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                           <el-option
                                v-for="(item,ind) in $store.state.lwqj"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
               </el-select>
               </el-col>
             
              <el-col :span="12">
               <span class="yy-input-text trt">来文来源类型：</span>
              <el-select v-model="form1.lettersourcetype"  @change="getLWLY(form1.lettersourcetype)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                      <el-option
                                v-for="(item,ind) in $store.state.lwlylb"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
               </el-select>
             </el-col>
              <el-col :span="12" v-if="lwshow">
               <span class="yy-input-text trt">来源法院人员：</span>
              <el-select v-model="form1.sourcecourtpersonpbid" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                    <el-option
                         v-for="(item,ind) in jbrdata"
                         :key="ind"
                         :label="item.fullName"
                         :value="item.pbId">
                   </el-option>
              </el-select>
             </el-col>
              <el-col :span="12" v-else>
               <span class="yy-input-text trt">来源组织：</span>
              <el-select v-model="form1.lettersourceorgid" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                   <el-option
                                v-for="(item,ind) in lyzzdata"
                                :key="ind"
                                :label="item.personName"
                                :value="item.pbId">
                      </el-option>
               </el-select>
             </el-col>
            
               <el-col :span="24">
                        <span class="yy-input-text trt" style="width:13.5%!important;vertical-align: top;" >领导批示：</span>
                        <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="form1.leadershipinstruction"  class="yy-input-input" style="width:80%!important;"></el-input>     
               </el-col>
               <el-col :span="24" style="text-align:center">
                 <el-button type="success"  size="small" @click="form1save()"> 保 存</el-button>
                 </el-col>
             </el-row>
                       <el-table
                              :data="form1data"
                              ref="multipleTable"
                              @selection-change="form1change">
                              <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                              <el-table-column
                                  type="index"
                                  label="序号" width="80">
                              </el-table-column>
                              <el-table-column
                                  prop="letternumber"
                                  label="来文字号">
                              </el-table-column>
                              <el-table-column
                                  prop="jointpersoncount"
                                  label="联名人数">
                              </el-table-column>
                               <el-table-column
                                  prop="receivingtime"
                                  label="收文时间">
                              </el-table-column>
                              <el-table-column
                                  prop="lettertime"
                                  label="来文时间">
                              </el-table-column>
                              <el-table-column
                                  prop="lettercontents"
                                  label="来文要求">
                              </el-table-column>
                               <!-- <el-table-column
                                  prop="lettertimes"
                                  label="来文期间">
                              </el-table-column>
                               <el-table-column
                                  prop="lettersourcetype"
                                  label="来文来源类型">
                              </el-table-column> -->
                               <el-table-column
                                  prop="leadershipinstruction"
                                  label="领导批示">
                              </el-table-column>
                               <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="form1del(scope.row)"></el-button>
                                     </div>
                                  </template>
                              </el-table-column>
                             </el-table>
           
        </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button type="primary"  size="small" @click="form1submit">提 交</el-button>
              <el-button @click="lwDialogVisible = false" size="small">取 消</el-button>
            </div>
    </el-dialog>
   <el-dialog title="案件信息" :visible.sync="ayDialogVisible" :close-on-click-modal='false'>
                          <el-table
                              :data="aydata"
                              @row-click="rowclick">
                              <el-table-column
                                  type="index"
                                  label="序号" width="80">
                              </el-table-column>
                              <el-table-column
                                  prop="casenum"
                                  label="案件编号">
                              </el-table-column>
                              <el-table-column
                                  prop="caseclass"
                                  label="案件类型">
                              </el-table-column>
                             <el-table-column
                                  prop="adjudgementphase"
                                  label="审理阶段">
                              </el-table-column>
                               <el-table-column
                                  prop="casestatus"
                                  label="案件状态">
                              </el-table-column>
                              <el-table-column
                                  prop="interestrelations"
                                  label="利害关系">
                              </el-table-column>
                               <el-table-column
                                  prop="focuscourt"
                                  label="问题针对法院">
                              </el-table-column>
                               <el-table-column
                                  prop="focuscourtlevel"
                                  label="涉及法院级别">
                              </el-table-column>
                               <el-table-column
                                  prop="notsatisfied"
                                  label="不服本院">
                              </el-table-column>
                             </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button @click="ayDialogVisible = false" size="small">取 消</el-button>
            </div>
    </el-dialog>
         <el-dialog title="选择类型" :visible.sync="addDialogVisible" :close-on-click-modal='false'>
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
              <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
            </div>
       </el-dialog>
       
</div>
      <el-dialog title="添加字典项" :visible.sync="dicDialogVisible" v-if='dicDialogVisible' :close-on-click-modal='false' width="630px">
        <DIC :type="dtype" :data='dicdata'  @dicfatherMethod="dicfatherMethod" :random="new Date().getTime()"></DIC>
      </el-dialog>
    <el-dialog title="上传文件" :visible.sync="uploadDialogVisible"  :close-on-click-modal='false' width="630px">
     <UPLOAD :url="uurl" :type="type" :urlErr="uurlErr"  @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>

     </div>
</template>
<script>
import UPLOAD from "../../Common/upload"
import DIC from "../../Common/category/dictionarie"
import {ToArray} from '@/assets/js/ToArray.js'
import {getYear} from '@/assets/js/date.js'
export default {
  components:{UPLOAD,DIC},
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
             casename:'关注案件信息',
             pd0:{},
             pd1:{isinterestrelations:'0'},
             pd2:{undertakingsuborgid:'',undertakinguserid:''},
             pd3:{},
             pd4:{},
             pd5:{undertakingsuborgid:'',undertakinguserid:''},
             pd6:{outcompletedtime:'0',iscompleted:'0'},
             pd7:{},
             pd8:{urgenttime:''},
             pb:{},
             tableData0:[],
             tableData3:[],
             dataList:[{
              letternumber:'',undertakinguserid:'',jointpersoncount:'',Number:0,
              receivingtime:'',lwdata:[],lmdata:[],filedata0:[],reflectnum:'',
             }],
             datanum:0,
             formList:[{lettertime:'',lettertimes:'',
             lettersourcetype:'',sourcecourtpersonpbid:'',
             sourcecourtpersonname:'',
             lettersourceorgid:'',lettersourcename:'',
             leadershipinstruction:''}],
             formListN:[{lmdbid:''}],
            //  datanum:2,
             aydata:[],
             spshow:false,
             dtype:'0',
             uurl:'/CaseRegisterController/uploadFile',
             uurlErr:'',
             uploadDialogVisible:false,
             lwDialogVisible:false,
             ayDialogVisible:false,
             addDialogVisible:false,
             dicDialogVisible:false,
             hdtype:'1',
             type:'0',
             filedata0:[],
             filedata1:[],
             filedata2:[],
             filedata3:[],
             filedata4:[],
             filedata5:[],
             filedata6:[],
             filedata7:[],
             filedata8:[],
             form1data:[],
             dbh:'',//督办号
             addtype:'0',
             form1:{},
             form2:{},
             multipleSelection:[],
             xmdata:[],
             focusCaseId:'',
             lpshow:false,
             lmdbid:'',
             labellist:[],
             labeladress:'',
             hdlxlist:[],
             cbbm:[],//承办部门
             cbdw:[],//承办单位
             jbcbdw:[],//交办下的承办单位
             cbry:[],
             fydwdata:[],//问题针对法院
             lwshow:true,
             bjsj2:"",
             ffshow:true,
             dfshow:true,
             hfshow:true,
             cbrdata1:[],//交办下的承办人
             cbrdata2:[],//办理下承办人
             jbrdata:[],//经办人
             lyzzdata:[],//来源组织
             lydwdata:[],//来文单位
             fyrdata:[],//来源法院人员
             year:'',
             fkdata:[],
             editshow:false,//编辑的时候状态
             ckshow:false,//查看时候的状态
             state:'',
             zshow1:false,//审批
             zshow2:false,//交办
             zshow3:false,//办理
             zshow4:false,//办结
             zshow5:false,//复文
             zshow6:false,//催办
             baseid:null,
             spshow:false,
             jdbm:[],
             ctitle:'',
             dblbdata:[],//督办类别
             yearlist:getYear(),
             Fynum:0,
             dicdata:{},
             bppd:{},
             dbhbp:'',
             jznum:50,//加载数据
             formData: {   //下拉参数
                 pageIndex: 1,
                 pageSize: 20
              },
             xmload:[],
             jdrload:[],
             fydwload:[],
             cbdwload:[],
             fyrload:[],
             gzshow:false,
             bs:0,
             lmrdata:[],
             lmrload:[],

        }
    },
      mounted(){
          this.$store.dispatch("getLwqj");
          this.$store.dispatch("getJb");
          this.$store.dispatch("getCb");
          this.$store.dispatch("getAjlx");
          this.$store.dispatch("getSljd");
          this.$store.dispatch("getAjzt");
          this.$store.dispatch("getLhgx");
          this.$store.dispatch("getFyjb");
          this.$store.dispatch("getZbxs");
          this.$store.dispatch("getBfby");
          this.$store.dispatch("getXxcz");
          this.$store.dispatch("getXxczbq");
          this.$store.dispatch("getSpjg");
          this.$store.dispatch("getBjjg");
          this.$store.dispatch("getJgydbyj");
          this.$store.dispatch("getGtxs");
          this.$store.dispatch("getGtxg");
          this.$store.dispatch("getDfxs");
          this.$store.dispatch("getDfxz");
          this.$store.dispatch("getCbxs");
          this.$store.dispatch("getLwlylb");
          this.$store.dispatch("getHdlx");
          this.$store.dispatch("getZdaj");
          this.$store.dispatch("getCfaj");
          this.$store.dispatch("getZbqf");
          this.$store.dispatch("getZbgzqf");
          this.$store.dispatch("getDblb");
          this.$store.dispatch("getDbnf");
          this.$store.dispatch("getQxnbj");
          this.getinit(this.$route);
      },
       watch:{
          $route:function(val){
            this.getinit(val);
          }
       },
    methods:{
       getinit(val){
         //权限start
                 this.$api.post(this.Global.menuurl,{'menuId':'13042402'},
                     r =>{
                          if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
                  });
          //权限end
         this.reset();
         this.addtype=val.query.type;
         this.focusCaseId=val.query.focusCaseId;
         this.year=val.query.year;
         this.ctitle=val.query.ctitle;
         this.state=val.query.status==null?'0':val.query.status;
         this.baseid=val.query.baseid;
          

         if(this.state=="9"){
            this.ckshow=true;
         }
         if(this.state!="0"){
            this.editshow=true;
         }
         this.datanum=0;
        // this.getName();
        // this.getcbbm();
         //this.getcbdw();
       
        //  this.getBJtime();
          
        //  this.getFKR();
        // this.getFY();
        // this.getLWDW();
        
         this.getList();

         if(this.year=="" || this.year==null){
             this.year=new Date().getFullYear()+"";

          }
        
       
        },
        // gethdlx(){
        //    this.$api.post(this.Global.aport3+'/ActivityInfoController/getCaseRelActivityType',null,
        //      r =>{
        //         this.hdlx=r.data;
        //     });
        // },
        changehdlx(t,id){
         
        if(id==0){
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

              if(this.pb.hdlx==undefined || this.pb.hdlx=="")
              {
                this.$message.error("活动类型不能为空！");return;
              }
              if(this.pb.hdlxal==undefined || this.pb.hdlxal=="")
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
                      
                     }else{
                       this.$message.error(r.message);
                     }
                  });
                this.pb={};
            }
        },
        //应办结时间
        getBJtime(time){
          let p={
            'assigntime':time
          };
          this.$api.post(this.Global.aport2+'/CaseRegisterController/getBedealtime',p,
             r =>{
              
                  this.bjsj2=r.data.afterdaydate;
            });
        },
        getLWLY(t){
        
              if(t=="0158000001"){
                // this.getJBR(null,0);
                 this.lwshow=true;
              }else{
                // this.getLYZZ();
                 this.lwshow=false;
              }
        },
        getName(val,t){
      
          
           let p={
             'personName':'',
             'leveType':'0150000001',
           };
           this.$api.post(this.Global.aport1+'/baseinfo/personlist',p,
             r =>{
                  if(t==0){
                       var arr = r.data.filter(item=>{
                                return item.personId.indexOf(val) + 1
                       });
                   
                      this.xmdata=arr;
                      console.log(this.xmdata);
                      
                      this.$set(this.pd1,'leaderpbid',val)
                   }
            });
        },
            //来文人远程搜索
      xmremoteMethod(quer){
          if (quer != '') {
             let p={
                'personName':quer,
            };
            this.$api.post(this.Global.aport1+'/baseinfo/personlist',p,
                  r =>{
                      if(r.code==1){
                        this.xmload=r.data;
                        if(this.xmload.length>this.jznum){
                          this.bs=0;
                          this.xmdata=this.xmload.slice(0,this.jznum);
                        }else{
                          this.bs=1;
                          this.xmdata=this.xmload;
                        }
                      }
                  });
         }else{
            this.xmdata=[];
       
         } 

        },
        //来文人单位加载
       xmloadmore() {
          if(this.bs==1){return;}
           var srr= this.xmload;
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.xmdata = srr.filter((item, index, arr) => {
              return index < num;
            });
        },

         //联名代表、委员、特约人员远程搜索
      lmrremoteMethod(quer){
          if (quer != '') {
             let p={
                'personName':quer,
            };
            this.$api.post(this.Global.aport1+'/baseinfo/personlist',p,
                  r =>{
                      if(r.code==1){
                        this.lmrload=r.data;
                        if(this.lmrload.length>this.jznum){
                          this.bs=0;
                          this.lmrdata=this.lmrload.slice(0,this.jznum);
                        }else{
                          this.bs=1;
                          this.lmrdata=this.lmrload;
                        }
                      }
                  });
         }else{
            this.lmrdata=[];
       
         } 

        },
        //联名代表、委员、特约人员单位加载
       lmrloadmore() {
          if(this.bs==1){return;}
           var srr= this.lmrload;
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.lmrdata = srr.filter((item, index, arr) => {
              return index < num;
            });
        },
        
        getNum(i){
           this.dataList[i].Number=1;
        },
        getFycs(){
          this.Fynum=1;
        },
        ChangeNameListNew(val){
                  var obj = {};
                      obj = this.xmdata.find(item =>{
                          return item.personId === val 
                      });
              if(obj){
                this.pd1.representativeId=obj.representativeId;
                this.pd1.cppcMemberId=obj.cppcMemberId;
                this.pd1.specialPersonId=obj.specialPersonId;
              }
          let p={
             'personId':val,
             'personType':obj.identityType
           };
            this.$api.post(this.Global.aport1+'/baseinfo/persontags',p,
             r =>{
               if(r.code==1)
               {
                 if(r.data.length>0){
                   
                     this.lpshow=true;
                     this.labellist=r.data;
                 }
                
               }
             });
                
        },
        ChangeNameList(n,t,val,i){
          if(t==1 && (this.formListN[i].lmdbid=="" || this.formListN[i].lmdbid==undefined)){
             this.$message.error("联名代表、委员、特约人员不能为空!");return;
          }
          let p={
             'personId':n
           };
           ///baseinfo/personlist
           this.$api.post(this.Global.aport1+'/baseinfo/personlist',p,
             r =>{

               if(r.code==1){
                 
                 if(t==1){
                    val.push(r.data[0]);
        
                    const res = new Map();
                    var arr=val;
                    this.dataList[i].lmdata=arr.filter((arr) => !res.has(arr.personId) && res.set(arr.personId, 1))
                    if(this.dataList[i].Number!=1){
                      this.dataList[i].jointpersoncount=this.dataList[i].lmdata.length+'';
                    }

                    this.$set(this.formListN[i],'lmdbid','');
                  }else{
                    this.lpshow=false;
                    this.labellist=r.data[0].tags;
                    
                    this.pd1.representativeid=r.data[0].representativeId;
                    this.pd1.cppcmemberid=r.data[0].cppcMemberId;
                    this.pd1.specialpersonid=r.data[0].specialPersonId;
                    if(r.data[0].address!=null){
                      this.labeladress="地址："+r.data[0].address;
                    }else{
                      this.labeladress="";
                    }
                    this.pd1.pbid=r.data[0].pbId;
                    if(this.labellist.length>0 || this.labeladress)
                    { this.lpshow=true;}
                  }
           }else{
             this.$message.error(r.message);
           }
           });
        },
          ChangeNameList2(i){
          if(this.formListN[i].lmdbid=="" || this.formListN[i].lmdbid==undefined){
             this.$message.error("联名代表、委员、特约人员不能为空!");return;
          }
          var arr=this.formListN[i].lmdbid.split('|');
          var obj = {};
                 obj = this.lmrdata.find(item =>{
                     return item.pbId === arr[0] && item.personId === arr[1]
             });
            var srr=this.dataList[i].lmdata;
            var ff=false;
            for (let j= 0; j < srr.length; j++) {

               if(srr[j].pbId==arr[0])
               {
                 var ff=true;
                this.$confirm(srr[j].personName+'已经存在，是否切换?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                  this.delName(srr[j],this.dataList[i].lmdata,i);
                    this.dataList[i].lmdata.push(obj);
                  if(this.dataList[i].Number!=1){
                      this.dataList[i].jointpersoncount=this.dataList[i].lmdata.length+'';
                    }
                }).catch(() => {
                      
                      this.$message.info('已取消操作');       
                 }); 
               }
                
            }
            if(!ff){
             this.dataList[i].lmdata.push(obj);
             
             if(this.dataList[i].Number!=1){
                this.dataList[i].jointpersoncount=this.dataList[i].lmdata.length+'';
              }
            }
               this.$set(this.formListN[i],'lmdbid','');
          

        },
       
        form1change(val){
          this.multipleSelection=val;
        },
        form1save(){
            this.form1data.push(this.form1);
            this.form1data=this.unique(this.form1data,1);
            this.form1={};
        },
        form1del(n){
                 var arr=[];
                 arr.push(n);
                   for (let i = 0; i < arr.length; i++) {
                     var index = this.form1data.findIndex(item =>{
　　　　　　　　　  　 if(item.id==arr[i].id){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　       this.form1data.splice(index,1)
                   }
        },
        form1submit(){
          if(this.multipleSelection.length==0){
            this.$message.error("请选择一条数据");return
          }else if(this.multipleSelection.length>1){
            this.$message.error("只能选择一条数据");return
          }
        
          this.pd0.letternumber=this.multipleSelection[0].letternumber;
          this.pd0.lettertime=this.multipleSelection[0].lettertime;
          this.pd0.lettertimes=this.multipleSelection[0].lettertimes;
          this.pd0.jointpersoncount=this.multipleSelection[0].jointpersoncount;
          this.pd0.lettercontents=this.multipleSelection[0].lettercontents;
          this.lwDialogVisible=false;
    
        },
        //去重
        unique(arr,t) {
           const res = new Map();
           return arr.filter((arr) => !res.has(arr.letternumber) && res.set(arr.letternumber, 1))
            },
       //当事人及案由
        getdswan(t){
            if(t==null || t==""){
              this.$message.error("请输入当事人及案由信息进行查询!");return;
            }
            this.ayDialogVisible=true;
            let p={
              'partiesandcasereason':t,
              'token':this.$store.state.token,
            };
              this.$api.post(this.Global.aport2+'/CaseRegisterController/getPartiesAndCaseReason',p,
                r =>{
                        this.aydata=r.data;
                });

        },
        rowclick(row){


            // this.pd1=row;
              
              this.$set(this.pd1,'casenum',row.casenum);//案件编号
              this.$set(this.pd1,'caseclass',row.caseclass);//案件类型
              this.$set(this.pd1,'adjudgementphase',row.adjudgementphase);//审理阶段
              this.$set(this.pd1,'casestatus',row.casestatus);//案件状态
              this.$set(this.pd1,'interestrelations',row.interestrelations);//利害关系
              this.$set(this.pd1,'emphasiscase',row.emphasiscase);//是否重点案件
              this.$set(this.pd1,'repeatcase',row.repeatcase);//是否重复案件
              this.$set(this.pd1,'focuscourt',row.focuscourt);//问题针对法院
              this.$set(this.pd1,'focuscourtlevel',row.focuscourtlevel);//涉及法院级别
              this.$set(this.pd1,'notsatisfied',row.notsatisfied);//不服本院

            this.ayDialogVisible=false;
        },
       fatherMethod(data,t){
      
         if(t=='0')
         {
           if(this.dataList[this.datanum].filedata0 && this.dataList[this.datanum].filedata0.length>0){
            
             for (let i = 0; i < data.length; i++) {
               this.dataList[this.datanum].filedata0.push(data[i]);
               
             }
           }else{
           this.dataList[this.datanum].filedata0=data;
           }
         }
         if(t=='1'){
           if(this.filedata1 && this.filedata1.length>0){
             
             for (let i = 0; i < data.length; i++) {
               this.filedata1.push(data[i]);
               
              }
            }else{
            this.filedata1=data;
            }
        
           }
         if(t=='2'){
            if(this.filedata2 && this.filedata2.length>0){
             
             for (let i = 0; i < data.length; i++) {
               this.filedata2.push(data[i]);
               
              }
            }else{
            this.filedata2=data;
            }
          
           }
         if(t=='3'){
           if(this.filedata3 && this.filedata3.length>0){
           
             for (let i = 0; i < data.length; i++) {
               this.filedata3.push(data[i]);
               
              }
            }else{
            this.filedata3=data;
            }
       
         }
         if(t=='4'){
            if(this.filedata4 && this.filedata4.length>0){
            
             for (let i = 0; i < data.length; i++) {
               this.filedata4.push(data[i]);
               
              }
            }else{
            this.filedata4=data;
            }
     
           }
         if(t=='5'){
            if(this.filedata5 && this.filedata5.length>0){
     
             for (let i = 0; i < data.length; i++) {
               this.filedata5.push(data[i]);
               
              }
            }else{
            this.filedata5=data;
            }
        
           }
          if(t=='6'){
              if(this.filedata6 && this.filedata6.length>0){
              
              for (let i = 0; i < data.length; i++) {
                this.filedata6.push(data[i]);
                
                }
              }else{
              this.filedata6=data;
              }
        
            }

            if(t=='7'){
              if(this.filedata7 && this.filedata7.length>0){
              
              for (let i = 0; i < data.length; i++) {
                this.filedata7.push(data[i]);
                
                }
              }else{
              this.filedata7=data;
              }
        
            }

            if(t=='8'){
              if(this.filedata8 && this.filedata8.length>0){
              
              for (let i = 0; i < data.length; i++) {
                this.filedata8.push(data[i]);
                
                }
              }else{
               this.filedata8=data;
              }
        
            }
             
             
             this.uploadDialogVisible = false;
            },
            getUpload(t){
              this.type=t;
              this.uploadDialogVisible=true;
            },
            getlwzh(){
              this.lwDialogVisible=true;
            },
       changesp(){
   
          if(this.spshow==false){
                this.spshow=true;
          }else{
                this.spshow=false;
          }
           

      },
      delName(n,val,i){
          var arr=[];
              arr.push(n);
              
                     var index = val.findIndex(item =>{
　　　　　　　　　  　 if(item.personId==arr[0].personId){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　val.splice(index,1)
           if(this.dataList[i].Number!=1){
                this.dataList[i].jointpersoncount=this.dataList[i].lmdata.length+'';
             }
            
        
      },
       del(n,filedata){
           
            let p={
                  'focusCaseRelFileId':n.focuscaserelfileid,
                  'token':this.$store.state.token,
            };
             this.$api.post(this.Global.aport2+'/CaseRegisterController/delFile',p,
                r =>{

                     var arr=[];
                     arr.push(n);
                    for (let i = 0; i < arr.length; i++) {
                     var index = filedata.findIndex(item =>{
　　　　　　　　　  　 if(item.focuscaserelfileid==arr[i].focuscaserelfileid){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　　　　　　filedata.splice(index,1)
                    }                     
                });
        },
        hddel(n){
                    var arr=[];
                     arr.push(n);
                    for (let i = 0; i < arr.length; i++) {
                     var index = this.tableData3.findIndex(item =>{
　　　　　　　　　  　 if(item.activityInfoId==arr[i].activityInfoId){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
                     this.tableData3.splice(index,1)
                    }
        },
        getList(){
       
        
           if(this.focusCaseId!="" && this.focusCaseId!=undefined && this.focusCaseId!=null){
            let p={
               'focuscaseid':this.focusCaseId,
               'token':this.$store.state.token
            };
          this.$api.post(this.Global.aport2+'/CaseRegisterController/getCaseRegisterInfo',p,
                r =>{
                    if(r.code==1){
                 
                    if(r.data.activityvolist!=null){
                         
                           this.tableData3=r.data.activityvolist;
                        }
                     if(r.data.personinfovolist!=null){
                           this.tableData0=r.data.personinfovolist;
                       }
                      if(r.data.focuscaseinfo!=null){
                        
                        this.pd1=r.data.focuscaseinfo;
                        this.getFY(this.pd1.focuscourt);
                        this.getName(this.pd1.leaderpbid,0);
                       
                            
                            //问题针对法院带入承办单位
                            if(this.pd1.focuscourt!=null && this.pd1.focuscourt!=undefined && this.ctitle=='交办'){
                                this.$set(this.pd2,'undertakingorgid',this.pd1.focuscourt)
                                this.getBM(this.pd2.undertakingorgid,0),this.getFYJB(this.pd2.undertakingorgid,0)
                            }
                       // this.pd0=JSON.parse(JSON.stringify(r.data.caseletterlist[0]));
                       
                        // this.pd1.letternumber=letter.letternumber;
                        // this.pd1.lettertime=letter.lettertime;
                        // this.pd1.lettertimes=letter.lettertimes;
                        // this.pd1.jointpersoncount=letter.jointpersoncount;
                        // this.pd1.lettercontents=letter.lettercontents;
                         this.dataList=r.data.listMap;
                         for (let i = 0; i < this.dataList.length; i++) {
                           if(this.dataList[i].undertakinguserid){
                             this.getJBR(this.dataList[i].undertakinguserid);
                           }
                            this.formList.push({lettertime:'',lettertimes:'',
                            lettersourcetype:'',sourcecourtpersonpbid:'',sourcecourtpersonname:'',lettersourceorgid:'',lettersourcename:'',leadershipinstruction:''});
                            this.formListN.push({lmdbid:''});
                        }
                        if(this.pd1.leaderpbid!="" && this.pd1.leaderpbid!=null){
                          this.lpshow=true;
                          this.ChangeNameListNew(this.pd1.leaderpbid,0);
                        }
                      }
                       // this.form1data=r.data.caseletterlist;
                        //this.filedata0=r.data.relfilelist;

               
                        
                   }else{
                      this.$message.error(r.message);
                    }
                });

    
                //审批
                this.$api.post(this.Global.aport2+'/CaseCheckController/queryCaseCheck',p,
                  r =>{
                     
                      if(r.data.showstatus || this.addtype=='1'){
                        this.pd4=r.data;
                        this.bjsj4=r.data;
                        this.zshow1=true;
                        if(r.data.showstatus){
                          this.spshow=true;
                        }
                      }else{
                        this.zshow1=false;
                      }
                  });
                 
            
                 //交办
                      this.$api.post(this.Global.aport2+'/CaseAssignController/queryCaseAssign',p,
                        r =>{
                           if(this.$store.state.dbnf && this.$store.state.dbnf.length>0){
                              this.pd2.assignyear=this.$store.state.dbnf[0].dm;
                              this.chChangelist(this.pd2.assignyear,3,3)
                            }
                            if(r.data.showstatus && this.addtype=='9'){
                            this.ffshow=true;
                            this.pd2=r.data.bucaseassignvo;
                            this.dbh="第 "+ r.data.bucaseassignvo.assignsort+" 号";
                            if(r.data.filelist.length>0){
                               this.ffshow=false;
                            }
                            
                            // if(this.pd2.undertakingorgid!=null){
                            //    this.getBM(this.pd2.undertakingorgid,0);
                            //    this.getFYJB(this.pd2.undertakingorgid,0)
                            // }
                            
                            if(this.pd2.undertakingsuborgid!=null){
                              this.getCBR('1',this.pd2.undertakingorgid,this.pd2.undertakingsuborgid,0)
                             
                            }

                            if(this.pd2.assignfinishtime!=null && this.pd2.assignfinishtime!=undefined){
                            this.bjsj2=this.pd2.assignfinishtime;}
                            this.filedata6=r.data.filelist;
                              this.zshow2=true;
                            
                            }else{
                              if(this.addtype=='2'){ this.zshow2=true;}else{ this.zshow2=false;}
                            
                            }
                        
                        });
             
               
                //办理
                      this.$api.post(this.Global.aport2+'/CaseHandleController/queryCaseHandle',p,
                        r =>{
                           if(r.data.showstatus && this.addtype=='9'){
                            this.pd5=r.data;
                            if(this.pd5.undertakingorgid!=null){
                               this.getBM(this.pd5.undertakingorgid,1);
                            }
                            if(this.pd5.undertakingsuborgid!=null && this.pd5.undertakingsuborgid!=undefined){
                              this.getCBR(2,this.pd5.undertakingorgid,this.pd5.undertakingsuborgid,0);
                            }
                              this.zshow3=true;
                             
                           }else{
                             if(this.addtype=='3'){this.zshow3=true;}else{this.zshow3=false;}
                             
                           }
                        });
             
             
                    //办结
                      this.$api.post(this.Global.aport2+'/CaseCompletedController/queryCaseCompleted',p,
                        r =>{
                           if(r.data.showstatus && (this.addtype=='9' || this.addtype=='5')){
                            this.pd6=r.data.bufocuscasecompletedvo;
                             this.dfshow=true;
                            if(r.data.filelist.length>0){
                              this.dfshow=false;
                               this.filedata4=r.data.filelist;
                            }
                             this.zshow4=true;
                          
                           }else{
                             if(this.addtype=='4'){ this.zshow4=true;}else{ this.zshow4=false;}
                             
                           }
                           
                        });
                   
                  
                   //复文
                       this.$api.post(this.Global.aport2+'/CaseReplyController/queryCaseReply',p,
                        r =>{
                        if(r.data.showstatus && this.addtype=='9'){
                            this.pd7=r.data.bufocuscasereplyvo;
                             if(this.pd7.replyorgid!=null){
                                this.getBM(this.pd7.replyorgid);
                             }
                            if(this.pd7.replysuborgid!=null){
                               this.getFKR(this.pd7.replyorgid,this.pd7.replysuborgid);
                            }
                              this.hfshow=true;
                          
                            if(r.data.filelist.length>0){
                               this.hfshow=false;
                               this.filedata2=r.data.filelist;
                            }
                            this.zshow5=true;
                          

                            }else{
                              if(this.addtype=='5'){this.zshow5=true;}else{this.zshow5=false;}
                             
                            }
                           
                        });
                   
                 
                    //催办
                      this.$api.post(this.Global.aport2+'/CaseUrgentController/queryCaseUrgent',p,
                        r =>{
                              if(r.data.showstatus && this.addtype=='9'){
                              this.pd8=r.data;
                              this.zshow6=true;
                             
                            }else{
                              if(this.addtype=='6'){
                                  this.zshow6=true;
                              }else{
                                 this.zshow6=false;
                              }
                             
                            }
                           
                        });
                   
              }else{
               
                  if(this.$store.state.jid!=null){
                      this.$set(this.pd1,"session",this.$store.state.jid);
                  }
                  if(this.$store.state.cid!=null){
                      this.$set(this.pd1,"times",this.$store.state.cid);
                  }
                
                  if(this.$store.state.pbid!=null){
                    this.getJBR(this.$store.state.pbid,1);//经办人
                  }

              }
             
              
      

        },
        reset(){
            this.tableData0=[];
            this.filedata0=[];
            this.filedata1=[];
            this.filedata2=[];
            this.filedata3=[];
            this.filedata4=[];
            this.filedata5=[];
            this.filedata6=[];
            this.dataList=[{
              letternumber:'',undertakinguserid:'',jointpersoncount:'',Number:0,
              receivingtime:'',lwdata:[],lmdata:[],filedata0:[],reflectnum:'',
             }]
             this.formList=[{lettertime:'',lettertimes:'',
             lettersourcetype:'',sourcecourtpersonpbid:'',
             sourcecourtpersonname:'',
             lettersourceorgid:'',lettersourcename:'',
             leadershipinstruction:''}]
             this.formListN=[{lmdbid:''}]
            this.pd0={};
            this.pd1={isinterestrelations:'0'};
            this.pd2={undertakingsuborgid:'',undertakinguserid:''};
            this.pd3={};
            this.pd4={};
            this.pd5={undertakingsuborgid:'',undertakinguserid:''};
            this.pd6={outcompletedtime:'0',iscompleted:'0'};
            this.pd7={};
            this.pd8={};
            this.pd={};
            this.tableData3=[];
            this.form1={};
            this.form1data=[];
            this.editshow=false;
            this.ckshow=false;
            this.lpshow=false;
            this.spshow=false;
            this.fyrdata=[];
            this.baseid=null;
            this.jdbm=[];
            this.zshow1=false;
            this.zshow2=false;
            this.zshow3=false;
            this.zshow4=false;
            this.zshow5=false;
            this.zshow1=false;
            this.fkdata=[];
            this.dblbdata=[];
            this.lableList=[];
            this.labeladress="";


        },
        submit(){

          var url="";
              let p={};
           switch (this.addtype) {
             case '0':
            if(this.pd1.leaderpbid==undefined || this.pd1.leaderpbid=="")
              {
                  this.$message.error("来文人姓名不能为空！");return;
              }
             if(this.pd1.session==undefined || this.pd1.session=="")
              {
                  this.$message.error("届不能为空！");return;
              }
              if(this.pd1.times==undefined || this.pd1.times=="")
              {
                  this.$message.error("次不能为空！");return;
              }
              if(this.pd1.reflectnum==undefined || this.pd1.reflectnum=="")
              {
                  this.$message.error("反映次数不能为空！");return;
              }
              if(this.dataList[0].letternumber==undefined || this.dataList[0].letternumber=="")
              {
                  this.$message.error("来文字号不能为空！");return;
              }
               if(this.dataList[0].receivingtime==undefined || this.dataList[0].receivingtime=="")
              {
                  this.$message.error("收文时间不能为空！");return;
              }
               if(this.dataList[0].undertakinguserid==undefined || this.dataList[0].undertakinguserid=="")
              {
                  this.$message.error("经办人不能为空！");return;
              }
               if(this.dataList[0].lettercontents==undefined || this.dataList[0].lettercontents=="")
              {
                  this.$message.error("来文要求不能为空！");return;
              }
               if(this.dataList[0].lwdata==undefined || this.dataList[0].lwdata=="")
              {
                  this.$message.error("来文来源列表不能为空！");return;
              }
               if(this.dataList[0].filedata0==undefined || this.dataList[0].filedata0=="")
              {
                  this.$message.error("来信内容附件不能为空！");return;
              }

             if(this.pd1.caseclass==undefined || this.pd1.caseclass=="")
              {
                  this.$message.error("案件类型不能为空！");return;
              }
              if(this.pd1.adjudgementphase==undefined || this.pd1.adjudgementphase=="")
              {
                  this.$message.error("审理阶段不能为空！");return;
              }
               if(this.pd1.casestatus==undefined || this.pd1.casestatus=="")
              {
                  this.$message.error("案件状态不能为空！");return;
              }
              //  if(this.pd1.interestrelations==undefined || this.pd1.interestrelations=="")
              // {
              //     this.$message.error("利害关系不能为空！");return;
              // }
               if(this.pd1.emphasiscase==undefined || this.pd1.emphasiscase=="")
              {
                  this.$message.error("是否重点案件不能为空！");return;
              }
               if(this.pd1.repeatcase==undefined || this.pd1.repeatcase=="")
              {
                  this.$message.error("是否重复案件不能为空！");return;
              }
                if(this.pd1.focuscourt==undefined || this.pd1.focuscourt=="")
              {
                  this.$message.error("问题针对法院不能为空！");return;
              }
              if(this.pd1.focuscourtlevel==undefined || this.pd1.focuscourtlevel=="")
              {
                  this.$message.error("涉及法院级别不能为空！");return;
              }
              if(this.pd1.notsatisfied==undefined || this.pd1.notsatisfied=="")
              {
                  this.$message.error("不服本院不能为空！");return;
              }
               if(this.pd1.partiesandcasereason==undefined || this.pd1.partiesandcasereason=="")
              {
                  this.$message.error("当事人及案由不能为空！");return;
              }


              //报批信息
               if(this.pd1.informationoperation==undefined || this.pd1.informationoperation=="")
               {
                  this.$message.error("信息操作不能为空！");return;
               }
               //领导审核
                if(this.pd1.informationoperation=='0199000011'){
                    
                     if(this.pd1.checkuserid==undefined || this.pd1.checkuserid=="")
                      {
                          this.$message.error("审批领导不能为空！");return;
                      }
                }else if(this.pd1.informationoperation=='0199000012'){
                  if(this.bppd.checkcontents==undefined || this.bppd.checkcontents=="")
                      {
                          this.$message.error("审批意见不能为空！");return;
                      }
                  if(this.bppd.checkuserid==undefined || this.bppd.checkuserid=="")
                      {
                          this.$message.error("审批人不能为空！");return;
                      }
                  if(this.bppd.checkresult==undefined || this.bppd.checkresult=="")
                      {
                          this.$message.error("审批结果不能为空！");return;
                      } 
                }

               url='/CaseRegisterController/saveCaseRegisterInfo';
                // this.pd1.letternumber=this.pd0.letternumber;
                // this.pd1.lettertime=this.pd0.lettertime;
                // this.pd1.lettertimes=this.pd0.lettertimes;
                // this.pd1.jointpersoncount=this.pd0.jointpersoncount;
                // this.pd1.lettercontents=this.pd0.lettercontents;
                var keyname="";
                var keycontent="";
                var arr=this.datanum+1;
                for (let i = 0; i < arr; i++) {
                        keyname+="dataList"+i+','; 
                        keycontent +="'dataList"+i+"':"+JSON.stringify(this.dataList[i])+",";          
                }
              if(keyname!='' && keycontent!=''){
                    keyname=keyname.substr(0,keyname.length-1);
                    keycontent=keycontent.substr(0,keycontent.length-1);
              }


                 this.bppd.isassign='0218000001';
                 var arr=[];
                 for (let i = 0; i < this.filedata7.length; i++) {
                   arr.push(this.filedata7[i]);
                 }
                 for (let i = 0; i < this.filedata8.length; i++) {
                   arr.push(this.filedata8[i]);
                 }
                this.bppd.filelist=arr;
                 

              p={
                  'token':this.$store.state.token,
                  'year':this.year,
                  'keyname':keyname,
                  'keylist':keycontent,
                  'focuscaseid':this.focusCaseId,
                  'activityvolist':this.tableData3,
                  'relfilelist':this.filedata0,
                  'focuscaseinfo':this.pd1,
                  'caseletterandsource':this.form1data,
                  'bufocuscasejointperson':this.tableData0,
                  'approvalinfo':this.bppd,
                  };        
               break;
             case '1':
            if(this.pd4.checkcontents==undefined || this.pd4.checkcontents=="")
              {
                  this.$message.error("审批意见不能为空！");return;
              }
            if(this.pd4.checkuserid==undefined || this.pd4.checkuserid=="")
              {
                  this.$message.error("审批人不能为空！");return;
              }
           if(this.pd4.checkresult==undefined || this.pd4.checkresult=="")
              {
                  this.$message.error("审批结果不能为空！");return;
              }
            if(this.pd4.checktime==undefined || this.pd4.checktime=="")
              {
                  this.$message.error("审批时间不能为空！");return;
              }

                 url='/CaseCheckController/saveCaseCheck';
                 this.pd4.isassign='0218000001';
              p={
                  'token':this.$store.state.token,
                  'focuscaseid':this.focusCaseId,
                  'focuscasecheck':this.pd4,
                  'activityvolist':this.tableData3,
                  };        
               break;
            case '2':
              if(this.pd2.assigntime==undefined || this.pd2.assigntime=="")
              {
                  this.$message.error("转办时间不能为空！");return;
              }
              if(this.bjsj2==undefined || this.bjsj2=="")
              {
                  this.$message.error("应办结时间不能为空！");return;
              }
              if(this.pd2.undertakingorgid==undefined || this.pd2.undertakingorgid=="")
              {
                  this.$message.error("承办单位不能为空！");return;
              }
               if(this.pd2.undertakingsuborgid==undefined || this.pd2.undertakingsuborgid=="")
              {
                  this.$message.error("承办部门不能为空！");return;
              }
            if(this.pd2.undertakinguserid==undefined || this.pd2.undertakinguserid=="")
              {
                  this.$message.error("承办人不能为空！");return;
              }
                 url='/CaseAssignController/saveCaseAssign';
                 this.pd2.assignfinishtime=this.bjsj2;
                
                 var arr=[];
                 for (let i = 0; i < this.filedata6.length; i++) {
                   arr.push(this.filedata6[i]);
                 }
                  for (let i = 0; i < this.filedata1.length; i++) {
                   arr.push(this.filedata1[i]);
                 }
                  for (let i = 0; i < this.filedata5.length; i++) {
                   arr.push(this.filedata5[i]);
                 }
                 p={
                  'token':this.$store.state.token,
                  'focuscaseid':this.focusCaseId,
                  'focuscaseassign':this.pd2,
                  'filelist':arr,
                  'activityvolist':this.tableData3,
                  };   
               break;
              case '3':
             if(this.pd5.undertakingorgid==undefined || this.pd5.undertakingorgid=="")
              {
                  this.$message.error("承办单位不能为空！");return;
              }
              if(this.pd5.undertakingsuborgid==undefined || this.pd5.undertakingsuborgid=="")
              {
                  this.$message.error("承办部门不能为空！");return;
              }
            if(this.pd5.undertakinguserid==undefined || this.pd5.undertakinguserid=="")
              {
                  this.$message.error("承办人不能为空！");return;
              }
            if(this.pd5.handletime==undefined || this.pd5.handletime=="")
              {
                  this.$message.error("承办时间不能为空！");return;
              }
                 url='/CaseHandleController/saveCaseHandle';
                 p={
                  'token':this.$store.state.token,
                  'focuscaseid':this.focusCaseId,
                  'casehandle':this.pd5,
                  'activityvolist':this.tableData3,
                  };   
               break;
              case '4'://办结信息
                
               
                  if(this.pd6.iscompleted && this.pd6.replynature && this.pd6.replynature && !(this.pd6.iscompleted=='0' && this.pd6.isreply=='1' && this.pd6.replynature=='0124000001')){
                     this.$message.error("如果'是否办结'选择'否'，并且'是否答复'选择'是'，则答复性质为'进展性'!");return;
                  }else if(this.pd6.iscompleted && this.pd6.replynature && !(this.pd6.iscompleted=='1' && this.pd6.replynature=='0124000002')){
                      this.$message.error("如果'是否办结'选择'是'，答复性质为'实体性'!");return;
                  }


                 url='/CaseCompletedController/saveCaseCompleted';
                 p={
                  'token':this.$store.state.token,
                  'focuscaseid':this.focusCaseId,
                  'casecompleted':this.pd6,
                  'filelist':this.filedata4,
                  'activityvolist':this.tableData3,
                  };   
               break;
               case '5':
                 url='/CaseReplyController/saveCaseReply';
                 p={
                  'token':this.$store.state.token,
                  'focuscaseid':this.focusCaseId,
                  'casereply':this.pd7,
                  'filelist':this.filedata2,
                  'activityvolist':this.tableData3,
                  };   
               break;
               case '6'://催办
                 url='/CaseUrgentController/saveCaseUrgent';
                 p={
                  'token':this.$store.state.token,
                  'focuscaseid':this.focusCaseId,
                  'caseurgent':this.pd8,
                  };   
               break;
             default:
               break;
           }
          this.$api.post(this.Global.aport2+url,p,
                r =>{
                    if(r.code==1){
                         
                           this.$message.success(r.message);    
                          this.goto();

                    }else{
                      this.$message.error(r.message);
                    }
                });
        },
        goto(){
         
             if(this.baseid!=null){
                   var arr=this.baseid.split('|');
                  
                   this.$router.push({name:'BaseAdd',query:{type:arr[0],status:arr[1],pbid:arr[2],reid:arr[3],wtitle:arr[4]==''?'11':arr[4]}});
                }else{
                    this.$router.push({name:"CaseList",query:{year:this.year}});
              }
        },
        downData(n){
          // window.location.href=n.filepath;
          var alink = document.createElement("a");
          alink.href = n.filepath
          // alink.download = n.filename
          // alink.click();
          alink.setAttribute('download',n.filename)
          document.body.appendChild(alink)
          alink.click()
        },
        addhd(){
          this.addDialogVisible=true;
        },
        goadd(){
            this.addDialogVisible=false;
            if(this.hdtype==1){
            this.$router.push({name:'PairAdd',query:{type:this.hdtype}});
            }else{
            this.$router.push({name:'SpecialAdd',query:{type:this.hdtype}});
            }
        },
        addLWXX(n,val,i){

             if(this.formList[i].lettertime==null || this.formList[i].lettertime=="")
             {
               this.$message.error("来文时间不能为空！");return;
             }
             if(this.formList[i].lettertimes==null || this.formList[i].lettertimes=="")
             {
               this.$message.error("来文期间不能为空！");return;
             }
             if(this.formList[i].lettersourcetype=='0158000001'){
                
                if(this.formList[i].sourcecourtpersonpbid==null || this.formList[i].sourcecourtpersonpbid==""){
                   this.$message.error("来源法院人员不能为空！");return;
                }
                if(this.formList[i].leadershipinstruction==null || this.formList[i].leadershipinstruction==""){
                   this.$message.error("领导批示不能为空！");return;
                }

             }else if(this.formList[i].lettersourcetype=='0158000002'){
                 if(this.formList[i].lettersourceorgid==null || this.formList[i].lettersourceorgid==""){
                   this.$message.error("来源组织不能为空！");return;
                }
             }
             if(val.length>0){
               var  ff=true;
                for (let j = 0; j < val.length; j++) {
                  
                  if(n.lettertime==val[j].lettertime && n.lettertimes==val[j].lettertimes && n.lettersourcetype==val[j].lettersourcetype && n.sourcecourtpersonpbid==val[j].sourcecourtpersonpbid && n.lettersourceorgid==val[j].lettersourceorgid){
                     ff=false;
                  }
                }
            if(ff){
                 val.push(Object.assign({},n));
               }
             }else{
                val.push(Object.assign({},n));
             }

          if(this.Fynum!=1){
             this.$set(this.pd1,'reflectnum',val.length); 
          }

             this.formList[i].lettertime="";
             this.formList[i].lettertimes="";
             this.formList[i].lettersourcetype="";
             this.formList[i].sourcecourtpersonpbid="";
             this.formList[i].leadershipinstruction="";
             this.formList[i].lettersourceorgid="";
             this.formList[i].lettertimesname="";
             this.formList[i].lettersourcetypename="";
             this.formList[i].sourcecourtpersonpbidname="";
             this.formList[i].lettersourceorgidname="";
            //  if(i==0){
            //  this.formList=[{lettertime:'',lettertimes:'',
            //  lettersourcetype:'',sourcecourtpersonpbid:'',
            //  sourcecourtpersonname:'',
            //  lettersourceorgid:'',lettersourcename:'',
            //  leadershipinstruction:''}]
            //  }
        },
        lwdel(n,val){
           var arr=[];
                     arr.push(n);
                    for (let i = 0; i < arr.length; i++) {
                     var index = val.findIndex(item =>{
　　　　　　　　　  　 if(item.lettertime==arr[i].lettertime 
                       && item.lettertimes==arr[i].lettertimes
                        && item.lettersourcetype==arr[i].lettersourcetype
                        && item.sourcecourtpersonpbid==arr[i].sourcecourtpersonpbid
                        && item.lettersourceorgid==arr[i].lettersourceorgid
                       ){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
                    val.splice(index,1)
                    }
             if(this.Fynum!=1){   
                this.pd1.reflectnum=val.length;
              }
        },
        addform(){
          this.dataList.push({letternumber:'',undertakinguserid:'',jointpersoncount:'',receivingtime:'',lwdata:[],lmdata:[],filedata0:[],reflectnum:'',
             });
           this.formList.push({lettertime:'',lettertimes:'',
             lettersourcetype:'',sourcecourtpersonpbid:'',sourcecourtpersonname:'',lettersourceorgid:'',lettersourcename:'',leadershipinstruction:''});
           this.formListN.push({lmdbid:''});
          this.datanum++;
        },
        delform(){
           this.datanum--;
        },
        //得到督办号
        getDBH(n,t){
          if(n=="" || n==null){
            this.$set(this.pd2,'assignyear','')
            this.$set(this.pd2,'assigntype','')
            this.$set(this.pd2,'assigninformno','')
            this.dbh='';
            return;
          }
          if(t==0){
              // if(this.pd2.assignyear==undefined || this.pd2.assignyear==''){
              //   this.$message.error("请选择督办年份!");return;
              // }
          }else if(t==1){
             if(this.pd2.assigntype==undefined || this.pd2.assigntype==''){
                this.$message.error("请选择督办类别!");return;
              }
          }

          let p={
            "assignyear":this.pd2.assignyear,
            "assigntype":this.pd2.assigntype,
            "token":this.$store.state.token
          };
             this.$api.post(this.Global.aport1+'/CaseAssignController/queryAssignSort',p,
                r =>{
                    if(r.code==1){
                      if(r.data!=undefined && r.data!='') {
                          this.dbh="第 "+r.data+" 号";
                          this.pd2.assignsort=r.data;
                      
                          
                          this.pd2.assignno=this.pd2.assigntypename+"( "+this.pd2.assignyearname+" ) 第"+r.data+"号";;
                          this.pd2.assigninformno=this.pd2.assigntypename.replace("函","")+"( "+this.pd2.assignyearname+" ) 第"+r.data+"号";
                        }
                    }
                });
        },

        //得到督办号
        getDBHBP(n,t){
          if(n=="" || n==null){
            this.$set(this.bppd,'assignyear','')
            this.$set(this.bppd,'assigntypeno','')
            this.$set(this.bppd,'assigninformno','')
            this.dbhbp='';
            return;
          }
          if(t==0){
              if(this.bppd.assignyear==undefined || this.bppd.assignyear==''){
                this.$message.error("请选择督办年份!");return;
              }
          }else if(t==1){
             if(this.bppd.assigntypeno==undefined || this.bppd.assigntypeno==''){
                this.$message.error("请选择督办类别!");return;
              }
          }
 
          let p={
            "assignyear":this.bppd.assignyear,
            "assigntype":this.bppd.assigntypeno,
            "token":this.$store.state.token
          };
          var obj = {};
                      obj = this.dblbdata.find(item =>{
                          return item.dm === this.bppd.assigntypeno 
                      });

          this.bppd.assigntypename = obj.mc

           var obj1 = {};
                      obj1 = this.$store.state.dbnf.find(item =>{
                          return item.dm === this.bppd.assignyear 
                      });
             this.bppd.assignyearname = obj1.mc;

            
             this.$api.post(this.Global.aport1+'/CaseAssignController/queryAssignSort',p,
                r =>{
                    if(r.code==1){
                      if(r.data!=undefined && r.data!='') {
                          this.dbhbp="第 "+r.data+" 号";
                          this.bppd.assignsort=r.data;
                      
                          this.bppd.assignno=this.bppd.assigntypename+"( "+this.bppd.assignyearname+" ) 第"+r.data+"号";;
                          this.bppd.assigninformno=this.bppd.assigntypename.replace("函","")+"( "+this.bppd.assignyearname+" ) 第"+r.data+"号";
                        }
                    }
                });
        },
        //承办部门
        getcbbm(){
          let p={
            "orgId":this.$store.state.orgid
          };
             this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                r =>{
                    if(r.code==1){
                        this.cbbm=r.data;
                      
                    }
                });
        },
        //部门
        getBM(orgid,t){
               switch (t) {
                          case 0:
                              this.pd2.undertakingsuborgid="";
                              this.pd2.undertakinguserid="";
                              this.cbrdata1=[];
                            break;
                         case 1:
                              this.pd5.undertakingsuborgid="";
                              this.pd5.undertakinguserid="";
                              this.cbrdata2=[];
                            break;
                          case 2:
                             
                              this.$set(this.pd7,'replysuborgid',"");
                              this.$set(this.pd7,'replyuserid',"");
                            break;
                          default:
                            break;
                        }
                        if(orgid==''){
                          this.jdbm=[];
                          return;
                        }
          let p={
            "orgId":orgid
          };
             this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                r =>{
                    if(r.code==1){

                   
                         this.jdbm=r.data;
                    }
                });
        },
        //承办单位
        getcbdw(){// /org/getUndertakeUnit
          let p={
            "orgid":this.$store.state.orgid
          };
          // /org/getUndertakeOrg  原承办单位接口
             this.$api.post(this.Global.aport1+'/org/getUndertakeUnits',p,
                r =>{
                    if(r.code==1){
                        this.cbdw=r.data;
                    }
                });
        },
         //承办单位远程搜索
      cbdwremoteMethod(quer){
          if (quer != '') {
             let p={
                "orgid":this.$store.state.orgid,
                'name':quer,
            };
            this.$api.post(this.Global.aport1+'/org/getUndertakeUnits',p,
                  r =>{
                      if(r.code==1){
                        this.cbdwload=r.data;
                        if(this.cbdwload.length>this.jznum){
                          this.bs=0;
                          this.cbdw=this.cbdwload.slice(0,this.jznum);
                        }else{
                          this.bs=1;
                          this.cbdw=this.cbdwload;
                        }
                      }
                  });
         }else{
            this.cbdw=[];
       
         } 

        },
        //承办单位加载
       cbdwloadmore() {
          if(this.bs==1){return;}
           var srr= this.cbdwload;
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.cbdw = srr.filter((item, index, arr) => {
              return index < num;
            });
        },
        


        getFYJB(val,t){
        
          
          if(val==''){

                    if(t==0){
                        this.$set(this.pd2,"undertakingorglevel","")
                      }else if(t==1){
                        this.$set(this.pd1,"focuscourtlevel","")
                    }
             return;
             }
          switch (t) {
            case 0:
              var obj = {};
                      obj = this.cbdw.find(item =>{
                          return item.orgid === val 
                      });
                  
                   this.pd2.undertakingorglevel = obj.lvl
              break;
             case 1:
              var obj = {};
                      obj = this.fydwdata.find(item =>{
                          return item.orgid === val 
                      });
                   
                   this.pd1.focuscourtlevel = obj.lvl
              break;
          
            default:
              break;
          }
             
        },
        //问题针对法院 法院单位
        getFY(val){
          let p={
            'name':''
          };
          this.$api.get(this.Global.aport1+'/org/getCourtOrg',p,
                r =>{
                    if(r.code==1){
                         var arr = r.data.filter(item=>{
                                return item.orgid.indexOf(val) + 1
                              });
                       
                        this.fydwdata=arr;
                        this.$set(this.pd1,'focuscourt',val)
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



        //获取承办人  经办人 d单位  b部门 
        getCBR(t,d,b,m){
             let p={
               'orgId':d,
               'subOrgId':b,
             };
            this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
                r =>{
                    if(r.code==1){
                      if(t==1){//1交办
                       if(m!=0){
                        this.pd2.undertakinguserid='';
                        }

                        this.cbrdata1=r.data;
                       
                      }else if(t==2){ //2办理
                       if(m!=0){
                      this.pd5.undertakinguserid='';
                       }
                          this.cbrdata2=r.data;
                      }
                    }
                });
           
              
         },
         //经办人
         getJBR(val,t){
              let p={
               'orgId':this.$store.state.orgid,
               'subOrgId':'',
             };
            this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
                r =>{
                    if(r.code==1){
                   
                            this.jdrload=r.data;
                             var arr = this.jdrload.filter(item=>{
                                return item.pbId.indexOf(val) + 1
                              });
                            this.jbrdata=arr;
                            this.$set(this.dataList[0],"undertakinguserid",val);
                           

                          
                    }
                });
         },
       
          //经办人远程搜索
      jdrremoteMethod(quer){
          if (quer != '') {
             let p={
                'orgId':this.$store.state.orgid,
                'personName':quer,
            };
            this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
                  r =>{
                      if(r.code==1){
                        this.jdrload=r.data;
                        if(this.jdrload.length>this.jznum){
                          this.bs=0;
                          this.jbrdata=this.jdrload.slice(0,this.jznum);
                        }else{
                          this.bs=1;
                          this.jbrdata=this.jdrload;
                        }
                      }
                  });
         }else{
            this.jbrdata=[];
       
         } 

        },
        //经办人加载
       jbrloadmore() {
          if(this.bs==1){return;}
           var srr= this.jdrload;
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.jbrdata = srr.filter((item, index, arr) => {
              return index < num;
            });
        },

                  //经办人远程搜索
      fyrremoteMethod(quer){
          if (quer != '') {
             let p={
                'orgId':this.$store.state.orgid,
                'personName':quer,
            };
            this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
                  r =>{
                      if(r.code==1){
                        this.fyrload=r.data;
                        if(this.fyrload.length>this.jznum){
                          this.bs=0;
                          this.fyrdata=this.fyrload.slice(0,this.jznum);
                        }else{
                          this.bs=1;
                          this.fyrdata=this.fyrload;
                        }
                      }
                  });
         }else{
            this.fyrdata=[];
       
         } 

        },
        //经办人加载
       fyrloadmore() {
          if(this.bs==1){return;}
           var srr= this.fyrload;
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.fyrdata = srr.filter((item, index, arr) => {
              return index < num;
            });
        },




          getFKR(orgid,subid){
              let p={
               'orgId':orgid==null?this.$store.state.orgid:orgid,
               'subOrgId':subid,
                'isLeader':'0'
             };
            this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
                r =>{
                    if(r.code==1){
                      
                          this.fkdata=r.data;
                      
                    }
                });
          },
          //来源组织
         getLYZZ(){
            let p={
              'name':''
            };
            this.$api.post(this.Global.aport1+'/org/getSourceOrg',p,
                r =>{
                    if(r.code==1){
                      
                          this.lyzzdata=r.data;
                      
                    }
                });
          },
          
           //来源组织远程搜索
      lyzzremoteMethod(quer){
          if (quer != '') {
             let p={
                'mc':quer,
            };
            this.$api.post(this.Global.aport1+'/org/getSourceOrg',p,
                  r =>{
                      if(r.code==1){
                        this.lyzzload=r.data;
                        if(this.lyzzload.length>this.jznum){
                          this.bs=0;
                          this.lyzzdata=this.lyzzload.slice(0,this.jznum);
                        }else{
                          this.bs=1;
                          this.lyzzdata=this.lyzzload;
                        }
                      }
                  });
         }else{
            this.lyzzdata=[];
       
         } 

        },
        //来源组织加载
       lyzzloadmore() {
          if(this.bs==1){return;}
           var srr= this.lyzzload;
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.lyzzdata = srr.filter((item, index, arr) => {
              return index < num;
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
        getdic(n){
         
                 this.dicdata.tablename=n;
                 this.dicDialogVisible=true;
          },
        dicfatherMethod(t){
          if(t=='1'){
              
          }
         this.dicDialogVisible=false;
        },
        chChangelist(val,t,n){
          if(val=='' || val==null){
            return;
          }
          if(n==0){
            var obj = {};
                      obj = this.$store.state.lwqj.find(item =>{
                          return item.dm === val 
                      });
                      this.formList[t].lettertimesname = obj.mc
          }else if(n==1){
            var obj = {};
                      obj = this.$store.state.lwlylb.find(item =>{
                          return item.dm === val 
                      });
                      this.formList[t].lettersourcetypename = obj.mc
          }
          else if(n==2){
            var obj = {};
                      obj = this.dblbdata.find(item =>{
                          return item.dm === val 
                      });
                      this.pd2.assigntypename = obj.mc
          }
          else if(n==3){
                  var obj = {};
                      obj = this.$store.state.dbnf.find(item =>{
                          return item.dm === val 
                      });
                      this.pd2.assignyearname = obj.mc
          }
           else if(n==4){
            var obj = {};
                      obj = this.fyrdata.find(item =>{
                          return item.pbId === val 
                      });
                      this.formList[t].lettersourceorgidname="";
                      this.formList[t].sourcecourtpersonpbidname = obj.fullName
          }
           else if(n==5){
             var obj = {};
                      obj = this.lyzzdata.find(item =>{
                          return item.orgid === val 
                      });
                      this.formList[t].sourcecourtpersonpbidname="";
                      this.formList[t].lettersourceorgidname = obj.mc
          }else if(n==6){
             var obj = {};
             obj = this.jbrdata.find(item =>{
                    return item.courtPersonId === val 
               });

           
               if(obj){
                this.pd1.checkorgid = obj.orgId
                this.pd1.checksuborgid = obj.subOrgId
             }
          }else  if(n==7){
            var obj = {};
                      obj = this.dblbdata.find(item =>{
                          return item.dm === val 
                      });
                      this.bppd.assigntypename = obj.mc
          }
          else if(n==8){
               var obj = {};
                  obj = this.$store.state.dbnf.find(item =>{
                      return item.dm === val 
                   });
             this.bppd.assignyearname = obj.mc
          }
        },
        //关注案件在办结界面选择办结时间是自动计算是否期限内办结和超期时间
        getCQSJ(val){
            this.$set(this.pd6,'isintimecompleted','');
              this.$set(this.pd6,'outcompletedtime','');
                 let p={
                  'focuscaseid':this.focusCaseId,
                  'completedtime':val,
                  'token':this.$store.state.token
              };
           this.$api.post(this.Global.aport1+'/CaseCompletedController/completedTimeToCaseAssignFinishTime',p,
                r =>{
                    if(r.code==1){
                      
                          if(r.data.isintimecompleted!=''){
                            this.$set(this.pd6,'isintimecompleted',r.data.isintimecompleted);
                          }
                           if(r.data.outcompletedtime!=''){
                            this.$set(this.pd6,'outcompletedtime',r.data.outcompletedtime);
                          }
                      
                    }
                });
        },

        getDBLB(){
           this.$api.post(this.Global.aport1+'CaseAssignController/queryAssigndictionary',null,
                r =>{
                    if(r.code==1){
                        if(r.data){
                          
                             this.$api.get(this.Global.aport4+this.Global.zddz+r.data,null,
                             rr =>{
                              
                                  this.dblbdata=ToArray(rr.data);
                             })
                        }
                    }
                });
        },
        getIswith(val,m){
            if(val=='1'){
              this.$set(this.pd6,'replynature','0124000002');
            }else if(val=='0' && m=='1'){
              this.$set(this.pd6,'replynature','0124000001');
            }
        },
        getIslhgx(val){
          if(val){
            this.$set(this.pd1,'isinterestrelations','1')
          }else{
            this.$set(this.pd1,'isinterestrelations','0')
          }
        },
        ISassign(t){
                  
          if(t=='0217000001'){
              this.getDBLB();
              if(this.$store.state.dbnf && this.$store.state.dbnf.length>0){
                  
                    this.$set(this.bppd,"assignyear",this.$store.state.dbnf[0].dm);
              }
              this.gzshow=true
          }else{
            this.gzshow=false;
          }
        },
        getfocus(t){
          switch (t) {
           case 1:
              this.xmdata=[];
              break;
           case 2:
              this.jbrdata=[];
              break;
           case 3:
              this.fydwdata=[];
              break;
            default:
              break;
          }
        }
      
    },
    filters:{
        filertype(t){
          switch (t) {
            case '0':
              return "来信内容";
              break;
           case '1':
              return "转办函";
              break;
          case '2':
              return "回复函";
              break;
          case '3':
              return "统稿函";
              break;
          case '4':
              return "答复函";
              break;
          case '5':
              return "告知函";
              break;
          case '6':
              return "提请立案流转单";
              break;
            default:
              break;
          }
        },
      }

}
</script>
<style scoped>
.txtw{width: 10%!important;min-width: 80px;}
.inputw{width: 18%!important;}
.txtc{width:23%!important;}

.yy-input-text{width:33%;}
</style>