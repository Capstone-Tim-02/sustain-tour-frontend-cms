import loginBg from '@/assets/images/login-bg.png';
import { Head } from '@/components/Head';

export const AuthLayout = ({ children, title }) => {
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen">
        {children}
        <div className="relative hidden w-0 flex-1 lg:block lg:overflow-hidden">
          <img
            className="absolute top-1/2 h-auto w-full -translate-y-1/2 object-cover object-center lg:h-full lg:w-full"
            src={loginBg}
            alt="screen-mockup-destimate"
          />
        </div>
      </div>
    </>
  );
};
