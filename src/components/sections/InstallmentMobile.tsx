'use client';

export default function InstallmentMobile() {
  return (
    <section id="InstallmentMobile" className="relative z-1 hidden overflow-clip max-md:block">
      <div className="bg-[radial-gradient(at_right_bottom,#3E562E,#2F3A26)] px-6 py-10">
        <div className="flex h-full flex-col justify-between gap-10">
          <div className="flex flex-col gap-6">
            <p className="heading-2 text-cream-dark">Installment plan</p>
            <ul className="divide-cream-dark/40 divide-y">
              <li className="flex items-center justify-start gap-6 border-b border-b-green py-3">
                <p className="heading-2 text-accent italic whitespace-nowrap w-[2em] shrink-0">40%</p>
                <p className="detail text-sand">Prepayment</p>
              </li>
              <li className="flex items-center justify-start gap-6 border-b border-b-green py-3">
                <p className="heading-2 text-accent italic whitespace-nowrap w-[2em] shrink-0">20%</p>
                <p className="detail text-sand">12 floor</p>
              </li>
              <li className="flex items-center justify-start gap-6 border-b border-b-green py-3">
                <p className="heading-2 text-accent italic whitespace-nowrap w-[2em] shrink-0">20%</p>
                <p className="detail text-sand">15 floor</p>
              </li>
              <li className="flex items-center justify-start gap-6 border-b border-b-green py-3">
                <p className="heading-2 text-accent italic whitespace-nowrap w-[2em] shrink-0">5%</p>
                <p className="detail text-sand">Blocks and Plastering</p>
              </li>
              <li className="flex items-center justify-start gap-6 border-b border-b-green py-3">
                <p className="heading-2 text-accent italic whitespace-nowrap w-[2em] shrink-0">5%</p>
                <p className="detail text-sand">Handover</p>
              </li>
            </ul>
          </div>
          <div className="mt-4 w-full" />
        </div>
      </div>
    </section>
  );
}
