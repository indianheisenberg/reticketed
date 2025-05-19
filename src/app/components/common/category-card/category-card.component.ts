import { Component, Input } from '@angular/core';
import { EventTypeIcons } from '../../../enums/event-type-icons';
import { EventType } from '../../../enums/event-type.enum';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
  @Input() category!: EventType;
  readonly iconsMap = EventTypeIcons;

  get icon(): string {
    return this.iconsMap[this.category] || 'fa-solid fa-circle-question';
  }
}
