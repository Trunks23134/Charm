import { useState } from 'react';
import { Heart } from 'lucide-react';

function App() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);

  const angryMemes = [
    'https://www.reddit.com/r/overlord/comments/1go9mo3/does_anyone_else_think_these_two_look_alike/',
    'https://dk.pinterest.com/pin/cute-angry-cat--80783387061514716/',
    'https://www.reddit.com/r/aww/comments/rnyhrw/hes_so_mad/',
  ];

  const handleYesClick = () => {
    setAnswer('yes');
  };

  const handleNoHover = () => {
    const newAttempts = noAttempts + 1;
    setNoAttempts(newAttempts);

    setYesButtonSize(1 + newAttempts * 0.2);

    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setNoButtonPosition({ x: randomX, y: randomY });

    setCurrentMemeIndex((currentMemeIndex + 1) % angryMemes.length);
  };

  if (answer === 'yes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-pink-500 flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <img src="https://scontent.fmnl8-5.fna.fbcdn.net/v/t1.6435-9/52482045_10211186713743058_3467321609092595712_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE6Rk4UXqNsGYWghtF7f19bAG9t_xWL_aIAb23_FYv9oq3pQ9vIaMhQylemxLwqizWc45_c5iCGUQW6L5H2sowQ&_nc_ohc=LxG8bPJHEZYQ7kNvwE5WZpt&_nc_oc=Adm-3gSXCH_E46LDlR9DbUw1w7t6mwV6T8yH27mjqLJmJViOOIr0EOPA80sTZZWSCRI&_nc_zt=23&_nc_ht=scontent.fmnl8-5.fna&_nc_gid=2XunOYwGU5lJE3kiMfRZJg&oh=00_Afs1z8A7mgqNeD9AdWF8A-nSCvv4h8IZtscWqqMB8U3vzw&oe=69AB3CE2" alt="Valentine Photo" className="w-32 h-32 mx-auto animate-pulse" />
          <h1 className="text-8xl font-bold text-white mb-8 animate-bounce">
            Yay!! 🎉
          </h1>
        </div>

        <div className="fireworks-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="firework"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-200 opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="text-center z-10">
        <Heart className="w-24 h-24 text-red-500 mx-auto mb-8 animate-pulse" fill="currentColor" />

        <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-12 font-serif">
          Will you be my valentine?
        </h1>

        <div className="flex gap-6 justify-center items-center relative" style={{ minHeight: '80px' }}>
          <button
            onClick={handleYesClick}
            style={{
              transform: `scale(${yesButtonSize})`,
              transition: 'transform 0.3s ease',
            }}
            className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl"
          >
            Yes! 💕
          </button>

          <button
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            style={{
              position: noAttempts > 0 ? 'fixed' : 'relative',
              left: noAttempts > 0 ? `${noButtonPosition.x}px` : 'auto',
              top: noAttempts > 0 ? `${noButtonPosition.y}px` : 'auto',
              transition: 'all 0.3s ease',
            }}
            className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-4 px-12 rounded-full shadow-lg text-xl"
          >
            No
          </button>
        </div>

        {noAttempts > 0 && (
          <div className="mt-8 flex flex-col items-center">
            <img src={angryMemes[currentMemeIndex]} alt="Angry Meme" className="w-32 h-32 mb-4 animate-bounce" />
            <p className="text-gray-600 text-lg animate-bounce">
              Please? 🥺 {noAttempts > 3 && "I promise I'll be the best valentine!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
