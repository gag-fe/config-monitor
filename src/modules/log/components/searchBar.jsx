import React from 'react';
import Form from '@gag/form-web';
import Input from '@gag/input-web';
import Button from '@gag/button-web';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import DatePicker from '@gag/date-picker-web';
const {RangePicker} = DatePicker;
const FormItem = Form.Item;

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'all',
      receivers: '',
      ruleList: '',
      endDate: '',
      startDate: '',
      timeOut: '',
      endOpen: false
    };
  }

  _onChange = (event) => {
    this.setState({
      receivers: event.target.value
    });
  }

  _resetSearch = () => {
    let initData = {
      type: 'all',
      receivers: '',
      ruleList: '',
      endDate: '',
      startDate: '',
      pageIndex: 1
    };
    this.setState({
      type: 'all',
      receivers: '',
      ruleList: '',
      endDate: '',
      startDate: '',
      pageIndex: 1
    });

    this.props.updateSearchParams(initData);
  }

  _clickSearch = () => {
    let item = this.state;
    this.props.updateSearchParams(item);
    this.props.getLogList();
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

  _disabledStartDate = (startValue) => {
    const endValue = this.state.endDate;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  _handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({endOpen: true});
    }
  }

  _disabledEndDate = (endValue) => {
    const startValue = this.state.startDate;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  _handleEndOpenChange = (open) => {
    this.setState({endOpen: open});
  }

  render() {

    return (<div>
      <Form horizontal>
        <Row gutter={0} span={24}>

          <Col span={8}>
            <FormItem
              label="发送对象: "
              labelCol={{span: 7}}
              wrapperCol={{span: 15}}
            >
              <Input placeholder="输入邮箱/手机号" value={this.state.receivers}
                     name="receivers"
                     onChange={this._onChange}/>
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem
              label="时间: "
              labelCol={{span: 4}}
              wrapperCol={{span: 20}}
            >
              <DatePicker
                disabledDate={this._disabledStartDate}
                onOpenChange={this._handleStartOpenChange}
                showTime={false}
                format="YYYY-MM-DD"
                value={this.state.startDate}
                placeholder="开始时间"
                onChange={this._onStartChange}
              />
              <span style={{paddingRight: '10px', paddingLeft: '10px'}}>至</span>
              <DatePicker
                disabledDate={this._disabledEndDate}
                onOpenChange={this._handleEndOpenChange}
                showTime={false}
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
            <Button type="primary" icon="search" onClick={this._clickSearch}>搜索</Button>
            <span style={{paddingRight: '10px', paddingLeft: '10px'}}></span>
            <Button onClick={this._resetSearch}>重置</Button>
          </Col>
        </Row>
      </Form>
    </div>);
  }
}
;
export default SearchBar;
