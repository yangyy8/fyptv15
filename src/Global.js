const aport1="";//李志鹏
const aport2="";//任智强
const aport3="";//刘逸文
const aport4=window.IPConfig.Login;//用户管理
const uploads=window.IPConfig.IP;
const fycount=3;//分页
const imgformat="jpg,jpeg,png";//图片格式
const docformat="doc,docx,xls,xlsx";//文件格式
const zddz="/service/getRedisDataByDm?tablename=";
const tb="/service/getGroupType";//团别
const qtb=zddz+"dic_osbu_grouptype";//团别
const xb=zddz+"dic_osbu_sex";//性别
const lwqj=zddz+"dic_osbu_period";//来文期间
const ajlx=zddz+"dic_osbu_caseclass";//案件类型
const ajzt=zddz+"dic_osbu_casestatus";//案件状态
const sljd=zddz+"dic_osbu_adjudgementphase";//审理阶段
const lhgx=zddz+"dic_osbu_interestrelations";//利害关系
const fyjb=zddz+"dic_osbu_courtlevel";//法院级别
const bfby=zddz+"dic_osbu_notsatisfied";//不服本院
const zbxs=zddz+"dic_osbu_assigntype";//转办形式
const bjjg=zddz+"dic_osbu_completedresult";//办结结果
const jb=zddz+"dic_osbu_sessiontype";//届别
const jjb=zddz+"dic_osbu_circlestype";//界别
const cb=zddz+"dic_osbu_timestype";//次别
const xxcz=zddz+"dic_osbu_informationoperation";//信息操作
const spjg=zddz+"dic_osbu_checkresult";//审批结果
const jgydbyj=zddz+"dic_osbu_representativesatisfaction";//结果与代表意见
const gtxs=zddz+"dic_osbu_communicatetype";//沟通形式
const gtxg=zddz+"dic_osbu_communicateresult";//沟通效果
const dfxs=zddz+"dic_osbu_replyform";//答复形式
const dfxz=zddz+"dic_osbu_replynature";//答复性质
const cbxs=zddz+"dic_osbu_urgenttype";//催办形式
const lwlylb=zddz+"dic_osbu_lettersourcetype";//来文来源类别
const xzqh=zddz+"dic_osbu_administrativedivision";//行政区划
const jg=zddz+"dic_ioex_hometown";//籍贯
const tyry=zddz+"dic_osbu_specialpersondistinguish";//特约监督员或特邀咨询员活动区分
const dp=zddz+"dic_osbu_partisan";//党派
const jbb=zddz+"dic_osbu_leveltype";//级别
const mz=zddz+"dic_osbu_nationality";//民族
const xl=zddz+"dic_osbu_education";//学历
const zylb=zddz+"dic_osbu_jobtype";//职业类别
const zmwyh=zddz+"dic_osbu_specialcommitteesdistinguish";//专门委员会委员(是否)
const jgwyh=zddz+"dic_ioex_specialorgdistinction";//专门委员会(机构)
const bzdr=zddz+"dic_osbu_notholdreason";//不担任原因
const hdlx=zddz+"dic_osbu_activitytype";//活动类型
const hdfs=zddz+"dic_osbu_activitymode";//活动方式
const tylb=zddz+"dic_osbu_specialtype";//特约类别
const zzfl=zddz+"dic_osbu_contactresponsibilitytype";//职责分类
const dwlxr=zddz+"dic_osbu_distinguish";//对外联系人
const sfbm=zddz+"dic_osbu_departmentdistinction";//是否部门
const taywzl=zddz+"dic_osbu_proposalspecies";//提案业务种类
const yaywzl=zddz+"dic_osbu_motionspecies";//议案业务种类
const syyjfl=zddz+"dic_osbu_deliberationsspecies";//审议意见分类
const scjyfl=zddz+"dic_osbu_dailymotionspecies";//日常建议意见分类
const yajyfl=zddz+"dic_osbu_suggestionsspecies";//建议、批评与意见分类业务种类
const yalx=zddz+"dic_osbu_proposaltype";//议案类型
const cblb=zddz+"dic_osbu_undertaketype";//承办类别
const cbxz=zddz+"dic_osbu_undertakenature";//承办性质
const taxs=zddz+"dic_osbu_proposalform";//提案形式
const dflx=zddz+"dic_osbu_replytype";//答复类型
const zdywfl=zddz+"dic_osbu_importantbusinesstype";//重点业务分类
const tgxs=zddz+"dic_osbu_draftmergertype";//统稿形式

