## Trabajo Práctico 4 - Azure Devops Pipelines

### 1 - Consignas a desarrollar en el trabajo práctico:
Azure DevOps Pipelines

#### Breve descripción de Azure DevOps Pipelines:

Azure DevOps Pipelines es un servicio de CI/CD (Integración Continua y Entrega Continua) ofrecido por Microsoft dentro de la plataforma Azure DevOps. Este servicio permite a los equipos de desarrollo automatizar el proceso de compilación, pruebas y despliegue de aplicaciones, facilitando la entrega de software de alta calidad de manera más rápida y eficiente.

#### Tipos de Pipelines: Build y Deploy:

Build Pipelines (Pipelines de Construcción):

Los Build Pipelines son responsables de la compilación del código fuente, la ejecución de pruebas unitarias, el análisis de código estático y la generación de artefactos de construcción. El objetivo principal de estos pipelines es garantizar que el código se construya correctamente y esté listo para ser desplegado.
Las etapas típicas en un pipeline de construcción incluyen:
 - Clonación del repositorio de código fuente.
 - Instalación de dependencias.
 - Compilación del código fuente.
 - Ejecución de pruebas.
 - Generación y publicación de artefactos.
   
Release Pipelines (Pipelines de Despliegue):

Los Release Pipelines se encargan de desplegar los artefactos generados por los Build Pipelines a diferentes entornos, como desarrollo, pruebas, producción, etc. Estos pipelines gestionan el proceso de entrega continua, asegurando que el software esté correctamente configurado y funcionando en los entornos de destino.
Las etapas típicas en un pipeline de despliegue incluyen:
 - Recuperación de artefactos.
 - Configuración del entorno.
 - Despliegue a un entorno específico.
 - Validación post-despliegue (por ejemplo, pruebas de integración o de aceptación).
 - Implementación progresiva o canary releases (opcional).

#### Diferencias entre editor clásico y YAML:

Editor Clásico:

 - Es una interfaz gráfica basada en un asistente que permite a los usuarios configurar pipelines sin necesidad de escribir código.
 - Ideal para usuarios que prefieren una experiencia de configuración más visual o que son nuevos en la integración y entrega continua.
 - Permite crear y gestionar tareas y fases mediante una serie de menús desplegables y formularios.
 - Aunque es más accesible para principiantes, puede ser menos flexible y más difícil de versionar y mantener en comparación con YAML.
   
Pipelines basados en YAML:

 - Utilizan archivos YAML (YAML Ain't Markup Language) para definir los pipelines como código. Estos archivos se incluyen en el repositorio de código fuente, lo que facilita la gestión de versiones y la revisión de cambios.
 - Ofrecen mayor flexibilidad y personalización, permitiendo a los usuarios definir pipelines complejos con condicionales, plantillas reutilizables y variables.
 - Requieren conocimientos básicos de YAML y programación, pero proporcionan una mayor consistencia y transparencia en los procesos de CI/CD.
 - Son la opción recomendada para proyectos con pipelines complejos o para equipos que siguen prácticas de DevOps maduras.

#### Agentes MS y Self-Hosted:

Agentes MS (Microsoft-Hosted Agents):

Son agentes de ejecución gestionados y alojados por Microsoft en la nube de Azure. Estos agentes están preconfigurados con un entorno de ejecución estándar que incluye una variedad de herramientas, SDKs y lenguajes.
 - Los agentes Microsoft-hosted son ideales para la mayoría de los escenarios de construcción y despliegue, ya que no requieren configuración adicional por parte del usuario. Son fáciles de usar, y los pipelines pueden comenzar a ejecutarse rápidamente con ellos.
 - Los agentes están disponibles en diferentes configuraciones (Windows, Linux, macOS) y se cobran por minuto de ejecución. Tienen una serie de limitaciones en cuanto a tiempos de ejecución y recursos, pero son adecuados para muchas necesidades generales de CI/CD.
   
Self-Hosted Agents:

Son agentes que los usuarios configuran y mantienen por su cuenta en su infraestructura local o en la nube.
 - Ofrecen mayor control sobre el entorno de ejecución y permiten a los equipos instalar software específico, configuraciones personalizadas y optimizar recursos según sus necesidades.
 - Son ideales para escenarios en los que se requieren configuraciones especializadas, acceso a recursos locales o software que no está disponible en los agentes Microsoft-hosted.
 - La administración de estos agentes recae completamente en el usuario, incluyendo actualizaciones, seguridad y mantenimiento.

### 2 - Pasos del TP
2.1 Verificar acceso a Pipelines concedido

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image31.png)

