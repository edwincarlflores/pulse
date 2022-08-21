import React from "react";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Link from "next/link";

const QuestionCreator: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: () => {
      client.invalidateQueries(["questions.get-all-my-questions"]);
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });

  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          mutate({ question: event.currentTarget.value });
          event.currentTarget.value = "";
        }
      }}
    />
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-my-questions"]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Questions</div>
        {data.map((question) => (
          <Link key={question.id} href={`/question/${question.id}`}>
            <a>
              <div key={question.id} className="my-2">
                {question.question}
              </div>
            </a>
          </Link>
        ))}
      </div>
      <QuestionCreator />
    </div>
  );
};

export default Home;
