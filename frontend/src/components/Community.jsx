import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios"; // Import axios for making API calls

export default function CommunityPage() {
  const [post, setPost] = useState({
    healthIssue: "",
  });
  const [posts, setPosts] = useState([]);
  const [reply, setReply] = useState(""); // State to store reply content
  const [replyPostId, setReplyPostId] = useState(null); // Store post ID to which the reply belongs

  // Fetch all posts on page load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/community");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []); // Empty array ensures this runs only once after initial render

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userId = localStorage.getItem("userId")?.trim();
      const response = await axios.post("http://localhost:3000/community", {
        userId,
        content: post.healthIssue,
      });

      const newPost = response.data.post;
      setPosts([...posts, newPost]);
      setPost({ healthIssue: "" });
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async (e, postId) => {
    e.preventDefault();
    try {
      let userId = localStorage.getItem("userId")?.trim();

      const response = await axios.post(`http://localhost:3000/community/${postId}/reply`, {
        userId,
        content: reply,
      });

      // Get the updated post with the new reply
      const updatedPost = response.data.post;

      // Update the posts state with the updated post (including the new reply)
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return updatedPost; // Replace the post with the updated one
        }
        return post;
      });

      setPosts(updatedPosts);
      setReply(""); // Clear the reply input after submission
      setReplyPostId(null); // Reset replyPostId
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">Health Community 🩺💬</h1>

      {/* Post Submission Form */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">Share Your Health Experience</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Health Issue:</label>
            <Textarea
              name="healthIssue"
              value={post.healthIssue}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Describe your health experience"
              required
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-md"
            >
              Post Your Experience
            </Button>
          </div>
        </form>
      </div>

      {/* Community Posts */}
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="p-6 bg-pink-100 shadow-lg rounded-2xl transition transform hover:scale-105 hover:shadow-xl"
            >
              <p className="text-gray-700">{post.content}</p>

              {/* Reply Button and Form */}
              <Button
                onClick={() => setReplyPostId(post._id)} // Set the current post ID for reply
                className="mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full"
              >
                Reply
              </Button>

              {/* Display reply input when the reply button is clicked */}
              {replyPostId === post._id && (
                <form onSubmit={(e) => handleReplySubmit(e, post._id)} className="mt-4">
                  <Textarea
                    value={reply}
                    onChange={handleReplyChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Write your reply..."
                    required
                  />
                  <Button
                    type="submit"
                    className="mt-2 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md"
                  >
                    Submit Reply
                  </Button>
                </form>
              )}

              {/* Display replies */}
              <div className="mt-4 space-y-4">
                {post.replies.length > 0 ? (
                  post.replies.map((reply) => (
                    <div key={reply._id} className="p-4 bg-pink-200 shadow-sm rounded-lg">
                      <p className="text-gray-700">{reply.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No replies yet.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No posts available yet.</p>
        )}
      </div>
    </div>
  );
}
