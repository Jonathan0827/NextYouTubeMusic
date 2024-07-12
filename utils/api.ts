import axios from "axios";
import { music } from "@/types/music";
const apiURL = "https://api.music.nextyoutube.kro.kr";
const pipeURL = "https://pipedapi.r4fo.com";
export async function searchMusic(query: string) {
    try {
        await axios
            .get(apiURL + "/searchMusic", {
                params: {
                    q: query,
                },
            })
            .then((res) => {
                console.log("no yee");
                return {
                    data: res.data.data.data,
                    status: res.data.data.status,
                    message: "success",
                };
            });
    } catch (err) {
        console.log("yee");
        return {
            data: {},
            status: 500,
            message: "error while fetching data",
        };
        // console.error(err);
    }
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
