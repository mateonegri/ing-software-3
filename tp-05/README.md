### 1- Consignas a desarrollar en el trabajo práctico:
 - Los despliegues (deployments) de aplicaciones se pueden realizar en diferentes tipos de entornos
   - On-Premise (internos) es decir en servidores propios.
   - Nubes Públicas, ejemplo AWS, Azure, Gcloud, etc.
   - Plataformas como servicios (PaaS), ejemplo Heroku, Google App Engine, AWS, Azure WebApp, etc
 - En este práctico haremos despliegue a Plataforma como Servicio utilizando Azure Web Apps

### 2- Desarrollo:
2.1\. Crear una cuenta en Azure

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image47.png)

2.2\. Crear un recurso Web App en Azure Portal y navegar a la url provista

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image2.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image3.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image4.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image5.png)

2.3\. Actualizar Pipeline de Build para que use tareas de DotNetCoreCLI@2 como en el pipeline clásico, luego crear un Pipeline de Release en Azure DevOps con CD habilitada

Actualizamos el pipeline de build:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image6.png)

Ahora creamos el pipeline de release:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image9.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image10.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image11.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image12.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image13.png)

2.4\. Optimizar Pipeline de Build

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image6.png)

2.5\. Verificar el deploy en la url de la WebApp /weatherforecast

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image15.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image14.png)

2.6\. Realizar un cambio al código del controlador para que devuelva 7 pronósticos, realizar commit, evaluar ejecución de pipelines de build y release, navegar a la url de la webapp/weatherforecast y corroborar cambio

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image16.png)

Hacemos un commit con el mensaje "Updated WeatherForecastController.cs to show 7 weathers", y vemos que los pipelines de build y release estan corriendo.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image17.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image18.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image19.png)

Y si visitamos la pagina vemos

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image20.png)

2.7\. Clonar la Web App de QA para que contar con una WebApp de PROD a partir de un Template Deployment en Azure Portal y navegar a la url provista para la WebApp de PROD.

Vamos al recurso y seleccionamos crear.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image21.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image22.png)

Cargamos el template y los parametros personalizados que guardamos en los pasos anteriores.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image23.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image24.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image25.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image26.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image27.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image28.png)

2.8\. Agregar una etapa de Deploy a Prod en Azure Release Pipelines 

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image29.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image30.png)

En App Service Name, ponemos la app de produccion.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image31.png)

2.9\.  Realizar un cambio al código del controlador para que devuelva 10 pronósticos, realizar commit, evaluar ejecución de pipelines de build y release, navegar a la url de la webapp/weatherforecast y corroborar cambio, verificar que en la url de la webapp_prod/weatherforecast se muestra lo mismo.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image33.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image34.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image35.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image36.png)

Vemos la app de QA:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image38.png)

Y ahora la de PROD:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image42.png)

2.10\. Modificar pipeline de release para colocar una aprobación manual para el paso a Producción.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image32.png)

2.11\. Realizar un cambio al código del controlador para que devuelva 5 pronósticos, realizar commit, evaluar ejecución de pipelines de build y release, navegar a la url de la webapp/weatherforecast y corroborar cambio, verificar que en la url de la webapp_prod/weatherforecast aun se muestra la versión anterior.

Vamos al controlador y cambiamos a 5.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image43.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image44.png)

Vemos que PROD esta esperando la aprobacion. 

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image37.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image6.png)

Y se muestra la version anterior comparandola con la version que se muestra en QA

QA:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image45.png)

PROD:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image42.png)

2.12\. Aprobar el pase ya sea desde el release o desde el mail recibido. 

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image40.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image41.png)

2.13\. Esperar a la finalización de la etapa de Pase a Prod y luego corroborar que en la url de la webapp_prod/weatherforecast se muestra la nueva versión coinicidente con la de QA.

Una vez aprobado y que se termino de hacer el release a PROD, vamos a la URL y vemos que se hivieron los cambios.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image46.png)

2.14\. Realizar un pipeline (no release) que incluya el deploy a QA y a PROD con una aprobación manual. El pipeline debe estar construido en YAML sin utilizar el editor clásico de pipelines ni el editor clásico de pipelines de release.

Creamos un nuevo pipeline que se llama Sample02(8)

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image48.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image49.png)

Ahora escribimos el YAML.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image50.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image51.png)

Ahora hacemos cambios en el controlador para que muestre 6 climas, y para ver que funciona el pipeline.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image52.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image53.png)

Vemos que esta corriendo el pipeline.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image54.png)

Vemos que llego a la etapa de aprobacion.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image55.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image56.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image57.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image58.png)
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image59.png)

Navegamos a las paginas y vemos que se hicieron los cambios correctamente.

QA:
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image60.png)

PROD:
![](https://github.com/mateonegri/ing-software-3/blob/main/tp-05/images/image61.png)


