import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './model/group.schema';
import { Message, MessageSchema } from './model/message.schema';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { GroupChatRepoitory } from './repository/group-chat.repository';
import { MessageRepository } from './repository/chat.repository';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoURL'),
        dbName: 'Chat',
      }),
    }),
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    
    AdminModule
  ],
  controllers: [],
  providers: [ChatGateway, ChatService, GroupChatRepoitory, MessageRepository],
})
export class AppModule { }
