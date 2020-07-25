
export enum AccountTypesENUM {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
  CURRENT = 'CURRENT',
  LIABILITY = 'LIABILITY',
  RECEIVABLE = 'RECEIVABLE'
}


const {CURRENT, LIABILITY, RECEIVABLE, ...other} = AccountTypesENUM;

type excludedOptions =
  | typeof AccountTypesENUM.CURRENT
  | typeof AccountTypesENUM.LIABILITY
  | typeof AccountTypesENUM.RECEIVABLE;

export type CategoryTypesENUM = Exclude<AccountTypesENUM, excludedOptions>;


