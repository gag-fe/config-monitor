import React from 'react';
import Table from '@gag/table-web';
import Button from '@gag/button-web';
import Pagination from '@gag/pagination-web';
import Popconfirm from '@gag/popconfirm-web';

const sendTypeText = ['定时','实时'];
const monitorTypeText = ['邮件','短信'];

class MonitorSendTableAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _dataSource = (props) => {
    let receiversList = [];
    if(props.receiversList.realtimeReceiverEmails != '' || props.receiversList.realtimeReceiverMobiles != '' || props.receiversList.receiverList != ''){
      receiversList[0] = props.receiversList;
    }

    return receiversList;
  }

  _edit = () => {
    this.props.receiverVisibleState(true);
    this.props.addUserMailButtonState(true);
  }

  _columns = () => {
    return [{
      title: '发送邮箱',
      //dataIndex: 'receiverList',
      key: 'receiverList',
      render: (text, record) => {
        let textHtml = '';
        if(record.receiverList != ''){
          let  tempArr = record.receiverList.split(',');
          tempArr.map(item => {
            textHtml += '<p>' + item + '</p>';
          });
        }
        return (<div dangerouslySetInnerHTML={{__html: textHtml}}></div>);
      }
    },{
      title: '发送时间',
      dataIndex: 'sendTimeString',
      key: 'sendTimeString'
    },{
      title: '发送即时短信',
      //dataIndex: 'realtimeReceiverMobiles',
      key: 'realtimeReceiverMobiles',
      render: (text, record) => {
        let textHtml = '';
        if(record.realtimeReceiverMobiles != ''){
          let  tempArr = record.realtimeReceiverMobiles.split(',');
          tempArr.map(item => {
            textHtml += '<p>' + item + '</p>';
          });
        }
        return (<div dangerouslySetInnerHTML={{__html: textHtml}}></div>);
      }
    },{
      title: '发送即时邮件',
      //dataIndex: 'realtimeReceiverEmails',
      key: 'realtimeReceiverEmails',
      render: (text, record) => {
        let textHtml = '';
        if(record.realtimeReceiverEmails != ''){
          let  tempArr = record.realtimeReceiverEmails.split(',');
          tempArr.map(item => {
            textHtml += '<p>' + item + '</p>';
          });
        }
        return (<div dangerouslySetInnerHTML={{__html: textHtml}}></div>);
      }
    },{
      title: '操作',
      render: (text, record) => {
        return (<div>
          <Button onClick={this._edit.bind(this, record)}>编辑</Button>
        </div>
        );
      }
    }];
  }

  _addMonitorTargets = () => {
    this.props.receiverVisibleState(true);
  }

  render() {
    return (
      <div>
        <div style={{textAlign:"right"}} className="util-clearfix">
          <Button  type="primary" onClick={this._addMonitorTargets}>添加</Button>
        </div>
        <div className="util-clearfix">
          <Table columns={this._columns()} dataSource={this._dataSource(this.props)} pagination={false}/>
        </div>
      </div>
    );
  }
}

export default MonitorSendTableAdd;
