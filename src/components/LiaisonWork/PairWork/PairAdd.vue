<template>

    <div class="pairadd">

         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 联络工作 <span class="mlr_10">/</span>  <b>结对活动</b></span> </div>
        
         <div class="content subtable">
              <div class="ptitle mb-20">结对信息</div>
              <div class="pborder mb-50">
                  <el-row class="ah-40">
                      <el-col :span="9">
                        <span class="yy-input-text"><font class="red">*</font> 结对人</span>
                         <el-select v-model="pd.courtOutUserId" :disabled="llbnt"  @change="getJDXX(pd.courtOutUserId,1);chChange(pd.courtOutUserId,2);getJDcancel()"  filterable clearable  default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                          v-for="(item,ind) in cdrdata"
                          :key="ind"
                          :label="item.fullName"
                          :value="item.courtPersonId">
                         </el-option>
                        </el-select>
                      </el-col>
                      <!-- <el-col :span="5">
                          <span class="yy-input-text">结对时间</span>
                            {{pd.beginBJSJ}}
                      </el-col> -->
                      <el-col :span="4" v-if='!llbnt'>
                        <!-- <el-button type="info" plain size="small" @click="jdreset">重置</el-button> -->
                        <el-button type="primary" plain size="small"  @click="getPair()" v-if='pd.courtOutsiderId!="" || pd.courtOutUserId!=""'>
                          {{hdlabel}}
                         </el-button>
                            
                      </el-col>

                  </el-row>
                  <el-row class="ah-40">
                     <el-col :span="9">
                         <span class="yy-input-text"><font class="red">*</font> 代表</span>
                         <el-select v-model="pd.courtOutsiderId" :disabled="llbnt" @change="getJDXX(pd.courtOutsiderId,0);chChange(pd.courtOutsiderId,1)" filterable clearable  default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                            <el-option
                            v-for="(item,ind) in lxdbdata"
                            :key="ind"
                            :label="item.fullName"
                            :value="item.personId">
                            </el-option>
                         </el-select>
                      </el-col>
                      <el-col :span="4">
                         <el-button type="success" size="small" plain @click="getJdlist">加入列表</el-button>
                      </el-col>
                      <el-col :span="24">
                          <el-table
                            ref="multipleTable"
                            :data="ListDataJd">
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="personName"
                                label="姓名">
                            </el-table-column>
                            <el-table-column
                                prop="identity"
                                label="代表">
                            </el-table-column>
                            <el-table-column
                                prop="groupType"
                                label="团别">
                            </el-table-column>
                              <el-table-column
                                prop="specialType"
                                label="特约人员">
                            </el-table-column>
                             <el-table-column
                                prop="pairTime"
                                label="结对时间">
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text"  :disabled="llbnt" class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(2,scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>
                      </el-col>
                  </el-row>


              </div>
              <!-- 结对活动 -->
               <div class="ptitle  mb-20">结对活动</div>
               <div class="pborder mb-50">
                   <el-row class="context" >
                     <el-col :span="12" class="input-item">
                      <span class="yy-input-text" style="width:22%"><font class="red">*</font> 时间</span>
                      <div class="yy-input-input  t-flex  t-date" style="width:80%!important;">
                        <el-date-picker :disabled="llbnt"
                           v-model="form.startTime" format="yyyy-MM-dd"
                           type="date" size="small" value-format="yyyy-MM-dd"
                           placeholder="开始时间" >
                        </el-date-picker>
                        <span class="septum">-</span>
                        <el-date-picker :disabled="llbnt"
                            v-model="form.endTime" format="yyyy-MM-dd"
                            type="date" size="small" value-format="yyyy-MM-dd"
                            placeholder="结束时间">
                        </el-date-picker>
                     </div>
                     </el-col>
                     <el-col :span="24" class="input-item">
                           <span class="yy-input-text" style="width:10.8%;"><font class="red">*</font> 地点</span>
                           <el-input placeholder="请输入内容" size="small" :disabled="llbnt" clearable v-model="form.location"  class="yy-input-input" style="width:88%!important;"></el-input>
                     </el-col>
                    
                       <el-col :span="8" class="input-item">
                            <span class="yy-input-text" style="width:32.5%;"><font class="red">*</font> 活动方式</span>
                            <el-select v-model="form.activityMode" :disabled="llbnt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.hdfs"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                      </el-col>
                      
                        <el-col :span="24" class="input-item mt-10">
                           <span class="yy-input-text txttop" style="width:10.8%;"><font class="red">*</font> 联络内容</span>
                           <el-input placeholder="请输入内容" type="textarea" :disabled="llbnt" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="form.contents"  class="yy-input-input" style="width:88%!important;"></el-input>
                       </el-col>
                   </el-row>
                    
                    <el-row class="ah-40 mt-20">
                       <el-col :span="24" style="margin-left:11%;">
                             <el-checkbox v-model="pd5.ck1" @change="getwx()" :disabled="llbnt">是否建立微信群</el-checkbox>  
                             <el-input placeholder="请输入微信群名称" size="small" :disabled="llbnt" v-if='pd5.ck1' clearable v-model="wxname" style="width:20%;margin-left:10px;" ></el-input>
                             
                       </el-col>
                       
                        <el-col :span="24" style="margin-left:11%;" v-if='pd5.ck1'>
                           <div class="yy-input-input" style="width:89%!important;">
                            <el-table
                            ref="mlTable"
                            :data="ListDataWX"
                            @row-click="clickRow"
                            @selection-change="wxChange">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="personName"
                                label="姓名">
                            </el-table-column>
                             <el-table-column
                                prop="identity"
                                label="身份">
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
                                prop="job"
                                label="单位职务">
                            </el-table-column>
                             <!-- <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text"  :disabled="llbnt" class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(4,scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column> -->
                           </el-table>
                           </div>
                            </el-col>
                     
                       <el-col :span="24" style="margin-left:11%;">
                             <el-checkbox v-model="pd5.ck3" :disabled="llbnt">结合议案建议办理</el-checkbox>  
                               <el-button type="success" style="margin-left:20px;" size="mini" v-if="pd5.ck3  && !llbnt" @click="getGL(1)">关联</el-button>
                       </el-col>
                        <el-col :span="24" class="input-item"  v-if="pd5.ck3" style="margin-left:11%;">
                            <div class="yy-input-input" style="width:89%!important;">
                             <el-table
                            ref="multipleTable"
                            :data="suggList1">
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
                                    <el-button type="text" :disabled="llbnt" class="a-btn"  title="删除"  icon="el-icon-delete" @click="delsuggAdd(1,scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>

                            </div>
                       </el-col>
                        <el-col :span="24" style="margin-left:11%;">
                             <el-checkbox v-model="pd5.ck7" :disabled="llbnt">结合代表关注案件</el-checkbox>
                             <el-button type="success" style="margin-left:20px;" size="mini" v-if="pd5.ck7 && !llbnt" @click="getGL(2)">关联关注案件</el-button>
                       </el-col>
                       <el-col :span="24"   v-if="pd5.ck7" class="input-item" style="margin-left:11%;">
                        
                       <!-- <span class="yy-input-text txttop" style="width:10.2%;">关注的案件</span> -->
                       <div class="yy-input-input" style="width:89%!important;">
                             <el-table
                            ref="multipleTable"
                            :data="suggList2">
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
                                  prop="leaderpbid"
                                  label="来文人姓名"
                                  width="150">
                              </el-table-column>
                              <el-table-column
                                  prop="letternumber"
                                  label="来文字号">
                              </el-table-column>
                              <el-table-column
                                  prop="lettercontents"
                                  label="来文要求"
                                  width="250">
                              </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                    <el-button type="text" :disabled="llbnt"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="delsuggAdd(2,scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>
                            </div>
                         </el-col>
                    </el-row>

                      <el-row class="ah-40">
                        <el-col :span="24" class="input-item mt-10">
                            <span class="yy-input-text  txttop" style="width:11%;" title="代表意见建议"><font class="red">&ensp;</font>代表意见建议</span>
                            <div class="yy-input-input" style="width:88%!important;">
                            <el-row class="mt-10" style="text-align:right;margin-right:10px;" v-if='!llbnt'>
                                 <!-- <el-button type="success" size="small" @click="gotoya(0)">关联</el-button> -->
                             <el-button type="primary" size="small" plain @click="getyj(0)">添加</el-button>
                              <!-- <el-button type="success" size="small" plain  :disabled="yjbnt" @click="getyj(1)">修改</el-button>
                              <el-button type="danger"  size="small" plain  :disabled="yjbnt" @click="getyj(2)">查看</el-button> -->
                            </el-row>
                            <el-table
                            ref="multipleTable"
                            :data="yjtableData"
                            @selection-change="handleSelectionChange"
                            :row-class-name="tableRowClassName">
                            <!-- <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column> -->
                            <el-table-column
                                type="index"
                                label="序号"  width="80"> 
                            </el-table-column>
                             <el-table-column
                                prop="contents"
                                label="评价和意见建议" width="400">
                                 <template slot-scope="scope">
                                  <el-popover placement="top-start" width="350" trigger="hover" >
                                       <div>{{scope.row.contents}}</div>
                                      <span slot="reference">{{ scope.row.contents.substr(0,20)}}{{scope.row.contents.length>20?'......':''}}</span>
                                  </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="participantsInfoName"
                                label="代表" width="250">
                            </el-table-column>
                            <el-table-column
                                prop="feedBackStatus"
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
                                      <el-button type="text" :disabled="llbnt"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="pddel(1,scope.row)"></el-button>
                                     </div>
                                  </template>
                              </el-table-column>
                           </el-table>
                            
                            </div>
                        </el-col>


                        <el-col :span="24" class="input-item mt-10">
                           <span class="yy-input-text" style="width:11%;" title="工作情况报告"><font class="red">&ensp;</font>工作情况报告</span>
                            <div class="yy-input-input" v-if='!llbnt'>
                                  <el-button type="primary" plain style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="upload(0)">上传文件</el-button> <span class="ts"></span>
                            </div>
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
                           <span class="yy-input-text  txttop" style="width:11%;"><font class="red">*</font>  影像资料</span>
                            <div class="yy-input-input" v-if='!llbnt'>
                                <el-button type="primary" plain   style="width:160px;font-size:14px;" size="small" icon="el-icon-plus" @click="upload(1)">上传影像资料</el-button> <span class="ts"></span>
                            </div>
                       </el-col>
                       <el-col :span="24" v-if="fits && fits.length>0">
                     
                        <div style="margin-left:11%;"  v-for="(fit,ind) in fits" :key="ind">
                            <div class="block" style="float:left;margin-right:20px;margin-top:20px" v-if='getImgV(fit.filesuffix)'>
                                
                            <el-popover placement="right" title="" trigger="click">
                                                           
                              <img :src="fit.filepath"  style="max-width:700px; max-height:700px;"/>
                              <img :src="fit.filepath" slot="reference" width="180" height="150">
                                                        
                            </el-popover>

                              <a class="close" @click="delImg(fit.imagedatainfoid)" v-if='!llbnt'> <i class="el-icon-error"></i></a>
                             
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
                                    controls="controls" slot="reference" >
                                    您的浏览器不支持视频播放
                               </video>
                              </el-popover>
                            <a class="close" @click="delImg(fit.imagedatainfoid)" v-if='!llbnt'> <i class="el-icon-error"></i></a>
                            </div>
                        </div>
                        </el-col>
                   </el-row>
                  </div>
               <!-- 领导批示 -->
               <div class="ptitle  mb-20">领导批示</div>
               <div class="pborder">
                   <el-row class="ah-50" v-if='!llbnt'>
                       <el-col :span="6">
                           <span class="yy-input-text " style="width:40%;">批示人</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd1.instructorName"  class="yy-input-input" style="width:50%!important"></el-input>
                        </el-col>
                        <el-col :span="6">
                           <span class="yy-input-text pl-10">批示单位</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd1.instructionUnit"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6">
                           <span class="yy-input-text">职务</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="pd1.instructionPosition"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6">
                           <span class="yy-input-text">批示时间</span>
                            <el-date-picker class="yy-input-input"
                            v-model="pd1.instructionTime" format="yyyy-MM-dd"
                            type="date" size="small" value-format="yyyy-MM-dd"
                            placeholder="选择时间" >
                        </el-date-picker>
                        </el-col>
                        <el-col :span="24">
                           <span class="yy-input-text" style="width:10%;">批示内容</span>
                           <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" size="small" clearable v-model="pd1.instructionContents"  class="yy-input-input" style="width:80%!important;margin-right:20px" ></el-input>
                             <el-button type="success" size="small" plain @click="ChangePSNameList(pd1)">加入列表</el-button>
                       </el-col>
                       </el-row>
                        <el-row class="ah-50">
                       <el-col :span="24">
                          
                            <el-table
                            ref="multipleTable"
                            :data="ListData1">
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
                                    <el-button type="text"  :disabled="llbnt" class="a-btn"  title="删除"  icon="el-icon-delete" @click="delAdd(1,scope.row)"></el-button>
                                    </div>
                                </template>
                            </el-table-column>
                           </el-table>
                         
                        </el-col>
                       <el-col :span="6" v-if= "ifLuRu">
                           <span class="yy-input-text">录入单位</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryUnit"  :disabled="true"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6" v-if= "ifLuRu">
                           <span class="yy-input-text pl-10">录入部门</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryDepartment"  :disabled="true"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6" v-if= "ifLuRu">
                           <span class="yy-input-text">录入人</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryPerson"  :disabled="true" class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :span="6" v-if= "ifLuRu">
                           <span class="yy-input-text">录入时间</span>
                           <el-input placeholder="请输入内容" size="small" clearable v-model="form.entryTime"  :disabled="true" class="yy-input-input" ></el-input>
                        </el-col>
                    </el-row>
                </div>
            <div class="footer">
            <el-button type="primary"  style="width:130px;" v-if='!llbnt' @click="submit">保 存</el-button>
            <el-button style="width:130px;" @click="goto()">关 闭</el-button>
            </div>
            <br/>
            
        </div>

  <el-dialog title="上传文件" :visible.sync="uploadDialogVisible" :close-on-click-modal='false'  width="630px">
   <UPLOAD :url="uurl" :type="2" :urlErr="urlErr" @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
  </el-dialog>
  <el-dialog title="上传影视资料" :visible.sync="YJDialogVisible" :close-on-click-modal='false' width="650px">
       <VIDEONEW :url="vvurl" :type="2" :urlErr="urlErr" @DfatherMethod="DfatherMethod" :random="new Date().getTime()"></VIDEONEW>
       <img class="img-upload" url="/sfmgapi/upload/add" @success="canSucess">
  </el-dialog>

   <el-dialog title="活动意见建议" :visible.sync="yjsDialogVisible" v-if='yjsDialogVisible' :close-on-click-modal='false'>
     <SUGGEST  :data="yjdata" :namelist="ListDataJd" :type="addtype" @yjsfatherMethod="yjsfatherMethod" :random="new Date().getTime()"></SUGGEST>
  </el-dialog>
  <el-dialog title="结合议案建议办理" :visible.sync="suggDialogVisible" :close-on-click-modal='false'>
      <SUGGALL  :data="yjdata" :type="addtype" @suggfatherMethod="suggfatherMethod" :random="new Date().getTime()"></SUGGALL>
  </el-dialog>
  <el-dialog title="结合代表关注案件" :visible.sync="caseDialogVisible" :close-on-click-modal='false'>
      <CASE  :data="yjdata" :type="addtype" @casefatherMethod="casefatherMethod" :random="new Date().getTime()"></CASE>
  </el-dialog>
  <el-dialog title="修改定向结对"  :visible.sync="pairsDialogVisible" v-if='pairsDialogVisible' :close-on-click-modal='false'>
      <PAIR  :data="pairdata" :type="addtype" @pairfatherMethod="pairfatherMethod" :random="new Date().getTime()"></PAIR>
  </el-dialog>
 
    </div>
