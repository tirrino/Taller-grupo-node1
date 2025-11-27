# Seguridad

## Rate-limit
### ¿Qué es?
Es la limitación del número de peticiones que un cliente puede hacer en un periodo de tiempo determinado.
### ¿Para qué sirve?
Sirve para prevenir abusos, ataques de fuerza bruta (por ejemplo, cuando hacemos muchos intentos de login, etc.).
### Ejemplo real
Limitar las peticiones a `/auth/login` a 5 intentos por minuto por dirección IP.

## CORS
### ¿Qué es?
Es un mecanismo que controla que orígenes (dominios) pueden hacer peticiones a tu API.
### ¿Qué problema resuelve?
Evita que usuarios no autorizados puedan consumir tu API desde el navegador.
### Ejemplo real
Permitir solo el front `https://mi-front.example.com`.

## JWT (JSON Web Token)
### ¿Qué es?
Token firmado que representa la identidad de un usuario. Tiene un payload (por ejemplo, `sub` con el userId) y tiene firmada con un secreto.
### ¿Para qué sirve?
Sirve para hacer autenticación sin estado: el cliente guarda el token y lo envía en la cabecera `Authorization: Bearer `.
### Ejemplo real
Después de hacer login devuelves un JWT con `sub=userId` y `exp` = 1h

## En este ejercicio
- `rate-limit`: se aplica sobre `/auth` (login) y opcionalmente `/tasks`.
- `CORS`: se configura para dejar pasar solo el front (o en desarrollo `http://localhost:3000`).
- `JWT`: se genera al hacer login y se valida en la middleware o con Passport.