import React, { useRef, useState } from 'react';

interface Props {
  onImageUpload: (image: HTMLImageElement) => void;
}

const FloorplanUploader: React.FC<Props> = ({ onImageUpload }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          setPreview(img.src);
          onImageUpload(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => inputRef.current?.click()}
      >
        Upload Floorplan
      </button>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="max-h-64 border p-2 rounded shadow-md"
        />
      )}
    </div>
  );
};

export default FloorplanUploader;
