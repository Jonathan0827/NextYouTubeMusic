export type artist = {
    name: string;
    id: string;
};
export type duration = {
    label: string;
    totalSeconds: number;
};
export type music = {
    youtubeId: string;
    title: string;
    artists: [artist];
    album: string;
    thumbnailUrl: string;
    duration: duration;
    isExplicit: boolean;
};

export type musicv2 = {
    videoId: string;
    name: string;
    author: {
        browseId: string;
        name: string;
    };
    album: string;
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    };
};
