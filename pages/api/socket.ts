import { NextApiRequest, NextApiResponse } from 'next';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface NextApiResponseServerIO extends NextApiResponse {
  socket: {
    server: NetServer & {
      io?: ServerIO;
    };
  };
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new ServerIO(res.socket.server);
    res.socket.server.io = io;

    const activeSessions = new Map();

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
      
      let currentSession: any = null;

      socket.on('initializeConnection', (callback) => {
        try {
          currentSession = {
            sessionId: socket.id,
            isActive: true,
            messages: []
          };
          
          activeSessions.set(socket.id, currentSession);
          if (callback) callback({ success: true });
        } catch (error) {
          if (callback) callback({ success: false, error });
        }
      });

      socket.on('systemPrompt', (promptText: string) => {
        if (currentSession) {
          setTimeout(() => {
            const greeting = "Hello! I'm excited to interview you today. Let's begin - could you tell me a bit about yourself?";
            socket.emit('textOutput', { content: greeting });
          }, 1000);
        }
      });

      socket.on('audioStart', () => {
        socket.emit('audioReady');
      });

      socket.on('audioInput', async () => {
        try {
          if (!currentSession) return;
          
          const responses = [
            "That's great! Can you tell me about a challenging project you've worked on?",
            "Interesting! How do you approach problem-solving in your work?",
            "What technologies are you most passionate about?",
            "How do you stay updated with industry trends?",
            "Can you describe your ideal work environment?"
          ];
          
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          socket.emit('textOutput', { content: randomResponse });
          
        } catch (error) {
          socket.emit('error', { message: 'Error processing audio input' });
        }
      });

      socket.on('stopAudio', () => {
        if (currentSession) {
          currentSession.isActive = false;
        }
        socket.emit('sessionClosed');
      });

      socket.on('disconnect', () => {
        if (currentSession) {
          activeSessions.delete(socket.id);
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;