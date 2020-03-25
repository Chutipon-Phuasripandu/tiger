import React, { Component } from 'react'
import {Card, Input, Button, Table} from 'antd';
import 'antd/dist/antd.css';
import { compile ,range} from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios'


var dataInTable = []
const columns = [
    {
      title: "Iteration",
      dataIndex: "iteration",
      key: "iteration"
    },
    {
      title: "XL",
      dataIndex: "xl",
      key: "xl"
    },
    {
      title: "XR",
      dataIndex: "xr",
      key: "xr"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
      title: "Error",
      key: "error",
      dataIndex: "error"
    }
  ];
var fx = " ";
class bisection extends Component {
    
    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showOutputCard: false,
            //showinput : true,
            showGraph: false,
            moveLeft: false,
            showapi: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.bisection = this.bisection.bind(this);
    }
    
    databaseAPI = async()=>{
        var response = await axios.get('http://localhost:3010/api/users/showbisection').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            xl:response['data'][0]['xl'],
            xr:response['data'][0]['xr']
        })
        alert(this.state.fx);
        alert(this.state.xl);
        alert(this.state.xr);
        this.bisection(this.state.xl,this.state.xr);
    }

    bisection(xl, xr) {
        console.log(xl);
        console.log(xr);
        fx = this.state.fx;
        var increaseFunction = false;
        var xm = 0;
        var sum = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        if (this.func(xl) < this.func(xr)) {
            increaseFunction = true;
        }

        do {
            xm = (xl + xr) / 2;
            if (this.func(xm) * this.func(xr) < 0) {
                sum = this.error(xm, xr);
                if (increaseFunction) {
                    xl = xm;
                }
                else {
                    xr = xm;
                }
            }
            else {
                sum = this.error(xm, xl);
                if (increaseFunction) {
                    xr = xm;
                }
                else {
                    xl = xm;
                }
            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xm.toFixed(8);
            data['error'][n] = Math.abs(sum).toFixed(8);
            n++;
        } while (Math.abs(sum) > 0.000001);
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })

    }

    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
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
                    <span style={{ color: 'Black', fontSize: '24px' }}>Bisection iteration</span>
                    <br></br><br></br>
                    <Card

                    bordered
                    style={{ backgroundColor: 'rgb(55, 76, 104)', borderRadius: '15px' }}
                    onChange={this.handleChange}
                    id="inputCard"
                    >
                                <span style={{ color: 'white', fontSize: '24px' }}>F(x)</span><Input size="middle" name="fx" ></Input>
                                <span style={{ color: 'white', fontSize: '24px' }}>X(l)</span><Input size="middle" name="xl" ></Input>
                                <span style={{ color: 'white', fontSize: '24px' }}>X(r)</span><Input size="middle" name="xr" ></Input><br></br><br></br>
                                <Button type="primary"  size="large" onClick={()=>this.bisection(parseFloat(this.state.xl), parseFloat(this.state.xr))}>Submit</Button><br></br><br></br>
                                <Button type="primary" danger size="large" onClick={()=>this.databaseAPI()}>Exampleinput</Button>
                           
                    </Card>
                    {this.state.showGraph &&
                        <Card
                            style={{ borderRadius: "20px" }}
                        >
                            <LineChart width={730} height={250} data={dataInTable}
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
                            <Table columns={columns} dataSource={dataInTable}  bodyStyle={{fontWeight: "bold", fontSize: "18px", color: "black"}}
                            ></Table>
                        </Card>
                    }                    
                </div>
                
            </div>
        );
    }
}
export default bisection;