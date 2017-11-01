import {createContainer, createActionContainer} from 'roof';
import React from 'react';
import Table from '@gag/table-web';
import Button from '@gag/button-web';
import Pagination from '@gag/pagination-web';
import Popconfirm from '@gag/popconfirm-web';
import Moment from 'moment';
const format = 'HH:mm';
const format2 = 'YYYY-MM-DD';

import Utils from '../../utils/index';
const Ajax = Utils.ajax;
const CommonUtils = Utils.common;

class TableList extends React.Component {
  constructor(props) {
    super(props);
  }

  _editor = (data) => {

    let tempData = {
      sendTimeString: data.sendTime || '',
      sendTime: data.sendTime ? Moment(data.sendTime,format) : ''
    };

    let posData = Object.assign({}, data, tempData);

    this.props.updataEditRowsData(posData);
    this.props.setEditVisible(true);
  }


  _confirm = (id) => {
    this.props.deleteMonitorRule(id);
  }

  _columns = () => {
    return [{
      title: '序号',
      dataIndex: 'serialNo',
      key: 'serialNo',
      width: '7%'
    },{
      title: '报警频率',
      dataIndex: 'triggerType',
      key: 'triggerType',
      width: '10%',
      render: (text, record) => {
        let tex = '--';
        if(record.triggerType && record.triggerType.length > 0 && CommonUtils.isArray(record.triggerType)){
          tex = record.triggerType.join(' | ');
        }
        return tex;
      }
    },{
      title: '发送对象',
      width: '18%',
      render: (text, record) => {
        var tex = [];
        var ArrTotal = record.receiverList.concat(record.realtimeReceiverEmails).concat(record.realtimeReceiverMobiles);
        if(ArrTotal.length > 0){
          ArrTotal.map(item => {
            tex.push(item);
          });
          return tex.join(",");
        } else {
          return '--';
        }
      }
    }, {
      title: '报警类型',
      width: '20%',
      render: (text, record) => {
        if (record.ruleTypeList && record.ruleTypeList.length > 0) {
          var textArr = [];
          record.ruleTypeList.map(item => {
            textArr.push(item);
          });
          return textArr.join(' | ');
        } else {
          return '--';
        }
      }
    },{
      title: '设置账户',
      dataIndex: 'createBy',
      key: 'createBy',
      width: '10%',
    },{
      title: '设置时间',
      //dataIndex: 'createTime',
      key: 'createTime',
      width: '10%',
      render:(text, record) => {
        return Moment(record.createTime).format('YYYY-MM-DD HH:mm')
      }
    },{
      title: '发送时间',
      dataIndex: 'sendTime',
      key: 'sendTime',
      width: '10%',
    },{
      title: '监控对象',
      width: '20%',
      render: (text, record) => {
        if (record.monitorTargets && record.monitorTargets.length > 0 && record.monitorTargets.length < 3) {
          return record.monitorTargets.join(' | ');
        }else if (record.monitorTargets.length > 2) {
          return (record.monitorTargets.slice(0,2)).join("|")+'等'+record.monitorTargets.length+'个';
        }
         else {
          return '--';
        }
      }
    },{
      title: '操作',
      width: '5%',
      render: (text, record) => {
        return (<div>
          <Button type="primary"  disabled={!record.editable} size="small" value={record.serialNo} onClick={this._editor.bind(this, record)}
                  style={{marginRight: '20px'}}
          >编辑</Button>
          <Popconfirm title="确定要删除吗？" onConfirm={this._confirm.bind(this, record.id)}
                      onCancel={this._cancel}
          ><Button disabled={!record.editable} type="primary" size="small"
                   value={record.id}
          >删除</Button></Popconfirm>
        </div>);
      },
    }];
  }

  //新增设置
  _buttonAddCilck = () => {

    this.props.setAddVisible(true);
    this.props.resetMonitorRuleData()
  }

  _paginationOnChange = (pageIndex) => {
    this.setState({
      pageIndex: pageIndex
    });
    this.props.setRuleSeachParamsPageIndex(pageIndex);
    this.props.getRuleList();
  }

  render() {
    return (
      <div>
        <div className="util-clearfix" style={{textAlign:'right', paddingBottom:20}}>
          <Button type="primary" onClick={this._buttonAddCilck}>新增报警策略</Button>
        </div>
        <div className="util-clearfix">
        <Table loading={this.props.loading} columns={this._columns()} dataSource={this.props.rows} pagination={false}/>
        <Pagination showQuickJumper showTotal={(total, range) => `显示第 ${(range[0] && range[1])?range[0]:0} 到第 ${range[1]} 条记录，总共 ${total} 条记录`}
                    defaultCurrent={1} pageSize={this.props.seachParams.pageSize}
                    current={this.props.seachParams.pageIndex} total={this.props.seachParams.total}
                    onChange={this._paginationOnChange}/>
      </div>
      </div>
    );
  }
}

export default TableList;
