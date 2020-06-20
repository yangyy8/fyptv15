
<template>
  <div class="pairadd indexList">
    <div class="homebread">
      <i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
      <span>
        联络工作
        <span class="mlr_10">/</span>
        <b>{{cname}}</b>
      </span>
    </div>
    <div class="content subtable">
      <div class="ptitle mb-20">{{cinfo}}</div>
      <div class="pborder">
        <el-row class="lh" :gutter="2">
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">时间</span>
            <div class="yy-input-input t-flex">
              <el-date-picker
                v-model="pd.startTime"
                format="yyyy-MM-dd"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="开始时间"
              ></el-date-picker>
              <span class="septum">-</span>
              <el-date-picker
                v-model="pd.endTime"
                format="yyyy-MM-dd"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="结束时间"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">活动方式</span>
            <el-select
              v-model="pd.activityModeArr"
              multiple
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in $store.state.hdfs"
                :key="ind"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">活动类型</span>
            <el-select
              v-model="pd.activityTypeArr"
              multiple
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in $store.state.hdlx"
                :key="ind"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="24" :lg="24" class="input-item">
            <span class="yy-input-text" style="width:9%!important;">主题</span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="pd.theme"
              class="yy-input-input"
              style="width:86.8%!important;"
            ></el-input>
          </el-col>
          <el-col :sm="24" :md="24" :lg="24" class="input-item">
            <span class="yy-input-text" style="width:9%!important;">地点</span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="pd.location"
              class="yy-input-input"
              style="width:86.8%!important;"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="lh" v-if="open">
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">结对法院领导</span>

            <el-select
              v-model="pd.courtInsiderIdArr"
              @focus="getfocus(1)"
              remote
              :remote-method="jdrdwremoteMethodnew"
              v-el-select-loadmore="jdrloadmorenew"
              multiple
              clearable
              allow-create
              filterable
              default-first-option
              placeholder="请输入关键字搜索"
              size="small"
              class="yy-input-input"
            >
              <el-option
                v-for="(item,ind) in cdrdata"
                :key="ind"
                :label="item.fullName"
                :value="item.courtPersonId"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="16" class="input-item">
            <span
              class="yy-input-text"
              style="width:18.5%!important"
              title="代表、委员以及特约人员"
            >代表、委员以及特约人员</span>
            <el-select
              v-model="pd.courtOutsiderIdArr"
              @focus="getfocus(5)"
              remote
              :remote-method="xmdwremoteMethod"
              v-el-select-loadmore="xmloadmore"
              popper-class="select-popper"
              :popper-append-to-body="false"
              multiple
              clearable
              filterable
              default-first-option
              placeholder="请输入关键字搜索"
              size="small"
              class="yy-input-input"
              style="width:75%!important"
            >
              <el-option
                v-for="(item,ind) in xmdata"
                :key="ind"
                :label="item.fullName"
                :value="item.personId"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">法院院领导</span>
            <!-- <el-select v-model="pd.courtPersonIdArr"  remote :remote-method="fyrdwremoteMethod" v-el-select-loadmore="fyrloadmore" @visible-change="getFYName($event)" multiple clearable  filterable  default-first-option placeholder="请选择"  size="small" class="yy-input-input">
                         <el-option
                          v-for="(item,ind) in fydata"
                          :key="ind"
                          :label="item.fullName"
                          :value="item.courtPersonId">
                         </el-option>
            </el-select>-->
            <el-select
              v-model="pd.courtPersonIdArr"
              @focus="getfocus(2)"
              remote
              :remote-method="fyrdwremoteMethodnew"
              v-el-select-loadmore="fyrloadmorenew"
              multiple
              filterable
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
                :value="item.courtPersonId"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">开展单位</span>
            <el-select
              v-model="pd.developmentUnitId"
              @focus="getfocus(4,pd.developmentUnitId)"
              remote
              :remote-method="kzdwremoteMethodnew"
              v-el-select-loadmore="kzloadmorenew"
              @change="getcbbm(pd.developmentUnitId,0)"
              filterable
              clearable
              allow-create
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
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">是否包括下级单位</span>
            <div class="yy-input-input">

            <el-radio v-model="pd.isEntrSubOrg" label="1">是</el-radio>
            <el-radio v-model="pd.isEntrSubOrg" label="0">否</el-radio>
            </div>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">开展部门</span>
            <el-select
              v-model="pd.devDepartmentId"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
              :no-data-text="pd.developmentUnitId?'无数据':'请先选择开展单位'"
            >
              <el-option
                v-for="(item,ind) in fybmdata"
                :key="ind"
                :label="item.mc"
                :value="item.orgid"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">批示领导</span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="pd.instructorName"
              class="yy-input-input"
            ></el-input>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">批示单位</span>
            <el-input
              placeholder="请输入内容"
              size="small"
              clearable
              v-model="pd.instructionUnit"
              class="yy-input-input"
            ></el-input>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">批示时间</span>
            <div class="yy-input-input t-flex t-date">
              <el-date-picker
                v-model="pd.instructionStartTime"
                format="yyyy-MM-dd"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="开始时间"
              ></el-date-picker>
              <span class="septum">-</span>
              <el-date-picker
                v-model="pd.instructionEndTime"
                format="yyyy-MM-dd"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="结束时间"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">录入单位</span>
            <el-select
              v-model="pd.entryUnitId"
              @focus="getfocus(3,pd.entryUnitId)"
              remote
              :remote-method="fydwremoteMethodnew"
              v-el-select-loadmore="fyloadmorenew"
              @change="getcbbm(pd.entryUnitId,1)"
              filterable
              allow-create
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
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">录入部门</span>
            <el-select
              v-model="pd.entryDepartmentId"
              filterable
              clearable
              default-first-option
              placeholder="请选择"
              size="small"
              class="yy-input-input"
              :no-data-text="pd.entryUnitId?'无数据':'请先选择录入单位'"
            >
              <el-option
                v-for="(item,ind) in fybmdata1"
                :key="ind"
                :label="item.mc"
                :value="item.orgid"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="yy-input-text">录入时间</span>
            <div class="yy-input-input t-flex t-date">
              <el-date-picker
                v-model="pd.entryStartTime"
                format="yyyy-MM-dd"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="开始时间"
              ></el-date-picker>
              <span class="septum">-</span>
              <el-date-picker
                v-model="pd.entryEndTime"
                format="yyyy-MM-dd"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="结束时间"
              ></el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="footer">
        <el-button
          type="primary"
          style="width:130px;"
          v-if="querybnt"
          @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)"
        >查 询</el-button>
        <el-button type="primary" style="width:130px;" v-else :disabled="true">查询中</el-button>
        <el-button style="width:130px;" @click="reset()">重 置</el-button>
      </div>
      <div class="loadmore" v-if="all" @click="getAll(1)">
        全部展开
        <i class="el-icon-arrow-down"></i>
      </div>
      <div class="loadmore" v-else @click="getAll(2)">
        部分收起
        <i class="el-icon-arrow-up"></i>
      </div>
      <div class="pairleft">
        <div class="anseacrch">
          <el-checkbox-group v-model="checkedList" @change="changeList()">
            <el-checkbox
              v-for="item in checkItem"
              :label="item.code"
              :key="item.code"
              :checked="item.checked"
              :disabled="item.checked"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

      <div class="pborder mt-20">
        <el-row>
          <el-col :span="20" class="ah-40">
            <el-button type="primary" size="small" @click="add('0')" v-if="allshow[0]">添加</el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="bnt"
              @click="getCK('9')"
              v-if="allshow[1]"
            >查看</el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="bnt"
              @click="getCK('1')"
              v-if="allshow[2]"
            >修改</el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="bnt"
              @click="delpair"
              v-if="allshow[3]"
            >删除</el-button>
            <el-button type="primary" size="small" @click="imports" v-if="allshow[4]">导入</el-button>
            <el-button type="primary" size="small" @click="download(0)" v-if="allshow[5]">下载全部</el-button>
            <el-button type="primary" size="small" @click="download(1)" v-if="allshow[6]">下载当页</el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="bnt"
              @click="getopen(1)"
              v-if="allshow[7]"
            >公开</el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="bnt"
              @click="getopen(2)"
              v-if="allshow[8]"
            >审核</el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="bnt"
              @click="getopen(3)"
              v-if="allshow[9]"
            >发布</el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="bnt"
              @click="getopen(4)"
              v-if="allshow[10]"
            >回收</el-button>&nbsp;
          </el-col>
          <el-col :span="4" class="trt">
            {{sname}}总数
            <b class="sumfont">{{this.TotalResult}}</b> 件
          </el-col>
        </el-row>
        <el-table
          ref="multipleTable"
          :data="tableData"
          @row-click="clickRow"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号">
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
            :label="val.label"
          ></el-table-column>
        </el-table>
        <div class="middle-foot">
          <div class="page-msg">
            <div class>共{{TotalResult}}条记录</div>
            <div class>
              每页显示
              <el-select
                v-model="pageSize"
                @change="pageSizeChange(pageSize)"
                placeholder="10"
                size="mini"
                class="page-select"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>条
            </div>
            <div class>共{{Math.ceil(TotalResult/pageSize)}}页</div>
          </div>
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="CurrentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="TotalResult"
          ></el-pagination>
        </div>
      </div>
      <br />
    </div>
    <el-dialog
      title="选择类型"
      :visible.sync="addDialogVisible"
      :close-on-click-modal="false"
      width="700px"
    >
      <el-row style="line-height:50px;">
        <el-col :span="6">
          <el-radio v-model="addtype" label="1" border>结对活动</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="addtype" label="2" border>专项视察</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="addtype" label="3" border>专题调研</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="addtype" label="4" border>旁听庭审</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="addtype" label="5" border>见证执行</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="addtype" label="6" border>会议座谈</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="addtype" label="7" border>走访</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="addtype" label="8" border>新闻宣传</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="addtype" label="9" border>接待来访</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="addtype" label="11" border>日常沟通</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="addtype" label="10" border>其他</el-radio>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="goadd()">提交</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="导入文件"
      :visible.sync="uploadDialogVisible"
      :close-on-click-modal="false"
      width="640px"
    >
      <UPLOAD
        :url="uurl"
        :type="99"
        :urlErr="urlErr"
        :drlx="1"
        @fatherMethod="fatherMethod"
        :random="new Date().getTime()"
      ></UPLOAD>
    </el-dialog>
    <el-dialog
      title="公开"
      :visible.sync="openDialogVisible"
      :close-on-click-modal="false"
      width="660px"
    >
      <OPEN
        :url="openurl"
        :type="0"
        :data="opendata"
        @GKfatherMethod="GKfatherMethod"
        :random="new Date().getTime()"
      ></OPEN>
    </el-dialog>
    <el-dialog
      :title="txtname"
      :visible.sync="shDialogVisible"
      :close-on-click-modal="false"
      width="660px"
    >
      <EXAMINE
        :url="shurl"
        :type="sendtype"
        :data="opendata"
        @SHfatherMethod="SHfatherMethod"
        :random="new Date().getTime()"
      ></EXAMINE>
    </el-dialog>

    <el-dialog
      title="内容发布"
      :visible.sync="fbDialogVisible"
      :close-on-click-modal="false"
      width="880px"
    >
      <RELEASE
        :url="fburl"
        :type="0"
        :data="opendata"
        @FBfatherMethod="FBfatherMethod"
        :random="new Date().getTime()"
      ></RELEASE>
    </el-dialog>
  </div>
