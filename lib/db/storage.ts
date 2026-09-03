// --- HELPER STORAGE UTILITIES ---

export const getLocal = <T>(key: string, seed: T[]): T[] => {
  if (typeof window === "undefined") return seed;
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(data);
  } catch (e) {
    return seed;
  }
};

export const setLocal = <T>(key: string, data: T[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.warn("LocalStorage quota exceeded, trying trimmed list:", err);
      try {
        localStorage.setItem(key, JSON.stringify(data.slice(-10)));
      } catch (fallbackErr) {
        console.error("LocalStorage write failed completely:", fallbackErr);
      }
    }
  }
};

// Helper to automatically compress uploaded image files to prevent LocalStorage QuotaExceededError
export const compressImage = (file: File, maxWidth = 800, quality = 0.75): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
