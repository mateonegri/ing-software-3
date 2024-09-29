## Trabajo Practico 7
### 1- Desarrollo:
#### Prerequisitos:

#### 1.1 Agregar Code Coverage a nuestras pruebas unitarias de backend y front-end e integrarlas junto con sus resultados en nuestro pipeline de build.
- Desarrollo del punto 1.1: 
	- ##### 1.1.1 En el directorio raiz de nuestro proyecto Angular instalar el siguiente paquete:
  	```bash
	npm install karma-coverage --save-dev
   	```
   	 - ##### 1.1.2 Editar nuestro archivo karma.conf.js para que incluya reporte de cobertura
  	```javascript
	module.exports = function (config) {
	  config.set({
	    frameworks: ['jasmine', '@angular-devkit/build-angular'],
	    plugins: [
	      require('karma-jasmine'),
	      require('karma-chrome-launcher'),
	      require('karma-junit-reporter'),
	      require('karma-coverage'),
	      require('@angular-devkit/build-angular/plugins/karma')
	    ],
	    reporters: ['progress', 'junit', 'coverage'],
	    junitReporter: {
	      outputDir: 'test-results',
	      outputFile: 'test-results.xml',
	      useBrowserName: false
	    },
	    coverageReporter: {
	      type: 'lcov',
	      dir: require('path').join(__dirname, './coverage'),
	      subdir: '.',
	      file: 'lcov.info'
	    },
	    preprocessors: {
	      // Añade los archivos que deseas instrumentar para la cobertura
	      'src/**/*.ts': ['coverage'], // Asegúrate de instrumentar los archivos de tu aplicación
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
   	- ##### 1.1.3 En el dir raiz del proyecto EmployeeCrudApi.Tests ejecutar:
   	  ```bash
   	  dotnet add package coverlet.collector
   	  ```
   	- ##### 1.1.4 Agregar a nuestro pipeline ANTES del Build de Back la tarea de test con los argumentos especificados y la de publicación de resultados de cobertura:
	```yaml
    - task: DotNetCoreCLI@2
      displayName: 'Ejecutar pruebas de la API'
      inputs:
        command: 'test'
        projects: '**/*.Tests.csproj'  # Asegúrate de que el patrón apunte a tu proyecto de pruebas
        arguments: '--collect:"XPlat Code Coverage"'

    - task: PublishCodeCoverageResults@2
      inputs:
        summaryFileLocation: '$(Agent.TempDirectory)/**/*.cobertura.xml'
        failIfCoverageEmpty: false
      displayName: 'Publicar resultados de code coverage del back-end'
	```
 	- ##### 1.1.5 Agregar a nuestro pipeline ANTES del Build de front la tarea de test y la de publicación de los resultados.
	   ```yaml
	    - script: npx ng test --karma-config=karma.conf.js --watch=false --browsers ChromeHeadless --code-coverage
	      displayName: 'Ejecutar pruebas del front'
	      workingDirectory: $(projectPath)
	      continueOnError: true  # Para que el pipeline continúe aunque falle
	    
	    - task: PublishCodeCoverageResults@2
	      inputs:
	        summaryFileLocation: '$(projectPath)/coverage/lcov.info'
	        failIfCoverageEmpty: false
	      condition: always()  # Esto asegura que se ejecute siempre
	      displayName: 'Publicar resultados de code coverage del front'  
	    
	    - task: PublishTestResults@2
	      inputs:
	        testResultsFormat: 'JUnit'
	        testResultsFiles: '$(projectPath)/test-results/test-results.xml'
	        failTaskOnFailedTests: true
	      condition: always()  # Esto asegura que se ejecute siempre
	      displayName: 'Publicar resultados de pruebas unitarias del front'
    	```
	
	- ##### 1.1.6 Ejecutar el pipeline y analizar el resultado de las pruebas unitarias y la cobertura de código.

 	![image](https://github.com/user-attachments/assets/2798520e-a33e-40bf-9337-c822dfb7e805)

  	![image](https://github.com/user-attachments/assets/e489405d-85a3-4cc9-ade3-19f5b98a3737)


#### 1.2 Agregar Análisis Estático de Código con SonarCloud:

SonarCloud https://www.sonarsource.com/products/sonarcloud/ es una plataforma de análisis de calidad de código basada en la nube que ayuda a los equipos de desarrollo a detectar errores, vulnerabilidades de seguridad, malas prácticas y problemas de mantenibilidad en el código. Proporciona análisis estático de código para múltiples lenguajes, como Java, .NET, JavaScript, TypeScript, Python, y más, ofreciendo métricas detalladas sobre la cobertura de pruebas, duplicación de código, complejidad ciclomatica, y deuda técnica. Además, SonarCloud se integra fácilmente con sistemas de CI/CD y plataformas de control de versiones como GitHub, Azure DevOps y Bitbucket, lo que permite un análisis continuo del código en cada commit o despliegue.

La plataforma destaca por ofrecer un tablero interactivo donde se pueden visualizar y priorizar los problemas detectados, facilitando la refactorización y la mejora de la calidad del código. SonarCloud permite a los equipos identificar vulnerabilidades y puntos críticos de seguridad, además de generar informes de cobertura de pruebas automatizadas, ayudando a mantener el código limpio, seguro y fácil de mantener a lo largo del ciclo de vida del desarrollo.
	
- Desarrollo del punto 1.2: Demostración de cómo integrar SonarCloud en un pipeline de CI/CD y cómo leer los reportes de análisis estático.
	- ##### 1.2.1 Integraremos SonarCloud para analizar el código fuente. Configurar SonarCloud en nuestro pipeline siguiendo instructivo 5.1
	  - Antes de nuestra tarea de Build del Back:
		```yaml
		    
	 	    - task: SonarCloudPrepare@2
		      inputs:
		        SonarCloud: 'SonarCloud' #Nombre de nuestra Service Connection a SonarCloud
		        organization: 'ingsoft3ucc'  #Nombre de nuestra organizacion SonarCloud
		        scannerMode: 'MSBuild'
		        projectKey: 'Angular_WebAPINetCore8_CRUD_Sample'  #Key de nuestro proyecto en SonarCloud
		        projectName: 'Angular_WebAPINetCore8_CRUD_Sample' #Nombre de nuestro proyecto en SonarCloud
		      displayName: 'Prepare SonarCloud'
	        
		 ```

  	  - Despues de nuestra tarea de Build del Back:
		   ```yaml
		     - task: SonarCloudAnalyze@2
		       inputs:
		         jdkversion: 'JAVA_HOME_17_X64'
		       displayName: 'Analyze SonarCloud'
		      
		    - task: SonarCloudPublish@2
		      displayName: 'Publish SonarCloud'
		      inputs:
		        pollingTimeoutSec: '300'
	    ```
  	- ##### 1.2.2 Vemos el resultado de nuestro pipeline, en extensions tenemos un link al análisis realizado por SonarCloud

  	![image](https://github.com/user-attachments/assets/312a3c9f-659e-4249-b204-aa1abd312cc2)
  
	- ##### 1.2.3 Ir al link y analizar toda la información obtenida. Detallar en la entrega del TP los puntos más relevantes del informe, qué significan y para qué sirven.

  	![image](https://github.com/user-attachments/assets/6e1ce439-5f57-41b9-8624-1491d57120bd)


#### 1.3 Pruebas de Integración con Cypress:

- Desarrollo del punto 1.4: 
	- ##### 1.3.1 En el directorio raiz de nuestro proyecto Angular instalar el siguiente paquete:
  	```bash
	npm install cypress --save-dev
   	```
   	- ##### 1.3.2 Abrir Cypress:
  	```bash
   	npx cypress open
   	```
	- ##### 1.3.3 Inicializar Cypress en nuestro proyecto como se indica en el instructivo 5.2
   	Esto creará automáticamente una estructura de carpetas dentro de tu proyecto. 
	![image](https://github.com/user-attachments/assets/b0d3de46-91b2-4d19-bff0-7998a78c1521)

	 - cypress/e2e: Aquí es donde se almacenan tus archivos de prueba.
	 - cypress/fixtures: Aquí se almacenan los datos de prueba que puedes usar en tus tests.
	 - cypress/support: Contiene archivos de configuración y comandos personalizados.

  	- ##### 1.3.4 Crear nuestra primera prueba navegando a nuestro front.
 	En la carpeta cypress/e2e, crear un archivo con el nombre primer_test.js y agregar el siguiente código para probar la página de inicio de nuestro front:
  	```js
	  describe('Mi primera prueba', () => {
	  it('Carga correctamente la página de ejemplo', () => {
	    cy.visit('https://as-crud-web-api-qa.azurewebsites.net/') // Colocar la url local o de Azure de nuestro front
	    cy.get('h1').should('contain', 'EmployeeCrudAngular') // Verifica que el título contenga "EmployeeCrudAngular"
	  })
	})
   	```
	- ##### 1.3.5 Correr nuestra primera prueba
 	Si está abierta la interfaz gráfica de Cypress, aparecerá el archivo primer_test.cy.js en la lista de pruebas. Clic en el archivo para ejecutar la prueba.
  	<img width="1154" alt="image" src="https://github.com/user-attachments/assets/f34a9af2-1692-441a-b1f0-37055ae2d7a0">
   	<img width="1436" alt="image" src="https://github.com/user-attachments/assets/8758c000-2f40-4a05-8cb0-c5fa56d583f9">
	
	También es posible ejecutar Cypress en modo "headless" (sin interfaz gráfica) utilizando el siguiente comando:
	```bash
 	npx cypress run
 	```
 	![image](https://github.com/user-attachments/assets/78ecba2e-9e40-4eb0-a286-56908723dee1)


	- ##### 1.3.6 Modificar nuestra prueba para que falle.
	  - Editamos el archivo primer_test.cy.js y hacemos que espere otra cosa en el título
	  - Ejecutamos cypress en modo headless
	 ![image](https://github.com/user-attachments/assets/b431354b-0e4f-492e-8c40-2993991ac76d)

	Cypress captura automáticamente pantallas cuando una prueba falla. Las capturas de pantalla se guardan en la carpeta `cypress/screenshots`.
	<img width="1136" alt="image" src="https://github.com/user-attachments/assets/e6f26695-def4-4596-b5c6-152f5b95aa59">

 	- ##### 1.3.6 Grabar nuestras pruebas para que Cypress genere código automático y genere reportes:
    	 - Cerramos Cypress
	 - Editamos el archivo cypress.config.ts incluyendo la propiedad **experimentalStudio** en true y la configuración de reportería.
	      ```typescript
		import { defineConfig } from "cypress";

		export default defineConfig({
		  e2e: {
		    setupNodeEvents(on, config) {
		      // implement node event listeners here
		    },
		    reporter: 'junit',  // Configura el reporter a JUnit
		    reporterOptions: {
		      mochaFile: 'cypress/results/results-[hash].xml',  // Directorio y nombre de los archivos de resultados
		      toConsole: true,  // Opcional: imprime los resultados en la consola
		      },
		  },
		  experimentalStudio: true,
		});

		```
       - Corremos nuevamente Cypress con npx cypress open, una vez que se ejecute nuestra prueba tendremos la opción de "Add Commands to Test". Esto permitirá interactuar con la aplicación y generar automáticamente comandos de prueba basados en las interacciones con la página:
         
         <img width="748" alt="image" src="https://github.com/user-attachments/assets/73c287fc-de00-477d-abbf-d905eb11cdb3">

       - Por ejemplo, si agregamos un nuevo empleado y luego verificamos que esté en la lista, Cypress nos generará un código como este:
 	```typescript
  	escribe('Mi primera prueba', () => {
	  it('Carga correctamente la página de ejemplo', () => {
        cy.visit('https://as-crud-web-api-qa.azurewebsites.net/') // Colocar la url local o de Azure de nuestro front
        cy.get('h1').should('contain', 'EmployeeCrudAngular') // Verifica que el título contenga "EmployeeCrudAngular"
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.btn').click();
        cy.get('.form-control').clear('O');
        cy.get('.form-control').type('Oso Pratto');
        cy.get('.btn').click();
        cy.get(':nth-child(15) > :nth-child(2)').click();
        cy.get(':nth-child(15) > :nth-child(2)').should('have.text', ' Oso Pratto ');
        /* ==== End Cypress Studio ==== */
      })
	})
 	```
  	- Por supuesto que habrá que hacerle ajustes, como por ejemplo que se fije siempre en la última fila de la grilla y no en la posición 15 como lo grabó, es ahí cuando consultando la documentación de Cypress debemos ver cómo modificar el código, en nuestro caso de ejemplo sería así:
  	  ```typescript
  	  cy.get('tr:last-child > :nth-child(2)').should('have.text', ' Oso Pratto ');
  	  ```
  	- ##### 4.3.7 Hacemos prueba de editar un empleado
    	 - Creamos en cypress/e2e/ un archivo editEmployee_test.cy.js con el siguiente contenido, guardamos y aparecerá en Cypress:
  	       
		```js
  		describe('editEmployeeTest', () => {
			  it('Carga correctamente la página de ejemplo', () => {
		        cy.visit('https://as-crud-web-api-qa.azurewebsites.net/') // Colocar la url local o de Azure de nuestro front
		      })
			})
  	  	```
  	
 	<img width="845" alt="image" src="https://github.com/user-attachments/assets/d37524a6-fcfc-431c-9a69-594bf4dbbc62">
	- Hacemos "Add command to the test" y empezamos a interactuar con la página
 	<img width="679" alt="image" src="https://github.com/user-attachments/assets/e7ad9389-3f68-42fc-95f2-68a7a79a029a">
  
  	- Hacemos algunos ajustes al código generado:
   
  	```js
	describe('editEmployeeTest', () => {
	  it('Edita correctamente un empleado', () => {
	    cy.visit('https://as-crud-web-api-qa.azurewebsites.net/') // URL del front
	
	    // Haz clic en el botón de editar empleado
	    cy.get(':nth-child(7) > :nth-child(4) > a > .fa').click();
	
	    // Asegúrate de que el campo de texto esté visible y habilitado
	    cy.get('.form-control')
	      .should('be.visible')
	      .should('not.be.disabled')
	
	    cy.wait(500);
	
	    cy.get('.form-control').type('{selectall}{backspace}')  // Selecciona todo el texto y lo elimina
	
	    cy.wait(500);
	
	    cy.get('.form-control').should('have.value', '');  // Verifica que el campo esté vacío
	
	    // Escribe el nuevo nombre 
	    cy.get('.form-control').type('Emilia Schwindt Modified');
	
	    // Envía el formulario
	    cy.get('.btn').click();
	
	    // Verifica que el nombre fue actualizado correctamente
	    cy.get(':nth-child(7) > :nth-child(2)').should('have.text', ' Emilia Schwindt Modified ');
	  });
	});

  	```

#### 1.4 Desafíos:
- Integrar en el pipeline SonarCloud para nuestro proyecto Angular, mostrar el resultado obtenido en SonarCloud
- Implementar en Cypress pruebas de integración que incluya los casos desarrollados como pruebas unitarias del front en el TP06.
- Incorporar al pipeline de Deploy la ejecución de las pruebas de integración y la visualización de sus resultados.
- **Resultado esperado**:
    - Un Pipeline en YAML que incluya a) Build de QA y Front con ejecución y resultado de pruebas de code coverage, pruebas unitarias y análisis de Sonar Cloud y b) Deploy a WebApp(s) de QA y Front que incluya ejecución y resultado de pruebas de integración

    <img width="1318" alt="image" src="https://github.com/user-attachments/assets/76324d85-3706-495d-ad56-6054371a3019">

    - Dos Stages: Una para Build, Test Unitarios, Code Coverage y SonarCloud y otra para el Deploy a QA con Tests de Integración

	<img width="296" alt="image" src="https://github.com/user-attachments/assets/03a69736-a1c1-4ce2-a648-4237da015150">

    - En la pestaña Test, poder visualizar los Test Unitarios de Front y Back y los Test de Integracion:

	<img width="1262" alt="image" src="https://github.com/user-attachments/assets/83fe8613-631d-4c4d-9042-37455701c0e3">

    - En la pestaña Code Coverage, visualizar la cobertura de las pruebas unitarias de Back y de Front:

	<img width="1199" alt="image" src="https://github.com/user-attachments/assets/e3d48d54-945c-4b99-afbe-6a72b5f95c3f">

    - En la pestaña Extensions, ver el análisis de SonarCloud en verde

       <img width="720" alt="image" src="https://github.com/user-attachments/assets/c5511fb6-3d39-4b9c-ad9a-e688bdaa3016">
    
    - Un documento de una carilla explicando qué información pudieron sacar del análisis de Sonar Cloud y de las pruebas de cobertura.
