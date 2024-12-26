import React from "react";

interface IIconComponentProps {
  icon: string;
  className?: string;
}
const IconComponent = (props: IIconComponentProps) => {
  const Component = React.useMemo(() => {
    return React.lazy(() => import(`assets/images/svg/${props?.icon}`));
  }, [props?.icon]);
  return (
    <div>
      <Component className={props?.className} />
    </div>
  );
};

export default IconComponent;
