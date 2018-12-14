import moment from 'moment';
import { periods } from './periods';

function filterPeriods(startDate, endDate) {
    return periods
        .filter(period => period.start.unix() <= startDate.unix() && period.end.unix() >= startDate.unix()
            || period.start.unix() >= startDate.unix() && period.end.unix() <= endDate.unix()
            || period.start.unix() <= endDate.unix() && period.end.unix() >= endDate.unix());
}

function calculateAmountOfInterest(period, amount) {
    return {
        ...period,
        amount: period.days * period.interest * amount / 365,
    }
}

export function calculateTotalAmountOfInterest(startDate, endDate, amount) {
    const filteredPeriods = filterPeriods(startDate, endDate);

    if (filteredPeriods.length > 1) {
        filteredPeriods[0].start = startDate;
        filteredPeriods[0].days = Math.ceil(
            moment.duration(filteredPeriods[0].end.diff(startDate)).asDays()
        );

        const last = filteredPeriods.length - 1;

        filteredPeriods[last].end = endDate;
        filteredPeriods[last].days = Math.ceil(
            moment.duration(endDate.diff(filteredPeriods[last].start)).asDays()
        );
    } else if (filteredPeriods.length === 1) {
        filteredPeriods[0].start = startDate;
        filteredPeriods[0].end = endDate;
        filteredPeriods[0].days = Math.ceil(
            moment.duration(endDate.diff(startDate)).asDays()
        );
    }

    return filteredPeriods.map(period => calculateAmountOfInterest(period, amount));
}

export function sumInterests(interests = []) {
    return interests.reduce(
        (prev, { amount }) => prev += amount,
        0,
    );
}
