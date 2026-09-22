import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.foodqualitycertification.id";
  const lastModified = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/alur-sertifikasi", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/info/berkas-haccp", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/profile/tentang-kami", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/profile/tim", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/profile/visi-misi", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/profile/struktur", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/profile/independensi", priority: 0.7, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
