## Trabajo Práctico 2 - Introducción a Docker

### Consignas a desarrollar en el trabajo práctico:

A continuación, se presentarán algunos conceptos generales de la tecnología de contenedores a manera de introducción al tema desde el punto de vista práctico.

#### ¿Que son los contenedores?

Los contenedores son paquetes de software. Ellos contienen la aplicación a ejecutar junto con las librerías, archivos de configuración, etc para que esta aplicación pueda ser ejecutada. Estos contenedores utilizan características del sistema operativo, por ejemplo, cgroups, namespaces y otros aislamientos de recursos (sistema de archivos, red, etc) para proveer un entorno aislado de ejecución de dicha aplicación.

Dado que ellos utilizan el kernel del sistema operativo en el que se ejecutan, no tienen el elevado consumo de recursos que por ejemplo tienen las máquinas virtuales, las cuales corren su propio sistema operativo.

#### ¿Que es docker?

Docker es una herramienta que permite el despliegue de aplicaciones en contenedores. Además, provee una solución integrada tanto para la ejecución como para la creación de contenedores entre otras muchas funcionalidades.

#### ¿Porque usar contenedores?

Los contenedores ofrecen un mecanismo de empaquetado lógico en el cual las aplicaciones pueden estar aisladas del entorno en el cual efectivamente se ejecutan. Este desacoplamiento permite a las aplicaciones en contenedores ser desplegadas de manera simple y consistente independientemente de si se trata de un Data Center privado, una Cloud publica, o una computadora de uso personal. Esto permite a los desarrolladores crear entornos predecibles que están aislados del resto de las aplicaciones y pueden ser ejecutados en cualquier lugar.

Por otro lado, ofrecen un control más fino de los recursos y son más eficientes al momento de la ejecución que una máquina virtual.

En los últimos años el uso de contenedores ha crecido exponencialmente y fue adoptado de forma masiva por prácticamente todas las compañías importantes de software.

#### Máquinas Virtuales vs Contenedores 

Los contenderos no fueron pensados como un remplazo de las máquinas virtuales. Cuando ambas tecnologías se utilizan en forma conjunta se obtienen los mejores resultados, por ejemplo, en los proveedores cloud como AWS, Google Cloud o Microsoft Azure.

![alt text][imagen]

[imagen]: vms-vs-containers.png

