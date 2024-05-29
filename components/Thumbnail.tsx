"use client";
import { Image } from "@nextui-org/react";
import { VideoDetails } from "@/types/video-details";
import { getVideoDetails } from "@/utils/api";
import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
export default function Thumbnail({ vid }: { vid: string }) {
    const [videoDetails, setVideoDetails] = useState<VideoDetails>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // setLoading(true);
        getVideoDetails(vid).then((res) => {
            setVideoDetails(res.data as VideoDetails);
            setLoading(false);
        });
    }, [vid]);
    return (
        <div>
            {loading ? (
                <Skeleton className="aspect-square object-cover h-[50vh] max-w-[90vw] max-h-[90vw] rounded-lg" />
            ) : (
                <Image
                    className="aspect-square object-cover h-[50vh] max-w-[90vw] max-h-[90vw]"
                    radius="lg"
                    isBlurred
                    src={videoDetails?.thumbnailUrl}
                    alt={videoDetails?.title}
                />
            )}
        </div>
    );
}
