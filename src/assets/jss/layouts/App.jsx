import { drawerWidth } from "assets/jss/common"

const styles = theme => ({
    root: {
        flexGrow: 1,
        // height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
        // padding: theme.spacing.unit,
        // backgroundColor: theme.palette.background,
        // color: theme.palette.primary,
    },
    appBar: {
        // position: 'absolute',
        // marginLeft: drawerWidth, //
        // [theme.breakpoints.up('md')]: {
        //   width: `calc(100% - ${drawerWidth}px)`,
        // },
        // marginLeft: 0, //
        // [theme.breakpoints.up('md')]: {
        //   width: `calc(100%)`,
        // },
        // for shifting
        // position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    // for shifting
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    menuButtons: {
        flexDirection: 'row-reverse',
        marginLeft: 12,
        marginRight: 20,
    },
    // for shifting
    hide: {
        display: 'none',
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
        // for shifting
        position: 'relative',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        // for shifting
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    textInPrimary: {
        backgroundColor: theme.palette.primary.main,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        color: theme.palette.common.white,
    },
    textInSecondary: {
        backgroundColor: theme.palette.primary.main,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        color: theme.palette.secondary.main,
    },
    labelInPrimary: {
        backgroundColor: theme.palette.common.white,
    },
    labelInSecondary: {
        backgroundColor: theme.palette.secondary.main,
    },
})

export default styles
