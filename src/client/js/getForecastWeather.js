import moment from 'moment';

export const getForecastWeather = (forecast) => {
    const fragment = document.createDocumentFragment();1

    const columns = forecast.map(day => {
        const column = document.createElement('div');
        const weekDay = moment(day.datetime).format('ddd');
        const date = moment(day.datetime).format('DD');
        const month = moment(day.datetime).format('MMM');
        column.classList.add('forecast__column');
        const columnHTML = `
            <div class="forecast__month">${month}</div>
            <div class="forecast__day">${weekDay}</div>
            <div class="forecast__date">${date}</div>
            <img class="forecast__icon" src="/images/icons/${day.weather.icon}.png" />
            <div class="forecast__temp">${day.temp}&nbsp;℃</div>
        `;
        column.innerHTML = columnHTML;
        fragment.appendChild(column);
    });
    return fragment;
};