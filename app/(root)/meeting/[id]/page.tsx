const Meeting = ({ params }: { params: { id: String } }) => {
  return <div>Meeting Room: #{params.id}</div>;
};

export default Meeting;
