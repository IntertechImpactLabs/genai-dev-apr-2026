import Database from "better-sqlite3";

const db = new Database(":memory:");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

type Row = Record<string, unknown>;

export const pool = {
  query(sql: string, params: unknown[] = []): Promise<{ rows: Row[] }> {
    return Promise.resolve().then(() => {
      const stmt = db.prepare(sql);
      if (/^\s*SELECT/i.test(sql)) {
        const rows = stmt.all(...params) as Row[];
        return { rows };
      }
      const info = stmt.run(...params);
      const rows = info.lastInsertRowid
        ? (db
            .prepare("SELECT * FROM users WHERE id = ?")
            .all(info.lastInsertRowid) as Row[])
        : [];
      return { rows };
    });
  },

  end(): Promise<void> {
    return Promise.resolve().then(() => { db.close(); });
  },
};

export async function checkConnection(): Promise<boolean> {
  try {
    db.prepare("SELECT 1").get();
    return true;
  } catch {
    return false;
  }
}
