import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { calculateTotalAmountOfInterest, sumInterests } from '../calc/calc';
import { FORMATS } from '../calc/formats';

class Form extends React.Component {
    state = {
        value: '',
        startDate: undefined,
        endDate: undefined,
        interests: [],
        totalInterests: 0,
    };

    handleChange = (name, value) => this.setState({
        [name]: value,
    });

    handleSubmit = evt => {
        evt.preventDefault();

        const {
            value,
            startDate,
            endDate,
        } = this.state;

        const interests = calculateTotalAmountOfInterest(
            moment(startDate),
            moment(endDate),
            parseFloat(value),
        );
        const totalInterests = sumInterests(interests);

        this.setState({
            interests,
            totalInterests,
        });
    }

    render() {
        const {
            value,
            startDate,
            endDate,
            interests,
            totalInterests,
        } = this.state;

        return (
            <div className="Calc">
                <div className="container">
                    <form
                        autoComplete="off"
                        onSubmit={this.handleSubmit}
                        className="Form"
                    >
                        <div className="form-group row">
                            <label
                                htmlFor="value"
                                className="col-sm-2 col-form-label"
                            >
                                kwota zobowiązania
                            </label>
                            <div className="col-sm-10">
                                <input
                                    id="value"
                                    name="value"
                                    value={value}
                                    onChange={({ target: { name, value } }) => this.handleChange(name, value)}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="startDate"
                                className="col-sm-2 col-form-label"
                            >
                                termin zapłaty
                            </label>
                            <div className="col-sm-10">
                                <DatePicker
                                    id="startDate"
                                    selected={startDate}
                                    onChange={value => this.handleChange('startDate', value)}
                                    showMonthDropdown={true}
                                    showYearDropdown={true}
                                    dateFormat={FORMATS.PICKER}
                                    className="form-control"
                                    popperPlacement="top-start"
                                    popperModifiers={{
                                        preventOverflow: {
                                            enabled: true,
                                            escapeWithReference: false,
                                            boundariesElement: 'viewport'
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label 
                                htmlFor="endDate"
                                className="col-sm-2 col-form-label"
                            >
                                uiszczenie zapłaty
                            </label>
                            <div className="col-sm-10">
                                <DatePicker
                                    id="endDate"
                                    selected={endDate}
                                    onChange={value => this.handleChange('endDate', value)}
                                    showMonthDropdown={true}
                                    showYearDropdown={true}
                                    dateFormat={FORMATS.PICKER}
                                    className="form-control"
                                    popperPlacement="top-start"
                                    popperModifiers={{
                                        preventOverflow: {
                                            enabled: true,
                                            escapeWithReference: false,
                                            boundariesElement: 'viewport'
                                        }
                                    }}
                                />
                            </div>
                        </div>
            
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!(value && startDate && endDate && startDate < endDate && endDate < new Date() )}
                        >
                            Oblicz
                        </button>
                    </form>

                    {interests.length > 0 && <div className="Table">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">
                                        od-do
                                    </th>
                                    <th className="text-center">
                                        liczba dni
                                    </th>
                                    <th className="text-center">
                                        stawka
                                    </th>
                                    <th className="text-center">
                                        kwota
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {interests.map(i =>
                                    <tr key={i.end.utc()}>
                                        <td>
                                            {i.start.format(FORMATS.DISPLAY)} - {i.end.format(FORMATS.DISPLAY)}
                                        </td>
                                        <td className="text-right">
                                            {i.days}
                                        </td>
                                        <td className="text-right">
                                            {i.interest}
                                        </td>
                                        <td className="text-right">
                                            {i.amount.toFixed(2)}
                                        </td>
                                    </tr>)}
                            </tbody>

                            <tfoot>
                                <tr>
                                    <th colSpan="3">
                                        Razem do zapłaty:
                                    </th>
                                    <th className="text-right">
                                        {totalInterests.toFixed(2)}
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>}
                </div>
            </div>
        );
    }
}

export {
    Form,
}
