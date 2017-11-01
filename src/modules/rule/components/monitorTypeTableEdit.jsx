import React from 'react';
import Table from '@gag/table-web';

class MonitorTypeTableEidt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: props.editor.ruleList || []
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

    this.props.updataEditTypeListMonitorType(selectedRowKeys);
  }

/*
  componentWillReceiveProps(nextProps){
    if(this.props.editor && this.props.editor.ruleList &&  nextProps.editor.ruleList){
      this.setState({
        selectedRowKeys: nextProps.editor.ruleList || [],
        ruleLists: nextProps.ruleLists ? nextProps.ruleLists: []
      })
    }
  }
  */

  render() {
    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this._onRowSelectChange,
    };

    return (
				<Table rowSelection={rowSelection} columns={this._columns()} dataSource={this.props.ruleLists} pagination={false} loading={this.props.loading}/>
		);
  }
}
export default MonitorTypeTableEidt;
