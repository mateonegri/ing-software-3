## Trabajo Práctico 1 - Git Básico

#### 1- Instalar Git

Por utilizarlo en materias anteriores, ya tenia git instalado en mi computadora.

#### 2- Crear un repositorio local y agregar archivos
  - Crear un repositorio local en un nuevo directorio.
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/imagen13.png)
  - Agregar un archivo Readme.md, agregar algunas líneas con texto a dicho archivo.
    
  - Crear un commit y proveer un mensaje descriptivo.
  
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
  - Crear repo remoto en GitHub
  - Asociar repo local con remoto
  - Crear archivo .gitignore
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/image4Ej2%20.png)
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/image5Ej2.png)
  - Crear un commit y proveer un mensaje descriptivo
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/image6Ej2.png)
  - Subir cambios.
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/image2Ej2%20.png)
![alt text](https://github.com/mateonegri/ing-software-3/blob/main/tp-01/images/image1Ej2.png)

#### 6- Ramas
  - Crear una nueva rama
  - Cambiarse a esa rama
  - Hacer un cambio en el archivo Readme.md y hacer commit
  - Revisar la diferencia entre ramas

#### 7- Merges
  - Hacer un merge FF
  - Borrar la rama creada
  - Ver el log de commits
  - Repetir el ejercicio 6 para poder hacer un merge con No-FF

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
  - Realizar una modificación en la linea 1 del Readme.md desde main y commitear
  - En la conflictBranch modificar la misma línea del Readme.md y commitear
  - Ver las diferencias con git difftool main conflictBranch
  - Cambiarse a la rama main e intentar mergear con la rama conflictBranch
  - Resolver el conflicto con git mergetool
  - Agregar .orig al .gitignore
  - Hacer commit y push

#### 9- Familiarizarse con el concepto de Pull Request

  - Explicar que es un pull request.
  - Crear un branch local y agregar cambios a dicho branch. 
  - Subir el cambio a dicho branch y crear un pull request.
  - Completar el proceso de revisión en github y mergear el PR al branch master.


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
