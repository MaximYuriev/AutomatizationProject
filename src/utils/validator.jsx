import * as yup from "yup";
export const createCaseSchema = yup.object({
    passport_serial_1: yup
        .string()
        .required("Введите серию паспорта!")
        .matches(/[0-9]$/,"Только цифры!")
        .min(4,'Серия паспорта состоит из 4 цифр!')
        .max(4,'Серия паспорта состоит из 4 цифр!'),
    passport_number_1: yup
        .string()
        .required("Введите номер паспорта!")
        .matches(/[0-9]$/,"Только цифры!")
        .min(6,'Номер паспорта состоит из 6 цифр!')
        .max(6,'Номер паспорта состоит из 6 цифр!'),
})