Ahora volvemos a correr el pipeline hecho en el tp anterior y vemos que se ejecute correctamente.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image14.png)

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image17.png)

Vemos que el primer pipeline fallo, y el segundo anduvo correctamente por lo tanto el acceso fue concedido.

2.2 Agregar en pipeline YAML una tarea de Publish.

Vamos a editar pipeline y agregamos lo siguiente al YAML.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image15.png)

Guardamos los cambios.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image16.png)

Se ejecuta correctamente el pipeline.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image17.png)

Y se publico un artefacto.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image18.png)

2.3 Explicar por qué es necesario contar con una tarea de Publish en un pipeline que corre en un agente de Microsoft en la nube.

En un pipeline que corre en un agente de Microsoft en la nube, es necesario incluir una tarea de Publish para:

Persistencia de Artefactos: Los agentes de Microsoft-hosted son efímeros, lo que significa que los archivos generados durante la ejecución se perderían si no se publican. La tarea de Publish guarda estos artefactos en Azure DevOps, asegurando su disponibilidad para etapas posteriores.

Despliegues y Etapas Posteriores: Los artefactos publicados son necesarios para las fases de despliegue y otros usos posteriores, garantizando que el mismo código construido se despliegue de manera consistente.

Acceso y Trazabilidad: Publicar artefactos permite a los equipos revisar los resultados de construcción, pruebas y asegurar la trazabilidad para auditorías o cumplimiento normativo

2.4 Descargar el resultado del pipeline y correr localmente el software compilado.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image19.png)

Y ahora corremos el software.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image28.png)

2.5 Habilitar el editor clásico de pipelines. Explicar las diferencias claves entre este tipo de editor y el editor YAML.

Vamos a los settings de la organizacion.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image23.png)

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image1.png)

#### Diferencias entre editor clásico y YAML:

Editor Clásico:

 - Es una interfaz gráfica basada en un asistente que permite a los usuarios configurar pipelines sin necesidad de escribir código.
 - Ideal para usuarios que prefieren una experiencia de configuración más visual o que son nuevos en la integración y entrega continua.
 - Permite crear y gestionar tareas y fases mediante una serie de menús desplegables y formularios.
 - Aunque es más accesible para principiantes, puede ser menos flexible y más difícil de versionar y mantener en comparación con YAML.
   
Pipelines basados en YAML:

 - Utilizan archivos YAML (YAML Ain't Markup Language) para definir los pipelines como código. Estos archivos se incluyen en el repositorio de código fuente, lo que facilita la gestión de versiones y la revisión de cambios.
 - Ofrecen mayor flexibilidad y personalización, permitiendo a los usuarios definir pipelines complejos con condicionales, plantillas reutilizables y variables.
 - Requieren conocimientos básicos de YAML y programación, pero proporcionan una mayor consistencia y transparencia en los procesos de CI/CD.
 - Son la opción recomendada para proyectos con pipelines complejos o para equipos que siguen prácticas de DevOps maduras.

2.6 Crear un nuevo pipeline con el editor clásico. Descargar el resultado del pipeline y correr localmente el software compilado.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image3.png)

Y ahora seguimos los pasos.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image4.png)

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image6.png)

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image8.png)

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image12.png)

Ahora descargamos el resultado.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image22.png)

