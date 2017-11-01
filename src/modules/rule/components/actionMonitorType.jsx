import React from 'react';
import Form from '@gag/form-web';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class ActionMonitorType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: this.props.selectItem || [],
      plainOptions: this.props.itemType || [],
      indeterminate: true,
      checkAll: false,
    };
  }

  _onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.state.plainOptions.length),
      checkAll: checkedList.length === this.state.plainOptions.length,
    });
    this.props.callback(checkedList);
  }

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.state.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
    if (e.target.checked) {
      this.props.callback(this.state.plainOptions);
    } else {
      this.props.callback([]);
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={20}>

            <Checkbox
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
            >
              {this.props.checkboxGroupTitle}
            </Checkbox>
            <CheckboxGroup options={this.state.plainOptions} value={this.state.checkedList} onChange={this.onChange}/>
          </Col>
        </Row>

      </div>
    );
  }
}
export default ActionMonitorType;
