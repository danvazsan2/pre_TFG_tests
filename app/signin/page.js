import BackToTop from "../backToTop";
import SignInSupabaseNew from "@/components/SignIn/SignInSupabaseNew";

export const metadata = {
  title: "Sign In - || AiWave - AI SaaS Website NEXTJS14 UI Kit",
  description: "AiWave - AI SaaS Website NEXTJS14 UI Kit",
};

const SigninLayout = () => {
  return (
    <>
      <SignInSupabaseNew />
      <BackToTop />
    </>
  );
};

export default SigninLayout;
