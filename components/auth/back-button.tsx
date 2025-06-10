import { Button } from "@/components/ui/button";
import Link from "next/link";

type BackButtonProps = {
  text?: string;
  href?: string;
  label?: string;
};

const BackButton = ({ text, href, label }: BackButtonProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-1 text-sm">
      {text && <p className="text-muted-foreground text-center">{text}</p>}
      <Button
        size="sm"
        variant="link"
        asChild
        className="h-0 w-fit p-0 font-normal hover:text-orange-500 hover:no-underline"
      >
        {href && (
          <Link href={href} className="font-semibold text-slate-800">
            {label}
          </Link>
        )}
      </Button>
    </div>
  );
};

export default BackButton;
