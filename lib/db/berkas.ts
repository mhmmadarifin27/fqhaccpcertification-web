import { getLocal, setLocal } from "./storage";

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
    companyName: "PT Daging Segar Nusantara",
    picName: "Anita Wijaya",
    picPhone: "+62 822-3344-5566",
    picEmail: "anita@dagingsegar.co.id",
    productScope: "Daging dan Produk Daging",
    documentCategory: "bundle-sni-cxc-1",
    documentCategoryLabel: "Bundel Lengkap Seluruh Dokumen SNI CXC 1:1969 (GHP/GMP + Rencana HACCP + Legalitas)",
    fileName: "Dokumen_Lengkap_SNI_CXC_1_1969_Daging_Segar_2026.pdf",
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
  return getLocal<HaccpDocSubmission>("hacpp_docs", SEED_HACCP_DOCS);
};

export const createHaccpDocSubmission = async (
  data: Omit<HaccpDocSubmission, "id" | "ticketNumber" | "createdAt" | "status">
): Promise<HaccpDocSubmission> => {
  const newDoc: HaccpDocSubmission = {
    ...data,
    id: `doc-${Date.now()}`,
    ticketNumber: `DOC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "submitted",
    createdAt: new Date().toISOString()
  };

  const list = getLocal<HaccpDocSubmission>("hacpp_docs", SEED_HACCP_DOCS);
  list.unshift(newDoc);
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
  const list = getLocal<HaccpDocSubmission>("hacpp_docs", SEED_HACCP_DOCS);
  const updated = list.filter((item) => item.id !== id);
  setLocal("hacpp_docs", updated);
  return true;
};
