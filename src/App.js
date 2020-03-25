import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
/////Root of Equation
import bisection from './paper/Root of eqution/bisection'
import False_positon from './paper/Root of eqution/False_positon'
import One_point from './paper/Root of eqution/One_point'
import Newton_Rapshon from './paper/Root of eqution/Newton_Rapshon'
import Secant_Method from './paper/Root of eqution/Secant_Method'
/////Linear Equation
import Cramer_Rule from './paper/Linear Equation/Cramer_Rule'
import Gauss_Elimination from './paper/Linear Equation/Gauss_Elimination'
import Gauss_Jordan from './paper/Linear Equation/Gauss_Jordan'
import LU_Decompostion from './paper/Linear Equation/LU_Decompostion'
import Cholesky_Decompostion from './paper/Linear Equation/Cholesky_Decompostion'
import Jacobi_iteration from './paper/Linear Equation/Jacobi_iteration'
import Gauss_Seidel from './paper/Linear Equation/Gauss_Seidel'
import Conjugate_Gradient from './paper/Linear Equation/Conjugate_Gradient'
/////Interpolation
import Newton_Divide from './paper/Interpolation/Newton_Divide'
import Lagrange from './paper/Interpolation/Lagrange'
/////Least Square Error
import Linear_Regression from './paper/Least Square Error/Linear_Regression'
import Polynomial_Regression from './paper/Least Square Error/Polynomial_Regression'
import Multiple_Linear_Regression from './paper/Least Square Error/Multiple_Linear_Regression'
////Intergration
import Trapezoidal_Rule from './paper/Intergration/Trapezoidal_Rule'
import Composite_Trapezoidal from './paper/Intergration/Composite_Trapezoidal'
import Simpson_Rule from './paper/Intergration/Simpson_Rule'
import Composite_Simpson from './paper/Intergration/Composite_Simpson'
////Differentiation
import Forward_OH from './paper/Differentiation/Forward_OH'
import Forward_OH2 from './paper/Differentiation/Forward_OH2'
import Backward_OH from './paper/Differentiation/Backward_OH'
import Backward_OH2 from './paper/Differentiation/Backward_OH2'
import Central_OH2 from './paper/Differentiation/Central_OH2'
import Central_OH4 from './paper/Differentiation/Central_OH4'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ position: 'fixed', width: '100%', backgroundColor: 'rgb(39, 93, 163)' }}>
            <span style={{ color: 'white', fontSize: '28px', float: 'right' }}>Numerical Method</span>
          </Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
          </Menu>

          <Sider width={300}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

              <SubMenu
                key="sub2"
                title={
                  <span>

                    <span>Root of Equation</span>
                  </span>
                }
              >
                <Menu.Item key="6">Bisection<Link to="/bisection" /></Menu.Item>
                <Menu.Item key="a">False postion<Link to="/False_positon" />/</Menu.Item>
                <Menu.Item key="b">One-point itreation<Link to="/One_point" /></Menu.Item>
                <Menu.Item key="z">Newton-Raphson<Link to="Newton_Rapshon" /></Menu.Item>
                <Menu.Item key="x">Secant Method<Link to="Secant_Method" /></Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub3"
                title={
                  <span>

                    <span>Linear Equation</span>
                  </span>
                }
              >
                <Menu.Item key="p">Cramer's Rule<Link to="/Cramer_Rule" /></Menu.Item>
                <Menu.Item key="o">Gauss Elimination<Link to="Gauss_Elimination" /></Menu.Item>
                <Menu.Item key="11">Gauss Jordan Method<Link to="Gauss_Jordan" /></Menu.Item>
                <Menu.Item key="13">LU Decompostion<Link to="LU_Decompostion" /></Menu.Item>
                <Menu.Item key="14">Cholesky Decompostion<Link to="Cholesky_Decompostion" /></Menu.Item>
                <Menu.Item key="15">Jacobi iteration Method<Link to="Jacobi_iteration" /></Menu.Item>
                <Menu.Item key="16">Gauss Seidel Iteration<Link to="Gauss_Seidel" /></Menu.Item>
                <Menu.Item key="17">Conjugate Gradient Method<Link to="Conjugate_Gradient" /></Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub4"
                title={
                  <span>

                    <span>Interpolation</span>
                  </span>
                }
              >
                <Menu.Item key="18">Newton Divide Difference<Link to="Newton_Divide" /></Menu.Item>
                <Menu.Item key="19">Lagrange<Link to="Lagrange" /></Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub5"
                title={
                  <span>

                    <span>Least Square Error</span>
                  </span>
                }
              >
                <Menu.Item key="21">Linear Regression<Link to="Linear_Regression" /></Menu.Item>
                <Menu.Item key="22">Polynomial Regression<Link to="Polynomial_Regression" /></Menu.Item>
                <Menu.Item key="23">Multiple Linear Regression<Link to="Multiple_Linear_Regression" /></Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub6"
                title={
                  <span>

                    <span>Intergration</span>
                  </span>
                }
              >
                <Menu.Item key="32">Trapezoidal Rule<Link to="Trapezoidal_Rule" /></Menu.Item>
                <Menu.Item key="24">Composite Trapezoidal Rule<Link to="Composite_Trapezoidal" /></Menu.Item>
                <Menu.Item key="33">Simpson Rule<Link to="Simpson_Rule" /></Menu.Item>
                <Menu.Item key="25">Composite Simpson's Rule<Link to="Composite_Simpson" /></Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub7"
                title={
                  <span>

                    <span>Differentiation</span>
                  </span>
                }
              >
                <Menu.Item key="26">Forward Divided-Difference O(h)<Link to="Forward_OH" /></Menu.Item>
                <Menu.Item key="27">Backward Divided-Difference O(h)<Link to="Backward_OH" /></Menu.Item>
                <Menu.Item key="28">Central Divided-Difference O(h{<sup>2</sup>})<Link to="Central_OH2" /></Menu.Item>
                <Menu.Item key="29">Forward Divided-Difference O(h{<sup>2</sup>})<Link to="Forward_OH2" /></Menu.Item>
                <Menu.Item key="30">Backward Divided-Difference O(h{<sup>2</sup>})<Link to="Backward_OH2" /></Menu.Item>
                <Menu.Item key="31">Central Divided-Difference O(h{<sup>4</sup>})<Link to="Central_OH4" /></Menu.Item>
              </SubMenu>

            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>

              <Route path="/bisection" component={bisection} />
              <Route path="/False_positon" component={False_positon} />
              <Route path="/One_point" component={One_point} />
              <Route path="/Newton_Rapshon" component={Newton_Rapshon} />
              <Route path="/Secant_Method" component={Secant_Method} />

              <Route path="/Cramer_Rule" component={Cramer_Rule} />
              <Route path="/Gauss_Elimination" component={Gauss_Elimination} />
              <Route path="/Gauss_Jordan" component={Gauss_Jordan} />
              <Route path="/LU_Decompostion" component={LU_Decompostion} />
              <Route path="/Cholesky_Decompostion" component={Cholesky_Decompostion} />
              <Route path="/Jacobi_iteration" component={Jacobi_iteration} />
              <Route path="/Gauss_Seidel" component={Gauss_Seidel} />
              <Route path="/Conjugate_Gradient" component={Conjugate_Gradient} />

              <Route path="/Newton_Divide" component={Newton_Divide} />
              <Route path="/Lagrange" component={Lagrange} />

              <Route path="/Linear_Regression" component={Linear_Regression} />
              <Route path="/Polynomial_Regression" component={Polynomial_Regression} />
              <Route path="/Multiple_Linear_Regression" component={Multiple_Linear_Regression} />

              <Route path="/Trapezoidal_Rule" component={Trapezoidal_Rule} />
              <Route path="/Composite_Trapezoidal" component={Composite_Trapezoidal} />
              <Route path="/Simpson_Rule" component={Simpson_Rule} />
              <Route path="/Composite_Simpson" component={Composite_Simpson} />

              <Route path="/Forward_OH" component={Forward_OH} />
              <Route path="/Backward_OH" component={Backward_OH} />
              <Route path="/Central_OH2" component={Central_OH2} />
              <Route path="/Forward_OH2" component={Forward_OH2} />
              <Route path="/Backward_OH2" component={Backward_OH2} />
              <Route path="/Central_OH4" component={Central_OH4} />




            </Content>
            
            <Footer style={{ textAlign: 'center' }}>Numerical Method ©</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
