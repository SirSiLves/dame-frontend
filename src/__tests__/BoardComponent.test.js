import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import BoardComponent from '../component/BoardComponent';

it('renders Board without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BoardComponent gamePicture={gamePicture} />, div);
});

describe('Board Component', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<BoardComponent gamePicture={gamePicture} debug />);

        expect(component).toMatchSnapshot();
    });
});

const gamePicture = [
    {
        id: 0,
        fields: [
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
        ]
    },
    {
        id: 1,
        fields: [
            {
                fieldColor: "BROWN",
                fieldNumber: 8,
                stone: {stoneId: 4, stoneColor: "BLACK", queen: false, alive: true}
            },
            {
                fieldColor: "SANDYBROWN",
                fieldNumber: 9,
                stone: null
            }
        ]
    }
    ];