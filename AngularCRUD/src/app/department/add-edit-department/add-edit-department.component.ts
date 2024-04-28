import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css']
})
export class AddEditDepartmentComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  @Input() depart: any;
  @Output() closeClick: EventEmitter<void> = new EventEmitter<void>();

  DepartmentId = "";
  DepartmentName = "";

  ngOnInit(): void {

    this.DepartmentId = this.depart.DepartmentId;
    this.DepartmentName = this.depart.DepartmentName;
  }

  addDepartment() {
    var dept = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    if (dept.DepartmentName == null || dept.DepartmentName == "" || dept.DepartmentName == undefined) {
      document.getElementById('DeptName')?.style.setProperty('border-color','red');
      return;
    }
    else
    document.getElementById('DeptName')?.style.removeProperty('border-color');
    this.service.addDepartment(dept).subscribe(res => {
      debugger;
      this.closeClick.emit();
      Swal.fire({
        title: "Good job!",
        text: res.message.toString(),
        icon: "success"
      });
    },err=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
  }

  updateDepartment() {
    var dept = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    if (dept.DepartmentName == null || dept.DepartmentName == "" || dept.DepartmentName == undefined) {
      document.getElementById('DeptName')?.style.setProperty('border-color','red');
      return;
    }
    else
    document.getElementById('DeptName')?.style.removeProperty('border-color');
    this.service.updateDepartment(dept).subscribe(res => {
      Swal.fire({
        title: "Good job!",
        text: res.message.toString(),
        icon: "success"
      });
    },err=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
  }
}
