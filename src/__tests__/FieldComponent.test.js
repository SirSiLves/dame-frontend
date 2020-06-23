import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import FieldComponent from "../component/FieldComponent";

it('renders FieldComponent without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FieldComponent key={1} field={field} />, div);
});

describe('FieldComponent Component', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<FieldComponent key={1} field={field} debug/>);

        expect(component).toMatchSnapshot();
    });
});

const field =
    {
        fieldColor: "SANDYBROWN",
        fieldNumber: 0,
        stone: null
    };