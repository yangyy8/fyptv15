<template>
      <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 办理工作 <span class="mlr_10">/</span>  <b>{{casename}}</b></span> </div>
         <div class="content">
               <!-- 来文信息 -->
                <div class="ptitle mb-20">来文信息</div>
                <div class="pborder" >
                     <el-row class="ah-40">
                      <el-col :span="8">
                           <span class="yy-input-text">来文字号</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd0.letternumber"  class="yy-input-input" ></el-input>
                        <i class="el-icon-search cursor" @click="getlwzh()"></i>
                      </el-col>
                       <el-col :span="8">
                           <span class="yy-input-text">来(发)文时间</span>
                           <el-date-picker class="yy-input-input"
                           v-model="pd0.lettertime" format="yyyy-MM-dd"
                           type="date" size="small" value-format="yyyy-MM-dd"
                           placeholder="开始时间" >
                        </el-date-picker>
                      </el-col>
                       
                        <el-col :span="8">
                        <span class="yy-input-text">来文期间</span>
                        <el-select v-model="pd0.lettertimes" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.lwqj"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
                      </el-col>
                        <el-col :span="8" class="input-item">
                        <span class="yy-input-text" style="width:28%">届次</span>
                        <div  class="yy-input-input">
                        <el-select v-model="pd1.session" filterable clearable default-first-option placeholder="请选择届"  size="small" style="width:48%">
                         <el-option
                           v-for="(item,ind) in $store.state.jb"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> 
                        <!-- <span class="lfont">届</span> -->
                        <el-select v-model="pd1.times" filterable clearable default-first-option placeholder="请选择次"  size="small" style="width:48%">
                         <el-option
                           v-for="(item,ind) in $store.state.cb"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> 
                        <!-- <span class="lfont">次</span> -->
                        </div>
                      </el-col>
                      <!-- <el-col :span="8">
                        <span class="yy-input-text">来文单位</span>
                          <el-cascader
                          v-model="pd1.lettersourceorgid"
                          :options="lydwdata"
                          :show-all-levels="false"
                          :props="{ checkStrictly: true }"
                          clearable size="small" class="yy-input-input"></el-cascader>
                      </el-col> -->
                     
                    </el-row>
                    <el-row class="ah-40">
                         <el-col :span="8">
                        <span class="yy-input-text">来文人姓名</span>
                        <el-select v-model="pd1.leaderpbid" @change="ChangeNameList(pd1.leaderpbid,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in xmdata"
                           :key="ind"
                           :label="item.personName"
                           :value="item.personId">
                           </el-option>
                        </el-select>
                      </el-col>
                        <el-col :span="16"  v-if='lpshow'>
                              <el-tag v-for="(value,key) in labellist" :key="key" style="margin-right:10px;">{{value}}</el-tag>
                              <span>地址：{{labeladress}}</span>
                        </el-col>
                     
                    </el-row>
                    <el-row class="ah-50">
                        <el-col :span="12" v-if="addtype=='0'">
                        <span class="yy-input-text" title="联名代表、委员、特约人员">联名代表、委员、特约人员 </span>
                        <el-select v-model="lmdbid" @change="ChangeNameList(lmdbid,1)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                          <el-option
                           v-for="(item,ind) in xmdata"
                           :key="ind"
                           :label="item.personName"
                           :value="item.personId">
                           </el-option>
                        </el-select>
                        </el-col>
                        <el-col :span="12">
                            <span class="yy-input-text" style="width:18%!important">联名人数</span>
                           <el-input placeholder="" size="small" clearable v-model="pd0.jointpersoncount"  class="yy-input-input inputw" ></el-input> 
                        </el-col>
                        <el-col :span="24">
                            <el-table
                            ref="multipleTable"
                            :data="tableData0">
                            <el-table-column
                                type="index"
                                label="序号">
                            </el-table-column>
                             <el-table-column
                                prop="personName"
                                label="姓名">
                            </el-table-column>
                            <el-table-column
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
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="delName(scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>
                            </el-col>
                    </el-row>
                    <el-row class="ah-50 mt-10">
                        <el-col :span="12" v-if="addtype=='0'">
                        <span class="yy-input-text" style="width:18%!important">来信内容附件</span>
                        <el-button type="primary" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('0')">上传文件</el-button> <span class="ts"></span>
                        </el-col>
                        <el-col :span="12">
                            <span class="yy-input-text" style="width:18%!important">反映次数</span>
                           <el-input placeholder="" size="small" clearable v-model="pd1.reflectnum" maxlength="3"  class="yy-input-input inputw" ></el-input> 
                        </el-col>
                        <el-col :span="24" class="mb-20" v-if="filedata0 && filedata0.length>0">
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
                                    <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata0)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                        </el-col>
                        <el-col :span="24">
                           <span class="yy-input-text" style="width:9%!important;vertical-align: top;" title="来文要求">来文要求</span>
                             <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd0.lettercontents"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                       </el-col>
                    </el-row>

                </div>
                <!-- 关注案件信息 -->
                <div class="ptitle mb-20 mt-20"  >关注案件信息</div>
                <div class="pborder" >
                     <el-row class="ah-40">
                      <el-col :span="8">
                           <span class="yy-input-text">案件编号</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd1.casenum"  class="yy-input-input" ></el-input>  <i class="el-icon-search"></i>
                      </el-col>
                       <el-col :span="8">
                        <span class="yy-input-text">案件类型</span>
                        <el-select v-model="pd1.caseclass" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.ajlx"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> <i class="el-icon-plus" style="color:red"></i>
                      </el-col>
                      <el-col :span="8">
                        <span class="yy-input-text">审理阶段</span>
                        <el-select v-model="pd1.adjudgementphase" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.sljd"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> <i class="el-icon-plus" style="color:red"></i>
                      </el-col>
                      <el-col :span="8">
                        <span class="yy-input-text">案件状态</span>
                        <el-select v-model="pd1.casestatus" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.ajzt"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> <i class="el-icon-plus" style="color:red"></i>
                      </el-col>
                      <el-col :span="8">
                        <span class="yy-input-text">利害关系</span>
                        <el-select v-model="pd1.interestrelations" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.lhgx"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> <i class="el-icon-plus" style="color:red"></i>
                      </el-col>
                        <el-col :span="8">
                        <span class="yy-input-text">是否重点案件</span>
                        <el-select v-model="pd1.emphasiscase" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option value="1" label="是">
                           </el-option>
                            <el-option value="0" label="否">
                           </el-option>
                        </el-select> 
                      </el-col>
                        <el-col :span="8">
                        <span class="yy-input-text">是否重复案件</span>
                         <el-select v-model="pd1.repeatcase" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option value="1" label="是">
                           </el-option>
                            <el-option value="0" label="否">
                           </el-option>
                        </el-select> 
                      </el-col>
                     
                       <el-col :span="8">
                        <span class="yy-input-text">问题针对法院</span>
                        <el-select v-model="pd1.focuscourt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in wtfy"
                           :key="ind"
                           :label="item.mc"
                           :value="item.bm">
                           </el-option>
                        </el-select> <i class="el-icon-plus" style="color:red"></i>
                      </el-col>
                       <el-col :span="8">
                        <span class="yy-input-text">涉及法院级别</span>
                        <el-select v-model="pd1.focuscourtlevel" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.fyjb"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> <i class="el-icon-plus" style="color:red"></i>
                      </el-col>
                       <el-col :span="8">
                        <span class="yy-input-text">不服本院</span>
                        <el-select v-model="pd1.notsatisfied" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.bfby"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> <i class="el-icon-plus" style="color:red"></i>
                      </el-col>
                        <el-col :span="24">
                           <span class="yy-input-text" style="width:9%!important;vertical-align: top;" title="当事人及案由">当事人及案由</span>
                             <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd1.partiesandcasereason"  class="yy-input-input" style="width:85%!important;"></el-input>
                       <i class="el-icon-search cursor" @click="getdswan(pd1.partiesandcasereason)"></i>
                       </el-col>
                      </el-row>
                </div>
                <!-- 收文信息
                <div class="ptitle mb-20 mt-20">收文信息</div>
                <div class="pborder">
                      <el-row class="ah-40">
                      <el-col :span="8">
                           <span class="yy-input-text">收文时间</span>
                           <el-date-picker
                               v-model="pd.beginBJSJ" format="yyyy-MM-dd"
                               type="date" size="small" value-format="yyyy-MM-dd"
                               placeholder="选择时间" class="yy-input-input" >
                            </el-date-picker>
                      </el-col>
                         <el-col :span="8">
                               <span class="yy-input-text">经办人</span>
                                <el-select v-model="pd.xb" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                v-for="(item,ind) in $store.state.xb"
                                :key="ind"
                                :label="item.dm+' - '+item.mc"
                                :value="item.dm">
                                </el-option>
                                </el-select> <i class="el-icon-plus" style="color:red"></i>
                         </el-col>
                      </el-row>
                       <el-row class="ah-40">
                           <el-col :span="24"> <el-checkbox v-model="pd.sp" @change="changesp">是否审批</el-checkbox> <span class="colorred"> 注：默认未勾选为不做审批流程</span></el-col>
                           <el-col :span="6" v-if="spshow">
                               <span class="yy-input-text">信息操作</span>
                                <el-select v-model="pd.xb" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                v-for="(item,ind) in $store.state.xb"
                                :key="ind"
                                :label="item.dm+' - '+item.mc"
                                :value="item.dm">
                                </el-option>
                                </el-select>
                           </el-col>
                           <el-col :span="6" v-if="spshow">
                                <span class="yy-input-text">审批人</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd.dd"  class="yy-input-input" ></el-input> 
                           </el-col>
                           <el-col :span="6" v-if="spshow">
                                <span class="yy-input-text">审批结果</span>
                                <el-select v-model="pd.xb" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                <el-option
                                v-for="(item,ind) in $store.state.xb"
                                :key="ind"
                                :label="item.dm+' - '+item.mc"
                                :value="item.dm">
                                </el-option>
                                </el-select>
                           </el-col>
                           <el-col :span="6" v-if="spshow">
                            <span class="yy-input-text">审批时间</span>
                           <el-date-picker
                               v-model="pd.beginBJSJ" format="yyyy-MM-dd"
                               type="date" size="small" value-format="yyyy-MM-dd"
                               placeholder="选择时间" class="yy-input-input" >
                            </el-date-picker>
                            </el-col>
                         <el-col :span="24">
                           <span class="yy-input-text" style="width:9%!important;vertical-align: top;" title="领导批示">领导批示</span>
                           <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd.llnr"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                      
                       </el-col>
                       </el-row>
                </div> -->
                  <!-- 开展活动 -->
                <div class="ptitle mb-20 mt-20" v-if="addtype=='0'">开展活动</div>
                <div class="pborder" v-if="addtype=='0'">
                    <el-row class="ah-40">
                        <el-col :span="24">
                        <span class="yy-input-text"  style="width:9%;">活动类型</span>
                        <el-select v-model="pb.hdlx" @change="changehdlx(pb.hdlx,0)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:20%!important;" >
                         <el-option
                           v-for="(item,ind) in $store.state.hdlx"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select> 
                         <el-select v-model="pb.hdlxal" @change="changehdlx(pb.hdlxal,1)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:20%!important;" >
                         <el-option
                           v-for="(item,ind) in hdlxlist"
                           :key="ind"
                           :label="item.theme"
                           :value="item.activityInfoId">
                           </el-option>
                        </el-select> 
                        <el-button type="success" plain size="small" @click="addhd">录入活动</el-button>
                      </el-col>
                  
                    </el-row>
                     <el-row class="ah-50">
                       
                        <el-col :span="24" class="input-item">
                            <span class="yy-input-text" style="width:9%">活动列表</span>
                            <div class="yy-input-input" style="width:87%!important;">
                             <el-table
                            ref="multipleTable"
                            :data="tableData3"
                            width="100%">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
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
                                prop="activityTime"
                                label="活动时间">
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
                                    <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="hddel(scope.row)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>

                           </el-table>
                           </div>
                            </el-col>
                            
                    </el-row>
                </div>
                  <!-- 审批信息 -->
                <div class="ptitle mb-20 mt-20" v-if="addtype!='0' || addtype=='9'">审批信息</div>
                <div class="pborder" v-if="addtype!='0' || addtype=='9'">
                  <el-row class="ah-40">
                    <el-col :span="8">
                        <span class="yy-input-text">是否转办</span>
                      <el-select v-model="pd4.isassign" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                         <el-option value="1" label="是">
                                        </el-option>
                                        <el-option value="0" label="否">
                                        </el-option>
                           </el-select>
                    </el-col>
                     <el-col :span="8">
                         <span class="yy-input-text">转办形式</span>
                         <el-select v-model="pd4.assigntype" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
                        
                          <el-select v-model="pd4.isassigninform" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                         <el-option value="1" label="是">
                                        </el-option>
                                        <el-option value="0" label="否">
                                        </el-option>
                           </el-select>
                    </el-col>
                    </el-row>
                     <el-row class="ah-40">
                    
                     <el-col :span="8">
                         <span class="yy-input-text">信息操作</span>
                         <el-select v-model="pd4.informationoperation" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.xxcz"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                           </el-select>
                     </el-col>
                      <el-col :span="24">
                        <span class="yy-input-text" style="width:9%!important;vertical-align: top;" >审批意见</span>
                        <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd4.checkcontents"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                                
                     </el-col>
                      <el-col :span="8">
                           <span class="yy-input-text">审批人</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd4.checkuserid"  class="yy-input-input" ></el-input> 
                     </el-col>
                     <el-col :span="8">
                         <span class="yy-input-text">审批结果</span>
                         <el-select v-model="pd4.checkresult" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.spjg"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                           </el-select>
                     </el-col>
                       <el-col :span="8">
                                <span class="yy-input-text">审批时间</span>
                                <el-date-picker
                                    v-model="pd4.checktime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                                </el-date-picker>
                    </el-col>
                  </el-row>
                </div>
                <!-- 转(交)办信息 -->
                <div class="ptitle mb-20 mt-20" v-if="addtype=='2' || addtype=='9'">转(交)办信息</div>
                <div class="pborder" v-if="addtype=='2' || addtype=='9'">
                         <el-row class="ah-40">
                             <el-col :span="8">
                                <span class="yy-input-text">督（转）办号</span>
                                <el-input placeholder="请输入内容" size="small" clearable v-model="pd2.assignno"  class="yy-input-input" ></el-input> 
                             </el-col>
                              <el-col :span="8">
                                <span class="yy-input-text">转办告知文号</span>
                                <el-input placeholder="请输入内容" size="small" clearable v-model="pd2.assigninformno"  class="yy-input-input" ></el-input> 
                             </el-col>
                              <el-col :span="8">
                                <span class="yy-input-text">转办时间</span>
                                <el-date-picker
                                    v-model="pd2.assigntime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                                </el-date-picker>
                             </el-col>
                               <el-col :span="8">
                                <span class="yy-input-text">应办结时间</span>
                                <el-date-picker
                                    v-model="bjsj2" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input"  >
                                </el-date-picker>
                             </el-col>
                              <el-col :span="8">
                                <span class="yy-input-text">承办单位</span>
                                    <el-select v-model="pd2.undertakingorgid" @change="getCBR(1,pd2.undertakingorgid,'')" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                        <el-option
                                        v-for="(item,ind) in cbdw"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.orgid">
                                        </el-option>
                                    </el-select>
                               </el-col>
                               <el-col :span="8">
                                <span class="yy-input-text">承办人</span>
                                    <el-select v-model="pd2.undertakinguserid" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                        <el-option
                                        v-for="(item,ind) in cbrdata1"
                                        :key="ind"
                                        :label="item.personName"
                                        :value="item.pbId">
                                        </el-option>
                                    </el-select>
                               </el-col>
                               <el-col :span="8">
                                <span class="yy-input-text">承办法院级别</span>
                                    <el-select v-model="pd2.undertakingorglevel" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                        <el-option
                                        v-for="(item,ind) in $store.state.fyjb"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.dm">
                                        </el-option>
                                    </el-select>
                               </el-col>
                               
                                <el-col :span="24" v-if="ffshow">
                                        <span class="yy-input-text" style="width:9%!important" title="提请立案流转单">提请立案流转单</span>
                                        <el-button type="primary" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('6')" >上传文件</el-button> <span class="ts"></span>
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
                                       <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                      <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata6)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                                </el-row>
                                <el-row class="ah-40">
                                <el-col :span="24" v-if="ffshow">
                                        <span class="yy-input-text" style="width:9%!important">转办函</span>
                                        <el-button type="primary" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('1')" >上传文件</el-button> <span class="ts"></span>
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
                                      <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                      <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata1)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                                <el-col :span="24" v-if="ffshow">
                                        <span class="yy-input-text" style="width:9%!important">告知函</span>
                                        <el-button type="primary" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('5')" >上传文件</el-button> <span class="ts"></span>
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
                                      <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata5)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                                <el-col :span="24">
                                    <span class="yy-input-text" style="width:9%!important;vertical-align: top;" >备注</span>
                                    <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd2.remark"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                                
                                </el-col>
                          </el-row>
                </div>
              
              
                <!-- 办理信息 -->
                <div class="ptitle mb-20 mt-20" v-if="addtype=='3' || addtype=='9'">办理信息</div>
                <div class="pborder" v-if="addtype=='3' || addtype=='9'">
                    <el-row class="ah-40">
                     <el-col :span="8">
                         
                         <span class="yy-input-text">承办部门</span>
                         <el-select v-model="pd5.undertakingsuborgid" @change="getCBR(2,'',pd5.undertakingsuborgid)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbbm"
                                :key="ind"
                                :label="item.mc"
                                :value="item.orgid">
                              </el-option>
                        </el-select>
                     </el-col>
                      <el-col :span="8">
                         <span class="yy-input-text">承办人</span>
                         <el-select v-model="pd5.undertakinguserid" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in cbrdata2"
                                :key="ind"
                                :label="item.personName"
                                :value="item.pbId">
                              </el-option>
                        </el-select>
                     </el-col>
                        <el-col :span="8">
                                <span class="yy-input-text">承办时间</span>
                                <el-date-picker
                                    v-model="pd5.handletime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                    </el-col>
                     <el-col :span="24">
                        <span class="yy-input-text" style="width:9%!important;vertical-align: top;" >备注</span>
                        <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd5.remark"  class="yy-input-input" style="width:86.8%!important;"></el-input>   
                     </el-col>
                    </el-row>
                </div>
                <!-- 办结信息 -->
                 <div class="ptitle mb-20 mt-20" v-if="addtype=='4' || addtype=='9'">办结信息</div>
                 <div class="pborder" v-if="addtype=='4' || addtype=='9'">
                     <el-row class="ah-40">
                         <el-col :span="8">
                         <span class="yy-input-text">是否办结</span>
                     
                               <el-select v-model="pd6.iscompleted" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                         <el-option value="1" label="是">
                                        </el-option>
                                        <el-option value="0" label="否">
                                        </el-option>
                           </el-select>
                        </el-col>
                            <el-col :span="8">
                          <span class="yy-input-text">办结时间</span>
                                <el-date-picker
                                    v-model="pd6.completedtime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                         </el-col>
                          <el-col :span="8">
                         <span class="yy-input-text">是否期限内办结</span>
                         
                              <el-select v-model="pd6.isintimecompleted" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                         <el-option value="1" label="是">
                                        </el-option>
                                        <el-option value="0" label="否">
                                        </el-option>
                           </el-select>
                        </el-col>
                     </el-row>
                      <el-row class="ah-40">
                        
                            <el-col :span="8">
                          <span class="yy-input-text">超期时间</span>
                            <el-input-number v-model="pd6.outcompletedtime" controls-position="right"  size="small"  :min="0" :max="999" class="yy-input-input"></el-input-number>
                         </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">办结结果</span>
                         <el-select v-model="pd6.completedresult" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
                         <el-select v-model="pd6.representativesatisfaction" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
                              <el-select v-model="pd6.iscommunicate" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                         <el-option value="1" label="是">
                                        </el-option>
                                        <el-option value="0" label="否">
                                        </el-option>
                           </el-select>
                       </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">沟通形式</span>
                         <el-select v-model="pd6.communicatetype" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
                         <el-select v-model="pd6.communicateresult" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
               
                           <el-select v-model="pd6.isreply" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                         <el-option value="1" label="是">
                                        </el-option>
                                        <el-option value="0" label="否">
                                        </el-option>
                           </el-select>
                          
                       </el-col>
                        <el-col :span="8">
                         <span class="yy-input-text">答复形式</span>
                         <el-select v-model="pd6.replytype" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
                         <el-select v-model="pd6.replynature" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
                                <el-date-picker
                                    v-model="pd6.replytime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                         </el-col>
                          <el-col :span="8">
                           <span class="yy-input-text">答复文号</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd6.replyfilenum"  class="yy-input-input" ></el-input> 
                      </el-col>
                       <el-col :span="24" v-if="dfshow">
                        <span class="yy-input-text" style="width:9%">答复函</span>
                        <el-button type="primary" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('4')" >上传文件</el-button> <span class="ts"></span>
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
                                       <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                      <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata4)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                       <el-col :span="24">
                        <span class="yy-input-text" style="width:9%!important;vertical-align: top;" >备注</span>
                        <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd6.remark"  class="yy-input-input" style="width:86.8%!important;"></el-input>
                                
                     </el-col>
                     </el-row>
                 </div>
                 <!-- 复文信息 -->
                 <div class="ptitle mb-20 mt-20" v-if="addtype=='5' || addtype=='9'">复文信息</div>
                 <div class="pborder" v-if="addtype=='5' || addtype=='9'">
                     <el-row class="ah-40">
                    <el-col :span="24">
                        <span class="yy-input-text" style="width:9%!important;vertical-align: top;" >反馈意见</span>
                        <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd7.replycontents"  class="yy-input-input" style="width:86.8%!important;"></el-input>     
                     </el-col>
                         <el-col :span="8">
                         <span class="yy-input-text">反馈部门</span>
                         <el-select v-model="pd7.replysuborgid" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.bm"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>
                       </el-col>
                       <el-col :span="8">
                         <span class="yy-input-text">反馈人</span>
                         <el-select v-model="pd7.replyuserid" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.ren"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>
                       </el-col>
                         <el-col :span="8">
                          <span class="yy-input-text">反馈时间</span>
                                <el-date-picker
                                    v-model="pd7.replytime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                         </el-col>
                          <el-col :span="24" v-if="hfshow">
                        <span class="yy-input-text" style="width:9%!important">回复函</span>
                        <el-button type="primary" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('2')" >上传文件</el-button> <span class="ts"></span>
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
                                      <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row,filedata2)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                    </el-row>
                 </div>
                 <!-- 催办信息 -->
                 <div class="ptitle mb-20 mt-20" v-if="addtype=='6' || addtype=='9'">催办信息</div>
                 <div class="pborder" v-if="addtype=='6' || addtype=='9'">
                    <el-row class="ah-40">
                         <el-col :span="8">
                          <span class="yy-input-text">催办时间</span>
                                <el-date-picker
                                    v-model="pd8.urgenttime" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择时间" class="yy-input-input" >
                           </el-date-picker>
                         </el-col>
                          <el-col :span="8">
                         <span class="yy-input-text">催办形式</span>
                         <el-select v-model="pd8.urgenttype" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in $store.state.cbxs"
                                :key="ind"
                                :label="item.mc"
                                :value="item.dm">
                              </el-option>
                        </el-select>

                       </el-col>
                        <el-col :span="24">
                        <span class="yy-input-text" style="width:9%!important;vertical-align: top;" >催办信息</span>
                        <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd8.urgentcontents"  class="yy-input-input" style="width:86.8%!important;"></el-input>     
                     </el-col>
                    </el-row>
                 </div>
           
           <div class="footer">
            <el-button type="primary"  style="width:130px;" @click="submit" v-if="addtype!='9'">提  交</el-button>
            <el-button style="width:130px;" @click="$router.push({name:'CaseList'})">取 消</el-button>
            </div>
            <br/>
         </div>

         
   <el-dialog title="上传文件" :visible.sync="uploadDialogVisible"  width="630px">
   <UPLOAD :url="uurl" :type="type" :urlErr="uurlErr"  @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>

    <el-dialog title="来文字号" :visible.sync="lwDialogVisible">
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
              <el-select v-model="form1.undertakinguserid" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
   <el-dialog title="当事人案由信息" :visible.sync="ayDialogVisible">
                          <el-table
                              :data="aydata">
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
                                <template slot-scope="scope">
                                  <div>
                                  <span v-if="scope.row.notsatisfied==0">否</span>
                                  <span v-if="scope.row.notsatisfied==1">是</span>
                                  </div>
                                 </template>
                              </el-table-column>
                             </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button @click="ayDialogVisible = false" size="small">取 消</el-button>
            </div>
    </el-dialog>
         <el-dialog title="选择类型" :visible.sync="addDialogVisible" >
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
</template>
<script>
import UPLOAD from "../../Common/upload"
export default {
  components:{UPLOAD},
    data(){
        return{
             casename:'关注案件登记',
             pd0:{},
             pd1:{casenum:''},
             pd2:{},
             pd3:{},
             pd4:{},
             pd5:{},
             pd6:{outcompletedtime:'0'},
             pd7:{},
             pd8:{urgenttime:''},
             pb:{},
             tableData0:[],
             tableData3:[],
             aydata:[],
             spshow:false,
             uurl:'/CaseRegisterController/uploadFile',
             uurlErr:'',
             uploadDialogVisible:false,
             lwDialogVisible:false,
             ayDialogVisible:false,
             addDialogVisible:false,
             hdtype:'1',
             type:'0',
             filedata0:[],
             filedata1:[],
             filedata2:[],
             filedata3:[],
             filedata4:[],
             filedata5:[],
             filedata6:[],
             form1data:[],
             
             addtype:'0',
             form1:{},
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
             cbry:[],
             wtfy:[],//问题针对法院
             lwshow:true,
             bjsj2:"",
             ffshow:true,
             dfshow:true,
             hfshow:true,
             cbrdata1:[],//交办下的承办人
             cbrdata2:[],//办理下承办人
             jbrdata:[],//经办人\来源法院人员
             lyzzdata:[],//来源组织
             lydwdata:[],//来文单位

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
          this.getinit(this.$route);
      },
       watch:{
          $route:function(val){
            this.getinit(val);
          }
       },
    methods:{
       getinit(val){
         this.addtype=val.query.type;
         this.focusCaseId=val.query.focusCaseId;
        
         this.getName();
         this.getcbbm();
         this.getcbdw();
         this.getBJtime();
         this.getJBR();
         this.getFY();
        // this.getLWDW();
         this.getList();
       
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
                     this.pb.hdlxal='';
                  });
            }else{
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
                     }else{
                       this.$message.error(r.message);
                     }
                  });
            }
        },
        //应办结时间
        getBJtime(){
          this.$api.post(this.Global.aport2+'/CaseRegisterController/getBedealtime',null,
             r =>{
              
                  this.bjsj2=r.data.afterdaydate;
            });
        },
        getLWLY(t){
        
              if(t=="0158000001"){
                 this.lwshow=true;
              }else{
                 this.getLYZZ();
                 this.lwshow=false;
              }
        },
        getName(){
           let p={
             'name':''
           };
           this.$api.get(this.Global.aport1+'/baseinfo/personlist',p,
             r =>{
                  
                   this.xmdata=r.data;
            });
        },
        ChangeNameList(n,t){
              let p={
             'personId':n
           };
           this.$api.get(this.Global.aport1+'/baseinfo/personlist',p,
             r =>{

               if(r.code==1){
                 this.lpshow=true;
                 if(t==1){
                 this.tableData0.push(r.data[0]);
                 const res = new Map();
                 var arr=this.tableData0;
                 this.tableData0=arr.filter((arr) => !res.has(arr.personId) && res.set(arr.personId, 1))
                  }else{
                    this.labellist=r.data[0].tags;
                    this.pd1.representativeid=r.data[0].representativeId;
                    this.pd1.cppcmemberid=r.data[0].cppcMemberId;
                    this.pd1.specialpersonid=r.data[0].specialPersonId;
                    this.labeladress=r.data[0].address;
                    this.lpshow=true;
                  }
           }else{
             this.$message.error(r.message);
           }
           });
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
       fatherMethod(data,t){
         if(t=='0')
         {
           if(this.filedata0 && this.filedata0.length>0){
             console.log(data);
             for (let i = 0; i < data.length; i++) {
               this.filedata0.push(data[i]);
               
             }
           }else{
           this.filedata0=data;
           }
         }
         if(t=='1'){
           if(this.filedata1 && this.filedata1.length>0){
             console.log(data);
             for (let i = 0; i < data.length; i++) {
               this.filedata1.push(data[i]);
               
              }
            }else{
            this.filedata1=data;
            }
        
           }
         if(t=='2'){
            if(this.filedata2 && this.filedata2.length>0){
             console.log(data);
             for (let i = 0; i < data.length; i++) {
               this.filedata2.push(data[i]);
               
              }
            }else{
            this.filedata2=data;
            }
          
           }
         if(t=='3'){
           if(this.filedata3 && this.filedata3.length>0){
             console.log(data);
             for (let i = 0; i < data.length; i++) {
               this.filedata3.push(data[i]);
               
              }
            }else{
            this.filedata3=data;
            }
       
         }
         if(t=='4'){
            if(this.filedata4 && this.filedata4.length>0){
             console.log(data);
             for (let i = 0; i < data.length; i++) {
               this.filedata4.push(data[i]);
               
              }
            }else{
            this.filedata4=data;
            }
     
           }
         if(t=='5'){
            if(this.filedata5 && this.filedata5.length>0){
             console.log(data);
             for (let i = 0; i < data.length; i++) {
               this.filedata5.push(data[i]);
               
              }
            }else{
            this.filedata5=data;
            }
        
           }
         if(t=='6'){
            if(this.filedata6 && this.filedata6.length>0){
             console.log(data);
             for (let i = 0; i < data.length; i++) {
               this.filedata6.push(data[i]);
               
              }
            }else{
            this.filedata6=data;
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
      delName(n){
          var arr=[];
              arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                     var index = this.tableData0.findIndex(item =>{
　　　　　　　　　  　 if(item.personId==arr[i].personId){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　　　　　　this.tableData0.splice(index,1)
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
           this.reset();
           if(this.addtype=='9' || this.focusCaseId!=""){
            let p={
               'focuscaseid':this.focusCaseId,
               'token':this.$store.state.token
            };
          this.$api.post(this.Global.aport2+'/CaseRegisterController/getCaseRegisterInfo',p,
                r =>{
                    if(r.code==1){
                        this.pd1=r.data.bufocuscaseinfo;
                        this.pd0=JSON.parse(JSON.stringify(r.data.caseletterlist[0]));
                       
                        // this.pd1.letternumber=letter.letternumber;
                        // this.pd1.lettertime=letter.lettertime;
                        // this.pd1.lettertimes=letter.lettertimes;
                        // this.pd1.jointpersoncount=letter.jointpersoncount;
                        // this.pd1.lettercontents=letter.lettercontents;
                       
                        
                        if(this.pd1.leaderpbid!=""){
                          this.lpshow=true;
                          this.ChangeNameList(r.data.bufocuscaseinfo.leaderpbid,0);
                        }
                        this.form1data=r.data.caseletterlist;
                        this.filedata0=r.data.relfilelist;
                        

                        this.tableData0=r.data.personinfovolist;
                        this.tableData3=r.data.activityinfovolist;
                   }else{
                      this.$message.error(r.message);
                    }
                });


           
             
          if(this.addtype!='0'  || this.addtype=='9'){
          
                this.$api.post(this.Global.aport2+'/CaseCheckController/queryCaseCheck',p,
                  r =>{
                      this.pd4=r.data;
                      this.bjsj4=r.data;
                  });
                 
                 if(this.addtype=="2"  ||  this.addtype=='9'){
                        
                      this.$api.post(this.Global.aport2+'/CaseAssignController/queryCaseAssign',p,
                        r =>{
                           
                            this.ffshow=true;
                            this.pd2=r.data.bucaseassignvo;
                          
                            if(r.data.filelist.length>0){
                              this.ffshow=false;
                            }
                            if(this.pd2.assignfinishtime!=null && this.pd2.assignfinishtime!=undefined){
                            this.bjsj2=this.pd2.assignfinishtime;}
                            this.filedata6=r.data.filelist;
                        });
                  }
                if(this.addtype=="3"  ||  this.addtype=='9'){
                      this.$api.post(this.Global.aport2+'/CaseHandleController/queryCaseHandle',p,
                        r =>{
                            this.pd5=r.data;
                            if(this.pd5.undertakingsuborgid!=null && this.pd5.undertakingsuborgid!=undefined){
                            this.getCBR(2,'',this.pd5.undertakingsuborgid);
                            }
                        });
                  }
                 if(this.addtype=="4"  ||  this.addtype=='9'){
                      this.$api.post(this.Global.aport2+'/CaseCompletedController/queryCaseCompleted',p,
                        r =>{
                            this.pd6=r.data.bufocuscasecompletedvo;
                             this.dfshow=true;
                            if(r.data.filelist.length>0){
                              this.dfshow=false;
                               this.filedata4=r.data.filelist;
                            }
                           
                        });
                 }
                 if(this.addtype=="5"  ||  this.addtype=='9'){
                       this.$api.post(this.Global.aport2+'/CaseReplyController/queryCaseReply',p,
                        r =>{
                            this.pd7=r.data.bufocuscasereplyvo;
                              this.hfshow=true;
                              console.log();
                              
                            if(r.data.filelist.length>0){
                               this.hfshow=false;
                              this.filedata2=r.data.filelist;
                            }
                           
                        });
                 }
                  if(this.addtype=="6"  ||  this.addtype=='9'){
                      this.$api.post(this.Global.aport2+'/CaseUrgentController/queryCaseUrgent',p,
                        r =>{
                            this.pd8=r.data;
                        });
                      }
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
            this.pd0={};
            this.pd1={};
            this.pd2={};
            this.pd3={};
            this.pd4={};
            this.pd5={};
            this.pd6={};
            this.pd7={};
            this.pd8={};
            this.pd={};
            this.tableData3=[];
            this.form1={};
            this.form1data=[];
        },
        submit(){
          var url="";
              let p={};
           switch (this.addtype) {
             case '0':
               url='/CaseRegisterController/saveCaseRegisterInfo';
                this.pd1.letternumber=this.pd0.letternumber;
                this.pd1.lettertime=this.pd0.lettertime;
                this.pd1.lettertimes=this.pd0.lettertimes;
                this.pd1.jointpersoncount=this.pd0.jointpersoncount;
                this.pd1.lettercontents=this.pd0.lettercontents;
              p={
                  'token':this.$store.state.token,
                  'focuscaseid':this.focusCaseId,
                  'activityvolist':this.tableData3,
                  'relfilelist':this.filedata0,
                  'focuscaseinfo':this.pd1,
                  'caseletterandsource':this.form1data,
                  'bufocuscasejointperson':this.tableData0,
                  };        
               break;
             case '1':
                 url='/CaseCheckController/saveCaseCheck';
              p={
                  'token':this.$store.state.token,
                  'focuscaseid':this.focusCaseId,
                  'focuscasecheck':this.pd4,
                  };        
               break;
            case '2':
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
                  };   
               break;
              case '3':
                 url='/CaseHandleController/saveCaseHandle';
                 p={
                  'token':this.$store.state.token,
                  'focuscaseid':this.focusCaseId,
                  'casehandle':this.pd5,
                  };   
               break;
              case '4':
                 url='/CaseCompletedController/saveCaseCompleted';
                 p={
                  'token':this.$store.state.token,
                  'focuscaseid':this.focusCaseId,
                  'casecompleted':this.pd6,
                  'filelist':this.filedata4,
                  };   
               break;
               case '5':
                 url='/CaseReplyController/saveCaseReply';
                 p={
                  'token':this.$store.state.token,
                  'focuscaseid':this.focusCaseId,
                  'casereply':this.pd7,
                  'filelist':this.filedata2,
                  };   
               break;
               case '6':
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
                          this.$message({
                            message: r.message,
                            type: 'success'
                          });
                          this.$router.push({name:"CaseList"});
                    }else{
                      this.$message.error(r.message);
                    }
                });
        },
        downData(n){
          window.location.href=n.filePath;
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
        //承办单位
        getcbdw(){
          let p={
            "orgId":this.$store.state.orgid
          };
             this.$api.get(this.Global.aport1+'/org/getUndertakeOrg',p,
                r =>{
                    if(r.code==1){
                        this.cbdw=r.data;
                      
                        
                    }
                });
        },
        //问题针对法院
        getFY(){
          this.$api.get(this.Global.aport1+'/org/getCourtOrg',null,
                r =>{
                    if(r.code==1){
                        this.wtfy=r.data;
                    }
                });
        },
        //获取承办人  经办人 d单位  b部门 
        getCBR(t,d,b){
             let p={
               'orgId':d,
               'subOrgId':b,
             };
            this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
                r =>{
                    if(r.code==1){
                      if(t==1){//1交办
                        
                        this.cbrdata1=r.data;
                       
                      }else if(t==2){ //2办理
                          this.cbrdata2=r.data;
                      }
                    }
                });
         },
         //经办人
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
          //经办人
         getLYZZ(){
              
            this.$api.post(this.Global.aport1+'/org/getCourtOrg',null,
                r =>{
                    if(r.code==1){
                      
                          this.lyzzdata=r.data;
                      
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
</style>