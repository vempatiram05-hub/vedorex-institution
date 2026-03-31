import HeroSlider from "@/components/Heroslider";
import CourseHighlight from "@/components/CourseHighlight";

async function getHomeData() {
  const res = await fetch("http://localhost:1337/api/home-page", {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data.sections;
}

export default async function Home() {
  const sections = await getHomeData();

  return (
    <main style={{ minHeight: "100vh" }}>
      {sections.map((section: any) => {
        if (section.__component === "section.hero-slider") {
          return <HeroSlider key={`${section.__component}-${section.id}`} data={section} />;
        }
        if (section.__component === "section.course-highlight") {
          return <CourseHighlight key={`${section.__component}-${section.id}`} data={section} />;
        }
      })}
    </main>
  );
}