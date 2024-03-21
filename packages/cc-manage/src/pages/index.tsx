import { Link, Outlet, useLocation, useNavigate } from 'umi';
import React, { useState } from 'react';
import { Avatar, Button, ConfigProvider, Divider, MenuProps, MenuTheme } from 'antd';
import { Menu, Layout, Breadcrumb } from 'antd';
import styles from './index.less';
import { GlobalOutlined, HeatMapOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, RadarChartOutlined, TeamOutlined, TranslationOutlined } from '@ant-design/icons';

import zhCN from 'antd/locale/zh_CN';
const { Header, Content, Footer, Sider} = Layout;

const logo = require('../assets/ccmama.jpg');

const navs: MenuProps['items'] = [
  {
    key: 1,
    label: '博客',
    icon: <TranslationOutlined />
  },
  // {
  //   key: 2,
  //   label: '待开发',
  //   icon: <PieChartOutlined />
  // },
  // {
  //   key: 3,
  //   label: '待开发',
  //   icon: <PieChartOutlined />
  // },
];

const items: MenuProps['items'] = [
  {
    label: '文章',
    key: '/manage/blog/article',
    icon: <RadarChartOutlined />
  },
  {
    label: '用户',
    key: '/manage/blog/user',
    icon: <TeamOutlined />,
  },
  {
    label: '网站信息',
    key: '/manage/blog/info',
    icon: <GlobalOutlined />,
  },
];

export default function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  // const pathSnippets = location.pathname.split('/').filter((i) => i);

  // const extraBreadcrumbItems = pathSnippets.map((_, index) => {
  //   const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
  //   return (
  //     <Breadcrumb.Item key={url}>
  //       <Link to={url}>{breadcrumbNameMap[url]}</Link>
  //     </Breadcrumb.Item>
  //   );
  // });

  // const breadcrumbItems = [
  //   <Breadcrumb.Item key="home">
  //     <Link to="/">Home</Link>
  //   </Breadcrumb.Item>,
  // ].concat(extraBreadcrumbItems);

  const click = (e: any) => {
    navigate(e.key);
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={styles.layout}>
        <Header className={styles.site_header}>
          <div className={styles.logo_container}>
            <img className={styles.logo} src={logo} />
          </div>
          <Menu className={styles.top_menu} theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={navs}></Menu>
          <div className={styles.user_avatar}>
            <Avatar shape="square" src={logo} alt={'未登录'}/>
          </div>
        </Header>
        <Layout>
          <Sider
            className={styles.sider}
            collapsed={collapsed}
            breakpoint="lg"
            collapsedWidth="60"
          >
            <Menu
              theme="dark"
              mode="inline"
              onClick={click}
              items={items}
              defaultSelectedKeys={['/manage/blog/article']}
            ></Menu>
            <Divider />
            <Button
              type="primary"
              className={styles.collapsed_btn}
              onClick={toggleCollapsed}
              style={{ marginBottom: 16 }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </Sider>
          <Layout className={styles.site_layout}>
            <Breadcrumb>
              {/* {breadcrumbItems} */}
            </Breadcrumb>
            <Content className={styles.site_layout_content}>
              <Outlet/>
            </Content>
            <Footer className={styles.site_layout_footer}>CC博客 by cc</Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
