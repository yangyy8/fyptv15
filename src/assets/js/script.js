export function getCH(data) {
  var result = "(";
  
  var arr = (data+"").split('');
  for (let i = 0; i < arr.length; i++) {
 
    result+=getnum(parseInt(arr[i]));
    
  }
  
  return result+=")";
};

function getnum(t) {
  var sum = "";
  switch (t) {
    case 1:
      sum = "一";
      break;
    case 2:
      sum = "二";
      break;
    case 3:
      sum = "三";
      break;
    case 4:
      sum = "四";
      break;
    case 5:
      sum = "五";
      break;
    case 6:
      sum = "六";
      break;
    case 7:
      sum = "七";
      break;
    case 8:
      sum = "八";
      break;
    case 9:
      sum = "九";
      break;
    case 10:
      sum = "十";
      break;
    default:
      break;
  }
  return sum;
}
