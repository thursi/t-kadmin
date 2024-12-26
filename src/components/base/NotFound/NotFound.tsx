import * as React from 'react';
import Lottie from 'lottie-react';
import animation from 'assets/animations/404/404-animation.json';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface INotFoundProps {}

export default function NotFound(props: INotFoundProps) {
  return (
    <React.Fragment>
      <Lottie className="w-full h-full" animationData={animation} />
    </React.Fragment>
  );
}
