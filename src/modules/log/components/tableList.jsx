import { createContainer } from 'roof';
import React from 'react';
import Table from '@gag/table-web';
import Pagination from '@gag/pagination-web';

import Utils from '../../../utils/index';
const Ajax = Utils.ajax;
const CommonUtils = Utils.common;

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 20,
      pageIndex: 1,
      total: 50
    };
  }
  _columns = () => {
    return [{
      title: '序号',
      dataIndex: 'serialNo',
      key: 'serialNo',
      width: '5%'
    },{
      title: '报警频率',
      dataIndex: 'triggerType',
      key: 'triggerType',
      width: '10%'
    },{
      title: '报警方式',
      dataIndex: 'sendby',
      key: 'sendby',
      width: '10%'
    },{
      title: '发送对象',
      width: '20%',
      render: (text, record) => {
        var tex = "";
        if(record.receiverList && record.receiverList.length > 0){
            record.receiverList.map(item => {
              tex += '<p>' +item + '</p>';
            });
            return  ( <div dangerouslySetInnerHTML={{__html: tex}}></div>);
        }else{
          return '--';
        }
      }
    }, {
      title: '发送时间',
      dataIndex: 'sendTime',
      key: 'sendTime',
      width: '15%',
    }, {
      title: '报告内容',
      width: '40%',
      render: (text, record) => {

        if(record.monitorTargetArray && record.monitorTargetArray.length > 0){
            var urlFix = "";
            var viemDone = [];
            record.monitorTargetArray.map(item => {
              viemDone.push(
                '<a target="_blank" href="'+ APP_CONFIG.api.URLFIX +'/monitor/exportExcel?target=' + item.name + '&id=' + record.id +'&targetId='+ item.id +'">' + item.name + '</a>'
              );
            });
            urlFix = viemDone.join(' | ');
            return  ( <div dangerouslySetInnerHTML={{__html: urlFix}}></div>);
        }else{
          return '--';
        }
      }
    }];
  }

  _paginationOnChange = (pageIndex) => {
    let item = this.state;
    this.setState({
      pageIndex: pageIndex
    });
    item['pageIndex'] = pageIndex;

    this.props.updateSearchParams(item);
    this.props.getLogList();
  }


  render() {
    return (
      <div>
        <Table loading={this.props.loading} columns={this._columns()} dataSource={this.props.recordList} pagination={false} />
        <Pagination showQuickJumper showTotal={(total, range) => `显示第 ${(range[0] && range[1])?range[0]:0}  到第 ${range[1]?range[1]:0} 条记录，总共 ${total} 条记录`}
                    defaultCurrent={1} pageSize={this.props.seachParams.pageSize}
                    current={this.props.seachParams.pageIndex || 1} total={this.props.seachParams.total}
                    onChange={this._paginationOnChange}/>
    </div>

		);
  }
};
export default TableList;
