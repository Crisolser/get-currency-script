import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';
dotenv.config();
// Definir directorio principal y variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { SHEET_ID,SHEET_NAME,SHEET_RANGE, EXCHANGE_RATE_KEY} = process.env;
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

// Función para insertar datos en Google Sheets
async function insertDataToSheets(data) {
    const auth = new google.auth.GoogleAuth({
        keyFile: CREDENTIALS_PATH,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    
    const request = {
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!${SHEET_RANGE}`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: data,
        }
    };
    
    try {
        const response = await sheets.spreadsheets.values.append(request);
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

// Función para obtener los valores de las divisas y enviarlos a Google Sheets
async function getCurrenciesValues() {
    const currenciesList = ['MXN', 'EUR', 'CAD', 'COP', 'ARS']
    const url = `http://api.exchangerate.host/live?access_key=${EXCHANGE_RATE_KEY}`

    try {
        const now = new Date();
        // Formatear la fecha al formato 'YYYY-MM-DD HH:mm:ss'
        now.setHours(now.getHours() - 6)
        const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ')
        const response = await axios.get(url)
        const rates = response.data.quotes
        const currencyValues = currenciesList.map(currency => rates["USD"+currency] || 'N/A')
        currencyValues.unshift(formattedDate)
        await insertDataToSheets([currencyValues])
        console.log('Datos insertados correctamente en Google Sheets:', currencyValues);
        return currencyValues
    } catch (error) {
        console.error('Error al insertar datos:', error)
        return [];
    }
    
}

getCurrenciesValues()

