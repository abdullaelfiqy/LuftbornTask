import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  constructor(private service: ApiserviceService) { }
  @Input() emp: any;
  EmployeeId = "";
  EmployeeName = "";
  Department = "";
  DateOfJoining = "";
  PhotoFileName = "";
  PhotoFilePath = "";
  DepartmentList: any = [];


  ngOnInit(): void {
    this.loadEmployeeList();
  }

  loadEmployeeList() {

    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;

      this.EmployeeId = this.emp.EmployeeId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DateOfJoining;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    });
  }

  addEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };
    if (Validate(val)) {
      this.service.addEmployee(val).subscribe(res => {
        Swal.fire({
          title: "Good job!",
          text: res.message.toString(),
          icon: "success"
        });
      });
    }
  }

  updateEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };
    if (Validate(val)) {
      this.service.updateEmployee(val).subscribe(res => {
        Swal.fire({
          title: "Good job!",
          text: res.message.toString(),
          icon: "success"
        });
      });
    }
  }


  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.service.uploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    })
  }
}
function Validate(val: { EmployeeId: string; EmployeeName: string; Department: string; DateOfJoining: string; PhotoFileName: string; }) {
  var res = true;
  var elements = document.getElementsByClassName('validate')
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    if (element.getAttribute('ng-reflect-model') == "" || element.getAttribute('ng-reflect-model') == null) {
      element.setAttribute('style','border-color:red');
      res = false;
    }
    else{
      element.removeAttribute('style');
    }
  }
  return res;
}

