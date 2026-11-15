import { HaccpDocSubmission } from "./berkas";

/**
 * Converts a Base64 Data URL to a native browser Blob
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(",");
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "application/pdf";
  const bstr = atob(parts[1] || "");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Generates an official, valid PDF 1.4 for sample or simulated submissions
 */
export function generateSampleHaccpPdf(doc: Partial<HaccpDocSubmission>): Blob {
  const lines: string[] = [
    "PT FOOD QUALITY CERTIFICATION",
    "KOMITE VERIFIKASI & AUDIT SISTEM HACCP",
    "Standar Acuan: SNI CXC 1:1969 (Revisi 2024)",
    "===========================================================",
    `Nomor Tiket Berkas : ${doc.ticketNumber || "DOC-PREVIEW"}`,
    `Nama Perusahaan    : ${doc.companyName || "Perusahaan Pemohon"}`,
    `PIC / Lead Tim     : ${doc.picName || "-"} (${doc.picPhone || "-"})`,
    `Email PIC          : ${doc.picEmail || "-"}`,
    `Ruang Lingkup      : ${doc.productScope || "Produk Pangan Olahan"}`,
    `Kategori Dokumen   : ${doc.documentCategoryLabel || "Dokumen Persiapan Audit"}`,
    `Nama File Asli     : ${doc.fileName || "dokumen_persiapan_audit.pdf"}`,
    `Tanggal Registrasi : ${doc.createdAt ? new Date(doc.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : new Date().toLocaleDateString("id-ID")}`,
    `Status Dokumen     : ${doc.status === "verified" ? "Lolos Verifikasi Dokumen" : doc.status === "under_review" ? "Sedang Ditinjau Tim Verifikator" : "Dokumen Resmi Terdaftar"}`,
    "===========================================================",
    "DOKUMEN KELENGKAPAN AUDIT TAHAP 1 (AUDIT KECUKUPAN):",
    "1. Manual Keamanan Pangan & Kebijakan Mutu HACCP",
    "2. Deskripsi Produk Pangan, Bahan Baku, & Rencana Distribusi",
    "3. Diagram Alir Proses Produksi & Denah Fasilitas Pengolahan",
    "4. Matriks 7 Prinsip HACCP & Penetapan Critical Control Point (CCP)",
    "5. Program Persyaratan Dasar (GHP / Good Hygiene Practices - GMP)",
    "6. Surat Keputusan (SK) Tim HACCP & Sertifikat Kompetensi Personel",
    "7. Hasil Pengujian Laboratorium Terakreditasi KAN & Kalibrasi Alat",
    "-----------------------------------------------------------",
    "Dokumen ini sah dikeluarkan melalui Sistem Informasi Terpadu",
    "PT Food Quality Certification untuk keperluan audit kesesuaian."
  ];

  let content = "BT /F1 12 Tf 40 790 Td\n";
  lines.forEach((line, i) => {
    const safe = line
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");
    if (i === 0) {
      content += `/F1 15 Tf (${safe}) Tj\n/F1 11 Tf 0 -22 Td\n`;
    } else {
      content += `(${safe}) Tj 0 -19 Td\n`;
    }
  });
  content += "ET";

  const encoder = new TextEncoder();
  const contentBytes = encoder.encode(content);

  let pdfHead = "%PDF-1.4\n";
  const offsets: number[] = [];

  offsets.push(encoder.encode(pdfHead).length);
  const obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  pdfHead += obj1;

  offsets.push(encoder.encode(pdfHead).length);
  const obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
  pdfHead += obj2;

  offsets.push(encoder.encode(pdfHead).length);
  const obj3 =
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n";
  pdfHead += obj3;

  offsets.push(encoder.encode(pdfHead).length);
  const obj4 = `4 0 obj\n<< /Length ${contentBytes.length} >>\nstream\n${content}\nendstream\nendobj\n`;
  pdfHead += obj4;

  offsets.push(encoder.encode(pdfHead).length);
  const obj5 = "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";
  pdfHead += obj5;

  const startxref = encoder.encode(pdfHead).length;
  let xref = "xref\n0 6\n0000000000 65535 f \n";
  for (let i = 0; i < 5; i++) {
    xref += offsets[i].toString().padStart(10, "0") + " 00000 n \n";
  }
  xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  const fullPdf = pdfHead + xref;
  return new Blob([encoder.encode(fullPdf)], { type: "application/pdf" });
}

/**
 * Gets a reliable Blob for a document (either from actual uploaded fileData or fallback generator)
 */
export function getDocumentBlob(doc: HaccpDocSubmission): Blob {
  if (doc.fileData && doc.fileData.startsWith("data:")) {
    try {
      return dataUrlToBlob(doc.fileData);
    } catch (e) {
      console.warn("Failed to convert dataUrl to blob, generating fallback:", e);
    }
  }
  return generateSampleHaccpPdf(doc);
}

/**
 * Opens the document in a new browser tab
 */
export function openDocumentInNewTab(doc: HaccpDocSubmission): void {
  const blob = getDocumentBlob(doc);
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, "_blank");
  setTimeout(() => URL.revokeObjectURL(blobUrl), 120000);
}

/**
 * Triggers direct download of the document
 */
export function downloadDocumentFile(doc: HaccpDocSubmission): void {
  const blob = getDocumentBlob(doc);
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  let filename = doc.fileName || `${doc.ticketNumber}_Dokumen_Audit.pdf`;
  if (!doc.fileData && !filename.toLowerCase().endsWith(".pdf")) {
    filename += ".pdf";
  }
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 120000);
}

/**
 * Analyzes file type for display & inline preview capability
 */
export function getFileTypeInfo(fileName: string, fileData?: string) {
  const lowerName = (fileName || "").toLowerCase();
  const lowerData = (fileData || "").toLowerCase();

  const isPdf = lowerName.endsWith(".pdf") || lowerData.startsWith("data:application/pdf");
  const isImage =
    lowerName.endsWith(".png") ||
    lowerName.endsWith(".jpg") ||
    lowerName.endsWith(".jpeg") ||
    lowerName.endsWith(".webp") ||
    lowerData.startsWith("data:image/");
  const isDoc = lowerName.endsWith(".doc") || lowerName.endsWith(".docx");
  const isZip = lowerName.endsWith(".zip") || lowerName.endsWith(".rar");

  let label = "Dokumen";
  let icon = "📄";

  if (isPdf) {
    label = "PDF Document";
    icon = "📕";
  } else if (isImage) {
    label = "Gambar Dokumen";
    icon = "🖼️";
  } else if (isDoc) {
    label = "Microsoft Word";
    icon = "📘";
  } else if (isZip) {
    label = "Arsip ZIP/RAR";
    icon = "🗂️";
  }

  return {
    isPdf,
    isImage,
    isDoc,
    isZip,
    label,
    icon,
    canPreviewInline: isPdf || isImage || !fileData // Fallback PDF can always be previewed
  };
}
