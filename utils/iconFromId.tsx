import * as Fa from "react-icons/fa";
const iconFromId = (id: string): React.ReactNode => {
  //@ts-ignore
  const Icon = Fa[id];

  return <Icon />;
};

export default iconFromId;
