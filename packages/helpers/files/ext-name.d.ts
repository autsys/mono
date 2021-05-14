declare module "ext-name" {
  export default function extName(
    name: string
  ): { ext: string; mime: string }[];
}
