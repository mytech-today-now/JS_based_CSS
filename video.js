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
                'https://mytech.today/wp-content/uploads/2025/04/tTrucks.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/Notgridlock.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/Gridlock.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/RTA_bus-2-12043240-3840-2160-24Fps.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/lsd-01-12057787-3840-2160-24Fps.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/lsd-02-.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/DanRyan-2-6138427-Hd-1920-1080-24Fps.mp4',
              	'https://mytech.today/wp-content/uploads/2025/04/lower-waker-bridge-2-2005974-Hd-1920-1080-24Fps.mp4'
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
            this.config = VIDEO_SETS[setId];
            this.fadeTransitionTime = 1000;
            
            this.state = {
                currentVideoIndex: 0,
                isTransitioning: false,
                isPlaying: false,
                videoFiles: this.shuffleArray([...this.config.videos])
            };

            this.elements = {
                container: document.getElementById(setId),
                videos: [
                    document.getElementById(`${setId}_1`),
                    document.getElementById(`${setId}_2`)
                ]
            };

            this.initialize();
        }

        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        async preloadVideo(videoElement, sourceUrl) {
            return new Promise((resolve, reject) => {
                videoElement.src = sourceUrl;
                
                const onLoadedData = () => {
                    videoElement.removeEventListener('loadeddata', onLoadedData);
                    videoElement.removeEventListener('error', onError);
                    resolve();
                };

                const onError = (error) => {
                    videoElement.removeEventListener('loadeddata', onLoadedData);
                    videoElement.removeEventListener('error', onError);
                    reject(error);
                };

                videoElement.addEventListener('loadeddata', onLoadedData);
                videoElement.addEventListener('error', onError);
            });
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
            try {
                const firstVideo = this.elements.videos[0];
                await this.preloadVideo(firstVideo, this.state.videoFiles[0]);

                firstVideo.style.opacity = '1';
                firstVideo.style.display = 'block';

                await firstVideo.play();
                this.state.isPlaying = true;
                this.scheduleNextTransition();

            } catch (error) {
                console.error(`[${this.setId}] Playback initialization failed:`, error);
                setTimeout(() => this.startPlayback(), 1000);
            }
        }

        initialize() {
            if (!this.elements.container || !this.elements.videos[0] || !this.elements.videos[1]) {
                console.error(`[${this.setId}] Required elements not found`);
                return;
            }

            // Initialize video elements
            this.elements.videos.forEach(video => {
                video.style.position = 'absolute';
                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'cover';
                video.style.opacity = '0';
                
                video.addEventListener('ended', () => {
                    if (!this.state.isTransitioning) {
                        this.transitionToNextVideo();
                    }
                });

                video.addEventListener('error', () => {
                    if (!this.state.isTransitioning) {
                        this.transitionToNextVideo();
                    }
                });
            });

            // Start playback
            this.startPlayback();
        }
    }

    // Initialize players for all video sets present on the page
    Object.keys(VIDEO_SETS).forEach(setId => {
        if (document.getElementById(setId)) {
            new VideoPlayer(setId);
        }
    });

  this.elements.videos.forEach(video => {
  // ensure iOS policy is satisfied
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute('webkit-playsinline', '');
  // styling
  video.style.position = 'absolute';
  video.style.width = '100%';
  video.style.height = '100%';
  video.style.objectFit = 'cover';
  video.style.opacity = '0';
  // event listeners…
});

  
    // Handle visibility changes globally
    document.addEventListener('visibilitychange', () => {
        const videos = document.querySelectorAll('video');
        if (document.hidden) {
            videos.forEach(video => video.pause());
        } else {
            videos.forEach(video => {
                if (video.style.opacity === '1') {
                    video.play();
                }
            });
        }
    });
});
