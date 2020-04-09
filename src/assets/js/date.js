export function formatDate(date, fmt) {

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

export function format (date,format) {
     var args = {
         "M+": date.getMonth() + 1,
         "d+": date.getDate(),
         "h+": date.getHours(),
         "m+": date.getMinutes(),
         "s+": date.getSeconds(),
         "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
         "S": date.getMilliseconds()
     };
     if (/(y+)/.test(format))
         format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
     for (var i in args) {
         var n = args[i];
         if (new RegExp("(" + i + ")").test(format))
             format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
     }
     return format;
 };

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

function timestampToTime(timestamp,type) {//type为0，精确到分；为1，精确到秒
  let timeS='';
  let year = timestamp.slice(0,4);
  let month = timestamp.slice(4,6);
  let day = timestamp.slice(6,8);
  let hour = timestamp.slice(8,10);
  let min = timestamp.slice(10,12);
  if(type==0){
    timeS = year +'/'+month +'/'+day+' '+hour+':'+min;
  }else if(type == 1){
    let seconed = timestamp.slice(12,14);
    timeS = year +'/'+month +'/'+day+' '+hour+':'+min+':'+seconed;
  }
  return  timeS;
}
export function dayGap(start,end,type){//相差天数  type =1 到分  type=0 秒

  let startT = new Date(timestampToTime(start,type)).getTime();
  let endT = new Date(timestampToTime(end,type)).getTime();
  let day = parseInt((endT-startT)/(1000 * 60 * 60 * 24));
  return day;
}
export function tabclick(e){
  console.log("###########",e)
}

//获取服务器时间
export   function getServerDate(){
        var xhr = null;
        if(window.XMLHttpRequest){
          xhr = new window.XMLHttpRequest();
        }else{ // ie
          xhr = new ActiveObject("Microsoft")
        }
        xhr.open("GET","/",false)//false不可变
        xhr.send(null);
        var date = xhr.getResponseHeader("Date");
        console.log(formatDate(new Date(date),"yyyy-MM-dd"));
        return formatDate(new Date(date),"yyyy-MM-dd hh:mm:ss");
 }
//年的列表
 export function getYear(){
  var date=new Date();
  var arr=[];
  var array=date.getFullYear();
     for (let i =0; i < 5; i++) {
          var obj={};
          obj.dm=parseInt(array)-i;
          obj.mc=parseInt(array)-i;
          arr.push(obj);
      }
   return arr;
 }
 //大屏时间
 export function setNowTimes () {
  let myDate = new Date()
  // console.log(myDate)
  let wk = myDate.getDay()
  let yy = String(myDate.getFullYear())
  let mm = myDate.getMonth() + 1
  let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
  let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
  let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
  let sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
  let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let week = weeks[wk]
  let nowDate = yy + '年' + mm + '月' + dd+'日'
  let nowTime = hou + ':' + min + ':' + sec
  let nowWeek = week
  return nowDate+'&nbsp;&nbsp;&nbsp;&nbsp;'+nowTime+'&nbsp;&nbsp;&nbsp;&nbsp;'+nowWeek;
}

//100年
export function birthdayYear(){
  let myDate = new Date()
  let year=myDate.getFullYear()+1;
  let years=[];
  for (let index = (year-100); index < year; index++) {
     
    years.push(index);
  }
  return years;
}
//12个月

export function birthdayMonth(){
  let months=[];
  for (let i = 1; i < 13; i++) {
    months.push(i);
    
  }
  return months;
}

//日
export function birthdayDay(y,m){
  switch (m) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
           return 31;
           
    case 4:
    case 6:
    case 9:
    case 11:
           return 30;
        
    case 2:
          return isRuinian(y);
  }
}

/**
 * 判断某年是否闰年
 */
function isRuinian(year){
  console.log('year/4',year%4,'year%100',year%100,'year/400',year%400,'year',year);
  
  if(year%4 == 0 && year%100 != 0){
          return 29;
  } else if (year%400 == 0){
          return 29;
  } else{
          return 28;
  }

}
