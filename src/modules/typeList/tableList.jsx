import { createContainer } from 'roof';
import React from 'react';
import Table from '@gag/table-web';

const TableList = React.createClass({
  _columns() {
    return [{
      title: '序号',
      dataIndex: 'serialNo',
      key: 'serialNo',
      width: '7%'
    },{
      title: '预案名称',
      dataIndex: 'name',
      key: 'name',
      width: '15%'
    },{
      title: '报警频率',
      dataIndex: 'triggerType',
      key: 'triggerType',
      width: '10%'
    }, {
      title: '报警类型',
      dataIndex: 'classify',
      key: 'classify',
      width: '20%'
    },{
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    }];
  },

  render() {
    return (
				<Table columns={this._columns()} dataSource={this.props.typeList} pagination={false} loading={this.props.loading}/>
		);
  },
});
export default TableList;
