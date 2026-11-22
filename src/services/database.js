import { openDB } from 'idb'
const DB_NAME = 'taskflow-db'
const DB_VERSION = 1
let databasePromise = null
// Відкриваємо одну базу даних і повторно використовуємо з'єднання.
export function getDatabase() {
 if (typeof indexedDB === 'undefined') {
 return Promise.reject(new Error('Цей браузер не підтримує IndexedDB.'))
 }
 if (!databasePromise) {
 databasePromise = openDB(DB_NAME, DB_VERSION, {
 upgrade(db) {
 if (!db.objectStoreNames.contains('tasks')) {
 db.createObjectStore('tasks', { keyPath: 'id' })
 }
 if (!db.objectStoreNames.contains('projects')) {
 db.createObjectStore('projects', { keyPath: 'id' })
 }
 if (!db.objectStoreNames.contains('metadata')) {
 db.createObjectStore('metadata')
 }
 },
 }).catch((error) => {
 databasePromise = null
 throw error
 })
 }
 return databasePromise
}
// Читаємо завдання, проєкти та службові значення в одній транзакції.
export async function readSnapshot() {
 const db = await getDatabase()
 const tx = db.transaction(['tasks', 'projects', 'metadata'], 'readonly')
 const [tasks, projects, initialized, nextProjectId] = await Promise.all([
 tx.objectStore('tasks').getAll(),
 tx.objectStore('projects').getAll(),
 tx.objectStore('metadata').get('initialized'),
 tx.objectStore('metadata').get('nextProjectId'),
 tx.done,
 ])
 return { tasks, projects, initialized: initialized === true, nextProjectId }
}
// Атомарно замінюємо збережені списки актуальним знімком Pinia.
export async function writeSnapshot(snapshot) {
 const db = await getDatabase()
 const tx = db.transaction(['tasks', 'projects', 'metadata'], 'readwrite')
 const taskStore = tx.objectStore('tasks')
 const projectStore = tx.objectStore('projects')
 const metadataStore = tx.objectStore('metadata')
 const operations = []
 try {
 await Promise.all([taskStore.clear(), projectStore.clear()])
 for (const task of snapshot.tasks) operations.push(taskStore.put(task))
 for (const project of snapshot.projects) operations.push(projectStore.put(project))
 operations.push(metadataStore.put(true, 'initialized'))
 operations.push(metadataStore.put(snapshot.nextProjectId, 'nextProjectId'))
 await Promise.all([...operations, tx.done])
 } catch (error) {
 // Відкочуємо також синхронну помилку й обробляємо відхилення tx.done.
 try { tx.abort() } catch { /* Транзакція вже могла завершитися. */ }
 await Promise.allSettled([...operations, tx.done])
 throw error
 }
}
