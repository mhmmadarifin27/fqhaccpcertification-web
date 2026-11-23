import { getLocal, setLocal } from "./storage";
import { saveFilePayload, getFilePayload, deleteFilePayload } from "./fileStorage";
import { supabase } from "../supabase";

export type ComplaintAppealType = "keluhan" | "banding";
export type ComplaintAppealStatus = "received" | "in_review" | "resolved";

export interface ComplaintAppealItem {
  id: string;
  ticketNumber: string;
  type: ComplaintAppealType;
  reporterName: string;
  companyName: string;
  email: string;
  phone: string;
  relatedTicketOrCert?: string;
  subject: string;
  description: string;
  attachmentName?: string;
  attachmentData?: string;
  status: ComplaintAppealStatus;
  adminNote?: string;
  createdAt: string;
}

const STORAGE_KEY = "haccp_complaints";

const SEED_COMPLAINTS: ComplaintAppealItem[] = [
  {
    id: "comp-001",
    ticketNumber: "KEL-2026-0104",
    type: "keluhan",
    reporterName: "Anita Wijaya",
    companyName: "PT Rempah Nusantara Sejahtera",
    email: "anita@rempahnusantara.co.id",
    phone: "+62 822-3344-5566",
    relatedTicketOrCert: "DOC-2026-1042",
    subject: "Klarifikasi Jadwal Audit Lapangan Tahap 2",
    description:
      "Mohon konfirmasi ulang jadwal kehadiran tim auditor untuk lini pengeringan dan penggilingan rempah agar tim produksi kami dapat menyesuaikan jadwal operasional.",
    status: "in_review",
    adminNote: "Tim koordinator audit sedang mengonfirmasi jadwal terbaru ke PIC perusahaan.",
    createdAt: "2026-09-05T09:30:00Z",
  },
  {
    id: "comp-002",
    ticketNumber: "BND-2026-0208",
    type: "banding",
    reporterName: "Ahmad Fauzi",
    companyName: "PT Roti Prima Sejahtera",
    email: "fauzi@rotiprima.co.id",
    phone: "+62 812-3456-7890",
    relatedTicketOrCert: "DOC-2026-2189",
    subject: "Permohonan Peninjauan Ulang Temuan Minor CCP Suhu Pemanggangan",
    description:
      "Kami mengajukan banding terhadap klasifikasi temuan pada rekaman kalibrasi termometer oven lini 2 disertai bukti sertifikat kalibrasi terbaru terakreditasi KAN.",
    status: "resolved",
    adminNote: "Komite Banding Independen telah meninjau bukti kalibrasi KAN dan menerima tindakan perbaikan.",
    createdAt: "2026-09-08T14:15:00Z",
  },
];

interface SupabaseComplaintRow {
  id: string;
  ticket_number: string;
  type: ComplaintAppealType;
  reporter_name: string;
  company_name: string;
  email: string;
  phone: string;
  related_ticket_or_cert?: string | null;
  subject: string;
  description: string;
  attachment_name?: string | null;
  status: ComplaintAppealStatus;
  admin_note?: string | null;
  created_at: string;
}

function mapSupabaseRow(row: SupabaseComplaintRow): ComplaintAppealItem {
  return {
    id: row.id,
    ticketNumber: row.ticket_number,
    type: row.type,
    reporterName: row.reporter_name,
    companyName: row.company_name,
    email: row.email,
    phone: row.phone,
    relatedTicketOrCert: row.related_ticket_or_cert ?? undefined,
    subject: row.subject,
    description: row.description,
    attachmentName: row.attachment_name ?? undefined,
    status: row.status,
    adminNote: row.admin_note ?? undefined,
    createdAt: row.created_at,
  };
}

export async function getComplaintsAppeals(): Promise<ComplaintAppealItem[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("keluhan_banding")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return (data as SupabaseComplaintRow[]).map(mapSupabaseRow);
      }
    } catch {
      // Table may not exist yet on Supabase; fall back cleanly to localStorage
    }
  }
  return getLocal<ComplaintAppealItem>(STORAGE_KEY, SEED_COMPLAINTS);
}

export async function getComplaintAttachment(id: string): Promise<string | null> {
  return getFilePayload(`complaint_${id}`);
}

export async function createComplaintAppeal(
  payload: Omit<ComplaintAppealItem, "id" | "ticketNumber" | "status" | "createdAt">
): Promise<ComplaintAppealItem> {
  const id = `comp-${Date.now()}`;
  const prefix = payload.type === "banding" ? "BND" : "KEL";
  const year = new Date().getFullYear();
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  const ticketNumber = `${prefix}-${year}-${suffix}`;
  const createdAt = new Date().toISOString();

  if (payload.attachmentData) {
    try {
      await saveFilePayload(`complaint_${id}`, payload.attachmentData);
    } catch (e) {
      console.warn("Could not store complaint attachment in IndexedDB:", e);
    }
  }

  // Omit large base64 data before persisting metadata in localStorage
  const item: ComplaintAppealItem = {
    id,
    ticketNumber,
    type: payload.type,
    reporterName: payload.reporterName,
    companyName: payload.companyName,
    email: payload.email,
    phone: payload.phone,
    relatedTicketOrCert: payload.relatedTicketOrCert?.trim() || undefined,
    subject: payload.subject,
    description: payload.description,
    attachmentName: payload.attachmentName,
    status: "received",
    createdAt,
  };

  if (supabase) {
    try {
      await supabase.from("keluhan_banding").insert({
        id: item.id,
        ticket_number: item.ticketNumber,
        type: item.type,
        reporter_name: item.reporterName,
        company_name: item.companyName,
        email: item.email,
        phone: item.phone,
        related_ticket_or_cert: item.relatedTicketOrCert ?? null,
        subject: item.subject,
        description: item.description,
        attachment_name: item.attachmentName ?? null,
        status: item.status,
        created_at: item.createdAt,
      });
    } catch {
      // Fallback handled below via localStorage
    }
  }

  const current = getLocal<ComplaintAppealItem>(STORAGE_KEY, SEED_COMPLAINTS);
  setLocal<ComplaintAppealItem>(STORAGE_KEY, [item, ...current]);
  return item;
}

export async function updateComplaintAppealStatus(
  id: string,
  status: ComplaintAppealStatus,
  adminNote?: string
): Promise<boolean> {
  if (supabase) {
    try {
      const updatePayload: { status: ComplaintAppealStatus; admin_note?: string } = { status };
      if (adminNote !== undefined) {
        updatePayload.admin_note = adminNote;
      }
      await supabase.from("keluhan_banding").update(updatePayload).eq("id", id);
    } catch {
      // Ignore if table doesn't exist in Supabase
    }
  }

  const current = getLocal<ComplaintAppealItem>(STORAGE_KEY, SEED_COMPLAINTS);
  const updated = current.map((item) =>
    item.id === id
      ? {
          ...item,
          status,
          adminNote: adminNote !== undefined ? adminNote : item.adminNote,
        }
      : item
  );
  setLocal<ComplaintAppealItem>(STORAGE_KEY, updated);
  return true;
}

export async function deleteComplaintAppeal(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from("keluhan_banding").delete().eq("id", id);
    } catch {
      // Ignore if table doesn't exist in Supabase
    }
  }

  try {
    await deleteFilePayload(`complaint_${id}`);
  } catch {
    // Best-effort attachment cleanup
  }

  const current = getLocal<ComplaintAppealItem>(STORAGE_KEY, SEED_COMPLAINTS);
  const filtered = current.filter((item) => item.id !== id);
  setLocal<ComplaintAppealItem>(STORAGE_KEY, filtered);
  return true;
}
