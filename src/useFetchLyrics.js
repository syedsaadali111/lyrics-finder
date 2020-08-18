import axios from 'axios';
import {useState, useEffect} from 'react';

export default function useFetchLyrics(track_id) {

    const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/';

    const [lyrics, setLyrics] = useState(null);
    const [lyricsLoading, setLyricsLoading] = useState(true);
    const [lyricsError, setLyricsError] = useState(false);

    useEffect( () => {

        let CancelTokenSource = axios.CancelToken.source();

        if(track_id) {
            setLyrics(null);
            setLyricsLoading(true);
            setLyricsError(false);
            axios.get(BASE_URL + 'track.lyrics.get?', {
                cancelToken: CancelTokenSource.token,
                params: {
                    apikey: 'f2932037ab3e1cef3bf989be4024a593',
                    track_id: track_id
                }
            }).then( (res) => {
                setLyrics(res.data.message.body.lyrics.lyrics_body);
                setLyricsLoading(false);
                setLyricsError(false);
            }).catch((e) => {
                if(axios.isCancel(e)) {
                    console.log("cancelled");
                    return;
                }

                setLyricsLoading(false);
                setLyricsError(true);
                setLyrics(null);
            });
        } 

        return () => {
            CancelTokenSource.cancel();
        };
    }, [track_id]);
    

    return { lyrics, lyricsLoading, lyricsError };
}