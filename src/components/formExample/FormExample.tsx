import React, { useEffect, useState } from 'react';
import {
  Container,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import { useYupValidation } from '../../hooks/useYupValidation/useYupValidation';
import { formSchema } from './FormSchema';
import { ChildData, Gender, Genders } from './types';
import AddIcon from '@mui/icons-material/Add';

export interface PersonDataToSell {
  firstName: string;
  lastName: string;
  email: string;
  idCode: string;
  phoneNr: string;
  age?: number;
  gender: Gender;
  dependants: ChildData[];
}

const FormExample = () => {
  const [person, setPerson] = useState<PersonDataToSell>({
    firstName: '',
    lastName: '',
    email: '',
    idCode: '',
    phoneNr: '',
    age: undefined,
    gender: { value: undefined, genderSpecified: undefined },
    dependants: [],
  });

  const { validate, errors, clearErrors } = useYupValidation(formSchema);

  const setPersonValue = (property: string, value: string | ChildData[]) => {
    clearErrors(property);
    setPerson((prev) => ({ ...prev, [property]: value }));
  };

  const setChildValue = (
    index: number,
    property: string,
    value: string | number,
  ) => {
    clearErrors(`dependants[${index}].${property}`);
    setPerson((prev) => ({
      ...prev,
      gender: { ...person.gender, [property]: value },
    }));

    if (person.dependants.length) {
      const dependantInQuestion: any = person.dependants[index];
      dependantInQuestion[property] = value;
      const newDependants = [...person.dependants];
      newDependants.splice(index, 1, dependantInQuestion);

      setPerson((prev) => ({
        ...prev,
        dependants: newDependants,
      }));
    }
  };

  const addDependant = () => {
    const newDependants: ChildData[] = [...person.dependants, { name: '' }];
    setPersonValue('dependants', newDependants);
  };

  const removeDependant = (index: number) => {
    const newDependants = [...person.dependants];
    newDependants.splice(index, 1);
    setPersonValue('dependants', newDependants);
  };

  const getParentFieldError = (fieldName: string) => {
    return errors[fieldName];
  };

  const getChildFieldError = (index: number, property: string) =>
    errors[`dependants[${index}].${property}`];

  const handleSave = async () => {
    validate(person, () => alert('Salvestatud!'));
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Container maxWidth="md" data-testid="form-example-container">
      <Typography variant="h4" sx={{ m: 2 }}>
        Sisesta oma andmed, me ei müü neid maha
      </Typography>

      <Button variant="contained" color="success" onClick={handleSave}>
        Salvesta
      </Button>

      <Grid
        container
        spacing={3}
        sx={{ mt: 2, mb: 6 }}
        justifyContent={'center'}
        display={'flex'}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Üldised andmed
          </Typography>

          <TextField
            sx={{ my: 1 }}
            value={person.firstName}
            required
            fullWidth
            label="Eesnimi"
            id="person-first-name"
            error={!!getParentFieldError('firstName')}
            helperText={getParentFieldError('firstName')}
            onChange={(e) => setPersonValue('firstName', e.target.value)}
          />

          <TextField
            sx={{ my: 1 }}
            value={person.lastName}
            required
            fullWidth
            label="Perenimi"
            id="person-last-name"
            error={!!getParentFieldError('lastName')}
            helperText={getParentFieldError('lastName')}
            onChange={(e) => setPersonValue('lastName', e.target.value)}
          />

          <TextField
            sx={{ my: 1 }}
            value={person.email}
            required
            fullWidth
            label="E-mail"
            id="person-email"
            error={!!getParentFieldError('email')}
            helperText={getParentFieldError('email')}
            onChange={(e) => setPersonValue('email', e.target.value)}
          />

          <TextField
            sx={{ my: 1 }}
            value={person.idCode}
            required
            fullWidth
            label="Isikukood"
            id="person-id-code"
            error={!!getParentFieldError('idCode')}
            helperText={getParentFieldError('idCode')}
            onChange={(e) => setPersonValue('idCode', e.target.value)}
          />

          <TextField
            sx={{ my: 1 }}
            value={person.phoneNr}
            required
            fullWidth
            label="Telefoni nr"
            id="person-phone-nr"
            error={!!getParentFieldError('phoneNr')}
            helperText={getParentFieldError('phoneNr')}
            onChange={(e) => setPersonValue('phoneNr', e.target.value)}
          />

          <TextField
            sx={{ my: 1 }}
            value={person.age}
            required
            fullWidth
            type="number"
            label="Vanus"
            id="person-age"
            error={!!getParentFieldError('age')}
            helperText={getParentFieldError('age')}
            onChange={(e) => setPersonValue('age', e.target.value)}
          />

          <FormControl
            fullWidth
            error={!!getParentFieldError('gender.value')}
            required
            sx={{ my: 1 }}
          >
            <InputLabel>Sugu</InputLabel>
            <Select
              id="person-gender"
              value={person.gender.value}
              onChange={(e) => setPersonValue('gender.value', e.target.value)}
            >
              <MenuItem value={Genders.Male}>Mees</MenuItem>
              <MenuItem value={Genders.Female}>Naine</MenuItem>
              <MenuItem value={Genders.Other}>Muu</MenuItem>
            </Select>
            {!!getParentFieldError('gender.value') && (
              <FormHelperText error>
                {getParentFieldError('gender.value')}
              </FormHelperText>
            )}
          </FormControl>

          {person.gender.value === Genders.Other && (
            <TextField
              sx={{ my: 1 }}
              value={person.gender.genderSpecified}
              required
              fullWidth
              label="Täpsusta palun oma sugu"
              error={!!getParentFieldError('gender.genderSpecified')}
              helperText={getParentFieldError('gender.genderSpecified')}
              onChange={(e) =>
                setPersonValue('gender.genderSpecified', e.target.value)
              }
            />
          )}

          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={addDependant}
          >
            Lisa ülalpeetav
          </Button>

          {person.dependants.map((dependant, i) => (
            <>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Ülalpeetav {i + 1}
              </Typography>

              <TextField
                sx={{ my: 1 }}
                value={dependant.name}
                required
                fullWidth
                error={!!getChildFieldError(i, 'name')}
                helperText={getChildFieldError(i, 'name')}
                label="Lapse nimi"
                id={`person-dependant-${i + 1}-name`}
                onChange={(e) => setChildValue(i, 'name', e.target.value)}
              />

              <TextField
                sx={{ my: 1 }}
                value={dependant.age}
                required
                fullWidth
                error={!!getChildFieldError(i, 'age')}
                helperText={getChildFieldError(i, 'age')}
                type="number"
                label="Lapse Vanus"
                id={`person-dependant-${i + 1}-age`}
                onChange={(e) => setChildValue(i, 'age', e.target.value)}
              />

              <Button
                variant="outlined"
                color="error"
                onClick={() => removeDependant(i)}
              >
                Kustuta ülalpeetav
              </Button>
            </>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormExample;
