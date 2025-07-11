import BackToTop from "../backToTop";
import SignUpSupabase from "@/components/SignUp/SignUpSupabase";

export const metadata = {
  title: "Sign Up - || AiWave - AI SaaS Website NEXTJS14 UI Kit",
  description: "AiWave - AI SaaS Website NEXTJS14 UI Kit",
};

const SignupLayout = () => {
  return (
    <>
      <SignUpSupabase />
      <BackToTop />
    </>
  );
};

export default SignupLayout;
