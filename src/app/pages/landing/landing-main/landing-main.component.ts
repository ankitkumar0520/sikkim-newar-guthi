import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from '../hero-section/hero-section.component';

@Component({
  selector: 'app-landing-main',
  templateUrl: './landing-main.component.html',
  styleUrls: ['./landing-main.component.css'],
  standalone: true,
  imports: [HeroSectionComponent],
})
export class LandingMainComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
