export const START_GROUP = 'START';
export const END_GROUP = 'END';
export const GET_GROUP_LIST = 'GET_GROUP_LIST';
export const SET_GROUP_VISIBLE_TRUE= 'SET_GROUP_VISIBLE_TRUE';
export const SET_GROUP_VISIBLE_FALSE= 'SET_GROUP_VISIBLE_FALSE';
export const EDITOR_GROUP = 'EDITOR_GROUP';
export const SET_GROUP_SHOPENTITY_VISIBLE_FALSE = 'SET_GROUP_SHOPENTITY_VISIBLE_FALSE';
export const SET_GROUP_SHOPENTITY_VISIBLE_TRUE = 'SET_GROUP_SHOPENTITY_VISIBLE_TRUE';
export const TOP_SEACH_PARAMS = 'TOP_SEACH_PARAMS';
export const TOP_SEACH_PARAMS_PAGEINDEX = 'TOP_SEACH_PARAMS_PAGEINDEX';
export const TOP_SEACH_PARAMS_ADD = 'TOP_SEACH_PARAMS_ADD';
export const TOP_SEACH_PARAMS_ADD_PAGEINDEX = 'TOP_SEACH_PARAMS_ADD_PAGEINDEX';
export const SEACH_PARAMS = 'SEACH_PARAMS';
export const SEACH_PARAMS_PAGEINDEX = 'SEACH_PARAMS_PAGEINDEX';
export const SET_GROUP_ADD_VISIBLE_TRUE = 'SET_GROUP_ADD_VISIBLE_TRUE';
export const SET_GROUP_ADD_VISIBLE_FALSE = 'SET_GROUP_ADD_VISIBLE_FALSE';
export const UPDATE_ORG_INFO_TOP_SEACH_PARAMS_ADD = 'UPDATE_ORG_INFO_TOP_SEACH_PARAMS_ADD';
export const UPDATE_ORG_INFO_TOP_SEACH_PARAMS = 'UPDATE_ORG_INFO_TOP_SEACH_PARAMS_ADD';
export const UPDATE_ORG_INFO_SEACH_PARAMS = 'UPDATE_ORG_INFO_TOP_SEACH_PARAMS_ADD';
export const UPDATE_ORG_INFO_ALL_SEACH_PARAMS = 'UPDATE_ORG_INFO_TOP_SEACH_PARAMS_ADD';
export const UPDATE_PARAMS_ADD = 'UPDATE_PARAMS_ADD';
export const UPDATE_EDIT_GROUP_NAME = 'UPDATE_EDIT_GROUP_NAME';
export const UPDATE_EDITOR_GROUP_SHOP_LIST = 'UPDATE_EDITOR_GROUP_SHOP_LIST';
export const DELETE_ROWS_SHOP = 'DELETE_ROWS_SHOP';
export const DELET_EDIT_GROUP_SHOP_LIST = 'DELET_EDIT_GROUP_SHOP_LIST';
export const EDIT_UPDATE_SHOP_ENTITY_ID_LIST = 'EDIT_UPDATE_SHOP_ENTITY_ID_LIST';



import Utils from '../utils/index';
import Moment from 'moment';
const format = 'YYYY-MM-DD';
const Ajax = Utils.ajax;
const CommonUtils = Utils.common;
const API = {
  typeList: APP_CONFIG.api.URLFIX_DATA +'/monitor/typeList.json',
  ruleList: APP_CONFIG.api.URLFIX_DATA +'/monitor/ruleList.json',
  recordList: APP_CONFIG.api.URLFIX_DATA +'/monitor/recordList.json',
  typeMap: APP_CONFIG.api.URLFIX_DATA +'/monitor/typeMap.json',
  delRuleId:  APP_CONFIG.api.URLFIX_DATA +'/monitor/deleteRule.json',
  updataRule:  APP_CONFIG.api.URLFIX_DATA +'/monitor/updateRule.json',
  getRule:  APP_CONFIG.api.URLFIX_DATA +'/monitor/getRule.json',
  //删除商户分组
  deleteShopGroup:  APP_CONFIG.api.URLFIX_DATA +'/monitor/deleteShopGroup.json',
  //商户分组信息列表获取/检索接口
  getShopEntityGroup:  APP_CONFIG.api.URLFIX_DATA +'/monitor/getShopEntityGroup.json',
  //新增商户分组
  addShopGroup:  APP_CONFIG.api.URLFIX_DATA +'/monitor/addShopGroup.json',
  //更新商户分组
  updateShopGroup:  APP_CONFIG.api.URLFIX_DATA +'/monitor/updateShopGroup.json',
  //编辑商户分组
  getShopGroup:  APP_CONFIG.api.URLFIX_DATA +'/monitor/getShopGroup.json',
  //商户列表获取检索接口
  getShop:  APP_CONFIG.api.URLFIX_DATA +'/monitor/getShop.json'
};

