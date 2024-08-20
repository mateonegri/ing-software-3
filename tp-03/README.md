## Trabajo Práctico 3 - Introducción a Azure Devops

### 1- Objetivos de Aprendizaje
 - Familiarizarse con la plataforma Azure Devops 

### 2- Consignas a desarrollar en el trabajo práctico:

 **¿Qué es Azure DevOps?**
  - Breve descripción de Azure DevOps como un conjunto de herramientas para la colaboración en desarrollo de software.
  - Beneficios de utilizar Azure DevOps en comparación con otras soluciones.

- **Componentes Principales de Azure DevOps**
  - **Azure Repos**
    - Sistema de control de versiones con Git o TFVC.
    - Funcionalidades clave: branching, pull requests, code reviews.
  - **Azure Pipelines**
    - CI/CD (Integración Continua y Entrega Continua).
    - Creación y gestión de pipelines para la automatización de build, test y deploy.
  - **Azure Boards**
    - Gestión de proyectos con Kanban y Scrum.
    - Seguimiento de tareas, bugs, y trabajo en curso.
  - **Azure Artifacts**
    - Gestión de paquetes (NuGet, npm, Maven).
    - Uso de feeds para compartir artefactos entre equipos.
  - **Azure Test Plans**
    - Herramientas para pruebas manuales y automatizadas.
    - Gestión de casos de prueba y reportes de calidad.
- **Integración con otras herramientas**
  - GitHub, Jenkins, Docker, Kubernetes.
- **Marketplace de extensiones**
  - Añadir funcionalidades adicionales a Azure DevOps.

#### 3- Pasos del TP
 - 3.1 Crear una cuenta en Azure DevOps
 - 3.2 Crear un proyecto Sample01

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image0.png)

 - 3.3 Crear un repo GIT desde cero

Para crear el repo, entramos a la seccion de Repos de Azure DevOps y creamos un nuevo repositorio.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image6.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image2.png) 

 - 3.4 Crear un proyecto Sample02

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image3.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image4.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image5.png)

 - 3.5 Importar un repo desde GitHub: https://github.com/ingsoft3ucc/SimpleWebAPI.git

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image6.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image7.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image8.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image9.png)

 - 3.6 Realizar un cambio en un archivo, y subirlo al repo de ADO.

Primero lo clonamos.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image10.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image14.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image15.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image16.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image18.png)

 - 3.7 Crear un pipeline, solicitar acceso a jobs de paralelismo

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image11.png)

Seguimos los pasos del wizard.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image19.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image20.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image21.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image22.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image23.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image17.png)

Vemos que da un error ya quye no tenemos acceso a jobs de parelelismo, asique lo pedimos llenando el formulario.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image24.png)

 - 3.8 Cambiar el tipo de proceso de Basic a Agile

Para esto, entramos a la configuracion del proyecto. 

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image25.png)

Vamos a todos los procesos, seleccionamos nuestro proyecto y cambiamos de Basic a Agile.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image27.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image29.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image30.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image26.png)

 - 3.8 Crear un sprint

Vamos a la seccion de process.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image32.png)

Seleccionamos crear nuevo sprint.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image34.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image28.png)

Y vemos que se creo un nuevo sprint.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image33.png)

 - 3.9 Crear User Stories

Vamos a la seccion de Work Items y seleccionamos 'New work item'.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image35.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image36.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-03/images/image37.png)

 - 3.10 Crear Tasks y Bugs

Vamos nuevamente a la seccion de Work Items. 



#### 4- Presentación del trabajo práctico.
Subir un al repo con las capturas de pantalla de los pasos realizados y colocar en el excel de repos (https://docs.google.com/spreadsheets/d/1mZKJ8FH390QHjwkABokh3Ys6kMOFZGzZJ3-kg5ziELc/edit?gid=0#gid=0) la url del proyecto de AzureDevops (
