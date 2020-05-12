<template>
    <div class="sreen">
         <div class="top">
           <el-row>
             <el-col :span="16" class="left">
               <img src="../../assets/img/screen/logo.png"><br>
               <div class="time">
                  <span v-html="nowdate"></span> 
                  </div>
             </el-col>
             <el-col :span="8" class="right">
              <div class="fright mt-40 mr-25">
                   <div class="chselect">
                 <el-select v-model="pd.orgId" @change="getfirst();getinit()" filterable  default-first-option placeholder="请选择"  size="small">
                               <el-option
                                 v-for="(item,ind) in ssfydata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                </el-select>&nbsp;&nbsp;
                <el-select v-model="year" @change="getinit();getMinit()"  placeholder="" style="width:80px;"   size="small">
                             <el-option
                                  v-for="(item,ind) in yearlist"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                           </el-option>
                  </el-select>
                </div>
              </div>
             </el-col>
           </el-row>
         </div>
         <div class="main">
             <div class="fleft w-20 left mt-10">
            <el-row class="mb-10">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                   <div class="fleft ">今日工作</div>
                 </el-col>
                 <el-col :span="24" class="mt-20" style="height:160px" v-if='workdata && workdata.length>0'>
                   <el-row class="l-1" v-for="(t,ind) in workdata" :key='ind'>
                     <el-col :span="24"  class="l-1-1" :title="t.title">● &nbsp;&nbsp;{{getsubstr(t.title,22)}}</el-col>
                  </el-row>
                 </el-col>
                   <el-col :span="24" v-else>
                          <div style="height:100px;text-align:center;padding-top:80px;color:#999999"> 暂无工作</div> 
                   </el-col>
            </el-row>
             
            <el-row class="mt-30 mb-25">
                <el-col :span="24">
                    <!-- <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>     -->
                     <div class="fleft ">{{year}} 年度工作统计占比</div>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                    <div class="datapicont fleft center"> 
                    <el-progress type="circle"  :width="85" :percentage="mp1"></el-progress>
                    <br/>
                    <div class="c-title mt-10">联络活动统计</div>
                  </div>
                    <div class="datapicont fleft center ml-20"> 
                    <el-progress type="circle"  :width="85" :percentage="mp2"></el-progress>
                    <br/>
                    <div class="c-title mt-10">议案建议统计</div>
                  </div>
                    <div class="datapicont fleft center ml-20"> 
                    <el-progress type="circle"  :width="85" :percentage="mp3"></el-progress>
                    <br/>
                    <div class="c-title mt-10">关注案件统计</div>
             
                  </div>
              </el-col>
            </el-row>
            <el-row class="mt-40 mb-25">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">排行榜</div>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                  <div id='phbcharts' style='width:100%;height:350px;'></div>
              </el-col>
            </el-row>
               
             </div>
             <div class="fleft w-40 left">
               <el-row>
                 <el-col :span="6" v-for="(tt,ind) in countdata" :key="ind" >
                    <div class="left mt-10">
                      <span class="f-30 cursor fontcolor" @click="getMeber(tt.type)">{{tt.value}}</span> <span class="f-14">人</span><br/>
                      <div class="f-14" style="line-height:22px;color:#798088" v-html='getNewline(tt.name)'></div>
                    </div>
                 </el-col>
                 <!-- <el-col :span="6">
                    <div class="left">
                      <span class="f-30">345</span> <span class="f-14">人</span><br/>
                      <div class="f-14 pt-10">北京政协委员</div>
                    </div>
                 </el-col>
                 <el-col :span="6">
                    <div class="left">
                      <span class="f-30">1092</span> <span class="f-14">人</span><br/>
                      <div class="f-14 pt-10">最高特约咨询员</div>
                    </div>
                 </el-col>
                 <el-col :span="6">
                    <div class="left">
                      <span class="f-30">200</span> <span class="f-14">人</span><br/>
                      <div class="f-14 pt-10">最高特约监督员</div>
                    </div>
                 </el-col> -->
               </el-row>
            <el-row class="mt-30">
              <el-col :span='24' v-if='mapshow'>
                <EchartsMap :sdata='mapdata' :random="new Date().getTime()"  @mapfatherMethod="mapfatherMethod" v-if="mapshow"></EchartsMap>
              </el-col>
            </el-row>
              <el-row style="margin-top:9%">
                <el-col :span='8'>
                  <div class="fleft"><img src="../../assets/img/screen/ic-1.png" class="mr-10"></div>    
                  <div class="fleft c-3t">组织联络活动</div>
                </el-col>
                <el-col :span='8' >
                  <div class="fleft"><img src="../../assets/img/screen/ic-2.png" class="mr-10"></div>    
                  <div class="fleft c-3t">办理议案建议提案</div>
                 
                </el-col>
                <el-col :span='8'  >
                  <div class="fleft"><img src="../../assets/img/screen/ic-3.png" class="mr-10"></div>    
                  <div class="fleft  c-3t ">办理关注案件</div>
               
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="f-30 ml-40 fg cursor fontcolor" @click="getTZ(1)">{{mpsum1}}</div></el-col>
                <el-col :span="8"><div class="f-30 ml-40 fg cursor fontcolor"  @click="getTZ(2)">{{mpsum2}}</div></el-col>
                <el-col :span="8"><div class="f-30 ml-40 fg cursor fontcolor" @click="getTZ(3)">{{mpsum3}}</div></el-col>
              </el-row>
              
             </div>
             <div class="fright w-20 left">
              <el-row class="ml-20"> 
                <el-col :span='24'>
                    <div class="fleft chselect1">
                        <el-select v-model="month" placeholder="" @change="getMinit"  style="width:80px;"   size="mini">
                                <el-option
                                        v-for="(item,ind) in monthlist"
                                        :key="ind"
                                        :label="item"
                                        :value="item">
                                </el-option>
                         </el-select>
                    </div>  
                <div class="fleft r-1" style="padding:5px 0px 0px 8px">  月在线人数</div>
                </el-col>
                <el-col :span='24' class="mt-10">
                  <span class="r-2 sfont">{{gettoThousands(mebercount)}}</span>
                </el-col>
                 <el-col :span='24'>
                     <div class="fleft mt-20 color" style="line-height:30px">
                      环比 {{hbnum}} <br/>
                      同比 {{tbnum}} </div>
                     <div class="fleft ml-10" style="width:230px">
                       <div id='thecharts' style='width:100%;height:80px;'></div>
                     </div>
                </el-col>
              </el-row>
              <el-row class="mt-30">
                <el-col :span="24">
                   <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                   <div class="fleft ">{{this.month}}月 {{casedata?casedata.jobName:''}}行业关注案件类别</div>
                </el-col>
                <el-col :span="24" class="mt-20" style="height:140px" v-if="casedata && casedata.subData && casedata.subData.length>0">
                  <el-row style="line-height:25px;">
                    <el-col :span="24" v-for="(t,ind) in casedata.subData" :key='ind'>
                       <div class="fleft ml-20 color f-14">{{t.CaseClassVal}}：</div>    
                        <div class="fleft">
                            <img src="../../assets/img/screen/jd-1.png" class="mr-5" v-for="tt in t.percent%20+1" :key="tt">
                        </div>
                         <div class="fleft color f-14">{{t.value}}</div>
                    </el-col>
                    <!-- <el-col :span="24">
                       <div class="fleft ml-20 color f-14">财产诉讼：</div>    
                        <div class="fleft">                     
                            <img src="../../assets/img/screen/jd-1.png" class="mr-5" v-for="t in 18" :key="t">
                        </div>
                         <div class="fleft color f-14">90</div>
                    </el-col>
                     <el-col :span="24">
                       <div class="fleft ml-20 color f-14">租赁诉讼：</div>    
                        <div class="fleft">                     
                            <img src="../../assets/img/screen/jd-1.png" class="mr-5" v-for="t in 12" :key="t">
                        </div>
                         <div class="fleft color f-14">60</div>
                    </el-col>
                     <el-col :span="24">
                       <div class="fleft ml-20 color f-14">借贷诉讼：</div>    
                        <div class="fleft">                     
                            <img src="../../assets/img/screen/jd-1.png" class="mr-5" v-for="t in 8" :key="t">
                        </div>
                         <div class="fleft color f-14">40</div>
                    </el-col> -->
                  </el-row>
                </el-col>
                     <el-col :span="24" v-else>
                          <div style="height:90px;text-align:center;padding-top:60px;color:#999999"> 暂无数据</div> 
                   </el-col>
            </el-row>
            <el-row class="mt-30">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">{{this.month}}月 {{suggestdata?suggestdata.jobName:''}}行业关注议案建议</div>
                </el-col>
                <el-col :span="24" style="height:220px"  v-if='suggestdata && suggestdata.subData && suggestdata.subData.length>0'>
                  <div class="mt-20 ml-20 datapic fleft center" v-for="(t,ind) in suggestdata.subData" :key="ind"> 
                    <el-progress type="circle"  :width="70" :percentage="t.percent"></el-progress>
                    <br/>
                    <font class="c-title">{{t.CaseClassVal}}</font>
                  </div>
                  <!-- <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="58.37"></el-progress>
                    <br/>
                    <font class="c-title">贩卖假药罪</font>
                  </div>
                  <br/>
                  <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="56.64"></el-progress>
                    <br/>
                    <font class="c-title">贩毒罪</font>
                  </div>
                  <br/>
                  <div class="ml-20 datapic fleft center mt-20"> 
                    <el-progress type="circle"  :width="70" :percentage="35.27"></el-progress>
                    <br/>
                    <font class="c-title">贪污罪</font>
                  </div>
                  <div class="ml-20 datapic fleft center mt-20"> 
                    <el-progress type="circle"  :width="70" :percentage="30.29"></el-progress>
                    <br/>
                    <font class="c-title">挪用资金罪</font>
                  </div> -->
                  
                </el-col>
                 <el-col :span="24" v-else>
                          <div style="height:120px;text-align:center;padding-top:100px;color:#999999"> 暂无数据</div> 
                   </el-col>

            </el-row>
            <el-row class="mt-30">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                      
                     <div class="fleft">{{this.month}}月 工作情况分析</div>
                </el-col>
                <el-col :span="24" class="mt-20">
                  <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="80" :percentage="dp1.percent" :show-text="false"></el-progress>
                     <div style="margin-top:-70%; font-size:21px; font-weight:bold">{{dp1.total}}</div>
                    <br/>
                    <div class="c-title mt-20">联络活动</div>
                  </div>
                   <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="80" :percentage="dp2.percent" :show-text="false"></el-progress>
                     <div style="margin-top:-70%; font-size:21px; font-weight:bold">{{dp2.total}}</div>
                    <br/>
                    <div class="c-title mt-20">建议议案提案</div>
                  </div>
                   <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="80" :percentage="dp3.percent" :show-text="false"></el-progress>
                     <div style="margin-top:-70%; font-size:21px; font-weight:bold">{{dp3.total}}</div>
                    <br/>
                    <div class="c-title mt-20">关注案件</div>
                  </div>
                </el-col>
            </el-row>
             </div>
             <div class="clear"></div>
         </div>
    
        <div class="popContainer" v-if='yyjyshow'>
           <div class="content" style="height:600px">
             <div class="close" @click="yyjyshow=false"><img src="../../assets/img/screen/close.png"></div>
              <RYLB :type='1' :data='yyjydata' :random="new Date().getTime()"></RYLB>
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
import RYLB from "../Common/screen/rylb"
import {setNowTimes,getYear,birthdayMonth} from '@/assets/js/date.js'
export default {
   components:{EchartsMap,RYLB},
    data(){
      return{
         city:'北京',
         timer: null,
         nowdate:setNowTimes(),
         yearlist:getYear(),
         pd:{orgId:'0e10a51827e511ea9e3700155dbaef87'},
         year:'',
         ssfydata:[],
         casename:'科研',
         suggestname:'科研',
         casedata:[],
         suggestpd:{},
         month:'',
         monthlist:birthdayMonth(),
         workdata:[],//今日工作
         yeardata:{},
         mp1:0,
         mp2:0,
         mp3:0,
         mpsum1:0,
         mpsum2:0,
         mpsum3:0,
         dp1:{},
         dp2:{},
         dp3:{},
         countdata:[],//统计人数
         mapdata:{},//地图对象
         yyjyshow:false,
         yyjydata:{},
         mapshow:false,
         mebercount:'0',//在线人数
         hbnum:'',//环比
         tbnum:'',//同比
         caselist:[],
         casedata:{},
         suggestlist:[],
         suggestdata:{},
         num:0,
         num1:0,
       }
    },
    mounted(){
       this.year=new Date().getFullYear();
       this.month=new Date().getMonth()+1;
       this.getinit();
       this.getfirst();
       this.getMinit();
     
       this.getSSFY();
       this.timer = setInterval(() => {
        this.nowdate=setNowTimes();
      }, 1000)

      setInterval(() => {
        if(this.caselist && this.caselist.length>0)
        {
          this.num=this.num+1;
          if(this.num==this.caselist.length){
            this.num=0;
          }
         this.casedata=this.caselist[this.num];
          
        }

       if(this.suggestlist && this.suggestlist.length>0)
        {
          this.num1=this.num1+1;
          if(this.num1==this.suggestlist.length){
            this.num1=0;
          }
          this.suggestdata=this.suggestlist[this.num1];

        }
      
      }, 10000)

    },
    methods:{
      getfirst(){
        //今日工作
           let p={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year":this.year,
              },
              "itemIndex": [
                "SY_todayWork"
              ]
            }
           this.workdata=[];
           this.$api.post(this.Global.aporttj,p,
            r =>{
             if(r.code==200){
               var val=r.data.indexItemsValues.SY_todayWork.data;
               if(val && val.length>0){
                 for (let i = 0; i < 7; i++) {
                  if(val[i].title!=undefined){
                     this.workdata.push(val[i]);
                  }
                 }
               }
             }  
          });
      },
      getinit(val){
          if(val==null){
            this.mapshow=false;
            this.mapdata={};
            this.mapdata.orgId=this.pd.orgId;
            this.mapdata.year=this.year;
            this.mapshow=true;
           }
           //年度统计
           let p1={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
              },
              "itemIndex": [
                "SY_yearWork"
              ]
            }
           this.$api.post(this.Global.aporttj,p1,
            r =>{
                  if(r.code==200){
                       if(r.data.indexItemsValues.SY_yearWork){
                          var act =r.data.indexItemsValues.SY_yearWork.activityinfo;
                          this.mp1=act.percent==0?act.total:act.percent;
                     
                          var pro=r.data.indexItemsValues.SY_yearWork.proposalinfo;
                          this.mp2=pro.percent==0?pro.total:pro.percent;
                      
                          var fcase=r.data.indexItemsValues.SY_yearWork.focuscaseinfo;
                          this.mp3=fcase.percent==0?fcase.total:fcase.percent;
                  
                      }
                }  
            });

            //地图下面的总数统计
           let p6={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
              },
              "itemIndex": [
                "SY_HFYTOTAl"
              ]
            }
           this.$api.post(this.Global.aporttj,p6,
            r =>{
                  if(r.code==200){
                       if(r.data.indexItemsValues.SY_HFYTOTAl){
                          var act =r.data.indexItemsValues.SY_HFYTOTAl.activityinfo;
                          this.mpsum1=act.total;
                          var pro=r.data.indexItemsValues.SY_HFYTOTAl.proposalinfo;
                          this.mpsum2=pro.total;
                          var fcase=r.data.indexItemsValues.SY_HFYTOTAl.focuscaseinfo;
                          this.mpsum3=fcase.total;
                      }
                }  
            });

            //排行榜
           let p2={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
              },
              "itemIndex": [
                "SY_PHB"
              ]
            }
           this.$api.post(this.Global.aporttj,p2,
           
            r =>{
                  if(r.code==200){
                       if(r.data.indexItemsValues.SY_PHB){
                         var phb=r.data.indexItemsValues.SY_PHB;
                         var date=[];
                         var array=phb.date;
                        //  for (let ii = 0; ii < array.length; ii++) {
                        //   date.push(array[ii].replace("法院","").replace("人民","").replace("高级",""));
                        //  }

                         this.funphbcharts(array,phb);
                      }
                    }  
            });


           //统计各活动人数
           let p3={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
              },
              "itemIndex": [
                "SY_RSTJ"
              ]
            }
           this.$api.post(this.Global.aporttj,p3,
           
            r =>{
                  if(r.code==200){
                       if(r.data.indexItemsValues.SY_RSTJ){
                         this.countdata=r.data.indexItemsValues.SY_RSTJ.data;
                       }
                    }  
            });
      },
      getMinit(){
        //工作情况分析
         
           var yff=this.month+'';
           var yf='';
           if(yff.length==1){
            
             yf=yff.padStart(2,'0')
           }else{
             yf=yff;
           }

           let p5={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
                "Month":yf

              },
              "itemIndex": [
                "SY_MonthWork"
              ]
            }
           this.$api.post(this.Global.aporttj,p5,
            r =>{
                if(r.code==200){
                       if(r.data.indexItemsValues.SY_MonthWork){
                         this.dp1=r.data.indexItemsValues.SY_MonthWork.activityinfo;
                         this.dp2=r.data.indexItemsValues.SY_MonthWork.proposalinfo;
                         this.dp3=r.data.indexItemsValues.SY_MonthWork.focuscaseinfo;
                
      
                   
                   }
                }  
            });
            //在线人数
          let p7={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
                "Month":yf

              },
              "itemIndex": [
                "SY_DYZXRS"
              ]
            }
           this.$api.post(this.Global.aporttj,p7,
            r =>{
                if(r.code==200){
                   if(r.data.indexItemsValues.SY_DYZXRS){
                    
                        this.mebercount=r.data.indexItemsValues.SY_DYZXRS.currentMonth;
                        var  hb=r.data.indexItemsValues.SY_DYZXRS.hbPercent;
                        if(hb>0){
                          this.hbnum=hb+'%'+' ↑ ';
                        }else if(hb==0){
                          this.hbnum=hb;
                        }else{
                          this.hbnum=hb+'%'+' ↓ ';
                        }
                        var tb=r.data.indexItemsValues.SY_DYZXRS.tbPercent;
                         if(tb>0){
                          this.tbnum=tb+'%'+' ↑ ';
                        }else if(tb==0){
                          this.tbnum=tb;
                        }else{
                          this.tbnum=tb+'%'+' ↓ ';
                        }
                        this.funthecharts(r.data.indexItemsValues.SY_DYZXRS.date,r.data.indexItemsValues.SY_DYZXRS.data);
                        
                   }
                }  
            });
            
         //   行业关注案件类别
           let p8={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
                "Month":yf

              },
              "itemIndex": [
                "SY_GZANLX"
              ]
            }
           this.$api.post(this.Global.aporttj,p8,
            r =>{
                if(r.code==200){
                  //r.data.indexItemsValues.SY_GZANLX
                       if(r.data.indexItemsValues.SY_GZANLX){
                          this.caselist=r.data.indexItemsValues.SY_GZANLX.data;
                         
                           if(this.caselist && this.caselist.length>0){
                              this.casedata=this.caselist[this.num];
                           }
                           
                        }
                }  
            });


             // 行业关注议案建议
          let p9={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.pd.orgId,
                "Year": this.year,
                "Month":yf
              },
              "itemIndex": [
                "SY_GZJJLXHY"
              ]
            }
           this.$api.post(this.Global.aporttj,p9,
            r =>{
                if(r.code==200){
                          //r.data.indexItemsValues.SY_GZJJLXHY             
                       if(r.data.indexItemsValues.SY_GZJJLXHY){
                           this.suggestlist=r.data.indexItemsValues.SY_GZJJLXHY.data;
                          
                     
                           
                           //end
                           if(this.suggestlist && this.suggestlist.length>0){
                              this.suggestdata=this.suggestlist[this.num1];
                           }
                           
                        }
                }  
            });

      },
    
      //人的列表
      getMeber(type){
         
           this.yyjydata={
             "orgId":this.pd.orgId,
             "type":type,
             'year':this.year,
           }
           this.yyjyshow=true;
           
      },
      getSSFY(){
         this.$api.get(this.Global.aport1+'/org/getCourtOrg',null,
            r =>{
               if(r.code==1){
                  this.ssfydata=r.data;
               }
            });
      },
      funphbcharts(data,xdata){
       
        var phbcharts = echarts.init(document.getElementById('phbcharts'));
        let _this = this;
        phbcharts.setOption({
          color: ['#83AEDD', '#7900F0', '#3969F8', '#332EB5'],
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
            top:0,
            itemWidth:10,
            itemHeight:10,
            textStyle:{
              color:'#eeeeee',
              fontSize:14,
            },

        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '0%',
            top:'15%',
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
                 color:'#999',  //坐标的字体颜色
                 fontSize:14
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
                 fontSize:16
               },
             },
             data: data
        }
    ],
    series: [
              {
                  name: '全部工作',
                  type: 'bar',
                  data: xdata.all
              },
              {
                  name: '关注案件',
                  type: 'bar',
                  barGap: 0,
                  data: xdata.focuscaseinfo
              },
              {
                  name: '建议议案提案',
                  type: 'bar',
                  data: xdata.proposalinfo
              },
              {
                  name: '联络活动',
                  type: 'bar',
                  data: xdata.activityinfo
              },
              
           ]
        })
      },
      funthecharts(xdata,series){
        this.thecharts = echarts.init(document.getElementById('thecharts'));
        let _this = this;
          _this.thecharts.setOption({
               tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none',
                    crossStyle: {
                        color: '#999'
                    }
                },
                formatter:function(){},
              },
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
             axisLabel: {
               textStyle:{
                 color:'#8897A6',  //坐标的字体颜色
                 fontSize:16
               },
             },
             axisTick:{show:false},
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
    getTZ(t){
     
      if(t==1){
       this.$router.push({ name: "activities" });
      }else if(t==2){
        this.$router.push({ name: "suggtions" });
      }else if(t==3){
         this.$router.push({ name: "followcase" });
      }
    },
     getsubstr(n,h){
          var len= n.substr(0,h);
          if(n.length>h){
            return len+'...';
          }else{
           return n
          }
        },
      getNewline(val){
        var bytesCount=0;
        
        if(val.length>7){
           var s=val.substr(0,7)+"<br/>"+val.substr(7,val.length);
           return s;
        }else{
          return val;
        }
      },
      gettoThousands(num) {
   
        var num = (num || 0).toString(), result = '';
        while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return result;
        },
      mapfatherMethod(orgid){
        if(orgid){
       
            this.$set(this.pd,'orgId',orgid);
            this.getfirst();
            this.getinit('orgId');
            this.getMinit();
        }
      },
    }
}
</script>
