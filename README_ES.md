<a name="readme-top"></a>
<br />
<div align="center">
  <a href="public/SMT_UTN.png">
    <img src="https://i.imgur.com/rY92D2Q.png" alt="Logo de San Miguel de Tucumán y Universidad Tecnologica Nacional">
  </a>
<h3 align="center">Recolección Inteligente para un Tucumán Limpio (Aplicación Web)</h3>
<h4 align="center">Sistema de control de flotas para camiones recolectores de residuos sólidos urbanos en San Miguel de Tucumán</h4>
</div>

# Acerca del proyecto:
Este proyecto propone la implementación de un sistema de localización por GPS en tiempo real para controlar las operaciones de los camiones recolectores de basura de la ciudad. Diseñado para complementarse con el plan GIRSU, una estrategia de optimización de recursos para garantizar una gestión innovadora y eficiente de los residuos sólidos urbanos en la ciudad de San Miguel de Tucumán.

No solo buscamos mejorar la eficiencia y control en la recolección de residuos, sino también contribuir a la reducción de costos operativos y del impacto ambiental, alineándose con los objetivos de sostenibilidad de la ciudad; Al permitir a los ciudadanos estar informados sobre los horarios y rutas de recolección, se fomenta una mayor responsabilidad y participación comunitaria en la gestión de residuos.

# Objetivos
- **Integración con GIRSU:** Aportar una herramienta tecnológica que fortalece y complementa las iniciativas actuales del programa GIRSU, en pos de una ciudad más limpia y eficiente.
- **Mejora del servicio público:** Aumentar la calidad y la eficiencia del servicio de recolección de residuos, ofreciendo una respuesta más ágil a los desafíos operativos.
- **Generación de datos estratégicos:** Proveer un historial detallado de las operaciones de recolección para la toma de decisiones informadas y la planificación futura.
- **Participación ciudadana:** Fomentar la conciencia ambiental y la participación activa de los ciudadanos en la gestión de residuos, a través de la transparencia y la accesibilidad de la información.

# Alcance del proyecto
- **Implementación de Dispositivos GPS:** Instalación de dispositivos de rastreo GPS en los camiones recolectores de residuos sólidos urbanos.
- **Centralización de Datos:** Transmisión de la información de ubicación en tiempo real a un servidor centralizado, con almacenamiento seguro y accesible.
- **Acceso Público a la Información:** Desarrollo de una plataforma web interactiva que muestra la ubicación en tiempo real de los camiones recolectores y otros datos relevantes.
- **Gestión administrativa:** Creación de un panel de control para la administración de usuarios, camiones y rutas de recolección, además de acceder a un historial detallado de recorridos, velocidades, datos de conductores, paradas, demoras, y otros aspectos operativos.

# Esquema general
<img src="https://i.imgur.com/yFy4IQc.png" alt="Logo de San Miguel de Tucumán y Universidad Tecnologica Nacional">


# Tecnologías usadas en esta Aplicación Web:
![Nextjs](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

![Vim](https://img.shields.io/badge/VIM-%2311AB00.svg?&style=for-the-badge&logo=vim&logoColor=white)

![WebStorm](https://img.shields.io/badge/webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black) ![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

![love](http://ForTheBadge.com/images/badges/built-with-love.svg)

<p align="right">(<a href="#readme-top">ir arriba</a>)</p>

# Características

- [x] Mostrar mapa básico
- [x] Actualización en tiempo real de la ubicación de los camiones
- [x] Diseño responsivo
- [ ] Mostrar información detallada de los camiones al hacer clic
- [ ] Mostrar rutas de recolección
- [ ] Mostrar horarios de recolección
- [ ] Panel de control administrativo
    - [ ] Autenticación de usuarios
    - [ ] Administración de camiones
    - [ ] Administración de rutas
    - [ ] Historial de recorridos
- [ ] Recordatorios de recolección
- [ ] Bot de alerta de recolección
    - [ ] Integración telegram
    - [ ] Integración whatsapp

<p align="right">(<a href="#readme-top">ir arriba</a>)</p>

<!-- GETTING STARTED -->
# Empezando

Para obtener una copia local en funcionamiento, siga estos sencillos pasos.

## Prerrequisitos
* Node v20.9.0
  ```sh
  nvm install 20
  ```
* pnpm

# Instalación

1. Clonar el repositorio
   ```sh
   git clone https://github.com/ramos-adrian/girsu-gps-frontend
   ```
2. Crear un archivo .env en la raíz del proyecto con las siguientes variables de entorno
o alternativamente, establecer las variables de entorno en el sistema operativo.
   ```sh
    #.env
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_API_KEY
    NEXT_PUBLIC_CITY_LAT=CITY_LATITUDE
    NEXT_PUBLIC_CITY_LNG=CITY_LONGITUDE
    NEXT_PUBLIC_CITY_ZOOM=MAP_ZOOM
    NEXT_PUBLIC_GOOGLE_MAP_GESTURE_HANDLING=cooperative
    NEXT_PUBLIC_GOOGLE_MAP_ID=YOUR_GOOGLE_MAP_ID
    NEXT_PUBLIC_CITY_RESTRICTION_NORTH=LATITUDE_NORTH
    NEXT_PUBLIC_CITY_RESTRICTION_SOUTH=LATITUDE_SOUTH
    NEXT_PUBLIC_CITY_RESTRICTION_WEST=LONGITUDE_WEST
    NEXT_PUBLIC_CITY_RESTRICTION_EAST=LONGITUDE_EAST
    NEXT_PUBLIC_WEB_SOCKET_BROKER_URL='ws://IP:PORT/api/ws'
    NEXT_PUBLIC_WEB_SOCKET_TRUCK_LOCATION_UPDATES_TOPIC='/topic/truckLocationUpdates'
    NEXT_PUBLIC_FACEBOOK_LINK=https://www.facebook.com/YOUR_COMPANY/
    NEXT_PUBLIC_INSTAGRAM_LINK=https://www.instagram.com/YOUR_COMPANY/
    NEXT_PUBLIC_TWITTER_LINK=https://twitter.com/YOUR_COMPANY/
    NEXT_PUBLIC_YOUTUBE_LINK=https://www.youtube.com/YOUR_COMPANY/
    NEXT_PUBLIC_WEBSITE_LINK=YOUR_WEBSITE
   ```
3. Instalar paquetes PNPM
   ```sh
   pnpm install
   ```
4. Iniciar el servidor de desarrollo
   ```sh
   pnpm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Contacto Desarrolladores
Ramos, Adrián David - adrian@ramos.ar 

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/adrian-david-ramos) 