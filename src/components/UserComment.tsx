const UserComment = ({ name, body, createdAt, msg }) => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="comments-list">
            <div className="media">
              {msg ? (
                <h4 className="mt-5">{msg}</h4>
              ) : (
                <>
                  <div className="left flex m-2 w-full">
                    <div className="mt-10">                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="user"
                      className="rounded-circle "
                      width={30}
                      height={32}
                    />
                    </div>

                    <div className="chat chat-start w-auto">
                      <div className="chat-header">
                      {name}{" "}
                        <time className="text-xs opacity-50">{createdAt.toDate().toDateString()}</time>
                      </div>
                      <div className="chat-bubble chat-bubble-primary w-full">
                      {body}
                      </div>
                      
                    </div>
                    
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
