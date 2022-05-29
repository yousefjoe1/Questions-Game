import {makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    form: {
        position:'relative',
        maxWidth: '400px',
        padding: '10px',
        margin:'40px auto',
        display:'flex',
        flexDirection:'column',
        "& input":{
            margin:'5px',
            padding:"5px"
        },
        "& button":{
            margin:'5px',
            padding:"5px",
            border: 'none',

        },
        boxShadow: '1px 2px 5px black'
    },
    errorMsg: {
        position:'absolute',
        top:'2px',
        left:'2px',
        background:'brown',
        color: 'white',
        borderRadius: '5px',
    }
}));