import request from 'supertest';
import app from '../../src/app';
import {token} from "../utils/authentication";
import { mockFinancialPositions ,mockFinancialSummary } from "../utils/fixtures";
import { financialDataStore } from '../../src/database/nedb';

jest.mock('../../src/database/nedb', () => ({
    financialDataStore: {
        find: jest.fn()
    }
}));

describe('/getTotalInvestmentAmount', () => {
    it('Should get status = 200 and return summary object', async () => {
        (financialDataStore.find as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockFinancialPositions);
        });

        const response = await request(app)
            .get('/getSummary')
            .set('authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(mockFinancialSummary);
    });
});
