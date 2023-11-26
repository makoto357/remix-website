import { Outlet } from "@remix-run/react";

export default function CategoryLayout() {
  return (
    <>
      <nav className="h-24 flex items-center gap-2.5">
        <div>art</div>
        <div>gaming</div>
        <div>memberships</div>
      </nav>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
