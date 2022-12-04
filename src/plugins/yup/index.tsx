import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email Tidak Valid')
    .required('Tolong isi Email Anda')
    .trim(),
  password: Yup.string().required('Tolong Masukan Password Anda').trim(),
});

export const updateProfileSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .trim()
    .required('Required'),
  birth_date: Yup.string().required('Required'),
  address: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required')
    .trim(),
  phone_number: Yup.string()
    .trim()
    .min(9, 'No Hp Terlalu Pendek')
    .max(11, 'No Hp Terlalu Panjang')
    .required('Silahkan Isi Nomor Handphone Anda'),
  tempat_lahir: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .trim()
    .required('Required'),
});

export const forgetPassSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email Tidak Valid')
    .required('Tolong isi Email Anda')
    .trim(),
});

export const requestSchema = Yup.object().shape({
  alasan: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required')
    .trim(),

  jenis_izin: Yup.string().required('Required'),
});
