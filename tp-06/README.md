### Desarrollo:
#### 1.1 Creación de una BD SQL Server para nuestra App
#### 2.2 Obtener nuestra App
A\. Clonar el repo https://github.com/ingsoft3ucc/Angular_WebAPINetCore8_CRUD_Sample.git

B\. Seguir las instrucciones del README.md del repo clonado prestando atención a la modificación de la cadena de conexión en el appSettings.json para que apunte a la BD creada en 4.1 

C\. Navegar a http://localhost:7150/swagger/index.html y probar uno de los controladores para verificar el correcto funcionamiento de la API.
![image](https://github.com/user-attachments/assets/a537ad2e-7c4a-4099-a3e4-fb03fc3bd1f1)

D\. Navegar a http://localhost:4200 y verificar el correcto funcionamiento de nuestro front-end Angular
![image](https://github.com/user-attachments/assets/a2858f8a-4ce7-4d49-8852-167e8cc23660)

E\. Una vez verificado el correcto funcionamiento de la Aplicación procederemos a crear un proyecto de pruebas unitarias para nuestra API.
#### 1.3 Crear Pruebas Unitarias para nuestra API
A\. En el directorio raiz de nuestro repo crear un nuevo proyecto de pruebas unitarias para nuestra API 
```bash
dotnet new xunit -n EmployeeCrudApi.Tests
```
![image](https://github.com/user-attachments/assets/faba2065-cf36-44c8-be66-c616355b7659)


B\. Instalar dependencias necesarias
#### 1.4 Creamos pruebas unitarias para nuestro front de Angular:
Intro\. 
Para las pruebas unitarias de nuestro front en Angular utilizaremos Jasmine y Karma, herramientas ampliamente utilizadas para pruebas unitarias en aplicaciones web, especialmente en proyectos de Angular.

- **Jasmine**: Es un framework de pruebas unitarias para JavaScript. Es popular porque no requiere dependencias externas y es fácil de usar. Jasmine se utiliza para escribir pruebas de manera estructurada y ofrece un conjunto de funciones para facilitar la verificación del comportamiento del código.
  - Características principales:
    - Sintaxis descriptiva: Jasmine permite escribir pruebas en un estilo de "BDD" (Desarrollo Orientado a Comportamiento). Usa palabras clave como describe, it, expect para definir pruebas de forma muy legible.
    - Sin dependencias externas: A diferencia de otros frameworks de prueba, Jasmine no necesita ninguna biblioteca externa para funcionar.
    - Espías (Spies): Jasmine permite observar llamadas a funciones, rastrearlas y verificar si fueron llamadas correctamente.

- **Karma**: Es un test runner (ejecutor de pruebas) que facilita la ejecución de pruebas en varios navegadores. Está diseñado para trabajar con frameworks de pruebas como Jasmine, Mocha, entre otros. Karma se integra perfectamente con proyectos de Angular y es parte del Angular CLI.
  - Características principales:
    - Soporte de múltiples navegadores: Karma permite ejecutar pruebas en diferentes navegadores (Chrome, Firefox, Safari, etc.) de forma automática.
    - Ejecución en modo de observación: Karma puede detectar cambios en los archivos y ejecutar las pruebas automáticamente en cuanto se modifican.
    - Generación de informes: Karma proporciona informes detallados sobre el resultado de las pruebas.
    - Integración con CI/CD: Se puede integrar con sistemas de integración continua como Azure Devops, Jenkins, Travis CI o CircleCI para ejecutar las pruebas automáticamente en un entorno controlado.
  - Flujo de trabajo con Karma:
    - Karma inicia un servidor.
    - Abre un navegador (o varios) y ejecuta las pruebas en cada uno de ellos.
    - Karma se queda a la espera de cambios en el código, ejecutando nuevamente las pruebas si detecta modificaciones.

A\. Nos posicionamos en nuestro proyecto de front, en el directorio EmployeeCrudAngular/src/app

B\. Editamos el archivo app.component.spec.ts

C\. Creamos el archivo employee.service.spec.ts reemplazando su contenido por:

E\. Editamos el archivo addemployee.component.spec.ts ubicado en la carpeta **addemployee** reemplazando su contenido por:

G\. Vemos que se abre una ventana de Karma con Jasmine en la que nos indica que los tests se ejecutaron correctamente

H\. Vemos que los tests se ejecutaron correctamente:

I\. Verificamos que no esté corriendo nuestra API navegando a http://localhost:7150/swagger/index.html y recibiendo esta salida:

J\. Los puntos G y H nos indican que se han ejecutado correctamente las pruebas inclusive sin tener acceso a la API, lo que confirma que es efectivamente un conjunto de pruebas unitarias que no requieres de una dependencia externa para funcionar.

#### 1.5 Agregamos generación de reporte XML de nuestras pruebas de front.
Para cuando integremos nuestras pruebas en un pipeline de Build, vamos a necesitar el resultado devuelto por nuestras pruebas para reportarlas junto a las pruebas de back que se reportan automaticamente. 

A\. Instalamos dependencia karma-junit-reporter
```bash
npm install karma-junit-reporter --save-dev
```
B\. En el directorio raiz de nuestro proyecto (al mismo nivel que el archivo angular.json) creamos un archivo karma.conf.js con el siguiente contenido
```bash
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: 'test-results',
      outputFile: 'test-results.xml',
      useBrowserName: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: true
  });
};
```
C\. Ejecutamos nuestros test de la siguiente manera:
```bash
ng test --karma-config=karma.conf.js --watch=false --browsers ChromeHeadless
```
D\. Verificamos que se creo un archivo test-result.xml en el directorio test-results que está al mismo nivel que el directorio src

#### 4.6 Modificamos el código de nuestra API y creamos nuevas pruebas unitarias:

A\. Realizar al menos 5 de las siguientes modificaciones sugeridas al código de la API:
  - Al agregar y al editar un empleado, controlar que el nombre del empleado no esté repetido.
  - La longitud máxima del nombre y apellido del empleado debe ser de 100 caracteres.
  - Almacenar el nombre en la BD siempre con la primera letra de los nombres en Mayuscula y todo el apellido en Mayusculas. Ejemplo, si recibo juan carlos chamizo, se debe almacenar como Juan Carlos CHAMIZO.
  - Asegurar que el nombre del empleado no contenga caracteres especiales o números, a menos que sea necesario (por ejemplo, caracteres especiales en apellidos como "O'Connor" o "García").
  - Validar que el nombre tenga un número mínimo de caracteres, por ejemplo, al menos dos caracteres para evitar entradas inválidas como "A".
  - Verificar que el nombre no contenga números, ya que no es común en los nombres de empleados.
  - Asegurar que cada parte del nombre (separada por espacios) tenga al menos un carácter o más, por ejemplo, para evitar "A B".
  - Verificar que no haya palabras vacías o que el nombre no esté compuesto solo de espacios.
  - Prohibir el uso de nombres triviales o genéricos como "Empleado", "N/A", "Nombre", etc.
  - Evitar que se ingresen caracteres repetidos de forma excesiva, como "Juuuuaannnn".
  - Implementar un filtro para evitar el uso de palabras inapropiadas, ofensivas o que puedan violar políticas internas.
En todos los casos donde no se cumplan las condiciones, la API debe devolver un error de HTTP 400 Bad Request y un Json indicando el error, por ejemplo:
```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "El nombre del empleado ya existe."
}
```

B\. Crear las pruebas unitarias necesarias para validar las modificaciones realizadas en el código

#### 4.7 Modificamos el código de nuestro Front y creamos nuevas pruebas unitarias:

A\. Realizar en el código del front las mismas modificaciones hechas a la API. 

B\. Las validaciones deben ser realizadas en el front sin llegar a la API, y deben ser mostradas en un toast como por ejemplo https://stackblitz.com/edit/angular12-toastr?file=src%2Fapp%2Fapp.component.ts o https://stackblitz.com/edit/angular-error-toast?file=src%2Fapp%2Fcore%2Frxjsops.ts

C\. Crear las pruebas unitarias necesarias en el front para validar las modificaciones realizadas en el código del front.

