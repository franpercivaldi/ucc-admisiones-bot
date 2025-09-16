import { ping } from "@ucc/shared";

export function healthz(): string {
  return ping();
}

// ejemplo de uso (silencioso por ahora)
void healthz();
