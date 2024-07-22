import { useContext } from 'react'
import { DrawerContext } from '../App'
import { Box } from '@mui/system'

const Content = ({children, checker, submit,classname}) => {
    const {open} = useContext(DrawerContext)
    return (
        <Box {...checker?open?{paddingLeft:50}:{paddingLeft:0}:{paddingLeft:0}}>
            <form className={classname?classname:'form'} onSubmit={submit}>
                {children}
            </form>
        </Box>
    )
    //
}

export default Content