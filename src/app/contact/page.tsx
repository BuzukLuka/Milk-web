"use client";

import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { site } from "@/data/Site";
import { Facebook } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Container className="py-14">
      <SectionTitle title="Холбоо барих" />
      <div className="grid md:grid-cols-2 gap-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="card p-6 space-y-4"
        >
          <div>
            <label className="block text-sm mb-1">Овог, нэр</label>
            <input required className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Имэйл</label>
            <input
              type="email"
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Зураглал / Байгууллага</label>
            <input className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Зурвас</label>
            <textarea
              required
              rows={5}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <button className="btn-primary w-full">Илгээх</button>
          {sent && (
            <p className="text-green-600">
              Таны хүсэлтийг хүлээн авлаа. Баярлалаа!
            </p>
          )}
        </form>

        <div className="card p-6">
          <h3 className="font-semibold mb-2">Хаяг</h3>
          <p>Улаанбаатар, Монгол Улс</p>

          <h3 className="font-semibold mt-6 mb-2">Сошиал сувгууд</h3>
          <div className="flex gap-3 pt-2">
            <Link
              href={site.facebook}
              target="_blank"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 border border-white/10 
               transition-transform duration-200 ease-out
               hover:bg-white/15 hover:scale-110 hover:shadow-lg hover:shadow-black/20"
            >
              <Facebook className="h-5 w-5 transition-colors duration-200 group-hover:text-blue-500" />
            </Link>
          </div>

          {/* Газрын зураг */}
          <div className="mt-6 rounded-lg overflow-hidden">
            <div className="aspect-[16/9] w-full">
              <iframe
                title="Ub map"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={
                  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1849.840759078996!2d106.91739047668021!3d47.91901673613001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96930069209819%3A0xf44fb2dad8fa20b2!2sSUKHBAATAR%20SQUARE!5e1!3m2!1sen!2smn!4v1754752319206!5m2!1sen!2smn"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
