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
              <div class="fright mt-40 topr">北京市代表、委员、特约人员统计分析</div><div class="fright mt-40"><img src="../../assets/img/screen/left.png" class="mt-10 mr-10"></div>
             </el-col>
           </el-row>

         </div>
         <div class="main">
             <div class="fleft w-20 left mt-10">
            <el-row class="mb-25">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                   <div class="fleft ">今日工作</div>
                 </el-col>
            </el-row>
               <el-row class="l-1">
                 <el-col :span="24"  class="l-1-1">● &nbsp;&nbsp;张三的申请审批</el-col>
                 <el-col :span="24"  class="l-1-1">● &nbsp;&nbsp;企业数据经济胡统计与分析</el-col>
                 <el-col :span="24"  class="l-1-1">● &nbsp;&nbsp;张三的申请审批</el-col>
                 <el-col :span="24"  class="l-1-1">● &nbsp;&nbsp;张三的申请审批</el-col>
               </el-row>
            <el-row class="mt-40 mb-25">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">年度工作统计</div>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <img src='../../assets/img/screen/l-2.png'>
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
                  <div id='phbcharts' style='width:100%;height:300px;'></div>
              </el-col>
            </el-row>
               
             </div>
             <div class="fleft w-40 left">
               <el-row>
                 <el-col :span="6">
                    <div class="left">
                      <span class="f-30">172</span> <span class="f-14">人</span><br/>
                      <div class="f-14 pt-10">北京人大代表</div>
                    </div>
                 </el-col>
                 <el-col :span="6">
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
                 </el-col>
               </el-row>
            <el-row class="mt-60">
              <el-col :span='24'>
                <!-- <img src='../../assets/img/screen/c-2.png'> -->
                <EchartsMap></EchartsMap>
              </el-col>
            </el-row>
             <el-row class="mt-60">
              <el-col :span='8' >
                <div class="fleft"><img src="../../assets/img/screen/ic-1.png" class="mr-10"></div>    
                <div class="fleft c-3t">组织联络活动</div><br/>
                <div class="f-30 ml-40 fg">1,233,370</div>
              </el-col>
               <el-col :span='8'>
                <div class="fleft"><img src="../../assets/img/screen/ic-2.png" class="mr-10"></div>    
                <div class="fleft c-3t">办理议案建议提案</div><br/>
                <div class="f-30 ml-40 fg">5,4112,110</div>
              </el-col>
               <el-col :span='8'>
                <div class="fleft"><img src="../../assets/img/screen/ic-3.png" class="mr-10"></div>    
                <div class="fleft fg c-3t ">办理关注案件</div><br/>
                <div class="f-30 ml-40 fg">3,235,332</div>
              </el-col>
            </el-row>
             </div>
             <div class="fright w-20 left">
              <el-row class="ml-20"> 
                <el-col :span='24'>
                <span class="r-1">  当月在线人数</span>
                </el-col>
                <el-col :span='24' class="mt-10">
                  <span class="r-2 sfont">623,456,987</span>
                </el-col>
                 <el-col :span='24'>
                     <div class="fleft mt-20 color" style="line-height:30px">
                      环比 0.35% ↓ <br/>
                      同比 0.23% ↑ </div>
                     <div class="fleft" style="width:200px">
                       <div id='thecharts' style='width:100%;height:80px;'></div>
                     </div>
                </el-col>
              </el-row>
              <el-row class="mt-30">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">关注民事类型案件</div>
                </el-col>
                <el-col :span="24" class="mt-20">
                  <el-row style="line-height:25px;">
                    <el-col :span="24">
                       <div class="fleft ml-20 color f-14">财产诉讼：</div>    
                        <div class="fleft">
                            <img src="../../assets/img/screen/jd-1.png" class="mr-5" v-for="t in 20" :key="t">
                        </div>
                         <div class="fleft color f-14">100</div>
                    </el-col>
                    <el-col :span="24">
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
                    </el-col>
                  </el-row>
                </el-col>
            </el-row>
            <el-row class="mt-30">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">关注经济类型行业</div>
                </el-col>
                <el-col :span="24" class="mt-20">
                  <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="80" :percentage="67.57"></el-progress>
                    <br/>
                    <font class="c-title">贿赂罪</font>
                  </div>
                  <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="80" :percentage="58.37"></el-progress>
                    <br/>
                    <font class="c-title">贩卖假药罪</font>
                  </div>
                  <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="80" :percentage="56.64"></el-progress>
                    <br/>
                    <font class="c-title">贩毒罪</font>
                  </div>
                  <br/>
                  <div class="ml-20 datapic fleft center mt-20"> 
                    <el-progress type="circle"  :width="80" :percentage="35.27"></el-progress>
                    <br/>
                    <font class="c-title">贪污罪</font>
                  </div>
                  <div class="ml-20 datapic fleft center mt-20"> 
                    <el-progress type="circle"  :width="80" :percentage="30.29"></el-progress>
                    <br/>
                    <font class="c-title">挪用资金罪</font>
                  </div>
                  
                </el-col>
            </el-row>
            <el-row class="mt-40">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">当月工作情况分析</div>
                </el-col>
                <el-col :span="24" class="mt-20">
                  <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="80" :percentage="88.1" :show-text="false"></el-progress>
                     <div style="margin-top:-70%; font-size:21px; font-weight:bold">1000</div>
                    <br/>
                    <div class="c-title mt-20">联络活动</div>
             
                  </div>
                   <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="80" :percentage="45" :show-text="false"></el-progress>
                     <div style="margin-top:-70%; font-size:21px; font-weight:bold">600</div>
                    <br/>
                    <div class="c-title mt-20">建议议案提案</div>
                    
                  </div>
                   <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="80" :percentage="69" :show-text="false"></el-progress>
                     <div style="margin-top:-70%; font-size:21px; font-weight:bold">800</div>
                    <br/>
                    <div class="c-title mt-20">关注案件</div>
                  </div>
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
import EchartsMap from "../Common/maps"
import {setNowTimes} from '@/assets/js/date.js'
export default {
   components:{EchartsMap},
    data(){
      return{
         city:'北京',
         timer: null,
         nowdate:setNowTimes(),
       }
    },
    mounted(){
       this.thecharts(['14:00','15:00','16:00','17:00'],[0, 50.16,6, 0]);
       this.phbcharts(['河南', '河北', '广州', '上海','北京'],['关注案件', '建议议案提案', '联络活动', '全部工作']);
       this.timer = setInterval(() => {
        this.nowdate=setNowTimes();
      }, 1000)
   },
    methods:{
      phbcharts(xdata,xleg,series){
         this.phbcharts = echarts.init(document.getElementById('phbcharts'));
        let _this = this;
        _this.phbcharts.setOption({
          color: ['#332EB5', '#7900F0', '#3969F8', '#83AEDD'],
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
              color:'#eeeeee',
              fontSize:14,
            },
            data: xleg,
            
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top:'0',
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
               show:false,
               textStyle:{
                 color:'#999',  //坐标的字体颜色
                 fontSize:0
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
             data: xdata
           
        }
    ],
    series: [
        {
            name: '关注案件',
            type: 'bar',
            barGap: 0,
            data: [120, 136, 36, 78,66]
        },
        {
            name: '建议议案提案',
            type: 'bar',
            data: [110, 132, 101, 44, 90]
        },
        {
            name: '联络活动',
            type: 'bar',
            data: [45, 182, 191, 65, 88]
        },
        {
            name: '全部工作',
            type: 'bar',
            data: [135, 311, 213, 198, 134]
        },
       
     
    ]
        })
        
      },
      thecharts(xdata,series){
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
     
    }
}
</script>
