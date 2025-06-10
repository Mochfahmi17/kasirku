import CardWrapper from "@/components/auth/card-wrapper";
import RegisterForm from "@/components/auth/register/register-form";

const RegisterViews = () => {
  return (
    <CardWrapper
      headerTitle="Bergabunglah Dengan Kami!"
      headerSubTitle="Daftar sekarang untuk akses penuh ke fitur aplikasi kasir kami dan optimalkan operasional penjualan Anda."
      backButtonText="Already have an account?"
      backButtonLabel="Login"
      backButtonHref="/login"
    >
      <RegisterForm />
    </CardWrapper>
  );
};

export default RegisterViews;