</template>
<script scoped>
import UPLOAD from "../../Common/upload"
import VIDEO from "../../Common/video"
import VIDEONEW from "../../Common/imgvideo"
import {getServerDate,getYear,formatDate} from '@/assets/js/date.js'
import {sortByKey} from '@/assets/js/ToArray.js'
import SuggestInfo from "../../HandlingWork/List/SuggestInfo"
import SUGGEST from "../../Common/suggest/suggestions"
import CASE from "../../Common/suggest/caseinfoall"
import SUGGALL from "../../Common/suggest/suggestall"
import PAIR from "../../Common/suggest/pairinfo"
export default {
    components:{UPLOAD,VIDEO,SuggestInfo,VIDEONEW,SUGGEST,CASE,SUGGALL,PAIR},
    data(){
        return{
          CurrentPage1: 1,
          pageSize1:parseInt(this.$store.state.pagesize),
          TotalResult1: 0,
          pd:{courtOutsiderId:'',courtOutUserId:''},
          pd1:{},
          pd6:{},
          form:{devDepartmentId:'',orgDepartmentId:''},
          form1:{},
          jdform:{},
          tableData1:[],
          tableData2:[],
          yjtableData:[],//代表意见 
          ListData1:[],
          ListDataJd:[],//结对
          multipleTable:[],
          form1data:[],
          filedata0:[],
          pdData1:[],
          fits:[],//影视资料
          txtdia:'修改定向结对',
          pairDialogVisible:false,
          dbDialogVisible:false,
          yjsDialogVisible:false,
          suggDialogVisible:false,
          caseDialogVisible:false,
          pairsDialogVisible:false,
          bnt:true,
          uurl:'/FileUploadController/uploadWorkReport',
          vvurl:'/FileUploadController/uploadImageData',
          urlErr:'',
          uploadDialogVisible:false,
          YJDialogVisible:false,
          addtype:'',
          formmult:[],
          listdata0:[],
          listdata2:[],
          dbxmdata:[],//代表姓名
          fydwdata:[],
          cbdwdata:[],
          fybmdata:[],
          fybmdata1:[],//开展部门
          cdrdata:[],//结对人
          lxdbdata:[],//代表姓名
          fyrydata:[],//法院人员
          llbnt:false,
          remark:'',
          baseid:'',
          ifLuRu:false,
          hdlabel:'定向结对',
          yearlist:[],
          year:'',
          jdstate:0,
          pdmult1:[],
          pdmult2:[],
          pdmult:[],
          listdatatemp:[],
          lrdata:[],//录入法院
          pairId:'',//结对信息id  
          oldcourtid:'',//原来的代表姓名 
          pd5:{ck1:false,ck3:false,ck7:false},
          yjdata:[],
          suggList1:[],
          suggList2:[],
          yjbnt:true,
          pairdata:{},
          hdyjdata:[],
          tempdata:[],
          ListDataWX:[],
          xmdata:[],
          wxname:'',
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
        this.$store.dispatch("getHdfs");
        this.getinit(this.$route);
    },
    activated(){
 
    },
    methods:{
         pageSizeChange1(val) {
          this.pageSize1=val;
          this.pdsearch(this.CurrentPage1, val, this.pd6);
        },
        handleCurrentChange1(val) {
          this.CurrentPage1=val;
          this.pdsearch(val, this.pageSize1, this.pd6);
        },
         ChangePSNameList(n){
           if(this.pd1.instructorName==undefined || this.pd1.instructorName==""){
               this.$message.error("批示人不能为空！");return;
           }
           if(this.pd1.instructionUnit==undefined || this.pd1.instructionUnit==""){
               this.$message.error("批示单位不能为空！");return;
           }
             if(this.pd1.instructionPosition==undefined || this.pd1.instructionPosition==""){
               this.$message.error("职务不能为空！");return;
           }
           if(this.pd1.instructionTime==undefined || this.pd1.instructionTime==""){
               this.$message.error("批示时间不能为空！");return;
           }
           if(this.pd1.instructionContents==undefined || this.pd1.instructionContents==""){
                this.$message.error("批示内容不能为空！");return;
           }
               this.ListData1.push(n);
               this.pd1={};
        },
           clickRow1(row){
           this.$refs.multipleTable1.toggleRowSelection(row)
        },
         clickRow(row){
           this.$refs.mlTable.toggleRowSelection(row);
        },
        pdchange1(val){
            this.pdmult1=val;
        },
        wxChange(val){
           this.pdmult2=val;
        },
         pddel(t,n){
            if(t==1){ 
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.yjtableData.findIndex(item =>{
    　　　　　　　　　  　 if(item.participantsInfoId==arr[i].participantsInfoId){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
             　　　  this.yjtableData.splice(index,1)
    //                   var index1 = this.hdyjdata.findIndex(item =>{
    // 　　　　　　　　　  　 if(item.participantsInfoId==arr[i].participantsInfoId){
    //         　　　　　　　　　　　　return true
    //         　　　　　　　　　　}
    //         　　　　　　　　})
    //                this.hdyjdata.splice(index1,1)
                   for (let ii = 0;ii<this.hdyjdata.length;ii++){
                          let obj = this.hdyjdata[ii];
                          if (obj.participantsInfoId==arr[i].participantsInfoId){
                          this.hdyjdata.splice(ii,1);
                          ii--
                          }
                      } 
                    var index2 = this.tempdata.findIndex(item =>{
    　　　　　　　　　  　 if(item.leaderPerson==arr[i].participantsInfoId){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
                   this.tempdata.splice(index2,1)
                 }
            }
        },
         delAdd(t,n){
           
            if(t==1){ //批示人
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListData1.findIndex(item =>{
    　　　　　　　　　  　 if(item.instructorName==arr[i].instructorName){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.ListData1.splice(index,1)
                 }
              }else if(t==2){
                
                var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.ListDataJd.findIndex(item =>{
    　　　　　　　　　  　 if(item.fullName==arr[i].fullName){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.ListDataJd.splice(index,1)
                 }
              }
         },
          pdsubmit(t){
          
           if(t==1){
                if(this.pdmult1.length==0){
                    this.$message.error("请选择一条数据！");return;
                }
                var arr=this.pdmult1;
               
                for (let i = 0; i < arr.length; i++) {
                   //start 去重
                  
                      this.yjtableData.push(arr[i]);
                   
                    //end
                 }
                const res = new Map();
                 var srr=this.yjtableData;
                 this.yjtableData=srr.filter((srr) => !res.has(srr.proposalInfoId) && res.set(srr.proposalInfoId, 1));
                this.dbDialogVisible=false;
               
           }
        },
         //影视资料
         canSucess(file) {
            this.pngName = file.name;
            this.logoUrl = file.url;
        },
        getinit(val){
          this.reset();
         this.addtype=val.query.type;
         this.baseid=val.query.baseid;
         this.year=val.query.year;
         this.state=val.query.state==null?"0":val.query.state;
         this.activityInfoId=val.query.activityInfoId;
         
           //权限start
                 this.$api.post(this.Global.menuurl,{'menuId':'12012301'},
                     r =>{
                          if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
                  });
          //权限end

        //  this.getYA();
         this.yearlist=getYear();
        if(this.state=='0'){
            this.getLmName('');
        }
         this.getFYName('');
         this.getName();
         this.getFY();
         this.getLRFY();
       
         if(this.state=='9'){
           this.llbnt=true;
         }
         this.form.entryUnit=this.$store.state.orgname;
         this.form.entryDepartment=this.$store.state.bmname;
         this.form.entryPerson=this.$store.state.uname;
        //  this.form.entryTime=getServerDate();
         this.getJDXXAB();
        
         this.getList();

        },
        reset(){
            this.jdstate=0;
            this.pd={courtOutsiderId:'',courtOutUserId:''};
            this.pd1={};
            this.pd6={};
            this.form={devDepartmentId:'',orgDepartmentId:''};
            this.form1={};
            this.jdform={};
            this.tableData1=[];
            this.tableData2=[];
            this.yjtableData=[];
            this.ListData1=[];
            this.form1data=[];
            this.filedata0=[];
            this.fits=[];
            this.pdData1=[];
            this.listdatatemp=[];
            this.llbnt=false;
            this.lrdata=[];
            this.jdstate=0;
            this.ifLuRu=false;
            this.YJDialogVisible=false;
            this.uploadDialogVisible=false;
            this.pairId='';
            this.xmdata=[];
            this.ListDataWX=[];
            this.wxname='';
            this.ListDataJd=[];
            this.pd5={ck1:false,ck3:false,ck7:false};
            this.suggList1=[];
            this.suggList2=[];
            this.yjtableData=[];
        },
         //查询
        pdsearch(currentPage,showCount,pd6){
        
                if(this.pd6.year==null || this.pd6.year==undefined || this.pd6.year==''){
                    this.$message.error("年份不能为空!");return;
                }
                
             this.pd6.proposalType="0204000005";
              let p={
                  "pd":pd6,
                  "pageInfo":{
                            "pageNumber":currentPage,
                            "pageSize":showCount,
                            },
                  "token":this.$store.state.token
              };
             
               this.$api.post(this.Global.aport2+'/proposalHome/queryToActivity',p,
                r =>{
                   if(r.code==1){
                            this.pdData1=r.data.basicCondition;
                            this.TotalResult1=r.data.pageInfo.total;
                    }

                });
        },
        downData(n){
          // window.location.href=n.filepath;
          var alink = document.createElement("a");
          alink.href = n.filepath
          alink.setAttribute('download',n.filename)
          document.body.appendChild(alink)
          alink.click()
        },
        getList(){
           
            if(this.state=='1' || this.state=='9')
            {
             this.ifLuRu=true;
             let p={
                 'activityInfoId':this.activityInfoId,
             };
             this.$api.post(this.Global.aport2+'/ActivityInfoController/getAllActivityInfo',p,
                r =>{
                     // this.form=r.data;
                     if(r.code==1){
                         this.form=r.data.activity;
                         this.ListData1=r.data.leadershipIns==null?[]:r.data.leadershipIns;
                         this.filedata0=r.data.actiWorkReport==null?[]:r.data.actiWorkReport
                         this.fits=r.data.imageDataList==null?[]:r.data.imageDataList;
                        
                         if(r.data.representativeInfo!=null){
                         this.pd.courtOutsiderId=r.data.representativeInfo.personId
                         this.pd.beginBJSJ=r.data.representativeInfo.pairTime;
                         this.pd.dpbId=r.data.representativeInfo.pbId;
                         }
                         if(r.data.pairPersonInfo!=null){
                         this.pd.courtOutUserId=r.data.pairPersonInfo.courtPersonId
                         this.pd.cpbId=r.data.pairPersonInfo.pbId;
                         this.getJDXX(this.pd.courtOutUserId,1);
                         }
                         this.yjtableData=r.data.actiRelAdvList==null?[]:r.data.actiRelAdvList;
                         this.hdlabel="修改定向结对";
                       
                          //结合议案建议或政协提案办理
                        
                        if(r.data.activity.isMeetingMotion=="0155000001"){
                            
                          if(r.data.proposalRelActi!=null){
                             this.suggList1=r.data.proposalRelActi==null?[]:r.data.proposalRelActi;
                           }
                            this.pd5.ck3=true;
                        }
                         //代表、委员或监督员、咨询员关注案件
                        if(r.data.activity.isFocusCase=="0125000001"){
                            if(r.data.actiRelCaseList!=null){
                            this.suggList2=r.data.actiRelCaseList==null?[]:r.data.actiRelCaseList;
                            }
                            this.pd5.ck7=true;
                        }
                          if(r.data.activity.isWeiChatGroup=="0278000002"){
                                  this.pd5.ck1=true;
                                  if(r.data.weiChatGroup!=null){
                                     this.wxname=r.data.weiChatGroup.weiChatGroupName;
                                     var array=r.data.weiChatGroup.participantsList==null?[]:r.data.weiChatGroup.participantsList;
                                     this.ListDataWX=array;
                                       this.$nextTick(function () {
                                          for (let ij = 0; ij < array.length; ij++) {
                                            // console.log(array[ij].ingroupdistinction,array[ij]);
                                            
                                            if(array[ij].ingroupdistinction=="0279000002"){
                                              
                                              this.$refs.mlTable.toggleRowSelection(array[ij],true);
                                            }
                                            
                                          }
                                       })
                                  }
                          }


                        this.ListDataJd=r.data.representativeInfoList==null?[]:r.data.representativeInfoList;
                        var harr=r.data.suggestionList==null?[]:r.data.suggestionList;
                      
                        this.getoldDataRule(harr);

                     }

                });
            }

        },
        //代表议案建议
      getoldDataRule(arr){
       if(arr && arr.length>0){
        
          for (let m = 0; m < arr.length; m++) {
                let obj_1={
                    contents:arr[m].contents,
                    overallAssessment:arr[m].overallAssessment,
                    participantsInfoId:arr[m].participantsInfoId,
                    participantsInfoName:arr[m].participantsInfoName,
                    feedBackStatus:arr[m].feedBackStatus, 
                    feedBackTime:arr[m].feedBackTime,    
                    remark:arr[m].remark,
                    sort:arr[m].sort
                }
                this.hdyjdata.push(obj_1);//多条数据
            }
            const res = new Map();
            var srr= sortByKey(this.hdyjdata,'sort');
            this.yjtableData=srr.filter((srr) => !res.has(srr.participantsInfoId) && res.set(srr.participantsInfoId, 1))
             var xsdata=this.yjtableData;
            for (let h = 0; h < xsdata.length; h++) {
                   let obj_2={
                    overallAssessment:xsdata[h].overallAssessment,
                    leaderPerson:xsdata[h].participantsInfoId,
                    leaderPersonName:xsdata[h].participantsInfoName,
                    feedBackStatus:xsdata[h].feedBackStatus, 
                    feedBackTime:xsdata[h].feedBackTime,  
                    remark:xsdata[h].remark,
                  }
                  var srr1=this.hdyjdata.filter(item =>{return item.participantsInfoId==xsdata[h].participantsInfoId});
              
                  var arrdata=[];                  
                  for (let n = 0; n < srr1.length; n++) {
                     var obj_3={
                       contents:srr1[n].contents,
                       leaderPerson:srr1[n].participantsInfoId,
                       sort:srr1[n].sort
                     }
                     arrdata.push(obj_3);
                  }
               
              obj_2.yjlistdata=arrdata;
              this.tempdata.push(obj_2);
                
            }

          console.log('多条数据',this.hdyjdata);
          console.log('临时数据',this.tempdata);
          console.log('显示数据',this.yjtableData);
             
       }           
          
      },
        //结对信息重置
        jdreset(){
           this.jdstate=0;
           this.hdlabel="定向结对";
           this.pd={courtOutsiderId:'',courtOutUserId:''};
           this.getLmName('');
           this.getJDXXAB('');
        },
        fatherMethod(data,type){
            if(this.filedata0 && this.filedata0.length>0){
           
             for (let i = 0; i < data.length; i++) {
               this.filedata0.push(data[i]);
             }
           }else{
           this.filedata0=data;
           }

          this.uploadDialogVisible = false;

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
            //     'imageDataInfoId':data.imageDataInfoId,
            // };
            //  this.$api.post(this.Global.aport2+'/FileUploadController/delImageDataInfo',p,
            //     r =>{
            //           if(r.code==1){
            //                this.$message({
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
        handleSelectionChange(val){
            this.multipleTable=val;
        },
        form1change(val){
          this.formmult=val;
        },
        getPair(){
            // this.form1={};
            // this.listdata2=[];
            // this.listdata0=[];
            // this.listdatatemp=[];
            // this.remark="";
            // this.oldcourtid="";
            // this.getLmName(this.pd.courtOutsiderIdName);
            
            
            // if(this.pd.courtOutUserId!=null && this.pd.courtOutUserId!=undefined){
            //    this.$set(this.form1,'courtInsiderId',this.pd.courtOutUserId);
               
            //    this.getYjdxx(this.pd.courtOutUserId);
            // }
            // if(this.pd.courtOutsiderId!=null && this.pd.courtOutsiderId!=undefined){
            //  this.$set(this.form1,'jointperson',this.pd.courtOutsiderIdName);
            // }
           
            // this.pairDialogVisible=true;
          var obj={}
        
          obj.courtOutsiderId=this.pd.courtOutUserId;
          if(this.pd.courtOutsiderId==null || this.pd.courtOutsiderId==''){
            this.pd.courtOutsiderIdName='';
          }
          obj.courtOutsiderIdName=this.pd.courtOutsiderIdName;
          this.pairdata=obj;
          this.pairsDialogVisible=true;

        },
        pairfatherMethod(type,data){
              
              if(type=='99'){
              this.pairsDialogVisible=false;
              }else{
                  this.getsaveinfo(data);
              }
              
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
                      this.$router.push({name:'PairList'});
               }
          
        },
        gotoya(t){
           this.pd6={};
           this.pdData1=[];
           this.dbDialogVisible=true;
            // this.$router.push({name:'SuggestInfo',query:{type:'4',year:this.year,lr:0}});
        },
         submit(){
                //条件判断
                 if(this.pd.courtOutUserId==undefined || this.pd.courtOutUserId==""){
                    this.$message.error("结对人不能为空！");return;
                }
                // if(this.pd.courtOutsiderId==undefined || this.pd.courtOutsiderId==""){
                //     this.$message.error("代表姓名不能为空！");return;
                // }
                if(this.ListDataJd && this.ListDataJd.length==0){
                   this.$message.error("代表列表不能为空！");return;
                }
                
                 if(this.form.startTime==undefined || this.form.startTime==""){
                    this.$message.error("开始时间不能为空！");return;
                }
                 if(this.form.endTime==undefined || this.form.endTime==""){
                    this.$message.error("结束时间不能为空！");return;
                }
                if(this.form.startTime!='' && this.form.endTime!='' && this.form.startTime>this.form.endTime){
                    this.$message.error("开始时间不能大于结束时间！");return;
                }
                  if(this.form.location==undefined || this.form.location==""){
                    this.$message.error("地点不能为空！");return;
                }
                if(this.form.activityMode==undefined || this.form.activityMode==""){
                    this.$message.error("活动方式不能为空！");return;
                }
                if(this.form.contents==undefined || this.form.contents==""){
                    this.$message.error("联络内容不能为空！");return;
                }
                //  if(this.filedata0.length==0){
                //     this.$message.error("工作情况报告不能为空！");return;
                // }
                //   if(this.fits.length==0){
                //     this.$message.error("影像资料不能为空！");return;
                // }
                  var yxdata=this.$store.state.yxdate;
                  var flag=true;
                  if(yxdata!=null && yxdata!='' && yxdata!=undefined){
                  var yxd=formatDate(new Date(yxdata),'yyyy-MM-dd');
                    let reg = new RegExp('-', 'g')
                    flag=new Date(this.form.startTime.replace(reg, '/')) > (new Date(yxd.replace(reg, '/')))
                    
                  }

                  if(flag){
                          if(this.fits.length==0){
                            this.$message.error("影像资料不能为空！");return;
                        }
                  }

               //以下为保存
               this.form.activityType="0149000001"//活动类型
                //结合议案建议或政协提案办理
               if(this.pd5.ck3){
                   this.form.isMeetingMotion="0155000001";
               }else{
                this.form.isMeetingMotion="0155000002";
               }
               //代表、委员或监督员、咨询员关注案件
               if(this.pd5.ck7){
                   this.form.isFocusCase="0125000001";
               }else{
                   this.form.isFocusCase="0125000002";
               }
               this.form.entryUnitId=this.$store.state.orgid;//录入单位
               this.form.entryDepartmentId=this.$store.state.bmid;//部门ID
               this.form.entryPerson=this.$store.state.uname;

               if(this.pd5.ck1){
                  this.form.isWeiChatGroup="0278000002";
                  var wxarr=[];
                  if(this.ListDataWX && this.ListDataWX.length>0){
                    var srr=this.ListDataWX;
                    var array=this.pdmult2;
                   
                    for (let jj = 0; jj < srr.length; jj++) {
                       var ff=false;
                      for (let ii = 0; ii < array.length; ii++) {
                           
                            if(srr[jj]==array[ii]){
                                ff=true;
                            }
                      }
                        var obj={};
                            obj=srr[jj];
                        if(ff){
                            obj.ingroupdistinction='0279000002';
                            wxarr.push(obj);
                        }else{
                            obj.ingroupdistinction='0279000001';
                            wxarr.push(obj);
                        }


                    }
                  }
                  this.jdform.weiChatGroup={
                    'weiChatGroupName':this.wxname,
                    'participantsList':wxarr,
                  };

               }else{
                  this.form.isWeiChatGroup="0278000001";
               }


            //    this.form.entryTime=getServerDate();
               this.jdform.representativeInfo={
                   'pbId':this.pd.dpbId,
                   'personId':this.pd.courtOutsiderId
               };
               this.jdform.pairPersonInfo={
                   'pbId':this.pd.cpbId,
                   'courtPersonId':this.pd.courtOutUserId
               };
               this.form.pairId=this.pairId;
               this.jdform.activity=this.form;
               this.jdform.actiWorkReport=this.filedata0;
               this.jdform.imageDataList=this.fits;
               this.jdform.proposalRelActi=this.suggList1;
               this.jdform.newsMediaList=null;
               this.jdform.actiRelCaseList=this.suggList2;
               this.jdform.leadershipIns=this.ListData1;//领导批示
               this.jdform.representativeInfoList=this.ListDataJd;

               this.jdform.suggestionList=this.hdyjdata;//代表意见建议
              
               this.$api.post(this.Global.aport2+'/ActivityInfoController/saveActivityInfo',this.jdform,
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
        getcbbm(orgid,n){

          let p={
            "orgId":orgid==null?this.$store.state.orgId:orgid
          };
             this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                r =>{
                    if(r.code==1){
                        if(n==1){
                            this.form.devDepartmentId='';
                            this.fybmdata1=r.data;
                        }else{
                            this.form.orgDepartmentId='';
                            this.fybmdata=r.data;
                        }
                    }
                });
        },
        //删除
        del(val,t){

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
            }else if(t==0){
                var arr=[];
                arr.push(val);

                for (let i = 0; i < arr.length; i++) {
                        var index = this.listdata0.findIndex(item =>{
    　　　　　　　　　  　 if(item.pbId==arr[i].pbId){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.listdata0.splice(index,1)
                 }
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
                        // 'courtPersonId':this.form1.courtInsiderId,
                        // 'courtOutsiderList':this.listdata2,
                        'courtPersonId':data.courtPersonId,
                        'courtOutsiderList':data.courtOutsiderList,
                        };
                        this.$api.post(this.Global.aport2+'/PairInfoController/savePairInfo',p,
                        r =>{
                                if(r.code==1){
                                       
                                        this.$message.success(r.message);
                                      
                                // this.getLmName('');//代表姓名 
                                // this.getJDXXAB();//结对人
                                 this.oldcourtid=this.pd.courtOutsiderId;
                                if(this.pd.courtOutsiderId!=null && this.pd.courtOutsiderId!='' && this.pd.courtOutUserId!=data.courtPersonId){
                                  
                                   this.getJDXX(this.pd.courtOutsiderId,0);

                                }else if(this.pd.courtOutUserId!=null && this.pd.courtOutUserId!='')
                                { this.getJDXX(this.pd.courtOutUserId,1);}
                                   this.pairsDialogVisible=false;
                                }else{
                                this.$message.error(r.message);
                                }
                        });
        },
  
        //    getYA(){
        //           let pp={
        //             'token':this.$store.state.token,
        //             'proposalType':'0204000005',
        //         };
        //          this.$api.post(this.Global.aport2+'/proposalHome/queryToActivity',pp,
        //            r =>{
        //                if(r.code==1){
        //                    this.tableData1=r.data;
                         
        //                }
        //            });
        //     },
        //代表姓名
        getLmName(n,m){
            let  p={
             'personName':n,
             'personType':this.Global.REPRESENTATIVE,
            };
            ///baseinfo/personlistbytype
              this.$api.post(this.Global.aport1+'/representative/getPairInfo',p,
             r =>{
                 if(r.code==1){
                    if(n==""){
                        this.lxdbdata=r.data;
                    }else if(m!=null){
                           if(n==null || n==""){
                                this.$message.error("请输入代表姓名!");return;
                            }
                           this.listdata0=r.data;
                    }
                  }

            });

        },
         //法院人员
        getFYName(name){
            let  p={
             'personName':name,
            };
              this.$api.post(this.Global.aport1+'/courtPerson/getPairInfo',p,
             r =>{

                   this.fyrydata=r.data;
            });

        },
        getJDcancel(){
       
          this.ListDataJd=[];
         
          this.ListDataWX=[];
          this.pd5.ck1=false;
          this.wxname='';
        },
        //结对人
        getJDXX(id,t)
        { 

           
            if(this.pd.courtOutsiderId=="" && this.pd.courtOutUserId==""){
                this.jdreset();
                
                return;
            }

            this.jdstate=0;  
             let  p={
             'courtOutsiderId':id,
             };
             if(t==0 && id!='' && this.jdstate!=1){
             
              this.$api.post(this.Global.aport1+'/PairInfoController/getPairPerson',p,
                r =>{
                    if(r.code==1){

                        this.cdrdata=r.data;

                        if(this.cdrdata.length>=1){
                          this.jdstate=1;
                         
                        //   this.pd.courtOutUserId=this.cdrdata[0].personId;
                          this.$set(this.pd,'courtOutUserId',this.cdrdata[0].courtPersonId)
                          this.chChange(this.pd.courtOutUserId,2);
                          this.pd.beginBJSJ=this.cdrdata[0].pairTime;
                          this.pairId=this.cdrdata[0].pairId
                          
                          
                          this.hdlabel="修改定向结对";                          
                        }else{
                          this.hdlabel="定向结对";
                        }
                    }else {
                        this.pd.courtOutUserId='';
                        this.$set(this.pd,'courtOutUserId','')
                        this.cdrdata=[];
                        this.hdlabel="定向结对";
                    }
                });

            }else if(t==1 && id!='' && this.jdstate!=1){
                let  p={
                'courtInsiderId':id,
                };
                this.$api.post(this.Global.aport2+'/PairInfoController/getPairInfo',p,
                r =>{
                 if(r.code==1){

                    this.pd.courtOutsiderId='';
                    this.lxdbdata=[];
                    this.lxdbdata=r.data;
               
                    if(this.lxdbdata!=null){
                    this.jdstate=1;
                    this.hdlabel="修改定向结对";
                  
                     
                     this.pd.beginBJSJ=this.lxdbdata[0].pairTime;
                       var ff=false;
                          for (let i = 0; i < this.lxdbdata.length; i++) 
                          {
                            //  console.log(this.lxdbdata,this.lxdbdata[i].personId,this.oldcourtid);
                             if(this.oldcourtid==this.lxdbdata[i].personId){
                                  ff=true;
                             }
                          }

                          
                         if(ff){
                            this.$set(this.pd,'courtOutsiderId',this.oldcourtid)
                         }else{
                            this.$set(this.pd,'courtOutsiderId',this.lxdbdata[0].personId)
                         }
                           this.chChange(this.pd.courtOutsiderId,1);
                           this.pairId=this.lxdbdata[0].pairId
                          
                    }else{
                      this.hdlabel="定向结对";
                    }
                    }else{
                        this.pd.courtOutsiderId='';
                        this.lxdbdata=[];
                        this.hdlabel="定向结对";
                    }
                });
            }
        },
        getJDXXAB(name){
            if(name==undefined || name==null){name='';}
            let  p={
             'personName':name,
             };
              this.$api.post(this.Global.aport1+'/courtPerson/getPairInfo',p,
             r =>{
                   
                   this.cdrdata=r.data;
                  
            });
            
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

        //已结对信息
        getYjdxx(val,t){
            this.remark='';
           if(val!=''){
            
               
                 var obj = {};
                     obj = this.fyrydata.find(item =>{
                      //  console.log(item.courtPersonId === val);
                       
                        return item.courtPersonId === val
                    });
                  
                     if(obj!=undefined && obj!=null && obj!=''){
                     this.remark="详情："+obj.fullName+" , "+obj.sex+" , "+obj.birthday;
                  
                     if(obj.degree!=null){
                         this.remark+=" , "+obj.degree;
                     }
                      if(obj.partisan!=null){
                         this.remark+=" , "+obj.partisan;
                     }
                      if(obj.address!=null){
                         this.remark+=" , "+obj.address;
                     }
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
        getImgV(n){
           var array=this.Global.imgformat.split(',');
          for (let i = 0; i < array.length; i++) {
               if(n.toLowerCase()==array[i])
               {
                   return true;
               }
              
          }
          return false;
        },
       
        chChange(val,t){
             if(val!=''){
               switch (t) {
                   case 1:
                     var obj = {};
                     obj = this.lxdbdata.find(item =>{
                        return item.personId === val
                    });
                  
                    this.pd.courtOutsiderIdName = obj.personName
                    this.pd.dpbId = obj.pbId
                       break;
                    case 2:
                      
                     var obj = {};
                     obj = this.cdrdata.find(item =>{

                        return item.courtPersonId === val
                    });
                  

                    // this.pd.courtOutsiderIdName = obj.personName
                       this.pd.cpbId = obj.pbId
                       break;

                   default:
                       break;
               }
               }
        },
        //意见建议添修改查看
        getyj(t){
          if(t!=0){
              if(this.pdmult.length==0){
                  this.$message.error('请选择一条数据！');return;
              }else if(this.pdmult.length>1){
                 this.$message.error('只能选择一条数据！');return;
              }
          }else{
             if(this.ListDataJd.length==0){
               this.$message.error('请先选择结对的代表信息！');return;
             }
          }
          console.log('添加时的值',this.tempdata);
          
         this.yjdata=this.tempdata;
         this.yjsDialogVisible=true;
        },
        getGL(t){
           if(t==1){
             this.suggDialogVisible=true;
           }else if(t==2){
             this.caseDialogVisible=true;
           }
        },
        yjsfatherMethod(type,data){
          if(type=='99'){
            this.yjsDialogVisible=false;
          }else{
              
               if(data && data.length>0){
                     this.hdyjdata=[];
                     this.tempdata=[];
                     this.tempdata=data;
                     var array=data;
                     for (let i = 0; i < array.length; i++) {
                         
                         var arr=array[i].yjlistdata;
                         if(arr && arr.length>0){
                            for (let j = 0; j <arr.length; j++) {
                                  var object={};
                                  object.participantsInfoId=array[i].leaderPerson;
                                  object.participantsInfoName=array[i].leaderPersonName;
                                  object.overallAssessment=array[i].overallAssessment;
                                  object.sort=arr[j].sort;
                                  object.feedBackStatus=array[i].feedBackStatus;
                                  object.feedBackTime=array[i].feedBackTime;
                                  object.remark=array[i].remark;
                                  object.contents=arr[j].contents;
                                  this.hdyjdata.push(object);
                            }
                         }
                      
                     }

                       const res = new Map();
                       var srr= this.hdyjdata;
                       this.yjtableData=srr.filter((srr) => !res.has(srr.participantsInfoId) && res.set(srr.participantsInfoId, 1))
                }

              console.log('this.hdyjdata多条数据',this.hdyjdata);
              console.log('this.tempdata临时数据',this.tempdata);
              console.log('this.yjtableData显示数据',this.yjtableData);
              this.yjsDialogVisible=false;
          }
        },
        suggfatherMethod(type,data){
      
          
          if(type=='99'){
            this.suggDialogVisible=false;
          }else{
           if(this.suggList1 && this.suggList1.length>0){
           
             for (let i = 0; i < data.length; i++) {
               this.suggList1.push(data[i]);
             }
           }else{
              this.suggList1=data;
           }

             this.suggDialogVisible=false;
          }
        },
        casefatherMethod(type,data){
           if(type=='99'){
            this.caseDialogVisible=false;
          }else{
             if(this.suggList2 && this.suggList2.length>0){
           
             for (let i = 0; i < data.length; i++) {
               this.suggList2.push(data[i]);
             }
           }else{
              this.suggList2=data;
           }
             this.caseDialogVisible=false;
          }
        },
        delsuggAdd(t,n){
             if(t==1){
                  var arr=[];
                  arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.suggList1.findIndex(item =>{
    　　　　　　　　　  　 if(item.number==arr[i].number){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.suggList1.splice(index,1);
                
                 }
             }else if(t==2){
                  var arr=[];
                  arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.suggList2.findIndex(item =>{
    　　　　　　　　　  　 if(item.casenum==arr[i].casenum){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.suggList2.splice(index,1);
                
                 }
             }
           },
          getJdlist(){
             if(this.pd.courtOutUserId=='' || this.pd.courtOutUserId==null || this.pd.courtOutUserId==undefined){
                this.$message.error("结对人不能为空!");return;
              }
              if(this.pd.courtOutsiderId=='' || this.pd.courtOutsiderId==null || this.pd.courtOutsiderId==undefined){
                this.$message.error("代表不能为空!");return;
              }
             
                  var obj = {};
                    obj = this.lxdbdata.find(item =>{
                        return item.personId === this.pd.courtOutsiderId
                    });
               
                 this.ListDataJd.push(obj);
                 const res = new Map();
                 var arr=this.ListDataJd;
                 this.ListDataJd=arr.filter((arr) => !res.has(arr.personId) && res.set(arr.personId, 1));
                 this.$set(this.pd5,'ck1',false);
                 this.ListDataWX=[];
             
                
       
       
       },
       getwx(){
         if(this.ListDataJd  && this.ListDataJd.length>0){
             this.ListDataWX=this.ListDataJd;
             this.$nextTick(function () {
                 for (let i = 0; i < this.ListDataWX.length; i++) {
                
                 if(this.pd5.ck1){ this.$refs.mlTable.toggleRowSelection(this.ListDataWX[i],true);}
                }
              })
         }else{
             this.$message.error("请先选择代表！");  this.$set(this.pd5,'ck1',false);return;
         }
          
       },
     tableRowClassName({row, rowIndex}) {
        if (row.feedBackStatus == '已答复') {
          return 'flag-row';
        } 
        return '';
      },




    }

}
</script>
<style scoped>

.txttop{vertical-align: top}
.border{border: 1px solid #E6E6E6; border-radius: 6px;margin-top: 10px;}
.ts{font-size: 12px;color: red;}
.block .close{display: block;position: absolute;font-size: 25px;font-weight:bold;cursor: pointer;z-index: 999;margin-top: -185px;margin-left: 170px;}
</style>
