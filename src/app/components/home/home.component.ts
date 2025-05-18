import { Component } from '@angular/core';
import { SearchBarComponent } from "../common/search-bar/search-bar.component";
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { TicketCardComponent } from '../common/ticket-card/ticket-card.component';
import { RecentTicketsComponent } from './recent-tickets/recent-tickets.component';
import { CategoryCardComponent } from '../common/category-card/category-card.component';
import { EventType } from '../../enums/event-type.enum';

@Component({
  selector: 'app-home',
  imports: [SearchBarComponent, SearchBarComponent, HowItWorksComponent, RecentTicketsComponent, CategoryCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  categories = Object.values(EventType);

}
