import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import TableList from './components/tableList';
import SearchBar from './components/searchBar';
import FormAddGroup from './formAddGroup';
import FormEditGroup from './formEditGroup';
import FormAddShopEntity from './formAddShopEntity';
import * as GroupActions from '../../actions/group.js';
import './index.less';

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 20,
      pageIndex: 1,
      total: 0,
      format: '',
      ruleStatus: 'all',
      shopEntityName: '',
      shopId: this.props.topSeachParamsAdd.shopId || '',
      shopName: this.props.topSeachParamsAdd.shopName || '',
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
      total: 0,
      format: '',
      ruleStatus: 'all',
      shopEntityName: '',
      shopId: this.props.topSeachParamsAdd.shopId || '',
      shopName: this.props.topSeachParamsAdd.shopName || '',
      storey: '',
      updateAtFrom: '',
      updateAtTo:'',
      updateBy: ''
    };
    this.props.updataSeachParams(resetData);
    this.props.getShopEntityGroup();
    this.props.updateOrgInfoAllSeachParams(this.props.org);
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
            <FormEditGroup {...this.props}></FormEditGroup>
            <FormAddGroup {...this.props}></FormAddGroup>
            <FormAddShopEntity {...this.props}></FormAddShopEntity>
          </div>
        </Col>
			</Row>
		</div>);
  }
};

GroupList.defaultProps = {
  loading: false,
  visible: false,
  visibleParams: false,
  visibleShopEntity: false,
  rows: [],
  rowsShop: [],
  editor: {
    ruleParams: []
  },
  editorAll:{
      ruleParams: []
  },
  seachParams: {
    pageSize: 20,
    pageIndex: 1,
    total: 0,
    format: '',
    ruleStatus: 'all',
    shopEntityName: '',
    shopId:'',
    shopName: '',
    storey: '',
    updateAtFrom: '',
    updateAtTo:'',
    updateBy: ''
  }
};
GroupList.propTypes = {
  action: PropTypes.string,
  loading: PropTypes.bool,
  recordList: PropTypes.array,
  receivers: PropTypes.string,
  endDate: PropTypes.string,
  startDate: PropTypes.string,
  pageSize: PropTypes.number,
  pageIndex: PropTypes.number,
  total: PropTypes.number
};

function mapStateToProps(state, props) {
  return {
    loading: state.group.loading,
    visible: state.group.visible,
    visibleParams: state.group.visibleParams,
    visibleShopEntity: state.group.visibleShopEntity,
    rows: state.group.rows,
    editor: state.group.editor,
    editorAll:state.group.editorAll,
    seachParams: state.group.seachParams,
    topSeachParams: state.group.topSeachParams,
    rowsShop: state.group.rowsShop,
    visibleAddGroup: state.group.visibleAddGroup,
    topSeachParamsAdd: state.group.topSeachParamsAdd,
    rowsShopObj:  state.group.rowsShopObj,
    org: state.org
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GroupActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
