import Vue from 'vue'
import Vuex from 'vuex'
import global_ from '../../Global.js'
import api from '../../api/index.js';
import {ToArray} from '../js/ToArray.js'

Vue.use(Vuex)

export default new Vuex.Store({
      state:{
        token: localStorage.getItem('TOKEN') || '',
        uid:localStorage.getItem('UID') || '',//用户ID
        uname: localStorage.getItem('UName') || '',//用户名
        orgname: localStorage.getItem('SSDW') || '',//所属单位名称
        orgid: localStorage.getItem('ORGID') || '',//所属单位
        bmid: localStorage.getItem('BMID') || '',//所属部门
        bmname: localStorage.getItem('BMNAME') || '',//所属部门名称
        jid: localStorage.getItem('JID') || '',//当前届id
        jmc: localStorage.getItem('JMC') || '',//当前届名
        cid: localStorage.getItem('CID') || '',//当前次
        zwname: localStorage.getItem('ZWNAME') || '',//当前职务
        pagesize:localStorage.getItem('PAGESIZE') || '',//列表分页
        imgformat:localStorage.getItem('IMGFORMAT') || '',//图片格式
        docformat:localStorage.getItem('DOCFORMAt') || '',//文件格式
        pbid:localStorage.getItem('PBID') || '',//PBID
        personid:localStorage.getItem('PERSONID') || '',//PERSONID
        auth:localStorage.getItem('AUTH') || '',//权限组
        repeat:localStorage.getItem('REPEAT') || '',//判断菜单是否重复点击
        yxdate:localStorage.getItem('YXDATE') || '',//影像忽略时间
        gjdq:[],//国家地区
        xb:[],//性别 
        lwqj:[],//来文期间
        ajlx:[],//案件类型
        sljd:[],//审理阶段
        lhgx:[],//利害关系
        fyjb:[],//法院级别
        bfby:[],//不服本院
        zbxs:[],//转办形式
        bjjg:[],//办结结果
        jb:[],//届别
        cb:[],//次别
        ajzt:[],//案件状态
        xxcz:[],//信息操作
        spjg:[],//审批结果
        jgydbyj:[],//结果与代表意见
        gtxs:[],//沟通形式
        gtxg:[],//沟通效果
        dfxs:[],//答复形式
        dfxz:[],//答复性质
        cbxs:[],//催办形式
        lwlylb:[],//来文来源类别
        tyry:[],//特约人员
        tb:[],//团别
        jjb:[],//界别
        dp:[],//党派
        jbb:[],//级别
        mz:[],//民族
        xl:[],//学历 
        zylb:[],//职业类别
        zmwyh:[],//专门委员会
        bzdr:[],//不再担任区分
        hdlx:[],//活动类型
        hdfs:[],//活动方式
        tylb:[],//特约类别
        zzfl:[],//职责分类
        dwlxr:[],//对外联系人
        sfbm:[],//是否部门
        taywzl:[],//提案业务种类
        yalx:[],//议案类型
        cblb:[],//承办类别
        cbxz:[],//承办性质
        taxs:[],//提案形式
        dflx:[],//答复类型
        zdywfl:[],//重点业务分类
        tgxs:[],//统稿形式
        gkqf:[],//公开区分
        zdqf:[],//重点区分
        scfl:[],//视察分类
        xwdwfl:[],//新闻单位类别
        xwdwjb:[],//新闻单位级别
        xw:[],//学位
        jg:[],//籍贯
        sydw:[],//所有单位
        fydw:[],//法院单位
        rddw:[],//人大单位
        zxdw:[],//政协单位
        tazz:[],//提案组织
        zdaj:[],//重点案件
        cfaj:[],//重复案件
        zbqf:[],//转办区分
        zbgzqf:[],//转办告知区分
        dblb:[],//督转办类别
        dbnf:[],//督转办年份
        zzxgwjlx:[],//工作相关文件类型
        xzqh:[],//行政区划
        zw:[],//职务
        sfxhft:[],//巡回法庭
        yajyfl:[],//建议、批评与意见分类业务种类
        jgwyh:[],//专门委员会(机构)
        qtb:[],//团别 全部出来
        gkzt:[],//公开状态
        zsqf:[],//展示区分
        zszt:[],//展示状态
        shqf:[],//审核区分
        shzt:[],//审核状态
        fbqf:[],//发布区分
        fbzt:[],//发布状态
        fyywlx:[],//法院要闻类型
        fyywly:[],//法院要闻来源
        qxnbj:[],//期限内办结
        tyzxytjdw:[],//特约监督员推荐单位
        tyjdytjdw:[],//特邀咨询员推荐单位
        sflr:[],//是否连任
        jdqf:[],//结对区分
        bxqf:[],//补选区分
        jpyy:[],//解聘原因
        tysf:[],//特约身份
        zfxwjb:[],//转发新闻级别
        lxss:[],//联系形式
        cwhwy:[],//常委会委员区分
        sbjys:[],//省部级以上领导区分
        zjqf:[],//在京区分
        dyzt:[],//订阅状态
      },
      mutations: {
        //state代表了最开始存放的区域，即驱动应用的数据源
        getToken(state, data) {
          localStorage.setItem('TOKEN', data)
          state.token = data;
        },
        getUid(state, data) {
          localStorage.setItem('UID', data)
          state.uid = data;
        },
        getUname(state, data) {
          localStorage.setItem('UName', data)
          state.uname = data;
        },
        getOrgname(state, data) {
          localStorage.setItem('SSDW', data)
          state.orgname = data;
        },
        getOrgid(state, data) {
          localStorage.setItem('ORGID', data)
          state.orgid = data;
        },
        getBmname(state, data) {
          localStorage.setItem('BMNAME', data)
          state.bmname = data;
        },
        getBmid(state, data) {
          localStorage.setItem('BMID', data)
          state.bmid = data;
        },
        getJid(state, data) {
          localStorage.setItem('JID', data)
          state.jid = data;
        },
        getJmc(state, data) {
          localStorage.setItem('JMC', data)
          state.jmc = data;
        },
        getCid(state, data) {
          localStorage.setItem('CID', data)
          state.cid = data;
        },
        getZwname(state, data) {
          localStorage.setItem('ZWNAME', data)
          state.zwname = data;
        },
        getPagesize(state, data) {
          localStorage.setItem('PAGESIZE', data)
          state.pagesize = data;
        },
        getImgformat(state, data) {
          localStorage.setItem('IMGFORMAT', data)
          state.imgformat = data;
        },
        getDocformat(state, data) {
          localStorage.setItem('DOCFORMAT', data)
          state.docformat = data;
        },
        getPbid(state, data) {
          localStorage.setItem('PBID', data)
          state.pbid = data;
        },
        getPersonid(state, data) {
          localStorage.setItem('PERSONID', data)
          state.personid = data;
        },
        getAuth(state, data) {
          localStorage.setItem('AUTH', data)
          state.auth = data;
        },
        getRepeat(state, data) {
          localStorage.setItem('REPEAT', data)
          state.repeat = data;
        },
        getYxdate(state, data) {
          localStorage.setItem('YXDATE', data)
          state.yxdate = data;
        },
        getGjdq(state, data) {
          state.gjdq = data;
        },
        getXb(state, data) {
          state.xb = data;
        },
        getLwqj(state, data) {
          state.lwqj = data;
        },
        getAjlx(state, data) {
          state.ajlx = data;
        },
        getSljd(state, data) {
          state.sljd = data;
        },
        getLhgx(state, data) {
          state.lhgx = data;
        },
        getFyjb(state, data) {
          state.fyjb = data;
        },
        getBfby(state, data) {
          state.bfby = data;
        },
        getZbxs(state, data) {
          state.zbxs = data;
        },
        getBjjg(state, data) {
          state.bjjg = data;
        },
        getJb(state, data) {
          state.jb = data;
        },
        getCb(state, data) {
          state.cb = data;
        },
        getAjzt(state, data) {
          state.ajzt = data;
        },
        getXxcz(state, data) {
          state.xxcz = data;
        },
        getSpjg(state, data) {
          state.spjg = data;
        },
        getGtxs(state, data) {
          state.gtxs = data;
        },
        getGtxg(state, data) {
          state.gtxg = data;
        },
        getDfxs(state, data) {
          state.dfxs = data;
        },
        getDfxz(state, data) {
          state.dfxz = data;
        },
        getCbxs(state, data) {
          state.cbxs = data;
        },
        getLwlylb(state, data) {
          state.lwlylb = data;
        },
        getJgydbyj(state, data) {
          state.jgydbyj = data;
        },
     
        getTyry(state, data) {
          state.tyry = data;
        },
        getTb(state, data) {
          state.tb = data;
        }, 
        getJjb(state, data) {
          state.jjb = data;
        },
        getDp(state, data) {
          state.dp = data;
        },
        getJbb(state, data) {
          state.jbb = data;
        },
        getMz(state, data) {
          state.mz = data;
        },
        getXl(state, data) {
          state.xl = data;
        },
        getZylb(state, data) {
          state.zylb = data;
        },
        getZmwyh(state, data) {
          state.zmwyh = data;
        },
        getBzdr(state, data) {
          state.bzdr = data;
        },
        getHdlx(state, data) {
          state.hdlx = data;
        },

        getHdfs(state, data) {
          state.hdfs = data;
        },
        getTylb(state, data) {
          state.tylb = data;
        },
        getZzfl(state, data) {
          state.zzfl = data;
        },
        getDwlxr(state, data) {
          state.dwlxr = data;
        },
        getSfbm(state, data) {
          state.sfbm = data;
        },
        getTaywzl(state, data) {
          state.taywzl = data;
        },
        getYalx(state, data) {
          state.yalx = data;
        },
        getCblb(state, data) {
          state.cblb = data;
        },
        getCbxz(state, data) {
          state.cbxz = data;
        },
        getTaxs(state, data) {
          state.taxs = data;
        },
        getDflx(state, data) {
          state.dflx = data;
        }, 
        getZdywfl(state, data) {
          state.zdywfl = data;
        },
        getTgxs(state, data) {
          state.tgxs = data;
        },
        getGkqf(state, data) {
          state.gkqf = data;
        },
        getZdqf(state, data) {
          state.zdqf = data;
        },
        getScfl(state, data) {
          state.scfl = data;
        },
        getXwdwfl(state, data) {
          state.xwdwfl = data;
        },
        getXwdwjb(state, data) {
          state.xwdwjb = data;
        },
        getXw(state, data) {
          state.xw = data;
        },
        getJg(state, data) {
          state.jg = data;
        },
        getSydw(state, data) {
          state.sydw = data;
        },
        getFydw(state, data) {
          state.fydw = data;
        },
        getRddw(state, data) {
          state.rddw = data;
        },
        getZxdw(state, data) {
          state.zxdw = data;
        },
        getTazz(state, data) {
          state.tazz = data;
        },
        getZdaj(state, data) {
          state.zdaj = data;
        },
        getCfaj(state, data) {
          state.cfaj = data;
        },
        getZbqf(state, data) {
          state.zbqf = data;
        },
        getZbgzqf(state, data) {
          state.zbgzqf = data;
        },
        getDblb(state, data) {
          state.dblb = data;
        },
        getDbnf(state, data) {
          state.dbnf = data;
        },
        getZzxgwjlx(state, data) {
          state.zzxgwjlx = data;
        },
        getXzqh(state, data) {
          state.xzqh = data;
        },
        getZw(state,data){
          state.zw = data;
        },
        getSfxhft(state,data){
          state.sfxhft = data;
        },
        getYajyfl(state,data){
          state.yajyfl = data;
        },
        getJgwyh(state,data){
          state.jgwyh = data;
        },
        getQtb(state,data){
          state.qtb = data;
        },
        getGkzt(state,data){
          state.gkzt = data;
        },
        getZsqf(state,data){
          state.zsqf = data;
        },
        getZszt(state,data){
          state.zszt = data;
        },
        getShqf(state,data){
          state.shqf = data;
        },
        getShzt(state,data){
          state.shzt = data;
        },
        getFbqf(state,data){
          state.fbqf = data;
        },
        getFbzt(state,data){
          state.fbzt = data;
        },
        getFyywlx(state,data){
          state.fyywlx = data;
        },
        getFyywly(state,data){
          state.fyywly = data;
        },
        getQxnbj(state,data){
          state.qxnbj = data;
        },
        getTyzxytjdw(state,data){
          state.tyzxytjdw = data;
        },
        getTyjdytjdw(state,data){
          state.tyjdytjdw = data;
        },
        getSflr(state,data){
          state.sflr = data;
        },
        getJdqf(state,data){
          state.jdqf = data;
        },
        getBxqf(state,data){
          state.bxqf = data;
        },
        getJpyy(state,data){
          state.jpyy = data;
        },
        getTysf(state,data){
          state.tysf = data;
        },
        getZfxwjb(state,data){
          state.zfxwjb = data;
        },
        getLxss(state,data){
          state.lxss = data;
        },
        getCwhwy(state,data){
          state.cwhwy = data;
        },
        getSbjys(state,data){
          state.sbjys = data;
        },
        getZjqf(state,data){
          state.zjqf = data;
        },
        getDyzt(state,data){
          state.dyzt = data;
        },
      },
      actions: {
        getGjdq(context) {
          let p={"bh":'gj'};
          api.post(global_.dmb, p,
            r => {
              context.commit('getGjdq', r.data)
            })
        },
        getXb(context) {
          api.get(global_.aport4 + global_.xb, null,
            r => {
              context.commit('getXb', ToArray(r.data))
            })
        },
        getLwqj(context) {
          api.get(global_.aport4 + global_.lwqj, null,
            r => {
              context.commit('getLwqj', ToArray(r.data))
            })
        },
        getAjlx(context) {
          api.get(global_.aport4 + global_.ajlx, null,
            r => {
              context.commit('getAjlx', ToArray(r.data))
            })
        },
        getSljd(context) {
          api.get(global_.aport4 + global_.sljd, null,
            r => {
              context.commit('getSljd', ToArray(r.data))
            })
        },
        getLhgx(context) {
          api.get(global_.aport4 + global_.lhgx, null,
            r => {
              context.commit('getLhgx', ToArray(r.data))
            })
        },
        getFyjb(context) {
          api.get(global_.aport4 + global_.fyjb, null,
            r => {
              context.commit('getFyjb', ToArray(r.data))
            })
        },
        getBfby(context) {
          api.get(global_.aport4 + global_.bfby, null,
            r => {
              context.commit('getBfby', ToArray(r.data))
            })
        },
        getZbxs(context) {
          api.get(global_.aport4 + global_.zbxs, null,
            r => {
              context.commit('getZbxs', ToArray(r.data))
            })
        },
        getBjjg(context) {
          api.get(global_.aport4 + global_.bjjg, null,
            r => {
              context.commit('getBjjg', ToArray(r.data))
            })
        },
        getJb(context) {
          api.get(global_.aport4 + global_.jb, null,
            r => {
              context.commit('getJb', ToArray(r.data,'d'))
            })
        },
        getCb(context) {
          api.get(global_.aport4 + global_.cb, null,
            r => {
              context.commit('getCb', ToArray(r.data,'d'))
            })
        },
        getAjzt(context) {
          api.get(global_.aport4 + global_.ajzt, null,
            r => {
              context.commit('getAjzt', ToArray(r.data))
            })
        },
        getXxcz(context) {
          api.get(global_.aport4 + global_.xxcz, null,
            r => {
              context.commit('getXxcz', ToArray(r.data))
            })
        },
        getSpjg(context) {
          api.get(global_.aport4 + global_.spjg, null,
            r => {
              context.commit('getSpjg', ToArray(r.data))
            })
        },
        getJgydbyj(context) {
          api.get(global_.aport4 + global_.jgydbyj, null,
            r => {
              context.commit('getJgydbyj', ToArray(r.data))
            })
        },
        getGtxs(context) {
          api.get(global_.aport4 + global_.gtxs, null,
            r => {
              context.commit('getGtxs', ToArray(r.data))
            })
        },
        getGtxg(context) {
          api.get(global_.aport4 + global_.gtxg, null,
            r => {
              context.commit('getGtxg', ToArray(r.data))
            })
        },
        getDfxs(context) {
          api.get(global_.aport4 + global_.dfxs, null,
            r => {
              context.commit('getDfxs', ToArray(r.data))
            })
        },
        getDfxz(context) {
          api.get(global_.aport4 + global_.dfxz, null,
            r => {
              context.commit('getDfxz', ToArray(r.data))
            })
        },
        getCbxs(context) {
          api.get(global_.aport4 + global_.cbxs, null,
            r => {
              context.commit('getCbxs', ToArray(r.data))
            })
        },
        getLwlylb(context) {
          api.get(global_.aport4 + global_.lwlylb, null,
            r => {
              context.commit('getLwlylb', ToArray(r.data))
            })
        },
        
        getTyry(context) {
          api.get(global_.aport4 + global_.tyry, null,
            r => {
          
              context.commit('getTyry', ToArray(r.data))
            })
        },
        getTb(context) {
          let p={
            'code':'',
            'level':'1'
          };
          api.get(global_.aport4 + global_.tb, p,
            r => {
              context.commit('getTb', r.data)
            })
        },
        getJjb(context) {
          api.get(global_.aport4 + global_.jjb, null,
            r => {
              context.commit('getJjb', ToArray(r.data))
            })
        },
        getDp(context) {
          api.get(global_.aport4 + global_.dp, null,
            r => {
              context.commit('getDp', ToArray(r.data))
            })
        },
        getJbb(context) {
          api.get(global_.aport4 + global_.jbb, null,
            r => {
              context.commit('getJbb', ToArray(r.data))
            })
        },
        getMz(context) {
          api.get(global_.aport4 + global_.mz, null,
            r => {
              context.commit('getMz', ToArray(r.data))
          })
        },
        getXl(context) {
          api.get(global_.aport4 + global_.xl, null,
            r => {
              context.commit('getXl', ToArray(r.data))
          })
        },
        getZylb(context) {
          api.get(global_.aport4 + global_.zylb, null,
            r => {
              context.commit('getZylb', ToArray(r.data))
          })
        },
        getZmwyh(context) {
          api.get(global_.aport4 + global_.zmwyh, null,
            r => {
              context.commit('getZmwyh', ToArray(r.data))
          })
        },
        getBzdr(context) {
          api.get(global_.aport4 + global_.bzdr, null,
            r => {
              context.commit('getBzdr', ToArray(r.data))
          })
        },
        getHdlx(context) {
          api.get(global_.aport4 + global_.hdlx, null,
            r => {
              context.commit('getHdlx', ToArray(r.data))
          })
        },
        getHdfs(context) {
          api.get(global_.aport4 + global_.hdfs, null,
            r => {
              context.commit('getHdfs', ToArray(r.data))
          })
        },
        getTylb(context) {
          api.get(global_.aport4 + global_.tylb, null,
            r => {
              context.commit('getTylb', ToArray(r.data))
          })
        },
        getZzfl(context) {
          api.get(global_.aport4 + global_.zzfl, null,
            r => {
              context.commit('getZzfl', ToArray(r.data))
          })
        },
        getDwlxr(context) {
          api.get(global_.aport4 + global_.dwlxr, null,
            r => {
              context.commit('getDwlxr', ToArray(r.data))
          })
        },
        getSfbm(context) {
          api.get(global_.aport4 + global_.sfbm, null,
            r => {
              context.commit('getSfbm', ToArray(r.data))
          })
        },
        getTaywzl(context) {
          api.get(global_.aport4 + global_.taywzl, null,
            r => {
              context.commit('getTaywzl', ToArray(r.data))
          })
        },
        getYalx(context) {
          api.get(global_.aport4 + global_.yalx, null,
            r => {
              context.commit('getYalx', ToArray(r.data))
          })
        },
        getCblb(context) {
          api.get(global_.aport4 + global_.cblb, null,
            r => {
              context.commit('getCblb', ToArray(r.data))
          })
        },
        getCbxz(context) {
          api.get(global_.aport4 + global_.cbxz, null,
            r => {
              context.commit('getCbxz', ToArray(r.data))
          })
        },
        getTaxs(context) {
          api.get(global_.aport4 + global_.taxs, null,
            r => {
              context.commit('getTaxs', ToArray(r.data))
          })
        }, 
        getDflx(context) {
          api.get(global_.aport4 + global_.dflx, null,
            r => {
              context.commit('getDflx', ToArray(r.data))
          })
        },
        getZdywfl(context) {
          api.get(global_.aport4 + global_.zdywfl, null,
            r => {
              context.commit('getZdywfl', ToArray(r.data))
          })
        },
        getTgxs(context) {
          api.get(global_.aport4 + global_.tgxs, null,
            r => {
              context.commit('getTgxs', ToArray(r.data))
          })
        },
        getGkqf(context) {
          api.get(global_.aport4 + global_.gkqf, null,
            r => {
              context.commit('getGkqf', ToArray(r.data))
          })
        },
        getZdqf(context) {
          api.get(global_.aport4 + global_.zdqf, null,
            r => {
              context.commit('getZdqf', ToArray(r.data))
          })
        },
        getScfl(context) {
          api.get(global_.aport4 + global_.scfl, null,
            r => {
              context.commit('getScfl', ToArray(r.data))
          })
        },
        getXwdwfl(context) {
          api.get(global_.aport4 + global_.xwdwfl, null,
            r => {
              context.commit('getXwdwfl', ToArray(r.data))
          })
        },
        getXwdwjb(context) {
          api.get(global_.aport4 + global_.xwdwjb, null,
            r => {
              context.commit('getXwdwjb', ToArray(r.data))
          })
        },
        getXw(context) {
          api.get(global_.aport4 + global_.xw, null,
            r => {
              context.commit('getXw', ToArray(r.data))
          })
        },
        getJg(context) {
          api.get(global_.aport4 + global_.jg, null,
            r => {
              context.commit('getJg', ToArray(r.data))
          })
        },
        getSydw(context) {
          let p={'mc':''};
          api.post(global_.aport1 + global_.sydw, p,
            r => {
              context.commit('getSydw', r.data)
          })
        },
        getFydw(context) {
          let p={'name':''};
          api.get(global_.aport1 + global_.fydw, p,
            r => {
              context.commit('getFydw', r.data)
          })
        },
        getRddw(context) {
          let p={'lb':'0227000001'};
          api.get(global_.aport1 + global_.rddw, p,
            r => {
              context.commit('getRddw', r.data)
          })
        },
        getZxdw(context) {
          let p={'lb':'0227000002'};
          api.get(global_.aport1 + global_.zxdw, p,
            r => {
              context.commit('getZxdw', r.data)
          })
        },
        getTazz(context) {
          api.get(global_.aport4 + global_.tazz, null,
            r => {
              context.commit('getTazz', ToArray(r.data))
          })
        },
        getZdaj(context) {
          api.get(global_.aport4 + global_.zdaj, null,
            r => {
              context.commit('getZdaj', ToArray(r.data))
          })
        },
        getCfaj(context) {
          api.get(global_.aport4 + global_.cfaj, null,
            r => {
              context.commit('getCfaj', ToArray(r.data))
          })
        },
        getZbqf(context) {
          api.get(global_.aport4 + global_.zbqf, null,
            r => {
              context.commit('getZbqf', ToArray(r.data))
          })
        },
        getZbgzqf(context) {
          api.get(global_.aport4 + global_.zbgzqf, null,
            r => {
              context.commit('getZbgzqf', ToArray(r.data))
          })
        },
        getDblb(context) {
          api.get(global_.aport4 + global_.dblb, null,
            r => {
              context.commit('getDblb', ToArray(r.data))
          })
        },
        getDbnf(context) {
          api.get(global_.aport4 + global_.dbnf, null,
            r => {
              context.commit('getDbnf', ToArray(r.data,'jx'))
          })
        },
        getZzxgwjlx(context) {
          api.get(global_.aport4 + global_.zzxgwjlx, null,
            r => {
              context.commit('getZzxgwjlx', ToArray(r.data))
          })
        },
        getXzqh(context) {
          api.get(global_.aport4 + global_.xzqh, null,
            r => {
              context.commit('getXzqh', ToArray(r.data))
          })
        },
        getZw(context) {
          api.get(global_.aport4 + global_.zw, null,
            r => {
              context.commit('getZw', ToArray(r.data))
          })
        },
        getSfxhft(context) {
          api.get(global_.aport4 + global_.sfxhft, null,
            r => {
              context.commit('getSfxhft', ToArray(r.data))
          })
        },
        getYajyfl(context) {
          api.get(global_.aport4 + global_.yajyfl, null,
            r => {
              context.commit('getYajyfl', ToArray(r.data))
          })
        },
        getJgwyh(context) {
          api.get(global_.aport4 + global_.jgwyh, null,
            r => {
              context.commit('getJgwyh', ToArray(r.data))
          })
        },
        getQtb(context) {
          api.get(global_.aport4 + global_.qtb, null,
            r => {
              context.commit('getQtb', ToArray(r.data))
          })
        },
        getGkzt(context) {
          api.get(global_.aport4 + global_.gkzt, null,
            r => {
              context.commit('getGkzt', ToArray(r.data))
          })
        },
        getZsqf(context) {
          api.get(global_.aport4 + global_.zsqf, null,
            r => {
              context.commit('getZsqf', ToArray(r.data))
          })
        },
        getZszt(context) {
          api.get(global_.aport4 + global_.zszt, null,
            r => {
              context.commit('getZszt', ToArray(r.data))
          })
        },
        getShqf(context) {
          api.get(global_.aport4 + global_.shqf, null,
            r => {
              context.commit('getShqf', ToArray(r.data))
          })
        },
        getShzt(context) {
          api.get(global_.aport4 + global_.shzt, null,
            r => {
              context.commit('getShzt', ToArray(r.data))
          })
        },
        getFbqf(context) {
          api.get(global_.aport4 + global_.fbqf, null,
            r => {
              context.commit('getFbqf', ToArray(r.data))
          })
        },
        getFbzt(context) {
          api.get(global_.aport4 + global_.fbzt, null,
            r => {
              context.commit('getFbzt', ToArray(r.data))
          })
        },
        getFyywlx(context) {
          api.get(global_.aport4 + global_.fyywlx, null,
            r => {
              context.commit('getFyywlx', ToArray(r.data))
          })
        },
        getFyywly(context) {
          api.get(global_.aport4 + global_.fyywly, null,
            r => {
              context.commit('getFyywly', ToArray(r.data))
          })
        },
        getQxnbj(context) {
          api.get(global_.aport4 + global_.qxnbj, null,
            r => {
              context.commit('getQxnbj', ToArray(r.data))
          })
        },
        getTyzxytjdw(context) {
          api.get(global_.aport4 + global_.tyzxytjdw, null,
            r => {
              context.commit('getTyzxytjdw', ToArray(r.data))
          })
        },
        getTyjdytjdw(context) {
          api.get(global_.aport4 + global_.tyjdytjdw, null,
            r => {
              context.commit('getTyjdytjdw', ToArray(r.data))
          })
        },
        getSflr(context) {
          api.get(global_.aport4 + global_.sflr, null,
            r => {
              context.commit('getSflr', ToArray(r.data))
          })
        },
        getJdqf(context) {
          api.get(global_.aport4 + global_.jdqf, null,
            r => {
              context.commit('getJdqf', ToArray(r.data))
          })
        },
        getBxqf(context) {
          api.get(global_.aport4 + global_.bxqf, null,
            r => {
              context.commit('getBxqf', ToArray(r.data))
          })
        },
        getJpyy(context) {
          api.get(global_.aport4 + global_.jpyy, null,
            r => {
              context.commit('getJpyy', ToArray(r.data))
          })
        },
        getTysf(context) {
          api.get(global_.aport4 + global_.tysf, null,
            r => {
              context.commit('getTysf', ToArray(r.data))
          })
        },
        getZfxwjb(context) {
          api.get(global_.aport4 + global_.zfxwjb, null,
            r => {
              context.commit('getZfxwjb', ToArray(r.data))
          })
        },
        getLxss(context) {
          api.get(global_.aport4 + global_.lxss, null,
            r => {
              context.commit('getLxss', ToArray(r.data))
          })
        },
        getCwhwy(context) {
          api.get(global_.aport4 + global_.cwhwy, null,
            r => {
              context.commit('getCwhwy', ToArray(r.data))
          })
        },
        getSbjys(context) {
          api.get(global_.aport4 + global_.sbjys, null,
            r => {
              context.commit('getSbjys', ToArray(r.data))
          })
        },
        getZjqf(context) {
          api.get(global_.aport4 + global_.zjqf, null,
            r => {
              context.commit('getZjqf', ToArray(r.data))
          })
        },
        getDyzt(context) {
          api.get(global_.aport4 + global_.dyzt, null,
            r => {
              context.commit('getDyzt', ToArray(r.data))
          })
        },
      }
})
