import extName from "ext-name";

/**
 * @param name file name to be analyzed
 * @returns [{ext: 'extension name', mime: 'mime type'}]
 */
export default function extensionName(
  name: string
): { ext: string; mime: string }[] {
  return extName(name);
}

/**
 * Split a mime type on / to pull the first part
 * @param extension extension array from extensionName
 * @returns first part of mime type
 */
export const typeFromExtension = (
  extension: { mime: string }[]
): string | 0 => {
  return (
    extension.length && extension[0].mime && extension[0].mime.split("/")[0]
  );
};

/**
 * Pass in a file name with . extension and return the extension type
 * @param name - file name with . extension
 * @returns first part of mime type
 */
export const typeFromName = (name: string): string | 0 =>
  typeFromExtension(extensionName(name));
