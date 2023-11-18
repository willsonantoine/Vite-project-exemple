import {Alert} from 'antd';
import React from 'react';

interface AlertProps {
    message: string;
    type: boolean;
}

const AlertMessage: React.FC<AlertProps> = ({message, type}) => {

    return <Alert message={message} type={type ? 'success' : 'error'} showIcon closable={true}
                  style={{marginTop: 10}}/>;
};
export default AlertMessage