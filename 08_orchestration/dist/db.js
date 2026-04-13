"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.checkConnection = checkConnection;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default(":memory:");
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);
exports.pool = {
    query(sql, params = []) {
        return Promise.resolve().then(() => {
            const stmt = db.prepare(sql);
            if (/^\s*SELECT/i.test(sql)) {
                const rows = stmt.all(...params);
                return { rows };
            }
            const info = stmt.run(...params);
            const rows = info.lastInsertRowid
                ? db
                    .prepare("SELECT * FROM users WHERE id = ?")
                    .all(info.lastInsertRowid)
                : [];
            return { rows };
        });
    },
    end() {
        return Promise.resolve().then(() => { db.close(); });
    },
};
async function checkConnection() {
    try {
        db.prepare("SELECT 1").get();
        return true;
    }
    catch {
        return false;
    }
}
