export default function convertParamsArray(value: string | string[]): string[] {
  if (value && typeof value === "string") {
    return [...(value as string).split(",")];
  }

  return value as string[];
}
