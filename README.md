# Script de Inserción de Divisas en Google Sheets

Este script obtiene los valores actuales de varias divisas respecto al dólar estadounidense (USD) usando la API de [exchangerate.host](https://exchangerate.host/), y los inserta automáticamente en una hoja de cálculo de Google Sheets.

## ¿Qué hace el script?

- Consulta las tasas de cambio de USD a MXN, EUR, CAD, COP y ARS.
- Inserta la fecha y los valores obtenidos en una hoja de Google Sheets.
- Utiliza variables de entorno para mayor seguridad y flexibilidad.

## Requisitos

- Node.js 18 o superior.
- Una cuenta de Google Cloud con acceso a la API de Google Sheets.
- Archivo `credentials.json` con las credenciales de servicio de Google.
- Archivo `.env` con las variables necesarias.

## Instalación

1. **Clona o descarga este repositorio.**

2. **Instala las dependencias:**
   ```sh
   npm install googleapis dotenv axios
   ```

3. **Crea el archivo `.env` en la raíz del proyecto con el siguiente contenido:**
   ```
   SHEET_ID=tu_id_de_hoja
   SHEET_NAME=NombreDeLaHoja
   SHEET_RANGE=A1
   EXCHANGE_RATE_KEY=tu_api_key_de_exchangerate_host
   ```

4. **Coloca tu archivo `credentials.json` (descargado desde Google Cloud) en la raíz del proyecto.**

## Ejecución

Ejecuta el script con Node.js:

```sh
node script.js
```

Esto obtendrá los valores de las divisas y los insertará en tu hoja de Google Sheets.

## Notas

- Asegúrate de compartir tu hoja de Google con el email del cliente de servicio que aparece en tu `credentials.json`.
- Puedes modificar la lista de divisas en el arreglo `currenciesList` dentro del script.
- El script ajusta la hora a UTC-6 para la fecha registrada.

---

¿Dudas o problemas? Revisa los mensajes de error en la consola o consulta la documentación de la API de Google Sheets.