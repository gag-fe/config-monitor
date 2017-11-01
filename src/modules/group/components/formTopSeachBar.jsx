import React from 'react';
import Form from '@gag/form-web';
import Input from '@gag/input-web';
import Button from '@gag/button-web';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import DatePicker from '@gag/date-picker-web';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class FormTopSeachBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        format:'',
        shopId: '',
        shopName:'',
        storey:'',
        shopEntityName:''
      };
    }
    _resetSearch = () => {
      let item = {
        format:'',
        shopName: this.props.editor.shopName || '',
        shopId: this.props.editor.shopId || '',
        shopEntityName:'',
        storey:''
      };
      this.setState({
        format:'',
        shopName: this.props.editor.shopName || '',
        shopId: this.props.editor.shopId || '',
        shopEntityName:'',
        storey:''
      });
      this.props.updateTopSeachParams(item);
      this.props.getShopList();
    }

    _clickSearch = () => {
      let item = this.state;

      this.setState({
        shopName: this.props.editor.shopName || '',
        shopId: this.props.editor.shopId || ''
      });

      item['shopName'] = this.props.editor.shopName;
      item['shopId'] = this.props.editor.shopId;

      this.props.updateTopSeachParams(item);
      this.props.getShopListEdit();
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

    componentWillReceiveProps(){

    }

    render() {

      return (<div>
  		<Form horizontal>
        <Row gutter={0} span={24}>
          <Col span={5}>
            <lable style={{verticalAlign:'top',display:'inline-block', lineHeight:'32px'}}>机构:</lable> <span title={this.props.editor.shopName} style={{width:'155px', height:'32px', lineHeight:'32px'}} className="line util-text-overflow-ellipsis">{this.props.editor.shopName}</span>
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
          <Col span={4}>
              <Button type="primary" icon="search" onClick={this._clickSearch} className="">搜索</Button>
            </Col>
        </Row>
  		</Form>
  		</div>);
    }
  };
export default FormTopSeachBar;
