import CardWrapper from "@/components/auth/card-wrapper";
import OtpVerificationForm from "@/components/auth/otp-verification/otp-verification-form";

const OtpVerificationViews = () => {
  return (
    <CardWrapper
      headerTitle="Masukkan Kode Verifikasi Anda"
      headerSubTitle="Masukkan kode unik yang telah kami kirimkan ke email Anda."
    >
      <OtpVerificationForm />
    </CardWrapper>
  );
};

export default OtpVerificationViews;
