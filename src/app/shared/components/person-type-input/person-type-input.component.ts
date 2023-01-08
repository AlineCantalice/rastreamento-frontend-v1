import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-person-type-input',
  templateUrl: './person-type-input.component.html',
  styleUrls: ['./person-type-input.component.scss']
})
export class PersonTypeInputComponent implements OnInit {

  @Input() type!: string;
  @Input() form!: FormGroup;

  constructor() {
   }

  ngOnInit(): void {
  }

}
