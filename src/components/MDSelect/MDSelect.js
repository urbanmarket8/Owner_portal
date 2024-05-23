// components/MDSelect.jsx
import React from 'react';
import MDTypography from '../MDTypography';

function MDSelect({ label, value, onChange, options, required }) {
    return (
        <div>
            <MDTypography variant="body1" mb={1}>
                {label}
            </MDTypography>
            <select value={value} onChange={onChange} required={required}>
                <option value="" disabled>
                    Select {label.toLowerCase()}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default MDSelect;
