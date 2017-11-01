import React from 'react';
import Form from '@gag/form-web';
import Input from '@gag/input-web';
import Button from '@gag/button-web';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import Select from '@gag/select-web';
import DatePicker from '@gag/date-picker-web';
import OrganizationTree from '../../components/organizationTree';
import moment from 'moment';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shopName: '',
      shopId: '',
      format:'',
      ruleStatus:'all',//状态
      orgId: '',
      updateAtTo: '',
      updateAtFrom: '',
      updateBy:'',
      storey:'',
      shopEntityName: '',
      endOpen: false,
      pageIndex: 1
    };
  }
  //重置按钮
  _resetSearch = () => {
    let item = {
      format:'',
      ruleStatus:'all',
      shopId: '',
      shopName: '',
      updateAtTo: '',
      updateAtFrom: '',
      updateBy:'',
      storey:'',
      shopEntityName: '',
      pageIndex: 1
    };
    this.setState({
      format:'',
      ruleStatus:'all',
      shopId: '',
      shopName: '',
      updateAtTo: '',
      updateAtFrom: '',
      updateBy:'',
      storey:'',
      shopEntityName: '',
      pageIndex: 1
    });
    this.props.setConfigSeachParams(item);
    //this.props.getConfigList();
  }

  //检索
  _clickSearch = () => {
    let item = this.state;
    this.props.setConfigSeachParams(item);
    this.props.getConfigList();
    this.props.setBatchButtonDisabled();
  }

  _onStartChange = (value,value2) => {
    this.setState({
      updateAtFrom: value
    });
  }

  _onEndChange = (value,value2) => {
    this.setState({
      updateAtTo: value
    });
  }

  _disabledStartDate = (startValue) => {
    const endValue = this.state.updateAtTo;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  _handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  _disabledEndDate = (endValue) => {
    const startValue = this.state.updateAtFrom;
    if (!endValue || !startValue) {
      return false;
    }

    return endValue.valueOf() <= startValue.valueOf();
  }

  _handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  //业态
  _onChageFormatHandleChange = (event) => {
    this.setState({
      format: event.target.value
    });
  }
  //状态
  _selectStateHandleChange = (value) => {
    this.setState({
      ruleStatus: value
    });
  }
  //商户名称
  _onChangeShopEntitiyName = (event) => {
    this.setState({
      shopEntityName: event.target.value
    });
  }
  //楼层
  _onChangeStoreyHandleChange = (event) =>{
    this.setState({
      storey: event.target.value
    });
  }
  //	设置账户
  _onChangeUpdateBy = (event) => {
    this.setState({
      updateBy: event.target.value
    });
  }

  _orgSelectInfo = (param) => {
    this.setState({
      shopId: param.shopId || '',
      shopName: param.shopName || ''
    });
  }

  render() {
    const propsOrg = {
      shopId: this.state.shopId,
      shopName: this.state.shopName,
    };
    return (<div>
		<Form horizontal>
      <Row gutter={0} span={24}>
        <Col span={6}>
            <OrganizationTree {...propsOrg} calbackSelect={this._orgSelectInfo}></OrganizationTree>
        </Col>
        <Col span={6}>
          <FormItem
            label="商户名称: "
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 15 }}
            >
            <Input placeholder="商户名称" value={this.state.shopEntityName}
            name="shopEntityName"
            onChange={this._onChangeShopEntitiyName}
          />
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem
          label="业态: "
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
                  >
                <Input placeholder="业态" value={this.state.format}
                name="format"
                onChange={this._onChageFormatHandleChange}/>
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem
          label="楼层: "
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 15 }}
                  >
                <Input placeholder="楼层" value={this.state.storey}
                name="storey"
                onChange={this._onChangeStoreyHandleChange}
              />
          </FormItem>
        </Col>
      </Row>
      <Row gutter={0} span={24}>
        <Col span={6}>
          <FormItem
          label="状态: "
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
                  >
                <Select defaultValue="all" value={this.state.ruleStatus} onChange={this._selectStateHandleChange}>
                      <Option value="all">全部</Option>
                    <Option value="set">已设置</Option>
                  <Option value="default">默认</Option>
                </Select>
          </FormItem>
        </Col>
        <Col span={6}>
      		<FormItem
            label="操作账户: "
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 15 }}
          	>
          	<Input placeholder="操作账户" value={this.state.updateBy}
            name="updateBy"
            onChange={this._onChangeUpdateBy}
          />
      		</FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          label="时间: "
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          >
          <DatePicker
            disabledDate={this._disabledStartDate}
            onOpenChange={this._handleStartOpenChange}
            showTime={false}
            format="YYYY-MM-DD"
            value={this.state.updateAtFrom}
            placeholder="开始时间"
            onChange={this._onStartChange}
          />
        <span style={{paddingRight:'10px',paddingLeft:'10px'}}>至</span>
          <DatePicker
            disabledDate={this._disabledEndDate}
            onOpenChange={this._handleEndOpenChange}
            showTime={false}
            format="YYYY-MM-DD"
            value={this.state.updateAtTo}
            placeholder="结束时间"
            onChange={this._onEndChange}
          />
        </FormItem>
    </Col>

        </Row>
        <Row>
          <Col span={18}></Col>
        <Col span={6}>
            <Button type="primary" icon="search" onClick={this._clickSearch} className="">搜索</Button>
            <span style={{paddingRight:'10px',paddingLeft:'10px'}}></span>
            <Button onClick={this._resetSearch}>重置</Button>
          </Col>
        </Row>
				</Form>
		</div>);
  }
};
export default SearchBar;
