
var root = window.IPConfig.IP
// 引用axios
import axios from 'axios';
import { Message } from 'element-ui';
import { Loading } from 'element-ui';
import store from '../assets/store';

function apiAxios (method, url, params, success, failure,header,responseType) {
    let loadingInstance1=null;
    if(url!="/menu/getSubMenu"  && url!="/menu/getMenu" && url!="/baseinfo/listbytype" && url!="/menu/getShortcutMenu" 
    && url!="/PersonIdentifyInfoController/findPerson" ){
     loadingInstance1 = Loading.service({ fullscreen: true, spinner: 'el-icon-loading',text:'正在加载中',background:'rgba(0,0,0,0.6)',customClass:'loadingClass'});
    }
      if (params) {
          // params = filterNull(params);
          // if(store.state.token){
            // params.token=store.state.token
          // }
      }
      // console.log(header,!header,header,'header');
      
      // if (!header) {
      //   header={'Authorization': store.state.token}
      // }else if(header=={}){
        header={'Authorization': store.state.token}
      // }
     axios({
          method: method,
          url: url,
          data: method === 'POST' || method === 'PUT' ? params : null,
          params: method === 'GET' || method === 'DELETE' ? params : null,
          baseURL: root,
          withCredentials: false,
          headers: header || {'X-Requested-With': 'XMLHttpRequest'},
          responseType: responseType||'json',
      })

      .then(function (res) {    
        
                                                                                                                                                            
        if (res.status === 200) {
            if(loadingInstance1){
              loadingInstance1.close();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            if (success) {                                                                                                                                                                                                                                                                                                                                                                      
              success(res.data)
            }
            if(res.data.code=='1000001'){
              window.location.href ="#/";
            }else if(!res.data.success&&res.data.success!=0){
              //  Message.error(res.data.message);
            }
  
        }else {
            if(loadingInstance1){
              loadingInstance1.close();
            }
            if (failure) {
                failure(res.data)
            } else {
                console.log('error: ' + JSON.stringify(res.data));
            }
        }
  
      })
      .catch(function (err) {
      
        if(loadingInstance1){
          loadingInstance1.close();
        }
          let res = err.response
        
         
          if (err) {
            if (res && res.status === 901) {//超时
               window.location.href ="#/";
            } else if (res && res.status === 902) { //不能用
              window.location.href ="#/Message";
            }else{
             
               if(err=='Error: Network Error'){
                 window.location.href ="#/";
               }
               console.log('api error, HTTP CODE: --' +err,err=='Error: Network Error');
            }
          }
      })
  }
  // 返回在vue模板中的调用接口
  export default {
      get: function (url, params, success, failure) {
          return apiAxios('GET', url, params, success, failure)
      },
      post: function (url, params, success, failure,header,responseType) {
        
        return apiAxios('POST', url, params, success, failure,header,responseType)
      },
      put: function (url, params, success, failure) {
          return apiAxios('PUT', url, params, success, failure)
      },
      delete: function (url, params, success, failure) {
          return apiAxios('DELETE', url, params, success, failure)
      }
  }