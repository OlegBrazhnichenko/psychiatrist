import React, {Component} from 'react';
import HomeScreenComponent from './components';
import {connect} from 'react-redux';

class Home extends Component {


    componentDidMount() {
        console.warn("State: ",this.props.state); // just for debug, remove on prod
    }

    render(){

        return(
            <HomeScreenComponent />
        )
    }
}

function mapStateToProps(state) {
    return {
        state: state,
    }
}

export default connect(mapStateToProps)(Home);