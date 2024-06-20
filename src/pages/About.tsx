export const About = () => {
  return (
    <div className="px-16 md:px-[106px]">
      <div className="h-full lg:h-[calc(100vh-165px)] mt-[88px]">
        <h1 className="text-[46px] font-bold">About Us</h1>
        <div className="flex flex-col lg:flex-row items-center gap-[75px]">
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] font-bold">Our Mission</h2>
            <p className="text-2xl">
              At LetDesign, our mission is to empower individuals in Cambodia to
              express their unique style through custom clothing design. We
              provide an accessible platform that allows anyone to create,
              visualize, and bring their fashion ideas to life. Our goal is to
              revolutionize fashion by making personalized, high-quality
              clothing available to all, fostering creativity and innovation in
              the process.
            </p>
          </div>
          <img
            className="rounded-md"
            src="/placeholder/placeholder.jpg"
            alt="photo"
          />
        </div>
      </div>

      <div>
        <h1 className="text-[46px] font-bold">Meet the Team</h1>
        <div className="my-[72px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[72px]">
          <div className="flex flex-col gap-4 items-center">
            <img
              className="w-[200px] h-[200px] rounded-full"
              src="/placeholder/pf.png"
              alt="profile_picture"
            />
            <p className="text-[32px]">Prak Pichey</p>
            <p className="text-2xl">Frontend Developer</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <img
              className="w-[200px] h-[200px] rounded-full"
              src="/placeholder/pf.png"
              alt="profile_picture"
            />
            <p className="text-[32px]">Chea Chungheang</p>
            <p className="text-2xl">Frontend Developer</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <img
              className="w-[200px] h-[200px] rounded-full"
              src="/placeholder/pf.png"
              alt="profile_picture"
            />
            <p className="text-[32px]">Choeng Cheaheang</p>
            <p className="text-2xl">Mobile Developer</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <img
              className="w-[200px] h-[200px] rounded-full"
              src="/placeholder/pf.png"
              alt="profile_picture"
            />
            <p className="text-[32px]">Khan Hout Lyhap</p>
            <p className="text-2xl">Mobile Developer</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <img
              className="w-[200px] h-[200px] rounded-full"
              src="/placeholder/pf.png"
              alt="profile_picture"
            />
            <p className="text-[32px]">Chhim Kakada</p>
            <p className="text-2xl">Backend Developer</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <img
              className="w-[200px] h-[200px] rounded-full"
              src="/placeholder/pf.png"
              alt="profile_picture"
            />
            <p className="text-[32px]">Hul Marady</p>
            <p className="text-2xl">Backend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};
