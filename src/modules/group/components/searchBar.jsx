import React from 'react';
import Form from '@gag/form-web';
import Input from '@gag/input-web';
import Button from '@gag/button-web';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import DatePicker from '@gag/date-picker-web';
import OrganizationTree from '../../components/organizationTree';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class SearchBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        format:'',
        shopId: '',
        groupName:'',
        updateAtTo: '',
        updateAtFrom: '',
        shopName: '',
        endOpen: false,
        pageIndex: 1,
        total: 0
      };
    }
    _resetSearch = () => {
      let item = {
        format:'',
        shopId: '',
        groupName:'',
        updateBy: '',
        updateAtTo: '',
        updateAtFrom: '',
        shopName:'',
        pageIndex: 1,
        total: 0
      };
      this.setState({
        format:'',
        shopId: '',
        groupName:'',
        updateBy: '',
        updateAtTo: '',
        updateAtFrom: '',
        shopName:'',
        pageIndex: 1,
        total: 0
      });

      this.props.updataSeachParams(item);
      //this.props.deleteRowsShop();
    }

    _clickSearch = () => {
      let item = this.state;
      this.props.updataSeachParams(item);
      this.props.getShopEntityGroup();
      this.props.deleteRowsShop();
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
    //商户名称
    _onChangeGroupName = (event) => {
      this.setState({
        groupName: event.target.value
      });
    }
    //	设置账户
    _onChangeUpdateBy = (event) => {
      this.setState({
        updateBy: event.target.value
      });
    }
    //机构回调
    _orgSelectInfo = (param) => {
      this.setState({
        shopId: param.shopId || '',
        shopName: param.shopName || '',
      });
      this.props.updateOrgInfoAllSeachParams(param);
    }


    render() {
      const propsOrg = {
        shopId: this.state.shopId,
        shopName: this.state.shopName,
      };
      return (<div>
  		<Form horizontal>
        <Row gutter={0} span={24}>
          <Col span={12}>
              <OrganizationTree {...propsOrg} calbackSelect={this._orgSelectInfo.bind(this)}></OrganizationTree>
          </Col>
          <Col span={12}>
            <FormItem
              label="分组名称: "
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              >
              <Input placeholder="分组名称" value={this.state.groupName}
              name="groupName"
              onChange={this._onChangeGroupName}
            />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={0} span={24}>
          <Col span={12}>
        		<FormItem
              label="操作账户: "
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
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
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
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
