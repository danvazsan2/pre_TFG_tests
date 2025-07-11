import BackToTop from "../backToTop";
import SignInSupabaseSimple from "@/components/SignIn/SignInSupabaseSimple";

export const metadata = {
  title: "Sign In - || AiWave - AI SaaS Website NEXTJS14 UI Kit",
  description: "AiWave - AI SaaS Website NEXTJS14 UI Kit",
};

const SigninLayout = () => {
  return (
    <>
      <SignInSupabaseSimple />
      <BackToTop />
    </>
  );
};

export default SigninLayout;
