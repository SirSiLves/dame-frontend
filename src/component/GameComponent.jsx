import React, {Component} from 'react'
import GameDataService from '../service/GameDataService';
import BoardComponent from "./BoardComponent";
import {toast} from "react-toastify";
import NavBarComponent from "./NavBarComponent";
import WinnerComponent from "./WinnerComponent";
import "../stylesheet/body.css";


class GameComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionId: null,
            time: null,
            gamePicture: [],
            winnerField: null,
            moveHistory: null,
            botEnabled: false
        };
    }

    componentDidMount = async () => {

        const {data: sessionId} = await GameDataService.getHttpSessionId();
        this.setState({sessionId: sessionId});

        if (process.env.REACT_APP_DEBUG_MODE === "enabled") toast(sessionId);

        const {data} = await GameDataService.getTime();
        this.setState({time: data});

        if (process.env.REACT_APP_DEBUG_MODE === "enabled") toast(data);

        const startedStatus = await this.checkGameInstanceStatus();

        if (startedStatus) {
            toast.info("An already running game was found.");
            await this.setGamePicture();
        }
    };

    //initialize a 8x8 game
    onClickDefault = async () => {
        const {data: sessionId} = await GameDataService.getHttpSessionId();
        this.setState({sessionId: sessionId});

        this.setState({gamePicture: []});

        const {data} = await GameDataService.initializeGameDefault();

        await this.setGamePicture();
        await this.botEnabledMode(this.state.botEnabled);

        if (this.state.gamePicture !== 0) {
            toast.success(data);
        }
    };

    //initialize a 10x10 game
    onClickExtended = async () => {
        this.setState({gamePicture: []});

        const {data} = await GameDataService.initializeGameExtended();

        await this.setGamePicture();
        await this.botEnabledMode(this.state.botEnabled);

        if (this.state.gamePicture !== 0) {
            toast.success(data);
        }
    };

    //load the previous move
    onRevertMove = async () => {
        const {data} = await GameDataService.loadPreviousMove();

        await this.setGamePicture();

        if (this.state.gamePicture !== 0) {
            if (data === "There are no more moves available to revert.") toast.info(data);
            else toast.success(data);
        }
    };

    //set bot to on or off
    botEnabledMode = async (botToggleButton) => {
        await GameDataService.setPlayerMode(botToggleButton);
        this.setState({botEnabled: botToggleButton});
    };

    checkGameInstanceStatus = async () => {
        //if backend is restarted a new game instance is needed
        const {data: startedStatus} = await GameDataService.getGameStartedStatus();

        if (startedStatus === false) {
            if (process.env.REACT_APP_DEBUG_MODE === "enabled") {
                toast.warning("Running game instance is expired. New default game will be created.")
            }
            await this.onClickDefault();
        }

        return startedStatus;
    };

    //create a delay for the bot move in the UI
    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    //in bot mode: trigger a bot move after a move of the player
    handleGamePicture = async () => {
        await this.setGamePicture();
        await this.sleep(500);

        if (process.env.REACT_APP_DEBUG_MODE === "enabled") console.log("botEnabled State: " + this.state.botEnabled);

        //bot move will only executed, if it is enabled
        if(this.state.botEnabled){
            const runBotMove = await GameDataService.doBotMove();

            //refresh after a valid bot move was found
            if (runBotMove.data.isValid) {
                await this.sleep(500);
                await this.setGamePicture();
            }
        }
    };

    setGamePicture = async () => {

        const startedStatus = await this.checkGameInstanceStatus();

        if (startedStatus) {
            const {data} = await GameDataService.getStatus();
            if (process.env.REACT_APP_DEBUG_MODE === "enabled") console.log(data);

            let collectRowId = [...data.fieldMatrix];

            //set row id's
            for (let i = 0; i < data.fieldMatrix.length; i++) {
                collectRowId[i] = {
                    id: i,
                    fields: [...data.fieldMatrix[i]]
                };
            }
            this.setState({gamePicture: collectRowId});
            this.setState({moveHistory: data.moveHistory});
            this.setState({winnerField: data.winnerColor});

            //create a copy string for junit tests in the dame-api -> helps bug fixing
            // if (data.moveHistory !== null) {
            //     let moveEntriesCount = Object.keys(data.moveHistory).length;
            //
            //     if (moveEntriesCount > 0) {
            //         let unitTestString = "";
            //
            //         for (let i = 0; i < moveEntriesCount; i++) {
            //             if (data.moveHistory[i].lastHoppedField.field != null) {
            //                 unitTestString += "moveService.doHopMove(boardService.getField(" + data.moveHistory[i].lastCurrentField.field.fieldNumber + "), boardService.getField(" + data.moveHistory[i].lastTargetField.field.fieldNumber + "));\n"
            //             } else {
            //                 unitTestString += "moveService.doSimpleMove(boardService.getField(" + data.moveHistory[i].lastCurrentField.field.fieldNumber + "), boardService.getField(" + data.moveHistory[i].lastTargetField.field.fieldNumber + "));\n"
            //             }
            //         }
            //         if (process.env.REACT_APP_DEBUG_MODE === "enabled") console.log(unitTestString);
            //     }
            // }
        }
    };

    hideWinner = () => {
        this.setState({winnerField : null})
    }


    render() {

        return (
            <div className="gameWrapper">
                <nav>
                    <NavBarComponent
                        onStartDefault={this.onClickDefault}
                        onStartExtend={this.onClickExtended}
                        onRevertMove={this.onRevertMove}
                        botEnabledMode={this.botEnabledMode}
                    />
                </nav>
                <main>
                    <WinnerComponent winnerColor={this.state.winnerField}
                                     hideWinner={this.hideWinner}
                    />
                    <BoardComponent gamePicture={this.state.gamePicture}
                                    refreshBoard={this.handleGamePicture}
                                    moveHistory={this.state.moveHistory}/>
                </main>
                <footer>
                    <div>
                        Created by:
                        <a href="mailto:roman.bruehlmann@students.ffhs.ch"> Roman Brühlmann </a> &
                        <a href="mailto:yves.ruosch@students.ffhs.ch"> Yves Ruosch </a>
                    </div>
                    <div className="copyright">
                        <small>&copy; Copyright {new Date().getFullYear()} - All Rights Reserved</small>
                    </div>
                </footer>
            </div>

        )
    }
}

export default GameComponent
