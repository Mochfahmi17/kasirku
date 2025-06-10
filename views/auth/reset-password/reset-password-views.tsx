import CardWrapper from "@/components/auth/card-wrapper";
import ResetPasswordForm from "@/components/auth/reset-password/reset-password-form";

const ResetPasswordViews = () => {
  return (
    <CardWrapper
      headerTitle="Atur Ulang Kata Sandi Anda"
      headerSubTitle="Demi keamanan akun Anda, silakan masukkan kata sandi baru lalu konfirmasi ulang. Setelah berhasil, Anda akan dapat kembali menggunakan layanan Kasirku seperti biasa."
    >
      <ResetPasswordForm />
    </CardWrapper>
  );
};

export default ResetPasswordViews;
