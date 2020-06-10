<template>
    <div class="sreen sreen1">
         <div class="top">
           <el-row>
             <el-col :span="16" class="left">
               <img src="../../assets/img/screen/logo.png"><br>
               <div class="time">
                  <span v-html="nowdate"></span> 
                  </div>
             </el-col>
             <el-col :span="8" class="right" >
             <div class="fright mt-10" style="min-width:340px;text-align:right">
                <div class="chselect">
                 <el-select v-model="pd.orgId" @change='getfirst();getinit();' filterable clearable default-first-option placeholder="请选择"  size="small">
                               <el-option
                                 v-for="(item,ind) in ssfydata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                </el-select>&nbsp;&nbsp;
                <el-select v-model="year" @change="getinit"  placeholder="" style="width:80px;"   size="small">
                             <el-option
                                  v-for="(item,ind) in yearlist"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                           </el-option>
                  </el-select>
                </div>
             </div>
              <div class="fright mt-20 topr" style="min-width:340px;text-align:left">议案、建议、提案数据分析</div><div class="fright mt-20"><img src="../../assets/img/screen/left.png" class="mt-10 mr-10"></div>
             </el-col>
           </el-row>
         </div>
         <div class="main">
            <div class="fleft w-25 left mt-10">
            <el-row class="mb-10">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                   <div class="fleft ">历史数据对比</div>
                 </el-col>
            </el-row>
               <el-row>
                 <el-col :span="24">
                      <div id='yearcharts' style='width:100%;height:200px;'></div>
                 </el-col>
               </el-row>
            <el-row class="mt-20">
                <el-col :span="24">
                     <div class="fleft" > {{year}} 年度代表议案办理情况</div>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <div id='phbcharts' style='width:100%;height:200px;'></div>
              </el-col>
            </el-row>
            <el-row class="mt-20 mb-25">
                <el-col :span="24">
                    <div class="fleft chselect1">
                        <el-select v-model="month" placeholder="" @change="getMonthdata" style="width:80px;"   size="mini">
                                <el-option
                                        v-for="(item,ind) in monthlist"
                                        :key="ind"
                                        :label="item"
                                        :value="item">
                                  </el-option>
                         </el-select>
                    </div>    
                     <div class="fleft" style="padding:5px 0px 0px 8px">月代表议案已办结办理情况</div>
                </el-col>
            </el-row>
            <el-row class="mt-10" style="height:100px;">
              <el-col :span='24'>
                   <div class="datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="mp1"></el-progress>
                    <br/>
                    <div class="c-title mt-10">代表议案</div>
             
                  </div>
                  <div class=" datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="mp3" ></el-progress>
                    <br/>
                    <div class="c-title mt-10">建议、批评和意见</div>
                  </div>
                   <div class=" datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="mp2" ></el-progress>
                    <br/>
                    <div class="c-title mt-10">政协提案</div>
                  </div>
                   <div class="datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="mp4" ></el-progress>
                    <br/>
                    <div class="c-title mt-10">审议意见</div>
                  </div>
                   <div class=" datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="mp5" ></el-progress>
                    <br/>
                    <div class="c-title mt-10">日常意见建议</div>
                  </div>
              </el-col>
            </el-row>
             <el-row class="mt-20">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">办理增长&燃尽图</div>
                </el-col>
                  <el-col :span="24">
                     <div id='rjcharts' style='width:100%;height:200px'></div>
                   </el-col>
              </el-row>
             </div>
             <div class="fleft w-50 left">
              <el-row  style="margin:8% 11% 0 10%" v-if='show'>
              <el-col :span='24'>
                             <EchartsMap :sdata='mapdata' :random="new Date().getTime()"  @mapfatherMethod="mapfatherMethod" v-if="mapshow"></EchartsMap>
              </el-col>
            </el-row>
             <el-row :class="show==true?'yamargin1':'yamargin2'">
             <el-col :span="24">
               <div class="casebg">
                 <el-row>
                   <el-col :span="6" style="padding:10px 0px 0px 30px">详细信息列表</el-col>
                   <el-col :span="18" class="sugg">
                     <el-button round size="mini" :class="num==1?'color':''" @click="getsugg(1)">全部</el-button>
                     <el-button round size="mini" :class="num==2?'color':''" @click="getsugg(2,'0204000001')">议案</el-button>
                     <el-button round size="mini" :class="num==3?'color':''" @click="getsugg(3,'0204000003')">建议</el-button>
                     <el-button round size="mini" :class="num==4?'color':''" @click="getsugg(4,'0204000002')">提案</el-button>
                     <el-button round size="mini" :class="num==5?'color':''" @click="getsugg(5,'0204000004')">审议</el-button>
                     <el-button round size="mini" :class="num==6?'color':''" @click="getsugg(6,'0204000005')">日常建议</el-button>
                   </el-col>
                   <el-col :span="24" class="contc1">
                       <el-row class="mb-25">
                         <el-col :span="24" class="mt-20 ml-20">
                           <el-row class="title">
                               <el-col :span="12">标题</el-col>
                               <el-col :span="4">代表</el-col>
                               <el-col :span="4">身份</el-col>
                               <el-col :span="4">办理单位</el-col>
                           </el-row>
                         </el-col>
                       <el-col :span="24" class="mt-20 ml-20" v-if='list.length>0'>
                         <!-- @click="getyyjy(t.ProposalInfoID,t.ProposalType)" -->
                         <div   v-for="(t,ind) in list" :key='ind'>
                           <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                 <div class="fleft xhs">{{ind+1}}</div>    
                                 <div class="fleft overf" :title="t.Title">{{getsubstr(t.Title,15)}}</div>
                               </el-col>
                               <el-col :span="4" :title="t.IdentityTypeValue">{{getsubstr(t.IdentityTypeValue,6)}}</el-col>
                               <el-col :span="4" :title="t.PeriodTypeValue+t.LevelTypeValue+t.IdentityTypeValue">{{getsubstr(t.PeriodTypeValue+t.LevelTypeValue+t.IdentityTypeValue,6)}}</el-col>
                               <el-col :span="4" :title="t.OrgName">{{getsubstr(t.OrgName,6)}}</el-col>
                           </el-row>

                           </div>

                           <div class="middle-foot" v-if='!show' style="font-size:12px">
                                <div class="page-msg">
                                    <div class="">
                                    共{{TotalResult}}条记录
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
                           
                       </el-col>
                       <el-col :span="24" v-else>
                          <div style="text-align:center;padding:50px 0px;color:#999999"> 暂无数据</div> 
                         </el-col>
                      <el-col :span="24" class="right" > <span class="zk" @click="getall">{{labelname}}</span></el-col>
                   </el-row>
                   </el-col>
                 </el-row>
               </div>
             </el-col>
            </el-row>
             </div>
             <div class="fright w-20 left">
             <el-row>
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">来文期间对比</div>
                </el-col>
              <el-col :span='24' class="mt-10 center" v-if='lhdata && bhdata'>
              <div class=" datapic fleft center" style="margin-left:15%" v-if='lhdata'>   
                    <el-progress type="circle"  :width="80" :percentage="lhdata.percent" :show-text="false"></el-progress>
                     <div style="margin-top:-70%; font-size:21px; font-weight:bold">{{lhdata.total}}</div>
                    <br/>
                    <div class="c-title mt-20">两会期间</div>
                  </div>
               <div class="ml-20 datapic fleft center" v-if='bhdata'> 
                    <el-progress type="circle"  :width="80" :percentage="bhdata.percent" :show-text="false"></el-progress>
                     <div style="margin-top:-70%; font-size:21px; font-weight:bold">{{bhdata.total}}</div>
                    <br/>
                    <div class="c-title mt-20">闭会期间</div>
                  </div>
              </el-col>
              <el-col :span="24" style="height:135px;" v-else>
               <div style="text-align:center;padding-top:80px;color:#999999"> 暂无数据</div> 
              </el-col>
            </el-row>
          <el-row class="mt-20">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">内部科室办理情况排名</div>
                </el-col>
                <el-col :span="24" class="mt-20" v-if='noticeList && noticeList.length>0'>
                      <ul class="new-list" :class="{anim:animate}" @mouseenter="Stop()" @mouseleave="Up()">
                      <li v-for="(t,ind) in noticeList" :key='ind'>
                        <div class="fleft ml-20 color f-14 right" style="width:28%">{{t.name}}：</div>    
                        <div class="fleft" style="padding-top:8px;">
                             <el-progress type='line' :percentage="t.percent" :show-text="false"></el-progress>
                        </div>
                        <div class="fleft color f-14 ml-10">{{t.value}}</div>
                        <div class="clear"></div>
                      </li>
                    </ul>
                </el-col>
                <el-col :span="24" style="height:160px;" v-else>
               <div style="text-align:center;padding-top:80px;color:#999999"> 暂无数据</div> 
              </el-col>
            </el-row>
            <el-row class="mt-20">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">开展活动分析</div>
                </el-col>
                <el-col :span="24">
                 <div id="sljdcharts" style="width:100%;height:250px;"></div>
              </el-col>
            </el-row>
              <el-row class="mt-20">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">活动类型分析</div>
                </el-col>
                <el-col :span="24" class="mt-10" v-if="noticetypeList && noticetypeList.length>0">
                   <ul class="new-list" :class="{anim:animate}" @mouseenter="Stop()" @mouseleave="Up()">
                      <li v-for="(t,ind) in noticetypeList" :key='ind'>
                        <div class="fleft ml-20 color f-14 right" style="width:28%">{{t.name}}：</div>    
                        <div class="fleft">
                            <img src="../../assets/img/screen/jd-1.png" class="mr-5" v-for="t in t.value%20" :key="t">
                        </div>
                        <div class="fleft color f-14 ml-10">{{t.value}}</div>
                        <div class="clear"></div>
                      </li>
                    </ul>
                </el-col>
                  <el-col :span="24" style="height:160px;" v-else>
               <div style="text-align:center;padding-top:80px;color:#999999"> 暂无数据</div> 
              </el-col>
            </el-row>
             </div>
             <div class="clear"></div>
         </div>
         <div class="popContainer" v-if='yyjyshow'>
           <div class="content">
             <div class="close" @click="yyjyshow=false"><img src="../../assets/img/screen/close.png"></div>
              <YYJY :type='1' :data='yyjydata' :random="new Date().getTime()"></YYJY>
           </div>
         
         </div>
        
    </div>
