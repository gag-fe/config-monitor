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

class EditOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monitorTarget: [],
      monitorTargetType: props.editor.monitorTargetType,
      modalVisible: false,
    };
  }

  _editMonitorTarget = () => {

    let isTip = false;
    let tempObj = {};
    let item = this.state.monitorTarget;

    if (item.key && item.key.length > 0) {
      tempObj['id'] = item.key;
      tempObj['name'] = item.label;

      this.props.editor.monitorTargetArray.map((list) => {
        if (list.id == item.key) {
          isTip = true;
          return false;
        }
      });
      if (!isTip) {
        if(this.props.editor.monitorTargetArray.length < 20){
          this.props.editMonitorTargetArray(tempObj);
        }else {
          //alert("报警对象最多设置20个！");
          CommonUtils.modal('warning', '警告', '报警对象最多设置20个!');
        }

      } else {
        //alert("监控对象已存在，请确认后在添加！");
        CommonUtils.modal('warning', '警告', '监控对象已存在，请确认后在添加!');
      }
    } else {
      //alert("监控对象为空，请选择监控对象！");
      CommonUtils.modal('warning', '警告', '监控对象为空，请选择监控对象!');
    }
  }

  _modalHideModal = () => {
    this.setState({
      modalVisible: false
    });
  }

  _delete = (data) => {
    this.props.deleMonitorTargetType(data);
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
    this.props.updateMonitorTargetsType();
    this.props.updateMonitorTargets([], 'reset');
  }
  _selectMonitorTarget = (value) => {
    this.setState({
      monitorTarget: value
    });
  }

  _handleOk = () => {
    this.props.synMonitorTargets();
    this.props.setAadTargetVisibleEdit(false)
  }

  _handleCancel = () => {
    this.props.setAadTargetVisibleEdit(false)
  }

  _dataSource = (props) => {
    let viewData = [];
    if (props.editor.monitorTargetArray && props.editor.monitorTargetArray.length > 0) {
      props.editor.monitorTargetArray.map((item, idx) => {
        let temp = {};
        temp['serialNo'] = idx + 1;
        temp['name'] = item.name;
        viewData.push(temp);
      });
    }
    return viewData;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.editor != nextProps.editor){
      this.setState({
        monitorTargetType: nextProps.editor.monitorTargetType,
      });
    }
  }

  render() {
    let selectMonitorTargetOption = [];
    let monitorTargetData = this.props.organizations;
    if (this.state.monitorTargetType == 'O') {
      monitorTargetData = this.props.organizations;
    } else {
      monitorTargetData = this.props.shopGroups;
    }
    monitorTargetData.map((item, index) => {
      selectMonitorTargetOption.push(<Option key={item.id}>{item.name}</Option>);
    });
    return (
      <Modal title="编辑监测对象" width="900" visible={this.props.targetVisibleEdit} onOk={this._handleOk}
             onCancel={this._handleCancel}>
        <Form horizontal>
          <Row>
            <Col span={16}>
              <FormItem
                label="监测范围:"
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
              >
                <RadioGroup disabled={true} options={plainOptions} onChange={this._selectMonitorTargetType}
                            value={this.state.monitorTargetType}/>

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
              <Button type="primary" onClick={this._editMonitorTarget}>添加</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <Table columns={this._columns()} dataSource={this._dataSource(this.props)} pagination={false}/>
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
                  <p>监控对象有问题，请确认后在添加！</p>
                </Modal>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default EditOrganization;
