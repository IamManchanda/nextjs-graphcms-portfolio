function NavigationFooter() {
  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-0">
      <div></div>
      <div className="text-gray-500">
        &copy; {new Date().getFullYear()} Awesome GraphCMS
      </div>
    </div>
  );
}

export default NavigationFooter;
