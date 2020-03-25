import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd'

import 'antd/dist/antd.css'

const table = [
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
]
var ArrConsole = [] ;
class Secant_Method extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fx: "",
            X0: 0,
            X1: 0,
            isSubmit: false
        }
        this.handleChange = this.handleChange.bind(this);
        //this.Secant_Method = this.Secant_Method.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <div>
                 <br></br><br></br><br></br><br></br>
                <span>Secant Method</span>
                <br></br><br></br>
                <Card
                
                    bordered
                    style={{ backgroundColor: 'rgb(55, 76, 104)', borderRadius: '15px' }}
                    onChange={this.handleChange}
                >
                    <span style={{ color: 'white', fontSize: '24px' }}>F(x)</span><Input size="middle" name="fx" ></Input>
                    <span style={{ color: 'white', fontSize: '24px' }}>X(0)</span><Input size="middle" name="X0" ></Input>
                    <span style={{ color: 'white', fontSize: '24px' }}>X(1)</span><Input size="middle" name="X1" ></Input><br></br><br></br>
                    <Button type="primary" size="large" onClick={()=>this.Secant_Method(this.state.X0, this.state.X1)}>Submit</Button>

                </Card>
                {this.state.isSubmit ? <div>
                    <Table rowKey="no" columns={table} dataSource={ArrConsole} bordered={true}></Table>
                </div> : null}
            </div>
        )
    }
}

export default Secant_Method
