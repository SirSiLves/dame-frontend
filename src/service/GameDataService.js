import HttpService from "./HttpServices";

const GAME_API_URL = process.env.REACT_APP_API_ENDPOINT;

//see Swagger documentation of the API {$backendURL}/swagger-ui.html
class CourseDataService {

    getTime = async () => {
        return await HttpService.get(`${GAME_API_URL}/test/getTime`, {withCredentials: true});
    };

    initializeGameDefault = async () => {
        return await HttpService.get(`${GAME_API_URL}/initialize/default`, {withCredentials: true});
    };

    initializeGameExtended = async () => {
        return await HttpService.get(`${GAME_API_URL}/initialize/extended`, {withCredentials: true});
    };

    getGameStartedStatus = async () => {
        return await HttpService.get(`${GAME_API_URL}/initialize/getGameStartedStatus`, {withCredentials: true});
    };

    getStatus = async () => {
        return await HttpService.get(`${GAME_API_URL}/game/getGamePicture`, {withCredentials: true});
    };

    getStones = async () => {
        return await HttpService.get(`${GAME_API_URL}/game/getStones`, {withCredentials: true});
    };

    loadPreviousMove = async () => {
        return await HttpService.post(`${GAME_API_URL}/move/loadPreviousMove`, null, {withCredentials: true});
    };

    getHttpSessionId = async () => {
        return await HttpService.get(`${GAME_API_URL}/test/getHttpSessionId`, {withCredentials: true});
    };

    doMove = async (params) => {
        return await HttpService.post(`${GAME_API_URL}/move/default`, params, {withCredentials: true})
    };

    setPlayerMode = async (params) => {
        return await HttpService.post(`${GAME_API_URL}/game/setBotStatus`, params, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    };

    doBotMove = async () => {
        return await HttpService.post(`${GAME_API_URL}/move/doBotMove`, null, {withCredentials: true});
    };

}

export default new CourseDataService()