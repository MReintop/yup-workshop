### `npm install`

### `npm start`

## Lähteülesanne

Pane kokku yup validatsiooni skeem, vastavalt nõuetele.
Kuva vastavaid erroreid.

Ülesanded:

1. Nimi : Nõutud väli. (Tehtud)
2. Perenimi : Nõutud väli. (Tehtud)
3. Isikukood : Nõutud väli ja on korrektne isikukood. (Regex olemas FormSchema.ts)
4. Telefoninumber : Nõutud väli ja on korrektne telefoninumber. (Regex olemas)
5. Vanus: Number, nõutud väli, integer ja positiivne number. (Võib lisada ka max arvu, kui julgust on).
6. Sugu: Objekt kujul {value, genderSpecified}, Soo väärtus nõutav. Kui soo väärtus on "Other", on ka nõutav väli genderSpecified,
7. Ülalpeetavad: Mitte nõutud array, kuid iga väärtuse puhul on nõutav nimi ja vanus.
8. Kui välja muuta, kaob temaga seotud error ära.

Dokumentatsioon : https://www.npmjs.com/package/yup.

Näiteid mujalt :
https://git.ehr.ee/ehr/ehr-k8s-pipeline/ehr-minu-andmed-ui/-/blob/master/src/components/page/personPage/myDataValidations.ts

https://git.ehr.ee/ehr/ehr-k8s-pipeline/ehr-minu-andmed-ui/-/blob/master/src/components/page/servicesManagementPage/modals/validation/UserRoleValidationSchema.tsx
