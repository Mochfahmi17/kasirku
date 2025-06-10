import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import BackButton from "@/components/auth/back-button";
import GoogleButton from "@/components/auth/login/google-button";
import Header from "@/components/auth/header";

type CardWrapperProps = {
  children: React.ReactNode;
  backButtonText?: string;
  backButtonHref?: string;
  backButtonLabel?: string;
  headerTitle: string;
  headerSubTitle: string;
  headerLogoTitle?: string;
  showSocial?: boolean;
};

const CardWrapper = ({
  children,
  backButtonHref,
  backButtonLabel,
  backButtonText,
  showSocial,
  headerTitle,
  headerSubTitle,
  headerLogoTitle,
}: CardWrapperProps) => {
  return (
    <Card className="w-full border-none shadow-none md:w-md">
      <CardHeader>
        <Header
          title={headerTitle}
          subTitle={headerSubTitle}
          logoTitle={headerLogoTitle}
        />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <GoogleButton />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          text={backButtonText}
          href={backButtonHref}
          label={backButtonLabel}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
