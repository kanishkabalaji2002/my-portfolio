export type MeBookEntry =
  | { id: string; kind: "video"; src: string; title: string; body: string }
  | { id: string; kind: "imageCard"; image: string; title: string; body: string }
  | {
      id: string;
      kind: "food";
      image: string;
      line1: string;
      line2: string;
    }
  | { id: string; kind: "joy"; image: string; line1: string; line2: string };

/** Same six stories as `public/about.html` personality grid */
export const ME_BOOK_ENTRIES: MeBookEntry[] = [
  {
    id: "podcast",
    kind: "video",
    src: "/podcast.MOV",
    title: "Podcast host on mental health & storytelling",
    body: "Builds empathy, active listening, and comfort with difficult conversations.",
  },
  {
    id: "bamboo",
    kind: "imageCard",
    image: "/bamboo.jpg",
    title: "Helped build a 30-foot bamboo sculpture",
    body: "Collaborative making at scale — learning by doing, getting your hands dirty.",
  },
  {
    id: "food",
    kind: "food",
    image: "/food.jpeg",
    line1: "Known to plan my day around food",
    line2: "Cultural curiosity & attention to sensory experience.",
  },
  {
    id: "postcard",
    kind: "imageCard",
    image: "/postcard.jpg",
    title: "Collects postcards wherever I go",
    body: "Observer of places, typography, and the everyday design of the world.",
  },
  {
    id: "mud",
    kind: "imageCard",
    image: "/mud.jpg",
    title: "Building with cob & vernacular techniques",
    body: "Earth, straw, water — understanding what it means to build slowly with what's already there.",
  },
  {
    id: "joy",
    kind: "joy",
    image: "/joy.jpeg",
    line1: "Finds joy in small wins",
    line2: "Progress over perfection — sustainable creative practice, always.",
  },
];
