"use client";
import { useSearchParams } from "next/navigation";
import Thumbnail from "@/components/Thumbnail";
import { useEffect, useState, Suspense } from "react";
import { getVideoDetails, readPlaylist } from "@/utils/api";
import { artist, duration, music, musicv2 } from "@/types/music";
import { Button, Progress } from "@nextui-org/react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { VideoDetails } from "@/types/video-details";
function Play() {
    const type = useSearchParams().get("type") || "";
    const id = useSearchParams().get("id") || "";
    const [currentMusic, setCurrentMusic] = useState(0);
    const [musics, setMusics] = useState<musicv2[]>([]);
    const [detail, setDetail] = useState<VideoDetails>();
    const [loading, setLoading] = useState(true);
    const [firstDone, setFirstDone] = useState(false);
    useEffect(() => {
        console.log(type, id);
        readPlaylist(id).then((res) => {
            setFirstDone(true);
            setMusics(res.data.data.data.content);
            console.log(res.data.data.data.content);
        });
    }, [id]);
    useEffect(() => {
        if (musics.length === 0) return;
        console.log(typeof musics[currentMusic].videoId);
        if (typeof musics[currentMusic].videoId === "object") {
            setCurrentMusic(currentMusic + 1);
            return;
        }
        getVideoDetails(musics[currentMusic].videoId).then((res) => {
            setLoading(false);
            setDetail(res.data);
            console.log(detail?.audioStreams[0].url);
        });
    }, [currentMusic, musics]);
    return (
        <main>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <main className="flex justify-center items-center align-middle h-[80vh] flex-col">
                    <Thumbnail vid={musics[currentMusic].videoId} />

                    <p className="text-4xl font-bold">
                        {musics[currentMusic].name}
                    </p>
                    <p className="text-lg text-zinc-400">
                        {musics[currentMusic].author.name}
                    </p>
                    <Progress className="w-[50vh] max-w-[90vw] pt-3 pb-1" />
                    <AudioPlayer
                        src={detail?.audioStreams[0].url}
                        onEnded={() => {
                            setCurrentMusic(currentMusic + 1);
                        }}
                        autoPlayAfterSrcChange
                        autoPlay
                        className="invisible h-0"
                    />
                    <div className="w-[50vh] max-w-[90vw] flex justify-center flex-row">
                        <Button
                            onPress={() => setCurrentMusic(currentMusic - 1)}
                            isIconOnly
                            variant="light"
                            // className="mx-auto"
                        >
                            <IoPlaySkipBack size={30} />
                        </Button>
                        <Button
                            // onPress={() => setPlay(true)}
                            isIconOnly
                            variant="light"
                            className="mx-auto"
                        >
                            <IoPlay size={30} />
                        </Button>
                        <Button
                            onPress={() => setCurrentMusic(currentMusic + 1)}
                            isIconOnly
                            variant="light"
                            // className="mx-auto"
                        >
                            <IoPlaySkipForward size={30} />
                        </Button>
                    </div>
                    {currentMusic === 0 ? (
                        <p className="text-lg text-zinc-400">
                            If the music doesn't play, please skip and play
                            again
                        </p>
                    ) : null}
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