(Imagen: https://blog.docker.com/2016/04/containers-and-vms-together/ )


##### Analogía

![alt text][imagen3]

[imagen3]: vms-containers-analogy.png

(Imagen: https://github.com/SteveLasker/Presentations/tree/master/DockerCon2017 )

#### Conceptos Generales

- **Container Image**: Una imagen contiene el sistema operativo base, la aplicación y todas sus dependencias necesarias para un despliegue rápido del contenedor.
- **Container**: Es una instancia en ejecución de una imagen.
- **Container Registry**: Las imágenes de Docker son almacenadas en un Registry y pueden ser descargadas cuando se necesitan. Un registry pude ser público, por ejemplo, DockerHub o instalado en un entorno privado.
- **Docker Daemon**: el servicio en segundo plano que se ejecuta en el host que gestiona la construcción, ejecución y distribución de contenedores Docker. El daemon es el proceso que se ejecuta en el sistema operativo con el que los clientes hablan.
- **Docker Client**: la herramienta de línea de comandos que permite al usuario interactuar con el daemon. En términos más generales, también puede haber otras formas de clientes, como Kitematic, que proporciona una GUI a los usuarios. 
- **Dockerfile**: Son usados por los desarrolladores para automatizar la creación de imágenes de contenedores. Con un Dockerfile, el demonio de Docker puede automáticamente construir una imagen.

#### Layers en Docker

Las imágenes de docker están compuestas de varias capas (layers) de sistemas de archivos y agrupadas juntas. Estas son de solo lectura. Cuando se crea el contenedor, Docker monta un sistema de archivos de lectura/escritura sobre estas capas el cual es utilizado por los procesos dentro del contenedor. Cuando el contenedor es borrado, esta capa es borrada con él, por lo tanto, son necesarias otras soluciones para persistir datos en forma permanente.

![alt text][imagen2]

[imagen2]: docker-image.png

(Imagen: https://washraf.gitbooks.io/the-docker-ecosystem/content/Chapter%201/Section%203/union_file_system.html)

## Desarrollo:

#### 1- Instalar Docker Community Edition 
  - Diferentes opciones para cada sistema operativo
  - https://docs.docker.com/
  - Ejecutar el siguiente comando para comprobar versiones de cliente y demonio.
```bash
docker version
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image0.png)

#### 2- Explorar DockerHub
   - Registrase en docker hub: https://hub.docker.com/
   - Familiarizarse con el portal

#### 3- Obtener la imagen BusyBox
  - Ejecutar el siguiente comando, para bajar una imagen de DockerHub
  ```bash
  docker pull busybox
  ```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image1.png)

  - Verificar qué versión y tamaño tiene la imagen bajada, obtener una lista de imágenes locales:
```bash
docker images
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image2.png)

#### 4- Ejecutando contenedores
  - Ejecutar un contenedor utilizando el comando **run** de docker:
```bash
docker run busybox
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image3.png)

  - Explicar porque no se obtuvo ningún resultado

  No se obtuvo ningun resultado porque Docker crea un contenedor desde la imagen busybox, ejecuta el comando predeterminado (que suele ser /bin/sh o similar), y luego sale inmediatamente si no hay tareas adicionales que realizar. Esto ocurre porque busybox es una imagen mínima que generalmente se usa para ejecutar comandos específicos en un entorno ligero, por lo que una vez que el comando se completa, el contenedor termina y muestra el estado exited.

  - Especificamos algún comando a correr dentro del contenedor, ejecutar por ejemplo:
```bash
docker run busybox echo "Hola Mundo"
```
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image4.png)

  - Ver los contenedores ejecutados utilizando el comando **ps**:
```bash
docker ps
```
  - Vemos que no existe nada en ejecución, correr entonces:
```bash
docker ps -a
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image5.png)

  - Mostrar el resultado y explicar que se obtuvo como salida del comando anterior.

El comando docker ps -a muestra una lista de todos los contenedores de Docker del sistema, incluidos los que están en ejecución, los que han sido detenidos y los que han fallado. Este comando es útil para ver el estado de todos los contenedores, no solo de los que están actualmente en ejecución.

#### 5- Ejecutando en modo interactivo

  - Ejecutar el siguiente comando
```bash
docker run -it busybox sh
```
  - Para cada uno de los siguientes comandos dentro de contenedor, mostrar los resultados:
```bash
ps
uptime
free
ls -l /
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image6.png)

  - Salimos del contenedor con:
```bash
exit
```

#### 6- Borrando contenedores terminados

  - Obtener la lista de contenedores 
```bash
docker ps -a
```
  - Para borrar podemos utilizar el id o el nombre (autogenerado si no se especifica) de contenedor que se desee, por ejemplo:
```bash
docker rm elated_lalande
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image7.png)

  - Para borrar todos los contenedores que no estén corriendo, ejecutar cualquiera de los siguientes comandos:
```bash
docker rm $(docker ps -a -q -f status=exited)
```
```bash
docker container prune
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image8.png)

#### 7- Construir una imagen
- Conceptos de DockerFile
  - Leer https://docs.docker.com/engine/reference/builder/ 
  - Describir las instrucciones
     - FROM: Especifica la imagen base a partir de la cual se construirá la nueva imagen. Es la primera instrucción en un Dockerfile.
     - RUN: Ejecuta un comando en la imagen durante el proceso de construcción. Los resultados de este comando se guardan en la imagen creada.
     - ADD: Copia archivos o directorios desde el sistema de archivos del host a la imagen, y puede extraer archivos comprimidos automáticamente.
     - COPY: Copia archivos o directorios desde el sistema de archivos del host a la imagen, sin procesamiento adicional como la extracción automática de archivos comprimidos (a diferencia de ADD).
     - EXPOSE: Informa a Docker que el contenedor escucha en un puerto específico durante su ejecución. No publica el puerto en el host por sí mismo; eso se hace con la opción -p al ejecutar el contenedor.
     - CMD: Especifica el comando predeterminado que se ejecutará cuando se inicie un contenedor a partir de la imagen. Solo puede haber una instrucción CMD por Dockerfile; si se especifican varias, solo la última será utilizada.
     - ENTRYPOINT: Define el programa que se ejecutará como el comando principal dentro del contenedor. Similar a CMD, pero no se puede sobrescribir fácilmente desde la línea de comandos a menos que se use la opción --entrypoint.
       
- A partir del código https://github.com/ingsoft3ucc/SimpleWebAPI crearemos una imagen.
- Clonar repo

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image9.png)

- Crear imagen etiquetándola con un nombre. El punto final le indica a Docker que use el dir actual
```
docker build -t mywebapi .
```
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image10.png)

- Revisar Dockerfile y explicar cada línea

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image11.png)

```dockerfile
# FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
```
- Usa la imagen base de ASP.NET Core 7.0, necesaria para ejecutar aplicaciones .NET.

```dockerfile
WORKDIR /app
```
- Establece el directorio de trabajo en `/app` dentro del contenedor.

```dockerfile
EXPOSE 80
EXPOSE 443
EXPOSE 5254
```
- Indica que la aplicación escuchará en los puertos 80, 443, y 5254.

```dockerfile
RUN mkdir -p /var/temp
```
- Crea un directorio temporal en `/var/temp`.

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
```
- Usa la imagen SDK de .NET Core 7.0 para compilar la aplicación.

