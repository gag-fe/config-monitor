import React from 'react';
import Table from '@gag/table-web';
import Button from '@gag/button-web';
import Pagination from '@gag/pagination-web';
import Popconfirm from '@gag/popconfirm-web';
import Moment from 'moment';
const format = 'HH:mm';
const sendTypeText = ['定时','实时'];
const monitorTypeText = ['邮件','短信'];

class MonitorSendTableEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _dataSource = (props) => {
    //realtimeReceiverEmails:'',//实时收件人列表，逗号分隔
    //realtimeReceiverMobiles:'',//实时手机号列表，逗号分隔
    //receiverList:'',//定时收件人列表，逗号分隔
    //sendTime:'',//报警时间
    //sendTimeString: ''

    let realtimeReceiverEmails = [];
    let realtimeReceiverMobiles = [];
    let receiverList = [];

    let receiversList = [{
      realtimeReceiverEmails:'',//实时收件人列表，逗号分隔
      realtimeReceiverMobiles:'',//实时手机号列表，逗号分隔
      receiverList:'',//定时收件人列表，逗号分隔
      sendTime:'',//报警时间
      sendTimeString: ''
    }];

    if(props.editor && props.editor.realtimeReceiverEmails && props.editor.realtimeReceiverEmails.length != 0){
      props.editor.realtimeReceiverEmails.map(item => {
        realtimeReceiverEmails.push(item);
      });
    }

    if(props.editor && props.editor.realtimeReceiverMobiles && props.editor.realtimeReceiverMobiles.length != 0){
      props.editor.realtimeReceiverMobiles.map(item => {
        realtimeReceiverMobiles.push(item);
      });
    }

    if(props.editor && props.editor.receiverList && props.editor.receiverList.length != 0){
      props.editor.receiverList.map(item => {
        receiverList.push(item);
      });
    }

    receiversList[0]['realtimeReceiverEmails'] = realtimeReceiverEmails;
    receiversList[0]['realtimeReceiverMobiles'] = realtimeReceiverMobiles;
    receiversList[0]['receiverList'] = receiverList;
    receiversList[0]['sendTime'] = props.editor.sendTime;
    receiversList[0]['sendTimeString'] = props.editor.sendTimeString;

    return receiversList;
  }

  _edit = () => {
    this.props.receiverVisibleEidtState(true);
    this.props.addUserMailButtonState(true);
  }

  _columns = () => {
    return [{
      title: '发送邮箱',
      //dataIndex: 'receiverList',
      key: 'receiverList',
      render: (text, record) => {
        let textHtml = '';
        if(record.receiverList && record.receiverList.length != 0){

          record.receiverList.map(item => {
            textHtml += '<p>' + item + '</p>'
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
        if(record.realtimeReceiverMobiles && record.realtimeReceiverMobiles.length != 0){

          record.realtimeReceiverMobiles.map(item => {
            textHtml += '<p>' + item + '</p>'
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
        if(record.realtimeReceiverEmails && record.realtimeReceiverEmails.length != 0){

          record.realtimeReceiverEmails.map(item => {
            textHtml += '<p>' + item + '</p>'
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
        <div className="util-clearfix">
          <Table columns={this._columns()} dataSource={this._dataSource(this.props)} pagination={false}/>
        </div>
      </div>
    );
  }
}

export default MonitorSendTableEdit;
