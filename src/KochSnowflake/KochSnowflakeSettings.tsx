import './KochSnowflakeSettings.css';

import React from 'react';
import {
    Field,
    InjectedFormProps,
    reduxForm,
} from 'redux-form';

class KochSnowflakeSettings extends React.Component<InjectedFormProps> {

    render() {
        return (
            <>
                <form onSubmit={this.props.handleSubmit}>
                    <div className='settings'>
                        <label htmlFor="stepCount">Schritte</label>
                        <Field className='settings__input' name="stepCount" component="input" type="text" />

                        <label htmlFor="elementaryRuleString">Regel</label>
                        <Field className='settings__input' name="elementaryRuleString" component="input" type="text" />

                        <button type="submit">Submit</button>
                    </div>
                </form>
            </>
        );
    }
}

export default reduxForm({
    form: 'kochSettings',
})(KochSnowflakeSettings);
