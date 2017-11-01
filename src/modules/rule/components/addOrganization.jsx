import React from 'react';
import Alert from '@gag/alert-web';
import Table from '@gag/table-web';
import Form from '@gag/form-web';
import Input from '@gag/input-web';
import Button from '@gag/button-web';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import Select from '@gag/select-web';
import Modal from '@gag/modal-web';
import Radio from '@gag/radio-web';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;

import Utils from '../../../utils/index';
const CommonUtils = Utils.common;

const plainOptions = [
  {label: '机构', value: 'O'},
  {label: '商户分组', value: 'E'},
];

class AddOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monitorTarget: [],
      monitorTargetType: 'O',
      modalVisible: false,
      modalVisibleNull: false
    };
  }

  _addMonitorTarget = () => {
    let isTip = false;
    let tempObj = {}
    let item = this.state.monitorTarget;
    if (item.key && item.key.length > 0) {
      tempObj['id'] = item.key;
      tempObj['name'] = item.label;

      this.props.monitorTargets.map((list) => {
        if (list.id == item.key) {
          isTip = true;
          return false;
        }
      });
      if (!isTip) {
        if(this.props.monitorTargets.length < 20){
          this.props.updateMonitorTargets(tempObj, 'add');
        }else {
          //alert("报警对象最多设置20个！");
          CommonUtils.modal('warning', '警告', '报警对象最多设置20个!');
        }

      } else {
        //alert("监控对象已存在，请确认后在添加！");
        CommonUtils.modal('warning', '警告', '监控对象已存在，请确认后在添加！');
      }
    } else {
      //alert("监控对象为空，请选择监控对象！");
      CommonUtils.modal('warning', '警告', '监控对象为空，请选择监控对象！');
    }
  }

  _modalHideModal = () => {
    this.setState({
      modalVisible: false,
      modalVisibleNull: false
    });
  }

  _delete = (data) => {
    this.props.deleMonitorTargets(data);
  }

  _columns = () => {
    return [
      {
        title: '监控对象',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '操作',
        render: (text, record) => {
          return (<Button onClick={this._delete.bind(this, record)} icon="close-circle">删除</Button>);
        }
      }
    ]
  }

  _selectMonitorTargetType = (e) => {
    this.setState({
      monitorTargetType: e.target.value,
      monitorTarget: []
    });
    this.props.updateMonitorTargetsType(e.target.value);
    this.props.updateMonitorTargets([], 'reset');
  }
  _selectMonitorTarget = (value) => {
    this.setState({
      monitorTarget: value
    });
  }

  _handleOk = () => {
    this.setState({
      monitorTarget: []
    });
    this.props.synMonitorTargets();
    this.props.setAadTargetVisible(false)
  }

  _handleCancel = () => {
    this.props.setAadTargetVisible(false);
    this.props.resetMonitorRuleData();
    this.setState({
      monitorTarget: []
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.monitorTargetType != nextProps.monitorTargetType){
      this.setState({
        monitorTargets: []
      })
    }
  }


  render() {
    let selectMonitorTargetOption = [];
    let monitorTargetData = this.props.organizations;
    if (this.props.monitorTargetType == 'O') {
      monitorTargetData = this.props.organizations;
    } else {
      monitorTargetData = this.props.shopGroups;
    }
    monitorTargetData.map((item, index) => {
      selectMonitorTargetOption.push(<Option key={item.id}>{item.name}</Option>);
    });
    return (
      <Modal title="新增监测对象" width="900" visible={this.props.targetVisible} onOk={this._handleOk}
             onCancel={this._handleCancel}>
        <Form horizontal>
          <Row>
            <Col span={16}>
              <FormItem
                label="监测范围:"
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
              >
                <RadioGroup options={plainOptions} onChange={this._selectMonitorTargetType}
                            value={this.props.monitorTargetType}/>

              </FormItem>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row>
            <Col span={16}>
              <FormItem
                label="监测对象:"
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
              >
                <Select
                  showSearch
                  labelInValue
                  style={{width: "100%"}}
                  optionFilterProp="children"
                  value={this.state.monitorTarget}
                  onChange={this._selectMonitorTarget}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {selectMonitorTargetOption}
                </Select>
              </FormItem>
            </Col>
            <Col span={8}>
              <Button type="primary" onClick={this._addMonitorTarget}>添加</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <Table columns={this._columns()} dataSource={this.props.monitorTargets} pagination={false}/>
              </div>
              <div>
                <Modal
                  width={350}
                  title="消息"
                  visible={this.state.modalVisible}
                  onOk={this._modalHideModal}
                  onCancel={this._modalHideModal}
                  okText="确认"
                  cancelText="取消"
                >
                  <p>监控对象已存在，请确认后在添加！</p>
                </Modal>
                <Modal
                  width={350}
                  title="消息"
                  visible={this.state.modalVisibleNull}
                  onOk={this._modalHideModal}
                  onCancel={this._modalHideModal}
                  okText="确认"
                  cancelText="取消"
                >
                  <p>监控对象为空，请选择监控对象！</p>
                </Modal>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default AddOrganization;
