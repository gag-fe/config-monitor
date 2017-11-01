import React from 'react';
import PropTypes from 'prop-types';
import Table from '@gag/table-web';
import Button from '@gag/button-web';
import Modal from '@gag/modal-web';
import Input from '@gag/input-web';
import Utils from '../../utils/index';
const CommonUtils = Utils.common;
class FormAddGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: props.editor.groupName,
      groupShopsList: props.editor.groupShopsList,
      visible: false
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
    },{
      title: '操作',
      render:(text, record) => {
        return (
          <Button size="small" onClick={this._delRuleParam.bind(this, record)}>删除</Button>
        );
      }
    }];
  }

  _delRuleParam = (data) => {
    this.props.deleteEditGroupShopList(data);
  }

  _hideModalRuleParamCancel = () => {
    this.setState({
      visible: false
    });
    this.props.setGroupVisibleFalse();
    this.props.deleteRowsShop();
  }

  _hideModalRuleParamOk = () => {
    if(!this.props.editor.groupShopsList || this.props.editor.groupShopsList == 0){
      //window.alert('分组信息没有商铺信息，请添加商铺！');
      CommonUtils.modal('warning', '警告', '分组信息没有商铺信息，请添加商铺！');
      return false;
    }

    this.props.updateShopGroup();
    this.props.deleteRowsShop();
    this.props.setGroupVisibleFalse();
  }

  _addShopEntityFrom = () => {
    let item = {
      format:'',
      shopName: this.props.editor.shopName || '',
      shopId: this.props.editor.shopId || '',
      shopEntityName:''
    };

    this.props.setShopEntityVisibleTrue();
    this.props.deleteRowsShop();
  }

  _getGroupName = (event) => {
    this.setState({
      groupName: event.target.value
    });
    this.props.updateEditGroupName(event.target.value);
  }

  componentWillReceiveProps(nextProps){

  }

  render(){
    return (
      <Modal
          width="1000"
          title="编辑商户分组"
          visible={this.props.visible}
          onOk={this._hideModalRuleParamOk}
          onCancel={this._hideModalRuleParamCancel}
          okText="确认"
          cancelText="取消"
          maskClosable={false}
        >   <div className="tips-modal-title"><lable>分组名称:</lable> <Input style={{width:250}} placeholder="分组名称" value={this.props.editor.groupName} onChange={this._getGroupName} /> <span style={{paddingLeft:50}}></span> <lable>所属机构:</lable> <span className="line">{this.props.editor.shopName}</span> <Button style={{marginLeft:80}} onClick={this._addShopEntityFrom} type="primary">添加商户</Button></div>
            <Table columns={this._columns()} dataSource={this.props.editor.groupShopsList} pagination={false} loading={this.props.loading}/>
        </Modal>
    );
  }
};

FormAddGroup.defaultProps = {
  loading: true,
  visible: false,
  visibleParams: false,
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

FormAddGroup.propTypes = {
  visible: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  shopEntityId: PropTypes.string,
  monitoring: PropTypes.string
};

export default FormAddGroup;
