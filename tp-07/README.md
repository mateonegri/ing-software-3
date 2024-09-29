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
	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image47.png)

   	- ##### 1.1.3 En el dir raiz del proyecto EmployeeCrudApi.Tests ejecutar:
   	  ```bash
   	  dotnet add package coverlet.collector
   	  ```
	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image46.png)

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
 	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image40.png)
  
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
	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image45.png)

	- ##### 1.1.6 Ejecutar el pipeline y analizar el resultado de las pruebas unitarias y la cobertura de código.

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image44.png)
	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image43.png)

	En las imagenes podemos ver que se corrieron 21  pruebas unitarias, de las cuales todas fueron exitosas. Y en la imagen de cobertura de codigo, podemos ver que 55,56% se encuentra cubierto. Los archivos mas "importantes", como EmployeeController.cs y ApplicationDbContext.cs tienen casi un 100% de cobertura asegurandonos que la aplicacion pueda funcionar.

#### 1.2 Agregar Análisis Estático de Código con SonarCloud:

SonarCloud https://www.sonarsource.com/products/sonarcloud/ es una plataforma de análisis de calidad de código basada en la nube que ayuda a los equipos de desarrollo a detectar errores, vulnerabilidades de seguridad, malas prácticas y problemas de mantenibilidad en el código. Proporciona análisis estático de código para múltiples lenguajes, como Java, .NET, JavaScript, TypeScript, Python, y más, ofreciendo métricas detalladas sobre la cobertura de pruebas, duplicación de código, complejidad ciclomatica, y deuda técnica. Además, SonarCloud se integra fácilmente con sistemas de CI/CD y plataformas de control de versiones como GitHub, Azure DevOps y Bitbucket, lo que permite un análisis continuo del código en cada commit o despliegue.

La plataforma destaca por ofrecer un tablero interactivo donde se pueden visualizar y priorizar los problemas detectados, facilitando la refactorización y la mejora de la calidad del código. SonarCloud permite a los equipos identificar vulnerabilidades y puntos críticos de seguridad, además de generar informes de cobertura de pruebas automatizadas, ayudando a mantener el código limpio, seguro y fácil de mantener a lo largo del ciclo de vida del desarrollo.

Primero nos creamos una cuenta en Sonar Cloud y vemos lo siguiente:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image42.png)

Seleccionamos el proyecto a analizar.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image41.png)

Ahora seguimos los pasos que siguen para setear el pipeline para analizar el codigo con Sonar Cloud.

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
     	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image39.png)

  	- ##### 1.2.2 Vemos el resultado de nuestro pipeline, en extensions tenemos un link al análisis realizado por SonarCloud

    	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image36.png)
  
	- ##### 1.2.3 Ir al link y analizar toda la información obtenida. Detallar en la entrega del TP los puntos más relevantes del informe, qué significan y para qué sirven.

     	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image35.png)

  En la imagen vemos los problemas detectados por Sonar Cloud. Podemos ver que hay issues relacionados a la calidad del software y otros a atributos de codigo limpio.

  	1. Clean Code Atributtes:
  	   - Consistencia: Señala si el código sigue un estilo coherente y consistente. La consistencia es crucial para que el código sea más legible y mantenible.
  	   - Intencionalidad: Se refiere a si el código expresa claramente su propósito.
  	   - Adaptabilidad y Responsabilidad: Aunque Adaptabilidad tiene 0 problemas, Responsabilidad tiene 3. La Adaptabilidad indica qué tan fácil es modificar el código para adaptarse a cambios, mientras que la Responsabilidad evalúa si cada clase o método tiene una sola responsabilidad.
  	     
  	2. Software Quality Attributes
  	   - Seguridad: Muestra problemas relacionados con la seguridad del código.
  	   - Confiabilidad: Indica la capacidad del software para funcionar correctamente bajo condiciones esperadas.
  	   - Mantenibilidad: Evalúa cuán fácil es mantener el código.
  	     
  Y despues se muestra la severidad de los problemas ya sea alta, media o baja. Son las categorías que indican la gravedad de los problemas encontrados. La mayoría de los problemas son de severidad alta y media, lo que indica áreas críticas que requieren atención inmediata. Tambien se muestra el tipo de problemas, el esfuerzo estimado de cada problemas. SonarCloud proporciona un tiempo estimado para resolver cada problema. Esto ayuda a priorizar el trabajo y planificar las tareas necesarias para mejorar el código. Y por ultimo, nos muestra el impacto en el proyecto de cada issue encontrado. 
  De los issues que nos muestra Sonar Cloud, el que tiene severidad mas alta es el de seguridad. Este issue esta dado sobre el archivo appsettings.json, donde esta la conexion con la base de datos. El problema que detectó Sonar Cloud es que la clave y el usuario de la base de datos estan harcodeadas en el archivo, por lo tanto nos recomienda no hacer eso para evitar filtraciones de estas credenciales.

