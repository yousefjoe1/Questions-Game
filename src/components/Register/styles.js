import {makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    form: {
        position:"relative",
        maxWidth: '400px',
        padding: '10px',
        margin:'60px auto',
        display:'flex',
        flexDirection:'column',
        boxShadow: '1px 2px 5px black',
        "& input":{
            margin:'5px',
            padding: '5px'
        },
        "& button":{
            border:'none'
        },
        "& button:hover":{
            background:'lightgray'
        }
    },
    error_msg:{
        position:'absolute',
        top:'2px',
        left:'2px',
        background:'brown',
        color: 'white',
        borderRadius: '5px'
    }
}));