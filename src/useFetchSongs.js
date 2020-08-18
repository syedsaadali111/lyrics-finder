import axios from 'axios';
import { useEffect, useReducer} from 'react';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/';

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    HAS_NEXT_PAGE: 'has-next-page'
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {...state, loading: true, songs: []};
        case ACTIONS.GET_DATA:   
            return {...state, loading: false, songs: action.payload.songs, error: false};
        case ACTIONS.ERROR:
            return {...state, loading: false, error: action.payload.error, songs: []};
        case ACTIONS.HAS_NEXT_PAGE:
            return {...state, hasNextPage: action.payload.hasNextPage};
        default:
            return state;
    }
}

export default function useFetchSongs(searchString, page) {

    const [state, dispatch] = useReducer(reducer, {songs: [], loading: true, error: false, hasNextPage: false });

    useEffect( () => {

        let CancelTokenSource = axios.CancelToken.source();
        let CancelTokenSource2 = axios.CancelToken.source();

        dispatch({type: ACTIONS.MAKE_REQUEST});

        if(searchString === '') {
            axios.get(BASE_URL + 'chart.tracks.get?', {
                cancelToken: CancelTokenSource.token,
                params: {
                    apikey: 'f2932037ab3e1cef3bf989be4024a593',
                    page: page,
                    f_has_lyrics: true,
                    chart_name: 'top'
                }
            }).then( (res) => {
                console.log('result1', res);
                dispatch({
                    type: ACTIONS.GET_DATA,
                    payload: {
                        songs: res.data.message.body.track_list
                    }
                });
            }).catch((e) => {
                console.log("ERROR", e);
                if(axios.isCancel(e)) {
                    return;
                }

                dispatch({
                    type: ACTIONS.ERROR,
                    payload: {
                        error: true
                    }
                });
            });

            //check for next page
            axios.get(BASE_URL + 'chart.tracks.get?', {
                cancelToken: CancelTokenSource2.token,
                params: {
                    apikey: 'f2932037ab3e1cef3bf989be4024a593',
                    page: page + 1,
                    f_has_lyrics: true,
                    chart_name: 'top'
                }
            }).then( (res) => {
                console.log('result2', res);
                dispatch({
                    type: ACTIONS.HAS_NEXT_PAGE,
                    payload: {
                        hasNextPage: res.data.message.body.track_list.length !== 0
                    }
                });
            }).catch((e) => {
                console.log("ERROR2", e);
                if(axios.isCancel(e)) {
                    return;
                }

                dispatch({
                    type: ACTIONS.ERROR,
                    payload: {
                        error: true
                    }
                });
            });

        } else {
            axios.get(BASE_URL + 'track.search?', {
                cancelToken: CancelTokenSource.token,
                params: {
                    apikey: 'f2932037ab3e1cef3bf989be4024a593',
                    page: page,
                    q: searchString,
                    f_has_lyrics: true,
                    s_track_rating: 'desc'
                }
            }).then( (res) => {
                dispatch({
                    type: ACTIONS.GET_DATA,
                    payload: {
                        songs: res.data.message.body.track_list
                    }
                });
            }).catch((e) => {
                if(axios.isCancel(e)) {
                    return;
                }

                dispatch({
                    type: ACTIONS.ERROR,
                    payload: {
                        error: true
                    }
                });
                
            });

            //check for next page
            axios.get(BASE_URL + 'track.search?', {
                cancelToken: CancelTokenSource.token,
                params: {
                    apikey: 'f2932037ab3e1cef3bf989be4024a593',
                    page: page + 1,
                    q: searchString,
                    f_has_lyrics: true,
                    s_track_rating: 'desc'
                }
            }).then( (res) => {
                console.log("Has Next Page: ", res);
                dispatch({
                    type: ACTIONS.HAS_NEXT_PAGE,
                    payload: {
                        hasNextPage: res.data.message.body.track_list.length !== 0
                    }
                });
            }).catch((e) => {
                if(axios.isCancel(e)) {
                    return;
                }
                dispatch({
                    type: ACTIONS.ERROR,
                    payload: {
                        error: true
                    }
                });
            });
        }

        return () => {
            CancelTokenSource.cancel();
            CancelTokenSource2.cancel();
        };
    }, [searchString, page]);
    

    return state;
}