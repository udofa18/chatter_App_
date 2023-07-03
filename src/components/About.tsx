
 const image={
    url: "https://img.freepik.com/free-photo/close-up-young-beautiful-woman-her-desk_273609-37507.jpg?w=996&t=st=1685134227~exp=1685134827~hmac=74836cbaca8c783da32d9bd4f916cfd3e565602ddbafb1349b4b34cdf4389771"
 }

const About = () => {
  return (
    <div className="bg-slate-100 relative p-10 h-full mob_mag  mob_pad">
      <div className=" flex mob_block justify-between m-40 mob_mag ">
        <div className="w-1/2  t_center mobile_featues">
        <h1 className="my-5 mob_font ">About Scroll</h1>
        <p>
          Scroll is a multi-functional platform where authors and readers can
          have access to their own content. It aims to be a traditional
          bookworm’s heaven and a blog to get access to more text based content.
          Our vision is to foster an inclusive and vibrant community where
          diversity is celebrated. We encourage open-mindedness and respect for
          all individuals, regardless of their backgrounds or beliefs. By
          promoting dialogue and understanding, we strive{" "}
        </p>
        </div>
        <div>
            <img src={image.url} width={450} alt="Scroll" className="rounded-box " />
        </div>
      </div>
    </div>
  );
};

export default About;