</template>
<style>
   @import "../../assets/css/index.css";
</style>
<script>
import echarts from 'echarts'
import EchartsMap from "../Common/maps"
import YYJY from "../Common/screen/yyjy"
import {setNowTimes} from '@/assets/js/date.js'
import {getYear,birthdayMonth} from '@/assets/js/date.js'
export default {
   components:{EchartsMap,YYJY},
    data(){
      return{
         CurrentPage: 1,
         pageSize: 3,
         TotalResult: 0,
         city:'北京',
         timer: null,
         nowdate:setNowTimes(),
         ssfydata:[],
         pd:{orgId:'0e10a51827e511ea9e3700155dbaef87'},
         year:'',
         yearlist:getYear(),
         month:'',
         monthlist:birthdayMonth(),
         noticeList: [],
         noticetypeList:[],
         animate:false,
         intNum: undefined,
         num:1,
         show:true,
         labelname:'展开',
         monthdata:[],
         mapdata:{},//地图对象
         mp1:0,
         mp2:0,
         mp3:0,
         mp4:0,
         mp5:0,
         bhdata:{},
         lhdata:{},
         yyjyshow:false,
         yyjydata:{},
         list:[],
         protype:'',
         mapshow:true,
       }
    },
    mounted(){
      this.year=new Date().getFullYear();
      this.month=new Date().getMonth();
      this.getSSFY();
      this.getfirst();
      
      this.getinit();
      // this.phbcharts(['4月', '3月', '2月', '1月'],['代表议案未办结', '代表议案已办结','总数']);
      // this.yearcharts(['2020', '2019', '2018', '2017','2016','2015','2014','2013','2012','2011','2010']);
      //  this.handlecharts(['1','2','3','4','5','6','7','8','9','10','11','12']);
      //  this.monthcharts();
      //  this.sljdcharts();
      //  this.rjcharts(['1','2','3','4']);
       this.ScrollUp();
      
       this.timer = setInterval(() => {
        this.nowdate=setNowTimes();
      }, 1000)

   },
    methods:{
      getfirst(){
         //历处数据对比
           let p={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId
              },
              "itemIndex": [
                "YiAn_lnsjdb"
              ]
            }
           this.$api.post(this.Global.aporttj,p,
           
            r =>{
             if(r.code==200){
                 this.yearcharts(r.data.indexItemsValues.YiAn_lnsjdb.date,r.data.indexItemsValues.YiAn_lnsjdb.data);
             }  
          });
      },
        getinit(val){
          // debugger
           
          
        if(val==null){
              this.mapshow=false;
              this.mapdata={};
              this.mapdata.orgId=this.pd.orgId;
              this.mapdata.year=this.year;
              this.mapshow=true;
            }
            //年度代表 议案办理情况
           let p1={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                 "Year": this.year,
              },
              "itemIndex": [
                "YiAn_blqk"
              ]
            }
           this.$api.post(this.Global.aporttj,p1,
           
            r =>{
                  if(r.code==200){
                       if(r.data.indexItemsValues.YiAn_blqk){
                          this.funphbcharts(r.data.indexItemsValues.YiAn_blqk.date,r.data.indexItemsValues.YiAn_blqk.data);
                       }
                    }  
            });

           this.getfunmonth();
             //办理增长&燃尽图
           let p3={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
              },
              "itemIndex": [
                "YiAn_blzzrjt"
              ]
            }
           this.$api.post(this.Global.aporttj,p3,
            r =>{
               
                    if(r.code==200){
                    
                      if(r.data.indexItemsValues.YiAn_blzzrjt){
                            var date=r.data.indexItemsValues.YiAn_blzzrjt.date;
                            var arr=[];
                            if(date.length>0){
                              for (let i = 0; i < date.length; i++) {
                                arr.push(parseInt(date[i].split('-')[1]));
                                
                              }
                           }
                        this.funrjcharts(arr,r.data.indexItemsValues.YiAn_blzzrjt.data);
                       }  
                    }  
            });

            //议案建议-内部科室办理情况排名
           let p4={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
              },
              "itemIndex": [
                "YiAn_ksblpm"
              ]
            }
           this.$api.post(this.Global.aporttj,p4,
            r =>{
             
                    if(r.code==200){
                      if(r.data.indexItemsValues.YiAn_ksblpm){
                         this.noticeList=r.data.indexItemsValues.YiAn_ksblpm.data;
                        }
                         
                    }  
            });

            //开展活动分析
           let p5={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
              },
              "itemIndex": [
                "YiAn_KZHD"
              ]
            }
           this.$api.post(this.Global.aporttj,p5,
            r =>{
                    if(r.code==200){
                      if(r.data.indexItemsValues.YiAn_KZHD){
                        this.funsljdcharts(r.data.indexItemsValues.YiAn_KZHD.data);
                      }
                         
                    }  
            });

              //活动类型分析
           let p6={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
              },
              "itemIndex": [
                "YiAn_HDLX"
              ]
            }
           this.$api.post(this.Global.aporttj,p6,
            r =>{
              
                    if(r.code==200){

                      if(r.data.indexItemsValues.YiAn_HDLX){
                        this.noticetypeList=r.data.indexItemsValues.YiAn_HDLX.data;
                      }
                    }  
            });

              //来文期间
           let p7={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
              },
              "itemIndex": [
                "YiAn_LWQJ"
              ]
            }
           this.$api.post(this.Global.aporttj,p7,
            r =>{
            
                    if(r.code==200){
                      if(r.data.indexItemsValues.YiAn_LWQJ){
                       this.lhdata=r.data.indexItemsValues.YiAn_LWQJ['0159000001'];//两会
                       this.bhdata=r.data.indexItemsValues.YiAn_LWQJ['0159000002'];//闭会
                      }                         
                    }  
            });

            this.getlist(this.CurrentPage, this.pageSize);

        },
        handleCurrentChange(val) {
          this.CurrentPage=val;
          this.getlist(val, this.pageSize,this.protype);
        },
        getlist(currentPage, showCount,type){
          this.protype=type;
          let pp={

             "primaryId": "",
              "riskDate": "",
              "params": {
                "ProposalType": type,
                "pageNumber": currentPage,
                "pageSize": showCount,
                "Year": this.year,
                "UndertakeOrgID":this.pd.orgId,
              },
             
              "itemIndex": [
                "YiAn_xxxxList"
              ]
            }
           this.$api.post(this.Global.aporttj,pp,
            r =>{
               if(r.code==200){
                    this.list=r.data.indexItemsValues.YiAn_xxxxList.data;
                    this.TotalResult=r.data.indexItemsValues.YiAn_xxxxList.totalSize;
                }  
            });
        },
         //月度代表 议案办理情况
        getfunmonth(){
          let p2={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
              },
              "itemIndex": [
                "YiAn_ydblqk"
              ]
            }
           this.$api.post(this.Global.aporttj,p2,
            r =>{
               if(r.code==200){
                 if(r.data.indexItemsValues.YiAn_ydblqk){
                    this.monthdata=r.data.indexItemsValues.YiAn_ydblqk
                    this.getMonthdata();
                  }
                }  
            });
        },
        getMonthdata(){
           var ss=this.month;
                    
          if(this.monthdata[ss]){
               this.mp1=this.monthdata[ss]['0204000001'].percent;
               this.mp2=this.monthdata[ss]['0204000002'].percent;
               this.mp3=this.monthdata[ss]['0204000003'].percent;
               this.mp4=this.monthdata[ss]['0204000004'].percent;
               this.mp5=this.monthdata[ss]['0204000005'].percent;
           }
        },
        yearcharts(xdata,rdata){
        var yearcharts = echarts.init(document.getElementById('yearcharts'));
        let _this = this;
        yearcharts.setOption({
        color: ['#5B9BD5', '#ED7D31','#A5A5A5','#FFC000','#4472C4','#70AD47'],
        legend: {
            bottom:0,
            itemWidth:10,
            itemHeight:10,
            textStyle:{
              color:'#cccccc',
              fontSize:14,
            },
        },
        tooltip: {
          
        },
        xAxis: [
              {
                  type: 'category',
                  boundaryGap: true,
                  axisPointer: {
                        type: 'none'
                    },
                axisLine:{show:false},
                  axisTick:{
                    show:false,
                  },
                  axisLabel: {
                    interval:0, //强制显示文字
                    textStyle:{
                      color:'#cccccc',  //坐标的字体颜色
                      fontSize:9
                    },
                  },
                  data: xdata!=undefined?xdata:0
                
              }
              
          ],
          yAxis: [
             {
               axisLabel: {
               interval:0, //强制显示文字
               textStyle:{
                 color:'#999999',  //坐标的字体颜色
                 fontSize:10
                  },
                },
                splitLine:{show:false},
                axisLine:{show:false},
                  axisTick:{
                    show:false,
                  },
             }

          ],
          grid: {
            left: '8%',
            right: '4%',
            bottom: '36%',
            top:'10%',
          },
        series: [
          {
              name: '总数',
              type: 'bar',
              // barGap: 0,
                // itemStyle:{
                //     normal:{
                //       label: {
      					// 				show: true, //开启显示
      					// 				position: 'top', //在上方显示
      					// 				textStyle: { //数值样式
      					// 					color: '#fff',
      					// 					fontSize: 12
  							// 		    }
      					// 			},
                //     },
                  
                //   },
              data: rdata!=undefined?rdata['total']:[0]
          },
          {
              name: '代表议案',
              type: 'bar',
              data: rdata!=undefined?rdata['0204000001']:[0]
          },
          {
              name: '建议、批评与意见',
              type: 'bar',
              data: rdata!=undefined?rdata['0204000003']:[0]
          },
          {
              name: '政协提案',
              type: 'bar',
              data: rdata!=undefined?rdata['0204000002']:[0]
          },
          {
              name: '审议意见',
              type: 'bar',
              data: rdata!=undefined?rdata['0204000004']:[0]
          },
          {
              name: '日常意见建议',
              type: 'bar',
              data: rdata!=undefined?rdata['0204000005']:[0]
          },
        
          ],

        
        
          })
        },
        //年度办理情况
        handlecharts(xdata){
         var  handlecharts = echarts.init(document.getElementById('handlecharts'));
        let _this = this;
        handlecharts.setOption({
          color: ['#3969F8', '#83AEDD','#81FEFF'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
            left: '8%',
            right: '15%',
            bottom: '25%',
            top:'8%',
          },
            legend: {
                bottom:0,
                itemWidth:10,
                itemHeight:10,
                textStyle:{
                  color:'#cccccc',
                  fontSize:14,
                },
                data: ['总数', '办结', '办结率']
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisPointer: {
                        type: 'none'
                    },
                    splitLine:{show:false},
                    axisLabel: {
                      interval:0, //强制显示文字
                      textStyle:{
                        color:'#cccccc',  //坐标的字体颜色
                        fontSize:12
                      },
                    },
                    axisTick:{
                      show:false,
                    },
                    data: xdata,
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '办结量',
                    // min: 0,
                    // max: 250,
                    // interval: 50,
                   
                    splitLine:{show:false},
                    axisLabel: {
                      formatter: '{value}',
                      interval:0, //强制显示文字
                      textStyle:{
                        color:'#cccccc',  //坐标的字体颜色
                        fontSize:10
                          },
                    },
                    axisTick:{
                      show:false,
                    },
                    axisLine:{show:false},
                },
                {
                    type: 'value',
                    name: '办结率',
                    // min: 0,
                    // max: 25,
                    // interval: 5,
                   
                    splitLine:{show:false},
                    axisLabel: {
                      formatter: '{value} %',
                      interval:0, //强制显示文字
                      textStyle:{
                        color:'#cccccc',  //坐标的字体颜色
                        fontSize:10
                          },
                    },
                    axisLine:{show:false},
                },
                
            ],
            series: [
                {
                    name: '总数',
                    type: 'bar',
                    data: [31, 41, 7, 20, 23, 33, 38, 11, 18, 19, 30, 41]
                },
                {
                    name: '办结',
                    type: 'bar',
                    data: [23, 8, 3, 15, 2, 3, 32, 3, 11, 12, 20, 30]
                },
                {
                    name: '办结率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [73.33, 20.13, 45.19, 75.86, 10.69, 10.29, 83.70, 28.95, 62.53, 61.38, 66.41, 72.99]
                }
            ]

        });
        },
      funphbcharts(xdata,series){
      
        var phbcharts = echarts.init(document.getElementById('phbcharts'));
      
        let _this = this;
        phbcharts.setOption({
          color: ['#7900F0', '#83AEDD', '#3969F8'],
           tooltip: {
            trigger: 'axis',
            axisPointer: {
                    type: 'none',
                    crossStyle: {
                        color: '#999'
                    }
                },
         },
        legend: {
            bottom:0,
            itemWidth:10,
            itemHeight:10,
            textStyle:{
              color:'#cccccc',
              fontSize:14,
            },
        },
        grid: {
            left: '3%',
            right: '10%',
            bottom: '15%',
            top:'5%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value',
                axisLine:{
                  show:false,
                 lineStyle:{
                     color:'#1187A9',
                     width:1
                 },
             },
             axisLabel: {
               show:true,
               textStyle:{
                 color:'#cccccc',  //坐标的字体颜色
                 fontSize:11
               },
             },
             axisTick:{
               show:false,
             },
             splitLine:{
               show:false,
               lineStyle:{
                 color:'#174071',
                 type:'dotted'  //'dotted'虚线 'solid'实线
               }
             },
            
            }
          ],
            yAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisPointer: {
                          type: 'none'
                      },
                      axisLine:{
                          show:false,
                          lineStyle:{
                              color:'#1187A9',
                              width:0
                          }
                    },
                    axisTick:{
                      show:false,
                    },
                    axisLabel: {
                      interval:0, //强制显示文字
                      textStyle:{
                        color:'#cccccc',  //坐标的字体颜色
                        fontSize:12
                      },
                    },
                    data: xdata!=undefined?xdata:0
                  
                }
            ],
            series: [
                {
                    name: '代表议案未办结',
                    type: 'bar',
                    barGap: 0,
                    data: series!=undefined?series['other']:[0]
                },
                {
                    name: '代表议案已办结',
                    type: 'bar',
                    data: series!=undefined?series['0205000006']:[0]
                },
                {
                    name: '总数',
                    type: 'bar',
                    data: series!=undefined?series['total']:[0]
                },
              
                ]
                })
                
      },
     
      // monthcharts(xdata,series){
      //   this.monthcharts = echarts.init(document.getElementById('monthcharts'));
      //   let _this = this;
      //     _this.monthcharts.setOption({
      //      radar: {
      //               name:{
      //                 color:"#eeeeee"  
      //               },
      //               axisLine:{show:false},
      //               axisTick:{show:false},
      //               splitLine:{show:false},
      //               splitArea:{show:false},
      //               indicator: [
      //                   { name: '刑事案件', max: 6500},
      //                   { name: '民事案件', max: 16000},
      //                   { name: '行政案件', max: 30000},
      //                   { name: '赔偿案件', max: 38000},
      //                   { name: '执行案件', max: 52000},
      //                   { name: '其他案件', max: 82000},
      //               ]
      //           },
      //           series: [{

      //               type: 'radar',
      //               data: [
      //                   {
      //                       value: [4300, 10000, 28000, 35000, 50000,50000],
      //                       areaStyle: {
      //                             color: 'rgba(50,88,205,0.6)'
      //                       },
      //                       lineStyle:{
      //                              color: 'rgba(20,48,114)'
      //                       },
      //                       itemStyle:{
      //                          borderWidth:0,
      //                       },
      //                        symbol:'none',
                            
      //                   },
      //                   {
      //                       value: [5000, 3900, 25000, 28000, 35000,70000],
      //                       areaStyle: {
      //                           color: 'rgba(50,88,205,0.4)'
      //                       },
      //                        lineStyle:{
      //                             color: 'rgba(20,48,114)'
      //                       },
      //                       itemStyle:{
      //                          borderWidth:0,
                              
      //                       },
      //                       symbol:'none',

      //                   },
      //                   {
      //                       value: [6450, 15000, 10000, 30000, 18000,10000],
      //                       areaStyle: {
      //                           color: 'rgba(50,88,205,0.3)'
      //                       },
      //                        lineStyle:{
      //                             color: 'rgba(20,48,114)'
      //                       },
      //                       itemStyle:{
      //                          borderWidth:0,
      //                       },
      //                        symbol:'none',
      //                   },
      //                  {
      //                       value: [5000, 10000, 30000, 3000, 40000,20000],
      //                       areaStyle: {
      //                           color: 'rgba(50,88,205,0.5)'
      //                       },
      //                        lineStyle:{
      //                             color: 'rgba(20,48,114.0.7)'
      //                       },
      //                       itemStyle:{
      //                          borderWidth:0,
      //                       },
      //                        symbol:'none',
      //                   },
      //                   {
      //                       value: [2000, 8000, 9000, 10000, 20000,50000],
      //                       areaStyle: {
      //                           color: 'rgba(50,88,205,0.7)'
      //                       },
      //                        lineStyle:{
      //                              color: 'rgba(20,48,114,0.8)'
      //                       },
      //                       itemStyle:{
      //                          borderWidth:0,
                               
      //                       },
      //                        symbol:'none',
      //                   },
      //                   {
      //                       value: [3000, 6000, 15000, 10000, 20000,60000],
      //                       areaStyle: {
      //                           color: 'rgba(50,88,205,0.7)'
      //                       },
      //                        lineStyle:{
      //                              color: 'rgba(20,48,114,0.8)'
      //                       },
      //                       itemStyle:{
      //                          borderWidth:0,
                               
      //                       },
      //                        symbol:'none',
      //                   }
      //               ]
      //           }]
      //     });
      //  },
       //饼图
       funsljdcharts(data){
        
          var sljdcharts = echarts.init(document.getElementById('sljdcharts'));
          let _this = this;
          sljdcharts.setOption({
          //  color:['#3F5F9A','#E3C678'],
          //   tooltip: {
          //       trigger: 'item',
          //       formatter: '{a} <br/>{b} : {c} ({d}%)'
          //   },
          //   legend: {
          //       bottom: 0,
          //       textStyle:{
          //           color:'#cccccc',
          //           fontSize:12,
          //         },
          //   },
              
          //   series: [
          //       {
          //           name:'分析',
          //           type: 'pie',
          //           radius: '65%',
          //           center: ['50%', '50%'],
          //           selectedMode: 'single',
          //           label: {
          //               show: false
          //           },
          //           data: [
                      
          //               {value: 457, name: '开展活动'},
          //               {value: 173, name: '未开展活动'},
          //           ],
                    
                  
          //       }
          //   ]

                color:['#3F5F9A','#E3C678'],
                tooltip: {},
                legend: {
                    bottom:0,
                    itemWidth:10,
                    itemHeight:10,
                    textStyle:{
                      color:'#cccccc',
                      fontSize:14,
                    },
                },
           
                radar: {
                    shape: 'circle',
                    name:{
                          color:"#999999"  
                    },
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
                    indicator: [
                        { name: '议案', max: data.makValue[0]},
                        { name: '建议', max: data.makValue[1]},
                        { name: '提案', max: data.makValue[2]},
                        { name: '审议', max: data.makValue[3]},
                        { name: '日常建议', max: data.makValue[4]},
                    ]
                },
                series: [{
                  
                    type: 'radar',
                    data: [
                        {
                           name:'开展活动',
                           value: data.KValue,
                            
                            
                        },
                        {   
                           name:'未开展活动',
                           
                           value: data.unKValue,
                          
                        },
                        
                    ]
                }]

         });
       },
       funrjcharts(xdata,data){
          var rjcharts = echarts.init(document.getElementById('rjcharts'));
          let _this = this;
           rjcharts.setOption({
             color:  ['#83AEDD', '#3969F8', '#675bba'],
              tooltip: {
                  trigger: 'none',
                  axisPointer: {
                      type: 'cross'
                  }
              },
              legend: {
                 
                  bottom:0,
                  itemWidth:10,
                  itemHeight:10,
                  textStyle:{
                    color:'#cccccc',
                    fontSize:14,
                  },
              },
              grid: {
                  left: '8%',
                  right: '4%',
                  bottom: '30%',
                  top:'8%',
              },
              xAxis: [
                  {
                      type: 'category',
                       boundaryGap: true,
                        axisPointer: {
                              type: 'none'
                          },
                      
                        axisTick:{
                          show:false,
                        },
                        axisLabel: {
                          interval:0, //强制显示文字
                          textStyle:{
                            color:'#cccccc',  //坐标的字体颜色
                            fontSize:16
                          },
                        },
                      data: xdata,

                  },
                  {
                      type: 'category',
                      axisLine:{show:false},
                  
                  }
              ],
              yAxis: 
                  {
                      type: 'value',
                      axisLabel: {
                      interval:0, //强制显示文字
                      textStyle:{
                        color:'#cccccc',  //坐标的字体颜色
                        fontSize:10
                          },
                        },
                        splitLine:{show:false},
                         
                        axisTick:{
                          show:false,
                        },
              },
                series: [
                    {
                        name: '总数',
                        type: 'line',
                        xAxisIndex: 1,
                        smooth: true,
                        data: data.total
                    },
                    {
                        name: '消化',
                        type: 'line',
                        smooth: true,
                        data: data.finish
                    }
                ]
          }); 
       },
        getSSFY(){
          this.$api.get(this.Global.aport1+'/org/getCourtOrg',null,
                r =>{
                 if(r.code==1){
                      this.ssfydata=r.data;
                 }
          });
        },
       ScrollUp() {

            this.intNum = setInterval(() => {
              this.animate=true;// 向上滚动的时候需要添加css3过渡动画
              var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
              setTimeout(()=>{
                  if(this.noticeList && this.noticeList.length>0){
                that.noticeList.push(that.noticeList[0]);// 将数组的第一个元素添加到数组的
                that.noticeList.shift(); //删除数组的第一个元素
                 }
                  if(this.noticetypeList && this.noticetypeList.length>0){
                that.noticetypeList.push(that.noticetypeList[0]);// 将数组的第一个元素添加到数组的
                that.noticetypeList.shift(); //删除数组的第一个元素
                 }
                that.animate=!that.animate;
                
              },0)
            }, 1000);
        
        },
          //鼠标移上去停止
        Stop() {
          clearInterval(this.intNum);
        },
        Up() {
          this.ScrollUp();
        },
        getsugg(t,type){
          this.num=t;
          this.CurrentPage=1;
          this.getlist(this.CurrentPage,this.pageSize,type);
        },
        getall(){
          this.show=!this.show;
          if(this.show){
            this.pageSize=3;
            this.getlist(this.CurrentPage,this.pageSize,this.protype);
            this.labelname="展开";
          }else{
           this.pageSize=20;
            this.getlist(this.CurrentPage,this.pageSize,this.protype);
           this.labelname="收起";
          }
        },
        getyyjy(id,type){
           this.yyjydata={
             "id":id,
             "type":type
           }
           this.yyjyshow=true;

        },
        getsubstr(n,h){
          var len= n.substr(0,h);
          if(n.length>h){
            return len+'...';
          }else{
           return n
          }
        },
       mapfatherMethod(orgid){
        if(orgid){
       
            this.$set(this.pd,'orgId',orgid);
            this.getfirst();
            this.getinit('orgId');
           
        }
      },
     
    }
}
</script>