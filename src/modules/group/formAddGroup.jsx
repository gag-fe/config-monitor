import React from 'react';
import PropTypes from 'prop-types';
import Table from '@gag/table-web';
import Input from '@gag/input-web';
import Modal from '@gag/modal-web';
import Pagination from '@gag/pagination-web';
import FormTopSeachBarAdd from './components/formTopSeachBarAdd';
import Utils from '../../utils/index';
const CommonUtils = Utils.common;
class FormAddGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopEntityIdList: [],
      groupName:'',
      shopId: this.props.topSeachParamsAdd.shopId || '',
      shopName: this.props.topSeachParamsAdd.shopName || '',
      visible: false,
      pageSize: 20,
      pageIndex: 1,
      total: 0,
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

  _hideModalRuleParamCancel = () => {
    this.setState({
      visible: false
    });
    this.props.setAddGroupVisibleFalse();
    this.props.deleteRowsShop();
  }

  _hideModalRuleParamOk = () => {
    let item = this.state;

    if(item.groupName == ''){
      //window.alert('请填写分组名称！');
      CommonUtils.modal('warning', '警告', '请填写分组名称!');
      return false;
    }

    if(item.shopEntityIdList.length == 0){
      //window.alert('请填选择关联商户！');
      CommonUtils.modal('warning', '警告', '请填选择关联商户!');
      return false;
    }

    this.props.updateParamsAdd(item);
    this.props.addShopGroup();
    this.props.setAddGroupVisibleFalse();
    this.props.deleteRowsShop();


    let itemParams = {
      format:'',
      shopId: this.props.topSeachParamsAdd.shopId || '',
      shopName: this.props.topSeachParamsAdd.shopName || '',
      shopEntityName:'',
      storey:'',
      pageIndex: 1
    };

    this.props.updateTopSeachParamsAdd(itemParams);

    this.state = {
      shopEntityIdList: [],
      groupName:'',
      shopId: this.props.topSeachParamsAdd.shopId || '',
      shopName: this.props.topSeachParamsAdd.shopName || '',
      visible: false
    };
  }

  _onRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      shopEntityIdList: selectedRowKeys
    });
  }


  _getGroupName = (event) => {
    this.setState({
      groupName: event.target.value
    });
  }

  _paginationOnChange = (pageIndex) => {
    this.setState({
      pageIndex: pageIndex
    });

    this.props.topSeachParamsAddPageIndex(pageIndex);
    this.props.getShopList();
  }


  componentWillReceiveProps(nextProps){
    if(this.props.topSeachParamsAdd != nextProps.topSeachParamsAdd){
      this.setState({
        shopId: nextProps.topSeachParamsAdd.shopId || '',
        shopName: nextProps.topSeachParamsAdd.shopName || ''
      });
    }
  }

  render(){
    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys: this.state.shopEntityIdList,
      onChange: this._onRowSelectChange,
    };

    return (
      <Modal
          width="1000"
          title="新增商户分组"
          visible={this.props.visibleAddGroup}
          onOk={this._hideModalRuleParamOk}
          onCancel={this._hideModalRuleParamCancel}
          okText="确认"
          cancelText="取消"
          maskClosable={false}
        >
            <div className="tips-modal-title">
              <div><label>分组名称：</label><Input style={{width:250}} placeholder="分组名称" value={this.state.groupName} onChange={this._getGroupName} /></div>
              <div><label>关联商户：</label></div>
              <FormTopSeachBarAdd {...this.props}></FormTopSeachBarAdd>
            </div>
            <Table rowSelection={rowSelection} columns={this._columns()} dataSource={this.props.rowsShop} pagination={false} loading={this.props.loading}/>
            <Pagination showQuickJumper showTotal={(total, range) => `显示第 ${range[0]?range[0]:0} 到第 ${range[1]?range[1]:0} 条记录，总共 ${total} 条记录`} defaultCurrent={1} pageSize={this.props.topSeachParamsAdd.pageSize} current={this.props.topSeachParamsAdd.pageIndex} total={this.props.topSeachParamsAdd.total} onChange={this._paginationOnChange} />
      </Modal>
    );
  }
};

FormAddGroup.defaultProps = {
  visible: false,
  ruleParams:[],
  selectedRowKeys:[],
  shopEntityId:'',
  monitoring:'',
  pageSize: 20,
  pageIndex: 1,
  total: 0
};

FormAddGroup.propTypes = {
  visible: PropTypes.bool,
  ruleParams: PropTypes.array,
  selectedRowKeys: PropTypes.array,
  shopEntityId: PropTypes.string,
  monitoring: PropTypes.string
};

export default FormAddGroup;
