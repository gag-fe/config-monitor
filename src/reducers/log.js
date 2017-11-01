import { GET_LOG_LIST, START, END } from '../actions/typeList.js';
var initState = {
  loading: true,
  recordList: [],
  seachParams:{
    type:'all',
    receivers: '',
    startDate: '',
    endDate: '',
    recordList:'',
    pageIndex: 1,
    pageSize: 20,
    total: 0
  }
};

function LogList(state = initState, action){
  if(action.type){
    switch(action.type){
      case 'START':
        return Object.assign({}, state, action, {loading: true});
        break;
      case 'END':
        return Object.assign({}, state, action, {loading: false});
        break;
      case 'GET_LOG_LIST':
        return Object.assign({}, state, action, {loading: false});
        break;
      case 'OLG_RESET_SEARCH_PARAMS':
        return Object.assign({}, state, action, {loading: false});
        break;
      default:
        return state;
    }
  }
}

export default LogList;
