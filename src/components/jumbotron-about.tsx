function JumbotronAbout({ name, biography }) {
  return (
    <div className="flex flex-col max-w-3xl px-4 py-10 mx-auto prose prose-xl sm:px-6 lg:px-0">
      <h1 className="text-5xl font-bold text-gray-900">
        <span className="text-green-700">About {name}!</span>
      </h1>
      <p className="mt-8 text-xl leading-relaxed text-gray-700 sm:leading-loose">
        {biography}
      </p>
    </div>
  );
}

export default JumbotronAbout;
