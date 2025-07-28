import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  DashboardBrowsingIcon,
  Calendar02FreeIcons,
  TaskAdd02Icon,
  User03FreeIcons,
  MessageQuestionIcon,
  Settings04FreeIcons,
  UserGroup03FreeIcons,
} from "@hugeicons/core-free-icons";
import { useAppSelector } from "../../hooks";
import { TieredMenu } from "primereact/tieredmenu";
import type { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

const sidebarItems = [
  { icon: DashboardBrowsingIcon, label: "Dashboard" },
  { icon: Calendar02FreeIcons, label: "Projects" },
  { icon: TaskAdd02Icon, label: "Tasks" },
  { icon: UserGroup03FreeIcons, label: "Users" },
  { icon: MessageQuestionIcon, label: "FAQs" },
  { icon: Settings04FreeIcons, label: "Settings" },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const selector = useAppSelector((state) => state.auth);

  const menu = useRef(null);
  const itemRenderer = (item: any) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );
  const items: MenuItem[] = [
    {
      label: "Settings",
      icon: () => (
        <HugeiconsIcon icon={Settings04FreeIcons} className="text-xl" />
      ),
      template: itemRenderer,
    },
    {
      label: "Logout",
      icon: "pi-sign-out",
      template: itemRenderer,
      command(event) {
        // Handle logout logic here
        console.log("Logout clicked");
      },
    },
  ];

  return (
    <div
      className={`flex flex-col h-full bg-gray-100 p-4 transition-all ease-in-out
      ${collapsed ? "w-[64px]" : "w-[256px]"}`}
    >
      <div
        className="flex gap-x-4 items-center cursor-pointer mb-8"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <HugeiconsIcon icon={Menu01Icon} className="text-3xl" />
        {!collapsed && <span className="font-bold">AdminSidebar</span>}
      </div>
      <div>
        <ul className={`pt-4 space-y-8`}>
          {sidebarItems.map((item) => (
            <li
              key={item.label}
              className="hover:cursor-pointer flex items-center"
            >
              <HugeiconsIcon icon={item.icon} className="text-xl mr-2" />
              {!collapsed && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
        <div className="absolute bottom-0.5 flex gap-x-5 border-t-2 py-5">
          <div className="card flex justify-content-center">
            <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
            <HugeiconsIcon
              icon={User03FreeIcons}
              className="hover:cursor-pointer"
              onClick={(e) => menu.current.toggle(e)}
            />
          </div>
          {!collapsed && (
            <span className="text-lg">{selector.user?.fullName}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
