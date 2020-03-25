export function getmenu(type,jb,lx){
  var mid='';//联络机构
  switch (type) {
      case '1':
        if(jb=='sj'){
            mid='11232139';
        }else if(jb=='ds'){
            mid='11242141';
        }else if(jb=='xq'){
            mid="11252143";
        }
          break;
      case '2':
            if(jb=='sj'){
                mid='11292147';
            }else if(jb=='ds'){
                mid='11302149';
            }else if(jb=='xq'){
                mid="11312151";
            }
              break;
    case '3':
            if(jb=='sj'){
               mid='11352155';
             }else if(jb=='ds'){
               mid='11362157';
             }else if(jb=='xq'){
               mid="11372159";
             }
           break;
    case '4'://民主党派
             switch (lx) {
               case '1'://国民党革命委员会
                if(jb=='sj'){
                  mid='16042209';
                }else if(jb=='ds'){
                  mid='16052211';
                }else if(jb=='xq'){
                  mid="16062213";
                }
                 break;
               case '2'://民主同盟
               if(jb=='sj'){
                mid='16092216';
              }else if(jb=='ds'){
                mid='16102218';
              }else if(jb=='xq'){
                mid="16112220";
              }
                 break;
               case '3'://民主建国会
               if(jb=='sj'){
                mid='16142223';
              }else if(jb=='ds'){
                mid='16152225';
              }else if(jb=='xq'){
                mid="16162227";
              }
                 break;
               case '4'://民主促进会
               if(jb=='sj'){
                mid='16192230';
              }else if(jb=='ds'){
                mid='16202232';
              }else if(jb=='xq'){
                mid="16212234";
              }
                 break;
              case '5'://农工民主党
              if(jb=='sj'){
                mid='16242237';
              }else if(jb=='ds'){
                mid='16252239';
              }else if(jb=='xq'){
                mid="16262241";
              }
                 break;
              case '6'://致公党
              if(jb=='sj'){
                mid='16292244';
              }else if(jb=='ds'){
                mid='16302246';
              }else if(jb=='xq'){
                mid="16312248";
              }
                 break;
              case '7'://九三学社
              if(jb=='sj'){
                mid='16342251';
              }else if(jb=='ds'){
                mid='16352253';
              }else if(jb=='xq'){
                mid="16362255";
              }
                 break;
              case '8'://台湾民主自治同盟
              if(jb=='sj'){
                mid='16392258';
              }else if(jb=='ds'){
                mid='16402260';
              }else if(jb=='xq'){
                mid="16412262";
              }
                 break;
               default:
                 break;
             }
           break;
     case '5':
           if(jb=='sj'){
              mid='11472171';
            }else if(jb=='ds'){
              mid='11482173';
            }else if(jb=='xq'){
              mid="11492175";
            }
          break;
    case '6':
            if(jb=='sj'){
               mid='11532179';
             }else if(jb=='ds'){
               mid='11542181';
             }else if(jb=='xq'){
               mid="11552183";
             }
           break;
    case '7':
            if(jb=='sj'){
               mid='11602187';
             }else if(jb=='ds'){
               mid='11612189';
             }else if(jb=='xq'){
               mid="11622191";
             }
           break;
      default:
          break;
  }
  return mid;
}
export function getdata(type,jb,lx){
    var data='';//联络机构
    switch (type) {
        case '1':
            if(jb=='sj'){
                data=['21393307','21393308','21393309'];
              }else if(jb=='ds'){
                data=['21413313','21413314','21413315'];
              }else if(jb=='xq'){
                data=['21433319','21433320','21433321'];
              }
            break;
        case '2':
              if(jb=='sj'){
                 data=['21473333','21473334','21473335'];
               }else if(jb=='ds'){
                 data=['21493339','21493340','21493341'];
               }else if(jb=='xq'){
                 data=['21513345','21513346','21513347'];
               }
                break;
        case '3':
             if(jb=='sj'){
                  data=['21553359','21553360','21553361'];
             }else if(jb=='ds'){
                 data=['21573365','21573366','21573367'];
             }else if(jb=='xq'){
                 data=['21593371','21593372','21593373'];
             }
             break;
        case '4'://八大民主党派
              
              switch (lx) {
                case '1'://国民党革命委员会
                if(jb=='sj'){
                  data=['22094007','22094008','22094009'];
                }else if(jb=='ds'){
                    data=['22114013','22114014','22114015'];
                }else if(jb=='xq'){
                    data=['22134019','22134020','22134021'];
                }
                break;
                case '2'://民主同盟
                if(jb=='sj'){
                  data=['22164028','22164029','22164030'];
                }else if(jb=='ds'){
                    data=['22184034','22184035','22184036'];
                }else if(jb=='xq'){
                    data=['22204040','22204041','22204042'];
                }
                  break;
                case '3'://民主建国会
                if(jb=='sj'){
                  data=['22234049','22234050','22234051'];
                }else if(jb=='ds'){
                    data=['22254055','22254056','22254057'];
                }else if(jb=='xq'){
                    data=['22274061','22274062','22274063'];
                }
                  break;
                case '4'://民主促进会
                if(jb=='sj'){
                  data=['22304070','22304071','22304072'];
                }else if(jb=='ds'){
                    data=['22324076','22324077','22324078'];
                }else if(jb=='xq'){
                    data=['22344082','22344083','22344084'];
                }
                  break;
               case '5'://农工民主党
               if(jb=='sj'){
                data=['22374091','22374092','22374093'];
              }else if(jb=='ds'){
                  data=['22394097','22394098','22394099'];
              }else if(jb=='xq'){
                  data=['22414103','22414104','22414105'];
              }
                  break;
               case '6'://致公党
               if(jb=='sj'){
                  data=['22444112','22444113','22444114'];
                }else if(jb=='ds'){
                    data=['22464118','22464119','22464120'];
                }else if(jb=='xq'){
                    data=['22484124','22484125','22484126'];
                }
                  break;
               case '7'://九三学社
               if(jb=='sj'){
                  data=['22514133','22514134','22514135'];
                }else if(jb=='ds'){
                    data=['22534139','22534140','22534141'];
                }else if(jb=='xq'){
                    data=['22554145','22554146','22554147'];
                }
                  break;
               case '8'://台湾民主自治同盟
               if(jb=='sj'){
                  data=['22584154','22584155','22584156'];
                }else if(jb=='ds'){
                    data=['22604160','22604161','22604162'];
                }else if(jb=='xq'){
                    data=['22624166','22624167','22624168'];
                }
                  break;
                default:
                  break;
                }

                break;

         case '5':
                if(jb=='sj'){
                     data=['21713411','21713412','21713413'];
                }else if(jb=='ds'){
                    data=['21733417','21733418','21733419'];
                }else if(jb=='xq'){
                    data=['21753423','21753424','21753425'];
                }
                break;
         case '6':
             if(jb=='sj'){
                data=['21793437','21793438','21793439'];
              }else if(jb=='ds'){
                data=['21813443','21813444','21813445'];
              }else if(jb=='xq'){
                data=['21833449','21833450','21833451'];
              }
               break;
         case '7':
                if(jb=='sj'){
                   data=['21873463','21873464','21873465'];
                }else if(jb=='ds'){
                   data=['21893469','21893470','21893471'];
                }else if(jb=='xq'){
                   data=['21913475','21913476','21913477'];
                }
                break;
        default:
            break;
    }
    return data;

}

