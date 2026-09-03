import { getLocal, setLocal } from "./storage";

export interface TrainingRegistration {
  id: string;
  ticketNumber: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  programId: string;
  programTitle: string;
  participantCount: number;
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export const SEED_TRAININGS: TrainingRegistration[] = [
  {
    id: "train-001",
    ticketNumber: "TR-2026-1048",
    fullName: "Budi Santoso, S.TP.",
    companyName: "PT Sumber Pangan Sejahtera",
    email: "budi.santoso@sumberpangan.co.id",
    phone: "081234567890",
    programId: "pengelolaan-haccp",
    programTitle: "Pengelolaan Keamanan Pangan Berbasis HACCP",
    participantCount: 3,
    notes: "Kebutuhan pelatihan tim mutu persiapan audit sertifikasi.",
    status: "confirmed",
    createdAt: "2026-08-25T09:30:00Z"
  },
  {
    id: "train-002",
    ticketNumber: "TR-2026-0904",
    fullName: "Dewi Lestari, S.Si.",
    companyName: "CV Nusantara Food Mandiri",
    email: "dewi.qa@nusantarafood.com",
    phone: "085712345678",
    programId: "penyusunan-dokumen-haccp",
    programTitle: "Pelatihan dan Sertifikasi Penyusunan Dokumen HACCP",
    participantCount: 2,
    notes: "Ingin bimbingan penyusunan HACCP plan dan diagram alir terverifikasi.",
    status: "pending",
    createdAt: "2026-09-01T14:15:00Z"
  }
];

export const getTrainingRegistrations = async (): Promise<TrainingRegistration[]> => {
  return getLocal<TrainingRegistration>("hacpp_trainings", SEED_TRAININGS);
};

export const createTrainingRegistration = async (
  data: Omit<TrainingRegistration, "id" | "ticketNumber" | "createdAt" | "status">
): Promise<TrainingRegistration> => {
  const newReg: TrainingRegistration = {
    ...data,
    id: `train-${Date.now()}`,
    ticketNumber: `TR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const list = getLocal<TrainingRegistration>("hacpp_trainings", SEED_TRAININGS);
  list.unshift(newReg);
  setLocal("hacpp_trainings", list);
  return newReg;
};

export const updateTrainingStatus = async (
  id: string,
  status: TrainingRegistration["status"]
): Promise<boolean> => {
  const list = getLocal<TrainingRegistration>("hacpp_trainings", SEED_TRAININGS);
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  setLocal("hacpp_trainings", updated);
  return true;
};

export const deleteTrainingRegistration = async (id: string): Promise<boolean> => {
  const list = getLocal<TrainingRegistration>("hacpp_trainings", SEED_TRAININGS);
  const updated = list.filter((item) => item.id !== id);
  setLocal("hacpp_trainings", updated);
  return true;
};
