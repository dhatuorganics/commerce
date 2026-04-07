import clsx from "clsx";
import Image from "next/image";

export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <Image
      src="/logo.png"
      alt={`${process.env.SITE_NAME} logo`}
      width={32}
      height={32}
      className={clsx("h-4 w-4 object-contain", props.className)}
    />
  );
}
