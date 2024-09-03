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

2.2 Agregar en pipeline YAML una tarea de Publish.

2.3 Explicar por qué es necesario contar con una tarea de Publish en un pipeline que corre en un agente de Microsoft en la nube.

2.4 Descargar el resultado del pipeline y correr localmente el software compilado.

2.5 Habilitar el editor clásico de pipelines. Explicar las diferencias claves entre este tipo de editor y el editor YAML.

2.6 Crear un nuevo pipeline con el editor clásico. Descargar el resultado del pipeline y correr localmente el software compilado.

2.7 Configurar CI en ambos pipelines (YAML y Classic Editor). Mostrar resultados de la ejecución automática de ambos pipelines al hacer un commit en la rama main.

2.8 Explicar la diferencia entre un agente MS y un agente Self-Hosted. Qué ventajas y desventajas hay entre ambos? Cuándo es conveniente y/o necesario usar un Self-Hosted Agent?

2.8 Crear un Pool de Agentes y un Agente Self-Hosted

2.9 Instalar y correr un agente en nuestra máquina local.

2.10 Crear un pipeline que use el agente Self-Hosted alojado en nuestra máquina local.

2.11 Buscar el resultado del pipeline y correr localmente el software compilado.

2.12 Crear un nuevo proyecto en ADO clonado desde un repo que contenga una aplicación en Angular como por ejemplo https://github.com/ingsoft3ucc/angular-demo-project.git

2.13 Configurar un pipeline de build para un proyecto de tipo Angular como el clonado.

2.14 Habilitar CI para el pipeline.

2.15 Hacer un cambio a un archivo del proyecto (algún cambio en el HTML que se renderiza por ejemplo) y verificar que se ejecute automáticamente el pipeline.

2.16 Descargar el resultado del pipeline y correr en un servidor web local el sitio construido.

2.17 Mostrar el antes y el después del cambio.

