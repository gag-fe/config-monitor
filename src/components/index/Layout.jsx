import React from 'react';
import {bindActionCreators} from 'redux';
import {Provider, connect, Router, Route, hashHistory} from 'react-redux';
import Breadcrumb from '@gag/breadcrumb-web';
import Layout from '@gag/layout-web';
import Icon from '@gag/icon-web';
import Menu from '@gag/menu-web';
import Dropdown from '@gag/dropdown-web';
import PropTypes from 'prop-types';
import * as LayoutActions from '../../actions/layout.js';
import Utils from '../../utils/index';
import BrowserUpgrade from '../browserUpgrade/index';
import Store from 'Store2';
const Ajax = Utils.ajax;
const CommonUtils = Utils.common;
const {Header, Content, Footer, Sider} = Layout;

// components
import HeaderRoot from './header/Header';
import FooterRoot from './footer/Footer';
import Navi from './Navi';

//system-notice
import SystemNotice from '@gag/system-notice';


class IndexLayout extends React.Component {

  defaultOpenKeys = this.getDefaultOpenKeys();

  state = {
    collapsed: false,
    mode: 'inline',
    defaultOpenKeys: this.defaultOpenKeys,
    indexComponent: this.props.layout.indexComponent, //默认权限
    defaultRoutes: this.props.routes
  };

  toggle = () => {
    let collapsed = !this.state.collapsed;
    let defaultOpenKeys = this.defaultOpenKeys;
    let mode = 'inline';

    if (collapsed) {
      defaultOpenKeys = [];
      mode = 'inline';
    } else {
      defaultOpenKeys = this.defaultOpenKeys;
      mode = 'inline';
    }

    this.setState({
      collapsed: collapsed,
      mode: mode,
      defaultOpenKeys: defaultOpenKeys,
    });
  };

  getChild = () => {
    return this.props.children || React.createElement(this.state.indexComponent.component);
  }

  getDefaultOpenKeys() {
    let defaultOpenKeys = [];
    this.props.route.menus.map(item => {
      defaultOpenKeys.push(item.key);
    });
    return defaultOpenKeys || [];
  }

  componentWillMount() {
    this.props.getInitList();
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.layout.funcAuthorities.length > 0) {
      const defaultRoutesArr = this.props.routes;
      const componentList = [];
      nextProps.layout.menus.map((item) => {
        if (nextProps.layout.funcAuthoritiesObj[item.id] && nextProps.layout.funcAuthoritiesObj[item.id] != undefined) {
          componentList.push(item);
        }
      });

      if(defaultRoutesArr.length == 1 || defaultRoutesArr.breadcrumbName == ''){
        defaultRoutesArr[1] = componentList[0];
      }

      this.setState({
        indexComponent: componentList[0],
        defaultRoutes: defaultRoutesArr
      });
    }
  }

  logout(ev, url) {
    ev.nativeEvent.stopImmediatePropagation();
    let token = CommonUtils.getToken();

    if (!token) {
      CommonUtils.login();
    }

    Ajax({
      url: url,
      data: {'action': 'logout', 'token': token},
      type: 'json',
      method: 'post'
    }).then(resp => {
      if( resp.status == 'OK'){
        CommonUtils.login();
      }else{
        CommonUtils.modal('warning', '警告', '退出失败！请重试！');
      }
    });
  }

  render() {
    const exitMenus = [];
    let routes = this.props.routes;

    const pathname = this.props.location.pathname != '/' ? this.props.location.pathname : '/' + this.state.indexComponent.key;
    const pathnameArr = pathname.split('/');
    const currentPathname = pathnameArr.slice(pathnameArr.length - 1);
    const props = Object.assign({}, this.props.layout, {currentPathname: currentPathname}, this.state);

    let pageName = routes[routes.length - 1] ? routes[routes.length - 1].breadcrumbName : '';

    if (props.exitMenus) {
      props.exitMenus.map(item => {
        if (item.key == 'exit') {
          exitMenus.push(<Menu.Item key={item.key}>{<span>{item.icon}<a onClick={(ev) => this.logout(ev, item.url)}
                                                                        target="_self"
                                                                        title={item.title}> {item.title}</a></span>}</Menu.Item>);
        } else {
          exitMenus.push(<Menu.Item key={item.key}>{<span>{item.icon}<a href={item.url} target="_self"
                                                                        title={item.title}> {item.title}</a></span>}</Menu.Item>);
        }
      })
    }

    const exitList = (
      <Menu>
        {exitMenus}
      </Menu>
    );

    return (
      <Layout>
        <Sider width="240"
               trigger={null}
               collapsible
               collapsed={this.state.collapsed}
        >
          <HeaderRoot.Logo {...props} />
          <div className="navi-wrapper">
            <div className="navi-inner-wrapper">
              <Navi {...props}/>
            </div>
          </div>
        </Sider>
        <Layout>
          <Header style={{margin: 0, padding: 0}}>
            <header className="row header">
              <div className="toolbox">
                <div className="top-navi-left">
                  <div className="button-icon">
                    <Icon
                      className="trigger"
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggle}
                    />
                  </div>
                </div>
                <div className="button-exit">
                  <Dropdown overlay={exitList}>
                      <span className="ant-dropdown-link" href="#">
                      {props.userName || ''} <Icon type="down"/>
                      </span>
                  </Dropdown>
                </div>
              </div>
            </header>

          </Header>
          <div className="util-clearfix">
            <SystemNotice entryId="09" scrollamount="6"></SystemNotice>
          </div>
          <Content style={{margin: '0 0 0 0', padding: '20px 50px 0', background: '#F5F5F5'}}>
            <div className="breadcrumb-wrapper">
              <h2 className="page-title">{pageName}</h2>
              <div className="breadcrumb">
                <Breadcrumb routes={this.state.defaultRoutes}/>
              </div>
            </div>
            <div id="app-cnt" className="app-cnt">
              {this.getChild()}
            </div>
            <BrowserUpgrade/>
          </Content>
          <FooterRoot {...props} />
        </Layout>
      </Layout>
    );
  }
}
;

IndexLayout.contextTypes = {
  store: PropTypes.object,
};

//将state.site绑定到props的site
function mapStateToProps(state, props) {
  return {
    layout: Object.assign({}, props.route, state.layout)
  }
}
//将dispatch的所有方法绑定到props上
function mapDispatchToProps(dispatch, props) {
  return bindActionCreators(LayoutActions, dispatch)
}
//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(IndexLayout)
