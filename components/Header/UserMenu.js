import Image from "next/image";
import Link from "next/link";

import avatar from "../../public/images/team/team-01sm.jpg";
import UserMenuItems from "./HeaderProps/UserMenuItem";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/userSlice";

const UserMenu = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap() // Allows us to handle the fulfilled and rejected states
      .then(() => {
        router.push('/signin'); // Redirect on successful login
      })
      .catch(() => {
        // Handle error if needed
        router.push('/signin'); // Redirect on successful login
        console.error(error);
      });
  }

  return (
    <>
      <div className="inner">
        <div className="rbt-admin-profile">
          <div className="admin-thumbnail">
            <Image src={avatar} width={31} height={31} alt="User Images" />
          </div>
          <div className="admin-info">
            <span className="name">RainbowIT</span>
            <Link
              className="rbt-btn-link color-primary"
              href="/profile-details"
            >
              View Profile
            </Link>
          </div>
        </div>
        <UserMenuItems parentClass="user-list-wrapper user-nav" />
        <hr className="mt--10 mb--10" />
        <ul className="user-list-wrapper user-nav">
          <li>
            <Link href="/privacy-policy">
              <i className="fa-solid fa-comments-question"></i>
              <span>Help Center</span>
            </Link>
          </li>
          <li>
            <Link href="/profile-details">
              <i className="fa-sharp fa-solid fa-gears"></i>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
        <hr className="mt--10 mb--10" />
        <ul className="user-list-wrapper" style={{ cursor: "pointer" }}>
          <li onClick={handleLogout}>
            <i className="fa-sharp fa-solid fa-right-to-bracket"></i>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
