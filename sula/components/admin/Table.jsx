import Image from "next/image";

const Table = (columns, data) => {
  columns.push("Actions");
  const gridColumns = 12 / (columns.length);
  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className={`grid ${`grid-cols-${gridColumns}`} rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4`}>
            {columns.map((column, key) => (
              <div
                className={"p-2.5 xl:p-4 text-center"}
                key={key}
              >
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  {column}
                </h5>
              </div>
            ))}
          </div>

          {data.map((row, key) => (
            <div
              className={`grid ${`grid-cols-${gridColumns}`} sm:grid-cols-4 ${
                key === data.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              {row.map((cell, key) => (
                <div
                  className={`p-2.5 xl:p-4 text-center ${
                    key === row.length - 1 ? "flex" : ""
                  }`}
                  key={key}
                >
                  {cell}
                </div>
              ))}
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="h-9 w-full max-w-9 flex-shrink-0">
                  <Image src={brand.logo} width={60} height={50} alt="Brand" />
                </div>
                <p className="hidden font-medium text-black dark:text-white sm:block">
                  {brand.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {brand.visitors}K
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-meta-3">${brand.revenues}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="font-medium text-meta-5">{brand.conversion}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
