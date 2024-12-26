import Form from "../Form";

const Index = (props: { onSubmit: any; item?: any; setModal?: any }) => {
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="w-full">
      <Form onSubmit={props.onSubmit} setModal={props.setModal} item={props.item}/>      
      </div>
    </div>
  );
};

export default Index;
