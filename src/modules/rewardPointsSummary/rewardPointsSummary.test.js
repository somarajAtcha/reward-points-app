import { render, screen } from '@testing-library/react';
import RewardPointsSummary from './rewardPointsSummary';
import * as apiService from '../../services/apiService';
import { act } from 'react';

const mockData = {
    data: [
        {
            "customerId": 1,
            "customerName": "John Doe",
            "transactionId": 101,
            "amount": 150,
            "transactionDate": "2024-07-10",
            "product": "Watch"
        },
        {
            "customerId": 1,
            "customerName": "John Doe",
            "transactionId": 102,
            "amount": 230.20,
            "transactionDate": "2024-07-04",
            "product": "Stationery"
        },
        {
            "customerId": 1,
            "customerName": "John Doe",
            "transactionId": 103,
            "amount": 120,
            "transactionDate": "2024-06-10",
            "product": "Toys"
        },
        {
            "customerId": 1,
            "customerName": "John Doe",
            "transactionId": 104,
            "amount": 350.40,
            "transactionDate": "2024-06-01",
            "product": "Toys"
        },
        {
            "customerId": 1,
            "customerName": "John Doe",
            "transactionId": 105,
            "amount": 90,
            "transactionDate": "2024-05-05",
            "product": "Stationery"
        },
        {
            "customerId": 1,
            "customerName": "John Doe",
            "transactionId": 106,
            "amount": 50,
            "transactionDate": "2023-12-05",
            "product": "Stationery"
        }]
}

describe("Should render rewards component -- loading state", () => {
    beforeEach(() => {
        jest.spyOn(apiService, 'fetchRewardPointsDataApi').mockRejectedValue({});
    });

    it("Should render component", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        const heading = screen.getByText("Customers Reward Points Summary");
        expect(heading).toBeInTheDocument();
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.getAllByTestId('error')).toBeTruthy();
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
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.getAllByTestId("reward-container")).toBeTruthy();
        expect(screen.getAllByRole("table").length > 0).toBe(true);

        //   // header and body rows for single customer total rewards table
        //   expect(screen.getAllByRole("table")[4].querySelectorAll('tr').length > 0).toBe(true);
        //   expect(screen.getAllByRole("table")[4].querySelectorAll('tr')[0].querySelectorAll('th').length).toBe(5);
        //   expect(screen.getAllByRole("table")[4].querySelectorAll('tr')[1].querySelectorAll('td').length).toBe(5);
        //   //verify text content
        //   expect(screen.getAllByRole("table")[4].querySelectorAll('tr')[1].querySelectorAll('td')[1]).toHaveTextContent('John Doe');
        //   expect(screen.getAllByRole("table")[4].querySelectorAll('tr')[1].querySelectorAll('td')[2]).toHaveTextContent('1141');
  
        // header and body rows for single customer total rewards table
        expect(screen.getAllByRole("table")[5].querySelectorAll('tr').length).toBe(2);
        expect(screen.getAllByRole("table")[5].querySelectorAll('tr')[0].querySelectorAll('th').length).toBe(3);
        expect(screen.getAllByRole("table")[5].querySelectorAll('tr')[1].querySelectorAll('td').length).toBe(3);
        //verify text content
        expect(screen.getAllByRole("table")[5].querySelectorAll('tr')[1].querySelectorAll('td')[1]).toHaveTextContent('John Doe');
        expect(screen.getAllByRole("table")[5].querySelectorAll('tr')[1].querySelectorAll('td')[2]).toHaveTextContent('1141');

        // header and body rows for single customer monthly table
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr').length).toBe(7);
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[0].querySelectorAll('th').length).toBe(6);
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[1].querySelectorAll('td').length).toBe(6);

        //verify text content
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[1].querySelectorAll('td')[1]).toHaveTextContent('John Doe');

        // price is > 100 , so rewards points are (150-100)*2  + 50 * 1 = 150 
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('Watch');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[1].querySelectorAll('td')[4]).toHaveTextContent('$150');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[1].querySelectorAll('td')[5]).toHaveTextContent('150');

        // the decimal points calculation here,-.20 prcie is not calucalted, becoz its(.2*2 ) lessthan -.5
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[2].querySelectorAll('td')[3]).toHaveTextContent('Stationery');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[2].querySelectorAll('td')[4]).toHaveTextContent('$230.2');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[2].querySelectorAll('td')[5]).toHaveTextContent('310');

        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[3].querySelectorAll('td')[3]).toHaveTextContent('Toys');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[3].querySelectorAll('td')[4]).toHaveTextContent('$120');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[3].querySelectorAll('td')[5]).toHaveTextContent('90');

        //the decimal points here,-.40 prcie is calucalted, becoz its (.4*2) > -.5
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[4].querySelectorAll('td')[3]).toHaveTextContent('Toys');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[4].querySelectorAll('td')[4]).toHaveTextContent('$350.4');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[4].querySelectorAll('td')[5]).toHaveTextContent('551');

        //the price is < 100 , rewards points are (90-50) * 1, so 40 points
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[5].querySelectorAll('td')[3]).toHaveTextContent('Stationery');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[5].querySelectorAll('td')[4]).toHaveTextContent('$90');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[5].querySelectorAll('td')[5]).toHaveTextContent('40');

        //the price is < 50 , rewards points are 0
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[6].querySelectorAll('td')[3]).toHaveTextContent('Stationery');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[6].querySelectorAll('td')[4]).toHaveTextContent('$50');
        expect(screen.getAllByRole("table")[6].querySelectorAll('tr')[6].querySelectorAll('td')[5]).toHaveTextContent('0');

    })

    test("Should render component with last 3 months rewards", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.getAllByTestId("reward-container")).toBeTruthy();
        expect(screen.getAllByRole("table").length > 0).toBeTruthy();
        // header and body rows for customer monthly table
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr').length).toBe(3);
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[0].querySelectorAll('th').length > 0).toBeTruthy();
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td').length > 0).toBeTruthy();

        // for verifying last 3 months points and total
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[1]).toHaveTextContent('John Doe');

        //month 1
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('$150');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[6]).toHaveTextContent('150');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[2].querySelectorAll('td')[3]).toHaveTextContent('$230.2');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[2].querySelectorAll('td')[6]).toHaveTextContent('310');

        //month 2
        expect(screen.getAllByRole("table")[1].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('$120');
        expect(screen.getAllByRole("table")[1].querySelectorAll('tr')[1].querySelectorAll('td')[6]).toHaveTextContent('90');
        expect(screen.getAllByRole("table")[1].querySelectorAll('tr')[2].querySelectorAll('td')[3]).toHaveTextContent('$350.4');
        expect(screen.getAllByRole("table")[1].querySelectorAll('tr')[2].querySelectorAll('td')[6]).toHaveTextContent('551');

        //month 3
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('$90');
        expect(screen.getAllByRole("table")[2].querySelectorAll('tr')[1].querySelectorAll('td')[6]).toHaveTextContent('40');

        //total points and should match the total 
        expect(screen.getAllByRole("table")[3].querySelectorAll('tr')[1].querySelectorAll('td')[2]).toHaveTextContent('1141');

        const total = Number(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[6].innerHTML) +
            Number(screen.getAllByRole("table")[0].querySelectorAll('tr')[2].querySelectorAll('td')[6].innerHTML) +
            Number(screen.getAllByRole("table")[1].querySelectorAll('tr')[1].querySelectorAll('td')[6].innerHTML) +
            Number(screen.getAllByRole("table")[1].querySelectorAll('tr')[2].querySelectorAll('td')[6].innerHTML) +
            Number(screen.getAllByRole("table")[2].querySelectorAll('tr')[1].querySelectorAll('td')[6].innerHTML)
        expect(Number(screen.getAllByRole("table")[3].querySelectorAll('tr')[1].querySelectorAll('td')[2].innerHTML)).toBe(total);
    });
});

