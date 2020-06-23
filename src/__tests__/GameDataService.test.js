import axios from 'axios';
import GameDataService from '../service/GameDataService';

jest.mock('axios');

describe('Mock the getTime method', () => {

    test('should fetch the time', () => {
        const time = "Hello, the time at the server is now Fri May 08 19:03:58 CEST 2020";
        const resp = {data: time};
        axios.get.mockResolvedValueOnce(resp);

        return GameDataService.getTime().then(data => expect(data).toEqual(resp));
    });

    test('getTime should return error', async () => {
        const getError = new Error('network error');
        axios.get.mockRejectedValue(getError);
        await GameDataService.getTime().catch(err => {
            expect(err).toEqual(getError);
        })
    })

});


describe('Mock the getStones method', () => {

    test('should fetch getStones', () => {
        const stones = stonesMock;
        const resp = {data: stones};
        axios.get.mockResolvedValueOnce(resp);

        return GameDataService.getStones().then(data => expect(data).toEqual(resp));
    });

    test('getStones should return error', async () => {
        const getError = new Error('network error');
        axios.get.mockRejectedValue(getError);
        await GameDataService.getStones().catch(err => {
            expect(err).toEqual(getError);
        })
    });

    let stonesMock = [
        {
            "stoneId": 0,
            "stoneColor": "BLACK",
            "alive": true,
            "queen": false
        }
    ];
});

describe('Mock the game initialize method', () => {
    test('initialize Game default', () => {
        const resp = "Game 8x8 successfully initialized.";
        axios.get.mockResolvedValueOnce(resp);

        return GameDataService.initializeGameDefault().then(data => expect(data).toEqual(resp));
    });

    test('initializeGameDefault should return error', async () => {
        const getError = new Error('network error');
        axios.get.mockRejectedValue(getError);
        await GameDataService.initializeGameDefault().catch(err => {
            expect(err).toEqual(getError);
        })
    });
});

describe('Mock the game initialize extend method', () => {
    test('initialize Game extended', () => {
        const resp = "Game 10x10 successfully initialized.";
        axios.get.mockResolvedValueOnce(resp);

        return GameDataService.initializeGameExtended().then(data => expect(data).toEqual(resp));
    });

    test('initializeGameExtended should return error', async () => {
        const getError = new Error('network error');
        axios.get.mockRejectedValue(getError);
        await GameDataService.initializeGameExtended().catch(err => {
            expect(err).toEqual(getError);
        })
    });
});

describe('Mock the getGameStartedStatus method', () => {
    test('getGameStartedStatus', () => {
        const resp = false;
        axios.get.mockResolvedValueOnce(resp);

        return GameDataService.getGameStartedStatus().then(data => expect(data).toEqual(resp));
    });

    test('getGameStartedStatus should return error', async () => {
        const getError = new Error('network error');
        axios.get.mockRejectedValue(getError);
        await GameDataService.getGameStartedStatus().catch(err => {
            expect(err).toEqual(getError);
        })
    });
});

describe('Mock the getStatus method', () => {
    test('getStatus', () => {
        const resp = {
            "fieldMatrix": [
                [
                    {
                        "fieldColor": "SANDYBROWN",
                        "fieldNumber": 0,
                        "stone": null
                    },
                    {
                        "fieldColor": "BROWN",
                        "fieldNumber": 1,
                        "stone": {
                            "stoneId": 0,
                            "stoneColor": "BLACK",
                            "queen": false,
                            "alive": true
                        }
                    }
                ],
                [
                    {
                        "fieldColor": "BROWN",
                        "fieldNumber": 8,
                        "stone": {
                            "stoneId": 4,
                            "stoneColor": "BLACK",
                            "queen": false,
                            "alive": true
                        }
                    },
                    {
                        "fieldColor": "SANDYBROWN",
                        "fieldNumber": 9,
                        "stone": null
                    },
                ]
            ]
        };
        axios.get.mockResolvedValueOnce(resp);

        return GameDataService.getStatus().then(data => expect(data).toEqual(resp));
    });

    test('getGameStartedStatus should return error', async () => {
        const getError = new Error('network error');
        axios.get.mockRejectedValue(getError);
        await GameDataService.getStatus().catch(err => {
            expect(err).toEqual(getError);
        })
    });
});

describe('Mock the getHttpSessionId method', () => {
    test('getHttpSessionId', () => {
        const resp = "Your http session id is E17E8708118EE6E85C3D8EEB9B065017";
        axios.get.mockResolvedValueOnce(resp);

        return GameDataService.getHttpSessionId().then(data => expect(data).toEqual(resp));
    });

    test('getHttpSessionId should return error', async () => {
        const getError = new Error('network error');
        axios.get.mockRejectedValue(getError);
        await GameDataService.getHttpSessionId().catch(err => {
            expect(err).toEqual(getError);
        })
    });
});

describe('Mock the doMove method', () => {
    test('doMove', () => {
        const request = {
            "currentField": {},
            "targetField": {}
        };
        axios.post.mockResolvedValueOnce(request);

        return GameDataService.doMove().then(data => expect(data).toEqual(request));
    });

    test('doMove should return error', async () => {
        const getError = new Error('network error');
        axios.post.mockRejectedValue(getError);
        await GameDataService.doMove().catch(err => {
            expect(err).toEqual(getError);
        })
    });
});

describe('Mock the setPlayerMode method', () => {
    test('setPlayerMode', () => {
        const request = false;
        axios.post.mockResolvedValueOnce(request);

        return GameDataService.doMove().then(data => expect(data).toEqual(request));
    });

    test('setPlayerMode should return error', async () => {
        const getError = new Error('network error');
        axios.post.mockRejectedValue(getError);
        await GameDataService.setPlayerMode().catch(err => {
            expect(err).toEqual(getError);
        })
    });
});