const image = {
  url: "https://img.freepik.com/free-photo/stylish-businessman-office_23-2147626601.jpg?w=740&t=st=1685139765~exp=1685140365~hmac=1f06f9cf4e1815a3d13079e6050b8c43921bbee914fcb55e2680c991060d12bc",
};
const Scroll = () => {
  return (
    <div>
      <div className="bg-base-200 relative p-40 mob_pad ">
        <div className="flex justify-center m-35">
          <div className="w-full no_dis ">
            <img
              // width={80}
              src={image.url}
              style={{ borderRadius: "100%", width: "10rem", height: "10rem" }}
              className="  m-auto no_dis
            "
            />
          </div>

          <div className="px-5 ml-5 t_center mob_pad dark:text-white">
            <h2 className=" ">
              "Scroll has become an integral part of my online experience. As a
              user of this incredible blogging platform, I have discovered a
              vibrant community of individuals who are passionate about sharing
              their ideas and engaging in thoughtful discussions.”
            </h2>
            <h1 className="py-4 text-3xl">Adedayo Daniel</h1>
            <button className="btn">Join Scroll</button>
          </div>
        </div>
      </div>
      <div className="bg-orange-400 relative p-40 mob_pad">
        <div className="flex justify-between m-35 mob_block ">
          <div className="w-full flex">
            <div>
           <div style={{ borderRadius: "100%", width: "10rem", height: "10rem", border:"2px solid orangered" }} className="p-4 no_dis">
              <img
                // width={80}
                src="https://img.freepik.com/free-photo/african-woman-posing-looking-up_23-2148747978.jpg?w=740&t=st=1685143630~exp=1685144230~hmac=5ba67ecca990878768d4369ca532405099e998407f2d6b3b91c9fcf5e86cd28a"
                style={{ borderRadius: "100%", width: "10rem", height: "8rem" }}
                className="  
            "
              />
              </div>
              <div style={{ borderRadius: "100%", width: "10rem", height: "10rem", border:"2px solid orangered",marginTop: "5rem", }} className="p-4 no_dis">

              <img
                // width={80}
                src="https://img.freepik.com/free-photo/portrait-young-businessman-with-arms-crossed-looking-camera-isolated-against-white-background_23-2148073336.jpg?t=st=1685143360~exp=1685143960~hmac=142a84bdf50f0c37a901f92d218cf7b300bbf2c3b9dc6cebbed53c849bda8863"
                style={{
                  borderRadius: "100%",
                  width: "8rem",
                  height: "8rem",
                  
                }}
                className="  m-auto  
            "
              />
              </div>
            </div>
            <div style={{ borderRadius: "100%", width: "10rem", height: "10rem", border:"2px solid orangered",marginTop:"8rem"}} className="p-3 mt-10 no_dis">

            <img
              // width={80}
              src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?w=996&t=st=1685143594~exp=1685144194~hmac=f7ac65fefade03fe8293a01ef6a8cbddf9dcd2c2cf76d81973b51d020e5771ea"
              style={{ borderRadius: "100%", width: "8rem", height: "8rem" }}
              className="  m-auto  
            "
            />
            </div>
          </div>
          <div className="px-5 ml-5 w-full t_center mob_pad">
            <h1 className="text-white t_center mob_font">Write, read and connect with great minds on Scroll</h1>
            <p className="py-5 t_center">Share people your great ideas, and also read write-ups based on your interests. connect with people of same interests and goals  </p>
            <button className="btn my-10 ">Join Scroll</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scroll;
