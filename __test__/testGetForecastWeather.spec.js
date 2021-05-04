import { getForecastWeather } from '../src/client/js/getForecastWeather';

test("Testing the getForecastWeather() function", () => {
    expect(getForecastWeather).toBeDefined();
});