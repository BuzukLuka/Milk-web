"use client";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import LogoMarquee from "@/app/support/components/LogoMarquee";

export default function PartnersPage() {
  const items = [
    {
      src: "/logo/logo_2.png",
      alt: "Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яам",
    },
    { src: "/logo/images.png", alt: "Монголын Хүнсчдийн Нэгдсэн Холбоо" },

    {
      src: "/logo/Эрүүл монгол хүн үндэсний хөдөлгөөн өнөөдөр болж байна.png",
      alt: "Эрүүл Монгол хүн",
    },
    { src: "/logo/logo_muls.png", alt: "Хөдөө Аж Ахуйн Сургууль" },

    { src: "/logo/shine_horshoo.png", alt: "Шинэ хоршоо хөдөлгөөн" },
    {
      src: "/logo/Мал-аж-ахуйн-эрдэм-шинжилгээний-хүрээлэн.png",
      alt: "Мал Аж Ахуйн ЭШХ",
    },
    { src: "/logo/Apud-logo-shine-logo.png", alt: "АПУ Дэйри ХХК" },
    { src: "/logo/nub.png", alt: "НҮБ-ын ХХААБ" },
    { src: "/logo/huns_huvisgal.png", alt: "Хүнсний хувьсгал НҮТББ" },
  ];

  return (
    <Container className="py-14 space-y-10">
      <SectionTitle title="Хамтрагч байгууллагууд" />
      <LogoMarquee
        items={items}
        height={96}
        width={220} // тогтмол box өргөн
        gap={60} // хоорондын зай
        boxPad={18} // ⬅️ ижил padding (логонууд илүү жигд харагдана)
        speed={35}
        direction="left"
      />
    </Container>
  );
}
