import Datastore from 'nedb';
import path from 'path';
interface IUser {
    id: number;
    username: string;
    password: string;
    email: string;
}

interface IFinancialPosition {
    id: number;
    accrued_interest: number;
    number_of_shares: number;
    balance: number;
    capital_gain: number;
    cost: number;
    currency: string;
    entity: string;
    expiration_date: string;
    initial_date: string;
    interest_rate: number;
    is_nominal: boolean;
    isin: string;
    market: string;
    name: string;
    portfolio_id: string;
    type: string;
    valuation_date: string;
    rate_to_euro: number;
}

const usersDataStore = new Datastore({
    filename: path.join(__dirname, './users.db'),
    autoload: true
});
const financialDataStore = new Datastore({
    filename: path.join(__dirname, './financial.db'),
    autoload: true
});

export { usersDataStore, financialDataStore, IUser, IFinancialPosition };
