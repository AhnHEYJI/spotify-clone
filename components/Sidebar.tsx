"use client";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import React,{useMemo} from "react";
import Box from "./Box";
import SidebarItem from "./Sidebarltem";


interface SidebarProps {
  children: React.ReactNode;
}
const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Heme",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      }
    ],[pathname]
  );
  return <div
  className="flex h-full">
    <div className="hidden
    md:flex
    flex-col
    gap-y-2
    bg-black
    h-full
    w-[300px]
    p-2
    "
    
    >
    <Box>
      <div className="
      flex
      flex-col
      gep-y-4
      px-5
      py-4

      
      ">
        {routes.map((item) =>(
          <SidebarItem
          key={item.lable}
          {...item}

          
          />
        ))}
      </div>
    </Box>
    <Box className="overflow-y-auto h-full">
      Song Library
    </Box>
    </div>
    </div>;
};

export default Sidebar;
