import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import GameComponent from '../component/GameComponent';

it('renders GameComponent without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GameComponent />, div);
});

describe('App Component', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<GameComponent debug />);

        expect(component).toMatchSnapshot();
    });
});