# Products Microservice

Este microservicio es parte de la aplicación de microservicios `products-app`. Se encarga de gestionar los productos.

## Requisitos

- Node.js
- npm
- Prisma

## Instalación

1. Clona el repositorio:
  ```bash
  git clone https://github.com/tu-usuario/products-app.git
  ```
2. Navega al directorio del microservicio de productos:
  ```bash
  cd products-app/products-ms
  ```
3. Instala las dependencias:
  ```bash
  npm install
  ```

## Uso

Para iniciar el microservicio, ejecuta:
```bash
npm start
```

## Migraciones de Prisma

Para ejecutar las migraciones de Prisma, utiliza el siguiente comando:
```bash
npx prisma migrate dev
```

## Endpoints

- `GET /products` - Obtiene todos los productos
- `POST /products` - Crea un nuevo producto
- `GET /products/:id` - Obtiene un producto por ID
- `PUT /products/:id` - Actualiza un producto por ID
- `DELETE /products/:id` - Elimina un producto por ID

## Contribuir

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.