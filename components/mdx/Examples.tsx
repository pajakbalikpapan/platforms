import Card from "./Card";

import type { MdxCardData } from "@/types";

interface ExamplesProps {
  data: string;
}

export default function Examples({ data }: ExamplesProps) {
  const parsedData: Array<MdxCardData> = JSON.parse(data);
  return (
    <div className="not-prose grid grid-cols-1 gap-x-4 gap-y-4 lg:gap-y-8 lg:-mx-36 my-10 lg:mb-20 lg:grid-cols-3">
      {parsedData.map((d) => (
        <Card data={d} key={d.name} />
      ))}
    </div>
  );
}
