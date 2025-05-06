/* 

Video background for Header of home Page

*/ 

document.addEventListener('DOMContentLoaded', function() {
    // Video sets configuration
    const VIDEO_SETS = {
        'downtown_videos': {
            videos: [
                'https://mytech.today/wp-content/uploads/2025/04/Skyline.mp4',
                'https://mytech.today/wp-content/uploads/2025/04/Downtown-View.mp4',
                'https://mytech.today/wp-content/uploads/2025/04/Downtown-Viewx.mp4'
            ],
            loadingImage: 'https://mytech.today/wp-content/uploads/2025/04/stephan-cassara-VguAb_4yJ_Q-unsplash.jpg'
        },
        'waterfront_videos': {
            videos: [
                'https://mytech.today/wp-content/uploads/2025/04/River.mp4',
                'https://mytech.today/wp-content/uploads/2025/04/Fountain.mp4',
                'https://mytech.today/wp-content/uploads/2025/04/Downtown-Beach-4K.mp4'
            ],
            loadingImage: 'https://mytech.today/wp-content/uploads/2025/04/stephan-cassara-VguAb_4yJ_Q-unsplash.jpg'
        },
        'attractions_videos': {
            videos: [
                'https://mytech.today/wp-content/uploads/2025/04/Bean.mp4',
                'https://mytech.today/wp-content/uploads/2025/04/Farriswheel_Navypier.mp4',
                'https://mytech.today/wp-content/uploads/2025/04/Chitheatera.mp4'
            ],
            loadingImage: 'https://mytech.today/wp-content/uploads/2025/04/stephan-cassara-VguAb_4yJ_Q-unsplash.jpg'
        },
        'server_videos': {
            videos: [
                'https://mytech.today/wp-content/uploads/2025/04/server-room1-1085656-Uhd-3840-2160-25Fps.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/istockphoto-2151760628-640_adpp_is.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/6804117-Uhd-4096-2160-25Fps.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/server-woman-01-8720754-Uhd-4096-2160-25Fps.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/vector_db-01-3129595-Uhd-3840-2160-30Fps.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/5028622-Uhd-3840-2160-25Fps.mp4'
            ],
            loadingImage: 'https://mytech.today/wp-content/uploads/2025/04/stephan-cassara-VguAb_4yJ_Q-unsplash.jpg'
        },
        'traffic_videos': {
            videos: [
                'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-9161-large.mp4',
                'https://assets.mixkit.co/videos/preview/mixkit-highway-traffic-at-night-with-light-trails-time-lapse-10364-large.mp4'
            ],
            loadingImage: 'https://mytech.today/wp-content/uploads/2025/04/stephan-cassara-VguAb_4yJ_Q-unsplash.jpg'
        },
        'mobile_videos': {
            videos: [
                'https://mytech.today/wp-content/uploads/2025/05/a-Bridge03.mp4',
              	'https://mytech.today/wp-content/uploads/2025/05/a-Chicagotheater.mp4',
              	'https://mytech.today/wp-content/uploads/2025/05/a-Airborn-Buckingham-Fountain.mp4',
              	'https://mytech.today/wp-content/uploads/2025/05/a-Wrigleyfield.mp4',
              	'https://mytech.today/wp-content/uploads/2025/05/a-Bridge01.mp4',
              	'https://mytech.today/wp-content/uploads/2025/05/a-Bridge02.mp4',
              	'https://mytech.today/wp-content/uploads/2025/05/a-Boat-Chicago.mp4',
              	'https://mytech.today/wp-content/uploads/2025/05/a-Tourist-Boat.mp4',
              	'https://mytech.today/wp-content/uploads/2025/05/a-Bubble-Buildings-Downtown.mp4'
            ],
            loadingImage: 'https://mytech.today/wp-content/uploads/2025/04/stephan-cassara-VguAb_4yJ_Q-unsplash.jpg'
        }
    };

    class VideoPlayer {
        constructor(setId) {
            this.setId = setId;
            // Check if the set exists before accessing it
            if (!VIDEO_SETS[setId]) {
                console.error(`[${setId}] Video set not found in VIDEO_SETS`);
                return;
            }
            
            this.config = VIDEO_SETS[setId];
            this.fadeTransitionTime = 1000;
            
            this.state = {
                currentVideoIndex: 0,
                isTransitioning: false,
                isPlaying: false,
                videoFiles: this.shuffleArray([...this.config.videos]),
                videosLoaded: false
            };

            // Check if elements exist before setting them
            const container = document.getElementById(setId);
            const video1 = document.getElementById(`${setId}_1`);
            const video2 = document.getElementById(`${setId}_2`);
            
            if (!container || !video1 || !video2) {
                console.error(`[${setId}] Required DOM elements not found`);
                return;
            }

            this.elements = {
                container: container,
                videos: [video1, video2]
            };

            // Ensure videos have proper attributes for mobile playback
            this.elements.videos.forEach(video => {
                video.muted = true;
                video.playsInline = true;
                video.setAttribute('webkit-playsinline', '');
            });

            this.initialize();
        }

        shuffleArray(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        }

        async preloadVideo(videoElement, sourceUrl) {
            return new Promise((resolve, reject) => {
                console.log(`[${this.setId}] Preloading video: ${sourceUrl}`);
                videoElement.src = sourceUrl;
                
                const onLoadedData = () => {
                    videoElement.removeEventListener('loadeddata', onLoadedData);
                    videoElement.removeEventListener('error', onError);
                    console.log(`[${this.setId}] Successfully loaded: ${sourceUrl}`);
                    resolve();
                };

                const onError = (error) => {
                    videoElement.removeEventListener('loadeddata', onLoadedData);
                    videoElement.removeEventListener('error', onError);
                    console.error(`[${this.setId}] Failed to load: ${sourceUrl}`, error);
                    reject(error);
                };

                videoElement.addEventListener('loadeddata', onLoadedData);
                videoElement.addEventListener('error', onError);
            });
        }

        async loadVideos() {
            try {
                console.log(`[${this.setId}] Loading videos`);
                const firstVideo = this.elements.videos[0];
                await this.preloadVideo(firstVideo, this.state.videoFiles[0]);
                
                // Preload the second video as well
                if (this.state.videoFiles.length > 1) {
                    const secondVideo = this.elements.videos[1];
                    await this.preloadVideo(secondVideo, this.state.videoFiles[1]);
                }
                
                this.state.videosLoaded = true;
                console.log(`[${this.setId}] Videos loaded successfully`);
                
                // Return true to indicate successful loading
                return true;
            } catch (error) {
                console.error(`[${this.setId}] Video loading failed:`, error);
                // Try again with a delay
                setTimeout(() => this.loadVideos(), 1000);
                return false;
            }
        }

        async transitionToNextVideo() {
            if (this.state.isTransitioning) return;
            this.state.isTransitioning = true;

            const currentVideo = this.elements.videos[this.state.currentVideoIndex];
            const nextVideoIndex = (this.state.currentVideoIndex + 1) % this.elements.videos.length;
            const nextVideo = this.elements.videos[nextVideoIndex];

            if (this.state.currentVideoIndex >= this.state.videoFiles.length - 1) {
                this.state.videoFiles = this.shuffleArray([...this.config.videos]);
                this.state.currentVideoIndex = 0;
            }

            try {
                const nextVideoUrl = this.state.videoFiles[this.state.currentVideoIndex + 1];
                await this.preloadVideo(nextVideo, nextVideoUrl);
                
                nextVideo.style.display = 'block';
                nextVideo.style.opacity = '0';
                
                await nextVideo.play();
                
                nextVideo.style.transition = `opacity ${this.fadeTransitionTime}ms`;
                currentVideo.style.transition = `opacity ${this.fadeTransitionTime}ms`;
                
                nextVideo.style.opacity = '1';
                currentVideo.style.opacity = '0';

                setTimeout(() => {
                    currentVideo.style.display = 'none';
                    currentVideo.pause();
                    currentVideo.currentTime = 0;
                    
                    this.state.currentVideoIndex = nextVideoIndex;
                    this.state.isTransitioning = false;
                    
                    this.scheduleNextTransition();
                }, this.fadeTransitionTime);

            } catch (error) {
                console.error(`[${this.setId}] Transition failed:`, error);
                this.state.isTransitioning = false;
                this.state.currentVideoIndex = (this.state.currentVideoIndex + 1) % this.state.videoFiles.length;
                setTimeout(() => this.transitionToNextVideo(), 1000);
            }
        }

        scheduleNextTransition() {
            const currentVideo = this.elements.videos[this.state.currentVideoIndex];
            const timeUntilEnd = (currentVideo.duration - currentVideo.currentTime) * 1000;
            const transitionTime = Math.max(0, timeUntilEnd - this.fadeTransitionTime);
            
            setTimeout(() => {
                if (this.state.isPlaying) {
                    this.transitionToNextVideo();
                }
            }, transitionTime);
        }

        async startPlayback() {
            if (this.state.isPlaying) {
                console.log(`[${this.setId}] Playback already started`);
                return;
            }
            
            try {
                console.log(`[${this.setId}] Starting playback`);
                
                // If videos aren't loaded yet, load them first
                if (!this.state.videosLoaded) {
                    await this.loadVideos();
                }
                
                const firstVideo = this.elements.videos[0];
                firstVideo.style.opacity = '1';
                firstVideo.style.display = 'block';

                await firstVideo.play();
                this.state.isPlaying = true;
                this.scheduleNextTransition();
                console.log(`[${this.setId}] Playback started successfully`);

            } catch (error) {
                console.error(`[${this.setId}] Playback initialization failed:`, error);
                // Try again with a delay
                setTimeout(() => this.startPlayback(), 1000);
            }
        }

        stopPlayback() {
            if (!this.state.isPlaying) {
                return;
            }
            
            console.log(`[${this.setId}] Stopping playback`);
            
            // Pause all videos
            this.elements.videos.forEach(video => {
                video.pause();
                video.style.opacity = '0';
                video.style.display = 'none';
            });
            
            this.state.isPlaying = false;
            console.log(`[${this.setId}] Playback stopped`);
        }

        initialize() {
            if (!this.elements.container || !this.elements.videos[0] || !this.elements.videos[1]) {
                console.error(`[${this.setId}] Required elements not found`);
                return;
            }

            console.log(`[${this.setId}] Initializing video player`);

            // Initialize video elements
            this.elements.videos.forEach(video => {
                video.style.position = 'absolute';
                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'cover';
                video.style.opacity = '0';
                video.style.display = 'none';
                
                video.addEventListener('ended', () => {
                    if (!this.state.isTransitioning) {
                        this.transitionToNextVideo();
                    }
                });

                video.addEventListener('error', (e) => {
                    console.error(`[${this.setId}] Video error:`, e);
                    if (!this.state.isTransitioning) {
                        this.transitionToNextVideo();
                    }
                });
            });

            // Load videos but don't start playback
            this.loadVideos();
        }
    }

    // Create a global variable to store the video player instance
    window.videoPlayers = {};

    // Only initialize the traffic_videos player if we're on a page that has it
    if (document.getElementById('traffic_videos')) {
        console.log('Initializing traffic_videos player');
        try {
            window.videoPlayers.trafficVideos = new VideoPlayer('traffic_videos');
        } catch (error) {
            console.error('Failed to initialize traffic_videos player:', error);
        }
    }

    // Handle visibility changes globally
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause all videos when tab is not visible
            document.querySelectorAll('video').forEach(video => video.pause());
        } else {
            // Only resume playing videos if they were playing before
            document.querySelectorAll('video').forEach(video => {
                if (video.style.opacity === '1' && window.currentTheme === 'Cinematic') {
                    video.play().catch(e => console.warn('Auto-play failed:', e));
                }
            });
        }
    });

    // Add a custom event listener for theme changes
    document.addEventListener('themeChanged', function(e) {
        const themeName = e.detail.themeName;
        console.log('Theme changed to:', themeName);
        
        // Store current theme name globally
        window.currentTheme = themeName;
        
        if (themeName === 'Cinematic') {
            console.log('Cinematic theme activated, starting video playback');
            if (window.videoPlayers.trafficVideos) {
                window.videoPlayers.trafficVideos.startPlayback();
            }
        } else {
            console.log('Non-cinematic theme activated, stopping video playback');
            if (window.videoPlayers.trafficVideos) {
                window.videoPlayers.trafficVideos.stopPlayback();
            }
        }
    });
});
