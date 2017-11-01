import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import RuleList from './components/ruleList';
import RuleParams from './components/ruleParams';
import DefaultRuleList from './components/defaultRuleList';
import TableList from './components/tableList';
import SearchBar from './components/searchBar';
import DefaultRuleParams from './components/defaultRuleParams';
import RuleConfig from './components/ruleConfig';
import * as ConfigActions from '../../actions/config.js';

class ConfigList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 20,
      pageIndex: 1,
      total: 20,
      format: '',
      ruleStatus: 'all',
      shopEntityName: '',
      shopId:'',
      shopName: '',
      storey: '',
      updateAtFrom: '',
      updateAtTo:'',
      updateBy: ''
    };
  }

  componentDidMount(){
    let resetData = {
      pageSize: 20,
      pageIndex: 1,
      total: 20,
      format: '',
      ruleStatus: 'all',
      shopEntityName: '',
      shopId:'',
      shopName: '',
      storey: '',
      updateAtFrom: '',
      updateAtTo:'',
      updateBy: ''
    };

    this.props.setConfigSeachParams(resetData);
    this.props.getConfigList();
  }

  render() {
    const props = this.props;
    return (<div className="content-page">
			<Row>
				<Col>
          <div className="wrapper-box util-clearfix">
            <SearchBar {...props}></SearchBar>
          </div>
				</Col>
			</Row>
			<Row>
				<Col>
          <div className="wrapper-box util-clearfix">
            <TableList {...props}/>
          </div>
          <div>
              <RuleList {...props}></RuleList>
              <DefaultRuleList {...props}></DefaultRuleList>
              <RuleParams {...props}></RuleParams>
              <DefaultRuleParams {...props}></DefaultRuleParams>
              <RuleConfig {...props}></RuleConfig>
          </div>
        </Col>
			</Row>
		</div>);
  }
};
ConfigList.defaultProps = {
  loading: false,
  visible: false,
  visibleParams: false,
  rows: [],
  editor: {
    ruleParams: []
  },
  editorAll:{
      ruleParams: []
  },
  seachParams: {
    pageSize: 20,
    pageIndex: 1,
    total: 50,
    format: '',
    ruleStatus: 'all',
    shopEntityName: '',
    shopId:'',
    shopName: '',
    storey: '',
    updateAtFrom: '',
    updateAtTo:'',
    updateBy: ''
  },
  shopEntityId: '',
  defaultRuleIds: [],
  defaultRuleParams: [],
  defaultVisible: false,
  defaultMonitoring: false,
  ruleConfigVisible: false, // "规则设置"弹窗是否可见
  ruleConfig: {// "规则设置"
    serialContinuity: false, // 商户流水号是否稽核
  },
};
ConfigList.propTypes = {
  action: PropTypes.string,
  loading: PropTypes.bool,
  receivers: PropTypes.string,
  endDate: PropTypes.string,
  startDate: PropTypes.string,
  pageSize: PropTypes.number,
  pageIndex: PropTypes.number,
  total: PropTypes.number,
  visible: PropTypes.bool
};

function mapStateToProps(state, props) {
  return {
    ruleParamsEdit: state.config.ruleParamsEdit,
    ruleIds: state.config.ruleIds,
    shopEntityId: state.config.shopEntityId,
    batchButtonDisabled: state.config.batchButtonDisabled,
    defaultRuleParamsEdit: state.config.defaultRuleParamsEdit,
    loading: state.config.loading,
    visible: state.config.visible,
    visibleParams: state.config.visibleParams,
    rows: state.config.rows,
    editor: state.config.editor,
    editorAll:state.config.editorAll,
    seachParams: state.config.seachParams,
    org: state.org,
    defaultRuleIds: state.config.defaultRuleIds,
    defaultRuleParams: state.config.defaultRuleParams,
    defaultVisible: state.config.defaultVisible,
    defaultMonitoring: state.config.defaultMonitoring,
    defaultVisibleParams: state.config.defaultVisibleParams,
    ruleConfigVisible: state.config.ruleConfigVisible,
    ruleConfig: state.config.ruleConfig,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConfigActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);
