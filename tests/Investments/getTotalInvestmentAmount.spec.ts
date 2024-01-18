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
    it('Should get 200 status and return calculated data', async () => {
        (financialDataStore.find as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockFinancialPositions);
        });

        const response = await request(app)
            .get('/getTotalInvestmentAmount')
            .set('authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(300);
    });
});