#### 1.3 Pruebas de Integración con Cypress:

- Desarrollo del punto 1.4: 
	- ##### 1.3.1 En el directorio raiz de nuestro proyecto Angular instalar el siguiente paquete:
  	```bash
	npm install cypress --save-dev
   	```
  	 ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image34.png)
  
   	- ##### 1.3.2 Abrir Cypress:
  
	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image33.png)

	Vemos que se abre lo siguiente:

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image32.png)

	- ##### 1.3.3 Inicializar Cypress en nuestro proyecto como se indica en el instructivo 5.2
   	Esto creará automáticamente una estructura de carpetas dentro de tu proyecto. 
	![image](https://github.com/user-attachments/assets/b0d3de46-91b2-4d19-bff0-7998a78c1521)
	 - cypress/e2e: Aquí es donde se almacenan tus archivos de prueba.
	 - cypress/fixtures: Aquí se almacenan los datos de prueba que puedes usar en tus tests.
	 - cypress/support: Contiene archivos de configuración y comandos personalizados.
    
	Siguiendo los pasos del instructivo 5.2, seleccionamos Scaffold Example Specs y corremos uno de los tests de ejemplo para ver como funcionan.
	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image32.png)
	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image31.png)

	Y vemos que se crearon las carpetas que se explicaron mas arriba.

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image30.png)

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

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image29.png)

	Reemplazamos la URL del comando cy.visit por la URL del frontend de nuestro proyecto.

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image27.png)

	Ahora si entramos a cypress vemos:

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image28.png)

	- ##### 1.3.5 Correr nuestra primera prueba
 	Si está abierta la interfaz gráfica de Cypress, aparecerá el archivo primer_test.cy.js en la lista de pruebas. Clic en el archivo para ejecutar la prueba.

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image28.png)
	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image25.png)

	
	También es posible ejecutar Cypress en modo "headless" (sin interfaz gráfica) utilizando el siguiente comando:
	```bash
 	npx cypress run
 	```
 	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image24.png)
  	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image23.png)

	- ##### 1.3.6 Modificar nuestra prueba para que falle.
	  - Editamos el archivo primer_test.cy.js y hacemos que espere otra cosa en el título
 
		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image22.png)

	  - Ejecutamos cypress en modo headless
     
	 	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image21.png)

	Cypress captura automáticamente pantallas cuando una prueba falla. Las capturas de pantalla se guardan en la carpeta `cypress/screenshots`.

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

		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image20.png)

       - Corremos nuevamente Cypress con npx cypress open, una vez que se ejecute nuestra prueba tendremos la opción de "Add Commands to Test". Esto permitirá interactuar con la aplicación y generar automáticamente comandos de prueba basados en las interacciones con la página:
         
         ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image19.png)


	Despues de interactuar con la pagina y agregar un nuevo empleado y verificar que este se agregue correctamente vemos que se generó el codigo para realizar la prueba.

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image17.png)

  	- ##### 1.3.7 Hacemos prueba de editar un empleado
    	 - Creamos en cypress/e2e/ un archivo editEmployee_test.cy.js con el siguiente contenido, guardamos y aparecerá en Cypress:
  	       
		```js
  		describe('editEmployeeTest', () => {
			  it('Carga correctamente la página de ejemplo', () => {
		        cy.visit('https://as-crud-web-api-qa.azurewebsites.net/') // Colocar la url local o de Azure de nuestro front
		      })
			})
  	  	```
  	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image14.png)

	- Hacemos "Add command to the test" y empezamos a interactuar con la página

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image13.png)

	Interactuamos con la pagina editando el nombre de un empleado a "Prueba Cypress" lo que deberia agregar un empleado con el nombre "Prueba CYPRESS"
  
  	Si agarramos el codigo generado automaticamente y realizamos algunos cambios nos queda lo siguiente:

  	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image12.png)

  	Que se ahora lo corremos vemos que se ejecuta correctamente.

  	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-07/images/image11.png)

#### 1.4 Desafíos:
- Integrar en el pipeline SonarCloud para nuestro proyecto Angular, mostrar el resultado obtenido en SonarCloud

Para esto, modificamos el pipeline de la siguiente manera. En el build del front agregamos lo siguiente.

Vemos los resultados del analisis. 

- Implementar en Cypress pruebas de integración que incluya los casos desarrollados como pruebas unitarias del front en el TP06.

Para implementar cypress, primero generamos el codigo para cada caso de prueba y configuramos correctamente el cypress config file.

- Incorporar al pipeline de Deploy la ejecución de las pruebas de integración y la visualización de sus resultados.



- **Resultado**:
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
