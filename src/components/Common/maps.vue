<template>
 <div>
  <div style="text-align:right;" v-if='bj!=0'> <el-button type="primary" size="small" @click="back">返回</el-button></div> 
  <div id="myChartChina" :style="{width: '100%', height: '500px'}"></div>
  
 </div>
</template>
<script>
import echarts from "echarts";
import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
import '../../../node_modules/echarts/map/js/province/beijing.js' // 北京
import '../../../node_modules/echarts/map/js/province/hebei.js' // 河北
import '../../../node_modules/echarts/map/js/province/tianjin.js' // 天津
import '../../../node_modules/echarts/map/js/province/anhui.js' // 安徽
import '../../../node_modules/echarts/map/js/province/chongqing.js' //重庆
import '../../../node_modules/echarts/map/js/province/fujian.js' // 福建
import '../../../node_modules/echarts/map/js/province/gansu.js' // 甘肃
import '../../../node_modules/echarts/map/js/province/guangdong.js' // 广东
import '../../../node_modules/echarts/map/js/province/guangxi.js' // 广西
import '../../../node_modules/echarts/map/js/province/guizhou.js' // 贵州
import '../../../node_modules/echarts/map/js/province/hainan.js' // 海南
import '../../../node_modules/echarts/map/js/province/heilongjiang.js' // 黑龙江
import '../../../node_modules/echarts/map/js/province/henan.js' // 河南
import '../../../node_modules/echarts/map/js/province/hubei.js' // 湖北
import '../../../node_modules/echarts/map/js/province/hunan.js' // 湖南
import '../../../node_modules/echarts/map/js/province/jiangsu.js' // 江苏
import '../../../node_modules/echarts/map/js/province/jiangxi.js' // 江西
import '../../../node_modules/echarts/map/js/province/jilin.js' // 吉林
import '../../../node_modules/echarts/map/js/province/liaoning.js' // 辽宁
import '../../../node_modules/echarts/map/js/province/neimenggu.js' // 内蒙古
import '../../../node_modules/echarts/map/js/province/ningxia.js' // 宁夏
import '../../../node_modules/echarts/map/js/province/qinghai.js' // 青海
import '../../../node_modules/echarts/map/js/province/shandong.js' // 山东
import '../../../node_modules/echarts/map/js/province/shanghai.js' // 上海
import '../../../node_modules/echarts/map/js/province/shanxi.js' // 山西
import '../../../node_modules/echarts/map/js/province/shanxi1.js' // 陕西
import '../../../node_modules/echarts/map/js/province/sichuan.js' // 四川
import '../../../node_modules/echarts/map/js/province/taiwan.js' // 台湾
import '../../../node_modules/echarts/map/js/province/xianggang.js' // 香港
import '../../../node_modules/echarts/map/js/province/xinjiang.js' // 新疆
import '../../../node_modules/echarts/map/js/province/xizang.js' // 西藏
import '../../../node_modules/echarts/map/js/province/yunnan.js' // 云南
import '../../../node_modules/echarts/map/js/province/zhejiang.js' // 浙江


