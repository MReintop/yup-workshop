// @ts-nocheck
import * as yup from 'yup';
import { PersonDataToSell } from './FormExample';
import { Genders } from './types';

const PERSONAL_CODE_REGEX = /^[1-6]{1}[0-9]{10}$/;
const PHONE_NR_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{2,5}$/;

const requiredError = 'Nõutud väli.';

export const formSchema: yup.SchemaOf<PersonDataToSell> = yup.object({
  firstName: yup.string().required(requiredError),
  lastName: yup.string().required(requiredError),
  email: yup.string().email('Vigane email.').required('Nõutud väli.'),
  idCode: yup
    .string()
    .matches(PERSONAL_CODE_REGEX, 'Vigane isikukood.')
    .required(requiredError),
  phoneNr: yup
    .string()
    .matches(PHONE_NR_REGEX, 'Vigane number.')
    .required(requiredError),
  age: yup
    .number()
    .required(requiredError)
    .positive('Vanus ei saa olla negatiivne.')
    .integer('Palun vanus täisaastates'),
  gender: yup.object({
    value: yup
      .string()
      .oneOf([Genders.Male, Genders.Female, Genders.Other])
      .defined('Vali üks palun.'),

    genderSpecified: yup
      .string()
      .test('is-specification-required', requiredError, function (value) {
        return this.parent.value === Genders.Other ? !!value : true;
      }),
  }),

  dependants: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required(requiredError),
        age: yup
          .number()
          .required(requiredError)
          .positive('Vanus ei saa olla negatiivne.')
          .integer('Palun vanus täisaastates'),
      }),
    )
    .nullable(),
});
