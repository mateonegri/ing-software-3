## Trabajo Práctico 1 - Git Básico

#### 1- Instalar Git

Por utilizarlo en materias anteriores, ya tenia git instalado en mi computadora.

#### 2- Crear un repositorio local y agregar archivos
  - Crear un repositorio local en un nuevo directorio.
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageEj1-3.png)
  - Agregar un archivo Readme.md, agregar algunas líneas con texto a dicho archivo.
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageEj1-4.png)  
  - Crear un commit y proveer un mensaje descriptivo.
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageEj1-1.png)
  
#### 3- Configuración del Editor Predeterminado
 - Instalar Notepad ++ para Windows o TextMate para Mac OS, colocarle un alias y configurarlo como editor predeterminado
   
#### 4- Creación de Repos 01 -> Crearlo en GitHub, clonarlo localmente y subir cambios
  - Crear una cuenta en https://github.com
  - Crear un nuevo repositorio en dicha página con el Readme.md por defecto
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagen13.png)
  - Clonar el repo remoto en un nuevo directorio local
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagen11.png)
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagen10.png)
  - Editar archivo Readme.md agregando algunas lineas de texto
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagen9.png)
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagen8.png)
  - Editar (o crear si no existe) el archivo .gitignore agregando los archivos *.bak
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagen7.png)
  - Crear un commit y porveer un mensaje descriptivo
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagen6.png)
  - Intentar un push al repo remoto
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagen4.png)
  - En caso de ser necesario configurar las claves SSH requeridas y reintentar el push.
Imagen del repositorio despues de hacer el ejrecicio:

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagen3.png)

#### 5- Creación de Repos 02-> Crearlo localmente y subirlo a GitHub
  - Crear un repo local
  - Agregar archivo Readme.md con algunas lineas de texto
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/image3Ej2%20.png)
  - Crear archivo .gitignore
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/image4Ej2%20.png)
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/image5Ej2.png)
  - Crear un commit y proveer un mensaje descriptivo
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/image6Ej2.png)
  - Subir cambios y asociar repo local con remoto
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/image2Ej2%20.png)
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/image1Ej2.png)

#### 6- Ramas
  - Crear una nueva rama
  - Cambiarse a esa rama
  - Hacer un cambio en el archivo Readme.md y hacer commit
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageRamas2.png)
  - Revisar la diferencia entre ramas
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageRamas1.png)

#### 7- Merges
  - Hacer un merge FF
  - Borrar la rama creada
  - Ver el log de commits
Primero nos vamos a la rama main, despues hacemos el merge con la rama newFeature y pusheamos los cambios. Por ultimo, eliminamos la branch y vemos los logs.
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageMergeFF.png)
  - Repetir el ejercicio 6 para poder hacer un merge con No-FF
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageMergeNoFF.png)

#### 8- Resolución de Conflictos
  - Instalar alguna herramienta de comparación. Idealmente una 3-Way:
    - P4Merge https://www.perforce.com/downloads/helix-visual-client-p4v:
![alt text](p4merge.png)
    - Se puede omitir registración. Instalar solo opción Merge and DiffTool.
 - ByondCompare trial version https://www.scootersoftware.com/download.php
    - Configurar Tortoise/SourceTree para soportar esta herramienta.
    - https://www.scootersoftware.com/support.php?zz=kb_vcs
    - https://medium.com/@robinvanderknaap/using-p4merge-with-tortoisegit-87c1714eb5e2
  - Crear una nueva rama conflictBranch
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageConflict1.png)
  - Realizar una modificación en la linea 1 del Readme.md desde main y commitear
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageConflict3.png)
  - En la conflictBranch modificar la misma línea del Readme.md y commitear
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageConflict4.png)
  - Ver las diferencias con git difftool main conflictBranch
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageConflict5.png)
  - Cambiarse a la rama main e intentar mergear con la rama conflictBranch
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageConflict6.png)
  - Resolver el conflicto con git mergetool
Al poner git mergetool en la terminal nos lleva a BeyondCompare, la siguiente aplicacion:
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageConflict7.png)
  - Agregar .orig al .gitignore
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageConflict9.png)
  - Hacer commit y push
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageConflict8.png)
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imageConflict2.png)

#### 9- Familiarizarse con el concepto de Pull Request

  - Explicar que es un pull request.
Un pull request (PR) en Git es una solicitud para fusionar cambios de una rama en un repositorio a otra, generalmente de una rama de desarrollo a la rama principal (main o master). Es una herramienta clave en el flujo de trabajo colaborativo en proyectos de software, especialmente cuando se trabaja en equipos.
  - Crear un branch local y agregar cambios a dicho branch.
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagePullRequest7.png)
  - Subir el cambio a dicho branch y crear un pull request.
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagePullRequest6.png)
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagePullRequest5.png)

Ahora realizamos la pull request.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagePullRequest4.png)

  - Completar el proceso de revisión en github y mergear el PR al branch master.

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagePullRequest3.png)
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagePullRequest2.png)

Una vez terminado el proceso de revision vemos esto:

![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagePullRequest1.png)

#### 10- Algunos ejercicios online
  - Entrar a la página https://learngitbranching.js.org/
  - Completar los ejercicios **Introduction Sequence**
  - Opcional - Completar el resto de los ejercicios para ser un experto en Git!!!

#### 11- Crear Repositorio de la materia
  - Crear un repositorio para la materia en github. Por ejemplo **ing-software-3**
  - Subir archivo(s) .md con los resultados e imágenes de este trabajo práctico. Puede ser en una subcarpeta **trabajo-practico-01**

### Referencias

- https://try.github.io/
- https://github.github.com/training-kit/downloads/es_ES/github-git-cheat-sheet.pdf
- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
