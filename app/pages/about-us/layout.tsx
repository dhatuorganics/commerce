import Footer from "components/layout/footer";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full">{children}</div>
      <Footer />
    </>
  );
}
