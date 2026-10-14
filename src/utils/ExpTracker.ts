import { makeSerializable } from "./GenericReviver";
import type { TypedKeys } from "../types";

export type ExpSource = TypedKeys<ExpTracker, number>;

export class ExpTracker {
  hacking = 0;
  total = 0;

  record(amt: number, skill: ExpSource): void {
    this[skill] += amt;
  }

  reset(): void {
    this.hacking = 0;
    this.total = 0;
  }

  static includedKeys = makeSerializable("ExpTracker", ExpTracker);
}
