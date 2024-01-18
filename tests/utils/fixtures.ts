export const mockFinancialPositions = [
    {
        id: 1,
        accrued_interest: 0,
        number_of_shares: 0,
        balance: 100,
        capital_gain: 0,
        cost: 200,
        currency: 'EUR',
        entity: 'entity',
        expiration_date: 'expiration_date',
        initial_date: 'initial_date',
        interest_rate: 0,
        is_nominal: false,
        isin: 'isin',
        market: 'market',
        name: 'name',
        portfolio_id: 'portfolio_id',
        type: 'type',
        valuation_date: 'valuation_date',
        rate_to_euro: 0,
    },
    {
        id: 2,
        accrued_interest: 0,
        number_of_shares: 0,
        balance: 500,
        capital_gain: 0,
        cost: 100,
        currency: 'EUR',
        entity: 'entity',
        expiration_date: 'expiration_date',
        initial_date: 'initial_date',
        interest_rate: 0,
        is_nominal: false,
        isin: 'isin',
        market: 'market',
        name: 'name',
        portfolio_id: 'portfolio_id',
        type: 'type',
        valuation_date: 'valuation_date',
        rate_to_euro: 0,
    },
];

export const mockFinancialSummary = {
    totalBalance: 600,
    distributionByCurrency: {
        EUR: 600
    },
    distributionByType: {
        type: 600
    },
    distributionByEntity: {
        entity: 600
    }
}