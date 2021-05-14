const fs = require('fs')
const path = require('path')

const db = {
  "todos": [
    {
      "id": "1",
      "title": "This is a todo.",
      "done": false
    }
  ]
}

const dbPath = path.join(__dirname, 'db.json')
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify(db))