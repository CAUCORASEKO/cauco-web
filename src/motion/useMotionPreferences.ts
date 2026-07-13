import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const MOBILE_QUERY = "(max-width: 767px), (hover: none), (pointer: coarse)";

export function useMotionPreferences() {
  const reduced = Boolean(useReducedMotion());
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return { reduced, mobile, ambient: !reduced && !mobile };
}