```dockerfile
WORKDIR /src
```
- Establece el directorio de trabajo en `/src` para la fase de construcción.

```dockerfile
COPY ["SimpleWebAPI/SimpleWebAPI.csproj", "SimpleWebAPI/"]
```
- Copia el archivo de proyecto de la aplicación a `/src/SimpleWebAPI/`.

```dockerfile
RUN dotnet restore "SimpleWebAPI/SimpleWebAPI.csproj"
```
- Restaura las dependencias necesarias para compilar la aplicación.

```dockerfile
COPY . .
```
- Copia todo el código fuente al contenedor.

```dockerfile
WORKDIR "/src/SimpleWebAPI"
```
- Cambia el directorio de trabajo a donde está la aplicación principal.

```dockerfile
RUN dotnet build "SimpleWebAPI.csproj" -c Release -o /app/build
```
- Compila la aplicación en modo Release y coloca los binarios en `/app/build`.

```dockerfile
FROM build AS publish
```
- Crea una etapa intermedia llamada `publish` para preparar la publicación.

```dockerfile
RUN dotnet publish "SimpleWebAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false
```
- Publica la aplicación, preparando los archivos listos para ejecución en `/app/publish`.

```dockerfile
FROM base AS final
```

- Inicia la etapa final utilizando la imagen base inicial.

```dockerfile
WORKDIR /app
```
- Establece el directorio de trabajo en `/app` para la etapa final.

```dockerfile
COPY --from=publish /app/publish .
```
- Copia los archivos publicados desde la etapa `publish` al directorio `/app` en la imagen final.

```dockerfile
# ENTRYPOINT ["dotnet", "SimpleWebAPI.dll"]
CMD ["/bin/bash"]
```
- Comentado: `ENTRYPOINT` configuraba la ejecución de la aplicación. 
- `CMD` está configurado para abrir una terminal Bash cuando el contenedor se ejecuta.

- Ver imágenes disponibles

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image12.png)

- Ejecutar un contenedor con nuestra imagen

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image13.png)

- Subir imagen a nuestra cuenta de dockerhub
  - 7.1 Inicia sesión en Docker Hub
    - Primero, asegúrate de estar autenticado en Docker Hub desde tu terminal:
    ```bash
    docker login
    ```
  - 7.2 Etiquetar la imagen a subir con tu nombre de usuario de Docker Hub y el nombre de la imagen. Por ejemplo:
    ```bash
    docker tag <nombre_imagen_local> <tu_usuario_dockerhub>/<nombre_imagen>:<tag>
    ```
  - 7.3 Subir la Imagen
    - Para subir la imagen etiquetada a Docker Hub, utiliza el comando docker push:
     ```bash
     docker push <tu_usuario_dockerhub>/<nombre_imagen>:<tag>
     ```
     
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image14.png)
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image15.png)

  - 7.4 Verificar la Subida
     ```bash
     docker pull <tu_usuario_dockerhub>/<nombre_imagen>:<tag>
     ```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image16.png)

#### 8- Publicando puertos

En el caso de aplicaciones web o base de datos donde se interactúa con estas aplicaciones a través de un puerto al cual hay que acceder, estos puertos están visibles solo dentro del contenedor. Si queremos acceder desde el exterior deberemos exponerlos.

  - Ejecutar la siguiente imagen, en este caso utilizamos la bandera -d (detach) para que nos devuelva el control de la consola:

