import React from 'react';
import { Field } from 'formik';

const Options: React.FC = () => {
    return (
        <div>
            <h2>Options</h2>
            <label>Number of days</label>
            <Field name="days" type="range" min="1" max="30" />

            <div role="group" aria-labelledby="price-range">
                <legend id="price-range">Price Range</legend>
                <label>
                    <Field type="radio" name="priceRange" value="$" />
                    $
                </label>
                <label>
                    <Field type="radio" name="priceRange" value="$$" />
                    $$
                </label>
                <label>
                    <Field type="radio" name="priceRange" value="$$$" />
                    $$$
                </label>
            </div>
        </div>
    );
};

export default Options;
