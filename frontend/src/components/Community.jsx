import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ThumbsDown, User, ArrowLeft, ArrowRight } from "lucide-react";

const PostCard = ({ title, content, likes, dislikes, supports, onClick, active }) => {
  const [like, setLike] = useState(likes);
  const [dislike, setDislike] = useState(dislikes);
  const [support, setSupport] = useState(supports);

  return (
    <Card 
      onClick={onClick} 
      className={`bg-white rounded-3xl shadow-lg p-6 border ${active ? "border-purple-500 scale-105 z-10" : "border-purple-200"} cursor-pointer hover:shadow-xl transition-all duration-300 relative`}
    >
      <CardContent>
        <h3 className="text-2xl font-bold text-purple-700 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{content}</p>
        {active && (
          <div className="flex justify-between">
            <Button onClick={(e) => { e.stopPropagation(); setLike(like + 1); }} className="bg-pink-500 text-white flex items-center gap-2 rounded-full">
              <Heart size={18} /> Like ({like})
            </Button>
            <Button onClick={(e) => { e.stopPropagation(); setDislike(dislike + 1); }} className="bg-red-400 text-white flex items-center gap-2 rounded-full">
              <ThumbsDown size={18} /> Dislike ({dislike})
            </Button>
            <Button onClick={(e) => { e.stopPropagation(); setSupport(support + 1); }} className="bg-green-400 text-white flex items-center gap-2 rounded-full">
              Support ({support})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function CommunityPage() {
  const posts = [
    {
      title: "Mothers' Circle",
      content: "A supportive space for mothers to share their experiences and connect.",
      likes: 1330,
      dislikes: 50,
      supports: 360,
    },
    {
      title: "Plosome Community",
      content: "Positive pregnancy stories to uplift and inspire others.",
      likes: 2200,
      dislikes: 80,
      supports: 900,
    },
    {
      title: "Baby Bump Support",
      content: "Discuss health issues and get advice from other mothers.",
      likes: 1500,
      dislikes: 60,
      supports: 700,
    },
  ];

  const [selectedPost, setSelectedPost] = useState(posts[0]);
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (index + 1) % posts.length;
    setIndex(nextIndex);
    setSelectedPost(posts[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (index - 1 + posts.length) % posts.length;
    setIndex(prevIndex);
    setSelectedPost(posts[prevIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto p-10 bg-gradient-to-b from-purple-100 to-white rounded-3xl shadow-2xl mt-20">
      <h1 className="text-6xl font-extrabold text-purple-700 text-center mb-16">Mother's Circle 🌸</h1>
      <div className="relative flex flex-col items-center mb-10">
        {posts.map((post, idx) => (
          <div key={idx} className={`absolute top-${idx * 5} w-full`}>
            <PostCard {...post} onClick={() => { setSelectedPost(post); setIndex(idx); }} active={index === idx} />
          </div>
        ))}
        <div className="flex justify-between w-full mt-64">
          <Button onClick={handlePrev} className="bg-purple-500 text-white rounded-full">
            <ArrowLeft size={18} /> Previous
          </Button>
          <Button onClick={handleNext} className="bg-purple-500 text-white rounded-full">
            Next <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
