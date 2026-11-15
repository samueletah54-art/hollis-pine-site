import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 pb-10">
      <p className="label text-berry mb-4">404</p>
      <h1 className="serif text-6xl md:text-8xl leading-[.9]">That tree isn't on the farm.</h1>
      <p className="mt-6 text-xl max-w-[40ch]">The page you wanted isn't here. It may have sold out, or moved.</p>
      <Link href="/shop" className="btn btn-primary mt-8">See what is</Link>
    </div>
  );
}
