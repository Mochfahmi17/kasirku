import CardWrapper from "@/components/auth/card-wrapper";
import ForgotPasswordForm from "@/components/auth/forgot-password/forgot-password-form";

const ForgotPassword = () => {
  return (
    <CardWrapper
      headerTitle="Lupa Kata Sandi Anda ?"
      headerSubTitle="Masukkan email Anda di bawah ini untuk menerima kode verifikasi dan mengatur ulang kata sandi Anda."
      backButtonText="back to "
      backButtonLabel="login"
      backButtonHref="/login"
    >
      <ForgotPasswordForm />
    </CardWrapper>
  );
};

export default ForgotPassword;
