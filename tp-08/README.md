### Desarrollo:
#### Prerequisitos:
 - Azure CLI instalado 

#### 1.1 Modificar nuestro pipeline para construir imágenes Docker de back y front y subirlas a ACR
- Desarrollo del punto 1.1: 
	- ##### 1.1.1 Crear archivos DockerFile para nuestros proyectos de Back y Front
   	  - En la raiz de nuestro repo crear una carpeta docker con dos subcarpetas api y front, dentro de cada una de ellas colocar los dockerfiles correspondientes para la creación de imágenes docker en función de la salida de nuestra etapa de Build y Test
        
          - DockerFile Back:
			```yaml
			 # Imagen base para ejecutar la aplicación
			FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
			WORKDIR /app
			
			# Copiar los binarios preconstruidos de la API al contenedor
			# Espera que los binarios estén en la carpeta "api" en el contexto de construcción
			COPY ./api/ ./
			
			# Exponer los puertos 80 (HTTP) y 443 (HTTPS)
			EXPOSE 80
			EXPOSE 443
			
			# Configurar las URLs para que la aplicación escuche en HTTP y HTTPS
			ENV ASPNETCORE_URLS="http://+:80" 
			#;https://+:443"
			
			# Comando para ejecutar la aplicación
			ENTRYPOINT ["dotnet", "EmployeeCrudApi.dll"]
			#CMD ["/bin/bash"]
			```

		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image55.png)

          - DockerFile Front:
			```yaml
			# Utilizar la imagen base de nginx
			FROM nginx:alpine
			
			# Establecer el directorio de trabajo en el contenedor
			WORKDIR /usr/share/nginx/html
			
			# Eliminar los archivos existentes de la imagen base de nginx
			RUN rm -rf ./*
			
			# Copiar los archivos compilados de Angular al directorio de nginx
			COPY ./ .
			
			# Exponer el puerto 80 para servir la aplicación Angular
			EXPOSE 80
			CMD sh -c 'echo "window[\"env\"] = { apiUrl: \"'$API_URL'\" };" > /usr/share/nginx/html/assets/env.js && nginx -g "daemon off;"'
			```

		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image54.png)

   	- ##### 1.1.2 Crear un recurso ACR en Azure Portal siguiendo el instructivo 5.1

 	Vamos al marketplace de Azure y buscamos 'Container Registry'

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image53.png)

	Completamos los datos. En la imagen sale el nombre MNIngSfot3UCCACR, pero luego de resolver algunos problemas tuve que crear otro registry con el nombre 'negritp8'

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image52.png)

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image51.png)

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image50.png)

	
  	- ##### 1.1.3 Modificar nuestro pipeline en la etapa de Build y Test
   	  - Luego de la tarea de publicación de los artefactos de Back agregar la tarea de publicación de nuestro dockerfile de back para que esté disponible en etapas posteriores:
   	     ```yaml
	     - task: PublishPipelineArtifact@1
   	       displayName: 'Publicar Dockerfile de Back'
   	         inputs:
		   targetPath: '$(Build.SourcesDirectory)/docker/api/dockerfile'
		   artifact: 'dockerfile-back'
   	     ```
  	      ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image48.png)
  	     
   	  - Luego de la tarea de publicación de los artefactos de Front agregar la tarea de publicación de nuestro dockerfile de front para que esté disponible en etapas posteriores:
   	     ```yaml
	     - task: PublishPipelineArtifact@1
   	       displayName: 'Publicar Dockerfile de Back'
   	         inputs:
		   targetPath: '$(Build.SourcesDirectory)/docker/front/dockerfile'
		   artifact: 'dockerfile-front'
   	     ```
  	      ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image49.png)
  	     
  	- ##### 1.1.4 En caso de no contar en nuestro proyecto con una ServiceConnection a Azure Portal para el manejo de recursos, agregar una service connection a Azure Resource Manager como se indica en instructivo 5.2 

  	- ##### 1.1.5 Agregar a nuestro pipeline variables 
		```yaml
		trigger:
		- main
		
		pool:
		  vmImage: 'windows-latest'
	
		# AZURE VARIABLES
		variables: 
		  ConnectedServiceName: 'NOMBRE_SERVICE_CONNECTION_AZURE_RESOURCE_MANAGER' #Por ejemplo 'ServiceConnectionARM'
		  acrLoginServer: 'URL_DE_RECURSO_ACR' #Por ejemplo 'ascontainerregistry.azurecr.io'
		  backImageName: 'NOMBRE_IMAGEN_QA' #Por ejemplo 'employee-crud-api'
	
		```
  	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image47.png)
  
  	- ##### 1.1.6 Agregar a nuestro pipeline una nueva etapa que dependa de nuestra etapa de Build y Test
  	  - Agregar tareas para generar imagen Docker de Back
   	  
   	     ```yaml
		# #----------------------------------------------------------
		# ### STAGE BUILD DOCKER IMAGES Y PUSH A AZURE CONTAINER REGISTRY
		# #----------------------------------------------------------
		
		- stage: DockerBuildAndPush
		  displayName: 'Construir y Subir Imágenes Docker a ACR'
		  dependsOn: BuildAndTestBackAndFront #NOMBRE DE NUESTRA ETAPA DE BUILD Y TEST
		  jobs:
		    - job: docker_build_and_push
		      displayName: 'Construir y Subir Imágenes Docker a ACR'
		      pool:
		        vmImage: 'ubuntu-latest'
		
		      steps:
		        - checkout: self
		
		        #----------------------------------------------------------
		        # BUILD DOCKER BACK IMAGE Y PUSH A AZURE CONTAINER REGISTRY
		        #----------------------------------------------------------
		
		        - task: DownloadPipelineArtifact@2
		          displayName: 'Descargar Artefactos de Back'
		          inputs:
		            buildType: 'current'
		            artifactName: 'drop-back'
		            targetPath: '$(Pipeline.Workspace)/drop-back'
		        
		        - task: DownloadPipelineArtifact@2
		          displayName: 'Descargar Dockerfile de Back'
		          inputs:
		            buildType: 'current'
		            artifactName: 'dockerfile-back'
		            targetPath: '$(Pipeline.Workspace)/dockerfile-back'
		
		        - task: AzureCLI@2
		          displayName: 'Iniciar Sesión en Azure Container Registry (ACR)'
		          inputs:
		            azureSubscription: '$(ConnectedServiceName)'
		            scriptType: bash
		            scriptLocation: inlineScript
		            inlineScript: |
		              az acr login --name $(acrLoginServer)
		    
		        - task: Docker@2
		          displayName: 'Construir Imagen Docker para Back'
		          inputs:
		            command: build
		            repository: $(acrLoginServer)/$(backImageName)
		            dockerfile: $(Pipeline.Workspace)/dockerfile-back/dockerfile
		            buildContext: $(Pipeline.Workspace)/drop-back
		            tags: 'latest'
		
		        - task: Docker@2
		          displayName: 'Subir Imagen Docker de Back a ACR'
		          inputs:
		            command: push
		            repository: $(acrLoginServer)/$(backImageName)
		            tags: 'latest'
	  ```yaml

  	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image46.png)
  	
  	- ##### 1.1.7 - Ejecutar el pipeline y en Azure Portal acceder a la opción Repositorios de nuestro recurso Azure Container Registry. Verificar que exista una imagen con el nombre especificado en la variable backImageName asignada en nuestro pipeline

	Ejecutamos el pipeline y vemos que se creo la imagen de back en el registry.

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image44.png)

	- ##### 1.1.8 - Agregar tareas para generar imagen Docker de Front (DESAFIO)
  	  - A la etapa creada en 1.1.6 Agregar tareas para generar imagen Docker de Front
 
	Agregamos las siguientes tareas para generar la imagen Docker del front.

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image42.png)

	Corremos el pipeline y vemos:

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image40.png)

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image39.png)

	Mas adelante el nombre de las imagenes cambia ya que las tuve que cambiar para resolver errores.

  	- ##### 1.1.9 - Agregar a nuestro pipeline una nueva etapa que dependa de nuestra etapa de Construcción de Imagenes Docker y subida a ACR
	  - Agregar variables a nuestro pipeline:
  	  ```yaml
  	  ResourceGroupName: 'NOMBRE_GRUPO_RECURSOS' #Por ejemplo 'TPS_INGSOFT3_UCC'
	  backContainerInstanceNameQA: 'NOMBRE_CONTAINER_BACK_QA' #Por ejemplo 'as-crud-api-qa'
	  backImageTag: 'latest' 
	  container-cpu-api-qa: 1 #CPUS de nuestro container de QA
	  container-memory-api-qa: 1.5 #RAM de nuestro container de QA
  	  ```
  	  ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image29.png)
  	  
  	  - Agregar variable secreta cnn-string-qa desde la GUI de ADO que apunte a nuestra BD de SQL Server de QA como se indica en el instructivo 5.3
  	 
  	  ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image37.png)
  	  ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image36.png)
  	  ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image35.png)
  	    
  	  - Agregar tareas para crear un recurso Azure Container Instances que levante un contenedor con nuestra imagen de back
  	  ```yaml
  	  #----------------------------------------------------------
		### STAGE DEPLOY TO ACI QA
		#----------------------------------------------------------
		
		- stage: DeployToACIQA
		  displayName: 'Desplegar en Azure Container Instances (ACI) QA'
		  dependsOn: DockerBuildAndPush
		  jobs:
		    - job: deploy_to_aci_qa
		      displayName: 'Desplegar en Azure Container Instances (ACI) QA'
		      pool:
		        vmImage: 'ubuntu-latest'
		
		      steps:
		        #------------------------------------------------------
		        # DEPLOY DOCKER BACK IMAGE A AZURE CONTAINER INSTANCES QA
		        #------------------------------------------------------
		
		        - task: AzureCLI@2
		          displayName: 'Desplegar Imagen Docker de Back en ACI QA'
		          inputs:
		            azureSubscription: '$(ConnectedServiceName)'
		            scriptType: bash
		            scriptLocation: inlineScript
		            inlineScript: |
		              echo "Resource Group: $(ResourceGroupName)"
		              echo "Container Instance Name: $(backContainerInstanceNameQA)"
		              echo "ACR Login Server: $(acrLoginServer)"
		              echo "Image Name: $(backImageName)"
		              echo "Image Tag: $(backImageTag)"
		              echo "Connection String: $(cnn-string-qa)"
		          
		              az container delete --resource-group $(ResourceGroupName) --name $(backContainerInstanceNameQA) --yes
		
		              az container create --resource-group $(ResourceGroupName) \
		                --name $(backContainerInstanceNameQA) \
		                --image $(acrLoginServer)/$(backImageName):$(backImageTag) \
		                --registry-login-server $(acrLoginServer) \
		                --registry-username $(acrName) \
		                --registry-password $(az acr credential show --name $(acrName) --query "passwords[0].value" -o tsv) \
		                --dns-name-label $(backContainerInstanceNameQA) \
		                --ports 80 \
		                --environment-variables ConnectionStrings__DefaultConnection="$(cnn-string-qa)" \
		                --restart-policy Always \
		                --cpu $(container-cpu-api-qa) \
		                --memory $(container-memory-api-qa)
  	  ```
  	  - ##### 1.1.10 - Ejecutar el pipeline y en Azure Portal acceder al recurso de Azure Container Instances creado. Copiar la url del contenedor y navegarlo desde browser. Verificar que traiga datos.

  	  Ejecutamos el pipeline y vemos que se creo la instancia del backend.
  	  ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image31.png)
  	  ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image30.png)
  	  
  	  - ##### 1.1.11 - Agregar tareas para generar un recurso Azure Container Instances que levante un contenedor con nuestra imagen de front (DESAFIO)
  	  	- A la etapa creada en 4.1.9 Agregar tareas para generar contenedor en ACI con nuestra imagen de Front
  	        - Tener en cuenta que el contenedor debe recibir como variable de entorno API_URL el valor de una variable container-url-api-qa definida en nuestro pipeline.
  	        - Para que el punto anterior funcione el código fuente del front debe ser modificado para que la url de la API pueda ser cambiada luego de haber sido construída la imagen. Se deja un ejemplo de las modificaciones a realizar en el repo https://github.com/ingsoft3ucc/CrudAngularConEnvironment.git

		Agregamos las siguientes tareas para desplegar la imagen de front:

		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image27.png)

		Para esto, creamos una nueva varible de entorno 'API_URL', ademas de las varibles creadas que se vieron en las imagenes de arriba.

		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image28.png)

		Realizamos cambios en algunos archivos del frontend para que se lea correctamente la variable de entorno 'API_URL'.

		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image26.png)
		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image25.png)
		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image24.png)
		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image23.png)
		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image22.png)
		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image20.png)

		Corremos el pipeline para verificar que funcione.

		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image21.png)
		![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image16.png)

  	  - ##### 4.1.12 - Agregar tareas para correr pruebas de integración en el entorno de QA de Back y Front creado en ACI.
  	 
  		Agregamos las siguientes tareas:

	    ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image17.png)

 		Modificamos las pruebas de cypress para que lean la variable de entorno 'baseUrl' de la siguiente manera:
  	    
  	    ![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image18.png)

  		Corremos el pipeline y vemos que se corrieron correctamente.

	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image7.png)
	![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image6.png)
  	     
#### 1.2 Desafíos:
- 1.2.1 Agregar tareas para generar imagen Docker de Front. (Punto 4.1.8)

Respondido mas arriba.
  
- 1.2.2 Agregar tareas para generar en Azure Container Instances un contenedor de imagen Docker de Front. (Punto 4.1.11)

Respondido mas arriba.

- 1.2.3 Agregar tareas para correr pruebas de integración en el entorno de QA de Back y Front creado en ACI. (Punto 4.1.12)

Respondido mas arriba.

- 1.2.4 Agregar etapa que dependa de la etapa de Deploy en ACI QA y genere contenedores en ACI para entorno de PROD.

Primero, creamos un environment llamado 'Production' al que le agregamos un pre-approval check. 

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image15.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image14.png)

Ahora creamos las siguientes variables:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image13.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image12.png)

Y escribimos las siguientes tareas en el pipeline:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image8.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image10.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image9.png)

Ahora si corremos el pipeline, vemos que cuando llega a la etapa de deply a PROD aparece:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image5.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image4.png)

Se ejecuta correctamente el pipeline.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image3.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image2.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image1.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-08/images/image0.png)

