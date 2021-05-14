// import { getFileUrls } from "@autsys/firebase/storage/path-from-url";
// import firebase from "firebase/app";
// import { useState } from "react";
// import useDeepCompareEffect from "use-deep-compare-effect";

// /**
//  * React hook that takes an array of Firebase storage paths and returns urls to the files.
//  * @param storage - Firebase storage instance
//  * @param data - data object to extract paths from
//  * @param data.paths - paths to files in Firebase Storage
//  * @returns {array} urls of the files at the storage path
//  */
// export default function useStorageGetDlUrls(
//   storage: firebase.storage.Storage,
//   data: Record<string, { filePath: string }>
// ): string[] {
//   const [urls, setUrls] = useState([""]);
//   //convert urls to paths
//   const paths = data && Object.values(data);
//   useDeepCompareEffect(() => {
//     if (paths && paths.length) {
//       (async () => {
//         const results = await Promise.all(
//           paths.map(async (item) => {
//             const url: string = await getFileUrls(storage, item.filePath);
//             return url || null;
//           })
//         );
//         const filtered = results.filter((i) => i) as string[];
//         setUrls(filtered);
//       })();
//     }
//   }, [paths, storage]);
//   return urls;
// }
