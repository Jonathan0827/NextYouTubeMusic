import { SimplizedVideo } from "@/types/video";

export type VideoDetails = {
    audioStreams: [audioStream];
    description: string;
    dislikes: number;
    duration: number;
    lbryId: string;
    likes: number;
    livestream: boolean;
    proxyUrl: string;
    relatedStreams: [SimplizedVideo];
    subtitles: [subtitle];
    thumbnailUrl: string;
    title: string;
    uploadedDate: string;
    uploader: string;
    uploaderUrl: string;
    uploaderVerified: boolean;
    videoStreams: [videoStream];
    views: number;
};
export const ExampleVideoDetails: VideoDetails = {
    audioStreams: [
        {
            bitrate: 128,
            codec: "opus",
            format: "webm",
            indexEnd: 0,
            indexStart: 0,
            initStart: 0,
            initEnd: 0,
            mimeType: 'audio/webm; codecs="opus"',
            quality: "tiny",
            url: "https://example.com/audio.webm",
            videoOnly: false,
        },
    ],
    description: "This is an example video",
    dislikes: 0,
    duration: 60,
    lbryId: "example",
    likes: 0,
    livestream: false,
    proxyUrl: "https://example.com/video.mp4",
    relatedStreams: [
        {
            duration: 60,
            thumbnail: "https://example.com/thumbnail.jpg",
            title: "Related Video",
            uploadedDate: "2022-01-01",
            uploaderAvatar: "https://example.com/avatar.jpg",
            uploaderUrl: "https://example.com",
            uploaderVerified: false,
            url: "https://example.com/video.mp4",
            views: 0,
        },
    ],
    subtitles: [
        {
            autogenerated: true,
            code: "en",
            mimeType: "text/vtt",
            name: "English",
            url: "https://example.com/subtitles.vtt",
        },
    ],
    thumbnailUrl: "https://example.com/thumbnail.jpg",
    title: "Example Video",
    uploadedDate: "2022-01-01",
    uploader: "Example Channel",
    uploaderUrl: "https://example.com",
    uploaderVerified: false,
    videoStreams: [
        {
            bitrate: 128,
            codec: "vp9",
            format: "webm",
            fps: 30,
            height: 720,
            indexEnd: 0,
            indexStart: 0,
            initStart: 0,
            initEnd: 0,
            mimeType: 'video/webm; codecs="vp9"',
            quality: "tiny",
            url: "https://example.com/video.webm",
            videoOnly: false,
            width: 1280,
        },
    ],
    views: 0,
};

export type audioStream = {
    bitrate: number;
    codec: string;
    format: string;
    indexEnd: number;
    indexStart: number;
    initStart: number;
    initEnd: number;
    mimeType: string;
    quality: string;
    url: string;
    videoOnly: boolean;
};

export type videoStream = {
    bitrate: number;
    codec: string;
    format: string;
    fps: number;
    height: number;
    indexEnd: number;
    indexStart: number;
    initStart: number;
    initEnd: number;
    mimeType: string;
    quality: string;
    url: string;
    videoOnly: boolean;
    width: number;
};

export type subtitle = {
    autogenerated: boolean;
    code: string;
    mimeType: string;
    name: string;
    url: string;
};
