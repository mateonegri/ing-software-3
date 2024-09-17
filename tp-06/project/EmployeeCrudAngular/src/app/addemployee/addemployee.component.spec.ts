import { TestBed } from '@angular/core/testing';
import { AddemployeeComponent } from './addemployee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // para simular observables
import { DatePipe } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Employee } from '../employee.model';

describe('AddemployeeComponent', () => {
  let component: AddemployeeComponent;
  let fixture: any;
  let toastrService: ToastrService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddemployeeComponent, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        DatePipe,
        {
          provide: ActivatedRoute, // Simula ActivatedRoute
          useValue: {
            params: of({ id: 1 }) // simula el parámetro id en la URL
          }
        }
      ]
    }).compileComponents();

  fixture = TestBed.createComponent(AddemployeeComponent);
  component = fixture.componentInstance;
  toastrService = TestBed.inject(ToastrService);

  spyOn(toastrService, 'error'); // Simulate the error Toastr
});

it('should create', () => {
  expect(component).toBeTruthy();
});

it('should show error if name is empty', () => {
  const employee: Employee = new Employee(0, '', '');
  const isValid = component.validateEmployee(employee);
  expect(isValid).toBeFalse();
  expect(toastrService.error).toHaveBeenCalledWith('El nombre es obligatorio.', 'Error');
});

it('should show error if name length is less than 2', () => {
  const employee: Employee = new Employee(0, 'A', '');
  const isValid = component.validateEmployee(employee);
  expect(isValid).toBeFalse();
  expect(toastrService.error).toHaveBeenCalledWith('El nombre debe tener entre 2 y 100 caracteres.', 'Error');
});

it('should show error if name length exceeds 100 characters', () => {
  const longName = 'A'.repeat(101);
  const employee: Employee = new Employee(0, longName, '');
  const isValid = component.validateEmployee(employee);
  expect(isValid).toBeFalse();
  expect(toastrService.error).toHaveBeenCalledWith('El nombre debe tener entre 2 y 100 caracteres.', 'Error');
});

it('should show error if name contains numbers or special characters', () => {
  const employee: Employee = new Employee(0, 'John123', '');
  const isValid = component.validateEmployee(employee);
  expect(isValid).toBeFalse();
  expect(toastrService.error).toHaveBeenCalledWith('El nombre no puede contener números o caracteres especiales.', 'Error');
});

it('should capitalize name correctly', () => {
  const formattedName = component.formatName('john doe');
  expect(formattedName).toBe('John Doe');
});

it('should return true if employee name exists in the list', () => {
  component.employeesList = [new Employee(1, 'John Doe', '')];
  const exists = component.checkEmployeeNameExists('john doe');
  expect(exists).toBeTrue();
});

it('should return false if employee name does not exist in the list', () => {
  component.employeesList = [new Employee(1, 'John Doe', '')];
  const exists = component.checkEmployeeNameExists('Jane Doe');
  expect(exists).toBeFalse();
});

});