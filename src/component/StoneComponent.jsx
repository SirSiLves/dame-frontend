import React, {Component} from 'react';
import crown from '../crown.png';
import '../stylesheet/stone.css';


class StoneComponent extends Component {

    render() {
        return (
            <>
                {this.getDiv()}
            </>
        )
    }

    //creates a empty div if no stone is there or place the stone on it
    getDiv() {
        if (this.props.stone == null) {
            return <div/>
        } else {
            return <div
                className={this.getStyles()}
                onClick={this.props.onClick}
            >
                {this.isQueen()}
            </div>
        }
    }

    //creates the styles for a stone if a stone is on the field
    getStyles() {
        let styles = "stone ";
        if (this.props.stone == null) {

        } else {
            //If there is a Stone, do a lot of stuff
            styles += this.props.stone.stoneColor.toLowerCase();

            styles += this.props.stone.alive ? "" : " hidden";
        }
        return styles;
    }

    //if the stone is a queen, add the crown image
    isQueen() {
        if (this.props.stone.queen) {
            return <img src={crown} className="queen" alt={"This is a queen"} height={40} width={40}/>
        } else {

        }
    }
}

export default StoneComponent
