import { supabase, isSupabaseConfigured } from "../supabase";
import { getLocal, setLocal } from "./storage";

export interface SertifikasiInquiry {
  id: string;
  companyName: string;
  companyAddress?: string;
  picName: string;
  phone: string;
  email: string;
  industry: string;
  haccpStatus: string;
  message: string;
  ticketNumber: string;
  createdAt: string;
}

export const SEED_INQUIRIES: SertifikasiInquiry[] = [
  {
    id: "inq-1",
    companyName: "PT Roti Prima Sejahtera",
    companyAddress: "Jl. Industri Bakery No. 12, Sleman, D.I. Yogyakarta",
    picName: "Ahmad Fauzi",
    phone: "+62 812-3456-7890",
    email: "fauzi@rotiprima.com",
    industry: "Produk Bakeri",
    haccpStatus: "Sedang Persiapan",
    message: "Pabrik roti dan pastry modern, membutuhkan audit sertifikasi HACCP untuk ekspansi distribusi supermarket.",
    ticketNumber: "HACCP-2026-1024",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "inq-2",
    companyName: "PT Daging Segar Nusantara",
    companyAddress: "Kawasan Industri Boyolali Blok B5, Jawa Tengah",
    picName: "Anita Wijaya",
    phone: "+62 822-3344-5566",
    email: "anita@dagingsegar.co.id",
    industry: "Daging dan Produk Daging",
    haccpStatus: "Belum Diterapkan",
    message: "Fasilitas pemotongan dan pengolahan sosis/bakso beku memerlukan audit kesesuaian sistem HACCP.",
    ticketNumber: "HACCP-2026-3029",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "inq-3",
    companyName: "PT Nutrisi Medika Husada",
    companyAddress: "Jl. Farmasi Gizi No. 88, Semarang, Jawa Tengah",
    picName: "Budi Santoso",
    phone: "+62 855-6677-8899",
    email: "budi@nutrisimedika.com",
    industry: "Pangan Olahan untuk Keperluan Gizi Khusus",
    haccpStatus: "Sudah Diterapkan",
    message: "Kami memproduksi pangan formula diet khusus dan MP-ASI, memerlukan sertifikasi resmi dari LSHACCP terakreditasi KAN.",
    ticketNumber: "HACCP-2026-8812",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "inq-4",
    companyName: "Sentra Pangan Gizi Sejahtera (SPPG)",
    companyAddress: "Jl. Maguwoharjo No. 45, Depok, Sleman, DIY",
    picName: "Siti Rahmah",
    phone: "+62 811-9988-7766",
    email: "siti@sppgsejahtera.com",
    industry: "Jasa Boga / Pelayanan Pangan / SPPG",
    haccpStatus: "Sedang Persiapan",
    message: "Sentra Pengolahan Pangan Gizi untuk penyedia layanan makanan massal, mengajukan sertifikasi HACCP.",
    ticketNumber: "HACCP-2026-4401",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "inq-5",
    companyName: "CV Surya Bakery & Cake",
    companyAddress: "Jl. Raya Solo No. 102, Surakarta, Jawa Tengah",
    picName: "Joko Riyadi",
    phone: "+62 877-8899-0011",
    email: "joko@suryabakery.com",
    industry: "Produk Bakeri",
    haccpStatus: "Sudah Diterapkan",
    message: "Unit pengolahan cake dan roti kering kemasan toples untuk pasar ekspor.",
    ticketNumber: "HACCP-2026-9042",
    createdAt: new Date().toISOString()
  }
];

export const getInquiries = async (): Promise<SertifikasiInquiry[]> => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("sertifikasi")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((item) => ({
          id: item.id.toString(),
          companyName: item.company_name,
          companyAddress: item.company_address || item.address || "",
          picName: item.pic_name,
          phone: item.phone,
          email: item.email,
          industry: item.industry,
          haccpStatus: item.haccp_status,
          message: item.message || "",
          ticketNumber: item.ticket_number,
          createdAt: item.created_at
        }));
      }
      console.warn("Supabase fetch error, falling back to LocalStorage:", error);
    } catch (e) {
      console.warn("Supabase connection error, falling back to LocalStorage:", e);
    }
  }
  return getLocal<SertifikasiInquiry>("hacpp_inquiries", SEED_INQUIRIES).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const createInquiry = async (
  inquiry: Omit<SertifikasiInquiry, "id" | "createdAt">
): Promise<SertifikasiInquiry> => {
  const newInq: SertifikasiInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  // 1. Sync LocalStorage (Always)
  const localList = getLocal<SertifikasiInquiry>("hacpp_inquiries", SEED_INQUIRIES);
  localList.unshift(newInq);
  setLocal("hacpp_inquiries", localList);

  // 2. Sync Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("sertifikasi").insert([
        {
          company_name: inquiry.companyName,
          company_address: inquiry.companyAddress || "",
          pic_name: inquiry.picName,
          phone: inquiry.phone,
          email: inquiry.email,
          industry: inquiry.industry,
          haccp_status: inquiry.haccpStatus,
          message: inquiry.message,
          ticket_number: inquiry.ticketNumber
        }
      ]);
      if (error) console.error("Error inserting to Supabase:", error);
    } catch (e) {
      console.error("Connection failed during Supabase insert:", e);
    }
  }

  return newInq;
};

export const updateInquiryStatus = async (id: string, status: string): Promise<boolean> => {
  // 1. LocalStorage
  const localList = getLocal<SertifikasiInquiry>("hacpp_inquiries", SEED_INQUIRIES);
  const updatedList = localList.map((item) =>
    item.id === id ? { ...item, haccpStatus: status } : item
  );
  setLocal("hacpp_inquiries", updatedList);

  // 2. Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const dbId = id.startsWith("inq-") ? -1 : parseInt(id, 10);
      const targetItem = localList.find((item) => item.id === id);
      if (targetItem) {
        if (dbId !== -1 && !isNaN(dbId)) {
          const { error } = await supabase
            .from("sertifikasi")
            .update({ haccp_status: status })
            .eq("id", dbId);
          if (error) console.error("Error updating status in Supabase:", error);
        } else {
          const { error } = await supabase
            .from("sertifikasi")
            .update({ haccp_status: status })
            .eq("ticket_number", targetItem.ticketNumber);
          if (error) console.error("Error updating status in Supabase:", error);
        }
      }
    } catch (e) {
      console.error("Connection failed during Supabase status update:", e);
    }
  }

  return true;
};
