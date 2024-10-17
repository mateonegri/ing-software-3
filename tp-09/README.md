### 1- Desarrollo:

#### 1.1 Modificar nuestro pipeline para incluir el deploy en QA y PROD de Imagenes Docker en Servicio Azure App Services con Soporte para Contenedores
- Desarrollo del punto 1.1: 
	
  	- ##### 1.1.1 - Agregar a nuestro pipeline una nueva etapa que dependa de nuestra etapa de Construcción y Pruebas y de la etapa de Construcción de Imagenes Docker y subida a ACR realizada en el TP08
  	    
  	  - Agregar tareas para crear un recurso Azure Container Instances que levante un contenedor con nuestra imagen de back utilizando un AppServicePlan en Linux
  	  ```yaml
		#---------------------------------------
		### STAGE DEPLOY TO AZURE APP SERVICE QA
		#---------------------------------------
		- stage: DeployImagesToAppServiceQA
		  displayName: 'Desplegar Imagenes en Azure App Service (QA)'
		  dependsOn: 
		  - BuildAndTestBackAndFront
		  - DockerBuildAndPush
		  condition: succeeded()
		  jobs:
		    - job: DeployImagesToAppServiceQA
		      displayName: 'Desplegar Imagenes de API y Front en Azure App Service (QA)'
		      pool:
		        vmImage: 'ubuntu-latest'
		      steps:
		        #------------------------------------------------------
		        # DEPLOY DOCKER API IMAGE TO AZURE APP SERVICE (QA)
		        #------------------------------------------------------
		        - task: AzureCLI@2
		          displayName: 'Verificar y crear el recurso Azure App Service para API (QA) si no existe'
		          inputs:
		            azureSubscription: '$(ConnectedServiceName)'
		            scriptType: 'bash'
		            scriptLocation: 'inlineScript'
		            inlineScript: |
		              # Verificar si el App Service para la API ya existe
		              if ! az webapp list --query "[?name=='$(WebAppApiNameContainersQA)' && resourceGroup=='$(ResourceGroupName)'] | length(@)" -o tsv | grep -q '^1$'; then
		                echo "El App Service para API QA no existe. Creando..."
		                # Crear el App Service sin especificar la imagen del contenedor
		                az webapp create --resource-group $(ResourceGroupName) --plan $(AppServicePlanLinux) --name $(WebAppApiNameContainersQA) --deployment-container-image-name "nginx"  # Especifica una imagen temporal para permitir la creación
		              else
		                echo "El App Service para API QA ya existe. Actualizando la imagen..."
		              fi
		
		              # Configurar el App Service para usar Azure Container Registry (ACR)
		              az webapp config container set --name $(WebAppApiNameContainersQA) --resource-group $(ResourceGroupName) \
		                --container-image-name $(acrLoginServer)/$(backImageName):$(backImageTag) \
		                --container-registry-url https://$(acrLoginServer) \
		                --container-registry-user $(acrName) \
		                --container-registry-password $(az acr credential show --name $(acrName) --query "passwords[0].value" -o tsv)
		              # Establecer variables de entorno
		              az webapp config appsettings set --name $(WebAppApiNameContainersQA) --resource-group $(ResourceGroupName) \
		                --settings ConnectionStrings__DefaultConnection="$(cnn-string-qa)" \
	
  	  ```

Primero, creamos un plan de linux en Azure.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image36.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image35.png)

Ahora agregamos al pipeline las tareas para hacer el deploy a App Service para contenedores.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image34.png)

Para esto, agregamos las siguientes variables.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image33.png)

Ahora corremos el pipeline:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image31.png)

Y vemos que se ejecuto correctamente.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image32.png)

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image30.png)

#### 1.2 Desafíos:

Para realizar los desafios use un pipeline con templates que se llama tp-09-desafio. 

- 1.2.1 Agregar tareas para generar Front en Azure App Service con Soporte para Contenedores

Agregamos las siguientes tareas:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image29.png)

Corremos el pipeline:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image28.png)

Y vemos que ahora se creo el container de front.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image27.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image26.png)
  
- 1.2.2 Agregar variables necesarias para el funcionamiento de la nueva etapa considerando que debe haber 2 entornos QA y PROD para Back y Front.

Agregamos la variable de coneccion para prod.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image25.png)

Agregamos las API URLs

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image24.png)

- 1.2.3 Agregar tareas para correr pruebas de integración en el entorno de QA de Back y Front creado en Azure App Services con Soporte para Contenedores.

Agregamos las siguientes tareas para correr tests de integracion:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image23.png)

Corremos el pipeline:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image21.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image20.png)

Las pruebas se ejecutaron correctamente.

- 1.2.4 Agregar etapa que dependa de la etapa de Deploy en QA que genere un entorno de PROD.

Agregamos el siguiente stage donde se hace el deploy de front y de back en PROD con aprobacion manual.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image19.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image18.png)

Corremos el pipeline y vemos que cuando pasa la etapa de QA nos pide aprobacion.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image15.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image14.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image13.png)

Vemos que funciona correctamente.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image12.png)
  
- 1.2.5 Entregar un pipeline que incluya:
  - A) Etapa Construcción y Pruebas Unitarias y Code Coverage Back y Front
  - B) Construcción de Imágenes Docker y subida a ACR
  - C) Deploy Back y Front en QA con pruebas de integración para Azure Web Apps
  - D) Deploy Back y Front en QA con pruebas de integración para ACI
  - E) Deploy Back y Front en QA con pruebas de integración para Azure Web Apps con Soporte para contenedores
  - F) Aprobación manual de QA para los puntos C,D,E
  - G) Deploy Back y Front en PROD para Azure Web Apps
  - H) Deploy Back y Front en PROD para ACI
  - I) Deploy Back y Front en PROD para Azure Web Apps con Soporte para contenedores
 
Para este desafio, cree los siguientes templates.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image11.png)

Y los agregue al pipeline. Los templates para deployar a WebApps son las tareas usadas en el tp-07, y los templates de deploy a 
container instances son las tareas usadas en el tp-08.

![]()

Corremos el pipeline. Los deploy a QA funcionan.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image10.png)

Vemos que pide aprobacion cuando llega a PROD.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image9.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image8.png)

Ahora corroboramos que funcionen los deploy de PROD. 

WebApps:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image7.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image2.png)

Container Instances:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image4.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image5.png)

App Service con soporte de Contenedores:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image0.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image6.png)

Una vez deployados, termina el pipeline.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image1.png)

Y vemos que se crean todos los recursos en Azure.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-09/images/image3.png)




