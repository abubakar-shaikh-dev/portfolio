import { v2 as cloudinary } from 'cloudinary';

/**
 * Cloudinary upload + crop layer for the admin panel.
 *
 * Requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET
 * in the environment. Server-only — the secret must never reach the client.
 */

let configured = false;

function assertConfigured() {
  if (configured) return;
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error(
      '[cloudinary] Missing configuration. Set CLOUDINARY_CLOUD_NAME (from the Cloudinary dashboard), CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env.local.',
    );
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

export interface UploadResult {
  publicId: string;
  /** Crop-ready URL: f_auto/q_auto + the requested dimensions, changeable per use */
  url: string;
  width: number;
  height: number;
}

/**
 * Uploads an image buffer and returns an auto-format/auto-quality URL cropped
 * to `width x height` with `fill` (cover) semantics — the crop is applied by
 * Cloudinary on delivery, so one upload serves every layout size.
 */
export async function uploadImage(
  buffer: Buffer,
  options: { folder?: string; width?: number; height?: number; filename?: string } = {},
): Promise<UploadResult> {
  assertConfigured();

  const { folder = 'portfolio', width = 1200, height = 630, filename } = options;

  return new Promise<UploadResult>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename?.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '-'),
        unique_filename: true,
        overwrite: false,
        // eager variants pre-generate the common crop; the base URL stays flexible
        eager: [
          { width, height, crop: 'fill', gravity: 'auto', fetch_format: 'auto', quality: 'auto' },
          { width: 800, height: 800, crop: 'fill', gravity: 'auto', fetch_format: 'auto', quality: 'auto' },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(new Error(`[cloudinary] upload failed: ${error?.message ?? 'unknown error'}`));
          return;
        }
        resolve({
          publicId: result.public_id,
          url: result.secure_url,
          width: result.width,
          height: result.height,
        });
      },
    );
    stream.end(buffer);
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  assertConfigured();
  await cloudinary.uploader.destroy(publicId);
}