function fetchStart(state) {
  return {
    type: START_GROUP,
    ...state
  }
}

function fetchEnd(state) {
  return {
    type: END_GROUP,
    ...state
  }
}

function fetchGetGroupList(state) {
  return {
    type: GET_GROUP_LIST,
    ...state
  }
}

// 报警设置弹窗

export function setGroupVisibleTrue() {

  return (dispatch, getState) => {
    let state = getState().group;
    let setState = Object.assign({}, state, {type: SET_GROUP_VISIBLE_TRUE, visible: true});
    dispatch(setState, {type: SET_GROUP_VISIBLE_TRUE});
  }
}

export function setGroupVisibleFalse() {
  return (dispatch, getState) => {
    let state = getState().group;
    let setState = Object.assign({}, state, {type: SET_GROUP_VISIBLE_FALSE, visible: false});
    dispatch(setState, {type: SET_GROUP_VISIBLE_FALSE});
  }
}


// 编辑添加商户弹层
export function setShopEntityVisibleTrue (){
  return (dispatch, getState) => {
    let state = getState().group;
    let setState = Object.assign({}, state, {type: SET_GROUP_SHOPENTITY_VISIBLE_TRUE, visibleShopEntity: true});
    dispatch(setState,{type: SET_GROUP_SHOPENTITY_VISIBLE_TRUE, visibleShopEntity: true});
  }
}

export function setShopEntityVisibleFalse (){
  return (dispatch, getState) => {
    let state = getState().group;
    let setState = Object.assign({}, state, {type: SET_GROUP_SHOPENTITY_VISIBLE_FALSE, visibleShopEntity: false});
    dispatch(setState, {type: SET_GROUP_SHOPENTITY_VISIBLE_FALSE, visibleShopEntity: false});
  }
}

// 新增分组弹层
export function setAddGroupVisibleTrue (){
  return (dispatch, getState) => {
    let state = Object.assign({}, getState().group, {visibleAddGroup: true, type: SET_GROUP_ADD_VISIBLE_TRUE});
    dispatch(state, {type: SET_GROUP_ADD_VISIBLE_TRUE, visibleAddGroup: true});
  };
}

export function setAddGroupVisibleFalse (){
  return (dispatch, getState) => {
    let state = Object.assign({}, getState().group, {visibleAddGroup: false, type: SET_GROUP_ADD_VISIBLE_FALSE});
    dispatch(state, {type: SET_GROUP_ADD_VISIBLE_FALSE, visibleAddGroup: false});
  };
}


//修改用户分组
export function editGroupParams (data){

  if(!data || !data.groupShopsList ||  data.groupShopsList.length == 0){
    //window.alert('此分组信息有问题，请删除。');
    CommonUtils.modal('warning', '警告', '此分组信息有问题，请删除。');
    return false;
  }

  let shopEntityIdList = [];
  let newGroupShopsList = [];

  data.groupShopsList.map((item, idx) => {
    let tempObj = Object.assign({}, item, {'serialNo': idx + 1});
    newGroupShopsList.push(tempObj);
    shopEntityIdList.push(item.shopEntityId);
  });

  let postData = Object.assign({}, data, {shopEntityIdListLock: shopEntityIdList, shopEntityIdList: shopEntityIdList, groupShopsList: newGroupShopsList});

  return (dispatch, getState) => {
    let state = getState().group;
    let setState = Object.assign({}, state, {'editor': postData, 'type': EDITOR_GROUP});
    dispatch(setState, {'type': EDITOR_GROUP});
  };

}

