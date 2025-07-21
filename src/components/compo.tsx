interface CompoProps {
  dynamicColor: string;
}
const Compo = ({ dynamicColor }: CompoProps) => {
  return <div className={`bg-[${dynamicColor}] w-20 h-20`}>{dynamicColor}</div>;
};

export default Compo;
