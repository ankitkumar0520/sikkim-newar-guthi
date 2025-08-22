import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { LandingAboutComponent } from '../landing-about/landing-about.component';

@Component({
  selector: 'app-landing-main',
  templateUrl: './landing-main.component.html',
  styleUrls: ['./landing-main.component.css'],
  standalone: true,
  imports: [HeroSectionComponent, LandingAboutComponent],
})
export class LandingMainComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
