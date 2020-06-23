import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import StoneComponent from "../component/StoneComponent";

it('renders StoneComponent without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StoneComponent />, div);
});

describe('StoneComponent Component', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<StoneComponent stone={stone} debug />);

        expect(component).toMatchSnapshot();
    });
});

const stone = {stoneId: 0, stoneColor: "BLACK", queen: false, alive: true};