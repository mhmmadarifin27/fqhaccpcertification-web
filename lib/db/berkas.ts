import { getLocal, setLocal } from "./storage";
import { saveFilePayload, getFilePayload, deleteFilePayload } from "./fileStorage";

export interface HaccpDocSubmission {
  id: string;
  ticketNumber: string;
  companyName: string;
  picName: string;
  picPhone: string;
  picEmail: string;
  productScope: string;
  documentCategory: string;
  documentCategoryLabel: string;
  fileName: string;
  fileSize?: string;
  fileData?: string;
  notes?: string;
  status: "submitted" | "under_review" | "verified" | "need_revision";
  createdAt: string;
}

export const SEED_HACCP_DOCS: HaccpDocSubmission[] = [
  {
    id: "doc-001",
    ticketNumber: "DOC-2026-1042",
    companyName: "PT Rempah Nusantara Sejahtera",
    picName: "Anita Wijaya",
    picPhone: "+62 822-3344-5566",
    picEmail: "anita@rempahnusantara.co.id",
    productScope: "Rempah dan Produk Rempah",
    documentCategory: "bundle-sni-cxc-1",
    documentCategoryLabel: "Bundel Lengkap Seluruh Dokumen SNI CXC 1:1969 (GHP/GMP + Rencana HACCP + Legalitas)",
    fileName: "Dokumen_Lengkap_SNI_CXC_1_1969_Rempah_Nusantara_2026.pdf",
    fileSize: "6.8 MB",
    notes: "[Tiket Registrasi: HACCP-2026-3029] Sudah mencakup Manual Bagian 1 GHP dan Bagian 2 Rencana HACCP terverifikasi.",
    status: "verified",
    createdAt: "2026-08-28T11:00:00Z"
  },
  {
    id: "doc-002",
    ticketNumber: "DOC-2026-2189",
    companyName: "PT Roti Prima Sejahtera",
    picName: "Ahmad Fauzi",
    picPhone: "+62 812-3456-7890",
    picEmail: "fauzi@rotiprima.com",
    productScope: "Produk Bakeri",
    documentCategory: "haccp-plan-section2",
    documentCategoryLabel: "Bagian 2: Rencana HACCP & 7 Prinsip (Tabel Analisis Bahaya, Penetapan CCP, & Batas Kritis)",
    fileName: "Tabel_Analisis_Bahaya_CCP_Bakery_v2.pdf",
    fileSize: "2.8 MB",
    notes: "[Tiket Registrasi: HACCP-2026-1024] Revisi batas kritis tahap pemanggangan oven sesuai rekomendasi.",
    status: "under_review",
    createdAt: "2026-09-02T16:20:00Z"
  }
];

export const getHaccpDocSubmissions = async (): Promise<HaccpDocSubmission[]> => {
  const list = getLocal<HaccpDocSubmission>("hacpp_docs", SEED_HACCP_DOCS);

  if (typeof window !== "undefined") {
    try {
      const hydrated = await Promise.all(
        list.map(async (doc) => {
          if (!doc.fileData) {
            const stored = await getFilePayload(doc.id);
            if (stored) {
              return { ...doc, fileData: stored };
            }
          }
          return doc;
        })
      );
      return hydrated;
    } catch (e) {
      console.warn("Error hydrating files from IndexedDB:", e);
      return list;
    }
  }

  return list;
};

export const createHaccpDocSubmission = async (
  data: Omit<HaccpDocSubmission, "id" | "ticketNumber" | "createdAt" | "status">
): Promise<HaccpDocSubmission> => {
  const docId = `doc-${Date.now()}`;
  const newDoc: HaccpDocSubmission = {
    ...data,
    id: docId,
    ticketNumber: `DOC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "submitted",
    createdAt: new Date().toISOString()
  };

  // 1. Safely store heavy fileData payload into IndexedDB (supports >25MB without quota issues)
  if (newDoc.fileData) {
    try {
      await saveFilePayload(docId, newDoc.fileData);
    } catch (err) {
      console.warn("Could not save to IndexedDB:", err);
    }
  }

  // 2. Save metadata to LocalStorage (strip big fileData to prevent LocalStorage 5MB quota crash)
  const list = getLocal<HaccpDocSubmission>("hacpp_docs", SEED_HACCP_DOCS);
  const docForLocalStorage: HaccpDocSubmission = {
    ...newDoc,
    fileData: newDoc.fileData && newDoc.fileData.length < 50000 ? newDoc.fileData : undefined
  };

  list.unshift(docForLocalStorage);
  setLocal("hacpp_docs", list);
  return newDoc;
};

export const updateHaccpDocStatus = async (
  id: string,
  status: HaccpDocSubmission["status"]
): Promise<boolean> => {
  const list = getLocal<HaccpDocSubmission>("hacpp_docs", SEED_HACCP_DOCS);
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  setLocal("hacpp_docs", updated);
  return true;
};

export const deleteHaccpDocSubmission = async (id: string): Promise<boolean> => {
  await deleteFilePayload(id);
  const list = getLocal<HaccpDocSubmission>("hacpp_docs", SEED_HACCP_DOCS);
  const updated = list.filter((item) => item.id !== id);
  setLocal("hacpp_docs", updated);
  return true;
};
