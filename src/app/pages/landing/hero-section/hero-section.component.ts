import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { register } from 'swiper/element/bundle';

interface SlideContent {
  image: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
}

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroSectionComponent implements OnInit {
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  slides: SlideContent[] = [
    {
      image: 'assets/images/gods/god1.png',
      alt: 'Divine Blessings',
      title: 'Divine Blessings & Protection',
      description:
        'Experience the sacred presence of our revered deities who watch over our community. Their divine blessings bring peace, prosperity, and protection to all Newar families in Sikkim.',
      buttonText: 'Know More',
    },
    {
      image: 'assets/images/gods/god2.png',
      alt: 'Sacred Traditions',
      title: 'Sacred Traditions & Rituals',
      description:
        'Discover the ancient spiritual practices and sacred ceremonies that have been passed down through generations. Our temples and rituals connect us to the divine and preserve our cultural heritage.',
      buttonText: 'Know More',
    },
    {
      image: 'assets/images/gods/god3.png',
      alt: 'Community Unity',
      title: 'Community Unity & Faith',
      description:
        'Join our vibrant community celebrations and religious festivals that strengthen the bonds of faith and unity among Newar families. Together we honor our gods and preserve our traditions.',
      buttonText: 'Know More',
    },
  ];

  constructor() {}

  ngOnInit() {
    if (this.isBrowser) {
      register();
    }
  }

  onImageError(event: any) {
    // Fallback to a default image if the main image fails to load
    event.target.src = '/logo.png';
  }
}
