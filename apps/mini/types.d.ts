import { config } from "@myapp/config";

export type Conf = typeof config;

declare module "@myapp/ui" {
  interface TamaguiCustomConfig extends Conf {}
}
