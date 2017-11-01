import React from 'react';
import Table from '@gag/table-web';
import Button from '@gag/button-web';
import Pagination from '@gag/pagination-web';
import Popconfirm from '@gag/popconfirm-web';


class MonitorUserTableAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _dataSource = (props) => {
    let viewData = [];
    if(props.monitorTargetsList && props.monitorTargetsList.length > 0){
      props.monitorTargetsList.map((item, idx) => {
        let temp = {};
        temp['serialNo'] = idx + 1;
        temp['name'] = item.name;
        viewData.push(temp);
      });
    }
    return viewData;
  }
  _columns = () => {
    return [{
      title: '序号',
      dataIndex: 'serialNo',
      key: 'serialNo'
    }, {
      title: '监控对象',
      dataIndex: 'name',
      key: 'name'
    }];
  }
  _addMonitorTargets = () => {
    this.props.setAadTargetVisible(true);
    this.props.getAllTargetsData();//获取机构和商户分组信息。
  }

  render() {
    return (
      <div>
        <div style={{textAlign:"right"}} className="util-clearfix">
          <Button type="primary" onClick={this._addMonitorTargets}>添加</Button>
        </div>
        <div className="util-clearfix">
          <Table columns={this._columns()} dataSource={this._dataSource(this.props)} pagination={false}/>
        </div>
      </div>
    );
  }
}

export default MonitorUserTableAdd;
