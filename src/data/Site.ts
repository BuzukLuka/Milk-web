export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type SiteConfig = {
  name: string;
  short: string;
  url: string;
  facebook: string;
  email?: string; // <-- optional
  phone?: string; // <-- optional
  address?: string; // <-- optional
  nav: NavItem[];
};

export const site: SiteConfig = {
  name: "Сүүний салбарыг хөгжүүлэх үндэсний зөвлөл",
  short: "ССХҮЗ",
  url: "https://example.mn",
  facebook: "https://www.facebook.com/profile.php?id=100094122697534",

  // add your real details (optional)
  email: "info@example.mn",
  phone: "+976 9911 2233",
  address: "Улаанбаатар, Монгол Улс",

  nav: [
    { label: "Нүүр", href: "/" },
    {
      label: "Бидний тухай",
      href: "/about",
      children: [
        { label: "ТУЗ", href: "/about/tuz" },
        { label: "Байгууллагын мэдээлэл", href: "/about/org" },
        { label: "Эрхэм зорилго", href: "/about/mission" },
        { label: "Стратеги төлөвлөгөө", href: "/about/strategy" },
      ],
    },
    { label: "Мэдээ", href: "/news" },
    { label: "Төслүүд", href: "/projects" },
    { label: "Статистик", href: "/statistics" },
    { label: "Холбоо барих", href: "/contact" },
  ],
};
