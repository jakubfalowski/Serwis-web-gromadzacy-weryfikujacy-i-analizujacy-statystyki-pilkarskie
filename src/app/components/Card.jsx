export function Card(props) {
  return (
    <div className="mt-8 mb-8 flex flex-col md:flex-row bg-white shadow-xl rounded-xl">
      <div className="w-full md:w-[1000px] h-[600px] overflow-hidden relative rounded-lg">
        <img
          src={props.imgUrl}
          alt=""
          className="w-full h-full object-cover rounded-lg"
          width="1000"
          height="600"
        />
      </div>

      <div className="w-full md:max-w-[600px] md:ml-10 mt-4 md:mt-0 flex flex-col p-8">
        <div className="flex-grow">
          <h1 className="text-3xl font-bold uppercase">{props.title}</h1>
          <p className="text-blue-dark opacity-60 mt-4">{props.content}</p>
        </div>
        <p className="text-blue-dark opacity-60">{props.date}</p>
      </div>
    </div>
  );
}
