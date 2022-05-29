import {makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    questionContainer: {
        margin:'20px auto',
        maxWidth:'700px',
        borderRadius: '3px',
        padding: '5px',
        boxShadow: '2px 2px 10px lightgray',
        minHeight: '150px',
        textAlign:'center'
    },
    btnsContainer: {
        "& button": {
            margin: '4px',
            border:'none',
            padding: '5px 10px 5px 10px',
            backgroundColor:'#218380',
            color:'white',
            borderRadius: '3px',
        }
    },
    disableBtn: {
        pointerEvents:'none'
    },
    endgameDiv: {
        backgroundColor: '#218380',
        padding: '5px',
        maxWidth: '500px',
        borderRadius: '4px',
        margin: '10px auto',
        color: 'aliceblue',
        "& button": {
            border: 'none',
            padding: '5px',
            margin: '0 0 0 10px',
            borderRadius: '3px',
            backgroundColor: 'black',
            color:'white',
            '&:hover': {
                backgroundColor: 'white',
                color:'black',
            }
        }
    },
    tryAgainbtn: {
        border:'none',
        backgroundColor: 'black',
        color:'white',
        margin: '10px auto',
        display:'block',
        borderRadius: '3px',
        fontSize:'19px',
        transition: 'all ease 0.3s',
        "&:hover": {
            backgroundColor: 'white',
            color:'black',
            boxShadow: '2px 2px 3px black'
        }
    }
}));