import clsx from "clsx";

export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt={`${process.env.SITE_NAME} logo`}
      width={32}
      height={32}
      className={clsx("h-4 w-4 object-contain", props.className)}
    />
  );
}
