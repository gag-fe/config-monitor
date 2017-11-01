import React from 'react';
import {Link} from 'react-router';
import Menu from '@gag/menu-web';
import Button from '@gag/button-web';
import Icon from '@gag/icon-web';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
import Utils from '../../utils/index';
const isEmptyObject = Utils.common.isEmptyObject;

class Navi extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: this.props.currentPathname,
      defaultOpenKeys: this.props.defaultOpenKeys || [],
      mode: this.props.mode || 'inline',
      collapsed: false
    };
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  hasVisibleChildren = (menu) => {
    let has = false;
    if (menu.children && menu.children.length) {
      // 只要有一个节点的visible不为false，has就为true
      has = !menu.children.every((item) => {
        return item.visible === false;
      });
    }
    return has;
  }


  generateMenuDom = (menus, path) => {
    const menuDoms = [];
    const funcAuthoritiesObj = this.props.funcAuthoritiesObj;
    menus = menus || this.props.menus;
    path = path || '';

    menus.map((item) => {
      let href = item.key.length ? (`${path}/${item.key}`) : path;
      const toObj = {
        pathname: href
      };

      if(funcAuthoritiesObj[item.id] && funcAuthoritiesObj[item.id] != undefined){
        menuDoms.push(
          <Menu.Item key={item.key}>
            <Link title={item.title} to={toObj}>{item.icon}<span className="nav-text">{item.title}</span></Link>
          </Menu.Item>
        );
      }
    });

    return menuDoms;
  }

  handleClick = (e, key) => {
    let currentArr = [];
    key = e.key;
    currentArr.push(key);
    this.setState({
      current: currentArr
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentPathname != nextProps.currentPathname || this.props.mode != nextProps.mode) {
      this.setState({
        current: nextProps.currentPathname,
        mode: nextProps.mode,
        defaultOpenKeys: nextProps.defaultOpenKeys,
        collapsed: nextProps.collapsed
      });
    }
  }

  render() {

    if (isEmptyObject(this.props.funcAuthoritiesObj)) {
      return false;
    }

    return (
      <div style={{ width: 240 }}>
        <Menu
          defaultOpenKeys={this.state.defaultOpenKeys}//初始展开的 SubMenu 菜单项 key 数组
          openKeys={this.state.defaultOpenKeys}//当前展开的 SubMenu 菜单项 key 数组
          selectedKeys={this.state.current}//当前选中的菜单项 key 数组
          defaultSelectedKeys={this.state.current}//初始选中的菜单项 key 数组
          inlineCollapsed={this.state.collapsed}//inline 时菜单是否收起状态
          mode="inline"
          theme="dark"
          onClick={this.handleClick.bind(this)}
        >
          {this.generateMenuDom()}
        </Menu>
      </div>
    );
  }
}

module.exports = Navi;
