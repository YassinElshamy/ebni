import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import FloorplanEditor from "@/components/FloorplanEditor";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div>
      {!selectedFile ? (
        <WelcomeScreen onFileSelected={setSelectedFile} />
      ) : (
        <FloorplanEditor uploadedFile={selectedFile} />
      )}
    </div>
  );
}