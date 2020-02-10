
export function ToArray(data,px) {
    var returnValue = new Array();

    for (var key in data) {
        returnValue.push({dm: key, mc: data[key]});
    }
   if(px!='' && px!=null){
    return sortByKeyD(returnValue,'dm');
   }else
   {
    return sortByKey(returnValue,'dm');
   }
};
//升序
export function sortByKey(array,key)
{
  return array.sort(function(a,b){
    var x = a[key];
    var y = b[key];
    return((x<y)?-1:((x>y)?1:0));
  })
};
//降序
export function sortByKeyD(array,key)
{
  return array.sort(function(a,b){
    var x = a[key];
    var y = b[key];
    return((x>y)?-1:((x<y)?1:0));
  })
};

export function ToData(data) {
    var returnValue = new Array(data);
    // for (var key in data) {
    //     returnValue.push({dm: key.dm, mc: key.mc});
    // }
    return returnValue;
};



