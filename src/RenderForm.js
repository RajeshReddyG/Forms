import React from 'react';

class RendrForm extends React.Component {
    render() {
        let fields = this.props.formData
        return (
            <div>
                {console.log(fields)}
                {
                    fields.map((val, idx) => {
                        let fieldID = `field-${idx}`
                        return (
                            <div key={idx} >
                                {(fields[idx].fieldType === "button") ? <br /> : <label htmlFor={fieldID}>{`${fields[idx].fieldlabel}: `}</label>}
                                &emsp;
                                <input
                                    type={fields[idx].fieldType}
                                    name={fieldID}
                                    data-id={idx}
                                    id={fieldID}
                                    value={fields[idx].fieldvalue}
                                    className="form-control"
                                // disabled
                                />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default RendrForm;