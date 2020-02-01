import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQrComponent } from './ngx-qr.component';

describe('NgxQrComponent', () => {
  let component: NgxQrComponent;
  let fixture: ComponentFixture<NgxQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
