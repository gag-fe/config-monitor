import React from 'react';
import PropTypes from 'prop-types';
import Table from '@gag/table-web';
import Button from '@gag/button-web';
import Modal from '@gag/modal-web';
const confirm = Modal.confirm;
class RuleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopId:'',
      ruleParams: [],
      shopEntityId: '',
      visible: false,
      monitoring: false,
      ruleIds: props.editor.ruleIds ||  [],
    };
  }

  _columns() {
    return [{
      title: '序号',
      dataIndex: 'serialNo',
      key: 'serialNo'
    },{
      title: '预案名称',
      dataIndex: 'name',
      width: '20%',
      key: 'name'
    }, {
      title: '报警类型',
      dataIndex: 'classify',
      key: 'classify'
    }, {
      title: '报警频率',
      dataIndex: 'triggerType',
      key: 'triggerType'
    }, {
      title: '备注',
      //dataIndex: 'remark',
      width: '30%',
      key: 'remark',
      render:(text, record) => {
        let textHtml = '';
        //var record = Object.assign({}, record, {param2: JSON.parse(record.param)});
        if(record.ruleId == 'bill-exception-1' && record.param){
          //单笔账单金额为空时触发警情
          textHtml = '单笔账单金额为' + record.param.from + '-' + record.param.to + '时触发警情';
        }else if(record.ruleId == 'bill-exception-2'){
          //销售日期大于截获日期（今天打印了明天以后的单子），触发警情
          textHtml = '销售日期大于截获日期（今天打印了明天以后的单子），触发警情';
        }else if(record.ruleId == 'bill-exception-3' && record.param && record.param.time.length == 2){
          //在11:00-14:00以及18:00-21:00时间范围内，营业额同比下降70%或上升200%触发报警
          textHtml = '在'+ record.param.time[0].from + '-' + record.param.time[0].to + '以及'+ record.param.time[1].from + '-' + record.param.time[1].to +'时间范围内，营业额同比下降'+ record.param.downRate +'%或上升'+ record.param.upRate +'%触发报警';
        }else if(record.ruleId == 'bill-exception-03' && record.param && record.param.time.length == 2){
          //在11:00-14:00以及18:00-21:00时间范围内，营业额同比下降70%或上升200%触发报警
          textHtml = '在'+ record.param.time[0].from + '-' + record.param.time[0].to + '以及'+ record.param.time[1].from + '-' + record.param.time[1].to +'时间范围内，营业额同比下降'+ record.param.downRate +'%或上升'+ record.param.upRate +'%触发报警';
        }else if(record.ruleId == 'bill-exception-4'){
          //单笔账单金额大于单均额10倍，触发报警
          textHtml = '单笔账单金额大于单均额'+ record.param +'倍，触发报警';
        }else if(record.ruleId == 'bill-exception-5' && record.param){
          //当商户在营业范围内净销售额同比上升200%或者下降70%，触发报警
          textHtml = '当商户在营业范围内净销售额同比下降'+record.param.downRate+'%或者上升'+record.param.upRate +'%，触发报警';
        }else if(record.ruleId == 'data-exception-1'){
          //当设备在营业时间范围内采集的账单文件不连续时，触发警情
          textHtml = '当设备在营业时间范围内采集的账单文件不连续时，触发警情';
        }else if(record.ruleId == 'data-exception-2'){
          //当设备在营业时间范围内采集不到账单类型文件时，触发警情
          textHtml = '当设备在营业时间范围内采集不到账单类型文件时，触发警情';
        }else if(record.ruleId == 'data-exception-3'){
          //当设备在营业时间范围内采集到账单类型文件，却没有账单入库时触发警情
          textHtml = '当设备在营业时间范围内采集到账单类型文件，却没有账单入库时触发警情';
        }else if(record.ruleId == 'data-exception-4'){
          //当检测到商户收银系统版本变化触发报警
          textHtml = '当检测到商户收银系统版本变化触发报警';
        }else if(record.ruleId == 'device-exception-1'){
          //当设备在监控时间范围内某次断开的时长大于一小时后会触发报警
          textHtml = '当设备在监控时间范围内某次断开的时长大于'+record.param+'分钟后会触发报警';
        }else if(record.ruleId == 'device-exception-2' && record.param){
          //当设备在监控时间范围内，出现大于等于3次小于1小时的断开情况时触发警情
          textHtml = '当设备在监控时间范围内，出现大于等于'+record.param.disconnectNum+'次小于'+record.param.time+'分钟的断开情况时触发警情';
        }else if(record.ruleId == 'device-exception-3'){
          //当设备在监控时间范围内断开的总时长/营业时长>50%时触发警情
          textHtml = '当设备在监控时间范围内断开的总时长/营业时长>'+ record.param +'%时触发警情';
        }else if(record.ruleId == 'device-exception-4'){
          //当设备在监控时间范围内断开时长大于45分钟，实时发送报警提醒
          textHtml = '当设备在营业时间范围内断开时长大于'+ record.param +'分钟，及时发送报警提醒';
        }else if(record.ruleId == 'device-exception-5'){
          //当硬件设备在监控时间范围内断电时实时报警
          textHtml = '当硬件设备在监控时间范围内断电时实时报警';
        }else if(record.ruleId == 'device-exception-04'){
          //当设备在监控时间范围内断开时长大于45分钟，实时发送报警提醒
          textHtml = '当设备在营业时间范围内断开时长大于'+ record.param +'分钟，及时发送报警提醒';
        }else if(record.ruleId == 'device-exception-05'){
          //当硬件设备在监控时间范围内断电时实时报警
          textHtml = '当硬件设备在监控时间范围内断电时实时报警';
        }else if(record.ruleId == 'order-exception-1' && record.param){
          //当订单与结账单匹配率低于80%或者高于120%触发警情
          textHtml = '当订单与结账单匹配率低于'+ record.param.downRate +'%或者高于'+ record.param.upRate +'%触发警情';
        }else {
          textHtml = record.remark;
        }

        return (<p>{textHtml}</p>);
      }
    },{
      title: '操作',
      render:(text, record) => {
        if(record.param){
          return (
            <Button disabled={!record.editable} size="small" onClick={this._editRuleParam.bind(this, record)}>编辑</Button>
          );
        }else {
          return '';
        }
      }
    }];
  }

  _editRuleParam = (data) => {
    this.props.updateRuleParamsEdit(data);
    this.props.setConfigVisibleParams(true);
  }

  _hideModalRuleParamCancel = () => {
    this.setState({
      visible: false
    });
    this.props.setConfigVisibleFalse();
  }

  _hideModalRuleParamOk = () => {
      this.props.setConfigList();
      this.props.setConfigVisibleFalse(false);
  }
  //规则为空时警告
  showConfirm = () => {
    var slef = this;
    confirm({
      title: '警告',
      content: '请至少选择其中某一个报警类型，否则该报警策略不能生效!',
      onOk() {
        slef.props.setConfigList();
        slef.props.setConfigVisibleFalse(false);
      }
    });
  }
  _onRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      ruleIds: selectedRowKeys
    });
    this.props.setConfigRuleIds(selectedRowKeys);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.editor && this.props.editor != nextProps.editor){
      this.setState({
        shopId: nextProps.editor.shopId,
        ruleParams: nextProps.editor.ruleParams,
        shopEntityId: nextProps.editor.shopEntityId,
        monitoring: nextProps.editor.monitoring,
        ruleIds: nextProps.editor && nextProps.editor.ruleIds && nextProps.editor.ruleIds.indexOf(',') != -1 ? nextProps.editor.ruleIds.split(',') : []
      });
    }
  }

  render(){
    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys: this.props.editor.ruleIds,
      onChange: this._onRowSelectChange,
    };

    return (
      <Modal
          width="1000"
          title="报警设置"
          visible={this.props.visible}
          onOk={this._hideModalRuleParamOk}
          onCancel={this._hideModalRuleParamCancel}
          okText="确认"
          cancelText="取消"
          maskClosable={false}
        >
        <Table rowSelection={rowSelection} columns={this._columns()} dataSource={this.props.editor.ruleParams ||  []} pagination={false} loading={this.props.loading}/>
      </Modal>
    );
  }
};

RuleList.defaultProps = {
  visible: false,
  ruleParams:[],
  selectedRowKeys:[],
  shopEntityId:'',
  monitoring:'',
  editor:{}
};

RuleList.propTypes = {
  visible: PropTypes.bool,
  ruleParams: PropTypes.array,
  selectedRowKeys: PropTypes.array,
  shopEntityId: PropTypes.string,
  monitoring: PropTypes.string
};

export default RuleList;
