
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../Core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit{
empForm: FormGroup; // many people define it inside onInit. thats why they make it optional. 
                    //as we are defining it in constructor so we dnt have it make it optional

education: string[]=[
'Matric',
'Diploma',
'Intermediate',
'Graduate',
'Post Graduate'
];

constructor(private _fb: FormBuilder, private _empService: EmployeeService, private _dialogRef: MatDialogRef<EmpAddEditComponent>,@Inject(MAT_DIALOG_DATA) public data:any, private _coreService:CoreService)
{
this.empForm = this._fb.group({
  firstName: '',
  lastName: '',
  email: '',
  dob: '',
  gender: '',
  education: '',
  company: '',
  experience: '',
  package: '',
})

}

ngOnInit(): void {
  this.empForm.patchValue(this.data); // @Inject(MAT_DIALOG_DATA) public data:any is used to receive the data in dialog box.
}

onFormSubmit(){
  if(this.empForm.valid){
    if(this.data){
     // console.log(this.empForm.value);
     this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
      next: (val:any) => {
     // alert("Employee Updated successfully");
      this._coreService.openSnackBar('Employee Updated successfully','done');// done is optional if u dnt pass bydefault it will be ok as per the code
      this._dialogRef.close(true);
      },
      error: (err:any) => {
        console.log(err);
      }
     });
    }
    else{
  // console.log(this.empForm.value);
  this._empService.addEmployee(this.empForm.value).subscribe({
    next: (val:any) => {
   // alert("Employee added successfully");
    this._coreService.openSnackBar('Employee added successfully');
    this._dialogRef.close(true);
    },
    error: (err:any) => {
      console.log(err);
    }
   });
    }
 
  }
}

}
