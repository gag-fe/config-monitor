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

class FormTopSeachBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        format:'',
        shopId: props.org ? props.org.shopId : '',
        shopName: props.org ? props.org.shopName : '',
        storey:'',
        shopEntityName:'',
        pageSize: 20,
        pageIndex: 1,
        total: 0
      };
    }
    _resetSearch = () => {
      let item = {
        format:'',
        shopName: '',
        shopId: '',
        shopEntityName:'',
        storey:'',
        pageIndex: 1,
        total: 0
      };
      this.setState({
        format:'',
        shopName: '',
        shopId: '',
        shopEntityName:'',
        storey:'',
        pageIndex: 1,
        total: 0
      });
      this.props.updateTopSeachParamsAdd(item);
      this.props.getShopList();
    }

    _clickSearch = () => {
      let item = this.state;
      this.props.updateTopSeachParamsAdd(item);
      this.props.getShopList();
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
    //商户名称
    _onChangeShopEntitiyName = (event) => {
      this.setState({
        shopEntityName: event.target.value
      });
    }
    //业态
    _onChageFormatHandleChange = (event) => {
      this.setState({
        format: event.target.value
      });
    }
    //楼层
    _onChangeStoreyHandleChange = (event) =>{
      this.setState({
        storey: event.target.value
      });
    }
    //机构
    _orgSelectInfo = (param) => {
      this.setState({
        shopId: param.shopId || '',
        shopName: param.shopName || '',
      });
      this.props.updateOrgInfoTopSeachParamsAdd(param);
    }

    componentWillReceiveProps(nextProps){
      if(this.props.topSeachParamsAdd != nextProps.topSeachParamsAdd){
        this.setState({
          shopId: nextProps.topSeachParamsAdd.shopId || '',
          shopName: nextProps.topSeachParamsAdd.shopName || ''
        });
      }
    }
    render() {
      return (<div>
  		<Form horizontal>
        <Row gutter={0} span={24}>
          <Col span={6}>
              <OrganizationTree {...this.props.org} calbackSelect={this._orgSelectInfo}></OrganizationTree>
          </Col>
          <Col span={5}>
            <FormItem
              label="商户: "
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 15 }}
              >
              <Input placeholder="商户名称" value={this.state.shopEntityName}
              name="shopEntityName"
              onChange={this._onChangeShopEntitiyName}
            />
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem
            label="业态: "
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 15 }}
                    >
                  <Input placeholder="业态" value={this.state.format}
                  name="format"
                  onChange={this._onChageFormatHandleChange}/>
            </FormItem>
          </Col>
          <Col span={5}>
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
          <Col span={3}>
              <Button type="primary" icon="search" onClick={this._clickSearch} className="">搜索</Button>
            </Col>
        </Row>
  		</Form>
  		</div>);
    }
  };
export default FormTopSeachBar;
