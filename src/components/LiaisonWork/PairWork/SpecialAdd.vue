<template>
  <div class="pairadd">
    <div class="homebread">
      <i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
      <span>
        联络工作
        <span class="mlr_10">/</span>
        <b>{{cname}}</b>
      </span>
    </div>
    <div class="content subtable">
      <div class="ptitle mb-20">{{cnames}}</div>
      <div class="pborder mb-50">
        <el-row class="ah-40">
          <el-col :span="12" class="input-item" v-if="addtype=='4' || addtype=='5'">
            <span class="yy-input-text" style="width:22.5%;">
              <font class="red">*</font> 时间
            </span>
            <div class="yy-input-input inputw t-flex t-date">
              <el-date-picker
                :disabled="llbnt"
                v-model="form.startTime"
                type="datetime"
                size="small"
                placeholder="开始时间"
                format="yyyy-MM-dd HH:mm"
                @change="changedate(form.startTime,1)"
              ></el-date-picker>
              <span class="septum">-</span>
              <el-date-picker
                :disabled="llbnt"
                v-model="form.endTime"
                type="datetime"
                size="small"
                placeholder="结束时间"
                format="yyyy-MM-dd HH:mm"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="12" class="input-item" v-else-if="addtype=='11'">
            <span class="yy-input-text" style="width:22.5%;">
              <font class="red">*</font>
              联系时间
            </span>
            <div class="yy-input-input inputw t-flex t-date">
              <el-date-picker
                :disabled="llbnt"
                v-model="form.contactTime"
                style="width:100%!important;"
                type="date"
                size="small"
                placeholder="选择时间"
                @change="changedate(form.contactTime)"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="12" class="input-item" v-else>
            <span class="yy-input-text" style="width:22.5%;">
              <font class="red">*</font>
              时间
            </span>
            <div class="yy-input-input inputw t-flex t-date">
              <el-date-picker
                :disabled="llbnt"
                v-model="form.startTime"
                type="date"
                size="small"
                placeholder="开始时间"
                @change="changedate(form.startTime,1)"
              ></el-date-picker>
              <span class="septum">-</span>
              <el-date-picker
                :disabled="llbnt"
                v-model="form.endTime"
                type="date"
                size="small"
                placeholder="结束时间"
              ></el-date-picker>
            </div>
          </el-col>

          <el-col :span="24" v-if="addtype!=11" class="input-item">
            <span class="yy-input-text textw">
              <font class="red">*</font> 地点
            </span>
            <el-input
              placeholder="请输入内容"
              size="small"
              :disabled="llbnt"
              clearable
              v-model="form.location"
              class="yy-input-input inputw"
            ></el-input>
          </el-col>
          <el-col :span="24" v-if="addtype==11" class="input-item">
            <span class="yy-input-text textw">
              <font class="red">*</font> 联系形式
            </span>
            <el-select
              v-model="form.contactDistinction"
              :disabled="llbnt"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
              style="width:40%!important"
            >
              <el-option
                v-for="(item,ind) in $store.state.lxss"
                :key="ind"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="24" v-if="addtype!=9 && addtype!=11" class="input-item">
            <span class="yy-input-text textw">
              <font class="red">*</font>
              <span v-if="addtype==4 || addtype==5" title="当事人及案由">当事人及案由</span>
              <span v-else-if="addtype==6">会议名称</span>
              <span v-else>主题</span>
            </span>
            <el-input
              placeholder="请输入内容"
              :disabled="llbnt"
              size="small"
              clearable
              v-model="form.theme"
              class="yy-input-input inputw"
            ></el-input>
          </el-col>
          <el-col :span="8" v-if="addtype!=9 && addtype!=11" class="input-item">
            <span class="yy-input-text textn">
              <font class="red">*</font>
              开展单位
            </span>
            <el-select
              v-model="form.developmentUnitId"
              remote
              :remote-method="kzdwremoteMethod"
              @focus="getfocus(2)"
              v-el-select-loadmore="kzloadmore"
              :disabled="llbnt"
              @change="getkzbm(form.developmentUnitId);"
              filterable
              clearable
              default-first-option
              placeholder="请输入关键字搜索"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in kzdwdata"
                :key="ind"
                :label="item.mc"
                :value="item.orgid"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" v-if="addtype!=9 && addtype!=11" class="input-item">
            <span class="yy-input-text textn">开展部门</span>
            <el-select
              v-model="form.devDepartmentId"
              :disabled="llbnt"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
              :no-data-text="form.developmentUnitId==''||form.developmentUnitId==undefined?'请先选择开展单位':'无数据'"
            >
              <el-option
                v-for="(item,ind) in fybmdata"
                :key="ind"
                :label="item.mc"
                :value="item.orgid"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :span="8" v-if="addtype==9" class="input-item">
            <span class="yy-input-text textn">
              <font class="red">*</font>
              接待单位
            </span>
            <el-select
              v-model="form.receptionUnitId"
              remote
              :remote-method="fydwremoteMethod"
              v-el-select-loadmore="fyloadmore"
              @focus="getfocus(3)"
              :disabled="llbnt"
              @change="getcbbm(form.receptionUnitId,3)"
              filterable
              clearable
              default-first-option
              placeholder="请输入关键字搜索"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in fydwdata"
                :key="ind"
                :label="item.mc"
                :value="item.orgid"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" v-if="addtype==9" class="input-item">
            <span class="yy-input-text textn">接待部门</span>
            <el-select
              v-model="form.receptionDepartmentId"
              @change="getJDR(form.receptionUnitId,form.receptionDepartmentId)"
              :disabled="llbnt"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
              :no-data-text="form.receptionUnitId==''||form.receptionUnitId==undefined?'请先选择接待单位':'无数据'"
            >
              <el-option
                v-for="(item,ind) in fybmdata3"
                :key="ind"
                :label="item.mc"
                :value="item.orgid"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="ah-40" v-if="addtype==6 || addtype==5 || addtype==7 || addtype==4">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">
              <font class="red">*</font> 承办单位
            </span>
            <el-select
              v-model="form.undertakeUnitId"
              remote
              :remote-method="fydwremoteMethod"
              v-el-select-loadmore="fyloadmore"
              @focus="getfocus(3)"
              :disabled="llbnt"
              @change="getcbbm(form.undertakeUnitId,2)"
              filterable
              clearable
              default-first-option
              placeholder="请输入关键字搜索"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in fydwdata"
                :key="ind"
                :label="item.mc"
                :value="item.orgid"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">承办部门</span>
            <el-select
              v-model="form.undertakeDepartmentId"
              :disabled="llbnt"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
              :no-data-text="form.undertakeUnitId==''||form.undertakeUnitId==undefined?'请先选择承办单位':'无数据'"
            >
              <el-option
                v-for="(item,ind) in fybmdata2"
                :key="ind"
                :label="item.mc"
                :value="item.orgid"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row class="ah-40" v-if="addtype==2 && !llbnt">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">
              <font class="red">&ensp;</font> 视察单位
            </span>
            <el-select
              v-model="pd1.inspectOrgId"
              remote
              :remote-method="scdwremoteMethod"
              @focus="getfocus(4)"
              v-el-select-loadmore="scloadmore"
              @change="chChange(pd1.inspectOrgId,1)"
              filterable
              clearable
              default-first-option
              placeholder="请输入关键字搜索"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in scdwdata"
                :key="ind"
                :label="item.mc"
                :value="item.orgid"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">视察内容</span>
            <el-select
              v-model="pd1.inspectTypeId"
              @change="chChange(pd1.inspectTypeId,2)"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in $store.state.scfl"
                :key="ind"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <el-button type="success" size="small" plain @click="getAdd(1,pd1)">加入列表</el-button>
          </el-col>
        </el-row>
        <el-row class="ah-40" v-if="addtype==2">
          <el-col :span="24" class="input-item">
            <el-table ref="multipleTable" :data="ListData1">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="inspectOrg" label="视察单位"></el-table-column>
              <el-table-column prop="inspectType" label="视察内容"></el-table-column>
              <el-table-column label="操作" v-if="!llbnt">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      class="a-btn"
                      title="删除"
                      icon="el-icon-delete"
                      @click="delAdd(1,scope.row)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

        <el-row class="ah-40" v-if="addtype==3 && !llbnt">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">
              <font class="red">&ensp;</font> 调研单位
            </span>
            <el-select
              v-model="pd2.inspectOrgId"
              remote
              :remote-method="fydwremoteMethod"
              v-el-select-loadmore="fyloadmore"
              @focus="getfocus(3)"
              @change="chChange(pd2.inspectOrgId,3)"
              filterable
              clearable
              default-first-option
              placeholder="请输入关键字搜索"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in fydwdata"
                :key="ind"
                :label="item.mc"
                :value="item.orgid"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">调研内容</span>
            <el-select
              v-model="pd2.inspectTypeId"
              @change="chChange(pd2.inspectTypeId,4)"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in $store.state.scfl"
                :key="ind"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <el-button type="success" size="small" plain @click="getAdd(2,pd2)">加入列表</el-button>
          </el-col>
        </el-row>

        <el-row class="ah-40" v-if="addtype==3 ">
          <el-col :span="24" class="input-item">
            <el-table ref="multipleTable" :data="ListData2">
              <!-- <el-table-column
                                type="selection"
                                width="50">
              </el-table-column>-->
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="inspectOrg" label="调研单位"></el-table-column>
              <el-table-column prop="inspectType" label="调研内容"></el-table-column>
              <el-table-column label="操作" v-if="!llbnt">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      class="a-btn"
                      title="删除"
                      icon="el-icon-delete"
                      @click="delAdd(2,scope.row)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row class="ah-40" v-if="addtype==8 && !llbnt">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text" style="width:30%" title="首发新闻单位">
              <font class="red">&ensp;</font> 首发新闻单位
            </span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="pd3.newsMediaName"
              class="yy-input-input"
            ></el-input>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">宣传报道形式</span>
            <!-- @change="chChange(pd3.newsMediaTypeId,5)" -->
            <el-select
              v-model="pd3.newsMediaTypeId"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in $store.state.xwdwfl"
                :key="ind"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">转发媒体级别</span>
            <!-- @change="chChange(pd3.farWordMediaLevel,7)" -->
            <el-select
              v-model="pd3.farWordMediaLevel"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in $store.state.zfxwjb"
                :key="ind"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <!-- <el-row  class="ah-40" v-if="addtype==8">
                        <el-col :span="24" class="mt-10" style="text-align:right">
                            <el-button type="success" size="small" plain @click="getAdd(3,pd3)">加入列表</el-button>
                        </el-col>
                       <el-col :span="24" class="input-item">
                             <el-table
                            ref="multipleTable"
                            :data="ListData3">
                           
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="newsMediaName"
                                label="首发新闻单位">
                            </el-table-column>
                            <el-table-column
                                prop="newsMediaTypes"
                                label="宣传报道形式">
                            </el-table-column>
                            <el-table-column
                                prop="farWordMediaLevels"
                                label="转发媒体级别">
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
        </el-row>-->

        <el-row class="ah-40" v-if="addtype==9 ">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">
              <font class="red">&ensp;</font> 接待人
            </span>
            <el-select
              v-model="pd7.receptionistid"
              v-if="!llbnt"
              @change="chChange(pd7.receptionistid,6)"
              filterable
              clearable
              allow-create
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
              :no-data-text="form.receptionDepartmentId==''||form.receptionDepartmentId==undefined?'请先选择接待部门':'无数据'"
            >
              <el-option
                v-for="(item,ind) in jdrdata"
                :key="ind"
                :label="item.fullName"
                :value="item.pbId"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">
              <!-- <font class="red">&ensp;</font> -->
              活动时职务
            </span>
            <el-select
              v-model="pd7.position"
              :disabled="llbnt"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in $store.state.zw"
                :key="ind"
                :label="item.mc"
                :value="item.dm+'|'+item.mc"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="input-item">
            <el-button
              type="success"
              size="small"
              plain
              @click="getAdd(4,pd7.receptionistinfo)"
            >加入列表</el-button>
          </el-col>
        </el-row>
        <el-row class="ah-40" v-if="addtype==9">
          <el-col :span="24" class="input-item">
            <el-table ref="multipleTable" :data="ListData7">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="personName" label="姓名"></el-table-column>
              <!-- <el-table-column prop="sex" label="性别"></el-table-column> -->
              <el-table-column prop="orgName" label="单位"></el-table-column>
              <el-table-column prop="subOrgPosition" label="职务"></el-table-column>
              <el-table-column label="操作" v-if="!llbnt">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      class="a-btn"
                      title="删除"
                      icon="el-icon-delete"
                      @click="delAdd(7,scope.row)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">
              <font class="red">&ensp;</font> 接待人数
            </span>
            <span style="color:red;font-weight:bold">{{count3}}</span>人
          </el-col>
        </el-row>
        <el-row class="mt-20" v-if="addtype=='7'">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text" style="width:20%;">
              <font class="red">&ensp;</font> 走访人
            </span>
            <!-- <el-select v-model="fymber" remote :remote-method="fyrdwremoteMethod" v-el-select-loadmore="fyrloadmore" @visible-change="getFYName($event)" v-if="!llbnt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:70%!important" >
                    <el-option
                      v-for="(item,ind) in fydata"
                      :key="ind"
                      :label="item.fullName"
                      :value="item.pbId">
                      </el-option>
            </el-select>-->
            <el-select
              v-model="fymber"
              remote
              :remote-method="fyrdwremoteMethodnew"
              allow-create
              v-el-select-loadmore="fyrloadmorenew"
              @focus="getfocus(1)"
              @change="getNullVlaue(fymber,2)"
              v-if="!llbnt"
              filterable
              clearable
              default-first-option
              placeholder="请输入关键字搜索"
              size="small"
              class="yy-input-input"
              style="width:70%!important"
            >
              <el-option
                v-for="(item,ind) in fydata"
                :key="ind"
                :label="item.fullName"
                :value="item.pbId"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">
              <font class="red">&ensp;</font>
              活动时职务
            </span>
            <el-select
              v-model="position1"
              :disabled="llbnt"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in $store.state.zw"
                :key="ind"
                :label="item.mc"
                :value="item.dm+'|'+item.mc"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" v-if="!llbnt" class="input-item">
            <el-button type="success" size="small" plain @click="ChangeZfNameList(fymber)">加入列表</el-button>
          </el-col>
        </el-row>
        <el-row class="ah-40" v-if="addtype=='7'">
          <el-col :span="24" class="input-item">
            <el-table :data="ListDatazf">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="personName" label="姓名"></el-table-column>
              <el-table-column prop="orgName" label="单位"></el-table-column>
              <el-table-column label="职务">
                <template slot-scope="scope">
                  <div>{{scope.row.subOrgPosition}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" v-if="!llbnt">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      class="a-btn"
                      title="删除"
                      icon="el-icon-delete"
                      @click="delAdd(13,scope.row)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text" style="width:31%">
              <font class="red">&ensp;</font> 走访人数
            </span>
            <span style="color:red;font-weight:bold">{{countzf}}</span>人
          </el-col>
        </el-row>
        <el-row class="mt-20">
          <el-col :span="15" class="input-item elselect">
            <span class="yy-input-text" style="min-width:180px" title="代表、委员以及特约人员">
              <font class="red">&ensp;</font> 代表、委员以及特约人员
            </span>
            <el-select
              v-model="lmdbid"
              remote
              :remote-method="xmdwremoteMethod"
              v-el-select-loadmore="xmloadmore"
              @focus="getfocus(5)"
              v-if="!llbnt"
              popper-class="select-popper"
              :popper-append-to-body="false"
              filterable
              clearable
              default-first-option
              placeholder="请输入关键字搜索"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in xmdata"
                :key="ind"
                :title="item.fullName"
                :label="item.fullName"
                :value="item.pbId+'|'+item.personId"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="input-item" v-if="!llbnt">
            <el-button type="success" size="small" plain @click="ChangeNameList(lmdbid)">加入列表</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="input-item">
            <el-table ref="multipleTable" :data="ListData4">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="personName" label="姓名"></el-table-column>
              <el-table-column prop="identity" label="身份"></el-table-column>
              <el-table-column label width="1"></el-table-column>
              <el-table-column label="团(界)别">
                <template slot-scope="scope">
                  <div>
                    <span
                      v-if="scope.row.groupType!=null && scope.row.circlesType!=null"
                    >{{scope.row.groupType}}</span>
                    <span v-else-if="scope.row.groupType!=null">{{scope.row.groupType}}</span>
                    <span v-else-if="scope.row.circlesType!=null">{{scope.row.circlesType}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="单位职务">
                <template slot-scope="scope">
                  <span>{{scope.row.job}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" v-if="!llbnt">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      class="a-btn"
                      title="删除"
                      icon="el-icon-delete"
                      @click="delAdd(4,scope.row)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24" class="mt-20">
            <span class="yy-input-text" style="width:240px;">
              <font class="red">&ensp;</font> 代表、委员以及特约人员人数
            </span>
            <span style="font-weight:bold;color:red;margin-left:20px;">{{count1}}</span> 人
          </el-col>
        </el-row>
        <el-row class="ah-40 mt-20" v-if="addtype!='9' && addtype!='7' && addtype!='8'">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">
              <font class="red">&ensp;</font>
              <span v-if="addtype==11">联系人</span>
              <span v-else>法院院领导</span>
            </span>
            <!-- <el-select v-model="fyld" remote :remote-method="fyrdwremoteMethod"  v-el-select-loadmore="fyrloadmore"   @visible-change="getFYName($event)" @change="getNullVlaue(fyld,2)" v-if="!llbnt" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" style="width:70%!important" >
                               <el-option
                                 v-for="(item,ind) in fydata"
                                 :key="ind"
                                 :label="item.fullName"
                                 :value="item.pbId">
                                 </el-option>
            </el-select>-->
            <el-select
              v-model="fyld"
              allow-create
              filterable
              remote
              :remote-method="fyrdwremoteMethodnew"
              v-el-select-loadmore="fyrloadmorenew"
              @focus="getfocus(1)"
              @change="getNullVlaue(fyld,2)"
              v-if="!llbnt"
              clearable
              default-first-option
              placeholder="请输入关键字搜索"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in fydata"
                :key="ind"
                :label="item.fullName"
                :value="item.pbId"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" v-if="!llbnt">
            &nbsp;
            <el-button type="success" size="small" plain @click="ChangeFYNameList(fyld)">加入列表</el-button>
          </el-col>
          <el-col :span="14" class="red" style="font-size:12px;padding-top:9px; height:20px;">
            <span class="ml-20">
              当您选择的
              <span v-if="addtype==11">联系人</span>
              <span v-else>法院院领导</span>信息与参加活动的信息不匹配时，可以选择活动时单位，活动时部门，活动时职务。
            </span>
          </el-col>
        </el-row>
        <el-row class="ah-40 mt-10" v-if="addtype!='9' && addtype!='7' && addtype!='8'">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">
              <font class="red">&ensp;</font>
              活动时单位
            </span>

            <el-select
              v-model="ssxx.orgId"
              remote
              :remote-method="fydwremoteMethod"
              v-el-select-loadmore="fyloadmore"
              @focus="getfocus(3)"
              :disabled="llbnt"
              @change="getcbbm(ssxx.orgId,4)"
              filterable
              clearable
              default-first-option
              placeholder="请输入关键字搜索"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in fydwdata"
                :key="ind"
                :label="item.mc"
                :value="item.orgid+'|'+item.mc"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">
              <font class="red">&ensp;</font>
              活动时部门
            </span>
            <el-select
              v-model="ssxx.subOrgId"
              :disabled="llbnt"
              allow-create
              filterable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
              
            >
              <el-option
                v-for="(item,ind) in fybmdata4"
                :key="ind"
                :label="item.mc"
                :value="item.orgid+'|'+item.mc"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text textn">
              <font class="red">&ensp;</font>
              活动时职务
            </span>
            <el-select
              v-model="ssxx.position"
              :disabled="llbnt"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in $store.state.zw"
                :key="ind"
                :label="item.mc"
                :value="item.dm+'|'+item.mc"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row class="ah-40" v-if="addtype!='9' && addtype!='7' && addtype!='8'">
          <el-col :span="24">
            <el-table ref="multipleTable" :data="ListData5">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="personName" label="姓名"></el-table-column>

              <el-table-column prop="orgName" label="单位">
                <template slot-scope="scope">
                  <div>
                    <span v-if="scope.row.orgId">{{scope.row.orgMC}}</span>
                    <span v-else>{{scope.row.orgName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="subOrgName" label="部门">
                <template slot-scope="scope">
                  <div>
                    <span v-if="scope.row.subOrgId">{{scope.row.subOrgMC}}</span>
                    <span v-else>{{scope.row.subOrgName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="subOrgPosition" label="职务">
                <template slot-scope="scope">
                  <div>
                    <span v-if="scope.row.position">{{scope.row.positionMC}}</span>
                    <span v-else>{{scope.row.subOrgPosition}}</span>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column
                                label="更正信息">
                                <template slot-scope="scope">
                                  <div style="color:green">
                                    <span v-if='scope.row.orgId'>{{scope.row.orgMC}}</span>
                                    <span v-if='scope.row.subOrgId'> 
                                      <font v-if='scope.row.orgId'> / </font> 
                                      {{scope.row.subOrgMC}}</span>
                                    <span v-if='scope.row.position'> 
                                      <font v-if='scope.row.orgId || scope.row.subOrgId'> / </font> 
                                      {{scope.row.positionMC}}</span>
                                  </div>
                                </template>
              </el-table-column>-->
              <el-table-column label="操作" v-if="!llbnt">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      class="a-btn"
                      title="删除"
                      icon="el-icon-delete"
                      @click="delAdd(5,scope.row)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="8">
            <span class="yy-input-text" style="width:31%">
              <font class="red">&ensp;</font>
              <span v-if="addtype==11">联系人</span>
              <span v-else>法院院领导</span>人数
            </span>
            <span style="color:red;font-weight:bold">{{count2}}</span>人
          </el-col>
        </el-row>
        <el-row class="ah-40 mt-20">
          <el-col :span="24" class="input-item1">
            <span class="yy-input-text texts">
              <font class="red">*</font>
              {{label4}}
            </span>
            <div class="yy-input-input inputw">
              <div v-if="llbnt" v-html="form.contents" class="nrcss"></div>
              <vue-ueditor-wrap
                v-else
                v-model="form.contents"
                :config="myConfig"
                style="width:100%!important;line-height:20px;"
              ></vue-ueditor-wrap>
            </div>
          </el-col>
          <el-col :span="24" style="margin-left:10.3%;">
            <el-checkbox v-model="pd5.ck1" :disabled="llbnt">人民法院各部门组织开展的特约人员活动</el-checkbox>
          </el-col>
          <el-col :span="24" style="margin-left:10.3%;">
            <el-checkbox v-model="pd5.ck11" @change="getwx()" :disabled="llbnt">建立微信群</el-checkbox>
            <el-input
              placeholder="请输入微信群名称"
              size="small"
              :disabled="llbnt"
              v-if="pd5.ck11"
              clearable
              v-model="wxname"
              style="width:20%;margin-left:10px;"
            ></el-input>
          </el-col>
          <el-col :span="24" style="margin-left:10.5%;" v-if="pd5.ck11">
            <div :class="llbnt?'yy-input-input wxq':'yy-input-input'" style="width:89%!important;">
              <el-table
                ref="mlTable"
                :data="ListDataWX"
                @row-click="clickRow"
                @selection-change="wxChange"
              >
                <el-table-column type="selection" width="50" :selectable="selectInit"></el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="personName" label="姓名"></el-table-column>
                <el-table-column prop="identity" label="身份"></el-table-column>
                <el-table-column label="团(界)别">
                  <template slot-scope="scope">
                    <div>
                      <span
                        v-if="scope.row.groupType!=null && scope.row.circlesType!=null"
                      >{{scope.row.groupType}}</span>
                      <span v-else-if="scope.row.groupType!=null">{{scope.row.groupType}}</span>
                      <span v-else-if="scope.row.circlesType!=null">{{scope.row.circlesType}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="单位职务">
                  <template slot-scope="scope">
                    <span>{{scope.row.job}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="24" style="margin-left:10.3%;" v-if="addtype==2">
            <el-checkbox v-model="pd5.ck2" :disabled="llbnt">集中专项视察</el-checkbox>
          </el-col>
          <!-- <el-col :span="24" style="margin-left:10.2%;" v-if="addtype==7">
                             <el-checkbox v-model="pd5.ck5" :disabled="llbnt">院领导参与标识</el-checkbox>
          </el-col>-->

          <el-col :span="24" style="margin-left:10.3%;" v-if="addtype==4 || addtype==5">
            <el-checkbox v-model="pd5.ck8" :disabled="llbnt">组织座谈交流</el-checkbox>
          </el-col>
          <el-col :span="24" style="margin-left:10.3%;" v-if="addtype==4 || addtype==5">
            <el-checkbox v-model="pd5.ck6" :disabled="llbnt">是否大要案</el-checkbox>
          </el-col>
          <el-col :span="24" style="margin-left:10.3%;" v-if="addtype==6">
            <el-checkbox v-model="pd5.ck9" :disabled="llbnt">专门组织召开的代表委员特约人员会议</el-checkbox>
          </el-col>
          <el-col :span="24" style="margin-left:10.3%;" v-if="addtype==6">
            <el-checkbox v-model="pd5.ck10" :disabled="llbnt">邀请代表委员特约人员参加的一般性会议</el-checkbox>
          </el-col>
          <el-col :span="24" style="margin-left:10.3%;">
            <el-checkbox v-model="pd5.ck3" :disabled="llbnt" @change="getCheck(1)">结合议案建议或政协提案办理</el-checkbox>
            <el-button
              type="success"
              style="margin-left:20px;"
              size="mini"
              v-if="pd5.ck3  && !llbnt"
              @click="getGLXX(1)"
            >关联</el-button>
          </el-col>
          <el-col :span="24" v-if="pd5.ck3" style="margin-left:10.5%;">
            <el-row class="ah-40">
              <el-col :span="24" class="input-item">
                <div class="yy-input-input" style="width:89%!important;">
                  <el-table ref="multipleTable" :data="ListData9">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="number" label="编号"></el-table-column>
                    <el-table-column prop="proposalType" label="类型"></el-table-column>
                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column prop="leaderPerson" label="提出人"></el-table-column>
                    <el-table-column label="操作" v-if="!llbnt">
                      <template slot-scope="scope">
                        <div>
                          <el-button
                            type="text"
                            class="a-btn"
                            title="删除"
                            icon="el-icon-delete"
                            @click="delAdd(9,scope.row)"
                          ></el-button>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <!-- <el-col :span="24" style="margin-left:10.2%;" v-if="addtype==3">
                             <el-checkbox v-model="pd5.ck4" :disabled="llbnt" @change="getCheck(2)">代表委员意见建议办理</el-checkbox>  
                               <el-button type="success" style="margin-left:20px;" size="mini" v-if="pd5.ck4  && !llbnt" @click="getGL(2)">关联</el-button>
          </el-col>-->

          <el-col :span="24" style="margin-left:10.3%;">
            <el-checkbox v-model="pd5.ck7" :disabled="llbnt">结合代表、委员及特约人员关注案件</el-checkbox>
            <el-button
              type="success"
              style="margin-left:20px;"
              size="mini"
              v-if="pd5.ck7 && !llbnt"
              @click="getGLXX(2)"
            >关联关注案件</el-button>
          </el-col>
          <el-col :span="24" v-if="pd5.ck7" class="input-item" style="margin-left:10.5%;">
            <!-- <span class="yy-input-text txttop" style="width:10.2%;">关注的案件</span> -->
            <div class="yy-input-input" style="width:89%!important;">
              <el-table ref="multipleTable" :data="ListData8">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="casenum" label="案件号"></el-table-column>
                <el-table-column prop="partiesandcasereason" label="当事人及案由"></el-table-column>
                <el-table-column prop="leaderpbid" label="来文人姓名" width="150"></el-table-column>
                <el-table-column prop="letternumber" label="来文字号"></el-table-column>
                <el-table-column prop="lettercontents" label="来文要求" width="250"></el-table-column>
                <el-table-column label="操作" v-if="!llbnt">
                  <template slot-scope="scope">
                    <div>
                      <el-button
                        type="text"
                        class="a-btn"
                        title="删除"
                        icon="el-icon-delete"
                        @click="delAdd(11,scope.row)"
                      ></el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <!-- <el-row class="ah-40" v-if="pd5.ck4">
                        <el-col :span="24" class="input-item">
                       <span class="yy-input-text" style="width:10.2%;" >代表委员<br/>意见建议</span>
                       <div class="yy-input-input  txttop" style="width:89%!important;">
                             <el-table
                            ref="multipleTable"
                            :data="ListData10">
                           
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
        </el-row>-->

        <el-row class="ah-40">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text textdt txttop" title="代表、委员及特约人员意见建议">代表、委员及特约人员意见建议</span>
            <div class="yy-input-input inputw">
              <el-row class="mt-10">
                <el-col :span="24" style="text-align:right;" v-if="!llbnt">
                  <el-button type="primary" size="small" plain @click="getyj(0)">添加</el-button>
                </el-col>

                <!-- <el-button type="success" size="small" plain  :disabled="yjbnt" @click="getyj(1)">修改</el-button>
                <el-button type="danger"  size="small" plain  :disabled="yjbnt" @click="getyj(2)">查看</el-button>-->
              </el-row>
              <el-table
                ref="multipleTable4"
                :data="dbtableData"
                @row-click="clickRow4"
                @selection-change="pdchange4"
                :row-class-name="tableRowClassName"
              >
                <!-- <el-table-column
                                type="selection"
                                width="50">
                </el-table-column>-->
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column prop="contents" label="评价和意见建议" width="300" align="left">
                  <template slot-scope="scope">
                    <el-popover
                      placement="top-start"
                      width="300"
                      trigger="hover"
                      style="text-align:left;"
                      v-if="scope.row.contents"
                    >
                      <div>{{scope.row.contents}}</div>
                      <div
                        slot="reference"
                      >{{ scope.row.contents.substr(0,20)}}{{scope.row.contents.length>20?'......':''}}</div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column prop="participantsInfoName" label="代表、委员及特约人员" width="250"></el-table-column>
                <el-table-column prop="feedBackStatus" label="是否反馈"></el-table-column>
                <el-table-column prop="feedBackTime" label="反馈时间"></el-table-column>
                <el-table-column label="操作" v-if="!llbnt">
                  <template slot-scope="scope">
                    <div>
                      <el-button
                        type="text"
                        class="a-btn"
                        title="删除"
                        icon="el-icon-delete"
                        @click="pddel(3,scope.row)"
                      ></el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="24" class="input-item1 mt-20" v-if="ztpjshow">
            <span class="yy-input-text texts">
              <font class="red">&ensp;</font>
              总体评价
            </span>
            <div class="yy-input-input inputw">
              <div v-if="llbnt" v-html="form.overallAssessment" class="nrcss"></div>
              <vue-ueditor-wrap
                v-else
                v-model="form.overallAssessment"
                :config="myConfig"
                style="width:100%!important;line-height:20px;"
              ></vue-ueditor-wrap>
            </div>
          </el-col>
          <el-col :span="24" class="input-item mt-20">
            <span class="yy-input-text textd txttop" title="工作情况报告">
              <font class="red">&ensp;</font> 工作情况报告
            </span>
            <div class="yy-input-input inputw" v-if="!llbnt">
              <el-button
                type="primary"
                plain
                style="width:160px;font-size:14px;"
                size="small"
                icon="el-icon-plus"
                @click="upload(0)"
              >上传文件</el-button>
              <span class="ts"></span>
            </div>
          </el-col>
          <el-col :span="24" class="mb-20" v-if="filedata0 && filedata0.length>0">
            <el-table :data="filedata0">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="filename" label="文件名称"></el-table-column>
              <el-table-column prop="filesuffix" label="文件类型"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      class="a-btn"
                      title="下载"
                      icon="el-icon-download"
                      @click="downData(scope.row)"
                    ></el-button>
                    <el-button
                      type="text"
                      v-if="!llbnt"
                      class="a-btn"
                      title="删除"
                      icon="el-icon-delete"
                      @click="delfile(scope.row,filedata0)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24" class="input-item mt-10">
            <span class="yy-input-text textd txttop">
              <font class="red">*</font> 影像资料
            </span>
            <div class="yy-input-input inputw" v-if="!llbnt">
              <el-button
                type="primary"
                plain
                style="width:160px;font-size:14px;"
                size="small"
                icon="el-icon-plus"
                @click="upload(1)"
              >上传影像资料</el-button>
            </div>
          </el-col>
          <el-col :span="24" v-if="fits && fits.length>0">
            <div
              style="margin-left:11%;"
              v-for="(fit,ind) in fits"
              :key="ind"
              v-dragging="{ item: fit, list: fits, group: 'fit' }"
            >
              <div
                class="block"
                style="float:left;margin-right:20px;margin-top:20px"
                v-if="getImgV(fit.filesuffix)"
              >
                <el-popover placement="right" title trigger="click">
                  <img :src="fit.filepath" style="max-width:700px; max-height:700px;" />

                  <img :src="fit.filepath" slot="reference" width="180" height="150" />
                </el-popover>

                <a class="close" @click="delImg(fit.imagedatainfoid)" v-if="!llbnt">
                  <i class="el-icon-error"></i>
                </a>
              </div>
              <div class="block" style="float:left;margin-right:20px;margin-top:20px" v-else>
                <el-popover placement="right" title trigger="click">
                  <video
                    :src="fit.filepath"
                    width="550"
                    height="500"
                    class="avatar video-avatar"
                    controls="controls"
                  >您的浏览器不支持视频播放</video>
                  <video
                    :src="fit.filepath"
                    width="180"
                    height="150"
                    class="avatar video-avatar"
                    controls="controls"
                    slot="reference"
                  >您的浏览器不支持视频播放</video>
                </el-popover>
                <a class="close" @click="delImg(fit.imagedatainfoid)" v-if="!llbnt">
                  <i class="el-icon-error"></i>
                </a>
                <!-- <div style="font-size:11px;text-align:center">{{fit.filename}}.{{fit.filesuffix}}</div>  -->
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 领导批示 -->
      <div class="ptitle mb-20">领导批示</div>
      <div class="pborder">
        <el-row class="ah-50" v-if="!llbnt">
          <el-col :span="6">
            <span class="yy-input-text textp">批示人</span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="pd4.instructorName"
              class="yy-input-input inputp"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span class="yy-input-text pl-10">批示单位</span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="pd4.instructionUnit"
              class="yy-input-input"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span class="yy-input-text">职务</span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="pd4.instructionPosition"
              class="yy-input-input"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span class="yy-input-text">批示时间</span>
            <el-date-picker
              class="yy-input-input"
              v-model="pd4.instructionTime"
              format="yyyy-MM-dd"
              type="date"
              size="small"
              value-format="yyyy-MM-dd"
              placeholder="选择时间"
            ></el-date-picker>
          </el-col>
          <el-col :span="24" class="input-item">
            <span class="yy-input-text texts">批示内容</span>
            <el-input
              placeholder="请输入内容"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
              size="small"
              clearable
              v-model="pd4.instructionContents"
              class="yy-input-input"
              style="width:70%!important;margin-right:20px;"
            ></el-input>
            <el-button type="success" size="small" plain @click="ChangePSNameList(pd4)">加入列表</el-button>
          </el-col>
        </el-row>
        <el-row class="ah-50">
          <el-col :span="24">
            <el-table ref="multipleTable" :data="ListData6">
              <!-- <el-table-column
                                type="selection"
                                width="50">
              </el-table-column>-->
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="instructorName" label="批示人"></el-table-column>
              <el-table-column prop="instructionUnit" label="批示单位"></el-table-column>
              <el-table-column prop="instructionPosition" label="职务"></el-table-column>
              <el-table-column prop="instructionTime" label="批示时间"></el-table-column>
              <el-table-column prop="instructionContents" label="批示内容"></el-table-column>
              <el-table-column label="操作" v-if="!llbnt">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      class="a-btn"
                      title="删除"
                      icon="el-icon-delete"
                      @click="delAdd(6,scope.row)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row class="ah-50" v-if="state!='0'">
          <el-col :span="6">
            <span class="yy-input-text textp">录入单位</span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="form.entryUnit"
              :disabled="true"
              class="yy-input-input inputp"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span class="yy-input-text pl-10">录入部门</span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="form.entryDepartment"
              :disabled="true"
              class="yy-input-input"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span class="yy-input-text">录入人</span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="form.entryPerson"
              :disabled="true"
              class="yy-input-input"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span class="yy-input-text">录入时间</span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="form.entryTime"
              :disabled="true"
              class="yy-input-input"
            ></el-input>
          </el-col>
        </el-row>
      </div>

      <div class="footer">
        <el-button
          type="primary"
          style="width:130px;"
          v-if="!llbnt &&  querybnt"
          @click="submit"
        >保 存</el-button>
        <el-button
          type="success"
          style="width:150px;"
          v-if="!llbnt &&  querybnt && state==0"
          @click="submit(1)"
        >保存并继续录入</el-button>
        <el-button type="primary" style="width:130px;" v-if="llbnt && querybnt" :disabled="true">保存中</el-button>

        <el-button style="width:130px;" @click="goto()">关 闭</el-button>
      </div>
      <br />
    </div>
    <el-dialog
      title="上传文件"
      :visible.sync="uploadDialogVisible"
      :close-on-click-modal="false"
      width="630px"
    >
      <UPLOAD
        :url="uurl"
        :type="0"
        :urlErr="urlErr"
        @fatherMethod="fatherMethod"
        :random="new Date().getTime()"
      ></UPLOAD>
    </el-dialog>
    <el-dialog
      title="上传影视资料"
      :visible.sync="YJDialogVisible"
      :close-on-click-modal="false"
      width="850px"
    >
      <VIDEONEW
        :url="vvurl"
        :type="2"
        :urlErr="urlErr"
        @DfatherMethod="DfatherMethod"
        :random="new Date().getTime()"
      ></VIDEONEW>
    </el-dialog>
    <el-dialog
      title="活动意见建议"
      :visible.sync="yjsDialogVisible"
      v-if="yjsDialogVisible"
      :close-on-click-modal="false"
      width="950px"
    >
      <SUGGEST
        :data="yjdata"
        :namelist="ListData4"
        :type="addtype"
        @yjsfatherMethod="yjsfatherMethod"
        :random="new Date().getTime()"
      ></SUGGEST>
    </el-dialog>
    <el-dialog
      title="结合议案建议或政协提案办理"
      :visible.sync="suggDialogVisible"
      :close-on-click-modal="false"
    >
      <SUGGALL
        :data="yjdata"
        :type="addtype"
        @suggfatherMethod="suggfatherMethod"
        :random="new Date().getTime()"
      ></SUGGALL>
    </el-dialog>
    <el-dialog
      title="结合代表、委员及特约人员关注案件"
      :visible.sync="caseDialogVisible"
      :close-on-click-modal="false"
    >
      <CASE
        :data="yjdata"
        :type="addtype"
        @casefatherMethod="casefatherMethod"
        :random="new Date().getTime()"
      ></CASE>
    </el-dialog>
  </div>
</template>
<script scoped>
import UPLOAD from "../../Common/upload";
import VIDEO from "../../Common/video";
import VIDEONEW from "../../Common/imgvideo";
import SUGGEST from "../../Common/suggest/suggestions";
import CASE from "../../Common/suggest/caseinfoall";
import SUGGALL from "../../Common/suggest/suggestall";
import { sortByKeyD, sortByKey } from "@/assets/js/ToArray.js";
import { getServerDate, formatDate, getYear } from "@/assets/js/date.js";
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  components: {
    UPLOAD,
    VIDEO,
    VIDEONEW,
    SUGGEST,
    CASE,
    SUGGALL,
    VueUeditorWrap
  },
  inject: ["reload"],
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function() {
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  data() {
    return {
      CurrentPage1: 1,
      pageSize1: parseInt(this.$store.state.pagesize),
      TotalResult1: 0,
      CurrentPage2: 1,
      pageSize2: parseInt(this.$store.state.pagesize),
      TotalResult2: 0,
      pd: {},
      pd1: {},
      pd2: {},
      pd3: {},
      pd4: {}, //批示列表
      pd5: {
        ck1: false,
        ck2: false,
        ck3: false,
        ck4: false,
        ck5: false,
        ck7: false,
        ck6: false,
        ck8: false,
        ck9: false,
        ck10: false,
        ck11: false
      }, //复选框 单元框
      pd6: {},
      pd7: {}, //接待人员列表
      pd8: {}, //关注案件
      pd10: {}, //用于日常建议
      form: {
        orgDepartmentId: "",
        undertakeDepartmentId: "",
        devDepartmentId: ""
      },
      tableData1: [],
      tableData2: [],
      ListData1: [],
      ListData2: [],
      ListData3: [],
      ListData4: [],
      ListData5: [],
      ListData6: [], //批示列表
      ListData7: [], //接待人员列表
      ListData8: [], //关注的案件
      ListData9: [], //结合的议案建议或提案
      ListData10: [], //代表委员意见建议
      pdData1: [],
      pdData2: [],
      pdData3: [],
      filedata0: [], //文件
      multipleTable: [],
      pdmult1: [],
      pdmult2: [],
      pdmult3: [],
      pdmult4: [],
      dbtableData: [],
      pairDialogVisible: false,
      dbDialogVisible: false,
      bnt: true,
      yjbnt: true,
      uurl: "/FileUploadController/uploadWorkReport",
      vvurl: "/FileUploadController/uploadImageData",
      urlErr: "",
      yjdata: "",
      uploadDialogVisible: false,
      YJDialogVisible: false,
      lwDialogVisible: false,
      lwDialogVisible2: false,
      yjsDialogVisible: false,
      suggDialogVisible: false,
      caseDialogVisible: false,
      addtype: "",
      cname: "",
      cnames: "",
      label4: "",
      lmdbid: "",
      xmdata: [], //代表、委员以及特约人员
      count1: 0,
      fyld: "",
      fydata: [], //法院领导
      count2: 0,
      count3: 0,
      scdwdata: [], //视察单位
      fydwdata: [],
      fybmdata: [],
      fybmdata1: [], //承办部门
      fybmdata2: [], //开展部门
      fybmdata3: [], //接待
      cbdwdata: [],
      llgzform: {},
      kzdwdata: [],
      activityInfoId: "",
      state: "",
      llbnt: false,
      yatxt: "",
      fits: [], //影像资料
      jdrdata: [], //接待人员
      baseid: [],
      yearlist: getYear(),
      lrdata: [], //录入法院
      glname: "代表委员及特约人员评价和意见建议",
      glbs: 0,
      tempdata: [],
      hdyjdata: [],
      ListDatazf: [],
      fymber: "",
      countzf: 0,
      ListDataWX: [],
      wxname: "",
      pdmultwx: [],
      tshow: false,
      jznum: 50, //下载加载多少条
      kzdwload: [], //开展单位
      fydwload: [], //法院单位
      scdwload: [], //视察单位
      xmload: [], // 代表、委员以及特约人员
      fyload: [], //法院领导
      formData: {
        //下拉参数
        pageIndex: 1,
        pageSize: 20
      },
      tempload: [],
      bs: 0,
      ssxx: {}, //所属信息
      fybmdata4: [],
      qyear: "", //年
      myConfig: {},
      querybnt: true,
      ztpjshow: false,
      position1: ""
    };
  },
  watch: {
    $route: {
      handler: function() {
        this.getinit(this.$route);
      },
      immediate: true
    }
  },

  mounted() {
    this.$store.dispatch("getZw");
    this.myConfig = {
      toolbars: [
        [
          "undo", //撤销
          "bold", //加粗
          "indent", //首行缩进
          "italic", //斜体
          "underline", //下划线
          "strikethrough", //删除线
          "subscript", //下标
          "fontborder", //字符边框
          "superscript", //上标
          "formatmatch", //格式刷
          "fontfamily", //字体
          "fontsize", //字号
          "justifyleft", //居左对齐
          "justifycenter", //居中对齐
          "justifyright", //居右对齐
          "justifyjustify", //两端对齐
          "insertorderedlist", //有序列表
          "insertunorderedlist", //无序列表
          "lineheight" //行间距
        ]
      ],
      zIndex: 0,
      elementPathEnabled: false,
      autoHeightEnabled: false,
      initialFrameHeight: 240,
      initialFrameWidth: "100%",
      serverUrl: "/FileUploadController/uploadImageData",
      UEDITOR_HOME_URL: this.Global.ueditordz
    };

    this.$dragging.$on("dragged", val => {
      //console.log(val)//这里我们不需要做任何操作；组件内部会把我们绑定上去的list自动排序;只需要查看结果就可以
      //如果需要在这里进行其他操作，可以查看val的内容，包括：拖动的元素，拖动后与之兑换的元素，以及原始数据和拖动组名
    });
    this.$dragging.$on("dragend", val => {
      //此处是拖动完成后鼠标松开时触发的事件
    });
    //this.getinit(this.$route);
  },
  activated() {},
  methods: {
    pageSizeChange1(val) {
      this.pageSize1 = val;
      this.pdsearch(1, this.CurrentPage1, val, this.pd6);
    },
    handleCurrentChange1(val) {
      this.CurrentPage1 = val;
      this.pdsearch(1, val, this.pageSize1, this.pd6);
    },
    handleCurrentChange2(val) {
      this.CurrentPage2 = val;
      this.pdsearch(2, val, this.pageSize2, this.pd10);
    },
    clickRow(row) {
      this.$refs.mlTable.toggleRowSelection(row);
    },
    clickRow1(row) {
      this.$refs.multipleTable1.toggleRowSelection(row);
    },
    clickRow2(row) {
      this.$refs.multipleTable2.toggleRowSelection(row);
    },
    clickRow3(row) {
      this.$refs.multipleTable3.toggleRowSelection(row);
    },
    clickRow4(row) {
      this.$refs.multipleTable4.toggleRowSelection(row);
    },
    pdchange1(val) {
      this.pdmult1 = val;
    },
    pdchange2(val) {
      this.pdmult2 = val;
    },
    pdchange3(val) {
      this.pdmult3 = val;
    },
    pdchange4(val) {
      this.pdmult4 = val;
      if (this.pdmult4.length > 0) {
        this.yjbnt = false;
      } else {
        this.yjbnt = true;
      }
    },
    wxChange(val) {
      this.pdmultwx = val;
    },
    //代表、委员以及特约人员列表
    getName(callback) {
      if (callback && this.xmload.length == 0) {
        let p = {
          name: ""
        };
        // /baseinfo/personlist
        this.$api.post(
          this.Global.aport1 + "/baseinfo/personlistforactivity",
          p,
          r => {
            this.xmload = r.data;
            this.xmquery();
          }
        );
      }
    },
    xmquery() {
      if (this.xmload.length > this.jznum) {
        this.xmdata = this.xmload.slice(0, this.jznum);
      } else {
        this.xmdata = this.xmload;
      }
    },
    //代表、委员以及特约人员远程搜索
    xmdwremoteMethod(quer) {
      if (quer !== "") {
        let p = {
          personName: quer
        };

        this.$api.post(
          this.Global.aport1 + "/baseinfo/personlistforactivity",
          p,
          r => {
            this.xmload = r.data;
            if (this.xmload.length > this.jznum) {
              this.bs = 0;
              this.xmdata = this.xmload.slice(0, this.jznum);
            } else {
              this.bs = 1;
              this.xmdata = this.xmload;
            }
          }
        );
      } else {
        this.xmdata = [];
      }
    },
    //代表、委员以及特约人员加载
    xmloadmore() {
      if (this.bs == 1) {
        return;
      }
      var srr = this.xmload;
      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.xmdata = srr.filter((item, index, arr) => {
        return index < num;
      });
    },

    ChangeNameList(val) {
      if (this.lmdbid == undefined || this.lmdbid == "") {
        this.$message.error("代表、委员以及特约人员不能为空！");
        return;
      }
      if (val == "" || val == null) {
        return;
      }
      var arr = val.split("|");
      var obj = {};
      obj = this.xmdata.find(item => {
        return item.pbId === arr[0] && item.personId === arr[1];
      });
      var srr = this.ListData4;

      var ff = false;
      for (let i = 0; i < srr.length; i++) {
        if (srr[i].pbId == arr[0] && srr[i].personId == arr[1]) {
          ff = true;
          // this.$confirm(srr[i].personName+'已经存在?', '提示', {
          // confirmButtonText: '确定',
          // cancelButtonText: '',
          // type: 'warning'
          // }).then(() => {
          //   this.delAdd(4,srr[i]);
          //   this.ListData4.push(obj);
          //   this.count1=this.ListData4.length;
          //   this.$set(this.pd5,'ck11',false);
          //   this.ListDataWX=[];

          // }).catch(() => {

          //       this.$message.info("已取消操作");

          //  });

          this.$alert(srr[i].personName + "已经存在?", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              // this.delAdd(4,srr[i]);
              // this.ListData4.push(obj);
              // this.count1=this.ListData4.length;
              // this.$set(this.pd5,'ck11',false);
              // this.ListDataWX=[];
            }
          });
        }
      }
      if (!ff) {
        this.ListData4.push(obj);

        // this.ListData4=sortByKey(this.ListData4,'sort');
        this.count1 = this.ListData4.length;
      }
      this.lmdbid = "";
      this.xmquery();
    },
    //法院领导新接口
    getfyld(callback) {
      if (callback && this.fydata.length == 0) {
        this.getfykeyWord();
      }
    },
    fylddwremoteMethod(quer) {
      if (quer !== "" || this.fydata.length <= 0) {
        this.getfykeyWord(quer);
      }
    },

    getfykeyWord(name) {
      let p = {
        primaryId: "",
        riskDate: "",
        params: {
          keyWord: name,
          pageSize: this.jznum + "",
          pageNumber: "1"
        },
        itemIndex: ["API_PERSON_SUCCESSION"]
      };
      this.$api.post("http://192.168.50.111:9406/risk/analysis", p, r => {
        if (r.code == 200) {
          this.fydata = r.data.indexItemsValues.API_PERSON_SUCCESSION.data;
        }
      });
    },
    //法院领导新方法
    fyrdwremoteMethodnew(quer) {
      if (quer != "") {
        this.fydata = [];
        let p = {
          personName: quer
        };
        this.$api.post(
          this.Global.aport1 + "/courtPerson/getCourtLeader",
          p,
          r => {
            if (r.code == 1) {
              this.fyload = r.data;
              if (this.fyload.length > this.jznum) {
                this.bs = 0;
                this.fydata = this.fyload.slice(0, this.jznum);
              } else {
                this.bs = 1;
                this.fydata = this.fyload;
              }
            }
          }
        );
      } else {
        this.fydata = [];
      }
    },
    //法院领导加载
    fyrloadmorenew() {
      if (this.bs == 1) {
        return;
      }
      var srr = this.fyload;
      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.fydata = srr.filter((item, index, arr) => {
        return index < num;
      });
    },

    //法院领导
    getFYName(callback) {
      if (callback && this.fydata.length == 0) {
        let p = {
          personName: ""
        };
        this.$api.post(
          this.Global.aport1 + "/courtPerson/getCourtLeader",
          p,
          r => {
            if (r.code == 1) {
              this.fyload = r.data;
              this.fyrquery();
            }
          }
        );
      }
    },
    fyrquery() {
      if (this.fyload.length > this.jznum) {
        this.fydata = this.fyload.slice(0, this.jznum);
      } else {
        this.fydata = this.fyload;
      }
    },
    //法院领导远程搜索
    fyrdwremoteMethod(quer) {
      if (quer !== "" || this.fydata.length <= 0) {
        var arr = this.fyload.filter(item => {
          return item.fullName.indexOf(quer) + 1;
        });
        this.tempload = arr;
        if (arr.length > this.jznum) {
          this.fydata = arr.slice(0, this.jznum);
        } else {
          this.fydata = arr;
        }
      } else {
        this.tempload = [];
        this.fyrquery();
      }
    },
    //法院领导加载
    fyrloadmore() {
      var srr = this.fyload;
      if (this.tempload.length > 0) {
        srr = this.tempload;
      }
      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.fydata = srr.filter((item, index, arr) => {
        return index < num;
      });
    },

    ChangeFYNameList(val) {
      if (this.fyld == undefined || this.fyld == "") {
        this.$message.error("法院领导不能为空！");
        return;
      }

      var obj = {};
      if (
        this.fydata.find(function(x) {
          return x.pbId == val;
        }) != undefined
      ) {
        obj = this.fydata.find(item => {
          return item.pbId === val;
        });
      } else {
        if (!this.ssxx.orgId) {
          this.$message.error("请选择活动时单位！");
          return;
        }
        if (!this.ssxx.subOrgId) {
          this.$message.error("请选择活动时部门！");
          return;
        }

        if (!this.ssxx.position) {
          this.$message.error("请选择活动时职务！");
          return;
        }

        obj.personName = this.fyld;
      }
      console.log(obj);
      if (this.ssxx.orgId) {
        console.log(obj, this.ssxx.orgId, this.ssxx.orgId.split("|")[0]);
        obj.orgId = this.ssxx.orgId.split("|")[0];
        obj.orgMC = this.ssxx.orgId.split("|")[1];
      }
      if (this.ssxx.subOrgId) {
        obj.subOrgId = this.ssxx.subOrgId.split("|")[0];
        obj.subOrgMC = this.ssxx.subOrgId.split("|")[1];
      }
      if (this.ssxx.position) {
        obj.position = this.ssxx.position.split("|")[0];
        obj.positionMC = this.ssxx.position.split("|")[1];
      }

      var srr = this.ListData5;
      var ff = false;
      for (let i = 0; i < srr.length; i++) {
        if (srr[i].pbId == val) {
          ff = true;
          this.$confirm(srr[i].personName + "已经存在?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.delAdd(12, srr[i]);
              this.ListData5.push(obj);
              this.count2 = this.ListData5.length;
            })
            .catch(() => {
              this.$message.info("已取消操作");
            });
        }
      }
      if (!ff) {
        this.ListData5.push(obj);
        this.count2 = this.ListData5.length;
      }
      this.ssxx = {};
      this.fyld = "";
      this.fydata = [];
    },
    ChangeZfNameList(val) {
      if (this.fymber == undefined || this.fymber == "") {
        this.$message.error("走访人不能为空！");
        return;
      }
      var obj = {};
      let fymber = this.fymber;
      if (
        this.fydata.find(function(x) {
          return x.pbId == fymber;
        }) != undefined
      ) {
        obj = this.fydata.find(item => {
          return item.pbId === val;
        });
      } else {
        if (!this.form.developmentUnitId) {
          this.$message.error("请选择开展单位！");
          return;
        }
        if (!this.form.devDepartmentId) {
          this.$message.error("请选择开展部门！");
          return;
        }
        if (!this.position1) {
          this.$message.error("请选择活动时职务！");
          return;
        }
        obj.personName = this.fymber;
        let deve = this.form.developmentUnitId;
        let deveobj = this.kzdwdata.find(function(i) {
          return i.orgid == deve;
        });
        obj.orgName = deveobj.mc;
        obj.orgId = deveobj.orgid;
        obj.orgMC = deveobj.mc;
        let devDe = this.form.devDepartmentId;
        let devDeobj = this.fybmdata.find(function(i) {
          return i.orgid == devDe;
        });
        obj.subOrgId = devDeobj.orgid;
        obj.subOrgMC = devDeobj.mc;
        obj.position = this.position1.split("|")[0];
        obj.positionMC = this.position1.split("|")[1];
        obj.subOrgPosition = this.position1.split("|")[1];
      }
      console.log(obj);
      var srr = this.ListDatazf;
      var ff = false;
      for (let i = 0; i < srr.length; i++) {
        if (srr[i].pbId == val) {
          ff = true;
          this.$confirm(srr[i].personName + "已经存在?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.delAdd(13, srr[i]);
              this.ListDatazf.push(obj);
              this.countzf = this.ListDatazf.length;
            })
            .catch(() => {
              this.$message.info("已取消操作");
            });
        }
      }
      if (!ff) {
        this.ListDatazf.push(obj);
        this.countzf = this.ListDatazf.length;
      }

      this.fymber = "";
      this.position1="";
      this.fyrquery();
    },
    ChangePSNameList(n) {
      if (
        this.pd4.instructorName == undefined ||
        this.pd4.instructorName == ""
      ) {
        this.$message.error("批示人不能为空！");
        return;
      }
      if (
        this.pd4.instructionUnit == undefined ||
        this.pd4.instructionUnit == ""
      ) {
        this.$message.error("批示单位不能为空！");
        return;
      }
      if (
        this.pd4.instructionPosition == undefined ||
        this.pd4.instructionPosition == ""
      ) {
        this.$message.error("职务不能为空！");
        return;
      }
      if (
        this.pd4.instructionTime == undefined ||
        this.pd4.instructionTime == ""
      ) {
        this.$message.error("批示时间不能为空！");
        return;
      }
      if (
        this.pd4.instructionContents == undefined ||
        this.pd4.instructionContents == ""
      ) {
        this.$message.error("批示内容不能为空！");
        return;
      }
      this.ListData6.push(n);
      this.pd4 = {};
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
    reset() {
      // Object.assign(this.$data, this.$options.data.call(this));
      this.pd = {};
      this.pd1 = {};
      this.pd2 = {};
      this.pd3 = {};
      this.pd4 = {};
      this.pd6 = {};
      this.pd7 = {};
      this.pd8 = {};
      (this.pd5 = {
        ck1: false,
        ck2: false,
        ck3: false,
        ck4: false,
        ck5: false,
        ck7: false,
        ck6: false,
        ck8: false,
        ck9: false,
        ck10: false,
        ck11: false
      }), //复选框 单元框
        (this.form = {
          orgDepartmentId: "",
          undertakeDepartmentId: "",
          devDepartmentId: ""
        }),
        (this.tableData1 = []);
      this.tableData2 = [];
      this.ListData1 = [];
      this.ListData2 = [];
      this.ListData3 = [];
      this.ListData4 = [];
      this.ListData5 = [];
      this.ListData6 = [];
      this.ListData7 = [];
      this.ListData8 = [];
      this.ListData9 = [];
      this.ListData10 = [];
      this.ListDatazf = [];
      this.fits = [];
      this.llbnt = false;
      this.lrdata = [];
      this.jdrdata = [];
      this.llgzform = {};
      this.scdwdata = [];
      this.fydwdata = [];
      this.fybmdata = [];
      this.xmdata = [];
      this.cbdwdata = [];
      this.fybmdata1 = [];
      this.fybmdata2 = [];
      this.fybmdata3 = [];
      this.fybmdata4 = [];
      this.pdData1 = [];
      this.pdData2 = [];
      this.pdData3 = [];
      this.filedata0 = [];
      this.dbtableData = [];
      this.count1 = 0;
      this.count2 = 0;
      this.countzf = 0;
      this.fyld = "";
      this.fymber = "";
      this.lmdbid = "";
      this.ListDataWX = [];
      this.wxname = "";
      this.kzdwdata = [];
      this.ListDatazf = [];
      this.kzdwload = [];
      this.fydwload = [];
      this.scdwload = [];
      this.xmload = [];
      this.fyload = [];
      this.fydata = [];
      this.tempload = [];
      this.ssxx = {};
      this.qyear = "";
      this.hdyjdata = [];
      this.tempdata = [];
      this.yjtableData = [];
      this.querybnt = true;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    getinit(val) {
      this.reset();
      this.addtype = val.query.type;
      this.baseid = val.query.baseid;
      this.activityInfoId = val.query.activityInfoId;
      this.qyear = val.query.year;

      if (this.qyear) {
        switch (this.addtype) {
          case "4":
          case "5":
            this.$set(this.form, "startTime", this.qyear + "-01-01");
            this.$set(this.form, "endTime", this.qyear + "-01-01");
            break;
          case "11":
            this.$set(this.form, "contactTime", this.qyear + "-01-01");
            break;
          default:
            this.$set(this.form, "startTime", this.qyear + "-01-01");
            this.$set(this.form, "endTime", this.qyear + "-01-01");
            break;
        }
        if (parseInt(this.qyear) < 2020) {
          this.ztpjshow = true;
        } else {
          this.ztpjshow = false;
        }
      }
      var mid = "";
      switch (this.addtype) {
        case "2":
          mid = "12032302";
          break;
        case "3":
          mid = "12052303";
          break;
        case "4":
          mid = "12072304";
          break;
        case "5":
          mid = "12092305";
          break;
        case "6":
          mid = "12112306";
          break;
        case "7":
          mid = "12132307";
          break;
        case "8":
          mid = "12152308";
          break;
        case "9":
          mid = "12172309";
          break;
        case "10":
          mid = "12192310";
          break;
        default:
          break;
      }

      //权限start
      this.$api.post(this.Global.menuurl, { menuId: mid }, r => {
        if (r.code == 0) {
          this.$router.push({ path: "/limitmsg" });
        }
      });
      //权限end

      if (val.query.state == null) {
        this.state = "0";
      } else {
        this.state = val.query.state;
      }
      if (this.state == "9") {
        this.llbnt = true;
      }

      switch (this.addtype) {
        case "3":
          this.$store.dispatch("getScfl");
          this.cname = "专题调研活动";
          this.label4 = "调研总体情况";
          this.form.activityType = "0149000003"; //调研
          break;
        case "4":
          this.cname = "旁听庭审活动";
          this.label4 = "旁听情况";
          this.form.activityType = "0149000004"; //旁听
          break;
        case "5":
          this.cname = "见证执行活动";
          this.label4 = "活动情况";
          this.form.activityType = "0149000005";
          break;
        case "6":
          this.cname = "会议座谈活动";
          this.label4 = "会议座谈情况";
          this.form.activityType = "0149000006"; //座谈
          break;
        case "7":
          this.cname = "走访活动";
          this.label4 = "走访情况";
          this.form.activityType = "0149000007";

          break;
        case "8":
          this.$store.dispatch("getXwdwfl");
          this.$store.dispatch("getZfxwjb");
          this.cname = "新闻宣传活动";
          this.label3 = "新闻媒体列表";
          this.label4 = "主要报道内容";
          this.form.activityType = "0149000009";
          break;
        case "9":
          this.cname = "接待来访活动";
          this.label4 = "接待情况";
          this.form.activityType = "0149000008";
          break;
        case "10":
          this.cname = "其他活动";
          this.label4 = "活动情况";
          this.form.activityType = "0149000011"; //其他活动
          break;
        case "11":
          this.$store.dispatch("getLxss");
          this.cname = "日常沟通活动";
          this.label4 = "联系内容";
          this.form.activityType = "0149000010"; //日常沟通活动
          break;
        default:
          this.$store.dispatch("getScfl");
          this.cname = "专项视察活动";
          this.label4 = "视察总体情况";
          this.form.activityType = "0149000002"; //专项视察
          break;
      }

      this.getList();
    },
    getList() {
      if (this.state == "1" || this.state == "9") {
        this.querybnt = false;
        let p = {
          activityInfoId: this.activityInfoId
        };
        this.$api.post(
          this.Global.aport2 + "/ActivityInfoController/getAllActivityInfo",
          p,
          r => {
            // this.form=r.data;
            if (r.code == 1) {
              this.form = r.data.activity;
              this.getKZDW(this.form.developmentUnitId);
              //  if(this.form.undertakeUnitId!=null){
              //      this.getcbbm(this.form.undertakeUnitId,1,'1');
              //  }
              if (this.addtype == "6") {
                this.changedate(this.form.contactTime);
              } else {
                this.changedate(this.form.startTime);
              }
              //开展单位
              if (this.form.developmentUnitId != null) {
                //  this.getcbbm(this.form.developmentUnitId,0,'1');
                this.getkzbm(this.form.developmentUnitId, 0);
              }

              if (
                this.addtype == "4" ||
                this.addtype == "5" ||
                this.addtype == "6" ||
                this.addtype == "7"
              ) {
                this.getFY(true, this.form.undertakeUnitId);
                //承办单位
                if (this.form.undertakeUnitId != null) {
                  this.getcbbm(this.form.undertakeUnitId, 2, "1");
                }
              }

              if (this.addtype == "9") {
                this.getFY(true, this.form.receptionUnitId);
                //接待单位
                if (this.form.receptionUnitId != null) {
                  this.getcbbm(this.form.receptionUnitId, 3, "1");
                }
              }
              //日常接待的接待人员
              if (r.data.receptionistList != null) {
                this.ListData7 = r.data.receptionistList;
                this.count3 = this.ListData7.length;
              }
              //代表、委员以及特约人员
              if (r.data.participantsList != null) {
                this.ListData4 = r.data.participantsList;
                this.count1 = this.ListData4.length;
              }
              if (this.addtype == "7") {
                if (r.data.courtPersons != null) {
                  this.ListDatazf = r.data.courtPersons;
                  this.countzf = this.ListDatazf.length;
                }
              } else {
                //法院领导
                if (r.data.courtPersons != null) {
                  this.ListData5 = r.data.courtPersons;
                  this.count2 = this.ListData5.length;
                }
              }
              if (r.data.leadershipIns != null) {
                this.ListData6 = r.data.leadershipIns;
              }

              if (r.data.actiRelAdvList != null) {
                this.dbtableData = r.data.actiRelAdvList;
              }
              if (r.data.actiWorkReport != null) {
                this.filedata0 = r.data.actiWorkReport;
              }
              //活动意见建议
              if (r.data.suggestionList != null) {
                this.dbtableData = r.data.suggestionList;
              }
              if (r.data.inspectUnitCondition != null) {
                this.ListData1 = r.data.inspectUnitCondition;
                this.ListData2 = r.data.inspectUnitCondition;
              }
              if (r.data.imageDataList != null) {
                this.fits = r.data.imageDataList;
              }

              if (this.addtype == 8) {
                if (
                  r.data.newsMediaList != null &&
                  r.data.newsMediaList.length > 0
                ) {
                  this.pd3 = r.data.newsMediaList[0];
                }
              }
              //人民法院各部门组织开展的特约监督员或特邀咨询员活动
              if (r.data.activity.isSpecialPerson == "0184000001") {
                this.pd5.ck1 = true;
              } else {
                this.pd5.ck1 = false;
              }
              //是否大要案
              if (r.data.activity.emphasisCase == "0212000001") {
                this.pd5.ck6 = true;
              } else {
                this.pd5.ck6 = false;
              }

              if (r.data.activity.organizeDiscussionExchange == "0260000001") {
                this.pd5.ck8 = true;
              } else {
                this.pd5.ck8 = false;
              }

              //集中专项视察
              if (r.data.activity.isSpecialInspection == "0151000001") {
                this.pd5.ck2 = true;
              } else {
                this.pd5.ck2 = false;
              }
              //结合议案建议或政协提案办理
              if (r.data.activity.isMeetingMotion == "0155000001") {
                if (r.data.proposalRelActi != null) {
                  this.ListData9 = r.data.proposalRelActi;
                }
                this.pd5.ck3 = true;
              } else {
                this.pd5.ck3 = false;
              }
              //代表委员意见建议办理
              if (r.data.activity.isDailyMotion == "0126000001") {
                if (r.data.proposalRelActi != null) {
                  this.ListData10 = r.data.proposalRelActi;
                }
                this.pd5.ck4 = true;
              } else {
                this.pd5.ck4 = false;
              }
              //院领导参与标识
              if (r.data.activity.isLeadershipIn == "0208000001") {
                this.pd5.ck5 = true;
              } else {
                this.pd5.ck5 = false;
              }

              if (r.data.activity.meetingDistinction == "0281000001") {
                this.pd5.ck9 = true;
              } else {
                this.pd5.ck9 = false;
              }
              if (r.data.activity.meetingDistinction == "0281000002") {
                this.pd5.ck10 = true;
              } else {
                this.pd5.ck10 = false;
              }
              //代表、委员或监督员、咨询员关注案件
              if (r.data.activity.isFocusCase == "0125000001") {
                if (r.data.actiRelCaseList != null) {
                  this.ListData8 = r.data.actiRelCaseList;
                }
                this.pd5.ck7 = true;
              } else {
                this.pd5.ck7 = false;
              }
              //是否建立微信群
              if (r.data.activity.isWeiChatGroup == "0278000002") {
                this.pd5.ck11 = true;
                if (r.data.weiChatGroup != null) {
                  this.wxname = r.data.weiChatGroup.weiChatGroupName;
                  var array =
                    r.data.weiChatGroup.participantsList == null
                      ? []
                      : r.data.weiChatGroup.participantsList;
                  this.ListDataWX = array;
                  this.$nextTick(function() {
                    for (let ij = 0; ij < array.length; ij++) {
                      if (array[ij].ingroupdistinction == "0279000002") {
                        this.$refs.mlTable.toggleRowSelection(array[ij], true);
                      }
                    }
                  });
                }
              }

              this.ListDataJd =
                r.data.representativeInfoList == null
                  ? []
                  : r.data.representativeInfoList;
              var harr =
                r.data.suggestionList == null ? [] : r.data.suggestionList;

              this.getoldDataRule(harr);
            } else {
              this.$message.error(r.message);
            }

            this.querybnt = true;
          }
        );
      } else {
        if (this.addtype != "11") {
          this.getKZDW(); //开展单位
        }
      }
    },
    //代表议案建议
    getoldDataRule(arr) {
      if (arr && arr.length > 0) {
        for (let m = 0; m < arr.length; m++) {
          let obj_1 = {
            contents: arr[m].contents,
            overallAssessment: arr[m].overallAssessment,
            participantsInfoId: arr[m].participantsInfoId,
            participantsInfoName: arr[m].participantsInfoName,
            feedBackStatus: arr[m].feedBackStatus,
            feedBackTime: arr[m].feedBackTime,
            remark: arr[m].remark,
            sort: arr[m].sort
          };
          this.hdyjdata.push(obj_1); //多条数据
        }
        const res = new Map();
        var srr = sortByKey(this.hdyjdata, "sort");
        this.dbtableData = srr.filter(
          srr =>
            !res.has(srr.participantsInfoId) &&
            res.set(srr.participantsInfoId, 1)
        );
        var xsdata = this.dbtableData;
        for (let h = 0; h < xsdata.length; h++) {
          let obj_2 = {
            overallAssessment: xsdata[h].overallAssessment,
            leaderPerson: xsdata[h].participantsInfoId,
            leaderPersonName: xsdata[h].participantsInfoName,
            feedBackStatus: xsdata[h].feedBackStatus,
            feedBackTime: xsdata[h].feedBackTime,
            remark: xsdata[h].remark
          };
          var srr1 = this.hdyjdata.filter(item => {
            return item.participantsInfoId == xsdata[h].participantsInfoId;
          });

          var arrdata = [];
          for (let n = 0; n < srr1.length; n++) {
            var obj_3 = {
              contents: srr1[n].contents,
              leaderPerson: srr1[n].participantsInfoId,
              sort: srr1[n].sort
            };
            arrdata.push(obj_3);
          }

          obj_2.yjlistdata = arrdata;
          this.tempdata.push(obj_2);
        }

        // console.log('多条数据',this.hdyjdata);
        // console.log('临时数据',this.tempdata);
        // console.log('显示数据',this.dbtableData);
      }
    },

    DfatherMethod(data, type) {
      if (this.fits && this.fits.length > 0) {
        for (let i = 0; i < data.length; i++) {
          this.fits.push(data[i]);
        }
      } else {
        this.fits = data;
      }
      this.YJDialogVisible = false;
    },
    delImg(data) {
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
      var index = this.fits.findIndex(item => {
        if (item.imagedatainfoid == data) {
          return true;
        }
      });
      this.fits.splice(index, 1);
    },
    fatherMethod(data, t) {
      if (t == "0") {
        if (this.filedata0 && this.filedata0.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.filedata0.push(data[i]);
          }
        } else {
          this.filedata0 = data;
        }
      }
      this.uploadDialogVisible = false;
    },
    handleSelectionChange(val) {
      this.multipleTable = val;
    },
    getPair() {
      this.pairDialogVisible = true;
    },
    upload(t) {
      if (t == 1) {
        this.YJDialogVisible = true;
      } else {
        this.uploadDialogVisible = true;
      }
    },
    goto() {
      if (this.baseid != null) {
        var arr = this.baseid.split("|");

        this.$router.push({
          name: "BaseAdd",
          query: {
            type: arr[0],
            status: arr[1],
            pbid: arr[2],
            reid: arr[3],
            wtitle: arr[4] == "" ? "11" : arr[4]
          }
        });
      } else {
        this.$router.push({ name: "PairList", query: { type: this.addtype } });
      }
    },
    getAdd(t, val) {
      if (t == 1) {
        //视察列表

        if (this.pd1.inspectOrgId == undefined || this.pd1.inspectOrgId == "") {
          this.$message.error("视察单位不能为空!");
          return;
        }
        if (
          this.pd1.inspectTypeId == undefined ||
          this.pd1.inspectTypeId == ""
        ) {
          this.$message.error("视察内容不能为空!");
          return;
        }
        this.ListData1.push(val);
        this.pd1 = {};
        this.scdwdata = [];
      } else if (t == 2) {
        if (this.pd2.inspectOrgId == undefined || this.pd2.inspectOrgId == "") {
          this.$message.error("调研单位不能为空!");
          return;
        }
        if (
          this.pd2.inspectTypeId == undefined ||
          this.pd2.inspectTypeId == ""
        ) {
          this.$message.error("调研内容不能为空!");
          return;
        }
        this.ListData2.push(val);
        this.pd2 = {};
        this.fyquery();
      } else if (t == 3) {
        if (
          this.pd3.newsMediaName == undefined ||
          this.pd3.newsMediaName == ""
        ) {
          this.$message.error("首发新闻单位不能为空!");
          return;
        }
        if (
          this.pd3.newsMediaTypeId == undefined ||
          this.pd3.newsMediaTypeId == ""
        ) {
          this.$message.error("宣传报道形式不能为空!");
          return;
        }
        this.ListData3.push(val);

        this.pd3 = {};
      } else if (t == 4) {
        console.log(this.pd7);
        let obj = {};
        if (
          this.pd7.receptionistid == undefined ||
          this.pd7.receptionistid == ""
        ) {
          this.$message.error("接待人员不能为空!");
          return;
        }
        let aa = this.pd7.receptionistid;
        if (
          this.jdrdata.find(function(x) {
            return x.pbId == aa;
          }) != undefined
        ) {
          obj = val;
        } else {
          if (!this.form.receptionUnitId) {
            this.$message.error("请选择接待单位！");
            return;
          }
          if (!this.form.receptionDepartmentId) {
            this.$message.error("请选择接待部门！");
            return;
          }
          if (!this.pd7.position) {
            this.$message.error("请选择活动时职务!");
            return;
          }
          obj.personName = this.pd7.receptionistid;
          let recept = this.form.receptionUnitId;
          let receptobj = this.fydwdata.find(function(i) {
            return i.orgid == recept;
          });
          obj.orgName = receptobj.mc;
          obj.orgId = receptobj.orgid;
          obj.orgMC = receptobj.mc;

          let receptionDe = this.form.receptionDepartmentId;
          let receptionDeobj = this.fybmdata3.find(function(i) {
            return i.orgid == receptionDe;
          });
          obj.subOrgId = receptionDeobj.orgid;
          obj.subOrgMC = receptionDeobj.mc;

          obj.position = this.pd7.position.split("|")[0];
          obj.positionMC = this.pd7.position.split("|")[1];
          obj.subOrgPosition = this.pd7.position.split("|")[1];
        }
        this.ListData7.push(obj);
        console.log(this.ListData7);
        // const res = new Map();
        // var arr = this.ListData7;
        // this.ListData7 = arr.filter(
        //   arr => !res.has(arr.personName) && res.set(arr.personName, 1)
        // );
        this.pd7 = {};
        this.count3++;
      }
    },
    downData(n) {
      // window.location.href=n.filepath;
      var alink = document.createElement("a");
      alink.href = n.filepath;
      alink.setAttribute("download", n.filename);
      document.body.appendChild(alink);
      alink.click();
    },
    delAdd(t, n) {
      if (t == 1) {
        //视察列表
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListData1.findIndex(item => {
            if (
              item.inspectOrgId == arr[i].inspectOrgId &&
              item.inspectTypeId == arr[i].inspectTypeId
            ) {
              return true;
            }
          });
          this.ListData1.splice(index, 1);
        }
      } else if (t == 2) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListData2.findIndex(item => {
            if (
              item.inspectOrgId == arr[i].inspectOrgId &&
              item.inspectTypeId == arr[i].inspectTypeId
            ) {
              return true;
            }
          });
          this.ListData2.splice(index, 1);
        }
      } else if (t == 3) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListData3.findIndex(item => {
            if (item.newsMediaName == arr[i].newsMediaName) {
              return true;
            }
          });
          this.ListData3.splice(index, 1);
        }
      } else if (t == 4) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListData4.findIndex(item => {
            if (item.personId == arr[i].personId) {
              return true;
            }
          });
          this.ListData4.splice(index, 1);
          this.count1 = this.ListData4.length;
        }
      } else if (t == 5) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListData5.findIndex(item => {
            if (item.personName == arr[i].personName) {
              return true;
            }
          });
          this.ListData5.splice(index, 1);
          if (this.count2 > 0) {
            this.count2--;
          }
        }
      } else if (t == 6) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListData6.findIndex(item => {
            if (item.instructorName == arr[i].instructorName) {
              return true;
            }
          });
          this.ListData6.splice(index, 1);
        }
      } else if (t == 7) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListData7.findIndex(item => {
            if (item.personName == arr[i].personName) {
              return true;
            }
          });
          this.ListData7.splice(index, 1);
        }
        this.count3--;
      } else if (t == 9) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListData9.findIndex(item => {
            if (item.number == arr[i].number) {
              return true;
            }
          });
          this.ListData9.splice(index, 1);
        }
      } else if (t == 10) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListData10.findIndex(item => {
            if (item.number == arr[i].number) {
              return true;
            }
          });
          this.ListData10.splice(index, 1);
        }
      } else if (t == 11) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListData8.findIndex(item => {
            if (item.casenum == arr[i].casenum) {
              return true;
            }
          });
          this.ListData8.splice(index, 1);
        }
      } else if (t == 12) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListData5.findIndex(item => {
            if (item.pbId == arr[i].pbId) {
              return true;
            }
          });
          this.ListData5.splice(index, 1);
          this.count2 = this.ListData5.length;
        }
      } else if (t == 13) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.ListDatazf.findIndex(item => {
            if (item.pbId == arr[i].pbId) {
              return true;
            }
          });
          this.ListDatazf.splice(index, 1);
          this.countzf = this.ListDatazf.length;
        }
      }
    },
    delfile(n, filedata) {
      // let p={
      //       'activityWorkReportId':n.activityWorkReportId,
      //       'token':this.$store.state.token,
      // };
      //  this.$api.post(this.Global.aport2+'/FileUploadController/delWorkReport',p,
      //     r =>{

      //     });

      var arr = [];
      arr.push(n);
      for (let i = 0; i < arr.length; i++) {
        var index = filedata.findIndex(item => {
          if (item.activityworkreportid == arr[i].activityworkreportid) {
            return true;
          }
        });
        filedata.splice(index, 1);
      }
    },

    pddel(t, n) {
      if (t == 1) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.pdData1.findIndex(item => {
            if (item.title == arr[i].title) {
              return true;
            }
          });
          this.pdData1.splice(index, 1);
        }
      } else if (t == 3) {
        var arr = [];
        arr.push(n);
        for (let i = 0; i < arr.length; i++) {
          var index = this.dbtableData.findIndex(item => {
            if (item.participantsInfoId == arr[i].participantsInfoId) {
              return true;
            }
          });
          this.dbtableData.splice(index, 1);

          //              var index1 = this.hdyjdata.findIndex(item =>{
          // 　　　　　　　　　  　 if(item.participantsInfoId==arr[i].participantsInfoId){
          //         　　　　　　　　　　　　return true
          //         　　　　　　　　　　}
          //         　　　　　　　　})
          //                this.hdyjdata.splice(index1,1)

          for (let ii = 0; ii < this.hdyjdata.length; ii++) {
            let obj = this.hdyjdata[ii];
            if (obj.participantsInfoId == arr[i].participantsInfoId) {
              this.hdyjdata.splice(ii, 1);
              ii--;
            }
          }
          var index2 = this.tempdata.findIndex(item => {
            if (item.leaderPerson == arr[i].participantsInfoId) {
              return true;
            }
          });
          this.tempdata.splice(index2, 1);
        }
      }
    },
    getGLXX(t) {
      if (t == 1) {
        this.suggDialogVisible = true;
      } else if (t == 2) {
        this.caseDialogVisible = true;
      }
    },
    submit(t) {
      if (this.addtype != 11) {
        if (this.form.startTime == undefined || this.form.startTime == "") {
          this.$message.error("开始时间不能为空！");

          return;
        }
        if (this.form.endTime == undefined || this.form.endTime == "") {
          this.$message.error("结束时间不能为空！");
          return;
        }
        if (
          this.form.startTime != "" &&
          this.form.endTime != "" &&
          this.form.startTime > this.form.endTime
        ) {
          this.$message.error("开始时间不能大于结束时间！");
          return;
        }
      } else {
        if (this.form.contactTime == undefined || this.form.contactTime == "") {
          this.$message.error("联系时间不能为空！");
          return;
        }
      }
      if (this.addtype != 9 && this.addtype != 11) {
        if (this.form.theme == undefined || this.form.theme == "") {
          var label = "主题";
          if (this.addtype == 4 || this.addtype == 5) {
            label = "当事人及案由";
          } else if (this.addtype == 6) {
            label = "会议名称";
          }
          this.$message.error(label + "不能为空！");
          return;
        }
      }
      if (this.addtype == 11) {
        if (
          this.form.contactDistinction == undefined ||
          this.form.contactDistinction == ""
        ) {
          this.$message.error("联系形式不能为空！");
          return;
        }
      } else {
        if (this.form.location == undefined || this.form.location == "") {
          this.$message.error("地点不能为空");
          return;
        }
        if (this.addtype != 9) {
          if (
            this.form.developmentUnitId == undefined ||
            this.form.developmentUnitId == ""
          ) {
            this.$message.error("开展单位不能为空！");
            return;
          }
        }
      }

      if (this.addtype == 9) {
        if (
          this.form.receptionUnitId == undefined ||
          this.form.receptionUnitId == ""
        ) {
          this.$message.error("接待单位不能为空！");
          return;
        }
      }

      if (
        this.addtype == 6 ||
        this.addtype == 5 ||
        this.addtype == 7 ||
        this.addtype == 4
      ) {
        if (
          this.form.undertakeUnitId == undefined ||
          this.form.undertakeUnitId == ""
        ) {
          this.$message.error("承办单位不能为空！");
          return;
        }
        // if(this.form.undertakeDepartmentId==undefined || this.form.undertakeDepartmentId=="")
        // {

        //     this.$message.error("承办部门不能为空！");return;
        // }
      }

      if (this.ListData4.length == 0) {
        this.$message.error("代表、委员以及特约人员列表不能为空！");
        return;
      }
      if (this.form.contents == undefined || this.form.contents == "") {
        this.$message.error(this.label4 + "不能为空！");
        return;
      }

      if (this.addtype == "6") {
        if (this.pd5.ck9 && this.pd5.ck10) {
          this.$message.error(
            "专门组织召开的代表委员特约人员会议和邀请代表委员特约人员参加的一般性会议必须二选一！"
          );
          return;
        } else if (!this.pd5.ck9 && !this.pd5.ck10) {
          this.$message.error(
            "专门组织召开的代表委员特约人员会议和邀请代表委员特约人员参加的一般性会议必须二选一！"
          );
          return;
        }
      }

      if (this.addtype == "5") {
        if (this.pd5.ck8) {
          if (this.dbtableData == null || this.dbtableData.length == 0) {
            this.$message.error("代表委员及特约人员意见建议不能为空！");
            return;
          }
        }
      }
      //  if(this.filedata0.length==0){

      //  this.$message.error("工作情况报告不能为空！");return;
      // }

      // if(this.pd5.ck8 && this.addtype=='5'){
      //   if(this.dbtableData.length==0){
      //       this.$message.error("代表委员及特约人员意见建议不能为空！");return;
      //   }
      // }

      if (this.addtype == "4" || this.addtype == "5") {
        this.form.startTime = formatDate(
          new Date(this.form.startTime),
          "yyyy-MM-dd hh:mm"
        );
        this.form.endTime = formatDate(
          new Date(this.form.endTime),
          "yyyy-MM-dd hh:mm"
        );
      } else if (this.addtype != "11") {
        this.form.startTime = formatDate(
          new Date(this.form.startTime),
          "yyyy-MM-dd"
        );
        this.form.endTime = formatDate(
          new Date(this.form.endTime),
          "yyyy-MM-dd"
        );
      } else {
        this.form.contactTime = formatDate(
          new Date(this.form.contactTime),
          "yyyy-MM-dd"
        );
      }
      var yxdata = this.$store.state.yxdate;
      var flag = true;
      if (yxdata != null && yxdata != "" && yxdata != undefined) {
        var yxd = formatDate(new Date(yxdata), "yyyy-MM-dd");
        let reg = new RegExp("-", "g");
        if (this.addtype == 11) {
          flag =
            new Date(this.form.contactTime.replace(reg, "/")) >
            new Date(yxd.replace(reg, "/"));
        } else {
          flag =
            new Date(this.form.startTime.replace(reg, "/")) >
            new Date(yxd.replace(reg, "/"));
        }
      }
      if (flag) {
        if (this.fits.length == 0) {
          this.$message.error("影像资料不能为空！");
          return;
        }
      }
      if (this.addtype == "2") {
        //专题视察

        this.llgzform.inspectUnitCondition = this.ListData1;
      } else if (this.addtype == "3") {
        //调研
        this.llgzform.inspectUnitCondition = this.ListData2;
      } else if (this.addtype == "8") {
        //新闻
        //  this.llgzform.newsMediaList=this.ListData3;
        var arr = [];
        arr.push(this.pd3);

        this.llgzform.newsMediaList = arr;
      } else if (this.addtype == "9") {
        //日常接待
        //    this.llgzform.newsMediaList=this.ListData3;
        this.llgzform.receptionistList = this.ListData7;
      } else if (this.addtype == "4" || this.addtype == "5") {
        this.llgzform.actiRelCaseList = this.ListData8; //关注的案件
      }
      if (this.addtype == "7") {
        this.llgzform.courtPersons = this.ListDatazf; //走访人
      } else {
        this.llgzform.courtPersons = this.ListData5; //法院领导
      }

      this.llgzform.participantsList = this.ListData4; //代表、委员以及特约人员列表
      this.llgzform.leadershipIns = this.ListData6; //领导批示
      //人民法院各部门组织开展的特约监督员或特邀咨询员活动
      if (this.pd5.ck1) {
        this.form.isSpecialPerson = "0184000001";
      } else {
        this.form.isSpecialPerson = "0184000002";
      }
      //是否大要案
      if (this.pd5.ck6) {
        this.form.emphasisCase = "0212000001";
      } else {
        this.form.emphasisCase = "0212000002";
      }
      //组织座谈交流
      if (this.pd5.ck8) {
        this.form.organizeDiscussionExchange = "0260000001";
      } else {
        this.form.organizeDiscussionExchange = "0260000002";
      }
      if (this.addtype == "6") {
        if (this.pd5.ck9) {
          this.form.meetingDistinction = "0281000001";
        }
        if (this.pd5.ck10) {
          this.form.meetingDistinction = "0281000002";
        }
      }

      //集中专项视察
      if (this.pd5.ck2) {
        this.form.isSpecialInspection = "0151000001";
      } else {
        this.form.isSpecialInspection = "0151000002";
      }
      //结合议案建议或政协提案办理
      if (this.pd5.ck3) {
        this.form.isMeetingMotion = "0155000001";
      } else {
        this.form.isMeetingMotion = "0155000002";
      }
      //代表委员意见建议办理
      if (this.pd5.ck4) {
        this.form.isDailyMotion = "0126000001";
      } else {
        this.form.isDailyMotion = "0126000002";
      }
      //院领导参与标识
      if (this.pd5.ck5) {
        this.form.isLeadershipIn = "0208000001";
      } else {
        this.form.isLeadershipIn = "0208000002";
      }
      //代表、委员或监督员、咨询员关注案件
      if (this.pd5.ck7) {
        this.form.isFocusCase = "0125000001";
      } else {
        this.form.isFocusCase = "0125000002";
      }
      //是否建立微信群
      if (this.pd5.ck11) {
        this.form.isWeiChatGroup = "0278000002";
        var wxarr = [];
        if (this.ListDataWX && this.ListDataWX.length > 0) {
          var srr = this.ListDataWX;
          var array = this.pdmultwx;

          for (let jj = 0; jj < srr.length; jj++) {
            var ff = false;
            for (let ii = 0; ii < array.length; ii++) {
              if (srr[jj] == array[ii]) {
                ff = true;
              }
            }
            var obj = {};
            obj = srr[jj];
            if (ff) {
              obj.ingroupdistinction = "0279000002";
              wxarr.push(obj);
            } else {
              obj.ingroupdistinction = "0279000001";
              wxarr.push(obj);
            }
          }
        }
        this.llgzform.weiChatGroup = {
          weiChatGroupName: this.wxname,
          participantsList: wxarr
        };
      } else {
        this.form.isWeiChatGroup = "0278000001";
      }
      this.form.entryUnitId = this.$store.state.orgid; //录入单位
      this.form.entryDepartmentId = this.$store.state.bmid; //部门ID
      this.form.entryPerson = this.$store.state.uname;
      //    this.form.entryTime=getServerDate();
      this.llgzform.activity = this.form;

      this.llgzform.actiWorkReport = this.filedata0;
      this.llgzform.imageDataList = this.fits;
      if (this.ListData9 != [] && this.pd5.ck3) {
        this.llgzform.proposalRelActi = this.ListData9; //议案建议提案关联活动
      }
      //  if(this.ListData10!=[] && this.pd5.ck4 && this.addtype==3){
      //    this.llgzform.proposalRelActi=this.ListData10;//议案建议提案关联活动
      //  }
      if (this.ListData8 != [] && this.pd5.ck7) {
        this.llgzform.actiRelCaseList = this.ListData8; //活动关联关注案件
      }

      this.llgzform.suggestionList = this.hdyjdata; //活动意见建议

      //  this.llgzform.actiRelAdvList=this.dbtableData;
      this.$api.post(
        this.Global.aport2 + "/ActivityInfoController/saveActivityInfo",
        this.llgzform,
        r => {
          if (r.code == 1) {
            this.$message.success(r.message);

            if (this.baseid != null) {
              var arr = this.baseid.split("|");

              this.$router.push({
                name: "BaseAdd",
                query: {
                  type: arr[0],
                  status: arr[1],
                  pbid: arr[2],
                  reid: arr[3],
                  wtitle: arr[4] == "" ? "11" : arr[4]
                }
              });
            } else if (t == 1) {
              this.$router.push({
                name: "SpecialAdd",
                query: {
                  type: this.addtype,
                  year: this.qyear,
                  n: Math.random()
                }
              });
            } else {
              this.$router.push({ name: "PairList" });
            }
          } else {
            this.$message.error(r.message);
          }
        }
      );
    },

    //查询
    pdsearch(t, currentPage, showCount, pd) {
      if (t == 3) {
        this.pd8.token = this.$store.state.token;
        this.$api.post(
          this.Global.aport2 +
            "/CaseRegisterController/queryFocusCaseNumAndCaseReason",
          this.pd8,
          r => {
            this.pdData2 = r.data;
          }
        );
      } else if (t == 1) {
        if (
          this.pd6.year == null ||
          this.pd6.year == undefined ||
          this.pd6.year == ""
        ) {
          this.$message.error("年份不能为空!");
          return;
        }
        let p = {
          pd: pd,
          pageInfo: {
            pageNumber: currentPage,
            pageSize: showCount
          },
          token: this.$store.state.token
        };
        this.$api.post(
          this.Global.aport2 + "/proposalHome/queryToActivity",
          p,
          r => {
            if (r.code == 1) {
              this.pdData1 = r.data.basicCondition;
              this.TotalResult1 = r.data.pageInfo.total;
            }
          }
        );
      } else if (t == 2) {
        if (
          this.pd10.year == null ||
          this.pd10.year == undefined ||
          this.pd10.year == ""
        ) {
          this.$message.error("年份不能为空!");
          return;
        }
        this.pd10.proposalType = "0204000005";
        let p = {
          pd: pd,
          pageInfo: {
            pageNumber: currentPage,
            pageSize: showCount
          },
          token: this.$store.state.token
        };
        this.$api.post(
          this.Global.aport2 + "/proposalHome/queryToActivity",
          p,
          r => {
            if (r.code == 1) {
              this.pdData3 = r.data.basicCondition;
              this.TotalResult2 = r.data.pageInfo.total;
            }
          }
        );
      }
    },

    getImgV(n) {
      var array = this.$store.state.imgformat.split(",");
      for (let i = 0; i < array.length; i++) {
        if (n.toLowerCase() == array[i]) {
          return true;
        }
      }
      return false;
    },
    chChange(val, t) {
      if (val == "" || val == undefined || val == null) {
        if (t == 3) {
          this.fyquery();
        }
        return;
      }

      switch (t) {
        case 1:
          var obj = {};
          obj = this.scdwdata.find(item => {
            return item.orgid === val;
          });
          this.pd1.inspectOrg = obj.mc;
          break;
        case 2:
          var obj = {};
          obj = this.$store.state.scfl.find(item => {
            return item.dm === val;
          });
          this.pd1.inspectType = obj.mc;
          break;
        case 3:
          var obj = {};
          obj = this.fydwdata.find(item => {
            return item.orgid === val;
          });
          this.pd2.inspectOrg = obj.mc;
          break;
        case 4:
          var obj = {};
          obj = this.$store.state.scfl.find(item => {
            return item.dm === val;
          });
          this.pd2.inspectType = obj.mc;
          break;
        case 5:
          var obj = {};
          obj = this.$store.state.xwdwfl.find(item => {
            return item.dm === val;
          });
          this.pd3.newsMediaTypes = obj.mc;
          break;
        case 6:
          var obj = {};
          obj = this.jdrdata.find(item => {
            return item.pbId === val;
          });
          this.pd7.receptionistinfo = obj;
          break;
        case 7:
          var obj = {};
          obj = this.$store.state.zfxwjb.find(item => {
            return item.dm === val;
          });
          this.pd3.farWordMediaLevels = obj.mc;
          break;
        default:
          break;
      }
    },
    getCheck(t) {
      if (t == 1) {
        this.pd5.ck4 = false;
      } else if (t == 2) {
        this.pd5.ck3 = false;
      }
    },
    //录入法院
    getLRFY() {
      let p = {
        mc: "",
        orgid: this.$store.state.orgid
      };
      this.$api.post(this.Global.aport1 + "/org/getEntryCourt", p, r => {
        if (r.code == 1) {
          this.lrdata = r.data;
        }
      });
    },

    //法院单位
    getFY(callback, val) {
      if (callback) {
        let p = {
          orgid: val
        };
        this.$api.post(this.Global.aport1 + "/org/getOrgName", p, r => {
          if (r.code == 1) {
            this.fydwdata = r.data;
            //  if(val){
            //    var arr = this.fydwload.filter(item=>{
            //         return item.orgid.indexOf(val) + 1
            //       });
            //    this.fydwdata=arr;
            //  }else{
            //      this.fyquery();
            //  }
          }
        });
      }
    },
    // fyquery(){
    //      if(this.fydwload.length>this.jznum){
    //         this.fydwdata=this.fydwload.slice(0,this.jznum);
    //          }else{
    //          this.fydwdata=this.fydwload;
    //       }
    // },
    //法院单位远程搜索
    fydwremoteMethod(quer) {
      if (quer != "") {
        let p = {
          name: quer
        };
        this.$api.get(this.Global.aport1 + "/org/getCourtOrg", p, r => {
          if (r.code == 1) {
            this.fydwload = r.data;
            if (this.fydwload.length > this.jznum) {
              this.bs = 0;
              this.fydwdata = this.fydwload.slice(0, this.jznum);
            } else {
              this.bs = 1;
              this.fydwdata = this.fydwload;
            }
          }
        });
      } else {
        this.fydwdata = [];
      }
    },
    //法院单位加载
    fyloadmore() {
      if (this.bs == 1) {
        return;
      }
      var srr = this.fydwload;
      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.fydwdata = srr.filter((item, index, arr) => {
        return index < num;
      });
    },

    //视察单位
    getSCDW(callback) {
      if (callback && this.scdwload.length == 0) {
        this.$api.post(this.Global.aport1 + "/org/getVisitOrg", {}, r => {
          if (r.code == 1) {
            this.scdwload = r.data;
            this.scquery();
          }
        });
      }
    },
    scquery() {
      if (this.scdwload.length > this.jznum) {
        this.scdwdata = this.scdwload.slice(0, this.jznum);
      } else {
        this.scdwdata = this.scdwload;
      }
    },
    //视察单位远程搜索
    scdwremoteMethod(quer) {
      if (quer != "") {
        let p = {
          mc: quer
        };
        this.$api.post(this.Global.aport1 + "/org/getVisitOrg", p, r => {
          if (r.code == 1) {
            this.scdwload = r.data;
            if (this.scdwload.length > this.jznum) {
              this.bs = 0;
              this.scdwdata = this.scdwload.slice(0, this.jznum);
            } else {
              this.bs = 1;
              this.scdwdata = this.scdwload;
            }
          }
        });
      } else {
        this.scdwdata = [];
      }
    },
    //视察单位加载
    scloadmore() {
      if (this.bs == 1) {
        return;
      }
      var srr = this.scdwload;

      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.scdwdata = srr.filter((item, index, arr) => {
        return index < num;
      });
    },
    //开展单位
    getKZDW(val) {
      let p = {
        orgid: val
      };
      this.$api.post(this.Global.aport1 + "/org/getOrgName", p, r => {
        if (r.code == 1) {
          this.kzdwdata = r.data;

          //  if(val){
          //        var arr = this.kzdwload.filter(item=>{
          //         return item.orgid.indexOf(val) + 1
          //       });
          //       this.kzdwdata=arr;
          //  }else{
          //      this.kzquery();
          //  }
        }
      });
    },
    // kzquery(){
    //    if(this.kzdwload.length>this.jznum){
    //         this.kzdwdata=this.kzdwload.slice(0,this.jznum);
    //       }else{
    //         this.kzdwdata=this.kzdwload;
    //     }
    // },
    //开展单位远程搜索
    kzdwremoteMethod(quer) {
      if (quer != "") {
        let p = {
          mc: quer
        };
        this.$api.post(this.Global.aport1 + "/org/getDevelopOrg", p, r => {
          if (r.code == 1) {
            this.kzdwdata = r.data;
            if (this.kzdwdata.length > this.jznum) {
              this.bs = 0;
              this.kzdwdata = this.kzdwdata.slice(0, this.jznum);
            } else {
              this.bs = 1;
              this.kzdwdata = this.kzdwdata;
            }
          }
        });
      } else {
        this.kzdwdata = [];
      }
    },
    //开展单位加载
    kzloadmore() {
      if (this.bs == 1) {
        return;
      }
      var srr = this.kzdwload;
      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.kzdwdata = srr.filter((item, index, arr) => {
        return index < num;
      });
    },

    //承办单位  如果没有下级部门，那么该处就是承办部门
    getCBDW() {
      let p = {
        orgId: this.$store.state.orgid
      };
      this.$api.get(this.Global.aport1 + "/org/getUndertakeOrg", p, r => {
        if (r.code == 1) {
          this.cbdwdata = r.data;
        }
      });
    },
    //法院部门  承办部门
    getcbbm(orgid, t, m) {
      if (orgid == "" || orgid == null || orgid == undefined) {
        if (t == 0) {
          this.kzdwdata = this.kzdwload.slice(0, this.jznum);
          this.$set(this.form, "devDepartmentId", "");
          this.fybmdata = [];
        } else if (t == 2) {
          this.fyquery();
          this.$set(this.form, "undertakeDepartmentId", "");
          this.fybmdata2 = [];
        } else if (t == 3) {
          this.fyquery();
          this.$set(this.form, "receptionDepartmentId", "");
          this.$set(this.pd7, "receptionistid", "");
          this.fybmdata3 = [];
        } else if (t == 4) {
          this.fyquery();
          this.$set(this.ssxx, "subOrgId", "");
          this.fybmdata4 = [];
        }
        return;
      } else if (orgid && t == 4) {
        orgid = orgid.split("|")[0];
      }
      let p = {
        orgId: orgid == null ? this.$store.state.orgId : orgid
      };
      this.$api.get(this.Global.aport1 + "/org/getSubOrg", p, r => {
        if (r.code == 1) {
          switch (t) {
            case 0:
              if (m == null) {
                this.$set(this.form, "devDepartmentId", "");
              }
              this.fybmdata = r.data;
              break;
            case 1:
              if (m == null) {
                this.form.undertakeDepartmentId = "";
              }
              this.fybmdata1 = r.data;
              break;
            case 2:
              if (m == null) {
                this.form.undertakeDepartmentId = "";
              }
              this.fybmdata2 = r.data;
              break;
            case 3:
              if (m == null) {
                this.form.receptionDepartmentId = "";
              }

              this.fybmdata3 = r.data;
              break;
            case 4:
              if (m == null) {
                this.$set(this.ssxx, "subOrgId", "");
              }
              this.fybmdata4 = r.data;
              break;
            default:
              break;
          }
        }
      });
    },
    getkzbm(orgid, t) {
      if (orgid == "" || orgid == null || orgid == undefined) {
        //this.kzquery();
        this.kzdwdata = [];
        this.$set(this.form, "devDepartmentId", "");
        this.fybmdata = [];
        return;
      }
      let p = {
        orgId: orgid
      };
      this.$api.get(this.Global.aport1 + "/org/getSubDept", p, r => {
        if (r.code == 1) {
          if (t != 0) {
            this.$set(this.form, "devDepartmentId", "");
          }
          this.fybmdata = r.data;
        }
      });
    },
    getJDR(orgid, subid) {
      let p = {
        orgId: orgid,
        subOrgId: subid
      };
      this.$api.post(this.Global.aport1 + "/courtPerson/queryByOrg", p, r => {
        if (r.code == 1) {
          this.jdrdata = r.data;
        }
      });
    },
    //意见建议添修改查看
    getyj(t) {
      if (t != 0) {
        if (this.pdmult4.length == 0) {
          this.$message.error("请选择一条数据！");
          return;
        } else if (this.pdmult4.length > 1) {
          this.$message.error("只能选择一条数据！");
          return;
        }
      } else {
        if (this.ListData4.length == 0) {
          this.$message.error("请先选择代表、委员以及特约人员！");
          return;
        }
      }
      this.yjdata = this.tempdata;
      this.yjsDialogVisible = true;
    },
    yjsfatherMethod(type, data) {
      if (type == "99") {
        this.yjsDialogVisible = false;
      } else {
        if (data && data.length > 0) {
          this.hdyjdata = [];
          this.tempdata = [];
          this.tempdata = data;
          var array = data;
          for (let i = 0; i < array.length; i++) {
            var arr = array[i].yjlistdata;
            if (arr && arr.length > 0) {
              for (let j = 0; j < arr.length; j++) {
                var object = {};
                object.participantsInfoId = array[i].leaderPerson;
                object.participantsInfoName = array[i].leaderPersonName;
                object.overallAssessment = array[i].overallAssessment;
                object.feedBackStatus = array[i].feedBackStatus;
                object.feedBackTime = array[i].feedBackTime;
                object.sort = arr[j].sort;
                object.remark = array[i].remark;
                object.contents = arr[j].contents;
                this.hdyjdata.push(object);
              }
            } else {
              var object = {};
              object.participantsInfoId = array[i].leaderPerson;
              object.participantsInfoName = array[i].leaderPersonName;
              object.overallAssessment = array[i].overallAssessment;
              object.feedBackStatus = array[i].feedBackStatus;
              object.feedBackTime = array[i].feedBackTime;
              object.remark = array[i].remark;
              this.hdyjdata.push(object);
            }
          }

          const res = new Map();
          var srr = this.hdyjdata;
          this.dbtableData = srr.filter(
            srr =>
              !res.has(srr.participantsInfoId) &&
              res.set(srr.participantsInfoId, 1)
          );
        }

        // console.log('this.hdyjdata多条数据',this.hdyjdata);
        // console.log('this.tempdata临时数据',this.tempdata);
        // console.log('this.dbtableData显示数据',this.dbtableData);

        this.yjsDialogVisible = false;
      }
    },
    suggfatherMethod(type, data) {
      if (type == "99") {
        this.suggDialogVisible = false;
      } else {
        if (this.ListData9 && this.ListData9.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.ListData9.push(data[i]);
          }
        } else {
          this.ListData9 = data;
        }

        this.suggDialogVisible = false;
      }
    },
    casefatherMethod(type, data) {
      if (type == "99") {
        this.caseDialogVisible = false;
      } else {
        if (this.ListData8 && this.ListData8.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.ListData8.push(data[i]);
          }
        } else {
          this.ListData8 = data;
        }

        this.caseDialogVisible = false;
      }
    },
    getwx() {
      if (this.ListData4 && this.ListData4.length > 0) {
        this.ListDataWX = this.ListData4;
        this.$nextTick(function() {
          for (let i = 0; i < this.ListDataWX.length; i++) {
            if (this.pd5.ck11) {
              this.$refs.mlTable.toggleRowSelection(this.ListDataWX[i], true);
            }
          }
        });
      } else {
        this.$message.error("请先选择代表、委员以及特约人员！");
        this.$set(this.pd5, "ck11", false);
        return;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.feedBackStatus == "已答复") {
        return "flag-row";
      }
      return "";
    },
    getNullVlaue(val, t) {
      // 代表、委员以及特约人员
      if (t == 1) {
        if (!val) {
          this.xmdata = [];
        }
      } else if (t == 2) {
        if (!val) {
          // this.fyrquery();
          this.fydata = [];
        }
      }
    },
    selectInit(row, index) {
      return !this.llbnt;
    },
    //时间联动
    changedate(t, m) {
      if (t) {
        var year = formatDate(new Date(t), "yyyy-MM-dd").substr(0, 4);
        if (parseInt(year) < 2020) {
          this.ztpjshow = true;
        } else {
          this.ztpjshow = false;
        }

        if (m) {
          this.$set(this.form, "endTime", t);
        }
      }
    },
    getfocus(t) {
      switch (t) {
        case 1:
          this.fydata = [];
          break;
        case 2:
          this.kzdwdata = [];
          break;
        case 3:
          this.fydwdata = [];
          break;
        case 4:
          this.scdwdata = [];
          break;
        case 5:
          this.xmdata = [];
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
.textp {
  width: 40% !important;
}
.textn {
  width: 30% !important;
}
.texts {
  width: 10.3% !important;
  vertical-align: top;
}
.textw {
  width: 10% !important;
}
.textd {
  width: 10.5% !important;
}
.textdt {
  width: 9.2% !important;
  padding: 0px 10px;
}
.inputw {
  width: 89% !important;
}
.inputs {
  width: 67% !important;
}
.inputp {
  width: 50% !important;
}
.txttop {
  vertical-align: top;
}
.border {
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  margin-top: 10px;
}
.ts {
  font-size: 12px;
  color: red;
}
.block .close {
  display: block;
  position: absolute;
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
  z-index: 999;
  margin-top: -185px;
  margin-left: 170px;
}
.input-item1 {
  display: flex;
}
</style>