describe("Should render rewards component --- with no data", () => {
    beforeEach(() => {
        const fetchRewardPointsDataApiMock = jest.spyOn(apiService, 'fetchRewardPointsDataApi');
        const mockFetch = Promise.resolve({ json: () => Promise.resolve({ data: [] }) });
        fetchRewardPointsDataApiMock.mockImplementation(() => mockFetch);
    });
    test("Should render component", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.getAllByTestId("reward-container")).toBeTruthy();
        expect(screen.getAllByRole("table").length > 0).toBeTruthy();
    });
});

describe("Should handle negative amount", () => {
    const negativeAmountMockData = {
        data: [
            {
                "customerId": 1,
                "customerName": "John Doe",
                "transactionId": 101,
                "amount": -102,
                "transactionDate": "2024-07-10",
                "product": "Watch"

            }]
    }
    beforeEach(() => {
        const fetchRewardPointsDataApiMock = jest.spyOn(apiService, 'fetchRewardPointsDataApi');
        const mockFetch = Promise.resolve({ json: () => Promise.resolve(negativeAmountMockData) });
        fetchRewardPointsDataApiMock.mockImplementation(() => mockFetch);
    });
    test("Should handle negative amount", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.getAllByTestId("reward-container")).toBeTruthy();
        expect(screen.getAllByRole("table").length > 0).toBeTruthy();

        //month 1
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('$-102');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[6]).toHaveTextContent('0');
    });
});

describe("Should handle larger amount 1,00,000", () => {
    const largerAmountMockData = {
        data: [
            {
                "customerId": 1,
                "customerName": "John Doe",
                "transactionId": 101,
                "amount": 100000,
                "transactionDate": "2024-07-10",
                "product": "Watch"

            }]
    }
    beforeEach(() => {
        const fetchRewardPointsDataApiMock = jest.spyOn(apiService, 'fetchRewardPointsDataApi');
        const mockFetch = Promise.resolve({ json: () => Promise.resolve(largerAmountMockData) });
        fetchRewardPointsDataApiMock.mockImplementation(() => mockFetch);
    });
    test("Should handle larger amount 1,00,000", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.getAllByTestId("reward-container")).toBeTruthy();
        expect(screen.getAllByRole("table").length > 0).toBeTruthy();

        //month 1
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('$100000');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[6]).toHaveTextContent('199850');
    });
});

