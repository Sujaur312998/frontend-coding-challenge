import { Home } from "@/views/home";
import { Suspense } from "react";

export default function HomeRoot() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
