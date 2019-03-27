import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrackComponent } from './my-track.component';

describe('MyTrackComponent', () => {
  let component: MyTrackComponent;
  let fixture: ComponentFixture<MyTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