describe("Should handle decimal amount", () => {
    const decimalAmountMockData = {
        data: [
            {
                "customerId": 1,
                "customerName": "John Doe",
                "transactionId": 101,
                "amount": 90.2,
                "transactionDate": "2024-07-10",
                "product": "Watch"
            },
        ]
    }
    beforeEach(() => {
        const fetchRewardPointsDataApiMock = jest.spyOn(apiService, 'fetchRewardPointsDataApi');
        const mockFetch = Promise.resolve({ json: () => Promise.resolve(decimalAmountMockData) });
        fetchRewardPointsDataApiMock.mockImplementation(() => mockFetch);
    });
    test("Should handle decimal amount", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.getAllByTestId("reward-container")).toBeTruthy();
        expect(screen.getAllByRole("table").length> 0).toBeTruthy();

        //month 1
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('$90.2');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[6]).toHaveTextContent('40');
    });
});

describe("Should calculate reward points amount over $100", () => {
    const decimalAmountMockData = {
        data: [
            {
                "customerId": 1,
                "customerName": "John Doe",
                "transactionId": 101,
                "amount": 150,
                "transactionDate": "2024-07-10",
                "product": "Watch"

            }]
    }
    beforeEach(() => {
        const fetchRewardPointsDataApiMock = jest.spyOn(apiService, 'fetchRewardPointsDataApi');
        const mockFetch = Promise.resolve({ json: () => Promise.resolve(decimalAmountMockData) });
        fetchRewardPointsDataApiMock.mockImplementation(() => mockFetch);
    });
    test("Should calculate reward points amount over $100", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.getAllByTestId("reward-container")).toBeTruthy();
        expect(screen.getAllByRole("table").length > 0).toBeTruthy();

        //month 1
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('$150');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[6]).toHaveTextContent('150');
    });
});

describe("Should calculate reward points amount between $50 and $100", () => {
    const decimalAmountMockData = {
        data: [
            {
                "customerName": "John Doe",
                "transactionId": 101,
                "amount": 80,
                "transactionDate": "2024-07-10",
                "product": "Watch"
            },
        ]
    }
    beforeEach(() => {
        const fetchRewardPointsDataApiMock = jest.spyOn(apiService, 'fetchRewardPointsDataApi');
        const mockFetch = Promise.resolve({ json: () => Promise.resolve(decimalAmountMockData) });
        fetchRewardPointsDataApiMock.mockImplementation(() => mockFetch);
    });
    test("hould calculate reward points amount between $50 and $100", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.getAllByTestId("reward-container")).toBeTruthy();
        expect(screen.getAllByRole("table").length > 0).toBeTruthy();

        //month 1
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('$80');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[6]).toHaveTextContent('30');
    });
});

describe("Should calculate reward points for $50", () => {
    const decimalAmountMockData = {
        data: [
            {
                "customerId": 1,
                "customerName": "John Doe",
                "transactionId": 101,
                "amount": 50,
                "transactionDate": "2024-07-10",
                "product": "Watch"
            }]
    }
    beforeEach(() => {
        const fetchRewardPointsDataApiMock = jest.spyOn(apiService, 'fetchRewardPointsDataApi');
        const mockFetch = Promise.resolve({ json: () => Promise.resolve(decimalAmountMockData) });
        fetchRewardPointsDataApiMock.mockImplementation(() => mockFetch);
    });
    test("Should calculate reward points for $50", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.getAllByTestId("reward-container")).toBeTruthy();
        expect(screen.getAllByRole("table").length > 0).toBeTruthy();

        //month 1
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('$50');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[6]).toHaveTextContent('0');
    });
});

describe("Should calculate reward points less than $50", () => {
    const decimalAmountMockData = {
        data: [{
            "customerId": 1,
            "customerName": "John Doe",
            "transactionId": 101,
            "amount": 30,
            "transactionDate": "2024-07-10",
            "product": "Watch"
        }]
    }
    beforeEach(() => {
        const fetchRewardPointsDataApiMock = jest.spyOn(apiService, 'fetchRewardPointsDataApi');
        const mockFetch = Promise.resolve({ json: () => Promise.resolve(decimalAmountMockData) });
        fetchRewardPointsDataApiMock.mockImplementation(() => mockFetch);
    });
    test("Should calculate reward points less than $50", async () => {
        await act(async () => {
            render(<RewardPointsSummary />)
        })
        expect(screen.queryByText('spinner')).toBeNull();
        expect(screen.queryByText('error')).toBeNull();
        expect(screen.getAllByTestId("reward-container")).toBeTruthy();
        expect(screen.getAllByRole("table").length > 0).toBeTruthy();
        //month 1
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[3]).toHaveTextContent('$30');
        expect(screen.getAllByRole("table")[0].querySelectorAll('tr')[1].querySelectorAll('td')[6]).toHaveTextContent('0');
    });
});