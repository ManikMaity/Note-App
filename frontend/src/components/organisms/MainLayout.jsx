import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import manikmaity from "@/assets/manikmaity.jpg";
import { Home, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import Header from "../molecules/Header";
import InputBar from "../molecules/InputBar";

const SidebarLinks = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Favorites",
    path: "/favorites",
    icon: Star,
  },
];

export default function MainLayout({ children }) {
  const location = useLocation();

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen flex text-ba"
    >
      {/* Sidebar */}
      <ResizablePanel defaultSize={20} className="bg-gray-100">
        <div className="m-2 h-full">
          <div className="flex gap-2 items-center justify-start p-1 rounded-full w-full shadow-sm min-w-32 bg-white">
            <div>
              <img
                className="w-8 rounded-full"
                src={manikmaity}
                alt="Manikmaity"
              />
            </div>
            <p className="font-semibold text-xl">AI Note</p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {SidebarLinks.map((link, index) => (
              <Button
                variant={
                  location.pathname === link.path ? "sidebarActive" : "sidebar"
                }
                key={index}
                className="w-full justify-start"
                asChild
              >
                <Link to={link.path}>
                  <link.icon />
                  <p>{link.name}</p>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={80} className="p-2 relative">
        <Header />
        {children}

        <div className="absolute bottom-0 w-full pr-4 pb-2">
          <InputBar />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