Y lo ejecutamos.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image29.png)

2.7 Configurar CI en ambos pipelines (YAML y Classic Editor). Mostrar resultados de la ejecución automática de ambos pipelines al hacer un commit en la rama main.

En classic pipelines:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image2.png)

En YAML:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image24.png)

Vemos que no hay ningun pipeline ejecutandose.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image32.png)

Ahora hacemos un cambio en el README del repo.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image33.png)

Guardamos los cambios y hacemos un commit.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image34.png)

Y vemos que se estan corriendo ambos pipelines de manera automatica. Podemos identificar que es por el commit que hicimos recien por el nombre y el numero de commit.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image35.png)

2.8 Explicar la diferencia entre un agente MS y un agente Self-Hosted. Qué ventajas y desventajas hay entre ambos? Cuándo es conveniente y/o necesario usar un Self-Hosted Agent?

#### Diferencia entre un Agente MS y un Agente Self-Hosted:

#### Agente MS (Microsoft-hosted): Es un agente gestionado por Microsoft en la nube de Azure. Está preconfigurado con un entorno estándar, y se utiliza por demanda. Es efímero, es decir, se crea para cada ejecución del pipeline y se elimina al finalizar.

Agente Self-Hosted: Es un agente configurado y mantenido por el usuario en su infraestructura local o en la nube. El usuario tiene control total sobre el entorno y los recursos del agente.

Ventajas y Desventajas:

#### Agente MS:

Ventajas: Fácil de usar, no requiere configuración ni mantenimiento por parte del usuario, ideal para proyectos estándar.
Desventajas: Menos control sobre el entorno, limitado a las configuraciones y herramientas preinstaladas, costos por tiempo de uso.
Agente Self-Hosted:

Ventajas: Control total sobre el entorno y las herramientas, no tiene costos por tiempo de uso, ideal para necesidades específicas o software propietario.
Desventajas: Requiere configuración, mantenimiento y administración del usuario, necesita recursos propios de infraestructura.
Cuándo usar un Agente Self-Hosted:

Es conveniente usar un Agente Self-Hosted cuando necesitas configuraciones personalizadas, acceso a recursos locales, usar software propietario o específico, o cuando se requiere un mayor control y optimización del entorno de ejecución.

2.8 Crear un Pool de Agentes y un Agente Self-Hosted

Primero creamos un personal access token.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image5.png)

Ahora creamos el pool y instalamos el agente en nuestro entorno.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image7.png)

2.9 Instalar y correr un agente en nuestra máquina local.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image9.png)

Siguiendo estos pasos llegamos a la siguiente interfaz.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image11.png)

Donde configuramos el agente.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image20.png)

2.10 Crear un pipeline que use el agente Self-Hosted alojado en nuestra máquina local.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image26.png)

Guardamos y ejecutamos. Y vemos lo siguiente.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image0.png)

El agente esta esperando jobs.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image21.png)

Cuando se corre el pipeline vemos:

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image25.png)

2.11 Buscar el resultado del pipeline y correr localmente el software compilado.

Ahora para verificar que se ejecuto correctamente hacemos lo siguiente.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image27.png)

Y podemos ver que esta el artefacti publicado. Y si lo corremos vemos que funciona.

![](https://github.com/mateonegri/ing-software-3/blob/main/tp-04/images/image30.png)

2.12 Crear un nuevo proyecto en ADO clonado desde un repo que contenga una aplicación en Angular como por ejemplo https://github.com/ingsoft3ucc/angular-demo-project.git

2.13 Configurar un pipeline de build para un proyecto de tipo Angular como el clonado.

2.14 Habilitar CI para el pipeline.

2.15 Hacer un cambio a un archivo del proyecto (algún cambio en el HTML que se renderiza por ejemplo) y verificar que se ejecute automáticamente el pipeline.

2.16 Descargar el resultado del pipeline y correr en un servidor web local el sitio construido.

2.17 Mostrar el antes y el después del cambio.

