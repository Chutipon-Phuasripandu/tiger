import React, {Component} from 'react';
import {Card, Input, Button,} from 'antd';
import 'antd/dist/antd.css';
import {compile,derivative} from 'mathjs';
import axios from 'axios'

var y, error, exact;
class Forward_OH extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            degree: 0,
            showOutputCard: false,
            showinput: true 
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    databaseAPI = async()=>{
        var response = await axios.get('http://localhost:3010/api/users/showforward').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            Order:response['data'][0]['Order'],
            x:response['data'][0]['x'],
            h:response['data'][0]['h']
        })
        alert(this.state.fx)
        alert(this.state.Order)
        alert(this.state.x)
        alert(this.state.h)
        this.Forward_OH(this.state.x,this.state.h,this.state.Order);
    }
    Forward_OH(x, h, degree) {
        switch (degree) {
            case 1:
                y = (this.func(x+(1*h)) - this.func(x)) / h
                break;
            case 2:
                y = (this.func(x+(2*h)) - 2*this.func(x+(1*h)) + this.func(x)) / Math.pow(h, 2)
                break;
            case 3:
                y = (this.func(x+(3*h)) - 3*this.func(x+(2*h)) + 3*this.func(x+(1*h)) - this.func(x)) / Math.pow(h, 3)
                break;
            default:
                y = (this.func(x+(4*h)) - 4*this.func(x+(3*h)) + 6*this.func(x+(2*h)) - 4*this.func(x+(1*h)) + this.func(x)) / Math.pow(h, 4) 
        }
        exact = this.funcDiff(x, degree)
        error = Math.abs((y - exact) / y)*100
        this.setState({
            showOutputCard: true,
            showinput: false
        })
    }

    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    funcDiff(X, degree) {
        var temp = this.state.fx, expr 
        for (var i=1 ; i<=degree ; i++) {
            temp = derivative(temp, 'x')
            expr = temp
        }
        
        let scope = {x:parseFloat(X)}
        return expr.eval(scope)
    }
    render() {
        return(
            <div style={{padding: "10px" }}>
            <div>
                <br></br><br></br><br></br><br></br>
                <span style={{ color: 'Black', fontSize: '24px' }}>Forward Divided-Difference O(h)</span>
                <br></br><br></br>
                    <Card
                    
                     bordered
                     style={{ backgroundColor: 'rgb(55, 76, 104)', borderRadius: '15px' }}
                     onChange={this.handleChange}
                    id="inputCard"
                    >
                        {this.state.showinput &&
                            <div>
                                <span style={{ color: 'white', fontSize: '24px' }}>F(x)</span><Input size="large" name="fx"></Input>
                                <span style={{ color: 'white', fontSize: '24px' }}>Order derivative</span><Input size="large" name="degree"></Input>
                                <span style={{ color: 'white', fontSize: '24px' }}>X</span><Input size="large" name="x"></Input>
                                <span style={{ color: 'white', fontSize: '24px' }}>H</span><Input size="large" name="h"></Input><br/><br/>
                                <Button type="primary" size="large" onClick= {()=>this.Forward_OH(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))}>Submit</Button><br></br><br></br>
                                <Button type="primary" danger size="large" onClick= {()=>this.databaseAPI()}>Exampleinput</Button><br></br>
                            </div>}
                    {this.state.showOutputCard && 
                        <div>
                            <p style={{ color: 'white', fontSize: '24px' }}>Answer : {y.toFixed(6)}</p>
                            <p style={{ color: 'white', fontSize: '24px' }}>Exact : {exact.toFixed(6)}</p>
                            <p style={{ color: 'white', fontSize: '24px' }}>Error : {error.toFixed(4)} %</p>
                        </div>
                    }
                    </Card>     
             </div>    
             </div>            
            
        );
    }
}
export default Forward_OH;