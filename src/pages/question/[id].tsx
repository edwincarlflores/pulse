import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "questions.get-by-id",
    { id },
  ]);

  if (!isLoading && !data) {
    return <div>Question not found</div>;
  }

  return (
    <div className="flex flex-col p-8">
      <div className="text-2xl font-bold">{data?.question}</div>
      <div>
        {(data?.options as string[])?.map((option, index) => (
          <div key={`option-${index}`}>{option}</div>
        ))}
      </div>
    </div>
  );
};

const QuestionPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>No ID</div>;
  }

  return <QuestionPageContent id={id} />;
};

export default QuestionPage;
