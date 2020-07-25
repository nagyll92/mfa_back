import { SplitTypeENUM } from 'shared/enums/SplitTypeENUM';

export class ISplit {
    id?: number;
    transactionId?: any;
    account: any;
    amount: number;
    type: SplitTypeENUM;
}
