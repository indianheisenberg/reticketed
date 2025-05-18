import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTicketsComponent } from './recent-tickets.component';

describe('RecentTicketsComponent', () => {
  let component: RecentTicketsComponent;
  let fixture: ComponentFixture<RecentTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
