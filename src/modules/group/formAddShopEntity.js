import React from 'react';
import PropTypes from 'prop-types';
import Table from '@gag/table-web';
import Modal from '@gag/modal-web';
import Pagination from '@gag/pagination-web';
import FormTopSeachBar from './components/formTopSeachBar';
import Utils from '../../utils/index';
const CommonUtils = Utils.common;
class FormAddShopEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopId: this.props.topSeachParams.shopId,
      shopName: this.props.topSeachParams.shopName || '',
      ruleParams: [],
      shopEntityIdList: props.editor.shopEntityIdList? props.editor.shopEntityIdList: [],
      shopEntityIdListLock: props.editor.shopEntityIdListLock? props.editor.shopEntityIdListLock: [],
      shopEntityId: '',
      visible: false,
      pageSize: 20,
      pageIndex: 1,
      total: 0
    };
  }

  _columns() {
    return [{
      title: '序号',
      dataIndex: 'serialNo',
      key: 'serialNo'
    },{
      title: '商户名称',
      dataIndex: 'shopEntityName',
      key: 'shopEntityName'
    }, {
      title: '所属机构',
      dataIndex: 'shopName',
      key: 'shopName'
    }, {
      title: '业态',
      dataIndex: 'format',
      key: 'format'
    }, {
      title: '楼层',
      dataIndex: 'storey',
      key: 'storey'
    }];
  }

  _delRuleParam = (data) => {

  }

  _hideModalRuleParamCancel = () => {
    this.setState({
      visible: false
    });
    this.props.setShopEntityVisibleFalse();
  }

  _hideModalRuleParamOk = () => {
    let num = 1;
    let rowsShopObj = Object.assign({}, this.props.rowsShopObj, {});
    let updateEditorGroupShopsList = [];
    let shopEntityIdList = this.props.editor.shopEntityIdList;//新选择的包括老的锁定选中。
    let shopEntityIdListLock = this.props.editor.shopEntityIdListLock;//锁定的内容。
    let newAddshopEntityIdList = [];

    let editorGroupShopsListOlde = {};

    this.props.editor.groupShopsList.map(item => {
      editorGroupShopsListOlde[item.shopEntityId] = item;
    });

    if(shopEntityIdList.length == 0){
      //window.alert('请选择添加商户信息！');
      CommonUtils.modal('warning', '警告', '请选择添加商户信息!');
    }else {
      shopEntityIdList.map((item) => {
        if(rowsShopObj[item] && !editorGroupShopsListOlde[item]){
          num += 1;
          rowsShopObj[item] = Object.assign({}, rowsShopObj[item], {'serialNo': num});
          updateEditorGroupShopsList.push(rowsShopObj[item]);
        }
      });

      this.props.updateEditorGroupShopsList(updateEditorGroupShopsList);
    }

    this.props.setShopEntityVisibleFalse();
  }

  _onRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      shopEntityIdList: selectedRowKeys
    });
    this.props.editUpdataShopEntityIdList(selectedRowKeys);
  }

  _paginationOnChange = (pageIndex) => {
    this.props.topSeachParamsPageIndex(pageIndex);
    this.props.getShopListEdit();
  }

  _getCheckboxProps(shopEntityIdList, record){
    shopEntityIdList.map(item => {
      if(item == record.shopEntityId){
        record['disabled'] = true;
      }
    });
    return {disabled: record.disabled, selected: false};
  }

  componentWillReceiveProps(nextProps){
    if(this.props.editor && this.props.editor.shopEntityIdList){
      this.setState({
        shopId: this.props.topSeachParamsAdd.shopId,
        shopName: this.props.topSeachParamsAdd.shopName || '',
        shopEntityIdList: nextProps.editor.shopEntityIdList,
        shopEntityIdListLock: nextProps.editor.shopEntityIdListLock
      });
    }
  }

  render(){
    let shopEntityIdList = this.state.shopEntityIdList;
    let shopEntityIdListLock = this.state.shopEntityIdListLock;

    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys: shopEntityIdList,
      onChange: this._onRowSelectChange,
      getCheckboxProps: this._getCheckboxProps.bind(this, shopEntityIdListLock)
    };

    return (
      <Modal
        width="1000"
        title="添加商户"
        visible={this.props.visibleShopEntity}
        onOk={this._hideModalRuleParamOk}
        onCancel={this._hideModalRuleParamCancel}
        okText="确认"
        cancelText="取消"
      >
        <div className="tips-modal-title">
          <FormTopSeachBar {...this.props}></FormTopSeachBar>
        </div>
        <Table rowSelection={rowSelection} columns={this._columns()} dataSource={this.props.rowsShop} pagination={false} loading={this.props.loading}/>
        <Pagination showQuickJumper showTotal={(total, range) => `显示第 ${range[0]?range[0]:0} 到第 ${range[1]?range[1]:0} 条记录，总共 ${total} 条记录`} defaultCurrent={1} pageSize={this.props.topSeachParams.pageSize} current={this.props.topSeachParams.pageIndex} total={this.props.topSeachParams.total} onChange={this._paginationOnChange} />
      </Modal>
    );
  }
};

FormAddShopEntity.defaultProps = {
  loading: false,
  visible: false,
  visibleParams: false,
  visibleShopEntity: false,
  rows: [],
  editor: {
    groupShopsList: []
  },
  add:{
    groupShopsList: []
  },
  topSeachParams:{

  },
  seachParams: {
    shopEntityName:'',
    shopId: '',
    groupName: '',
    updateAtFrom: '',
    updateAtTo:'',
    updateBy: '',
    pageSize: 20,
    pageIndex: 1,
    total: 0,
  }
};

FormAddShopEntity.propTypes = {
  visible: PropTypes.bool,
  ruleParams: PropTypes.array,
  selectedRowKeys: PropTypes.array,
  shopEntityId: PropTypes.string,
  monitoring: PropTypes.string
};

export default FormAddShopEntity;
