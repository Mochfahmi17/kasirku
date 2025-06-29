import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    </Card>
  );
};

export default CardWrapper;
