const Features: React.FC = () => {
  const features = [
    {
      image:
        "https://img.freepik.com/free-vector/employees-cv-candidates-resume-corporate-workers-students-id-isolate-flat-design-element-job-applications-avatars-personal-information-concept-illustration_335657-1661.jpg?w=740&t=st=1685057335~exp=1685057935~hmac=c3a39d326bc1ab9ffd1c6c4ee313fa43a57bbb5bee72ff2eb29e47b5d6963874",
      title: "User registration and authentication",
      description:
        "Chatter allows users to register and create their own account on the platform. Users can sign up using their email address or social media accounts like Facebook or Google. ",
    },
    {
      image:
        "https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg?w=996&t=st=1685057487~exp=1685058087~hmac=e2d6cb028cf0437bdfce8a372b3ce476fc7ac5a98bfbe315d2375869ceb72c0b",
      title: " Content creation",
      description:
        "Chatter provides a rich text editor that allows users to easily create and publish their own content. Users can write blog posts or any other content, and add images or videos to enhance their content. The blog posts should be authored/saved in Markdown, then it gets displayed as HTML when the posts are viewed.",
    },

    {
      image:
        "https://img.freepik.com/free-vector/mobile-phone-with-bar-chart-screen-analytics-application-banner-with-smartphone_39422-597.jpg?w=826&t=st=1685060112~exp=1685060712~hmac=bb423b4fc7b8e7c7d8a50fb13500c260c64a7d300f6ff9f236fe2fc5aae475b0",
      title: "Analytics",
      description:
        "Chatter provides detailed analytics that allow users to track their content's performance. Users can see how many views, likes, and comments their content has received and how many users have bookmarked their content.",
    },
  ];

  return (
    <div className=" glass p-5 relative py-10 mobile_featues">
      <div className="text-center text-3xl text-slate-200 mob_pad">
        <h5>Features</h5>
        <p className="text-center text-base m-10 m_5 mob_pad .mob_mag">
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people Analytics Social
          interactions Content creation Analytics to track the number of views,
          likes and comment and also analyze the performance of your articles
          over a period of time Users on the platform can interact with posts
          they like, comment and engage in discussions Write nice and appealing
          with our in-built markdown, a rich text editor
        </p>
      </div>
      <ul className="flex justify-between dis_block flex-wrap  text-centre px-10 p_5 feaitem_con m-0 ">
        {features.map((features) => (
          <li
            key={features.title}
            className="text-center text-base-300 cursor-pointer  hvr-hang p-3 "
          >
            <div className="card w-80 bg-slate-600 shadow-xl text-center p-4 h-96  ">
              <figure>
                <img
                  src={features.image}
                  alt="Shoes"
                  width="40%"
                  className="rounded-full"
                />
              </figure>
              <div className="card-body text-center p-1">
                <h2 className="font-bold text-center  text-xl">
                  {features.title}
                </h2>
                <p className="text-xm ">{features.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Features;
