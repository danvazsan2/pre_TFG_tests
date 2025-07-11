import BackToTop from "../backToTop";
import UserProfile from "@/components/User/UserProfile";

export const metadata = {
  title: "Profile Details - || AiWave - AI SaaS Website NEXTJS14 UI Kit",
  description: "AiWave - AI SaaS Website NEXTJS14 UI Kit",
};

const ProfileDetailsLayout = () => {
  return (
    <>
      <UserProfile />
      <BackToTop />
    </>
  );
};

export default ProfileDetailsLayout;
