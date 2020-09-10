import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockComponent } from './clock.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    const newDate= new Date();
    expect(component.updateClock(newDate)).toHaveBeenCalled;
    expect(component.updateDigital(newDate,'PM')).toHaveBeenCalled;
  });

  it('should set meridian= "PM" for clock', () => {
    const date= new Date('2020-01-05 12:06:00');
    const hour='12';
    const minute='06';
    const meridian="PM"
    component.updateDigital(date,meridian)
    expect(component.ampm).toBe('PM');
  });

  it('should set meridian= "AM" for digital clock', () => {
    const date= new Date('2020-01-05 02:45:00');
    const hour='02';
    const minute='45';
    const meridian="AM"
    component.updateDigital(date,meridian)
    expect(component.ampm).toBe('AM');
  });

  it('should set default AM/PM for digital clock ', () => {
    const date= new Date('2020-01-05 12:09:00');
    const hour='12';
    const minute='13';
    const meridian=""
    component.updateDigital(date,meridian)
    expect(component.ampm).toBe('PM');
  });

  it('should update hour value to the edited value of digitalclock ', () => {
    const d= new Date('2020-01-05 09:09:00');
    component.updateDigital(d, "")
    expect(component.ampm).toBe('AM');
    expect(component.dHour).toBe('09');

  });

  
  it('should increment seconds and update to the input Time ', () => {
    const data= {
      target:{
        value:'11:45'
      }
      }
      const modifiedDate= new Date()
    component.onTimeChange(data);
    expect(component.increment(modifiedDate)).toHaveBeenCalled;
    expect(component.modifiedClock(modifiedDate)).toHaveBeenCalled;

  });

  it('should update meridian based on hour selected ie.IF condion ', () => {
    const data= {
      target:{
        value:'14:35'
      }
      }
      const hours = 14
      const modifiedDate= new Date('2020-01-05 14:35:00')
    component.onTimeChange(data);
expect(component.meridian).toBe('PM');

  });

  it('should set clock time based on the edited value', () => {
    const data= {
      target:{
        value:'2:0'
      }
      }
      const modifiedDate= new Date()
    component.onTimeChange(data);
    expect(component.modifiedClock(modifiedDate)).toHaveBeenCalled;

  });
});
