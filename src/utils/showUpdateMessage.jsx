import { enqueueSnackbar } from "notistack";

export default function showUpdateMessage(message,ok)
{
    if (ok==true)
        enqueueSnackbar(message,{variant:'success'})
    else
        enqueueSnackbar(message,{variant:'error'})
}
