import type { FC, ReactNode } from 'react';
import './Badge.scss';

interface Props {
  children: ReactNode;
  value: number;
  max?: number;
}

export const Badge: FC<Props> = ({ children, value, max = 99 }) => {
  const count = value <= max ? value : `${max}+`;

  return (
    <div className="badge">
      {children}
      {value > 0 && <span className="badge__counter">{count}</span>}
    </div>
  );
};
