import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import TableList from './components/tableList';
import SearchBar from './components/searchBar';
import * as LogActions from '../../actions/log.js';

class LogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'recordList',
      type: 'all',
      receivers: '',
      endDate: '',
      startDate: '',
      pageSize: 20,
      pageIndex: 1,
      total: 10
    };
  }

  componentDidMount(){
    let item = this.state;
    this.props.updateSearchParams(item);
    this.props.getLogList();
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
        </Col>
			</Row>
		</div>);
  }
};
LogList.defaultProps = {
    action: 'recordList',
    loading: false,
    pageSize: 20,
    pageIndex: 1,
    total: 50,
    recordList: [],
    endDate: '',
    startDate: '',
};
LogList.propTypes = {
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
    loading: state.log.loading,
    seachParams: state.log.seachParams,
    recordList: state.log.recordList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LogActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogList);
