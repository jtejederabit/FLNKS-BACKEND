import { Router } from 'express';
import {financialDataStore, IFinancialPosition} from '../database/nedb';

const router: Router = Router();

router.get('/getTotalInvestmentAmount', (req, res) => {
    financialDataStore.find({}).exec(function (err: Error | null, docs: IFinancialPosition[]) {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }

        const totalInvested = docs.reduce((total: number, position: IFinancialPosition) => total + position.cost, 0);

        res.status(200).json(totalInvested);
    });
});

router.get('/getTotalInvestments', (req, res) => {
    financialDataStore.find({}).exec(function (err: Error | null, docs: IFinancialPosition[]) {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json(docs.length);
    });
});

router.get('/getAllInvestments', (req, res) => {
    financialDataStore.find({}).exec(function (err: Error | null, docs: IFinancialPosition[]) {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json(docs);
    });
});

router.get('/getSummary', (req, res) => {
    financialDataStore.find({}).exec(function (err: Error | null, docs: IFinancialPosition[]) {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }

        interface ISummary {
            totalBalance: number;
            distributionByCurrency: Record<string, number>;
            distributionByType: Record<string, number>;
            distributionByEntity: Record<string, number>;
        }


        const summary: ISummary = {
            totalBalance: 0,
            distributionByCurrency: {},
            distributionByType: {},
            distributionByEntity: {}
        };

        docs.forEach((position: IFinancialPosition) => {
            summary.totalBalance += position.balance;

            if (summary.distributionByCurrency[position.currency as keyof typeof summary.distributionByCurrency]) {
                summary.distributionByCurrency[position.currency as keyof typeof summary.distributionByCurrency] += position.balance;
            } else {
                summary.distributionByCurrency[position.currency as keyof typeof summary.distributionByCurrency] = position.balance;
            }

            if (summary.distributionByType[position.type as keyof typeof summary.distributionByType]) {
                summary.distributionByType[position.type as keyof typeof summary.distributionByType] += position.balance;
            } else {
                summary.distributionByType[position.type as keyof typeof summary.distributionByType] = position.balance;
            }

            if (summary.distributionByEntity[position.entity as keyof typeof summary.distributionByEntity]) {
                summary.distributionByEntity[position.entity as keyof typeof summary.distributionByEntity] += position.balance;
            } else {
                summary.distributionByEntity[position.entity as keyof typeof summary.distributionByEntity] = position.balance;
            }
        });

        res.status(200).json(summary);
    });
});
export default router;
