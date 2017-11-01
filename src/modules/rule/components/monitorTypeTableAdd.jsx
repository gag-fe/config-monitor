import React from 'react';
import Table from '@gag/table-web';

class monitorTypeTableAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: props.selectedRowKeys || []
    };
  }
  _columns = () => {
    return [{
      title: '序号',
      dataIndex: 'serialNo',
      key: 'serialNo'
    },{
      title: '预案名称',
      dataIndex: 'name',
      key: 'name',
      width: '20%'
    }, {
      title: '报警类型',
      dataIndex: 'classify',
      key: 'classify'
    }, {
      title: '报警频率',
      dataIndex: 'triggerType',
      key: 'triggerType'
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: '40%'
    }];
  }

  _onRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys: selectedRowKeys
    });

    this.props.updataTypeListMonitorType(selectedRowKeys);
  }

  /*
  componentWillReceiveProps(nextProps){
    if(this.props.selectedRowKeys &&  nextProps.selectedRowKeys){
      this.setState({
        selectedRowKeys: nextProps.selectedRowKeys ? nextProps.selectedRowKeys: [],
        ruleLists: nextProps.ruleLists ? nextProps.ruleLists: []
      })
    }
  }
  */
  render() {
    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys: this.props.selectedRowKeys,
      onChange: this._onRowSelectChange,
    };

    return (
				<Table rowSelection={rowSelection} columns={this._columns()} dataSource={this.props.ruleLists} pagination={false} loading={this.props.loading}/>
		);
  }
}
export default monitorTypeTableAdd;
