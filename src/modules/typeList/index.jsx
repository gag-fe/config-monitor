import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Table from '@gag/table-web';
import Form from '@gag/form-web';
import Row from '@gag/row-web';
import Col from '@gag/col-web';
import TableList from './tableList';
import * as TypeListActions from '../../actions/typeList.js';

class TypeList extends React.Component {
  componentDidMount(){
    this.props.getTypeList();
  }

  render() {
    return (<div className="content-page wrapper-box util-clearfix">
			<Row>
				<Col>

				</Col>
			</Row>
			<Row>
        <Col>
            <TableList loading={this.props.typeList.loading || false} typeList={this.props.typeList.rows} />
          </Col>
			</Row>
		</div>);
  }
};

function mapStateToProps(state, props) {
  return {
    typeList: state.typeList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TypeListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeList);
