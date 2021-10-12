
export default function Home() {
  return (
    <div className="space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44 overflow-hidden">
    <section className="relative z-10 mt-40 text-center max-w-screen-lg xl:max-w-screen-xl mx-auto">
      <div className="px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8 underline uppercase overline">
          What If...?
        </h2>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8">
          ถ้าเราลง DCA กองทุนจะขาดทุนไหม
        </h2>
        <div class="flex flex-wrap justify-center space-y-0 space-x-4 text-center ">
          <a class="w-full sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200" href="/funds">Find Out</a>
        </div>
      </div>
    </section>
  </div>
  )
}
