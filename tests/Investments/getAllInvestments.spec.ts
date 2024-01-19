import request from 'supertest';
import server from '../../server';
import {token} from "../utils/authentication";
import { mockFinancialPositions } from "../utils/fixtures";
import { financialDataStore } from '../../src/database/nedb';

jest.mock('../../src/database/nedb', () => ({
    financialDataStore: {
        find: jest.fn()
    }
}));

describe('/getAllInvestments', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    afterAll((done) => {
        server.close(done);
    })

    it('Should get status = 200 and return investments list', async () => {
        (financialDataStore.find as jest.Mock).mockImplementation((query, callback) => {
            callback(null, mockFinancialPositions);
        });

        const response = await request(server)
            .get('/getAllInvestments')
            .set('authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });
});
