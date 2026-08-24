
"use client";

import { useEffect, useState } from "react";

interface RoleRotatorProps {
  roles: string[];
}

export function RoleRotator({ roles }: RoleRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [roles]);

  return (
    <span className="element role-rotator" aria-hidden="true">
      {roles[index]}
    </span>
  );
}
