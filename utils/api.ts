import axios from "axios";
import { music } from "@/types/music";
const apiURL = "https://api.music.nextyoutube.kro.kr";
const pipeURL = "https://pipedapi.r4fo.com";
export function searchMusic(query: string) {
    return axios.get(apiURL + "/searchMusic", {
        params: {
            q: query,
        },
    });
}
export function searchPlaylist(query: string) {
    return axios.get(apiURL + "/searchPlaylist", {
        params: {
            q: query,
        },
    });
}
export function readPlaylist(id: string) {
    return axios.get(apiURL + "/readPlaylist", {
        params: {
            id: id,
        },
    });
}
export function getVideoDetails(videoId: string) {
    return axios.get(`${pipeURL}/streams/${videoId}`, {});
}
