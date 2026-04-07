import clsx from "clsx";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black",
        {
          "h-[40px] w-[40px] rounded-xl": !size,
          "h-[30px] w-[30px] rounded-lg": size === "sm",
        },
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Logo"
        className={clsx("object-contain", {
          "h-[36px] w-[36px]": !size,
          "h-[26px] w-[26px]": size === "sm",
        })}
      />
    </div>
  );
}
