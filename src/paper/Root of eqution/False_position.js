import React, { Component } from 'react'
import { Card, Button, Row, Col, Table, Input } from 'antd'
import { compile } from 'mathjs'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios' ;



var dataSource = []
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
class False_Position extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showtable: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.false_position = this.false_position.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    databaseAPI = async()=>{
        var response = await axios.get('http://localhost:3010/api/users/showfalsepos').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            xl:response['data'][0]['xl'],
            xr:response['data'][0]['xr']
        })
        alert(this.state.fx);
        alert(this.state.xl);
        alert(this.state.xr);
        this.false_position(this.state.xl,this.state.xr);
    }
    false_position(xl, xr) {
        fx = this.state.fx;
        var increaseFunction = false;
        var xi = 0;
        var epsilon = parseFloat(0.000000);
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
            xi = (xl * this.func(xr) - xr * this.func(xl)) / (this.func(xr) - this.func(xl));
            if (this.func(xi) * this.func(xr) < 0) {
                epsilon = this.error(xi, xr);
                if (increaseFunction) {
                    xl = xi;
                }
                else {
                    xr = xi;
                }

            }
            else {
                epsilon = this.error(xi, xl);
                if (increaseFunction) {
                    xr = xi;
                }
                else {
                    xl = xi;
                }

            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xi.toFixed(6);
            data['error'][n] = Math.abs(epsilon).toFixed(6);
            n++;

        } while (Math.abs(epsilon) > 0.000001);

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
    error = (xnew, xold) => Math.abs((xnew - xold) / xnew);
    createTable(xl, xr, x, error) {
        dataSource = []
        for (var i = 0; i < xl.length; i++) {
            dataSource.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i]
            });
        }
    }

    render() {
        return (
            <div style={{ padding: "10px" }}>
                <div>
                    <br></br><br></br><br></br><br></br>
                    <span style={{ color: 'Black', fontSize: '24px' }}>FalsePosition iteration</span>
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
                        <Button type="primary" size="large" onClick={() => this.false_position(parseFloat(this.state.xl), parseFloat(this.state.xr))}>Submit</Button><br></br><br></br>
                        <Button type="primary" danger size="large" onClick={() => this.databaseAPI()}>Exampleinput</Button>
                    </Card>
                    {this.state.showGraph &&

                        <div className={"my-pretty-chart-container"}>
                            <Card bordered={true}
                                style={{ borderRadius: "50px" }}
                            >
                                <LineChart width={730} height={250} data={dataSource}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis dataKey="error" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={36} />
                                    <Line name="error" type="monotone" dataKey="error" stroke="#8884d8" />
                                </LineChart>
                            </Card>
                        </div>
                    }
                    {this.state.showOutputCard &&
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{ backgroundColor: 'rgb(55, 76, 104)', borderRadius: '15px', marginBlockStart:"2%"}}
                        id="outputCard"
                        >
                            <Table dataSource={dataSource} columns={columns} />
                        </Card>
                    }
                </div>
            </div>
        );
    }

}

export default False_Position
