import React, { Component } from 'react'
import { Card, Input, Button,Table  } from 'antd'

const table = [
    {
        title: 'Round',
        dataIndex: 'no',
        key: 'no'
    },

    {
        title: 'X',
        dataIndex: 'X',
        key: 'X'
    },
    {
        title: 'Error',
        dataIndex: 'Error',
        key: 'Error'
    },
]
var ArrConsole = [] ;
const inTable = [
    {
        no:'1',
        X0:'2',
        Error:'0.0001'
    }
]
var Arr = [] ;
class One_point extends Component {
    constructor(props) {
        super(props)

        this.state = {
                fx: '',
                X0: 0,
                isSubmit: false 
        }
        this.handleChange = this.handleChange.bind(this);
        this.One_point = this.One_point.bind(this);
    }
    One_point(){

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
                <span>One - point</span>
                <br></br><br></br>
                <Card

                    bordered
                    style={{ backgroundColor: 'rgb(55, 76, 104)', borderRadius: '15px' }}
                    onChange={this.handleChange}
                >

                    <span style ={{ color: 'white', fontSize: '24px'}}>F(x)</span><Input size="middle" name='fx'></Input>
                    <span style ={{ color: 'white', fontSize: '24px'}}>X(0)</span><Input size="middle" name='X'></Input><br></br><br></br>
                    <Button type="primary" size="large" onClick={()=>this.One_point(this.state.X0)}>Submit</Button>
                </Card>
                {this.state.isSubmit ? <div>
                    <Table rowKey="no" columns={table} dataSource={ArrConsole} bordered={true}></Table>
                </div> : null}
            </div>
        )
    }
}

export default One_point
