import { Router } from 'express';
import { financialDataStore, IFinancialPosition } from '../src/database/nedb';
import authenticateToken from '../src/utils/middlewares';
import request, { Response } from 'supertest';

// jest.mock('./financialDataStore');
financialDataStore.find = jest.fn();
describe('/getTotalInvestmentAmount', () => {
  let router: Router;

  beforeEach(() => {
    (financialDataStore.find as jest.Mock).mockClear();
    // @ts-ignore
    router = new Router();

    router.use(authenticateToken);

    router.get('/getTotalInvestmentAmount', (req: any, res: any) => {
      financialDataStore.find({}).exec((err: Error | null, docs: IFinancialPosition[]) => {
        if (err) {
          return res.status(500).json({ message: 'Internal server error' });
        }

        const totalInvested = docs.reduce((total: number, position: IFinancialPosition) => total + position.cost, 0);

        res.status(200).json(totalInvested);
      });
    });
  });

  it('should return total investment amount', async () => {
    // Mock financial data
    (financialDataStore.find as jest.Mock).mockReturnValue({
      then: jest.fn(() => Promise.resolve([
        { id: 1, cost: 100 },
        { id: 2, cost: 200 },
        { id: 3, cost: 300 },
      ])),
    });

    // Send GET request to /getTotalInvestmentAmount endpoint
    // @ts-ignore
    const response = await request(router)
        .get('/getTotalInvestmentAmount');

    // Verify status code and response body
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(600);
  });

  it('should return 401 Unauthorized if unauthorized', async () => {
    // Don't set authorization header
    // @ts-ignore
    const response = await request(router)
        .get('/getTotalInvestmentAmount');

    // Verify status code
    expect(response.statusCode).toBe(401);
  });

  it('should return 403 Forbidden if invalid token', async () => {
    // Set invalid token in authorization header
    const invalidToken = 'invalid-token';
    // @ts-ignore
    const response = await request(router)
        .set('Authorization', invalidToken)
        .get('/getTotalInvestmentAmount');

    // Verify status code
    expect(response.statusCode).toBe(403);
  });
});
