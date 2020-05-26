import { utility } from "../utils/dispatch_utility";
import { connect } from "react-redux";
import { Component } from "react";
import * as React from 'react';
import Login from './login';
interface IAppProps {
    router?: any;
    location: any;
    Dispatch: any;
    history: any;
    PageLocation: any;
}

class App extends Component<IAppProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            response: ""
        }
    }

    componentDidMount() {
        
    }
  
    render() {
        // let { captchaCode } = this.props;
        console.log('app=========================.....')
        return (
            <div className="app">
                <Login/>
            </div>
        );
    }
}
function mapStoreToProps(store): Partial<IAppProps> {
    return {
        PageLocation: store.router.location,
    };
}
export default connect(mapStoreToProps, utility.mapDispatchToProps)(App);
