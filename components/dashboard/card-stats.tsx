import { IconType } from "react-icons/lib";
import { Card, CardContent, CardHeader } from "../ui/card";

type CardStatsProps = {
  title: string;
  Icon: IconType;
  children: React.ReactNode;
};

const CardStats = ({ title, Icon, children }: CardStatsProps) => {
  return (
    <Card className="min-w-[180px] flex-1">
      <CardHeader className="text-sm">
        <div className="flex items-center gap-2 font-semibold">
          <Icon className="size-5" />
          <span>{title}</span>
        </div>
      </CardHeader>
      <CardContent className="text-lg font-bold text-orange-500">
        {children}
      </CardContent>
    </Card>
  );
};

export default CardStats;
