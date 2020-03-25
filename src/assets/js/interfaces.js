
import global_ from '../../Global.js'
import api from '../../api/index.js';
import axios from 'axios';
export default{
  // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
  install: function (Vue) {
 
   Vue.prototype.global_auth= function(all,sign){
            if(all.indexOf(sign)!=-1){
                return true;
            }
            else{
                return false;
            }
   }
  }
}
