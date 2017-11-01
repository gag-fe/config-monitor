import React from 'react';
import Form from '@gag/form-web';
import Input from '@gag/input-web';
import Button from '@gag/button-web';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import Select from '@gag/select-web';
import DatePicker from '@gag/date-picker-web';
const FormItem = Form.Item;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 20,
      pageIndex: 1,
      total: 50,
      createBy: '',//设置账号
      endDate: '',
      startDate: '',
      monitorTargets: '',//监控对象
      receivers: '',//发送对象
      triggerType: '',//报警方式
      endOpen: false
    };
  }

  //重置按钮
  _resetSearch = () => {
    let item = {
      //pageSize: 20,
      pageIndex: 1,
      //total: 50,
      createBy: '',//设置账号
      endDate: '',
      startDate: '',
      monitorTargets: '',//监控对象
      receivers: '',//发送对象
      triggerType: ''//报警方式
    };
    this.setState({
      pageSize: 20,
      pageIndex: 1,
      total: 50,
      createBy: '',//设置账号
      endDate: '',
      startDate: '',
      monitorTargets: '',//监控对象
      receivers: '',//发送对象
      triggerType: ''//报警方式
    });
    this.props.setRuleSeachParams(item);
    //this.props.getRuleList();
  }

  //检索
  _clickSearch = () => {
    let item = {
      //pageSize: 20,
      pageIndex: 1,
      //total: 50,
      createBy: this.state.createBy,//设置账号
      endDate: this.state.endDate,
      startDate: this.state.startDate,
      monitorTargets: this.state.monitorTargets,//监控对象
      receivers: this.state.receivers,//发送对象
      triggerType: this.state.triggerType//报警方式
    };
    //let item = this.state;
    this.props.setRuleSeachParams(item);
    this.props.getRuleList();
  }

  _onStartChange = (value, value2) => {
    this.setState({
      startDate: value
    });
  }

  _onEndChange = (value, value2) => {
    this.setState({
      endDate: value
    });
  }

  _disabledStartDate = (startDate) => {
    const endDate = this.state.endDate;
    if (!startDate || !endDate) {
      return false;
    }
    return startDate.valueOf() > endDate.valueOf();
  }

  _handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({endOpen: true});
    }
  }

  _disabledEndDate = (endDate) => {
    const startDate = this.state.startDate;
    if (!endDate || !startDate) {
      return false;
    }

    return endDate.valueOf() <= startDate.valueOf();
  }

  _handleEndOpenChange = (open) => {
    this.setState({endOpen: open});
  }
  //设置账户
  _onChageFormatHandleChange = (event) => {
    this.setState({
      createBy: event.target.value
    });
  }
  //报警方式
  _selectTriggerType = (value) => {
    this.setState({
      triggerType: value
    });
  }
  //发送对象
  _onChangeReceivers = (event) => {
    this.setState({
      receivers: event.target.value
    });
  }
  //监控对象
  _onChangeMonitorTargets = (event) => {
    this.setState({
      monitorTargets: event.target.value
    });
  }
  //	设置账户
  _onChangeUpdateBy = (event) => {
    this.setState({
      updateBy: event.target.value
    });
  }

  render() {

    return (<div>
      <Form horizontal>
        <Row gutter={0} span={24}>
          <Col span={12}>
            <FormItem
              label="监控对象: "
              labelCol={{span: 4}}
              wrapperCol={{span: 20}}
            >
              <Input placeholder="监控对象" value={this.state.monitorTargets}
                     name="shopEntityName"
                     onChange={this._onChangeMonitorTargets}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="发送对象: "
              labelCol={{span: 4}}
              wrapperCol={{span: 20}}
            >
              <Input placeholder="发送对象" value={this.state.receivers}
                     name="shopEntityName"
                     onChange={this._onChangeReceivers}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={0} span={24}>
          <Col span={12}>
            <FormItem
              label="设置账户: "
              labelCol={{span: 4}}
              wrapperCol={{span: 20}}
            >
              <Input placeholder="设置账户" value={this.state.createBy}
                     name="format"
                     onChange={this._onChageFormatHandleChange}/>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="时间: "
              labelCol={{span: 4}}
              wrapperCol={{span: 20}}
            >
              <DatePicker
                showTime={false}
                disabledDate={this._disabledStartDate}
                onOpenChange={this._handleStartOpenChange}
                format="YYYY-MM-DD"
                value={this.state.startDate}
                placeholder="开始时间"
                onChange={this._onStartChange}
              />
              <span style={{paddingRight: '10px', paddingLeft: '10px'}}>至</span>
              <DatePicker
                showTime={false}
                disabledDate={this._disabledEndDate}
                onOpenChange={this._handleEndOpenChange}
                format="YYYY-MM-DD"
                value={this.state.endDate}
                placeholder="结束时间"
                onChange={this._onEndChange}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={16}></Col>
          <Col span={8}>
            <Button type="primary" icon="search" onClick={this._clickSearch} className="">搜索</Button>
            <span style={{paddingRight: '10px', paddingLeft: '10px'}}></span>
            <Button onClick={this._resetSearch}>重置</Button>
          </Col>
        </Row>
      </Form>
    </div>);
  }
};
export default SearchBar;
