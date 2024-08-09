// import { useEffect, useState } from "react";
// import { socket } from "@/lib/socket";

// export default function useWebSocket() {
//   const [isConnected, setIsConnected] = useState(socket.connected);

//   useEffect(() => {
//     socket.connect();

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     function onConnect() {
//       setIsConnected(true);
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//     }

//     socket.on("connect", onConnect);
//     socket.on("disconnect", onDisconnect);

//     return () => {
//       socket.off("connect", onConnect);
//       socket.off("disconnect", onDisconnect);
//     };
//   }, []);

//   return { isConnected };
// }
