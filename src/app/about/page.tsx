import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { org } from "@/data/Content";

export default function About() {
  return (
    <Container className="py-14">
      <SectionTitle title="Бидний тухай" />
      <p className="mb-6">{org.intro}</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="font-semibold mb-3">Алсын хараа</h3>
          <p>{org.vision}</p>
          <p className="mt-3 text-brand-deep">{org.slogan}</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold mb-3">Үйл ажиллагааны чиглэл</h3>
          <ul className="list-disc pl-5 space-y-1">
            {org.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
