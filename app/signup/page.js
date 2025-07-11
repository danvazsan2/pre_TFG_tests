import BackToTop from "../backToTop";
import SignUpSupabaseNew from "@/components/SignUp/SignUpSupabaseNew";

export const metadata = {
  title: "Sign Up - || AiWave - AI SaaS Website NEXTJS14 UI Kit",
  description: "AiWave - AI SaaS Website NEXTJS14 UI Kit",
};

const SignupLayout = () => {
  return (
    <>
      <SignUpSupabaseNew />
      <BackToTop />
    </>
  );
};

export default SignupLayout;
