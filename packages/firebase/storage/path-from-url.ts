import { parseURL } from 'whatwg-url';
/**
 * Parse a url to a file in firebase storage to return its path and name
 * @example
 * pathFromUrl('https://https://firebasestorage.googleapis.com/0/b/justice-staging.appspot.com/o/aoeu%2Fdownload%20(1).csv')
 * //returns /aoeu/download (1)
 */
export function pathFromUrl(
  url: string,
  opts: { readonly trailingSlash: boolean }
): {
  readonly folderPath: string | undefined;
  readonly fullPath: string | undefined;
  readonly name: string | undefined;
} {
  const record = parseURL(url);
  const pathname = record?.path; // const decoded = decodeURIComponent(pathname);

  // const split = decoded && decoded.split('/'); //"", "v0", "b", "...appspot.com", "o", ...path items
  const split = pathname;
  const path = split && split.slice(5);
  const fullPath = path && path.join('/');
  const name = path && path[path.length - 1];
  const folderPath =
    path && path.join('/') + (opts && opts.trailingSlash === false ? '' : '/'); //add trailing slash
  return { folderPath, fullPath, name };
}

export default pathFromUrl;
