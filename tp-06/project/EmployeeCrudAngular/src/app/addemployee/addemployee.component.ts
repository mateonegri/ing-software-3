import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AddemployeeComponent implements OnInit {
  newEmployee: Employee = new Employee(0, '', '');
  employeesList: Employee[] = []; // Lista de empleados cargada desde el backend
  submitBtnText: string = "Create";
  imgLoadingDisplay: string = 'none';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService // Inyecta ToastrService
  ) {}

  loadEmployees() {
    this.employeeService.getAllEmployee().subscribe((employees) => {
      this.employeesList = employees;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const employeeId = params['id'];
      if(employeeId)
      this.editEmployee(employeeId);
    });
  }

  // Validaciones antes de agregar o editar empleado
  validateEmployee(employee: Employee): boolean {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' ]+$/;

    if (!employee.name.trim()) {
      this.toastr.error('El nombre es obligatorio.', 'Error');
      return false;
    }

    if (employee.name.length < 2 || employee.name.length > 100) {
      this.toastr.error('El nombre debe tener entre 2 y 100 caracteres.', 'Error');
      return false;
    }

    if (!nameRegex.test(employee.name)) {
      this.toastr.error('El nombre no puede contener números o caracteres especiales.', 'Error');
      return false;
    }

    return true;
  }

   // Capitaliza el nombre y apellidos según la regla
   formatName(name: string): string {
    return name.split(' ')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
               .join(' ');
  }


    checkEmployeeNameExists(name: string): boolean {
      return this.employeesList.some(employee => employee.name.toLowerCase() === name.toLowerCase());
    }


  addEmployee(employee: Employee) {
    if (!this.validateEmployee(employee)) {
      return; // Si no pasa las validaciones, no se procede
    }

    // Verificar si el nombre ya existe en la lista local de empleados
    if (this.checkEmployeeNameExists(employee.name)) {
      this.toastr.error('El nombre del empleado ya existe.', 'Error');
      console.log("nombre repetido")
      return; // Detiene el proceso si el nombre ya existe
    }

    employee.name = this.formatName(employee.name); // Aplica la capitalización

    if (employee.id == 0) {
      employee.createdDate = new Date().toISOString();
      this.employeeService.createEmployee(employee).subscribe(
        result=>this.router.navigate(['/']),
        error=>this.toastr.error('Error al crear el empleado: ' + error.message) // Error del backend
      );
    }
    else {
      employee.createdDate = new Date().toISOString();
      this.employeeService.updateEmployee(employee).subscribe(
        result=>this.router.navigate(['/']),
        error=>this.toastr.error('Error al actualizar el empleado: ' + error.message) // Error del backend
    );

    }
    this.submitBtnText = "";
    this.imgLoadingDisplay = 'inline';
  }

  editEmployee(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(res => {
      this.newEmployee.id = res.id;
      this.newEmployee.name = res.name
      this.submitBtnText = "Edit";
    });
  }

}
