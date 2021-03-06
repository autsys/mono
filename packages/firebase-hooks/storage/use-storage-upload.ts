import { upload } from "@autsys/firebase/storage/upload";
import { usePrevious } from "@autsys/hooks/use-previous";
import {
  FirebaseStorage,
  ref as r,
  UploadMetadata,
  UploadTaskSnapshot,
} from "firebase/storage";
import { useEffect, useState } from "react";

/**
 * Hook to upload a file to Firebase storage
 */
export default function useStorageUpload(props: {
  refPath: string;
  storage: FirebaseStorage;
  file: File;
  metadata?: UploadMetadata;
  onChange?: (snapshot: UploadTaskSnapshot) => void;
}): { progress: number; url: string } {
  const { refPath, file, storage, metadata, onChange } = props;
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const previous = usePrevious(file);

  const status = (snapshot: UploadTaskSnapshot) => {
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress(percent);
  };

  useEffect(() => {
    if (file && previous !== file) {
      const ref = r(storage, refPath);
      upload(ref, file, metadata, onChange || status).then((url: string) =>
        setUrl(url)
      );
    }
  }, [file, previous, refPath, storage]);
  return { progress, url };
}
