<template>
     <div class="sreen cont">
         <div class="top">
            <el-row>
             <el-col :span="16" class="left">
               <img src="../../assets/img/screen/logo.png"><br>
               <div class="time">
                  <span v-html="nowdate"></span> 
                  </div>
             </el-col>
             
           </el-row>
         </div>

         <div class="main">
              <div class="fleft w-23 left">
                 <el-row class="ml-40">
                     <el-col :span="10">
                        <img src="../../assets/img/screen/nan.png" v-if='base.Sex=="0200000001"' class="gettop_head_img">
                        <img src="../../assets/img/screen/nv.png" v-else-if='base.Sex=="0200000002"' class="gettop_head_img">
                        <img src="../../assets/img/screen/nan.png" v-else class="gettop_head_img">
                     </el-col>
                      <el-col :span="14">
                         <div style="font-size:38px;margin-top:22px;">{{base.PersonName}}</div>
                         <div style="font-size:16px;margin-top:20px;">{{base.PeriodTypeValue+base.personSF+"("+base.GroupTypeValue+")"}}</div>
                         <div style="font-size:16px;margin-top:14px;">委员证号：{{base.CardNumber}}</div>
                     </el-col>
                    
                  </el-row>
                  <el-row  class="mt-30">
                       <el-col :span="24" style="line-height:30px;">
                         <span v-for="(t,ind) in lables" :key="ind" class="lable f-14">
                             {{t}}
                         </span>
                     </el-col>
                     <el-col :span="24">
                         <div class="border" style="height:16px;"></div>
                     </el-col>
                  </el-row>
                  <el-row class="mt-20">
                      <el-col :span="24">
                          <div style="width:300px;margin:auto">

                             <el-row>
                                 <el-col :span="4"><img src="../../assets/img/screen/fx-0.png" class="mt-5"></el-col>
                                 <el-col :span="9"><span class="f-12 color">活跃度</span><br/><span class="f-20">{{base.HYD}}</span></el-col>
                                 <el-col :span="8">
                                      <div id="hydcharts" style="width:100%;height:40px;"></div>
                                 </el-col>
                             </el-row>
                             <el-row class="mt-10">
                                 <el-col :span="4"><img src="../../assets/img/screen/fx-1.png" class="mt-5"></el-col>
                                 <el-col :span="9"><span class="f-12 color">联络活动</span><br/><span class="f-20">{{base.actiTotal}}</span></el-col>
                                 <el-col :span="8">
                                     <div id="gzdcharts" style="width:100%;height:40px;"></div>
                                 </el-col>
                             </el-row>
                             <el-row class="mt-10">
                                 <el-col :span="4"><img src="../../assets/img/screen/fx-2.png" class="mt-5" ></el-col>
                                 <el-col :span="9"><span class="f-12 color">议案建议</span><br/><span class="f-20">{{base.yianList}}</span></el-col>
                                 <el-col :span="8">
                                     <div id="tascharts" style="width:100%;height:40px;"></div>
                                 </el-col>
                             </el-row>
                             <el-row class="mt-10">
                                 <el-col :span="4"><img src="../../assets/img/screen/fx-3.png" class="mt-5"></el-col>
                                 <el-col :span="9"><span class="f-12 color">关注案件</span><br/><span class="f-20">{{base.focTotal}}</span></el-col>
                                 <el-col :span="8" class="right">
                                     <div id="jyscharts" style="width:100%;height:40px;"></div>
                                 </el-col>
                             </el-row>
                             <el-row class="mt-20" style="line-height:26px;">
                            <el-col :span="10" class="info border-r">年龄</el-col>
                                 <el-col :span="14" class="info">性别</el-col>
                                 <el-col :span="10" class="f-14 pl-20 color border-r">&nbsp;</el-col>
                                 <el-col :span="14" class="f-14 pl-20 color">{{base.SexValue}}&nbsp;</el-col>
                            <el-col :span="10" class="info border-r">民族</el-col>
                                 <el-col :span="14" class="info">政治面貌</el-col>
                                 <el-col :span="10" class="f-14 pl-20 color border-r">{{base.NationalityValue}}&nbsp;</el-col>
                                 <el-col :span="14" class="f-14 pl-20 color">{{base.PartisanValue}}&nbsp;</el-col>
                            <el-col :span="10" class="info border-r">团(界)别</el-col>
                                 <el-col :span="14" class="info">籍贯</el-col>
                                 <el-col :span="10" class="f-14 pl-20 color border-r">{{base.GroupTypeValue}}&nbsp;</el-col>
                                 <el-col :span="14" class="f-14 pl-20 color">{{base.dd}}&nbsp;</el-col>
                             <el-col :span="10" class="info border-r">学历</el-col>
                                 <el-col :span="14" class="info">单位职务</el-col>
                                 <el-col :span="10" class="f-14 pl-20 color border-r">&nbsp;</el-col>
                                 <el-col :span="14" class="f-14 pl-20 color">{{base.Job}}&nbsp;</el-col>
                             <el-col :span="24" class="info ">研究方向</el-col>
                             <el-col :span="24" class="f-14 pl-20 color ">&nbsp;</el-col>
                             <el-col :span="24" class="info ">通讯地址</el-col>
                             <el-col :span="24" class="f-14 pl-20 color ">{{base.Address}}&nbsp;</el-col>                            
                             <el-col :span="24" class="info">专业特长</el-col>
                             <el-col :span="24" class="f-14 pl-20 color">&nbsp;</el-col>
                             </el-row>
                          </div>
                      </el-col>
                  </el-row>
              </div>
                
              <div class="fleft w-55 left contc">
                   <el-row class=" mb-25" v-if='conshow1'>
                        <el-col :span="24">
                            <div class="fleft"><img src="../../assets/img/screen/left.png"></div>    
                            <div class="fleft title" style=" width: 80px;">联络活动</div>
                        </el-col>
                       <el-col :span="24" class="mt-20 ml-20 mr-20" style="min-height:140px;" v-if='list1 && list1.length>0'>
                         <div  @click="getyyjy(1,t.ProposalInfoID,t.ProposalType)" v-for="(t,ind) in list1" :key='ind'>
                           <el-row class="listl">
                               <el-col :span="11" class="f-15">
                                    <div class="fleft xhs">{{ind+1}}</div>    
                                    <div class="fleft overf" :title="t.Theme">{{getsubstr(t.Theme,20)}}</div>
                               </el-col>
                               <el-col :span="5" :title="t.ActivityTypeValue">{{getsubstr(t.ActivityTypeValue,6)}}</el-col>
                               <el-col :span="5" :title="t.DevelopmentUnitIDValue">{{getsubstr(t.DevelopmentUnitIDValue,8)}}</el-col>
                               <el-col :span="3" :title="t.DevDepartmentIDValue">{{getsubstr(t.DevDepartmentIDValue,8)}}</el-col>
                               <!-- <el-col :span="2" :title="t.DevDepartmentIDValue">{{getsubstr(t.DevDepartmentIDValue,10)}}</el-col> -->
                           </el-row>
                            <!-- <el-row class="listl">
                               <el-col :span="13" class="f-15">
                                    <div class="fleft xhs">2</div>    
                                    <div class="fleft overf">中国建设银行股份有限公司广州荔湾支行诉广东蓝天集团</div>
                               </el-col>
                               <el-col :span="3">会议座谈</el-col>
                               <el-col :span="3">广州荔湾支行</el-col>
                               <el-col :span="3">广东高院</el-col>
                               <el-col :span="2">更多...</el-col>
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="13" class="f-15">
                                    <div class="fleft xhs">3</div>    
                                    <div class="fleft overf">安徽省外经建设(集团)有限公司诉东方置业房地产</div>
                               </el-col>
                               <el-col :span="3">旁听庭审</el-col>
                               <el-col :span="3">第一审判庭</el-col>
                               <el-col :span="3">办公厅</el-col>
                               <el-col :span="2">更多...</el-col>
                           </el-row> -->
                       
                        </div>
                            <div class="middle-foot" v-if='labelname=="收起"' style="font-size:12px;margin-right:10px;">
                                <div class="page-msg">
                                    <div class="">
                                    共{{TotalResult1}}条记录
                                    </div>
                                </div>
                                <el-pagination
                                    background
                                    @current-change="handleCurrentChange1"
                                    :current-page.sync="CurrentPage1"
                                    :page-size="pageSize1"
                                    layout="prev, pager, next"
                                    :total="TotalResult1">
                                </el-pagination>
                            </div>
                          </el-col>
                          <el-col :span="24" v-else>
                          <div style="text-align:center;height:80px; padding-top:80px; color:#999999"> 无联络活动</div> 
                         </el-col>
                      <el-col :span="24" class="right" > <span class="zk" @click="getall(1)">{{labelname}}</span></el-col>
                   </el-row>
                    <el-row class=" mb-25" v-if='conshow2'>
                        <el-col :span="24">
                            <div class="fleft"><img src="../../assets/img/screen/left.png"></div>    
                            <div class="fleft title" style=" width: 120px;">议案建议提案</div>
                        </el-col>
                       <el-col :span="24" class="mt-20 ml-20 mr-20" style="min-height:140px;" v-if='list2 && list2.length>0'>
                         <div  @click="getyyjy(2,t.ProposalInfoID,t.ProposalType)" v-for="(t,ind) in list2" :key='ind'>
                           <el-row class="listl">
                               <el-col :span="10" class="f-15">
                                    <div class="fleft xhs">{{ind+1}}</div>    
                                    <div class="fleft overf" :title="t.Title">{{getsubstr(t.Title,20)}}</div>
                               </el-col>
                                <el-col :span="3" :title="t.IdentityTypeValue">{{getsubstr(t.IdentityTypeValue,6)}}</el-col>
                               <el-col :span="3" :title="t.proposalValue">{{getsubstr(t.proposalValue,6)}}</el-col>
                               <el-col :span="3" :title="t.OrgName">{{getsubstr(t.OrgName,6)}}</el-col>
                               <el-col :span="3">{{t.CreateTime.substr(0,10)}}</el-col>
                               <el-col :span="2">
                                   <span class="state" v-if='getisfk(t.bu_proposalprocess)'>已反馈</span>
                                    <span class="state1" v-else>未反馈</span>
                               </el-col>
                           </el-row>
                           </div>
                            <div class="middle-foot" v-if='labelname=="收起"' style="font-size:12px;margin-right:10px;">
                                <div class="page-msg">
                                    <div class="">
                                    共{{TotalResult2}}条记录
                                    </div>
                                </div>
                                <el-pagination
                                    background
                                    @current-change="handleCurrentChange2"
                                    :current-page.sync="CurrentPage2"
                                    :page-size="pageSize2"
                                    layout="prev, pager, next"
                                    :total="TotalResult2">
                                </el-pagination>
                            </div>
                          </el-col>
                          <el-col :span="24" v-else>
                          <div style="text-align:center;height:80px; padding-top:80px; color:#999999"> 无议案建议提案</div> 
                         </el-col>
                      <el-col :span="24" class="right" > <span class="zk" @click="getall(2)">{{labelname}}</span></el-col>
                   </el-row>
                    <el-row class=" mb-25" v-if='conshow3'>
                        <el-col :span="24">
                            <div class="fleft"><img src="../../assets/img/screen/left.png"></div>    
                            <div class="fleft title" style=" width: 80px;">关注案件</div>
                        </el-col>
                       <el-col :span="24" class="mt-20 ml-20 mr-20" style="min-height:140px;" v-if='list3 && list3.length>0'>
                             <div  @click="getyyjy(1,t.ProposalInfoID,t.ProposalType)" v-for="(t,ind) in list3" :key='ind'>
                           <el-row class="listl">
                               <el-col :span="8" class="f-15">
                                    <div class="fleft xhs">{{ind+1}}</div>    
                                    <div class="fleft overf" :title="t.PartiesAndCaseReason">{{getsubstr(t.PartiesAndCaseReason,10)}}</div>
                               </el-col>
                                <el-col :span="3" :title="t.PersonName">{{getsubstr(t.PersonName,6)}}</el-col>
                                <el-col :span="4" :title="t.SessionCodeValue+t.TimesValue">{{getsubstr(t.SessionCodeValue+t.TimesValue,7)}}</el-col>
                               <el-col :span="3" :title="t.CaseClassValue">{{getsubstr(t.CaseClassValue,6)}}</el-col>
                               <el-col :span="4" :title="t.FocusCourtValue">{{getsubstr(t.FocusCourtValue,7)}}</el-col>
                                <el-col :span="2">
                                   <span class="state1" >{{t.CaseStatusValue}}</span>
                                    
                               </el-col>
                           </el-row>
                            <!-- <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xhs">2</div>    
                                    <div class="fleft overf">中国建设银行股份有限公司广州荔湾支行诉广东蓝天集团</div>
                               </el-col>
                               <el-col :span="2">领衔</el-col>
                               <el-col :span="3">建议、批评</el-col>
                               <el-col :span="2">广东高院</el-col>
                               <el-col :span="3">2019/01/01</el-col>
                               <el-col :span="2">
                                   <span class="state">已反馈</span>
                               </el-col>
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xhs">3</div>    
                                    <div class="fleft overf">安徽省外经建设(集团)有限公司诉东方置业房地产</div>
                               </el-col>
                                <el-col :span="2">领衔</el-col>
                               <el-col :span="3">建议、批评</el-col>
                               <el-col :span="2">广东高院</el-col>
                               <el-col :span="3">2019/01/01</el-col>
                               <el-col :span="2">
                                   <span class="state">已反馈</span>
                               </el-col>
                           </el-row> -->
                      </div>
                            <div class="middle-foot" v-if='labelname=="收起"' style="font-size:12px;margin-right:10px;">
                                <div class="page-msg">
                                    <div class="">
                                    共{{TotalResult3}}条记录
                                    </div>
                                </div>
                                <el-pagination
                                    background
                                    @current-change="handleCurrentChange3"
                                    :current-page.sync="CurrentPage3"
                                    :page-size="pageSize3"
                                    layout="prev, pager, next"
                                    :total="TotalResult3">
                                </el-pagination>
                            </div>
                          </el-col>
                          <el-col :span="24" v-else>
                          <div style="text-align:center;height:80px; padding-top:80px; color:#999999"> 无关注案件</div> 
                         </el-col>
                      <el-col :span="24" class="right" > <span class="zk" @click="getall(3)">{{labelname}}</span></el-col>
                   </el-row>
                    <el-row class=" mb-25" v-if='conshow4'>
                        <el-col :span="24">
                            <div class="fleft"><img src="../../assets/img/screen/left.png"></div>    
                            <div class="fleft title" style=" width: 100px;">关注度分析</div>
                        </el-col>
                       <el-col :span="24" class="mt-20 ml-20 mr-20">
                           <div class="fleft left" style="line-height:35px;"> 
                               <span>地域关注度分析</span><br>
                               <span class="f-24">{{case1.max}}</span> <span class="f-12">次关注</span>
                               <span class="f-20 ml-20">{{case1.CaseClassValue}}</span> <span class="f-12">地区</span>
                          </div>
                           <div class="ml-10 datapicont fleft center"> 
                            <el-progress type="circle"  :width="80" :percentage="case1.percent"></el-progress>
                           </div>
                            <div class="ml-20 fleft left" style="line-height:35px;"> 
                               <span>议案建议关注度分析</span><br>
                               <span class="f-24">{{case2.max}}</span> <span class="f-12">次关注</span>
                               <span class="f-20 ml-20">{{case2.CaseClassValue}}</span> <span class="f-12">类型</span>
                          </div>
                           <div class="ml-10 datapicont fleft center"> 
                            <el-progress type="circle"  :width="80" :percentage="case2.percent"></el-progress>
                           </div>
                            <div class="ml-20 fleft left" style="line-height:35px;"> 
                               <span>案件类型关注分析</span><br>
                               <span class="f-24">{{case3.max}}</span> <span class="f-12">次关注</span>
                               <span class="f-20 ml-20">{{case3.CaseClassValue}}</span> <span class="f-12">类型事件</span>
                          </div>
                           <div class="ml-10 datapicont fleft center"> 
                            <el-progress type="circle"  :width="80" :percentage="case3.percent"></el-progress>
                           </div>
                       </el-col>
                       <el-col></el-col>
                   </el-row>

              </div>
              <div class="fleft w-23 left" >
                  <el-row>
                      <el-col :span="12">
                          <span>活跃度分析</span><br/>
                           <div id='thecharts' style='width:100%;height:80px;'></div>
                      </el-col>
                       <el-col :span="12">
                            <div class="datapicont fleft center"> 
                                <el-progress type="circle"  :width="80" :percentage="100" :show-text="false"></el-progress>
                                <div style="margin-top:-65px"><span class="f-20">{{dlcs}}</span><br/><span class="f-12" style="color:#7A01F9">登录次数</span></div>
                            </div>
                             <div class="ml-20 fleft" style="line-height:27px;"> 
                                <span class="f-12">上次登录IP</span><br/>
                                <span class="f-14" style="color:#B74325" v-if='dlcs>0'>1.202.219.21</span><br/>
                                <span class="f-12" v-if='dlcs>0'>北京市</span>
                            </div>
                      </el-col>
                  </el-row>
                  <el-row class="mt-20">
                        <el-col :span="24">
                          <span>累计活跃时间</span><br/>
                          <span class="r-2 sfont">{{acttitme.days}}</span> 天
                          <span class="r-2 sfont">{{acttitme.hours}}</span> 小时
                          <span class="r-2 sfont">{{acttitme.minutes}}</span> 分钟
                        </el-col>
                  </el-row>
                   <el-row class="mt-30">
                        <el-col :span="24">
                            <!-- <div class="fleft"><img src="../../assets/img/screen/left.png"></div>     -->
                            <div class="fleft chselect">
                                     <el-select v-model="year" @change="getyearact" placeholder="请选择" style="width:80px;"   size="small">
                                     <el-option
                                        v-for="(item,ind) in yearlist"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.dm">
                                        </el-option>
                                     </el-select>
                               </div>
                            <div class="fleft ctitle" style="padding:5px 0px 0px 8px">年活跃度分析</div>
                        </el-col>
                        <el-col :span="24">
                           
                                <div id="yearcharts" style="width:100%;height:250px;margin-top:20px;"></div>
                                <div style="margin-top:-17%;margin-left:8%"><img src="../../assets/img/screen/bard.png" width="99%"></div>
                           
                               
                        </el-col>
                   </el-row>
                     <el-row class="mt-30">
                        <el-col :span="24">
                            <!-- <div class="fleft"><img src="../../assets/img/screen/left.png"></div>     -->
                            <div class="fleft chselect1">
                                <el-select v-model="month" placeholder="" @change="getmonthact"  style="width:80px;"   size="mini">
                                        <el-option
                                                v-for="(item,ind) in monthlist"
                                                :key="ind"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                </el-select>
                            </div>  
                            <div class="fleft ctitle" style="padding:5px 0px 0px 8px">月活跃度分析</div>
                        </el-col>
                        <el-col :span="24" class="mt-20">
                             <div id="monthcharts" style="width:100%;height:250px;"></div>
                        </el-col>
                   </el-row>
              </div>
              <div class="clear"></div>
         </div>
     </div>
