import { Watch, Crown, Eigene, Cubot } from './svg';

const iconMap = {
  watch: Watch,
  crown: Crown,
  eigene: Eigene,
  cubot: Cubot,
};

type IconProps = {
  name: 'watch' | 'crown' | 'eigene' | 'cubot';
} & React.SVGProps<SVGSVGElement>;

const Icon = ({ name, ...rest }: IconProps) => {
  return iconMap[name]({ ...rest });
};
export default Icon;
