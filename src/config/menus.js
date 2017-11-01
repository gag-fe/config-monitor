import React from 'react';
import Icon from '@gag/icon-web';

// modules
//报警类型
import TypeList from '../modules/typeList/index';
import RuleList from '../modules/rule/index';
import LogList from '../modules/log/index';
import ConfigList from '../modules/config/index';
import GroupList from '../modules/group/index';

const menus = [{
  id:'monitor11',
  key: 'type',
  title: '报警类型',
  breadcrumbName:'报警类型',
  path:'/type',
  component: TypeList,
  icon: <Icon type="bars" />
},{
  id:'monitor12',
  key: 'rule',
  title: '报警策略',
  breadcrumbName:'报警策略',
  path:'/rule',
  component: RuleList,
  icon: <Icon type="database" />
},{
  id:'monitor13',
  key: 'log',
  title: '报警记录',
  breadcrumbName:'报警记录',
  path:'/log',
  component: LogList,
  icon: <Icon type="solution" />
},{
  id:'monitor14',
  key: 'config',
  title: '商户设置',
  breadcrumbName:'商户设置',
  path:'/config',
  component: ConfigList,
  icon: <Icon type="setting" />
},{
  id:'monitor15',
  key: 'group',
  title: '商户分组',
  breadcrumbName:'商户分组',
  path:'/group',
  component: GroupList,
  icon: <Icon type="team" />

  }];

export default menus;
