import {
  v4 as uuidv4,
  parse as uuidParse,
  stringify as uuidStringify,
} from "uuid";

export function uuidToBinary(uuid: string): Buffer {
  return Buffer.from(uuidParse(uuid));
}

export function binaryToUuid(buffer: Buffer): string {
  return uuidStringify(buffer);
}

export function generateBinaryUuid(): Buffer {
  return uuidToBinary(uuidv4());
}
