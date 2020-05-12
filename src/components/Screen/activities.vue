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
              <div class="fright mt-20 topr" style="min-width:340px;text-align:left">联络活动分析</div><div class="fright mt-20"><img src="../../assets/img/screen/left.png" class="mt-10 mr-10"></div>
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
                     <div class="fleft" > {{year}} 年度联络活动办理情况</div>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <div id='handlecharts' style='width:100%;height:200px;'></div>
              </el-col>
            </el-row>
            <el-row class="mt-30">
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
                     <div class="fleft" style="padding:5px 0px 0px 8px">月各类型活动占比</div>
                </el-col>
            </el-row>
            <el-row class="mt-10">
              <el-col :span='24'>
                   <div class="datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="47"></el-progress>
                    <br/>
                    <div class="c-title mt-10">结对活动</div>
             
                  </div>
                  <div class="ml-10 datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="38" ></el-progress>
                    <br/>
                    <div class="c-title mt-10">专项视察</div>
             
                  </div>
                   <div class="ml-10 datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="10" ></el-progress>
                    <br/>
                    <div class="c-title mt-10">专项调研</div>
                  </div>
              </el-col>
            </el-row>
               <el-row class="mt-20">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">活动关联关注案件、议案建议分析</div>
                </el-col>
                
               </el-row>
                 <el-row>
                   <el-col :span="24">
                     <div id='phbcharts' style='width:100%;height:200px;'></div>
                   </el-col>
                 
                 </el-row>

             </div>
             <div class="fleft w-50 left">
              
            <el-row  style="margin:10% 11% 0 10%" v-if='show'>
              <el-col :span='24'>
                    <EchartsMap :sdata='mapdata' :random="new Date().getTime()"  @mapfatherMethod="mapfatherMethod" ></EchartsMap>
              </el-col>
            </el-row>
             <el-row :class="show==true?'yamargin1':'yamargin2'">
             <el-col :span="24">
               <div class="casebg">
                 <el-row >
                   <el-col :span="6" style="padding:10px 0px 0px 30px">联络活动列表</el-col>
                    <el-col :span="18" class="sugg">
                     <el-button round size="mini" :class="num==1?'color':''" @click="getsugg(1)">全部</el-button>
                     <el-button round size="mini" :class="num==2?'color':''" @click="getsugg(2,'0204000001')">结对活动</el-button>
                     <el-button round size="mini" :class="num==3?'color':''" @click="getsugg(3,'0204000003')">专项视察</el-button>
                     <el-button round size="mini" :class="num==4?'color':''" @click="getsugg(4,'0204000002')">专项调研</el-button>
                     <el-button round size="mini" :class="num==5?'color':''" @click="getsugg(5,'0204000004')">旁听庭审</el-button>
               
                   </el-col>
                   <el-col :span="24" class="contc1">
                       <el-row class="mb-25">
                         <el-col :span="24" class="mt-20 ml-20 mr-20">
                           <el-row class="title">
                             <el-col :span="6">
                                     活动主题
                               </el-col>
                               <el-col :span="5">
                                     开始时间
                               </el-col>
                               <el-col :span="5">
                                     结束时间
                               </el-col>
                                <el-col :span="4">类型</el-col>
                               <el-col :span="4">地点</el-col>
                               
                           </el-row>
                         </el-col>
                       <el-col :span="24" class="mt-20 ml-20 mr-20">
                           <el-row class="listl">
                               <el-col :span="6" class="f-15">
                                    <div class="fleft xhs">1</div>    
                                    <div class="fleft overf">周强结对王云</div>
                               </el-col>
                                <el-col :span="5">2010-10-02</el-col>
                                 <el-col :span="5">2012-10-02</el-col>
                               <el-col :span="4">结对活动</el-col>
                               <el-col :span="4">广东高院</el-col>
                           </el-row>
                            <el-row class="listl">
                                 <el-col :span="6" class="f-15">
                                    <div class="fleft xhs">2</div>    
                                    <div class="fleft overf">周强结对王云</div>
                               </el-col>
                                <el-col :span="5">2010-10-02</el-col>
                                 <el-col :span="5">2012-10-02</el-col>
                               <el-col :span="4">结对活动</el-col>
                               <el-col :span="4">广东高院</el-col>
                            
                           </el-row>
                            <el-row class="listl">
                                 <el-col :span="6" class="f-15">
                                    <div class="fleft xhs">3</div>    
                                    <div class="fleft overf">周强结对王云</div>
                               </el-col>
                                <el-col :span="5">2010-10-02</el-col>
                                 <el-col :span="5">2012-10-02</el-col>
                               <el-col :span="4">结对活动</el-col>
                               <el-col :span="4">广东高院</el-col>
                           </el-row>
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
                     <div class="fleft ">活动时间占比</div>
                </el-col>
              <el-col :span='24'>
                   <div id="hdsjcharts" style="width:100%;height:180px;"></div>
              </el-col>
            </el-row>
               <el-row class="mt-10">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">内部厅室活动数量排名</div>
                </el-col>
               <el-col :span="24" class="mt-10" v-if='noticeList && noticeList.length>0'>
                      <ul class="new-list" :class="{anim:animate}" @mouseenter="Stop()" @mouseleave="Up()">
                      <li v-for="(t,ind) in noticeList" :key='ind'>
                        <div class="fleft ml-20 color f-14 right" style="width:30%" :title="t.name">{{ t.name.substr(0,5)}}：</div>    
                        <div class="fleft" style="padding-top:8px;">
                             <el-progress type='line' :percentage="t.percent" :show-text="false"></el-progress>
                        </div>
                        <div class="fleft color f-14 ml-10">{{t.value}}</div>
                        <div class="clear"></div>
                      </li>
                    </ul>
                </el-col>
                <el-col :span="24" style="height:100px;" v-else>
               <div style="text-align:center;padding-top:80px;color:#999999"> 暂无数据</div> 
              </el-col>
            </el-row>
            <el-row class="mt-10">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">联络对象身份类别统计</div>
                </el-col>
                <el-col :span="24" class="mt-20">
                 <div id="sljdcharts" style="width:100%;height:250px;"></div>
                </el-col>
            </el-row>
              <el-row class="mt-10">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">活动成效排名</div>
                </el-col>
                 <el-col :span="24"  v-if='hdcxList && hdcxList.length>0'>
                      <ul class="new-list" style="height:120px;" :class="{anim:animate1}" @mouseenter="Stop1()" @mouseleave="Up1()">
                      <li v-for="(t,ind) in hdcxList" :key='ind'>
                        <div class="fleft ml-20 color f-14 right" style="width:30%">{{t.name}}：</div>    
                        <div class="fleft" style="padding-top:8px;">
                             <el-progress type='line' :percentage="t.percent" :show-text="false"></el-progress>
                        </div>
                        <div class="fleft color f-14 ml-10">{{t.value}}</div>
                        <div class="clear"></div>
                      </li>
                    </ul>
                </el-col>
                <el-col :span="24" style="height:120px;" v-else>
               <div style="text-align:center;padding-top:80px;color:#999999"> 暂无数据</div> 
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
         CurrentPage: 1,
         pageSize: 3,
         TotalResult: 0,
         city:'北京',
         timer: null,
         nowdate:setNowTimes(),
         ssfydata:[],
         pd:{orgId:'0e10a51827e511ea9e3700155dbaef87'},
         year:'2019',
         yearlist:getYear(),
         month:'1',
         monthlist:birthdayMonth(),
         labelname:'展开',
         show:true,
         num:1,
         noticeList:[
           {name:'行六厅',percent:50,value:50},
           {name:'办公厅',percent:20,value:30},
           {name:'立案庭',percent:10,value:20},
            {name:'民事审判第三庭',percent:50,value:50},
           {name:'研究室',percent:20,value:30},
           {name:'第三巡回法庭',percent:10,value:20},
            {name:'人民法院出版社',percent:50,value:50},
           {name:'执行局',percent:20,value:30},
           {name:'环境资源庭',percent:10,value:20},
           ],
         hdcxList:[
           {name:'结对活动',percent:50,value:50},
           {name:'专项视察',percent:20,value:30},
           {name:'专项调研',percent:10,value:20},
           {name:'见证执行',percent:10,value:20},
           {name:'日常沟通',percent:50,value:50},
           {name:'新闻宣传',percent:20,value:30},
           {name:'接待走访',percent:10,value:20},
           {name:'会议座谈',percent:10,value:20},
           ],
          intNum: undefined,
          intNum1:undefined,
          animate:false,
          animate1:false,
          mapdata:{},
       }
    },
    mounted(){
      this.getinit();
       this.phbcharts(['1', '2', '3', '4','5'],['议案建议', '关注案件','无关联']);
       this.yearcharts(['2020', '2019', '2018', '2017','2016','2015','2014','2013','2012','2011','2010']);
       this.handlecharts(['1','2','3','4','5','6','7','8','9','10','11','12']);
       this.getSSFY();
       this.funhdsjcharts();
      //  this.monthcharts();
       this.sljdcharts();
        this.ScrollUp(); this.ScrollUp1();
       this.timer = setInterval(() => {
        this.nowdate=setNowTimes();
      }, 1000)
   },
    methods:{
      getinit(){
            this.mapdata={};
            this.mapdata.orgId=this.pd.orgId;
            this.mapdata.year=this.year;
      },
        yearcharts(xdata){
        this.yearcharts = echarts.init(document.getElementById('yearcharts'));
        let _this = this;
        _this.yearcharts.setOption({
        color: ['#83AEDD', '#7900F0'],
        legend: {
            bottom:0,
            itemWidth:10,
            itemHeight:10,
            textStyle:{
              color:'#eeeeee',
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
                 color:'#cccccc',  //坐标的字体颜色
                 fontSize:10
                  },
                },
                splitLine:{show:false},

             }

          ],
          grid: {
            left: '8%',
            right: '10%',
            bottom: '25%',
            top:'10%',
          },
        series: [
          {
              name: '总数',
              type: 'bar',
              // barGap: 0,
              data: [185, 106, 43, 88,85,71,72,154,65,200,190]
          },
          {
              name: '办结',
              type: 'bar',
              data: [113, 36, 17, 62, 78,63,39,58,51,119,107]
          },
        
          ]
          })
        },
        //年度办理情况
        handlecharts(xdata){
         var handlecharts = echarts.init(document.getElementById('handlecharts'));
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
                  color:'#eeeeee',
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
              color:'#eeeeee',
              fontSize:14,
            },
    
        },
        grid: {
            left: '3%',
            right: '4%',
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
            name: '关联关注案件',
            type: 'bar',
            barGap: 0,
            data: [120, 136, 36, 78,66]
        },
        {
            name: '关联议案建议',
            type: 'bar',
            data: [110, 132, 101, 44, 90]
        },
        {
            name: '无关联',
            type: 'bar',
            data: [13, 112, 85, 59, 150]
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
       sljdcharts(){
          var sljdcharts = echarts.init(document.getElementById('sljdcharts'));
        let _this = this;
           sljdcharts.setOption({
            color: ['#3969F8', '#83AEDD', '#DBDBB7', '#332EB5'],
                tooltip: {},
                legend: {
                },
                radar: {
                    // shape: 'circle',
                    name:{
                          color:"#eeeeee"  
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
                        { name: '人大代表', max: 6500},
                        { name: '政协委员', max: 16000},
                        { name: '特约监督员', max: 30000},
                        { name: '特邀咨询员', max: 38000},
                    ]
                },
                series: [{
                    name: '类别统计',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000],
                        },
                    ]
                }]
        });
       },
       funhdsjcharts(data,xdata){
            var hdsjcharts = echarts.init(document.getElementById('hdsjcharts'));
          
             hdsjcharts.setOption({
                    color:['#83AEDD'],
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                         axisLine:{show:false},
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
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
                    },
                     grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '15%',
                      top:'10%',
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                          show:false,
                         },
                        splitLine:{show:false},
                        axisLine:{show:false},
                    },
                    series: [{
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        areaStyle: {}
                    }]
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
         getall(){
          this.show=!this.show;
          if(this.show){
            this.pageSize=3;
            //this.getlist(this.CurrentPage,this.pageSize,this.protype);
            this.labelname="展开";
          }else{
           this.pageSize=20;
            //this.getlist(this.CurrentPage,this.pageSize,this.protype);
           this.labelname="收起";
          }
        },
          getsugg(t,type){
          this.num=t;
          this.CurrentPage=1;
          //this.getlist(this.CurrentPage,this.pageSize,type);
        },
      ScrollUp() {

            this.intNum = setInterval(() => {
              this.animate=true;// 向上滚动的时候需要添加css3过渡动画
              var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
              setTimeout(()=>{
                if(this.noticeList && this.noticeList.length>0){
                that.noticeList.push(that.noticeList[0]);// 将数组的第一个元素添加到数组的
                that.noticeList.shift(); //删除数组的第一个元素
                that.animate=!that.animate;
                 }
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
          ScrollUp1() {

            this.intNum1 = setInterval(() => {
              this.animate1=true;// 向上滚动的时候需要添加css3过渡动画
              var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
              setTimeout(()=>{
                if(this.hdcxList && this.hdcxList.length>0){
                that.hdcxList.push(that.hdcxList[0]);// 将数组的第一个元素添加到数组的
                that.hdcxList.shift(); //删除数组的第一个元素
                that.animate1=!that.animate1;
                 }
              },0)
            }, 1000);
        
        },
         //鼠标移上去停止
        Stop1() {
          clearInterval(this.intNum1);
        },
        Up1() {
          this.ScrollUp();
        },
      mapfatherMethod(orgid){
        if(orgid){
       
            this.$set(this.pd,'orgId',orgid);
           
        }
      },
     
    }
}
</script>
