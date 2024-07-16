import type {IMarketData} from "~/types/data";

class WebSocketManager {
    private static instance: WebSocketManager;
    private webSocket: WebSocket | null = null;
    private isConnected: boolean = false;
    private readonly url: string;
    private readonly retryInterval: number = 60000; // Retry every 5 seconds

    private constructor(url: string) {
        this.url = url;
        if (!this.isConnected) {
            this.connect();
        }
    }

    public static getInstance(url: string): WebSocketManager {
        if (!WebSocketManager.instance) {
            WebSocketManager.instance = new WebSocketManager(url);
        }
        return WebSocketManager.instance;
    }

    public getSocketInstance(): WebSocket | null {
        return this.webSocket;
    }

    private connect(): void {
        if (!this.webSocket || this.webSocket.readyState === WebSocket.CLOSED) {
            this.webSocket = new WebSocket(this.url);

            this.webSocket.onopen = () => {
                console.log('WebSocket connection established');
                this.isConnected = true;
                const subscribeObj =  {
                    'action': 'SubAdd',
                    'subs': ['2~Binance~BTC~USDT']
                }
                this.webSocket?.send(JSON.stringify(subscribeObj))
            };

            this.webSocket.onerror = (error) => {
                console.error('WebSocket encountered an error:', error);
            };

            this.webSocket.onclose = () => {
                const removeObj = {
                    'action': 'SubRemove',
                    'subs': ['2~Binance~BTC~USDT']
                }
                this.webSocket?.send(JSON.stringify(removeObj))
                console.log('WebSocket connection closed. Attempting to reconnect...');
                setTimeout(() => this.connect(), this.retryInterval);
                this.isConnected = false;
            };
        }
    }

    public sendMessage(message: string): void {
        if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.send(message);
        } else {
            console.error('WebSocket is not open. Message not sent.');
        }
    }

    public close(): void {
        if (this.webSocket) {
            this.webSocket.close();
            this.webSocket = null;
            console.log('WebSocket connection manually closed');
        }
    }
}

// Usage
interface IExtendedMeta extends ImportMeta {
    env: {
        VITE_WS_KEY: string
    }
}
const apiKey = (import.meta as IExtendedMeta).env.VITE_WS_KEY
const wsUrl = `wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`;
export const webSocketManager = WebSocketManager.getInstance(wsUrl);
