import { SpinnerBall, SpinnerCircle } from "./spinner";

const Loading = ({ height = '85svh' }: { height?: '65svh' | '70svh' | '70svh' | '75svh' | '80svh' | '85svh' | '90svh' | '95svh' | '100svh' }) => {
  return (
    <div style={{ height }} className='w-full flex items-center justify-center'>
      <SpinnerBall size="xl" />
    </div>
  );
};

export default Loading;
