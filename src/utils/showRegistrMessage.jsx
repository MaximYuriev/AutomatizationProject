import { enqueueSnackbar } from "notistack";

export default function showRegistrMessage(message,ok)
{
    if (ok==true)
        enqueueSnackbar('Пользователь добавлен!',{variant:'success'})
    else
        enqueueSnackbar(message,{variant:'error'})
}
