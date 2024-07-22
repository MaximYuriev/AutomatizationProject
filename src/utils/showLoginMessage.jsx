import { enqueueSnackbar } from "notistack";

export default function showLoginMessage(message)
{
    enqueueSnackbar(message,{variant:'error'})
}