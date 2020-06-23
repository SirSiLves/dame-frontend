import React, {Component} from 'react';
import crown from "../crown.png";
import "../stylesheet/winnerPopup.css";


class WinnerComponent extends Component {

    hideWinnerPopup = () =>  {
        this.props.hideWinner();
    }


    showWinner = (winnerColor) => {

        if (winnerColor === null) return null;

        return <div className="popup" id="winnerPopup">
            <div className="popup_inner">
                <div className="d-flex flex-column bd-highlight align-items-center m-4">
                    <img className="mb-2" src={crown} alt={"queen left"} height={100} width={100}/>
                    <h3>
                        Player
                        <span className="player"> {winnerColor} </span>
                        has won the game!
                    </h3>
                </div>
            </div>
        </div>
    };


    render() {
        return (
            <div onClick={this.hideWinnerPopup}>
                {this.showWinner(this.props.winnerColor)}
            </div>
        );
    }
}

export default WinnerComponent;
