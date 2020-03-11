<template>
  <div id="myChartChina" :style="{width: '100%', height: '500px'}"></div>
</template>
<script>
import echarts from "echarts";
import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
import '../../../node_modules/echarts/map/js/province/beijing.js' // 引入中国地图数据
export default {
     name:'EchartsMap',
     data(){
         return{
              chart: null
         }
     },
    mounted() {
      this.drawLine();
    },
      beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
        drawLine(){
        this.myChartChina = echarts.init(document.getElementById('myChartChina'));
        let _this = this;
        _this.myChartChina.setOption({ // 进行相关配置
       //  backgroundColor: "#02AFDB",//背景颜色
          tooltip: {}, // 鼠标移到图里面的浮动提示框
          dataRange: {
            show: false,
            min: 0,
            max: 1000,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            color: ['#4B78B8','#72ABF4'],
            selectedMode: 'single',
          },
          
          geo: { // 这个是重点配置区
            map: 'china', // 表示中国地图
            // roam: true,//是否开启鼠标缩放和平移漫游。默认不开启。
           left: 0, top: 0, right: 0, bottom: 0,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.6)'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
              emphasis: {
                areaColor: null,// 区域颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              }
            },

          },
          series: [{
              type: 'scatter',
              
              coordinateSystem: 'geo' // 对应上方配置
            },
            {
              name: '启动次数', // 浮动框的标题
              type: 'map',
              geoIndex: 0,
             data:[               
                                      {name: '北京',value: randomData() },
                                      {name: '天津',value: randomData() },
                                      {name: '上海',value: randomData() },
                                      {name: '重庆',value: randomData() },
                                      {name: '河北',value: randomData() },
                                      {name: '河南',value: randomData() },
                                      {name: '云南',value: randomData() },
                                      {name: '辽宁',value: randomData() },
                                      {name: '黑龙江',value: randomData() },
                                      {name: '湖南',value: randomData() },
                                      {name: '安徽',value: randomData() },
                                      {name: '山东',value: randomData() },
                                      {name: '新疆',value: randomData() },
                                      {name: '江苏',value: randomData() },
                                      {name: '浙江',value: randomData() },
                                      {name: '江西',value: randomData() },
                                      {name: '湖北',value: randomData() },
                                      {name: '广西',value: randomData() },
                                      {name: '甘肃',value: randomData() },
                                      {name: '山西',value: randomData() },
                                      {name: '内蒙古',value: randomData() },
                                      {name: '陕西',value: randomData() },
                                      {name: '吉林',value: randomData() },
                                      {name: '福建',value: randomData() },
                                      {name: '贵州',value: randomData() },
                                      {name: '广东',value: randomData() },
                                      {name: '青海',value: randomData() },
                                      {name: '西藏',value: randomData() },
                                      {name: '四川',value: randomData() },
                                      {name: '宁夏',value: randomData() },
                                      {name: '海南',value: randomData() },
                                      {name: '台湾',value: randomData() },
                                      {name: '香港',value: randomData() },
                                      {name: '澳门',value: randomData() }
               ]
            }
          ]
        })
         //下钻其实就是点击事件，切换脚本而已
            _this.myChartChina.on('click', function (chinaParam) {
                console.log(chinaParam,'---');
                
                if(chinaParam.name == '北京'){
                    var option = _this.myChartChina.getOption();
                    console.log(option,'===');
                    
                    option.geo[0].map = '北京';
                    _this.myChartChina.setOption(option); 
                }                       
            });
        function randomData() {  
                return Math.round(Math.random()*500);  
            } 
      },
        
    }
  
    
}
</script>
