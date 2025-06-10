type HeaderProps = {
  title: string;
  subTitle: string;
  logoTitle?: string;
};

const Header = ({ title, logoTitle, subTitle }: HeaderProps) => {
  return (
    <div>
      {title && (
        <h1 className="mb-2 text-2xl font-semibold">
          {title}{" "}
          {logoTitle && <span className="text-orange-500">{logoTitle}</span>}
        </h1>
      )}
      <p className="text-sm text-slate-500">{subTitle}</p>
    </div>
  );
};

export default Header;