//联络机构 部门列表
export function getgroupmenu(type,jb,lx){
    var mid='';
    switch (type) {
        case '1':
         if(jb=='qg'){
              mid='11222137';
         }else if(jb=='sj'){
              mid='11232138';
          }else if(jb=='ds'){
              mid='11242140';
          }else if(jb=='xq'){
              mid="11252142";
          }
            break;
        case '2':
            if(jb=='qg'){
                mid='11282145';
            }else if(jb=='sj'){
                mid='11292146';
              }else if(jb=='ds'){
                  mid='11302148';
              }else if(jb=='xq'){
                  mid="11312150";
              }
                break;
      case '3':
             if(jb=='qg'){
                 mid='11342153';
              }else if(jb=='sj'){
                 mid='11352154';
               }else if(jb=='ds'){
                 mid='11362156';
               }else if(jb=='xq'){
                 mid="11372158";
               }
             break;
      case '4'://民主党派
            switch (lx) {
              case '1'://国民党革命委员会
              if(jb=='qg'){
                mid='16032207';
             }else if(jb=='sj'){
                mid='16042208';
              }else if(jb=='ds'){
                mid='16052210';
              }else if(jb=='xq'){
                mid="16062212";
              }
                break;
              case '2'://民主同盟
              if(jb=='qg'){
                mid='16082214';
             }else if(jb=='sj'){
                  mid='16092215';
                }else if(jb=='ds'){
                  mid='16102217';
                }else if(jb=='xq'){
                  mid="16112219";
                }
                break;
              case '3'://民主建国会
              if(jb=='qg'){
                 mid='16132221';
              }else if(jb=='sj'){
                  mid='16142222';
                }else if(jb=='ds'){
                  mid='16152224';
                }else if(jb=='xq'){
                  mid="16162226";
                }
                break;
              case '4'://民主促进会
              if(jb=='qg'){
                mid='16182228';
             }else if(jb=='sj'){
                mid='16192229';
              }else if(jb=='ds'){
                mid='16202231';
              }else if(jb=='xq'){
                mid="16212233";
              }
                break;
            case '5'://农工民主党
            if(jb=='qg'){
              mid='16232235';
           }else if(jb=='sj'){
              mid='16242236';
            }else if(jb=='ds'){
              mid='16252238';
            }else if(jb=='xq'){
              mid="16262240";
            }
                break;
            case '6'://致公党
            if(jb=='qg'){
              mid='16282242';
           }else if(jb=='sj'){
              mid='16292243';
            }else if(jb=='ds'){
              mid='16302245';
            }else if(jb=='xq'){
              mid="16312247";
            }
                break;
            case '7'://九三学社
            if(jb=='qg'){
              mid='16332249';
           }else if(jb=='sj'){
              mid='16342250';
            }else if(jb=='ds'){
              mid='16352252';
            }else if(jb=='xq'){
              mid="16362254";
            }
                break;
            case '8'://台湾民主自治同盟
            if(jb=='qg'){
              mid='16382256';
           }else if(jb=='sj'){
              mid='16392257';
            }else if(jb=='ds'){
              mid='16402259';
            }else if(jb=='xq'){
              mid="16412261";
            }
                break;
              default:
                break;
            }
             break;
       case '5':
             if(jb=='qg'){
                mid='11462169';
             }else if(jb=='sj'){
                mid='11472170';
              }else if(jb=='ds'){
                mid='11482172';
              }else if(jb=='xq'){
                mid="11492174";
              }
            break;
      case '6':
             if(jb=='qg'){
                 mid='11522177';
               }else  if(jb=='sj'){
                 mid='11532178';
               }else if(jb=='ds'){
                 mid='11542180';
               }else if(jb=='xq'){
                 mid="11552182";
               }
             break;
      case '7':
             if(jb=='qg'){
                 mid='11592185';
              }else if(jb=='sj'){
                 mid='11602186';
               }else if(jb=='ds'){
                 mid='11612188';
               }else if(jb=='xq'){
                 mid="11622190";
               }
             break;
        default:
            break;
    }
    return mid;
  }
  export function getgroupdata(type,jb,lx){
      var data='';//联络机构
      switch (type) {
          case '1':
               if(jb=='qg'){
                data=['21373301','21373302','21373303'];
               }else if(jb=='sj'){
                  data=['21383304','21383305','21383306'];
                }else if(jb=='ds'){
                  data=['21403310','21403311','21403312'];
                }else if(jb=='xq'){
                  data=['21423316','21423317','21423318'];
                }
              break;
          case '2':
               if(jb=='qg'){
                   data=['21453327','21453328','21453329'];
                }else if(jb=='sj'){
                   data=['21463330','21463331','21463332'];
                 }else if(jb=='ds'){
                   data=['21483336','21483337','21483338'];
                 }else if(jb=='xq'){
                   data=['21503342','21503343','21503344'];
                 }
                  break;
          case '3':
               if(jb=='qg'){
                  data=['21533353','21533354','21533355'];
                }else if(jb=='sj'){
                    data=['21543356','21543357','21543358'];
               }else if(jb=='ds'){
                   data=['21563362','21563363','21563364'];
               }else if(jb=='xq'){
                   data=['21583368','21583369','21583370'];
               }
               break;
          case '4'://八大民主党派
                
                  switch (lx) {
                    case '1'://国民党革命委员会
                     if(jb=='qg'){
                          data=['22074001','22074002','22074003'];
                      }else if(jb=='sj'){
                          data=['22084004','22084005','22084006'];
                      }else if(jb=='ds'){
                          data=['22104010','22104011','22104012'];
                      }else if(jb=='xq'){
                          data=['22124016','22124017','22124018'];
                      }
                    break;
                    case '2'://民主同盟
                    if(jb=='qg'){
                      data=['22144022','22144023','22144024'];
                    }else if(jb=='sj'){
                      data=['22154025','22154026','22154027'];
                    }else if(jb=='ds'){
                        data=['22174031','22174032','22174033'];
                    }else if(jb=='xq'){
                        data=['22194037','22194038','22194039'];
                    }
                      break;
                    case '3'://民主建国会
                    if(jb=='qg'){
                      data=['22214043','22214044','22214045'];
                    }else if(jb=='sj'){
                      data=['22224046','22224047','22224048'];
                    }else if(jb=='ds'){
                        data=['22244052','22244053','22244054'];
                    }else if(jb=='xq'){
                        data=['22264058','22264059','22264060'];
                    }
                      break;
                    case '4'://民主促进会
                    if(jb=='qg'){
                      data=['22284064','22284065','22284066'];
                    }else if(jb=='sj'){
                      data=['22294067','22294068','22294069'];
                    }else if(jb=='ds'){
                        data=['22314073','22314074','22314075'];
                    }else if(jb=='xq'){
                        data=['22334079','22334080','22334081'];
                    }
                      break;
                   case '5'://农工民主党
                   if(jb=='qg'){
                    data=['22354085','22354086','22354087'];
                  }else if(jb=='sj'){
                    data=['22364088','22364089','22364090'];
                  }else if(jb=='ds'){
                      data=['22384094','22384095','22384096'];
                  }else if(jb=='xq'){
                      data=['22404100','22404101','22404102'];
                  }
                      break;
                   case '6'://致公党
                   if(jb=='qg'){
                      data=['22424106','22424107','22424108'];
                   }else if(jb=='sj'){
                      data=['22434109','22434110','22434111'];
                    }else if(jb=='ds'){
                        data=['22454115','22454116','22454117'];
                    }else if(jb=='xq'){
                        data=['22474121','22474122','22474123'];
                    }
                      break;
                   case '7'://九三学社
                   if(jb=='qg'){
                     data=['22494127','22494128','22494129'];
                  }else if(jb=='sj'){
                      data=['22504130','22504131','22504132'];
                    }else if(jb=='ds'){
                        data=['22524136','22524137','22524138'];
                    }else if(jb=='xq'){
                        data=['22544142','22544143','22544144'];
                    }
                      break;
                   case '8'://台湾民主自治同盟
                   if(jb=='qg'){
                    data=['22564148','22564149','22564150'];
                  }else if(jb=='sj'){
                      data=['22574151','22574152','22574153'];
                    }else if(jb=='ds'){
                        data=['22594157','22594158','22594159'];
                    }else if(jb=='xq'){
                        data=['22614163','22614164','22614165'];
                    }
                      break;
                    default:
                      break;
                    }
                  break;
           case '5':
                if(jb=='qg'){
                       data=['21693405','21693406','21693407'];
                  }else if(jb=='sj'){
                       data=['21703408','21703409','21703410'];
                  }else if(jb=='ds'){
                      data=['21723414','21723415','21723416'];
                  }else if(jb=='xq'){
                      data=['21743420','21743421','21743422'];
                  }
                  break;
           case '6':
                if(jb=='qg'){
                    data=['21773431','21773432','21773433'];
                }else if(jb=='sj'){
                  data=['21783434','21783435','21783436'];
                }else if(jb=='ds'){
                  data=['21803440','21803441','21803442'];
                }else if(jb=='xq'){
                  data=['21823446','21823447','21823448'];
                }
                 break;
           case '7':
                if(jb=='qg'){
                     data=['21853457','21853458','21853459'];
                 }else  if(jb=='sj'){
                     data=['21863460','21863461','21863462'];
                  }else if(jb=='ds'){
                     data=['21883466','21883467','21883468'];
                  }else if(jb=='xq'){
                     data=['21903472','21903473','21903474'];
                  }
                  break;
          default:
              break;
      }
      return data;
  
  }