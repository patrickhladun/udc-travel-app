import { getForecastWeather } from '../src/client/js/getForecastWeather';
import '@testing-library/jest-dom';

test("Testing the getForecastWeather() function", () => {
    expect(getForecastWeather).toBeDefined();
});

test("Testing the getForecastWeather() function", () => {
    const data = [
        {
            datetime: '2021-05-01',
            temp: 16,
            weather: {
                icon: 'c04d'
            }
        }
    ]
    const result = `
    <div class="forecast">
        <div class="forecast__column">
            <div class="forecast__month">May</div>
            <div class="forecast__day">Sat</div>
            <div class="forecast__date">01</div>
            <img class="forecast__icon" src="/images/icons/c04d.png" />
            <div class="forecast__temp">16&nbsp;℃</div>
        </div>
    </div>
    `;

    let output = document.createElement('div');
    output.classList.add('forecast');
    output.appendChild(getForecastWeather(data));
    output = output.outerHTML;

    expect(output).toBeTruthy();
    expect(output).not.toBeNull();
    expect(output).not.toBeUndefined();
    expect(output).toContain('<div class="forecast__month">May</div>');
    expect(output).toContain('<div class="forecast__day">Sat</div>');
});