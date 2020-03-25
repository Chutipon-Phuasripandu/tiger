import React, { Component } from 'react'
import { Card, Button, Row, Col, Table, Input } from 'antd'
import { range, compile, derivative } from 'mathjs'
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

var dataSource = []
const columns = [
    {
      title: "Iteration",
      dataIndex: "iteration",
      key: "iteration"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    },
    {
      title: "Error",
      key: "error",
      dataIndex: "error"
    }
  ];
  var fx = " ";
class Secant extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            x1: 0,
            number: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.secant = this.secant.bind(this);
    }
    databaseAPI = async()=>{
        var response = await axios.get('http://localhost:3010/api/users/showsecant').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            x0:response['data'][0]['x0'],
            x1:response['data'][0]['x1']
        })
        alert(this.state.fx);
        alert(this.state.x0);
        alert(this.state.x1);
        this.secant(this.state.x0,this.state.x1);
    }
    secant(x0, x1) {
        fx = this.state.fx;
        var x = [], y=0, epsilon = parseFloat(0.000000);
        var n=1, i=1;
        var data  = []
        data['y'] = []
        data['error'] = []
        x.push(x0);
        x.push(x1);
        data['y'][0] = x0;
        data['error'][0] = "---";

        do{ 
            y = x[i] - (this.func(x[i])*((x[i]-x[i-1])))/(this.func(x[i])-this.func(x[i-1]));
            x.push(y);
            epsilon = this.error(y,x[i]);
            data['y'][n]   =   y.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            
            n++;  
            i++;

        }while(Math.abs(epsilon)>0.000001);
        this.createTable(data['y'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })

        
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    error(xnew, xold) {
        return Math.abs((xnew-xold) / xnew);
    }
    createTable(y, error) {
        dataSource = []
        for (var i=0 ; i<y.length ; i++) {
            dataSource.push({
                iteration: i+1,
                y: y[i],
                error: error[i]
            });
        }
    
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return(
            <div style={{ padding: "10px" }}>
            <div>
                    <br></br><br></br><br></br><br></br>
                    <span style={{ color: 'Black', fontSize: '24px' }}>Secant Method</span>
                    <br></br><br></br>
                    <Card

                    bordered
                    style={{ backgroundColor: 'rgb(55, 76, 104)', borderRadius: '15px' }}
                    onChange={this.handleChange}
                    id="inputCard"
                    >
                                <span style={{ color: 'white', fontSize: '24px' }}>F(x)</span><Input size="middle" name="fx" ></Input>
                                <span style={{ color: 'white', fontSize: '24px' }}>X(0)</span><Input size="middle" name="x0" ></Input>
                                <span style={{ color: 'white', fontSize: '24px' }}>X(1)</span><Input size="middle" name="x1" ></Input><br></br><br></br>
                                <Button type="primary"  size="large" onClick={()=>this.secant(parseFloat(this.state.xl), parseFloat(this.state.xr))}>Submit</Button><br></br><br></br>
                                <Button type="primary" danger size="large" onClick={()=>this.databaseAPI()}>Exampleinput</Button>
                           
                    </Card>
                    {this.state.showGraph &&
                        <Card
                            style={{ borderRadius: "20px" }}
                        >
                            <LineChart width={730} height={250} data={dataSource}
                                margin={{ top: 5, right: 100, left: 20, bottom: 5 }}>
                                <XAxis dataKey="error" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Line name="error" type="monotone" dataKey="error" stroke="#8884d8" />
                            </LineChart>
                        </Card>
                    }
                    {this.state.showOutputCard && 
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{ backgroundColor: 'rgb(55, 76, 104)', borderRadius: '15px', marginBlockStart:"2%"}}
                        id="outputCard"
                        >
                            <Table columns={columns} dataSource={dataSource}  bodyStyle={{fontWeight: "bold", fontSize: "18px", color: "black"}}
                            ></Table>
                        </Card>
                    }                    
                </div>
                
            </div>
        );
    }
}

export default Secant
