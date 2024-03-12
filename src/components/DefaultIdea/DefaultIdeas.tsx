import DefaultIdea from "./DefaultIdea";

const defaultIdeas = [
  {
    idea: "Design database schema",
    moreContext: "Design a database schema for a social media app",
  },
  {
    idea: "Give me code snippet",
    moreContext:
      "Give me a code snippet to create a frontend ui for a POST API",
  },
];

export default function DefaultIdeas({ visible = true }) {
  return (
    <div className={`row1 ${visible ? "block" : "hidden"}`}>
      <DefaultIdea ideas={defaultIdeas.slice(0, 2)} />
      <DefaultIdea
        ideas={defaultIdeas.slice(2, 4)}
        myclassNames="hidden md:visible"
      />
    </div>
  );
}
