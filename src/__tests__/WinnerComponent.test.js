import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import WinnerComponent from "../component/WinnerComponent";

it('renders WinnerComponent without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WinnerComponent />, div);
});

describe('WinnerComponent Component', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<WinnerComponent debug />);

        expect(component).toMatchSnapshot();
    });
});