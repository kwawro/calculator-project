import moment from 'moment';
import { FORMATS } from './formats';

let periods = [
    {
        start: moment('1997-01-01', FORMATS.DISPLAY),
        end: moment('1998-04-14', FORMATS.DISPLAY),
        interest: .35,
    },
    {
        start: moment('1998-04-15', FORMATS.DISPLAY),
        end: moment('1999-01-31', FORMATS.DISPLAY),
        interest: .33,
    },
    {
        start: moment('1999-02-01', FORMATS.DISPLAY),
        end: moment('1999-05-14', FORMATS.DISPLAY),
        interest: .24,
    },
    {
        start: moment('1999-05-15', FORMATS.DISPLAY),
        end: moment('2000-10-31', FORMATS.DISPLAY),
        interest: .21,
    },
    {
        start: moment('2000-11-01', FORMATS.DISPLAY),
        end: moment('2001-12-14', FORMATS.DISPLAY),
        interest: .3,
    },
    {
        start: moment('2001-12-15', FORMATS.DISPLAY),
        end: moment('2002-07-24', FORMATS.DISPLAY),
        interest: .2,
    },
    {
        start: moment('2002-07-25', FORMATS.DISPLAY),
        end: moment('2003-01-31', FORMATS.DISPLAY),
        interest: .16,
    },
    {
        start: moment('2003-02-01', FORMATS.DISPLAY),
        end: moment('2003-09-24', FORMATS.DISPLAY),
        interest: .13,
    },
    {
        start: moment('2003-09-25', FORMATS.DISPLAY),
        end: moment('2005-01-09', FORMATS.DISPLAY),
        interest: .1225,
    },
    {
        start: moment('2005-01-10', FORMATS.DISPLAY),
        end: moment('2005-10-14', FORMATS.DISPLAY),
        interest: .135,
    },
    {
        start: moment('2005-10-15', FORMATS.DISPLAY),
        end: moment('2008-12-14', FORMATS.DISPLAY),
        interest: .115,
    },
    {
        start: moment('2008-12-15', FORMATS.DISPLAY),
        end: moment('2014-12-22', FORMATS.DISPLAY),
        interest: .13,
    },
    {
        start: moment('2014-12-23', FORMATS.DISPLAY),
        end: moment('2015-12-31', FORMATS.DISPLAY),
        interest: .08,
    },
    {
        start: moment('2016-01-01', FORMATS.DISPLAY),
        end: moment(),
        interest: .07,
    },
];

periods = periods.map(period => ({
    ...period,
    days: Math.ceil(
        moment.duration(period.end.diff(period.start)).asDays(),
    )
}));

export {
    periods,
};
