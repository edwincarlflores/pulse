import React from "react";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Link from "next/link";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-my-questions"]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Your Questions</div>
        {data.map((question) => (
          <div key={question.id} className="my-2 flex flex-col">
            <Link href={`/question/${question.id}`}>
              <a>
                <div key={question.id} className="">
                  {question.question}
                </div>
              </a>
            </Link>
            <span>Created on {question.createdAt.toDateString()}</span>
          </div>
        ))}
      </div>
      <Link href="/create">
        <a>Create New Question</a>
      </Link>
    </div>
  );
};

export default Home;
