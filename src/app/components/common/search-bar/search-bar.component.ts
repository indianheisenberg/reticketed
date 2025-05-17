import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  placeholderText = input('Search for tickets...');
  class = input('');

  searchButtonClicked = output();

  onSearch() {
    this.searchButtonClicked.emit();
    // Logic to handle the search action
    console.log('Search action triggered');
  }

}
