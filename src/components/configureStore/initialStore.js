import Store from 'Store2';

let shopId = Store.get('user_data') ? Store.get('user_data').shopId : '' || '';
let shopName = Store.get('user_data') ? Store.get('user_data').shopName : '' || '';
let userName = Store.get('user_data') ? Store.get('user_data').userName : '' || '';

export default {
  //机构列表
  org: {
    orgList: [],
    shopId: shopId,
    shopName: shopName,
    loading: false
  },
  //init 权限
  layout: {
    categoryType: [],
    floor: [],
    funcAuthorities: [],
    funcAuthoritiesObj: {},
    orgType: "D",
    shopId: shopId,
    shopName: shopName,
    userName: userName
  },
  dateLayer: {},
  typeList: {},
  config: {

  }
};
