import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";
import { storagePut } from "./storage";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Local fallback directory for when S3 is not configured
const LOCAL_UPLOADS_DIR = path.resolve(process.cwd(), "client", "public", "uploads");

function ensureLocalDir() {
  if (!fs.existsSync(LOCAL_UPLOADS_DIR)) {
    fs.mkdirSync(LOCAL_UPLOADS_DIR, { recursive: true });
  }
}

export function registerUploadRoutes(app: Router) {
  // POST /api/upload/image  — accepts multipart/form-data with field "file"
  // Returns { url: string }
  (app as any).post(
    "/api/upload/image",
    upload.single("file"),
    async (req: any, res: any) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No file provided" });
        }

        const ext = path.extname(req.file.originalname) || ".jpg";
        const key = `cms-uploads/${nanoid(12)}${ext}`;

        // Try S3/storage proxy first, fall back to local disk
        try {
          const result = await storagePut(key, req.file.buffer, req.file.mimetype);
          return res.json({ url: result.url, key: result.key });
        } catch (_storageErr) {
          // Storage not configured — save locally and serve as static asset
          ensureLocalDir();
          const filename = `${nanoid(12)}${ext}`;
          const localPath = path.join(LOCAL_UPLOADS_DIR, filename);
          fs.writeFileSync(localPath, req.file.buffer);
          const publicUrl = `/uploads/${filename}`;
          return res.json({ url: publicUrl, key: publicUrl });
        }
      } catch (err: any) {
        console.error("[Upload] Error:", err);
        return res.status(500).json({ error: err.message ?? "Upload failed" });
      }
    }
  );
}