export function getShopEntityGroup () {
  return (dispatch, getState) => {
    let state = getState().group;
    let date = {
      updateAtFrom: state.seachParams.updateAtFrom ? Moment(state.seachParams.updateAtFrom).format(format) : '',
      updateAtTo: state.seachParams.updateAtTo ? Moment(state.seachParams.updateAtTo).format(format) : ''
    };
    let postData = Object.assign({}, state.seachParams, date);
    dispatch(function(){
      Ajax({
        url: API.getShopEntityGroup,
        data: Object.assign({}, postData, {action: 'getShopEntityGroup'}),
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {
            if(!resp.data || resp.data == null){
              return;
            }
          let  seachParams = Object.assign({}, state.seachParams, {pageSize:resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
          let setState = Object.assign({}, state, {'rows':resp.data.rows, 'seachParams': seachParams, type: GET_GROUP_LIST});

          dispatch(setState, {type: GET_GROUP_LIST});
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

//商户检索1 add
export function getShopList () {
  return (dispatch, getState) => {
    let state = getState().group;
    let stateOrg = getState().org;
    let topSeachParamsAdd = state.topSeachParamsAdd;

    let postData = {
      shopEntityName: topSeachParamsAdd.shopEntityName || stateOrg.shopEntityName,
      shopId: topSeachParamsAdd.shopId || stateOrg.shopId,
      storey: topSeachParamsAdd.storey || '',
      format: topSeachParamsAdd.format || '',
      pageSize: topSeachParamsAdd.pageSize,
      pageIndex: topSeachParamsAdd.pageIndex
    };

    dispatch(function(){
      Ajax({
        url: API.getShop,
        data: Object.assign({}, postData, {action: 'getShop'}),
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {
          if(!resp.data || resp.data == null || !resp.data.rows ){
            return false;
          }

          resp.data.rows.map((item, idx) => {
            resp.data.rows[idx]['key'] = item.shopEntityId || '';
          });

          let topSeachParamsAddParams = Object.assign({}, state.topSeachParamsAdd, {pageSize:resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
          let setState = Object.assign({}, state, {'rowsShop': resp.data.rows.length > 0?resp.data.rows :[], 'topSeachParamsAdd': topSeachParamsAddParams});
          dispatch(setState, {type: GET_GROUP_LIST});
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

//商户检索2 edit
export function getShopListEdit () {
  return (dispatch, getState) => {
    let state = getState().group;
    let topSeachParams = state.topSeachParams;
    let shopEntityIdList = state.editor.shopEntityIdList;
    let rowsShopObj = state.rowsShopObj || {};

    dispatch(function(){
      Ajax({
        url: API.getShop,
        data: Object.assign({}, topSeachParams, {action: 'getShop'}),
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {

          if(!resp.data || resp.data == null || !resp.data.rows ){
            return false;
          }

          resp.data.rows.map((item, idx) => {
            let temp = {};
            resp.data.rows[idx]['key'] = item.shopEntityId || '';
            //if(!rowsShopObj[item.shopEntityId]){
              //rowsShopObj[item.shopEntityId] = resp.data.rows[idx];
              temp[item.shopEntityId] = resp.data.rows[idx];
              rowsShopObj = Object.assign({}, rowsShopObj, temp);
            //}
          });

          let topSeachParamsParams = Object.assign({}, state.topSeachParams, {pageSize:resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
          let setState = Object.assign({}, state, {'rowsShop': resp.data.rows, 'topSeachParams': topSeachParamsParams, rowsShopObj: rowsShopObj});
          dispatch(setState, {type: GET_GROUP_LIST});
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

//更新 SeachParams
export function updataSeachParams (params) {
  return (dispatch, getState) => {
    let state = getState().group;
    let seachParams = Object.assign({}, state.seachParams, params);
    let setState = Object.assign({}, state, {seachParams: seachParams, type:'SEACH_PARAMS'});
    dispatch(setState,{type:'SEACH_PARAMS'});
  };
};

//更新 seachParams pageindex 信息
export function seachParamsPageIndex (pageIndex) {
  return (dispatch, getState) => {
    let state = getState().group;
    let seachParams = Object.assign({}, state.seachParams, {pageIndex: pageIndex});
    let setState = Object.assign({}, state, {seachParams: seachParams, type:'SEACH_PARAMS_PAGEINDEX'});
    dispatch(setState, {type:'SEACH_PARAMS_PAGEINDEX'});
  };
};

//更新topSeachParams
export function updateTopSeachParams (params) {
  return (dispatch, getState) => {
    let state = getState().group;
    let topSeachParams = Object.assign({}, state.topSeachParams, params);
    let setState = Object.assign({}, state, {topSeachParams: topSeachParams, rowsShopObj: {}, type:'TOP_SEACH_PARAMS'});
    dispatch(setState, {type:'TOP_SEACH_PARAMS'});
  };
};

//更新topSeachParams pageindex 信息
export function topSeachParamsPageIndex (pageIndex) {
  return (dispatch, getState) => {
    let state = getState().group;
    let topSeachParams = Object.assign({}, state.topSeachParams, {pageIndex: pageIndex});
    let setState = Object.assign({}, state, {topSeachParams: topSeachParams,type:'TOP_SEACH_PARAMS_PAGEINDEX'});
    dispatch(setState, {type:'TOP_SEACH_PARAMS_PAGEINDEX'});
  };
};


//更新 topSeachParamsAdd
export function updateTopSeachParamsAdd (params) {
  return (dispatch, getState) => {
    let state = getState().group;
    let topSeachParamsAdd = Object.assign({}, state.topSeachParamsAdd, params);
    let setState = Object.assign({}, state, {topSeachParamsAdd: topSeachParamsAdd, type:'TOP_SEACH_PARAMS_ADD'});
    dispatch(setState, {type:'TOP_SEACH_PARAMS_ADD'});
  };
};

//更新 topSeachParamsAdd pageindex 信息
export function topSeachParamsAddPageIndex (pageIndex) {
  return (dispatch, getState) => {
    let state = getState().group;
    let topSeachParamsAdd = Object.assign({}, state.topSeachParamsAdd, {pageIndex: pageIndex});
    let setState = Object.assign({}, state, {topSeachParamsAdd: topSeachParamsAdd, type:'TOP_SEACH_PARAMS_ADD_PAGEINDEX'});
    dispatch(setState, {type:'TOP_SEACH_PARAMS_ADD_PAGEINDEX'});
  };
};

//更新编辑添加选中的商户
export function updateEditorGroupShopsList (editorGroupShopsList) {
  return (dispatch, getState) => {
    let state = getState().group;
    let groupShopsListNew = [];
    let groupShopsList = state.editor.groupShopsList.concat(editorGroupShopsList);
    if(editorGroupShopsList.length == 0){
      CommonUtils.modal('warning', '警告', '没有新增商户！');
      return false;
    }else {
      groupShopsList.map((item, idx) => {
        item['serialNo'] = idx + 1;
        groupShopsListNew.push(item);
      });
      let editorData = Object.assign({}, state.editor, {'groupShopsList': groupShopsList});
      let setState = Object.assign({}, state, {editor: editorData, type:'UPDATE_EDITOR_GROUP_SHOP_LIST'});
      dispatch(setState, {type:'UPDATE_EDITOR_GROUP_SHOP_LIST'});
    }
  };
};
// 发送编辑商铺信息
export function updateShopGroup () {
  return (dispatch, getState) => {
    let state = getState().group;
    let shopEntityIdListArr = [];
    state.editor.groupShopsList.map((item) =>{
      shopEntityIdListArr.push(item.shopEntityId)
    })
    let posData = {
      groupId: state.editor.groupId,
      groupName: state.editor.groupName,
      shopEntityIdList: shopEntityIdListArr ? shopEntityIdListArr.join(',') : '',
      shopId: state.editor.shopId,
      shopName: state.editor.shopName
    };

    dispatch(function(){
      Ajax({
        url: API.updateShopGroup,
        data: Object.assign({}, posData, {action: 'updateShopGroup'}),
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {
          let posDataSeachParams = state.seachParams;
          dispatch(function(){
            Ajax({
              url: API.getShopEntityGroup,
              data: Object.assign({}, posDataSeachParams, {action: 'getShopEntityGroup'}),
              type: 'json',
              method: 'post'
            }).then(resp => {
              if (resp.status == 'S') {
                  if(!resp.data || resp.data == null){
                    return;
                  }
                let seachParams = Object.assign({}, state.seachParams, {pageSize:resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
                let setState = Object.assign({}, state, {'rows':resp.data.rows, 'seachParams': seachParams, visible: false, type: GET_GROUP_LIST});

                dispatch(setState, {type: GET_GROUP_LIST});
              }
            }).catch(err => {
              console.log(err,'catch');
            });
          });
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

//发送添加商铺信息
export function addShopGroup () {
  return (dispatch, getState) => {
    let state = getState().group;

    let posData = {
      groupName: state.add.groupName,
      shopEntityIdList: state.add.shopEntityIdList.toString() || '',
      shopId: state.add.shopId,
      shopName: state.add.shopName
    };

    dispatch(function(){
      Ajax({
        url: API.addShopGroup,
        data: Object.assign({}, posData, {action: 'addShopGroup'}),
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {
          let posDataSeachParams = state.seachParams;
          dispatch(function(){
            Ajax({
              url: API.getShopEntityGroup,
              data: Object.assign({}, posDataSeachParams, {action: 'getShopEntityGroup'}),
              type: 'json',
              method: 'post'
            }).then(resp => {
              if (resp.status == 'S') {
                if(!resp.data || resp.data == null){
                  return;
                }
                let seachParams = Object.assign({}, state.seachParams, {pageSize:resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
                let setState = Object.assign({}, state, {'rows':resp.data.rows, 'seachParams': seachParams, visibleAddGroup: false});
                dispatch(setState, {type: GET_GROUP_LIST});
              }
            }).catch(err => {
              console.log(err,'catch');
            });
          });
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

//变更 addParams
export function updateParamsAdd (params) {
  return (dispatch, getState) => {
    let state = getState().group;
    let addParams = Object.assign({}, state.add, params);
    let setState = Object.assign({}, state, {add: addParams, type: UPDATE_PARAMS_ADD});
    dispatch(setState, {type: UPDATE_PARAMS_ADD});
  };
};

//更新topSeachParamsAdd的机构
export function updateOrgInfoTopSeachParamsAdd (org) {
  return (dispatch, getState) => {
    let state = getState().group;
    let topSeachParamsAdd = Object.assign({}, state.topSeachParamsAdd, org);
    let setState = Object.assign({}, state, {topSeachParamsAdd: topSeachParamsAdd, type: UPDATE_ORG_INFO_TOP_SEACH_PARAMS_ADD});
    dispatch(setState, {type: UPDATE_ORG_INFO_TOP_SEACH_PARAMS_ADD});
  };
};

//更新topSeachParams的机构
export function updateOrgInfoTopSeachParams (org) {
  return (dispatch, getState) => {
    let state = getState().group;
    let topSeachParams = Object.assign({}, state.topSeachParams, org);
    let setState = Object.assign({}, state, {topSeachParams: topSeachParams, type: UPDATE_ORG_INFO_TOP_SEACH_PARAMS});
    dispatch(setState, {type: UPDATE_ORG_INFO_TOP_SEACH_PARAMS});
  };
};

//更新SeachParams的机构
export function updateOrgInfoSeachParams (org) {
  return (dispatch, getState) => {
    let state = getState().group;
    let seachParams = Object.assign({}, state.seachParams, org);
    let setState = Object.assign({}, state, {seachParams: seachParams, type: UPDATE_ORG_INFO_SEACH_PARAMS});
    dispatch(setState, {type: UPDATE_ORG_INFO_SEACH_PARAMS});
  };
};


//更新topSeachParams的机构
export function updateOrgInfoAllSeachParams (org) {
  return (dispatch, getState) => {
    let state = getState().group;
    let topSeachParams = Object.assign({}, state.topSeachParams, org);
    let topSeachParamsAdd = Object.assign({}, state.topSeachParamsAdd, org);
    let seachParams = Object.assign({}, state.seachParams, org);
    let setState = Object.assign({}, state, {topSeachParams: topSeachParams, seachParams: seachParams, topSeachParamsAdd: topSeachParamsAdd, type: UPDATE_ORG_INFO_ALL_SEACH_PARAMS});
    dispatch(setState, {type: UPDATE_ORG_INFO_ALL_SEACH_PARAMS});
  };
};

//编辑 更新商户分组名称
export function updateEditGroupName (str) {
  return (dispatch, getState) => {
    let state = getState().group;
    let editParams = Object.assign({}, state.editor, {groupName: str});
    let setState = Object.assign({}, state, {editor: editParams, type: UPDATE_EDIT_GROUP_NAME});
    dispatch(setState, {type: UPDATE_EDIT_GROUP_NAME});
  };
};


//删除分组
export function deleteGroup(id){
  return (dispatch, getState) => {
    let state = getState().group;
    let date = {
      updateAtFrom: state.seachParams.updateAtFrom ? Moment(state.seachParams.updateAtFrom).format(format) : '',
      updateAtTo: state.seachParams.updateAtTo ? Moment(state.seachParams.updateAtTo).format(format) : ''
    };

    let postData = Object.assign({}, state.seachParams, date);
    dispatch(function(){
      Ajax({
        url: API.deleteShopGroup,
        data: {action: 'delete', groupId:id },
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {

          dispatch(function(){
            Ajax({
              url: API.getShopEntityGroup,
              data: Object.assign({}, postData, {action: 'typeList'}),
              type: 'json',
              method: 'post'
            }).then(resp => {
              if (resp.status == 'S') {
                if(!resp.data || resp.data == null){
                  return;
                }
                let seachParams = Object.assign({}, state.seachParams, {pageSize:resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
                let setState = Object.assign({}, state, {'rows':resp.data.rows, 'seachParams': seachParams, type: GET_GROUP_LIST});

                dispatch(setState, {type: GET_GROUP_LIST});
              }
            }).catch(err => {
              console.log(err,'catch');
            });
          });
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

//编辑删除商户信息

export function deleteEditGroupShopList(data){
  return (dispatch, getState) => {
    let state = getState().group;
    let groupShopsList = state.editor.groupShopsList;
    let shopEntityIdListLock = state.editor.shopEntityIdListLock;
    let newGroupShopsList = [];
    let shopEntityIdList = [];
    let nweShopEntityIdListLock = [];
    if(!data ||  !data.shopEntityId || !groupShopsList || groupShopsList.length == 0){
      return false;
    }

    groupShopsList.map((item, idx) => {
      if(item.shopEntityId != data.shopEntityId){
        let tempObj = Object.assign({}, item);
        newGroupShopsList.push(tempObj);
        shopEntityIdList.push(item.shopEntityId);
        nweShopEntityIdListLock.push(item.shopEntityId);
      }
    });

    newGroupShopsList.map((item, idx) => {
      newGroupShopsList[idx] = Object.assign({}, item, {'serialNo': idx + 1});
    });


    let editData = Object.assign({}, state.editor, {'groupShopsList': newGroupShopsList, 'shopEntityIdList': shopEntityIdList, 'shopEntityIdListLock': nweShopEntityIdListLock});
    let setState = Object.assign({}, state, {editor: editData, type: DELET_EDIT_GROUP_SHOP_LIST});

    dispatch(setState, {type: DELET_EDIT_GROUP_SHOP_LIST});
  };
};

//清理 rowsShop
export function deleteRowsShop(){
  return (dispatch, getState) => {
    let state = getState().group;
    let topSeachParams = {
        shopEntityName: '',
        enabled: false,
        storey: '',
        format: '',
        pageSize: 20,
        pageIndex: 1,
        total: 0
      };
    let newTopSeachParams = Object.assign({}, state.topSeachParamsAdd, topSeachParams)
    let setState = Object.assign({}, state, {rowsShop: [], topSeachParams: newTopSeachParams, topSeachParamsAdd: newTopSeachParams, type: DELETE_ROWS_SHOP});
    dispatch(setState, {type: DELETE_ROWS_SHOP});
  };
};

//添加选中的商户
export function addShopEntityIdList(data){
  return (dispatch, getState) => {
    let state = getState().group;
    let shopEntityIdList = [];
    let editData = state.editor;
  };
};

//编辑商户列表 -更新选中数据
export function editUpdataShopEntityIdList(data){
  return (dispatch, getState) => {
    let state = getState().group;
    let shopEntityIdList = data.concat([]);
    let editData = Object.assign({}, state.editor, {'shopEntityIdList': shopEntityIdList});
    let setState = Object.assign({}, state, {editor: editData, type: EDIT_UPDATE_SHOP_ENTITY_ID_LIST});
    dispatch(setState, {type: EDIT_UPDATE_SHOP_ENTITY_ID_LIST});
  };
}
