import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd'
import 'antd/dist/antd.css';
import { compile } from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios'

var dataInTable = []
const columns = [
    {
        title: 'Round',
        dataIndex: 'no',
        key: 'no'
    },

    {
        title: 'X(l)',
        dataIndex: 'Xl',
        key: 'Xl'
    },

    {
        title: 'X(r)',
        dataIndex: 'Xr',
        key: 'Xr'
    },
    {
        title: 'X(m)',
        dataIndex: 'Xm',
        key: 'Xm'
    },
    {
        title: 'Error',
        dataIndex: 'Error',
        key: 'Error'
    },

]
var fx = " ";
class False_positon extends Component {
    
    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.false_positon = this.false_positon.bind(this);
    }
    databaseAPI = async()=>{
        var response = await axios.get('http://localhost:3010/api/users/showfalsepos').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            xl:response['data'][0]['xl'],
            xr:response['data'][0]['xr']
        })
        console.log(this.state.fx)
        console.log(this.state.xl)
        console.log(this.state.xr)
        //this.false_position(this.state.xl,this.state.xr);
    }
    false_positon(xl, xr) {
        //console.log(xl);
        //console.log(xl);
        fx = this.state.fx;
        var increaseFunction = false;
        var xi = 0;
        var epsilon= parseFloat(0.000000);
        var n=0;
        var data  = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        if (this.func(xl) < this.func(xr)) {
            increaseFunction = true;
        }
        do{ 
            xi = (xl*this.func(xr) - xr*this.func(xl))/(this.func(xr)-this.func(xl));
            if (this.func(xi)*this.func(xr) < 0) {
                epsilon = this.error(xi,xr);
                if (increaseFunction) {
                    xl = xi;
                }
                else {
                    xr = xi;
                }
                
            } 
            else {
                epsilon = this.error(xi,xl);
                if (increaseFunction) {
                    xr = xi;  
                }
                else {
                    xl = xi;
                }
                  
            }   
            data['xl'][n] =  xl;
            data['xr'][n] =  xr;
            data['x'][n] =  xi.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            n++;  

        }while(Math.abs(epsilon)>0.000001);

        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
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
    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i=0 ; i<xl.length ; i++) {
            dataInTable.push({
                iteration: i+1,
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
                    <span style={{ color: 'Black', fontSize: '24px' }}>False position iteration</span>
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
                                <Button type="primary"  size="large" onClick={()=>this.false_positon(parseFloat(this.state.xl), parseFloat(this.state.xr))}>Submit</Button><br></br><br></br>
                                <Button type="primary"  size="large" onClick={()=>this.databaseAPI()}>Database</Button>
                           
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

export default False_positon;
