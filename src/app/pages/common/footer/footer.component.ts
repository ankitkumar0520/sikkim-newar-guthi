import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MapPin, Phone, Mail } from 'lucide-angular';

interface FooterLink {
  label: string;
  href: string;
}

interface ContactInfo {
  type: string;
  value: string;
  icon: any;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  icons = {
    MapPin,
    Phone,
    Mail,
  };

  quickLinks: FooterLink[] = [
    { label: 'About Us', href: '#' },
    { label: 'Our Mission', href: '#' },
    { label: 'Events', href: '#' },
    { label: 'Gallery', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  moreLinks: FooterLink[] = [
    { label: 'Membership', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'News', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'FAQ', href: '#' },
  ];

  contactInfo: ContactInfo[] = [
    {
      type: 'Address',
      value: 'Gangtok, Sikkim, India , Random for sampple',
      icon: MapPin,
    },
    { type: 'Mobile', value: '+91 3592 000 000', icon: Phone },
    { type: 'Email', value: 'contact@sikkimnewarguthi.org', icon: Mail },
  ];
}
