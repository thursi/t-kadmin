import React from 'react';
import type { ReactNode } from 'react';
import Lottie from 'lottie-react';
import animation from 'assets/animations/Somethingwentwrong/something-went-wrong.json';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <div className="flex justify-center	justify-items-center py-48	">
            <Lottie className="w-full h-96" animationData={animation} />
          </div>
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
