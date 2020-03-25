import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd'

import 'antd/dist/antd.css'

const table = [
    {
        title: 'Round',
        dataIndex: 'no',
        key: 'no'
    },

    {
        title:'X(0)',
        dataIndex:'X0',
        key:'X0'
    },

    {
        title: 'Error',
        dataIndex: 'Error',
        key: 'Error'
    },
]
var ArrConsole = [] ;
var Arr = [] ;
class Taylor_Series extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 fx: '',
                 X: 0,
                 X0: 0,
                 isSubmit: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.Taylor_Series = this.Taylor_Series.bind(this);
    }
    Taylor_Series(){


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
                <span>Taylor_Series</span>
                <br></br><br></br>
                <Card
                
                    bordered
                    style={{ backgroundColor: 'rgb(54, 168, 153)', borderRadius: '15px' }}
                    onChange={this.handleChange}
                >
                    <span style={{ color: 'white', fontSize: '24px' }}>F(x)</span><Input size="middle" name="fx" ></Input>
                    <span style={{ color: 'white', fontSize: '24px' }}>X</span><Input size="middle" name="X" ></Input>
                    <span style={{ color: 'white', fontSize: '24px' }}>X(0)</span><Input size="middle" name="X0" ></Input><br></br><br></br>
                    <Button type="primary" danger size="large" onClick={()=>this.Taylor_Series(this.state.X, this.state.X0)}>Submit</Button>

                </Card>
                {this.state.isSubmit ? <div>
                    <Table rowKey="no" columns={table} dataSource={ArrConsole} bordered={true}></Table>
                </div> : null}
            </div>
        )
    }
}

export default Taylor_Series
