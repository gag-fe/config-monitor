/*
const DeepAssign = require('deep-assign');
require('fs').readdirSync(require('path').join(__dirname + '/mock'))
 .forEach(function (file) {
   DeepAssign(mock, require('./mock/' + file));
 });

module.exports = mock;
*/

const Qs = require('qs');
const Mock = require('mockjs');

module.exports = {
  //报警类型列表
  'GET http://billaudit.test.goago.cn:8989/gag-cem/monitor/typeList': 'http://192.168.150.222/mockjsdata/6/gag-cem/monitor/typeList',
  //规则策略列表
  'POST http://billaudit.test.goago.cn:8989/gag-cem/monitor/ruleList': 'http://192.168.150.222/mockjsdata/6/monitor/ruleList',
  //报警记录列表获取/检索接口
  'POST http://billaudit.test.goago.cn:8989/gag-cem/monitor/recordList': 'http://192.168.150.222/mockjsdata/6/monitor/recordList',
  //规则列表
  'POST http://billaudit.test.goago.cn/gag-cem/monitor/typeMap': 'http://192.168.150.222/mockjsdata/6/monitor/typeMap',
  //删除报警策略
  'POST http://billaudit.test.goago.cn/gag-cem/monitor/deleteRule': 'http://192.168.150.222/mockjsdata/6/monitor/deleteRule',
  //更新报警策略
  'POST http://billaudit.test.goago.cn/gag-cem/monitor/updateRule': 'http://192.168.150.222/mockjsdata/6/monitor/updateRule',
  //获取规则
  //'POST http://billaudit.test.goago.cn/gag-cem/monitor/getRule': 'https://assets.online/'
/*
  // Forward 到另一个服务器
  'GET https://assets.daily/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定路径
  'GET https://assets.daily/*': 'https://assets.online/v2/',

  // Forward 到另一个服务器，不指定来源服务器
  'GET /assets/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',

  // 本地文件替换
  'GET /local': './local.js',

  // Mock 数据返回
  'GET /users': [{ name: 'sorrycc' }, { name: 'pigcan' }],
  'GET /users/1': { name: 'jaredleechn' },

  // Mock 数据，基于 mockjs
  'POST /tag/site/findSite.do': require('mockjs').mock({
    success: true,
    'data|40': [{ 'id|+1': 1, siteName: '@url', domain: '@url', description: '@sentence', 'interfacePersonList|5': [{ 'empId|1-100': 100, lastName: '@cname' }] }],
  }),
  // Mock 数据，基于 mockjs
  'POST /tag/user/SearchEmployeeInfo.do': require('mockjs').mock({
    success: true,
    'data|40': [{ 'id|+1': 1, siteName: '@url', domain: '@url', description: '@sentence', interfacePersonList: '@cname' }],
  }),

  'GET /y.do'(req, res) {
    res.status(200);
    res.jsonp(Mock.mock({ data: movie, success: true }), 'cb');
  },

  'POST /z.do'(req, res) {
    const postData = Qs.parse(req.body);
    const pageSize = postData.pageSize;
    const currentPage = postData.currentPage;
    name['id|+1'] = pageSize * (currentPage - 1);
    const tmpl = {};
    tmpl[`dataList|${pageSize}`] = [name];
    tmpl.success = true;
    tmpl.pageSize = pageSize;
    tmpl.currentPage = currentPage;
    res.json(Mock.mock(tmpl));
  },

  'GET /x.do': Mock.mock({ name: '@Name' }),
  // 通过自定义函数替换请求
   //'/custom-func/:action': function(req, res) {
   // req 和 res 的设计类 express，http://expressjs.com/en/api.html
   //
   // req 能取到：
   //   1. params
   //   2. query
   //   3. body
   //
   // res 有以下方法：
   //   1. set(object|key, value)
   //   2. type(json|html|text|png|...)
   //   3. status(200|404|304)
   //   4. json(jsonData)
   //   5. jsonp(jsonData[, callbackQueryName])
   //   6. end(string|object)
   //
   // 举例：
   //res.json({
   //action: req.params.action,
   //query: req.query,
   //});
   //},
   */
};
