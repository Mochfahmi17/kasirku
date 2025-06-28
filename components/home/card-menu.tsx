import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

type CardMenuProps = {
  urlImage: string;
  altImage: string;
  titleProduct: string;
  price: number;
};

const CardMenu = ({
  urlImage,
  altImage,
  titleProduct,
  price,
}: CardMenuProps) => {
  const formatCurrency = (value: number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };
  return (
    <Card className="group border-none shadow-none hover:shadow-md">
      <CardContent className="space-y-4">
        <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full md:h-32 md:w-32">
          <Image
            src={urlImage}
            alt={altImage}
            width={160}
            height={160}
            className="h-full w-full rounded-full object-cover object-center transition-all group-hover:scale-110"
          />
        </div>
        <p className="text-center font-semibold">{titleProduct}</p>
      </CardContent>
      <CardFooter>
        <p className="mx-auto text-center text-sm text-slate-500">
          {formatCurrency(price)}
        </p>
      </CardFooter>
    </Card>
  );
};

export default CardMenu;
