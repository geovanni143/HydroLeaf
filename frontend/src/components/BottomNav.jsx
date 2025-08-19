// src/components/BottomNav.jsx
import { Link, useLocation } from "react-router-dom";
import { ChartBar, Drop, MapPin, List } from "phosphor-react";

const Item = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex flex-col items-center text-xs ${active ? "text-emerald-700" : "text-gray-600"}`}
    aria-current={active ? "page" : undefined}
    aria-label={label}
  >
    {Icon && <Icon size={22} weight={active ? "fill" : "regular"} />}
    <span className="mt-0.5">{label}</span>
  </Link>
);

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-transparent">
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="rounded-[20px] bg-white shadow px-8 py-3 grid grid-cols-4">
          <Item to="/" icon={ChartBar} label="Inicio" active={pathname === "/"} />
          <Item to="/control-riego" icon={Drop} label="Riego" active={pathname.startsWith("/control-riego")} />
          <Item to="/zonas" icon={MapPin} label="Zonas" active={pathname.startsWith("/zonas")} />
          <Item to="/config" icon={List} label="Config." active={pathname.startsWith("/config")} />
        </div>
      </div>
    </nav>
  );
}
