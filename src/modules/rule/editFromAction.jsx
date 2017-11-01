import React from 'react';
import Form from '@gag/form-web';
import Input from '@gag/input-web';
import Button from '@gag/button-web';
import Modal from '@gag/modal-web';
import Steps from '@gag/steps-web';
const FormItem = Form.Item;

import MonitorSendTableEdit from './components/monitorSendTableEdit';
import MonitorUserTableEdit from './components/monitorUserTableEdit';
import MonitorTypeTableEidt from './components/monitorTypeTableEdit';

import Utils from '../../utils/index';
const CommonUtils = Utils.common;
const Step = Steps.Step;
var tempObj = {};

class EditFromAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      current: 0,
      sendTime: props.editor.sendTime,
      receiverList: props.editor.receiverList,
      monitorTargets: props.editor.monitorTargets,
      ruleList: props.editor.ruleList
    };
  }

  _handleOk = () => {
    let num = 0;
    let editorData = this.props.editor;

    if(editorData.monitorTargetIds.length == 0){
      //window.alert("请配置监测对象！");
      CommonUtils.modal('warning', '警告', '请配置监测对象!');
      return false;
    }

    if(editorData.receiverList.length == 0 && editorData.realtimeReceiverEmails.length == 0 && editorData.realtimeReceiverMobiles.length == 0){
      //window.alert('请配置监测发送信息！');
      CommonUtils.modal('warning', '警告', '请配置监测发送信息!');
      return false;
    }

    if(editorData.receiverList.length != 0 && editorData.sendTime == ''){
      //window.alert('请配置监测发送时间！');
      CommonUtils.modal('warning', '警告', '请配置监测发送时间!');
      return false;
    }
    if(editorData.receiverList.length == 0){
      editorData.sendTime == ''
    }

    if(editorData.ruleList.length == 0){
      //window.alert('请配置监测类型！');
      CommonUtils.modal('warning', '警告', '请配置监测类型!');
      return false;
    }

    /*
    const billArr = ['bill-exception-1','bill-exception-2','bill-exception-3','bill-exception-5','data-exception-1','data-exception-2','data-exception-3','data-exception-4','device-exception-1','device-exception-2','device-exception-3','order-exception-1'];

    let billArrTrue = false;

    editorData.ruleList.map(item => {
      if((billArr.indexOf(item)!=-1)){
        billArrTrue = true
      }else {
        billArrTrue = false
      }
    });

    if(billArrTrue&&editorData.receiverList.length==0){
      window.alert("选择了定时报警类型,请设置定时发送邮箱！");
      this.setState({
        current: 2,
      });
      return false;
    }
*/
    this.props.updateRuleMonitorRuleData();
    this.props.setEditVisible(false);
    this.props.resetMonitorRuleData();
    this.props.currentMonitorRule(0);
  }

  _handleCancel = () => {
    this.props.setEditVisible(false);
    this.props.resetMonitorRuleData();
    this.props.currentMonitorRule(0);
  }

  _next = () => {

    let editorData = this.props.editor;

    if(current == 1 &&editorData.monitorTargetIds.length == 0){
      window.alert("请配置监测对象！");
      return false;
    }

    if(current == 2 && (editorData.receiverList.length == 0 && editorData.realtimeReceiverEmails.length == 0 && editorData.realtimeReceiverMobiles.length == 0)){
      window.alert('请配置监测发送信息！');
      return false;
    }

    if(current == 2 &&(editorData.receiverList.length != 0 && editorData.sendTime == '')){
      window.alert('请配置监测发送时间！');
      return false;
    }


    if(current == 3 &&editorData.ruleList.length == 0){
      window.alert('请配置监测规则！');
      return false;
    }

    const current = this.props.current + 1;
    this.props.currentMonitorRule(current);
    this.props.getTypeListMonitorType();
  }

  _prev = () => {
    const current = this.props.current - 1;
    this.props.currentMonitorRule(current);
  }

  _monitorUser = () => {
    return <MonitorUserTableEdit {...this.props}></MonitorUserTableEdit>
  }
  _monitorSend = () =>{
    return <MonitorSendTableEdit {...this.props}/>
  }

  _monitorType = () => {
    return <MonitorTypeTableEidt {...this.props}/>;
  }
  componentWillMount(){
    //this.props.getTypeListMonitorType();//获取报警类型
    //this.props.getAllTargetsData();//获取机构和商户分组信息。
  }
  render() {
    const current = this.props.current;
    const steps = [{
      title: '监控对象',
      content: this._monitorUser()
    },{
      title: '报警发送',
      content: this._monitorSend(),
    }, {
      title: '报警类型',
      content: this._monitorType(),
    }];
    return (
			<Modal title="编辑报警" width="1000" visible={this.props.editVisible} onOk={this._handleOk} onCancel={this._handleCancel}
             maskClosable={false}>
        <Steps current={current}>
          <Step key="1" title="监控对象"/>
          <Step key="2" title="报警发送"/>
          <Step key="3" title="报警类型"/>
        </Steps>
        <div className="steps-content">{steps[this.props.current].content}</div>
        <div className="steps-action">
          {
            this.props.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this._next()}>下一步</Button>
          }
          {
            this.props.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this._prev()}>
              上一步
            </Button>
          }
        </div>
			</Modal>
		);
  }
};
export default EditFromAction;
