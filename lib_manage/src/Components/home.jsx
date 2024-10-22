import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="bg-customdark  min-h-screen flex flex-col justify-center items-center">
        <div className="flex space-x-4">
          <div className="p-4 border-2 hover:bg-customgray border-white shadow-md rounded-lg">
            <Link to={"/view_data"} className="text-white ">
              View Data
            </Link>
          </div>
          <div className="p-4 border-2  hover:bg-customgray border-white shadow-md rounded-lg">
            <Link to={"/Add_data"} className="text-white">
              Add Data
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
