import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PT FOOD QUALITY CERTIFICATION",
    short_name: "PT FQC",
    description: "Lembaga Sertifikasi HACCP Terakreditasi KAN di Indonesia",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f1e36",
    icons: [
      {
        src: "/icon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icon-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
