import React from 'react';
import Table from '@gag/table-web';
import Form from '@gag/form-web';
import Input from '@gag/input-web';
import Button from '@gag/button-web';
import TimePicker from '@gag/time-picker-web';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import Modal from '@gag/modal-web';
const FormItem = Form.Item;
import Utils from '../../../utils/index';
const CommonUtils = Utils.common;

class AddUserMail extends React.Component {
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

  _getData = () => {
    var receiverLists = [];
    this.props.receiverLists.map(item => {
      receiverLists.push({mail: item});
    });

    return receiverLists;
  }

  _addMail = () => {
    var ishas = true;
    var items = this.state.receiverLists;
    var value = this.state.receiverList;
    if (value != "") {

      if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        //alert('邮箱不合法！');
        CommonUtils.modal('warning', '警告', '邮箱不合法!');
        return false;
      }

      items.map(item => {
        if (item.mail == value) {
          //alert('邮箱已经存在！');
          CommonUtils.modal('warning', '警告', '邮箱已经存在!');
          ishas = false;
          return false;
        }
      });
      if (ishas) {
        items.push({mail: value});
      }

    } else {
      //alert("邮箱不能为空！");
      CommonUtils.modal('warning', '警告', '邮箱不能为空!');
    }

    this.setState({
      receiverList: '',
      receiverLists: items
    });

    this.props.callback(this.state.receiverLists);
  }

  _delete = (mail) => {
    var newItems = [];
    var items = this.state.receiverLists;
    if (items.length == 1 || items.length == 0) {
      items = [];
    } else {
      items.map(item => {
        if (item.mail != mail) {
          newItems.push(item);
        }
      });
    }

    this.setState({
      receiverLists: newItems
    });
    this.props.callback(this.state.receiverLists);
  }

  _timePicker = (time, timeString) => {
    this.setState({
      sendTime: time,
      sendTimeString: timeString
    });
  }
  _range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  _disabledHours = () => {
    const hours = this._range(0, 60);
    hours.splice(8, 16);
    return hours;
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
      //alert('发送邮箱不合法！');
      CommonUtils.modal('warning', '警告', '发送邮箱不合法!');
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
        //alert('发送即时邮箱不合法！');
        CommonUtils.modal('warning', '警告', '发送即时邮箱不合法!');
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
      //alert('手机号码不合法！');
      CommonUtils.modal('warning', '警告', '手机号码不合法!');
      return false;
    }
    temp = receiverList.length + realtimeReceiverEmails.length + realtimeReceiverMobiles.length;

    if(temp == 0 || temp > 10){
      //window.alert('请检查接收消息终端数量，电话和邮箱最多10条！');
      CommonUtils.modal('warning', '警告', '请检查接收消息终端数量，电话和邮箱最多10条!');
      return false;
    }




    this.props.receiverVisibleState(false);
    this.props.addUserMailMonitorTargets(item);
    this.props.addUserMailButtonState(true);
    this.setState({
      receiverList:'',
      realtimeReceiverEmails: '',
      realtimeReceiverMobiles: '',
      sendTime: null,
      sendTimeString: ''
    });
  }

  _handleCancel = () => {
    this.props.receiverVisibleState(false);
    this.setState({
      receiverList:'',
      realtimeReceiverEmails: '',
      realtimeReceiverMobiles: '',
      sendTime: null,
      sendTimeString: ''
    });
    this.props.addUserMailButtonState(false);
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
    if(this.props.receiversList &&  nextProps.receiversList){
      this.setState({
        receiverList: nextProps.receiversList ? nextProps.receiversList.receiverList: '',
        realtimeReceiverEmails: nextProps.receiversList ? nextProps.receiversList.realtimeReceiverEmails:'',
        realtimeReceiverMobiles: nextProps.receiversList? nextProps.receiversList.realtimeReceiverMobiles: '',
        sendTime: nextProps.receiversList ? nextProps.receiversList.sendTime : '',
        sendTimeString: nextProps.receiversList ? nextProps.receiversList.sendTimeString: ''
      })
    }
  }

  render() {
    return (
      <Modal title="新增报警发送" width="900" visible={this.props.receiverVisible} onOk={this._handleOk} onCancel={this._handleCancel}>
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
                <TimePicker value={this.state.sendTime} disabledHours={this._disabledHours} onChange={this._timePicker} format="HH:mm" addon={panel => (
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

export default AddUserMail;
