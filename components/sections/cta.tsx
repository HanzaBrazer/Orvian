import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CTAButtons } from "@/components/ui";

export function CtaSection() {
  return (
    <section className="container-x py-16 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10">
          <Image
            src="/images/hills.jpg"
            alt=""
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/55" />
          <div className="relative flex flex-col items-center px-6 py-20 text-center sm:py-28">
            <h2 className="display max-w-3xl text-4xl text-white drop-shadow sm:text-5xl lg:text-6xl">
              Join Orvian for Free Today.
            </h2>
            <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-white/85">
              Welcome to a new era of seamless task management! Join Orvian for
              free today and embark on a journey towards enhanced productivity.
            </p>
            <CTAButtons className="mt-8 justify-center" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
