# Calendario

![Estado inicial de aplicación](/public/login.png)
![Estado inicial de aplicación](/public/calendarioActual.png)


Esta es una aplicación MERN desarrollada en React 18.3.1 que permite a los usuarios registrarse y en el sitio y crear eventos con fecha de inicio y fin, título y, descripción. El usuario puede visualizar, modificar y eliminar sus propios eventos, y también puede visualizar los eventos de otros usuarios.

La aplicación fue desplegada utilizando Railway, y se encuentra disponible en [este link](https://calendarapp-backend-luci.up.railway.app).

Usuario registrado de ejemplo:
- Correo: luci@gmail.com
- Contraseña: 123456

## Características y herramientas

- MongoDB para la persistencia de los datos.
- Ruteo y protección de rutas utilizando la librería React Router.
- Diseño responsivo.
- Redux Toolkit para manejar el storage de la aplicación.
- Uso de Material UI para la interfaz gráfica de la aplicación.

## Requisitos
Para ejecutar esta aplicación en tu máquina local, necesitas tener instalado lo siguiente:

- Node.js
- npm (Node Package Manager) o yarn

## Pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LuciaSoria5/CalendarApp.git
   ```

2. Navega al directorio del proyecto e instala las dependencias:
   ```bash
   npm install
    ```

3. Renombrar el archivo `.env.template` por `.env`.

4. Hacer los cambios respectivos en las variables de entorno.
    ```
    VITE_API_URL=http://localhost:4000/api
    ```

5. Ejecuta la aplicación en modo desarroll:
    ````bash
    npm run dev
    ````