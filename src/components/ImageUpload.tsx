import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';

interface ImageUploadProps {
  bucket: string;
  path: string;
  currentUrl?: string | null;
  onUpload: (url: string) => void;
  className?: string;
}

export default function ImageUpload({
  bucket,
  path,
  currentUrl,
  onUpload,
  className = '',
}: ImageUploadProps) {
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${path}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      onUpload(data.publicUrl);
    } catch (error) {
      console.error('Upload error:', error);
      alert(t('common.uploadError'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-32 h-32 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-accent transition-colors overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-text-muted text-sm text-center px-2">
            {t('common.clickToUpload')}
          </span>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {uploading && (
        <p className="mt-2 text-sm text-accent">{t('common.uploading')}</p>
      )}
    </div>
  );
}
