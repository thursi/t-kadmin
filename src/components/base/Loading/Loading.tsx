import * as React from "react";
import Lottie from "lottie-react";
import { ILoadingProps } from "types/components/loading";
import Animation from "assets/animations/Loading/insider-loading.json";
export default function Loading(props: ILoadingProps) {
  return (
    <React.Fragment>
      <div className={`flex justify-center h-full items-center`}>
        <Lottie
          className="w-32 h-1/12"
          animationData={props.animation ? props.animation : Animation}
        />
      </div>
    </React.Fragment>
  );
}
