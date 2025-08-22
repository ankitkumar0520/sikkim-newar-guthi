import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  LucideAngularModule,
  Mountain,
  Fan,
  Flower,
  Play,
} from 'lucide-angular';

interface CultureButton {
  label: string;
  href: string;
}

interface VideoConfig {
  src: string;
  poster?: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  playsinline: boolean;
  preload: 'none' | 'metadata' | 'auto';
  controls: boolean;
  buffering: boolean;
  loading: 'lazy' | 'eager';
}

@Component({
  selector: 'app-landing-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './landing-about.component.html',
  styleUrls: ['./landing-about.component.css'],
})
export class LandingAboutComponent implements OnInit, AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  icons = {
    Mountain,
    Fan,
    Flower,
    Play,
  };

  cultureButtons: CultureButton[] = [
    { label: 'JAPANESE CULTURE DAY', href: '#' },
    { label: 'KIMONO FASHION', href: '#' },
    { label: 'JAPANESE CUISINE', href: '#' },
    { label: 'KANJI', href: '#' },
    { label: 'MORE', href: '#' },
  ];

  videoConfig: VideoConfig = {
    src: 'assets/videos/bg-video1.mp4',
    poster: 'assets/images/japanese-culture/sushi-tea-poster.jpg',
    autoplay: true,
    loop: true,
    muted: true,
    playsinline: true,
    preload: 'metadata',
    controls: false,
    buffering: true,
    loading: 'lazy',
  };

  isVideoLoaded = false;
  isVideoBuffering = false;
  videoProgress = 0;
  showPlayButton = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Initialize video configuration
    this.setupVideoConfig();
  }

  ngAfterViewInit() {
    // Only run video logic in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Small delay to ensure view is fully initialized
      setTimeout(() => {
        if (this.videoElement) {
          this.setupVideoEventListeners();
          this.loadVideo(); // Load video immediately
        }
      }, 100);
    }
  }

  setupVideoConfig() {
    // Enhanced video configuration
    this.videoConfig = {
      ...this.videoConfig,
      preload: 'metadata', // Load only metadata initially for better performance
      loading: 'lazy', // Enable lazy loading
    };
  }

  setupVideoEventListeners() {
    if (!isPlatformBrowser(this.platformId) || !this.videoElement) {
      return;
    }

    const video = this.videoElement.nativeElement;

    // Loaded metadata event
    video.addEventListener('loadedmetadata', () => {
      this.isVideoLoaded = true;
      console.log('Video metadata loaded');
    });

    // Load start event
    video.addEventListener('loadstart', () => {
      this.isVideoBuffering = true;
      console.log('Video loading started');
    });

    // Can play event
    video.addEventListener('canplay', () => {
      this.isVideoBuffering = false;
      this.showPlayButton = false;
      console.log('Video can start playing');
    });

    // Progress event for buffering
    video.addEventListener('progress', () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        this.videoProgress = (bufferedEnd / duration) * 100;
      }
    });

    // Waiting event (buffering)
    video.addEventListener('waiting', () => {
      this.isVideoBuffering = true;
      console.log('Video buffering...');
    });

    // Playing event
    video.addEventListener('playing', () => {
      this.isVideoBuffering = false;
      console.log('Video is playing');
    });

    // Error handling
    video.addEventListener('error', (e) => {
      console.error('Video error:', e);
      this.handleVideoError();
    });

    // Intersection Observer for lazy loading (only in browser)
    if (typeof IntersectionObserver !== 'undefined') {
      this.setupIntersectionObserver();
    } else {
      // Fallback: load video immediately
      this.loadVideo();
    }
  }

  setupIntersectionObserver() {
    if (
      !isPlatformBrowser(this.platformId) ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && this.videoElement) {
          this.loadVideo();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (this.videoElement?.nativeElement) {
      observer.observe(this.videoElement.nativeElement);
    }
  }

  loadVideo() {
    if (!isPlatformBrowser(this.platformId) || !this.videoElement) {
      return;
    }

    const video = this.videoElement.nativeElement;

    // Set video source
    video.src = this.videoConfig.src;

    // Set video attributes
    video.autoplay = this.videoConfig.autoplay;
    video.loop = this.videoConfig.loop;
    video.muted = this.videoConfig.muted;
    video.playsInline = this.videoConfig.playsinline;
    video.preload = this.videoConfig.preload;
    video.controls = this.videoConfig.controls;

    // Load the video
    video.load();

    console.log('Video loaded with configuration:', this.videoConfig);
  }

  handleVideoError() {
    console.log('Falling back to poster image');
    // You can implement fallback logic here
  }

  onVideoClick() {
    if (!isPlatformBrowser(this.platformId) || !this.videoElement) {
      return;
    }

    const video = this.videoElement.nativeElement;

    if (video.paused) {
      video
        .play()
        .then(() => {
          this.showPlayButton = false;
        })
        .catch((err) => {
          console.error('Error playing video:', err);
        });
    } else {
      video.pause();
      this.showPlayButton = true;
    }
  }

  getVideoClasses(): string {
    let classes =
      'video-element w-full h-96 object-cover transition-all duration-500';

    if (this.isVideoLoaded) {
      classes += ' group-hover:scale-105';
    }

    if (this.isVideoBuffering) {
      classes += ' opacity-75';
    }

    return classes;
  }
}
