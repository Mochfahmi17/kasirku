import CardWrapper from "@/components/auth/card-wrapper";
import LoginForm from "@/components/auth/login/login-form";

const LoginViews = () => {
  return (
    <CardWrapper
      headerTitle="Selamat Datang di,"
      headerLogoTitle="KasirKu!"
      headerSubTitle="Login ke akun Anda di bawah ini untuk mengakses sistem kasir dan memulai sesi penjualan Anda hari ini."
    >
      <LoginForm />
    </CardWrapper>
  );
};

export default LoginViews;
