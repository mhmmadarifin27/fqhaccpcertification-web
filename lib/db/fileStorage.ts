// IndexedDB storage for large uploaded audit files (PDFs, DOCX, ZIP, Images)
// This prevents LocalStorage 5MB QuotaExceededError when applicants upload files up to 25MB.

const DB_NAME = "haccp_audit_files_db";
const STORE_NAME = "audit_file_blobs";
const DB_VERSION = 1;

function openFilesDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      return reject(new Error("IndexedDB is not available in this environment"));
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Saves a file payload (data URL / base64) into IndexedDB
 */
export async function saveFilePayload(id: string, fileData: string): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const db = await openFilesDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(fileData, id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Failed to save file payload to IndexedDB:", err);
  }
}

/**
 * Retrieves a file payload by document ID from IndexedDB
 */
export async function getFilePayload(id: string): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const db = await openFilesDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Deletes a file payload from IndexedDB
 */
export async function deleteFilePayload(id: string): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const db = await openFilesDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // Ignore error
  }
}
