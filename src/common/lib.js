import '@gag/style-web/index.less';
import './style/index.less';
import Cookies from 'js-cookie';
import Modal from '@gag/modal-web';
import Store from 'store2';

if(!APP_CONFIG){
  window.APP_CONFIG = {};
}

window.DEV_STATE = 0; //域名判断状态
window.IS_NEW_PAGE = false;//路由变更
window.IS_EVENT = false;//留有

var dataHostName = 'monitorservice';
var appHostName = 'monitor';
(function(strUrl){
  const RGE_TEST = new RegExp('test');
  const RGE_DEV = new RegExp('dev');
  const RGE_LOCALHOST = new RegExp('localhost');
  const RGE_LOCALHOST2 = new RegExp('127.0.0.1');

  if(RGE_TEST.test(strUrl)){
    DEV_STATE = 1;
    window.Domain = ".test.goago.cn";
  }else if(RGE_LOCALHOST.test(strUrl) || RGE_LOCALHOST2.test(strUrl)) {
    DEV_STATE = 2;
    window.Domain = ".test.goago.cn";
  }else{
    DEV_STATE = 0;
    window.Domain = ".gooagoo.com";
  }

})(window.location.origin);

const LOGIN_URL_TEST = "https://passport.test.goago.cn/index.html?service=";
const LOGIN_URL_PRO = "https://passport.gooagoo.com/index.html?service=";

window.APP_CONFIG['api'] = {
  APPFIX: "http://"+ appHostName + window.Domain,
  URLFIX: "http://"+ dataHostName + window.Domain,
  URLFIX_DATA: "http://"+ dataHostName + window.Domain,
  // URLFIX_DATA_MOCK: "http://192.168.150.201/mockjsdata/6", // 调用mock数据时使用
  LOGIN: (DEV_STATE == 0) ? LOGIN_URL_PRO + "http://"+ appHostName + window.Domain  : LOGIN_URL_TEST + "http://"+ appHostName + window.Domain
};

