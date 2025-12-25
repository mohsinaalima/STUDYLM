import { YoutubeTranscript } from 'youtube-transcript';

export const getTranscript = async (videoUrl) => {
    try {
        const videoId = extractVideoId(videoUrl);
        if (!videoId) throw new Error("Invalid YouTube URL");

    
        const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId);
        
    
        return transcriptArray.map(item => item.text).join(' ');
    } catch (error) {
        console.error("YouTube Service Error:", error);
        throw new Error("Failed to retrieve video transcript. Ensure the video has captions.");
    }
};


const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};