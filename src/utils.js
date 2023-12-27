//import { fileURLToPath } from 'url'
const { fileURLToPath } = require('url')
//import path from 'path';
const path = require('path')


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

export default __dirname;