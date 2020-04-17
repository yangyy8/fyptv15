const menu=[
        {
            //一级
            entity: {
              id: 0,
              jb:0,
              name: "index",
              icon: "el-icon-s-home",
              alias: "首页",
              url:'/Index'
            }
          },
          {
            //一级
            entity: {
              id: 1,
              jb: 0,
              name: "base",
              icon: "el-icon-document",
              alias: "基本信息库"
            },
            //二级
            childs: [
              {
                entity: {
                  id: 11,
                  name: "authManage",
                  icon: "el-icon-s-custom",
                  alias: "联络人员",
                },
                 //三级
                 childs: [
                    {
                      entity: {
                        id: 111,
                        name: "PairAddw",
                        icon: "el-icon-s-custom",
                        alias: "人大代表",
                      },
                       //四级
                        childs: [
                            {
                                entity: {
                                    id: 1111,
                                    name: "qg1",
                                    icon: "el-icon-s-flag",
                                    alias: "全国人大代表",
                                    url: "/Home/Personnel?type=1&jb=qg"
                                }
                            },
                            {
                                entity: {
                                    id: 1112,
                                    name: "qg2",
                                    icon: "el-icon-s-finance",
                                    alias: "省级人大代表",
                                    url: "/Home/Personnel?type=1&jb=sj"
                                }
                            },
                            {
                                entity: {
                                    id: 1113,
                                    name: "qg3",
                                    icon: "el-icon-s-marketing",
                                    alias: "地市人大代表",
                                    url: "/Home/Personnel?type=1&jb=ds"
                                }
                            },
                            {
                                entity: {
                                    id: 1114,
                                    name: "qg4",
                                    icon: "el-icon-s-shop",
                                    alias: "县区人大代表",
                                    url: "/Home/Personnel?type=1&jb=xq"
                             }
                            },
                             {
                              entity: {
                                  id: 1115,
                                  name: "qg5",
                                  icon: "el-icon-search",
                                  alias: "高级查询",
                                  url: "/Home/BaseList"
                            }
                          
                           },
                        ]
                    },
                    {
                      entity: {
                        id: 112,
                        name: "PairAdde",
                        icon: "el-icon-user-solid",
                        alias: "政协委员",
                      },
                      //四级
                      childs: [
                        {
                            entity: {
                                id: 1121,
                                name: "qg6",
                                icon: "el-icon-sold-out\r\n",
                                alias: "全国政协委员",
                                url: "/Home/Personnel?type=2&jb=qg"
                            }
                        },
                        {
                            entity: {
                                id: 1122,
                                name: "qg7",
                                icon: "el-icon-sold-out\r\n",
                                alias: "省级政协委员",
                                url: "/Home/Personnel?type=2&jb=sj"
                            }
                        },
                        {
                            entity: {
                                id: 1123,
                                name: "qg8",
                                icon: "el-icon-sold-out\r\n",
                                alias: "地市政协委员",
                                url: "/Home/Personnel?type=2&jb=ds"
                            }
                        },
                        {
                            entity: {
                                id: 1124,
                                name: "qg9",
                                icon: "el-icon-sold-out\r\n",
                                alias: "县区政协委员",
                                url: "/Home/Personnel?type=2&jb=xq"
                         }
                       },
                       {
                        entity: {
                            id: 1125,
                            name: "qg10",
                            icon: "el-icon-sold-out\r\n",
                            alias: "高级查询",
                            url: "/Home/zxBaseList"
                      }
                       }
                     ]
                    },
                    {
                      entity: {
                        id: 113,
                        name: "PairAddss",
                        icon: "el-icon-user-solid",
                        alias: "特约人员",
                      },
                       //四级
                       childs: [
                        {
                            entity: {
                                id: 1131,
                                name: "qg11",
                                icon: "el-icon-sold-out\r\n",
                                alias: "最高法人民法院特约人员",
                                url: "/Home/SpecialPerson?type=1&jb=qg"
                            }
                        },
                        {
                            entity: {
                                id: 1132,
                                name: "qg12",
                                icon: "el-icon-sold-out\r\n",
                                alias: "高级人民法院特约人员",
                                url: "/Home/SpecialPerson?type=1&jb=sj"
                            }
                        },
                        {
                            entity: {
                                id: 1133,
                                name: "qg13",
                                icon: "el-icon-sold-out\r\n",
                                alias: "中级人民法院特约人员",
                                url: "/Home/SpecialPerson?type=1&jb=ds"
                            }
                        },
                        {
                            entity: {
                                id: 1134,
                                name: "qg14",
                                icon: "el-icon-sold-out\r\n",
                                alias: "基层人民法院特约人员",
                                url: "/Home/SpecialPerson?type=1&jb=xq"
                         }
                       },{
                        entity: {
                            id: 1135,
                            name: "qg15",
                            icon: "el-icon-sold-out\r\n",
                            alias: "高级查询",
                            url: "/Home/tyBaseList"
                     }
                   },
                     ]
                    },
                 ]
              },
              {
                entity: {
                  id: 12,
                  name: "roleManage",
                  icon: "el-icon-bell",
                  alias: "联络机构",
                },
                 //三级
                 childs: [
                    // {
                    //   entity: {
                    //     id: 121,
                    //     name: "fyx",
                    //     icon: "el-icon-sold-out\r\n",
                    //     alias: "法院系统",
                    //     url: "/content/email"
                    //   }, 
                    //   //四级
                    //   childs: [
                    //    {
                    //        entity: {
                    //            id: 1211,
                    //            name: "/Home/Institution?type=1&jb=zgy",
                    //            icon: "el-icon-sold-out\r\n",
                    //            alias: "最高院",
                    //            url: "/content/email"
                    //        }
                    //    },
                    //    {
                    //        entity: {
                    //            id: 1212,
                    //            name: "/Home/Institution?type=1&jb=sgy",
                    //            icon: "el-icon-sold-out\r\n",
                    //            alias: "省高院",
                    //            url: "/content/email"
                    //        }
                    //    },
                    //    {
                    //        entity: {
                    //            id: 1213,
                    //            name: "/Home/Institution?type=1&jb=szy",
                    //            icon: "el-icon-sold-out\r\n",
                    //            alias: "市中院",
                    //            url: "/content/email"
                    //        }
                    //    },
                    //    {
                    //        entity: {
                    //            id: 1214,
                    //            name: "/Home/Institution?type=1&jb=jcfy",
                    //            icon: "el-icon-sold-out\r\n",
                    //            alias: "基层法院",
                    //            url: "/content/email"
                    //     }
                    //   }, 
                     
                    // ]
                    // },
                    {
                      entity: {
                        id: 122,
                        name: "PairAddww",
                        icon: "el-icon-sold-out\r\n",
                        alias: "人大系统",
                      },
                        //四级
                      childs: [
                        {
                            entity: {
                                id: 1221,
                                name: "qg16",
                                icon: "el-icon-sold-out\r\n",
                                alias: "全国人大代表大会",
                                url: "/Home/Institution?type=1&jb=qg"
                            }
                        },
                        {
                            entity: {
                                id: 1222,
                                name: "qg17",
                                icon: "el-icon-sold-out\r\n",
                                alias: "各省人大代表大会",
                                url: "/Home/Institution?type=1&jb=sj"
                            }
                        },
                        {
                            entity: {
                                id: 1223,
                                name: "qg18",
                                icon: "el-icon-sold-out\r\n",
                                alias: "各市人大代表大会",
                                url: "/Home/Institution?type=1&jb=ds"
                            }
                        },
                        {
                            entity: {
                                id: 1224,
                                name: "qg19",
                                icon: "el-icon-sold-out\r\n",
                                alias: "区县人大代表大会",
                                url: "/Home/Institution?type=1&jb=xq"
                         }
                       },
                       {
                        entity: {
                            id: 1225,
                            name: "qg1225",
                            icon: "el-icon-search",
                            alias: "查询",
                            url: "/Home/InstitutionList?type=1"
                        }
                      },
                     ]
                    },
                    {
                      entity: {
                        id: 123,
                        name: "PairAddw2",
                        icon: "el-icon-sold-out\r\n",
                        alias: "政协系统",
                      },
                       //四级
                       childs: [
                        {
                            entity: {
                                id: 1231,
                                name: "qg21",
                                icon: "el-icon-sold-out\r\n",
                                alias: "政协全国委员会",
                                url: "/Home/Institution?type=2&jb=qg"
                            }
                        },
                        {
                            entity: {
                                id: 1232,
                                name: "qg21",
                                icon: "el-icon-sold-out\r\n",
                                alias: "省级地方委员会",
                                url: "/Home/Institution?type=2&jb=sj"
                            }
                        },
                        {
                            entity: {
                                id: 1233,
                                name: "qg22",
                                icon: "el-icon-sold-out\r\n",
                                alias: "市级地方委员会",
                                url: "/Home/Institution?type=2&jb=ds"
                            }
                        },
                        {
                            entity: {
                                id: 1234,
                                name: "qg23",
                                icon: "el-icon-sold-out\r\n",
                                alias: "区县地方委员会",
                                url: "/Home/Institution?type=2&jb=xq"
                         }
                       },
                       {
                        entity: {
                            id: 1235,
                            name: "qg1235",
                            icon: "el-icon-search",
                            alias: "查询",
                            url: "/Home/InstitutionList?type=2"
                        }
                      },
                     ]
                    },
                    {
                      entity: {
                        id: 124,
                        name: "PairAdd22",
                        icon: "el-icon-sold-out\r\n",
                        alias: "统战部系统",
                      },
                       //四级
                       childs: [
                        {
                            entity: {
                                id: 1241,
                                name: "qg24",
                                icon: "el-icon-sold-out\r\n",
                                alias: "中央统战部",
                                url: "/Home/Institution?type=3&jb=qg"
                            }
                        },
                        {
                            entity: {
                                id: 1242,
                                name: "qg25",
                                icon: "el-icon-sold-out\r\n",
                                alias: "各省统战部",
                                url: "/Home/Institution?type=3&jb=sj"
                            }
                        },
                        {
                            entity: {
                                id: 1243,
                                name: "qg26",
                                icon: "el-icon-sold-out\r\n",
                                alias: "各市统战部",
                                url: "/Home/Institution?type=3&jb=ds"
                            }
                        },
                        {
                            entity: {
                                id: 1244,
                                name: "qg27",
                                icon: "el-icon-sold-out\r\n",
                                alias: "区县统战部",
                                url: "/Home/Institution?type=3&jb=xq"
                         }
                       },
                       {
                        entity: {
                            id: 1245,
                            name: "qg1245",
                            icon: "el-icon-search",
                            alias: "查询",
                            url: "/Home/InstitutionList?type=3"
                        }
                      },
                       
                     ]
                    },
                    {
                      entity: {
                        id: 125,
                        name: "PairAdd25",
                        icon: "el-icon-sold-out\r\n",
                        alias: "民主党派系统",
                      },
                      //四级
                      childs: [
                        {
                            entity: {
                                id: 1251,
                                name: "qg28",
                                icon: "el-icon-sold-out\r\n",
                                alias: "八大民主党派",
                                url: "/Home/Institution?type=4&jb=qg"
                            }
                        },
                        {
                            entity: {
                                id: 1252,
                                name: "qg29",
                                icon: "el-icon-sold-out\r\n",
                                alias: "各省民主党派",
                                url: "/Home/Institution?type=4&jb=sj"
                            }
                        },
                        {
                            entity: {
                                id: 1253,
                                name: "qg30",
                                icon: "el-icon-sold-out\r\n",
                                alias: "各市民主党派",
                                url: "/Home/Institution?type=4&jb=ds"
                            }
                        },
                        {
                            entity: {
                                id: 1254,
                                name: "qg31",
                                icon: "el-icon-sold-out\r\n",
                                alias: "区县民主党派",
                                url: "/Home/Institution?type=4&jb=xq"
                         }
                       },
                       {
                        entity: {
                            id: 1255,
                            name: "qg1255",
                            icon: "el-icon-search",
                            alias: "查询",
                            url: "/Home/InstitutionList?type=4"
                        }
                      },
                     ]
                    },
                    {
                      entity: {
                        id: 126,
                        name: "PairAdd6",
                        icon: "el-icon-sold-out\r\n",
                        alias: "工商联系统",
                      },
                       //四级
                      childs: [
                        {
                            entity: {
                                id: 1261,
                                name: "qg32",
                                icon: "el-icon-sold-out\r\n",
                                alias: "全国工商联",
                                url: "/Home/Institution?type=5&jb=qg"
                            }
                        },
                        {
                            entity: {
                                id: 1262,
                                name: "qg33",
                                icon: "el-icon-sold-out\r\n",
                                alias: "各省工商联",
                                url: "/Home/Institution?type=5&jb=sj"
                            }
                        },
                        {
                            entity: {
                                id: 1263,
                                name: "qg34",
                                icon: "el-icon-sold-out\r\n",
                                alias: "各市工商联",
                                url: "/Home/Institution?type=5&jb=ds"
                            }
                        },
                        {
                            entity: {
                                id: 1264,
                                name: "qg35",
                                icon: "el-icon-sold-out\r\n",
                                alias: "区县工商联",
                                url: "/Home/Institution?type=5&jb=xq"
                         }
                       },
                       {
                        entity: {
                            id: 1265,
                            name: "qg1265",
                            icon: "el-icon-search",
                            alias: "查询",
                            url: "/Home/InstitutionList?type=5"
                        }
                      },
                     ]
                    },
                    {
                      entity: {
                        id: 127,
                        name: "PairAdd7",
                        icon: "el-icon-sold-out\r\n",
                        alias: "台联系统",
                      },
                       //四级
                      childs: [
                        {
                            entity: {
                                id: 1271,
                                name: "qg36",
                                icon: "el-icon-sold-out\r\n",
                                alias: "全国台联",
                                url: "/Home/Institution?type=6&jb=qg"
                            }
                        },
                        {
                            entity: {
                                id: 1272,
                                name: "qg37",
                                icon: "el-icon-sold-out\r\n",
                                alias: "各省台联",
                                url: "/Home/Institution?type=6&jb=sj"
                            }
                        },
                        {
                            entity: {
                                id: 1273,
                                name: "qg38",
                                icon: "el-icon-sold-out\r\n",
                                alias: "各市台联",
                                url: "/Home/Institution?type=6&jb=ds"
                            }
                        },
                        {
                            entity: {
                                id: 1274,
                                name: "qg39",
                                icon: "el-icon-sold-out\r\n",
                                alias: "区县台联",
                                url: "/Home/Institution?type=6&jb=xq"
                         }
                       },
                       {
                        entity: {
                            id: 1275,
                            name: "qg1275",
                            icon: "el-icon-search",
                            alias: "查询",
                            url: "/Home/InstitutionList?type=6"
                        }
                      },
                     ]
                    },
                 ]
              },
              {
                entity: {
                  id: 13,
                  name: "menuManage",
                  icon: "el-icon-edit",
                  alias: "法院内部管理",
                },
                 //三级
                 childs: [
                    {
                      entity: {
                        id: 131,
                        name: "fyx",
                        icon: "el-icon-sold-out\r\n",
                        alias: "各级法院",
                      }, 
                      //四级
                      childs: [
                       {
                           entity: {
                               id: 1311,
                               name: "qg40",
                               icon: "el-icon-sold-out\r\n",
                               alias: "最高院",
                               url: "/Home/CourtInfo?type=1"
                           }
                       },
                       {
                           entity: {
                               id: 1312,
                               name: "qg41",
                               icon: "el-icon-sold-out\r\n",
                               alias: "省高院",
                               url: "/Home/CourtInfo?type=2"
                           }
                       },
                       {
                           entity: {
                               id: 1313,
                               name: "qg42",
                               icon: "el-icon-sold-out\r\n",
                               alias: "市中院",
                               url: "/Home/CourtInfo?type=3"
                           }
                       },
                       {
                           entity: {
                               id: 1314,
                               name: "qg43",
                               icon: "el-icon-sold-out\r\n",
                               alias: "基层法院",
                               url: "/Home/CourtInfo?type=4"
                        }
                      },
                      {
                        entity: {
                            id: 1315,
                            name: "qg1315",
                            icon: "el-icon-sold-out\r\n",
                            alias: "查询",
                            url: "/Home/CourtList"
                     }
                   },
                    ]
                    },
                    {
                      entity: {
                        id: 132,
                        name: "fy2x",
                        icon: "el-icon-sold-out\r\n",
                        alias: "法院人员",
                      }, 
                      //四级
                      childs: [
                       {
                           entity: {
                               id: 1321,
                               name: "qg44",
                               icon: "el-icon-sold-out\r\n",
                               alias: "最高院人员",
                               url: "/Home/CourtPersonnel?type=1"
                           }
                       },
                       {
                           entity: {
                               id: 1322,
                               name: "qg45",
                               icon: "el-icon-sold-out\r\n",
                               alias: "各省高院人员",
                               url: "/Home/CourtPersonnel?type=2"
                           }
                       },
                       {
                           entity: {
                               id: 1323,
                               name: "qg46",
                               icon: "el-icon-sold-out\r\n",
                               alias: "各市中院人员",
                               url: "/Home/CourtPersonnel?type=3"
                           }
                       },
                       {
                           entity: {
                               id: 1324,
                               name: "qg47",
                               icon: "el-icon-sold-out\r\n",
                               alias: "区县基层法院人员",
                               url: "/Home/CourtPersonnel?type=4"
                        }
                      },
                      {
                        entity: {
                            id: 1325,
                            name: "qg1325",
                            icon: "el-icon-sold-out\r\n",
                            alias: "高级查询",
                            url: "/Home/CourtPersonnelList"
                      }
                     },
                    ]
                    },
                ]
              },
              {
                entity: {
                  id: 15100,
                  name: "roleManage01",
                  icon: "el-icon-edit",
                  alias: "角色管理",
                },
                childs: [
                  {
                    entity: {
                      id: 151001,
                      name: "role1",
                      icon: "el-icon-sold-out",
                      alias: "用户管理",
                      url:'/Home/UserManagement',
                    }, 
                  },
                  {
                    entity: {
                      id: 151002,
                      name: "role2",
                      icon: "el-icon-sold-out",
                      alias: "角色管理",
                      url:'/Home/RoleManagement',
                    }, 
                  },
                ]

              },
            ]
          },
          {
            //一级
            entity: {
              id: 2,
              jb:0,
              name: "userManage",
              icon: "el-icon-cold-drink",
              alias: "联络工作"
            },
            //二级
            childs: [
              //{
              //   entity: {
              //     id: 21,
              //     name: "qg48",
              //     icon: "el-icon-phone-outline\r\n",
              //     alias: "结对活动",
              //     url: "/Home/PairAdd?type=1"
              //   },
                
              // },
              // {
              //   entity: {
              //     id: 22,
              //     name: "qg49",
              //     icon: "el-icon-picture",
              //     alias: "专项视察",
              //     url: "/Home/SpecialAdd?type=2"
              //   }
              // },
              // {
              //   entity: {
              //     id: 23,
              //     name: "qg50",
              //     icon: "el-icon-picture",
              //     alias: "专题调研",
              //     url: "/Home/SpecialAdd?type=3"
              //   }
              // },
              // {
              //   entity: {
              //     id: 24,
              //     name: "qg51",
              //     icon: "el-icon-picture",
              //     alias: "旁听庭审",
              //     url: "/Home/SpecialAdd?type=4"
              //   }
              // },
              // {
              //   entity: {
              //     id: 25,
              //     name: "qg52",
              //     icon: "el-icon-picture",
              //     alias: "见证执行",
              //     url: "/Home/SpecialAdd?type=5"
              //   }
              // },
              // {
              //   entity: {
              //     id: 26,
              //     name: "qg53",
              //     icon: "el-icon-picture",
              //     alias: "会议座谈",
              //     url: "/Home/SpecialAdd?type=6"
              //   }
              // },
              // {
              //   entity: {
              //     id: 27,
              //     name: "qg54",
              //     icon: "el-icon-picture",
              //     alias: "日常走访",
              //     url: "/Home/SpecialAdd?type=7"
              //   }
              // },
              // {
              //   entity: {
              //     id: 28,
              //     name: "qg55",
              //     icon: "el-icon-picture",
              //     alias: "新闻宣传",
              //     url: "/Home/SpecialAdd?type=8"
              //   }
              // },
              // {
              //   entity: {
              //     id: 29,
              //     name: "qg56",
              //     icon: "el-icon-picture",
              //     alias: "日常接待",
              //     url: "/Home/SpecialAdd?type=9"
              //   }
              // },
              // {
              //   entity: {
              //     id: 290,
              //     name: "qg57",
              //     icon: "el-icon-picture",
              //     alias: "年度工作总结与计划",
              //     url: "/user/integral"
              //   }
              // },
              // {
              //   entity: {
              //     id: 291,
              //     name: "qg58",
              //     icon: "el-icon-picture",
              //     alias: "其他",
              //     url: "/Home/SpecialAdd?type=10"
              //   }
              // },
              // {
              //   entity: {
              //     id: 292,
              //     name: "qg59",
              //     icon: "el-icon-picture",
              //     alias: "高级查询",
              //     url: "/Home/PairList"
              //   }
              // },
              {
                entity: {
                  id: 12001,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "40",
                },
               
              },
              {
                entity: {
                  id: 12001,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "39",
                },
               
              },
              {
                entity: {
                  id: 12001,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "38",
                },
               
              },
              {
                entity: {
                  id: 12001,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "37",
                },
               
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "36",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "35",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "34",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "33",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "32",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "31",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "30",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "29",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "28",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "27",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "26",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "27",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "24",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "23",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "22",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "21",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "20",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "19",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "18",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "17",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "16",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "15",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "14",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "13",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "12",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "11",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "10",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "9",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "8",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "7",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "6",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "5",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "4",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "3",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "2",
                },
              },
              {
                entity: {
                  id: 12002,
                  name: "PairAddw",
                  icon: "el-icon-s-custom",
                  alias: "1",
                },
              },
            ]
          },
          {
            //一级
            entity: {
              id: 40,
              jb:0,
              name: "contentManage",
              icon: "el-icon-edit-outline",
              alias: "办理工作"
            },
            //二级
            childs: [
              {
                entity: {
                  id: 41,
                  name: "clae2",
                  icon: "el-icon-printer",
                  alias: "关注案件管理"
                },
                //三级
                childs: [
                  {
                    entity: {
                      id: 411,
                      name: "classiwge3",
                      icon: "el-icon-bell",
                      alias: "2019"
                    },
                    //四级
                    childs: [
                      {
                        entity: {
                          id: 4111,
                          name: "qg60",
                          icon: "el-icon-search",
                          alias: "查询",
                          url: "/Home/CaseList"
                        }
                      },
                      {
                        entity: {
                          id: 4112,
                          name: "qg61",
                          icon: "el-icon-search",
                          alias: "登记",
                          url: "/Home/CaseInfo?type=0"
                        }
                      },
                      {
                        entity: {
                          id: 4113,
                          name: "qg62",
                          icon: "el-icon-search",
                          alias: "报批（审批）",
                          url: "/Home/CaseList"
                        }
                      },
                      {
                        entity: {
                          id: 4114,
                          name: "qg63",
                          icon: "el-icon-search",
                          alias: "交办",
                          url: "/Home/CaseList"
                        }
                      },
                      {
                        entity: {
                          id: 4115,
                          name: "qg64",
                          icon: "el-icon-search",
                          alias: "办理",
                          url: "/Home/CaseList"
                        }
                      },
                      {
                        entity: {
                          id: 4116,
                          name: "qg65",
                          icon: "el-icon-search",
                          alias: "办结",
                          url: "/Home/CaseList"
                        }
                      },
                      {
                        entity: {
                          id: 4117,
                          name: "qg66",
                          icon: "el-icon-search",
                          alias: "催办",
                          url: "/Home/CaseList"
                        }
                      },
                      {
                        entity: {
                          id: 4118,
                          name: "qg67",
                          icon: "el-icon-search",
                          alias: "复文",
                          url: "/Home/CaseList"
                        }
                      },
                      {
                        entity: {
                          id: 4119,
                          name: "qg68",
                          icon: "el-icon-search",
                          alias: "导入",
                          url: "/Home/CaseList"
                        }
                      },
                      {
                        entity: {
                          id: 41190,
                          name: "qg69",
                          icon: "el-icon-search",
                          alias: "下载",
                          url: "/Home/CaseList"
                        }
                      },
                      
                    ]
                  }
                ]
              },
              {
                entity: {
                  id: 42,
                  name: "classqe2",
                  icon: "el-icon-printer",
                  alias: "建议、批评和意见管理"
                },
                //三级
                childs: [
                  {
                    entity: {
                      id: 421,
                      name: "classi5ge3",
                      icon: "el-icon-bell",
                      alias: "2019"
                    },
                    //四级
                    childs: [
                      {
                        entity: {
                          id: 4211,
                          name: "qg70",
                          icon: "el-icon-search",
                          alias: "查询",
                          url: "/Home/SuggestList?type=0"
                        }
                      },
                      {
                        entity: {
                          id: 4212,
                          name: "qg71",
                          icon: "el-icon-search",
                          alias: "登记",
                          url: "/Home/SuggestInfo?type=0"
                        }
                      },
                      // {
                      //   entity: {
                      //     id: 4213,
                      //     name: "qg72",
                      //     icon: "el-icon-search",
                      //     alias: "报批（审批）",
                      //     url: "/Home/SuggestList"
                      //   }
                      // },
                      {
                        entity: {
                          id: 4214,
                          name: "qg73",
                          icon: "el-icon-search",
                          alias: "交办",
                          url: "/Home/SuggestList?type=0&zt=jb"
                        }
                      },
                      {
                        entity: {
                          id: 4215,
                          name: "qg74",
                          icon: "el-icon-search",
                          alias: "办理",
                          url: "/Home/SuggestList?type=0&zt=bl"
                        }
                      },
                      {
                        entity: {
                          id: 4216,
                          name: "qg75",
                          icon: "el-icon-search",
                          alias: "统稿",
                          url: "/Home/SuggestList?type=0&zt=tg"
                        }
                      },
                      {
                        entity: {
                          id: 4217,
                          name: "qg76",
                          icon: "el-icon-search",
                          alias: "催办",
                          url: "/Home/SuggestList?type=0&zt=cb"
                        }
                      },
                      {
                        entity: {
                          id: 4218,
                          name: "qg77",
                          icon: "el-icon-search",
                          alias: "复文",
                          url: "/Home/SuggestList?type=0&zt=fw"
                        }
                      },
                      {
                        entity: {
                          id: 4219,
                          name: "qg78",
                          icon: "el-icon-search",
                          alias: "导入",
                          url: "/Home/SuggestList?type=0"
                        }
                      },
                      {
                        entity: {
                          id: 42190,
                          name: "qg79",
                          icon: "el-icon-search",
                          alias: "下载",
                          url: "/Home/SuggestList?type=0"
                        }
                      },
                      
                    ]
                  }
                ]
              },
              {
                entity: {
                  id: 43,
                  name: "claswe2",
                  icon: "el-icon-printer",
                  alias: "代表议案管理"
                },
                //三级
                childs: [
                  {
                    entity: {
                      id: 431,
                      name: "clasqwwge3",
                      icon: "el-icon-bell",
                      alias: "2019"
                    },
                    //四级
                    childs: [
                      {
                        entity: {
                          id: 4311,
                          name: "qg80",
                          icon: "el-icon-search",
                          alias: "查询",
                          url: "/Home/SuggestList?type=1"
                        }
                      },
                      {
                        entity: {
                          id: 4312,
                          name: "qg81",
                          icon: "el-icon-search",
                          alias: "登记",
                          url: "/Home/SuggestInfo?type=2"
                        }
                      },
                      // {
                      //   entity: {
                      //     id: 4313,
                      //     name: "qg82",
                      //     icon: "el-icon-search",
                      //     alias: "报批（审批）",
                      //     url: "/content/classify"
                      //   }
                      // },
                      {
                        entity: {
                          id: 4314,
                          name: "qg83",
                          icon: "el-icon-search",
                          alias: "交办",
                          url: "/Home/SuggestList?type=1&zt=jb"
                        }
                      },
                      {
                        entity: {
                          id: 4315,
                          name: "qg84",
                          icon: "el-icon-search",
                          alias: "办理",
                          url: "/Home/SuggestList?type=1&zt=bl"
                        }
                      },
                      {
                        entity: {
                          id: 4316,
                          name: "qg85",
                          icon: "el-icon-search",
                          alias: "统稿",
                          url: "/Home/SuggestList?type=1&zt=tg"
                        }
                      },
                      {
                        entity: {
                          id: 4317,
                          name: "qg86",
                          icon: "el-icon-search",
                          alias: "催办",
                          url: "/Home/SuggestList?type=1&zt=cb"
                        }
                      },
                      {
                        entity: {
                          id: 4318,
                          name: "qg87",
                          icon: "el-icon-search",
                          alias: "复文",
                          url: "/Home/SuggestList?type=1&zt=fw"
                        }
                      },
                      {
                        entity: {
                          id: 4319,
                          name: "qg88",
                          icon: "el-icon-search",
                          alias: "导入",
                          url: "/Home/SuggestList?type=1"
                        }
                      },
                      {
                        entity: {
                          id: 43190,
                          name: "qg89",
                          icon: "el-icon-search",
                          alias: "下载",
                          url: "/Home/SuggestList?type=1"
                        }
                      },
                    ]
                  }
                ]
              },
              {
                entity: {
                  id: 44,
                  name: "classse2",
                  icon: "el-icon-printer",
                  alias: "政协提案管理"
                },
                //三级
                childs: [
                  {
                    entity: {
                      id: 441,
                      name: "classe",
                      icon: "el-icon-bell",
                      alias: "2019"
                    },
                    //四级
                    childs: [
                      {
                        entity: {
                          id: 4411,
                          name: "qg90",
                          icon: "el-icon-search",
                          alias: "查询",
                          url: "/Home/SuggestList?type=2"
                        }
                      },
                      {
                        entity: {
                          id: 4412,
                          name: "qg91",
                          icon: "el-icon-search",
                          alias: "登记",
                          url: "/Home/SuggestInfo?type=2"
                        }
                      },
                      // {
                      //   entity: {
                      //     id: 4413,
                      //     name: "qg92",
                      //     icon: "el-icon-search",
                      //     alias: "报批（审批）",
                      //     url: "/content/classify"
                      //   }
                      // },
                      {
                        entity: {
                          id: 4414,
                          name: "qg93",
                          icon: "el-icon-search",
                          alias: "交办",
                          url: "/Home/SuggestList?type=2&zt=jb"
                        }
                      },
                      {
                        entity: {
                          id: 4415,
                          name: "qg94",
                          icon: "el-icon-search",
                          alias: "办理",
                          url: "/Home/SuggestList?type=2&zt=bl"
                        }
                      },
                      {
                        entity: {
                          id: 4416,
                          name: "qg95",
                          icon: "el-icon-search",
                          alias: "统稿",
                          url: "/Home/SuggestList?type=2&zt=tg"
                        }
                      },
                      {
                        entity: {
                          id: 4417,
                          name: "qg96",
                          icon: "el-icon-search",
                          alias: "催办",
                          url: "/Home/SuggestList?type=2&zt=cb"
                        }
                      },
                      {
                        entity: {
                          id: 4418,
                          name: "qg97",
                          icon: "el-icon-search",
                          alias: "复文",
                          url: "/Home/SuggestList?type=2&zt=fw"
                        }
                      },
                      {
                        entity: {
                          id: 4419,
                          name: "qg98",
                          icon: "el-icon-search",
                          alias: "导入",
                          url: "/Home/SuggestList?type=2"
                        }
                      },
                      {
                        entity: {
                          id: 44190,
                          name: "qg99",
                          icon: "el-icon-search",
                          alias: "下载",
                          url: "/Home/SuggestList?type=2"
                        }
                      },
                      
                    ]
                  }
                ]
              },
              {
                entity: {
                  id: 45,
                  name: "clasp",
                  icon: "el-icon-printer",
                  alias: "审议意见管理"
                },
                //三级
                childs: [
                  {
                    entity: {
                      id: 451,
                      name: "classe",
                      icon: "el-icon-bell",
                      alias: "2019"
                    },
                    //四级
                    childs: [
                      {
                        entity: {
                          id: 4511,
                          name: "qg100",
                          icon: "el-icon-search",
                          alias: "查询",
                          url: "/Home/SuggestList?type=3"
                        }
                      },
                      {
                        entity: {
                          id: 4512,
                          name: "qg101",
                          icon: "el-icon-search",
                          alias: "登记",
                          url: "/Home/SuggestInfo?type=3"
                        }
                      },
                      // {
                      //   entity: {
                      //     id: 4513,
                      //     name: "qg102",
                      //     icon: "el-icon-search",
                      //     alias: "报批（审批）",
                      //     url: "/content/classify"
                      //   }
                      // },
                      {
                        entity: {
                          id: 4514,
                          name: "qg103",
                          icon: "el-icon-search",
                          alias: "交办",
                          url: "/Home/SuggestList?type=3&zt=jb"
                        }
                      },
                      {
                        entity: {
                          id: 4515,
                          name: "qg104",
                          icon: "el-icon-search",
                          alias: "办理",
                          url: "/Home/SuggestList?type=3&zt=bl"
                        }
                      },
                      {
                        entity: {
                          id: 4516,
                          name: "qg105",
                          icon: "el-icon-search",
                          alias: "统稿",
                          url: "/Home/SuggestList?type=3&zt=tg"
                        }
                      },
                      {
                        entity: {
                          id: 4517,
                          name: "qg106",
                          icon: "el-icon-search",
                          alias: "催办",
                          url: "/Home/SuggestList?type=3&zt=cb"
                        }
                      },
                      {
                        entity: {
                          id: 4518,
                          name: "qg107",
                          icon: "el-icon-search",
                          alias: "复文",
                          url: "/Home/SuggestList?type=3&zt=fw"
                        }
                      },
                      {
                        entity: {
                          id: 4519,
                          name: "qg108",
                          icon: "el-icon-search",
                          alias: "导入",
                          url: "/Home/SuggestList?type=3"
                        }
                      },
                      {
                        entity: {
                          id: 45190,
                          name: "qg109",
                          icon: "el-icon-search",
                          alias: "下载",
                          url: "/Home/SuggestList?type=3"
                        }
                      },
                      
                    ]
                  }
                ]
              },
              {
                entity: {
                  id: 46,
                  name: "classsee2",
                  icon: "el-icon-printer",
                  alias: "日常意见建议管理"
                },
                //三级
                childs: [
                  {
                    entity: {
                      id: 461,
                      name: "classe",
                      icon: "el-icon-bell",
                      alias: "2019"
                    },
                    //四级
                    childs: [
                      {
                        entity: {
                          id: 4611,
                          name: "qg110",
                          icon: "el-icon-search",
                          alias: "查询",
                          url: "/Home/SuggestList?type=4"
                        }
                      },
                      {
                        entity: {
                          id: 4612,
                          name: "qg111",
                          icon: "el-icon-search",
                          alias: "登记",
                          url: "/Home/SuggestInfo?type=4"
                        }
                      },
                      // {
                      //   entity: {
                      //     id: 4613,
                      //     name: "qg112",
                      //     icon: "el-icon-search",
                      //     alias: "报批（审批）",
                      //     url: "/content/classify"
                      //   }
                      // },
                      {
                        entity: {
                          id: 4614,
                          name: "qg113",
                          icon: "el-icon-search",
                          alias: "交办",
                          url: "/Home/SuggestList?type=4&zt=jb"
                        }
                      },
                      {
                        entity: {
                          id: 4615,
                          name: "qg114",
                          icon: "el-icon-search",
                          alias: "办理",
                          url: "/Home/SuggestList?type=4&zt=bl"
                        }
                      },
                      {
                        entity: {
                          id: 4616,
                          name: "qg115",
                          icon: "el-icon-search",
                          alias: "统稿",
                          url: "/Home/SuggestList?type=4&zt=tg"
                        }
                      },
                      {
                        entity: {
                          id: 4617,
                          name: "qg116",
                          icon: "el-icon-search",
                          alias: "催办",
                          url: "/Home/SuggestList?type=4&zt=cb"
                        }
                      },
                      {
                        entity: {
                          id: 4618,
                          name: "qg117",
                          icon: "el-icon-search",
                          alias: "复文",
                          url: "/Home/SuggestList?type=4&zt=fw"
                        }
                      },
                      {
                        entity: {
                          id: 4619,
                          name: "qg118",
                          icon: "el-icon-search",
                          alias: "导入",
                          url: "/Home/SuggestList?type=4"
                        }
                      },
                      {
                        entity: {
                          id: 46190,
                          name: "qg119",
                          icon: "el-icon-search",
                          alias: "下载",
                          url: "/Home/SuggestList?type=4"
                        }
                      },
                      
                    ]
                  }
                ]
              },
            ]
          },
          {
                //一级
             entity: {
               id: 50,
               jb: 0 ,
               name: "tjxx",
               icon: "el-icon-s-data",
               alias: "统计信息"
             },
             //二级
             childs: [
                {
                  entity: {
                    id: 51,
                    name: "jk6bj",
                    icon: "el-icon-printer",
                    alias: "联络人员信息统计"
                  },
                  //四级
                  childs: [
                    {
                        entity: {
                            id: 511,
                            name: "qg120",
                            icon: "el-icon-mobile",
                            alias: "人大代表信息统计",
                            url:'/Home/PersonnelCount?type=1'
                          }
                    },
                    {
                        entity: {
                            id: 512,
                            name: "qg121",
                            icon: "el-icon-mobile",
                            alias: "政协委员信息统计",
                            url:'/Home/PersonnelCount?type=2'
                          }
                    },
                    {
                        entity: {
                            id: 513,
                            name: "qg122",
                            icon: "el-icon-mobile",
                            alias: "特约人员信息统计",
                            url:'/Home/PersonnelCount?type=3'
                          }
                    },
                  ]
                },
                {
                    entity: {
                      id: 52,
                      name: "qg123",
                      icon: "el-icon-printer",
                      alias: "联络机构信息统计",
                      url:''
                    },
                    
                },
                {
                    entity: {
                      id: 53,
                      name: "jk2bj",
                      icon: "el-icon-printer",
                      alias: "法院内部信息统计"
                    },
                   //四级
                    childs: [
                        {
                            entity: {
                                id: 531,
                                name: "qg124",
                                icon: "el-icon-mobile",
                                alias: "法院内部机构信息统计",
                                url:''
                            }
                        },
                        {
                            entity: {
                                id: 532,
                                name: "gq125",
                                icon: "el-icon-mobile",
                                alias: "法院内部人员信息统计",
                                url:''
                            }
                        },
                    
                    ]
                },
                {
                    entity: {
                      id: 54,
                      name: "ge126",
                      icon: "el-icon-printer",
                      alias: "联络工作信息统计",
                      url:''
                    },
                },
                {
                    entity: {
                      id: 55,
                      name: "jkwebj",
                      icon: "el-icon-printer",
                      alias: "办理工作信息统计"
                    },
                      //四级
                      childs: [
                        {
                            entity: {
                                id: 551,
                                name: "qg127",
                                icon: "el-icon-mobile",
                                alias: "关注案件信息统计",
                                url:'/Home/CaseCount'
                            }
                        },
                        {
                            entity: {
                                id: 552,
                                name: "qg128",
                                icon: "el-icon-mobile",
                                alias: "建议、批评和意见信息统计",
                                url:''
                            }
                        },
                        {
                            entity: {
                                id: 553,
                                name: "gq129",
                                icon: "el-icon-mobile",
                                alias: "代表议案信息统计",
                                url:''
                            }
                        },
                        {
                            entity: {
                                id: 554,
                                name: "qg129",
                                icon: "el-icon-mobile",
                                alias: "政协提案信息统计",
                                url:''
                            }
                        },
                        {
                            entity: {
                                id: 555,
                                name: "qg130",
                                icon: "el-icon-mobile",
                                alias: "审议意见信息统计",
                                url:''
                            }
                        },
                        {
                            entity: {
                                id: 556,
                                name: "qg131",
                                icon: "el-icon-mobile",
                                alias: "日常意见建议信息统计",
                                url:''
                            }
                        },
                    
                    ]
                }
              ]
                
          },
          {
            //一级
            entity: {
                id: 60,
                jb:0,
                name: "jkbej",
                icon: "el-icon-view",
                alias: "监控和预警"
            },
             //二级
             childs: [
                {
                  entity: {
                    id: 61,
                    name: "qg132",
                    icon: "el-icon-printer",
                    alias: "办理流程监控",
                    url:''
                  },
                },
                {
                    entity: {
                      id: 62,
                      name: "qg133",
                      icon: "el-icon-menu",
                      alias: "个性化组包推送",
                      url:''
                    },
                  },
                  {
                    entity: {
                      id: 63,
                      name: "qg134",
                      icon: "el-icon-s-grid",
                      alias: "系统设定",
                      url:'/Home/sysset'
                    },
                  }
              ]

         },
    ]
export default
{
	menu
}
