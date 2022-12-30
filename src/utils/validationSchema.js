import * as Yup from 'yup'
export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

export const UserSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

