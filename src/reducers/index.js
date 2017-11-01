import { combineReducers } from 'redux';
import org from './org';
import layout from './layout';
import typeList from './typeList';
import log from './log';
import config from './config';
import rule from './rule';
import group from './group';

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
  org,
  layout,
  typeList,
  log,
  config,
  rule,
  group
});

export default rootReducer;
