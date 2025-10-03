import fs from 'fs'
import { DB_FILE } from './config.js'

function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8')
}

export { readDB, writeDB }