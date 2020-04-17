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
                 <el-select v-model="pd.orgId" filterable clearable default-first-option placeholder="请选择"  size="small">
                               <el-option
                                 v-for="(item,ind) in ssfydata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                </el-select>&nbsp;&nbsp;
                <el-select v-model="year"  placeholder="" style="width:80px;"   size="small">
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
                        <el-select v-model="month" placeholder="" style="width:80px;"   size="mini">
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
            <el-row class="mt-10">
              <el-col :span='24'>
                   <div class="datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="47"></el-progress>
                    <br/>
                    <div class="c-title mt-10">代表议案</div>
             
                  </div>
                  <div class=" datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="38" ></el-progress>
                    <br/>
                    <div class="c-title mt-10">建议、批评和意见</div>
             
                  </div>
                   <div class=" datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="10" ></el-progress>
                    <br/>
                    <div class="c-title mt-10">政协提案</div>
                  </div>
                   <div class="datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="2" ></el-progress>
                    <br/>
                    <div class="c-title mt-10">审议意见</div>
                  </div>
                   <div class=" datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="3" ></el-progress>
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
                <EchartsMap></EchartsMap>
              </el-col>
            </el-row>
             <el-row :class="show==true?'yamargin1':'yamargin2'">
             <el-col :span="24">
               <div class="casebg">
                 <el-row >
                   <el-col :span="6" style="padding:10px 0px 0px 30px">详细信息列表</el-col>
                   <el-col :span="18" class="sugg">
                     <el-button round size="mini" :class="num==1?'color':''" @click="getsugg(1)">全部</el-button>
                     <el-button round size="mini" :class="num==2?'color':''" @click="getsugg(2)">议案</el-button>
                     <el-button round size="mini" :class="num==3?'color':''" @click="getsugg(3)">建议</el-button>
                     <el-button round size="mini" :class="num==4?'color':''" @click="getsugg(4)">提案</el-button>
                     <el-button round size="mini" :class="num==5?'color':''" @click="getsugg(5)">审议</el-button>
                     <el-button round size="mini" :class="num==6?'color':''" @click="getsugg(6)">日常建议</el-button>
                   </el-col>
                   <el-col :span="24" class="contc1">
                       <el-row class="mb-25">
                         <el-col :span="24" class="mt-20 ml-20">
                           <el-row class="title">
                               <el-col :span="12">
                                     标题
                               </el-col>
                                <el-col :span="2">代表</el-col>
                               <el-col :span="4">身份</el-col>
                               <el-col :span="4">办理单位</el-col>
                           </el-row>
                         </el-col>
                       <el-col :span="24" class="mt-20 ml-20">
                           <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xh">1</div>    
                                    <div class="fleft overf">中新公司申请设立海事赔偿责任有限公司</div>
                               </el-col>
                                <el-col :span="2">领衔</el-col>
                               <el-col :span="4">建议、批评</el-col>
                               <el-col :span="4">广东高院</el-col>
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xh">2</div>    
                                    <div class="fleft overf">中国建设银行股份有限公司广...</div>
                               </el-col>
                               <el-col :span="2">领衔</el-col>
                               <el-col :span="4">建议、批评</el-col>
                               <el-col :span="4">广东高院</el-col>
                            
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xh">3</div>    
                                    <div class="fleft overf">安徽省外经建设(集团)有限公司</div>
                               </el-col>
                                <el-col :span="2">领衔</el-col>
                               <el-col :span="4">建议、批评</el-col>
                               <el-col :span="4">广东高院</el-col>
                           </el-row>
                           
                       </el-col>
                       <el-col :span="24" class="right"> <span class="zk" @click="getall">{{labelname}}</span></el-col>
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
              <el-col :span='24' class="mt-10 center">
               
                 <div class=" datapic fleft center" style="margin-left:15%">   
                    <el-progress type="circle"  :width="80" :percentage="39" :show-text="false"></el-progress>
                     <div style="margin-top:-70%; font-size:21px; font-weight:bold">383</div>
                    <br/>
                    <div class="c-title mt-20">重点</div>
                  </div>
                  <div class="ml-20 datapic fleft center"> 
                    <el-progress type="circle"  :width="80" :percentage="61" :show-text="false"></el-progress>
                     <div style="margin-top:-70%; font-size:21px; font-weight:bold">247</div>
                    <br/>
                    <div class="c-title mt-20">非重点</div>
                  </div>
              </el-col>
            </el-row>
               <el-row class="mt-20">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">内部科室办理情况排名</div>
                </el-col>
                <el-col :span="24" class="mt-20">
                      <ul class="new-list" :class="{anim:animate}" @mouseenter="Stop()" @mouseleave="Up()">
                      <li v-for="(t,ind) in noticeList" :key='ind'>
                        <div class="fleft ml-20 color f-14 right" style="width:28%">{{t}}环境资源厅：</div>    
                        <div class="fleft" style="padding-top:8px;">
                             <el-progress type='line' :percentage="t" :show-text="false"></el-progress>
                        </div>
                        <div class="fleft color f-14 ml-10">{{t}}</div>
                        <div class="clear"></div>
                      </li>
                    </ul>
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
                <el-col :span="24" class="mt-10">
                   <ul class="new-list" :class="{anim:animate}" @mouseenter="Stop()" @mouseleave="Up()">
                      <li v-for="(t,ind) in noticeList" :key='ind'>
                        <div class="fleft ml-20 color f-14 right" style="width:28%">{{t}}见证执行：</div>    
                        <div class="fleft">
                            <img src="../../assets/img/screen/jd-1.png" class="mr-5" v-for="t in 20" :key="t">
                        </div>
                        <div class="fleft color f-14 ml-10">457</div>
                        <div class="clear"></div>
                      </li>
                    </ul>
                 
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
import {getYear,birthdayMonth} from '@/assets/js/date.js'
export default {
   components:{EchartsMap},
    data(){
      return{
         city:'北京',
         timer: null,
         nowdate:setNowTimes(),
         ssfydata:[],
         pd:{orgId:'0e10a51827e511ea9e3700155dbaef87'},
         year:'2019',
         yearlist:getYear(),
         month:'1',
         monthlist:birthdayMonth(),
         noticeList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
         animate:false,
         intNum: undefined,
         num:1,
         show:true,
         labelname:'展开',
       }
    },
    mounted(){
       this.phbcharts(['4月', '3月', '2月', '1月'],['代表议案未办结', '代表议案已办结','总数']);
       this.yearcharts(['2020', '2019', '2018', '2017','2016','2015','2014','2013','2012','2011','2010']);
      //  this.handlecharts(['1','2','3','4','5','6','7','8','9','10','11','12']);
       this.getSSFY();
      //  this.monthcharts();
       this.sljdcharts();
       this.rjcharts(['1','2','3','4']);
       this.ScrollUp();
       this.timer = setInterval(() => {
        this.nowdate=setNowTimes();
      }, 1000)
   },
    methods:{
        yearcharts(xdata){
        this.yearcharts = echarts.init(document.getElementById('yearcharts'));
        let _this = this;
        _this.yearcharts.setOption({
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
             data: xdata
           
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

             }

          ],
          grid: {
            left: '8%',
            right: '4%',
            bottom: '36%',
            top:'5%',
          },
        series: [
          {
              name: '总数',
              type: 'bar',
              // barGap: 0,
              data: [398, 333, 581, 356,403,420,604,574,658,673,520]
          },
          {
              name: '代表议案',
              type: 'bar',
              data: [31, 78, 150, 145, 56,27,23,81,187,126,162]
          },
          {
              name: '建议、批评与意见',
              type: 'bar',
              data: [129, 15, 95, 103, 90,69,119,138,142,168,13]
          },
          {
              name: '政协提案',
              type: 'bar',
              data: [101, 176, 173, 0, 180,123,132,162,187,144,16]
          },
          {
              name: '审议意见',
              type: 'bar',
              data: [15, 16, 4, 30, 3,41,39,47,5,33,35]
          },
          {
              name: '日常意见建议',
              type: 'bar',
              data: [122, 48, 159, 78, 74,160,291,146,137,203,294]
          },
        
          ]
          })
        },
        //年度办理情况
        handlecharts(xdata){
        this.handlecharts = echarts.init(document.getElementById('handlecharts'));
        let _this = this;
        _this.handlecharts.setOption({
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
      phbcharts(xdata,xleg,series){
         this.phbcharts = echarts.init(document.getElementById('phbcharts'));
        let _this = this;
        _this.phbcharts.setOption({
          color: ['#7900F0', '#332EB5', '#3969F8', '#83AEDD'],
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
            data: xleg,
            
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
                    data: xdata
                  
                }
            ],
            series: [
                {
                    name: '代表议案未办结',
                    type: 'bar',
                    barGap: 0,
                    data: [120, 136, 36, 78,66]
                },
                {
                    name: '代表议案已办结',
                    type: 'bar',
                    data: [110, 132, 101, 44, 90]
                },
                {
                    name: '总数',
                    type: 'bar',
                    data: [110, 132, 101, 44, 90]
                },
              
                ]
                })
                
      },
     
      monthcharts(xdata,series){
        this.monthcharts = echarts.init(document.getElementById('monthcharts'));
        let _this = this;
          _this.monthcharts.setOption({
           radar: {
                    name:{
                      color:"#eeeeee"  
                    },
                    axisLine:{show:false},
                    axisTick:{show:false},
                    splitLine:{show:false},
                    splitArea:{show:false},
                    indicator: [
                        { name: '刑事案件', max: 6500},
                        { name: '民事案件', max: 16000},
                        { name: '行政案件', max: 30000},
                        { name: '赔偿案件', max: 38000},
                        { name: '执行案件', max: 52000},
                        { name: '其他案件', max: 82000},
                    ]
                },
                series: [{

                    type: 'radar',
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000,50000],
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
                        {
                            value: [5000, 3900, 25000, 28000, 35000,70000],
                            areaStyle: {
                                color: 'rgba(50,88,205,0.4)'
                            },
                             lineStyle:{
                                  color: 'rgba(20,48,114)'
                            },
                            itemStyle:{
                               borderWidth:0,
                              
                            },
                            symbol:'none',

                        },
                        {
                            value: [6450, 15000, 10000, 30000, 18000,10000],
                            areaStyle: {
                                color: 'rgba(50,88,205,0.3)'
                            },
                             lineStyle:{
                                  color: 'rgba(20,48,114)'
                            },
                            itemStyle:{
                               borderWidth:0,
                            },
                             symbol:'none',
                        },
                       {
                            value: [5000, 10000, 30000, 3000, 40000,20000],
                            areaStyle: {
                                color: 'rgba(50,88,205,0.5)'
                            },
                             lineStyle:{
                                  color: 'rgba(20,48,114.0.7)'
                            },
                            itemStyle:{
                               borderWidth:0,
                            },
                             symbol:'none',
                        },
                        {
                            value: [2000, 8000, 9000, 10000, 20000,50000],
                            areaStyle: {
                                color: 'rgba(50,88,205,0.7)'
                            },
                             lineStyle:{
                                   color: 'rgba(20,48,114,0.8)'
                            },
                            itemStyle:{
                               borderWidth:0,
                               
                            },
                             symbol:'none',
                        },
                        {
                            value: [3000, 6000, 15000, 10000, 20000,60000],
                            areaStyle: {
                                color: 'rgba(50,88,205,0.7)'
                            },
                             lineStyle:{
                                   color: 'rgba(20,48,114,0.8)'
                            },
                            itemStyle:{
                               borderWidth:0,
                               
                            },
                             symbol:'none',
                        }
                    ]
                }]
          });
       },
       //饼图
       sljdcharts(){
          this.sljdcharts = echarts.init(document.getElementById('sljdcharts'));
        let _this = this;
          _this.sljdcharts.setOption({
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
                        { name: '议案', max: 50000},
                        { name: '建议', max: 50000},
                        { name: '提案', max: 50000},
                        { name: '审议', max: 50000},
                        { name: '日常建议', max: 50000},
                    ]
                },
                series: [{
                  
                    type: 'radar',
                    data: [
                        {
                           name:'开展活动',
                           value: [45000, 30000, 28000, 35000, 50000],
                            
                            
                        },
                        {   
                           name:'未开展活动',
                           
                           value: [25000, 35000, 15000, 39000, 48000],
                          
                        },
                        
                    ]
                }]

         });
       },
       rjcharts(xdata){
          this.rjcharts = echarts.init(document.getElementById('rjcharts'));
          let _this = this;
          _this.rjcharts.setOption({
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
                        data: [192,390,510,636]
                    },
                    {
                        name: '消化',
                        type: 'line',
                        smooth: true,
                        data: [606,598,509,519]
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
              that.noticeList.push(that.noticeList[0]);// 将数组的第一个元素添加到数组的
              that.noticeList.shift(); //删除数组的第一个元素
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
        getsugg(t){
          this.num=t;

        },
        getall(){
          this.show=!this.show;
          if(this.show){
            this.labelname="展开";
          }else{
           this.labelname="收起";
          }
        },
     
    }
}
</script>
<style scoped>
.sugg{text-align:right}
.sugg .el-button--mini, .el-button--mini.is-round{
    padding: 5px 20px!important;
    background: #0E2C6A;
    color: #4C85D4;
    border: 1px solid #528FE0;
}
.sugg .color{
  color: #ffffff;
}
 .yamargin1{
  margin:9% 10% 0 10%
}
 .yamargin2{
  margin:0 10% 0 10%;
   background-color: rgba(63,95,154,0.1);
}

</style>
