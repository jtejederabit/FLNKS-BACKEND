import request from 'supertest';
import app from '../../src/app';
import {token} from "../utils/authentication";
import { mockFinancialPositions } from "../utils/fixtures";
import { financialDataStore } from '../../src/database/nedb';

jest.mock('../../src/database/nedb', () => ({
    financialDataStore: {
        find: jest.fn()
    }
}));

describe('/getTotalInvestmentAmount', () => {
    it('Should get status = 200 and return investments length', async () => {
        (financialDataStore.find as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockFinancialPositions);
        });

        const response = await request(app)
            .get('/getTotalInvestments')
            .set('authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toBe(2);
    });
});