export default {
     name:'EchartsMap',
      props: ['sdata'],
     data(){
         return{
              chart: null,
              data:[],
              bj:0,
              maptype:'china',
         }
     },
    mounted() {
      console.log(this.sdata,'this.data');
      this.getinit();
  
    },
      beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {

       getinit(){
           //中间地图
           let p8={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": '0e10a51827e511ea9e3700155dbaef87',
                "Year": '2020',
              },
              "itemIndex": [
                "YiAn_centermap"
              ]
            }
           this.$api.post(this.Global.aporttj,p8,
            r =>{
                    console.log(JSON.stringify(r));
                    if(r.code==200){
                          this.getInfo();
                          this.drawLine(this.data,this.maptype);
                          
                    }  
            });
       },
        back(){
           this.bj=this.bj-1;
           this.drawLine(this.data,this.maptype);
        },
        drawLine(data,maptype){
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
            map: maptype, // 表示中国地图
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
                // areaColor: '#1E4586',
                // borderWidth: 0,
                // shadowColor: 'rgba(30,69,134, 1)',
                // shadowBlur: 100
              },
              emphasis: {
                areaColor:null,// 区域颜色
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
              name: '', // 浮动框的标题
              type: 'map',
              geoIndex: 0,
              data:data,
            }
          ]
        })

        function getNext(name){
                var option = _this.myChartChina.getOption();
                    option.geo[0].map = name;
                    option.series[1].data = _this.getInfo(name);
                    _this.myChartChina.setOption(option); 
        }
         //下钻其实就是点击事件，切换脚本而已
            _this.myChartChina.on('click', function (chinaParam) {
              var arr="";
                switch (chinaParam.name) {
                  case "北京":
                    arr="北京";
                    _this.bj=1;
                    break;
                  case "河北":
                    arr="河北";
                    _this.bj=1;
                    break;
                  case "天津":
                    arr="天津";
                    _this.bj=1;
                    break;
                   case "吉林":
                    arr="吉林";
                    _this.bj=1;
                    break;
                  case "黑龙江":
                    arr="黑龙江";
                    _this.bj=1;
                    break;
                   case "上海":
                    arr="上海";
                    _this.bj=1;
                    break;
                   case "重庆":
                    arr="重庆";
                    _this.bj=1;
                    break;
                   case "辽宁":
                    arr="辽宁";
                    _this.bj=1;
                    break;
                   case "安徽":
                    arr="安徽";
                    _this.bj=1;
                    break;
                   case "内蒙古":
                    arr="内蒙古";
                    _this.bj=1;
                    break;
                   case "河南":
                    arr="河南";
                    _this.bj=1;
                    break;
                   case "山西":
                    arr="山西";
                    _this.bj=1;
                    break;
                    case "陕西":
                    arr="陕西";
                    _this.bj=1;
                    break;
                   case "山东":
                    arr="山东";
                    _this.bj=1;
                    break;
                  case "甘肃":
                    arr="甘肃";
                    _this.bj=1;
                    break;
                  case "西藏":
                    arr="西藏";
                    _this.bj=1;
                    break;
                  case "新疆":
                    arr="新疆";
                    _this.bj=1;
                    break;
                  case "青海":
                    arr="青海";
                    _this.bj=1;
                    break;
                   case "宁夏":
                    arr="宁夏";
                    _this.bj=1;
                    break;
                  case "江西":
                    arr="江西";
                    _this.bj=1;
                    break;
                  case "湖北":
                    arr="湖北";
                    _this.bj=1;
                    break;
                  case "湖南":
                    arr="湖南";
                    _this.bj=1;
                    break;
                  case "贵州":
                    arr="贵州";
                    _this.bj=1;
                    break;
                  case "云南":
                    arr="云南";
                    _this.bj=1;
                    break;
                   case "四川":
                    arr="四川";
                    _this.bj=1;
                    break;
                   case "广东":
                    arr="广东";
                    _this.bj=1;
                    break;
                   case "广西":
                    arr="广西";
                    _this.bj=1;
                    break;
                   case "浙江":
                    arr="浙江";
                    _this.bj=1;
                    break;
                   case "江苏":
                    arr="江苏";
                    _this.bj=1;
                    break;
                  case "福建":
                    arr="福建";
                    _this.bj=1;
                    break;
                  case "海南":
                    arr="海南";
                    _this.bj=1;
                    break;
                   case "台湾":
                    arr="台湾";
                    _this.bj=1;
                    break;
                   case "香港":
                    arr="香港";
                    _this.bj=1;
                    break;
                  default:
                    break;
                }
               if(arr!=''){
                 getNext(arr);
               }
            });
        
      },
      getInfo(val){
        switch (val) {
          case '北京':
           return [
              { name: '延庆区', value: 31.4, lng: 115.981186, lat: 40.462706 },
              { name: '怀柔区', value: 38.4, lng: 116.63853, lat: 40.322563 },
              { name: '密云区', value: 47.9, lng: 116.849551, lat: 40.382999 },
              { name: '昌平区', value: 196.3, lng: 116.237832, lat: 40.226854 },
              { name: '顺义区', value: 102, lng: 116.663242, lat: 40.1362 },
              { name: '平谷区', value: 42.3, lng: 117.128025, lat: 40.147115 },
              { name: '门头沟区', value: 30.8, lng: 116.108179, lat: 39.94648 },
              { name: '海淀区', value: 369.4, lng: 116.304872, lat: 39.96553 },
              { name: '石景山区', value: 65.2, lng: 116.229612, lat: 39.912017 },
              { name: '西城区', value: 129.8, lng: 116.372397, lat: 39.918561 },
              { name: '东城区', value: 90.5, lng: 116.42272, lat: 39.934579 },
              { name: '朝阳区', value: 395.5, lng: 116.449767, lat: 39.927254 },
              { name: '通州区', value: 137.8, lng: 116.662928, lat: 39.917001 },
              { name: '大兴区', value: 156.2, lng: 116.348053, lat: 39.732833 },
              { name: '房山区', value: 104.6, lng: 116.149892, lat: 39.755039 },
              { name: '丰台区', value: 232.4, lng: 116.293105, lat: 39.865042 }
            ]
            break;
            case '天津':
              return [
                  {"name": "宝坻区", "value": 72.1},
                  {"name": "和平区","value": 41.97},
                  {"name": "河东区","value": 74.47},
                  {"name": "河西区","value": 82.22},
                  {"name": "南开区","value": 85.95},
                  {"name": "河北区","value": 62.12},
                  {"name": "红桥区","value": 50.22},
                  {"name": "东丽区","value": 38.59},
                  {"name": "西青区","value": 41.4},
                  {"name": "津南区","value": 46.28},
                  {"name": "北辰区","value": 41.37},
                  {"name": "武清区","value": 94.98},
                  {"name": "滨海新区","value": 298.42},
                  {"name": "宁河区","value": 49.39},
                  {"name": "静海区","value": 79.03}
                ]
              break;
         case '河北':
           return [
                {"name": "石家庄市","value": 1015.12},
                {"name": "唐山市","value": 784.36},
                {"name": "秦皇岛市","value": 309.46},
                {"name": "邯郸市","value": 949.28},
                {"name": "邢台市","value": 731.99},
                {"name": "保定市","value": 1042.53},
                {"name": "张家口市","value": 442.51},
                {"name": "承德市","value": 353.18},
                {"name": "沧州市","value": 750.55},
                {"name": "廊坊市","value": 461.5},
                {"name": "衡水市","value": 445.31}
               ]
            break;
          case '上海':
            return [
                {"name": "黄浦区","value": 85.2476},
                {"name": "徐汇区","value": 108.513},
                {"name": "长宁区","value": 69.0571},
                {"name": "静安区","value": 24.6788},
                {"name": "普陀区","value": 128.8881},
                {"name": "虹口区","value": 85.2476},
                {"name": "杨浦区","value": 131.3222},
                {"name": "闵行区","value": 242.9372},
                {"name": "宝山区","value": 190.4886},
                {"name": "嘉定区","value": 147.1231},
                {"name": "浦东新区","value": 504.443},
                {"name": "金山区","value": 73.241},
                {"name": "松江区","value": 158.2398},
                {"name": "青浦区","value": 108.1022},
                {"name": "奉贤区","value": 108.3463},
                {"name": "崇明区","value": 70.3722}
                ]
            break;
         case '重庆':
           return  [
                {"name": "万州区","value": 160.74},
                {"name": "涪陵区","value": 114.08},
                {"name": "渝中区","value": 64.95},
                {"name": "大渡口区","value": 33.27},
                {"name": "江北区","value": 84.98},
                {"name": "沙坪坝区","value": 112.83},
                {"name": "九龙坡区","value": 118.69},
                {"name": "南岸区","value": 85.81},
                {"name": "北碚区","value": 78.62},
                {"name": "綦江区","value": 107.84},
                {"name": "大足区","value": 76.39},
                {"name": "渝北区","value": 155.09},
                {"name": "巴南区","value": 100.58},
                {"name": "黔江区","value": 46.2},
                {"name": "长寿区","value": 82.43},
                {"name": "江津区","value": 133.19},
                {"name": "合川区","value": 136.06},
                {"name": "永川区","value": 109.61},
                {"name": "南川区","value": 56.43},
                {"name": "璧山区","value": 72.52},
                {"name": "铜梁区","value": 68.72},
                {"name": "潼南区","value": 68.23},
                {"name": "荣昌区","value": 70.1},
                {"name": "开州区","value": 169.12},
                {"name": "云阳县","value": 89.66},
                {"name": "城口县","value": 18.63},
                {"name": "巫山县","value": 46.23},
                {"name": "巫溪县","value": 39.1},
                {"name": "奉节县","value": 75.33},
                {"name": "梁平县","value": 66.4},
                {"name": "垫江县","value": 67.67},
                {"name": "武隆县","value": 41.44},
                {"name": "丰都县","value": 59.56},
                {"name": "忠县","value": 70.8},
                {"name": "石柱土家族自治县","value": 38.65},
                {"name": "彭水苗族土家族自治县","value": 50.64},
                {"name": "秀山土家族苗族自治县","value": 49.13},
                {"name": "酉阳土家族苗族自治县","value": 55.65}
              ]

          break;
          case '黑龙江':
            return[
                {"name": "大兴安岭地区","value": 51.16},
                {"name": "黑河市","value": 167.39},
                {"name": "齐齐哈尔市","value": 536.7},
                {"name": "大庆市","value": 293.34},
                {"name": "伊春市","value": 114.81},
                {"name": "绥化市","value": 541.64},
                {"name": "鹤岗市","value": 105.87},
                {"name": "佳木斯市","value": 255.21},
                {"name": "双鸭山市","value": 146.26},
                {"name": "七台河市","value": 92.04},
                {"name": "鸡西市","value": 186.22},
                {"name": "牡丹江市","value": 278.3},
                {"name": "哈尔滨市","value": 1066.5}
              ]
            break;
            case '吉林':
              return [
                {"name": "白城市","value": 203},
                {"name": "松原市","value": 288},
                {"name": "长春市","value": 767},
                {"name": "四平市","value": 338},
                {"name": "吉林市","value": 441},
                {"name": "辽源市","value": 117},
                {"name": "白山市","value": 129},
                {"name": "通化市","value": 232},
                {"name": "延边朝鲜族自治州","value": 227}
              ]
              break;
           case '辽宁':
             return[
                {"name": "沈阳市","value": 739.4},
                {"name": "大连市","value": 580.1},
                {"name": "鞍山市","value": 354.1},
                {"name": "抚顺市","value": 227},
                {"name": "本溪市","value": 156.7},
                {"name": "丹东市","value": 240},
                {"name": "锦州市","value": 307},
                {"name": "营口市","value": 230},
                {"name": "阜新市","value": 190},
                {"name": "辽阳市","value": 127},
                {"name": "盘锦市","value": 150},
                {"name": "铁岭市","value": 316.99},
                {"name": "朝阳市","value": 330},
                {"name": "葫芦岛市","value": 293}
             ]
             break;
          case '内蒙古':
            return[
              {"name": "呼和浩特市","value": 243.79},
              {"name": "包头市","value": 229.74},
              {"name": "乌海市","value": 100},
              {"name": "赤峰市","value": 451.8},
              {"name": "通辽市","value": 308.35},
              {"name": "鄂尔多斯市","value": 100},
              {"name": "呼伦贝尔市","value": 273.65},
              {"name": "巴彦淖尔市","value": 171.38},
              {"name": "乌兰察布市", "value": 232.63},
              {"name": "兴安盟","value": 161.89},
              {"name": "锡林郭勒盟","value": 99.34},
              {"name": "阿拉善盟","value": 19.94}
            ]
            break;
          case '山西':
            return[
              {"name": "大同市","value": 340.64},
              {"name": "朔州市","value": 176.22},
              {"name": "忻州市","value": 314.13},
              {"name": "太原市","value": 431.87},
              {"name": "阳泉市","value": 139.83},
              {"name": "吕梁市","value": 383.22},
              {"name": "晋中市","value": 333.57},
              {"name": "长治市","value": 342.04},
              {"name": "临汾市","value": 443.57},
              {"name": "晋城市","value": 231.5},
              {"name": "运城市","value": 527.53}
            ]
            break;
          case '河南':
            return[
              {"name": "郑州市","value": 1013.6},
              {"name": "开封市","value": 454.93},
              {"name": "洛阳市","value": 713.67},
              {"name": "平顶山市","value": 550},
              {"name": "安阳市","value": 592.27},
              {"name": "鹤壁市","value": 165.78},
              {"name": "新乡市","value": 614.39},
              {"name": "焦作市","value": 354.6},
              {"name": "濮阳市","value": 360.94},
              {"name": "许昌市","value": 495.63},
              {"name": "漯河市","value": 284.13},
              {"name": "三门峡市","value": 226.87},
              {"name": "商丘市","value": 732.53},
              {"name": "周口市","value": 867.78},
              {"name": "驻马店市","value": 805.18},
              {"name": "南阳市","value": 1194.23},
              {"name": "信阳市","value": 880.5},
              {"name": "济源市","value": 70.31}
            ]
            break;
          case '山东':
            return[
              {"name": "济南市","value": 713.2},
              {"name": "青岛市","value": 909.7},
              {"name": "淄博市","value": 464.2},
              {"name": "枣庄市","value": 422.56},
              {"name": "东营市","value": 190.62},
              {"name": "烟台市","value": 701.41},
              {"name": "潍坊市","value": 927.72},
              {"name": "济宁市","value": 829.92},
              {"name": "泰安市","value": 560.08},
              {"name": "威海市","value": 280.92},
              {"name": "日照市","value": 295.95},
              {"name": "滨州市","value": 385.9},
              {"name": "德州市","value": 574.23},
              {"name": "聊城市","value": 597.06},
              {"name": "临沂市","value": 1031.16},
              {"name": "菏泽市","value": 850.03},
              {"name": "莱芜市","value": 128.32}
            ]
            break;
          case '陕西':
            return [
              {"name": "西安市","value": 807},
              {"name": "宝鸡市","value": 376},
              {"name": "咸阳市","value": 498},
              {"name": "铜川市","value": 83},
              {"name": "渭南市","value": 547},
              {"name": "延安市","value": 212},
              {"name": "榆林市","value": 330},
              {"name": "汉中市","value": 348},
              {"name": "安康市","value": 265},
              {"name": "商洛市","value": 238}
            ]
            break;
          case '宁夏':
            return[
              {"name": "银川市","value": 134},
              {"name": "石嘴山市","value": 48},
              {"name": "吴忠市","value": 133},
              {"name": "固原市","value": 124},
              {"name": "中卫市","value": 112}
            ]
            break;
          case '甘肃':
            return[
              {"name": "兰州市","value": 363.6163},
              {"name": "嘉峪关市","value": 23.1853},
              {"name": "金昌市","value": 46.405},
              {"name": "白银市","value": 170.8751},
              {"name": "天水市","value": 326.2548},
              {"name": "武威市","value": 181.5054},
              {"name": "张掖市","value": 119.9515},
              {"name": "平凉市","value": 206.8033},
              {"name": "酒泉市","value": 109.5947},
              {"name": "庆阳市","value": 221.1191},
              {"name": "定西市","value": 269.8622},
              {"name": "陇南市","value": 256.7718},
              {"name": "临夏回族自治州","value": 194.6677},
              {"name": "甘南藏族自治州","value": 68.01}
            ]
            break;
            case '青海':
              return[
                {"name": "西宁市","value": 201.3},
                {"name": "海东市","value": 170},
                {"name": "海北藏族自治州","value": 29.7},
                {"name": "黄南藏族自治州","value": 27},
                {"name": "海南藏族自治州","value": 46.6},
                {"name": "果洛藏族自治州","value": 19.7},
                {"name": "玉树藏族自治州","value": 39.1},
                {"name": "海西蒙古族藏族自治州","value": 40.2}
              ]
              break;
            case '新疆':
              return[
                {"name": "乌鲁木齐市","value": 233},
                {"name": "克拉玛依市","value": 27},
                {"name": "吐鲁番市","value": 59},
                {"name": "哈密市","value": 55},
                {"name": "昆玉市","value": 5.7},
                {"name": "双河市","value": 5.38},
                {"name": "铁门关市","value": 5},
                {"name": "北屯市","value": 8},
                {"name": "五家渠市","value": 12.56},
                {"name": "阿拉尔市","value": 32.68},
                {"name": "可克达拉市","value": 7.5},
                {"name": "图木舒克市","value": 17},
                {"name": "石河子市","value": 66},
                {"name": "阿克苏地区","value": 226},
                {"name": "喀什地区","value": 365},
                {"name": "和田地区","value": 180},
                {"name": "昌吉回族自治州","value": 159},
                {"name": "博尔塔拉蒙古自治州","value": 47},
                {"name": "巴音郭楞蒙古自治州","value": 117},
                {"name": "克孜勒苏柯尔克孜自治州","value": 47},
                {"name": "伊犁哈萨克自治州","value": 260},
                {"name": "塔城地区","value": 99},
                {"name": "阿勒泰地区","value": 64}
              ]
              break;
           case '西藏':
             return[
                {"name": "拉萨市", "value": 55},
                {"name": "日喀则市","value": 70},
                {"name": "昌都市","value": 65},
                {"name": "林芝市","value": 19},
                {"name": "山南市","value": 32},
                {"name": "那曲地区","value": 46},
                {"name": "阿里地区","value": 9}
             ]
             break;
          case '四川':
            return[
                {"name": "成都市","value": 1417},
                {"name": "绵阳市","value": 543},
                {"name": "自贡市","value": 268},
                {"name": "攀枝花市","value": 129},
                {"name": "泸州市","value": 422.5},
                {"name": "德阳市","value": 359},
                {"name": "广元市","value": 316},
                {"name": "遂宁市","value": 326},
                {"name": "内江市","value": 427},
                {"name": "乐山市","value": 324},
                {"name": "资阳市","value": 366},
                {"name": "宜宾市","value": 446},
                {"name": "南充市","value": 759},
                {"name": "达州市","value": 548},
                {"name": "雅安市","value": 153},
                {"name": "阿坝藏族羌族自治州","value": 92},
                {"name": "甘孜藏族自治州","value": 110},
                {"name": "凉山彝族自治州","value": 453},
                {"name": "广安市","value": 470},
                {"name": "巴中市","value": 324 },
                {"name": "眉山市","value": 295}
            ]
            break;
          case '湖北':
            return[
                {"name": "武汉市","value": 1060.77},
                {"name": "黄石市","value": 244.92},
                {"name": "十堰市","value": 338.3},
                {"name": "宜昌市","value": 411.5},
                {"name": "襄阳市","value": 561.4},
                {"name": "鄂州市","value": 5.95},
                {"name": "荆门市","value": 289.63},
                {"name": "孝感市","value": 487.8},
                {"name": "荆州市","value": 574.42},
                {"name": "黄冈市","value": 629.1},
                {"name": "咸宁市","value": 250.7},
                {"name": "随州市","value": 219.08},
                {"name": "恩施土家族苗族自治州","value": 456},
                {"name": "仙桃市","value": 116.6},
                {"name": "潜江市","value": 95.44},
                {"name": "天门市","value": 129.2},
                {"name": "神农架林区","value": 7.68}
            ]
              break;
          case '安徽':
            return[
                {"name": "合肥市","value": 786.9},
                {"name": "芜湖市","value": 367},
                {"name": "蚌埠市","value": 333.1},
                {"name": "淮南市","value": 345.6},
                {"name": "马鞍山市","value": 227.6},
                {"name": "淮北市","value": 220.8},
                {"name": "铜陵市","value": 160.1},
                {"name": "安庆市","value": 461.2},
                {"name": "黄山市","value": 137.9},
                {"name": "阜阳市","value": 799.1},
                {"name": "宿州市","value": 559.9},
                {"name": "滁州市","value": 404.4},
                {"name": "六安市","value": 477.2},
                {"name": "宣城市","value": 260.1},
                {"name": "池州市","value": 144.3},
                {"name": "亳州市","value": 510.4}
            ]
            break;
          case '江苏':
             return[
                {"name": "南京市","value": 100},
                {"name": "无锡市","value": 518},
                {"name": "徐州市","value": 906},
                {"name": "常州市","value": 342},
                {"name": "苏州市","value": 691},
                {"name": "南通市","value": 789},
                {"name": "连云港市","value": 466},
                {"name": "淮安市","value": 510},
                {"name": "盐城市","value": 800},
                {"name": "扬州市","value": 470},
                {"name": "镇江市","value": 268},
                {"name": "泰州市","value": 501},
                {"name": "宿迁市","value": 515}
             ]
            break;
          case '浙江':
            return[
              {"name": "杭州市","value": 918.8},
              {"name": "宁波市","value": 787.5},
              {"name": "温州市","value": 917.5},
              { "name": "绍兴市","value": 498.8},
              {"name": "湖州市","value": 297.5},
              {"name": "嘉兴市","value": 461.4},
              { "name": "金华市","value": 552},
              {"name": "衢州市","value": 216.2},
              {"name": "台州市","value": 608},
              {"name": "丽水市", "value": 216.5},
              {"name": "舟山市","value": 115.8}
            ]
            break;
          case '江西':
              return[
                {"name": "南昌市","value": 524.02},
                {"name": "九江市","value": 480.69},
                {"name": "上饶市","value": 668.8},
                {"name": "抚州市","value": 397.66},
                {"name": "宜春市","value": 549.33},
                {"name": "吉安市","value": 488.12},
                {"name": "赣州市","value": 850.75},
                {"name": "景德镇市","value": 162.98},
                {"name": "萍乡市","value": 189},
                {"name": "新余市","value": 116.08},
                {"name": "鹰潭市","value": 114.76}
              ]
              break;
          case '湖南':
            return[
                { "name": "长沙市","value": 731.15},
                {"name": "株洲市","value": 396.1},
                {"name": "湘潭市","value": 281.3},
                {"name": "衡阳市","value": 730.34},
                {"name": "邵阳市","value": 721.94},
                {"name": "岳阳市","value": 559.51},
                {"name": "常德市","value": 583.08},
                {"name": "张家界市","value": 151.9},
                {"name": "益阳市","value": 439.15},
                {"name": "娄底市","value": 385.25},
                {"name": "郴州市","value": 469.79},
                {"name": "永州市","value": 538.71},
                {"name": "怀化市","value": 487},
                {"name": "湘西土家族苗族自治州","value": 262.05}
            ]
            break;
          case '贵州':
            return[
                {"name": "贵阳市","value": 462.18},
                {"name": "遵义市","value": 619.21},
                {"name": "六盘水市","value": 288.99},
                {"name": "安顺市","value": 231.35},
                {"name": "毕节市","value": 660.61},
                {"name": "铜仁市","value": 312.24},
                {"name": "黔东南苗族侗族自治州","value": 348.54},
                {"name": "黔南布依族苗族自治州","value": 324.22},
                {"name": "黔西南布依族苗族自治州","value": 282.16}
            ]
            break;
          case '云南':
            return[
                {"name": "昆明市","value": 667},
                {"name": "曲靖市","value": 604.2},
                {"name": "玉溪市","value": 236},
                {"name": "昭通市","value": 542.4},
                {"name": "保山市","value": 257.8},
                {"name": "丽江市","value": 127.9},
                {"name": "普洱市", "value": 260.2},
                {"name": "临沧市","value": 250.7},
                {"name": "德宏傣族景颇族自治州","value": 127.7},
                {"name": "怒江傈僳族自治州","value": 54.1},
                {"name": "迪庆藏族自治州","value": 40.7},
                {"name": "大理白族自治州","value": 354},
                {"name": "楚雄彝族自治州","value": 273},
                {"name": "红河哈尼族彝族自治州","value": 464.5},
                {"name": "文山壮族苗族自治州","value": 360.3},
                {"name": "西双版纳傣族自治州","value": 116.3}
            ]
            break;
          case '福建':
            return[
                {"name": "福州市","value": 757},
                {"name": "厦门市","value": 392},
                {"name": "漳州市","value": 510},
                {"name": "泉州市","value": 858},
                {"name": "三明市","value": 255},
                {"name": "莆田市","value": 289},
                {"name": "南平市","value": 266},
                {"name": "龙岩市","value": 263},
                {"name": "宁德市","value": 289}
            ]
            break;
          case '广西':
            return[
                {"name": "南宁市","value": 666.16},
                {"name": "柳州市","value": 375.87},
                {"name": "桂林市","value": 474.8},
                {"name": "梧州市","value": 288.22},
                {"name": "北海市","value": 153.93},
                {"name": "防城港市","value": 86.69},
                {"name": "钦州市","value": 307.97},
                {"name": "贵港市","value": 411.88},
                {"name": "玉林市","value": 548.74},
                {"name": "百色市","value": 346.68},
                {"name": "贺州市","value": 195.41},
                {"name": "河池市","value": 336.92},
                {"name": "来宾市","value": 209.97},
                {"name": "崇左市","value": 199.43}
            ]
            break;
          case '广东':
            return[
                {"name": "广州市","value": 1350.11},
                {"name": "深圳市","value": 1137.87},
                {"name": "珠海市","value": 163.41},
                {"name": "汕头市","value": 555.21},
                {"name": "佛山市","value": 743.06},
                {"name": "韶关市","value": 293.15},
                {"name": "湛江市","value": 724.14},
                {"name": "肇庆市","value": 405.96},
                {"name": "江门市","value": 451.95},
                {"name": "茂名市","value": 608.08},
                {"name": "惠州市","value": 475.55},
                {"name": "梅州市","value": 434.08},
                {"name": "汕尾市","value": 302.16},
                {"name": "河源市","value": 307.35},
                {"name": "阳江市","value": 251.12},
                {"name": "清远市","value": 383.45},
                {"name": "东莞市","value": 825.41},
                {"name": "中山市","value": 320.96},
                {"name": "潮州市","value": 264.05},
                {"name": "揭阳市","value": 605.89},
                {"name": "云浮市","value": 246.05}
            ]
            break;
          case '台湾':
            return[
                {
                  "name": "台北市",
                  "value": 275
                },
                {
                  "name": "新北市",
                  "value": 400.0164
                },
                {
                  "name": "桃园市",
                  "value": 210
                },
                {
                  "name": "台中市",
                  "value": 279.398
                },
                {
                  "name": "台南市",
                  "value": 188
                },
                {
                  "name": "高雄市",
                  "value": 278
                },
                {
                  "name": "基隆市",
                  "value": 37
                },
                {
                  "name": "新竹市",
                  "value": 40
                },
                {
                  "name": "新竹县",
                  "value": 55.7349
                },
                {
                  "name": "苗栗县",
                  "value": 56.5704
                },
                {
                  "name": "彰化县",
                  "value": 12
                },
                {
                  "name": "南投县",
                  "value": 51.5
                },
                {
                  "name": "云林县",
                  "value": 68.6
                },
                {
                  "name": "嘉义市",
                  "value": 27.4051
                },
                {
                  "name": "嘉义县",
                  "value": 53.3106
                },
                {
                  "name": "屏东县",
                  "value": 82.4587
                },
                {
                  "name": "宜兰县",
                  "value": 45.8
                },
                {
                  "name": "花莲县",
                  "value": 34.1032
                },
                {
                  "name": "台东县",
                  "value": 22.4218
                },
                {
                  "name": "澎湖县",
                  "value": 11
                },
                {
                  "name": "金门县",
                  "value": 13.1
                },
                {
                  "name": "连江县",
                  "value": 58.1
                }
            ]
            break;
          case '海南':
            return[
            {
              "name": "海口市",
              "value": 230.23
            },
            {
              "name": "三亚市",
              "value": 61.4647
            },
            {
              "name": "三沙市",
              "value": 0.25
            },
            {
              "name": "儋州市",
              "value": 95.51
            },
            {
              "name": "五指山市",
              "value": 10.6
            },
            {
              "name": "琼海市",
              "value": 50.61
            },
            {
              "name": "文昌市",
              "value": 55.88
            },
            {
              "name": "万宁市",
              "value": 57.36
            },
            {
              "name": "东方市",
              "value": 43.5
            },
            {
              "name": "琼海市",
              "value": 50.61
            },
            {
              "name": "临高县",
              "value": 51.5
            },
            {
              "name": "澄迈县",
              "value": 59
            },
            {
              "name": "定安县",
              "value": 31
            },
            {
              "name": "屯昌县",
              "value": 29.5
            },
            {
              "name": "白沙黎族自治县",
              "value": 17.16
            },
            {
              "name": "昌江黎族自治县",
              "value": 22.8
            },
            {
              "name": "乐东黎族自治县",
              "value": 53.44
            },
            {
              "name": "保亭黎族苗族自治县",
              "value": 16.78
            },
            {
              "name": "陵水黎族自治县",
              "value": 36.46
            },
            {
              "name": "琼中黎族苗族自治县",
              "value": 22.8
            }
            ]
            break;
          default:
            this.data=[               
              {name: '北京',value: this.randomData() },
              {name: '天津',value: this.randomData() },
              {name: '上海',value: this.randomData() },
              {name: '重庆',value: this.randomData() },
              {name: '河北',value: this.randomData() },
              {name: '河南',value: this.randomData() },
              {name: '云南',value: this.randomData() },
              {name: '辽宁',value: this.randomData() },
              {name: '黑龙江',value: this.randomData() },
              {name: '湖南',value: this.randomData() },
              {name: '安徽',value: this.randomData() },
              {name: '山东',value: this.randomData() },
              {name: '新疆',value: this.randomData() },
              {name: '江苏',value: this.randomData() },
              {name: '浙江',value: this.randomData() },
              {name: '江西',value: this.randomData() },
              {name: '湖北',value: this.randomData() },
              {name: '广西',value: this.randomData() },
              {name: '甘肃',value: this.randomData() },
              {name: '山西',value: this.randomData() },
              {name: '内蒙古',value: this.randomData() },
              {name: '陕西',value: this.randomData() },
              {name: '吉林',value: this.randomData() },
              {name: '福建',value: this.randomData() },
              {name: '贵州',value: this.randomData() },
              {name: '广东',value: this.randomData() },
              {name: '青海',value: this.randomData() },
              {name: '西藏',value: this.randomData() },
              {name: '四川',value: this.randomData() },
              {name: '宁夏',value: this.randomData() },
              {name: '海南',value: this.randomData() },
              {name: '台湾',value: this.randomData() },
              {name: '香港',value: this.randomData() },
              {name: '澳门',value: this.randomData() }
               ]
            break;

           
        }
       

      },
      randomData() {  
         return Math.round(Math.random()*500);  
       } ,
        
    }
  
    
}
</script>
