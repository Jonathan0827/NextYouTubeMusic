export type Video = {
    url: string;
    type: string;
    title: string;
    thumbnail: string;
    uploaderName: string;
    uploaderUrl: string;
    uploaderAvatar: string;
    uploadedDate: string;
    shortDescription: string;
    duration: number;
    views: number;
    uploaded: number;
    uploaderVerified: boolean;
    isShort: boolean;
};

export type SimplizedVideo = {
    duration: number;
    thumbnail: string;
    title: string;
    uploadedDate: string;
    uploaderAvatar: string;
    uploaderUrl: string;
    uploaderVerified: boolean;
    url: string;
    views: number;
};
