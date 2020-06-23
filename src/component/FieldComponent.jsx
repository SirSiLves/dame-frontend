import React, {Component} from 'react';
import StoneComponent from "./StoneComponent";
import "../stylesheet/field.css";
import crown from "../crown.png";


class FieldComponent extends Component {
    constructor(props) {
        super(props);
        this.handleStoneClick = this.handleStoneClick.bind(this);
    }

    render() {

        return (
            <div className={this.getStyles()} onClick={this.getOnFieldClick()}>
                {this.setFieldNumber()}
                {this.showMove()}
                <StoneComponent stone={this.props.field.stone} onClick={this.handleStoneClick}/>
            </div>
        )
    }

    //animation handling after a move was triggered
    showMove() {
        if (this.props.moveHistory !== null && this.props.moveHistory !== undefined) {

            let moveEntriesCount = Object.keys(this.props.moveHistory).length;
            let lastMoveEntry = this.props.moveHistory[moveEntriesCount - 1];

            if (moveEntriesCount > 0) {

                if (lastMoveEntry.lastHoppedField.field != null) {
                    //animation killed stone
                    if (this.props.field.fieldNumber === lastMoveEntry.lastHoppedField.field.fieldNumber) {
                        let styleClass = "stone stone-killed ";
                        lastMoveEntry.lastTargetField.stone.stoneColor.toLowerCase() === "black" ? styleClass += "white" : styleClass += "black";
                        if(lastMoveEntry.lastHoppedField.queenBefore){
                            return <div className={styleClass}>
                                <img src={crown} className="queen" alt={"This is a queen"} height={40} width={40}/>
                            </div>
                        }
                        return <div className={styleClass}/>
                    }

                    //go through the history, if double (or more) hop was done
                    for (let i = moveEntriesCount - 1; i > 0; i--) {
                        if (this.props.moveHistory[i].lastCurrentField.field.fieldNumber === this.props.moveHistory[i - 1].lastTargetField.field.fieldNumber) {
                            //show stopover
                            if (this.props.field.fieldNumber === this.props.moveHistory[i - 1].lastTargetField.field.fieldNumber) {
                                if (lastMoveEntry.lastTargetField.field.stone != null) {
                                    let styleClass = "stone stone-hide " + lastMoveEntry.lastTargetField.field.stone.stoneColor.toLowerCase();

                                    if(this.props.moveHistory[i - 1].lastTargetField.queenBefore){
                                        return <div className={styleClass}>
                                            <img src={crown} className="queen" alt={"This is a queen"} height={40} width={40}/>
                                        </div>
                                    }
                                    return <div className={styleClass}/>
                                }
                            }

                            //animation killed stone
                            if (this.props.moveHistory[i - 1].lastHoppedField.field != null &&
                                this.props.field.fieldNumber === this.props.moveHistory[i - 1].lastHoppedField.field.fieldNumber) {
                                let styleClass = "stone stone-killed ";
                                lastMoveEntry.lastTargetField.stone.stoneColor.toLowerCase() === "black" ? styleClass += "white" : styleClass += "black";

                                if(this.props.moveHistory[i - 1].lastHoppedField.queenBefore){
                                    return <div className={styleClass}>
                                        <img src={crown} className="queen" alt={"This is a queen"} height={40} width={40}/>
                                    </div>
                                }
                                return <div className={styleClass}/>
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    }

    //build the className for the field
    getStyles() {
        let styles = "";
        styles += this.props.field.fieldColor.toLowerCase();
        styles += " ";
        styles += "field";
        return styles;
    }

    //choose the clicked field
    getOnFieldClick() {
        if (this.props.field.stone) {
            return null
        } else {
            return this.props.onFieldClick
        }
    }

    //shows the field numbers in the debug mode
    setFieldNumber() {
        if (process.env.REACT_APP_DEBUG_MODE === "enabled") return this.props.field.fieldNumber
    }

    //passing up the data to the parent component
    handleStoneClick() {
        this.props.currentFieldCallbackFieldLine(this.props.field);
    }
}

export default FieldComponent
