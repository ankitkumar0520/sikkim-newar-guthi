import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { register } from 'swiper/element/bundle';

interface GallerySlide {
  image: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-landing-gallery',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './landing-gallery.component.html',
  styleUrls: ['./landing-gallery.component.css'],
})
export class LandingGalleryComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      register();
    }
  }
  gallerySlides: GallerySlide[] = [
    {
      image: 'assets/images/newar-culture/festival-1.jpg',
      alt: 'Indra Jatra Festival',
      title: 'Indra Jatra Festival',
    },
    {
      image: 'assets/images/newar-culture/temple-1.jpg',
      alt: 'Traditional Newar Temple',
      title: 'Sacred Temple Architecture',
    },
    {
      image: 'assets/images/newar-culture/ceremony-1.jpg',
      alt: 'Newar Wedding Ceremony',
      title: 'Traditional Wedding Rituals',
    },
    {
      image: 'assets/images/newar-culture/community-1.jpg',
      alt: 'Community Gathering',
      title: 'Community Unity',
    },
    {
      image: 'assets/images/newar-culture/art-1.jpg',
      alt: 'Traditional Newar Art',
      title: 'Artistic Heritage',
    },
    {
      image: 'assets/images/newar-culture/food-1.jpg',
      alt: 'Traditional Newar Cuisine',
      title: 'Culinary Traditions',
    },
  ];

  onImageError(event: any) {
    event.target.src = '/logo.png';
  }
}
