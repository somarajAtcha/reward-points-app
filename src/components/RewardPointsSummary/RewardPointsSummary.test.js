import { render, screen } from '@testing-library/react';
import RewardPointsSummary from './RewardPointsSummary';
import * as apiService from '../../services/apiService';
import { act } from 'react';
jest.useFakeTimers();

const mockData = {
    data: [
        {
            "customerId": 1,
            "customerName": "John Doe",
            "transactions": [
                {
                    "transactionId": 101,
                    "amount": 150,
                    "transactionDate": "2024-07-10",
                    "product": "Watch"
                },
                {
                    "transactionId": 102,
                    "amount": 230.20,
                    "transactionDate": "2024-07-04",
                    "product": "Stationery"
                },
                {
                    "transactionId": 103,
                    "amount": 120,
                    "transactionDate": "2024-06-10",
                    "product": "Toys"
                },
                {
                    "transactionId": 104,
                    "amount": 350.40,
                    "transactionDate": "2024-06-01",
                    "product": "Toys"
                },
                {
                    "transactionId": 105,
                    "amount": 90,
                    "transactionDate": "2024-05-05",
                    "product": "Stationery"
                },
                {
                    "transactionId": 106,
                    "amount": 50,
                    "transactionDate": "2023-12-05",
                    "product": "Stationery"
                }
            ]
        }]
}

describe("Should render rewards component -- loading state", () => {
    test("Should render component", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        const heading = screen.getByText("Customers Reward Points Summary");
        expect(heading).toBeInTheDocument();
        expect(screen.getAllByTestId('spinner')).toBeTruthy();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.queryByText("reward-container")).toBeNull();
    })

});

describe("Should render rewards component --- error state", () => {
    beforeEach(() => {
        jest.spyOn(apiService, 'fetchRewardPointsDataApi').mockResolvedValue([]);
    });

    test("Should render component", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.getAllByTestId('error')).toBeTruthy();
        expect(screen.queryByText("reward-container")).toBeNull();
    })

});

describe("Should render rewards component --- with success data", () => {
    beforeEach(() => {
        const fetchRewardPointsDataApiMock = jest.spyOn(apiService, 'fetchRewardPointsDataApi');
        const mockFetch = Promise.resolve({ json: () => Promise.resolve(mockData) });
        fetchRewardPointsDataApiMock.mockImplementation(() => mockFetch);

    });

    test("Should render component", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        act(() => {
            jest.runAllTimers();
        });
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.getAllByTestId("reward-container")).toBeTruthy();
        expect(screen.getAllByRole("table").length).toBe(3);
        // header and body rows for customer monthly table
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr').length).toBe(5);
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[0].querySelectorAll('th').length).toBe(5);
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td').length).toBe(5);
        //verify text content
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[2]).toHaveTextContent('July');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('2024');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[4]).toHaveTextContent('460');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[2].querySelectorAll('td')[2]).toHaveTextContent('June');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[2].querySelectorAll('td')[3]).toHaveTextContent('2024');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[2].querySelectorAll('td')[4]).toHaveTextContent('641');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[3].querySelectorAll('td')[2]).toHaveTextContent('May');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[3].querySelectorAll('td')[3]).toHaveTextContent('2024');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[3].querySelectorAll('td')[4]).toHaveTextContent('40');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[4].querySelectorAll('td')[2]).toHaveTextContent('December');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[4].querySelectorAll('td')[3]).toHaveTextContent('2023');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[4].querySelectorAll('td')[4]).toHaveTextContent('0');

        // header and body rows for single customer total rewards table
        expect(screen.getAllByRole("table")[1].querySelectorAll('tr').length).toBe(2);
        expect(screen.getAllByRole("table")[1].querySelectorAll('tr')[0].querySelectorAll('th').length).toBe(2);
        expect(screen.getAllByRole("table")[1].querySelectorAll('tr')[1].querySelectorAll('td').length).toBe(2);
        //verify text content
        expect(screen.getAllByRole("table")[1].querySelectorAll('tr')[1].querySelectorAll('td')[0]).toHaveTextContent('John Doe');
        expect(screen.getAllByRole("table")[1].querySelectorAll('tr')[1].querySelectorAll('td')[1]).toHaveTextContent('1141');

        // header and body rows for single customer monthly table
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr').length).toBe(7);
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[0].querySelectorAll('th').length).toBe(6);
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[1].querySelectorAll('td').length).toBe(6);

        //verify text content
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[1].querySelectorAll('td')[1]).toHaveTextContent('John Doe');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('Watch');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[1].querySelectorAll('td')[4]).toHaveTextContent('$150');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[1].querySelectorAll('td')[5]).toHaveTextContent('150');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[2].querySelectorAll('td')[3]).toHaveTextContent('Stationery');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[2].querySelectorAll('td')[4]).toHaveTextContent('$230.2');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[2].querySelectorAll('td')[5]).toHaveTextContent('310');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[3].querySelectorAll('td')[3]).toHaveTextContent('Toys');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[3].querySelectorAll('td')[4]).toHaveTextContent('$120');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[3].querySelectorAll('td')[5]).toHaveTextContent('90');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[4].querySelectorAll('td')[3]).toHaveTextContent('Toys');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[4].querySelectorAll('td')[4]).toHaveTextContent('$350');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[4].querySelectorAll('td')[5]).toHaveTextContent('551');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[5].querySelectorAll('td')[3]).toHaveTextContent('Stationery');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[5].querySelectorAll('td')[4]).toHaveTextContent('$90');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[5].querySelectorAll('td')[5]).toHaveTextContent('40');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[6].querySelectorAll('td')[3]).toHaveTextContent('Stationery');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[6].querySelectorAll('td')[4]).toHaveTextContent('$50');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[6].querySelectorAll('td')[5]).toHaveTextContent('0');

    })

});