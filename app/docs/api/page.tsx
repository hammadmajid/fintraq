import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./components/react-swagger";
import { SetThemeLight } from "./components/set-theme-light";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Docs",
};

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section>
      <SetThemeLight />
      <ReactSwagger spec={spec} />
    </section>
  );
}