const zdqf=zddz+"dic_osbu_importantdistinguish";//重点区分
const scfl=zddz+"dic_osbu_inspectstype";//视察分类 
const xwdwfl=zddz+"dic_osbu_newsmediatype";//新闻单位类别
const xwdwjb=zddz+"dic_osbu_newsmedialevel";//新闻单位级别
const xw=zddz+"dic_osbu_degree";//学位
const tazz=zddz+"dic_osbu_proposalorg";//提案组织
const zdaj=zddz+"dic_osbu_emphasiscase";//重点案件
const cfaj=zddz+"dic_osbu_repeatcase";//重复案件
const zbqf=zddz+"dic_osbu_assigndistinguish";//转办区分
const zbgzqf=zddz+"dic_osbu_assigninformdistinguish";//转办告知区分
const dblb=zddz+"dic_osbu_superviseassigntype";//督转办类别
const dbnf=zddz+"dic_osbu_assignyear";//督转办年份
const zzxgwjlx=zddz+"dic_ioex_workrelfiletype";//工作相关文件类型
const zw=zddz+"dic_ioex_positiontype";//职务
const sfxhft=zddz+"dic_ioex_circuitcourtdistinction";//是否巡回法庭
const gkqf=zddz+"dic_osbu_publicdistinguish";//公开区分
const sflr=zddz+"dic_osbu_reelectiondistinguish";//是否连任
const jdqf=zddz+"dic_ioex_pairstatus";//结对区分
const gkzt=zddz+"dic_osbu_publicstatus";//公开状态
const zsqf=zddz+"dic_ioex_showdistinction";//展示区分
const zszt=zddz+"dic_ioex_showstatus";//展示状态
const shqf=zddz+"dic_osbu_checkdistinguish";//审核区分
const shzt=zddz+"dic_osbu_checkstatus";//审核状态
const fbqf=zddz+"dic_osbu_pushdistinguish";//发布区分
const fbzt=zddz+"dic_osbu_releasestatus";//发布状态
const fyywlx=zddz+"dic_ioex_courtnewstype";//法院要闻类型
const fyywly=zddz+"dic_ioex_courtnewssource";//法院要闻来源
const bxqf=zddz+"dic_ioex_supplementdistinction";//补选区分
const jpyy=zddz+"dic_ioex_dismissalreason";//解聘原因
const qxnbj=zddz+"dic_osbu_intimecompleteddistinguish";//期限内办结区分
const tyjdytjdw=zddz+"dic_ioex_supervisorrecommendedunit";//特约监督员推荐单位
const tyzxytjdw=zddz+"dic_ioex_consultantrecommendedunit";//特邀咨询员推荐单位
const sydw="/org/getAllOrg";//所有单位
const fydw="/org/getCourtOrg";//法院单位
const rddw="/org/getCourtOrg";//人大单位
const zxdw="/org/getCourtOrg";//政协单位
const tysf=zddz+"dic_ioex_specialIdentitytype";//身份  人大代表【同时间的身份】、政协委员【同时间的身份】、各界人士
const zfxwjb=zddz+"dic_ioex_forwardmediaLevel";//转发新闻级别

const jburl="/sessionType"//届别地址
const tyjburl="/specialSessionType";//特别届别地址
const tburl="/groupType"//团别地址
const jjburl="/circleType"//界别地址
const tylburl='/specialType'//特约类别列表

const menuurl="/menu/getButton"//画面和按钮权限
/**
 * 人大代表
 */
const REPRESENTATIVE = "0173000001";
/**
 * 政协委员
 */
const CPPCMEMBER = "0173000002";
/**
 * 特约人员
 */
const SPECIALPERSON = "0173000003";
/**
 * 法院人员
 */
const COURTPERSON = "0173000004";
/**
 * 组织的类别
 */
const RD="0227000001";//人大
const ZX="0227000002";//政协
const FY="0227000003";//法院
const TZB="0227000004";//统战部
const MZDP="0227000005";//八大民族党派
const MZDP1="0227000006";//中国国民党革命委员会
const MZDP2="0227000007";//中国民主同盟
const MZDP3="0227000008";//中国民主建国会
const MZDP4="0227000009";//中国民主促进会
const MZDP5="0227000010";//中国农工民主党
const MZDP6="0227000011";//中国致公党
const MZDP7="0227000012";//九三学社
const MZDP8="0227000013";//台湾民主自治同盟
const GSL="0227000014";//工商联
const TL="0227000015";//台联
export default
{
    aport1,aport2,aport3,uploads,aport4,xb,lwqj,ajlx,sljd,lhgx,fyjb,bfby,zbxs,bjjg,jb,cb,
    ajzt,xxcz,spjg,jgydbyj,gtxs,gtxg,dfxs,dfxz,cbxs,lwlylb,xzqh,tyry,tb,jjb,dp,jbb,
    mz,xl,zylb,zmwyh,bzdr,hdlx,hdfs,tylb,zzfl,dwlxr,jg,sfbm,taywzl,yalx,cblb,cbxz,taxs,
    dflx,zdywfl,tgxs,gkqf,zdqf,scfl,xwdwfl,xwdwjb,xw,sydw,fydw,rddw,zxdw,tazz,zdaj,imgformat,
    docformat,jgwyh,qtb,zddz,gkzt,zsqf,zszt,shqf,shzt,fbqf,fbzt,fyywlx,fyywly,qxnbj,tyzxytjdw,tyjdytjdw,
    cfaj,zbqf,zbgzqf,dblb,dbnf,zzxgwjlx,zw,sfxhft,yajyfl,yaywzl,syyjfl,scjyfl,fycount,menuurl,
    REPRESENTATIVE,CPPCMEMBER,SPECIALPERSON,COURTPERSON,RD,ZX,FY,TZB,MZDP,GSL,TL,jpyy,tysf,tyjburl,
    MZDP1,MZDP2,MZDP3,MZDP4,MZDP5,MZDP6,MZDP7,MZDP8,sflr,jdqf,jburl,tburl,jjburl,tylburl,bxqf,zfxwjb
}
