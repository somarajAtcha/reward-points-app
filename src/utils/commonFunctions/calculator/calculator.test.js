import { calculatePoints } from './calculator';

describe("Should calculator the points when lessthan min price", () => {
  test("when price lessthan min price", async () => {
    const rewardPoints = calculatePoints(45);
    expect(rewardPoints).toBe(0);
  })
  test("when price lessthan max price", async () => {
    const rewardPoints = calculatePoints(80);
    expect(rewardPoints).toBe(30);
  })
  test("when price greaterthan max price", async () => {
    const rewardPoints = calculatePoints(180);
    expect(rewardPoints).toBe(210);
  })
  test("when price is decimal with lessthan max price and price below 0.5", async () => {
    const rewardPoints = calculatePoints(80.30);
    expect(rewardPoints).toBe(30);
  })
  test("when price is decimal with lessthan max price and price above 0.5", async () => {
    const rewardPoints = calculatePoints(80.80);
    expect(rewardPoints).toBe(31);
  })
  test("when price is decimal with lessthan min price", async () => {
    const rewardPoints = calculatePoints(40.80);
    expect(rewardPoints).toBe(0);
  })
  test("when price is decimal with greaterthan max and price below 0.5", async () => {
    const rewardPoints = calculatePoints(140.20);
    expect(rewardPoints).toBe(130);
  })
  test("when price is decimal with greaterthan max price and  price above 0.5", async () => {
    const rewardPoints = calculatePoints(140.90);
    expect(rewardPoints).toBe(132);
  })

  test("when price is larger amount", async () => {
    const rewardPoints = calculatePoints(100000);
    expect(rewardPoints).toBe(199850);
  })

  test("when price is negative amount", async () => {
    const rewardPoints = calculatePoints(-100);
    expect(rewardPoints).toBe(0);
  })
});
