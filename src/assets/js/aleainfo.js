export function getlljgmenu(type,lvl)
{
    
    var mid='';
   switch (type) {
       case '1'://人大
           if(lvl==1){
               mid='11042103';
           }else if(lvl==2){
               mid='11052106';
           }else if(lvl=3){
               mid="11062109";
           }
          
           break;
         case '2'://政协
           if(lvl==1){
               mid='11102116';
           }else if(lvl==2){
               mid='11112119';
           }else if(lvl=3){
               mid="11122122";
           }
           break;
         case '3'://特约
           if(lvl==1){
               mid='11162128';
           }else if(lvl==2){
               mid='11172131';
           }else if(lvl=3){
               mid="11182134";
           }
           break;
        case '4'://法院
           if(lvl==1){
               mid='11662196';
           }else if(lvl==2){
               mid='11672199';
           }else if(lvl=3){
               mid="11682202";
           }
           break;
       default:
           break;
   }
   return mid;
}


export function getlljgdata(type,lvl)
{
     var data=[];
     switch (type) {
         case '1'://人大
            if(lvl==1){
                data=['21033106','21033107'];
            }else if(lvl==2){
                data=['21063113','21063114'];
            }
            else if(lvl==3){
                data=['21093120','21093121'];
            }
             break;
         case '2'://政协
             if(lvl==1){
                 data=['21163142','21163143'];
             }else if(lvl==2){
                 data=['21193149','21193150'];
             }
             else if(lvl==3){
                 data=['21223156','21093121'];
             }
            break;
        case '3'://特约
            if(lvl==1){
                data=['21283176','21283177'];
            }else if(lvl==2){
                data=['21313184','21313185'];
            }
            else if(lvl==3){
                data=['21343192','21343193'];
            }
           break;
        case '4'://法院
           if(lvl==1){
               data=['21963214','21963216'];
           }else if(lvl==2){
               data=['21993223','21993225'];
           }
           else if(lvl==3){
               data=['22023232','22023234'];
           }
          break;
         default:
             break;
     }

     return data;
}
//团别 界别
export function getlljgtbmenu(type,jb){
    var mid='';
    switch (type) {
        case '1'://人大
            if(jb=='qg'){
                mid='11032101';
            }else if(jb=='sj')
            {
                mid='11042104';
            }else if(jb=='ds')
            {
                mid='11052107';
            }else if(jb=='xq')
            {
                mid='11062110';
            }
            break;
         case '2'://政协
            if(jb=='qg'){
                mid='11092113';
            }else if(jb=='sj')
            {
                mid='11102115';
            }else if(jb=='ds')
            {
                mid='11112118';
            }else if(jb=='xq')
            {
                mid='11122121';
            }
            break;
        case '3'://特约
            if(jb=='qg'){
                mid='11152125';
            }else if(jb=='sj')
            {
                mid='11162127';
            }else if(jb=='ds')
            {
                mid='11172130';
            }else if(jb=='xq')
            {
                mid='11182133';
            }
            break;
        case '4'://法院
            if(jb=='qg'){
                mid='11652193';
            }else if(jb=='sj')
            {
                mid='11662195';
            }else if(jb=='ds')
            {
                mid='11672198';
            }else if(jb=='xq')
            {
                mid='11682201';
            }
            break;
        default:
            break;
    }
    return mid;
}
export function getlljgtbdata(type,jb){
  var data=[];
  switch (type) {
    case '1'://人大
        if(jb=='qg'){
            data=['21013101','21013102'];
        }else if(jb=='sj')
        {
            data=['21043108','21043109'];
        }else if(jb=='ds')
        {
            data=['21073115','21073116'];
        }else if(jb=='xq')
        {
            data=['21103122','21103123'];
        }
        break;
     case '2'://政协
        if(jb=='qg'){
            data=['21133135','21133136'];
        }else if(jb=='sj')
        {
            data=['21153140','21153141'];
        }else if(jb=='ds')
        {
            data=['21183147','21183148'];
        }else if(jb=='xq')
        {
            data=['21213154','21213155'];
        }
        break;
    case '3'://特约
        if(jb=='qg'){
            data=['21253168','21253169'];
        }else if(jb=='sj')
        {
            data=['21273174','21273175'];
        }else if(jb=='ds')
        {
            data=['21303182','21303183'];
        }else if(jb=='xq')
        {
            data=['21333190','21333191'];
        }
        break;
    case '4'://法院
        if(jb=='qg'){
            data=['21933205','21933207'];
        }else if(jb=='sj')
        {
            data=['21953211','21953213'];
        }else if(jb=='ds')
        {
            data=['21983220','21983222'];
        }else if(jb=='xq')
        {
            data=['22013229','22013231'];
        }
        break;
    default:
        break;
}
return data;
}

//代表团名单
export function getlljgdbtmenu(type,jb){
    var mid='';
    switch (type) {
        case '1'://人大
            if(jb=='qg'){
                mid='11032102';
            }else if(jb=='sj')
            {
                mid='11042105';
            }else if(jb=='ds')
            {
                mid='11052108';
            }else if(jb=='xq')
            {
                mid='11062111';
            }
            break;
         case '2'://政协
            if(jb=='qg'){
                mid='11092114';
            }else if(jb=='sj')
            {
                mid='11102117';
            }else if(jb=='ds')
            {
                mid='11112120';
            }else if(jb=='xq')
            {
                mid='11122123';
            }
            break;
        case '3'://特约
            if(jb=='qg'){
                mid='11152126';
            }else if(jb=='sj')
            {
                mid='11162129';
            }else if(jb=='ds')
            {
                mid='11172132';
            }else if(jb=='xq')
            {
                mid='11182135';
            }
            break;
        case '4'://法院
            if(jb=='qg'){
                mid='11652194';
            }else if(jb=='sj')
            {
                mid='11662197';
            }else if(jb=='ds')
            {
                mid='11672200';
            }else if(jb=='xq')
            {
                mid='11682203';
            }
            break;
        default:
            break;
    }
    return mid;
}
export function getlljgdbtdata(type,jb){
  var data=[];
  switch (type) {
    case '1'://人大
        if(jb=='qg'){
            data=['21023103','21023104','21023105'];
        }else if(jb=='sj')
        {
            data=['21053110','21053111','21053112'];
        }else if(jb=='ds')
        {
            data=['21083117','21083118','21083119'];
        }else if(jb=='xq')
        {
            data=['21113124','21113125','21113126'];
        }
        break;
     case '2'://政协
        if(jb=='qg'){
            data=['21143137','21143138','21143139'];
        }else if(jb=='sj')
        {
            data=['21173144','21173145','21173146'];
        }else if(jb=='ds')
        {
            data=['21203151','21203152','21203153'];
        }else if(jb=='xq')
        {
            data=['21233158','21233159','21233160'];
        }
        break;
    case '3'://特约
        if(jb=='qg'){
            data=['21263170','21263171','21263172','21263173'];
        }else if(jb=='sj')
        {
            data=['21293178','21293179','21293180','21293181'];
        }else if(jb=='ds')
        {
            data=['21323186','21323187','21323188','21323189'];
        }else if(jb=='xq')
        {
            data=['21353194','21353195','21353196','21353197'];
        }
        break;
    case '4'://法院
        if(jb=='qg'){
            data=['21943208','21943209','21943210'];
        }else if(jb=='sj')
        {
            data=['21973217','21973218','21973219'];
        }else if(jb=='ds')
        {
            data=['22003226','22003227','22003228'];
        }else if(jb=='xq')
        {
            data=['22033235','22033236','22033237'];
        }
        break;
    default:
        break;
}
return data;
}
