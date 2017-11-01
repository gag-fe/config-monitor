import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import TableList from './tableList';
import AddFromAction from './addFromAction';
import EditFromAction from './editFromAction';
import SearchBar from './components/searchBar';
import AddOrganization from './components/addOrganization';
import AddUserMail from './components/addUserMail';
import EditOrganization from './components/editOrganization';
import EditUserMail from './components/editUserMail';

import * as RuleListActions from '../../actions/rule.js';
import './index.css';

class RuleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      addVisible: false,
      editVisible: false,
      pageIndex: 1,
      ediRuleList: {},
      ruleListData: {
        pageSize:10,
        pageIndex:1,
        total:0,
        rows:[]
      }
    };
  }
  componentDidMount(){
    let resetData = {
      pageSize: 20,
      pageIndex: 1,
      total: 10,
      createBy: '',//设置账号
      endDate:'',
      startDate:'',
      monitorTargets:[],//监控对象
      receivers: '',//发送对象
      triggerType: ''//报警方式
    };
    this.props.setRuleSeachParams(resetData);//重置搜索
    this.props.getRuleList();
  }
  render() {
    return (<div className="content-page">
      <Row>
        <Col>
          <div className="wrapper-box util-clearfix">
            <SearchBar {...this.props}></SearchBar>
          </div>
        </Col>
      </Row>

      <Row>
				<Col>
          <div className="wrapper-box util-clearfix">
          <TableList {...this.props}/>
          </div>

          <div>
            <AddFromAction {...this.props}/>
            <AddOrganization {...this.props}></AddOrganization>
            <AddUserMail {...this.props}></AddUserMail>
          </div>

          <div>
            <EditFromAction {...this.props}/>
            <EditOrganization {...this.props}/>
            <EditUserMail {...this.props}/>
          </div>
          </Col>
			</Row>

		</div>);
  }
};

function mapStateToProps(state, props) {
  return {
    loading: state.rule.loading,
    addVisible: state.rule.addVisible,
    editVisible: state.rule.editVisible,
    targetVisible: state.rule.targetVisible,
    receiverVisible: state.rule.receiverVisible,
    targetVisibleEdit: state.rule.targetVisibleEdit,
    receiverVisibleEdit: state.rule.receiverVisibleEdit,
    addVisibleAddMailButton: state.rule.addVisibleAddMailButton,
    editor: state.rule.editor,
    add: state.rule.add,
    rows: state.rule.rows,
    seachParams: state.rule.seachParams,
    monitorTargetsList: state.rule.monitorTargetsList,
    monitorTargets: state.rule.monitorTargets,//报警对象列表
    monitorTargetType: state.rule.monitorTargetType,//监测范围类型
    receivers: state.rule.receivers,//发送对象列表
    ruleLists: state.rule.ruleLists, //报警类型列表
    selectedRowKeys: state.rule.selectedRowKeys, //报警类型默认选中
    organizations: state.rule.organizations,// 机构
    shopGroups: state.rule.shopGroups, //商户分组
    receiversList: state.rule.receiversList,
    actionEditButtonState: state.rule.actionEditButtonState,
    actionAddButtonState: state.rule.actionAddButtonState,
    current: state.rule.current//当前step
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(RuleListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleList);
