import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTicketComponent } from './find-ticket.component';

describe('FindTicketComponent', () => {
  let component: FindTicketComponent;
  let fixture: ComponentFixture<FindTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindTicketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FindTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
