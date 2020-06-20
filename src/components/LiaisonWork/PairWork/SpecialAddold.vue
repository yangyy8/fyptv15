<template>
    <div class="pairadd">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 联络工作 <span class="mlr_10">/</span>  <b>{{cname}}</b></span> </div>
         <div class="content subtable">
             
              <!-- 结对活动 -->
               <div class="ptitle  mb-20">{{cnames}}</div>
               <div class="pborder mb-50">
                   <el-row class="ah-40" >
                     <el-col :span="12" class="input-item" v-if='addtype=="4" || addtype=="5"'>
                      <span class="yy-input-text" style="width:23%;"><font class="red">*</font> 时间</span>
                      <div class="yy-input-input inputw t-flex  t-date">
                        <el-date-picker :disabled="llbnt"
                           v-model="form.startTime" 
                           type="datetime" size="small" 
                           placeholder="开始时间" format="yyyy-MM-dd HH:mm">
                        </el-date-picker>
                        <span class="septum">-</span>
                        <el-date-picker :disabled="llbnt"
                            v-model="form.endTime" 
                            type="datetime" size="small" 
                            placeholder="结束时间" format="yyyy-MM-dd HH:mm">
                        </el-date-picker>
                     </div>
                     </el-col>
                      <el-col :span="12" class="input-item" v-else>
                      <span class="yy-input-text" style="width:23%;"><font class="red">*</font> 时间</span>
                      <div class="yy-input-input inputw t-flex  t-date">
                        <el-date-picker :disabled="llbnt"
                           v-model="form.startTime" 
                           type="date" size="small" 
                           placeholder="开始时间" >
                        </el-date-picker>
                        <span class="septum">-</span>
                        <el-date-picker :disabled="llbnt"
                            v-model="form.endTime"
                            type="date" size="small" 
                            placeholder="结束时间" >
                        </el-date-picker>
                     </div>
                     </el-col>
                     <el-col :span="24">
                           <span class="yy-input-text textw"><font class="red">*</font> 地点</span>
                           <el-input placeholder="请输入内容" size="small" :disabled="llbnt" clearable v-model="form.location"  class="yy-input-input inputw" ></el-input>
                     </el-col>
                     <el-col :span="24" v-if="addtype!=9">
                           <span class="yy-input-text textw"> <font class="red">*</font>
                              <span v-if="addtype==4 || addtype==5" title="当事人及案由"> 当事人及案由</span>
                              <span v-else-if="addtype==6"> 会议名称</span>
                              <span v-else>主题</span>
                            </span>
                           <el-input placeholder="请输入内容" :disabled="llbnt" size="small" clearable v-model="form.theme"  class="yy-input-input inputw" ></el-input>
                     </el-col>
                      <el-col :span="8" >
                          <span class="yy-input-text textn">
                            <font class="red">*</font>
                                 <span v-if="addtype==9">接待单位</span>
                                <span v-else>组织单位</span>
                              </span>
                            <el-select v-model="form.organizationalUnitId" :disabled="llbnt" @change="getcbbm(form.organizationalUnitId,0);getJDR(form.organizationalUnitId)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fydwdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                      </el-col>
                       <el-col :span="8"  >
                            <span class="yy-input-text textn"><font class="red">*</font> 
                                <span v-if="addtype==9">接待部门</span>
                                <span v-else>组织部门</span>
                                </span>
                            <el-select v-model="form.orgDepartmentId"  @change="getJDR(form.organizationalUnitId,form.orgDepartmentId)" :disabled="llbnt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fybmdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                      </el-col>
                       
                   </el-row>
                   <el-row class="ah-40"  v-if="addtype==4 || addtype==6 || addtype==8">
                         <el-col :span="8">
                          <span class="yy-input-text textn">
                              <font class="red">*</font>
                              <span v-if="addtype!=8">承办单位</span><span v-else>邀请单位</span>
                              </span>
                            <el-select v-model="form.undertakeUnitId" :disabled="llbnt"  @change="getcbbm(form.undertakeUnitId,1)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fydwdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                      </el-col>
                       <el-col :span="8" >
                            <span class="yy-input-text textn">
                                <font class="red">*</font>
                                 <span v-if="addtype!=8">承办部门</span><span v-else>邀请部门</span>

                            </span>
                            <el-select v-model="form.undertakeDepartmentId" :disabled="llbnt"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fybmdata1"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                      </el-col>
                    </el-row>
                   <el-row class="ah-40"  v-if="addtype==10 || addtype==6 || addtype==5 || addtype==7">
                         <el-col :span="8">
                       
                          <span class="yy-input-text textn"><font class="red">*</font> 开展单位</span>
                            <el-select v-model="form.developmentUnitId" :disabled="llbnt" @change="getcbbm(form.developmentUnitId,2)"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fydwdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                      </el-col>
                       <el-col :span="8" >

                            <span class="yy-input-text textn"><font class="red">*</font> 开展部门</span>
                            <el-select v-model="form.devDepartmentId" :disabled="llbnt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fybmdata2"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                      </el-col>
                    </el-row>

                   <el-row  class="ah-40"  v-if="addtype==2 && !llbnt">
                        <el-col :span="8">
                            <span class="yy-input-text textn">视察单位</span>
                            <el-select v-model="pd1.inspectOrgId"  @change="chChange(pd1.inspectOrgId,1)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fydwdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                      </el-col>
                       <el-col :span="8">
                            <span class="yy-input-text textn">视察内容</span>
                            <el-select v-model="pd1.inspectTypeId"  @change="chChange(pd1.inspectTypeId,2)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.scfl"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                       </el-col>
                        <el-col :span="8">
                            <el-button type="success" size="small" plain @click="getAdd(1,pd1)">加入列表</el-button>
                        </el-col>
                   </el-row>
                   <el-row  class="ah-40" v-if="addtype==2">
                       <el-col :span="24">
                             <el-table
                            ref="multipleTable"
                            :data="ListData1">
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="inspectOrg"
                                label="视察单位">
                            </el-table-column>
                            <el-table-column
                                prop="inspectType"
                                label="视察内容">
                            </el-table-column>
                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text" :disabled="llbnt"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(1,scope.row)"></el-button>
                                     </div>
                                  </template>
                            </el-table-column>
                           </el-table>
                          
                         </el-col>
                    </el-row>

                     <el-row  class="ah-40"  v-if="addtype==3 && !llbnt">
                        <el-col :span="8">
                            <span class="yy-input-text textn">调研单位</span>
                            <el-select v-model="pd2.inspectOrgId" @change="chChange(pd2.inspectOrgId,3)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fydwdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                      </el-col>
                       <el-col :span="8">
                            <span class="yy-input-text textn">调研内容</span>
                            <el-select v-model="pd2.inspectTypeId" @change="chChange(pd2.inspectTypeId,4)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.scfl"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                       </el-col>
                        <el-col :span="8">
                            <el-button type="success" size="small" plain @click="getAdd(2,pd2)">加入列表</el-button>
                        </el-col>
                        </el-row>

                     <el-row  class="ah-40" v-if="addtype==3 ">  
                       <el-col :span="24">
                    
                             <el-table
                            ref="multipleTable"
                            :data="ListData2">
                            <!-- <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column> -->
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="inspectOrg"
                                label="调研单位">
                            </el-table-column>
                             <el-table-column
                                prop="inspectType"
                                label="调研内容">
                            </el-table-column>
                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  :disabled="llbnt"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(2,scope.row)"></el-button>
                                     </div>
                                  </template>
                            </el-table-column>
                           </el-table>
                         
                         </el-col>
                    </el-row>

                    <el-row  class="ah-40"  v-if="addtype==8 && !llbnt">
                        <el-col :span="8">
                            <span class="yy-input-text" style="width:30%" title="新闻单位名称">新闻单位名称</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd3.newsMediaName"  class="yy-input-input" ></el-input>
                      </el-col>
                       <el-col :span="8">
                            <span class="yy-input-text textn">新闻单位类别</span>
                            <el-select v-model="pd3.newsMediaTypeId" @change="chChange(pd3.newsMediaTypeId,5)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xwdwfl"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>

                       </el-col>
                        <el-col :span="8">
                            <el-button type="success" size="small" plain @click="getAdd(3,pd3)">加入列表</el-button>
                        </el-col>
                        </el-row>

                    <el-row  class="ah-40" v-if="addtype==8">
                       <el-col :span="24">
                      
                             <el-table
                            ref="multipleTable"
                            :data="ListData3">
                            <!-- <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column> -->
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="newsMediaName"
                                label="新闻单位名称">
                            </el-table-column>
                            <el-table-column
                                prop="newsMediaType"
                                label="新闻单位类别">
                            </el-table-column>
                            <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"   :disabled="llbnt" class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(3,scope.row)"></el-button>
                                     </div>
                                  </template>
                            </el-table-column>
                           </el-table>
                          
                         </el-col>
                    </el-row>

                    <el-row  class="ah-40"  v-if="addtype==9 && !llbnt">
                       
                        <el-col :span="8">
                            <span class="yy-input-text textn">接待人员</span>
                            <el-select v-model="pd7.receptionistid"  @change="chChange(pd7.receptionistid,6)" filterable clearable allow-create default-first-option placeholder="请先选择接待单位接待部门"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in jdrdata"
                                 :key="ind"
                                 :label="item.personName"
                                 :value="item.pbId">
                                 </el-option>
                            </el-select>
                      </el-col>
                        <el-col :span="8">
                            <el-button type="success" size="small" plain @click="getAdd(4,pd7.receptionistinfo)">加入列表</el-button>
                        </el-col>
                        </el-row>
                        <el-row  class="ah-40" v-if="addtype==9">
                       <el-col :span="24">
                      
                             <el-table
                            ref="multipleTable"
                            :data="ListData7">
                            <!-- <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column> -->
                            <el-table-column
                                type="index"
                                label="序号" width="50">
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
                                prop="subOrgPosition"
                                label="职务">
                            </el-table-column>
                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  :disabled="llbnt"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(7,scope.row)"></el-button>
                                     </div>
                                  </template>
                            </el-table-column>
                           </el-table>
                           
                         </el-col>
                          <el-col :span="8">
                            <span class="yy-input-text">接待人数</span>
                              <span style="color:red;font-weight:bold">{{count3}} </span>人
                         </el-col>
                    </el-row>

                  
                   
                  <el-row class="mt-20" >
                        <el-col :span="15">
                        <span class="yy-input-text" style="min-width:180px" title="代表、委员以及特约人员">代表、委员以及特约人员 </span>
                        <el-select v-model="lmdbid" v-if="!llbnt"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                          <el-option
                           v-for="(item,ind) in xmdata"
                           :key="ind"
                           :label="item.fullName"
                           :value="item.pbId+'|'+item.personId">
                           </el-option>
                        </el-select>
                        </el-col>
                        <el-col :span="9"  v-if="!llbnt">
                            <el-button type="success" size="small" plain @click="ChangeNameList(lmdbid)">加入列表</el-button>
                        </el-col>
                  </el-row><el-row>
                      
                        <el-col :span="24">
                            <el-table
                            ref="multipleTable"
                            :data="ListData4">
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="personName"
                                label="姓名">
                            </el-table-column>
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
                                    <el-button type="text"  :disabled="llbnt" class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(4,scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>
                            </el-col>
                            <el-col :span="24" class="mt-20">
                              <span class="yy-input-text" style="width:210px;">代表、委员以及特约人员人数</span>  <span style="font-weight:bold;color:red;margin-left:20px;"> {{count1}} </span> 人
                           </el-col>
                    </el-row>
                   <el-row  class="mt-20" >
                        <el-col :span="12">
                            <span class="yy-input-text" style="width:100px;">法院领导</span>
                            <el-select v-model="fyld" v-if="!llbnt" filterable allow-create clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:70%!important" >
                               <el-option
                                 v-for="(item,ind) in fydata"
                                 :key="ind"
                                 :label="item.fullName"
                                 :value="item.pbId">
                                 </el-option>
                            </el-select>
                      </el-col>
                      
                        <el-col :span="8" v-if="!llbnt">
                            <el-button type="success"  size="small" plain @click="ChangeFYNameList(fyld)">加入列表</el-button>
                            
                        </el-col>
                   </el-row>
                   <el-row class="ah-40">
                        <el-col :span="24" >
                       
                             <el-table
                            ref="multipleTable"
                            :data="ListData5">
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="personName"
                                label="姓名">
                            </el-table-column>
                            <!-- <el-table-column
                                label="团(界)别">
                             <template slot-scope="scope">
                                   <div>
                                      <span v-if="scope.row.groupType!=null && scope.row.periodType!=null">{{scope.row.periodType}}</span>
                                      <span v-else-if="scope.row.groupType!=null">{{scope.row.groupType}}</span>
                                      <span v-else-if="scope.row.periodType!=null">{{scope.row.periodType}}</span>
                                    </div>
                                </template>
                            </el-table-column> -->
                            <!-- <el-table-column
                                prop="sex"
                                label="性别">
                            </el-table-column> -->
                            <el-table-column
                                prop="orgName"
                                label="单位">
                            </el-table-column>
                              <el-table-column
                                prop="subOrgPosition"
                                label="职务">
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text" :disabled="llbnt"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(5,scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>
                           
                         </el-col>
                          <el-col :span="8">
                            <span class="yy-input-text" style="width:31%">法院领导人数</span>
                              <span style="color:red;font-weight:bold">{{count2}} </span>人
                         </el-col>
                   </el-row>
                   <el-row class="ah-40 mt-20">
                       <el-col :span="24">
                           <span class="yy-input-text texts"><font class="red">*</font>  {{label4}}</span>
                           <el-input placeholder="请输入内容" type="textarea" :disabled="llbnt" :autosize="{ minRows: 10, maxRows: 10}" size="small" clearable v-model="form.contents"  class="yy-input-input inputw" ></el-input>
                       </el-col>
                       <el-col :span="24" style="margin-left:10.2%;" v-if="addtype!='9'">
                             <el-checkbox v-model="pd5.ck1" :disabled="llbnt">人民法院各部门组织开展的特约监督员或特邀咨询员活动</el-checkbox>
                       </el-col>
                       <el-col :span="24" style="margin-left:10.2%;" v-if="addtype==2">
                             <el-checkbox v-model="pd5.ck2" :disabled="llbnt">集中专项视察</el-checkbox>
                       </el-col>
                     
                       <el-col :span="24" style="margin-left:10.2%;" v-if="addtype==2 || addtype==3">
                             <el-checkbox v-model="pd5.ck3" :disabled="llbnt" @change="getCheck(1)">结合议案建议或政协提案办理</el-checkbox>  
                               <el-button type="success" style="margin-left:20px;" size="mini" v-if="pd5.ck3  && !llbnt" @click="getGL(1)">关联</el-button>
                       </el-col>
                        <el-col :span="24" style="margin-left:10.2%;" v-if="addtype==3">
                             <el-checkbox v-model="pd5.ck4" :disabled="llbnt" @change="getCheck(2)">代表委员意见建议办理</el-checkbox>  
                               <el-button type="success" style="margin-left:20px;" size="mini" v-if="pd5.ck4  && !llbnt" @click="getGL(2)">关联</el-button>
                       </el-col>
                       <el-col :span="24" style="margin-left:10.2%;" v-if="addtype==7">
                             <el-checkbox v-model="pd5.ck5" :disabled="llbnt">院领导参与标识</el-checkbox>
                       </el-col>
                      
                       <el-col :span="24" style="margin-left:10%;" v-if="addtype==5">
                             <el-checkbox v-model="pd5.ck6" :disabled="llbnt">是否大要案</el-checkbox>
                       </el-col>
                            <el-col :span="24" style="margin-left:10.2%;" v-if="addtype==4">
                             <el-checkbox v-model="pd5.ck8" :disabled="llbnt">组织座谈交流</el-checkbox>
                       </el-col>
                   
                       <el-col :span="24" style="margin-left:10.2%;" v-if="addtype==5 || addtype==4">
                             <el-checkbox v-model="pd5.ck7" :disabled="llbnt">代表、委员或监督员、咨询员关注案件</el-checkbox>
                             <el-button type="success" style="margin-left:20px;" size="mini" v-if="pd5.ck7 && !llbnt" @click="getGL(3)">关联关注案件</el-button>
                       </el-col>
                    </el-row>
                <el-row class="ah-40" v-if="pd5.ck3 && (addtype==3 || addtype==2)">
                        <el-col :span="24" class="input-item">
                       <span class="yy-input-text txttop" style="width:10.2%;">结合的议案<br/>建议或提案</span>
                       <div class="yy-input-input" style="width:89%!important;">
                             <el-table
                            ref="multipleTable"
                            :data="ListData9">
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="number"
                                label="编号">
                            </el-table-column>
                            <el-table-column
                                prop="proposalType"
                                label="类型">
                            </el-table-column>
                            <el-table-column
                                prop="title"
                                label="标题">
                            </el-table-column>
                             <el-table-column
                                prop="leaderPerson"
                                label="提出人">
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text" :disabled="llbnt" class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(9,scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>
                            </div>
                         </el-col>
                   </el-row>
                    <el-row class="ah-40" v-if="pd5.ck4 && addtype==3">
                        <el-col :span="24" class="input-item">
                       <span class="yy-input-text" style="width:10.2%;" >代表委员<br/>意见建议</span>
                       <div class="yy-input-input  txttop" style="width:89%!important;">
                             <el-table
                            ref="multipleTable"
                            :data="ListData10">
                            <!-- <el-table-column
                                type="index"
                                label="序号">
                            </el-table-column>
                             <el-table-column
                                prop="number"
                                label="编号">
                            </el-table-column>
                             <el-table-column
                                prop="proposalType"
                                label="类型">
                            </el-table-column>
                            <el-table-column
                                prop="title"
                                label="标题">
                            </el-table-column>
                             <el-table-column
                                prop="leaderPerson"
                                label="提出人">
                            </el-table-column> -->
                             <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="title"
                                label="评价和意见建议">
                            </el-table-column>
                            <el-table-column
                                prop="leaderPerson"
                                label="提出人">
                            </el-table-column>
                            <el-table-column
                                prop="isFeedBack"
                                label="是否反馈">
                            </el-table-column>
                              <el-table-column
                                prop="feedBackTime"
                                label="反馈时间">
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text"  :disabled="llbnt" class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(10,scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>
                            </div>
                         </el-col>
                   </el-row>
                    <el-row class="ah-40" v-if="pd5.ck7 && (addtype==5 || addtype==4)">
                        <el-col :span="24" class="input-item">
                       <span class="yy-input-text txttop" style="width:10.2%;">关注的案件</span>
                       <div class="yy-input-input" style="width:89%!important;">
                             <el-table
                            ref="multipleTable"
                            :data="ListData8">
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                              <el-table-column
                                prop="casenum"
                                label="案件号">
                            </el-table-column>
                             <el-table-column
                                prop="partiesandcasereason"
                                label="当事人及案由">
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text" :disabled="llbnt"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(11,scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>
                            </div>
                         </el-col>
                   </el-row>


                   <el-row class="ah-40" >
                        <el-col :span="24" class="input-item">
                            <span class="yy-input-text textd txttop" title="代表委员及特约人员评价和意见建议">代表委员及特<br>约人员评价和<br>意见建议</span>
                            <div class="yy-input-input inputw">
                            <el-row class="mt-10" style="text-align:right;margin-right:10px;"  v-if='!llbnt'>
                                 <el-button type="success" size="small" @click="gotoya(0)" >关联</el-button>
                              <!-- <el-button type="primary" size="small" plain >录入</el-button>
                              <el-button type="success" size="small" plain  :disabled="bnt">修改</el-button>
                              <el-button type="danger"  size="small" plain  :disabled="bnt">删除</el-button> -->
                            </el-row>
                            <el-table
                            ref="multipleTable"
                            :data="dbtableData"
                            >
                            <!-- <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column> -->
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="title"
                                label="评价和意见建议">
                            </el-table-column>
                            <el-table-column
                                prop="leaderPerson"
                                label="提出人">
                            </el-table-column>
                            <el-table-column
                                prop="isFeedBack"
                                label="是否反馈">
                            </el-table-column>
                              <el-table-column
                                prop="feedBackTime"
                                label="反馈时间">
                            </el-table-column>
                              <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text" :disabled="llbnt"   class="a-btn"  title="删除"  icon="el-icon-delete" @click="pddel(3,scope.row)"></el-button>
                                     </div>
                                  </template>
                              </el-table-column>
                           </el-table>
                            </div>
                        </el-col>
                        
                        <el-col :span="24" class="input-item mt-20">
                           <span class="yy-input-text textd txttop" title="工作情况报告"><font class="red">*</font> 工作情况报告</span>
                            <div class="yy-input-input inputw" v-if='!llbnt'>
                                  <el-button type="primary" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="upload(0)">上传文件</el-button> <span class="ts"></span>
                            </div>
                       </el-col>
                       <el-col :span="24" class="mb-20" v-if="filedata0 && filedata0.length>0">
                            <el-table
                              :data="filedata0">
                              <el-table-column
                                  type="index"
                                  label="序号" width="50">
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
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                      <el-button type="text" :disabled="llbnt"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="delfile(scope.row,filedata0)"></el-button>
                                    </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                             </el-col>
                        <el-col :span="24" class="input-item mt-10">
                           <span class="yy-input-text textd txttop"><font class="red">*</font> 影像资料</span>
                            <div class="yy-input-input inputw"  v-if='!llbnt'>
                                <el-button type="primary"  plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="upload(1)">上传影像资料</el-button> 
                            </div>
                       </el-col>
                       <el-col :span="24" v-if="fits && fits.length>0">
                     
                        <div style="margin-left:11%;"  v-for="(fit,ind) in fits" :key="ind">
                            <div class="block" style="float:left;margin-right:20px;margin-top:20px" v-if='getImgV(fit.filesuffix)'>
                               
                              <el-popover placement="right" title="" trigger="click">
                                <!-- <el-image
                                style="width: 180px; height: 150px"
                                :src="fit.filepath"
                                fit="fit"></el-image> -->
                            <img :src="fit.filepath"  style="max-width:700px; max-height:700px;"/>
                            
                            <img :src="fit.filepath" slot="reference" width="180" height="150">
                                            
                            </el-popover>


                              <a class="close" @click="delImg(fit.imagedatainfoid)" v-if='!llbnt'> <i class="el-icon-close"></i></a>
                             
                            <!-- <div style="font-size:11px;text-align:center">{{fit.filename}}.{{fit.filesuffix}}</div>  -->
                            </div>
                              <div class="block" style="float:left;margin-right:20px;margin-top:20px" v-else>
                                      
                              <el-popover placement="right" title="" trigger="click">
                                     <video  
                                    :src="fit.filepath" width="550" height="500"
                                    class="avatar video-avatar" 
                                    controls="controls" >
                                    您的浏览器不支持视频播放
                             </video>
                                <video  
                                    :src="fit.filepath" width="180" height="150"
                                    class="avatar video-avatar" 
                                    controls="controls" slot="reference">
                                    您的浏览器不支持视频播放
                             </video>
                             </el-popover>
                            <a class="close" @click="delImg(fit.imagedatainfoid)" v-if='!llbnt'> <i class="el-icon-close"></i></a>
                               <!-- <div style="font-size:11px;text-align:center">{{fit.filename}}.{{fit.filesuffix}}</div>  -->
                            </div>
                        </div>
                        </el-col>
                    
                   </el-row>
                  </div>
               <!-- 领导批示 -->
               <div class="ptitle  mb-20">领导批示</div>
               <div class="pborder">
                   <el-row class="ah-50"  v-if="!llbnt">
                       <el-col :span="6">
                           <span class="yy-input-text textp">批示人</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd4.instructorName"  class="yy-input-input inputp" ></el-input>
                        </el-col>
                        <el-col :span="6">
                           <span class="yy-input-text pl-10">批示单位</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd4.instructionUnit"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6">
                           <span class="yy-input-text">职务</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd4.instructionPosition"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6">
                           <span class="yy-input-text">批示时间</span>
                            <el-date-picker class="yy-input-input"
                            v-model="pd4.instructionTime" format="yyyy-MM-dd"
                            type="date" size="small" value-format="yyyy-MM-dd"
                            placeholder="选择时间" >
                        </el-date-picker>
                        </el-col>
                        <el-col :span="24">
                           <span class="yy-input-text texts">批示内容</span>
                           <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd4.instructionContents"  class="yy-input-input" style="width:70%!important;margin-right:20px;"></el-input>
                            <el-button type="success" size="small" plain @click="ChangePSNameList(pd4)">加入列表</el-button>
                       </el-col>
                       
                   </el-row>
                   <el-row class="ah-50">
                       <el-col :span="24">
                          
                            <el-table
                            ref="multipleTable"
                            :data="ListData6">
                            <!-- <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column> -->
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="instructorName"
                                label="批示人">
                            </el-table-column>
                            <el-table-column
                                prop="instructionUnit"
                                label="批示单位">
                            </el-table-column>
                            <el-table-column
                                prop="instructionPosition"
                                label="职务">
                            </el-table-column>
                              <el-table-column
                                prop="instructionTime"
                                label="批示时间">
                            </el-table-column>
                             <el-table-column
                                prop="instructionContents"
                                label="批示内容">
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text"  :disabled="llbnt" class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(6,scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>
      
                        </el-col>
                    
                    </el-row>
                    <el-row class="ah-50" v-if='state!="0"'>
                     <el-col :span="6">
                           <span class="yy-input-text textp">录入单位</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryUnit"  :disabled="true"  class="yy-input-input inputp" ></el-input>
                        </el-col>
                        <el-col :span="6">
                           <span class="yy-input-text pl-10">录入部门</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryDepartment"  :disabled="true"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6">
                           <span class="yy-input-text">录入人</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryPerson"  :disabled="true" class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6">
                           <span class="yy-input-text">录入时间</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryTime"  :disabled="true" class="yy-input-input" ></el-input>
                        </el-col>
                         </el-row>
                </div>

            <div class="footer">
            <el-button type="primary"  style="width:130px;"  v-if="!llbnt"   @click="submit">保 存</el-button>
            <el-button style="width:130px;" @click="goto()">关 闭</el-button>
            </div>
            <br/>
         </div>
  <el-dialog title="上传文件" :visible.sync="uploadDialogVisible" :close-on-click-modal='false'  width="630px">
   <UPLOAD :url="uurl" :type="0" :urlErr="urlErr" @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
  </el-dialog>
  <el-dialog title="上传影视资料" :visible.sync="YJDialogVisible" :close-on-click-modal='false' width="650px">
   <!-- <VIDEO :url="vvurl" :type="2" :urlErr="urlErr" @fatherMethod="DfatherMethod" :random="new Date().getTime()"></VIDEO> -->
     <VIDEONEW :url="vvurl" :type="2" :urlErr="urlErr" @DfatherMethod="DfatherMethod" :random="new Date().getTime()"></VIDEONEW>
  </el-dialog>
<el-dialog :title="yatxt" :visible.sync="lwDialogVisible" :close-on-click-modal='false' class="subtable">
            <el-row class="ah-40">
             <el-col :span="12">
                <span class="yy-input-text trt"><font class="red">*</font> 年份：</span>
               <el-select v-model="pd6.year" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                       <el-option
                            v-for="(item,ind) in yearlist"
                            :key="ind"
                            :label="item.mc"
                            :value="item.dm">
                  </el-option>
                </el-select>
             </el-col>
              <el-col :span="12">
                <span class="yy-input-text trt"> 编号：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="pd6.number"  class="yy-input-input" ></el-input>
             </el-col>
              <el-col :span="12">
                <span class="yy-input-text trt"> 录入法院：</span>
                 <el-select v-model="pd6.createOrgId" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                   v-for="(item,ind) in fydwdata"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.orgid">
                                 </el-option>
                </el-select>
             </el-col>
              <el-col :span="12">
               <span class="yy-input-text trt">领衔人员：</span>
                   <el-select v-model="pd6.leaderPerson" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                   v-for="(item,ind) in xmdata"
                                   :key="ind"
                                   :label="item.fullName"
                                   :value="item.personId">
                      </el-option>
                </el-select>
             </el-col>
              <el-col :span="12">
               <span class="yy-input-text trt">提出组织：</span>
                   <el-select v-model="pd6.leaderOrg" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                   v-for="(item,ind) in $store.state.tazz"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.dm">
                      </el-option>
                </el-select>
             </el-col>
            
              <el-col :span="24">
               <span class="yy-input-text trt" style="width:13.5%;">标题：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="pd6.title"  class="yy-input-input" style="width:80%!important"></el-input>
             </el-col>
          
               <el-col :span="24" style="text-align:center">
                 <el-button type="success"  size="small" @click="CurrentPage1=1;pdsearch(1,CurrentPage1,pageSize1,pd6)"> 查 询</el-button>
                 </el-col>
             </el-row>
                       <el-table
                              :data="pdData1"
                              ref="multipleTable1"
                              @row-click="clickRow1"
                              @selection-change="pdchange1">
                              <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                              <!-- <el-table-column
                                  type="index"
                                  label="序号" width="50">
                              </el-table-column> -->
                              <el-table-column
                                  prop="number"
                                  label="编号">
                              </el-table-column>
                               <el-table-column
                                  prop="proposalType"
                                  label="类型">
                              </el-table-column>
                              <el-table-column
                                  prop="title"
                                  label="标题">
                              </el-table-column>
                             <el-table-column
                                  prop="leaderPerson"
                                  label="领衔人员" v-if="pd5.ck4 && addtype==3">
                              </el-table-column>
                              <el-table-column
                                  prop="leaderPerson"
                                  label="提出人" v-if="pd5.ck3 && (addtype==3 || addtype==2)">
                              </el-table-column>
                               <!-- <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="pddel(1,scope.row)"></el-button>
                                     </div>
                                  </template>
                              </el-table-column> -->
                             </el-table>
                              <div class="middle-foot">
                                <div class="page-msg"></div>
                                <el-pagination
                                    background
                                    @current-change="handleCurrentChange1"
                                    :current-page.sync="CurrentPage1"
                                    :page-size="pageSize1"
                                    layout="prev, pager, next"
                                    :total="TotalResult1">
                                </el-pagination>
                            </div>
        
         <div slot="footer" class="dialog-footer">
            <el-button type="primary"  size="small" @click="pdsubmit(1)">关 联</el-button>
              <el-button @click="lwDialogVisible = false" size="small">取 消</el-button>
            </div>
    </el-dialog>

    
    <el-dialog title="关注案件" :visible.sync="lwDialogVisible2" :close-on-click-modal='false' class="subtable">
        
            <el-row class="ah-40">
              <el-col :span="24">
               <span class="yy-input-text trt">案件号：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="pd8.casenum"  class="yy-input-input" ></el-input>
             </el-col>
              <el-col :span="24">
               <span class="yy-input-text trt">当事人及案由：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="pd8.partiesandcasereason"  class="yy-input-input" ></el-input>
             </el-col>
             
               <el-col :span="24" style="text-align:center">
                 <el-button type="success"  size="small" @click="pdsearch(3)"> 查 询</el-button>
                 </el-col>
             </el-row>
                       <el-table
                              :data="pdData2"
                              ref="multipleTable2"
                              @row-click="clickRow2"
                              @selection-change="pdchange2">
                              <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                              <el-table-column
                                  type="index"
                                  label="序号" width="50">
                              </el-table-column>
                              <el-table-column
                                  prop="casenum"
                                  label="案件号">
                              </el-table-column>
                             <el-table-column
                                  prop="partiesandcasereason"
                                  label="当事人及案由">
                              </el-table-column>
                             </el-table>
        
         <div slot="footer" class="dialog-footer">
            <el-button type="primary"  size="small" @click="pdsubmit(2)">关 联</el-button>
            <el-button @click="lwDialogVisible2 = false" size="small">取 消</el-button>
            </div>
    </el-dialog>
    <el-dialog :title="glname" :visible.sync="dbDialogVisible" :close-on-click-modal='false' class="subtable">
            <el-row class="ah-40">
              <el-col :span="12">
                <span class="yy-input-text trt"><font class="red">*</font> 年份：</span>
               <el-select v-model="pd10.year" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                   v-for="(item,ind) in yearlist"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.dm">
                                 </el-option>
                </el-select>
             </el-col>
              <el-col :span="12">
                <span class="yy-input-text trt"> 编号：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="pd10.number"  class="yy-input-input" ></el-input>
             </el-col>
              <el-col :span="12">
                <span class="yy-input-text trt"> 录入法院：</span>
                 <el-select v-model="pd10.createOrgId" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                   v-for="(item,ind) in lrdata"
                                   :key="ind"
                                   :label="item.mc"
                                   :value="item.orgid">
                                 </el-option>
                </el-select>
             </el-col>
              <el-col :span="12">
               <span class="yy-input-text trt">领衔人员：</span>
                   <el-select v-model="pd10.leaderPerson" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                   v-for="(item,ind) in xmdata"
                                   :key="ind"
                                   :label="item.fullName"
                                   :value="item.personId">
                      </el-option>
                </el-select>
             </el-col>
            
              <el-col :span="24">
               <span class="yy-input-text trt" style="width:13.5%;">标题：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="pd6.title"  class="yy-input-input" style="width:80%!important"></el-input>
             </el-col>
          
               <el-col :span="24" style="text-align:center">
                 <el-button type="success"  size="small" @click="CurrentPage2=1;pdsearch(2,CurrentPage2,pageSize2,pd10)"> 查 询</el-button>
                 </el-col>
             </el-row>
                       <el-table
                              :data="pdData3"
                              ref="multipleTable3"
                              @row-click="clickRow3"
                              @selection-change="pdchange3">
                              <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                              <el-table-column
                                  type="index"
                                  label="序号" width="50">
                              </el-table-column>
                              <el-table-column
                                  prop="number"
                                  label="编号">
                              </el-table-column>
                              <el-table-column
                                  prop="title"
                                  label="标题">
                              </el-table-column>
                                   <el-table-column
                                  prop="leaderPerson"
                                  label="领衔人员">
                              </el-table-column>
                             <el-table-column
                                  prop="isFeedBack"
                                  label="是否反馈">
                              </el-table-column>
                              <el-table-column
                                  prop="feedBackTime"
                                  label="反馈时间">
                              </el-table-column>
                              
                             </el-table>
                                <div class="middle-foot">
                             <div class="page-msg"></div>
                                <el-pagination
                                    background
                                    @current-change="handleCurrentChange2"
                                    :current-page.sync="CurrentPage2"
                                    :page-size="pageSize2"
                                    layout="prev, pager, next"
                                    :total="TotalResult2"
                                    >
                                </el-pagination>
                            </div>
           
        
         <div slot="footer" class="dialog-footer">
            <el-button type="primary"  size="small" @click="pdsubmit(3)">关 联</el-button>
              <el-button @click="dbDialogVisible = false" size="small">取 消</el-button>
            </div>
    </el-dialog>
  
  

    </div>
</template>
<script scoped>
import UPLOAD from "../../Common/upload"
import VIDEO from "../../Common/video"
import VIDEONEW from "../../Common/imgvideo"
import {getServerDate,formatDate,getYear} from '@/assets/js/date.js'
export default {
    components:{UPLOAD,VIDEO,VIDEONEW},
    data(){
        return{
          CurrentPage1: 1,
          pageSize1: parseInt(this.$store.state.pagesize),
          TotalResult1: 0,
          CurrentPage2: 1,
          pageSize2: parseInt(this.$store.state.pagesize),
          TotalResult2: 0,
          pd:{},
          pd1:{},
          pd2:{},
          pd3:{},
          pd4:{},//批示列表
          pd5:{ck1:false,ck2:false,ck3:false,ck4:false,ck5:false,ck7:false,ck6:false,ck8:false},//复选框 单元框
          pd6:{},
          pd7:{},//接待人员列表
          pd8:{},//关注案件
          pd10:{},//用于日常建议
          form:{orgDepartmentId:'',undertakeDepartmentId:'',devDepartmentId:''},
          tableData1:[],
          tableData2:[],
          ListData1:[],
          ListData2:[],
          ListData3:[],
          ListData4:[],
          ListData5:[],
          ListData6:[],//批示列表
          ListData7:[],//接待人员列表
          ListData8:[],//关注的案件
          ListData9:[],//结合的议案建议或提案
          ListData10:[],//代表委员意见建议
          pdData1:[],
          pdData2:[],
          pdData3:[],
          filedata0:[],//文件
          multipleTable:[],
          pdmult1:[],
          pdmult2:[],
          pdmult3:[],
          dbtableData:[],
          pairDialogVisible:false,
          dbDialogVisible:false,
          bnt:true,
          uurl:'/FileUploadController/uploadWorkReport',
          vvurl:'/FileUploadController/uploadImageData',
          urlErr:'',
          uploadDialogVisible:false,
          YJDialogVisible:false,
          lwDialogVisible:false,
          lwDialogVisible2:false,
          addtype:'',
          cname:'',
          cnames:'',
          label4:'',
          lmdbid:'',
          xmdata:[],//代表、委员以及特约人员
          count1:0,
          fyld:'',
          fydata:[],//法院领导
          count2:0,
          count3:0,
          fydwdata:[],
          fybmdata:[],
          fybmdata1:[],//承办部门
          fybmdata2:[],//开展部门
          cbdwdata:[],
          llgzform:{},
          activityInfoId:'',
          state:'',
          llbnt:false,
          yatxt:'',
          fits:[],//影像资料
          jdrdata:[],//接待人员
          baseid:[],
          yearlist:getYear(),
          lrdata:[],//录入法院
          glname:'代表委员及特约人员评价和意见建议',
          glbs:0,
        };
    },
    watch:{
       $route:function(val){
           this.getinit(val);
           
       }
    },
    mounted()
    {
        this.$store.dispatch("getXb");
        this.$store.dispatch("getScfl");
        this.$store.dispatch("getXwdwfl");
        this.$store.dispatch("getTazz");
        this.getinit(this.$route);
    
    },
     activated(){
       
    },
    methods:{
        pageSizeChange1(val) {
          this.pageSize1=val;
           this.pdsearch(1,this.CurrentPage1, val, this.pd6);
        },
        handleCurrentChange1(val) {
          this.CurrentPage1=val;
            this.pdsearch(1,val, this.pageSize1, this.pd6);
        },
         handleCurrentChange2(val) {
          this.CurrentPage2=val;
          this.pdsearch(2,val, this.pageSize2, this.pd10);
        },

        clickRow1(row){
           this.$refs.multipleTable1.toggleRowSelection(row)
        },
        clickRow2(row){
           this.$refs.multipleTable2.toggleRowSelection(row)
        },
        clickRow3(row){
           this.$refs.multipleTable3.toggleRowSelection(row)
        },
        pdchange1(val){
            this.pdmult1=val;
        },
        pdchange2(val){
            this.pdmult2=val;
        },
        pdchange3(val){
            this.pdmult3=val;
        },
        //代表、委员以及特约人员列表
         getName(){
           let p={
             'name':''
           };
           this.$api.post(this.Global.aport1+'/baseinfo/personlist',p,
             r =>{
                  
                   this.xmdata=r.data;
            });
        },
        ChangeNameList(val){
            if(val=='' || val==null){return;}
            var arr=val.split('|');
            if(this.lmdbid==undefined || this.lmdbid==""){
              this.$message.error("代表、委员以及特约人员不能为空！");return;
            }
             var obj = {};
                 obj = this.xmdata.find(item =>{
                     return item.pbId === arr[0] && item.personId === arr[1]
                });
         
            var srr=this.ListData4;
            var ff=false;
            for (let i = 0; i < srr.length; i++) {
               if(srr[i].pbId==arr[0])
               {
                   ff=true;
                this.$confirm(srr[i].personName+'已经存在?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                  this.delAdd(4,srr[i]);
                  this.ListData4.push(obj);
                  this.count1=this.ListData4.length;
                }).catch(() => {
                   
                      this.$message.info("已取消操作");

                 }); 
               }
            }
              if(!ff){
               this.ListData4.push(obj);
               this.count1=this.ListData4.length;
               }
               this.lmdbid="";
        },
        //法院领导
         getFYName(){
          //  let p={
          //    'orgId':this.$store.state.orgid,
          //    'isLeader':'1'
          //  };
          //  this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
          //    r =>{
                  
          //          this.fydata=r.data;
          //   });

             let p={
               
               'personName':'',
             };
            this.$api.post(this.Global.aport1+'/courtPerson/getCourtLeader',p,
                r =>{
                    if(r.code==1){
                      
                          this.fydata=r.data;
                      
                    }
                });
        },
        ChangeFYNameList(val){
             if(this.fyld==undefined || this.fyld==""){
               this.$message.error("法院领导不能为空！");return;
             }
          var obj = {};
                 obj = this.fydata.find(item =>{
                     return item.pbId ===val   
                });
            
           var srr=this.ListData5;
            var ff=false;
            for (let i = 0; i < srr.length; i++) {
               if(srr[i].pbId==val)
               {
                   ff=true;
                this.$confirm(srr[i].personName+'已经存在?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                  this.delAdd(12,srr[i]);
                  this.ListData5.push(obj);
                  this.count2=this.ListData5.length;
                }).catch(() => {
                    
                      this.$message.info("已取消操作");

                 }); 
               }
            }
            if(!ff){
           this.ListData5.push(obj);
           this.count2++;
           }
           this.fyld='';
         
        },
         ChangePSNameList(n){
           if(this.pd4.instructorName==undefined || this.pd4.instructorName==""){
               this.$message.error("批示人不能为空！");return;
           }
           if(this.pd4.instructionUnit==undefined || this.pd4.instructionUnit==""){
               this.$message.error("批示单位不能为空！");return;
           }
           if(this.pd4.instructionPosition==undefined || this.pd4.instructionPosition==""){
               this.$message.error("职务不能为空！");return;
           }
           if(this.pd4.instructionTime==undefined || this.pd4.instructionTime==""){
               this.$message.error("批示时间不能为空！");return;
           }
           if(this.pd4.instructionContents==undefined || this.pd4.instructionContents==""){
               this.$message.error("批示内容不能为空！");return;
           }
            this.ListData6.push(n);
            this.pd4={};
        },
    //     //得到标签名称
    //    chChange(val,t){
    //         var obj = {};
    //         obj = this.chOptions.find(item =>{
    //             return item.chid === val 
    //         });
    //      this.editMessage.chname = obj.mc
    //     },
        //初始
        reset(){
            // Object.assign(this.$data, this.$options.data.call(this));
            this.pd={};
            this.pd1={};
            this.pd2={};
            this.pd3={};
            this.pd4={};
            this.pd6={};
            this.pd7={};
            this.pd8={};
            this.pd5={ck1:false,ck2:false,ck3:false,ck4:false,ck5:false,ck7:false,ck6:false,ck8:false},//复选框 单元框
            this.form={orgDepartmentId:'',undertakeDepartmentId:'',devDepartmentId:''},
            this.tableData1=[];
            this.tableData2=[];
            this.ListData1=[];
            this.ListData2=[];
            this.ListData3=[];
            this.ListData4=[];
            this.ListData5=[];
            this.ListData6=[];
            this.ListData7=[];
            this.ListData8=[];
            this.ListData9=[];
            this.ListData10=[];
            this.fits=[];
            this.llbnt=false;
            this.lrdata=[];
            this.jdrdata=[];
            this.llgzform={};
            this.fydwdata=[];
            this.fybmdata=[];
            this.xmdata=[];
            this.cbdwdata=[];
            this.fybmdata1=[];
            this.fybmdata2=[];
            this.pdData1=[];
            this.pdData2=[];
            this.pdData3=[];
            this.filedata0=[];
            this.dbtableData=[];
            this.count1=0;
            this.count2=0;
        },
        getinit(val){
         this.reset();
         this.addtype=val.query.type;
         this.baseid=val.query.baseid;
         this.activityInfoId=val.query.activityInfoId;
         
          var mid="";
          switch (this.addtype) {
            case '2':
              mid='12032302';
              break;
            case '3':
              mid='12052303';
              break;
            case '4':
              mid='12072304';
              break;
            case '5':
              mid='12092305';
              break;
            case '6':
              mid='12112306';
              break;
            case '7':
              mid='12132307';
              break;
            case '8':
              mid='12152308';
              break;
            case '9':
              mid='12172309';
              break;
            case '10':
              mid='12192310';
              break;
            default:
              break;
          }
          //权限start
                 this.$api.post(this.Global.menuurl,{'menuId':mid},
                     r =>{
                          if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
                  });
          //权限end

         this.getName();
         this.getCBDW();
         this.getFYName();
         this.getFY();
         this.getLRFY();
            if(val.query.state==null){
             this.state="0";
         }else{
              this.state=val.query.state;
         }
         if(this.state=='9'){
             this.llbnt=true;
         }
         switch (this.addtype) {
            case '3':
                 this.cname="专题调研活动";
                 this.label4="调研总体情况";
                 this.form.activityType="0149000003";//调研
                 break;
            case '4':
                 this.cname="旁听庭审活动";
                 this.label4="旁听情况";
                 this.form.activityType="0149000004";//旁听
                 break;
            case '5':
                 this.cname="见证执行活动";
                 this.label4="活动情况";
                 this.form.activityType="0149000005";
                 break;
            case '6':
                 this.cname="会议座谈活动";
                 this.label4="会议座谈情况";
                  this.form.activityType="0149000006";//座谈
                 break;
            case '7':
                 this.cname="日常走访活动";
                 this.label4="走访情况";
                 this.form.activityType="0149000007";

                 break;
            case '8':
                 this.cname="新闻宣传活动";
                 this.label3="新闻媒体列表";
                 this.label4="有关内容";
                 this.form.activityType="0149000009";
                 break;
            case '9':
                 this.cname="日常接待活动";
                 this.label4="接待情况";
                 this.form.activityType="0149000008";
                 break;
            case '10':
                 this.cname="其他活动";
                 this.label4="活动情况";
                 this.form.activityType="0149000010";//其他 
                 break;
             default:
                 this.cname="专项视察活动";
                 this.label4="视察总体情况";
                 this.form.activityType="0149000002";//专项视察
                 break;
         }

        // this.cnames=this.cname.replace("录入","");
        //  this.form.entryUnit=this.$store.state.orgname;
        //  this.form.entryDepartment=this.$store.state.bmname;
        //  this.form.entryPerson=this.$store.state.uname;
        //  this.form.entryTime=getServerDate();

         this.getList();

        },
        getList(){
            if(this.state=='1' || this.state=='9')
            {
             let p={
                 'activityInfoId':this.activityInfoId,
             };
             this.$api.post(this.Global.aport2+'/ActivityInfoController/getAllActivityInfo',p,
                r =>{
                     // this.form=r.data;
                     if(r.code==1){
                      
                         this.form=r.data.activity;
                         if(this.form.organizationalUnitId!=null){
                             this.getcbbm(this.form.organizationalUnitId,0,'1');
                         }
                         if(this.form.undertakeUnitId!=null){
                             this.getcbbm(this.form.undertakeUnitId,1,'1');
                         }
                         if(this.form.developmentUnitId!=null){
                             this.getcbbm(this.form.developmentUnitId,2,'1');
                         }
                         //日常接待的接待人员
                         if(r.data.receptionistList!=null){
                             this.ListData7=r.data.receptionistList;
                             this.count3=this.ListData7.length;
                         }
                         //代表、委员以及特约人员
                         if(r.data.participantsList!=null)
                         {
                           this.ListData4=r.data.participantsList;
                           this.count1=this.ListData4.length;
                            }

                            //法院领导
                         if(r.data.courtPersons!=null){
                         this.ListData5=r.data.courtPersons;
                         this.count2=this.ListData5.length;
                         }
                         if(r.data.leadershipIns!=null){
                         this.ListData6=r.data.leadershipIns;
                         }
                       
                        if(r.data.actiRelAdvList!=null){
                            this.dbtableData=r.data.actiRelAdvList;
                        }
                        if(r.data.actiWorkReport!=null){
                           this.filedata0=r.data.actiWorkReport;
                        }
                        if(r.data.inspectUnitCondition!=null){
                          this.ListData1=r.data.inspectUnitCondition;
                          this.ListData2=r.data.inspectUnitCondition;
                          }
                        if(r.data.imageDataList!=null){
                           this.fits=r.data.imageDataList;
                           console.log(this.fits,'this.fits');
                           
                        }
                        //人民法院各部门组织开展的特约监督员或特邀咨询员活动
                        if(r.data.activity.isSpecialPerson=="0184000001"){
                            this.pd5.ck1=true;
                        }else{
                            this.pd5.ck1=false;
                        }
                        //是否大要案
                        if(r.data.activity.emphasisCase=="0212000001"){
                            this.pd5.ck6=true;
                        }else{
                            this.pd5.ck6=false;
                        }

                        if(r.data.activity.organizeDiscussionExchange=='0260000001')
                        {  
                            this.pd5.ck8=true;
                        }else{
                           this.pd5.ck8=false;
                        }
                            
                         //集中专项视察
                        if(r.data.activity.isSpecialInspection=="0151000001"){
                            this.pd5.ck2=true;
                        }else{
                              this.pd5.ck2=false;
                        }
                        //结合议案建议或政协提案办理
                        if(r.data.activity.isMeetingMotion=="0155000001"){
                            
                          if(r.data.proposalRelActi!=null){
                             this.ListData9=r.data.proposalRelActi;
                           }
                            this.pd5.ck3=true;
                        }else{
                           this.pd5.ck3=false;
                        }
                        //代表委员意见建议办理
                        if(r.data.activity.isDailyMotion=="0126000001"){
                            if(r.data.proposalRelActi!=null){
                             this.ListData10=r.data.proposalRelActi;
                           }
                            this.pd5.ck4=true;
                        }else{
                             this.pd5.ck4=false;
                        }
                        //院领导参与标识
                        if(r.data.activity.isLeadershipIn=="0208000001"){
                            this.pd5.ck5=true;
                        }else{
                            this.pd5.ck5=false;
                        }
                         //代表、委员或监督员、咨询员关注案件
                        if(r.data.activity.isFocusCase=="0125000001"){
                            if(r.data.actiRelCaseList!=null){
                            this.ListData8=r.data.actiRelCaseList;
                            }
                            this.pd5.ck7=true;
                        }else{
                            this.pd5.ck7=false;
                        }
                        if(r.data.newsMediaList!=null){
                            this.ListData3=r.data.newsMediaList;
                        }


                     }else{
                         this.$message.error(r.message);
                     }
                      
                });
            }

        },
        DfatherMethod(data,type){
            
           if(this.fits && this.fits.length>0){
             for (let i = 0; i < data.length; i++) {
               this.fits.push(data[i]);
             }
           }else{
              this.fits=data;
           }
          this.YJDialogVisible = false;
              
        },
       delImg(data){
            // let p={
            //     'imagedatainfoid':data.imagedatainfoid,
            // };
            //  this.$api.post(this.Global.aport2+'/FileUploadController/delImageDataInfo',p,
            //     r =>{
            //          if(r.code==1){
            //                  this.$message({
            //                       "type":"success",
            //                       "message":'删除成功',
            //                   });
                     
            //           }
            //     });
           var index = this.fits.findIndex(item =>{
    　　　　　 if(item.imagedatainfoid==data){
            　　　　return true
            　　}
            　})
             this.fits.splice(index,1)
       },
        fatherMethod(data,t){
         if(t=='0')
         {
           if(this.filedata0 && this.filedata0.length>0){
            
             for (let i = 0; i < data.length; i++) {
               this.filedata0.push(data[i]);
               
             }
           }else{
           this.filedata0=data;
           }
         }
          this.uploadDialogVisible = false;
              
        },
        handleSelectionChange(val){
            this.multipleTable=val;
        },
        getPair(){
            this.pairDialogVisible=true;
        },
        upload(t){
            if(t==1){
               this.YJDialogVisible=true;
            }else{
               this.uploadDialogVisible=true;
               }
        },
        goto(){

             if(this.baseid!=null){
                    var arr=this.baseid.split('|');
                
                      this.$router.push({name:'BaseAdd',query:{type:arr[0],status:arr[1],pbid:arr[2],reid:arr[3],wtitle:arr[4]==''?'11':arr[4]}});
                   }else{
                      this.$router.push({name:'PairList',query:{type:this.addtype}});
               }
        },
        getAdd(t,val){
             if(t==1){ //视察列表
            
                 if(this.pd1.inspectOrgId==undefined || this.pd1.inspectOrgId==''){
                     this.$message.error("视察单位不能为空!");return;
                 }
                 if(this.pd1.inspectTypeId==undefined || this.pd1.inspectTypeId==''){
                     this.$message.error("视察内容不能为空!");return;
                 }
                 this.ListData1.push(val);
               
                 this.pd1={};
             }else if(t==2){
                  if(this.pd2.inspectOrgId==undefined || this.pd2.inspectOrgId==''){
                     this.$message.error("调研单位不能为空!");return;
                 }
                 if(this.pd2.inspectTypeId==undefined || this.pd2.inspectTypeId==''){
                     this.$message.error("调研内容不能为空!");return;
                 }
                 this.ListData2.push(val);
               
                this.pd2={};
             }else if(t==3){
                  if(this.pd3.newsMediaName==undefined || this.pd3.newsMediaName==''){
                     this.$message.error("新闻单位名称不能为空!");return;
                 }
                 if(this.pd3.newsMediaTypeId==undefined || this.pd3.newsMediaTypeId==''){
                     this.$message.error("新闻单位类别不能为空!");return;
                 }
                 this.ListData3.push(val);
               
                this.pd3={};
             }else if(t==4){
                  if(this.pd7.receptionistid==undefined || this.pd7.receptionistid==''){
                     this.$message.error("接待人员不能为空!");return;
                 }
                 this.ListData7.push(val);
                const res = new Map();
                var arr=this.ListData7;
                this.ListData7=arr.filter((arr) => !res.has(arr.personName) && res.set(arr.personName, 1))
                this.pd7={};
                this.count3++;
             }

        },
        downData(n){
          // window.location.href=n.filepath;
          var alink = document.createElement("a");
          alink.href = n.filepath
          alink.setAttribute('download',n.filename)
          document.body.appendChild(alink)
          alink.click()
        },
        delAdd(t,n){
            if(t==1){ //视察列表
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData1.findIndex(item =>{
    　　　　　　　　　  　 if(item.inspectOrgId==arr[i].inspectOrgId && item.inspectTypeId==arr[i].inspectTypeId){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}

            　　　　　　　　})
            　　　　　 this.ListData1.splice(index,1)
                 }
              }else if(t==2){
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData2.findIndex(item =>{
    　　　　　　　　　  　 if(item.inspectOrgId==arr[i].inspectOrgId && item.inspectTypeId==arr[i].inspectTypeId){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.ListData2.splice(index,1)
                 }
              }else if(t==3){
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData3.findIndex(item =>{
    　　　　　　　　　  　 if(item.newsMediaName==arr[i].newsMediaName){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.ListData3.splice(index,1)
                 }
              }else if(t==4){
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData4.findIndex(item =>{
    　　　　　　　　　  　 if(item.personId==arr[i].personId){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　this.ListData4.splice(index,1);
                 this.count1=this.ListData4.length;
                    
                 }
              }else if(t==5){
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData5.findIndex(item =>{
    　　　　　　　　　  　 if(item.personName==arr[i].personName){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.ListData5.splice(index,1);
                   if(this.count2>0){this.count2--;}
                 }
              }else if(t==6){
                  
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData6.findIndex(item =>{
    　　　　　　　　　  　 if(item.instructorName==arr[i].instructorName){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.ListData6.splice(index,1);
                
                 }
              }else if(t==7){
                  
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData7.findIndex(item =>{
    　　　　　　　　　  　 if(item.personName==arr[i].personName){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.ListData7.splice(index,1);
                
                 }
                 this.count3--;
              }else if(t==9){
                  var arr=[];
                  arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData9.findIndex(item =>{
    　　　　　　　　　  　 if(item.number==arr[i].number){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.ListData9.splice(index,1);
                
                 }
              }
              else if(t==10){
                  var arr=[];
                  arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData10.findIndex(item =>{
    　　　　　　　　　  　 if(item.number==arr[i].number){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.ListData10.splice(index,1);
                
                 }
              }else if(t==11){
                  var arr=[];
                  arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData8.findIndex(item =>{
    　　　　　　　　　  　 if(item.caseNumber==arr[i].caseNumber){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.ListData8.splice(index,1);
                
                 }
              }else if(t==12){
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData5.findIndex(item =>{
    　　　　　　　　　  　 if(item.pbId==arr[i].pbId){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　this.ListData5.splice(index,1);
                 this.count2=this.ListData5.length;
                    
                 }
              }
        },
         delfile(n,filedata){
           
            // let p={
            //       'activityWorkReportId':n.activityWorkReportId,
            //       'token':this.$store.state.token,
            // };
            //  this.$api.post(this.Global.aport2+'/FileUploadController/delWorkReport',p,
            //     r =>{

                    

                     
            //     });

                 var arr=[];
                     arr.push(n);
                    for (let i = 0; i < arr.length; i++) {
                     var index = filedata.findIndex(item =>{
　　　　　　　　　  　 if(item.activityworkreportid==arr[i].activityworkreportid){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　　　　　　filedata.splice(index,1)
                    }
        },

        pddel(t,n){
            if(t==1){ 
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.pdData1.findIndex(item =>{
    　　　　　　　　　  　 if(item.title==arr[i].title){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　this.pdData1.splice(index,1)
                 }
            }
            else if(t==3){ 
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.dbtableData.findIndex(item =>{
    　　　　　　　　　  　 if(item.title==arr[i].title){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　this.dbtableData.splice(index,1)
                 }
            }
        },
        getGLXX(t)
        {
            if(t==1){ //关注的案件保存
             this.ListData8=[];
                if(this.pdmult2.length==0){
                    this.$message.error("请选择至少一条数据");return;
                }   
                var array=this.pdmult2;
               for (let i = 0; i < array.length; i++) {
                   var obj={};
                   obj.caseNumber=array[i].casenum;
                   obj.causeOfActionAndParties=array[i].partiesandcasereason;
                   this.ListData8.push(obj);
                   
               }
               
               this.lwDialogVisible2=false;
                
            }
        },
        submit(){
             if(this.form.startTime==undefined || this.form.startTime=="")
              {
                  this.$message.error("开始时间不能为空！");return;
              }
              if(this.form.endTime==undefined || this.form.endTime=="")
              {
                  this.$message.error("结束时间不能为空！");return;
              }
              if(this.form.startTime!='' && this.form.endTime!='' && this.form.startTime>this.form.endTime){
                    this.$message.error("开始时间不能大于结束时间！");return;
              }
              if(this.form.location==undefined || this.form.location=="")
              {
                  this.$message.error("地点不能为空！");return;
              }
              if(this.addtype!=9 ){
                if(this.form.theme==undefined || this.form.theme=="")
                {
                    var label="主题";
                    if(this.addtype==4 || this.addtype==5){
                        label="当事人及案由";
                    }else if(this.addtype==6){
                        label="会议名称";
                    }
                    this.$message.error(label+"不能为空！");return;
                }
              }
              if(this.form.organizationalUnitId==undefined || this.form.organizationalUnitId=="")
              {
                  var jdlabel="组织单位";
                  if(this.addtype==9){
                      jdlabel="接待单位";
                  }

                  this.$message.error(jdlabel+"不能为空！");return;
              }
               if(this.form.orgDepartmentId==undefined || this.form.orgDepartmentId=="")
              {
                  var jdlabel="组织部门";
                  if(this.addtype==9){
                      jdlabel="接待部门";
                  }

                  this.$message.error(jdlabel+"不能为空！");return;
              }
              if(this.addtype==4 || this.addtype==6 || this.addtype==8)
              {
               if(this.form.undertakeUnitId==undefined || this.form.undertakeUnitId=="")
              {
                  var jdlabel="邀请单位";
                  if(this.addtype!=8){
                      jdlabel="承办单位";
                  }

                  this.$message.error(jdlabel+"不能为空！");return;
              }
              if(this.form.undertakeDepartmentId==undefined || this.form.undertakeDepartmentId=="")
              {
                  var jdlabel="邀请部门";
                  if(this.addtype!=8){
                      jdlabel="承办部门";
                  }

                  this.$message.error(jdlabel+"不能为空！");return;
              }
              }
              if(this.addtype==10 || this.addtype==6 || this.addtype==5 || this.addtype==7)
              {
                   if(this.form.developmentUnitId==undefined || this.form.developmentUnitId=="")
                    {
                        this.$message.error("开展单位不能为空！");return;
                    }
                   if(this.form.devDepartmentId==undefined || this.form.devDepartmentId=="")
                    {
                        this.$message.error("开展部门不能为空！");return;
                    }
              }
              if(this.ListData4.length==0){
                  
               this.$message.error("代表、委员以及特约人员列表不能为空！");return;
              }
            if(this.form.contents==undefined || this.form.contents==""){
                  
               this.$message.error(this.label4+"不能为空！");return;
              }

               if(this.filedata0.length==0){
                  
               this.$message.error("工作情况报告不能为空！");return;
              }
              if(this.fits.length==0){
                  
               this.$message.error("影像资料不能为空！");return;
              }
             
              
                if(this.addtype=="4" || this.addtype=="5"){
                this.form.startTime=formatDate(new Date(this.form.startTime),'yyyy-MM-dd hh:mm');
                this.form.endTime=formatDate(new Date(this.form.endTime),'yyyy-MM-dd hh:mm');
                }else{
                this.form.startTime=formatDate(new Date(this.form.startTime),'yyyy-MM-dd');
                this.form.endTime=formatDate(new Date(this.form.endTime),'yyyy-MM-dd');
                }
              

              if(this.addtype=="2"){ //专题视察
              this.llgzform.inspectUnitCondition=this.ListData1;     
              }else if(this.addtype=="3"){ //调研
               this.llgzform.inspectUnitCondition=this.ListData2;  
  
              }else if(this.addtype=="8"){ //新闻
               this.llgzform.newsMediaList=this.ListData3;  
              }else if(this.addtype=="9"){ //日常接待
            //    this.llgzform.newsMediaList=this.ListData3;  
               this.llgzform.receptionistList=this.ListData7;
              }else if(this.addtype=="4" || this.addtype=="5"){
                  this.llgzform.actiRelCaseList=this.ListData8;//关注的案件
              }

               this.llgzform.courtPersons=this.ListData5;//法院领导
               this.llgzform.participantsList=this.ListData4;//代表、委员以及特约人员列表
               this.llgzform.leadershipIns=this.ListData6;//领导批示
               //人民法院各部门组织开展的特约监督员或特邀咨询员活动
               if(this.pd5.ck1){
                 this.form.isSpecialPerson="0184000001";
               }else{
                    this.form.isSpecialPerson="0184000002";
               }
                //是否大要案
               if(this.pd5.ck6){
                this.form.emphasisCase="0212000001";
               }else{
               this.form.emphasisCase="0212000002";
               }
                //组织座谈交流
               if(this.pd5.ck8){
                 this.form.organizeDiscussionExchange="0260000001";
               }else{
                 this.form.organizeDiscussionExchange="0260000002";
               }
               //集中专项视察
               if(this.pd5.ck2){
                this.form.isSpecialInspection="0151000001";
               }else{
               this.form.isSpecialInspection="0151000002";
               }
               //结合议案建议或政协提案办理
               if(this.pd5.ck3){
                   this.form.isMeetingMotion="0155000001";
               }else{
                this.form.isMeetingMotion="0155000002";
               }
               //代表委员意见建议办理
                if(this.pd5.ck4){
                   this.form.isDailyMotion="0126000001";
               }else{
                    this.form.isDailyMotion="0126000002";
               }
               //院领导参与标识
                if(this.pd5.ck5){
                   this.form.isLeadershipIn="0208000001";
               }else{
                   this.form.isLeadershipIn="0208000002";
               }
               //代表、委员或监督员、咨询员关注案件
               if(this.pd5.ck7){
                   this.form.isFocusCase="0125000001";
               }else{
                   this.form.isFocusCase="0125000002";
               }
               this.form.entryUnitId=this.$store.state.orgid;//录入单位
               this.form.entryDepartmentId=this.$store.state.bmid;//部门ID
               this.form.entryPerson=this.$store.state.uname
            //    this.form.entryTime=getServerDate();
               this.llgzform.activity=this.form;
               this.llgzform.actiWorkReport=this.filedata0;
               this.llgzform.imageDataList=this.fits;
               if(this.ListData9!=[] && this.pd5.ck3 && (this.addtype==3 || this.addtype==2)){
                 this.llgzform.proposalRelActi=this.ListData9;//议案建议提案关联活动
               }
               if(this.ListData10!=[] && this.pd5.ck4 && this.addtype==3){
                 this.llgzform.proposalRelActi=this.ListData10;//议案建议提案关联活动
               }
                if(this.ListData8!=[] && this.pd5.ck7){
                  this.llgzform.actiRelCaseList=this.ListData8;//活动关联关注案件
                }
                 this.llgzform.actiRelAdvList=this.dbtableData;
              this.$api.post(this.Global.aport2+'/ActivityInfoController/saveActivityInfo',this.llgzform,
                r =>{
                         if(r.code==1){
                              
                              this.$message.success(r.message);
                         
                        
                            if(this.baseid!=null){
                                var arr=this.baseid.split('|');
                              
                                
                                this.$router.push({name:'BaseAdd',query:{type:arr[0],status:arr[1],pbid:arr[2],reid:arr[3],wtitle:arr[4]==''?'11':arr[4]}});
                              }else{
                                this.$router.push({name:"PairList"});
                              }
                        
                         }else{
                             this.$message.error(r.message);
                         }
                });

        },
        getGL(t){
           if(t==1){
                this.yatxt="议案建议或提案";
                this.pd6={};
                this.pdData1=[];
                this.TotalResult1=0;
                this.lwDialogVisible=true;
           }
           else if(t==2){
               // this.yatxt="代表委员意见建议";
                // this.pdData1=[];
                // this.pd6={};
                //  this.TotalResult1=0;
                this.glname="代表委员意见建议";
                this.pdData3=[];
                this.pd10={};
                this.TotalResult2=0;
                this.glbs=1;
                this.dbDialogVisible=true;
            }
            else if(t==3){
                this.pdData2=[];
                this.pd8={};
                this.lwDialogVisible2=true;
            }
        },
        //查询
        pdsearch(t,currentPage,showCount,pd){
          
             if(t==3){
                   this.pd8.token=this.$store.state.token;
              this.$api.post(this.Global.aport2+'/CaseRegisterController/queryFocusCaseNumAndCaseReason',this.pd8,
                r =>{
                   this.pdData2=r.data;
                });
             }else if(t==1){
               
               
                if(this.pd6.year==null || this.pd6.year==undefined || this.pd6.year==''){
                    this.$message.error("年份不能为空!");return;
                }
                    let p={
                        'pd':pd,
                            "pageInfo":{
                            "pageNumber":currentPage,
                            "pageSize":showCount,
                            },
                            'token':this.$store.state.token,
                    }
               this.$api.post(this.Global.aport2+'/proposalHome/queryToActivity',p,
                r =>{
                if(r.code==1){
                    this.pdData1=r.data.basicCondition;
                    this.TotalResult1=r.data.pageInfo.total;
                 }

                });
            
             }
             else if(t==2){

                 if(this.pd10.year==null || this.pd10.year==undefined || this.pd10.year==''){
                    this.$message.error("年份不能为空!");return;
                }
               this.pd10.proposalType="0204000005";
               let p={
                        'pd':pd,
                            "pageInfo":{
                            "pageNumber":currentPage,
                            "pageSize":showCount,
                            },
                            'token':this.$store.state.token,
                    }
               this.$api.post(this.Global.aport2+'/proposalHome/queryToActivity',p,
                r =>{

                   
                    if(r.code==1){
                    this.pdData3=r.data.basicCondition;
                    this.TotalResult2=r.data.pageInfo.total;
                 }

                });
            
             }
        },
        gotoya(t){
           this.pd10={};
           this.pdData3=[];
           this.glbs=2;
           this.dbDialogVisible=true;
        },
        pdsubmit(t){
           if(t==1){
                if(this.pdmult1.length==0){
                    this.$message.error("请选择一条数据！");return;
                }
                var arr=this.pdmult1;
                for (let i = 0; i < arr.length; i++) {
                    
                    if(this.pd5.ck3 && (this.addtype==3 || this.addtype==2)){
                     
                     //start 去重
                 
                         this.ListData9.push(arr[i]);
                 
                    //end
                    }
                    // else if(this.pd5.ck4 && this.addtype==3){
                    //      this.ListData10.push(arr[i]);
                    //  }
                    }
                if(this.pd5.ck3 && (this.addtype==3 || this.addtype==2)){
                const rese = new Map();
                var arre=this.ListData9;
                this.ListData9=arre.filter((arre) => !rese.has(arre.proposalInfoId) && rese.set(arre.proposalInfoId, 1));
                }
                // else if(this.pd5.ck4 && this.addtype==3){
                //  const ress = new Map();
                //  var arrs=this.ListData10;
                //  this.ListData10=arrs.filter((arrs) => !ress.has(arrs.proposalInfoId) && ress.set(arrs.proposalInfoId, 1));
                // }

                
                this.lwDialogVisible=false;
               
           }else if(t==2){
                     if(this.pdmult2.length==0){
                    this.$message.error("请选择一条数据！");return;
                }
                var arr=this.pdmult2;
                for (let i = 0; i < arr.length; i++) {
                    
                        //start 去重
                    // var srr=this.ListData8;
                    // if(srr.length==0){
                         this.ListData8.push(arr[i]);
                    // }else{
                    //     for (let j = 0; j < srr.length; j++) {
                    //         if(arr[i].focuscaseid==srr[j].focuscaseid){
                    //         }
                    //     }
                    //     this.ListData8.push(arr[i]); 
                    //  }
                    //end
                    
                }

             const res = new Map();
             var arr=this.ListData8;
             this.ListData8=arr.filter((arr) => !res.has(arr.focuscaseid) && res.set(arr.focuscaseid, 1));
             this.lwDialogVisible2=false;
           }
           else if(t==3){
                if(this.pdmult3.length==0){
                    this.$message.error("请选择一条数据！");return;
                }
                var arr=this.pdmult3;
                for (let i = 0; i < arr.length; i++) {
                    var lrr=this.ListData10;
                    var drr=this.dbtableData;
                    var lff=true,lss=true;
                   if(this.pd5.ck4 && this.addtype==3 && this.glbs==1){
                       
                         if(lrr.length>0 || drr.length>0){
                           for (let ll = 0; ll < lrr.length; ll++) {
                               console.log('---',arr[i].proposalInfoId,lrr[ll].proposalInfoId);
                               
                             if(arr[i].proposalInfoId==lrr[ll].proposalInfoId)  
                               {
                                  lff=false;
                               }
                           }
                         
                         
                            for (let ss = 0; ss < drr.length; ss++) {
                                      console.log('===',arr[i].proposalInfoId,drr[ss].proposalInfoId);
                             if(arr[i].proposalInfoId==drr[ss].proposalInfoId)  
                               {
                                  lss=false;
                               }
                            }
                          
                           if(lff && lss){
                              this.ListData10.push(arr[i]);
                            }
                       }else{
                           this.ListData10.push(arr[i]);
                        }

                     }else if(this.glbs==2){
                           if(lrr.length>0 || drr.length>0){
                           for (let ll = 0; ll < lrr.length; ll++) {
                               console.log('---',arr[i].proposalInfoId,lrr[ll].proposalInfoId);
                               
                             if(arr[i].proposalInfoId==lrr[ll].proposalInfoId)  
                               {
                                  lff=false;
                               }
                           }
                         
                         
                            for (let ss = 0; ss < drr.length; ss++) {
                                      console.log('===',arr[i].proposalInfoId,drr[ss].proposalInfoId);
                             if(arr[i].proposalInfoId==drr[ss].proposalInfoId)  
                               {
                                  lss=false;
                               }
                            }
                          
                           if(lff && lss){
                              this.dbtableData.push(arr[i]);
                            }
                           }else{
                         this.dbtableData.push(arr[i]);
                         }
                    }

               
                }


            //  if(this.pd5.ck4 && this.addtype==3 && this.glbs==1){
            //      const ress = new Map();
            //      var arrs=this.ListData10;
            //      this.ListData10=arrs.filter((arrs) => !ress.has(arrs.proposalInfoId) && ress.set(arrs.proposalInfoId, 1));
            //     }else if(this.glbs==2){
            //          const res = new Map();
            //          var srr=this.dbtableData;
            //          this.dbtableData=srr.filter((srr) => !res.has(srr.proposalInfoId) && res.set(srr.proposalInfoId, 1));
            //     }
                 

            this.dbDialogVisible=false;
           } 
        },
        getImgV(n){
           var array=this.$store.state.imgformat.split(',');
          for (let i = 0; i < array.length; i++) {
               if(n.toLowerCase()==array[i])
               {
                   return true;
               }
              
          }
          return false;
        },
        chChange(val,t){
            if(val==''){
                return;
            }
         
            switch (t) {
                case 1:
                     var obj = {};
                     obj = this.fydwdata.find(item =>{
                        return item.orgid === val 
                    });
                    this.pd1.inspectOrg= obj.mc
                    break;
               case 2:
                     var obj = {};
                     obj = this.$store.state.scfl.find(item =>{
                        return item.dm === val 
                    });
                    this.pd1.inspectType = obj.mc
                    break;
               case 3:
                     var obj = {};
                     obj = this.fydwdata.find(item =>{
                        return item.orgid === val 
                    });
                    this.pd2.inspectOrg = obj.mc
                    break;
               case 4:
                     var obj = {};
                     obj = this.$store.state.scfl.find(item =>{
                        return item.dm === val 
                    });
                    this.pd2.inspectType = obj.mc
                    break;
               case 5:
                     var obj = {};
                     obj = this.$store.state.xwdwfl.find(item =>{
                        return item.dm === val 
                    });
                    this.pd3.newsMediaType = obj.mc
                    break;
             case 6:
                     var obj = {};
                     obj = this.jdrdata.find(item =>{
                        return item.pbId === val 
                    });
                    this.pd7.receptionistinfo = obj
                    break;
                default:
                    break;
            }
          
        },
        getCheck(t){
            if(t==1){
              this.pd5.ck4=false;
            }else if(t==2){
             this.pd5.ck3=false;
            }
        },
         //录入法院
         getLRFY(){
            let  p={
                'mc':'',
                'orgid':this.$store.state.orgid,
             };
              this.$api.post(this.Global.aport1+'/org/getEntryCourt',p,
             r =>{
                   if(r.code==1){
                     this.lrdata=r.data;
                   }
                  
            });
            
        },

         //法院单位
        getFY(){
            let p={
                'name':'',
            };
          this.$api.get(this.Global.aport1+'/org/getCourtOrg',null,
                r =>{
                    if(r.code==1){
                        this.fydwdata=r.data;
                    }
           });
        },
         //承办单位  如果没有下级部门，那么该处就是承办部门
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
          //法院部门  承办部门
        getcbbm(orgid,t,m){
        
          let p={
            "orgId":orgid==null?this.$store.state.orgId:orgid
          };
             this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                r =>{
                    if(r.code==1){
                         switch (t) {
                            case 0:
                                if(m==null){
                                this.form.orgDepartmentId="";
                                }
                                this.fybmdata=r.data;
                                break;
                                case 1:
                                     if(m==null){
                                this.form.undertakeDepartmentId="";
                                     }
                                this.fybmdata1=r.data;
                                break;
                                case 2:
                                    if(m==null){
                                     this.form.devDepartmentId="";
                                     }
                                     
                                    this.fybmdata2=r.data;
                                break;
                            default:
                                break;
                        }
                     
                      
                    }
                });
        },
        getJDR(orgid,subid)
        {
            let p={
                  'orgId':orgid,
                  'subOrgId':subid

                };
                  this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
                  r =>{
                  
                     if(r.code==1){
                           this.jdrdata=r.data;
                     }
                  });
        },
         

      
    }
            
}
</script>
<style scoped>
.textp{width: 40%!important;}
.textn{width: 30%!important;}
.texts{width: 10%!important; vertical-align: top;}
.textw{width: 10%!important;}
.textd{width: 10.5%!important;}
.inputw{width: 89%!important;}
.inputs{width: 67%!important;}
.inputp{width: 50%!important;}
.txttop{vertical-align: top;}
.border{border: 1px solid #E6E6E6; border-radius: 6px;margin-top: 10px;}
.ts{font-size: 12px;color: red;}
.block .close{display: block;position: absolute;font-size: 18px; font-weight:bold;color: red;cursor: pointer;z-index: 999;margin-top: -185px;margin-left: 170px;}
</style>