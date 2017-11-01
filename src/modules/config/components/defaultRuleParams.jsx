import React from 'react';
import PropTypes from 'prop-types';
import Input from '@gag/input-web';
import InputNumber from '@gag/input-number-web';
import TimePicker from '@gag/time-picker-web';
import Button from '@gag/button-web';
import Moment from 'moment';
const format = 'HH:mm';
import Modal from '@gag/modal-web';
class DefaultRuleParams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'bill-exception-1': {"from": 0, "to": 0},
      'bill-exception-2': null,
      'bill-exception-3': {
        "time": [{"from": "", "to": ""}, {"from": "", "to": ""}],
        "downRate": 0,
        "upRate": 0
      },
      'bill-exception-4': 0,
      'bill-exception-5': {"downRate": 0, "upRate": 0},
      'data-exception-1': null,
      'data-exception-2': null,
      'data-exception-3': null,
      'data-exception-4': null,
      'device-exception-1': 0,
      'device-exception-2': {"disconnectNum": 0, "time": 0},
      'device-exception-3': 0,
      'device-exception-4': 0,
      'device-exception-5': null,
      'order-exception-1': {"downRate": 0, "upRate": 0}
    };
  }

  _hideModalRuleParamCancel = () => {
    this.props.setConfigDefaultVisibleParams(false);
  }

  _hideModalRuleParamOk = () => {
    let newParam = {};
    let param = this._viewRenderParamsData();

    if(this.props.ruleParamsEdit.ruleId == 'bill-exception-3' || this.props.ruleParamsEdit.ruleId == 'bill-exception-03'){
      let tempArr = [];
      param.time.map(item => {
        tempArr.push(item);
      });

      newParam = Object.assign({}, param, {time: tempArr});

    }else{
      newParam = param;
    }

    this.props.updateDefaultRuleParamsEditChenge(newParam);
    this.props.setDefaultRuleParams(false);
  }




  _onChange3TimeF = (type, event) => {
    let item = this.state;
    let timeF = {};
    timeF[type] = event.target.value;

    let timeFN = Object.assign({},item['bill-exception-3'].time[0], timeF);
    let tempTime = [];
    tempTime[0] = timeFN;
    tempTime[1] = item['bill-exception-3'].time[1];
    let newParam = Object.assign({}, item['bill-exception-3'], {time: tempTime});

    this.setState({
      'bill-exception-3': newParam
    });
  }

  _onChange3TimeT = (type, event) => {
    let item = this.state;
    let timeT = {};
    timeT[type] = event.target.value;
    let timeTN = Object.assign({},item['bill-exception-3'].time[1], timeT);

    let tempTime = [];
    tempTime[0] = item['bill-exception-3'].time[0];
    tempTime[1] = timeTN;
    let newParam = Object.assign({}, item['bill-exception-3'], {time: tempTime});
    this.setState({
      'bill-exception-3': newParam
    });
  }

  _onChange3 = (type, value) => {
    let item = this.state;
    let tempObj = {};
    tempObj[type] = value;

    this.setState({
      'bill-exception-3': Object.assign({}, item['bill-exception-3'], tempObj)
    });
  }

  _onChange3TimeF_2 = (type, event) => {
    let item = this.state;
    let timeF = {};
    timeF[type] = event.target.value;

    let timeFN = Object.assign({},item['bill-exception-03'].time[0], timeF);
    let tempTime = [];
    tempTime[0] = timeFN;
    tempTime[1] = item['bill-exception-03'].time[1];
    let newParam = Object.assign({}, item['bill-exception-03'], {time: tempTime});

    this.setState({
      'bill-exception-03': newParam
    });
  }

  _onChange3TimeT_2 = (type, event) => {
    let item = this.state;
    let timeT = {};
    timeT[type] = event.target.value;
    let timeTN = Object.assign({},item['bill-exception-03'].time[1], timeT);

    let tempTime = [];
    tempTime[0] = item['bill-exception-03'].time[0];
    tempTime[1] = timeTN;
    let newParam = Object.assign({}, item['bill-exception-03'], {time: tempTime});
    this.setState({
      'bill-exception-03': newParam
    });
  }

  _onChange3_2 = (type, value) => {
    let item = this.state;
    let tempObj = {};
    tempObj[type] = value;

    this.setState({
      'bill-exception-03': Object.assign({}, item['bill-exception-03'], tempObj)
    });
  }


  _onChange4 = (value) => {
    this.setState({
      'bill-exception-4': value
    });
  }

  _onChange5 = (type, value) => {
    let item = this.state;
    let tempObj = {};
    tempObj[type] = value;
    this.setState({
      'bill-exception-5': Object.assign({}, item['bill-exception-5'], tempObj)
    });
  }

  _onChange10 = (value) => {
    this.setState({
      'device-exception-1': value
    });
  }
  _onChange11 = (type, value) => {
    let item = this.state;
    let tempObj = {};
    tempObj[type] = value;
    this.setState({
      'device-exception-2': Object.assign({}, item['device-exception-2'], tempObj)
    });
  }

  _onChange12 = (value) => {
    this.setState({
      'device-exception-3': value
    });
  }

  _onChange13 = (value) => {
    this.setState({
      'device-exception-4': value
    });
  }
  _onChange13_2 = (value) => {
    this.setState({
      'device-exception-04': value
    });
  }


  _onChange15 = (type, value) => {
    let item = this.state;
    let tempObj = {};
    tempObj[type] = value;
    this.setState({
      'order-exception-1': Object.assign({}, item['order-exception-1'], tempObj)
    });
  }

  _setParams1 = () => {
    //let html = "'单笔账单金额为' + record.param2.from + '-' + record.param2.to + '时触发警情'";
    return (<div>单笔账单金额为空时触发警情</div>);
  }

  _setParams2 = () => {
    //let html = "'单笔账单金额为' + record.param2.from + '-' + record.param2.to + '时触发警情'";
    return (<div>
      销售日期大于截获日期（今天打印了明天以后的单子），触发警情
    </div>);
  }

  _setParams3 = () => {
    //let html = "在11:00-14:00以及18:00-21:00时间范围内，营业额同比下降70%或上升200%触发报警";
    return (<div>
      在
      <Input style={{width:80}} value={this.state['bill-exception-3'].time[0].from} onChange={this._onChange3TimeF.bind(this,'from')} />
      -
      <Input style={{width:80}} value={this.state['bill-exception-3'].time[0].to}   onChange={this._onChange3TimeF.bind(this,'to')} />
      以及
      <Input style={{width:80}} value={this.state['bill-exception-3'].time[1].from} onChange={this._onChange3TimeT.bind(this,'from')} />
      -
      <Input style={{width:80}} value={this.state['bill-exception-3'].time[1].to}   onChange={this._onChange3TimeT.bind(this,'to')} />
      时间范围内，营业额同比下降
      <InputNumber value={this.state['bill-exception-3'].downRate} onChange={this._onChange3.bind(this,'downRate')} />%或上升
      <InputNumber value={this.state['bill-exception-3'].upRate} onChange={this._onChange3.bind(this,'upRate')} />%触发报警。
    </div>);
  }
  _setParams3_2 = () => {
    //let html = "在11:00-14:00以及18:00-21:00时间范围内，营业额同比下降70%或上升200%触发报警";
    return (<div>
      在
      <Input style={{width:80}} value={this.state['bill-exception-03'].time[0].from} onChange={this._onChange3TimeF_2.bind(this,'from')} />
      -
      <Input style={{width:80}} value={this.state['bill-exception-03'].time[0].to}   onChange={this._onChange3TimeF_2.bind(this,'to')} />
      以及
      <Input style={{width:80}} value={this.state['bill-exception-03'].time[1].from} onChange={this._onChange3TimeT_2.bind(this,'from')} />
      -
      <Input style={{width:80}} value={this.state['bill-exception-03'].time[1].to}   onChange={this._onChange3TimeT_2.bind(this,'to')} />
      时间范围内，营业额同比下降
      <InputNumber value={this.state['bill-exception-03'].downRate} onChange={this._onChange3_2.bind(this,'downRate')} />%或上升
      <InputNumber value={this.state['bill-exception-03'].upRate} onChange={this._onChange3_2.bind(this,'upRate')} />%触发报警。
    </div>);
  }


  _setParams4 = () => {
    //let html = "单笔账单金额大于单均额10倍，触发报警";
    return (<div>
      单笔账单金额大于单均额 <InputNumber value={this.state['bill-exception-4']} onChange={this._onChange4.bind(this)} /> 倍，触发报警
    </div>);
  }

  _setParams5 = () => {
    //let html = "当商户在营业范围内净销售额同比上升200%或者下降70%，触发报警";
    return (<div>
      当商户在营业范围内净销售额同比下降
      <InputNumber value={this.state['bill-exception-5'].downRate} onChange={this._onChange5.bind(this,'downRate')} />% 或者上升
      <InputNumber value={this.state['bill-exception-5'].upRate} onChange={this._onChange5.bind(this,'upRate')} />%，触发报警
    </div>);
  }

  _setParams6 = () => {
    //let html = "'单笔账单金额为' + record.param2.from + '-' + record.param2.to + '时触发警情'";
    return (<div>
      当设备在营业时间范围内采集的账单文件不连续时，触发警情
    </div>);
  }

  _setParams7 = () => {
    //let html = "'单笔账单金额为' + record.param2.from + '-' + record.param2.to + '时触发警情'";
    return (<div>
      当设备在营业时间范围内采集不到账单类型文件时，触发警情
    </div>);
  }

  _setParams8 = () => {
    //let html = "'单笔账单金额为' + record.param2.from + '-' + record.param2.to + '时触发警情'";
    return (<div>
      当设备在营业时间范围内采集到账单类型文件，却没有账单入库时触发警情
    </div>);
  }

  _setParams9 = () => {
    //let html = "'单笔账单金额为' + record.param2.from + '-' + record.param2.to + '时触发警情'";
    return (<div>
      当检测到商户收银系统版本变化触发报警
    </div>);
  }

  _setParams10 = () => {
    //let html = "当设备在监控时间范围内，出现大于等于3次小于1小时的断开情况时触发警情";
    return (<div>
      当设备在监控时间范围内某次断开的时长大于<InputNumber value={this.state['device-exception-1']} onChange={this._onChange10.bind(this)} />分钟后会触发报警。
    </div>);
  }

  _setParams11 = () => {
    //let html = "当设备在监控时间范围内，出现大于等于3次小于1小时的断开情况时触发警情";
    return (<div>
      当设备在监控时间范围内，出现大于等于
      <InputNumber value={this.state['device-exception-2'].disconnectNum} onChange={this._onChange11.bind(this,'disconnectNum')} />次小于
      <InputNumber value={this.state['device-exception-2'].time} onChange={this._onChange11.bind(this,'time')} />分钟的断开情况时触发警情。
    </div>);
  }

  _setParams12 = () => {
    //let html = "当设备在监控时间范围内断开的总时长/营业时长>50%时触发警情";
    return (<div>
      当设备在监控时间范围内断开的总时长/营业时长 > <InputNumber style={{width:50}} value={this.state['device-exception-3']} onChange={this._onChange12.bind(this)} />%时触发警情。
    </div>);
  }

  _setParams13 = () => {
    //let html = "当设备在营业时间范围内断开时长大于45分钟，及时发送报警提醒";
    return (<div>
      当设备在营业时间范围内断开时长大于 <InputNumber style={{width:50}} value={this.state['device-exception-4']} min={30} max={1440} onChange={this._onChange13.bind(this)} /> 分钟，及时发送报警提醒(设备断开时长最小不能少于30分钟)。
    </div>);
  }

  _setParams13_2 = () => {
    //let html = "当设备在营业时间范围内断开时长大于45分钟，及时发送报警提醒";
    return (<div>
      当设备在营业时间范围内断开时长大于 <InputNumber style={{width:50}} value={this.state['device-exception-04']} min={30} max={1440} onChange={this._onChange13_2.bind(this)} /> 分钟，及时发送报警提醒(设备断开时长最小不能少于30分钟)。
    </div>);
  }

  _setParams14 = () => {
    //let html = "'单笔账单金额为' + record.param2.from + '-' + record.param2.to + '时触发警情'";
    return (<div>
      当硬件设备在监控时间范围内断电时实时报警
    </div>);
  }
  _setParams14_2 = () => {
    //let html = "'单笔账单金额为' + record.param2.from + '-' + record.param2.to + '时触发警情'";
    return (<div>
      当硬件设备在监控时间范围内断电时实时报警
    </div>);
  }



  _setParams15 = () => {
    //let html = "当订单与结账单匹配率低于80%或者高于120%触发警情";
    return (<div>
      当订单与结账单匹配率低于
      <InputNumber value={this.state['order-exception-1'].downRate} onChange={this._onChange15.bind(this,'downRate')} />%或者高于
      <InputNumber value={this.state['order-exception-1'].upRate} onChange={this._onChange15.bind(this,'upRate')} />%触发警情。
    </div>);
  }

  _viewRenderParamsData = () => {
    let ruleParamsEdit = this.props.ruleParamsEdit;
    let params = '';
    if(ruleParamsEdit.ruleId == 'bill-exception-1'){
      params = this.state['bill-exception-1'];
    }else if(ruleParamsEdit.ruleId == 'bill-exception-2'){
      params = this.state['bill-exception-2'];
    }else if(ruleParamsEdit.ruleId == 'bill-exception-3'){
      //downRate和upRate
      let item = this.state['bill-exception-3'];
      params = Object.assign({}, item, {'downRate': item.downRate.toString(), 'upRate': item.upRate.toString()});
    }else if(ruleParamsEdit.ruleId == 'bill-exception-03'){
      //downRate和upRate
      let item = this.state['bill-exception-03'];
      params = Object.assign({}, item, {'downRate': item.downRate.toString(), 'upRate': item.upRate.toString()});
    }else if(ruleParamsEdit.ruleId == 'bill-exception-4'){
      params = this.state['bill-exception-4'];
    }else if(ruleParamsEdit.ruleId == 'bill-exception-5'){
      let item = this.state['bill-exception-5'];
      params = Object.assign({}, item, {'downRate': item.downRate.toString(), 'upRate': item.upRate.toString()});
    }else if(ruleParamsEdit.ruleId == 'data-exception-1'){
      params = this.state['data-exception-1'];
    }else if(ruleParamsEdit.ruleId == 'data-exception-2'){
      params = this.state['data-exception-2'];
    }else if(ruleParamsEdit.ruleId == 'data-exception-3'){
      params = this.state['data-exception-3'];
    }else if(ruleParamsEdit.ruleId == 'data-exception-4'){
      params = this.state['data-exception-4'];
    }else if(ruleParamsEdit.ruleId == 'device-exception-1'){
      params = this.state['device-exception-1'];
    }else if(ruleParamsEdit.ruleId == 'device-exception-2'){
      params = this.state['device-exception-2'];
    }else if(ruleParamsEdit.ruleId == 'device-exception-3'){
      params = this.state['device-exception-3'];
    }else if(ruleParamsEdit.ruleId == 'device-exception-4'){
      params = this.state['device-exception-4'];
    }else if(ruleParamsEdit.ruleId == 'device-exception-04'){
      params = this.state['device-exception-04'];
    }else if(ruleParamsEdit.ruleId == 'device-exception-5'){
      params = this.state['device-exception-5'];
    }else if(ruleParamsEdit.ruleId == 'device-exception-05'){
      params = this.state['device-exception-05'];
    }else if(ruleParamsEdit.ruleId == 'order-exception-1'){
      let item = this.state['order-exception-1'];
      params = Object.assign({}, item, {'downRate': item.downRate.toString(), 'upRate': item.upRate.toString()});
    }

    return params;
  }

  _viewRenderParams = () => {
    let ruleParamsEdit = this.props.ruleParamsEdit;
    let htmlJsx = '';
    if(ruleParamsEdit.ruleId == 'bill-exception-1'){
      htmlJsx = this._setParams1();
    }else if(ruleParamsEdit.ruleId == 'bill-exception-2'){
      htmlJsx = this._setParams2();
    }else if(ruleParamsEdit.ruleId == 'bill-exception-3'){
      htmlJsx = this._setParams3();
    }else if(ruleParamsEdit.ruleId == 'bill-exception-03'){
      htmlJsx = this._setParams3_2();
    }else if(ruleParamsEdit.ruleId == 'bill-exception-4'){
      htmlJsx = this._setParams4();
    }else if(ruleParamsEdit.ruleId == 'bill-exception-5'){
      htmlJsx = this._setParams5();
    }else if(ruleParamsEdit.ruleId == 'data-exception-1'){
      htmlJsx = this._setParams6();
    }else if(ruleParamsEdit.ruleId == 'data-exception-2'){
      htmlJsx = this._setParams7();
    }else if(ruleParamsEdit.ruleId == 'data-exception-3'){
      htmlJsx = this._setParams8();
    }else if(ruleParamsEdit.ruleId == 'data-exception-4'){
      htmlJsx = this._setParams9();
    }else if(ruleParamsEdit.ruleId == 'device-exception-1'){
      htmlJsx = this._setParams10();
    }else if(ruleParamsEdit.ruleId == 'device-exception-2'){
      htmlJsx = this._setParams11();
    }else if(ruleParamsEdit.ruleId == 'device-exception-3'){
      htmlJsx = this._setParams12();
    }else if(ruleParamsEdit.ruleId == 'device-exception-4'){
      htmlJsx = this._setParams13();
    }else if(ruleParamsEdit.ruleId == 'device-exception-04'){
      htmlJsx = this._setParams13_2();
    }else if(ruleParamsEdit.ruleId == 'device-exception-5'){
      htmlJsx = this._setParams14();
    }else if(ruleParamsEdit.ruleId == 'device-exception-05'){
      htmlJsx = this._setParams14_2();
    }else if(ruleParamsEdit.ruleId == 'order-exception-1'){
      htmlJsx = this._setParams15();
    }

    return htmlJsx;
  }

  componentWillReceiveProps(nextProps){
    let item = this.state;
    let tmpObj = {};
    let index = nextProps.ruleParamsEdit.ruleId;
    if(this.props.ruleParamsEdit != nextProps.ruleParamsEdit && index){
      tmpObj[index] = nextProps.ruleParamsEdit.param;
      let state = Object.assign({}, item, tmpObj);
      this.setState(state);
    }
  }

  render() {
    const htmlJsx = this._viewRenderParams();
    return (
      <Modal
        width="800"
        title="报警设置"
        visible={this.props.defaultVisibleParams}
        onOk={this._hideModalRuleParamOk}
        onCancel={this._hideModalRuleParamCancel}
        okText="确认"
        cancelText="取消"
      >
        {htmlJsx}
      </Modal>
    );
  }
}

export default DefaultRuleParams;
