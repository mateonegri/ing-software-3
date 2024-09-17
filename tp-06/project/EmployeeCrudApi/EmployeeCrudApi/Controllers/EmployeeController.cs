using EmployeeCrudApi.Data;
using EmployeeCrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace EmployeeCrudApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet]
        public async Task<Employee> GetById(int id)
        {
            return await _context.Employees.FindAsync(id);

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            if (employee == null || string.IsNullOrWhiteSpace(employee.Name) || employee.Name.Length < 2 || employee.Name.Length > 100)
            {
                return BadRequest("Nombre del empleado inválido.");
            }

            var existingEmployee = await _context.Employees
            .Where(e => e.Name.ToLower() == employee.Name.ToLower())
            .FirstOrDefaultAsync();

            if (existingEmployee != null)
            {
                return BadRequest("El nombre del empleado ya existe.");
            }

            employee.Name = FormatName(employee.Name);
            employee.CreatedDate = DateTime.Now;
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = employee.Id }, employee);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Employee employee)
        {
            if (employee == null || string.IsNullOrWhiteSpace(employee.Name) || employee.Name.Length < 2 || employee.Name.Length > 100)
            {
                return BadRequest("Nombre del empleado inválido.");
            }

            var existingEmployee = await _context.Employees
            .Where(e => e.Name.ToLower() == employee.Name.ToLower())
            .FirstOrDefaultAsync();
            
            if (existingEmployee != null)
            {
                return BadRequest("El nombre del empleado ya existe.");
            }

            var employeeToUpdate = await _context.Employees.FindAsync(employee.Id);
            if (employeeToUpdate == null)
            {
                return NotFound();
            }

            employeeToUpdate.Name = FormatName(employee.Name);
            await _context.SaveChangesAsync();

            return Ok(employeeToUpdate);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var employeeToDelete = await _context.Employees.FindAsync(id);
            if (employeeToDelete == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employeeToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private string FormatName(string name)
        {
            // Capitalize first letter of each name and make last name uppercase
            var nameParts = name.Split(' ');
            for (int i = 0; i < nameParts.Length - 1; i++)
            {
                nameParts[i] = char.ToUpper(nameParts[i][0]) + nameParts[i].Substring(1).ToLower();
                Console.Write(nameParts[i]);
            }
            if (nameParts.Length > 0)
            {
                nameParts[nameParts.Length - 1] = nameParts[nameParts.Length - 1].ToUpper();
            }
            return string.Join(' ', nameParts);
        }
    }
}

