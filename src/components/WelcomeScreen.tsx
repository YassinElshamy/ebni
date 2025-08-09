import React, { useRef } from "react";

interface WelcomeScreenProps {
  onFileSelected: (file: File) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 text-center px-6">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">Welcome to Ebni 🧱</h1>
      <p className="text-lg text-gray-600 mb-8">
        Upload your 2D floorplan image and we’ll help you convert it to a 3D model.
      </p>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
      >
        Upload Floorplan
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default WelcomeScreen;