</template>
<style>

   @import "../../assets/css/index.css";
</style>
<script>
import echarts from 'echarts'
import {setNowTimes} from '@/assets/js/date.js'
import {getYear,birthdayMonth} from '@/assets/js/date.js'
export default {
     data(){
      return{
         CurrentPage1: 1,
         pageSize1: 3,
         TotalResult1: 0,
         CurrentPage2: 1,
         pageSize2: 3,
         TotalResult2: 0,
         CurrentPage3: 1,
         pageSize3: 3,
         TotalResult3: 0,
         yearlist:getYear(),
         timer: null,
         year:'',
         month:'',
         monthlist:birthdayMonth(),
         nowdate:setNowTimes(),
         lables:['常委会委员','省部级以上','连任2届','在京'],
         conshow1:true,
         conshow2:true,
         conshow3:true,
         conshow4:true,
         list1:[],
         list2:[],
         list3:[],
         list4:[],
         labelname:'展开',
         rid:'',
         pd:{},
         base:{},
         case3:{},
         case2:{},
         case1:{},
         dlcs:0,
         acttitme:{days:0,hours:0,minutes:0}
       }
    },
    mounted(){
       this.getinit();
       this.hydcharts();
       this.fungzdcharts();
       this.tascharts();
       this.jyscharts();

       this.year=new Date().getFullYear();
       
       this.month=new Date().getMonth()+1;
       this.timer = setInterval(() => {
        this.nowdate=setNowTimes();
      }, 1000)
   },
   methods:{
        getinit(){
            this.rid=this.$route.query.mid;


            this.getlist1(this.CurrentPage1, this.pageSize1);
            this.getlist2(this.CurrentPage2, this.pageSize2);
            this.getlist3(this.CurrentPage3, this.pageSize3);
             
             //基本信息
             let p={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "PBId":this.rid,
              },
             
              "itemIndex": [
                "SY_JBXX"
              ]
            }
           this.$api.post(this.Global.aporttj,p,
            r =>{
               if(r.code==200){
                    this.base=r.data.indexItemsValues.SY_JBXX.data;
                    
                }  
            });
            // 案件类型关注分析
             let p1={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "PBId":this.rid,
              },
             
              "itemIndex": [
                "SY_DYGZD"
              ]
            }
           this.$api.post(this.Global.aporttj,p1,
            r =>{
               if(r.code==200){
                    this.case3=r.data.indexItemsValues.SY_DYGZD;
                    if(this.case3==undefined){
                        this.case3={
                            'total':0,
                            'max':0,
                            'percent':0,
                            'CaseClassValue':'',
                            'CaseClass':''

                        }
                    }
             
                    
                }  
            });

             // 议案建议关注度分析
             let p2={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "PBId":this.rid,//this.rid,
              },
             
              "itemIndex": [
                "SY_HYGZD"
              ]
            }
           this.$api.post(this.Global.aporttj,p2,
            r =>{
               if(r.code==200){
                    this.case2=r.data.indexItemsValues.SY_HYGZD;
                    if(this.case2==undefined){
                        this.case2={
                            'total':0,
                            'max':0,
                            'percent':0,
                            'CaseClassValue':'',
                            'CaseClass':''

                        }
                    }
               
                    
                }  
            });
             // 地域关注度分析
             let p3={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "PBId":this.rid,
              },
             
              "itemIndex": [
                "SY_DYGZDFX"
              ]
            }
           this.$api.post(this.Global.aporttj,p3,
            r =>{
               if(r.code==200){
                    this.case1=r.data.indexItemsValues.SY_DYGZDFX;
                    if(this.case1==undefined){
                        this.case1={
                            'total':0,
                            'max':0,
                            'percent':0,
                            'CaseClassValue':'',
                            'CaseClass':''

                        }
                    }
               
                    
                }  
            });

              // 活跃度分析
             let p4={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "PBId":this.rid,
              },
             
              "itemIndex": [
                "PE_HYDFX"
              ]
            }
           this.$api.post(this.Global.aporttj,p4,
            r =>{
               if(r.code==200){
                  
                    if(r.data.indexItemsValues.PE_HYDFX){
                        
                          this.dlcs=r.data.indexItemsValues.PE_HYDFX.total;
                          var date=r.data.indexItemsValues.PE_HYDFX.date;
                       
                           var arr=[];
                            if(date.length>0){
                              for (let i = 0; i < date.length; i++) {
                                arr.push(date[i].substr(11,date.length));
                              }
                           }

                          this.thecharts(arr,r.data.indexItemsValues.PE_HYDFX.data);
                    }
                  
                }  
            });
            // 累计活跃时间
             let p5={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "PBId":this.rid,
              },
             
              "itemIndex": [
                "PE_LJHYSJ"
              ]
            }
           this.$api.post(this.Global.aporttj,p5,
            r =>{
               if(r.code==200){
                    if(r.data.indexItemsValues.PE_LJHYSJ){
                         this.acttitme=r.data.indexItemsValues.PE_LJHYSJ;
                    }
                  
                }  
            });


            //年活跃度分析
            this.getyearact();

            //月活跃度分析
            this.getmonthact();

        },

        getyearact(){
            let pp={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "PBId":this.rid,
                "Year":this.year,
              },
             
              "itemIndex": [
                "PE_YEARHYD"
              ]
            }
           this.$api.post(this.Global.aporttj,pp,
            r =>{
               if(r.code==200){
                  
                    if(r.data.indexItemsValues.PE_YEARHYD){
                        var date=r.data.indexItemsValues.PE_YEARHYD.date;
                        var arr=[];
                            if(date.length>0){
                              for (let i = 0; i < date.length; i++) {
                                arr.push(parseInt(date[i].split('-')[1])+"月");
                              }
                           }
                      var data=r.data.indexItemsValues.PE_YEARHYD.data;
                     
 
                       this.funyearcharts(arr,data,Math.max.apply(null, data)+5);
                    }
                  
                }  
            });
            
        },
        getmonthact(){
            let pp={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "PBId":this.rid,
                "Month":this.month+'',
              },
             
              "itemIndex": [
                "PE_YUEFENHYD"
              ]
            }
           this.$api.post(this.Global.aporttj,pp,
            r =>{
               if(r.code==200){
                  
                    if(r.data.indexItemsValues.PE_YUEFENHYD){
                         var arr=r.data.indexItemsValues.PE_YUEFENHYD.date;
                         var data=r.data.indexItemsValues.PE_YUEFENHYD.data;
                        var date=[];
                        
                        if(arr && arr.length>0){
                          
                                for (let ii = 0; ii < arr.length; ii++) {
                                    var obj={};
                                    obj.name=arr[ii];
                                    obj.max=Math.max.apply(null, data);
                                    date.push(obj);
                                }
                         }


                        this.funmonthcharts(date,data);
                          
                    }
                  
                }  
            });
       
        },
        getlist1(currentPage, showCount){
       let p1={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "pageNumber": currentPage,
                "pageSize": showCount,
                "PBId":this.rid,
              },
             
              "itemIndex": [
                "PList_LLHDLIST"
              ]
            }
           this.$api.post(this.Global.aporttj,p1,
            r =>{
               if(r.code==200){
                    this.list1=r.data.indexItemsValues.PList_LLHDLIST.data;
                    this.TotalResult1=r.data.indexItemsValues.PList_LLHDLIST.total;
                }  
            });
        },
        getlist2(currentPage, showCount){
      
          let pp={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "pageNumber": currentPage,
                "pageSize": showCount,
                "PBId":this.rid,
              },
             
              "itemIndex": [
                "PList_YAJYLIST"
              ]
            }
           this.$api.post(this.Global.aporttj,pp,
            r =>{
               if(r.code==200){
                    this.list2=r.data.indexItemsValues.PList_YAJYLIST.data;
                    this.TotalResult2=r.data.indexItemsValues.PList_YAJYLIST.total;
                }  
            });
        },
        getlist3(currentPage, showCount){
                let pp={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "pageNumber": currentPage,
                "pageSize": showCount,
                "PBId":this.rid,
              },
             
              "itemIndex": [
                "PList_GZAJLIST"
              ]
            }
           this.$api.post(this.Global.aporttj,pp,
            r =>{
               if(r.code==200){
                    this.list3=r.data.indexItemsValues.PList_GZAJLIST.data;
                    this.TotalResult3=r.data.indexItemsValues.PList_GZAJLIST.total;
                }  
            });
        },
        
        hydcharts(xdata,series){
         var  hydcharts = echarts.init(document.getElementById('hydcharts'));
        let _this = this;
          hydcharts.setOption({
            xAxis: {
                   type: 'category',
                   axisLine :{show:false},
                   splitLine:{show:false},
              
                },
                yAxis: {
                    type: 'value',
                  
                    axisLine :{show:false},
                    axisTick:{show:false},
                    nameTextStyle:{width:0},
                    splitLine:{show:false},
                    axisLabel: {
                         show:false,
                    },
                },
             grid: {
                left: '25%',
                right: '15%',
                bottom: '0%',
                top:'25%',
              },
                series: [{
                    data: [200, 1200,500, 1500],
                    type: 'line',
                    smooth: true,
                    lineStyle:{
                         color:'#66D1D4',
                    },
                    itemStyle:{
                        color:'#66D1D4',
                    },
                }]
              
          });
        },
        fungzdcharts(xdata,series){
           var gzdcharts = echarts.init(document.getElementById('gzdcharts'));
        let _this = this;
           gzdcharts.setOption({
            xAxis: {
                   type: 'category',
                   axisLine :{show:false},
                   splitLine:{show:false},
                
                
                },
                yAxis: {
                    type: 'value',
                  
                    axisLine :{show:false},
                    axisTick:{show:false},
                    nameTextStyle:{width:0},
                    splitLine:{show:false},
                     axisLabel: {
                         show:false,
                    },
                    
                },
              grid: {
                left: '25%',
                right: '15%',
                bottom: '0%',
                top:'25%',
              },
                series: [{
                    data: [200, 1200,500, 1500,100],
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                         color:'#66D1D4',
                    },
                    lineStyle:{
                         color:'#66D1D4',
                    },
                    itemStyle:{
                        color:'#66D1D4',
                    },
                }]
              
          });
        },
        tascharts(xdata,series){
        var tascharts = echarts.init(document.getElementById('tascharts'));
        let _this = this;
          tascharts.setOption({
               
       series: [
                {
                  
                    type: 'pie',
                    radius: '55%',
                    center:['60%', '50%'],
                    labelLine:{show:false},
                    data: [
                        {
                        // 数据项的名称
                        name: '数据1',
                        // 数据项值8
                        value: 50,
                        itemStyle:{
                                color:'#65D2D2'
                            },
                        
                        }, {
                            name: '数据2',
                            value: 10,
                            itemStyle:{
                                color:'#24548D'
                            },
                        }
                    ],
                    
                
                }
             ]
          });
        },
        jyscharts(xdata,series){
         var jyscharts = echarts.init(document.getElementById('jyscharts'));
        let _this = this;
          jyscharts.setOption({
           xAxis: {
              type: 'category',
              axisLine :{show:false},
              splitLine:{show:false},
            },
            yAxis: {
                type: 'value',
                  axisLine :{show:false},
                    axisTick:{show:false},
                    nameTextStyle:{width:0},
                    splitLine:{show:false},
                     axisLabel: {
                         show:false,
                    },
            },
            grid: {
                left: '25%',
                right: '15%',
                bottom: '0%',
                top:'25%',
            },
            series: [
            {
                data: [120, 200, 150, 80],
                type: 'bar',
                itemStyle:{
                        color:'#66D1D4',
                },
            },
            {
                data: [150, 250, 250, 90],
                type: 'bar',
                itemStyle:{
                        color:'#3475CC',
                },
            },

            ]
          });
         },
    thecharts(xdata,series){
        var thecharts = echarts.init(document.getElementById('thecharts'));
        let _this = this;
          thecharts.setOption({
             
            grid: {
                left: '3%',
                right: '4%',
                bottom: '25%',
                top:'10%',
              },
             xAxis: {
              type: 'category',
              boundaryGap: true,
              axisPointer: {
                  type: 'none'
              },
              axisLine:{
                  lineStyle:{
                      color:'#1187A9',
                      width:0
                  }
             },
             axisLabel: {
               interval:0, //强制显示文字
               textStyle:{
                 color:'#999',  //坐标的字体颜色
                 fontSize:12
               },
             },
             splitLine:{show:false},
              axisTick:{show:false},
             data: xdata
         },
         yAxis: {
             type: 'value',
             axisLine:{
                 lineStyle:{
                     color:'#1187A9',
                     width:0
                 },
             },
             axisTick:{show:false},
             axisLabel: {
               textStyle:{
                 color:'#8897A6',  //坐标的字体颜色
                 fontSize:16
               },
             },
           
             splitLine:{
               lineStyle:{
                 color:'#174071',
                 type:'dotted'  //'dotted'虚线 'solid'实线
               }
             }
         },
         series: [
             {
                 name: '人口增长量',
                 type: 'line',
                 symbolSize:2,
                 symbol: 'circle',     //设定为实心点
                 label:{
                   show:false,
                   fontSize:12,
                 },
                 itemStyle:{
                   normal:{
                     color:'#0089fe',
                     lineStyle:{
                         width:1,
                         color:'#0089fe',
                         type:'solid'  //'dotted'虚线 'solid'实线
                     }
                   }
                 },
                 areaStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(0,137,254,0.5)'
                      }, {
                          offset: 1,
                          color: 'rgba(0,137,254,0.1)'
                      }])
                  },
                 data: series,
                markPoint: {
                  symbol: 'circle',
                  symbolSize:30,  
                  symbolOffset: ['0', '5'],
                  itemStyle:{
                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(0,137,254,0.8)'
                      },{
                          offset: 0.5,
                          color: 'rgba(0,137,254,0.3)'
                      }, {
                          offset: 1,
                          color: 'rgba(0,137,254,0)'
                      }])
                  },
                  label :{
                    show:true,
                    position: ['70%', '50%'],
                    color:'#eeeeee',
                     fontSize:16,
                     

                  },
                  data: [
                      {type: 'max', name: '最大值'},
                  ]
            },
             },
             
            
         ]
          });
      },
       funyearcharts(xdata,series,ymax){
        var yearcharts = echarts.init(document.getElementById('yearcharts'));
        let _this = this;
        var dataShadow = [];
        var yMax = ymax;
        for (var i = 0; i < xdata.length; i++) {
            dataShadow.push(yMax);
        }
          yearcharts.setOption({
            grid: {
                top:'5%',
                left: '5%',
                right: '10%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xdata,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        textStyle:{
                            color:'#8897A6',  //坐标的字体颜色
                            fontSize:13
                        },
                    },
                    axisLine:{
                        show:false
                     },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                     axisLabel: {
                        textStyle:{
                            color:'#8897A6',  //坐标的字体颜色
                            fontSize:13
                        },
                    },
                     axisTick:{show:false},
                     axisLine:{
                        show:false
                     },
                     splitLine:{show:false}
                }
            ],
            series: [
             { // For shadow
                    type: 'bar',
                    itemStyle: {
                        color: 'rgba(20,54,108,0.5)'
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: dataShadow,
                    animation: false
                },
                {
                    type: 'bar',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#188df0'},
                                {offset: 0.3, color: '#83bff6'},
                                {offset: 1, color: '#188df0'},
                                
                            ]
                        ),
                     barBorderRadius: [20, 20, 20, 20],
                    },
                    emphasis: {
                        itemStyle: {
                            
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#2378f7'},
                                    {offset: 0.3, color: '#2378f7'},
                                    {offset: 1, color: '#83bff6'}
                                ]
                            )
                        }
                    
                    },
                    data:series
                }
            ]

          });
       },

       funmonthcharts(xdata,series){
          
         var monthcharts = echarts.init(document.getElementById('monthcharts'));
        let _this = this;
          monthcharts.setOption({
           tooltip: {},
           radar: {
                    name:{
                      color:"#eeeeee"  
                    },
                    // axisLine:{show:false},
                    // axisTick:{show:false},
                    // splitLine:{show:false},
                    // splitArea:{show:false},
                    splitArea: {
                            areaStyle: {
                                color: ['rgba(12,22,57, 0.2)',
                                    'rgba(12,22,57, 0.4)', 'rgba(12,22,57, 0.6)',
                                    'rgba(12,22,57, 0.8)', 'rgba(12,22,57, 1)'],
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 10
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                    indicator: xdata.length>0?xdata:[{}]
                },
                series: [{

                    type: 'radar',
                    data: [
                        {
                            name:'月活跃度分析',
                            value: series,
                            areaStyle: {
                                  color: 'rgba(50,88,205,0.6)'
                            },
                            lineStyle:{
                                   color: 'rgba(20,48,114)'
                            },
                            itemStyle:{
                               borderWidth:0,
                            },
                            
                             symbol:'none',
                            
                        },
                      
                    ]
                }]
          });
       },
       handleCurrentChange2(val) {
          this.CurrentPage=val;
          this.getlist2(val, this.pageSize2);
        },
         handleCurrentChange1(val) {
          this.CurrentPage=val;
          this.getlist1(val, this.pageSize1);
        },
         handleCurrentChange3(val) {
          this.CurrentPage=val;
          this.getlist3(val, this.pageSize3);
        },
       getall(t){
          
         if(this.labelname=="收起"){
            this.pageSize1=3;
            this.pageSize2=3;
            this.pageSize3=3;
               this.conshow2=true;
               this.conshow1=true;
               this.conshow3=true;
               this.conshow4=true;
             
               this.labelname="展开";
            
             
          }else{
            this.pageSize1=20;
            this.pageSize2=20;
            this.pageSize3=20;
            this.conshow1=false;
            this.conshow3=false;
            this.conshow4=false;
            this.conshow2=false;
          
            this.labelname="收起";
            if(t==2){
                this.conshow2=true;
            }else if(t==1){
                this.conshow1=true;
            }else if(t==3){
                this.conshow3=true;
            }else if(t==4){
                this.conshow4=true;
            }
            
          }
          if(t==2){
              this.getlist2(this.CurrentPage1,this.pageSize1);
            }else if(t==1){
              this.getlist1(this.CurrentPage2,this.pageSize2); 
            }else if(t==3){
              this.getlist3(this.CurrentPage3,this.pageSize3); 
            }
    
        },
        getyyjy(t,id,type){
          
        },
        getisfk(val){
            if(val && val.length>0){
                 for (let i = 0; i < val.length; i++) {
                     if(val[i]=="0205000006"){
                         return true;
                     }
                     
                 }
            }

            return false;
        },
        getsubstr(n,h){
            if(n){
                var len= n.substr(0,h);
                if(n.length>h){
                    return len+'...';
                }else{
                return n
                }
            }else{
                return '';
            }
        },
   },
}
</script>
