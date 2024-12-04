const ProgramPage = ({ params }: { params: { programId: string } }) => {
  const { programId } = params;

  return (
    <div>
      <h1>Program {programId}</h1>
      <p>Details about Program {programId}.</p>
    </div>
  );
};

export default ProgramPage;
