import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import FieldLineComponent from "../component/FieldLineComponent";

it('renders FieldLineComponent without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FieldLineComponent key={1} fieldRow={fieldRow}/>, div);
});

describe('FieldLineComponent Component', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<FieldLineComponent key={1} fieldRow={fieldRow} debug />);

        expect(component).toMatchSnapshot();
    });
});

const fieldRow = [
    {
        fieldColor: "SANDYBROWN",
        fieldNumber: 0,
        stone: null
    },
    {
        fieldColor: "BROWN",
        fieldNumber: 1,
        stone: {stoneId: 0, stoneColor: "BLACK", queen: false, alive: true}
    }
];