"use client";
import {
    getVideoDetails,
} from "@/utils/api";
import { Button, Image, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { artist, music } from "@/types/music";
import Thumbnail from "@/components/Thumbnail";
import { Progress } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { IoPlay, IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { VideoDetails } from "@/types/video-details";
import { playlist } from "@/types/playlist";
export default function Home() {
    const [musics, setMusics] = useState<music[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentMusic, setCurrentMusic] = useState(0);
    const [play, setPlay] = useState(false);
    const [details, setDetails] = useState<VideoDetails>();
    const [playlists, setPlaylists] = useState<playlist[]>([]);
    useEffect(() => {
        console.log(musics);
    }, [musics]);
    useEffect(() => {
        console.log(currentMusic);
        if (musics.length === 0) return;
        getVideoDetails(musics[currentMusic].youtubeId).then((res) => {
            console.log(res.data);
            setDetails(res.data);
        });
    }, [currentMusic, musics]);
    return (
        <main className="">
            {!play ? (
                <>
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for playlist"
                    />
                    <h1>NextYouTubeMusic - WIP</h1>

                    <Link href={`/search?q=${searchQuery}`}>Search</Link>
                </>
            ) : (
                <main className="flex justify-center items-center h-screen align-middle flex-col">
                    <Thumbnail vid={musics[currentMusic].youtubeId} />

                    <p className="text-4xl font-bold">
                        {musics[currentMusic].title}
                    </p>
                    <p className="text-lg text-zinc-400">
                        {musics[currentMusic].artists.map((artist: artist) => {
                            return artist.name;
                        })}
                    </p>
                    <Progress className="w-[50vh] max-w-[90vw] pt-3 pb-1" />
                    <AudioPlayer
                        src={details?.audioStreams[0].url}
                        onEnded={() => {
                            setCurrentMusic(currentMusic + 1);
                        }}
                        autoPlayAfterSrcChange
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
                            onPress={() => setPlay(true)}
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
                </main>
            )}
        </main>
    );
}
