import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@gag/modal-web';
import Select from '@gag/select-web';
class RuleConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serialContinuity: props.ruleConfig.serialContinuity, // 是否稽核
    };
  }

  // 点击"保存"
  _hideModalRuleConfigOk = () => {
    this.props.setRuleConfigParams(this.state.serialContinuity);
    this.props.setRuleConfigVisibleFalse();
  }

  // 点击"取消"
  _hideModalRuleConfigCancel = () => {
    this.props.setRuleConfigVisibleFalse();
  }

  // 改变select选择器选择的值
  _selectStateHandleChange = (value) => {
    this.setState({
      serialContinuity: value
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.ruleConfig && this.props.ruleConfig != nextProps.ruleConfig){
      this.setState({
        serialContinuity: nextProps.ruleConfig.serialContinuity,
      });
    }
  }

  render() {
    return (
      <Modal
        width={1000}
        title="商户流水号规则"
        visible={this.props.ruleConfigVisible}
        onOk={this._hideModalRuleConfigOk}
        onCancel={this._hideModalRuleConfigCancel}
        okText="保存"
        cancelText="取消"
        maskClosable={false}
      >
        <span style={{ color: 'red' }}>*</span>商户流水号是否稽核：
        <Select style={{ width: 120 }} value={this.state.serialContinuity} onChange={this._selectStateHandleChange}>
          <Option value={true}>是</Option>
          <Option value={false}>否</Option>
        </Select>
      </Modal>
    );
  }
};

RuleConfig.defaultProps = {
  ruleConfigVisible: false,
  ruleConfig: {// "规则设置"
    serialContinuity: false, // 商户流水号是否稽核
  },
};

RuleConfig.propTypes = {
  ruleConfigVisible: PropTypes.bool,
};

export default RuleConfig;
