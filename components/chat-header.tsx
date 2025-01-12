import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import HeaderTooltip from "./chat-header-tooltip";

export function ChatHeader() {
  const session = false;
  const router = useRouter();

  return (
    <header className="flex  top-2 bg-background py-1.5 items-center  px-3 md:px-2 gap-2">
      {session ? (
        <Button
          variant="outline"
          className="order-2 md:order-2 md:px-2 px-2 md:h-fit mr-0"
          onClick={() => {
            router.push("/login");
            router.refresh();
          }}>
          Login
        </Button>
      ) : (
        <Button
          variant="outline"
          className="order-2 md:order-2 md:px-2 px-2 md:h-fit mr-0">
          Logout
        </Button>
      )}

      <HeaderTooltip />
    </header>
  );
}
