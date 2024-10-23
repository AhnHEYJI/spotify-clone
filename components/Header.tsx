"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";  // 커스텀 훅 확인 필요
import { FaUserAlt } from "react-icons/fa";

import Button from "./Button";
import {toast} from "react-hot-toast"

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  children, className 
}) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();  // 유저 정보 가져오기

  const handleLogout = async () => { 
    const { error } = await supabaseClient.auth.signOut();  // Supabase 로그아웃
    router.refresh();
    // 로그아웃 후 페이지 새로 고침 또는 리다이렉트
    if (error) {
      toast.error(error.message);
    }
    else{
      toast.success('Logged out!')
    }
  };

  return (
    <div
      className={twMerge(
        `
         h-fit
         bg-gradient-to-b
         from-emerald-800
         p-6
        `,
        className
      )}
    >
      <div
        className="
        w-full
        mb-4
        flex
        items-center
        justify-between
        "
      >
        <div
          className="
        hidden
        md:flex
        gap-x-2
        items-center
        "
        >
          <button
            onClick={() => router.back()}
            className="
              rounded-full
              bg-black
              flex
              items-center
              hover:opacity-75
              transition
          "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>

          <button
            onClick={() => router.forward()}
            className="
              rounded-full
              bg-black
              flex
              items-center
              hover:opacity-75
              transition
          "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            hover:opacity-75
            transition
          "
          >
            <HiHome className="text-black" size={20} />
          </button>

          <button
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            hover:opacity-75
            transition
          "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div
          className="
        flex
        justify-between
        items-center
        gap-x-4
        "
        >
          {user ? (
            <div className="
            flex gap-x-4 items-center">
              <Button onClick={handleLogout}
              className="bg-white px-6 py-2"
              >
                Logout
              </Button>
              <Button
              onClick={() => router.push('/account')}  // 계정 페이지로 이동, 경로 확인 필요
              className="bg-white"
              >
                <FaUserAlt/>
              </Button>

            </div>
          ) : (
          <>
            <div>
              <Button
                onClick={authModal.onOpen}  // Sign Up 모달 호출
                className="
              bg-transparent
              text-neutral-300
              font-medium
              "
              >
                Sign Up
              </Button>
            </div>
            <div>
              <Button
                onClick={authModal.onOpen}  // Log In 모달 호출
                className="
              bg-white
              px-6
              py-2
              "
              >
                Log in
              </Button>
            </div>
          </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header; 