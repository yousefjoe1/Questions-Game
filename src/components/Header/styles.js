import {makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    toolbar: {
        position:'relative',
        backgroundColor:'#218380',
        display: 'flex',
        justifyContent:'space-between',
        flexWrap:'wrap',
    },
    title: {
        margin: '5px auto'
    },
    score: {
        fontSize:'20px',
        color:'white',
        '&:hover': {
            color:'orange'
        }
    },
    logBox: {
        margin: '1px auto',
        "& > a":{
            color:"white",
            margin:'3px',
        }
    },
    userState: {
        position:'absolute',
        left: '50%',
        bottom:'-30px'
    },
    colortimest: {
        backgroundColor: 'red',
        transition: 'all ease 1s',
        borderRadius: '10px',
    }
}));