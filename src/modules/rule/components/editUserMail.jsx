import React from 'react';
import Table from '@gag/table-web';
import Form from '@gag/form-web';
import Input from '@gag/input-web';
import Button from '@gag/button-web';
import TimePicker from '@gag/time-picker-web';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import Modal from '@gag/modal-web';
import Moment from 'moment';
const format = 'HH:mm';
const FormItem = Form.Item;
import Utils from '../../../utils/index';
const CommonUtils = Utils.common;
class EditUserMail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverList: props.receiverList || '',
      realtimeReceiverEmails: props.realtimeReceiverEmails || '',
      realtimeReceiverMobiles: props.realtimeReceiverMobiles || '',
      sendTime: props.sendTime || null,
      sendTimeString: props.sendTimeString || '',
    };
  }

  _onChange = (key, event) => {
    var tempObj = {};
    var items = this.state;
    var value = event.target.value;
        tempObj[key] = value;

    var state = Object.assign({}, items, tempObj);
    this.setState({
      receiverList: state.receiverList,
      realtimeReceiverEmails: state.realtimeReceiverEmails,
      realtimeReceiverMobiles: state.realtimeReceiverMobiles,
      sendTime: state.sendTime,
      sendTimeString: state.sendTimeString
    });
  }

  _timePicker = (time, timeString) => {
    this.setState({
      sendTime: time,
      sendTimeString: timeString
    });
  }

  _handleOk = () => {
    let temp = 0;
    let receiverList = [];
    let realtimeReceiverEmails = [];
    let realtimeReceiverMobiles = [];
    let item = this.state;
    var receiverListBlen = true;
    var timeEmailsBlen = true;
    var mobileBlen = true;

    if(item.receiverList == '' && item.realtimeReceiverEmails == '' && item.realtimeReceiverMobiles == ''){
      //window.alert("请添加报警方式!");
      CommonUtils.modal('warning', '警告', '请添加报警方式!');
      return false;
    }
    if(item.receiverList != '' && item.sendTimeString == ''){
      //window.alert("请填写发送定时邮件时间!");
      CommonUtils.modal('warning', '警告', '请填写发送定时邮件时间!');
      return false;
    }

    if(item.receiverList == '' && item.sendTimeString != ''){
      //window.alert("请填写发送定时邮件地址!");
      CommonUtils.modal('warning', '警告', '请填写发送定时邮件地址!');
      return false;
    }

    if(item.receiverList != ''){
      receiverList = item.receiverList.split(',');

      receiverList.map(item => {
        if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(item)){

          receiverListBlen = false;

        }
      });
    }
    if(!receiverListBlen){
      CommonUtils.modal('warning', '警告', '邮箱不合法!');
      //alert('邮箱不合法！');
      return false;
    }
    if(item.realtimeReceiverEmails != ''){

      realtimeReceiverEmails = item.realtimeReceiverEmails.split(',');

      realtimeReceiverEmails.map(item => {
        if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(item)){

          timeEmailsBlen = false;
        }
      });
    }
    if(!timeEmailsBlen){
      CommonUtils.modal('warning', '警告', '邮箱不合法!');
        //alert('邮箱不合法！');
        return false;
    }
    if(item.realtimeReceiverMobiles != ''){

      realtimeReceiverMobiles = item.realtimeReceiverMobiles.split(',');

      realtimeReceiverMobiles.map(item => {
        if(!(/^1(3|4|5|7|8)\d{9}$/.test(item))){

          mobileBlen = false;

        }
      });
    }
    if(!mobileBlen){
      CommonUtils.modal('warning', '警告', '手机号码不合法!');
      //alert('手机号码不合法！');
      return false;
    }
    temp = receiverList.length + realtimeReceiverEmails.length + realtimeReceiverMobiles.length;

    if(temp == 0 || temp > 10){
      CommonUtils.modal('warning', '警告', '请检查接收消息终端数量，电话和邮箱最多10条!');
      //window.alert('请检查接收消息终端数量，电话和邮箱最多10条！');
      return false;
    }




    let paramsObjArr = Object.assign({}, item);
        paramsObjArr['receiverList'] = receiverList;
        paramsObjArr['realtimeReceiverEmails'] = realtimeReceiverEmails;
        paramsObjArr['realtimeReceiverMobiles'] = realtimeReceiverMobiles;

    this.props.editUserMailMonitorTargets(paramsObjArr);
    this.props.receiverVisibleEidtState(false);

    this.setState({
      receiverList:'',
      realtimeReceiverEmails: '',
      realtimeReceiverMobiles: '',
      sendTime: null,
      sendTimeString: ''
    });
  }

  _handleCancel = () => {
    this.props.receiverVisibleEidtState(false);
    this.setState({
      receiverList:'',
      realtimeReceiverEmails: '',
      realtimeReceiverMobiles: '',
      sendTime: null,
      sendTimeString: ''
    });
    //this.props.addUserMailButtonState(false);
  }

  _disabledHours = () => {
    const hours = this._range(0, 60);
    hours.splice(8, 16);
    return hours;
  }

  _range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.editor && (this.props.editor.receiverList ||  nextProps.editor.realtimeReceiverEmails)){

      let realtimeReceiverEmails = '';
      let realtimeReceiverMobiles = '';
      let receiverList = '';

      let receiversList = {
        realtimeReceiverEmails:'',//实时收件人列表，逗号分隔
        realtimeReceiverMobiles:'',//实时手机号列表，逗号分隔
        receiverList:'',//定时收件人列表，逗号分隔
        sendTime:'',//报警时间
        sendTimeString: ''
      };

      if(nextProps.editor && nextProps.editor.realtimeReceiverEmails && nextProps.editor.realtimeReceiverEmails.length != 0){
          realtimeReceiverEmails = nextProps.editor.realtimeReceiverEmails.join(',');
      }

      if(nextProps.editor && nextProps.editor.realtimeReceiverMobiles && nextProps.editor.realtimeReceiverMobiles.length != 0){
        realtimeReceiverMobiles = nextProps.editor.realtimeReceiverMobiles.join(',');
      }

      if(nextProps.editor && nextProps.editor.receiverList && nextProps.editor.receiverList.length != 0){
        receiverList = nextProps.editor.receiverList.join(',');
      }
      if(nextProps.editor.sendTime){
        receiversList['sendTime'] = Moment(nextProps.editor.sendTime, format) || null;
        this.setState({
          receiverList: receiverList,
          realtimeReceiverEmails: realtimeReceiverEmails,
          realtimeReceiverMobiles: realtimeReceiverMobiles,
          sendTime: Moment(nextProps.editor.sendTime, format) || null,
          sendTimeString: nextProps.editor.sendTimeString
        });
      }else {
        receiversList['sendTime'] = '';
        this.setState({
          receiverList: receiverList,
          realtimeReceiverEmails: realtimeReceiverEmails,
          realtimeReceiverMobiles: realtimeReceiverMobiles,
          sendTime: '',
          sendTimeString: nextProps.editor.sendTimeString
        });
      }
      receiversList['realtimeReceiverEmails'] = realtimeReceiverEmails || '';
      receiversList['realtimeReceiverMobiles'] = realtimeReceiverMobiles || '';
      receiversList['receiverList'] = receiverList || '';

      receiversList['sendTimeString'] = nextProps.editor.sendTimeString;


    }
  }

  render() {
    return (
      <Modal title="编辑报警发送" width="900" visible={this.props.receiverVisibleEdit} onOk={this._handleOk} onCancel={this._handleCancel}>
        <Form horizontal>
          <Row>
            <Col span={16}>
              <FormItem
                label="发送邮箱: "
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
              >
                <Input placeholder="发送邮箱" value={this.state.receiverList} name="receiverList"
                       onChange={this._onChange.bind(this, 'receiverList')}/>
              </FormItem>
            </Col>
            <Col span={8}>
              (多个邮箱以","分隔符分割)
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <FormItem
                label="发送时间: "
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
              >
                <TimePicker disabledHours={this._disabledHours} value={this.state.sendTime} onChange={this._timePicker} format="HH:mm" addon={panel => (
                  <Button size="small" type="primary" onClick={() => panel.close()}>确认</Button>)}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              (定时发送时间限定在8:00~23:59，以确保后台数据处理完成及时发送)
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <FormItem
                label="发送即时短信: "
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
              >
                <Input placeholder="发送即时短信" value={this.state.realtimeReceiverMobiles} name="realtimeReceiverMobiles"
                       onChange={this._onChange.bind(this, 'realtimeReceiverMobiles')}/>

              </FormItem>
            </Col>
            <Col span={8}>
              (多个手机号码以","分隔符分割)
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <FormItem
                label="发送即时邮箱: "
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
              >
                <Input placeholder="发送即时邮箱" value={this.state.realtimeReceiverEmails} name="realtimeReceiverEmails"
                       onChange={this._onChange.bind(this, 'realtimeReceiverEmails')}/>
              </FormItem>
            </Col>
            <Col span={8}>
              (多个邮箱以","分隔符分割)
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default EditUserMail;
