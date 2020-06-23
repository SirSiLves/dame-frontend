import React, {Component} from 'react';
import goBack from "../goback.png";
import '../stylesheet/toggleSwitch.css'


class NavBarComponent extends Component {

    constructor(props) {
        super(props);
        this.botEnabledCheckbox = React.createRef();
    }

    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container justify-content-center">
                    <div className="pr-0">
                        <h1>Let's play a game</h1>
                    </div>
                    <div className="d-flex mt-2 align-items-center">
                        <div className="p-2">
                            <button className="btn btn-dark" onClick={this.props.onStartDefault}>
                                8 x 8
                            </button>
                        </div>
                        <div className="p-0">
                            <h1>/</h1>
                        </div>
                        <div className="p-2">
                            <button className="btn btn-dark" onClick={this.props.onStartExtend}>
                                10 x 10
                            </button>
                        </div>
                        <div className="d-flex flex-wrap">
                            <div className="p-0 p-md-2 ml-1 ml-md-0 mt-1">
                                <label className="switch">
                                    <input className="switch-input" type="checkbox" ref={this.botEnabledCheckbox}
                                           onClick={() => this.props.botEnabledMode(this.botEnabledCheckbox.current.checked)}/>
                                    <span className="switch-label" data-on="Bot On" data-off="Bot Off" />
                                    <span className="switch-handle" />
                                </label>
                            </div>
                            <div className="p-0 p-md-2 ml-2 ml-md-0 mb-1 mt-1">
                                <img src={goBack} alt={"Revert move"} height={40} width={40} onClick={this.props.onRevertMove}/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBarComponent;
