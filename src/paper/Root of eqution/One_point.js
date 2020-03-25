import React, { Component } from 'react'
import { Card, Button, Row, Col, Table, Input } from 'antd'
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs'
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
class Onepoint extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            number: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onepoint = this.onepoint.bind(this);
    }
    databaseAPI = async()=>{
        var response = await axios.get('http://localhost:3010/api/users/showOnepoint').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            x0:response['data'][0]['x0']
        })
        alert(this.state.fx);
        alert(this.state.x0);
        this.onepoint(this.state.x0);
    }
    onepoint(xold) {
        fx = this.state.fx;
        var xnew = 0;
        var epsilon = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['x'] = []
        data['error'] = []

        do {
            xnew = this.func(xold);
            epsilon = this.error(xnew, xold)
            data['x'][n] = xnew.toFixed(6);
            data['error'][n] = Math.abs(epsilon).toFixed(6);
            n++;
            xold = xnew;

        } while (Math.abs(epsilon) > 0.000001);

        this.createTable(data['x'], data['error']);
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
    createTable(x, error) {
        dataSource = []
        for (var i = 0; i < x.length; i++) {
            dataSource.push({
                iteration: i + 1,
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
        return (
            <div style={{ padding: "30px" }}>
                <div>
                    <br></br><br></br><br></br><br></br>
                    <span style={{ color: 'Black', fontSize: '24px' }}>One - point </span>
                    <br></br><br></br>
                    <Card

                        bordered
                        style={{ backgroundColor: 'rgb(55, 76, 104)', borderRadius: '15px' }}
                        onChange={this.handleChange}
                        id="inputCard"
                    >
                        <span style={{ color: 'white', fontSize: '24px' }}>F(x)</span><Input size="middle" name="fx" ></Input>
                        <span style={{ color: 'white', fontSize: '24px' }}>X(0)</span><Input size="middle" name="x0" ></Input><br></br><br></br>
                        <Button type="primary" size="large" onClick={() => this.newton_raphson(parseFloat(this.state.xold))}>Submit</Button><br></br><br></br>
                        <Button type="primary" danger size="large" onClick={()=>this.databaseAPI()}>Exampleinput</Button>

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
                            style={{ backgroundColor: 'rgb(55, 76, 104)', borderRadius: '15px', marginBlockStart: "2%" }}
                            id="outputCard"
                        >
                            <Table columns={columns} dataSource={dataSource} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                            ></Table>
                        </Card>
                    }
                </div>
            </div>
        );
    }
}

export default Onepoint
