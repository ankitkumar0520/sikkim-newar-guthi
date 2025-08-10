import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
} from 'lucide-angular';

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
  };

  tabs = [
    { label: 'Home', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Shop', href: '#' },
    { label: 'Pages', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  ngOnInit() {}
}
