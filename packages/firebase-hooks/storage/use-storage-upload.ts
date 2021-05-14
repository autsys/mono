import { upload } from "@autsys/firebase/storage/upload";
import { usePrevious } from "@autsys/hooks/use-previous";
import firebase from "firebase/app";
import { useEffect, useState } from "react";

/**
 * Hook to upload a file to Firebase storage
 */
export default function useStorageUpload(props: {
  refPath: string;
  storage: firebase.storage.Storage;
  file: File;
  metadata?: firebase.storage.UploadMetadata;
  onChange?: (snapshot: firebase.storage.UploadTaskSnapshot) => void;
}): { progress: number; url: string } {
  const { refPath, file, storage, metadata, onChange } = props;
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const previous = usePrevious(file);

  const status = (snapshot: firebase.storage.UploadTaskSnapshot) => {
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress(percent);
  };

  useEffect(() => {
    if (file && previous !== file) {
      const ref = storage.ref(refPath);
      upload(ref, file, metadata, onChange || status).then((url: string) =>
        setUrl(url)
      );
    }
  }, [file, previous, refPath, storage]);
  return { progress, url };
}
