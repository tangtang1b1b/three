
let youtubeAPIReady = ref(false);
let youtubeAPIResolve = null;

const loadYouTubeAPI = () => {
    if (typeof window === 'undefined') return Promise.resolve(null); // SSR 處理

    if (window.YT && window.YT.Player) {
        return Promise.resolve(window.YT); // API 已載入
    }

    if (youtubeAPIReady.value) {
        return new Promise((resolve) => {
            youtubeAPIResolve = resolve; // 等待 API 載入完成
        });
    }

    youtubeAPIReady.value = true;

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.onerror = reject;
        window.onYouTubeIframeAPIReady = () => {
            if (youtubeAPIResolve) {
                youtubeAPIResolve(window.YT);
                youtubeAPIResolve = null;
            }
            resolve(window.YT);
        };
        document.head.appendChild(script);
    });
};

export const useYouTubeAPI = () => {
    return { loadYouTubeAPI };
};