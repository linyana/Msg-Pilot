import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({
  path: '/api/v1/socket',
  namespace: '/api/v1/socket',
})
export class socketGateway implements OnGatewayInit {
  private allowedOrigins: string[];

  constructor(private readonly prisma: PrismaService) {}

  async afterInit() {
    const merchants = await this.prisma.tenants.findMany({
      distinct: ['sub_domain'],
    });
    const subDomain = merchants?.filter((item) => item.sub_domain)?.map((item) => item.sub_domain || '');
    this.allowedOrigins = [...subDomain, process.env.BASE_FE_URL || ''];
  }

  configure(server: Server) {
    server.sockets.on('connection', (socket: any) => {
      const origin = socket.handshake.headers.origin;
      if (!origin || this.allowedOrigins.includes(origin)) {
      } else {
        socket.disconnect(true);
      }
    });
  }

  @WebSocketServer()
  server: Server;

  sendImportProgress(socketId: string, message: any) {
    this.server.to(socketId).emit('importProgress', message);
  }
}
