const Qs = require('qs');
const Mock = require('mockjs');
// 数据持久
//typeList: 'http://billaudit'+ window.Domain +'/gag-cem/monitor/typeList',
//ruleList:'http://billaudit'+ window.Domain +'/gag-cem/monitor/ruleList',
//recordList:'http://billaudit'+ window.Domain +'/gag-cem/monitor/recordList',
//typeMap:'http://billaudit'+ window.Domain +'/gag-cem/monitor/typeMap',
//delRuleId: 'http://billaudit'+ window.Domain +'/gag-cem/monitor/deleteRule',
//updataRule: 'http://billaudit'+ window.Domain +'/gag-cem/monitor/updateRule',
//getRule: 'http://billaudit'+ window.Domain +'/gag-cem/monitor/getRule'
module.exports = {
  //报警类型列表
  'POST http://billaudit.test.goago.cn/gag-cem/monitor/typeList': 'http://192.168.150.222/mockjsdata/6/gag-cem/monitor/typeList',
  //规则策略列表
  'POST http://billaudit.test.goago.cn/gag-cem/monitor/ruleList': 'http://192.168.150.222/mockjsdata/6/monitor/ruleList',
  //报警记录列表获取/检索接口
  'POST http://billaudit.test.goago.cn/gag-cem/monitor/recordList': 'http://192.168.150.222/mockjsdata/6/monitor/recordList',
  //规则列表
  'POST http://billaudit.test.goago.cn/gag-cem/monitor/typeMap': 'http://192.168.150.222/mockjsdata/6/monitor/typeMap',
  //删除报警策略
  'POST http://billaudit.test.goago.cn/gag-cem/monitor/deleteRule': 'http://192.168.150.222/mockjsdata/6/monitor/deleteRule',
  //更新报警策略
  'POST http://billaudit.test.goago.cn/gag-cem/monitor/updateRule': 'http://192.168.150.222/mockjsdata/6/monitor/updateRule',
  //获取规则
  'POST http://billaudit.test.goago.cn/gag-cem/monitor/getRule': 'https://assets.online/'
};
