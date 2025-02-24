import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import "../components/AdminDashboard.css";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = () => {
    switch (location.pathname) {
      case '/': return '1';
      case '/orders': return '2';
      case '/products': return '3';
      case '/employees': return '4';
      case '/coupons': return '5';
      case '/profile': return '6'; // Thêm key cho Profile
      case '/settings': return '7'; // Thêm key cho Settings
      case '/logout': return '8'; // Thêm key cho Logout
      default: return '1';
    }
  };

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} trigger={null}>
        <div className="logo">
          <img
            src="https://gstatic.gvn360.com/2019/05/LogoGearvn-09-1.png"
            alt="GearVN Logo"
            onError={(e) => (e.target.src = '/fallback-logo.png')}
          />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[getSelectedKey()]}>
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate('/')}>
            Trang Chủ
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />} onClick={() => navigate('/orders')}>
            Đơn Hàng
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />} onClick={() => navigate('/products')}>
            Sản Phẩm
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />} onClick={() => navigate('/employees')}>
            Nhân Viên
          </Menu.Item>
          <Menu.Item key="5" icon={<GiftOutlined />} onClick={() => navigate('/coupons')}>
            Mã Giảm Giá
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ marginLeft: 16 }}
          />
          <div style={{ float: 'right', marginRight: 16 }}>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="6" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
                    Profile
                  </Menu.Item>
                  <Menu.Item key="7" icon={<SettingOutlined />} onClick={() => navigate('/settings')}>
                    Settings
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="8" icon={<LogoutOutlined />} onClick={() => navigate('/logout')}>
                    Logout
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <Button icon={<UserOutlined />}>Admin</Button>
            </Dropdown>
          </div>
        </Header>
        <Content className="site-layout-background">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;