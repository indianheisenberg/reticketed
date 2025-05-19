import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EventType } from '../../enums/event-type.enum';
import { CategoryCardComponent } from '../common/category-card/category-card.component';
import { SearchBarComponent } from '../common/search-bar/search-bar.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { RecentTicketsComponent } from './recent-tickets/recent-tickets.component';

@Component({
  selector: 'app-home',
  imports: [
    SearchBarComponent,
    SearchBarComponent,
    HowItWorksComponent,
    RecentTicketsComponent,
    CategoryCardComponent,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  categories = Object.values(EventType);
  constructor(private router: Router) {}

  onSearch(value: string) {
    this.router.navigate(['/find-ticket'], { queryParams: { q: value } });
  }
}
