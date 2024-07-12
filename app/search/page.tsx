"use client";
import { useEffect, useState, Suspense } from "react";
import {
    Image,
    Link,
    Input,
    Accordion,
    AccordionItem,
} from "@nextui-org/react";
import {
    readPlaylist,
    searchPlaylist,
    searchMusic,
    getVideoDetails,
} from "@/utils/api";
import { playlist } from "@/types/playlist";
import { music } from "@/types/music";
import { album } from "@/types/album";
import { useSearchParams } from "next/navigation";
function Search() {
    const query = useSearchParams().get("q") || "";
    const [searchQuery, setSearchQuery] = useState<string>(query);
    const [playlists, setPlaylists] = useState<playlist[]>([]);
    const [musics, setMusics] = useState<music[]>([]);
    const [albums, setAlbums] = useState<album[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const search = async () => {
            await searchPlaylist(searchQuery).then((res) => {
                setPlaylists(res.data.data.data);
                // setPlay(true);
            });
            const musicData = await searchMusic(searchQuery).then((res) => {
                return res;
            });
            console.log(musicData);
            // setMusics(musicData || []); // Provide a default value for the musics state
        };
        search().then(() => setLoading(false));
        // console.log("a");
    }, []);
    return (
        <main className="">
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for playlist"
            />
            <h1>NextYouTubeMusic - WIP</h1>
            <Link href={`/search?q=${searchQuery}`}>search</Link>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Accordion
                    className=""
                    variant="splitted"
                    defaultExpandedKeys={["pl"]}
                >
                    <AccordionItem key="pl" title="Playlists">
                        {/* <h1 className="text-3xl font-extrabold">Playlists</h1> */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-3">
                            {playlists.map((playlist: playlist) => (
                                <Link
                                    href={`/play?id=${playlist.playlistId}&type=0`}
                                >
                                    <div
                                        key={playlist.thumbnailUrl}
                                        className=""
                                    >
                                        <Image
                                            src={playlist.thumbnailUrl}
                                            radius="lg"
                                            isZoomed
                                            className="w-fit h-fit object-cover aspect-square"
                                            onClick={() => {
                                                readPlaylist(
                                                    playlist.playlistId
                                                ).then((res) => {
                                                    console.log(res);
                                                    setMusics(
                                                        res.data.data.data
                                                    );
                                                });
                                            }}
                                        />
                                        <p className="text-xl font-bold">
                                            {playlist.title}
                                        </p>
                                        {playlist.totalSongs} songs
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </AccordionItem>
                    <AccordionItem key="mc" title="Musics">
                        {/* <h1 className="text-3xl font-extrabold ">Songs</h1> */}
                        {musics.map((music: music) => (
                            <div key={music.youtubeId} className="">
                                <Image
                                    src={
                                        // getThumbnail(
                                        //     music.youtubeId
                                        // ) as unknown as string
                                        music.thumbnailUrl
                                    }
                                    radius="lg"
                                    isZoomed
                                    className="w-fit h-fit object-cover aspect-square"
                                />
                                <p className="text-xl font-bold">
                                    {music.title}
                                </p>
                                {music.artists
                                    .map((artist) => artist.name)
                                    .join(", ")}
                            </div>
                        ))}
                    </AccordionItem>
                </Accordion>
            )}
        </main>
    );
}

const getThumbnail = (youtubeId: string) => {
    getVideoDetails(youtubeId).then((res) => {
        return res.data.thumbnailUrl as string;
    });
};
export default function SuspensedSearch() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Search />
        </Suspense>
    );
}
