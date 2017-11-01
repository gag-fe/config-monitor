import { GET_TYPE_LIST, START, END } from '../actions/typeList.js';
var initState = {
  loading: true
};

function TypeList(state = initState, action){
  if(action.type){
    switch(action.type){
      case 'START':
        return Object.assign({}, state, action, {loading: true});
        break;
      case 'END':
        return Object.assign({}, state, action, {loading: false});
        break;
      case 'GET_TYPELIST':
        return Object.assign({}, state, action, {loading: false});
        break;
      default:
        return state;
    }
  }
}

export default TypeList;
