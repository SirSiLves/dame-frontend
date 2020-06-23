import React, {Component} from 'react'
import FieldLineComponent from "./FieldLineComponent";
import GameDataService from "../service/GameDataService";
import {toast} from "react-toastify";


class BoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshBoard: this.props.refreshBoard,
            currentField: null,
            targetField: null,
            gamePicture: this.props.gamePicture
        };
    }


    //passing data between components
    currentFieldCallbackBoard = (dataFromChild) => {
        this.setState({currentField: dataFromChild});
    };

    //passing data between components
    targetFieldCallbackBoard = async (dataFromChild) => {
        if (this.state.currentField != null) {
            await this.setState({targetField: dataFromChild});

            await this.doMove();

            await this.props.refreshBoard();

        }
    };

    doMove = async () => {

        let currentField = this.state.currentField;
        let targetField = this.state.targetField;
        let requestObject = {
            currentField,
            targetField
        };

        const {data} = await GameDataService.doMove(requestObject);

        await this.setState({currentField: null});
        await this.setState({targetField: null});

        if(!data.isValid) toast.error(data.validationMessage);

        return data;
    };

    render() {

        return (
            <div>
                {
                    this.props.gamePicture.map(fieldRow => (
                        <FieldLineComponent key={fieldRow.id} fieldRow={fieldRow.fields}
                                            currentFieldCallbackBoard={this.currentFieldCallbackBoard}
                                            targetFieldCallbackBoard={this.targetFieldCallbackBoard}
                                            moveHistory={this.props.moveHistory}
                        />
                    ))
                }
            </div>
        )
    }
}

export default BoardComponent
