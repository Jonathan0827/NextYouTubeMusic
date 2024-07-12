"use client";
import { useSearchParams } from "next/navigation";
import Thumbnail from "@/components/Thumbnail";
import { useEffect, useState, Suspense } from "react";
import { getVideoDetails, readPlaylist } from "@/utils/api";
import { musicv2 } from "@/types/music";
import { Button, Progress } from "@nextui-org/react";
import "react-h5-audio-player/lib/styles.css";
import {
    IoPlay,
    IoPlaySkipBack,
    IoPlaySkipForward,
    IoPause,
} from "react-icons/io5";
import { VideoDetails } from "@/types/video-details";
import {isNil} from "@toss/utils"
function Play() {
    const type = useSearchParams().get("type") || "";
    const id = useSearchParams().get("id") || "";
    const [currentMusic, setCurrentMusic] = useState(0);
    const [musics, setMusics] = useState<musicv2[]>([]);
    const [detail, setDetail] = useState<VideoDetails>();
    const [loading, setLoading] = useState(true);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState("");
    const [current, setCurrent] = useState("");
    useEffect(() => {
        console.log(type, id);
        readPlaylist(id).then((res) => {
            setMusics(res.data.data.data.content);
            console.log(res.data.data.data.content);
        });
    }, [id]);
    useEffect(() => {
        if (musics.length === 0 || isNil(musics)) return;
        console.log(typeof musics[currentMusic].videoId);
        if (typeof musics[currentMusic].videoId === "object") {
            setCurrentMusic(currentMusic + 1);
            return;
        }
        getVideoDetails(musics[currentMusic].videoId).then((res) => {
            setLoading(false);
            setDetail(res.data);
            console.log(detail?.audioStreams[0].url);
            const mPlayer = document.getElementById(
                "MusicPlayer"
            ) as HTMLAudioElement;
            // setTimeout(() => {
            //     mPlayer?.load();
            //     mPlayer?.play();
            // }, 1000);
        });
    }, [currentMusic, musics]);
    return (
        <main>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <main className="flex justify-center items-center align-middle h-[95vh] flex-col">
                    <Thumbnail vid={musics[currentMusic].videoId} />

                    <p className="text-4xl font-bold line-clamp-1">
                        {musics[currentMusic].name}
                    </p>
                    <p className="text-lg text-zinc-400">
                        {musics[currentMusic].author.name}
                    </p>
                    <div className="flex flex-row w-[50vh] max-w-[90vw]">
                        <p className="mr-auto">{current}</p>
                        <p>-{duration}</p>
                    </div>
                    <Progress
                        className="w-[50vh] max-w-[90vw] pt-3 pb-1"
                        value={progress}
                        aria-label="progress bar"
                        size="sm"
                    />

                    <audio
                        autoPlay
                        controls
                        className="invisible h-0"
                        id="MusicPlayer"
                        src={detail?.audioStreams[0].url}
                        onTimeUpdate={(e) => {
                            const audio = e.target as HTMLAudioElement;
                            let date = new Date(0);
                            date.setSeconds(audio.currentTime);
                            setCurrent(convertTime(audio.currentTime));
                            setDuration(
                                convertTime(
                                    audio.duration - audio.currentTime || 0
                                ) || "00:00"
                            );
                            const progress =
                                (audio.currentTime / audio.duration) * 100;
                            // console.log(progress);
                            setProgress(progress);
                        }}
                        onPlay={() => {
                            setPlaying(true);
                        }}
                        onPause={() => {
                            setPlaying(false);
                        }}
                        onEnded={() => {
                            setCurrentMusic((prev) => prev + 1);
                            // document.getElementById("MusicPlayer")?
                        }}
                        onLoadedData={(e) => {
                            console.log("loaded");
                            const audio = e.target as HTMLAudioElement;
                            let date = new Date(0);
                            date.setSeconds(audio.currentTime);
                            setCurrent(convertTime(audio.currentTime));
                            setDuration(
                                convertTime(
                                    audio.duration - audio.currentTime || 0
                                ) || "00:00"
                            );
                            const progress =
                                (audio.currentTime / audio.duration) * 100;
                            // console.log(progress);
                            setProgress(progress);
                            // mPlayer.load();
                        }}
                    ></audio>
                    <div className="w-[50vh] max-w-[90vw] flex justify-center flex-row">
                        <Button
                            onPress={() => {
                                setCurrentMusic(currentMusic - 1);
                                document
                                    .getElementById("backBtn")
                                    ?.classList.add("backAnimate");
                                setTimeout(() => {
                                    document
                                        .getElementById("backBtn")
                                        ?.classList.remove("backAnimate");
                                }, 500);
                            }}
                            isIconOnly
                            variant="light"
                            id="backBtn"
                            className="relative"
                        >
                            <IoPlaySkipBack size={30} />
                        </Button>
                        <div className="relative mx-auto">
                            {/* <motion.div
                                initial={{ scale: 0 }}
                                animate={playing ? { scale: 1 } : { scale: 0 }}
                                // transition={{ type: "spring" }}
                            > */}
                            <Button
                                className={`${
                                    !playing ? "zoom-out" : "zoom-in"
                                    // "border-zinc-300"
                                } mr-[-20px] relative`}
                                // style={{
                                //     left: "50%",
                                // }}
                                onPress={() => {
                                    const mPlayer = document.getElementById(
                                        "MusicPlayer"
                                    ) as HTMLAudioElement;
                                    if (mPlayer.paused) {
                                        mPlayer.play();
                                        setPlaying(true);
                                    } else {
                                        mPlayer.pause();
                                        setPlaying(false);
                                    }
                                }}
                                isIconOnly
                                variant="light"
                                // className="mx-auto"
                            >
                                <IoPause size={30} />
                            </Button>
                            {/* </motion.div> */}
                            {/* <motion.div
                                initial={{ scale: 0 }}
                                animate={!playing ? { scale: 1 } : { scale: 0 }}
                                // transition={{ type: "spring" }}
                            > */}
                            <Button
                                className={`${
                                    playing ? "zoom-out" : "zoom-in"
                                    // "border-zinc-300"
                                } ml-[-20px] relative`}
                                // style={{
                                //     left: "50%",
                                // }}
                                onPress={() => {
                                    const mPlayer = document.getElementById(
                                        "MusicPlayer"
                                    ) as HTMLAudioElement;
                                    if (mPlayer.paused) {
                                        mPlayer.play();
                                        setPlaying(true);
                                    } else {
                                        mPlayer.pause();
                                        setPlaying(false);
                                    }
                                }}
                                id="playBtn"
                                isIconOnly
                                variant="light"
                                // className="mx-auto"
                            >
                                <IoPlay size={30} />
                            </Button>
                            {/* </motion.div> */}
                        </div>
                        <Button
                            onPress={() => {
                                setCurrentMusic(currentMusic + 1);
                                document
                                    .getElementById("nextBtn")
                                    ?.classList.add("nextAnimate");
                                setTimeout(() => {
                                    document
                                        .getElementById("nextBtn")
                                        ?.classList.remove("nextAnimate");
                                }, 500);
                            }}
                            isIconOnly
                            variant="light"
                            id="nextBtn"
                            className="relative"
                            // className="mx-auto"
                        >
                            <IoPlaySkipForward size={30} />
                        </Button>
                    </div>
                </main>
            )}
        </main>
    );
}

export default function SuspensedPlay() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Play />
        </Suspense>
    );
}
var convertTime = function (time: number) {
    var mins = Math.floor(time / 60);
    var sMins = String(mins);
    if (mins < 10) {
        sMins = "0" + String(mins);
    }
    var secs = Math.floor(time % 60);
    var sSecs = String(secs);
    if (secs < 10) {
        sSecs = "0" + String(secs);
    }

    return sMins + ":" + sSecs;
};
