import BackToTop from "../backToTop";
import UserProfileNew from "@/components/User/UserProfileNew";

export const metadata = {
  title: "Profile Details - || AiWave - AI SaaS Website NEXTJS14 UI Kit",
  description: "AiWave - AI SaaS Website NEXTJS14 UI Kit",
};

const ProfileDetailsLayout = () => {
  return (
    <>
      <UserProfileNew />
      <BackToTop />
    </>
  );
};

export default ProfileDetailsLayout;