</template>
<script>
import { format } from "@/assets/js/date.js";
import UPLOAD from "../../Common/upload";
import { sortByKey } from "@/assets/js/ToArray.js";
import OPEN from "../../Common/opencontent";
import EXAMINE from "../../Common/examinecontent";
import RELEASE from "../../Common/releasecontent";
export default {
  components: { UPLOAD, OPEN, EXAMINE, RELEASE },
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
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {},
      options: this.pl.ps,
      open: false,
      all: true,
      bnt: true,
      checkedList: [],
      addtype: "1",
      cname: "活动高级查询",
      cinfo: "活动信息",
      uurl: "/ActivityInfoController/importActivityInfo",
      urlErr: "",
      openurl: "/contentPublic/openContent",
      shurl: "/contentPublic/auditContent",
      fburl: "/contentPublic/releaseContent",
      uploadDialogVisible: false,
      addDialogVisible: false,
      tableData: [],
      configHeader: [],
      checkItemReal: [],
      cc: true,
      multipleSelection: [],
      xmdata: [],
      checkItem: [],
      fydwdata: [],
      fybmdata: [],
      status: "",
      sname: "联络工作",
      snames: "联络工作",
      cdrdata: [],
      fydata: [],
      fybmdata1: [],
      openDialogVisible: false,
      shDialogVisible: false,
      fbDialogVisible: false,
      opendata: [], //需要传的对象
      txtname: "审核",
      sendtype: "0", //审核
      alldata: [
        "23133605",
        "23133608",
        "23133606",
        "23133607",
        "23133609",
        "23133610",
        "23133611",
        "23133612",
        "23133613",
        "23133614",
        "23133615"
      ],
      //0录入,1查看,2修改,3删除,4导入,5下载全部,6下载当页,
      //7公开,8审核,9发布,10回收
      allshow: [],
      kzdwdata: [],
      xmload: [],
      fyload: [],
      kzdwload: [],
      jznum: 50, //下载加载多少条
      formData: {
        //下拉参数
        pageIndex: 1,
        pageSize: 20
      },
      fydwload: [],
      bs: 0,
      querybnt: true
    };
  },
  mounted() {
    // this.changeList();
    this.$store.dispatch("getHdfs");
    this.$store.dispatch("getHdlx");
    this.getinit(this.$router);
  },
  watch: {
    $router: function(val) {
      this.getinit(val);
    }
  },
  methods: {
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    getXQ() {
      //权限start
      this.$api.post(this.Global.menuurl, { menuId: "12242313" }, r => {
        if (r.code == 1 && r.data != null) {
          for (let i = 0; i < this.alldata.length; i++) {
            this.allshow[i] = this.global_auth(r.data, this.alldata[i]);
          }
        } else if (r.code == 0) {
          this.$router.push({ path: "/limitmsg" });
        }
      });
      //权限end
    },
    getinit(val) {
      this.tableData = [];
      this.xmload = [];
      this.fyload = [];
      this.getXQ();
      this.getCheckList();
      this.getList(this.CurrentPage, this.pageSize, this.pd);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0) {
        this.bnt = false;
      } else {
        this.bnt = true;
      }
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getList(this.CurrentPage, val, this.pd);
    },
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.getList(val, this.pageSize, this.pd);
    },
    add(t) {
      this.status = t;
      this.addDialogVisible = true;
    },
    getCK(t) {
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一条数据!");
        return;
      } else if (this.multipleSelection.length == 0) {
        this.$message.error("请选择一条数据!");
        return;
      }
      var array = this.multipleSelection[0].activityTypeId;
      var types = "";
      switch (array) {
        case "0149000001": //结对活动
          types = "1";
          break;
        case "0149000002": //专项视察
          types = "2";
          break;
        case "0149000003": //专题调研
          types = "3";
          break;
        case "0149000004": //旁听庭审
          types = "4";
          break;
        case "0149000005": //见证执行
          types = "5";
          break;
        case "0149000006": //会议座谈
          types = "6";
          break;
        case "0149000007": //日常走访
          types = "7";
          break;
        case "0149000009": //新闻宣传
          types = "8";
          break;
        case "0149000008": //日常接待
          types = "9";
          break;
        case "0149000011": //其他
          types = "10";
          break;
        case "0149000010": //日常沟通
          types = "11";
          break;
        default:
          break;
      }

      if (types == "1") {
        this.$router.push({
          name: "PairAdd",
          query: {
            type: types,
            state: t,
            activityInfoId: this.multipleSelection[0].activityInfoId
          }
        });
      } else {
        this.$router.push({
          name: "SpecialAdd",
          query: {
            type: types,
            state: t,
            activityInfoId: this.multipleSelection[0].activityInfoId
          }
        });
      }
    },
    goadd() {
      this.addDialogVisible = false;

      if (this.addtype == 1) {
        this.$router.push({
          name: "PairAdd",
          query: { type: this.addtype, state: this.status }
        });
      } else {
        this.$router.push({
          name: "SpecialAdd",
          query: { type: this.addtype, state: this.status }
        });
      }
    },
    reset() {
      this.pd = {};
    },
    getAll(n) {
      if (n == 1) {
        this.open = true;
        this.all = false;
      } else {
        this.open = false;
        this.all = true;
      }
    },
    getCheckList() {
      let p = {
        type: "0246000010",
        activityType: this.pd.activityType
      };
      this.$api.post(
        this.Global.aport2 + "/ActivityInfoController/getCaseListInfo",
        p,
        r => {
          if (r.code == 1) {
            this.checkItem = r.data;
            this.configHeader = [];
            for (var j = 0; j < this.checkItem.length; j++) {
              if (this.checkItem[j].checked)
                this.configHeader.push(this.checkItem[j]);
            }
            if (this.configHeader.length == 0) {
              this.cc = false;
            } else {
              this.cc = true;
            }
          }
        }
      );
    },
    changeList() {
      this.configHeader = [];

      for (var i = 0; i < this.checkedList.length; i++) {
        for (var j = 0; j < this.checkItem.length; j++) {
          if (this.checkedList[i] == this.checkItem[j].code) {
            this.configHeader.push(this.checkItem[j]);
          }
        }
      }

      if (this.configHeader.length == 0) {
        this.cc = false;
      } else {
        this.cc = true;
      }
      this.configHeader = sortByKey(this.configHeader, "sort");
    },
    getList(currentPage, showCount, pd) {
      this.sname = "联络工作";
      this.tableData = [];
      this.querybnt = false;
      //this.getCheckList();
      //this.changeList();
      //this.getJDXXAB();
      let p = {
        pd: this.pd,
        pageInfo: {
          pageNumber: currentPage,
          pageSize: showCount
        }
      };
      this.$api.post(
        this.Global.aport2 + "/ActivityInfoController/queryActivityInfo",
        p,
        r => {
          if (r.code == 1) {
            this.tableData = r.data.activityInfoVOList;
            this.TotalResult = r.data.pageInfo.total;
          } else {
            this.tableData = [];
            this.TotalResult = 0;
            //this.$message.error(r.message);
          }
          this.querybnt = true;
          // this.sname=this.snames;
        }
      );
    },
    delpair() {
      if (this.multipleSelection.length > 0) {
        this.$confirm("此操作将删除该信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var arr = [];

            for (let i = 0; i < this.multipleSelection.length; i++) {
              var obj = {};
              obj.activityInfoId = this.multipleSelection[i].activityInfoId;
              arr.push(obj);
            }
            let p = {
              activityInfoIdList: arr
            };
            this.$api.post(
              this.Global.aport2 + "/ActivityInfoController/deleteActivityInfo",
              p,
              r => {
                if (r.code == 1) {
                  this.$message.success("删除成功！");
                  this.getList(this.CurrentPage, this.pageSize, this.pd);
                } else {
                  this.$message.success(r.message);
                }
              }
            );
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      } else {
        this.$message.error("请选择数据！");
      }
    },
    download(t) {
      let p = {};
      this.pd.showColumns = this.configHeader;
      if (t == 0) {
        if (this.multipleSelection.length == 0) {
          //全部导出
          p = {
            pd: this.pd
            // "showColumns":this.configHeader,
          };
        }
      } else if (t == 1) {
        p = {
          pd: this.pd,
          pageInfo: {
            pageNumber: this.CurrentPage,
            pageSize: this.pageSize
          }
          // "showColumns":this.configHeader,
        };
      }

      this.$api.post(
        this.Global.aport2 + "/ActivityInfoController/exportActivityInfo",
        p,
        r => {
          this.downloadM(r);
        },
        e => {},
        {},
        "blob"
      );
    },
    downloadM(data) {
      if (!data) {
        return;
      }
      var name = "联络工作列表" + format(new Date(), "yyyyMMddhhmmss") + ".xls";

      let url = window.URL.createObjectURL(
        new Blob([data], { type: "application/xls" })
      );

      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;

      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
    },

    imports() {
      this.uploadDialogVisible = true;
    },
    fatherMethod() {
      this.uploadDialogVisible = false;
      this.getList(this.CurrentPage, this.pageSize, this.pd);
    },

    //法院单位
    getFY() {
      if (this.fydwload.length == 0) {
        let p = {
          name: ""
        };
        this.$api.get(this.Global.aport1 + "/org/getCourtOrg", null, r => {
          if (r.code == 1) {
            this.fydwload = r.data;
            this.fyquery();
          }
        });
      }
    },
    fyquery() {
      if (this.fydwload.length > this.jznum) {
        this.fydwdata = this.fydwload.slice(0, this.jznum);
      } else {
        this.fydwdata = this.fydwload;
      }
    },
    //法院单位远程搜索
    fydwremoteMethod(quer) {
      if (quer !== "" || this.fydwdata.length <= 0) {
        var arr = this.fydwload.filter(item => {
          return item.mc.indexOf(quer) + 1;
        });

        if (arr.length > this.jznum) {
          this.fydwdata = arr.slice(0, this.jznum);
        } else {
          this.fydwdata = arr;
        }
      }
    },
    //法院单位加载
    fyloadmore() {
      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.fydwdata = this.fydwload.filter((item, index, arr) => {
        return index < num;
      });
    },

    //法院单位远程搜索
    fydwremoteMethodnew(quer) {
      if (quer != "") {
        this.formData = [];
        let p = {
          name: quer
        };
        this.$api.get(this.Global.aport1 + "/org/getCourtOrg", p, r => {
          if (r.code == 1) {
            this.fydwload = r.data;
            if (this.fydwload.length > this.jznum) {
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
    fyloadmorenew() {
      if (this.bs == 1) {
        return;
      }
      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.fydwdata = this.fydwload.filter((item, index, arr) => {
        return index < num;
      });
    },
    //开展单位
    getKZDW() {
      if (this.kzdwload.length == 0) {
        this.$api.post(this.Global.aport1 + "/org/getDevelopOrg", {}, r => {
          if (r.code == 1) {
            this.kzdwload = r.data;
            if (this.kzdwload.length > this.jznum) {
              this.kzdwdata = this.kzdwload.slice(0, this.jznum);
            } else {
              this.kzdwdata = this.kzdwload;
            }
          }
        });
      }
    },
    //开展单位远程搜索
    kzdwremoteMethod(quer) {
      if (quer !== "" || this.kzdwdata.length <= 0) {
        var arr = this.kzdwload.filter(item => {
          return item.mc.indexOf(quer) + 1;
        });

        if (arr.length > this.jznum) {
          this.kzdwdata = arr.slice(0, this.jznum);
        } else {
          this.kzdwdata = arr;
        }
      }
    },
    //开展单位加载
    kzloadmore() {
      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.kzdwdata = this.kzdwload.filter((item, index, arr) => {
        return index < num;
      });
    },
    //开展单位远程搜索
    kzdwremoteMethodnew(quer) {
      if (quer != "") {
        let p = {
          mc: quer
        };
        this.$api.post(this.Global.aport1 + "/org/getDevelopOrg", p, r => {
          if (r.code == 1) {
            this.kzdwload = r.data;
            if (this.kzdwload.length > this.jznum) {
              this.kzdwdata = this.kzdwload.slice(0, this.jznum);
            } else {
              this.bs = 1;
              this.kzdwdata = this.kzdwload;
            }
          }
        });
      } else {
        this.kzdwdata = [];
      }
    },
    //开展单位加载
    kzloadmorenew() {
      if (this.bs == 1) {
        return;
      }
      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.kzdwdata = this.kzdwload.filter((item, index, arr) => {
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

        if (arr.length > this.jznum) {
          this.fydata = arr.slice(0, this.jznum);
        } else {
          this.fydata = arr;
        }
      }
    },
    //法院领导加载
    fyrloadmore() {
      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.fydata = this.fyload.filter((item, index, arr) => {
        return index < num;
      });
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
    //法院部门
    getcbbm(orgid, t) {
      if (t == 0) {
        this.$set(this.pd, "devDepartmentId", "");
        this.fybmdata = [];
      } else if (t == 1) {
        this.$set(this.pd, "entryDepartmentId", "");
        this.fybmdata1 = [];
      }
      if (orgid == "" || orgid == null) {
        return;
      }

      let p = {
        orgId: orgid == null ? this.$store.state.orgId : orgid
      };
      this.$api.get(this.Global.aport1 + "/org/getSubOrg", p, r => {
        if (r.code == 1) {
          if (t == 0) {
            this.fybmdata = r.data;
          } else {
            this.fybmdata1 = r.data;
          }
        }
      });
    },
    getJDXXAB(name) {
      let p = {
        personName: name
      };
      this.$api.post(this.Global.aport1 + "/courtPerson/getPairInfo", p, r => {
        this.cdrdata = r.data;
      });
    },
    getHDName(val) {
      if (val == "" || val == null || val == undefined) {
        this.sname = "联络工作";
        return;
      }
      var obj = {};
      if (val != null) {
        obj = this.$store.state.hdlx.find(item => {
          return item.dm === val;
        });
        this.snames = obj.mc;
      }
    },
    getopen(t) {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择至少一条数据!");
        return;
      }
      if (this.multipleSelection.length > 1 && t == 3) {
        this.$message.error("只能选择一条数据!");
        return;
      }
      var contentPublicList = [];
      var array = this.multipleSelection;

      for (let i = 0; i < array.length; i++) {
        if (array[i].activityTypeId == "0149000001") {
          this.$message.error("其中的结对活动不操作公开，审核，发布，回收！");
          return;
        }
        var obj = {};
        obj.contentPublicId = array[i].activityInfoId;
        obj.contentPublicType = "0134000001";
        obj.contents = array[i].contents;
        switch (t) {
          case 1: //公开
            obj.publicProcessType = "0133000001";
            break;
          case 2: //审核
            obj.publicProcessType = "0133000002";
            break;
          case 3: //发布
            obj.publicProcessType = "0133000003";
            break;
          case 4: //回收
            obj.publicProcessType = "0133000004";
            break;
          default:
            break;
        }

        contentPublicList.push(obj);
      }
      this.opendata = contentPublicList;

      if (t == 1) {
        this.openDialogVisible = true;
      } else if (t == 2) {
        this.txtname = "审核";
        this.shurl = "/contentPublic/auditContent";
        this.sendtype = "0";
        this.shDialogVisible = true;
      } else if (t == 3) {
        this.fbDialogVisible = true;
      } else if (t == 4) {
        this.txtname = "回收";
        this.shurl = "/contentPublic/recycleContent";
        this.sendtype = "1";
        this.shDialogVisible = true;
      }
    },
    GKfatherMethod(data, t) {
      this.openDialogVisible = false;
    },
    SHfatherMethod(data, t) {
      this.shDialogVisible = false;
    },
    FBfatherMethod(data, t) {
      this.fbDialogVisible = false;
    },
    //结对人远程搜索新方法
    jdrdwremoteMethodnew(quer) {
      if (quer !== "") {
        this.cdrdata = [];

        let p = {
          personName: quer
        };
        this.$api.post(
          this.Global.aport1 + "/courtPerson/getPairInfo",
          p,
          r => {
            if (r.code == 1) {
              this.jdrload = r.data;
              if (this.jdrload.length > this.jznum) {
                this.cdrdata = this.jdrload.slice(0, this.jznum);
              } else {
                this.bs = 1;
                this.cdrdata = this.jdrload;
              }
            }
          }
        );
      } else {
        this.cdrdata = [];
      }
    },
    //结对人加载
    jdrloadmorenew() {
      if (this.bs == 1) {
        return;
      }
      var srr = this.jdrload;
      this.formData.pageIndex++;
      let num = this.formData.pageIndex * this.formData.pageSize;
      this.cdrdata = srr.filter((item, index, arr) => {
        return index < num;
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
    getfocus(t, val) {
      if (!val) {
        switch (t) {
          case 1:
            this.cdrdata = [];
            break;
          case 2:
            this.fydata = [];
            break;
          case 3:
            this.fydwdata = [];
            break;
          case 4:
            this.kzdwdata = [];
          case 5:
            this.xmdata = [];
          default:
            break;
        }
      }
    }
  }
};
</script>
<style scoped>
.yy-input-text {
  font-size: 14px;
}
</style>

