import { Component } from '@angular/core';
import { SearchBarComponent } from "../common/search-bar/search-bar.component";
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';

@Component({
  selector: 'app-home',
  imports: [SearchBarComponent, SearchBarComponent, HowItWorksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
