import React, {Component} from 'react';
import GameComponent from "./component/GameComponent";
import "bootstrap/dist/css/bootstrap.css";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {


    render() {
        return (
            <div className="rootWrapper">
                <ToastContainer/>
                <GameComponent/>
            </div>
        );
    }
}

export default App;
