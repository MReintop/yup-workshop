export const Genders = {
  Male: 'Male',
  Female: 'Female',
  Other: 'Other',
};

export interface Gender {
  value?: string;
  genderSpecified?: string;
}

export interface ChildData {
  name: string;
  age?: number;
}
