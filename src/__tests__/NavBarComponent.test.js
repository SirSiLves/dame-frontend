import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import NavBarComponent from "../component/NavBarComponent";


it('renders NavBarComponent without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavBarComponent />, div);
});

describe('NavBarComponent Component', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<NavBarComponent debug />);

        expect(component).toMatchSnapshot();
    });
});
