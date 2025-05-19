import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() placeholderText = 'Search for tickets...';
  @Input() class = '';

  private _value = signal('');

  @Input()
  set value(val: string | null | undefined) {
    this._value.set(val ?? '');
  }

  get value(): string {
    return this._value();
  }

  @Output() searchButtonClicked = new EventEmitter<string>();

  onSearch() {
    this.searchButtonClicked.emit(this.value);
  }

  // Optional: expose a method to update value from input event
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this._value.set(input.value);
  }
}
