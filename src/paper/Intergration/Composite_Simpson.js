import React, {Component} from 'react';
import {Card, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import {compile} from 'mathjs';
import axios from 'axios' ;
var Algebrite = require('algebrite')

var I, h, error, exact;
class Composite_Simpson extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
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
        var response = await axios.get('http://localhost:3010/api/users/showCompoSimp').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            n:response['data'][0]['n'],
            a:response['data'][0]['a'],
            b:response['data'][0]['b']
        })
        alert(this.state.fx)
        alert(this.state.n)
        alert(this.state.a)
        alert(this.state.b)
        this.Composite_Simpson(this.state.n,this.state.a,this.state.b);
    }
    Composite_Simpson(a, b, n) {
        h = (b-a)/n ; 
        I = (h / 3) * (this.func(a) + this.func(b) + 4*this.summationFunction(1, n, h) + 2*this.summationFunction(2, n, 2*h))

        exact = this.Intergratefunc(a,b)
        error = Math.abs((exact-I) / I)*100
        this.setState({
            showOutputCard: true,
            showinput: false
        })
    }
    summationFunction(start, n, h) {
        var sum = 0
        if (start % 2 === 0) {
            n += 2
        }
        var xi = parseInt(this.state.a) + h
        for (var i=start ; i<n ;) {
            i+=2
            sum += this.func(xi)
            xi = parseInt(this.state.a) + i*h
            //alert(i*h)
        }
        
        return sum
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    Intergratefunc(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({x:b}) - expr.eval({x:a})
    }
    render() {
        return(
            <div style={{padding: "10px" }}>
            <div>
                <br></br><br></br><br></br><br></br>
                <span style={{ color: 'Black', fontSize: '24px' }}>Composite Simpson Rule's</span>
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
                                <span style={{ color: 'white', fontSize: '24px' }}>N</span><Input size="large" name="n"></Input>
                                <span style={{ color: 'white', fontSize: '24px' }}>Start</span><Input size="large" name="a"></Input>
                                <span style={{ color: 'white', fontSize: '24px' }}>End</span><Input size="large" name="b"></Input><br/><br/>
                                <Button type="primary" size="large" onClick= {()=>this.Composite_Simpson(parseFloat(this.state.a), parseFloat(this.state.b), parseInt(this.state.n))}>Submit</Button><br></br><br></br>
                                <Button type="primary" danger size="large" onClick= {()=>this.databaseAPI()}>Exampleinput</Button><br></br>
                            </div>}
                    {this.state.showOutputCard && 
                        <div>
                            <p style={{ color: 'white', fontSize: '24px' }}>Answer : {I.toFixed(6)}</p>
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
export default Composite_Simpson;