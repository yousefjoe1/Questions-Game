import {makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    qnContainer: {
        margin: '40px 0 0 20px',
        display:'flex',
        flexWrap: 'wrap',
        alignItems:'center',
        "& button": {
            border: 'none',
            backgroundColor: '#218380',
            color:'aliceblue',
            padding:'5px',
            borderRadius:'2px'
        }
    },
    // chooseDiv: {
    //     marginTop: '20px'
    // }
}));