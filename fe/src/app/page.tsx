import { Button } from "@/components/ui/button";
import { ThemeModeToggle } from "@/components/ui/theme-mode-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button size="sm">Click me</Button>
      <ThemeModeToggle />
    </main>
  );
}
