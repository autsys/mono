import upload from "@autsys/firebase/storage/upload";
import {
  FirebaseStorage,
  ref as r,
  UploadMetadata,
  UploadTaskSnapshot,
} from "firebase/storage";
import { useCallback } from "react";

interface Params {
  refPath: string;
  file: File;
  metadata?: UploadMetadata;
  onChange?: (snapshot: UploadTaskSnapshot) => void;
}

export const useStorageUploadLazy = (props: {
  storage: FirebaseStorage;
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
        const ref = r(storage, refPath + file.name);
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
