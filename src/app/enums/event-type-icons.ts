import { EventType } from './event-type.enum';

export const EventTypeIcons: Record<EventType, string> = {
  [EventType.Concert]: 'fa-solid fa-music',
  [EventType.ComedyShow]: 'fa-solid fa-face-laugh-beam',
  [EventType.Cricket]: 'fa-solid fa-baseball-bat-ball', // alternative: 'fa-solid fa-cricket'
  [EventType.Football]: 'fa-solid fa-football',
  [EventType.FoodFestival]: 'fa-solid fa-utensils',
  [EventType.Workshop]: 'fa-solid fa-chalkboard-user',
  [EventType.Webinar]: 'fa-solid fa-video',
  [EventType.Other]: 'fa-solid fa-circle-question',
  [EventType.Movie]: 'fa-solid fa-film',
};
