import loginBg from '@/assets/images/login-bg.png';
import { Head } from '@/components/Head';

export const AuthLayout = ({ children, title }) => {
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen items-center">
        {children}
        <div className="relative hidden w-0 flex-1 lg:block lg:overflow-hidden">
          <img
            className="max-h-screen w-full object-cover object-center"
            src={loginBg}
            alt="screen-mockup-destimate"
          />
        </div>
      </div>
    </>
  );
};
