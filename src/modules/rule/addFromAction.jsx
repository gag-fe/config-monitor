import React from 'react';
import Form from '@gag/form-web';
import Input from '@gag/input-web';
import Button from '@gag/button-web';
import Modal from '@gag/modal-web';
import Steps from '@gag/steps-web';
const FormItem = Form.Item;

import MonitorSendTableAdd from './components/monitorSendTableAdd';
import MonitorUserTableAdd from './components/monitorUserTableAdd';
import MonitorTypeTableAdd from './components/monitorTypeTableAdd';

import Utils from '../../utils/index';
const CommonUtils = Utils.common;
const Step = Steps.Step;

class AddFromAction extends React.Component {
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

  onChange = (key, event) => {
    const value = event.target.value;
  }

  _handleOk = () => {
    this.setState({
      visible: false,
      current: 0,
    });

    const selectedRowKeys = this.props.selectedRowKeys;
    const monitorTargetObj = this.props.monitorTargets;


    const current = this.state.current + 1;

    if (this.props.monitorTargets.length == 0) {
      //alert("请设置监控对象");
      CommonUtils.modal('warning', '警告', '请设置监控对象!');
      return false;
    }

    if (this.props.receiversList.realtimeReceiverEmails == '' && !this.props.receiversList.realtimeReceiverMobiles && !this.props.receiversList.receiverList) {
      //alert("请设置报警发送！");
      CommonUtils.modal('warning', '警告', '请设置报警发送!');
      this.setState({
        current: 1,
      });
      return false;
    }

    if ( this.props.selectedRowKeys.length == 0) {
      //alert("请设置报警类型！");
      CommonUtils.modal('warning', '警告', '请设置报警类型!');
      this.setState({
        current: 2,
      });
      return false;
    }



    this.props.setAddVisible(false);
    this.props.monitorTypeAddRule();
    this.props.resetMonitorRuleData();
    this.props.currentMonitorRule(0);
  }

  _handleCancel = () => {
    this.setState({
      current: 0,
    });
    this.props.setAddVisible(false);
    this.props.resetMonitorRuleData();
    this.props.currentMonitorRule(0);
  }

  _next = () => {
    this.props.getTypeListMonitorType();
    const current = this.state.current + 1;
    if (current == 1 && this.props.monitorTargets.length == 0) {
      //window.alert("请设置监控对象");
      CommonUtils.modal('warning', '警告', '请设置监控对象!');
      return false;
    }

    if (current == 2 && (this.props.receiversList.realtimeReceiverEmails == '' && !this.props.receiversList.realtimeReceiverMobiles && !this.props.receiversList.receiverList)) {
      //window.alert("请设置报警发送！");
      CommonUtils.modal('warning', '警告', '请设置报警发送!');
      return false;
    }

    if (current == 3 && this.props.selectedRowKeys.length == 0) {
      //window.alert("请设置报警类型！");
      CommonUtils.modal('warning', '警告', '请设置报警类型!');
      return false;
    }

    this.setState({current});
  }

  _prev = () => {
    const current = this.state.current - 1;
    this.setState({current});
  }

  _monitorUser = () => {
    return <MonitorUserTableAdd {...this.props}></MonitorUserTableAdd>
  }
  _monitorSend = () => {
    return <MonitorSendTableAdd {...this.props}/>
  }

  _monitorType = () => {
    return <MonitorTypeTableAdd {...this.props}/>;
  }

  componentDidMount() {
    //this.props.getTypeListMonitorType();
  }

  render() {
    const {current} = this.state;
    const steps = [{
      title: '监控对象',
      content: this._monitorUser()
    }, {
      title: '报警发送',
      content: this._monitorSend(),
    }, {
      title: '报警类型',
      content: this._monitorType(),
    },];

    return (
      <Modal title="新增报警" width="1000" visible={this.props.addVisible} onOk={this._handleOk}
             onCancel={this._handleCancel}
             maskClosable={false}>
        <Steps current={current}>
          <Step key="1" title="监控对象"/>
          <Step key="2" title="报警发送"/>
          <Step key="3" title="报警类型"/>
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this._next()}>下一步</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{marginLeft: 8}} onClick={() => this._prev()}>
              上一步
            </Button>
          }
        </div>
      </Modal>
    );
  }
}
;
export default AddFromAction;
