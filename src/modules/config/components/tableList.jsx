import React from 'react';
import Table from '@gag/table-web';
import Button from '@gag/button-web';
import Popconfirm from '@gag/popconfirm-web';
import Pagination from '@gag/pagination-web';

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopEntityId: [],
      pageSize: 10,
      pageIndex: 1,
      total: 50,
      visible: false,
      ruleParams:[],//报警规则列表
      ruleId:'',//已选中的规则
      monitoring: false
    };
  }
  _columns = () => {
    return [{
      title: '序号',
      dataIndex: 'serialNo',
      key: 'serialNo',
      width: '7%'
    },{
      title: '商户名称',
      dataIndex: 'shopEntityName',
      key: 'shopEntityName',
      width: '18%'
    }, {
      title: '所属机构',
      dataIndex: 'shopName',
      key: 'shopName',
      width: '15%'
    }, {
      title: '商户业态',
      dataIndex: 'format',
      key: 'format',
      width: '10%'
    },{
      title: '状态',
      dataIndex: 'ruleStatus',
      key: 'ruleStatus',
      width: '10%',
    },{
      title: '楼层',
        dataIndex: 'storey',
        key: 'storey',
      width: '10%',
    },{
      title: '操作账户',
      dataIndex: 'updateBy',
      key: 'updateBy',
      width: '10%',
    },{
      title: '设置时间',
      dataIndex: 'updateAt',
      key: 'updateAt',
      width: '10%',
    },{
      title: '操作',
      width: '10%',
      render: (text, record) => {
        let disabled = false;
        if(record.ruleParams){
          disabled = false;
        }else{
          disabled = true;
        }
        return (<div>
          <Button disabled={disabled} type="primary" size="small" onClick={this._getRuleListParams.bind(this, record)}>报警设置</Button>
          <span style={{paddingLeft:10}}></span>
          <Button type="primary" size="small" onClick={this._getRuleConfigParams.bind(this, record)}>规则设置</Button>
        </div>
        );
      }
    }];
  }

  _getRuleListParams = (data) => {
      this.props.editConfigParams(data);
      this.props.setConfigVisibleTrue();
  }

  _getRuleConfigParams = (data) => {
    this.props.getRuleConfigParams(data);
    this.props.setRuleConfigVisibleTrue();
  }

  _paginationOnChange = (pageIndex) => {
    this.setState({
      pageIndex: pageIndex
    });

    this.props.setConfigSeachParamsPageIndex(pageIndex);
    this.props.getConfigList();
    this.props.setBatchButtonDisabled();
  }

  _onRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      shopEntityId: selectedRowKeys
    });
    this.props.setShopEntityId(selectedRowKeys);
    this.props.setBatchButtonDisabled();
  }

  //批量设置
  _batchSetConfig = () => {
    this.props.getDefaultTypeList();
    this.props.setConfigDefaultVisibleTrue();
  }

  render() {
    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys: this.props.shopEntityId,
      onChange: this._onRowSelectChange
    };

    return (
      <div>
        <div className="util-clearfix" style={{textAlign:'right', paddingBottom:20}}>
          <Button disabled={!this.props.batchButtonDisabled} type="primary" onClick={this._batchSetConfig}>批量设置</Button>
        </div>
        <div className="util-clearfix">
        <Table rowSelection={rowSelection} loading={this.props.loading} columns={this._columns()} dataSource={this.props.rows} pagination={false} />
        <Pagination showQuickJumper showTotal={(total, range) => `显示第 ${(range[0] && range[1])?range[0]:0} 到第 ${range[1]} 条记录，总共 ${total} 条记录`} defaultCurrent={1} pageSize={this.props.seachParams.pageSize} current={this.props.seachParams.pageIndex} total={this.props.seachParams.total} onChange={this._paginationOnChange} />
        </div>
      </div>

		);
  }
};
export default TableList;
