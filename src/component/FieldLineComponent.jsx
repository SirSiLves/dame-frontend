import React, {Component} from 'react'
import FieldComponent from "./FieldComponent";


class FieldLineComponent extends Component {
    constructor(props) {
        super(props);
        this.handleFieldClick = this.handleFieldClick.bind(this);
        this.state = {
            fieldRow: this.props.fieldRow
        };
    }

    //passing data between components
    currentFieldCallbackFieldLine = (dataFromChild) => {
        this.props.currentFieldCallbackBoard(dataFromChild);
    };

    //passing data between components
    handleFieldClick(field) {
        this.props.targetFieldCallbackBoard(field);
    };


    render() {

        return (
            <div className="fieldRow">
                {
                    this.props.fieldRow.map(field => (
                        <FieldComponent key={field.fieldNumber} field={field}
                                        currentFieldCallbackFieldLine={this.currentFieldCallbackFieldLine}
                                        onFieldClick={this.handleFieldClick.bind(this, field)}
                                        moveHistory={this.props.moveHistory}
                        />
                    ))
                }
            </div>
        )
    }


}

export default FieldLineComponent
