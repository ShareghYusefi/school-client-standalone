import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ICourse } from '../../interfaces/icourse';

@Component({
  selector: 'course',
  imports: [],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course implements OnChanges, OnInit, DoCheck, OnDestroy {
  @Input() course: ICourse | undefined;

  // define 'childEvent' to emit data for parent component
  @Output() childEvent = new EventEmitter();

  // define a function for emitting the event and data
  sendDataToParent() {
    this.childEvent.emit(this.course?.name + ' ' + this.course?.level);
  }

  // Lifecycle hooks
  // 1. contructor function runs first when a component is created
  constructor() {
    console.log('Course contructor');
  }

  // 2. ngOnChanges runs when @Input property changes from undefined to course
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course ngOnChanges', changes);
  }

  // 3. ngOnInit runs only once after ngOnChanges: used to initialize component properties
  ngOnInit(): void {
    console.log('Course ngOnInit');
  }

  // 4. ngDoCheck runs after ngOnInit: used to detect and act upon changes that Angular does NOT detect on its own
  ngDoCheck(): void {
    console.log('Course ngDoCheck');
  }

  // 5. ngOnDestroy runs when we nagivate away from a component
  ngOnDestroy(): void {
    console.log('Course ngOnDestroy');
  }
}
