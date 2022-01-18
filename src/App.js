import './App.css';
import Picture from './component/Picture';
import {Breadcrumb, Button, Menu} from 'antd';
import {CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons'
import ControlBar from "./component/ControlBar";
import Layout, {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

function App() {
  return (
      <div className="App">
      <h2>Management System</h2>
      <Layout style={{height:'100%',width:'100%'}}>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '30px 0' }}>
            <Sider className="site-layout-background" width={400}>
              <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
              >
                <ControlBar />
              </Menu>
            </Sider>
            <Content className="container" style={{ padding: '0 16px', minHeight: 280}}>
              <Picture />
            </Content>
          </Layout>
        </Content>
      </Layout>
      </div>
  );






  // return (
  //   <div className="App">
  //     <h2>Management System</h2>
  //     <div className="left">
  //       <div className="controlBar">
  //         <ControlBar />
  //       </div>
  //     </div>
  //     <div className="right">
  //         {/*<div className="menu">*/}
  //         {/*  <Button>source</Button>*/}
  //         {/*  <Button>link to</Button>*/}
  //         {/*  <Button>destination</Button>*/}
  //         {/*</div>*/}
  //         <div className="container">
  //           <Picture />
  //         </div>
  //         {/*<div className="submit">*/}
  //         {/*  <Button>Submit</Button>*/}
  //         {/*</div>*/}
  //     </div>
  //   </div>
  // );
}

export default App;
