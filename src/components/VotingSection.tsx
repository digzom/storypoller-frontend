"use client";

type VotingOption = { id: string; text: string; votes: number };

const VotingSection = ({
  totalVotes,
  votingOptions,
}: {
  totalVotes: number;
  votingOptions: Array<VotingOption>;
}) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl text-center font-semibold mb-4">
        Decide the plot!
      </h2>
      <hr />
      <br />
      <h4 className="text-lg font-semibold mb-2">Most voted plots</h4>
      <div className="flex flex-col gap-y-2">
        {votingOptions.map((votingOption) => {
          const percentage = (votingOption.votes / totalVotes) * 100;
          return (
            <div key={votingOption.id} className="mb-6">
              <p>{votingOption.text}</p>

              <div className="bg-gray-200 rounded-md w-full h-6">
                <div
                  className="bg-blue-200 mt-1 rounded-md h-6"
                  style={{ width: `${percentage}%` }}
                >
                  <p className="leading-6 text-right mr-3">
                    {votingOption.votes}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center">
        <span className="mr-1">Next release in</span>
        <span className="font-bold">11:39:19</span>
      </div>
    </div>
  );
};

export default VotingSection;
