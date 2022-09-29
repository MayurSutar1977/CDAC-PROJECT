import React from 'react'

class DemoComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: "",
        }
        this.onChange=this.onChange.bind(this);
    }
    onChange(e){
        const {name,value}=e.target;
        this.setState({...this.state,[name]:value})
        console.log(this.state.name);
    }
    render(){
        return <>
        <input type="text" id="name" name="name" value={this.state.name} onChange={this.onChange}></input>
    
        </>
    }
}
export default DemoComponent;