```bash
docker run --name myapi -d mywebapi
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image17.png)


  - Ejecutamos un comando ps:
  - Vemos que el contendor expone 3 puertos el 80, el 5254 y el 443, pero si intentamos en un navegador acceder a http://localhost/WeatherForecast no sucede nada.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image24.png)

  - Procedemos entonces a parar y remover este contenedor:
```bash
docker kill myapi
docker rm myapi
```
![alt text][https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image18.png]

  - Vamos a volver a correrlo otra vez, pero publicando el puerto 80

```bash
docker run --name myapi -d -p 80:80 mywebapi
```

  - Accedamos nuevamente a http://localhost/WeatherForecast y vemos que nos devuelve datos.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image19.png)

#### 9- Modificar Dockerfile para soportar bash 

- Modificamos dockerfile para que entre en bash sin ejecutar automaticamente la app
 
```bash
#ENTRYPOINT ["dotnet", "SimpleWebAPI.dll"]
CMD ["/bin/bash"]
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image21.png)

- Rehacemos la imagen
```
docker build -t mywebapi .
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image22.png)

- Corremos contenedor en modo interactivo exponiendo puerto
```
docker run -it --rm -p 80:80 mywebapi
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image23.png)

- Navegamos a http://localhost/weatherforecast

![alt text][https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image24.png]
  
- Vemos que no se ejecuta automaticamente
- Ejecutamos app:
```
dotnet SimpleWebAPI.dll
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image25.png)

-Volvemos a navegar a http://localhost/weatherforecast

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image26.png)

- Salimos del contenedor
  
#### 10- Montando volúmenes

Hasta este punto los contenedores ejecutados no tenían contacto con el exterior, ellos corrían en su propio entorno hasta que terminaran su ejecución. Ahora veremos cómo montar un volumen dentro del contenedor para visualizar por ejemplo archivos del sistema huésped:

  - Ejecutar el siguiente comando, cambiar myusuario por el usuario que corresponda. En Mac puede utilizarse /Users/miusuario/temp):
```bash
docker run -it --rm -p 80:80 -v /Users/miuser/temp:/var/temp  mywebapi
```
  - Dentro del contenedor correr
```bash
ls -l /var/temp
touch /var/temp/hola.txt
```

  - Verificar que el Archivo se ha creado en el directorio del guest y del host.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image28.png)

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image27.png)

#### 11- Utilizando una base de datos
- Levantar una base de datos PostgreSQL

```bash
mkdir $HOME/.postgres

docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -v $HOME/.postgres:/var/lib/postgresql/data -p 5432:5432 -d postgres:9.4
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image29.png)

- Ejecutar sentencias utilizando esta instancia

```bash
docker exec -it my-postgres /bin/bash

psql -h localhost -U postgres

#Estos comandos se corren una vez conectados a la base

\l
create database test;
\connect test
create table tabla_a (mensaje varchar(50));
insert into tabla_a (mensaje) values('Hola mundo!');
select * from tabla_a;

\q

exit
```

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image30.png)

- Conectarse a la base utilizando alguna IDE (Dbeaver - https://dbeaver.io/, Azure DataStudio -https://azure.microsoft.com/es-es/products/data-studio, etc). Interactuar con los objectos objectos creados.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image31.png)

- Explicar que se logro con el comando `docker run` y `docker exec` ejecutados en este ejercicio.

 1. docker run
Crea y ejecuta un contenedor: Inicia un contenedor PostgreSQL con el nombre my-postgres.
Persistencia de datos: Monta un volumen en el host para almacenar los datos de forma persistente.
Mapeo de puertos: Permite el acceso a PostgreSQL en el puerto 5432 desde el host.
 2. docker exec
Acceso al contenedor: Abre una terminal Bash dentro del contenedor my-postgres.
 3. Comandos en psql
Conexión y manipulación: Se conecta a PostgreSQL, crea una base de datos y una tabla, inserta un registro y verifica los datos.
Resultado: Se crea una base de datos PostgreSQL en un contenedor, con datos persistentes y se realiza una operación básica de inserción y consulta.

#### 12- Hacer el punto 11 con Microsoft SQL Server
- Armar un contenedor con SQL Server
- Crear BD, Tablas y ejecutar SELECT

Primero, hacemos pull de la imagen de SQL Server.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image33.png)

Luego, corremos un contenedor con esa imagen. Y controlamos que SQL Server este listo para conectarse.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image34.png)

Vemos que el contenedor corre.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image35.png)

Luego, utilizando DBeaver, creamos una base de datos 'ej12', la selecciona y creamos la tabla 'tabla1'. Una vez hecho esto, insertamos un elemento en la tabla, el mensaje 'PRUEBA EJ12'.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image36.png)

Si hacemos un select a esa tabla, vemos que se creo correctamente.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-02/images/image37.png)
  
