import { Expose } from 'class-transformer';
import { SplitTypeENUM } from 'shared/enums/SplitTypeENUM';

export class Split {

    @Expose()
    account: string;

    @Expose()
    type: SplitTypeENUM;

    @Expose()
    amount: number;

    @Expose()
    memo: string;

    @Expose()
    accountType: string;
}
