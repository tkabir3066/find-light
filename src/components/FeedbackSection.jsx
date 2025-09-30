import React, { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const FeedbackSection = ({ serviceName }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      return;
    }

    setIsSubmitting(true);


    const comment = {
      id: Date.now(), 
      text: newComment.trim(),
      author: user?.displayName || user?.email || "Anonymous User",
      authorPhoto: user?.photoURL || null,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");

    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="bg-[#9FC2CC] p-6 rounded-md mt-3">
      <h3 className="text-xl font-bold text-[#331832] mb-4">
        Comments & Feedback
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={`Share your thoughts about ${serviceName}...`}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5299] transition-all duration-200 border-[#694D75] bg-white text-[#331832] resize-none"
            rows="4"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-[#694D75]">
            Posting as:{" "}
            <strong>{user?.displayName || user?.email || "Anonymous"}</strong>
          </span>
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isSubmitting || !newComment.trim()
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#1B5299] text-[#F1ECCE] hover:bg-[#0d4085]"
            }`}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-[#694D75] text-lg mb-2">💬</div>
            <p className="text-[#694D75]">
              No comments yet. Be the first to share your feedback!
            </p>
          </div>
        ) : (
          <div>
            <h4 className="font-semibold text-[#331832] mb-4">
              {comments.length} Comment{comments.length !== 1 ? "s" : ""}
            </h4>

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-4 rounded-lg border border-[#9FC2CC] mb-3"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {comment.authorPhoto ? (
                      <img
                        src={comment.authorPhoto}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#9FC2CC]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#9FC2CC] flex items-center justify-center text-[#331832] font-semibold">
                        {comment.author.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h5 className="font-semibold text-[#331832] text-sm">
                        {comment.author}
                      </h5>
                      <span className="text-xs text-[#694D75]">
                        {comment.date} at {comment.time}
                      </span>
                    </div>

                    <p className="text-[#331832] text-sm leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackSection;