const Glows = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-0 -left-32 w-3/4 sm:w-1/2 md:w-2/5 h-[70vh] sm:h-[50vh] md:h-[40vh] max-w-125 max-h-125 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-3/4 sm:w-1/2 md:w-2/5 h-[70vh] sm:h-[50vh] md:h-[40vh] max-w-125 max-h-125 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse delay-500"></div>
    </div>
  );
};

export default Glows;
