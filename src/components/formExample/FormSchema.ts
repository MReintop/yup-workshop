// @ts-nocheck
import * as yup from 'yup';
import { PersonDataToSell } from './FormExample';

const PERSONAL_CODE_REGEX = /^[1-6]{1}[0-9]{10}$/;
const PHONE_NR_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{2,5}$/;

export const formSchema: yup.SchemaOf<PersonDataToSell> = yup.object({
  firstName: yup.string().required('Nõutud väli.'),
  lastName: yup.string().required('Nõutud väli.'),
});
