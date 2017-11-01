  import { createContainer } from 'roof';
import React from 'react';
import Table from '@gag/table-web';
import Button from '@gag/button-web';
import Pagination from '@gag/pagination-web';
import Popconfirm from '@gag/popconfirm-web';
import Moment from 'moment';
const format = 'YYYY-MM-DD';
class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 20,
      pageIndex: 1,
      total: 0
    };
  }
  _columns = () => {
    return [{
      title: '序号',
      dataIndex: 'serialNo',
      key: 'serialNo',
      width: '5%'
    },{
      title: '所属机构',
      dataIndex: 'shopName',
      key: 'shopName',
      width: '10%'
    }, {
      title: '分组名称',
      dataIndex: 'groupName',
      key: 'groupName',
      width: '10%',
    }, {
      title: '包含商户',
      width: '20%',
      render: (text, record) => {
        let shopList = [];
        if(record.groupShopsList && record.groupShopsList.length > 0){
          record.groupShopsList.map(item=> {
            shopList.push(item.shopEntityName);
          });
          return shopList.join(' | ');
        }else {
          return '--';
        }
      }
    },{
      title: '操作账户',
      dataIndex: 'updateBy',
      key: 'updateBy',
      width: '10%'
    },{
      title: '操作时间',
      //dataIndex: 'updateAt',
      key: 'updateAt',
      width: '10%',
      render:(text, record) => {
        return Moment(record.updateAt).format('YYYY-MM-DD HH:mm')
      }
    },{
      title: '操作',
      width: '5%',
      render:(text, record) => {
        return (
          <div>
            <Button type="primary" size="small" disabled={!record.editable} onClick={this._editGroup.bind(this, record)}>编辑</Button>
            <span style={{paddingLeft:10}}></span>
            <Popconfirm title="确定要删除吗？" onConfirm={this._confirm.bind(this, record.groupId)}
                        onCancel={this._cancel}
            ><Button disabled={!record.editable} type="primary" size="small"
                     value={record.groupId}
            >删除</Button></Popconfirm>
          </div>
        );
      }
    }];
  }

  _delGroup = (groupId) => {
    console.log(groupId);
  }

  _confirm = (id) => {
    this.props.deleteGroup(id);
  }

  _editGroup = (data) => {
    this.props.editGroupParams(data);
    this.props.setGroupVisibleTrue();
  }

  _paginationOnChange = (pageIndex) => {
    this.setState({
      pageIndex: pageIndex
    });
    this.props.seachParamsPageIndex(pageIndex);
    this.props.getShopEntityGroup();
  }



  //新增分组
  _clickAddGroup = () => {
    this.props.setAddGroupVisibleTrue();
    this.props.deleteRowsShop();
    //this.props.getShopList();
  }

  render() {
    return (
      <div>
        <div className="util-clearfix" style={{textAlign:'right', paddingBottom:20}}>
          <Button type="primary" onClick={this._clickAddGroup} className="">新增分组</Button>
        </div>
        <div className="util-clearfix">
        <Table loading={this.props.loading} columns={this._columns()} dataSource={this.props.rows} pagination={false} />
        <Pagination showQuickJumper showTotal={(total, range) => `显示第 ${(range[0] && range[1])?range[0]:0} 到第 ${range[1]} 条记录，总共 ${total} 条记录`} defaultCurrent={1} pageSize={this.props.seachParams.pageSize} current={this.props.seachParams.pageIndex} total={this.props.seachParams.total} onChange={this._paginationOnChange} />
        </div>
      </div>
		);
  }
};
export default TableList;
