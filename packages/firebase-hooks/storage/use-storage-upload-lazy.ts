import upload from "@autsys/firebase/storage/upload";
import firebase from "firebase/app";
import { useCallback } from "react";

interface Params {
  refPath: string;
  file: File;
  metadata?: firebase.storage.UploadMetadata;
  onChange?: (snapshot: firebase.storage.UploadTaskSnapshot) => void;
}

export const useStorageUploadLazy = (props: {
  storage: firebase.storage.Storage;
}): ((
  params: Params
) => Promise<{
  url: string;
} | null>) => {
  const { storage } = props;
  const storageUpload = useCallback(
    async (params: Params) => {
      const { refPath, file, metadata, onChange } = params;
      if (storage && file) {
        const ref = storage.ref(refPath + file.name);
        const url = await upload(ref, file, metadata, onChange);
        return { url };
      }
      return null;
    },
    [storage]
  );
  return storageUpload;
};
export default useStorageUploadLazy;
