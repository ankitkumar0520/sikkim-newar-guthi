import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  LucideAngularModule,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  User,
  Linkedin,
  Send,
  Menu,
  X,
  ChevronDown,
  Play,
  ArrowBigRightDash,
} from 'lucide-angular';

interface TabItem {
  label: string;
  href: string;
  subItems?: SubItem[];
}

interface SubItem {
  label: string;
  href: string;
  description?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, LucideAngularModule],
})
export class NavbarComponent implements OnInit {
  icons = {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Linkedin,
    User,
    Send,
    Menu,
    X,
    ChevronDown,
    Play,
    ArrowBigRightDash,
  };

  tabs: TabItem[] = [
    {
      label: 'Home',
      href: '#',
      subItems: [
        {
          label: 'Main Page',
          href: '#',
          description: 'Welcome to our community',
        },
        {
          label: 'News & Updates',
          href: '#',
          description: 'Latest community news',
        },
      ],
    },
    {
      label: 'About Us',
      href: '#',
      subItems: [
        {
          label: 'Our History',
          href: '#',
          description: 'Learn about our heritage',
        },
        {
          label: 'Mission & Vision',
          href: '#',
          description: 'Our community goals',
        },
        { label: 'Leadership', href: '#', description: 'Meet our leaders' },
      ],
    },
    {
      label: 'Community',
      href: '#',
      subItems: [
        {
          label: 'Events',
          href: '#',
          description: 'Upcoming community events',
        },
        {
          label: 'Festivals',
          href: '#',
          description: 'Traditional celebrations',
        },
        { label: 'Membership', href: '#', description: 'Join our community' },
      ],
    },
    {
      label: 'Resources',
      href: '#',
      subItems: [
        {
          label: 'Documents',
          href: '#',
          description: 'Important community documents',
        },
        {
          label: 'Gallery',
          href: '#',
          description: 'Photo and video collections',
        },
        {
          label: 'Contact Info',
          href: '#',
          description: 'Get in touch with us',
        },
      ],
    },
    {
      label: 'Contact',
      href: '#',
      subItems: [
        {
          label: 'General Inquiry',
          href: '#',
          description: 'General questions',
        },
        { label: 'Support', href: '#', description: 'Technical support' },
        { label: 'Feedback', href: '#', description: 'Share your thoughts' },
      ],
    },
  ];

  isSidebarOpen = false;
  hoveredTab: number | null = null;
  hoverTimeout: any;
  expandedTabs: { [key: number]: boolean } = {};
  isPlatformBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {}

  toggleSidebar(): void {
    if (!this.isPlatformBrowser) return;
    if (this.isSidebarOpen) {
      document.body.style.overflow = 'auto';
      this.isSidebarOpen = false;
    } else {
      document.body.style.overflow = 'hidden';
      this.isSidebarOpen = true;
    }
  }

  onTabHover(index: number): void {
    this.hoveredTab = index;
    // Clear any existing timeout
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }

  onTabLeave(): void {
    // Set timeout to hide submenu after 500ms
    this.hoverTimeout = setTimeout(() => {
      this.hoveredTab = null;
    }, 500);
  }

  toggleTabExpansion(index: number): void {
    this.expandedTabs[index] = !this.expandedTabs[index];
  }
}
