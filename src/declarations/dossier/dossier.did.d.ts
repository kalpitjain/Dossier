import type { Principal } from '@dfinity/principal';
export interface Log {
  'title' : string,
  'content' : string,
  'date' : string,
  'time' : string,
}
export interface _SERVICE {
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'createLog' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: string,
    ) => Promise<undefined>,
  'deductCreationFee' : () => Promise<string>,
  'deductDeletionFee' : () => Promise<string>,
  'getCreateLogFee' : () => Promise<bigint>,
  'getDeleteLogFee' : () => Promise<bigint>,
  'getSymbol' : () => Promise<string>,
  'payOut' : () => Promise<string>,
  'readLogs' : () => Promise<Array<Log>>,
  'removeLog' : (arg_0: bigint) => Promise<undefined>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
